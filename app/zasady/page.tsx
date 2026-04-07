import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Zásady zpracování osobních údajů | especko.cz",
  description:
    "Zásady zpracování osobních údajů e-shopu especko.cz provozovaného Adamem Hitzgerem, IČO: 19712049.",
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
    url: "https://especko.cz/zasady",
    siteName: "especko.cz",
    title: "Zásady zpracování osobních údajů | especko.cz",
    description:
      "Zásady zpracování osobních údajů e-shopu especko.cz provozovaného Adamem Hitzgerem, IČO: 19712049.",
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
    title: "Zásady zpracování osobních údajů | especko.cz",
    description:
      "Zásady zpracování osobních údajů e-shopu especko.cz provozovaného Adamem Hitzgerem, IČO: 19712049.",
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
    canonical: "https://especko.cz/zasady",
  },
  icons: {
    icon: [{ url: "/especko.ico" }],
  },
}

const COMPANY = "Adam Hitzger"
const ICO = "19712049"
const ADDRESS = "Ledečská 2984, 580 01 Havlíčkův Brod"
const EMAIL = "info@especko.cz"

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
          <h1 className="text-3xl font-bold text-foreground">Zásady zpracování osobních údajů</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          OSVČ {COMPANY} se sídlem {ADDRESS} a identifikačním číslem (IČO) {ICO}, (dále jen
          &quot;správce&quot;) tímto v souladu s ustanovením článku 12 a násl. Nařízení Evropského parlamentu
          a Rady (EU) 2016/679 účinného od 25.5.2018 informuje své zákazníky o zpracování jejich osobních
          údajů v případě, že využijí jejich služeb.
        </p>

        <div className="space-y-6">
          {/* 1. Osobní údaje */}
          <section className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">1. Osobní údaje</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Správcem budou zpracovávány vaše následující osobní údaje:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Jméno a příjmení,</li>
              <li>doručovací adresa,</li>
              <li>telefonní číslo,</li>
              <li>e-mailová adresa,</li>
              <li>v případě podnikajících osob IČ, DIČ (dále jen &quot;osobní údaje&quot;).</li>
            </ul>
          </section>

          {/* 2. Účel zpracování */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">2. Účel zpracování</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Účelem zpracování osobních údajů je plnění povinností správce vyplývajících z kupní smlouvy
              uzavřené mezi vámi jako kupujícím a správcem jako prodávajícím, a plnění právních povinností
              správce vyplývajících z obecně závazných právních předpisů (zejména účetní a daňové předpisy).
            </p>
          </section>

          {/* 3. Příjemci osobních údajů */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">3. Příjemci osobních údajů</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Za účelem doručení zboží předává správce nezbytné osobní údaje (jméno, doručovací adresa,
              telefonní číslo) přepravní společnosti:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Zásilkovna s.r.o.</span>, IČO: 28408306, se
                sídlem Náměstí Republiky 1a, 110 00 Praha 1 —{" "}
                <a
                  href="https://www.zasilkovna.cz/ochrana-soukromi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-cyan hover:underline"
                >
                  zásady ochrany osobních údajů Zásilkovny
                </a>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Správce nepředává osobní údaje jiným třetím stranám ani je nevyužívá k marketingovým účelům
              bez vašeho souhlasu.
            </p>
          </section>

          {/* 4. Povinnost poskytnout osobní údaje */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              4. Povinnost poskytnout osobní údaje
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Osobní údaje je nezbytné správci poskytnout za účelem plnění práv a povinností vyplývajících z
              obsahu uzavřené kupní smlouvy. Bez poskytnutí těchto údajů nelze objednávku zpracovat ani zboží
              doručit.
            </p>
          </section>

          {/* 5. Doba zpracování */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">5. Doba zpracování</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Osobní údaje budou zpracovávány po dobu nezbytnou k plnění práv a povinností vyplývajících z
              uzavřené smlouvy a po dobu stanovenou právními předpisy (zejména po dobu archivace účetních
              dokladů dle zákona o účetnictví, tj. 5 let). Po uplynutí této doby budou údaje vymazány.
            </p>
          </section>

          {/* 6. Cookies */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">6. Soubory cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Webová stránka especko.cz využívá pouze technické cookies nezbytné pro správné fungování webu
              (např. pro zpracování objednávky). Tyto cookies nesledují vaše chování pro reklamní účely.
              Nastavení cookies můžete spravovat ve svém prohlížeči.
            </p>
          </section>

          {/* 7. Poučení subjektu údajů */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">7. Vaše práva</h2>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Ve vztahu ke svým osobním údajům máte právo:
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                <span className="text-foreground font-medium">Právo na přístup</span> — získat od správce
                potvrzení, zda jsou vaše osobní údaje zpracovávány, a pokud ano, získat k nim přístup.
              </li>
              <li>
                <span className="text-foreground font-medium">Právo na opravu</span> — požadovat opravu
                nepřesných nebo doplnění neúplných osobních údajů.
              </li>
              <li>
                <span className="text-foreground font-medium">Právo na výmaz</span> — požadovat výmaz
                osobních údajů, pokud již nejsou potřebné pro původní účel, zpracování je protiprávní nebo
                odvoláte souhlas (pokud bylo zpracování na souhlasu založeno).
              </li>
              <li>
                <span className="text-foreground font-medium">Právo na omezení zpracování</span> — požadovat
                omezení zpracování v zákonem stanovených případech.
              </li>
              <li>
                <span className="text-foreground font-medium">Právo na přenositelnost</span> — obdržet své
                osobní údaje ve strukturovaném, strojově čitelném formátu a předat je jinému správci.
              </li>
              <li>
                <span className="text-foreground font-medium">Právo vznést námitku</span> — vznést námitku
                proti zpracování osobních údajů.
              </li>
              <li>
                <span className="text-foreground font-medium">Právo podat stížnost</span> — obrátit se na
                Úřad pro ochranu osobních údajů (
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-cyan hover:underline"
                >
                  uoou.cz
                </a>
                ).
              </li>
            </ul>
            <div className="mt-4 rounded-xl bg-secondary/50 border border-border p-4">
              <p className="text-sm text-muted-foreground">
                Svá práva můžete uplatnit zasláním e-mailu na{" "}
                <a href={`mailto:${EMAIL}`} className="text-electric-cyan hover:underline">
                  {EMAIL}
                </a>
                . Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději do 30 dnů.
              </p>
            </div>
          </section>

          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <p className="text-xs text-muted-foreground">V Havlíčkově Brodě dne 02.01.2026</p>
          </div>
        </div>
      </div>
    </main>
  )
}