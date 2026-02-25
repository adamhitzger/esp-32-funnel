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
            type: "number",
            title:"Celková cena",
            name: "total",
            validation: rule => rule.positive().integer().min(0), 
        }),
        defineField({
            type: "number",
            title:"Hodnota kuponu",
            name: "couponValue",
            validation: rule => rule.positive().integer().min(0), 
        }),
        defineField({
            type: "boolean",
            title:"Hodnota dopravy",
            name: "del_price",
        }),
        defineField({
            type: "number",
            title:"ID Zásilkovny",
            name: "packetaId", 
            validation: rule => rule.positive().integer().min(0),
        }),
        defineField({
            type: "string",
            title:"Štítek ze Zásilkovny",
            name: "barcode", 
        }),
        defineField({
            type: "string",
            title:"Status",
            name: "status", 
            options: {
                list: ["Přijatá", "Zaplacená" ,"Odeslaná", "Vyzvednutá", "Zrušená", "Vrácení"],
                layout: "dropdown",
            }
        }),  
        defineField({
            type: "file",
            title:"Faktura",
            name: "invoice", 
        }),
    ]
})