import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const SITE_URL = process.env.NODE_ENV === "production" ? "https://especko.cz/" : "http://localhost:3000/"
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61582227774889"
export const INSTAGRAM_URL = "https://www.instagram.com/especko_cz?igsh=MTgwcGpndzJkbTR1Yw%3D%3D&utm_source=qr"

export const UNIT_PRICE: number = 449

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}