import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { formatMoney, formatDelta } from '~/lib/format'

interface CardTileProps {
  tile: Tile
  currency: Currency
  baseline: Baseline
}

export function CardTile(props: CardTileProps) {
  const { tile, currency, baseline } = props
  const value = tileValue(tile, currency)
  const delta = unitDelta(tile, currency, baseline)

  return (
    <div className="flex flex-col rounded-lg bg-neutral-900 p-1.5">
      {/* Fixed card-aspect box: reserves height from width, so the name/price below are
          always laid out and never overlapped. object-contain never crops the image. */}
      <div className="relative aspect-[488/680] w-full overflow-hidden rounded bg-neutral-800">
        {tile.enriched.imageSmall ? (
          <img
            src={tile.enriched.imageSmall}
            alt={tile.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-neutral-400">
            {tile.name}
          </div>
        )}
        {tile.quantity > 1 && (
          <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold">×{tile.quantity}</span>
        )}
        {tile.finish !== 'normal' && (
          <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
            {tile.finish === 'etched' ? 'ETCH' : 'FOIL'}
          </span>
        )}
      </div>
      <div className="mt-1 min-w-0 truncate text-sm" title={tile.name}>{tile.name}</div>
      <div className="flex items-baseline justify-between gap-1">
        <span className="font-semibold">{formatMoney(value, currency)}</span>
        {delta && (
          <span className={delta.value < 0 ? 'shrink-0 text-xs text-red-400' : 'shrink-0 text-xs text-emerald-400'}>
            {delta.value < 0 ? '▼' : '▲'} {formatDelta(delta.value, delta.currency)}
          </span>
        )}
      </div>
    </div>
  )
}
