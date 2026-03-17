import { type SchemaTypeDefinition } from 'sanity'
import { review } from './reviews'
import { orders } from './orders'
import { coupon } from './coupons'
import { newsletter } from './newsletter'
import { blogSchema } from './blog'
import { enVars } from './env'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [review, orders, coupon, newsletter, blogSchema, enVars],
}
