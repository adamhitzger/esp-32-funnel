
import { ComgateClientConfig, ComgateCreateResponse, ComgateStatusResponse, ComgateWebhook, Order } from "@/types";
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

    private createSignature(): string{
        const authHash = Buffer.from(`${this.merchant}:${this.secret}`).toString('base64');
        return `Basic ${authHash}`
    }

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
                    url_paid:`https://especko.cz/status/${order_id}`,
                    url_cancelled:`https://especko.cz/checkout/error`,
                    url_pending:`https://especko.cz/status/${order_id}`, 
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

    //cancel

    //status
    
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