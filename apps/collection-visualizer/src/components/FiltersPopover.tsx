import * as Popover from '@radix-ui/react-popover'
import * as Slider from '@radix-ui/react-slider'
import type { ColorSymbol, Currency } from '~/lib/types'
import { activeFilterCount, emptyFilters, type FilterState } from '~/lib/filters'

/** Official mana-pip colors (W/U/B/R/G) — shown as colored circles instead of letters. */
const MANA: { sym: ColorSymbol; label: string; bg: string }[] = [
  { sym: 'W', label: 'White', bg: '#F8F3D6' },
  { sym: 'U', label: 'Blue', bg: '#A6D3F0' },
  { sym: 'B', label: 'Black', bg: '#B3AAA4' },
  { sym: 'R', label: 'Red', bg: '#F0A183' },
  { sym: 'G', label: 'Green', bg: '#9AD1A5' },
]

const chip = (on: boolean): string =>
  on ? 'rounded bg-amber-500 px-2 py-1 text-black' : 'rounded bg-neutral-800 px-2 py-1 hover:bg-neutral-700'

const priceStep = (bounds: [number, number]): number => (bounds[1] - bounds[0] <= 10 ? 0.5 : 1)

interface RangeSliderProps {
  label: string
  bounds: [number, number]
  lo: number | null
  hi: number | null
  step: number
  format: (n: number) => string
  onChange: (lo: number | null, hi: number | null) => void
}

/** A dual-thumb range slider whose full-span position means "no filter" (returns null bounds). */
function RangeSlider(props: RangeSliderProps) {
  const [min, max] = props.bounds

  if (max <= min) {
    return <div className="text-xs text-neutral-500">{props.label}: {props.format(min)}</div>
  }

  const lo = props.lo ?? min
  const hi = props.hi ?? max

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-neutral-300">{props.label}</span>
        <span className="text-xs text-neutral-400">{props.format(lo)} – {props.format(hi)}</span>
      </div>
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={props.step}
        value={[lo, hi]}
        minStepsBetweenThumbs={0}
        onValueChange={([a, b]) => props.onChange(a <= min ? null : a, b >= max ? null : b)}
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-neutral-700">
          <Slider.Range className="absolute h-full rounded-full bg-amber-500" />
        </Slider.Track>
        <Slider.Thumb aria-label={`${props.label} minimum`} className="block h-4 w-4 rounded-full border border-neutral-900 bg-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" />
        <Slider.Thumb aria-label={`${props.label} maximum`} className="block h-4 w-4 rounded-full border border-neutral-900 bg-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" />
      </Slider.Root>
    </div>
  )
}

interface FiltersPopoverProps {
  sets: { code: string; name: string }[]
  filters: FilterState
  onFilters: (f: FilterState) => void
  priceBounds: [number, number]
  cmcBounds: [number, number]
  currency: Currency
}

export function FiltersPopover(props: FiltersPopoverProps) {
  const f = props.filters
  const set = (patch: Partial<FilterState>) => props.onFilters({ ...f, ...patch })
  const count = activeFilterCount(f)
  const sym = props.currency === 'usd' ? '$' : '€'

  const toggleColor = (c: ColorSymbol) =>
    set({ colors: f.colors.includes(c) ? f.colors.filter((x) => x !== c) : [...f.colors, c] })
  const toggleSet = (code: string) =>
    set({ sets: f.sets.includes(code) ? f.sets.filter((s) => s !== code) : [...f.sets, code] })

  return (
    <div className="flex items-center">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex items-center gap-1.5 rounded bg-neutral-800 px-3 py-1.5 hover:bg-neutral-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filters
            {count > 0 && <span className="rounded-full bg-amber-500 px-1.5 text-xs font-bold text-black">{count}</span>}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={8}
            className="z-50 max-h-[80vh] w-80 overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-sm text-neutral-100 shadow-xl"
          >
            <div className="space-y-4">
              <section>
                <div className="mb-1.5 text-neutral-300">Colors</div>
                <div className="flex items-center gap-1.5">
                  {MANA.map((m) => {
                    const on = f.colors.includes(m.sym)
                    return (
                      <button
                        key={m.sym}
                        title={m.label}
                        aria-pressed={on}
                        onClick={() => toggleColor(m.sym)}
                        className={`h-7 w-7 rounded-full border border-black/40 transition ${on ? 'ring-2 ring-white ring-offset-1 ring-offset-neutral-900' : 'opacity-40 hover:opacity-80'}`}
                        style={{ backgroundColor: m.bg }}
                      />
                    )
                  })}
                  <select
                    value={f.colorMode}
                    onChange={(e) => set({ colorMode: e.target.value as FilterState['colorMode'] })}
                    className="ml-auto rounded bg-neutral-800 px-2 py-1"
                  >
                    <option value="any">any</option>
                    <option value="all">all</option>
                    <option value="exactly">exactly</option>
                  </select>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => set({ colorless: !f.colorless })} className={chip(f.colorless)}>Colorless</button>
                  <button onClick={() => set({ multicolor: !f.multicolor })} className={chip(f.multicolor)}>Multicolor</button>
                </div>
              </section>

              <RangeSlider
                label="Price"
                bounds={props.priceBounds}
                lo={f.priceMin}
                hi={f.priceMax}
                step={priceStep(props.priceBounds)}
                format={(n) => `${sym}${n}`}
                onChange={(lo, hi) => set({ priceMin: lo, priceMax: hi })}
              />

              <RangeSlider
                label="Mana value"
                bounds={props.cmcBounds}
                lo={f.cmcMin}
                hi={f.cmcMax}
                step={1}
                format={(n) => String(n)}
                onChange={(lo, hi) => set({ cmcMin: lo, cmcMax: hi })}
              />

              <section>
                <div className="mb-1.5 text-neutral-300">
                  Sets {f.sets.length > 0 && <span className="text-neutral-500">({f.sets.length})</span>}
                </div>
                <div className="max-h-40 space-y-0.5 overflow-y-auto rounded border border-neutral-800 p-2">
                  {props.sets.map((s) => (
                    <label key={s.code} className="flex min-w-0 cursor-pointer items-center gap-2 rounded px-1 py-0.5 hover:bg-neutral-800">
                      <input type="checkbox" checked={f.sets.includes(s.code)} onChange={() => toggleSet(s.code)} className="shrink-0 accent-amber-500" />
                      <span className="min-w-0 truncate">{s.name}</span>
                    </label>
                  ))}
                </div>
              </section>

              <button
                onClick={() => props.onFilters(emptyFilters())}
                disabled={count === 0}
                className="w-full rounded bg-neutral-800 py-1.5 text-neutral-300 hover:bg-neutral-700 disabled:opacity-40"
              >
                Clear all filters
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {count > 0 && (
        <button
          title="Clear filters"
          onClick={() => props.onFilters(emptyFilters())}
          className="ml-1 rounded bg-neutral-800 px-2 py-1.5 text-neutral-400 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  )
}
