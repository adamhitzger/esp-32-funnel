"use client"

import { useActionState, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, RotateCcw, Mail, ExternalLink, CheckCircle2, Package, Calendar, Hash } from "lucide-react"
import { findOrderBarcode, sendBarcode } from "@/server/action"
import { ActionRes, GetRefunds, Order } from "@/types"
import { RefundCode,  } from "@/server/schema"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

const RETURNS_PORTAL_URL = "https://returns.packeta.com"

const initialState: GetRefunds = {
        orders: null,
        count: 0,
        success: false,     
        input: "",
}

const initialState2:ActionRes<RefundCode> = {
        submitted: false,
        success: true,
        message: ""
}

export default function RefundPage() {
  const [state, formAction, isPending] = useActionState(findOrderBarcode, initialState)
  const [state2, formAction2, isPending2] = useActionState(sendBarcode, initialState2)

    useEffect(() =>{
      if(state2.submitted){
        if(state2.success){
          toast.success(state2.message)
        }else{
          toast.error(state2.message)
        }
      }
    }, [state2.submitted, state2.success, state2.message])
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

            
            <form action={formAction}>
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8">
                
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
                      defaultValue={state.input || ""}
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
                      Prohledávám objednávky...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Prohledat objednávky
                    </>
                  )}
                </Button>
              </div>
            </form>
        
            {state.orders && state.count > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Nalezené objednávky ({state.count})
              </h2>

              {state.orders.map((order, index) => (
                <form key={order._id} action={formAction2}>
                  {/* Hidden inputs */}
                  <input type="hidden" name="orderId" value={order._id} />
                  <input type="hidden" name="firstName" value={order.firstName} />
                  <input type="hidden" name="lastName" value={order.lastName} />
                  <input type="hidden" name="barcode" value={order.barcode || ""} />
                  <input type="hidden" name="email" value={order.email} />

                  <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 hover:border-electric-cyan/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      {/* Order info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-5 h-5 text-electric-cyan" />
                          <span className="font-semibold text-foreground">
                            Objednávka #{index + 1}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Datum:</span>
                            <span className="text-foreground">{formatDate(order._createdAt)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">E-mail:</span>
                            <span className="text-foreground truncate">{order.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action button */}
                      <div className="shrink-0">
                        {order.barcode ? (
                          <Button
                            type="submit"
                            disabled={isPending2}
                            size="sm"
                            className="bg-electric-cyan hover:bg-electric-cyan/90 text-background"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Odeslat štítek
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg">
                            Štítek není k dispozici
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Packeta portal link */}
                    {order.barcode && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <a
                          href={RETURNS_PORTAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-electric-cyan hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Přejít na vratkový portál Zásilkovny
                        </a>
                      </div>
                    )}
                  </div>
                </form>
              ))}
            </div>
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
