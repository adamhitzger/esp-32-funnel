import { defineType, defineField } from "sanity";

export const enVars = defineType({
    title: "Env",
    name: "env",
    type: "document",
    fields: [
        defineField({
            type: "string",
            title: "Erste refresh token",
            name: "ersteRefToken",
            readOnly: true,
        }),
    ],
})