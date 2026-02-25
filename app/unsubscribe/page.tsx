"use client"

import { useActionState, useEffect, useState } from "react"
import { MailX, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ActionRes } from "@/types"
import { NewsletterType } from "@/server/schema"
import { signOutNewsletter } from "@/server/action"
import { toast } from "sonner"

const actionState: ActionRes<NewsletterType> = {
    submitted: false,
    success: false,
    message: "",
}

export default function UnsubscribePage() {
    const [state, action, isPending] = useActionState(signOutNewsletter, actionState);
    
    useEffect(() => {
        if(state.submitted){
            if(state.success){
                toast.success(state.message)
            }else{
                toast.error(state.message)
            }
        }
    }, [state.submitted, state.message, state.success])
  
    return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-125 h-125 rounded-full opacity-8 blur-3xl"
          style={{ background: "var(--electric-cyan)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{"Zpět na hlavní stránku"}</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8">
          {state.submitted && state.success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-electric-cyan/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-electric-cyan" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                {"Odhlášení potvrzeno"}
              </h1>
              <p className="text-muted-foreground mb-8">
                {"E-mail "}
                <span className="text-foreground font-medium">{state.inputs?.email}</span>
                {" byl úspěšně odhlášen z odběru novinek."}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {"Je nám líto, že odcházíte. Pokud si to rozmyslíte, můžete se znovu přihlásit na naší hlavní stránce."}
              </p>
              <Button asChild variant="outline" className="border-border hover:bg-secondary/50">
                <Link href="/">{"Zpět na hlavní stránku"}</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center shrink-0">
                  <MailX className="w-6 h-6 text-electric-cyan" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {"Odhlášení z odběru"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {"Zadejte svůj e-mail pro odhlášení"}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6">
                {"Mrzí nás, že odcházíte. Zadejte svůj e-mail a my vás odhlásíme z odběru novinek."}
              </p>

              <form action={action} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {"E-mailová adresa"}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="vas@email.cz"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-electric-cyan hover:bg-electric-cyan/90 text-background font-semibold disabled:opacity-50 transition-all"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {"Zpracovávám..."}
                    </>
                  ) : (
                    "Odhlásit se z odběru"
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                {"Váš e-mail vymažeme hned!"}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
