/** Pure: the stops the history page lists, from the change log and the snapshot files. */
import type { HistoryEntry, VersionRef } from "@mtg/deck-store.ts";

export interface TimelineItem {
  /** Unique across the timeline: the change's id, `start:<list>`, or a bare snapshot's file. */
  key: string;
  label: string;
  at: string;
  listId: string | null;
  author: "user" | "agent" | null;
  /** The snapshot holding this stop's list, or null when it is the list as it is right now. */
  file: string | null;
  /** The change that produced this stop, when one is recorded. */
  entry: HistoryEntry | null;
  kind: "change" | "start" | "snapshot";
  legacy: boolean;
  restorable: boolean;
}

const RANK: Record<TimelineItem["kind"], number> = { change: 2, snapshot: 1, start: 0 };

const snapshotOf = (e: HistoryEntry): string => e.snapshot.replace(/^versions\//, "");

/**
 * One stop per recorded change, showing the list as it stood *after* that change. The store
 * snapshots a list before each change, so a change's after-state is the snapshot the next change of
 * the same list took — or the live list for the newest one. The snapshot before a list's first
 * change becomes its "Starting point", and snapshots no change accounts for (the migration,
 * terminal-era copies) are stops of their own. Newest first.
 */
export function buildTimeline(entries: HistoryEntry[], versions: VersionRef[]): TimelineItem[] {
  const claimed: Record<string, true> = {};
  const items: TimelineItem[] = [];

  const byList: Record<string, HistoryEntry[]> = {};
  for (const e of [...entries].sort((a, b) => a.at.localeCompare(b.at))) {
    (byList[e.listId] ??= []).push(e);
  }

  for (const [listId, changes] of Object.entries(byList)) {
    changes.forEach((e, i) => {
      const next = changes[i + 1];
      claimed[snapshotOf(e)] = true;
      items.push({
        key: e.id,
        label: e.label,
        at: e.at,
        listId,
        author: e.author,
        file: next ? snapshotOf(next) : null,
        entry: e,
        kind: "change",
        legacy: false,
        restorable: true,
      });
    });

    const first = changes[0];
    items.push({
      key: `start:${listId}`,
      label: "Starting point",
      at: first.at,
      listId,
      author: null,
      file: snapshotOf(first),
      entry: null,
      kind: "start",
      legacy: false,
      restorable: true,
    });
  }

  for (const v of versions) {
    if (claimed[v.file]) continue;

    items.push({
      key: v.file,
      label: v.label,
      at: v.takenAt,
      listId: v.listId,
      author: null,
      file: v.file,
      entry: null,
      kind: "snapshot",
      legacy: v.legacy,
      restorable: v.restorable,
    });
  }

  return items.sort((a, b) => b.at.localeCompare(a.at) || RANK[b.kind] - RANK[a.kind] || b.key.localeCompare(a.key));
}
