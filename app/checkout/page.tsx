"use client"

import { FormEvent, useActionState, useState, useTransition } from "react"
import { redirect, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock, CreditCard, ShieldCheck, MapPin, Loader2, Tag, X } from "lucide-react"
import { Suspense, useEffect } from "react"
import { UNIT_PRICE } from "@/lib/utils"
import { createOrder, getCoupon } from "@/server/action"
import { toast } from "sonner"
import { ActionRes, CreatePaymentResponse } from "@/types"
import { CreateOrderType } from "@/server/schema"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Packeta: any
  }
}

const actionState: ActionRes<CreateOrderType>  & CreatePaymentResponse= {
  submitted: false,
  success: false,
  message:"", 
  pay_url: "",
  detail_url: ""
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const quantity = Math.max(1, Math.min(99, Number(searchParams.get("quantity")) || 1))
  
  const [packetaPoint, setPacketaPoint] = useState<{ id: string; city: string,street: string, zip: string } | null>(null)
  const [isPending, startTransition] = useTransition();
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [deliveryPrice,setDeliveryPrice] = useState<number>(89)
  const [state, action, isPendingCheckout] = useActionState(createOrder, actionState) 
  const finalPrice = (UNIT_PRICE * quantity - (appliedCoupon ? appliedCoupon.discount : 0) + deliveryPrice).toFixed(2)
  
  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault()
    const code = couponCode.trim()
    if (!code) return

    setCouponLoading(true)
    
    startTransition(async () => {
      const coupon = await getCoupon(code)
      console.log(coupon)
      if(!coupon){
         toast.error("Zadali jste neplatný kód!")
          setCouponLoading(false)
          return
      }else{
        if(coupon.min_order_value >= Number(finalPrice)){
          toast.error("Vaše hodnota objednávky je menší než požadovaná minimální hodnota objednávky pro uplatnění slevového kupónu!")
          setCouponLoading(false)
          return
        }
        if(coupon.free_del){
          toast.success("Uplatnila se doprava zdarma!")
          setDeliveryPrice(0);
        }
        if(coupon.type){
          setAppliedCoupon({
            code: coupon.name,
            discount: coupon.value
          })
        }else{
          setAppliedCoupon({
            code: coupon.name,
            discount: (UNIT_PRICE * quantity) /100 * coupon.value
          })
        }
      }
    })

    setCouponLoading(false)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setDeliveryPrice(89)
    setCouponCode("")
  }


  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://widget.packeta.com/v6/www/js/library.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if(state.submitted){
      if(state.success){
        toast.success(state.message)
        redirect(state.pay_url)
      }else {
        toast.error(state.message)
      }
    }
  },[state.message, state.submitted, state.success])

  const showPacketaWidget = () => {
    if (window.Packeta) {
      const packetaApiKey = process.env.NEXT_PUBLIC_PACKETA_API_KEY
      const packetaOptions = {
        packetConsignment: "true",
        livePickupPoint: "true",
        language: "cs",
        vendors: [
          {
             country: "cz"
          }
        ],
        valueFormat: "id,city,street,zip",
        view: "modal",
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.Packeta.Widget.pick(packetaApiKey, (point: any) => {
        if (point) {
          const [id, city, street, zip] = point.formatedValue.split(",")
          setPacketaPoint({ id, city, street, zip })
        }
      }, packetaOptions)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-electric-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-electric-orange/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{"Zpet na produkt"}</span>
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">{"Dokonceni objednavky"}</h1>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Product summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">{"Souhrn objednávky"}</h2>

              <div className="flex gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border shrink-0">
                  <Image
                    src="/images/esp32.jpg"
                    alt="ESP32 DevKit"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">ESP32 DevKit V1</h3>
                  <p className="text-sm text-muted-foreground mt-1">{"Vývojová deska s USB-C"}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {"Množství:"} <span className="text-foreground font-medium">{quantity} ks</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-electric-cyan/5 border border-electric-cyan/20 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-electric-cyan" />
                      <span className="text-sm font-medium text-foreground">{appliedCoupon.code}</span>
                      <span className="text-xs text-electric-cyan">-{appliedCoupon.discount.toFixed(2)} Kč</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Odebrat kupón"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value)
                      }}
                      placeholder="Slevový kupón"
                      className="flex-1 h-10 px-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={couponLoading || !couponCode.trim() || isPending}
                      className="h-10 px-4 border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 hover:text-electric-cyan disabled:opacity-50"
                    >
                      {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Použit"}
                    </Button>
                  </form>
                )}
                
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"Cena za kus"}</span>
                  <span className="text-foreground">{UNIT_PRICE} Kč</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"Počet"}</span>
                  <span className="text-foreground">{quantity} ks</span>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{"Sleva"}</span>
                    <span className="text-electric-cyan font-medium">-{appliedCoupon.discount.toFixed(2)} Kč</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"Doprava"}</span>
                  <span className="text-electric-cyan font-medium">{deliveryPrice} Kč</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-semibold text-foreground">{"Celkem"}</span>
                  <span className="text-2xl font-bold text-electric-cyan">{finalPrice} Kč</span>
                </div>
              </div>

              

              {/* Trust badges */}
              <div className="mt-6 pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-electric-cyan shrink-0" />
                  <span>{"Bezpecna platba kartou"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-electric-cyan shrink-0" />
                  <span>{"Sifrovane SSL spojeni"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Checkout form */}
          <div className="lg:col-span-3">
            <form autoComplete="on" action={action} className="space-y-6">
              {/* Contact */}
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{"Kontaktní údaje"}</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-1.5">
                      {"E-mail"}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={state.inputs?.email}
                      required
                      placeholder="vas@email.cz"
                      className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm text-muted-foreground mb-1.5">
                        {"Jméno"}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue={state.inputs?.firstName}
                        required
                        placeholder="Jan"
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm text-muted-foreground mb-1.5">
                        {"Přijmení"}
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue={state.inputs?.lastName}
                        required
                        placeholder="Novak"
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-muted-foreground mb-1.5">
                      {"Telefonní číslo"}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      defaultValue={state.inputs?.phone}
                      required
                      placeholder="Zadejte ve formátu: +420 606 846 532"
                      className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{"Dodací adresa"}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm text-muted-foreground mb-1.5">
                      {"Ulice"}
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      defaultValue={state.inputs?.address}
                      required
                      placeholder="Vodičkova"
                      className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="adressNumber" className="block text-sm text-muted-foreground mb-1.5">
                      {"Číslo popisné"}
                    </label>
                    <input
                      id="addressNumber"
                      defaultValue={state.inputs?.adressNumber}
                      name="addressNumber"
                      type="text"
                      required
                      placeholder="123"
                      className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                  </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm text-muted-foreground mb-1.5">
                        {"Město"}
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        defaultValue={state.inputs?.city}
                        required
                        placeholder="Praha"
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm text-muted-foreground mb-1.5">
                        {"PSČ"}
                      </label>
                      <input
                        id="zip"
                        name="zip"
                        type="text"
                        defaultValue={state.inputs?.zip}
                        required
                        placeholder="110 00"
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-electric-cyan" />
                  <h2 className="text-lg font-semibold text-foreground">{"Výběr Zásilkovny"}</h2>
                {packetaPoint &&
                  <input
                        name="packetaId"
                        value={packetaPoint.id}
                        readOnly
                        type="hidden"
                        required
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                }
                </div>

                {packetaPoint ? (
                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 border border-electric-cyan/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-electric-cyan" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{packetaPoint.city + ", " + packetaPoint.street + ", " + packetaPoint.zip}</h3>
                        <p className="text-xs text-muted-foreground">{"ID:"} {packetaPoint.id}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={showPacketaWidget}
                      className="text-electric-cyan hover:text-electric-cyan/80 hover:bg-electric-cyan/10"
                    >
                      {"Změnit"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {"Vyzvednete si objednavku na pobočce Zásilkovny poblíž vas."}
                    </p>
                    <Button
                      type="button"
                      onClick={showPacketaWidget}
                      variant="outline"
                      className="border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 hover:text-electric-cyan"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {"Vyberte pick-up point"}
                    </Button>
                  </div>
                )}
              </div>
                    <input
                        name="deliveryPrice"
                        value={deliveryPrice}
                        readOnly
                        type="hidden"
                        required
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                    <input
                        name="packetaAddress"
                        value={packetaPoint ? packetaPoint.city + ", " + packetaPoint.street + ", " + packetaPoint.zip: ""}
                        readOnly
                        type="hidden"
                        required
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                    
                    <input
                        name="quantity"
                        value={quantity}
                        readOnly
                        type="hidden"
                        required
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
                    <input
                        name="sale"
                        value={appliedCoupon ? appliedCoupon.discount : 0}
                        readOnly
                        type="hidden"
                        required
                        className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                    />
              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isPendingCheckout}
                className="w-full h-14 text-lg font-semibold bg-electric-cyan hover:bg-electric-cyan/90 text-background shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_50px_rgba(0,200,255,0.6)] transition-all disabled:opacity-50"
              >
                <Lock className="w-5 h-5 mr-2" />
                {isPendingCheckout ? "Zpracovavam..." : `Zaplatit ${finalPrice} Kč`}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {"Kliknutím na tlačítko souhlasíte s obchodními podmínkami. Vaše data jsou v bezpečí."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">{"Nacitam..."}</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
