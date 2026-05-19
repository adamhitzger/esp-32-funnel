"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ShoppingCart, CreditCard, Truck, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowToOrderPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // Check if cookies have been accepted and if popup hasn't been shown
    const checkAndShow = () => {
      const cookiesAccepted = localStorage.getItem("provoz") === "on"
      const popupShown = localStorage.getItem("how-to-order-popup-shown")
      
      if (cookiesAccepted && !popupShown) {
        // Show popup after a small delay
        setTimeout(() => {
          setIsVisible(true)
        }, 500)
      }
    }

    // Check immediately
    checkAndShow()

    // Also listen for storage changes (when cookies are accepted)
    const handleStorage = () => {
      checkAndShow()
    }

    window.addEventListener("storage", handleStorage)
    
    // Poll for cookie acceptance since it happens in same tab
    const interval = setInterval(checkAndShow, 1000)

    return () => {
      window.removeEventListener("storage", handleStorage)
      clearInterval(interval)
    }
  }, [mounted])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("how-to-order-popup-shown", "true")
  }

  if (!isVisible) return null

  const steps = [
    {
      icon: ShoppingCart,
      title: "Vyberte produkt",
      description: "Zvolte množství a využijte množstevní slevy",
    },
    {
      icon: CreditCard,
      title: "Vyplňte údaje",
      description: "Osobní údaje, doručení a způsob platby",
    },
    {
      icon: Truck,
      title: "Vyberte výdejní místo",
      description: "Zásilkovna nebo Z-BOX poblíž vás",
    },
    {
      icon: CheckCircle,
      title: "Hotovo!",
      description: "Sledujte stav objednávky online",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-electric-cyan/20 to-electric-cyan/5 p-6 border-b border-border">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Zavřít"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-electric-cyan/20 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-electric-cyan" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {"Jak nakupovat?"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {"Jednoduchý návod ve 4 krocích"}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-electric-cyan" />
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            {"Rozumím"}
          </Button>
          <Button
            asChild
            className="flex-1 bg-electric-cyan hover:bg-electric-cyan/90 text-primary-foreground"
          >
            <Link href="/jak-objednat" onClick={handleClose}>
              {"Podrobný návod"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}