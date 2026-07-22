import type { CardFace, CardTile } from '~/lib/types'

/** The individual sides of a card, or [] for a single-faced one. */
export function facesOf(tile: CardTile): CardFace[] {
  return tile.enriched.faces ?? []
}

/** True when the card has distinct front/back images to flip between. */
export function isTwoSided(tile: CardTile): boolean {
  return facesOf(tile).length >= 2
}

/** The face currently turned toward the viewer, or null for a single-faced card. `flipped` is the
 *  parity of the flip count (odd = back). */
export function shownFace(tile: CardTile, flipped: boolean): CardFace | null {
  const faces = facesOf(tile)
  return faces.length >= 2 ? faces[flipped ? 1 : 0] : null
}

export type ImageQuality = 'small' | 'normal' | 'large' | 'png'

/** Anything carrying the Scryfall image sizes — both `Enriched` and `CardFace` qualify. The higher-res
 *  sizes are optional (older caches lack them until re-enriched). */
interface ImageSource {
  imageSmall: string | null
  imageNormal: string | null
  imageLarge?: string | null
  imagePng?: string | null
}

const FALLBACKS: Record<ImageQuality, (keyof ImageSource)[]> = {
  png: ['imagePng', 'imageLarge', 'imageNormal', 'imageSmall'],
  large: ['imageLarge', 'imageNormal', 'imageSmall'],
  normal: ['imageNormal', 'imageSmall'],
  small: ['imageSmall', 'imageNormal'],
}

/** Best available image at (or degrading below) the requested quality; null if the source has none. */
export function cardImage(src: ImageSource, quality: ImageQuality): string | null {
  for (const key of FALLBACKS[quality]) {
    if (src[key]) return src[key]
  }
  return null
}
