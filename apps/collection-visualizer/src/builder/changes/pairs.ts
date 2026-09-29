/** Pure: fold a change set's entries into the rows the diff view draws — a remove and the add that
 *  `replaces` it become one swap row. Swaps come first, then everything else in entry order. */
import type { ChangeEntry } from "@mtg/change-set.ts";

export type AddEntry = Extract<ChangeEntry, { op: "add" }>;
export type RemoveEntry = Extract<ChangeEntry, { op: "remove" }>;
export type MoveEntry = Extract<ChangeEntry, { op: "move" }>;
export type QtyEntry = Extract<ChangeEntry, { op: "qty" }>;

export type PairedRow =
  | { kind: "swap"; out: RemoveEntry; in: AddEntry; why?: string }
  | { kind: "remove"; out: RemoveEntry }
  | { kind: "add"; in: AddEntry }
  | { kind: "move"; entry: MoveEntry }
  | { kind: "qty"; entry: QtyEntry };

const same = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

export function pairEntries<T extends ChangeEntry>(entries: T[]): PairedRow[] {
  const pairedAdd: Record<number, number> = {}; // remove index → add index
  const consumedAdd: Record<number, true> = {};
  const pairedRemove: Record<number, true> = {};

  entries.forEach((entry, addIndex) => {
    if (entry.op !== "add" || !entry.replaces) return;

    const removeIndex = entries.findIndex(
      (e, i) => e.op === "remove" && !pairedRemove[i] && same(e.name, entry.replaces ?? ""),
    );
    if (removeIndex === -1) return;

    pairedAdd[removeIndex] = addIndex;
    pairedRemove[removeIndex] = true;
    consumedAdd[addIndex] = true;
  });

  const swaps: PairedRow[] = [];
  const rest: PairedRow[] = [];
  entries.forEach((entry, i) => {
    if (entry.op === "remove") {
      const addIndex = pairedAdd[i];
      if (addIndex !== undefined) {
        const added = entries[addIndex] as AddEntry;
        swaps.push({ kind: "swap", out: entry as RemoveEntry, in: added, why: added.why ?? entry.why });
      } else {
        rest.push({ kind: "remove", out: entry as RemoveEntry });
      }
    } else if (entry.op === "add") {
      if (!consumedAdd[i]) rest.push({ kind: "add", in: entry as AddEntry });
    } else if (entry.op === "move") {
      rest.push({ kind: "move", entry: entry as MoveEntry });
    } else {
      rest.push({ kind: "qty", entry: entry as QtyEntry });
    }
  });
  return [...swaps, ...rest];
}

export interface PairedCounts {
  swaps: number;
  added: number;
  removed: number;
  moved: number;
  qty: number;
}

/** How many of each row a set draws — a swap counts once, not as an add and a remove. */
export function countPaired(entries: ChangeEntry[]): PairedCounts {
  const counts: PairedCounts = { swaps: 0, added: 0, removed: 0, moved: 0, qty: 0 };
  for (const row of pairEntries(entries)) {
    if (row.kind === "swap") counts.swaps += 1;
    else if (row.kind === "add") counts.added += 1;
    else if (row.kind === "remove") counts.removed += 1;
    else if (row.kind === "move") counts.moved += 1;
    else counts.qty += 1;
  }
  return counts;
}
