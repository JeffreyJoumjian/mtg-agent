import { test, expect } from 'bun:test'
import { toPriceSet, toEnriched, chunk } from './scryfall'

const CARD = {
  id: 'abc',
  cmc: 2,
  colors: ['W'],
  color_identity: ['W', 'U'],
  type_line: 'Creature — Human',
  oracle_text: 'When this enters, investigate.',
  mana_cost: '{1}{W}',
  prices: { usd: '1.32', usd_foil: '3.10', eur: '0.95', eur_foil: '2.40', tix: '0.02' },
  image_uris: { small: 'https://img/small.jpg', normal: 'https://img/normal.jpg' },
}

test('toPriceSet maps the four price fields, null when absent', () => {
  expect(toPriceSet(CARD)).toEqual({ usd: 1.32, usdFoil: 3.1, eur: 0.95, eurFoil: 2.4 })
  expect(toPriceSet({ prices: { usd: null } })).toEqual({ usd: null, usdFoil: null, eur: null, eurFoil: null })
})

test('toEnriched projects gameplay + image fields', () => {
  expect(toEnriched(CARD)).toEqual({
    cmc: 2,
    colors: ['W'],
    colorIdentity: ['W', 'U'],
    typeLine: 'Creature — Human',
    oracleText: 'When this enters, investigate.',
    manaCost: '{1}{W}',
    imageSmall: 'https://img/small.jpg',
    imageNormal: 'https://img/normal.jpg',
  })
})

test('toEnriched falls back to the first face for double-faced cards', () => {
  const dfc = {
    cmc: 3,
    color_identity: ['R'],
    card_faces: [
      { type_line: 'Sorcery', oracle_text: 'Front.', mana_cost: '{2}{R}', colors: ['R'], image_uris: { small: 's', normal: 'n' } },
      { type_line: 'Land', oracle_text: 'Back.', mana_cost: '' },
    ],
  }
  const e = toEnriched(dfc)
  expect(e.typeLine).toEqual('Sorcery // Land')
  expect(e.imageSmall).toEqual('s')
  expect(e.colors).toEqual(['R'])
})

test('chunk splits into batches of the given size', () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
})
