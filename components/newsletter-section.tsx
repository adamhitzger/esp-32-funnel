"use client"

import { useActionState, useEffect, useState, useTransition } from "react"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { ActionRes } from "@/types"
import { NewsletterType } from "@/server/schema"
import { saveNewsletter } from "@/server/action"
import { toast } from "sonner"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const actionState: ActionRes<NewsletterType> = {
  submitted: false,
  success: false,
  message: ""
}

export function NewsletterSection() {
  const [isPending, startTransition] = useTransition()

  const {executeRecaptcha} = useGoogleReCaptcha()

  const handleSendMail = (formData: FormData) => {
      startTransition(async () => {
        if(!executeRecaptcha){
          toast.error("reCAPTCHA není připravena, zkuste to znovu.")
          return;
        }
         const token = await executeRecaptcha();
         const loadingToast = toast.loading("Probíhá ověření");
         const send = await saveNewsletter(actionState, formData, token);
         toast.dismiss(loadingToast);
         if(send.submitted){
            if(!send.success){
              toast.error(send.message)
            }else{
              toast.success(send.message)
            }
         }
      })
  }
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-150 h-75 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--electric-cyan)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-6">
            <Mail className="w-4 h-4 text-electric-cyan" />
            <span className="text-sm font-mono text-muted-foreground">
              {"Newsletter"}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {"Buďte v obraze s "}
            <span className="text-electric-cyan">{"novinkami"}</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto text-pretty">
            {"Přihlaste se k odběru a získejte jako první informace o nových produktech, slevách a technických tipech pro vaše IoT projekty."}
          </p>

          {actionState.submitted ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-electric-cyan/30 bg-electric-cyan/5 backdrop-blur-sm p-6">
              <CheckCircle2 className="w-6 h-6 text-electric-cyan shrink-0" />
              <p className="text-foreground font-medium">
                {"Děkujeme za přihlášení! Brzy se ozveme."}
              </p>
            </div>
          ) : (
            <form action={handleSendMail} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isPending}
                  
                  placeholder="vas@email.cz"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan transition-all font-sans text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="h-12 px-6 rounded-xl bg-electric-cyan text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              >
                {"Odebírat"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            {"Žádný spam. Odhlásit se můžete kdykoli."}
          </p>
        </div>
      </div>
    </section>
  )
}
