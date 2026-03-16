
import Image from "next/image"
import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-electric-cyan" />
              </div>
              <span className="font-bold text-foreground">Espéčko.cz</span>
            </div>

            <Link href="https://www.csas.cz/cs/osobni-finance" target="_blank" rel="noopener" >
            <Image alt="Erste logo" width={150} height={96} src="/erste.png" />
          </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Produkt
              </Link>
              <Link href="/doprava-platba" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Doprava a platba
              </Link>
              <Link href="/reklamace" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Reklamace
              </Link>
            </nav>
          </div>

          {/* Legal links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link href="/podminky" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Obchodní podmínky
              </Link>
              <Link href="/zasady" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Zásady zpracování osobních údajů
              </Link>
              <Link href="/reklamace" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Reklamační řád
              </Link>
              <Link href="/unsubscribe" className="text-muted-foreground hover:text-electric-cyan transition-colors">
                Odhlášení z newsletteru
              </Link>
            </nav>
   
     <p className="text-xs text-muted-foreground text-center">
              Adam Hitzger, IČO: 19712049 | Ledečská 2984, 580 01 Havlíčkův Brod
            </p>
           
           
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">
            {"© 2026 Especko.cz. Všechna práva vyhrazena."}
          </p>
        </div>
      </div>
    </footer>
  )
}
