"use server"

import { ActionRes, BarcodeSend, CreatePaymentResponse, GetProjects, SanityMetadata } from "@/types";
import { CreateOrderType, newsletterSchema, NewsletterType, orderSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { verifyCaptchaToken } from "./captcha";
import { sanityClient, sanityFetch } from "@/sanity/lib/client";
import { GET_COUPON, GET_CUR_USER } from "@/sanity/lib/queries";
import { Coupon } from "@/types";
import { thePayClient } from "./thepay/client";
import { UNIT_PRICE } from "@/lib/utils";
import {Builder, Parser} from "xml2js"

export async function getCoupon(coupon: string): Promise<Coupon | null>{
    const isValid = await sanityFetch<Coupon>({
        query: GET_COUPON,
        params: {name: coupon}
    });

    if(!isValid){
        return null;
    }else {
        return{
            name: isValid.name,
            type: isValid.type,
            value: isValid.value,
            min_order_value: isValid.min_order_value,
            free_del: isValid.free_del,
        }
    }
}

export async function signOutNewsletter(prevState: ActionRes<NewsletterType>, formData: FormData): Promise<ActionRes<NewsletterType>>{
    let revalidate: boolean = false;

    try{
        const nonValidate: NewsletterType = {
            email: formData.get("email") as string
        }

        const validation = newsletterSchema.safeParse(nonValidate);

        if(!validation.success){
            return{
                submitted:true,
                success: false,
                message: "Zadal jste špatně údaje",
            }
        }

        const data = validation.data;

        const getUser = await sanityFetch<NewsletterType & SanityMetadata>({
            query: GET_CUR_USER,
            params: {email: data.email}
        });

        console.log("[signOutNewsletter] User: ", getUser);
                
         if(!getUser){
            return{
                submitted:true,
                success: false,
                message: "Nejste registrován v databázi. Pokud Vám chodí newsletter, kontaktujte nás prosím.",
            }
        }

        await sanityClient.delete(getUser._id);

        return{
            submitted:true,
            success: true,
            message: "Byl jste odhlášen z newsletteru!",
            inputs: {email: ""},
        }
    }catch(error){
        return{
            submitted:true,
            success: false,
            message: "Vyskytla se chyba na naší straně. Zkuste znovu později.",
        }
    }finally{
        if(revalidate){
            revalidatePath("/unsubscribe")
        }
    }
    
    
}

export async function saveNewsletter(prevState: ActionRes<NewsletterType>, formData: FormData, token: string | null): Promise<ActionRes<NewsletterType>>{
    let revalidate = false;
    try{    
        if(!token){
            return{
                submitted: true,
                success: false,
                message: "Token k ověření nebyl nalezen",
            }
        }
        
        const captchaData = await verifyCaptchaToken(token);

        if (!captchaData || !captchaData.success || captchaData.score < 0.8) {
            return {
                submitted: true,
                success: false,
                message: "Ověření selhalo",  
            };
        } 
        const nonValidate: NewsletterType = {
            email: formData.get("email") as string
        }

        const validate = newsletterSchema.safeParse(nonValidate)

        if(!validate.success){
            return {
                submitted: true,
                success: false,
                message: "Nezadali jste platný e-mail",
                inputs: nonValidate
            }
        }
        const data = validate.data;

        const getUser = await sanityFetch<NewsletterType>({
            query: GET_CUR_USER,
            params: {email: data.email}
        });

        console.log("[saveNewsletter] User: ", getUser);
        
        if(!getUser){
            const saveMail = await sanityClient.create({
            _type: "newsletter",
            email: data.email
        })  
        console.log("[saveNewsletter] Saved user: ", saveMail)

        if(!saveMail._id){
            return{
                submitted: true,
                success: false,
                message: "Nezdařilo se uložit e-mail do databáze. Zkuste znovu později.",
                inputs: nonValidate
            }
        }
        }else if(getUser.email === data.email){
            return{
                submitted: true,
                success: true,
                message: "Váš e-mail máme uložený. Vyčkejte na newsletter!"
            }
        }

        

        revalidate = true;

        return {
                submitted: true,
                success: true,
                message: "Uložili jsme Váš e-mail! Brzy Vás kontaktujeme s novinkami!"
        }
    }catch(error){
        console.log("Error v akci saveNewsletter: ", error)
        return {
            submitted: true,
            success: false,
            message: "Error na naší straně, vše dáváme do pořádku, vyčkejte prosím."
        }
    }finally{
        if(revalidate) revalidatePath("/")
    }   
}

export async function createOrder(prevState: ActionRes<CreateOrderType>, formData: FormData): Promise<ActionRes<CreateOrderType> & CreatePaymentResponse>{
    let revalidate = false;
    let inputs = {};
    try{

        const nonValidate: CreateOrderType = {
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                address: formData.get("address") as string,
                city: formData.get("city") as string,
                adressNumber: formData.get("addressNumber") as string,
                zip: formData.get("zip") as string,
                packetaId: Number(formData.get("packetaId")),
                deliveryPrice: Number((formData.get("deliveryPrice"))),
                quantity: Number(formData.get("quantity")), 
                sale: Number(formData.get("sale")),
                packetaAddress: formData.get("packetaAddress") as string
        }
        inputs = nonValidate;
        const validate = orderSchema.safeParse(nonValidate)
        console.log(validate.error)
        if(!validate.success){
            return {
                submitted: true,
                success: false,
                message: "Nezadali jste platná data",
                inputs: nonValidate,
                pay_url: "",
                detail_url: "",
            }
        }

        const data = validate.data;

      console.log(data)

        const totalPrice: number = data.quantity * UNIT_PRICE + data.deliveryPrice - data.sale
        const itemPrice: number = data.quantity * UNIT_PRICE + data.sale
        
        console.log(data, totalPrice, itemPrice)

        const orderCreate = await sanityClient.create({
            _type: "orders",
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            adr_number: data.adressNumber,
            city: data.city,
            psc: data.zip,
            total: Number(totalPrice),
            couponValue:Number(data.sale.toFixed(2)),
            quantity: Number(data.quantity),
            del_price: Number(data.deliveryPrice) === 0 ? true : false,
            packetaId: data.packetaId,
            status: "Přijatá",
            packetaAddress: data.packetaAddress
        })

        const orderId: string = orderCreate._id

        const createPayment = await thePayClient.createPayment(
            String(totalPrice),
            orderId,
            data,
            String(itemPrice)
        )

        if(!createPayment?.detail_url || !createPayment?.pay_url){
            return {
                submitted: true,
                success: false,
                message: "Nepodařilo se spojit s platební bránou. Objednávka se nezdařila",
                inputs: nonValidate,
                pay_url: "",
                detail_url: "",
            }
        }else{

            return {
                submitted: true,
                success: true,
                pay_url: String(createPayment?.pay_url),
                detail_url: String(createPayment?.detail_url),
                message: "Objednávka proběhla"
            }

        }
    }catch(error){
        console.error("[createOrder] Error: ", error);
        return {
            submitted: true,
            success: false,
            pay_url: "",
            detail_url: "",
            inputs: inputs as CreateOrderType,
            message: "Problém se zpracováním platby na naší straně. Zkuste znovu později. Omlouváme se."
        }
    }finally{
        if(revalidate) revalidatePath("/checkout")
    }
}

export async function createPacket({name, surname, email, phone,packetaId, total, uid}: BarcodeSend){
let packetaCode: string = "";

        const rBody = {
          createPacket: {
            apiPassword: process.env.PACKETA_API_PASSWORD,
            packetAttributes: {
                number: `${packetaId}${total}${uid}`,
                name: name,
                surname: surname,
                email: email,
                phone: String(phone),
                addressId: packetaId,
                value: total,
                weight: 1,
                eshop: "especko.cz",
                adultContent: true,   
            }
          }
        }
        try{
const packeta = await fetch("https://www.zasilkovna.cz/api/rest", {
    method: "POST",
    body: new Builder().buildObject(rBody)
  })
  const pResponse = await new Parser({explicitArray: false}).parseStringPromise(await packeta.text())
  if(pResponse.response.status !== "ok"){
    console.error("Problém s vytvořením zásilky: ",pResponse.response.detail.attributes.fault)
    return;
  }
  packetaCode = pResponse.response.result.barcodeText;
  if(!packetaCode) alert("Problém s vytvořením štítku.")
  }catch(error){
    console.error("Error při vytváření packety: ", error)
    }
    return packetaCode
    
} 