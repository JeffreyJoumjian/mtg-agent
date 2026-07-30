import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router'
import { listDecks } from '~/server/decks'
import { SidebarTrigger } from '~/components/ui/sidebar'
import { DeckSummaryCard } from '~/components/deck/DeckSummaryCard'
import { NewDeckForm } from '~/components/deck/NewDeckForm'

export const Route = createFileRoute('/decks')({
  loader: () => listDecks(),
  component: Decks,
})

function Decks() {
  const summaries = Route.useLoaderData()
  // When a child ($slug) route is active, render it instead of the list.
  const hasChild = useMatches({ select: (ms) => ms.some((m) => m.routeId === '/decks/$slug') })

  if (hasChild) return <Outlet />

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex h-[61px] shrink-0 items-center gap-3 border-b px-4">
        <SidebarTrigger />
        <h1 className="font-semibold">Decks</h1>
        <span className="text-sm text-muted-foreground">{summaries.length} deck{summaries.length === 1 ? '' : 's'}</span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {summaries.map((summary) => (
            <DeckSummaryCard key={summary.slug} summary={summary} />
          ))}
          <NewDeckForm />
        </div>
      </div>
    </div>
  )
}
