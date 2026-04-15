import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Truck, CreditCard, Building2, Mail, Phone, ExternalLink } from "lucide-react"
import { DOBIRKA_PRICE, ZASILKOVNA_PRICE } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Doprava a platba | especko.cz",
  description: `Informace o způsobech dopravy a platby na especko.cz. Zásilkovna od ${ZASILKOVNA_PRICE} Kč, platba na dobírku. Doručení 2–4 pracovní dny.`,
  keywords: [
    "ESP32",
    "ESP32 DevKit",
    "mikrokontrolér",
    "IoT",
    "WiFi modul",
    "Bluetooth",
    "vývojová deska",
    "Arduino",
    "embedded",
    "automatizace",
    "especko.cz",
  ],
  authors: [{ name: "especko.cz", url: "https://especko.cz" }],
  creator: "especko.cz",
  publisher: "especko.cz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://especko.cz/doprava-platba",
    siteName: "especko.cz",
    title: "Doprava a platba | especko.cz",
    description: `Zásilkovna od ${ZASILKOVNA_PRICE} Kč, platba na dobírku. Doručení 2–4 pracovní dny.`,
    images: [
      {
        url: "/images/esp32.jpg",
        width: 1200,
        height: 630,
        alt: "ESP32 DevKit vývojová deska",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doprava a platba | especko.cz",
    description: `Zásilkovna od ${ZASILKOVNA_PRICE} Kč, platba na dobírku. Doručení 2–4 pracovní dny.`,
    images: ["/images/esp32.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://especko.cz/doprava-platba",
  },
  icons: {
    icon: [{ url: "/especko.ico" }],
  },
}

export default function DopravaPlatba() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Zpět na hlavní stránku</span>
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Doprava a platba zboží</h1>

        {/* Doprava */}
        <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-electric-cyan" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">1. Způsoby dopravy</h2>
          </div>

          <div className="rounded-xl bg-secondary/50 border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Zásilkovna</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Doručení na výdejní místo Zásilkovny v Čechách i na Slovensku.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Obvyklá doba doručení: 2–4 pracovní dny od potvrzení objednávky.
                </p>
              </div>
              <span className="text-electric-cyan font-semibold whitespace-nowrap ml-4">
                {ZASILKOVNA_PRICE} Kč
              </span>
            </div>
          </div>
        </div>

        {/* Platba */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-electric-cyan" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">2. Způsoby platby</h2>
          </div>

          <div className="space-y-3">

            <div className="rounded-xl bg-electric-cyan/5 border border-electric-cyan/20 p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-foreground">Platba online</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-electric-cyan/10 text-electric-cyan">Doporučeno</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Platba kartou (Visa, Mastercard) nebo bankovním tlačítkem přímo při objednávce. 
                    Platební služby zajišťuje společnost{" "}
                    <Link 
                      href="https://www.comgate.eu/cs/platebni-brana" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-electric-cyan hover:underline inline-flex items-center gap-1"
                    >
                      Comgate, a.s.
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Platby kartou:</span>{" "}
                      Po dokončení objednávky budete přesměrováni na zabezpečenou platební bránu, 
                      kde zadáte údaje z vaší platební karty. Platba je okamžitě zpracována a vy obdržíte potvrzení.{" "}
                      <a 
                        href="https://help.comgate.cz/v1/docs/cs/platby-kartou" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-cyan hover:underline"
                      >
                        Více informací
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Bankovní převody:</span>{" "}
                      Platba prostřednictvím platebních tlačítek bank (Česká spořitelna, ČSOB, Komerční banka, 
                      Raiffeisenbank a další). Po výběru banky budete přesměrováni do internetového bankovnictví.{" "}
                      <a 
                        href="https://help.comgate.cz/docs/bankovni-prevody" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-cyan hover:underline"
                      >
                        Více informací
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl flex flex-row justify-between bg-secondary/50 border border-border p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Dobírka</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Platba v hotovosti při převzetí zásilky na pobočce Zásilkovny.
                  </p>
                </div>
              
              </div>
                <span className="text-electric-cyan font-semibold whitespace-nowrap ml-4">
                {DOBIRKA_PRICE} Kč
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-electric-cyan" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              3. Poskytovatel platebních služeb
            </h2>
          </div>

          <div className="rounded-xl bg-secondary/50 border border-border p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Platební služby online plateb zajišťuje společnost Comgate, a.s. 
              V případě dotazů nebo reklamací k platbám kontaktujte přímo poskytovatele:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Comgate, a.s.</p>
                  <p className="text-muted-foreground">Gočárova třída 1754 / 48b</p>
                  <p className="text-muted-foreground">Hradec Králové</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <a 
                  href="mailto:podpora@comgate.cz" 
                  className="text-sm text-electric-cyan hover:underline"
                >
                  podpora@comgate.cz
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <a 
                  href="tel:+420228224267" 
                  className="text-sm text-electric-cyan hover:underline"
                >
                  +420 228 224 267
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
          <p className="text-sm text-muted-foreground">
            Provozovatel:{" "}
            <span className="text-foreground">Adam Hitzger, IČO: 19712049</span>, se sídlem Ledečská 2984,
            580 01 Havlíčkův Brod.
          </p>
        </div>
      </div>
    </main>
  )
}