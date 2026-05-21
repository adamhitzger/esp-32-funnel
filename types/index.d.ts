import type { PortableTextBlock } from "next-sanity";

export interface ActionRes<T> {
    success: boolean;
    submitted: boolean;
    message: string;
    inputs?: T;
    errors?: {
        [K in keyof T]?: string[];
    } 
}

export interface ArticleCategory {
  _id: string;
  name: string;
  slug: { current: string };
  image: string;
  description: string
}

export interface SanityMetadata { 
    _id: string;
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: "newsletter" | "orders" | "reviews" | "coupons",
    _updatedAt: string,
}

export interface Coupon {
    name:string;
    type: boolean;
    value:number;
    free_del: boolean;
    min_order_value: number;
}

export type Coupons = Array<Coupon>
export type GetProjects = Array<GetProject>

export type CaptchaData =
  | {
      success: true;
      challenge_ts: string;
      hostname: string;
      score: number;
      action: string;
    }
  | {
      success: false;
      "error-codes": ErrorCodes[];
    };

export type ErrorCodes =
  | "missing-input-secret"
  | "invalid-input-secret"
  | "missing-input-response"
  | "invalid-input-response"
  | "bad-request"
  | "timeout-or-duplicate";

export interface CreatePaymentResponse {
  transaction_id?: string;
  redirect_url?: string
}

export interface SanityFileAsset {
  _createdAt: string
  _id: string
  _originalId?: string
  _rev: string
  _type: "sanity.fileAsset"
  _updatedAt: string

  assetId: string
  extension: string
  mimeType: string
  originalFilename: string
  path: string
  sha1hash: string
  size: number
  uploadId?: string
  url: string
}
export interface Article {
  _id: string;
  heading: string;
  category: ArticleCategory
  slug: { current: string };
  datum: string;
  image: any;
  description: string;
  content: PortableTextBlock[];
}

export interface BarcodeSend {
    email: string;
    name: string;
    surname: string;
    phone: string;
    packetaId: number;
    total: number;
    cod: boolean
}

export interface PacketaData  {
 "number":string,
  name: string,
  surname: string,
  email: string,
  phone: string,
  addressId: number,
  value: number,
  weight: number,
  eshop: "especko",
  cod?: number | undefined
  }

export interface EnVars {
  ersteRefToken: string
}

export type OrderStatuses = "Přijatá" | "Odeslaná" | "Připraveno k odeslání" | "Odeslaná do cílové destinace" | "Připravena k vyzvednutí" | "Vyzvednutá" | "Zrušená" | "Vrácená"

export interface Order {
  _type?: string;
  _rev?: string;
  _id?: string;
  _createdAt: string;
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  adr_number: string
  city: string
  psc: string
  quantity: number
  total: string
  barcode: string
  couponValue: string | null
  del_price: boolean
  country: string
  packetaId: string | null
  packetaAddress: string | null
  status: OrderStatuses;
  trans_id: string;
  cod: boolean;
  payment_status: "Zaplacená" | "Nezaplacená";
  invoice?: string | null;
  dobropis?: string | null; 
}

export interface GetRefunds{
  orders: Array<Order>  | null , 
  count: number, 
  success: boolean, 
  input: string
}

//Comgate

export interface ComgateClientConfig {
    merchant: string;
    secret: string;
    language: "cs" |"de"|"sk"|"pl"
    country: "AT"|  "BE"|  "CY"|  "CZ"|  "DE"|  "EE"|  "EL"|  "ES"|  "FI"|  "FR"|  "GB"|  "HR"|  "HU"|  "IE"|  "IT"|  "LT"|  "LU"|  "LV"|  "MT"|  "NL"|  "NO"|  "PL"|  "PT"|  "RO"|  "SI"|  "SK"|  "SE"|  "US" | "ALL";
    test: boolean;
    baseUrl:"https://payments.comgate.cz/v2.0/";
    currency: "CZK" | "EUR" | "PLN" | "HUF" | "USD" | "GBP" | "RON" | "NOK" | "SEK";
    delivery: "HOME_DELIVERY" | "PICKUP" | "ELECTRONIC_DELIVERY";

}

export interface ComgateCreateResponse {
  code: number;
  message: string;
  transId?: string;
  redirect?: string;
  applepay?: string;
  applepayMessage?: string;
  success: boolean;
}

export interface ComgateWebhook {
  transId: string;
  merchant: string;
  test: string;
  price: string;
  curr: string;
  label: string;
  refId: string;       // tvoje order_id
  email: string;
  status: 'PAID' | 'CANCELLED' | 'AUTHORIZED';
  secret: string;
  method?: string;
  fee?: string;
}

export type PaymentErrorReason =
  | 'CUSTOMER_CLICK'
  | 'FRAUD_SUSPECTED'
  | 'ESHOP_CANCELLED'
  | 'PROVIDER_REPORT'
  | 'PROVIDER_TIMEOUT'
  | 'CUSTOMER_TIMEOUT'
  | 'ACS_TIMEOUT'
  | 'INVALID_CARDNO_EXPIRY'
  | 'INVALID_CVC'
  | 'LIMIT_EXCEEDED'
  | 'NO_FUNDS'
  | 'REJECTED_BY_BANK'
  | '3DS_AUTH_FAIL'
  | 'BANK_TIMEOUT'
  | 'BANK_FORBIDDEN'
  | 'TRANSACTION_CANCELLED'
  | '3RDPART_APP_LIMIT_EXCEEDED'
  | 'UNAVAILABLE'
  | 'BAD_ACCOUNT_TYPE'
  | 'NOT_SPECIFIED';

export type AppliedFeeType =
  | 'EU_UNREGULATED'
  | 'NON_EU_BUSINESS'
  | 'NON_EU_CONSUMER'
  | 'EU_CONSUMER';

export type PaymentStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'AUTHORIZED';

export type ComgateStatusCode = 0 | 1100 | 1200 | 1400 | 1500;

export interface ComgateStatusError {
  code: Exclude<ComgateStatusCode, 0>;
  message: string;
}

export interface ComgateRefund {
  code: ComgateStatusCode;
  message: string;
}

export interface ComgateStatusSuccess {
  code: 0;
  message: string;
  test: 'true' | 'false';
  price: string;
  curr: string;
  label: string;
  refId: string;
  email: string;
  transId: string;
  status: PaymentStatus;
  payerId?: string;
  method?: string;
  account?: string;
  name?: string;
  phone?: string;
  payerName?: string;
  payerAcc?: string;
  fee?: string;
  vs?: string;
  cardValid?: string;
  cardNumber?: string;
  appliedFee?: number;
  appliedFeeType?: AppliedFeeType;
  paymentErrorReason?: PaymentErrorReason;
}

export type ComgateStatusResponse = ComgateStatusSuccess | ComgateStatusError;