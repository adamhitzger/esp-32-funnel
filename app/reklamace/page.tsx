import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
  title: "Reklamační řád | especko.cz",
  description:
    "Reklamační řád e-shopu especko.cz. Jak reklamovat nebo vrátit zboží zakoupené na especko.cz.",
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
    url: "https://especko.cz/reklamace",
    siteName: "especko.cz",
    title: "Reklamační řád | especko.cz",
    description:
      "Reklamační řád e-shopu especko.cz. Jak reklamovat nebo vrátit zboží zakoupené na especko.cz.",
    images: [
      {
        url: "/images/esp32.png",
        width: 1200,
        height: 630,
        alt: "ESP32 DevKit vývojová deska",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reklamační řád | especko.cz",
    description:
      "Reklamační řád e-shopu especko.cz. Jak reklamovat nebo vrátit zboží zakoupené na especko.cz.",
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
    canonical: "https://especko.cz/reklamace",
  },
  icons: {
    icon: [{ url: "/especko.ico" }],
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
          <h1 className="text-3xl font-bold text-foreground">Reklamační řád</h1>
        </div>

        {/* Vrácení zboží */}
        <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Vrácení zboží (odstoupení od smlouvy)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Zakoupené zboží můžete vrátit bez udání důvodu do 14 dnů od převzetí zásilky. Vrácení probíhá
            jednoduše přes náš online formulář:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground leading-relaxed mb-6">
            <li>
              Přejděte na stránku{" "}
              <Link href="/vraceni" className="text-electric-cyan hover:underline">
                Vráceni
              </Link>{" "}
              a zadejte e-mail nebo telefonní číslo z vaší objednávky.
            </li>
            <li>Na zadaný e-mail vám přijde trasovací číslo zásilkovny a odkaz na vratkový portál.</li>
            <li>
              Klikněte na tlačítko{" "}
              <Link
                href="https://returns.packeta.com/cs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-cyan hover:underline"
              >
                vratkový portál Zásilkovny
              </Link>
              , kde zadáte kód a zásilkovna se postará o vše další.
            </li>
            <li>Peníze vám vrátíme do 14 dnů od obdržení zásilky zpět.</li>
          </ol>
          <div className="rounded-xl bg-secondary/50 border border-border p-4 text-sm text-muted-foreground">
            Zboží musí být vráceno nepoškozené, v původním stavu a pokud možno v původním.
          </div>
        </div>

        {/* Reklamace */}
        <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Reklamace vadného zboží</h2>
          <ol className="list-decimal pl-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <li>
              Kupující je oprávněn uplatnit právo z vady, která se vyskytne u zboží do 24 měsíců od převzetí.
              Projeví-li se vada v průběhu prvních 6 měsíců od převzetí, má se za to, že zboží bylo vadné již
              při převzetí.
            </li>
            <li>
              Reklamaci uplatněte e-mailem na{" "}
              <a href="mailto:info@especko.cz" className="text-electric-cyan hover:underline">
                info@especko.cz
              </a>
              . V e-mailu popište zjištěné vady a jak se projevují, a přiložte číslo objednávky nebo
              potvrzení o nákupu (např. potvrzovací e-mail). Fyzický doklad o zaplacení není při dobírce
              vyžadován.
            </li>
            <li>
              Prodávající nepřebírá odpovědnost za škody vzniklé neodborným používáním produktů nebo
              chybnou manipulací. Na vady tohoto původu se nevztahuje záruka.
            </li>
            <li>
              Prodávající se zavazuje informovat zákazníka nejpozději do 3 pracovních dnů od obdržení
              reklamace o způsobu jejího vyřízení.
            </li>
          </ol>
        </div>

        {/* Mimosoudní řešení sporů */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Mimosoudní řešení sporů</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            K mimosoudnímu řešení spotřebitelských sporů je příslušná Česká obchodní inspekce, se sídlem
            Štěpánská 567/15, 120 00 Praha 2, IČ: 000 20 869,{" "}
            <a
              href="https://adr.coi.cz/cs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-cyan hover:underline"
            >
              adr.coi.cz
            </a>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
          <p className="text-sm text-muted-foreground">
            Provozovatel:{" "}
            <span className="text-foreground">Adam Hitzger, IČO: 19712049</span>, se sídlem Ledečská 2984,
            580 01 Havlíčkův Brod
          </p>
          <p className="text-xs text-muted-foreground mt-2">V Havlíčkově Brodě dne 02.01.2026</p>
        </div>
      </div>
    </main>
  )
}