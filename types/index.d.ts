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
    uid: string;
}

export interface EnVars {
  ersteRefToken: string
}

export interface Order {
  _rev: string;
  _id: string;
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
  ks: string
  vs: string
  country: string
  packetaId: string | null
  packetaAddress: string | null
  status: string;
  invoice: string | null
}