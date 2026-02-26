import crypto from "crypto"
import axios, {AxiosError, AxiosInstance} from "axios"
import { CreatePaymentResponse, GetProjects, ThePayConfig, ThePayPayment } from "@/types";
import { Currency } from "lucide-react";
import { CreateOrderType } from "../schema";
import { normalizePhone } from "@/lib/utils";
import Error from "next/error";

const BASE_URLS = {
  prod: "https://api.thepay.cz",
  test: "https://demo.api.thepay.cz",
};

const GATE_URLS = {
  prod: "https://gate.thepay.cz",
  test: "https://demo.gate.thepay.cz",
};


export class ThePayClient {
    private axios: AxiosInstance;
    private merchantId: string;
    private apiPassword: string;
    private baseUrl: string;
    private projectId: string;
    private gateUrl: string;

    constructor(config: ThePayConfig) {
        this.merchantId = config.merchantId;
        this.apiPassword = config.apiPassword;
        this.baseUrl = BASE_URLS[config.env ?? "prod"];
        this.projectId = config.projectId;
        this. gateUrl = GATE_URLS[config.env ?? "prod"];
        
        this.axios = axios.create({
            baseURL: this.baseUrl,
            timeout: 15000,
        });
    }

    private createSignature(): {hash:string, date: string} {
        const date = new Date().toUTCString();
        const signature: string = `${this.merchantId}${this.apiPassword}${date}`;
        const hash =  crypto.createHash("sha256").update(signature, "utf8").digest("hex")
        return {
            hash,
            date
        }
    }

    public async getProjects(): Promise<GetProjects | undefined> {

        try{
        const { hash, date } = this.createSignature();
        const response = await this.axios.get("/v1/projects", {
                params: {
                    merchant_id: this.merchantId
                },
                headers: {
                    Signature: hash,
                    SignatureDate: date,
                    "Content-Type": "application/json"
                }
            })
            console.log("[ThePay] getProjects: ", response.data) 
            return response.data as GetProjects;
        }catch(error){
            console.error("[ThePay] getProjects error: ", error)
            throw error
        }
    }

    public async getPaymentDetail(uid: string): Promise<ThePayPayment| undefined> {

        try{
        const { hash, date } = this.createSignature();
        const response = await this.axios.get(`/v1/projects/${this.projectId}/payments/${uid}`, {
                params: {
                    merchant_id: this.merchantId
                },
                headers: {
                    Signature: hash,
                    SignatureDate: date,
                    "Content-Type": "application/json"
                }
            })
            console.log("[ThePay] getPaymentDetail: ", response.data) 
            return response.data as ThePayPayment;
        }catch(error){
            console.error("[ThePay] getPaymentDetail error: ", error)
            throw error
        }
    }

    public async createPayment(
        amount: string, 
        uid: string,//sanity order._id
        order: CreateOrderType, 
        itemPrice: string): Promise<CreatePaymentResponse | undefined> {
        try{
            const {hash, date} = await this.createSignature();
            

            const res = await this.axios.post(`/v1/projects/${this.projectId}/payments`,
                {
                    amount: (Number(amount) * 100).toString(),
                    currency_code: "CZK",
                    uid: uid,
                    order_id: uid,
                    language_code: "cs",
                    return_url: `https://especko.cz/status/${uid}`,
                    notif_url: "https://especko.cz/api/thepay",
                    customer: {
                        name: order.firstName,
                        surname: order.lastName,
                        email: order.email,
                        phone: normalizePhone(order.phone),
                        shipping_address: {
                            country_code: "CZ",
                            city: order.city,
                            zip: order.zip,
                            street: `${order.address} ${order.adressNumber}`
                        }
                    },
                    items: [
                        {
                            type: "item",
                            name: "ESP32 Devkit",
                            count: order.quantity,
                            total_price: Number(itemPrice)*100
                        },
                        {
                                type: "item",
                                name: "Doprava",
                                count: 1,
                                total_price: order.deliveryPrice*100
                        }
                    ]
                },
                {
                params: {
                    merchant_id: this.merchantId
                },
                headers: {
                    Signature: hash,
                    SignatureDate: date,
                    "Content-Type": "application/json"
                }
            })
            console.log(amount)
            console.log("[ThePay] createPayment: ", res.data)
            return res.data as CreatePaymentResponse       
        }catch(error){
            const e = error as AxiosError
            console.error("[ThePay] createPayment error response: ", e.response);
            console.error("[ThePay] createPayment error status: ", e.response?.status);
            console.error("[ThePay] createPayment error status text: ", e.response?.statusText);
            console.error("[ThePay] createPayment error message: ", e.message);
            throw error
        }
    }

    public async createRefund(
        amount: number,
        uid: string,
        reason: string,
    ): Promise<number | undefined>{
        try{
        const { hash, date } = this.createSignature();
        const response = await this.axios.post(`/v1/projects/${this.projectId}/payments/${uid}/refund`, 
            {
                amount: amount,
                reason: reason
            },
            {
                params: {
                    merchant_id: this.merchantId
                },
                headers: {
                    Signature: hash,
                    SignatureDate: date,
                    "Content-Type": "application/json"
                }
            })
            console.log("[ThePay] getProjects: ", response.status) 
            return response.status as number;
        }catch(error){
            console.error("[ThePay] getProjects error: ", error)
            throw error
        }
    }
}

export const thePayClient = new ThePayClient({
    merchantId: process.env.THEPAY_MERCHANT_ID as string,
    apiPassword: process.env.THEPAY_PASSWORD as string,
    projectId: process.env.THEPAY_PROJECT_ID as string,
    env: "test"
})