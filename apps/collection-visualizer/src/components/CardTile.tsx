import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { TileFooter } from './TileFooter'

interface CardTileProps {
  tile: Tile
  currency: Currency
  baseline: Baseline
  selected?: boolean
  onSelect?: (key: string) => void
}

export function CardTile(props: CardTileProps) {
  const { tile, currency, baseline } = props
  const value = tileValue(tile, currency)
  const delta = unitDelta(tile, currency, baseline)

  return (
    <div
      onClick={() => props.onSelect?.(tile.key)}
      className={`flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Card-aspect box reserves height from width; object-contain never crops. The footer rows
          below have FIXED heights so CardGrid's deterministic row-height math stays exact. */}
      <div className="relative aspect-[488/680] w-full overflow-hidden rounded bg-muted">
        {tile.enriched.imageSmall ? (
          <img
            src={tile.enriched.imageSmall}
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
}
