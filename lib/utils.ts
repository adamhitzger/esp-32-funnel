import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const SITE_URL = process.env.NODE_ENV === "production" ? "https://especko.cz/" : "http://localhost:3000/"
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61582227774889"
export const INSTAGRAM_URL = "https://www.instagram.com/especko_cz?igsh=MTgwcGpndzJkbTR1Yw%3D%3D&utm_source=qr"
export const TIKTOK_URL="https://www.tiktok.com/@especko.cz"
export const UNIT_PRICE: number = 209
export const ZASILKOVNA_PRICE: number = 79

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PRICING_TIERS = [
  { min: 1, max: 1, price: 209, label: "1 ks" },
  { min: 2, max: 2, price: 199, label: "2 ks" },
  { min: 3, max: 4, price: 195, label: "3-4 ks" },
  { min: 5, max: 9, price: 189, label: "5-9 ks" },
  { min: 10, max: 14, price: 185, label: "10-14 ks" },
  { min: 15, max: Infinity, price: 179, label: "15+ ks" },
]

export function getUnitPrice(quantity: number): number {
  const tier = PRICING_TIERS.find(t => quantity >= t.min && quantity <= t.max)
  return tier?.price ?? 209
}

export function getTotalPrice(quantity: number): number {
  return getUnitPrice(quantity) * quantity
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}