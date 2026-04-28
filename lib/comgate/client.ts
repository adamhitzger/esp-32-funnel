
import { ComgateClientConfig, ComgateCreateResponse, ComgateRefund, ComgateStatusResponse, ComgateWebhook, Order } from "@/types";
import axios, {AxiosError, AxiosInstance} from "axios"


export class ComgateRestClient {
    private axios: AxiosInstance;
    private merchant: string;
    private test: boolean;
    private secret: string;
    private language: string;
    private baseUrl: string;
    private country: string
    private currency: string;
    private delivery: string;


    constructor(config: ComgateClientConfig){
        this.merchant= config.merchant
        this.secret = config.secret
        this.test = config.test
        this.language = config.language
        this.baseUrl = config.baseUrl
        this.country = config.country
        this.currency = config.currency
        this.delivery = config.delivery
     
        this.axios = axios.create({
            baseURL: this.baseUrl,
            timeout: 15000,
        });
    }

    //signature hash
    private createSignature(): string{
        const authHash = Buffer.from(`${this.merchant}:${this.secret}`).toString('base64');
        return `Basic ${authHash}`
    }

    //status
    public async statusOfPayment(transId: string): Promise<ComgateStatusResponse> {
        const res = await this.axios.get(`payment/transId/${transId}.json`,{
            headers: { 'Authorization': this.createSignature() },
        });

        return res.data
    }

    public async createPayment(order: Order, label: string, order_id: string): Promise<ComgateCreateResponse>
    {
        try{
            
            const response = await this.axios.post(`payment.json`,
                {
                    test: this.test,
                    country: this.country,
                    price: Number(order.total)*100,
                    curr: this.currency,
                    label: label,
                    refId: order_id,
                    method: "ALL",
                    email: order.email,
                    phone: order.phone,
                    fullname: `${order.firstName} ${order.lastName}`,
                    billingAddrCity: order.city,
                    billingAddrStreet: `${order.address} ${order.adr_number}`,
                    billingAddrPostalCode: order.psc,
                    billingAddrCountry: order.country,
                    delivery: this.delivery,
                    lang: this.language,
                },
                {
                    headers: {
                        "Authorization": this.createSignature()
                    }
                }
            )
            console.log("Comgate API /create:",response.data)
            return {
                ...response.data,
                success: response.data.code === 0
            };
        }catch(error){
            return {
                code: 1500,
                message: error instanceof Error ? error.message : 'Neočekávaná chyba',
                success: false,
            }
        }
    }

    //refund
    public async refundOrderById(trans_id: string, amount: number, refId: string): Promise<ComgateRefund>{
        try{
            const request = await this.axios.post(`refund.json`, {
                "transId": trans_id,
                "amount": amount*100,
                "test": true,//this.test,
                "refId": refId
                }, {
                    headers: {
                        "Authorization": this.createSignature()    
                    }
                }
            )
            console.log("Comgate API /refund:",request.data)
            return{
                ...request.data
            }
        }catch(error){
            console.log(error)
            return{
               code: 1500,
                message: error instanceof Error ? error.message : 'Neočekávaná chyba',
            }
        }

    }
}

export const comgate = new ComgateRestClient({
    merchant: process.env.COMGATE_MERCHANT_ID as string,
    secret: process.env.COMGATE_API_PASSWORD as string, 
    language: "cs",
    country: "CZ",
    test: false,
    currency: "CZK",
    delivery: "PICKUP",
    baseUrl: "https://payments.comgate.cz/v2.0/"
})