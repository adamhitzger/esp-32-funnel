"use server"

import { 
    ActionRes, 
    BarcodeSend, 
    CreatePaymentResponse, 
    GetRefunds, 
    Order, 
    PacketaData, 
    SanityFileAsset, 
    SanityMetadata 
} from "@/types";
import { 
    CreateOrderType, 
    newsletterSchema, 
    NewsletterType, 
    orderSchema, 
    RefundCode, 
    RefundInputs, 
    refundSchema, 
    reviewSchema, 
    ReviewType, 
    sendRefundCode
} from "./schema";
import { revalidatePath } from "next/cache";
import { sanityClient, sanityFetch } from "@/sanity/lib/client";
import { 
    GET_COUPON, 
    GET_CUR_USER, 
    GET_ORDER_BY_EMAIL_OR_PHONE 
} from "@/sanity/lib/queries";
import { Coupon } from "@/types";
import { DOBIRKA_PRICE, getTotalPrice, getUnitPrice, sendTelegramMessage, SITE_URL } from "@/lib/utils";
import {Builder, Parser} from "xml2js"
import nodemailer from "nodemailer"
import { renderOrderStatusEmail } from "@/components/email/template";
import { renderNewsletterVerifyEmail } from "@/components/email/email-verify";
import { renderInvoicePDF } from "@/components/email/invoice";
import { renderRefundBarcodeEmail } from "@/components/email/refund-barcode";
import { comgate, ComgateRestClient } from "@/lib/comgate/client";

const transporter = nodemailer.createTransport({
     host: "smtp.seznam.cz",
        port: 587,
        secure: false,
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        }
});



export async function sendStatusMail(order: Order, subject: string, invoice: string | null): Promise<boolean>{
    try{
        let attachments = []
        if(invoice !== null ){
            attachments.push({
                filename: `faktura-${order._id}.pdf`, 
                path: invoice,   
                contentType: "application/pdf"
            })
        }
         const mailOptions = {
            from: `"Especko.cz" <${process.env.FROM_EMAIL}>`,
            to: order.email,
            subject: subject,
            html: await renderOrderStatusEmail(order),
            attachments,
        }

        const mailSend = await transporter.sendMail(mailOptions)

        if(!mailSend.accepted){
            console.log(mailSend.response)
            return false
        }else {
            return true
        }
    }catch(error){
        console.log("[SendStatusMail] Error: ", error)
        return false
    }
}

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

export async function findOrderBarcode(prevState: GetRefunds, formData: FormData): Promise<GetRefunds>{
    let revalidate = false;
    try{
        const nonValidate: RefundInputs = {
      search: formData.get("search") as string,
    }

    const validate = refundSchema.safeParse(nonValidate)

    if (!validate.success) {
      return {
        orders: null,
        count: 0,
        success: false,     
        input: nonValidate.search,
      }
    }

    const data = validate.data

     const order = await sanityClient.fetch<Array<Order> | null>(GET_ORDER_BY_EMAIL_OR_PHONE, {
      search: data.search,
    })

    console.log("Order:", order)

    if (!order || !order[0]._id || order.length === 0) {
      return {
        orders: null,
        count: order?.length || 0,
        success: true,     
        input: nonValidate.search,
      }
    }else{
        return{
            orders: order,
            count: order.length,
            success: true,     
            input: nonValidate.search,
        }
      }
    }catch (error) {
    console.error("[findOrderAndSendBarcode] Error:", error)
    return {
      orders: null,
        count: 0,
        success: false,     
        input: "",
    }
  }finally{
    if(revalidate) revalidatePath("/vraceni");
  }
}

