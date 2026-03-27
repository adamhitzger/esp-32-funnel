"use client"

import { Button } from "@/components/ui/button"
import { Check, Minus, Plus, ShoppingCart, Shield, Truck, RotateCcw, QrCode, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { UNIT_PRICE } from "@/lib/utils"
import { sendGTMEvent } from '@next/third-parties/google';
import { fbEvent } from "@rivercode/facebook-conversion-api-nextjs"

const features = [
  "240MHz dvoujádrový",
  "WiFi 802.11 b/g/n",
  "Bluetooth 4.2 + BLE",
  "4MB Flash paměť",
  "520KB SRAM",
  "34 GPIO pinů",
]

const galleryImages = [
  { src: "/images/esp1.png", alt: "ESP32 DevKit - boční pohled" },
  { src: "/images/esp2.png", alt: "ESP32 DevKit - detailní záběr" },
  { src: "/images/esp3.png", alt: "ESP32 DevKit - zadní strana PCB" },
  { src: "/images/esp4.png", alt: "ESP32 DevKit - pohled shora" },
]

export function HeroSection() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

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
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12 lg:mb-16">
          <span className="relative inline-block">
            <span className="relative z-10 text-electric-cyan">Nakupte</span>
            <span 
              className="absolute -bottom-1 left-0 w-full h-3 bg-electric-cyan/20 -skew-x-6"
              aria-hidden="true"
            />
          </span>
          {" "}svoje ESP32 ještě{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-electric-orange">dnes!</span>
            <svg 
              className="absolute -bottom-2 left-0 w-full" 
              viewBox="0 0 100 12" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path 
                d="M0,6 Q10,2 20,6 T40,6 T60,6 T80,6 T100,6" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
                className="text-electric-orange"
              />
            </svg>
          </span>
        </h1>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Product Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-electric-cyan/30 rounded-full blur-[100px]" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-electric-orange/25 rounded-full blur-[80px]" />
              <button
                onClick={() => openLightbox(selectedImage)}
                className="relative rounded-3xl overflow-hidden border-2 border-electric-cyan/30 bg-gradient-to-br from-card/80 to-secondary/50 backdrop-blur-sm p-6 md:p-10 shadow-[0_0_80px_rgba(0,200,255,0.25)] cursor-zoom-in group w-full"
              >
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-electric-cyan/60" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-electric-cyan/60" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-electric-cyan/60" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-electric-cyan/60" />
                <div className="absolute inset-0 bg-electric-cyan/0 group-hover:bg-electric-cyan/5 transition-colors rounded-3xl" />
              </button>

              {/* Thumbnail gallery */}
              <div className="flex gap-2 mt-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-electric-cyan shadow-[0_0_15px_rgba(0,200,255,0.4)]"
                        : "border-border hover:border-electric-cyan/50"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border">
                <Truck className="w-5 h-5 text-electric-cyan" />
                <span className="text-xs text-muted-foreground text-center">{"Doprava Zásilkovnou za 49 Kč"}</span>
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
                <span className="text-sm font-medium text-electric-orange">{"Omezené zásoby - skladem"}</span>
              </div>

              <h2 className="text-xl font-bold text-foreground mb-1">ESP32-S3 DevKit - balení po 3 ks</h2>
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
                  <span className="text-muted-foreground">{"za balení po 3 ks"}</span>
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
                <Link onClick={() => {
                                sendGTMEvent({
                                  event: "begin_checkout",
                                  currency: "CZK",
                                  value: totalPrice,
                                  quantity: quantity
                                })
                                fbEvent({
                                  eventName: "begin_checkout",
                                  value: Number(totalPrice),
                                  products: [{
                                    sku: "ESP32_S3",
                                    quantity: quantity
                                  }],
                                  currency: "CZK",
                                })
                  }} 
                  href={`/checkout?quantity=${quantity}`}
                  >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {"Objednat"}
                </Link>
              </Button>

              <div className="flex flex-row justify-center text-center text-sm  text-muted-foreground mt-4 space-x-2">
                <p>Bezpečná platba</p> <QrCode/> <p>QR kódem na účet od České spořitelny</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors"
            aria-label="Zavřít galerii"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-10 p-3 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors"
            aria-label="Předchozí obrázek"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main image */}
          <div className="relative max-w-4xl max-h-[80vh] mx-16">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto object-contain rounded-2xl"
            />
          </div>

          {/* Navigation - Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 z-10 p-3 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors"
            aria-label="Další obrázek"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                onClick={() => setSelectedImage(index)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-electric-cyan shadow-[0_0_15px_rgba(0,200,255,0.4)]"
                    : "border-border/50 hover:border-electric-cyan/50 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-secondary/80 text-sm text-foreground">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
