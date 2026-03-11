import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Zásady zpracování osobních údajů",
  description:
    "Zásady zpracování osobních údajů e-shopu especko.cz provozovaného Adamem Hitzgerem, IČO: 19203144.",
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


const COMPANY2 = "Adam Hitzger"
const ICO2 = "19712049"
const ADDRESS2 = "Ledečská 2984, 580 01 Havlíčkův Brod"

export default function Zasady() {
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-electric-cyan" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Zásady zpracování osobních údajů
          </h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          OSVČ {COMPANY2} se sídlem {ADDRESS2} a identifikačním číslem
          (IČO) {ICO2}, (dále jen &quot;správce&quot;) tímto v souladu s
          ustanovením článku 12 a násl. Nařízení Evropského parlamentu a Rady
          (EU) 2016/679 účinného od 25.5.2018 informuje své zákazníky o
          zpracování jejich osobních údajů v případě, že využijí jejich služeb.
        </p>

        <div className="space-y-6">
          {/* 1. Osobní údaje */}
          <section className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              1. Osobní údaje
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Správcem budou zpracovávány vaše následující osobní údaje:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Jméno a příjmení,</li>
              <li>adresa,</li>
              <li>telefonní číslo,</li>
              <li>e-mail,</li>
              <li>
                v případě podnikajících osob IČ, DIČ (dále jen &quot;osobní
                údaje&quot;).
              </li>
            </ul>
          </section>

          {/* 2. Účel zpracování */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              2. Účel zpracování
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Účelem zpracování osobních údajů je plnění právních povinností
              správce vyplývajících z obsahu uzavřené smlouvy mezi vámi jako
              kupujícím a správcem jako prodávajícím, a plnění právních
              povinností správce vyplývajících z obecně závazných právních
              předpisů.
            </p>
          </section>

          {/* 3. Povinnost poskytnout osobní údaje */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              3. Povinnost poskytnout osobní údaje
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Osobní údaje je nezbytné správci poskytnout za účelem plnění práv
              a povinností vyplývajících z obsahu uzavřené smlouvy.
            </p>
          </section>

          {/* 4. Doba zpracování */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              4. Doba zpracování
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Osobní údaje mohou být správcem zpracovávány po dobu nezbytnou k
              plnění práv a povinností vyplývajících z uzavřené smlouvy,
              případně po dobu nezbytně nutnou k vyřešení sporů majících svůj
              původ v uzavřené smlouvě.
            </p>
          </section>

          {/* 5. Poučení subjektu údajů */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              5. Poučení subjektu údajů
            </h2>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Prodávající informuje své zákazníky, že mají právo:
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Získat od správce potvrzení, zda osobní údaje, které se jich
                týkají, jsou či nejsou zpracovávány, a pokud je tomu tak, mají
                právo získat přístup k těmto osobním údajům a k informacím o
                účelech zpracování, kategoriích dotčených osobních údajů,
                příjemcích, plánované době uložení a existenci práva požadovat
                opravu nebo výmaz.
              </li>
              <li>
                Aby správce bez zbytečného odkladu opravil nepřesné osobní
                údaje, které se jich týkají. S přihlédnutím k účelům zpracování
                mají právo na doplnění neúplných osobních údajů.
              </li>
              <li>
                Aby správce bez zbytečného odkladu vymazal osobní údaje, které
                se jich týkají, pokud osobní údaje již nejsou potřebné pro
                účely, pro které byly shromážděny, zákazník odvolá souhlas,
                osobní údaje byly zpracovány protiprávně, nebo musí být
                vymazány ke splnění právní povinnosti.
              </li>
              <li>
                Aby správce omezil zpracování jejich osobních údajů, pokud
                popírají jejich přesnost na dobu ověření, zpracování je
                protiprávní, nebo údaje již nejsou potřebné pro účel zpracování,
                avšak jsou potřebné pro určení, výkon nebo obhajobu právních
                nároků.
              </li>
              <li>
                Aby správce na jejich žádost předal jejich osobní údaje jinému
                jimi určenému správci.
              </li>
              <li>Vznést námitku proti zpracování osobních údajů u správce.</li>
              <li>
                V případě pochybností se obrátit jak na správce, tak na Úřad
                pro ochranu osobních údajů.
              </li>
            </ul>
          </section>

          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <p className="text-xs text-muted-foreground">
              V Havlíčkově Brodě dne 02.01.2026
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
