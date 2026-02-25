import { defineType, defineField } from "sanity"
import { StarIcon } from "@sanity/icons"
export const coupon = defineType({
    name: "coupons",
    title: "Kupony",
    type: "document",
    icon: StarIcon,
    fields: [
        defineField({
            type: "string",
            title:"Kód kupónu",
            name: "name", 
        }),
        defineField({
            type: "boolean",
            title:"Procenta nebo Kč",
            initialValue: false,
            name: "type", 
        }),
        defineField({
            type: "number",
            title:"Hodnota slevy",
            name: "value", 
        }),
        defineField({
            type: "boolean",
            name: "free_del",
            initialValue: false,
            title: "Poštovné zadarmo"
        }),
        defineField({
            type: "number",
            name: "min_order_val",
            title: "Minimální hodnota objednávky, od které lze uplatnit slevu",
            initialValue: 0,
            validation: (Rule) => Rule.min(0)
        }),
    ]
})