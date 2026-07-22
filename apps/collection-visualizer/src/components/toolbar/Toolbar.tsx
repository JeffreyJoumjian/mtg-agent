import { useRef } from 'react'
import { RefreshCw, Upload, X } from 'lucide-react'
import { SetIcon } from '~/components/symbols/SetIcon'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { SidebarTrigger } from '~/components/ui/sidebar'
import { FiltersPopover } from './FiltersPopover'
import { SettingsPopover } from './SettingsPopover'
import type { FilterState } from '~/lib/view/filters'
import type { CardType } from '~/lib/card/type-line'
import type { ViewSettings } from '~/lib/state/settings'

interface ToolbarProps {
  query: string
  onQuery: (v: string) => void
  sets: { code: string; name: string }[]
  types: CardType[]
  filters: FilterState
  onFilters: (f: FilterState) => void
  priceBounds: [number, number]
  cmcBounds: [number, number]
  settings: ViewSettings
  onSettings: (s: ViewSettings) => void
  onRefresh: () => void
  refreshing: boolean
  onUpload: (file: File) => void
  pricesUpdatedAt: number | null
  /** Set the Library is pinned to (arrived from Collections), or null when browsing everything. */
  scopedSet: { code: string; name: string } | null
  onClearScope: () => void
}

export function Toolbar(props: ToolbarProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-3">
      <SidebarTrigger className="-ml-1" />

      {props.scopedSet && (
        <div className="flex items-center gap-1.5 rounded-md border bg-accent py-1 pl-2 pr-1 text-sm">
          <SetIcon setCode={props.scopedSet.code} className="text-muted-foreground" />
          <span className="max-w-[12rem] truncate font-medium">{props.scopedSet.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="size-5"
            aria-label="Show all sets"
            onClick={props.onClearScope}
          >
            <X />
          </Button>
        </div>
      )}

      <Input
        value={props.query}
        onChange={(e) => props.onQuery(e.target.value)}
        placeholder='Search… o:"draw a card"  c:r t:instant  mv>=3'
        className="min-w-[16rem] flex-1"
      />

      <FiltersPopover
        sets={props.scopedSet ? [] : props.sets}
        types={props.types}
        filters={props.filters}
        onFilters={props.onFilters}
        priceBounds={props.priceBounds}
        cmcBounds={props.cmcBounds}
        currency={props.settings.currency}
      />

      <SettingsPopover settings={props.settings} onSettings={props.onSettings} />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="size-8"
            onClick={props.onRefresh}
            disabled={props.refreshing}
            aria-label="Refresh prices"
          >
            <RefreshCw className={props.refreshing ? 'animate-spin' : ''} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Refresh prices</TooltipContent>
      </Tooltip>
      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
        <Upload /> Upload
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) props.onUpload(file)
        }}
      />

      {props.pricesUpdatedAt && (
        // Fixed locale so the server and client render the same string (no hydration mismatch).
        <span className="text-xs text-muted-foreground">updated {new Date(props.pricesUpdatedAt).toLocaleString('en-US')}</span>
      )}
    </div>
  )
}
