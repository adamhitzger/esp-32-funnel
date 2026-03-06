const specs = [
  { label: "Procesor", value: "Xtensa LX6 dvoujádrový" },
  { label: "Taktovací frekvence", value: "80–240 MHz" },
  { label: "Interní SRAM", value: "520 KB" },
  { label: "Flash paměť", value: "4 MB externí SPI Flash" },
  { label: "Wi-Fi", value: "802.11 b/g/n (2.4 GHz)" },
  { label: "Bluetooth", value: "v4.2 BR/EDR + BLE" },
  { label: "GPIO", value: "až 34 pinů (ne všechny plně univerzální)" },
  { label: "ADC", value: "až 18 kanálů, 12bit" },
  { label: "DAC", value: "2 kanály, 8bit" },
  { label: "Provozní napětí", value: "3,3 V" },
  { label: "Napájení přes USB", value: "5 V" },
  { label: "Rozměry desky", value: "cca 51 × 25,5 mm (dle verze)" },
]

export function SpecsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--electric-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--electric-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {"Technické "}<span className="text-electric-cyan">{"specifikace"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            {"Postaveno pro výkon. Navrženo pro všestrannost. Připraveno na jakýkoli projekt."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {specs.map((spec, index) => (
                <div 
                  key={spec.label}
                  className={`p-6 ${
                    index < specs.length - (specs.length % 3 || 3) ? "border-b border-border" : ""
                  } ${
                    (index + 1) % 3 !== 0 ? "md:border-r md:border-border" : ""
                  } ${
                    (index + 1) % 2 !== 0 ? "border-r border-border md:border-r" : ""
                  }`}
                >
                  <div className="text-sm text-muted-foreground mb-1 font-mono">{spec.label}</div>
                  <div className="text-lg font-semibold text-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
