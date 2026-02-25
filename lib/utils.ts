import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const UNIT_PRICE: number = 149

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
