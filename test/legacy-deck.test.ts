import { test, expect } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { parseLegacyDeckMd, parseLegacyStatusMd, variantFromFilename } from "../scripts/lib/legacy-deck.ts";
import { parseDecklistEntries } from "../scripts/lib/decklist.ts";
import { listSize, listEntries } from "../scripts/lib/deck-model.ts";

const DECK_MD = `# Chatterfang — "Acorn Economy"

Commander: Chatterfang, Squirrel General (BG) · Bracket 3 · 1/3 Game Changers · 100 cards

Identity: **every token you make arrives with a Squirrel.** Flood the board,
then drain the table out.

Game Changers (1/3): Gaea's Cradle

> Authoritative current list. Edit alongside STATUS.md. See ../README.md.
>
> **The engine:** sacrifice everything.

## Commander (1)

1 Chatterfang, Squirrel General

## Lands (21)

19x Mountain
1x Gaea's Cradle *GC*
1 Bojuka Bog (mh3) 40

## Ramp & Mana (~2)
<!-- 1x Placeholder -->
1x Sol Ring
1x Rhystic Study *GC*
`;

test("parseLegacyDeckMd reads title, commander line, bracket, description, sections, quantities and GC markers", () => {
  const d = parseLegacyDeckMd(DECK_MD, "Main");
  expect(d.title).toEqual('Chatterfang — "Acorn Economy"');
  expect(d.commanderLine).toEqual("Chatterfang, Squirrel General (BG) · Bracket 3 · 1/3 Game Changers · 100 cards");
  expect(d.bracket).toEqual(3);
  expect(d.description).toEqual(
    "Identity: **every token you make arrives with a Squirrel.** Flood the board,\nthen drain the table out.\n\n**The engine:** sacrifice everything.",
  );
  expect(d.list.label).toEqual("Main");
  expect(d.list.kind).toEqual("deck");
  expect(d.list.bracket).toEqual(3);
  expect(d.list.sections.map((s) => s.name)).toEqual(["Commander", "Lands", "Ramp & Mana"]);
  expect(d.list.sections[1].cards).toEqual([
    { name: "Mountain", qty: 19 },
    { name: "Gaea's Cradle", qty: 1 },
    { name: "Bojuka Bog", qty: 1 },
  ]);
  expect(d.list.sections[2].cards.map((c) => c.name)).toEqual(["Sol Ring", "Rhystic Study"]);
  expect(d.gameChangers).toEqual(["Gaea's Cradle", "Rhystic Study"]);
});

test("parseLegacyDeckMd strips a ' — Decklist' title suffix and tolerates 'Bracket: 3' lines", () => {
  const d = parseLegacyDeckMd("# Foo — Decklist\n\nCommander: X (R)\nBracket: 4   ·   Total: 100/100\n\n## Commander\n1x X\n", "Main");
  expect(d.title).toEqual("Foo");
  expect(d.bracket).toEqual(4);
  expect(d.description).toEqual("");
});

test("parseLegacyStatusMd reads every real-world line shape", () => {
  const text = [
    "# Status",
    "## Lands",
    "1x Chaos Warp — OWNED",
    "1x Cyclonic Rift — BUY ($40) 💰proxy?",
    "1x Cut Me — CUT",
    "1 Gaea's Cradle — PROXY  ← Game Changer",
    "1 Edgar Markov ✅",
    "1 Herald's Horn 🛒 BUY ($4.62)",
    "1 Smothering Tithe 💰 PROXY ($64) — Game Changer 3/3",
    "1x Fracture — BUY (shockland)",
    "1x Old Style — HAVE",
    "1x Maybe — CONSIDERING pending the pod",
    "1x No Status Line",
  ].join("\n");
  const s = parseLegacyStatusMd(text);
  expect(s["Chaos Warp"]).toEqual({ status: "OWNED" });
  expect(s["Cyclonic Rift"]).toEqual({ status: "BUY" });
  expect(s["Cut Me"]).toBeUndefined();
  expect(s["Gaea's Cradle"]).toEqual({ status: "PROXY" });
  expect(s["Edgar Markov"]).toEqual({ status: "OWNED" });
  expect(s["Herald's Horn"]).toEqual({ status: "BUY" });
  expect(s["Smothering Tithe"]).toEqual({ status: "PROXY" });
  expect(s["Fracture"]).toEqual({ status: "BUY", note: "shockland" });
  expect(s["Old Style"]).toEqual({ status: "OWNED" });
  expect(s["Maybe"]).toEqual({ status: "CONSIDERING", note: "pending the pod" });
  expect(s["No Status Line"]).toBeUndefined();
});

