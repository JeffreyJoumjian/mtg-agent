// Server only — see lib/server/README.md. Card data for the builder comes from the repo-root card
// cache (`data/card-cache.json`), the same one `bun run card` and the agent use. Nothing here ever
// persists a negative lookup, and an unreachable Scryfall degrades to stale cache entries.
import { deckName, getPrintings, resolveNames } from "@mtg/card-cache.ts";
import type { CardMeta, Printing } from "@mtg/deck-model.ts";
import { fetchPrintings, searchCards as scryfallSearch } from "@mtg/scryfall.ts";
import { applyPinnedPrintings, toCardView, type CardView } from "../model/cards";

export interface ResolvedCards {
  /** Keyed by the name exactly as the deck spells it. */
  cards: Record<string, CardView>;
  unresolved: string[];
  /** Set when Scryfall could not be reached and cached data (possibly stale) was served instead. */
  degraded?: string;
}

/** The data for pinned printings, keyed like `printingKey`. Whatever could not be fetched is
 *  absent, and that card simply shows its default printing. */
export async function resolvePrintings(refs: Printing[]): Promise<Record<string, CardView>> {
  if (refs.length === 0) return {};

  try {
    const found = await getPrintings(refs);
    const out: Record<string, CardView> = {};
    for (const [k, summary] of Object.entries(found)) out[k] = toCardView(summary);
    return out;
  } catch (err) {
    console.error("[builder] printing resolution failed:", err instanceof Error ? err.message : String(err));
    return {};
  }
}

/** Resolve names to views. With the deck's card meta, a card whose meta pins a printing comes back
 *  wearing that printing, so every view of the deck agrees on what the card looks like. */
export async function resolveCards(names: string[], meta?: Record<string, CardMeta>): Promise<ResolvedCards> {
  const unique = [...new Set(names.filter(Boolean))];
  if (unique.length === 0) return { cards: {}, unresolved: [] };

  try {
    const { found, unresolved, degraded } = await resolveNames(unique);
    let cards: Record<string, CardView> = {};
    for (const [name, summary] of Object.entries(found)) cards[name] = toCardView(summary);

    if (meta) {
      const pins = unique.flatMap((name) => {
        const pin = meta[name]?.printing;
        return pin ? [pin] : [];
      });
      const printings = await resolvePrintings(pins);
      cards = applyPinnedPrintings(cards, meta, printings);
    }
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

/** Every printing of one card, for the printing picker in the card popover. */
export async function printingsFor(name: string): Promise<CardView[]> {
  const printings = await fetchPrintings(name);
  return printings.map(toCardView);
}
