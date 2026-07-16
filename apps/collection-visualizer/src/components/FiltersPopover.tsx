import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Checkbox } from '~/components/ui/checkbox'
import { Slider } from '~/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { ScrollArea } from '~/components/ui/scroll-area'
import type { ColorSymbol, Currency } from '~/lib/types'
import { activeFilterCount, emptyFilters, type FilterState } from '~/lib/filters'
import { ManaSymbol } from './ManaSymbol'

const MANA: { sym: ColorSymbol; label: string }[] = [
  { sym: 'W', label: 'White' },
  { sym: 'U', label: 'Blue' },
  { sym: 'B', label: 'Black' },
  { sym: 'R', label: 'Red' },
  { sym: 'G', label: 'Green' },
]

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
    return <div className="text-xs text-muted-foreground">{props.label}: {props.format(min)}</div>
  }

  const lo = props.lo ?? min
  const hi = props.hi ?? max

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-muted-foreground">{props.label}</span>
        <span className="text-xs text-muted-foreground">{props.format(lo)} – {props.format(hi)}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={props.step}
        value={[lo, hi]}
        minStepsBetweenThumbs={0}
        onValueChange={(v) => props.onChange(v[0] <= min ? null : v[0], v[1] >= max ? null : v[1])}
      />
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

  const [setQuery, setSetQuery] = useState('')
  const visibleSets = props.sets.filter((s) => s.name.toLowerCase().includes(setQuery.trim().toLowerCase()))

  const toggleColor = (c: ColorSymbol) =>
    set({ colors: f.colors.includes(c) ? f.colors.filter((x) => x !== c) : [...f.colors, c] })
  const toggleSet = (code: string) =>
    set({ sets: f.sets.includes(code) ? f.sets.filter((s) => s !== code) : [...f.sets, code] })

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <SlidersHorizontal /> Filters
            {count > 0 && (
              <span className="ml-0.5 rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">{count}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0 text-sm">
          <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 p-4">
          <section>
            <div className="mb-2 text-muted-foreground">Colors</div>
            <div className="flex items-center gap-1.5">
              {MANA.map((m) => {
                const on = f.colors.includes(m.sym)
                return (
                  <Tooltip key={m.sym}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={m.label}
                        aria-pressed={on}
                        onClick={() => toggleColor(m.sym)}
                        className={`h-7 w-7 rounded-full transition ${on ? 'ring-2 ring-ring ring-offset-1 ring-offset-popover' : 'opacity-40 hover:opacity-90'}`}
                      >
                        <ManaSymbol sym={m.sym} className="h-full w-full" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{m.label}</TooltipContent>
                  </Tooltip>
                )
              })}
              <Select value={f.colorMode} onValueChange={(v) => set({ colorMode: v as FilterState['colorMode'] })}>
                <SelectTrigger size="sm" className="ml-auto w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">any</SelectItem>
                  <SelectItem value="all">all</SelectItem>
                  <SelectItem value="exactly">exactly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-2 flex gap-2">
              <Button variant={f.colorless ? 'default' : 'outline'} size="sm" onClick={() => set({ colorless: !f.colorless })}>
                Colorless
              </Button>
              <Button variant={f.multicolor ? 'default' : 'outline'} size="sm" onClick={() => set({ multicolor: !f.multicolor })}>
                Multicolor
              </Button>
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
            <div className="mb-2 text-muted-foreground">
              Sets {f.sets.length > 0 && <span>({f.sets.length})</span>}
            </div>
            <Input
              value={setQuery}
              onChange={(e) => setSetQuery(e.target.value)}
              placeholder="Search sets…"
              className="mb-2 h-8"
            />
            <ScrollArea className="h-40 rounded-md border">
              <div className="space-y-0.5 p-2 pr-2.5">
                {visibleSets.length === 0 ? (
                  <div className="px-1 py-0.5 text-xs text-muted-foreground">No sets match.</div>
                ) : (
                  visibleSets.map((s) => (
                    <label key={s.code} className="flex min-w-0 cursor-pointer items-center gap-2 rounded px-1 py-1 hover:bg-accent">
                      <Checkbox checked={f.sets.includes(s.code)} onCheckedChange={() => toggleSet(s.code)} />
                      <span className="min-w-0 truncate">{s.name}</span>
                    </label>
                  ))
                )}
              </div>
            </ScrollArea>
          </section>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={count === 0}
            onClick={() => props.onFilters(emptyFilters())}
          >
            Clear all filters
          </Button>
          </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {count > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 size-8 text-muted-foreground"
              aria-label="Clear filters"
              onClick={() => props.onFilters(emptyFilters())}
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear filters</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
