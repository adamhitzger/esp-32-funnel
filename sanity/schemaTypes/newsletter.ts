import {defineField, defineType} from 'sanity'
import { BugIcon} from "@sanity/icons"


export const newsletter = defineType({
    type: "document",
    name: "newsletter",
    title: "Newsletter",
    icon: BugIcon,
    fields: [
        defineField({
                type: "string",
                title:"Email účtu",
                name: "email", 
        }),
    ]
})