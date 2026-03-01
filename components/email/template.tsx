import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
  Font,
  render,
} from "@react-email/components"
import { UNIT_PRICE } from "@/lib/utils"
import { Order } from "@/types";


const STATUS_MAP: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "Přijatá": { label: "Přijatá", color: "#facc15", bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.3)" },
  "Zaplacená": { label: "Zaplacená", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)" },
  "Odeslaná": { label: "Odeslaná", color: "#00c8ff", bg: "rgba(0,200,255,0.1)", border: "rgba(0,200,255,0.3)" },
  "Vyzvednutá": { label: "Vyzvednutá", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)" },
  "Zrušená": { label: "Zrušená", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
  "Vrácená": { label: "Vrácená", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
}

const COMPANY = {
  name: "ElectroCore",
  street: "Technická 42",
  city: "Praha 6",
  psc: "160 00",
  ico: "12345678",
  dic: "CZ12345678",
  email: "info@especko.cz",
}

const bg = "#1a1a2e"
const card = "#222240"
const borderColor = "#333355"
const textPrimary = "#e8e8f0"
const textMuted = "#8888aa"
const accent = "#00c8ff"

function TableRow({
  label,
  value,
  valueColor,
  mono,
}: {
  label: string
  value: string
  valueColor?: string
  mono?: boolean
}) {
  return (
    <Row>
      <Column style={{ padding: "6px 0" }}>
        <Text style={{ margin: 0, fontSize: 13, color: textMuted }}>{label}</Text>
      </Column>
      <Column align="right" style={{ padding: "6px 0" }}>
        <Text
          style={{
            margin: 0,
            fontSize: 13,
            color: valueColor ?? textPrimary,
            fontWeight: 500,
            fontFamily: mono ? "monospace" : "inherit",
          }}
        >
          {value}
        </Text>
      </Column>
    </Row>
  )
}

interface OrderStatusEmailProps {
  order: Order
}

export function OrderStatusEmail({ order }: OrderStatusEmailProps) {
  const status = STATUS_MAP[order.status] ?? STATUS_MAP["Přijatá"]
  const unitPrice = UNIT_PRICE
  const subtotal = unitPrice * order.quantity
  const coupon = order.couponValue ? parseFloat(order.couponValue) : 0
  const baseUrl = "https://especko.cz"
  return (
    <Html lang="cs">
      <Head>
        <Font
          fontFamily="Segoe UI"
          fallbackFontFamily="Helvetica"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        Objednávka {order._id} – {status.label}
      </Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: bg, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "32px 16px" }}>

          {/* Header */}
          <Section style={{ textAlign: "center" as const, paddingBottom: 24 }}>
            <Heading style={{ margin: 0, fontSize: 24, fontWeight: 700, color: accent, letterSpacing: "-0.5px" }}>
              {COMPANY.name}
            </Heading>
            <Text style={{ margin: "8px 0 0", fontSize: 13, color: textMuted }}>
              {COMPANY.street}, {COMPANY.city}, {COMPANY.psc}
            </Text>
            <Text style={{ margin: "2px 0 0", fontSize: 13, color: textMuted }}>
              IČO: {COMPANY.ico} | DIČ: {COMPANY.dic}
            </Text>
          </Section>

          {/* Status badge */}
          <Section style={{ textAlign: "center" as const, paddingBottom: 24 }}>
            <Text
              style={{
                display: "inline-block",
                padding: "10px 24px",
                borderRadius: 999,
                backgroundColor: status.bg,
                border: `1px solid ${status.border}`,
                color: status.color,
                fontSize: 14,
                fontWeight: 600,
                margin: 0,
              }}
            >
              {status.label}
            </Text>
          </Section>

          {/* Title */}
          <Section style={{ textAlign: "center" as const, paddingBottom: 8 }}>
            <Heading as="h2" style={{ margin: 0, fontSize: 20, fontWeight: 700, color: textPrimary }}>
              Detail objednávky
            </Heading>
            <Text style={{ margin: "6px 0 0", fontSize: 13, color: textMuted, fontFamily: "monospace" }}>
              ID: {order._id}
            </Text>
          </Section>

          {/* Products table */}
          <Section
            style={{
              backgroundColor: card,
              border: `1px solid ${borderColor}`,
              borderRadius: 16,
              padding: 24,
              marginTop: 24,
            }}
          >
            <Heading as="h3" style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: accent }}>
              Souhrn produktů
            </Heading>

            {/* Header row */}
            <Row style={{ borderBottom: `1px solid ${borderColor}` }}>
              <Column style={{ padding: "8px 0", fontSize: 12, color: textMuted, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
                <Text style={{ margin: 0, fontSize: 12, color: textMuted }}>Produkt</Text>
              </Column>
              <Column align="center" style={{ padding: "8px 0" }}>
                <Text style={{ margin: 0, fontSize: 12, color: textMuted, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Množství</Text>
              </Column>
              <Column align="center" style={{ padding: "8px 0" }}>
                <Text style={{ margin: 0, fontSize: 12, color: textMuted, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Cena/ks</Text>
              </Column>
              <Column align="right" style={{ padding: "8px 0" }}>
                <Text style={{ margin: 0, fontSize: 12, color: textMuted, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Celkem</Text>
              </Column>
            </Row>

            {/* Product row */}
            <Row style={{ borderBottom: `1px solid #2a2a48` }}>
              <Column style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textPrimary, fontWeight: 500 }}>ESP32-WROOM-32 DevKit</Text>
              </Column>
              <Column align="center" style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textPrimary }}>{order.quantity} ks</Text>
              </Column>
              <Column align="center" style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textPrimary }}>{unitPrice} Kč</Text>
              </Column>
              <Column align="right" style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textPrimary, fontWeight: 600 }}>{subtotal} Kč</Text>
              </Column>
            </Row>

            {/* Shipping row */}
            <Row style={{ borderBottom: `1px solid #2a2a48` }}>
              <Column style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textMuted }}>Doprava – Zásilkovna</Text>
              </Column>
              <Column align="center" style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textMuted }}>–</Text>
              </Column>
              <Column align="center" style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: textMuted }}>–</Text>
              </Column>
              <Column align="right" style={{ padding: "12px 0" }}>
                <Text style={{ margin: 0, fontSize: 14, color: order.del_price ? accent : textPrimary, fontWeight: 500 }}>
                  {order.del_price ? "Zdarma" : "89 Kč"}
                </Text>
              </Column>
            </Row>

            {/* Coupon row */}
            {coupon > 0 && (
              <Row style={{ borderBottom: `1px solid #2a2a48` }}>
                <Column colSpan={3} style={{ padding: "12px 0" }}>
                  <Text style={{ margin: 0, fontSize: 14, color: textMuted }}>Slevový kupón</Text>
                </Column>
                <Column align="right" style={{ padding: "12px 0" }}>
                  <Text style={{ margin: 0, fontSize: 14, color: accent, fontWeight: 500 }}>-{coupon} Kč</Text>
                </Column>
              </Row>
            )}

            {/* Total row */}
            <Row>
              <Column colSpan={3} style={{ padding: "16px 0 4px" }}>
                <Text style={{ margin: 0, fontSize: 16, color: textPrimary, fontWeight: 700 }}>Celkem</Text>
              </Column>
              <Column align="right" style={{ padding: "16px 0 4px" }}>
                <Text style={{ margin: 0, fontSize: 22, color: accent, fontWeight: 700 }}>{order.total} Kč</Text>
              </Column>
            </Row>
          </Section>

          {/* Contact + Address */}
          <Row style={{ marginTop: 16 }}>
            {/* Contact */}
            <Column
              style={{
                width: "48%",
                verticalAlign: "top",
                backgroundColor: card,
                border: `1px solid ${borderColor}`,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <Heading as="h3" style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600, color: accent }}>
                Kontaktní údaje
              </Heading>
              <Section>
                <TableRow label="Jméno" value={`${order.firstName} ${order.lastName}`} />
                <TableRow label="E-mail" value={order.email} />
                {order.phone && <TableRow label="Telefon" value={order.phone} />}
              </Section>
            </Column>

            {/* Spacer */}
            <Column style={{ width: "4%" }} />

            {/* Address */}
            <Column
              style={{
                width: "48%",
                verticalAlign: "top",
                backgroundColor: card,
                border: `1px solid ${borderColor}`,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <Heading as="h3" style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600, color: accent }}>
                Dodací adresa
              </Heading>
              <Section>
                <TableRow label="Ulice" value={`${order.address} ${order.adr_number}`} />
                <TableRow label="Město" value={order.city} />
                <TableRow label="PSČ" value={order.psc} />
              </Section>
            </Column>
          </Row>

          {/* Zásilkovna */}
          {order.packetaId && (
            <Section
              style={{
                backgroundColor: card,
                border: `1px solid ${borderColor}`,
                borderRadius: 16,
                padding: 24,
                marginTop: 16,
              }}
            >
              <Heading as="h3" style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600, color: accent }}>
                Zásilkovna
              </Heading>
              <Section>
                <TableRow label="ID pobočky" value={String(order.packetaId)} mono />
                {order.packetaAddress && <TableRow label="Adresa pobočky" value={order.packetaAddress} />}
              </Section>
            </Section>
          )}

          {/* CTA Button */}
          <Section style={{ textAlign: "center" as const, padding: "24px 0" }}>
            <Button
              href={`${baseUrl}/status/${order._id}`}
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: accent,
                color: bg,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 12,
              }}
            >
              Zobrazit objednávku online
            </Button>
          </Section>

          {/* Footer */}
          <Hr style={{ borderColor: borderColor, margin: "8px 0 24px" }} />

          <Section style={{ textAlign: "center" as const }}>
            <Text style={{ margin: 0, fontSize: 13, color: textMuted }}>
              {COMPANY.name} | {COMPANY.street}, {COMPANY.city}, {COMPANY.psc}
            </Text>
            <Text style={{ margin: "4px 0 0", fontSize: 13, color: textMuted }}>
              IČO: {COMPANY.ico} | DIČ: {COMPANY.dic}
            </Text>
            <Text style={{ margin: "8px 0 0", fontSize: 12, color: "#666680" }}>
              Tento e-mail byl odeslán automaticky. V případě dotazů nás kontaktujte na{" "}
              <Link href={`mailto:${COMPANY.email}`} style={{ color: accent, textDecoration: "none" }}>
                {COMPANY.email}
              </Link>
            </Text>
            <Text style={{ margin: "16px 0 0", fontSize: 11, color: "#555570" }}>
              &copy; {new Date().getFullYear()} {COMPANY.name}. Všechna práva vyhrazena.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderOrderStatusEmail(order: Order): Promise<string> {
  return render(<OrderStatusEmail order={order} />)
}
