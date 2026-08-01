import type { CardTile } from '~/lib/types'

/** The card types a type line can hold, in the order the filter chips list them (roughly how
 *  common they are in a collection). Supertypes (Legendary, Basic, Snow) and subtypes (Aura,
 *  Equipment, Human Soldier) are neither — they never get a chip. */
export const CARD_TYPES = [
  'Creature',
  'Instant',
  'Sorcery',
  'Artifact',
  'Enchantment',
  'Land',
  'Planeswalker',
  'Battle',
  'Kindred',
  'Token',
] as const

export type CardType = (typeof CARD_TYPES)[number]

/** Every card type on a tile. Both halves of a two-sided card count, so a
 *  `Creature — Spirit // Enchantment — Aura` is both a creature and an enchantment, and an
 *  `Artifact Creature` is both — 78 cards in a ~950-card collection carry more than one type.
 *
 *  Only the text before the em dash is read: that's the type line's type half, so a subtype can
 *  never pass itself off as a type. */
export function typesOf(tile: CardTile): CardType[] {
  const words = tile.enriched.typeLine.split('//').flatMap((face) => face.split('—')[0].trim().split(/\s+/))

  return CARD_TYPES.filter((type) => words.includes(type))
}
