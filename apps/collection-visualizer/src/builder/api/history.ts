// Server functions for history: the timeline and one version with the entries that restore it.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { diffLists, type ChangeEntry } from "@mtg/change-set.ts";
import { listNames, pickList, type DeckList } from "@mtg/deck-model.ts";
import {
  listVersions,
  readDeck,
  readHistory,
  readVersion,
  type HistoryEntry,
  type VersionRef,
} from "@mtg/deck-store.ts";
import { computeStats, type DeckStats } from "@mtg/deck-stats.ts";
import type { CardView } from "../model/cards";
import { resolveCards } from "../server/cards";

const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export interface HistoryPayload {
  entries: HistoryEntry[];
  versions: VersionRef[];
}

export const getHistory = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }): Promise<HistoryPayload> => {
    const [entries, versions] = await Promise.all([readHistory(data.slug), listVersions(data.slug)]);
    return { entries, versions };
  });

export interface VersionPayload {
  file: string;
  listId: string;
  list: DeckList;
  cards: Record<string, CardView>;
  /** Applying these to the current list yields this version — what Restore stages. */
  restoreEntries: ChangeEntry[];
  stats: DeckStats;
  currentStats: DeckStats;
}

export const getVersion = createServerFn({ method: "GET" })
  .validator((data: unknown) =>
    z.object({ slug: slugSchema, file: z.string().min(1), listId: z.string().optional() }).parse(data),
  )
  .handler(async ({ data }): Promise<VersionPayload> => {
    const deck = await readDeck(data.slug);
    const version = await readVersion(data.slug, data.file);

    // A JSON snapshot names its list; a legacy Markdown one is compared against main (or the first).
    const versions = await listVersions(data.slug);
    const ref = versions.find((v) => v.file === data.file);
    const { id, list: current } = pickList(deck, data.listId ?? ref?.listId ?? undefined);

    const { cards } = await resolveCards([...listNames(version), ...listNames(current)]);
    return {
      file: data.file,
      listId: id,
      list: version,
      cards,
      restoreEntries: diffLists(current, version),
      stats: computeStats(version, cards, deck.cards),
      currentStats: computeStats(current, cards, deck.cards),
    };
  });
