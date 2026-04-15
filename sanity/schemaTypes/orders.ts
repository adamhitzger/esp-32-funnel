import { PackageIcon } from "@sanity/icons"
import {  defineField, defineType} from "sanity"

export const orders = defineType({
    type: "document",
    name: "orders",
    title: "Objednávky",
    icon: PackageIcon,
    fields: [
        defineField({
            type: "string",
            title: "Jméno",
            name: "firstName"
        }),
        defineField({
            type: "string",
            title: "Přijmení",
            name: "lastName"
        }),
        defineField({
            type: "string",
            title: "Email",
            name: "email"
        }),
        defineField({
            type: "string",
            title: "Tel. číslo",
            name: "phone"
        }),
        defineField({
            type: "string",
            title: "Ulice",
            name: "address"
        }),
        defineField({
            type: "string",
            title: "Č. popisné",
            name: "adr_number"
        }),
        defineField({
            type: "string",
            title: "Město",
            name: "city"
        }),
        defineField({
            type: "string",
            title: "PSČ",
            name: "psc"
        }),
        defineField({
            type: "string",
            title: "Země",
            name: "country"
        }),
         defineField({
            type: "number",
            title:"Množství esPÉČEK",
            name: "quantity", 
            validation: rule => rule.positive().integer().min(0),
        }),
        defineField({
            type: "string",
            title:"Celková cena",
            name: "total",
        }),
        defineField({
            type: "string",
            title:"Hodnota kuponu",
            name: "couponValue",
        }),
        defineField({
            type: "boolean",
            title:"Doprava zdarma",
            name: "del_price",
        }),
        defineField({
            type: "number",
            title:"ID Pick-up pointu",
            name: "packetaId", 
            validation: rule => rule.positive().integer().min(0),
        }),
        defineField({
            type: "string",
            title:"Adresa Pick-up pontu",
            name: "packetaAddress",
        }),
       
        defineField({
            type: "string",
            title:"Štítek ze Zásilkovny",
            name: "barcode", 
        }),
        defineField({
            type: "string",
            title:"Status objednávky",
            name: "status", 
            options: {
                list: ["Přijatá","Odeslaná", "Vyzvednutá", "Zrušená", "Vrácená"],
                layout: "dropdown",
            }
        }),
        defineField({
            type: "string",
            title:"Status platby",
            name: "payment_status", 
            options: {
                list: ["Zaplacená","Nezaplacená"],
                layout: "dropdown",
            }
        }),  
        defineField({
            type: "boolean",
            title:"Dobírka",
            name: "cod", 
        }), 
        defineField({
            type: "string",
            title:"Comgate ID",
            name: "trans_id", 
        }),
        defineField({
            type: "file",
            title:"Faktura",
            name: "invoice", 
        }),
    ]
})