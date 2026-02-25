"use client"

import { Button } from "@/components/ui/button"
import { Check, Minus, Plus, ShoppingCart, Shield, Truck, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { UNIT_PRICE } from "@/lib/utils"

const features = [
  "240MHz dvoujádrový",
  "WiFi 802.11 b/g/n",
  "Bluetooth 4.2 + BLE",
  "4MB Flash paměť",
  "520KB SRAM",
  "34 GPIO pinů",
]

export function HeroSection() {
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < 99) setQuantity(quantity + 1)
  }

  const totalPrice = (UNIT_PRICE * quantity).toFixed(2)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-0">
      {/* Animated circuit lines background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--electric-cyan)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--electric-cyan)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--electric-cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 200 H400 L450 250 H1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M0 400 H200 L250 350 H600 L650 400 H1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse [animation-delay:0.5s]" />
          <path d="M0 600 H300 L350 650 H700 L750 600 H1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse [animation-delay:1s]" />
          <path d="M0 800 H500 L550 750 H1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse [animation-delay:1.5s]" />
          <path d="M200 0 V300 L250 350 V1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse [animation-delay:0.3s]" />
          <path d="M500 0 V500 L550 550 V1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse [animation-delay:0.8s]" />
          <path d="M800 0 V200 L750 250 V700 L800 750 V1000" stroke="url(#circuit-gradient)" strokeWidth="2" fill="none" className="animate-pulse [animation-delay:1.3s]" />
          <circle cx="200" cy="200" r="6" fill="var(--electric-cyan)" className="animate-pulse" />
          <circle cx="450" cy="250" r="6" fill="var(--electric-cyan)" className="animate-pulse [animation-delay:0.5s]" />
          <circle cx="650" cy="400" r="6" fill="var(--electric-cyan)" className="animate-pulse [animation-delay:1s]" />
          <circle cx="350" cy="650" r="6" fill="var(--electric-cyan)" className="animate-pulse [animation-delay:1.5s]" />
          <circle cx="550" cy="550" r="6" fill="var(--electric-cyan)" className="animate-pulse [animation-delay:0.8s]" />
          <circle cx="800" cy="750" r="6" fill="var(--electric-orange)" className="animate-pulse [animation-delay:1.2s]" />
        </svg>
      </div>

      {/* Glowing orb effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-electric-orange/20 rounded-full blur-[96px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Product Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-electric-cyan/30 rounded-full blur-[100px]" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-electric-orange/25 rounded-full blur-[80px]" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-electric-cyan/30 bg-gradient-to-br from-card/80 to-secondary/50 backdrop-blur-sm p-6 md:p-10 shadow-[0_0_80px_rgba(0,200,255,0.25)]">
                <Image
                  src="/images/esp32.jpg"
                  alt="ESP32 DevKit mikrokontrolér"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl shadow-xl"
                  priority
                />
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-electric-cyan/60" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-electric-cyan/60" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-electric-cyan/60" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-electric-cyan/60" />
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border">
                <Truck className="w-5 h-5 text-electric-cyan" />
                <span className="text-xs text-muted-foreground text-center">{"Doprava zdarma"}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border">
                <Shield className="w-5 h-5 text-electric-cyan" />
                <span className="text-xs text-muted-foreground text-center">{"Bezpečná platba"}</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border">
                <RotateCcw className="w-5 h-5 text-electric-cyan" />
                <span className="text-xs text-muted-foreground text-center">{"Vrácení do 30 dnů"}</span>
              </div>
            </div>
          </div>

          {/* Right - Buy Section */}
          <div className="order-2">
            <div className="p-6 md:p-8 rounded-3xl border border-electric-cyan/30 bg-card/80 backdrop-blur-sm shadow-[0_0_60px_rgba(0,200,255,0.15)]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-orange/30 bg-electric-orange/10 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-orange opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-orange" />
                </span>
                <span className="text-sm font-medium text-electric-orange">{"Omezené zásoby"}</span>
              </div>

              <h2 className="text-xl font-bold text-foreground mb-1">ESP32 DevKit V1</h2>
              <p className="text-muted-foreground text-sm mb-6">{"Kompletní vývojová deska s USB-C"}</p>

              {/* Features list */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-electric-cyan shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">{UNIT_PRICE} Kč</span>
                  <span className="text-muted-foreground">{"za kus"}</span>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">{"Množství"}</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl overflow-hidden bg-secondary/50">
                    <button
                      onClick={decreaseQuantity}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors text-foreground disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center font-mono text-lg font-semibold text-foreground border-x border-border">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors text-foreground disabled:opacity-50"
                      disabled={quantity >= 99}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {quantity >= 20 && (
                    <div className="px-3 py-1 rounded-full bg-electric-orange/10 border border-electric-orange/30">
                      <span className="text-sm text-electric-orange font-medium">{"Velkoobchodní objednávka"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{"Celkem"}</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-electric-cyan">{totalPrice} Kč</span>
                    {quantity > 1 && (
                      <p className="text-sm text-muted-foreground">{quantity} ks x {UNIT_PRICE} Kč</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <Button
                asChild
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-electric-cyan hover:bg-electric-cyan/90 text-background shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_50px_rgba(0,200,255,0.6)] transition-all"
              >
                <Link href={`/checkout?quantity=${quantity}`}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {"Objednat"}
                </Link>
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                {"Bezpečná platba kartou"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
