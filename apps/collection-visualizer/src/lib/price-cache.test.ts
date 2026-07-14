import { test, expect } from 'bun:test'
import { staleIds, mergeRefresh, TTL_MS } from './price-cache'
import type { PriceCache } from './types'

const entry = (usd: number, fetchedAt: number) => ({
  current: { usd, usdFoil: null, eur: null, eurFoil: null },
  previous: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt,
})

test('staleIds returns missing ids and ids older than the TTL', () => {
  const now = 1_000_000_000
  const cache: PriceCache = { fresh: entry(1, now - 1000), old: entry(1, now - TTL_MS - 1) }
  expect(staleIds(cache, ['fresh', 'old', 'missing'], now).sort()).toEqual(['missing', 'old'])
})

test('mergeRefresh rotates current into previous and writes new current', () => {
  const now = 2_000
  const cache: PriceCache = { a: entry(1.0, 1_000) }
  const raw = { a: { id: 'a', prices: { usd: '1.50' }, cmc: 3, type_line: 'Instant' } }
  const next = mergeRefresh(cache, raw, now)
  expect(next.a.previous).toEqual({ usd: 1.0, usdFoil: null, eur: null, eurFoil: null })
  expect(next.a.current.usd).toEqual(1.5)
  expect(next.a.fetchedAt).toEqual(now)
  expect(next.a.enriched.typeLine).toEqual('Instant')
})

test('mergeRefresh sets previous=null for a brand-new id', () => {
  const raw = { b: { id: 'b', prices: { usd: '0.25' } } }
  const next = mergeRefresh({}, raw, 5)
  expect(next.b.previous).toEqual(null)
  expect(next.b.current.usd).toEqual(0.25)
})
