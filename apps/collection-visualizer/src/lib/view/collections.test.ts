import { test, expect } from 'bun:test'
import { searchSets, setProgress, sortSets, type SetProgress } from './collections'
import type { CardTile, SetInfo } from '~/lib/types'

const tile = (over: Partial<CardTile>): CardTile => ({
  key: over.key ?? 'k', scryfallId: over.scryfallId ?? 'id', name: 'C',
  setCode: over.setCode ?? 'aaa', setName: over.setName ?? 'Set A',
  collectorNumber: over.collectorNumber ?? '1', rarity: 'rare', finish: over.finish ?? 'normal',
  quantity: over.quantity ?? 1, weightedPurchase: null,
  prices: over.prices ?? { usd: 1, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

const info = (over: Partial<SetInfo>): SetInfo => ({
  name: over.name ?? 'Set A', printedSize: over.printedSize ?? null,
  cardCount: over.cardCount ?? 0, releasedAt: over.releasedAt ?? null, setType: 'expansion',
})

const SETS: Record<string, SetInfo> = { aaa: info({ name: 'Alpha', printedSize: 10 }) }

test('setProgress counts distinct cards against the printed size', () => {
  const tiles = [tile({ scryfallId: 'a', collectorNumber: '1' }), tile({ scryfallId: 'b', collectorNumber: '2' })]
  const [set] = setProgress(tiles, SETS, 'usd')
  expect(set.owned).toEqual(2)
  expect(set.total).toEqual(10)
  expect(set.ratio).toEqual(0.2)
})

test('setProgress counts a card owned in two finishes once', () => {
  const tiles = [
    tile({ key: 'a:normal', scryfallId: 'a', finish: 'normal' }),
    tile({ key: 'a:foil', scryfallId: 'a', finish: 'foil' }),
  ]
  const [set] = setProgress(tiles, SETS, 'usd')
  expect(set.owned).toEqual(1)
  expect(set.printings).toEqual(2)
})

test('setProgress excludes printings numbered past the printed size', () => {
  // A showcase printing files under the same set code but numbers above the main set.
  const tiles = [tile({ scryfallId: 'a', collectorNumber: '5' }), tile({ scryfallId: 'b', collectorNumber: '281' })]
  const [set] = setProgress(tiles, SETS, 'usd')
  expect(set.owned).toEqual(1)
  expect(set.printings).toEqual(2)
})

test('setProgress reads the leading number of a suffixed collector number', () => {
  const tiles = [tile({ scryfallId: 'a', collectorNumber: '7b' }), tile({ scryfallId: 'b', collectorNumber: '★9' })]
  const [set] = setProgress(tiles, SETS, 'usd')
  expect(set.owned).toEqual(2)
})

test('setProgress never reports more than 100%', () => {
  const tiles = Array.from({ length: 12 }, (_, i) => tile({ scryfallId: `c${i}`, collectorNumber: String(i + 1) }))
  const [set] = setProgress(tiles, { aaa: info({ printedSize: 5 }) }, 'usd')
  expect(set.ratio).toEqual(1)
})

test('setProgress falls back to every printing when Scryfall has no printed size', () => {
  const tiles = [tile({ scryfallId: 'a', collectorNumber: '1' }), tile({ scryfallId: 'b', collectorNumber: '390' })]
  const [set] = setProgress(tiles, { aaa: info({ printedSize: null, cardCount: 400 }) }, 'usd')
  expect(set.basis).toEqual('all')
  expect(set.total).toEqual(400)
  // The variant is in the denominator on this basis, so it has to count in the numerator too.
  expect(set.owned).toEqual(2)
})

test('setProgress matches an uppercase ManaBox set code to Scryfall’s lowercase key', () => {
  const [set] = setProgress([tile({ setCode: 'AAA' })], SETS, 'usd')
  expect(set.total).toEqual(10)
  expect(set.name).toEqual('Alpha')
})

test('setProgress reports which denominator it used', () => {
  const [printed] = setProgress([tile({})], SETS, 'usd')
  expect(printed.basis).toEqual('printed')
  const [unknown] = setProgress([tile({ setCode: 'zzz' })], {}, 'usd')
  expect(unknown.basis).toEqual(null)
})

test('setProgress keeps a set with no known size, with a null total', () => {
  const [set] = setProgress([tile({ setCode: 'zzz', setName: 'Promos' })], {}, 'usd')
  expect(set.total).toEqual(null)
  expect(set.ratio).toEqual(null)
  expect(set.owned).toEqual(1)
  expect(set.name).toEqual('Promos')
})

test('setProgress sums value by quantity and totals quantity', () => {
  const tiles = [
    tile({ scryfallId: 'a', quantity: 2, prices: { usd: 3, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ scryfallId: 'b', quantity: 1, prices: { usd: null, usdFoil: null, eur: null, eurFoil: null } }),
  ]
  const [set] = setProgress(tiles, SETS, 'usd')
  expect(set.value).toEqual(6)
  expect(set.quantity).toEqual(3)
})

const progress = (over: Partial<SetProgress>): SetProgress => ({
  code: over.code ?? 'x', name: over.name ?? 'X', owned: 0, total: null,
  basis: over.basis ?? null, ratio: over.ratio ?? null, printings: 0, quantity: 0, value: over.value ?? 0, releasedAt: null,
})

test('sortSets puts the most complete first and unknowns last', () => {
  const sets = [progress({ name: 'Unknown' }), progress({ name: 'Half', ratio: 0.5 }), progress({ name: 'Full', ratio: 1 })]
  expect(sortSets(sets, 'completion').map((s) => s.name)).toEqual(['Full', 'Half', 'Unknown'])
})

test('sortSets orders by value and by name', () => {
  const sets = [progress({ name: 'B', value: 5 }), progress({ name: 'A', value: 50 })]
  expect(sortSets(sets, 'value').map((s) => s.name)).toEqual(['A', 'B'])
  expect(sortSets(sets, 'name').map((s) => s.name)).toEqual(['A', 'B'])
})

test('searchSets matches name or code, and passes everything on an empty query', () => {
  const sets = [progress({ name: 'Bloomburrow', code: 'blb' }), progress({ name: 'Foundations', code: 'fdn' })]
  expect(searchSets(sets, 'bloom').map((s) => s.code)).toEqual(['blb'])
  expect(searchSets(sets, 'FDN').map((s) => s.code)).toEqual(['fdn'])
  expect(searchSets(sets, '  ').length).toEqual(2)
})
