import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft, RefreshCcw, Mail, ShieldX } from "lucide-react"
import { Suspense } from "react"

const ERROR_MAP: Record<string, { title: string; description: string }> = {
  card_declined: {
    title: "Karta byla odmítnuta",
    description:
      "Vaše banka odmítla transakci. Zkontrolujte údaje na kartě nebo použijte jinou platební metodu.",
  },
  insufficient_funds: {
    title: "Nedostatek prostředků",
    description:
      "Na vašem účtu není dostatek prostředků pro dokončení platby. Zkuste jinou kartu.",
  },
  expired_card: {
    title: "Karta vypršela",
    description:
      "Platnost vaší karty vypršela. Použijte prosím kartu s platnou dobou platnosti.",
  },
  processing_error: {
    title: "Chyba zpracování",
    description:
      "Došlo k chybě při zpracování platby. Zkuste to prosím znovu za chvíli.",
  },
  default: {
    title: "Platba se nezdařila",
    description:
      "Při zpracování vaší platby došlo k neočekávané chybě. Zkuste to prosím znovu nebo nás kontaktujte.",
  },
}

export default async  function ErrorContent({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const errorCode = params.code || "default"
  const quantity = params.quantity || "1"

  const error = ERROR_MAP[errorCode] || ERROR_MAP.default

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-electric-cyan/30 border-t-electric-cyan rounded-full animate-spin" />
        </div>
      }
    >
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-electric-orange/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-lg">
        <div className="rounded-2xl border border-red-500/20 bg-card/80 backdrop-blur-sm p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
            <ShieldX className="w-10 h-10 text-red-400" />
          </div>

          {/* Error code badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-mono text-red-400 uppercase">
              {errorCode.replace(/_/g, " ")}
            </span>
          </div>

          {/* Title and description */}
          <h1 className="text-2xl font-bold text-foreground mb-3 text-balance">
            {error.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
            {error.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="w-full h-12 font-semibold bg-electric-cyan hover:bg-electric-cyan/90 text-background shadow-[0_0_20px_rgba(0,200,255,0.3)] hover:shadow-[0_0_30px_rgba(0,200,255,0.5)] transition-all"
            >
              <Link href={`/checkout?quantity=${quantity}`}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                {"Zkusit znovu"}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full h-12 border-border hover:bg-secondary/50"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {"Zpět na produkt"}
              </Link>
            </Button>
          </div>

          {/* Help section */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              {"Problém přetrvává? Kontaktujte nás."}
            </p>
            <a
              href="mailto:info@especko.cz"
              className="inline-flex items-center gap-2 text-sm text-electric-cyan hover:text-electric-cyan/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@especko.cz
            </a>
          </div>
        </div>

        {/* Security note */}
        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          {"Žádné peníze nebyly strženy. Vaše platební údaje jsou v bezpečí."}
        </p>
      </div>
    </div>
     </Suspense>
  )
}
