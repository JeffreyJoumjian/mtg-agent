import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { getCollection, refreshPrices, uploadCsv } from '~/server/collection'
import { emptyFilters, ownedTypes, priceBounds, cmcBounds, type FilterState } from '~/lib/view/filters'
import type { CardTile as Tile } from '~/lib/types'
import { computeView } from '~/lib/view/view'
import { applyTheme, type ViewSettings } from '~/lib/state/settings'
import { pinsAtom, setIconsAtom, settingsAtom } from '~/lib/state/store'
import { groupByName, representative } from '~/lib/card/stacks'
import { Toolbar } from '~/components/toolbar/Toolbar'
import { CardGrid } from '~/components/collection/CardGrid'
import { CardList } from '~/components/collection/CardList'
import { SummaryBar } from '~/components/collection/SummaryBar'
import { CardTile } from '~/components/card/CardTile'
import { StackTile } from '~/components/card/StackTile'
import { CardSidebar } from '~/components/card/CardSidebar'
import { Drawer, DrawerContent, DrawerTitle } from '~/components/ui/drawer'

export const Route = createFileRoute('/')({
  loader: () => getCollection(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()
  const router = useRouter()

  // Seed the set symbols from the loader during render, so they're on screen at first paint instead
  // of arriving a frame later via an effect.
  useHydrateAtoms([[setIconsAtom, data.setIcons]])
  const setSetIcons = useSetAtom(setIconsAtom)
  // ...but hydration only ever fires once, so a later loader result (uploading a CSV that adds sets,
  // or a refresh that vendors newly-released ones) still has to be pushed in.
  useEffect(() => {
    setSetIcons(data.setIcons)
  }, [data.setIcons, setSetIcons])

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>(emptyFilters())
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  // The drawer's flip count, seeded from the tile's shown face on open, then owned independently.
  const [drawerFlips, setDrawerFlips] = useState(0)

  // Both of these persist themselves to localStorage (see lib/store.ts).
  const [settings, setSettings] = useAtom(settingsAtom)
  const [pins, setPins] = useAtom(pinsAtom)

  // The theme is the one setting with an effect outside React — it toggles a class on <html>. Runs on
  // the stored value once it's read, too, not just on user changes.
  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  const updateSettings = (next: ViewSettings) => setSettings(next)

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

  // Slider bounds and the type chips come from the whole collection (not the filtered view), so they
  // don't shift as you filter.
  const priceRange = useMemo(() => priceBounds(data.tiles, settings.currency), [data.tiles, settings.currency])
  const cmcRange = useMemo(() => cmcBounds(data.tiles), [data.tiles])
  const types = useMemo(() => ownedTypes(data.tiles), [data.tiles])

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
  }

  // The drawer is otherwise independent of the grid: browsing printings and flipping faces in it
  // changes nothing outside until you pin. Pinning is per card NAME, so it survives toggling
  // grouping — grouped tiles read the printing, and either view reads the face.
  const drawerFace = drawerFlips % 2
  const pin = sidebarTile ? pins[sidebarTile.name] : undefined
  const pinned = !!sidebarTile && pin?.variantKey === sidebarTile.key && pin?.face === drawerFace

  const togglePin = () => {
    if (!sidebarTile) return

    const next = { ...pins }
    if (pinned) delete next[sidebarTile.name]
    else next[sidebarTile.name] = { variantKey: sidebarTile.key, face: drawerFace }

    setPins(next)
  }

  // Clicking a grid/list card: the same card toggles the drawer shut; a different one switches to it.
  const onSelect = (key: string, flipped = false) => {
    if (key === selectedKey) {
      setSelectedKey(null)
      return
    }
    select(key, flipped)
  }

  // Picking a printing in the drawer's strip switches the drawer to it (never closing it, and never
  // touching the grid — that's the pin button's job).
  const onSelectVariant = (key: string) => select(key, false)

  return (
    <main className="flex h-screen flex-col">
      <Toolbar
        query={query}
        onQuery={setQuery}
        sets={data.sets}
        types={types}
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
                            pin={pins[g.name]}
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
                            pin={pins[t.name]}
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
                pins={pins}
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
              pinned={pinned}
              pinnedKey={pin?.variantKey}
              onTogglePin={togglePin}
              onSelect={onSelectVariant}
              onClose={() => setSelectedKey(null)}
            />
          </DrawerContent>
        )}
      </Drawer>
    </main>
  )
}
