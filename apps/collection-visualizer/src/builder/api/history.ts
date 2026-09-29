// Server functions for history: the timeline, and one stop with the entries that restore it.
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
import { pairRestore, undoneSince } from "../history/restore";
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
  listId: string;
  /** The list at this stop. */
  list: DeckList;
  /** The list before the change that produced this stop, when the stop has one. */
  before: DeckList | null;
  /** The list as it is now — what a restore changes. */
  current: DeckList;
  cards: Record<string, CardView>;
  /** Applying these to the current list yields this stop — what Restore stages. An add that undoes
   *  a recorded swap carries `replaces`, so the restore reads as swaps. */
  restoreEntries: ChangeEntry[];
  stats: DeckStats;
  currentStats: DeckStats;
}

export const getVersion = createServerFn({ method: "GET" })
  .validator((data: unknown) =>
    z
      .object({
        slug: slugSchema,
        listId: z.string().optional(),
        /** The snapshot file, or null for the list as it is now. */
        file: z.string().min(1).nullable(),
        /** The snapshot taken before this stop's change, to show what the change did. */
        changeFile: z.string().min(1).nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<VersionPayload> => {
    const deck = await readDeck(data.slug);

    // A JSON snapshot names its list; a legacy Markdown one is compared against main (or the first).
    const versions = await listVersions(data.slug);
    const ref = data.file ? versions.find((v) => v.file === data.file) : undefined;
    const { id, list: current } = pickList(deck, data.listId ?? ref?.listId ?? undefined);

    const list = data.file ? await readVersion(data.slug, data.file) : current;
    const before = data.changeFile ? await readVersion(data.slug, data.changeFile) : null;
    const history = data.file ? await readHistory(data.slug) : [];
    const restoreEntries = data.file
      ? pairRestore(diffLists(current, list), undoneSince(history, id, data.file, ref?.takenAt))
      : [];

    const { cards } = await resolveCards(
      [...listNames(list), ...listNames(current), ...(before ? listNames(before) : [])],
      deck.cards,
    );
    return {
      listId: id,
      list,
      before,
      current,
      cards,
      restoreEntries,
      stats: computeStats(list, cards, deck.cards),
      currentStats: computeStats(current, cards, deck.cards),
    };
  });
