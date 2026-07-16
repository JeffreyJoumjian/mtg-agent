import type { CSSProperties } from 'react'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { groupTotals, type NameGroup } from '~/lib/stacks'
import { totals } from '~/lib/pricing'
import { TileFooter } from './TileFooter'

interface StackTileProps {
  group: NameGroup
  /** The stack's face (pinned or picked by the rule). */
  rep: Tile
  currency: Currency
  baseline: Baseline
  selected?: boolean
  onSelect: (key: string) => void
}

/** Static cascade for a card in the TILE — a held-hand look, pivoting from the bottom, kept inside
 *  the cell (scale < 1). */
function tileCardStyle(index: number): CSSProperties {
  return {
    transform: `translateX(${index * 6}%) translateY(${-index * 11}%) rotate(${index * 2}deg) scale(0.82)`,
    transformOrigin: 'bottom center',
    zIndex: 20 - index,
  }
}

export function StackTile(props: StackTileProps) {
  const { group, rep, currency, baseline } = props
  const { quantity } = groupTotals(group.variants, currency)
  const { value, delta, deltaCurrency } = totals(group.variants, currency, baseline)

  const others = group.variants.filter((v) => v.key !== rep.key)
  const shown = [rep, ...others].slice(0, 3) // up to 3 visible in the tile
  const printings = group.variants.length

  return (
    <div
      onClick={() => props.onSelect(rep.key)}
      className={`flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Card-aspect box keeps the grid's deterministic row height; the cascade shows up to 3 of the
          stack's printings behind the face. */}
      <div className="relative aspect-[488/680] w-full">
        {shown.map((v, i) => (
          <div
            key={v.key}
            style={tileCardStyle(i)}
            className="absolute inset-0 overflow-hidden rounded-md border border-black/40 bg-muted shadow-md"
          >
            {v.enriched.imageSmall ? (
              <img src={v.enriched.imageSmall} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">{v.name}</div>
            )}
            {i === 0 && (
              <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">×{quantity}</span>
            )}
            {i === 0 && rep.finish !== 'normal' && (
              <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
                {rep.finish === 'etched' ? 'ETCH' : 'FOIL'}
              </span>
            )}
          </div>
        ))}
      </div>

      <TileFooter
        name={rep.name}
        typeLine={rep.enriched.typeLine}
        meta={`${rep.setName} · ${rep.collectorNumber} · ${rep.rarity}`}
        value={value}
        delta={delta !== 0 ? { value: delta, currency: deltaCurrency } : null}
        currency={currency}
        printings={printings > 1 ? printings : undefined}
      />
    </div>
  )
}
