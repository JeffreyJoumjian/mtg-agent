import type { Currency } from './types'

const SYMBOL: Record<string, string> = { usd: '$', eur: '€' }

function symbolFor(currency: Currency | string): string {
  return SYMBOL[String(currency).toLowerCase()] ?? '$'
}

export function formatMoney(value: number | null, currency: Currency | string): string {
  if (value == null) return '—'
  return `${symbolFor(currency)}${value.toFixed(2)}`
}

export function formatDelta(value: number, currency: Currency | string): string {
  const sign = value < 0 ? '−' : '+'
  return `${sign}${symbolFor(currency)}${Math.abs(value).toFixed(2)}`
}

export function truncate(name: string, max: number): string {
  return name.length <= max ? name : name.slice(0, max - 1) + '…'
}
