import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const UNIT_PRICE: number = 199

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}