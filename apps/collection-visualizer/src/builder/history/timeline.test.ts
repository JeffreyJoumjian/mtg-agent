import { test, expect } from "bun:test";
import type { HistoryEntry, VersionRef } from "@mtg/deck-store.ts";
import { buildTimeline } from "./timeline";

const entry = (id: string, listId: string, at: string, snapshot: string): HistoryEntry =>
  ({
    id,
    listId,
    at,
    snapshot,
    label: `change ${id}`,
    author: "agent",
    entries: [],
    changes: [],
  }) as unknown as HistoryEntry;

const ref = (file: string, takenAt: string, extra: Partial<VersionRef> = {}): VersionRef => ({
  file,
  takenAt,
  listId: "main",
  label: file,
  legacy: false,
  restorable: true,
  ...extra,
});

test("buildTimeline shows each change as the state after it, with a starting point per list", () => {
  const entries = [
    entry("b", "main", "2026-09-03T00:00:00Z", "versions/3.json"),
    entry("a", "main", "2026-09-01T00:00:00Z", "versions/1.json"),
    entry("v", "v2", "2026-09-02T00:00:00Z", "versions/2.json"),
  ];
  const versions = [
    ref("3.json", "2026-09-03T00:00:00Z"),
    ref("2.json", "2026-09-02T00:00:00Z", { listId: "v2" }),
    ref("1.json", "2026-09-01T00:00:00Z"),
  ];
  const items = buildTimeline(entries, versions).map((i) => [i.key, i.kind, i.file, i.listId]);
  expect(items).toEqual([
    ["b", "change", null, "main"],
    ["v", "change", null, "v2"],
    ["start:v2", "start", "2.json", "v2"],
    ["a", "change", "3.json", "main"],
    ["start:main", "start", "1.json", "main"],
  ]);
});

test("buildTimeline keeps snapshots no change took as stops of their own", () => {
  const entries = [entry("a", "main", "2026-09-24T12:39:00Z", "versions/rebuild.json")];
  const versions = [
    ref("rebuild.json", "2026-09-24T12:39:00Z"),
    ref("migrated.json", "2026-09-23T11:23:00Z", { label: "migrated from markdown" }),
    ref("2026-08-01-b4-before-x.md", "2026-08-01T00:00:00Z", { legacy: true, listId: null, label: "b4-before-x" }),
  ];
  const items = buildTimeline(entries, versions);
  expect(items.map((i) => [i.key, i.kind, i.file, i.label])).toEqual([
    ["a", "change", null, "change a"],
    ["start:main", "start", "rebuild.json", "Starting point"],
    ["migrated.json", "snapshot", "migrated.json", "migrated from markdown"],
    ["2026-08-01-b4-before-x.md", "snapshot", "2026-08-01-b4-before-x.md", "b4-before-x"],
  ]);
  expect(items[3].legacy).toEqual(true);
});

test("buildTimeline with no changes lists the snapshots alone", () => {
  expect(buildTimeline([], [ref("migrated.json", "2026-09-23T11:23:00Z")]).map((i) => i.kind)).toEqual(["snapshot"]);
});
