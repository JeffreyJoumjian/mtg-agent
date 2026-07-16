import { useRef } from 'react'
import type { CardTile } from './types'
import { facesOf, cardImage } from './faces'

// URLs already requested this session — the browser caches the bytes, this just avoids re-issuing.
const warmed = new Set<string>()

function warm(url: string | null): void {
  if (!url || typeof window === 'undefined' || warmed.has(url)) return
  warmed.add(url)
  const img = new Image()
  img.decoding = 'async'
  img.src = url
}

/** Preload the drawer ('large') and modal ('png') images for a card's face(s), so opening either is
 *  instant. Deduped across the session. */
export function prefetchTileImages(tile: CardTile): void {
  const faces = facesOf(tile)
  const sources = faces.length >= 2 ? faces : [tile.enriched]
  for (const src of sources) {
    warm(cardImage(src, 'large'))
    warm(cardImage(src, 'png'))
  }
}

/** Hover handlers that prefetch a card's high-res images after a short dwell, so a quick sweep across
 *  the grid doesn't fire dozens of downloads — only a deliberate hover warms the cache. */
export function useHoverPrefetch(tile: CardTile) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onMouseEnter = () => {
    timer.current = setTimeout(() => prefetchTileImages(tile), 120)
  }
  const onMouseLeave = () => {
    if (timer.current) clearTimeout(timer.current)
  }

  return { onMouseEnter, onMouseLeave }
}
