import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SpecsSection } from "@/components/specs-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

const SITE_URL = "https://especko.cz"

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ESP32 DevKit V1",
  description:
    "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Dvoujádrový procesor 240 MHz, 4MB Flash, 520KB SRAM, 34 GPIO pinů.",
  image: `${SITE_URL}/images/esp32.jpg`,
  brand: {
    "@type": "Brand",
    name: "Especko.cz",
  },
  sku: "ESP32-DEVKIT-V1",
  mpn: "ESP32-WROOM-32",
  offers: {
    "@type": "Offer",
    url: SITE_URL,
    priceCurrency: "CZK",
    price: "199",
    priceValidUntil: "2026-12-31",
    seller: {
      "@type": "Organization",
      name: "Especko.cz",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "89",
        currency: "CZK",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "CZ",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
      },
    },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Procesor", value: "Xtensa LX6 Dual-Core" },
    { "@type": "PropertyValue", name: "Taktovací frekvence", value: "240 MHz" },
    { "@type": "PropertyValue", name: "Flash paměť", value: "4 MB" },
    { "@type": "PropertyValue", name: "SRAM", value: "520 KB" },
    { "@type": "PropertyValue", name: "WiFi", value: "802.11 b/g/n" },
    { "@type": "PropertyValue", name: "Bluetooth", value: "4.2 + BLE" },
    { "@type": "PropertyValue", name: "GPIO piny", value: "34" },
  ],
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Especko.cz",
  url: SITE_URL,
  logo: `${SITE_URL}/images/esp32.jpg`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@especko.cz",
    contactType: "customer service",
    availableLanguage: "Czech",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Especko.cz",
  url: SITE_URL,
}

export default function Home() {
 
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
  
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <SpecsSection />
      <NewsletterSection />
      <Footer />
    </main>
      </>
  )
}
