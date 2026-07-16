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

test('toEnriched captures both sides of a genuinely two-faced card (no top-level image)', () => {
  const twoSided = {
    cmc: 1,
    color_identity: ['U'],
    card_faces: [
      { name: 'Delver of Secrets', type_line: 'Creature — Human Wizard', oracle_text: 'Front.', mana_cost: '{U}', colors: ['U'], image_uris: { small: 'fs', normal: 'fn' } },
      { name: 'Insectile Aberration', type_line: 'Creature — Human Insect', oracle_text: 'Flying.', mana_cost: '', image_uris: { small: 'bs', normal: 'bn' } },
    ],
  }
  const e = toEnriched(twoSided)
  // Front stays the default face; the flip data lives in `faces`.
  expect(e.imageNormal).toEqual('fn')
  expect(e.faces).toEqual([
    { name: 'Delver of Secrets', typeLine: 'Creature — Human Wizard', oracleText: 'Front.', manaCost: '{U}', imageSmall: 'fs', imageNormal: 'fn' },
    { name: 'Insectile Aberration', typeLine: 'Creature — Human Insect', oracleText: 'Flying.', manaCost: '', imageSmall: 'bs', imageNormal: 'bn' },
  ])
})

test('toEnriched leaves single-image cards without a faces field (split/adventure keep one image)', () => {
  const adventure = {
    type_line: 'Sorcery // Instant — Adventure',
    image_uris: { small: 's', normal: 'n' },
    card_faces: [
      { type_line: 'Sorcery', image_uris: { small: 's', normal: 'n' } },
      { type_line: 'Instant — Adventure' },
    ],
  }
  expect(toEnriched(adventure).faces).toBeUndefined()
})

test('chunk splits into batches of the given size', () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
})
