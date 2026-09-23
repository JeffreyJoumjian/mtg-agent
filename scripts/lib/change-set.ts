/**
 * Change sets — the unit of every edit to a list, whether it comes from the user's clicks in the
 * app, the agent's `propose_changes` tool, or `bun run deck:edit` in the terminal.
 *
 * `applyChangeSet` is pure: it returns a new list or every precondition failure it found, and
 * never touches disk. `deck-store.ts` wraps it with the snapshot + history + write.
 */
import { findEntry, isBasicLand, type DeckList, type ListEntry } from "./deck-model.ts";

/** One edit. `replaces` on an `add` is a rendering hint that pairs it with a `remove` as a swap. */
export type ChangeEntry =
  | { op: "add"; name: string; section: string; qty?: number; replaces?: string; why?: string }
  | { op: "remove"; name: string; why?: string }
  | { op: "move"; name: string; section: string }
  | { op: "qty"; name: string; qty: number };

/** A labelled batch of edits against one list. */
export interface ChangeSet {
  listId: string;
  /** Becomes the snapshot label and the history line. */
  label: string;
  /** Markdown — the agent's (or the user's) reasoning. */
  rationale?: string;
  author: "user" | "agent";
  entries: ChangeEntry[];
}

export interface ApplyFailure {
  entry: ChangeEntry;
  reason: string;
}

export type ApplyResult = { ok: true; list: DeckList } | { ok: false; failures: ApplyFailure[] };

/** Deep copy so the caller's list is never mutated. */
function cloneList(list: DeckList): DeckList {
  return { ...list, sections: list.sections.map((s) => ({ name: s.name, cards: s.cards.map((c) => ({ ...c })) })) };
}

function sectionNamed(list: DeckList, name: string) {
  const wanted = name.trim().toLowerCase();
  return list.sections.find((s) => s.name.toLowerCase() === wanted) ?? null;
}

function ensureSection(list: DeckList, name: string) {
  const existing = sectionNamed(list, name);
  if (existing) return existing;

  const created = { name: name.trim(), cards: [] as ListEntry[] };
  list.sections.push(created);
  return created;
}

function removeEntry(list: DeckList, name: string): ListEntry | null {
  const wanted = name.trim().toLowerCase();

  for (const section of list.sections) {
    const i = section.cards.findIndex((c) => c.name.toLowerCase() === wanted);
    if (i === -1) continue;

    const [entry] = section.cards.splice(i, 1);
    return entry;
  }
  return null;
}

/**
 * Apply entries in order, each one seeing the list as modified by the ones before it.
 *
 * - `add`: creates the section if needed. A card already present fails — unless it is a basic
 *   land or the entry carries an explicit `qty`, in which case the quantity is incremented.
 * - `remove`: removes every copy. Fails if absent.
 * - `move`: fails if absent or already in that section.
 * - `qty`: sets the count. Fails if absent or below 1.
 *
 * All failures are collected; if there is any, nothing is returned.
 */
export function applyChangeSet(list: DeckList, entries: ChangeEntry[]): ApplyResult {
  const next = cloneList(list);
  const failures: ApplyFailure[] = [];

  for (const entry of entries) {
    const hit = findEntry(next, entry.name);

    if (entry.op === "add") {
      if (hit) {
        if (isBasicLand(entry.name) || entry.qty !== undefined) {
          hit.entry.qty += entry.qty ?? 1;
        } else {
          failures.push({ entry, reason: `${hit.entry.name} is already in the list (${hit.section})` });
        }
        continue;
      }

      const section = ensureSection(next, entry.section);
      section.cards.push({ name: entry.name.trim(), qty: entry.qty ?? 1 });
    } else if (entry.op === "remove") {
      if (!hit) {
        failures.push({ entry, reason: `${entry.name} is not in the list` });
        continue;
      }
      removeEntry(next, entry.name);
    } else if (entry.op === "move") {
      if (!hit) {
        failures.push({ entry, reason: `${entry.name} is not in the list` });
        continue;
      }
      if (hit.section.toLowerCase() === entry.section.trim().toLowerCase()) {
        failures.push({ entry, reason: `${hit.entry.name} is already in ${hit.section}` });
        continue;
      }

      const moved = removeEntry(next, entry.name);
      if (moved) ensureSection(next, entry.section).cards.push(moved);
    } else if (entry.op === "qty") {
      if (!hit) {
        failures.push({ entry, reason: `${entry.name} is not in the list` });
        continue;
      }
      if (!Number.isInteger(entry.qty) || entry.qty < 1) {
        failures.push({ entry, reason: `quantity must be a positive integer (got ${entry.qty})` });
        continue;
      }
      hit.entry.qty = entry.qty;
    }
  }

  if (failures.length > 0) return { ok: false, failures };
  return { ok: true, list: next };
}

interface Placement {
  name: string;
  section: string;
  qty: number;
}

function placements(list: DeckList): Record<string, Placement> {
  const out: Record<string, Placement> = {};

  for (const section of list.sections) {
    for (const card of section.cards) {
      out[card.name.toLowerCase()] = { name: card.name, section: section.name, qty: card.qty };
    }
  }
  return out;
}

/** The entries that turn `from` into `to`: removes first, then moves, quantity changes, adds. */
export function diffLists(from: DeckList, to: DeckList): ChangeEntry[] {
  const before = placements(from);
  const after = placements(to);
  const removes: ChangeEntry[] = [];
  const moves: ChangeEntry[] = [];
  const qtys: ChangeEntry[] = [];
  const adds: ChangeEntry[] = [];

  for (const [key, was] of Object.entries(before)) {
    const now = after[key];

    if (!now) {
      removes.push({ op: "remove", name: was.name });
      continue;
    }
    if (now.section.toLowerCase() !== was.section.toLowerCase()) moves.push({ op: "move", name: was.name, section: now.section });
    if (now.qty !== was.qty) qtys.push({ op: "qty", name: was.name, qty: now.qty });
  }

  for (const [key, now] of Object.entries(after)) {
    if (before[key]) continue;

    adds.push({ op: "add", name: now.name, section: now.section, ...(now.qty !== 1 ? { qty: now.qty } : {}) });
  }

  return [...removes, ...moves, ...qtys, ...adds];
}

export function summarizeEntries(entries: ChangeEntry[]): {
  added: number;
  removed: number;
  moved: number;
  requantified: number;
} {
  return {
    added: entries.filter((e) => e.op === "add").length,
    removed: entries.filter((e) => e.op === "remove").length,
    moved: entries.filter((e) => e.op === "move").length,
    requantified: entries.filter((e) => e.op === "qty").length,
  };
}
