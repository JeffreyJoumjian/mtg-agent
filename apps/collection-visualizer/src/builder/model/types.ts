/** Builder types: re-exports of the root deck library plus the zod schemas the server functions and
 *  the agent tools validate against. Pure — importable from either side. */
import { z } from "zod";
import { CARD_STATUSES } from "@mtg/deck-model.ts";

export type { CardMeta, CardStatus, Deck, DeckList, ListEntry, ListSection, Printing } from "@mtg/deck-model.ts";
export type { ChangeEntry, ChangeSet, ApplyFailure } from "@mtg/change-set.ts";
export type { DeckStats, StatChange, Color } from "@mtg/deck-stats.ts";
export type { HistoryEntry, VersionRef, ApplyOutcome } from "@mtg/deck-store.ts";

export const changeEntrySchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal("add"),
    name: z.string().min(1),
    section: z.string().min(1),
    qty: z.number().int().positive().optional(),
    replaces: z.string().min(1).optional(),
    why: z.string().optional(),
  }),
  z.object({ op: z.literal("remove"), name: z.string().min(1), why: z.string().optional() }),
  z.object({ op: z.literal("move"), name: z.string().min(1), section: z.string().min(1) }),
  z.object({ op: z.literal("qty"), name: z.string().min(1), qty: z.number().int().positive() }),
]);

export const changeSetSchema = z.object({
  listId: z.string().min(1),
  label: z.string().min(1),
  rationale: z.string().optional(),
  author: z.enum(["user", "agent"]),
  entries: z.array(changeEntrySchema),
});

export const cardStatusSchema = z.enum(CARD_STATUSES as [string, ...string[]]);

export const cardMetaPatchSchema = z.object({
  status: cardStatusSchema.optional(),
  tags: z.array(z.string()).optional(),
  note: z.string().optional(),
  /** `null` clears a pinned printing; the store drops the key. */
  printing: z
    .object({ set: z.string().min(1), collectorNumber: z.string().min(1), foil: z.boolean().optional() })
    .nullable()
    .optional(),
});

/** One deck on the index page. */
export interface DeckIndexEntry {
  slug: string;
  name: string;
  commanders: string[];
  /** Art crop of the first commander, when resolved. */
  commanderArt: string | null;
  identity: string[];
  bracket: number | null;
  lists: { id: string; label: string; kind: "deck" | "pool"; size: number }[];
  lastChange: { label: string; at: string } | null;
  /** When the deck came to be: the oldest snapshot or history line, else the folder's birth time.
   *  Null when nothing is known. */
  created: string | null;
  /** Set when deck.json could not be parsed; the entry still lists so the user can see it. */
  error?: string;
}

/** A deck sitting in `decks/_archive/`, out of the index until it is restored. */
export interface ArchivedDeck {
  slug: string;
  name: string;
}
