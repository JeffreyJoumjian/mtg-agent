import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'
import { getCollection, refreshPrices, uploadCsv } from '~/server/collection'
import { emptyFilters, priceBounds, cmcBounds, type FilterState } from '~/lib/filters'
import type { CardTile as Tile } from '~/lib/types'
import { computeView } from '~/lib/view'
import { applyTheme, defaultSettings, loadSettings, saveSettings, type ViewSettings } from '~/lib/settings'
import { groupByName, representative } from '~/lib/stacks'
import { Toolbar } from '~/components/Toolbar'
import { SummaryBar } from '~/components/SummaryBar'
import { CardGrid } from '~/components/CardGrid'
import { CardTile } from '~/components/CardTile'
import { StackTile } from '~/components/StackTile'
import { CardList } from '~/components/CardList'
import { CardSidebar } from '~/components/CardSidebar'

export const Route = createFileRoute('/')({
  loader: () => getCollection(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>(emptyFilters())
  const [settings, setSettings] = useState<ViewSettings>(defaultSettings())
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  // The drawer's flip, seeded from the tile's shown face on open, then owned independently.
  const [drawerFlipped, setDrawerFlipped] = useState(false)

  // Load persisted settings once on mount. Kept out of the initializer so server and client both
  // start from the defaults (no hydration mismatch); we adopt the stored values right after.
  useEffect(() => {
    const stored = loadSettings()
    if (stored) {
      setSettings(stored)
      applyTheme(stored.theme)
    }
  }, [])

  // Persist on every user-driven change (not on the mount-time load above).
  const updateSettings = (next: ViewSettings) => {
    setSettings(next)
    saveSettings(next)
    applyTheme(next.theme)
  }
  // Per-card pinned "face" (name -> tile.key), set when you click a variant.
  const [pins, setPins] = useState<Record<string, string>>({})

  const refreshFn = useServerFn(refreshPrices)
  const uploadFn = useServerFn(uploadCsv)

  const refreshMutation = useMutation({
    mutationFn: () => refreshFn(),
    onSuccess: () => router.invalidate(),
  })
  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const form = new FormData()
      form.append('file', file)
      return uploadFn({ data: form })
    },
    onSuccess: () => router.invalidate(),
  })

  const view = useMemo(
    () =>
      computeView(data.tiles, {
        query,
        filters,
        sortKey: settings.sortKey,
        sortDir: settings.sortDir,
        currency: settings.currency,
      }),
    [data.tiles, query, filters, settings.sortKey, settings.sortDir, settings.currency],
  )

  // Slider bounds come from the whole collection (not the filtered view), so they don't shift.
  const priceRange = useMemo(() => priceBounds(data.tiles, settings.currency), [data.tiles, settings.currency])
  const cmcRange = useMemo(() => cmcBounds(data.tiles), [data.tiles])

  const grouped = settings.grouped && settings.view === 'grid'
  const groups = useMemo(() => (grouped ? groupByName(view) : []), [grouped, view])

  const selectedTile = selectedKey ? data.tiles.find((t) => t.key === selectedKey) ?? null : null

  // The drawer overlays the grid (it doesn't resize it). `drawerOpen` drives the slide transform;
  // `sidebarTile` keeps the content mounted through the close animation so it doesn't blank mid-slide.
  const [sidebarTile, setSidebarTile] = useState<Tile | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => {
    if (selectedTile) {
      setSidebarTile(selectedTile)
      // Mount at the closed position, then open. Double rAF guarantees the closed frame paints first
      // (a single rAF can batch into the same paint), so the slide-in actually plays.
      let inner = 0
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setDrawerOpen(true))
      })
      return () => {
        cancelAnimationFrame(outer)
        cancelAnimationFrame(inner)
      }
    }
    setDrawerOpen(false)
    const timer = setTimeout(() => setSidebarTile(null), 300)
    return () => clearTimeout(timer)
  }, [selectedTile])

  const sidebarVariants = sidebarTile ? data.tiles.filter((t) => t.name === sidebarTile.name) : []

  const onSelect = (key: string, flipped = false) => {
    const tile = data.tiles.find((t) => t.key === key)
    if (!tile) return
    setSelectedKey(key)
    setDrawerFlipped(flipped)
    setPins((p) => ({ ...p, [tile.name]: key }))
  }

  return (
    <main className="flex h-screen flex-col">
      <Toolbar
        query={query}
        onQuery={setQuery}
        sets={data.sets}
        filters={filters}
        onFilters={setFilters}
        priceBounds={priceRange}
        cmcBounds={cmcRange}
        settings={settings}
        onSettings={updateSettings}
        onRefresh={() => refreshMutation.mutate()}
        refreshing={refreshMutation.isPending}
        onUpload={(file) => uploadMutation.mutate(file)}
        pricesUpdatedAt={data.pricesUpdatedAt}
      />
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between px-3 py-2">
            <SummaryBar tiles={view} currency={settings.currency} baseline={settings.baseline} />
          </div>
          <div className="min-h-0 flex-1">
            {settings.view === 'grid' ? (
              <CardGrid
                maxPerRow={settings.maxPerRow}
                count={grouped ? groups.length : view.length}
                renderCell={
                  grouped
                    ? (i) => {
                        const g = groups[i]
                        return (
                          <StackTile
                            key={g.name}
                            group={g}
                            rep={representative(g, settings.currency, pins)}
                            currency={settings.currency}
                            baseline={settings.baseline}
                            selected={selectedTile?.name === g.name}
                            onSelect={onSelect}
                          />
                        )
                      }
                    : (i) => {
                        const t = view[i]
                        return (
                          <CardTile
                            key={t.key}
                            tile={t}
                            currency={settings.currency}
                            baseline={settings.baseline}
                            selected={t.key === selectedKey}
                            onSelect={onSelect}
                          />
                        )
                      }
                }
              />
            ) : (
              <CardList
                tiles={view}
                currency={settings.currency}
                baseline={settings.baseline}
                selectedKey={selectedKey}
                onSelect={onSelect}
              />
            )}
          </div>
        </div>
        {/* Transparent click-catcher: clicking outside the drawer closes it and deselects the card
            (no dim, no blur). Removed the instant the card is deselected so the grid frees up. */}
        {selectedTile && <div className="absolute inset-0 z-40" onClick={() => setSelectedKey(null)} />}
        {/* The drawer slides in over the content instead of resizing the grid. */}
        {sidebarTile && (
          <div
            className={`absolute right-0 top-0 z-50 h-full transition-transform duration-300 ease-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <CardSidebar
              tile={sidebarTile}
              variants={sidebarVariants}
              currency={settings.currency}
              baseline={settings.baseline}
              flipped={drawerFlipped}
              onFlipChange={setDrawerFlipped}
              onSelect={onSelect}
              onClose={() => setSelectedKey(null)}
            />
          </div>
        )}
      </div>
    </main>
  )
}
