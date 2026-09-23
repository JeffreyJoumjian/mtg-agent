import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createDeck, readDeck, writeDeck } from "@mtg/deck-store.ts";
import { MAIN_LIST, findEntry } from "@mtg/deck-model.ts";
import { apply, preview, type ChangeDeps } from "./changes";
import type { CardView } from "../model/cards";

let dir = "";

const view = (name: string, over: Partial<CardView> = {}): CardView => ({
  name,
  cmc: 1,
  manaCost: "{1}",
  typeLine: "Artifact",
  colors: [],
  colorIdentity: [],
  producedMana: [],
  gameChanger: false,
  usd: 1,
  commanderLegal: "legal",
  id: name,
  oracleId: name,
  oracleText: "",
  images: { small: null, normal: null, artCrop: null },
  faces: [],
  layout: "normal",
  rarity: "common",
  set: "x",
  collectorNumber: "1",
  scryfallUri: "",
  keywords: [],
  ...over,
});

const known: Record<string, CardView> = {
  Zed: view("Zed", { typeLine: "Legendary Creature", colorIdentity: ["B"] }),
  "Sol Ring": view("Sol Ring", { producedMana: ["C"] }),
  Skullclamp: view("Skullclamp"),
  skullclamp: view("Skullclamp"),
};

const deps: ChangeDeps = {
  resolve: async (names) => {
    const cards: Record<string, CardView> = {};
    const unresolved: string[] = [];
    for (const n of names) {
      if (known[n]) cards[n] = known[n];
      else unresolved.push(n);
    }
    return { cards, unresolved };
  },
  canonical: async (names) => {
    const canonical: Record<string, string> = {};
    const unresolved: string[] = [];
    for (const n of names) {
      if (known[n]) canonical[n] = known[n].name;
      else unresolved.push(n);
    }
    return { canonical, unresolved };
  },
};

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "changes-api-"));
  const deck = await createDeck("zed", "Zed", { decksDir: dir });
  deck.lists[MAIN_LIST].sections[0].cards.push({ name: "Zed", qty: 1 });
  deck.lists[MAIN_LIST].sections[2].cards.push({ name: "Sol Ring", qty: 1 });
  await writeDeck("zed", deck, { decksDir: dir });
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

test("preview canonicalises names, returns before/after stats and writes nothing", async () => {
  const res = await preview(
    {
      slug: "zed",
      changeSet: {
        listId: MAIN_LIST,
        label: "clamp",
        author: "user",
        entries: [
          { op: "add", name: "skullclamp", section: "Card Draw", replaces: "Sol Ring" },
          { op: "remove", name: "Sol Ring" },
        ],
      },
    },
    deps,
    { decksDir: dir },
  );
  expect(res.ok).toEqual(true);
  if (!res.ok) return;

  expect(findEntry(res.list, "Skullclamp")?.section).toEqual("Card Draw");
  expect(res.entries[0]).toEqual({ op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Sol Ring" });
  expect(res.before.size.total).toEqual(2);
  expect(res.after.size.total).toEqual(2);
  expect(res.changes.some((c) => c.key === "roles.Ramp" && c.delta === -1)).toEqual(true);
  expect(res.cards["Skullclamp"]).toBeDefined();

  const onDisk = await readDeck("zed", { decksDir: dir });
  expect(findEntry(onDisk.lists[MAIN_LIST], "Skullclamp")).toEqual(null);
});

test("preview and apply refuse to add a card Scryfall does not know", async () => {
  const res = await preview(
    {
      slug: "zed",
      changeSet: {
        listId: MAIN_LIST,
        label: "x",
        author: "agent",
        entries: [{ op: "add", name: "Not A Card", section: "Ramp" }],
      },
    },
    deps,
    { decksDir: dir },
  );
  expect(res.ok).toEqual(false);
  if (!res.ok) expect(res.failures[0].reason).toContain("Scryfall");
});

test("apply writes through the store and a stale change set is rejected the second time", async () => {
  const input = {
    slug: "zed",
    changeSet: {
      listId: MAIN_LIST,
      label: "cut Sol Ring",
      author: "user" as const,
      entries: [{ op: "remove" as const, name: "Sol Ring" }],
    },
  };
  const first = await apply(input, deps, { decksDir: dir });
  expect(first.ok).toEqual(true);
  if (first.ok) expect(first.entry.label).toEqual("cut Sol Ring");

  const second = await apply(input, deps, { decksDir: dir });
  expect(second.ok).toEqual(false);
  if (!second.ok) expect(second.failures[0].reason).toContain("not in the list");
});
