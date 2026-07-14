import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getCollection } from '~/server/collection'
import { emptyFilters, type FilterState } from '~/lib/filters'
import { computeView } from '~/lib/view'
import type { Currency } from '~/lib/types'
import type { SortKey } from '~/lib/sort'

export const Route = createFileRoute('/')({
  loader: () => getCollection(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()

  const [query, setQuery] = useState('')
  const [filters] = useState<FilterState>(emptyFilters())
  const [sortKey] = useState<SortKey>('name')
  const [sortDir] = useState<'asc' | 'desc'>('asc')
  const [currency] = useState<Currency>('usd')

  const view = useMemo(
    () => computeView(data.tiles, { query, filters, sortKey, sortDir, currency }),
    [data.tiles, query, filters, sortKey, sortDir, currency],
  )

  return (
    <main className="p-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search… (try o:&quot;draw a card&quot; or c:r t:instant)"
        className="w-full max-w-md rounded bg-neutral-800 px-3 py-2"
      />
      <p className="mt-4 text-neutral-400">
        {view.length} of {data.tiles.length} cards
      </p>
    </main>
  )
}
