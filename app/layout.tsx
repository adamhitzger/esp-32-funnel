import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner';
import { Geist, Geist_Mono } from 'next/font/google'
import RecaptchaProvider from "@/components/recaptcha";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL("https://especko.cz"),
  title: {
    default: "ESP32 DevKit | ElectroCore - Pohon vaše IoT projekty",
    template: "%s | ElectroCore",
  },
  description:
    "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Dvoujádrový procesor 240 MHz, 4MB Flash, 520KB SRAM. Ideální pro IoT, automatizaci a vestavěné systémy.",
  keywords: [
    "ESP32",
    "ESP32 DevKit",
    "mikrokontrolér",
    "IoT",
    "WiFi modul",
    "Bluetooth",
    "vývojová deska",
    "Arduino",
    "embedded",
    "automatizace",
    "ElectroCore",
  ],
  authors: [{ name: "ElectroCore", url: "https://especko.cz" }],
  creator: "ElectroCore",
  publisher: "ElectroCore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://especko.cz",
    siteName: "ElectroCore",
    title: "ESP32 DevKit | Pohon vaše IoT projekty",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
    images: [
      {
        url: "/images/esp32.jpg",
        width: 1200,
        height: 630,
        alt: "ESP32 DevKit vývojová deska",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESP32 DevKit | ElectroCore",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
    images: ["/images/esp32.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://especko.cz",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className="font-sans antialiased">
        <RecaptchaProvider>
        {children}
        <Toaster/>
        </RecaptchaProvider>
      </body>
    </html>
  )
}
