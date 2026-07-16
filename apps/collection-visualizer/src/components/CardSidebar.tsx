import { X, ExternalLink } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { CardDetails } from './CardDetails'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { scryfallUrl } from '~/lib/format'

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
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <a href={scryfallUrl(t.setCode, t.collectorNumber)} target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink /> Open in Scryfall
          </Button>
        </a>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" onClick={props.onClose} aria-label="Close">
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Close</TooltipContent>
        </Tooltip>
      </div>

      {/* Full details for the selected printing, plus the printings strip (with prices) at the
          bottom — click a printing to select it. */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <CardDetails
          tile={t}
          currency={props.currency}
          baseline={props.baseline}
          full
          variants={props.variants}
          onSelectVariant={props.onSelect}
        />
      </div>
    </aside>
  )
}
