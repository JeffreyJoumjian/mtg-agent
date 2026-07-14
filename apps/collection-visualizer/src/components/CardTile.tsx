import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { formatMoney, formatDelta, truncate } from '~/lib/format'

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
    <div className="relative flex flex-col rounded-lg bg-neutral-900 p-1.5">
      <div className="relative aspect-[488/680] w-full overflow-hidden rounded">
        {tile.enriched.imageSmall ? (
          <img src={tile.enriched.imageSmall} alt={tile.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 p-2 text-center text-xs text-neutral-400">
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
      <div className="mt-1 truncate text-sm" title={tile.name}>{truncate(tile.name, 22)}</div>
      <div className="flex items-baseline justify-between">
        <span className="font-semibold">{formatMoney(value, currency)}</span>
        {delta && (
          <span className={delta.value < 0 ? 'text-xs text-red-400' : 'text-xs text-emerald-400'}>
            {delta.value < 0 ? '▼' : '▲'} {formatDelta(delta.value, delta.currency)}
          </span>
        )}
      </div>
    </div>
  )
}
