import { useState, type CSSProperties } from 'react'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { formatMoney } from '~/lib/format'
import { groupTotals, type NameGroup } from '~/lib/stacks'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import { CardDetails } from './CardDetails'

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
 *  the cell (scale < 1). The tile itself never animates on hover; the fan lives in the popover. */
function tileCardStyle(index: number): CSSProperties {
  return {
    transform: `translateX(${index * 6}%) translateY(${-index * 11}%) rotate(${index * 2}deg) scale(0.82)`,
    transformOrigin: 'bottom center',
    zIndex: 20 - index,
  }
}

export function StackTile(props: StackTileProps) {
  const { group, rep, currency, baseline } = props
  const totals = groupTotals(group.variants, currency)

  const others = group.variants.filter((v) => v.key !== rep.key)
  const shown = [rep, ...others].slice(0, 3) // up to 3 visible in the tile
  const many = group.variants.length > 1

  const [hoveredKey, setHoveredKey] = useState(rep.key)
  const hovered = group.variants.find((v) => v.key === hoveredKey) ?? rep

  const tile = (
    <div
      onClick={() => props.onSelect(rep.key)}
      className={`flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Card-aspect box keeps the grid's deterministic row height; the bg-card behind the
          cascade makes the whole cell a clear, obvious hover target. */}
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
              <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">×{totals.quantity}</span>
            )}
            {i === 0 && rep.finish !== 'normal' && (
              <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
                {rep.finish === 'etched' ? 'ETCH' : 'FOIL'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-1 h-5 min-w-0 truncate text-sm leading-5" title={rep.name}>{rep.name}</div>
      <div className="flex h-6 items-baseline justify-between gap-1 leading-6">
        <span className="font-semibold">{formatMoney(totals.value, currency)}</span>
        {many && <span className="shrink-0 text-xs text-muted-foreground">{group.variants.length} printings</span>}
      </div>
    </div>
  )

  return (
    <HoverCard openDelay={120} closeDelay={120} onOpenChange={(o) => !o && setHoveredKey(rep.key)}>
      <HoverCardTrigger asChild>{tile}</HoverCardTrigger>

      {/* One popover: the card details, which — for a real stack — render a strip of the printings
          below them (see CardDetails). A single-printing card still gets its details, just no strip. */}
      <HoverCardContent side="right" align="center" className="w-72 text-sm">
        <CardDetails
          tile={hovered}
          currency={currency}
          baseline={baseline}
          variants={group.variants}
          onHoverVariant={setHoveredKey}
          onSelectVariant={props.onSelect}
        />
      </HoverCardContent>
    </HoverCard>
  )
}
