/** Pure: how the decks page orders its tiles. */
import type { DeckIndexEntry } from "../model/types";

export type DeckSortBy = "edited" | "created" | "name";

export interface DeckSort {
  by: DeckSortBy;
  dir: "asc" | "desc";
}

export const DECK_SORT_OPTIONS: { value: DeckSortBy; label: string }[] = [
  { value: "edited", label: "Last edited" },
  { value: "created", label: "Created" },
  { value: "name", label: "Name" },
];

/** Decks without the date being sorted on go last whichever way the sort runs; ties break by name. */
export function sortDecks(entries: DeckIndexEntry[], sort: DeckSort): DeckIndexEntry[] {
  const byName = (a: DeckIndexEntry, b: DeckIndexEntry) => a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  const sign = sort.dir === "asc" ? 1 : -1;

  return [...entries].sort((a, b) => {
    if (sort.by === "name") return sign * byName(a, b);

    const da = sort.by === "edited" ? (a.lastChange?.at ?? null) : a.created;
    const db = sort.by === "edited" ? (b.lastChange?.at ?? null) : b.created;
    if (da === null && db === null) return byName(a, b);
    if (da === null) return 1;
    if (db === null) return -1;
    return sign * da.localeCompare(db) || byName(a, b);
  });
}
