import { useRef } from 'react'
import type { Baseline, Currency } from '~/lib/types'
import type { SortKey } from '~/lib/sort'
import type { FilterState } from '~/lib/filters'
import { FiltersPopover } from './FiltersPopover'

interface ToolbarProps {
  query: string
  onQuery: (v: string) => void
  currency: Currency
  onCurrency: (c: Currency) => void
  baseline: Baseline
  onBaseline: (b: Baseline) => void
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onSort: (key: SortKey, dir: 'asc' | 'desc') => void
  sets: { code: string; name: string }[]
  filters: FilterState
  onFilters: (f: FilterState) => void
  priceBounds: [number, number]
  cmcBounds: [number, number]
  onRefresh: () => void
  refreshing: boolean
  onUpload: (file: File) => void
  pricesUpdatedAt: number | null
}

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' }, { key: 'set', label: 'Set' }, { key: 'rarity', label: 'Rarity' },
  { key: 'number', label: 'Number' }, { key: 'cmc', label: 'Mana value' }, { key: 'price', label: 'Price' },
]

export function Toolbar(props: ToolbarProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 p-3">
      <input
        value={props.query}
        onChange={(e) => props.onQuery(e.target.value)}
        placeholder='Search… o:"draw a card"  c:r t:instant  mv>=3'
        className="min-w-[16rem] flex-1 rounded bg-neutral-800 px-3 py-1.5"
      />

      <div className="flex overflow-hidden rounded border border-neutral-700">
        {(['usd', 'eur'] as Currency[]).map((c) => (
          <button key={c} onClick={() => props.onCurrency(c)} className={c === props.currency ? 'bg-neutral-700 px-3 py-1.5 uppercase' : 'px-3 py-1.5 uppercase'}>{c}</button>
        ))}
      </div>

      <select
        value={props.baseline}
        onChange={(e) => props.onBaseline(e.target.value as Baseline)}
        className="rounded bg-neutral-800 px-2 py-1.5"
      >
        <option value="sinceRefresh">± since refresh</option>
        <option value="vsPurchase">± vs purchase</option>
      </select>

      <select
        value={props.sortKey}
        onChange={(e) => props.onSort(e.target.value as SortKey, props.sortDir)}
        className="rounded bg-neutral-800 px-2 py-1.5"
      >
        {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
      </select>
      <button onClick={() => props.onSort(props.sortKey, props.sortDir === 'asc' ? 'desc' : 'asc')} className="rounded bg-neutral-800 px-2 py-1.5">
        {props.sortDir === 'asc' ? '↑' : '↓'}
      </button>

      <FiltersPopover
        sets={props.sets}
        filters={props.filters}
        onFilters={props.onFilters}
        priceBounds={props.priceBounds}
        cmcBounds={props.cmcBounds}
        currency={props.currency}
      />

      <button onClick={props.onRefresh} disabled={props.refreshing} className="rounded bg-blue-700 px-3 py-1.5 disabled:opacity-50">
        {props.refreshing ? 'Refreshing…' : 'Refresh'}
      </button>
      <button onClick={() => fileRef.current?.click()} className="rounded bg-neutral-700 px-3 py-1.5">Upload CSV</button>
      <input ref={fileRef} type="file" accept=".csv" hidden onChange={(e) => { const file = e.target.files?.[0]; if (file) props.onUpload(file) }} />

      {props.pricesUpdatedAt && (
        <span className="text-xs text-neutral-500">updated {new Date(props.pricesUpdatedAt).toLocaleString()}</span>
      )}
    </div>
  )
}
