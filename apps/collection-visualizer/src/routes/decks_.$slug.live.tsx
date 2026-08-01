import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getLiveState } from '~/server/decks'
import type { LiveState } from '~/lib/deck/live-state'
import { SidebarTrigger } from '~/components/ui/sidebar'
import { LiveBoard } from '~/components/deck/LiveBoard'

/** Terminal-companion dashboard: read-only mirror of a deck-finalizer exercise running in a
 *  Claude Code terminal session. The terminal writes data/deck-live/<slug>.json; we poll it. */
export const Route = createFileRoute('/decks_/$slug/live')({
  component: LivePage,
})

const POLL_MS = 1500
/** After this long without a write, assume the terminal session moved on. */
const STALE_MS = 90_000

function LivePage() {
  const { slug } = Route.useParams()
  const [state, setState] = useState<LiveState | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let cancelled = false

    async function poll() {
      try {
        const next = await getLiveState({ data: { slug } })
        if (!cancelled) {
          setState(next)
          setNow(Date.now())
        }
      } catch {
        // transient — keep showing the last state and try again next tick
      }
    }

    void poll()
    const timer = setInterval(poll, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [slug])

  const stale = state !== null && now - state.updatedAt > STALE_MS

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex h-[61px] shrink-0 items-center gap-3 border-b px-4">
        <SidebarTrigger />
        <Link to="/decks/$slug" params={{ slug }} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {slug}
        </Link>
        <h1 className="font-semibold">Live session</h1>
        <span className={`ml-auto flex items-center gap-1.5 text-xs ${stale ? 'text-amber-500' : 'text-emerald-500'}`}>
          <span className={`h-2 w-2 rounded-full ${stale ? 'bg-amber-500' : 'animate-pulse bg-emerald-500'}`} />
          {state === null ? 'waiting for the terminal…' : stale ? 'stale — terminal quiet' : 'live'}
        </span>
      </header>

      {state === null ? (
        <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-muted-foreground">
          <div>
            <p>No live session for this deck yet.</p>
            <p className="mt-2">
              Start the finalizer in your Claude Code terminal — it writes to{' '}
              <code className="rounded bg-muted px-1">data/deck-live/{slug}.json</code> and this page picks it up.
            </p>
          </div>
        </div>
      ) : (
        <LiveBoard state={state} />
      )}
    </div>
  )
}
