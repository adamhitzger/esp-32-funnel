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
    country: z.string().min(1, { message: "Země je povinná" }).trim(),
    packetaId: z.number(),
    cod: z.boolean(),
    quantity: z.number().int().min(1).max(99),
    coupon: z.string().trim().optional(),
    packetaAddress: z.string(),
    consent: z.boolean().refine((v) => v, {message: "Pro dokončení objednávky musíte souhlasit s obchodními podmínkami"}),
    newsletterConsent: z.boolean()
});

export const reviewSchema = z.object({
    name: z.string().min(1, {message: "Jméno je povinné"}).trim(),
    surname: z.string().min(1, {message: "Přijmení je povinné"}).trim(),
    review: z.string().min(1, {message: "Zpráva je povinná"}).trim(),
    rating: z.string().min(1, {message: "Hodnocení je povinné"}).trim()
})

export const refundSchema = z.object({
  search: z.string().min(1, { message: "Zadejte e-mail nebo telefonní číslo" }).trim(),
})

export const sendRefundCode = z.object({
    firstName:z.string().min(1, {message: "Jméno je povinné"}).trim(),
      lastName: z.string().min(1, {message: "Přijmení je povinné"}).trim(),
      barcode: z.string().min(1, {message: "Zásilkovna kód je povinný"}).trim(),
      orderId: z.string().min(1, {message: "OrderId je povinné"}).trim(),
      email: z.string().email().min(1, {message: "E-mail je povinný"}).trim()
})

export const CONTACT_TOPICS = ["Dotaz k produktu", "Objednávka", "Spolupráce", "Jiné"] as const
export const CONTACT_MESSAGE_MIN = 10
export const CONTACT_MESSAGE_MAX = 3000

// Sdílí formulář (limity polí) i server action (validace)
export const contactSchema = z.object({
    name: z.string().trim().min(2, {message: "Zadejte své jméno"}).max(100, {message: "Jméno je příliš dlouhé"}),
    email: z.string().trim().min(1, {message: "E-mail je povinný"}).email({message: "Zadejte platný e-mail"}),
    topic: z.enum(CONTACT_TOPICS, {message: "Vyberte téma zprávy"}),
    message: z.string().trim()
        .min(CONTACT_MESSAGE_MIN, {message: `Zpráva musí mít alespoň ${CONTACT_MESSAGE_MIN} znaků`})
        .max(CONTACT_MESSAGE_MAX, {message: `Zpráva může mít nejvýše ${CONTACT_MESSAGE_MAX} znaků`}),
    consent: z.literal("on", {errorMap: () => ({message: "Bez souhlasu vám nemůžeme odpovědět"})}),
    website: z.string().optional(), // honeypot
})

// Hodnoty tak, jak přišly z formuláře (pro vrácení do polí při chybě)
export type ContactType = { [K in keyof z.input<typeof contactSchema>]?: string }
export type RefundCode = z.infer<typeof sendRefundCode>
export type RefundInputs = z.infer<typeof refundSchema>
export type ReviewType = z.infer<typeof reviewSchema>
export type CreateOrderType = z.infer<typeof orderSchema>
export type NewsletterType = z.infer<typeof newsletterSchema>