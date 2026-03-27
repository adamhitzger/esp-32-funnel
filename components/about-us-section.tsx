"use client"

import { Users, Award, Truck, Heart } from "lucide-react"

const stats = [
  { icon: Users, value: "30+", label: "Spokojených zákazníků" },
  { icon: Award, value: "100%", label: "Kvalitní komponenty" },
  { icon: Truck, value: "24h", label: "Expedice objednávek" },
  { icon: Heart, value: "CZ", label: "Česká podpora" },
]

export function AboutSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-cyan/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm font-medium mb-4">
            O nás
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Jsme tým nadšenců do elektroniky
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Založili jsme e-shop Espéčko.cz s jednoduchou vizí - přinést kvalitní elektronické komponenty 
            za dostupné ceny přímo k vám domů. Každý produkt osobně testujeme, abychom zajistili 
            tu nejlepší kvalitu.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-electric-cyan/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center mb-4 group-hover:bg-electric-cyan/20 transition-colors">
                <stat.icon className="w-6 h-6 text-electric-cyan" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Náš příběh</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Vše začalo ve škole, kde jsme jako studenti experimentovali 
                s mikrokontroléry a IoT projekty. Frustrovaní nedostupností kvalitních komponentů 
                za rozumné ceny jsme se rozhodli to změnit.
              </p>
              <p>
                Dnes nabízíme pečlivě vybrané elektronické součástky pro tvůrce, studenty i profesionály. 
                Každá deska ESP32, kterou prodáváme, prochází naším testováním, aby k vám dorazila 
                plně funkční a připravená na vaše projekty.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-electric-orange/20 bg-card/80 backdrop-blur-sm p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Proč my?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-electric-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan" />
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Testované produkty</strong> - Každý kus 
                  kontrolujeme před odesláním
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-electric-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan" />
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Rychlé dodání</strong> - Objednávky expedujeme 
                  do 24 hodin přes Zásilkovnu
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-electric-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan" />
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Česká podpora</strong> - Jsme tu pro vás 
                  s radou i pomocí v češtině
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-electric-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan" />
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Férové ceny</strong> - Žádné přemrštěné marže, 
                  jen kvalita za rozumnou cenu
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
