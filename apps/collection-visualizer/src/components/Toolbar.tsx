import { useRef } from 'react'
import type { Baseline, Currency } from '~/lib/types'
import type { SortKey } from '~/lib/sort'
import type { FilterState } from '~/lib/filters'

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
  onRefresh: () => void
  refreshing: boolean
  onUpload: (file: File) => void
  pricesUpdatedAt: number | null
}

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' }, { key: 'set', label: 'Set' }, { key: 'rarity', label: 'Rarity' },
  { key: 'number', label: 'Number' }, { key: 'cmc', label: 'Mana value' }, { key: 'price', label: 'Price' },
]
const COLORS: { sym: 'W' | 'U' | 'B' | 'R' | 'G'; label: string }[] = [
  { sym: 'W', label: 'W' }, { sym: 'U', label: 'U' }, { sym: 'B', label: 'B' }, { sym: 'R', label: 'R' }, { sym: 'G', label: 'G' },
]

export function Toolbar(props: ToolbarProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const f = props.filters
  const set = (patch: Partial<FilterState>) => props.onFilters({ ...f, ...patch })
  const toggleColor = (sym: 'W' | 'U' | 'B' | 'R' | 'G') =>
    set({ colors: f.colors.includes(sym) ? f.colors.filter((c) => c !== sym) : [...f.colors, sym] })

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 p-3">
      <input
        value={props.query}
        onChange={(e) => props.onQuery(e.target.value)}
        placeholder='Search… o:"draw a card"  c:r t:instant  mv>=3'
        className="min-w-[18rem] flex-1 rounded bg-neutral-800 px-3 py-1.5"
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

      <select
        value=""
        onChange={(e) => { const code = e.target.value; if (code && !f.sets.includes(code)) set({ sets: [...f.sets, code] }) }}
        className="rounded bg-neutral-800 px-2 py-1.5"
      >
        <option value="">+ Set filter…</option>
        {props.sets.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
      </select>

      <div className="flex items-center gap-1">
        {COLORS.map((c) => (
          <button key={c.sym} onClick={() => toggleColor(c.sym)} className={f.colors.includes(c.sym) ? 'h-8 w-8 rounded-full bg-amber-500 text-black' : 'h-8 w-8 rounded-full bg-neutral-800'}>{c.label}</button>
        ))}
        <select value={f.colorMode} onChange={(e) => set({ colorMode: e.target.value as FilterState['colorMode'] })} className="rounded bg-neutral-800 px-2 py-1.5">
          <option value="any">any</option>
          <option value="all">all</option>
          <option value="exactly">exactly</option>
        </select>
        <button onClick={() => set({ colorless: !f.colorless })} className={f.colorless ? 'rounded bg-amber-500 px-2 py-1.5 text-black' : 'rounded bg-neutral-800 px-2 py-1.5'}>C</button>
        <button onClick={() => set({ multicolor: !f.multicolor })} className={f.multicolor ? 'rounded bg-amber-500 px-2 py-1.5 text-black' : 'rounded bg-neutral-800 px-2 py-1.5'}>Multi</button>
      </div>

      <input type="number" placeholder="min price" value={f.priceMin ?? ''} onChange={(e) => set({ priceMin: e.target.value === '' ? null : Number(e.target.value) })} className="w-24 rounded bg-neutral-800 px-2 py-1.5" />
      <input type="number" placeholder="max price" value={f.priceMax ?? ''} onChange={(e) => set({ priceMax: e.target.value === '' ? null : Number(e.target.value) })} className="w-24 rounded bg-neutral-800 px-2 py-1.5" />
      <input type="number" placeholder="mv min" value={f.cmcMin ?? ''} onChange={(e) => set({ cmcMin: e.target.value === '' ? null : Number(e.target.value) })} className="w-20 rounded bg-neutral-800 px-2 py-1.5" />
      <input type="number" placeholder="mv max" value={f.cmcMax ?? ''} onChange={(e) => set({ cmcMax: e.target.value === '' ? null : Number(e.target.value) })} className="w-20 rounded bg-neutral-800 px-2 py-1.5" />

      <button onClick={props.onRefresh} disabled={props.refreshing} className="rounded bg-blue-700 px-3 py-1.5 disabled:opacity-50">
        {props.refreshing ? 'Refreshing…' : 'Refresh'}
      </button>
      <button onClick={() => fileRef.current?.click()} className="rounded bg-neutral-700 px-3 py-1.5">Upload CSV</button>
      <input ref={fileRef} type="file" accept=".csv" hidden onChange={(e) => { const file = e.target.files?.[0]; if (file) props.onUpload(file) }} />

      {props.pricesUpdatedAt && (
        <span className="text-xs text-neutral-500">updated {new Date(props.pricesUpdatedAt).toLocaleString()}</span>
      )}

      {(f.sets.length > 0 || f.colors.length > 0 || f.priceMin != null || f.priceMax != null || f.cmcMin != null || f.cmcMax != null) && (
        <button onClick={() => set({ sets: [], colors: [], priceMin: null, priceMax: null, cmcMin: null, cmcMax: null })} className="text-xs text-neutral-400 underline">clear filters</button>
      )}
    </div>
  )
}
