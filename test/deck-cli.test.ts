import { test, expect } from "bun:test";
import { parseEditArgs, parseMetaArgs, renderShow } from "../scripts/deck.ts";
import type { Deck } from "../scripts/lib/deck-model.ts";
import type { CardInfo } from "../scripts/lib/deck-stats.ts";

test("parseEditArgs turns the flag grammar into change entries, attaching --replaces to the add", () => {
  const parsed = parseEditArgs([
    "chatterfang",
    "--list",
    "main",
    "--label",
    "Skullclamp in",
    "--why",
    "draw engine",
    "--add",
    "Skullclamp@Card Draw",
    "--add",
    "Forest@Lands x2",
    "--remove",
    "Sol Ring",
    "--move",
    "Bojuka Bog@Utility",
    "--qty",
    "Forest=6",
    "--replaces",
    "Sol Ring->Skullclamp",
    "--dry-run",
  ]);
  expect(parsed).toEqual({
    slug: "chatterfang",
    listId: "main",
    label: "Skullclamp in",
    rationale: "draw engine",
    dryRun: true,
    jsonFile: undefined,
    entries: [
      { op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Sol Ring" },
      { op: "add", name: "Forest", section: "Lands", qty: 2 },
      { op: "remove", name: "Sol Ring" },
      { op: "move", name: "Bojuka Bog", section: "Utility" },
      { op: "qty", name: "Forest", qty: 6 },
    ],
  });
});

test("parseEditArgs defaults the list to main and requires a slug and a label", () => {
  expect(parseEditArgs(["x", "--label", "l", "--add", "A@B"]).listId).toEqual("main");
  expect(() => parseEditArgs(["--label", "l"])).toThrow(/slug/);
  expect(() => parseEditArgs(["x", "--add", "A@B"])).toThrow(/label/);
  expect(() => parseEditArgs(["x", "--label", "l", "--add", "NoSection"])).toThrow(/@Section/);
});

test("parseMetaArgs reads tags, untags, status, note and printing", () => {
  expect(
    parseMetaArgs(["x", "--card", "Sol Ring", "--tag", "ramp", "--tag", "fast-mana", "--untag", "draw", "--status", "OWNED", "--note", "hi", "--printing", "(LTC) 264"]),
  ).toEqual({
    slug: "x",
    name: "Sol Ring",
    tags: ["ramp", "fast-mana"],
    untags: ["draw"],
    status: "OWNED",
    note: "hi",
    printing: { set: "ltc", collectorNumber: "264" },
  });
  expect(() => parseMetaArgs(["x", "--card", "Sol Ring", "--status", "MAYBE"])).toThrow(/status/);
});

test("renderShow prints a Markdown view with counts, GC and unresolved markers, and a stats footer", () => {
  const deck: Deck = {
    schema: 1,
    name: "Zed",
    format: "commander",
    lists: {
      main: {
        label: "Main",
        kind: "deck",
        bracket: 3,
        sections: [
          { name: "Commander", cards: [{ name: "Zed", qty: 1 }] },
          { name: "Lands", cards: [{ name: "Forest", qty: 2 }] },
          { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }, { name: "Mystery", qty: 1 }] },
        ],
      },
    },
    cards: { "Sol Ring": { tags: ["ramp"], status: "OWNED" } },
  };
  const cards: Record<string, CardInfo | undefined> = {
    Zed: { name: "Zed", cmc: 2, manaCost: "{B}{G}", typeLine: "Legendary Creature", colors: ["B", "G"], colorIdentity: ["B", "G"], producedMana: [], gameChanger: false, usd: 1, commanderLegal: "legal" },
    Forest: { name: "Forest", cmc: 0, manaCost: "", typeLine: "Basic Land — Forest", colors: [], colorIdentity: ["G"], producedMana: ["G"], gameChanger: false, usd: 0.1, commanderLegal: "legal" },
    "Sol Ring": { name: "Sol Ring", cmc: 1, manaCost: "{1}", typeLine: "Artifact", colors: [], colorIdentity: [], producedMana: ["C"], gameChanger: true, usd: 1, commanderLegal: "legal" },
  };
  const out = renderShow(deck, "main", cards);
  expect(out).toContain("# Zed — Main (bracket 3)");
  expect(out).toContain("## Commander (1)");
  expect(out).toContain("## Lands (2)");
  expect(out).toContain("2 Forest");
  expect(out).toContain("1 Sol Ring [GC] {1} Artifact  #ramp OWNED");
  expect(out).toContain("1 Mystery [unresolved]");
  expect(out).toContain("Total 5/100 · lands 2 · avg MV 1.5");
  expect(out).toContain("Game Changers (1): Sol Ring");
  expect(out).toContain("Unresolved (1): Mystery");
});
