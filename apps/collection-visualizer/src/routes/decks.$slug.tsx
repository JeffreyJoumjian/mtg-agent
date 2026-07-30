import { useEffect, useRef } from 'react'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useAtomValue } from 'jotai'
import { getDeck } from '~/server/decks'
import { useDeckChat } from '~/lib/deck/use-deck-chat'
import { settingsAtom } from '~/lib/state/store'
import { SidebarTrigger } from '~/components/ui/sidebar'
import { SettingsButton, DeckViewSetting, ThemeSetting } from '~/components/settings/settings-button'
import { DeckPanel } from '~/components/deck/DeckPanel'
import { ChatPane } from '~/components/deck/ChatPane'

export const Route = createFileRoute('/decks/$slug')({
  validateSearch: (search: Record<string, unknown>): { intro?: string } => {
    return typeof search.intro === 'string' ? { intro: search.intro } : {}
  },
  loader: async ({ params }) => {
    const detail = await getDeck({ data: { slug: params.slug } })
    if (!detail) throw redirect({ to: '/decks' })
    return detail
  },
  component: DeckPage,
})

function DeckPage() {
  const detail = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { intro } = Route.useSearch()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const chat = useDeckChat(slug)
  const settings = useAtomValue(settingsAtom)

  // A brand-new deck arrives with an ?intro= handoff from the creation form: send it as the
  // first message once we know the transcript really is empty, then drop it from the URL.
  const introSent = useRef(false)
  useEffect(() => {
    if (!intro || introSent.current || !chat.ready || chat.state.items.length > 0) return
    introSent.current = true
    chat.sendText(intro)
    void navigate({ search: {}, replace: true })
  }, [intro, chat.ready, chat.state.items.length])

  // Approved writes change DECK.md/STATUS.md — refresh the panel when a turn finishes.
  const wasBusy = useRef(false)
  useEffect(() => {
    if (wasBusy.current && !chat.state.busy) {
      void router.invalidate()
    }
    wasBusy.current = chat.state.busy
  }, [chat.state.busy])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex h-[61px] shrink-0 items-center gap-3 border-b px-4">
        <SidebarTrigger />
        <h1 className="truncate font-semibold">{detail.summary.name}</h1>
        {detail.summary.commander && (
          <span className="truncate text-sm text-muted-foreground">{detail.summary.commander}</span>
        )}
        <span className={`ml-auto text-sm ${detail.summary.total === 100 ? 'text-muted-foreground' : 'text-amber-500'}`}>
          {detail.summary.total}/100
        </span>
        <SettingsButton>
          <DeckViewSetting />
          <ThemeSetting />
        </SettingsButton>
      </header>

      {/* Deck panel LEFT, chat RIGHT. */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(400px,560px)]">
        <div className="hidden min-h-0 border-r lg:block">
          <DeckPanel deck={detail.deck} statuses={detail.statuses} tally={chat.state.tally} view={settings.deckView} />
        </div>
        <ChatPane chat={chat} />
      </div>
    </div>
  )
}
