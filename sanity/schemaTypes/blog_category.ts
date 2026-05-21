import { defineType, defineField } from "sanity";

export const articleCategorySchema = defineType({
    title: "Kategorie článků",
    name: "article_category",
    type: "document",
    fields: [
        defineField({
            type: "string",
            title: "Název",
            name: "name",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            }
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Obrázek",
        }),
        defineField({
            name: "description",
            type: "string",
            title: "Popis",
            validation: (rule) => rule.max(200)
        })
    ],
})