/** Minimal, zero-dependency EDHREC client (Bun-native `fetch`).
 *
 *  EDHREC has no official API, but its site is served from pre-built JSON at
 *  `https://json.edhrec.com/pages/<kind>/<slug>.json` — commander pages, card pages, theme
 *  subpages and average decks all resolve there with no auth. The CDN answers a missing key
 *  with **403**, not 404, so a bad slug surfaces as "page not found" here.
 *
 *  EDHREC data is crowd statistics — inclusion rates and synergy scores across submitted
 *  decks. It is an *additional lens* for deck decisions, never source of truth: oracle text
 *  and rulings still come from Scryfall (`bun run card`) and the local Comprehensive Rules.
 *
 *  This module does raw network + pure projections only — caching lives in `edhrec-cache.ts`. */
import { frontFace, isBasicLand } from "./deck-research.ts";

const API = "https://json.edhrec.com/pages";
const SITE = "https://edhrec.com";
const HEADERS = {
  "User-Agent": "mtg-agent/1.0 (https://github.com/JeffreyJoumjian/mtg-agent)",
  Accept: "application/json",
} as const;

/** Be a polite guest on an unofficial endpoint — one request every 500 ms. */
const THROTTLE_MS = 500;

/** One card's crowd statistics on a commander page (or one commander's on a card page). */
export interface EdhrecCardStat {
  name: string;
  /** EDHREC synergy score: inclusion here minus baseline inclusion elsewhere (−1..1). */
  synergy: number;
  numDecks: number;
  potentialDecks: number;
  /** `numDecks / potentialDecks`, rounded to a whole percent. */
  inclusionPct: number;
}

export interface EdhrecCardList {
  header: string;
  tag: string;
  cards: EdhrecCardStat[];
}

export interface EdhrecTheme {
  name: string;
  slug: string;
  count: number;
}

export interface EdhrecCommanderPage {
  name: string;
  slug: string;
  numDecks: number;
  rank: number | null;
  url: string;
  themes: EdhrecTheme[];
  lists: EdhrecCardList[];
}

export interface EdhrecCardPage {
  name: string;
  slug: string;
  numDecks: number;
  potentialDecks: number;
  inclusionPct: number;
  /** Community "salt" score (0–4, higher = more resented), or null when unrated. */
  salt: number | null;
  url: string;
  topCommanders: EdhrecCardStat[];
}

/** Convert a card name to its EDHREC URL slug: front face only, accents folded to ASCII,
 *  punctuation dropped (so `100,000` stays one token), spaces hyphenated, name hyphens kept. */
export function slugify(name: string): string {
  return frontFace(name)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const pct = (num: number, of: number): number => (of > 0 ? Math.round((100 * num) / of) : 0);

function toStat(view: any): EdhrecCardStat {
  const numDecks = view.num_decks ?? 0;
  const potentialDecks = view.potential_decks ?? 0;
  return {
    name: view.name,
    synergy: view.synergy ?? 0,
    numDecks,
    potentialDecks,
    inclusionPct: pct(numDecks, potentialDecks),
  };
}

function toLists(raw: any): EdhrecCardList[] {
  const cardlists = raw?.container?.json_dict?.cardlists ?? [];
  return cardlists.map((cl: any) => ({
    header: cl.header,
    tag: cl.tag,
    cards: (cl.cardviews ?? []).map(toStat),
  }));
}

/** Project a raw commander page (or theme subpage) into the compact shape we cache and print. */
export function projectCommanderPage(raw: any): EdhrecCommanderPage {
  const card = raw?.container?.json_dict?.card ?? {};
  return {
    name: card.name ?? "",
    slug: card.sanitized ?? "",
    numDecks: card.num_decks ?? 0,
    rank: card.rank ?? null,
    url: `${SITE}/commanders/${card.sanitized ?? ""}`,
    themes: (raw?.tag_counts ?? []).map((t: any) => ({ name: t.value, slug: t.slug, count: t.count })),
    lists: toLists(raw),
  };
}

/** Project a raw card page: site-wide inclusion + salt, and the commanders that run it most. */
export function projectCardPage(raw: any): EdhrecCardPage {
  const card = raw?.container?.json_dict?.card ?? {};
  const numDecks = card.num_decks ?? 0;
  const potentialDecks = card.potential_decks ?? 0;
  const commanders = toLists(raw).find((l) => l.tag === "topcommanders");

  return {
    name: card.name ?? "",
    slug: card.sanitized ?? "",
    numDecks,
    potentialDecks,
    inclusionPct: pct(numDecks, potentialDecks),
    salt: card.salt ?? null,
    url: `${SITE}/cards/${card.sanitized ?? ""}`,
    topCommanders: commanders?.cards ?? [],
  };
}

export interface CrossRefResult {
  /** One entry per non-basic deck card; `stat` is null when EDHREC's page never lists it. */
  inDeck: { name: string; stat: (EdhrecCardStat & { list: string }) | null }[];
  /** Cards on the commander's page that the deck does NOT run, strongest synergy first. */
  ideas: (EdhrecCardStat & { list: string })[];
}

/** Compare a decklist against a commander page. Names match front-face-first (EDHREC lists
 *  double-faced cards under the full `Front // Back` name; decklists carry the front face).
 *  A card appearing in several page lists keeps its first (most headline) list's entry. */
export function crossRefDeck(page: EdhrecCommanderPage, deckNames: string[]): CrossRefResult {
  const statByFace: Record<string, EdhrecCardStat & { list: string }> = {};
  for (const list of page.lists) {
    for (const card of list.cards) {
      const face = frontFace(card.name).toLowerCase();
      if (!(face in statByFace)) statByFace[face] = { ...card, list: list.header };
    }
  }

  const inDeck: CrossRefResult["inDeck"] = [];
  const deckFaces: Record<string, true> = {};
  for (const name of deckNames) {
    const face = frontFace(name).toLowerCase();
    deckFaces[face] = true;
    if (isBasicLand(name) || frontFace(name) === frontFace(page.name)) continue;
    inDeck.push({ name, stat: statByFace[face] ?? null });
  }

  const ideas = Object.entries(statByFace)
    .filter(([face]) => !deckFaces[face])
    .map(([, stat]) => stat)
    .sort((a, b) => b.synergy - a.synergy);

  return { inDeck, ideas };
}

export class EdhrecError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "EdhrecError";
  }
}

let lastRequestAt = 0;
async function throttle(): Promise<void> {
  const wait = THROTTLE_MS - (Date.now() - lastRequestAt);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
}

/** Fetch one raw page JSON by path (e.g. `commanders/the-scarlet-witch`), throttled, retrying
 *  up to three times on transient 5xx. A 403 means the slug doesn't exist on EDHREC's CDN. */
export async function fetchPage(path: string, attempt = 0): Promise<any> {
  await throttle();
  const res = await fetch(`${API}/${path}.json`, { headers: HEADERS });

  if (res.status >= 500 && attempt < 3) {
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    return fetchPage(path, attempt + 1);
  }

  if (res.status === 403 || res.status === 404) {
    throw new EdhrecError(
      `EDHREC has no page at "${path}" — check the name/slug (front face only for DFCs)`,
      res.status,
    );
  }
  if (!res.ok) throw new EdhrecError(`EDHREC request failed: HTTP ${res.status} for ${path}`, res.status);

  return res.json();
}
