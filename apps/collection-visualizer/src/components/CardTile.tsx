import { memo, useState } from 'react'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { facesOf, faceImage } from '~/lib/faces'
import { TileFooter } from './TileFooter'
import { FlipImage } from './FlipImage'
import { FlipButton } from './FlipButton'

interface CardTileProps {
  tile: Tile
  currency: Currency
  baseline: Baseline
  selected?: boolean
  onSelect?: (key: string, flipped?: boolean) => void
}

// Memoized so the tile (with its Radix tooltips) doesn't re-render on every grid geometry change —
// e.g. each frame of the sidebar width animation. Props are referentially stable between those.
export const CardTile = memo(function CardTile(props: CardTileProps) {
  const { tile, currency, baseline } = props
  const value = tileValue(tile, currency)
  const delta = unitDelta(tile, currency, baseline)

  const faces = facesOf(tile)
  const twoSided = faces.length >= 2
  const [flipped, setFlipped] = useState(false)
  // Use the higher-res 'normal' image — the 'small' one is only 146px wide and looks blurry at tile size.
  const front = twoSided ? faceImage(faces[0], 'normal') : tile.enriched.imageNormal ?? tile.enriched.imageSmall
  const back = twoSided ? faceImage(faces[1], 'normal') : null

  return (
    <div
      onClick={() => props.onSelect?.(tile.key, flipped)}
      className={`group flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Card-aspect box reserves height from width; object-contain never crops. The footer rows
          below have FIXED heights so CardGrid's deterministic row-height math stays exact. */}
      <div className="relative aspect-[488/680] w-full overflow-hidden rounded bg-muted">
        {twoSided ? (
          <FlipImage front={front} back={back} flipped={flipped} alt={tile.name} loading="lazy" />
        ) : front ? (
          <img
            src={front}
            alt={tile.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">
            {tile.name}
          </div>
        )}
        {tile.quantity > 1 && (
          <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">×{tile.quantity}</span>
        )}
        {tile.finish !== 'normal' && (
          <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
            {tile.finish === 'etched' ? 'ETCH' : 'FOIL'}
          </span>
        )}
        {twoSided && (
          <FlipButton
            onFlip={() => setFlipped((f) => !f)}
            className="absolute bottom-1 left-1 opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
      <TileFooter
        name={tile.name}
        typeLine={tile.enriched.typeLine}
        setCode={tile.setCode}
        setName={tile.setName}
        collectorNumber={tile.collectorNumber}
        rarity={tile.rarity}
        value={value}
        delta={delta}
        currency={currency}
      />
    </div>
  )
})
