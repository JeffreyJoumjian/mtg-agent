import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAtomValue } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { getCollectionWithSets } from '~/server/collection'
import { setIconsAtom, settingsAtom } from '~/lib/state/store'
import { searchSets, setProgress, sortSets, type CollectionSort } from '~/lib/view/collections'
import { formatMoney } from '~/lib/format'
import { Input } from '~/components/ui/input'
import { SidebarTrigger } from '~/components/ui/sidebar'
import {
  SettingsButton,
  ThemeSetting,
  CurrencySetting,
  SetSortSetting,
  BaselineSetting,
} from '~/components/settings/settings-button'
import { SetCard } from '~/components/collection/SetCard'

export const Route = createFileRoute('/collections')({
  loader: () => getCollectionWithSets(),
  component: Collections,
})

function Collections() {
  const data = Route.useLoaderData()

  useHydrateAtoms([[setIconsAtom, data.setIcons]])
  const settings = useAtomValue(settingsAtom)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<CollectionSort>('completion')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const sets = useMemo(
    () => setProgress(data.tiles, data.setInfo, settings.currency),
    [data.tiles, data.setInfo, settings.currency],
  )
  const view = useMemo(() => sortSets(searchSets(sets, query), sort, sortDir), [sets, query, sort, sortDir])

  const totalValue = sets.reduce((n, s) => n + s.value, 0)
  const completed = sets.filter((s) => s.ratio === 1).length

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b p-3">
        <SidebarTrigger className="-ml-1" />
        <h1 className="mr-2 text-lg font-semibold">Sets</h1>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sets…"
          className="min-w-[12rem] max-w-sm flex-1"
        />
        {/* Same shared gear as the Library — theme/currency/baseline are global, so changing them
            here also changes the Library; the set sort is this view's own local state. */}
        <SettingsButton>
          <ThemeSetting />
          <CurrencySetting />
          <SetSortSetting value={sort} onChange={setSort} dir={sortDir} onDirChange={setSortDir} />
          <BaselineSetting />
        </SettingsButton>
      </div>

      <div className="flex items-center gap-4 px-3 py-2 text-sm">
        <span>
          <span className="font-semibold">{sets.length}</span>{' '}
          <span className="text-muted-foreground">sets</span>
        </span>
        <span>
          <span className="font-semibold">{completed}</span>{' '}
          <span className="text-muted-foreground">complete</span>
        </span>
        <span className="text-muted-foreground">
          Value: <span className="font-semibold text-foreground">{formatMoney(totalValue, settings.currency)}</span>
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        {view.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No sets match “{query}”.</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3">
            {view.map((s) => (
              <SetCard key={s.code} set={s} currency={settings.currency} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
