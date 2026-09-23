// Server only — see lib/server/README.md. The change-set handlers: preview (pure, no write) and
// apply (through the store). Plain functions with injectable card resolution so they test without
// Scryfall; `api/changes.ts` wraps them as server functions and nothing else, so no server-only
// import can leak into the client bundle.
import { applyChangeSet, type ApplyFailure, type ChangeEntry, type ChangeSet } from "@mtg/change-set.ts";
import { listNames, normalizeList, type DeckList } from "@mtg/deck-model.ts";
import { readDeck, type ApplyOutcome, type StoreOptions } from "@mtg/deck-store.ts";
import { computeStats, deckIdentity, diffStats, type DeckStats, type StatChange } from "@mtg/deck-stats.ts";
import type { CardView } from "../model/cards";
import { canonicalNames, resolveCards, type ResolvedCards } from "./cards";
import { allNames, applyChangeSetToDeck } from "./store";

export interface ChangeDeps {
  resolve: (names: string[]) => Promise<ResolvedCards>;
  canonical: (names: string[]) => Promise<{ canonical: Record<string, string>; unresolved: string[] }>;
}

export const realDeps: ChangeDeps = { resolve: resolveCards, canonical: canonicalNames };

export type PreviewResult =
  | {
      ok: true;
      list: DeckList;
      entries: ChangeEntry[];
      before: DeckStats;
      after: DeckStats;
      changes: StatChange[];
      cards: Record<string, CardView>;
    }
  | { ok: false; failures: ApplyFailure[] };

export type ApplyResultWire =
  (ApplyOutcome & { cards?: Record<string, CardView> }) | { ok: false; failures: ApplyFailure[] };

/** Rewrite every added name (and `replaces`) to Scryfall's spelling; an unknown add is a failure,
 *  because a card that cannot be resolved must never enter a list. */
async function canonicalise(
  entries: ChangeEntry[],
  deps: ChangeDeps,
): Promise<{ entries: ChangeEntry[]; failures: ApplyFailure[] }> {
  const wanted = entries.flatMap((e) => (e.op === "add" ? [e.name, ...(e.replaces ? [e.replaces] : [])] : []));
  if (wanted.length === 0) return { entries, failures: [] };

  const { canonical, unresolved } = await deps.canonical(wanted);
  const failures: ApplyFailure[] = [];
  const out = entries.map((e) => {
    if (e.op !== "add") return e;
    if (unresolved.includes(e.name)) {
      failures.push({ entry: e, reason: `Scryfall does not know "${e.name}" — check the spelling` });
      return e;
    }
    return {
      ...e,
      name: canonical[e.name] ?? e.name,
      ...(e.replaces ? { replaces: canonical[e.replaces] ?? e.replaces } : {}),
    };
  });
  return { entries: out, failures };
}

export async function preview(
  input: { slug: string; changeSet: ChangeSet },
  deps: ChangeDeps = realDeps,
  opts?: StoreOptions,
): Promise<PreviewResult> {
  const deck = await readDeck(input.slug, opts);
  const current = deck.lists[input.changeSet.listId];
  if (!current)
    return {
      ok: false,
      failures: [{ entry: { op: "remove", name: "" }, reason: `no list "${input.changeSet.listId}"` }],
    };

  const { entries, failures } = await canonicalise(input.changeSet.entries, deps);
  if (failures.length > 0) return { ok: false, failures };

  const applied = applyChangeSet(current, entries);
  if (!applied.ok) return applied;

  const next = normalizeList(applied.list);
  const { cards } = await deps.resolve([...listNames(current), ...listNames(next), ...allNames(deck)]);
  const identity = deckIdentity(deck, cards);
  const before = computeStats(current, cards, deck.cards, identity);
  const after = computeStats(next, cards, deck.cards, identity);
  return { ok: true, list: next, entries, before, after, changes: diffStats(before, after), cards };
}

export async function apply(
  input: { slug: string; changeSet: ChangeSet },
  deps: ChangeDeps = realDeps,
  opts?: StoreOptions,
): Promise<ApplyResultWire> {
  const deck = await readDeck(input.slug, opts);
  const current = deck.lists[input.changeSet.listId];
  if (!current)
    return {
      ok: false,
      failures: [{ entry: { op: "remove", name: "" }, reason: `no list "${input.changeSet.listId}"` }],
    };

  const { entries, failures } = await canonicalise(input.changeSet.entries, deps);
  if (failures.length > 0) return { ok: false, failures };

  const added = entries.flatMap((e) => (e.op === "add" ? [e.name] : []));
  const { cards } = await deps.resolve([...listNames(current), ...added]);
  const outcome = await applyChangeSetToDeck(input.slug, { ...input.changeSet, entries }, cards, opts);
  if (!outcome.ok) return outcome;

  return { ...outcome, cards };
}
