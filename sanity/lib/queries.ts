import { groq } from "next-sanity";

export const GET_CUR_USER = groq`*[_type == "newsletter" && email == $email][0]{
    _id,
    email
}`

export const GET_COUPON = groq`*[_type=="coupons" && name == $name][0]{
    free_del,
    name,
    type,
    value,
    min_order_value
}`