export async function sendBarcode(prevState: ActionRes<RefundCode>, formData: FormData): Promise<ActionRes<RefundCode>>{
    
    try {
        const nonValidate: RefundCode = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            barcode: formData.get("barcode") as string,
            email: formData.get("email") as string,
            orderId: formData.get("orderId") as string
        }

        const validate = sendRefundCode.safeParse(nonValidate)
        
        if(!validate.success){
            return{
                success: false,
                submitted: true,
                message: "Špatná data"
            }
        }

        const data = validate.data

        const emailHtml = await renderRefundBarcodeEmail({
            firstName: data.firstName,
            lastName: data.lastName,
            barcode: data.barcode,
            orderId: data.orderId,
        })


        const emailSend = await transporter.sendMail({
            from: `"Especko.cz" <${process.env.FROM_EMAIL}>`,
            to: data.email,
            subject: "Štítek pro vrácení zásilky - Especko.cz",
            html: emailHtml,
        })
    
    if(!emailSend.accepted){
        return {
            submitted: true,
            success: false,
            message: `Vyskytla se chyba při odeslání emailu. Kontaktujte podporu.`,
            inputs: data,
        }
    }else{
        return{
            submitted: true,
            success: true,
            message: `Štítek byl odeslán na e-mail ${data.email}.`,
            inputs: data,
        }
    }
    }catch(error){
        console.log("Chyba [sendBarcode]: ", error)
        return {
            submitted: true,
            success: false,
            message: `Vyskytla se chyba na naší straně. Kontaktujte podporu`,
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
        console.log(error)
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

export async function saveReview(prevState: ActionRes<ReviewType>, formData: FormData): Promise<ActionRes<ReviewType>>{
    let revalidate = false;
    try{
        const nonValidate:ReviewType = {
            name: formData.get("name") as string,
            surname: formData.get("surname") as string,
            review: formData.get("review") as string,
            rating: String(formData.get("rating"))
        }

        const validate = reviewSchema.safeParse(nonValidate)

        if(!validate.success){
            return {
                submitted: true,
                success: false,
                message: "Nezadali jste platné údaje",
                inputs: nonValidate
            }
        }
        const data = validate.data;

        const saveRev = await sanityClient.create({
            _type: "reviews",
            name: data.name,
            surname: data.surname,
            review: data.review,
            rating: data.rating,
        })

        if(!saveRev._id){
            return {
                submitted: true,
                success: false,
                message: "Nepodařilo se uložit Vaše hodnocení, zkuste znovu",
                inputs: nonValidate
            }
        }

        return {
                submitted: true,
                success: true,
                message: "Uložili jsme Vaše hodnocení. Moc děkujeme!",
                inputs: data
        }

    }catch(error){
        console.log("Error v akci saveReview: ", error)
        return {
            submitted: true,
            success: false,
            message: "Error na naší straně, vše dáváme do pořádku, vyčkejte prosím."
        }
    }finally{
        if(revalidate){
            revalidatePath("/hodnoceni")
        }
    }
}

export async function authorizeNewsletter(prevState: ActionRes<NewsletterType>, formData: FormData): Promise<ActionRes<NewsletterType>>{
    let revalidate = false;
    try{
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

        console.log("[authorizeNewsletter] User: ", getUser);
        
        if (getUser && getUser.email === data.email) {
            return {
                submitted: true,
                success: true,
                message: "Váš e-mail máme uložený. Vyčkejte na newsletter!",
                inputs: data,
            }
        }

        const verifyUrl = `https://especko.cz/saveNewsletter?email=${encodeURIComponent(data.email)}`

    const emailHtml = await renderNewsletterVerifyEmail({
      email: data.email,
      verifyUrl,
    })

    const sendMail = await transporter.sendMail({
      from: `"Especko.cz" <${process.env.FROM_EMAIL}>`,
      to: data.email,
      subject: "Potvrďte odběr newsletteru - Especko.cz",
      html: emailHtml,
    })

    if(!sendMail.accepted){
        return{
                submitted: true,
                success: false,
                message: "Nepodařilo se odeslat e-mail. Zkuste znovu.",
        }
    }

    console.log("[authorizeNewsletter] Verification email sent to:", data.email)

        return{
                submitted: true,
                success: true,
                message: "Poslali jsme Vám e-mail pro ověření.",
            }
    }catch(error){
        console.error("[authorizeNewsletter] Error: ", error)
        return{
                submitted: true,
                success: false,
                message: "Nezdařilo se ověřit Váš e-mail. Kontaktujte podporu",            
        }
    }finally{
        if(revalidate){
            revalidatePath("/")
        }
    }
}

function generateEmailId(email: string): string {
  // Simple hash - convert email to a stable ID
  const normalized = email.toLowerCase().trim()
  let hash = 0
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return `newsletter-${Math.abs(hash).toString(36)}-${normalized.replace(/[^a-z0-9]/g, "-")}`
}

export async function saveNewsletter(email: string): Promise<ActionRes<NewsletterType>>{
    let revalidate = false;
    try{    
        const nonValidate: NewsletterType = {
            email: email
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
        console.log(data.email)

        const getUser = await sanityFetch<NewsletterType>({
            query: GET_CUR_USER,
            params: {email: data.email},
        });

        console.log("[saveNewsletter] User: ", getUser);
        
        if (getUser && getUser.email === data.email) {
            return {
                submitted: true,
                success: true,
                message: "Váš e-mail máme uložený. Vyčkejte na newsletter!",
                inputs: data,
            }
        }
        
        const writeClient = sanityClient.withConfig({
      token: process.env.SANITY_TOKEN,
    })

    // Use createIfNotExists with deterministic _id to prevent race condition duplicates
    const documentId = generateEmailId(data.email)
    
    const saveMail = await writeClient.createIfNotExists({
      _id: documentId,
      _type: "newsletter",
      email: data.email,
    })
        console.log("[saveNewsletter] Saved user: ", saveMail)

        if(!saveMail._id){
            return{
                submitted: true,
                success: false,
                message: "Nezdařilo se uložit e-mail do databáze. Zkuste znovu později.",
                inputs: data
            }
        }

        revalidate = true;

        return {
                submitted: true,
                success: true,
                message: "Uložili jsme Váš e-mail! Brzy Vás kontaktujeme s novinkami!",
        }
    }catch(error){
        console.log("Error v akci saveNewsletter: ", error)
        return {
            submitted: true,
            success: false,
            message: "Error na naší straně, vše dáváme do pořádku, vyčkejte prosím."
        }
    }finally{
        if(revalidate) revalidatePath("/saveNewsletter")
    }   
}

export async function createOrder(prevState: ActionRes<CreateOrderType>, formData: FormData): Promise<ActionRes<CreateOrderType> & CreatePaymentResponse>{
    let revalidate = false;
    let inputs = {};
    let redirectUri: string = ""
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
                country: formData.get("country") as string,
                packetaId: Number(formData.get("packetaId")),
                cod: Boolean(formData.get("cod") === "cod" ?true:false),
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
                errors: validate.error.flatten().fieldErrors,
            }
        }

        const data = validate.data;
        inputs = data;
 console.log("Cod", data.cod)
        const totalPrice: number = getTotalPrice(data.quantity) + (data.cod ? DOBIRKA_PRICE : 0) + data.deliveryPrice - data.sale
        const itemPrice: number = getUnitPrice(data.quantity)
        
        console.log(data, totalPrice, itemPrice)

        const packeta = await createPacket({
            name: data.firstName,
            surname: data.lastName,
            email: data.email,
            phone: data.phone,
            packetaId: Number(data.packetaId),
            total: totalPrice,
            cod: data.cod
        })
        console.log("Packeta:",packeta)

        const sanityData = {
            _type: "orders",
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            adr_number: data.adressNumber,
            city: data.city,
            psc: data.zip,
            country: data.country,
            total: String(totalPrice.toFixed(2)),
            couponValue:String(data.sale.toFixed(2)),
            quantity: Number(data.quantity),
            del_price: Number(data.deliveryPrice) === 0 ? true : false,
            packetaId: data.packetaId,
            status: "Přijatá",
            cod: data.cod,
            payment_status: "Nezaplacená",
            barcode: String(packeta),
            packetaAddress: data.packetaAddress,
        }
        
       
    
        const orderCreate = await sanityClient.create(sanityData)

        const orderId: string = orderCreate._id
        console.log("Objednavka vytvořena:",orderCreate)   

         if(!data.cod){
            const createPay = await comgate.createPayment(sanityData as unknown as Order, `${data.quantity}ks ESP-32 Devkit USB-C`, orderId)
            if(!createPay.success){
                const createPay = await comgate.createPayment(sanityData as unknown as Order, `${data.quantity}ks ESP-32 Devkit USB-C`, orderId)
                console.log("Comgate /create: ", createPay)
                if(!createPay.success){
                    return{
                        submitted: true,
                        success: false,
                        inputs: data,
                        message: "Selhalo vytvoření platby",
                    }
                }
            }else if(createPay.code === 0){
                redirectUri = String(createPay.redirect)
                const updateOrderTransId = await sanityClient.patch(orderId).set({trans_id: createPay.transId}).commit();
            }
        }else{
            redirectUri = String(SITE_URL+"/status/"+orderId)
        }
        
        const invoice = await ensureInvoicePdf(orderCreate as unknown as Order);
        console.log(invoice)

        const sendMail = await sendStatusMail(orderCreate as unknown as Order, "Objednávka byla přijata.", invoice.url)
        
        if(!sendMail){
            return {
                submitted: true,
                success:false,
                inputs: data,
                message: "Nepodařilo se odeslat email",
                transaction_id: orderId
            }
        }

       sendTelegramMessage("Nová objednávka: "+ data.email)

        return {
            submitted: true,
            success: true,
            inputs: data,
            message: "Objednávka proběhla",
            transaction_id: orderId,
            redirect_url: redirectUri
        }
        
    }catch(error){
        console.error("[createOrder] Error: ", error);
        return {
            submitted: true,
            success: false,
            inputs: inputs as CreateOrderType,
            message: "Problém se zpracováním platby na naší straně. Zkuste znovu později. Omlouváme se."
        }
    }finally{
        if(revalidate) revalidatePath("/checkout")
    }
}

