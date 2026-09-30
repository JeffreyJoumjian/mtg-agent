/** The staged change set — pure reducers over the value the `stagedAtom` holds per deck. One list
 *  at a time; the user's clicks and the agent's proposal land in the same set. */
import type { ChangeEntry, ChangeSet } from "@mtg/change-set.ts";

export type StagedEntry = ChangeEntry & { author: "user" | "agent" };

export interface Staged {
  listId: string;
  /** Prefilled from an agent proposal; editable before Apply. */
  label: string;
  /** Set when an agent proposal is (part of) this set, so Apply can answer the waiting tool. */
  origin: { requestId: string; rationale?: string } | null;
  entries: StagedEntry[];
}

const sameName = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

export function addEntry(staged: Staged | null, listId: string, entry: ChangeEntry): Staged {
  const base: Staged = staged && staged.listId === listId ? staged : { listId, label: "", origin: null, entries: [] };
  const entries = [...base.entries];

  // A remove cancels a staged add of the same card, and an add cancels a staged remove.
  const opposite = entry.op === "remove" ? "add" : entry.op === "add" ? "remove" : null;
  if (opposite) {
    const i = entries.findIndex((e) => e.op === opposite && sameName(e.name, entry.name));
    if (i !== -1) {
      entries.splice(i, 1);
      return { ...base, entries };
    }
  }

  // A second move or quantity for the same card supersedes the first.
  if (entry.op === "move" || entry.op === "qty") {
    const i = entries.findIndex((e) => e.op === entry.op && sameName(e.name, entry.name));
    if (i !== -1) entries.splice(i, 1);
  }

  entries.push({ ...entry, author: "user" });
  return { ...base, entries };
}

export function removeEntryAt(staged: Staged | null, index: number): Staged | null {
  if (!staged) return null;
  return { ...staged, entries: staged.entries.filter((_, i) => i !== index) };
}

export function clearStaged(): null {
  return null;
}

export function mergeAgentProposal(
  staged: Staged | null,
  proposal: { requestId: string; changeSet: ChangeSet },
): Staged {
  const { requestId, changeSet } = proposal;
  const origin = { requestId, ...(changeSet.rationale ? { rationale: changeSet.rationale } : {}) };
  const agentEntries: StagedEntry[] = changeSet.entries.map((e) => ({ ...e, author: "agent" }));

  if (!staged || staged.listId !== changeSet.listId) {
    return { listId: changeSet.listId, label: changeSet.label, origin, entries: agentEntries };
  }
  return { ...staged, label: changeSet.label, origin, entries: [...staged.entries, ...agentEntries] };
}

/** A short label when the user did not write one: `remove A`, `add Skullclamp, remove Sol Ring`. */
export function autoLabel(entries: ChangeEntry[]): string {
  const text = entries.map((e) => `${e.op} ${e.name}`).join(", ");
  return text.length > 60 ? `${text.slice(0, 57)}…` : text;
}

/** What a preview depends on: the list and the entries. The label and rationale are not part of
 *  the numbers, so typing them must not refetch. */
export function previewKeyOf(cs: ChangeSet): string {
  return JSON.stringify({ listId: cs.listId, entries: cs.entries });
}

export function toChangeSet(staged: Staged, label: string): ChangeSet {
  const entries: ChangeEntry[] = staged.entries.map(({ author: _author, ...entry }) => entry);
  return {
    listId: staged.listId,
    label: label.trim() || staged.label || autoLabel(entries),
    rationale: staged.origin?.rationale,
    author: staged.origin ? "agent" : "user",
    entries,
  };
}
