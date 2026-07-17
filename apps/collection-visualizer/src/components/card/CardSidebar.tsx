import { X, ExternalLink, Pin, PinOff } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { ScrollArea } from '~/components/ui/scroll-area'
import { CardDetails } from './CardDetails'
import { DownloadButton } from './DownloadButton'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { scryfallUrl } from '~/lib/format'
import { shownFace, cardImage } from '~/lib/faces'
import { imageFilename } from '~/lib/download'

interface CardSidebarProps {
  tile: Tile
  /** All owned variants (same card name), including the selected tile. */
  variants: Tile[]
  currency: Currency
  baseline: Baseline
  onSelect: (key: string) => void
  onClose: () => void
  /** Flip count, seeded from the tile's shown face when the drawer opens, then owned here. */
  rotations?: number
  onFlip?: () => void
  /** True when the grid already renders exactly this printing + face. */
  pinned: boolean
  /** `key` of the printing currently pinned for this card, if any — marked in the variant strip. */
  pinnedKey?: string
  /** Commit this printing + face as what the grid renders (or clear it when already pinned). */
  onTogglePin: () => void
}

export function CardSidebar(props: CardSidebarProps) {
  const t = props.tile

  // Best-quality image of the face the drawer is currently showing, for the download button.
  const flipped = (props.rotations ?? 0) % 2 === 1
  const face = shownFace(t, flipped)
  const downloadUrl = face ? cardImage(face, 'png') : cardImage(t.enriched, 'png')
  const downloadName = imageFilename(face ? face.name || t.name : t.name)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <div className="flex items-center gap-1">
          <a href={scryfallUrl(t.setCode, t.collectorNumber)} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink /> Open in Scryfall
            </Button>
          </a>
          {downloadUrl && <DownloadButton url={downloadUrl} filename={downloadName} className="size-8" />}
          {/* The drawer is otherwise independent of the grid — this is the one control that pushes
              what you're looking at back out to the tile. */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.pinned ? 'default' : 'outline'}
                size="icon"
                className="size-8"
                onClick={props.onTogglePin}
                aria-pressed={props.pinned}
                aria-label={props.pinned ? 'Unpin from tile' : 'Pin to tile'}
              >
                {props.pinned ? <PinOff /> : <Pin />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{props.pinned ? 'Unpin — go back to the default printing' : 'Show this printing & face on the tile'}</TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" onClick={props.onClose} aria-label="Close">
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Close</TooltipContent>
        </Tooltip>
      </div>

      {/* Full details for the selected printing, plus the printings strip beside the image. */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="p-4">
          <CardDetails
            tile={t}
            currency={props.currency}
            baseline={props.baseline}
            full
            variants={props.variants}
            pinnedKey={props.pinnedKey}
            onSelectVariant={props.onSelect}
            rotations={props.rotations}
            onFlip={props.onFlip}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
