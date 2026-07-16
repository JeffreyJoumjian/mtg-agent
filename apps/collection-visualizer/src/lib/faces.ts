import type { CardFace, CardTile } from './types'

/** The individual sides of a card, or [] for a single-faced one. */
export function facesOf(tile: CardTile): CardFace[] {
  return tile.enriched.faces ?? []
}

/** True when the card has distinct front/back images to flip between. */
export function isTwoSided(tile: CardTile): boolean {
  return facesOf(tile).length >= 2
}

/** A face's image at the preferred size, falling back to the other size. */
export function faceImage(face: CardFace, prefer: 'small' | 'normal'): string | null {
  return prefer === 'small' ? face.imageSmall ?? face.imageNormal : face.imageNormal ?? face.imageSmall
}
