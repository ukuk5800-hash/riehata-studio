import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, addMonths, setDate, isBefore, startOfDay } from 'date-fns'
import { ja, enUS } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'JPY') {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency }).format(amount)
}

export function formatDate(date: Date | string, fmt = 'yyyy/MM/dd', locale?: string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, fmt, { locale: locale === 'en' ? enUS : ja })
}

export function formatDateTime(date: Date | string, locale?: string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'M月d日(E) HH:mm', { locale: locale === 'en' ? enUS : ja })
}

/** Returns the next booking-open date for a given plan's open day */
export function getNextBookingOpenDate(dayOfMonth: number): Date {
  const today = startOfDay(new Date())
  const thisMonth = setDate(today, dayOfMonth)
  return isBefore(thisMonth, today) ? setDate(addMonths(today, 1), dayOfMonth) : thisMonth
}

/** Check if bookings are open now for a given plan */
export function isBookingOpen(dayOfMonth: number): boolean {
  const today = new Date().getDate()
  return today >= dayOfMonth
}

export function getCapacityStatus(booked: number, capacity: number) {
  const ratio = booked / capacity
  if (ratio >= 1) return 'full'
  if (ratio >= 0.8) return 'almost'
  return 'available'
}

export function getInitials(name?: string | null) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function parseUTMParams(search: string) {
  const params = new URLSearchParams(search)
  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  }
}

export const DAY_NAMES_JA = ['日', '月', '火', '水', '木', '金', '土']
export const DAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
