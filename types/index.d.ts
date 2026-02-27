export interface ActionRes<T> {
    success: boolean;
    submitted: boolean;
    message: string;
    inputs?: T;
    errors?: {
        [K in keyof T]?: string[];
    } 
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


export type ThePayEnv = "test" | "prod";

export interface ThePayConfig {
  merchantId: string;
  apiPassword: string;
  projectId: string;
  language: "cs" | "sk" | "en" | "de"
  env?: ThePayEnv;
}

export interface GetProject {
    project_id: number;
    project_url: string;
    account_iban: string;
}

export interface CreatePaymentResponse {
  pay_url: string;
  detail_url: string;
}

export interface RefundRequest {
  paymentId: number;
  amount: number;
}

export type ThePayPaymentState =
  | "expired"
  | "paid"
  | "partially_refunded"
  | "refunded"
  | "preauthorized"
  | "preauth_cancelled"
  | "preauth_expired"
  | "waiting_for_payment"
  | "waiting_for_confirmation"
  | "error";

export interface ThePayPayment {
  uid: string;
  project_id: number;
  order_id: string;
  state: ThePayPaymentState;
  currency: string;
  amount: number;
  paid_amount: number;
  created_at: string;
  finished_at: string | null;
  valid_to: string;
  fee: number;
  description: string;
  description_for_merchant: string;
  payment_method: string;
  pay_url: string;
  detail_url: string;
  customer: ThePayCustomer;
  offset_account: ThePayOffsetAccount | null;
  offset_account_status: string;
  offset_account_determined_at: string | null;
  card: ThePayCard | null;
  variable_symbol: string;
  events: ThePayEvent[];
  parent: ThePayParent;
}

export interface ThePayCustomer {
  name: string;
  ip: string;
  email: string;
}

export interface ThePayOffsetAccount {
  iban: string;
  owner_name: string;
}

export interface ThePayCard {
  number: string;
  expiration_date: string;
  brand: string;
  type: string;
}

export interface ThePayEvent {
  occured_at: string;
  type: string;
  data: string;
}

export interface ThePayParent {
  recurring_payments_available: boolean;
}

export interface BarcodeSend {
    email: string;
    name: string;
    surname: string;
    phone: string;
    packetaId: number;
    total: number;
    uid: string
}