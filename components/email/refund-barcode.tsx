import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
  Font,
  Preview,
} from "@react-email/components"
import { render } from "@react-email/components"

interface RefundBarcodeEmailProps {
  firstName: string
  lastName: string
  barcode: string
  orderId: string
}

const RETURNS_PORTAL_URL = "https://returns.packeta.com"

export function RefundBarcodeEmail({
  firstName,
  lastName,
  barcode,
  orderId,
}: RefundBarcodeEmailProps) {
  return (
    <Html lang="cs">
      <Font
        fontFamily="Inter"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
          format: "woff2",
        }}
      />
      <Preview>Váš štítek pro vrácení zásilky - {barcode}</Preview>
      <Body
        style={{
          backgroundColor: "#1a1a2e",
          fontFamily: "Inter, Arial, sans-serif",
          margin: 0,
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#222240",
              borderRadius: "16px 16px 0 0",
              padding: "32px",
              textAlign: "center" as const,
              borderBottom: "1px solid rgba(0, 200, 255, 0.2)",
            }}
          >
            <Heading
              style={{
                color: "#00c8ff",
                fontSize: "24px",
                fontWeight: "700",
                margin: 0,
              }}
            >
              Especko.cz
            </Heading>
            <Text
              style={{
                color: "#a0a0b0",
                fontSize: "14px",
                margin: "8px 0 0 0",
              }}
            >
              Štítek pro vrácení zásilky
            </Text>
          </Section>

          {/* Main Content */}
          <Section
            style={{
              backgroundColor: "#222240",
              padding: "32px",
            }}
          >
            <Text
              style={{
                color: "#e0e0e8",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              Dobrý den, {firstName} {lastName},
            </Text>

            <Text
              style={{
                color: "#a0a0b0",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              obdrželi jsme Vaši žádost o vrácení zboží. Níže naleznete štítek
              (čárový kód), který budete potřebovat pro vrácení zásilky přes
              Zásilkovnu.
            </Text>

            {/* Barcode Box */}
            <Section
              style={{
                backgroundColor: "#1a1a2e",
                border: "2px solid #00c8ff",
                borderRadius: "12px",
                padding: "24px",
                textAlign: "center" as const,
                margin: "0 0 24px 0",
              }}
            >
              <Text
                style={{
                  color: "#a0a0b0",
                  fontSize: "12px",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase" as const,
                  letterSpacing: "1px",
                }}
              >
                Váš štítek
              </Text>
              <Text
                style={{
                  color: "#00c8ff",
                  fontSize: "28px",
                  fontWeight: "700",
                  fontFamily: "monospace",
                  margin: "0 0 8px 0",
                  letterSpacing: "2px",
                }}
              >
                {barcode}
              </Text>
              <Text
                style={{
                  color: "#666680",
                  fontSize: "12px",
                  margin: 0,
                }}
              >
                Objednávka: {orderId}
              </Text>
            </Section>

            <Hr
              style={{
                borderColor: "rgba(0, 200, 255, 0.2)",
                margin: "24px 0",
              }}
            />

            <Text
              style={{
                color: "#a0a0b0",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              Pro dokončení vrácení zásilky:
            </Text>

            <Section style={{ margin: "0 0 16px 0" }}>
              <Text
                style={{
                  color: "#e0e0e8",
                  fontSize: "14px",
                  margin: "0 0 8px 0",
                }}
              >
                1. Klikněte na tlačítko níže a přejděte na vratkový portál Zásilkovny
              </Text>
              <Text
                style={{
                  color: "#e0e0e8",
                  fontSize: "14px",
                  margin: "0 0 8px 0",
                }}
              >
                2. Zadejte výše uvedený štítek (čárový kód)
              </Text>
              <Text
                style={{
                  color: "#e0e0e8",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                3. Postupujte podle pokynů na portálu
              </Text>
            </Section>

            <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
              <Button
                href={RETURNS_PORTAL_URL}
                style={{
                  backgroundColor: "#00c8ff",
                  color: "#1a1a2e",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Přejít na vratkový portál
              </Button>
            </Section>

            <Text
              style={{
                color: "#666680",
                fontSize: "12px",
                textAlign: "center" as const,
                margin: 0,
              }}
            >
              Nebo navštivte:{" "}
              <Link
                href={RETURNS_PORTAL_URL}
                style={{ color: "#00c8ff", textDecoration: "underline" }}
              >
                {RETURNS_PORTAL_URL}
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#222240",
              borderRadius: "0 0 16px 16px",
              padding: "24px 32px",
              borderTop: "1px solid rgba(0, 200, 255, 0.2)",
            }}
          >
            <Text
              style={{
                color: "#666680",
                fontSize: "12px",
                textAlign: "center" as const,
                margin: 0,
              }}
            >
              Máte dotazy? Kontaktujte nás na{" "}
              <Link
                href="mailto:info@especko.cz"
                style={{ color: "#00c8ff" }}
              >
                info@especko.cz
              </Link>
            </Text>
            <Text
              style={{
                color: "#666680",
                fontSize: "12px",
                textAlign: "center" as const,
                margin: "8px 0 0 0",
              }}
            >
              © {new Date().getFullYear()} Especko.cz. Všechna práva vyhrazena.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderRefundBarcodeEmail(
  props: RefundBarcodeEmailProps
): Promise<string> {
  return await render(<RefundBarcodeEmail {...props} />)
}
