import { Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-electric-cyan" />
            </div>
            <span className="font-bold text-foreground">Especko.cz</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-electric-cyan transition-colors">{"Produkty"}</a>
            <a href="#" className="text-muted-foreground hover:text-electric-cyan transition-colors">{"Dokumentace"}</a>
            <a href="#" className="text-muted-foreground hover:text-electric-cyan transition-colors">{"Podpora"}</a>
            <a href="#" className="text-muted-foreground hover:text-electric-cyan transition-colors">{"Kontakt"}</a>
          </nav>

          <Link href="https://www.thepay.eu/" target="_blank" rel="noopener" >
            <Image alt="The pay logo" width={256} height={128} src="https://demo.gate.thepay.cz/img/thepay-v2-220209-transparent-gpay.svg?pid=1051" />
          </Link>

          <p className="text-sm text-muted-foreground">
            {"© 2026 Especko.cz. Všechna práva vyhrazena."}
          </p>
        </div>
      </div>
    </footer>
  )
}
