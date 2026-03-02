import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
  title: "Reklamační řád",
  description:
    "Reklamační řád e-shopu especko.cz. Informace o postupu při reklamaci zboží.",
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
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function Reklamace() {
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

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-electric-cyan" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Reklamační řád
          </h1>
        </div>

        <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6 mb-6">
          <ol className="list-decimal pl-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <li>
              Kupující je povinen dodané zboží bez zbytečného odkladu
              prohlédnout a o případných zjištěných vadách do 5 dnů informovat
              prodávajícího.
            </li>
            <li>
              Oznámení o zjištěných vadách musí kupující učinit písemně
              (e-mailem na{" "}
              <a
                href="mailto:info@especko.cz"
                className="text-electric-cyan hover:underline"
              >
                info@especko.cz
              </a>
              ) do 5 dnů od převzetí zboží. V písemném oznámení musí kupující
              uvést zjištěné vady, popsat o jaké vady se jedná a jak se
              projevují. Písemné oznámení kupující odešle do sídla
              prodávajícího.
            </li>
            <li>
              K reklamaci je nutné předložit kopii faktury a doklad o dodání a
              zaplacení zboží, jehož vady jsou reklamovány.
            </li>
            <li>
              Prodávající nepřebírá odpovědnost za škody vyplývající z užití
              produktů, funkčních vlastností a škod z neodborného používání
              produktů, stejně jako škod způsobených chybnou manipulací. Na
              vady tohoto původu se nevztahuje ani poskytnutá záruka.
            </li>
            <li>
              Prodávající se zavazuje informovat zákazníka nejpozději do tří
              dnů od obdržení reklamace o způsobu vyřízení reklamace.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
          <p className="text-sm text-muted-foreground">
            Provozovatel:{" "}
            <span className="text-foreground">
              David Havel, IČO: 19203144
            </span>
            , se sídlem Brixenská 3711, 580 01 Havlíčkův Brod.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            V Havlíčkově Brodě dne 02.01.2026
          </p>
        </div>
      </div>
    </main>
  )
}
