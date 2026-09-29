// Server only — see lib/server/README.md. Thin wrappers over the repo-root deck store that add
// card resolution and the own-write bookkeeping the watcher needs. Every write to a deck folder
// goes through here or through the root library; the browser agent never writes deck.json.
import {
  MAIN_LIST,
  commandersOf,
  emptyDeck,
  listNames,
  listSize,
  pickList,
  type Deck,
  type DeckList,
} from "@mtg/deck-model.ts";
import { stat } from "node:fs/promises";
import {
  ARCHIVE_DIR,
  applyToDeck,
  archiveDeck,
  createDeck,
  deckDir,
  listArchivedSlugs,
  listDeckSlugs,
  listVersions,
  readDeck,
  restoreDeck,
  readHistory,
  renameCard,
  setCardMeta,
  writeDeck,
  DeckFileError,
  type ApplyOutcome,
  type CardMetaPatch,
  type HistoryEntry,
  type StoreOptions,
} from "@mtg/deck-store.ts";
import { identityOf, type CardInfo } from "@mtg/deck-stats.ts";
import type { CardMeta } from "@mtg/deck-model.ts";
import type { ChangeSet } from "@mtg/change-set.ts";
import type { ArchivedDeck, DeckIndexEntry } from "../model/types";
import { applyPinnedPrintings, cardImage, type CardView } from "../model/cards";
import { resolveCards, resolvePrintings } from "./cards";
import { noteOwnWrite } from "./watcher";

export interface LoadedDeck {
  slug: string;
  deck: Deck;
  cards: Record<string, CardView>;
  unresolved: string[];
  /** Set when card data came from a stale cache because Scryfall was unreachable. */
  cardDataError?: string;
  error?: string;
}

/** Every write the store makes is announced to the watcher first, so the app's own writes are
 *  never reported back to it as outside changes. */
function withOwnWrites(opts?: StoreOptions): StoreOptions {
  return { ...opts, onBeforeWrite: (path, text) => noteOwnWrite(path, text) };
}

/** Every name in every list of a deck, once. */
export function allNames(deck: Deck): string[] {
  const seen: Record<string, true> = {};
  const names: string[] = [];
  for (const list of Object.values(deck.lists)) {
    for (const name of listNames(list)) {
      if (seen[name]) continue;

      seen[name] = true;
      names.push(name);
    }
  }
  return names;
}

/** A deck with its cards resolved. Never throws for a corrupt deck.json: `error` is set and the
 *  deck is an empty shell so the index can still show the entry. */
export async function loadDeck(slug: string): Promise<LoadedDeck> {
  let deck: Deck;
  try {
    deck = await readDeck(slug);
  } catch (err) {
    const message =
      err instanceof DeckFileError ? err.errors.join("; ") : err instanceof Error ? err.message : String(err);
    return {
      slug,
      deck: { schema: 1, name: slug, format: "commander", lists: {}, cards: {} },
      cards: {},
      unresolved: [],
      error: message,
    };
  }

  const { cards, unresolved, degraded } = await resolveCards(allNames(deck), deck.cards);
  return { slug, deck, cards, unresolved, ...(degraded ? { cardDataError: degraded } : {}) };
}

/** The `CardInfo` map the stats engine wants, from a resolved card map. */
export function infoMap(cards: Record<string, CardView>): Record<string, CardInfo | undefined> {
  return cards;
}

/** When a deck came to be: the oldest thing on record — a snapshot, a history line — or, for a
 *  deck with no record yet, its folder's birth time. Null only when nothing is known. */
async function createdAt(slug: string, history: HistoryEntry[], opts?: StoreOptions): Promise<string | null> {
  const versions = await listVersions(slug, opts);
  const dates = [...versions.map((v) => v.takenAt), ...history.map((h) => h.at)];
  try {
    const st = await stat(deckDir(slug, opts));
    // Some filesystems report no birth time (the epoch); ignore anything implausible.
    if (st.birthtimeMs > Date.UTC(2000, 0, 1)) dates.push(st.birthtime.toISOString());
  } catch {
    // A folder that vanished mid-scan: no date.
  }
  return dates.length > 0 ? dates.sort()[0] : null;
}

