import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Truck, CreditCard, Banknote } from "lucide-react"

export const metadata: Metadata = {
  title: "Doprava a platba",
  description:
    "Informace o způsobech dopravy a platby na especko.cz. Zásilkovna od 89 Kč, dobírka nebo bankovní převod.",
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
    url: "https://especko.cz",
    siteName: "especko.cz",
    title: "ESP32 DevKit | Pohon vaše IoT projekty",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
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
    title: "ESP32 DevKit | especko.cz",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
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
    canonical: "https://especko.cz",
  },
  icons: {
    icon: [
      {
        url: "/especko.ico",
      },
    ],
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

        <h1 className="text-3xl font-bold text-foreground mb-8">
          Doprava a platba zboží
        </h1>

        {/* Doprava */}
        <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-electric-cyan" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              1. Způsoby dopravy
            </h2>
          </div>

          <div className="rounded-xl bg-secondary/50 border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Zásilkovna</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Doručení na výdejní místo Zásilkovny nebo na adresu.
                </p>
              </div>
              <span className="text-electric-cyan font-semibold whitespace-nowrap ml-4">
                od 89 Kč
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
            <h2 className="text-xl font-semibold text-foreground">
              2. Způsoby platby
            </h2>
          </div>

          <div className="space-y-3">
            

            <div className="rounded-xl bg-secondary/50 border border-border p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">
                    Bankovním převodem
                  </h3>
                   <p className="text-sm text-muted-foreground mt-1">
                    Platby zprostředkovává firma
                    <span className="text-foreground font-medium pl-2">
                      The Pay s.r.o.
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
          <p className="text-sm text-muted-foreground">
            Provozovatelé:{" "}
            <span className="text-foreground">
              Adam Hitzger, IČO: 19712049 
            </span>
            , se sídlem Ledečská 2984, 580 01 Havlíčkův Brod.
            <span className="text-foreground">
              David Havel, IČO: 19203144
            </span>
            , se sídlem Brixenská 3711, 580 01 Havlíčkův Brod.
          </p>
        </div>
      </div>
    </main>
  )
}
