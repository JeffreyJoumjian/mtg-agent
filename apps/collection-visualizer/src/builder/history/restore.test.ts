import { test, expect } from "bun:test";
import type { ChangeEntry } from "@mtg/change-set.ts";
import type { HistoryEntry } from "@mtg/deck-store.ts";
import { pairRestore, undoneSince } from "./restore";

const change = (entries: ChangeEntry[]) => ({ entries });

test("pairRestore pairs a card coming back with the card that replaced it", () => {
  const restore: ChangeEntry[] = [
    { op: "remove", name: "Skullclamp" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw" },
  ];
  const undone = [change([{ op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Idol of Oblivion" }])];
  expect(pairRestore(restore, undone)).toEqual([
    { op: "remove", name: "Skullclamp" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw", replaces: "Skullclamp" },
  ]);
});

test("pairRestore follows a chain of swaps to the card holding the slot now", () => {
  const restore: ChangeEntry[] = [
    { op: "remove", name: "Rhystic Study" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw" },
  ];
  const undone = [
    change([{ op: "add", name: "Skullclamp", section: "Card Draw", replaces: "idol of oblivion" }]),
    change([{ op: "add", name: "Rhystic Study", section: "Card Draw", replaces: "Skullclamp" }]),
  ];
  expect(pairRestore(restore, undone)).toEqual([
    { op: "remove", name: "Rhystic Study" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw", replaces: "Rhystic Study" },
  ]);
});

test("pairRestore leaves an add alone when its successor is not among the removes", () => {
  const restore: ChangeEntry[] = [
    { op: "remove", name: "Sol Ring" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw" },
  ];
  const undone = [
    change([{ op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Idol of Oblivion" }]),
    change([
      { op: "remove", name: "Skullclamp" },
      { op: "add", name: "Sol Ring", section: "Ramp" },
    ]),
  ];
  expect(pairRestore(restore, undone)).toEqual(restore);
});

test("pairRestore never pairs the same remove twice and survives a swap cycle", () => {
  const restore: ChangeEntry[] = [
    { op: "remove", name: "Skullclamp" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw" },
    { op: "add", name: "Phyrexian Arena", section: "Card Draw" },
  ];
  const undone = [
    change([{ op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Idol of Oblivion" }]),
    change([{ op: "add", name: "Idol of Oblivion", section: "Card Draw", replaces: "Skullclamp" }]),
    change([{ op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Phyrexian Arena" }]),
  ];
  expect(pairRestore(restore, undone)).toEqual([
    { op: "remove", name: "Skullclamp" },
    { op: "add", name: "Idol of Oblivion", section: "Card Draw", replaces: "Skullclamp" },
    { op: "add", name: "Phyrexian Arena", section: "Card Draw" },
  ]);
});

const entry = (id: string, listId: string, at: string, snapshot: string): HistoryEntry =>
  ({ id, listId, at, snapshot, label: id, author: "user", entries: [], changes: [] }) as unknown as HistoryEntry;

test("undoneSince starts at the change that took the snapshot and stays on its list", () => {
  const history = [
    entry("a", "main", "2026-09-01T00:00:00Z", "versions/1.json"),
    entry("v", "v2", "2026-09-02T00:00:00Z", "versions/2.json"),
    entry("b", "main", "2026-09-03T00:00:00Z", "versions/3.json"),
    entry("c", "main", "2026-09-04T00:00:00Z", "versions/4.json"),
  ];
  expect(undoneSince(history, "main", "3.json", undefined).map((e) => e.id)).toEqual(["b", "c"]);
});

test("undoneSince uses the snapshot's time when no change took it", () => {
  const history = [
    entry("a", "main", "2026-09-01T00:00:00Z", "versions/1.json"),
    entry("b", "main", "2026-09-03T00:00:00Z", "versions/3.json"),
  ];
  expect(undoneSince(history, "main", "migrated.json", "2026-09-02T00:00:00Z").map((e) => e.id)).toEqual(["b"]);
  expect(undoneSince(history, "main", "migrated.md", undefined)).toEqual([]);
});
