import { createServerFn } from '@tanstack/react-start'
import { listDeckSlugs, readDeckFiles, createDeckFromTemplate } from '~/lib/server/deck-files'
import { readLiveState } from '~/lib/server/deck-live'
import { lookupCardsByNames } from '~/lib/server/card-name-cache'
import { parseDeckMd, parseStatusMd, summarize } from '~/lib/deck/parse'
import type { CardStatus, DeckSummary, ParsedDeck } from '~/lib/deck/parse'
import { slugify, isValidSlug } from '~/lib/deck/slug'
import { getDeckSession } from '~/server/deck-agent/manager'

export interface DeckDetail {
  summary: DeckSummary
  deck: ParsedDeck
  statuses: Record<string, CardStatus>
}

async function loadDetail(slug: string): Promise<DeckDetail | null> {
  const files = await readDeckFiles(slug)

  if (!files) return null
  const deck = parseDeckMd(files.deckMd)
  const statuses = parseStatusMd(files.statusMd)
  return { summary: summarize(slug, deck, statuses), deck, statuses }
}

export const listDecks = createServerFn({ method: 'GET' }).handler(async () => {
  const slugs = await listDeckSlugs()
  const details = await Promise.all(slugs.map(loadDetail))

  return details.filter((d): d is DeckDetail => d !== null).map((d) => d.summary)
})

export const getDeck = createServerFn({ method: 'GET' })
  .validator((data: unknown): { slug: string } => {
    const d = data as { slug?: unknown }
    if (typeof d?.slug !== 'string' || !isValidSlug(d.slug)) throw new Error('Invalid deck slug')
    return { slug: d.slug }
  })
  .handler(async ({ data }) => {
    return loadDetail(data.slug)
  })

export const createDeck = createServerFn({ method: 'POST' })
  .validator((data: unknown): { name: string } => {
    const d = data as { name?: unknown }
    if (typeof d?.name !== 'string' || d.name.trim().length === 0) throw new Error('Deck name is required')
    return { name: d.name.trim() }
  })
  .handler(async ({ data }) => {
    const slug = slugify(data.name)
    if (!isValidSlug(slug)) throw new Error(`"${data.name}" does not produce a usable folder name`)

    await createDeckFromTemplate(slug)
    return { slug }
  })

export const lookupCards = createServerFn({ method: 'POST' })
  .validator((data: unknown): { names: string[] } => {
    const d = data as { names?: unknown }
    if (!Array.isArray(d?.names) || d.names.some((n) => typeof n !== 'string')) throw new Error('names must be strings')
    if (d.names.length > 400) throw new Error('too many names')
    return { names: d.names as string[] }
  })
  .handler(async ({ data }) => {
    return lookupCardsByNames(data.names)
  })

export const getLiveState = createServerFn({ method: 'GET' })
  .validator((data: unknown): { slug: string } => {
    const d = data as { slug?: unknown }
    if (typeof d?.slug !== 'string' || !isValidSlug(d.slug)) throw new Error('Invalid deck slug')
    return { slug: d.slug }
  })
  .handler(async ({ data }) => {
    return readLiveState(data.slug)
  })

export const sendDeckMessage = createServerFn({ method: 'POST' })
  .validator((data: unknown): { slug: string; text: string } => {
    const d = data as { slug?: unknown; text?: unknown }
    if (typeof d?.slug !== 'string' || !isValidSlug(d.slug)) throw new Error('Invalid deck slug')
    if (typeof d?.text !== 'string' || d.text.trim().length === 0) throw new Error('Message text is required')
    return { slug: d.slug, text: d.text }
  })
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug)
    session.sendText(data.text)
  })

export const resolveDeckApproval = createServerFn({ method: 'POST' })
  .validator((data: unknown): { slug: string; requestId: string; decision: 'allow' | 'deny' } => {
    const d = data as { slug?: unknown; requestId?: unknown; decision?: unknown }
    if (typeof d?.slug !== 'string' || !isValidSlug(d.slug)) throw new Error('Invalid deck slug')
    if (typeof d?.requestId !== 'string') throw new Error('requestId is required')
    if (d?.decision !== 'allow' && d?.decision !== 'deny') throw new Error('decision must be allow or deny')
    return { slug: d.slug, requestId: d.requestId, decision: d.decision }
  })
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug)
    session.resolveApproval(data.requestId, data.decision)
  })
