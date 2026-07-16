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
import { Drawer, DrawerContent, DrawerTitle } from '~/components/ui/drawer'

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
  // The drawer's flip count, seeded from the tile's shown face on open, then owned independently.
  const [drawerFlips, setDrawerFlips] = useState(0)

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

  // vaul drives the slide animation; `sidebarTile` just keeps the drawer's content mounted through the
  // close animation so it doesn't blank out mid-slide.
  const [sidebarTile, setSidebarTile] = useState<Tile | null>(null)
  useEffect(() => {
    if (selectedTile) {
      setSidebarTile(selectedTile)
      return
    }
    const timer = setTimeout(() => setSidebarTile(null), 500)
    return () => clearTimeout(timer)
  }, [selectedTile])

  const sidebarVariants = sidebarTile ? data.tiles.filter((t) => t.name === sidebarTile.name) : []

  const select = (key: string, flipped: boolean) => {
    const tile = data.tiles.find((t) => t.key === key)
    if (!tile) return
    // Drop focus (e.g. the search box) before the drawer opens: vaul aria-hides the background, and
    // that warns if it lands on a focused element.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    setSelectedKey(key)
    // Seed the drawer on the same face the tile shows; a count keeps the flip spinning one way.
    setDrawerFlips(flipped ? 1 : 0)
    setPins((p) => ({ ...p, [tile.name]: key }))
  }

  // Clicking a grid/list card: the same card toggles the drawer shut; a different one switches to it.
  const onSelect = (key: string, flipped = false) => {
    if (key === selectedKey) {
      setSelectedKey(null)
      return
    }
    select(key, flipped)
  }

  // Picking a printing in the drawer's strip switches to it but never closes the drawer.
  const onSelectVariant = (key: string) => select(key, false)

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
      <div
        className="flex min-h-0 flex-1"
        onClick={(e) => {
          // Click-away close: only when the click misses a card (which switches/toggles itself). So
          // clicking another card loads it; empty space closes the non-modal drawer. The drawer is
          // portaled out of this subtree, so its own clicks never reach here.
          if (!selectedKey) return
          const target = e.target as HTMLElement
          if (target.closest('[data-card]')) return
          setSelectedKey(null)
        }}
      >
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
      </div>

      {/* A non-modal right drawer: it slides over the grid (portaled) without a dimming overlay, so the
          grid stays clickable — clicking another card switches it, clicking empty space closes it. */}
      <Drawer
        open={!!selectedTile}
        onOpenChange={(open) => {
          if (!open) setSelectedKey(null)
        }}
        direction="right"
        modal={false}
        dismissible={false}
      >
        {sidebarTile && (
          // Start below the toolbar (~61px) so its buttons stay visible/clickable beside the drawer.
          <DrawerContent data-drawer aria-describedby={undefined} className="top-[61px]">
            <DrawerTitle className="sr-only">{sidebarTile.name}</DrawerTitle>
            <CardSidebar
              tile={sidebarTile}
              variants={sidebarVariants}
              currency={settings.currency}
              baseline={settings.baseline}
              rotations={drawerFlips}
              onFlip={() => setDrawerFlips((n) => n + 1)}
              onSelect={onSelectVariant}
              onClose={() => setSelectedKey(null)}
            />
          </DrawerContent>
        )}
      </Drawer>
    </main>
  )
}
