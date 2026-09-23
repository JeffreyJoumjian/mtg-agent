// Server only — see lib/server/README.md. Card data for the builder comes from the repo-root card
// cache (`data/card-cache.json`), the same one `bun run card` and the agent use. Nothing here ever
// persists a negative lookup, and an unreachable Scryfall degrades to stale cache entries.
import { deckName, resolveNames } from "@mtg/card-cache.ts";
import { searchCards as scryfallSearch } from "@mtg/scryfall.ts";
import { toCardView, type CardView } from "../model/cards";

export interface ResolvedCards {
  /** Keyed by the name exactly as the deck spells it. */
  cards: Record<string, CardView>;
  unresolved: string[];
  /** Set when Scryfall could not be reached and cached data (possibly stale) was served instead. */
  degraded?: string;
}

export async function resolveCards(names: string[]): Promise<ResolvedCards> {
  const unique = [...new Set(names.filter(Boolean))];
  if (unique.length === 0) return { cards: {}, unresolved: [] };

  try {
    const { found, unresolved, degraded } = await resolveNames(unique);
    const cards: Record<string, CardView> = {};
    for (const [name, summary] of Object.entries(found)) cards[name] = toCardView(summary);
    return { cards, unresolved, ...(degraded ? { degraded } : {}) };
  } catch (err) {
    // Something other than the network (a corrupt cache file, say): the deck still renders names.
    const message = err instanceof Error ? err.message : String(err);
    console.error("[builder] card resolution failed:", message);
    return { cards: {}, unresolved: unique, degraded: `card data unavailable: ${message}` };
  }
}

/** The canonical deck spelling for a name the user typed or the agent proposed, if it resolves. */
export async function canonicalNames(
  names: string[],
): Promise<{ canonical: Record<string, string>; unresolved: string[] }> {
  const unique = [...new Set(names.filter(Boolean))];
  if (unique.length === 0) return { canonical: {}, unresolved: [] };

  const { found, unresolved } = await resolveNames(unique);
  const canonical: Record<string, string> = {};
  for (const [name, summary] of Object.entries(found)) canonical[name] = deckName(summary);
  return { canonical, unresolved };
}

/** Scryfall search, two pages at most (350 cards) — enough for the add-a-card box. */
export async function searchCards(query: string): Promise<CardView[]> {
  const results = await scryfallSearch(query, 2);
  return results.map(toCardView);
}
