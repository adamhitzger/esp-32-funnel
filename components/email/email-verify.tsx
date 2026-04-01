import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components"

interface NewsletterVerifyEmailProps {
  email: string
  verifyUrl: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://especko.cz"

export function NewsletterVerifyEmail({ email, verifyUrl }: NewsletterVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Potvrďte odběr newsletteru Especko.cz</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>Especko.cz</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={heading}>Potvrďte odběr newsletteru</Heading>

            <Text style={paragraph}>
              Dobrý den,
            </Text>

            <Text style={paragraph}>
              obdrželi jsme žádost o přihlášení k odběru newsletteru pro e-mail{" "}
              <strong>{email}</strong>.
            </Text>

            <Text style={paragraph}>
              Pro potvrzení klikněte na tlačítko níže:
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={verifyUrl}>
                Potvrdit odběr
              </Button>
            </Section>

            <Text style={paragraph}>
              Pokud jste o přihlášení nežádali, tento e-mail můžete ignorovat.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Tento odkaz je platný 24 hodin.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Especko.cz | Adam Hitzger, IČO: 19712049
            </Text>
            <Text style={footerText}>
              Ledečská 2984, 580 01 Havlíčkův Brod
            </Text>
            <Link href={SITE_URL} style={footerLink}>
              {SITE_URL}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderNewsletterVerifyEmail(props: NewsletterVerifyEmailProps): Promise<string> {
  return await render(<NewsletterVerifyEmail {...props} />)
}

// Styles
const main = {
  backgroundColor: "#1a1a2e",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
}

const header = {
  textAlign: "center" as const,
  marginBottom: "32px",
}

const logo = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#00c8ff",
  margin: "0",
}

const content = {
  backgroundColor: "#222240",
  borderRadius: "16px",
  padding: "32px",
  border: "1px solid rgba(0, 200, 255, 0.2)",
}

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
  textAlign: "center" as const,
  margin: "0 0 24px 0",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#a0a0b0",
  margin: "0 0 16px 0",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const button = {
  backgroundColor: "#00c8ff",
  borderRadius: "12px",
  color: "#1a1a2e",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
}

const hr = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "24px 0",
}

const footer = {
  fontSize: "14px",
  color: "#666680",
  textAlign: "center" as const,
  margin: "0",
}

const footerSection = {
  textAlign: "center" as const,
  marginTop: "32px",
}

const footerText = {
  fontSize: "12px",
  color: "#666680",
  margin: "4px 0",
}

const footerLink = {
  fontSize: "12px",
  color: "#00c8ff",
  textDecoration: "none",
}