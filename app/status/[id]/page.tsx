import { sanityClient } from "@/sanity/lib/client"
import { GET_ORDER_BY_ID } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import Link from "next/link"
import { UNIT_PRICE } from "@/lib/utils"
import Image from "next/image"
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  CreditCard,
  Tag,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Check,
} from "lucide-react"
import { Order } from "@/types"



const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "Přijatá",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    icon: <Clock className="w-4 h-4" />,
  },
  paid: {
    label: "Zaplacená",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    icon: <Check className="w-4 h-4 animate-pulse" />,
  },
  shipped: {
    label: "Odesláná",
    color: "text-electric-cyan bg-electric-cyan/10 border-electric-cyan/30",
    icon: <Truck className="w-4 h-4" />,
  },
  delivered: {
    label: "Vyzvednutá",
    color: "text-green-400 bg-green-400/10 border-green-400/30",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  cancelled: {
    label: "Zrušená",
    color: "text-red-400 bg-red-400/10 border-red-400/30",
    icon: <XCircle className="w-4 h-4" />,
  },
  refunded: {
    label: "Vrácená",
    color: "text-red-400 bg-red-400/10 border-red-400/30",
    icon: <XCircle className="w-4 h-4" />,
  },
}

const STATUS_TRANSLATION: Record<string, string> = {
  "Přijatá": "pending",
  "Zaplacená": "paid",
  "Odesláná": "shipped",
  "Vyzvednutá": "delivered",
  "Zrušená": "cancelled",
  "Vrácená": "refunded",
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const order: Order | null = await sanityClient.fetch(GET_ORDER_BY_ID, { id })
  console.log(order)
  if (!order) {
    notFound()
  }

  const normalizedStatus = STATUS_TRANSLATION[order.status]
  const status = STATUS_MAP[normalizedStatus]
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{"Zpět na hlavní stránku"}</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{"Detail objednávky"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {"ID:"} <span className="font-mono text-foreground/70">{id}</span>
            </p>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${status.color}`}>
            {status.icon}
            {status.label}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product */}
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-electric-cyan" />
              <h2 className="text-lg font-semibold text-foreground">{"Produkt"}</h2>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-xl bg-secondary/50 border border-border overflow-hidden shrink-0">
                <Image
                  src="/images/esp32.jpg"
                  alt="ESP32 DevKit"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{"ESP32-WROOM-32 DevKit"}</h3>
                <p className="text-sm text-muted-foreground">{"Vývojová deska s USB-C"}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {"Množství:"} <span className="text-foreground font-medium">{order.quantity} ks</span>
                </p>
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"Cena za kus"}</span>
                <span className="text-foreground">{UNIT_PRICE} Kč</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"Počet"}</span>
                <span className="text-foreground">{order.quantity} ks</span>
              </div>
              {order.couponValue && order.couponValue > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {"Sleva"}
                  </span>
                  <span className="text-electric-cyan font-medium">-${order.couponValue.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"Doprava"}</span>
                <span className={`font-medium ${order.del_price ? "text-electric-cyan" : "text-foreground"}`}>
                  {order.del_price  ? "Zdarma" : `89 Kč`}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-semibold text-foreground">{"Celkem"}</span>
                <span className="text-2xl font-bold text-electric-cyan">{order.total.toFixed(2)} Kč</span>
              </div>
            </div>
          </div>

          {/* Contact & Shipping */}
          <div className="space-y-6">
            {/* Contact info */}
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-electric-cyan" />
                <h2 className="text-lg font-semibold text-foreground">{"Kontaktní údaje"}</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Jméno"}</span>
                  <span className="text-foreground font-medium">{order.firstName} {order.lastName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"E-mail"}</span>
                  <span className="text-foreground font-medium">{order.email}</span>
                </div>
                {order.phone && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{"Telefon"}</span>
                    <span className="text-foreground font-medium">{order.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping address */}
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-electric-cyan" />
                <h2 className="text-lg font-semibold text-foreground">{"Dodací adresa"}</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Ulice"}</span>
                  <span className="text-foreground font-medium">{order.address} {order.adr_number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"Město"}</span>
                  <span className="text-foreground font-medium">{order.city}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{"PSČ"}</span>
                  <span className="text-foreground font-medium">{order.psc}</span>
                </div>
              </div>
            </div>

            {/* Zasilkovna */}
            {order.packetaId && (
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-electric-cyan" />
                  <h2 className="text-lg font-semibold text-foreground">{"Zásilkovna"}</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{"ID pobočky"}</span>
                    <span className="text-foreground font-medium font-mono">{order.packetaId}</span>
                  </div>
                  {order.packetaAddress && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{"Adresa pobočky"}</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">{order.packetaAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-electric-cyan" />
                <h2 className="text-lg font-semibold text-foreground">{"Platba"}</h2>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{"Stav"}</span>
                <span className={`font-medium ${status.color.split(" ")[0]}`}>{status.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
