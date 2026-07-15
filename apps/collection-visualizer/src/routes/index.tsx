import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'
import { getCollection, refreshPrices, uploadCsv } from '~/server/collection'
import { emptyFilters, priceBounds, cmcBounds, type FilterState } from '~/lib/filters'
import { computeView } from '~/lib/view'
import { defaultSettings, loadSettings, saveSettings, type ViewSettings } from '~/lib/settings'
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

  // Load persisted settings once on mount. Kept out of the initializer so server and client both
  // start from the defaults (no hydration mismatch); we adopt the stored values right after.
  useEffect(() => {
    const stored = loadSettings()
    if (stored) {
      setSettings(stored)
    }
  }, [])

  // Persist on every user-driven change (not on the mount-time load above).
  const updateSettings = (next: ViewSettings) => {
    setSettings(next)
    saveSettings(next)
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
  const selectedVariants = selectedTile ? data.tiles.filter((t) => t.name === selectedTile.name) : []

  const onSelect = (key: string) => {
    const tile = data.tiles.find((t) => t.key === key)
    if (!tile) return
    setSelectedKey(key)
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
      <div className="flex min-h-0 flex-1">
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
        {selectedTile && (
          <CardSidebar
            tile={selectedTile}
            variants={selectedVariants}
            currency={settings.currency}
            baseline={settings.baseline}
            onSelect={onSelect}
            onClose={() => setSelectedKey(null)}
          />
        )}
      </div>
    </main>
  )
}
