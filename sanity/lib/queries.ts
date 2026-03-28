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

export const GET_ORDER_BY_ID = groq`*[_type=="orders" && _id == $id][0]{
    _id,
    _rev,
    firstName,
    lastName,
    email,
    phone,
    address,
    adr_number,
    city,
    psc,
    quantity,
    total,
    ks,
    vs,
    couponValue,
    del_price,
    packetaId,
    packetaAddress,
    status,
    country,
    barcode,
    "invoice":invoice.asset->url
}`

export const GET_REVIEWS = groq`*[_type=="reviews"] | order(_createdAt desc)[0...10]{
  _id,
  name,
  surname,
  review,
  rating,
  _createdAt
}`

export const GET_PAID_ORDERS = groq`*[_type=="orders" && status != "Vrácená" && status != "Zrušená" && status != "Vyzvednutá" && status != "Přijatá"]{
    _id,
    _rev,
    firstName,
    lastName,
    email,
    phone,
    address,
    adr_number,
    city,
    psc,
    quantity,
    total,
    couponValue,
    del_price,
    ks,
    vs,
    packetaId,
    packetaAddress,
    "invoice": invoice.asset->url,
    barcode,
    status
}`

export const GET_HOME_ARTICLES = groq`*[_type == "article"] | order(datum desc)[0...3] {
      _id,
      heading,
      slug,
      datum,
      "image": image.asset->url,
      description
    }`

export const GET_ARTICLES_BY_PAGE = groq`*[_type == "article"] | order(datum desc) [$start...$end] {
        _id,
        heading,
        slug,
        datum,
        image,
        description
      }`

export const ARTICLES_COUNT = groq`count(*[_type == "article"])`

export const GET_ARTCILE_BY_SLUG = groq`*[_type == "article" && slug.current == $slug][0] {
      _id,
      heading,
      slug,
      datum,
      image,
      description,
      content
    }`

export const GET_UNPAID_ORDERS = groq`*[_type=="orders" && status == "Přijatá"]{
    _id,
    _rev,
    firstName,
    lastName,
    email,
    phone,
    address,
    adr_number,
    city,
    psc,
    quantity,
    total,
    couponValue,
    del_price,
    ks,
    vs,
    packetaId,
    packetaAddress,
    barcode,
    status,
    "invoice":invoice.asset->url
}`