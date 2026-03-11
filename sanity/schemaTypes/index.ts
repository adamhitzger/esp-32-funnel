import { type SchemaTypeDefinition } from 'sanity'
import { review } from './reviews'
import { orders } from './orders'
import { coupon } from './coupons'
import { newsletter } from './newsletter'
import { blogSchema } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [review, orders, coupon, newsletter, blogSchema],
}
