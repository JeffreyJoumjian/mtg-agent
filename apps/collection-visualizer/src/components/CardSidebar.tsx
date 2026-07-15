import { X, ExternalLink } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { CardDetails } from './CardDetails'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue } from '~/lib/pricing'
import { formatMoney, scryfallUrl } from '~/lib/format'

interface CardSidebarProps {
  tile: Tile
  /** All owned variants (same card name), including the selected tile. */
  variants: Tile[]
  currency: Currency
  baseline: Baseline
  onSelect: (key: string) => void
  onClose: () => void
}

export function CardSidebar(props: CardSidebarProps) {
  const t = props.tile

  return (
    <aside className="flex w-96 shrink-0 flex-col border-l bg-card">
      <div className="flex items-center justify-between gap-2 border-b p-3">
        <a href={scryfallUrl(t.setCode, t.collectorNumber)} target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink /> Open in Scryfall
          </Button>
        </a>
        <Button variant="ghost" size="icon" className="size-8" onClick={props.onClose} aria-label="Close" title="Close">
          <X />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <CardDetails tile={t} currency={props.currency} baseline={props.baseline} full />

        {props.variants.length > 1 && (
          <div className="mt-4 border-t pt-3">
            <div className="mb-2 text-sm text-muted-foreground">Variants you own ({props.variants.length})</div>
            <div className="space-y-1">
              {props.variants.map((v) => {
                const price = tileValue(v, props.currency)
                const active = v.key === t.key
                return (
                  <button
                    key={v.key}
                    onClick={() => props.onSelect(v.key)}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-md border p-1.5 text-left transition hover:bg-accent ${active ? 'border-ring bg-accent' : 'border-transparent'}`}
                  >
                    <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded bg-muted">
                      {v.enriched.imageSmall && (
                        <img src={v.enriched.imageSmall} alt="" className="absolute inset-0 h-full w-full object-contain" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm">{v.setName}</div>
                      <div className="text-xs text-muted-foreground">
                        #{v.collectorNumber}
                        {v.finish !== 'normal' && ` · ${v.finish}`}
                        {v.quantity > 1 && ` · ×${v.quantity}`}
                      </div>
                    </div>
                    <div className="shrink-0 text-sm font-medium">{formatMoney(price, props.currency)}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
