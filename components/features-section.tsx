import { Wifi, Bluetooth, Cpu, Gauge, Shield, Plug } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Dvoujádrový výkon",
    description: "Dvoujádrový procesor Xtensa LX6 běžící na 240MHz pro náročné aplikace."
  },
  {
    icon: Wifi,
    title: "WiFi 802.11 b/g/n",
    description: "Vestavěné WiFi s podporou WPA/WPA2 a podnikového zabezpečení."
  },
  {
    icon: Bluetooth,
    title: "Bluetooth 4.2 + BLE",
    description: "Klasický Bluetooth a Low Energy pro všestranné bezdrátové připojení."
  },
  {
    icon: Gauge,
    title: "520KB SRAM",
    description: "Dostatek paměti pro složité aplikace a zpracování dat."
  },
  {
    icon: Shield,
    title: "Bezpečný boot",
    description: "Hardwarové šifrování, bezpečný boot a podpora šifrování flash paměti."
  },
  {
    icon: Plug,
    title: "34 GPIO pinů",
    description: "Rozsáhlé I/O možnosti včetně ADC, DAC, PWM, I2C, SPI a UART."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--electric-cyan)_0%,_transparent_70%)] opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-electric-cyan">{"Výkonné"}</span>{" funkce"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            {"Vše, co potřebujete pro tvorbu připojených zařízení, od chytré domácnosti po průmyslová IoT řešení."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card/50 hover:border-electric-cyan/50 hover:bg-card transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-electric-cyan/10 flex items-center justify-center mb-4 group-hover:bg-electric-cyan/20 transition-colors">
                <feature.icon className="w-6 h-6 text-electric-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
