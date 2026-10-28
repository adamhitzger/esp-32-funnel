"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { ActionRes } from "@/types"
import { CONTACT_MESSAGE_MAX, CONTACT_MESSAGE_MIN, CONTACT_TOPICS, ContactType } from "@/server/schema"
import { sendContactMessage } from "@/server/action"
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/utils"

const actionState: ActionRes<ContactType> = {
  message: "",
  submitted: false,
  success: false
}

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 aria-invalid:border-red-400/60 transition-all"

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null
  return (
    <p id={id} className="text-xs text-red-400 mt-1">
      {errors[0]}
    </p>
  )
}

export function ContactSection() {
  const [state, action, isPending] = useActionState(sendContactMessage, actionState)
  const errors = state.errors ?? {}
  const values = state.inputs ?? {}

  return (
    <section id="kontakt" className="py-24 relative overflow-hidden scroll-mt-8">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-6">
            <Mail className="w-4 h-4 text-electric-cyan" />
            <span className="text-sm font-mono text-muted-foreground">{"Kontakt"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {"Máte dotaz? "}
            <span className="text-electric-cyan">{"Napište nám"}</span>
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            {"Poradíme s výběrem, objednávkou i s vaším projektem. Odpovídáme do 24 hodin."}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact details */}
          <div className="lg:col-span-2 rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-8 h-fit">
            <h3 className="text-xl font-semibold text-foreground mb-6">{"Kontaktní údaje"}</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">{"E-mail"}</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground hover:text-electric-cyan transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">{"Telefon"}</p>
                  <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-foreground hover:text-electric-cyan transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">{"Doba odpovědi"}</p>
                  <p className="text-foreground">{"do 24 hodin"}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">{"Provozovatel"}</p>
                  <p className="text-foreground">
                    {"Adam Hitzger, IČO: 19712049"}
                    <br />
                    {"Ledečská 2984, 580 01 Havlíčkův Brod"}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-8 shadow-[0_0_60px_rgba(0,200,255,0.1)]">
            <form action={action} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-muted-foreground mb-1.5">
                    {"Jméno"}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Jan Novák"
                    defaultValue={values.name}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClass}
                  />
                  <FieldError id="contact-name-error" errors={errors.name} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-muted-foreground mb-1.5">
                    {"E-mail"}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vas@email.cz"
                    defaultValue={values.email}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass}
                  />
                  <FieldError id="contact-email-error" errors={errors.email} />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-sm text-muted-foreground mb-1.5">
                  {"Téma"}
                </label>
                {/* key: select při resetu formuláře nepřebírá nový defaultValue, proto ho vytvoříme znovu */}
                <select
                  key={values.topic || "default"}
                  id="contact-topic"
                  name="topic"
                  defaultValue={values.topic || CONTACT_TOPICS[0]}
                  aria-invalid={!!errors.topic}
                  aria-describedby={errors.topic ? "contact-topic-error" : undefined}
                  className={inputClass}
                >
                  {CONTACT_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <FieldError id="contact-topic-error" errors={errors.topic} />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm text-muted-foreground mb-1.5">
                  {"Zpráva"}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  minLength={CONTACT_MESSAGE_MIN}
                  maxLength={CONTACT_MESSAGE_MAX}
                  placeholder="S čím vám můžeme pomoct?"
                  defaultValue={values.message}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${inputClass} h-auto py-3 resize-none`}
                />
                <FieldError id="contact-message-error" errors={errors.message} />
              </div>

              {/* Honeypot – skryté pole pro boty */}
              <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">{"Web"}</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <input
                    name="consent"
                    type="checkbox"
                    required
                    defaultChecked={values.consent === "on"}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                    className="mt-0.5 w-4 h-4 shrink-0 accent-[var(--electric-cyan)]"
                  />
                  <span>
                    {"Souhlasím se "}
                    <Link href="/zasady" className="text-electric-cyan hover:underline">
                      {"zpracováním osobních údajů"}
                    </Link>
                    {" za účelem odpovědi na můj dotaz."}
                  </span>
                </label>
                <FieldError id="contact-consent-error" errors={errors.consent} />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-base font-semibold bg-electric-cyan hover:bg-electric-cyan/90 text-background shadow-[0_0_30px_rgba(0,200,255,0.3)] hover:shadow-[0_0_50px_rgba(0,200,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {"Odesílám..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {"Odeslat zprávu"}
                  </>
                )}
              </Button>

              <div role="status" aria-live="polite">
                {state.submitted && (
                  state.success ? (
                    <p className="flex items-center gap-2 rounded-xl border border-electric-cyan/30 bg-electric-cyan/5 p-4 text-sm text-foreground">
                      <CheckCircle className="w-5 h-5 text-electric-cyan shrink-0" />
                      {state.message}
                    </p>
                  ) : (
                    <p className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-400">
                      {state.message}
                    </p>
                  )
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
