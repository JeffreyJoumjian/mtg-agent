import { useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import type { CardPin, Pins } from '~/lib/state/pins'
import { tileValue, unitDelta } from '~/lib/card/pricing'
import { facesOf, cardImage } from '~/lib/card/faces'
import { formatMoney, formatDelta } from '~/lib/format'
import { rarityStyle } from '~/lib/card/rarity'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import { ManaSymbol } from '~/components/symbols/Mana'
import { SetIcon } from '~/components/symbols/SetIcon'
import { FaceBadge, RarityBadge } from '~/components/symbols/Badges'
import { CardDetails } from '~/components/card/CardDetails'

interface CardListProps {
  tiles: Tile[]
  currency: Currency
  baseline: Baseline
  selectedKey: string | null
  /** Pinned face per card name — the list is always ungrouped, so a pin's `variantKey` doesn't
   *  apply here (every printing has its own row) but its `face` does, same as an ungrouped grid. */
  pins: Pins
  onSelect: (key: string) => void
}

const ROW = 56

export function CardList(props: CardListProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: props.tiles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW,
    overscan: 12,
  })

  return (
    <div ref={parentRef} className="h-full overflow-y-auto">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((row) => {
          const t = props.tiles[row.index]
          return (
            <ListRow
              key={row.key}
              tile={t}
              currency={props.currency}
              baseline={props.baseline}
              selected={t.key === props.selectedKey}
              pin={props.pins[t.name]}
              start={row.start}
              onSelect={props.onSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

interface ListRowProps {
  tile: Tile
  currency: Currency
  baseline: Baseline
  selected: boolean
  pin?: CardPin
  /** The virtualizer's y offset for this row. */
  start: number
  onSelect: (key: string) => void
}

/** One row of the list. Its own component (rather than inline in the map) so it can hold the hover
 *  preview's flip state — a row has no flip control of its own, but the preview inside it does. */
function ListRow(props: ListRowProps) {
  const { tile, currency, baseline } = props
  const value = tileValue(tile, currency)
  const delta = unitDelta(tile, currency, baseline)

  const faces = facesOf(tile)
  const twoSided = faces.length >= 2
  // The row itself shows exactly what's pinned. Flipping inside the hover preview is an offset on
  // top of that and stays in the preview — the same rule the drawer follows, where nothing outside
  // moves until you pin. So a new pin has to clear the offset, hence the pin-identity reset below.
  const pinnedFace = twoSided ? (props.pin?.face ?? 0) % 2 : 0
  const rowFace = twoSided ? faces[pinnedFace] : null

  const [flips, setFlips] = useState(0)
  const [seenPin, setSeenPin] = useState(props.pin)
  if (seenPin !== props.pin) {
    setSeenPin(props.pin)
    setFlips(0)
  }

  const img = cardImage(rowFace ?? tile.enriched, 'small')
  const name = rowFace ? rowFace.name : tile.name

  return (
    <HoverCard openDelay={180} closeDelay={80}>
      <HoverCardTrigger asChild>
        <div
          data-card
          onClick={() => props.onSelect(tile.key)}
          className={`absolute left-0 top-0 flex w-full cursor-pointer items-center gap-3 border-b px-3 transition hover:bg-accent ${props.selected ? 'bg-accent' : ''}`}
          style={{ height: ROW, transform: `translateY(${props.start}px)` }}
        >
          <div className="relative h-11 w-8 shrink-0 overflow-hidden rounded bg-muted">
            {img && (
              <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1">
              {twoSided && <FaceBadge back={pinnedFace === 1} className="text-muted-foreground" />}
              <span className="truncate">{name}</span>
            </div>
            <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
              <SetIcon setCode={tile.setCode} className={rarityStyle(tile.rarity).icon} />
              <span className="truncate">
                {tile.setName} · {tile.collectorNumber}
              </span>
              <RarityBadge rarity={tile.rarity} />
              <span className="shrink-0">
                {tile.finish !== 'normal' && ` · ${tile.finish === 'etched' ? 'Etched' : 'Foil'}`}
                {tile.quantity > 1 && ` · ×${tile.quantity}`}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            {tile.enriched.colors.map((c) => (
              <ManaSymbol key={c} sym={c} className="h-4 w-4" />
            ))}
          </div>
          <div className="w-24 shrink-0 text-right">
            <div className="font-semibold">{formatMoney(value, props.currency)}</div>
            {delta && (
              <div className={delta.value < 0 ? 'text-xs text-red-400' : 'text-xs text-emerald-400'}>
                {delta.value < 0 ? '▼' : '▲'} {formatDelta(delta.value, delta.currency)}
              </div>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-64">
        <CardDetails
          tile={tile}
          currency={props.currency}
          baseline={props.baseline}
          rotations={pinnedFace + flips}
          onFlip={() => setFlips((n) => n + 1)}
        />
      </HoverCardContent>
    </HoverCard>
  )
}
