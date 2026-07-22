import { test, expect } from 'bun:test'
import { cardSeries, inCurrency, seriesDelta, valueSeries } from './history'
import type { CardTile, PriceHistory, PricePoint } from '~/lib/types'

const point = (date: string, usd: number | null, eur: number | null = null): PricePoint => ({
  date, usd, usdFoil: null, eur, eurFoil: null,
})

const tile = (over: Partial<CardTile>): CardTile => ({
  key: 'k', scryfallId: over.scryfallId ?? 'a', name: 'C', setCode: 'aaa', setName: 'Set A',
  collectorNumber: '1', rarity: 'rare', finish: over.finish ?? 'normal', quantity: over.quantity ?? 1,
  weightedPurchase: null, prices: { usd: null, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('valueSeries totals each day across tiles', () => {
  const history: PriceHistory = { a: [point('2026-01-01', 2)], b: [point('2026-01-01', 3)] }
  const out = valueSeries([tile({ scryfallId: 'a' }), tile({ scryfallId: 'b' })], history)
  expect(out).toEqual([{ date: '2026-01-01', usd: 5, eur: 0 }])
})

test('valueSeries multiplies by quantity', () => {
  const history: PriceHistory = { a: [point('2026-01-01', 2)] }
  expect(valueSeries([tile({ quantity: 3 })], history)[0].usd).toEqual(6)
})

test('valueSeries carries the last price forward across days with no point', () => {
  // `a` only moves on day 1; on day 3 it must still contribute its day-1 price.
  const history: PriceHistory = {
    a: [point('2026-01-01', 10)],
    b: [point('2026-01-01', 1), point('2026-01-03', 5)],
  }
  const out = valueSeries([tile({ scryfallId: 'a' }), tile({ scryfallId: 'b' })], history)
  expect(out.map((p) => p.usd)).toEqual([11, 15])
  expect(out.map((p) => p.date)).toEqual(['2026-01-01', '2026-01-03'])
})

test('valueSeries contributes nothing for days before a card’s first price', () => {
  const history: PriceHistory = {
    a: [point('2026-01-01', 10)],
    b: [point('2026-01-02', 4)],
  }
  const out = valueSeries([tile({ scryfallId: 'a' }), tile({ scryfallId: 'b' })], history)
  expect(out.map((p) => p.usd)).toEqual([10, 14])
})

test('valueSeries reads the foil price for a foil tile', () => {
  const history: PriceHistory = { a: [{ date: '2026-01-01', usd: 1, usdFoil: 9, eur: null, eurFoil: null }] }
  expect(valueSeries([tile({ finish: 'foil' })], history)[0].usd).toEqual(9)
  expect(valueSeries([tile({ finish: 'normal' })], history)[0].usd).toEqual(1)
})

test('valueSeries tracks both currencies independently', () => {
  const history: PriceHistory = { a: [point('2026-01-01', 2, 8)] }
  expect(valueSeries([tile({})], history)[0]).toEqual({ date: '2026-01-01', usd: 2, eur: 8 })
})

test('valueSeries returns nothing when there is no history', () => {
  expect(valueSeries([tile({})], {})).toEqual([])
})

test('valueSeries orders days oldest first regardless of object order', () => {
  const history: PriceHistory = { a: [point('2026-03-01', 3), point('2026-01-01', 1), point('2026-02-01', 2)] }
  expect(valueSeries([tile({})], history).map((p) => p.date)).toEqual(['2026-01-01', '2026-02-01', '2026-03-01'])
})

test('cardSeries resolves currency and finish, dropping days with no price', () => {
  const points = [point('2026-01-01', 1, null), point('2026-01-02', 2, 7)]
  expect(cardSeries(points, 'usd', 'normal')).toEqual([
    { date: '2026-01-01', value: 1 },
    { date: '2026-01-02', value: 2 },
  ])
  expect(cardSeries(points, 'eur', 'normal')).toEqual([{ date: '2026-01-02', value: 7 }])
})

test('inCurrency picks the requested side', () => {
  const series = [{ date: '2026-01-01', usd: 2, eur: 8 }]
  expect(inCurrency(series, 'eur')).toEqual([{ date: '2026-01-01', value: 8 }])
})

test('seriesDelta compares first to last', () => {
  expect(seriesDelta([{ date: 'a', value: 10 }, { date: 'b', value: 15 }])).toEqual({ absolute: 5, ratio: 0.5 })
})

test('seriesDelta is null with fewer than two points', () => {
  expect(seriesDelta([{ date: 'a', value: 10 }])).toEqual(null)
  expect(seriesDelta([])).toEqual(null)
})

test('seriesDelta reports a null ratio rather than dividing by zero', () => {
  expect(seriesDelta([{ date: 'a', value: 0 }, { date: 'b', value: 4 }])).toEqual({ absolute: 4, ratio: null })
})