export async function getPacketStatus(packetId: string): Promise<{ok: boolean, statusCode: number | null, message?: string}>{
    packetId = packetId.substring(2).replaceAll(" ", "")
    console.log(packetId)
    const rBody = {
        packetStatus: {
            apiPassword: process.env.PACKETA_API_PASSWORD,
            packetId: packetId
        }
    }

    try{
        const response = await fetch(
            "https://www.zasilkovna.cz/api/rest", 
        {
            method: "POST",
            body: new Builder().buildObject(rBody)
        })

        const pResponse= await new Parser({ 
            explicitArray: false 
        })
        .parseStringPromise(
            await response.text()
        );

        if(pResponse.response.status !== "ok"){
            console.error("Problém se statusem: ",pResponse.response.status)
            return {
                ok: false,
                statusCode: null,
                message: `${pResponse.response.status}`
            };
        }
        const packetStatus = Number(pResponse.response.result.statusCode)
        const codeText = String(pResponse.response.result.codeText)
        return {
            ok: true,
            statusCode: packetStatus,
            message: codeText
        };
    }catch(error){
        console.error("Error při statu packety: ", error)
        return {
                ok: false,
                statusCode: null,
                message: `${error}`
            };
    }
}

export async function createPacket({name, surname, email, phone,packetaId, total, cod}: BarcodeSend){
        let packetaCode: string = "";
        const packetaData: PacketaData = {
                number: String(`${packetaId}-${total}`).substring(0,35),
                name: name,
                surname: surname,
                email: email,
                phone: String(phone),
                addressId: packetaId,
                value: total,
                weight: 1,
                eshop: "especko",          
        }
        if(cod) packetaData.cod = total
        const rBody = {
          createPacket: {
            apiPassword: process.env.PACKETA_API_PASSWORD,
            packetAttributes: packetaData
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
        if(!packetaCode) console.error("Problém s vytvořením štítku.");
        }catch(error){
            console.error("Error při vytváření packety: ", error)
        }
    return packetaCode
    
} 

/* eslint-disable @typescript-eslint/no-explicit-any */

let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

const CHROMIUM_PACK_URL = 
  `https://especko.cz/chromium-pack.tar`

async function getChromiumPath(): Promise<string> {
  if (cachedExecutablePath) return cachedExecutablePath;

  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium.executablePath(CHROMIUM_PACK_URL).then((p) => {
      cachedExecutablePath = p;
      return p;
    });
  }

  return downloadPromise;
}

