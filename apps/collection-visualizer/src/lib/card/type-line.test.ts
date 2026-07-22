import { test, expect } from 'bun:test'
import { typesOf } from './type-line'
import type { CardTile } from '~/lib/types'

const tile = (typeLine: string): CardTile => ({
  key: 'k', scryfallId: 'id', name: 'C', setCode: 'AAA', setName: 'Set A',
  collectorNumber: '1', rarity: 'rare', finish: 'normal', quantity: 1, weightedPurchase: null,
  prices: { usd: null, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine, oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('typesOf reads the plain types', () => {
  expect(typesOf(tile('Instant'))).toEqual(['Instant'])
  expect(typesOf(tile('Creature — Human Soldier'))).toEqual(['Creature'])
})

test('typesOf ignores supertypes', () => {
  expect(typesOf(tile('Legendary Creature — Sorin'))).toEqual(['Creature'])
  expect(typesOf(tile('Basic Land — Island'))).toEqual(['Land'])
})

test('typesOf returns every type on a multi-type card', () => {
  expect(typesOf(tile('Artifact Creature — Golem'))).toEqual(['Creature', 'Artifact'])
})

test('typesOf reads both halves of a two-sided card', () => {
  expect(typesOf(tile('Creature — Spirit Warrior // Enchantment — Aura'))).toEqual(['Creature', 'Enchantment'])
})

test('typesOf never mistakes a subtype for a type', () => {
  // Contrived, but the guard is the point: only the text before the em dash is a type.
  expect(typesOf(tile('Enchantment — Creature Land'))).toEqual(['Enchantment'])
})

test('typesOf returns nothing for an unknown or missing type line', () => {
  expect(typesOf(tile(''))).toEqual([])
  expect(typesOf(tile('Hero — Vanguard'))).toEqual([])
})
