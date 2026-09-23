import { test, expect } from "bun:test";
import { applyChangeSet, diffLists, summarizeEntries } from "../scripts/lib/change-set.ts";
import type { DeckList } from "../scripts/lib/deck-model.ts";

const list = (): DeckList => ({
  label: "Main",
  kind: "deck",
  sections: [
    { name: "Commander", cards: [{ name: "Chatterfang, Squirrel General", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 7 }, { name: "Bojuka Bog", qty: 1 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }] },
  ],
});

const flat = (l: DeckList) => l.sections.flatMap((s) => s.cards.map((c) => `${s.name}|${c.name}|${c.qty}`)).sort();

test("add, remove, move, qty happy path", () => {
  const res = applyChangeSet(list(), [
    { op: "add", name: "Skullclamp", section: "Card Draw" },
    { op: "remove", name: "Sol Ring" },
    { op: "move", name: "Bojuka Bog", section: "Utility" },
    { op: "qty", name: "Forest", qty: 6 },
  ]);
  expect(res.ok).toEqual(true);
  if (res.ok) {
    expect(res.list.sections.map((s) => s.name)).toEqual(["Commander", "Lands", "Ramp", "Card Draw", "Utility"]);
    expect(res.list.sections[1].cards).toEqual([{ name: "Forest", qty: 6 }]);
    expect(res.list.sections[2].cards).toEqual([]);
    expect(res.list.sections[3].cards).toEqual([{ name: "Skullclamp", qty: 1 }]);
    expect(res.list.sections[4].cards).toEqual([{ name: "Bojuka Bog", qty: 1 }]);
  }
});

test("applyChangeSet does not mutate its input", () => {
  const before = list();
  applyChangeSet(before, [{ op: "remove", name: "Sol Ring" }]);
  expect(flat(before)).toEqual(flat(list()));
});

test("adding a basic land that is present bumps the quantity; adding a nonbasic that is present fails", () => {
  const ok = applyChangeSet(list(), [{ op: "add", name: "Forest", section: "Lands", qty: 2 }]);
  expect(ok.ok && ok.list.sections[1].cards[0].qty).toEqual(9);

  const one = applyChangeSet(list(), [{ op: "add", name: "Forest", section: "Lands" }]);
  expect(one.ok && one.list.sections[1].cards[0].qty).toEqual(8);

  const bad = applyChangeSet(list(), [{ op: "add", name: "Sol Ring", section: "Ramp" }]);
  expect(bad.ok).toEqual(false);
  if (!bad.ok) expect(bad.failures[0].reason).toContain("already");
});

test("adding a nonbasic that is present with an explicit qty increments it", () => {
  const res = applyChangeSet(list(), [{ op: "add", name: "Sol Ring", section: "Ramp", qty: 1 }]);
  expect(res.ok && res.list.sections[2].cards[0].qty).toEqual(2);
});

test("names match case-insensitively but the list keeps its own spelling", () => {
  const res = applyChangeSet(list(), [{ op: "move", name: "sol ring", section: "Artifacts" }]);
  expect(res.ok && res.list.sections[3].cards).toEqual([{ name: "Sol Ring", qty: 1 }]);
});

test("every failure is reported and nothing is applied", () => {
  const res = applyChangeSet(list(), [
    { op: "remove", name: "Nope" },
    { op: "move", name: "Sol Ring", section: "Ramp" },
    { op: "qty", name: "Forest", qty: 0 },
    { op: "qty", name: "Missing", qty: 2 },
  ]);
  expect(res.ok).toEqual(false);
  if (!res.ok) {
    expect(res.failures.map((f) => f.entry)).toEqual([
      { op: "remove", name: "Nope" },
      { op: "move", name: "Sol Ring", section: "Ramp" },
      { op: "qty", name: "Forest", qty: 0 },
      { op: "qty", name: "Missing", qty: 2 },
    ]);
    expect(res.failures[0].reason).toContain("not in the list");
  }
});

test("later entries see earlier ones: remove then add the same card is a move-like swap", () => {
  const res = applyChangeSet(list(), [
    { op: "remove", name: "Sol Ring" },
    { op: "add", name: "Sol Ring", section: "Artifacts" },
  ]);
  expect(res.ok && flat(res.list)).toContain("Artifacts|Sol Ring|1");
});

test("diffLists produces entries that apply back to the target", () => {
  const from = list();
  const to: DeckList = {
    ...list(),
    sections: [
      { name: "Commander", cards: [{ name: "Chatterfang, Squirrel General", qty: 1 }] },
      { name: "Lands", cards: [{ name: "Forest", qty: 6 }] },
      { name: "Utility", cards: [{ name: "Bojuka Bog", qty: 1 }] },
      { name: "Card Draw", cards: [{ name: "Skullclamp", qty: 1 }] },
    ],
  };
  const entries = diffLists(from, to);
  expect(summarizeEntries(entries)).toEqual({ added: 1, removed: 1, moved: 1, requantified: 1 });

  const res = applyChangeSet(from, entries);
  expect(res.ok).toEqual(true);
  if (res.ok) expect(flat(res.list)).toEqual(flat(to));
});

test("diffLists of identical lists is empty", () => {
  expect(diffLists(list(), list())).toEqual([]);
});
