import { test, expect } from 'bun:test'
import { compileQuery } from './search-query'
import type { CardTile } from './types'

const tile = (over: Partial<CardTile> & { colors?: any; ci?: any; type?: string; oracle?: string; cmc?: number }): CardTile => ({
  key: 'k', scryfallId: 'id', name: over.name ?? 'Lightning Bolt', setCode: over.setCode ?? 'LEA', setName: 'Alpha',
  collectorNumber: '161', rarity: over.rarity ?? 'common', finish: over.finish ?? 'normal', quantity: 1, weightedPurchase: null,
  prices: { usd: 1, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: over.cmc ?? 1, colors: over.colors ?? ['R'], colorIdentity: over.ci ?? ['R'], typeLine: over.type ?? 'Instant', oracleText: over.oracle ?? 'Deal 3 damage to any target.', manaCost: '{R}', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

const bolt = tile({})
const bear = tile({ name: 'Grizzly Bears', type: 'Creature — Bear', oracle: '', colors: ['G'], ci: ['G'], cmc: 2, rarity: 'common', setCode: 'LEB' })

test('empty query matches everything', () => {
  const p = compileQuery('   ')
  expect(p(bolt)).toEqual(true)
})

test('bare word matches card name (case-insensitive)', () => {
  const p = compileQuery('bolt')
  expect(p(bolt)).toEqual(true)
  expect(p(bear)).toEqual(false)
})

test('o: matches oracle text; t: matches type', () => {
  expect(compileQuery('o:"deal 3"')(bolt)).toEqual(true)
  expect(compileQuery('t:creature')(bear)).toEqual(true)
  expect(compileQuery('t:creature')(bolt)).toEqual(false)
})

test('c: colors and ci: color identity', () => {
  expect(compileQuery('c:r')(bolt)).toEqual(true)
  expect(compileQuery('c:red')(bolt)).toEqual(true)
  expect(compileQuery('c:g')(bolt)).toEqual(false)
  expect(compileQuery('ci:g')(bear)).toEqual(true)
})

test('r: rarity, s: set, f: finish', () => {
  expect(compileQuery('r:common')(bolt)).toEqual(true)
  expect(compileQuery('s:lea')(bolt)).toEqual(true)
  expect(compileQuery('set:leb')(bear)).toEqual(true)
  expect(compileQuery('f:normal')(bolt)).toEqual(true)
  expect(compileQuery('f:foil')(bolt)).toEqual(false)
})

test('mv comparisons', () => {
  expect(compileQuery('mv:1')(bolt)).toEqual(true)
  expect(compileQuery('cmc>=2')(bear)).toEqual(true)
  expect(compileQuery('mv<=1')(bear)).toEqual(false)
  expect(compileQuery('mv:>1')(bear)).toEqual(true)
})

test('implicit AND, explicit OR, and negation', () => {
  expect(compileQuery('c:r t:instant')(bolt)).toEqual(true)
  expect(compileQuery('c:r t:creature')(bolt)).toEqual(false)
  expect(compileQuery('bolt or bears')(bear)).toEqual(true)
  expect(compileQuery('-t:creature')(bolt)).toEqual(true)
  expect(compileQuery('-t:creature')(bear)).toEqual(false)
})

test('grouping with parentheses', () => {
  const p = compileQuery('(bolt or bears) c:g')
  expect(p(bear)).toEqual(true)
  expect(p(bolt)).toEqual(false)
})

test('unparseable input falls back to a name substring match', () => {
  const p = compileQuery('((') // malformed
  expect(p(tile({ name: '(( weird' }))).toEqual(true)
  expect(p(bolt)).toEqual(false)
})
