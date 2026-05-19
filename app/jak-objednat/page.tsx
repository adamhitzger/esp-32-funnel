import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, User, CreditCard, Package, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Jak objednat",
  description:
    "Jednoduchý návod jak objednat ESP32 na našem e-shopu. Zvolte množství, vyplňte údaje, vyberte platbu a sledujte status.",
}

const steps = [
  {
    number: 1,
    icon: ShoppingCart,
    title: "Vyberte produkt a množství",
    description:
      "Na hlavní stránce si prohlédněte ESP32 DevKit V1. Zvolte požadované množství pomocí tlačítek + a -. Při větším množství se automaticky uplatní množstevní sleva podle ceníku. Klikněte na tlačítko \"Objednat\" pro přechod k pokladně.",
    highlights: [
      "Prohlédněte si fotogalerii produktu",
      "Zvolte množství kusů",
      "Množstevní slevy se aplikují automaticky",
      "Klikněte na \"Objednat\"",
    ],
    image: "/images/jak-objednat-1.png",
  },
  {
    number: 2,
    icon: User,
    title: "Vyplňte údaje a vyberte platbu",
    description:
      "Vyplňte své kontaktní údaje (jméno, e-mail, telefon) a doručovací adresu. Zvolte způsob platby - doporučujeme online platbu přes Comgate pro rychlejší zpracování, nebo můžete zvolit dobírku. Následně vyberte výdejní místo Zásilkovny nebo Z-BOX poblíž vás.",
    highlights: [
      "Zadejte kontaktní údaje",
      "Vyplňte doručovací adresu",
      "Vyberte platbu online (Comgate) nebo dobírku",
      "Zvolte výdejní místo Zásilkovny",
    ],
    image: "/images/jak-objednat-2.png",
  },
  {
    number: 3,
    icon: CreditCard,
    title: "Dokončete platbu",
    description:
      "Pokud jste zvolili online platbu, budete přesměrováni na zabezpečenou platební bránu Comgate. Vyberte preferovanou platební metodu - QR platbu, platbu kartou (Visa, Mastercard), bankovní převod nebo platbu jedním klikem. Po úspěšném ověření platby obdržíte potvrzení.",
    highlights: [
      "Vyberte platební metodu na Comgate",
      "Zadejte platební údaje",
      "Počkejte na ověření platby",
      "Obdržíte potvrzení e-mailem",
    ],
    image: "/images/jak-objednat-3.png",
  },
  {
    number: 4,
    icon: Package,
    title: "Sledujte stav objednávky",
    description:
      "Po dokončení objednávky budete přesměrováni na stránku se stavem objednávky. Zde uvidíte všechny detaily včetně čísla objednávky, způsobu platby a aktuálního stavu zpracování. Na e-mail obdržíte také potvrzení s informacemi o zásilce.",
    highlights: [
      "Zobrazí se status objednávky",
      "Uvidíte číslo objednávky",
      "E-mailem obdržíte potvrzení",
      "Sledujte zásilku přes Zásilkovnu",
    ],
    image: null,
  },
]

export default function JakObjednatPage() {
  return (
    <main className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric-cyan transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na hlavní stránku
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Jak objednat na našem e-shopu
          </h1>
          <p className="text-muted-foreground text-lg">
            Jednoduchý návod ve 4 krocích, jak si objednat ESP32 DevKit.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 md:space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden"
            >
              {/* Step header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-electric-cyan" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-electric-cyan">
                        Krok {step.number}
                      </span>
                      {index < steps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Step content */}
              <div className="p-6">
                <div className={`grid gap-6 ${step.image ? "md:grid-cols-2" : ""}`}>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      {step.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-electric-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-electric-cyan">
                              {i + 1}
                            </span>
                          </div>
                          <span className="text-sm text-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {step.image && (
                    <div className="rounded-xl overflow-hidden border border-border bg-secondary/30">
                      <Image
                        src={step.image}
                        alt={`Krok ${step.number}: ${step.title}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="rounded-2xl border border-electric-cyan/20 bg-electric-cyan/5 p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Připraveni objednat?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Objednejte si ESP32 DevKit ještě dnes a začněte s vaším IoT projektem!
            </p>
            <Button asChild size="lg" className="bg-electric-cyan text-background hover:bg-electric-cyan/90">
              <Link href="/">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Přejít do obchodu
              </Link>
            </Button>
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Potřebujete pomoc?
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Pokud máte jakékoliv dotazy ohledně objednávky, neváhejte nás kontaktovat.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:info@especko.cz"
              className="text-electric-cyan hover:underline"
            >
              info@especko.cz
            </a>
            <span className="text-muted-foreground">|</span>
            <Link
              href="/doprava-platba"
              className="text-electric-cyan hover:underline"
            >
              Doprava a platba
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              href="/reklamace"
              className="text-electric-cyan hover:underline"
            >
              Reklamace
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}