import * as z from "zod"

const phoneRegex = new RegExp(/^(\+420\s?)?[67]\d{2}\s?\d{3}\s?\d{3}$/)
const pscRegex = new RegExp(/^\d{3}\s?\d{2}$/)

export const newsletterSchema = z.object({
    email: z.string().email().min(1, {message: "E-mail je povinný"}).trim()
});

export const orderSchema = z.object({
    email: z.string().email().min(1, {message: "E-mail je povinný"}).trim(),
    phone: z.string().trim().regex(phoneRegex, {
      message: "Nesprávný formát tel. čísla",
    }),
    firstName: z.string().min(1, {message: "Jméno je povinné"}).trim(),
    lastName: z.string().min(1, {message: "Přijmení je povinné"}).trim(),
    address: z.string().trim().min(1,{message: "Adresa je povinná"}),
    city: z.string().min(1, { message: "Město je povinný" }).trim(),
    adressNumber: z.string().min(1, { message: "Číslo popisné je povinné" }).trim(),
    zip: z.string().regex(pscRegex, {
        message: "Zadali jste PSČ v nesprávném formátu"
    }).min(5,{message: "PSČ je povinné"}).trim(),
    packetaId: z.number(),
    deliveryPrice: z.number(),
    quantity: z.number(), 
    sale: z.number(),
    packetaAddress: z.string()
});

export type CreateOrderType = z.infer<typeof orderSchema>
export type NewsletterType = z.infer<typeof newsletterSchema>