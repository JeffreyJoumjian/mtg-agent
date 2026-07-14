import { useMemo, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'
import { getCollection, refreshPrices, uploadCsv } from '~/server/collection'
import { emptyFilters, priceBounds, cmcBounds, type FilterState } from '~/lib/filters'
import { computeView } from '~/lib/view'
import { defaultSettings, type ViewSettings } from '~/lib/settings'
import { Toolbar } from '~/components/Toolbar'
import { SummaryBar } from '~/components/SummaryBar'
import { CardGrid } from '~/components/CardGrid'
import { CardList } from '~/components/CardList'

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
        onSettings={setSettings}
        onRefresh={() => refreshMutation.mutate()}
        refreshing={refreshMutation.isPending}
        onUpload={(file) => uploadMutation.mutate(file)}
        pricesUpdatedAt={data.pricesUpdatedAt}
      />
      <div className="flex items-center justify-between px-3 py-2">
        <SummaryBar tiles={view} currency={settings.currency} baseline={settings.baseline} />
      </div>
      <div className="min-h-0 flex-1">
        {settings.view === 'grid' ? (
          <CardGrid tiles={view} currency={settings.currency} baseline={settings.baseline} maxPerRow={settings.maxPerRow} />
        ) : (
          <CardList tiles={view} currency={settings.currency} baseline={settings.baseline} />
        )}
      </div>
    </main>
  )
}
