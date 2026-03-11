import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner';
import { Geist, Geist_Mono } from 'next/font/google'
import RecaptchaProvider from "@/components/recaptcha";
import { Footer } from '@/components/footer';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import CookiesBanner from '@/components/cookies-banner';
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL("https://especko.cz"),
  title: {
    default: "ESP32 DevKit | especko.cz - Pohon vaše IoT projekty",
    template: "%s | especko.cz",
  },
  description:
    "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Dvoujádrový procesor 240 MHz, 4MB Flash, 520KB SRAM. Ideální pro IoT, automatizaci a vestavěné systémy.",
  authors: [{ name: "especko.cz", url: "https://especko.cz" }],
  creator: "especko.cz",
  publisher: "especko.cz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://especko.cz",
    siteName: "especko.cz",
    title: "ESP32 DevKit | Pohon vaše IoT projekty",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
    images: [
      {
        url: "/images/esp32.png",
        width: 1200,
        height: 630,
        alt: "ESP32 DevKit vývojová deska",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESP32 DevKit | especko.cz",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
    images: ["/images/esp32.png"],
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
        url: "/especko.ico",
      },
    ],
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_KEY as string} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_KEY as string}/>
        <RecaptchaProvider>
        {children}
        <Footer/>
        <Toaster/>
         <CookiesBanner/>
        </RecaptchaProvider>
      </body>
    </html>
  )
}
