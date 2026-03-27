import { StarIcon } from "@sanity/icons"
import { defineField, defineType} from "sanity"

export const review = defineType({
    type: "document",
    name: "reviews",
    title: "Hodnocení",
    icon: StarIcon,
    fields: [
        defineField({
            type: "string",
            title:"Jméno",
            name: "name", 
        }),
        defineField({
            type: "string",
            title:"Přijmení",
            name: "surname", 
        }),
        defineField({
            type: "string",
            title:"Hodnocení",
            name: "review", 
        }),
        defineField({
            type: "string",
            title:"Počet hvězd",
            name: "rating", 
        }),
    ]
})