export async function loadDeckIndex(): Promise<DeckIndexEntry[]> {
  const slugs = await listDeckSlugs();
  const loaded: { slug: string; deck: Deck | null; error?: string }[] = [];
  for (const slug of slugs) {
    try {
      loaded.push({ slug, deck: await readDeck(slug) });
    } catch (err) {
      loaded.push({ slug, deck: null, error: err instanceof DeckFileError ? err.errors.join("; ") : String(err) });
    }
  }

  // One batched lookup for every commander on the page, and one for the printings they pin.
  const commanderNames = loaded.flatMap((l) => (l.deck ? commandersOf(pickList(l.deck).list) : []));
  const pins = loaded.flatMap((l) =>
    l.deck
      ? commandersOf(pickList(l.deck).list).flatMap((name) => {
          const pin = l.deck?.cards[name]?.printing;
          return pin ? [pin] : [];
        })
      : [],
  );
  const [{ cards }, printings] = await Promise.all([resolveCards(commanderNames), resolvePrintings(pins)]);

  const entries: DeckIndexEntry[] = [];
  for (const { slug, deck, error } of loaded) {
    if (!deck) {
      const created = await createdAt(slug, []);
      entries.push({
        slug,
        name: slug,
        commanders: [],
        commanderArt: null,
        identity: [],
        bracket: null,
        lists: [],
        lastChange: null,
        created,
        error,
      });
      continue;
    }

    const primary = pickList(deck).list;
    const commanders = commandersOf(primary);
    const lead = commanders[0] ?? "";
    const leadView = cards[lead];
    const art = leadView ? applyPinnedPrintings({ [lead]: leadView }, deck.cards, printings)[lead] : undefined;
    const history = await readHistory(slug);
    const created = await createdAt(slug, history);
    entries.push({
      slug,
      name: deck.name,
      commanders,
      commanderArt: cardImage(art, "artCrop"),
      identity: identityOf(primary, cards),
      bracket: primary.bracket ?? null,
      lists: Object.entries(deck.lists).map(([id, list]) => ({
        id,
        label: list.label,
        kind: list.kind,
        size: listSize(list),
      })),
      lastChange: history[0] ? { label: history[0].label, at: history[0].at } : null,
      created,
    });
  }
  return entries;
}

/** The decks in `decks/_archive/`, by name; a folder whose deck.json will not parse lists by slug. */
export async function loadArchivedDecks(opts?: StoreOptions): Promise<ArchivedDeck[]> {
  const slugs = await listArchivedSlugs(opts);
  const inArchive: StoreOptions = { ...opts, decksDir: deckDir(ARCHIVE_DIR, opts) };
  const out: ArchivedDeck[] = [];
  for (const slug of slugs) {
    let name = slug;
    try {
      const deck = await readDeck(slug, inArchive);
      name = deck.name;
    } catch {
      // Listed by slug; the folder still comes back whole on restore.
    }
    out.push({ slug, name });
  }
  return out;
}

export async function archive(slug: string, opts?: StoreOptions): Promise<void> {
  await archiveDeck(slug, opts);
}

export async function unarchive(slug: string, opts?: StoreOptions): Promise<void> {
  await restoreDeck(slug, opts);
}

export async function applyChangeSetToDeck(
  slug: string,
  cs: ChangeSet,
  cards: Record<string, CardView>,
  opts?: StoreOptions,
): Promise<ApplyOutcome> {
  return applyToDeck(slug, cs, cards, withOwnWrites(opts));
}

export async function updateCardMeta(
  slug: string,
  updates: { name: string; meta: CardMetaPatch }[],
  opts?: StoreOptions,
): Promise<Deck> {
  return setCardMeta(slug, updates, withOwnWrites(opts));
}

export async function renameDeckCard(slug: string, from: string, to: string, opts?: StoreOptions): Promise<Deck> {
  return renameCard(slug, from, to, withOwnWrites(opts));
}

export async function createNewDeck(slug: string, name: string, opts?: StoreOptions): Promise<Deck> {
  return createDeck(slug, name, withOwnWrites(opts));
}

/** Add an empty list. A pool gets one section named after itself; a deck gets the default skeleton. */
export async function addList(
  slug: string,
  id: string,
  label: string,
  kind: "deck" | "pool",
  opts?: StoreOptions,
): Promise<Deck> {
  const deck = await readDeck(slug, opts);
  if (deck.lists[id]) throw new Error(`list "${id}" already exists`);

  const sections = kind === "pool" ? [{ name: label, cards: [] }] : emptyDeck("x").lists[MAIN_LIST].sections;
  const updated: Deck = { ...deck, lists: { ...deck.lists, [id]: { label, kind, sections } } };
  await writeDeck(slug, updated, withOwnWrites(opts));
  return updated;
}

export type { HistoryEntry, DeckList };
