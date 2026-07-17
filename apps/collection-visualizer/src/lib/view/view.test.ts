import { test, expect } from 'bun:test'
import { computeView } from './view'
import { emptyFilters } from './filters'
import type { CardTile } from '~/lib/types'

const tile = (name: string, usd: number): CardTile => ({
  key: name, scryfallId: name, name, setCode: 'S', setName: 'Set', collectorNumber: '1', rarity: 'common',
  finish: 'normal', quantity: 1, weightedPurchase: null, prices: { usd, usdFoil: null, eur: null, eurFoil: null },
  previousPrices: null, enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 1, breakdown: [],
})

test('computeView applies search, filters, then sort', () => {
  // Note: the brief's fixture used 'Black Lotus', but that name also contains 'a'
  // (in "Black") and would match the query too, given compileQuery's bare-word
  // name-substring behavior (see search-query.test.ts). Swapped in 'Mox Ruby',
  // which has no 'a', so it's correctly excluded and the test's intent (search
  // narrows to two cards, then sorts them by price ascending) holds.
  const tiles = [tile('Ancestral Recall', 100), tile('Ajani', 5), tile('Mox Ruby', 9000)]
  const out = computeView(tiles, { query: 'a', filters: emptyFilters(), sortKey: 'price', sortDir: 'asc', currency: 'usd' })
  // 'a' matches Ancestral and Ajani (name contains 'a'), sorted by price asc
  expect(out.map((t) => t.name)).toEqual(['Ajani', 'Ancestral Recall'])
})
