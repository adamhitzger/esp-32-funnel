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

export const GET_ORDER_BY_EMAIL_OR_PHONE = groq`*[_type=="orders" && (email == $search || phone == $search)] | order(_createdAt desc){
  _id,
  firstName,
  lastName,
  email,
  phone,
  barcode,
  status,
  _createdAt
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
    trans_id,
    payment_status,
    cod,
    couponValue,
    del_price,
    packetaId,
    packetaAddress,
    payment_status,
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

export const GET_PAID_ORDERS = groq`*[_type=="orders" && status != "Vrácená" && status != "Zrušená" && status != "Vyzvednutá"]{
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
    trans_id,
    payment_status,
    cod,
    country,
    packetaId,
    packetaAddress,
    "invoice": invoice.asset->url,
    barcode,
    status
}`

export const GET_HOME_ARTICLES = groq`*[_type == "article"] | order(datum desc)[0...3] {
      _id,
      heading,
      category-> {
    _id,
    name,
    slug,
  },
      slug,
      datum,
      "image": image.asset->url,
      description
    }`

export const GET_ARTICLE_CATEGORIES_BY_PAGE = groq`*[_type == "article_category"][$start...$end] {
        _id,
        name,
        slug,
        "image": image.asset->url,
        description
      }`

export const GET_ARTICLES_BY_PAGE = groq`*[_type == "article" && category->slug.current == $category] | order(datum desc) [$start...$end] {
        _id,
        heading,
        slug,
        datum,
        image,
        description
      }`

export const ARTICLES_COUNT = groq`count(*[_type == "article" && category->slug.current == $category])`

export const ARTICLE_CATEGORIES_COUNT = groq`count(*[_type == "article_category"])`

export const GET_ARTCILE_BY_SLUG = groq`*[_type == "article" && slug.current == $slug][0] {
      _id,
      heading,
      slug,
     category-> {
    _id,
    name,
    slug,
  },
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
    trans_id,
    payment_status,
    cod,
    packetaId,
    packetaAddress,
    barcode,
    status,
    "invoice":invoice.asset->url
}`