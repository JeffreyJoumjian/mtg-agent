/** Pure: fold a change set's entries into the rows the diff view draws — a remove and the add that
 *  `replaces` it become one swap row; everything else stays a single-sided row, in entry order. */
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

  const rows: PairedRow[] = [];
  entries.forEach((entry, i) => {
    if (entry.op === "remove") {
      const addIndex = pairedAdd[i];
      if (addIndex !== undefined) {
        const added = entries[addIndex] as AddEntry;
        rows.push({ kind: "swap", out: entry as RemoveEntry, in: added, why: added.why ?? entry.why });
      } else {
        rows.push({ kind: "remove", out: entry as RemoveEntry });
      }
    } else if (entry.op === "add") {
      if (!consumedAdd[i]) rows.push({ kind: "add", in: entry as AddEntry });
    } else if (entry.op === "move") {
      rows.push({ kind: "move", entry: entry as MoveEntry });
    } else {
      rows.push({ kind: "qty", entry: entry as QtyEntry });
    }
  });
  return rows;
}
