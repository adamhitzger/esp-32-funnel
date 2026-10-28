import { EnvelopeIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"
import { CONTACT_TOPICS } from "../../server/schema"

export const contactMessage = defineType({
    type: "document",
    name: "contactMessage",
    title: "Kontaktní zprávy",
    icon: EnvelopeIcon,
    fields: [
        defineField({
            type: "boolean",
            title: "Vyřízeno",
            name: "resolved",
            initialValue: false,
        }),
        defineField({
            type: "string",
            title: "Jméno",
            name: "name",
            readOnly: true,
        }),
        defineField({
            type: "string",
            title: "E-mail",
            name: "email",
            readOnly: true,
        }),
        defineField({
            type: "string",
            title: "Téma",
            name: "topic",
            options: { list: [...CONTACT_TOPICS] },
            readOnly: true,
        }),
        defineField({
            type: "text",
            title: "Zpráva",
            name: "message",
            rows: 8,
            readOnly: true,
        }),
        defineField({
            type: "boolean",
            title: "E-mail odeslán",
            name: "emailSent",
            description: "Pokud je vypnuto, zpráva se uložila, ale e-mail na info@ neodešel.",
            readOnly: true,
        }),
        defineField({
            type: "string",
            title: "Hash IP (rate limit)",
            name: "ipHash",
            hidden: true,
            readOnly: true,
        }),
    ],
    orderings: [
        {
            title: "Nejnovější",
            name: "createdDesc",
            by: [{ field: "_createdAt", direction: "desc" }],
        },
    ],
    preview: {
        select: { name: "name", topic: "topic", resolved: "resolved", createdAt: "_createdAt" },
        prepare({ name, topic, resolved, createdAt }) {
            const date = createdAt ? new Date(createdAt).toLocaleString("cs-CZ") : ""
            return {
                title: `${resolved ? "✓ " : ""}${name ?? "Bez jména"}`,
                subtitle: [topic, date].filter(Boolean).join(" · "),
            }
        },
    },
})
