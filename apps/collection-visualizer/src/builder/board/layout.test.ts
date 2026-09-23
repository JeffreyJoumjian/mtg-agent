import { test, expect } from "bun:test";
import { layoutSections, bucketByMv } from "./layout";
import type { DeckList } from "@mtg/deck-model.ts";
import type { Staged } from "../state/staged";

const list = (): DeckList => ({
  label: "Main",
  kind: "deck",
  sections: [
    { name: "Commander", cards: [{ name: "Zed", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 7 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }] },
  ],
});

const staged: Staged = {
  listId: "main",
  label: "",
  origin: null,
  entries: [
    { op: "add", name: "Skullclamp", section: "Card Draw", author: "user" },
    { op: "remove", name: "Sol Ring", author: "user" },
    { op: "move", name: "Forest", section: "Basics", author: "user" },
  ],
};

test("current mode renders the list as on disk, every card in state current", () => {
  const out = layoutSections(list(), staged, "current");
  expect(out.map((s) => s.name)).toEqual(["Commander", "Lands", "Ramp"]);
  expect(out.flatMap((s) => s.cards.map((c) => c.state))).toEqual(["current", "current", "current"]);
});

test("after mode shows added cards in their new section, removed cards dimmed in their old spot, moves in the new column", () => {
  const out = layoutSections(list(), staged, "after");
  const bySection = Object.fromEntries(out.map((s) => [s.name, s.cards.map((c) => `${c.name}:${c.state}`)]));
  expect(bySection["Ramp"]).toEqual(["Sol Ring:removed"]);
  expect(bySection["Card Draw"]).toEqual(["Skullclamp:added"]);
  expect(bySection["Basics"]).toEqual(["Forest:moved"]);
  expect(bySection["Lands"]).toEqual([]);
});

test("after mode with nothing staged equals current mode", () => {
  expect(layoutSections(list(), null, "after")).toEqual(layoutSections(list(), null, "current"));
});

test("a staged qty change shows the new quantity in after mode", () => {
  const s: Staged = {
    listId: "main",
    label: "",
    origin: null,
    entries: [{ op: "qty", name: "Forest", qty: 6, author: "user" }],
  };
  const lands = layoutSections(list(), s, "after").find((x) => x.name === "Lands");
  expect(lands?.cards[0]).toMatchObject({ name: "Forest", qty: 6, state: "changed" });
});

test("bucketByMv groups nonland cards by mana value with a 7+ bucket and lands apart", () => {
  const cards = {
    Zed: { cmc: 2, typeLine: "Creature" },
    Forest: { cmc: 0, typeLine: "Basic Land — Forest" },
    "Sol Ring": { cmc: 1, typeLine: "Artifact" },
    Big: { cmc: 9, typeLine: "Sorcery" },
  } as any;
  const l = list();
  l.sections[2].cards.push({ name: "Big", qty: 1 });
  const out = bucketByMv(l, cards);
  expect(out.map((b) => b.mv)).toEqual(["0", "1", "2", "3", "4", "5", "6", "7+", "Lands"]);
  expect(out.find((b) => b.mv === "2")?.cards.map((c) => c.name)).toEqual(["Zed"]);
  expect(out.find((b) => b.mv === "7+")?.cards.map((c) => c.name)).toEqual(["Big"]);
  expect(out.find((b) => b.mv === "Lands")?.cards.map((c) => c.name)).toEqual(["Forest"]);
});