export async function generatePdf(html: string): Promise<Buffer> {
  let browser;

  try {
    const isVercel = !!process.env.VERCEL_ENV;

    let puppeteer: any;
    let launchOptions: any = { headless: true };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      puppeteer = await import("puppeteer-core");

      const executablePath = await getChromiumPath();

      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath,
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return Buffer.from(pdf);
  } finally {
    if (browser) await browser.close();
  }
}

export async function uploadPdfToSanity(
  buffer: Buffer,
  filename: string,
  id: string
) {

  const file = await sanityFetch<SanityFileAsset>({
  query: `*[_type == "sanity.fileAsset" && originalFilename == $name][0]`,
  params: { name: filename }
})

if (file) {
  console.log("File exists:", file._id)
  return {
        created: false, 
        id: file._id,
        url: file.url
    };
}  else{
const asset = await sanityClient.assets.upload("file", buffer, {
    filename,
    contentType: "application/pdf",
  });

  const updateOrderStatus = await sanityClient
                .patch(id) // _id = payment_uid
                .set({ 
                  invoice: {
                    _type: "file",
                    asset: {
                      _type: "reference",
                      _ref: asset._id,
                    },
                  }
                }).commit()
    console.log("Upload pdf to sanity: ", uploadPdfToSanity)
    return {
        created: true, 
        id: asset._id,
        url: asset.url
    };
}

  
}

export async function ensureInvoicePdf(order:Order): Promise<{created: boolean, asset_id?: string, url: string}> {
  // 1️⃣ render email
  const html = await renderInvoicePDF(order);

  // 2️⃣ generate pdf
  const pdfBuffer = await generatePdf(html);

  // 3️⃣ upload
  const assetId = await uploadPdfToSanity(
    pdfBuffer,
    `invoice-${order._id}.pdf`,
    String(order._id)
  );

  return {
        created: assetId.created,
        url: assetId.url,
        asset_id: assetId.id
  };
}