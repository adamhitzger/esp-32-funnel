import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner';
import { Geist, Geist_Mono } from 'next/font/google'
import RecaptchaProvider from "@/components/recaptcha";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'ESP32 DevKit | Pohon vaše IoT projekty',
  description: 'Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
