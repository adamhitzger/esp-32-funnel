"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, RotateCcw, Mail, ExternalLink, CheckCircle2, Package } from "lucide-react"
import { findOrderAndSendBarcode } from "@/server/action"
import { ActionRes } from "@/types"
import { RefundInputs } from "@/server/schema"

const RETURNS_PORTAL_URL = "https://returns.packeta.com"

const initialState: ActionRes<RefundInputs> = {
  submitted: false,
  success: false,
  message: "",
}

export default function RefundPage() {
  const [state, formAction, isPending] = useActionState(findOrderAndSendBarcode, initialState)

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Zpět na hlavní stránku</span>
        </Link>

        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/20 flex items-center justify-center mx-auto mb-6">
              <RotateCcw className="w-8 h-8 text-electric-cyan" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Vrácení zboží</h1>
            <p className="text-muted-foreground">
              Zadejte e-mail nebo telefonní číslo z vaší objednávky a my vám pošleme štítek pro vrácení zásilky.
            </p>
          </div>

          {/* Success state with barcode */}
          {state.submitted && state.success ? (
            <div className="rounded-2xl border border-electric-cyan/30 bg-card/80 backdrop-blur-sm p-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-2">Štítek byl odeslán</h2>
                <p className="text-sm text-muted-foreground mb-6">{state.message}</p>


                {/* Instructions */}
                <div className="rounded-xl bg-secondary/30 border border-border p-4 mb-6 text-left">
                  <div className="flex items-start gap-3 mb-3">
                    <Package className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Jak vrátit zásilku:</p>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Klikněte na tlačítko níže</li>
                        <li>Zadejte štítek (čárový kód) na portálu</li>
                        <li>Postupujte podle pokynů Zásilkovny</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 bg-electric-cyan hover:bg-electric-cyan/90 text-background font-semibold"
                >
                  <a href={RETURNS_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Přejít na vratkový portál Zásilkovny
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Štítek jsme také poslali na váš e-mail.
                </p>
              </div>
            </div>
          ) : (
            /* Search form */
            <form action={formAction}>
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8">
                {/* Error message */}
                {state.submitted && !state.success && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 mb-6">
                    <p className="text-sm text-red-400 text-center">{state.message}</p>
                  </div>
                )}

                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                    E-mail nebo telefonní číslo
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      name="search"
                      type="text"
                      required
                      defaultValue={state.inputs?.search || ""}
                      placeholder="vas@email.cz nebo +420..."
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Zadejte údaje, které jste použili při objednávce.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className="w-full h-12 bg-electric-cyan hover:bg-electric-cyan/90 text-background font-semibold disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2" />
                      Hledám objednávku...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Odeslat štítek na e-mail
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Info box */}
          <div className="mt-8 rounded-xl bg-secondary/30 border border-border p-6">
            <h3 className="font-medium text-foreground mb-3">Informace o vrácení</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-electric-cyan">•</span>
                Zboží můžete vrátit do 14 dnů od převzetí
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-cyan">•</span>
                Zboží musí být v původním obalu a nepoškozené
              </li>
              <li className="flex items-start gap-2">
                <span className="text-electric-cyan">•</span>
                Peníze vám vrátíme do 14 dnů od obdržení zásilky
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Máte dotazy?{" "}
              <a href="mailto:info@especko.cz" className="text-electric-cyan hover:underline">
                Kontaktujte nás
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
