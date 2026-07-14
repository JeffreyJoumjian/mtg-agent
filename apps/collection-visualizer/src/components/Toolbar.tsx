import { useRef } from 'react'
import { RefreshCw, Upload } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { FiltersPopover } from './FiltersPopover'
import { SettingsPopover } from './SettingsPopover'
import type { FilterState } from '~/lib/filters'
import type { ViewSettings } from '~/lib/settings'

interface ToolbarProps {
  query: string
  onQuery: (v: string) => void
  sets: { code: string; name: string }[]
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
}

export function Toolbar(props: ToolbarProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-3">
      <Input
        value={props.query}
        onChange={(e) => props.onQuery(e.target.value)}
        placeholder='Search… o:"draw a card"  c:r t:instant  mv>=3'
        className="min-w-[16rem] flex-1"
      />

      <FiltersPopover
        sets={props.sets}
        filters={props.filters}
        onFilters={props.onFilters}
        priceBounds={props.priceBounds}
        cmcBounds={props.cmcBounds}
        currency={props.settings.currency}
      />

      <SettingsPopover settings={props.settings} onSettings={props.onSettings} />

      <Button variant="default" size="sm" onClick={props.onRefresh} disabled={props.refreshing}>
        <RefreshCw className={props.refreshing ? 'animate-spin' : ''} /> {props.refreshing ? 'Refreshing…' : 'Refresh'}
      </Button>
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
        <span className="text-xs text-muted-foreground">updated {new Date(props.pricesUpdatedAt).toLocaleString()}</span>
      )}
    </div>
  )
}
