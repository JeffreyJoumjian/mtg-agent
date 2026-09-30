import { test, expect } from "bun:test";
import type { DeckIndexEntry } from "../model/types";
import { sortDecks } from "./sort";

const deck = (name: string, edited: string | null, created: string | null): DeckIndexEntry => ({
  slug: name.toLowerCase(),
  name,
  commanders: [],
  commanderArt: null,
  identity: [],
  bracket: null,
  lists: [],
  lastChange: edited ? { label: "x", at: edited } : null,
  created,
});

const decks = [
  deck("Beta", "2026-09-20T00:00:00Z", "2026-09-01T00:00:00Z"),
  deck("alpha", "2026-09-24T00:00:00Z", "2026-09-10T00:00:00Z"),
  deck("Gamma", null, null),
  deck("Delta", "2026-09-22T00:00:00Z", "2026-08-01T00:00:00Z"),
];
const names = (list: DeckIndexEntry[]) => list.map((d) => d.name);

test("sortDecks by last edited, newest first by default, undated last", () => {
  expect(names(sortDecks(decks, { by: "edited", dir: "desc" }))).toEqual(["alpha", "Delta", "Beta", "Gamma"]);
  expect(names(sortDecks(decks, { by: "edited", dir: "asc" }))).toEqual(["Beta", "Delta", "alpha", "Gamma"]);
});

test("sortDecks by created keeps undated decks last either way", () => {
  expect(names(sortDecks(decks, { by: "created", dir: "desc" }))).toEqual(["alpha", "Beta", "Delta", "Gamma"]);
  expect(names(sortDecks(decks, { by: "created", dir: "asc" }))).toEqual(["Delta", "Beta", "alpha", "Gamma"]);
});

test("sortDecks by name ignores case and does not mutate its input", () => {
  expect(names(sortDecks(decks, { by: "name", dir: "asc" }))).toEqual(["alpha", "Beta", "Delta", "Gamma"]);
  expect(names(sortDecks(decks, { by: "name", dir: "desc" }))).toEqual(["Gamma", "Delta", "Beta", "alpha"]);
  expect(names(decks)).toEqual(["Beta", "alpha", "Gamma", "Delta"]);
});
