import type { PriceSet, Enriched, ColorSymbol } from './types'

const API = 'https://api.scryfall.com'
const HEADERS = {
  'User-Agent': 'mtg-agent-collection/1.0 (https://github.com/JeffreyJoumjian/mtg-agent)',
  Accept: 'application/json',
} as const
const THROTTLE_MS = 100

const num = (v: unknown): number | null => (v == null ? null : Number(v))

export function toPriceSet(card: any): PriceSet {
  const p = card?.prices ?? {}
  return { usd: num(p.usd), usdFoil: num(p.usd_foil), eur: num(p.eur), eurFoil: num(p.eur_foil) }
}

export function toEnriched(card: any): Enriched {
  const faces: any[] = Array.isArray(card?.card_faces) ? card.card_faces : []
  const joinFaces = (key: string) => faces.map((f) => f?.[key]).filter(Boolean).join(' // ')
  const face0 = faces[0] ?? {}

  // Genuinely two-sided cards (transform / MDFC / reversible) omit the top-level image and give each
  // face its own — that's exactly the set we can flip. Split/adventure/flip keep a single top-level
  // image, so they never match and stay single-faced.
  const twoSided = !card?.image_uris && faces.filter((f) => f?.image_uris).length >= 2

  const enriched: Enriched = {
    cmc: card?.cmc ?? 0,
    colors: (card?.colors ?? face0.colors ?? []) as ColorSymbol[],
    colorIdentity: (card?.color_identity ?? []) as ColorSymbol[],
    typeLine: card?.type_line ?? joinFaces('type_line'),
    oracleText: card?.oracle_text ?? faces.map((f) => f?.oracle_text).filter(Boolean).join('\n//\n'),
    manaCost: card?.mana_cost ?? joinFaces('mana_cost'),
    producedMana: Array.isArray(card?.produced_mana) ? card.produced_mana : [],
    imageSmall: card?.image_uris?.small ?? face0.image_uris?.small ?? null,
    imageNormal: card?.image_uris?.normal ?? face0.image_uris?.normal ?? null,
    imageLarge: card?.image_uris?.large ?? face0.image_uris?.large ?? null,
    imagePng: card?.image_uris?.png ?? face0.image_uris?.png ?? null,
  }

  if (!twoSided) return enriched

  return {
    ...enriched,
    faces: faces.map((f) => ({
      name: f?.name ?? '',
      typeLine: f?.type_line ?? '',
      oracleText: f?.oracle_text ?? '',
      manaCost: f?.mana_cost ?? '',
      imageSmall: f?.image_uris?.small ?? null,
      imageNormal: f?.image_uris?.normal ?? null,
      imageLarge: f?.image_uris?.large ?? null,
      imagePng: f?.image_uris?.png ?? null,
    })),
  }
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

let lastRequestAt = 0
async function throttle(): Promise<void> {
  const wait = THROTTLE_MS - (Date.now() - lastRequestAt)
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  lastRequestAt = Date.now()
}

async function get(path: string): Promise<any> {
  await throttle()
  const res = await fetch(`${API}${path}`, { headers: HEADERS })
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get('retry-after') ?? '1')
    await new Promise((r) => setTimeout(r, Math.max(1, retryAfter) * 1000))
    return get(path)
  }
  if (!res.ok) throw new Error(`Scryfall ${res.status}`)
  return res.json()
}

async function post(path: string, body: unknown): Promise<any> {
  await throttle()
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get('retry-after') ?? '1')
    await new Promise((r) => setTimeout(r, Math.max(1, retryAfter) * 1000))
    return post(path, body)
  }
  if (!res.ok) throw new Error(`Scryfall ${res.status}`)
  return res.json()
}

/** One set's code and the URL of its symbol. Several sets legitimately share one symbol file — every
 *  Secret Lair and Store Championship points at `star.svg`, and promo sets reuse their parent's — so
 *  the icon URL must be read from the API, never guessed from the code. */
export interface SetSymbol {
  code: string
  iconUri: string
}

/** Every set Scryfall knows about (~1000), with the URL of its symbol. Returned unpaginated. */
export async function fetchAllSets(): Promise<SetSymbol[]> {
  const body = await get('/sets')
  return (body.data ?? [])
    .filter((s: any) => s?.code && s?.icon_svg_uri)
    .map((s: any) => ({ code: s.code, iconUri: s.icon_svg_uri }))
}

/** Fetch one set symbol. These live on Scryfall's asset CDN rather than the API host, so they're
 *  outside the API rate limit and skip the throttle. */
export async function fetchSvg(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': HEADERS['User-Agent'], Accept: 'image/svg+xml' } })
  if (!res.ok) throw new Error(`Scryfall icon ${res.status}`)
  return res.text()
}

/** Batch-fetch raw Scryfall card objects by Scryfall ID (75/request), keyed by id. */
export async function fetchCardsByIds(ids: string[]): Promise<Record<string, any>> {
  const unique = [...new Set(ids.filter(Boolean))]
  const byId: Record<string, any> = {}
  for (const batch of chunk(unique, 75)) {
    const body = await post('/cards/collection', { identifiers: batch.map((id) => ({ id })) })
    for (const card of body.data ?? []) byId[card.id] = card
  }
  return byId
}
