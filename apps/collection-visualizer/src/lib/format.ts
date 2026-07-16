import type { Currency } from './types'

const SYMBOL: Record<string, string> = { usd: '$', eur: '€' }

function symbolFor(currency: Currency | string): string {
  return SYMBOL[String(currency).toLowerCase()] ?? '$'
}

/** Two decimals with thousands separators (fixed 'en-US' so server/client render identically). */
function amount(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatMoney(value: number | null, currency: Currency | string): string {
  if (value == null) return '—'
  return `${symbolFor(currency)}${amount(value)}`
}

export function formatDelta(value: number, currency: Currency | string): string {
  const sign = value < 0 ? '−' : '+'
  return `${sign}${symbolFor(currency)}${amount(Math.abs(value))}`
}

export function truncate(name: string, max: number): string {
  return name.length <= max ? name : name.slice(0, max - 1) + '…'
}

/** Scryfall card page URL from set + collector number (the set/number form redirects correctly). */
export function scryfallUrl(setCode: string, collectorNumber: string): string {
  return `https://scryfall.com/card/${setCode.toLowerCase()}/${encodeURIComponent(collectorNumber)}`
}
