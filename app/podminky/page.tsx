import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description:
    "Obchodní podmínky e-shopu ElectroCore provozovaného Davidem Havlem, IČO: 19203144.",
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

const COMPANY = "David Havel"
const ICO = "19203144"
const ADDRESS = "Brixenská 3711, 580 01 Havlíčkův Brod"
const ACCOUNT = "123-7895890287/0100"
const EMAIL = "info@especko.cz"
const PHONE = "+420 605 017 703"
const WEB = "especko.cz"

export default function Podminky() {
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
            <FileText className="w-5 h-5 text-electric-cyan" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Obchodní podmínky
          </h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Obchodní firma {COMPANY} se sídlem {ADDRESS} a identifikačním číslem
          (IČO) {ICO} pro prodej zboží prostřednictvím on-line obchodu
          umístěného na internetové adrese www.{WEB}
        </p>

        <div className="space-y-6">
          {/* 1. Úvodní ustanovení */}
          <section className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              1. Úvodní ustanovení
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Tyto obchodní podmínky (dále jen &quot;obchodní podmínky&quot;)
                podnikatele {COMPANY}, se sídlem {ADDRESS}, identifikační
                číslo: {ICO} (dále jen &quot;prodávající&quot;) upravují v
                souladu s ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb.,
                občanský zákoník, ve znění pozdějších předpisů (dále jen
                &quot;občanský zákoník&quot;) vzájemná práva a povinnosti
                smluvních stran vzniklé v souvislosti nebo na základě kupní
                smlouvy (dále jen &quot;kupní smlouva&quot;) uzavírané mezi
                prodávajícím a jinou fyzickou osobou (dále jen
                &quot;kupující&quot;) prostřednictvím internetového obchodu
                prodávajícího. Internetový obchod je prodávajícím provozován na
                webové stránce umístěné na internetové adrese www.{WEB} (dále
                jen &quot;webová stránka&quot;).
              </li>
              <li>
                Obchodní podmínky se nevztahují na případy, kdy osoba, která má
                v úmyslu nakoupit zboží od prodávajícího, je právnickou osobou
                či osobou, jež jedná při objednávání zboží v rámci své
                podnikatelské činnosti nebo v rámci svého samostatného výkonu
                povolání.
              </li>
              <li>
                Ustanovení odchylná od obchodních podmínek je možné sjednat v
                kupní smlouvě. Odchylná ujednání v kupní smlouvě mají přednost
                před ustanoveními obchodních podmínek.
              </li>
              <li>
                Ustanovení obchodních podmínek jsou nedílnou součástí kupní
                smlouvy. Kupní smlouva a obchodní podmínky jsou vyhotoveny v
                českém jazyce. Kupní smlouvu lze uzavřít v českém jazyce.
              </li>
              <li>
                Znění obchodních podmínek může prodávající měnit či doplňovat.
                Tímto ustanovením nejsou dotčena práva a povinnosti vzniklá po
                dobu účinnosti předchozího znění obchodních podmínek.
              </li>
            </ul>
          </section>

          {/* 2. Uzavření kupní smlouvy */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              2. Uzavření kupní smlouvy
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Veškerá prezentace zboží umístěná ve webovém rozhraní obchodu
                je informativního charakteru a prodávající není povinen uzavřít
                kupní smlouvu ohledně tohoto zboží. Ustanovení § 1732 odst. 2
                občanského zákoníku se nepoužije.
              </li>
              <li>
                Webové rozhraní obchodu obsahuje informace o zboží, a to
                včetně uvedení cen jednotlivého zboží a nákladů za navrácení
                zboží. Ceny zboží jsou uvedeny včetně daně z přidané hodnoty a
                všech souvisejících poplatků. Ceny zboží zůstávají v platnosti
                po dobu, kdy jsou zobrazovány ve webovém rozhraní obchodu.
              </li>
              <li>
                Pro objednání zboží vyplní kupující objednávkový formulář ve
                webovém rozhraní obchodu. Objednávku odešle kupující
                prodávajícímu kliknutím na tlačítko &quot;Objednat&quot;. Údaje
                uvedené v objednávce jsou prodávajícím považovány za správné.
              </li>
              <li>
                Smluvní vztah mezi prodávajícím a kupujícím vzniká doručením
                přijetí objednávky (akceptací), jež je prodávajícím zasláno
                kupujícímu elektronickou poštou, a to na adresu elektronické
                pošty kupujícího.
              </li>
              <li>
                Kupující souhlasí s použitím komunikačních prostředků na dálku
                při uzavírání kupní smlouvy.
              </li>
            </ul>
          </section>

          {/* 3. Cena zboží a platební podmínky */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              3. Cena zboží a platební podmínky
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Cenu zboží a případné náklady spojené s dodáním zboží dle kupní
                smlouvy může kupující uhradit prodávajícímu následujícími
                způsoby:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    v hotovosti na dobírku v místě určeném kupujícím v
                    objednávce;
                  </li>
                  <li>
                    bezhotovostně převodem na účet prodávajícího č. {ACCOUNT},
                    vedený u společnosti Fio Banka, a.s.
                  </li>
                </ul>
              </li>
              <li>
                Společně s kupní cenou je kupující povinen zaplatit
                prodávajícímu také náklady spojené s balením a dodáním zboží ve
                smluvené výši.
              </li>
              <li>
                V případě platby na dobírku je kupní cena splatná při převzetí
                zboží. V případě bezhotovostní platby je kupní cena splatná do
                7 dnů od uzavření kupní smlouvy.
              </li>
              <li>
                V případě bezhotovostní platby je kupující povinen uhrazovat
                kupní cenu zboží společně s uvedením variabilního symbolu
                platby.
              </li>
              <li>
                Případné slevy z ceny zboží poskytnuté prodávajícím kupujícímu
                nelze vzájemně kombinovat.
              </li>
            </ul>
          </section>

          {/* 4. Odstoupení od kupní smlouvy */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              4. Odstoupení od kupní smlouvy
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Kupující bere na vědomí, že dle ustanovení § 1837 občanského
                zákoníku nelze mimo jiné odstoupit od kupní smlouvy o dodávce
                zboží, které bylo upraveno podle přání kupujícího nebo pro jeho
                osobu.
              </li>
              <li>
                Nejedná-li se o případ uvedený výše či o jiný případ, kdy nelze
                od kupní smlouvy odstoupit, má kupující v souladu s ustanovením
                § 1829 odst. 1 občanského zákoníku právo od kupní smlouvy
                odstoupit, a to do čtrnácti (14) dnů od převzetí zboží.
              </li>
              <li>
                V případě odstoupení od kupní smlouvy se kupní smlouva od
                počátku ruší. Zboží musí být kupujícím prodávajícímu vráceno do
                čtrnácti (14) dnů od doručení odstoupení od kupní smlouvy.
                Odstoupí-li kupující od kupní smlouvy, nese kupující náklady
                spojené s navrácením zboží prodávajícímu.
              </li>
              <li>
                V případě odstoupení vrátí prodávající peněžní prostředky
                přijaté od kupujícího do čtrnácti (14) dnů od odstoupení, a to
                stejným způsobem, jakým je od kupujícího přijal.
              </li>
            </ul>
          </section>

          {/* 5. Přeprava a dodání zboží */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              5. Přeprava a dodání zboží
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Je-li prodávající podle kupní smlouvy povinen dodat zboží na
                místo určené kupujícím v objednávce, je kupující povinen převzít
                zboží při dodání.
              </li>
              <li>
                V případě, že je z důvodů na straně kupujícího nutno zboží
                doručovat opakovaně nebo jiným způsobem, než bylo uvedeno v
                objednávce, je kupující povinen uhradit náklady spojené s
                opakovaným doručováním zboží.
              </li>
              <li>
                Při převzetí zboží od přepravce je kupující povinen zkontrolovat
                neporušenost obalů zboží a v případě jakýchkoliv závad toto
                neprodleně oznámit přepravci.
              </li>
            </ul>
          </section>

          {/* 6. Práva z vadného plnění */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              6. Práva z vadného plnění
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Prodávající odpovídá kupujícímu, že zboží při převzetí nemá
                vady. Zejména prodávající odpovídá kupujícímu, že v době, kdy
                kupující zboží převzal, má zboží vlastnosti, které si strany
                ujednaly, se hodí k účelu, který pro jeho použití prodávající
                uvádí, a je v odpovídajícím množství.
              </li>
              <li>
                Projeví-li se vada v průběhu šesti měsíců od převzetí, má se za
                to, že zboží bylo vadné již při převzetí. Kupující je oprávněn
                uplatnit právo z vady, která se vyskytne u spotřebního zboží v
                době dvaceti čtyř měsíců od převzetí.
              </li>
              <li>
                Další práva a povinnosti stran související s odpovědností
                prodávajícího za vady může upravit reklamační řád prodávajícího.
              </li>
            </ul>
          </section>

          {/* 7. Ochrana osobních údajů a cookies */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              7. Ochrana osobních údajů a cookies
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Svou informační povinnost vůči kupujícímu ve smyslu čl. 13
                Nařízení Evropského parlamentu a Rady 2016/679 o ochraně
                fyzických osob v souvislosti se zpracováním osobních údajů
                (GDPR) plní prodávající prostřednictvím zvláštního dokumentu.
              </li>
              <li>
                Kupující souhlasí s ukládáním tzv. cookies na jeho počítač. V
                případě, že je nákup na webové stránce možné provést bez
                ukládání cookies, může kupující souhlas kdykoliv odvolat.
              </li>
            </ul>
          </section>

          {/* 8. Závěrečná ustanovení */}
          <section className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              8. Závěrečná ustanovení
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                K mimosoudnímu řešení spotřebitelských sporů z kupní smlouvy je
                příslušná Česká obchodní inspekce, se sídlem Štěpánská 567/15,
                120 00 Praha 2, IČ: 000 20 869, internetová adresa:{" "}
                <a
                  href="https://adr.coi.cz/cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-cyan hover:underline"
                >
                  adr.coi.cz
                </a>
                .
              </li>
              <li>
                Kontaktní údaje prodávajícího: adresa pro doručování {ADDRESS},
                adresa elektronické pošty{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-electric-cyan hover:underline"
                >
                  {EMAIL}
                </a>
                , telefon{" "}
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="text-electric-cyan hover:underline"
                >
                  {PHONE}
                </a>
                .
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
