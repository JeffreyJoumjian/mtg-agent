/** Pure helpers behind a restore: which recorded changes it unwinds, and how its entries pair up. */
import type { ChangeEntry } from "@mtg/change-set.ts";
import type { HistoryEntry } from "@mtg/deck-store.ts";

const key = (name: string): string => name.trim().toLowerCase();

/** The changes restoring `file` unwinds, oldest first: from the change that took that snapshot
 *  onward, or — for a snapshot no change accounts for — every change to the list since it was taken. */
export function undoneSince(
  history: HistoryEntry[],
  listId: string,
  file: string,
  takenAt: string | undefined,
): HistoryEntry[] {
  const mine = history.filter((e) => e.listId === listId).sort((a, b) => a.at.localeCompare(b.at));
  const i = mine.findIndex((e) => e.snapshot === `versions/${file}`);
  if (i !== -1) return mine.slice(i);
  return takenAt ? mine.filter((e) => e.at > takenAt) : [];
}

/**
 * Give the entries that restore a snapshot the `replaces` hints their history had, so the restore
 * reads as the swaps it undoes instead of a pile of removes and adds. A card swapped out since —
 * through one swap or several, A → B → C — comes back as a swap for whatever holds its slot now,
 * as long as that card is among the removes. Anything else is left as it is.
 */
export function pairRestore(restore: ChangeEntry[], undone: { entries: ChangeEntry[] }[]): ChangeEntry[] {
  // What took each card's slot, in the order it happened; a later swap of the same card wins.
  const successor: Record<string, string> = {};
  for (const change of undone) {
    for (const e of change.entries) {
      if (e.op === "add" && e.replaces) successor[key(e.replaces)] = e.name;
    }
  }

  const removed: Record<string, string> = {};
  for (const e of restore) {
    if (e.op === "remove") removed[key(e.name)] = e.name;
  }

  const taken: Record<string, true> = {};
  return restore.map((e) => {
    if (e.op !== "add") return e;

    const seen: Record<string, true> = {};
    let k = key(e.name);
    while (successor[k] && !seen[k]) {
      seen[k] = true;
      k = key(successor[k]);
      if (removed[k] && !taken[k]) {
        taken[k] = true;
        return { ...e, replaces: removed[k] };
      }
    }
    return e;
  });
}
