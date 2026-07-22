import { test, expect } from 'bun:test'
import { dayOf, recordPrices, seedFromCache } from './price-history'
import type { PriceCache, PriceHistory } from '~/lib/types'

const prices = (usd: number | null) => ({ usd, usdFoil: null, eur: null, eurFoil: null })

// 2026-07-22T12:00:00Z and the same clock time a day later.
const DAY_1 = Date.UTC(2026, 6, 22, 12)
const DAY_2 = Date.UTC(2026, 6, 23, 12)

const entry = (usd: number, fetchedAt: number) => ({
  current: prices(usd),
  previous: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt,
})

test('dayOf buckets a timestamp into its UTC day', () => {
  expect(dayOf(DAY_1)).toEqual('2026-07-22')
})

test('recordPrices appends a point for a card it has never seen', () => {
  expect(recordPrices({}, { a: prices(1.5) }, DAY_1)).toEqual({ a: [{ date: '2026-07-22', ...prices(1.5) }] })
})

test('recordPrices appends a new point when the price moved', () => {
  const history = recordPrices({}, { a: prices(1.5) }, DAY_1)
  const next = recordPrices(history, { a: prices(2.25) }, DAY_2)
  expect(next.a).toEqual([
    { date: '2026-07-22', ...prices(1.5) },
    { date: '2026-07-23', ...prices(2.25) },
  ])
})

test('recordPrices records nothing when the price has not moved', () => {
  const history = recordPrices({}, { a: prices(1.5) }, DAY_1)
  const next = recordPrices(history, { a: prices(1.5) }, DAY_2)
  expect(next.a).toEqual([{ date: '2026-07-22', ...prices(1.5) }])
})

test('recordPrices replaces the day’s point instead of adding a second one', () => {
  const history = recordPrices({}, { a: prices(1.5) }, DAY_1)
  const next = recordPrices(history, { a: prices(1.75) }, DAY_1 + 60_000)
  expect(next.a).toEqual([{ date: '2026-07-22', ...prices(1.75) }])
})

test('recordPrices leaves cards outside this refresh untouched', () => {
  const history: PriceHistory = { a: [{ date: '2026-07-01', ...prices(1) }] }
  const next = recordPrices(history, { b: prices(9) }, DAY_1)
  expect(next.a).toEqual([{ date: '2026-07-01', ...prices(1) }])
  expect(next.b).toEqual([{ date: '2026-07-22', ...prices(9) }])
})

test('recordPrices does not mutate the history it was given', () => {
  const history: PriceHistory = { a: [{ date: '2026-07-01', ...prices(1) }] }
  recordPrices(history, { a: prices(5) }, DAY_1)
  expect(history.a).toEqual([{ date: '2026-07-01', ...prices(1) }])
})

test('recordPrices treats a null price as a value, not a gap', () => {
  const history = recordPrices({}, { a: prices(1.5) }, DAY_1)
  const next = recordPrices(history, { a: prices(null) }, DAY_2)
  expect(next.a.length).toEqual(2)
  expect(next.a[1].usd).toEqual(null)
})

test('seedFromCache dates each seeded point by when it was fetched', () => {
  const cache: PriceCache = { a: entry(1.5, DAY_1), b: entry(3, DAY_2) }
  expect(seedFromCache(cache)).toEqual({
    a: [{ date: '2026-07-22', ...prices(1.5) }],
    b: [{ date: '2026-07-23', ...prices(3) }],
  })
})

test('seedFromCache skips entries that were never fetched', () => {
  expect(seedFromCache({ a: entry(1.5, 0) })).toEqual({})
})
