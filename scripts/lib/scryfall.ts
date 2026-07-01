/** Minimal, zero-dependency Scryfall API client (Bun-native `fetch`).
 *
 *  Scryfall requires a descriptive `User-Agent` and an `Accept` header, and asks callers
 *  to throttle to ~10 requests/second — omitting the headers is what makes a naive fetch
 *  return HTTP 403. This client sets them, throttles, retries on 429, and prefers the
 *  batch `/cards/collection` endpoint (75 cards per request) for decklist-sized lookups.
 *
 *  Docs: https://scryfall.com/docs/api  (see "Rate Limits and Good Citizenship")
 *
 *  This module does raw network only — caching lives in `card-cache.ts`. */

const API = "https://api.scryfall.com";
const HEADERS = {
  "User-Agent": "mtg-agent/1.0 (https://github.com/JeffreyJoumjian/mtg-agent)",
  Accept: "application/json",
} as const;

/** Scryfall asks for 50–100 ms between requests; we use 100 ms to be a good citizen. */
const THROTTLE_MS = 100;

/** The compact, agent-friendly shape we care about — a projection of Scryfall's card object. */
export interface CardSummary {
  name: string;
  manaCost: string;
  cmc: number;
  typeLine: string;
  oracleText: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
  colors: string[];
  /** Color identity — the colors that matter for Commander legality (`["R","U"]`). */
  colorIdentity: string[];
  set: string;
  setName: string;
  collectorNumber: string;
  rarity: string;
  /** USD price for this printing, or null if Scryfall has none. */
  usd: number | null;
  /** Commander legality: "legal" | "not_legal" | "banned" | "restricted". */
  commanderLegal: string;
  artist: string;
  scryfallUri: string;
  imageUri: string | null;
}

let lastRequestAt = 0;
async function throttle(): Promise<void> {
  const wait = THROTTLE_MS - (Date.now() - lastRequestAt);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
}

/** One throttled request with a single 429 retry (honoring Retry-After). Returns parsed JSON. */
async function request(path: string, init?: RequestInit): Promise<any> {
  await throttle();
  const res = await fetch(`${API}${path}`, { ...init, headers: { ...HEADERS, ...init?.headers } });

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after") ?? "1");
    await new Promise((r) => setTimeout(r, Math.max(1, retryAfter) * 1000));
    return request(path, init);
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    // Scryfall returns a structured error object with `details`.
    const details = body?.details ?? `HTTP ${res.status}`;
    throw new ScryfallError(details, res.status, body);
  }
  return body;
}

export class ScryfallError extends Error {
  constructor(message: string, readonly status: number, readonly body: unknown) {
    super(message);
    this.name = "ScryfallError";
  }
}

/** Project a raw Scryfall card object into our compact summary, handling double-faced cards. */
export function toSummary(card: any): CardSummary {
  const faces = Array.isArray(card.card_faces) ? card.card_faces : [];
  const oracleText =
    card.oracle_text ?? faces.map((f: any) => f.oracle_text).filter(Boolean).join("\n//\n");

  return {
    name: card.name,
    manaCost: card.mana_cost ?? faces.map((f: any) => f.mana_cost).filter(Boolean).join(" // "),
    cmc: card.cmc ?? 0,
    typeLine: card.type_line ?? faces.map((f: any) => f.type_line).filter(Boolean).join(" // "),
    oracleText: oracleText ?? "",
    power: card.power ?? faces[0]?.power,
    toughness: card.toughness ?? faces[0]?.toughness,
    loyalty: card.loyalty ?? faces[0]?.loyalty,
    colors: card.colors ?? faces.flatMap((f: any) => f.colors ?? []),
    colorIdentity: card.color_identity ?? [],
    set: card.set,
    setName: card.set_name,
    collectorNumber: card.collector_number,
    rarity: card.rarity,
    usd: card.prices?.usd != null ? Number(card.prices.usd) : null,
    commanderLegal: card.legalities?.commander ?? "unknown",
    artist: card.artist ?? "",
    scryfallUri: (card.scryfall_uri ?? "").split("?")[0],
    imageUri: card.image_uris?.normal ?? faces[0]?.image_uris?.normal ?? null,
  };
}

/** Look up a single card by exact name, falling back to fuzzy. Optionally pin a set code. */
export async function fetchCardByName(name: string, set?: string): Promise<CardSummary> {
  const q = new URLSearchParams({ exact: name });
  if (set) q.set("set", set);
  try {
    return toSummary(await request(`/cards/named?${q}`));
  } catch (err) {
    if (err instanceof ScryfallError && err.status === 404) {
      const fuzzy = new URLSearchParams({ fuzzy: name });
      if (set) fuzzy.set("set", set);
      return toSummary(await request(`/cards/named?${fuzzy}`));
    }
    throw err;
  }
}

export interface CollectionResult {
  found: CardSummary[];
  /** Names Scryfall could not match, echoed back so the caller can flag typos. */
  notFound: string[];
}

/** Batch-fetch many cards by name via `/cards/collection` (75 per request, chunked). */
export async function fetchCollection(names: string[]): Promise<CollectionResult> {
  const found: CardSummary[] = [];
  const notFound: string[] = [];

  for (let i = 0; i < names.length; i += 75) {
    const chunk = names.slice(i, i + 75);
    const body = await request(`/cards/collection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifiers: chunk.map((name) => ({ name })) }),
    });
    for (const card of body.data ?? []) found.push(toSummary(card));
    for (const nf of body.not_found ?? []) notFound.push(nf.name ?? JSON.stringify(nf));
  }
  return { found, notFound };
}

/** Run a Scryfall search query, following pagination up to `maxPages` (175 cards/page). */
export async function searchCards(query: string, maxPages = 4): Promise<CardSummary[]> {
  const results: CardSummary[] = [];
  let page = 1;
  let path: string | null = `/cards/search?${new URLSearchParams({ q: query, unique: "cards" })}`;

  while (path && page <= maxPages) {
    let body: any;
    try {
      body = await request(path);
    } catch (err) {
      // A search that matches nothing is a 404 on Scryfall — treat as empty, not an error.
      if (err instanceof ScryfallError && err.status === 404) break;
      throw err;
    }
    for (const card of body.data ?? []) results.push(toSummary(card));
    path = body.has_more ? new URL(body.next_page).pathname + new URL(body.next_page).search : null;
    page += 1;
  }
  return results;
}
