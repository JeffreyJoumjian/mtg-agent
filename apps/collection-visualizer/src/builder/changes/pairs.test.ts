import { test, expect } from "bun:test";
import { pairEntries } from "./pairs";
import type { ChangeEntry } from "@mtg/change-set.ts";

test("pairEntries joins an add that replaces a removed card into one swap row", () => {
  const entries: ChangeEntry[] = [
    { op: "remove", name: "Idol of Oblivion", why: "slow" },
    { op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Idol of Oblivion", why: "cheap draw" },
    { op: "remove", name: "Cultivate" },
    { op: "add", name: "Deathrite Shaman", section: "Ramp" },
    { op: "move", name: "Bojuka Bog", section: "Utility" },
    { op: "qty", name: "Forest", qty: 6 },
  ];
  expect(pairEntries(entries) as unknown).toEqual([
    { kind: "swap", out: entries[0], in: entries[1], why: "cheap draw" },
    { kind: "remove", out: entries[2] },
    { kind: "add", in: entries[3] },
    { kind: "move", entry: entries[4] },
    { kind: "qty", entry: entries[5] },
  ]);
});

test("pairEntries keeps an add whose `replaces` names a card that is not being removed as a plain add", () => {
  const entries: ChangeEntry[] = [{ op: "add", name: "A", section: "X", replaces: "Ghost" }];
  expect(pairEntries(entries) as unknown).toEqual([{ kind: "add", in: entries[0] }]);
});

test("pairEntries matches replaces case-insensitively and never pairs a remove twice", () => {
  const entries: ChangeEntry[] = [
    { op: "remove", name: "Sol Ring" },
    { op: "add", name: "A", section: "X", replaces: "sol ring" },
    { op: "add", name: "B", section: "X", replaces: "Sol Ring" },
  ];
  expect(pairEntries(entries) as unknown).toEqual([
    { kind: "swap", out: entries[0], in: entries[1], why: undefined },
    { kind: "add", in: entries[2] },
  ]);
});