test("variantFromFilename", () => {
  expect(variantFromFilename("DECK.md")).toEqual({ id: "main", label: "Main" });
  expect(variantFromFilename("DECK-B4.md")).toEqual({ id: "b4", label: "B4" });
  expect(variantFromFilename("DECK-KRATOS-ATREUS.md")).toEqual({ id: "kratos-atreus", label: "Kratos Atreus" });
  expect(variantFromFilename("DECK-V3.md")).toEqual({ id: "v3", label: "V3" });
});

test("every Markdown deck source still in the repo (versions/*.md, research/legacy/*.md) parses to the multiset the line parser sees", () => {
  const decksDir = join(import.meta.dir, "..", "decks");
  const files = readdirSync(decksDir)
    .filter((d) => !d.startsWith("_") && statSync(join(decksDir, d)).isDirectory())
    .flatMap((d) =>
      ["versions", join("research", "legacy")].flatMap((sub) => {
        const dir = join(decksDir, d, sub);
        if (!existsSync(dir)) return [];
        return readdirSync(dir).filter((f) => f.endsWith(".md") && !/STATUS|SIDEBOARD|README/.test(f)).map((f) => join(dir, f));
      }),
    );

  expect(files.length).toBeGreaterThan(50);

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const parsed = parseLegacyDeckMd(text, "x");
    const expectedTotal = parseDecklistEntries(text).reduce((n, e) => n + e.qty, 0);

    expect(listSize(parsed.list)).toEqual(expectedTotal);
    for (const entry of listEntries(parsed.list)) {
      expect(entry.name.length > 0 && !/^\d/.test(entry.name)).toEqual(true);
      expect(entry.name).not.toContain("*");
    }
  }
});

test("parseLegacyStatusMd reads the compact format: dot-separated segments, bold names, section default status", () => {
  const text = [
    "## Lands (33) — all PROXY per your standing rule",
    "",
    "1x Nykthos, Shrine to Nyx ($51.90) 💰 · 1x Valakut, the Molten Pinnacle ($19.88) 💰",
    "1x Castle Embereth ($0.28) · 22x Mountain",
    "",
    "## Ramp — rocks (13)",
    "",
    "1x Sol Ring — BUY ($1.75) · 1x Arcane Signet — BUY ($0.56)",
    "1x Ruby Medallion — 💰 PROXY ($15.02) · 1x **The Fire Crystal — BUY ($6.18)** ← second Medallion",
    "1x **Gauntlet of Power — BUY ($4.33)** ← every Mountain taps for {R}{R}",
    "1x The Scarlet Witch — HAVE ($0.49)",
    "1x No Default Here",
  ].join("\n");
  const s = parseLegacyStatusMd(text);
  expect(s["Nykthos, Shrine to Nyx"]).toEqual({ status: "PROXY" });
  expect(s["Valakut, the Molten Pinnacle"]).toEqual({ status: "PROXY" });
  expect(s["Mountain"]).toEqual({ status: "PROXY" });
  expect(s["Sol Ring"]).toEqual({ status: "BUY" });
  expect(s["Arcane Signet"]).toEqual({ status: "BUY" });
  expect(s["Ruby Medallion"]).toEqual({ status: "PROXY" });
  expect(s["The Fire Crystal"]).toEqual({ status: "BUY", note: "second Medallion" });
  expect(s["Gauntlet of Power"]).toEqual({ status: "BUY", note: "every Mountain taps for {R}{R}" });
  expect(s["The Scarlet Witch"]).toEqual({ status: "OWNED" });
  expect(s["No Default Here"]).toBeUndefined();
});

test("parseLegacyStatusMd keeps an arrow note that is not the Game Changer marker", () => {
  const s = parseLegacyStatusMd(
    ["1x Gauntlet of Power — BUY ($4.33) ← every Mountain taps for {R}{R}", "1 Gaea's Cradle — PROXY  ← Game Changer", "1x Wiccan — BUY ($0.29) ← best value in the deck"].join("\n"),
  );
  expect(s["Gauntlet of Power"]).toEqual({ status: "BUY", note: "every Mountain taps for {R}{R}" });
  expect(s["Gaea's Cradle"]).toEqual({ status: "PROXY" });
  expect(s["Wiccan"]).toEqual({ status: "BUY", note: "best value in the deck" });
});
