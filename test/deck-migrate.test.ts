import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { migrateDeck } from "../scripts/deck-migrate.ts";
import { readDeck, listVersions } from "../scripts/lib/deck-store.ts";
import { findEntry, listSize } from "../scripts/lib/deck-model.ts";
import type { ResolveResult } from "../scripts/lib/card-cache.ts";

let dir = "";

const DECK_MD = `# Wanda — Chaos Magic — Decklist

Commander: Wanda (R)
Bracket: 3   ·   Total: 6/100

> Authoritative current list. Edit alongside STATUS.md. See ../README.md.
>
> **The engine:** copy everything.

## Commander (1)

1x Wanda

## Lands (3)

2x Mountain
1x Witch’s Mark

## Ramp (2)

1x Sol Ring *GC*
1x Unknown Card
`;

const DECK_B4_MD = `# Wanda — Bracket 4

Commander: Wanda (R)
Bracket 4

## Commander (1)
1x Wanda

## Lands (1)
1x Mountain

## Ramp (1)
1x Mana Crypt
`;

const STATUS_MD = `# Wanda — Status

## Commander
1x Wanda — OWNED

## Lands
2x Mountain — OWNED
1x Witch’s Mark — BUY ($3)

## Ramp
1x Sol Ring — PROXY (no USD on default printing)
1x Unknown Card — PROXY
`;

const resolve = async (names: string[]): Promise<ResolveResult> => {
  const canonical: Record<string, string> = { "Witch’s Mark": "Witch's Mark" };
  const found: ResolveResult["found"] = {};
  const unresolved: string[] = [];
  for (const name of names) {
    if (name === "Unknown Card") {
      unresolved.push(name);
      continue;
    }
    found[name] = { name: canonical[name] ?? name } as any;
  }
  return { found, unresolved };
};

async function seed(): Promise<void> {
  const deck = join(dir, "wanda");
  await mkdir(join(deck, "research"), { recursive: true });
  await mkdir(join(deck, "versions"), { recursive: true });
  await writeFile(join(deck, "DECK.md"), DECK_MD);
  await writeFile(join(deck, "DECK-B4.md"), DECK_B4_MD);
  await writeFile(join(deck, "STATUS.md"), STATUS_MD);
  await writeFile(join(deck, "SIDEBOARD.md"), "# Sideboard\n\n| Card | When |\n|---|---|\n| Fracture | Blood Moon |\n");
  await writeFile(join(deck, "MOXFIELD.txt"), "stale\n");
  await writeFile(join(deck, "research", "printings.txt"), "1 Sol Ring (LTC) 264\n1 Mountain (THB) 253\n");
  await writeFile(join(deck, "research", "printings-b4.txt"), "1 Mana Crypt (2XM) 1 *F*\n1 Sol Ring (SLD) 1\n");
}

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "deck-migrate-"));
  await writeFile(join(dir, "_printings.txt"), "");
  await seed();
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

const opts = () => ({ decksDir: dir, resolve, dryRun: false, now: () => new Date("2026-09-23T14:32:00Z") });

test("migrateDeck builds deck.json from every DECK*.md, STATUS.md and printings, canonicalising names", async () => {
  const report = await migrateDeck("wanda", opts());

  expect(report.lists).toEqual([
    { id: "main", file: "DECK.md", cards: 6 },
    { id: "b4", file: "DECK-B4.md", cards: 3 },
  ]);
  expect(report.renamed).toEqual([{ from: "Witch’s Mark", to: "Witch's Mark" }]);
  expect(report.unresolved).toEqual(["Unknown Card"]);
  expect(report.statusesApplied).toEqual(5);

  const deck = await readDeck("wanda", { decksDir: dir });
  expect(deck.name).toEqual("Wanda — Chaos Magic");
  expect(deck.description).toEqual("**The engine:** copy everything.");
  expect(Object.keys(deck.lists)).toEqual(["main", "b4"]);
  expect(deck.lists.main.bracket).toEqual(3);
  expect(deck.lists.b4.bracket).toEqual(4);
  expect(deck.lists.b4.label).toEqual("B4");
  expect(listSize(deck.lists.main)).toEqual(6);
  expect(findEntry(deck.lists.main, "Witch's Mark")?.section).toEqual("Lands");
  expect(findEntry(deck.lists.main, "Witch’s Mark")).toEqual(null);
  expect(findEntry(deck.lists.main, "Unknown Card")?.section).toEqual("Ramp");

  expect(deck.cards["Witch's Mark"]).toEqual({ status: "BUY" });
  expect(deck.cards["Wanda"]).toEqual({ status: "OWNED" });
  expect(deck.cards["Sol Ring"]).toEqual({ status: "PROXY", printing: { set: "ltc", collectorNumber: "264" } });
  expect(deck.cards["Mana Crypt"]).toEqual({ printing: { set: "2xm", collectorNumber: "1", foil: true } });
  expect(deck.cards["Unknown Card"]).toEqual({ status: "PROXY" });
});

test("migrateDeck snapshots each list, regenerates Moxfield, moves the sideboard and deletes the Markdown", async () => {
  await migrateDeck("wanda", opts());
  const deck = join(dir, "wanda");

  const versions = await listVersions("wanda", { decksDir: dir });
  expect(versions.map((v) => v.file).sort()).toEqual([
    "2026-09-23-1432-b4-migrated-from-markdown.json",
    "2026-09-23-1432-main-migrated-from-markdown.json",
  ]);

  const top = (await readdir(deck)).sort();
  expect(top).toEqual(["MOXFIELD-B4.txt", "MOXFIELD.txt", "deck.json", "research", "versions"]);
  expect(await readFile(join(deck, "MOXFIELD.txt"), "utf8")).toContain("1 Sol Ring (LTC) 264");
  expect((await readdir(join(deck, "research"))).sort()).toEqual(["legacy", "sideboard.md"]);
  expect(await readFile(join(deck, "research", "sideboard.md"), "utf8")).toContain("Fracture");
});

test("migrateDeck --dry-run reports but writes nothing", async () => {
  const before = (await readdir(join(dir, "wanda"))).sort();
  const report = await migrateDeck("wanda", { ...opts(), dryRun: true });
  expect(report.lists.length).toEqual(2);
  expect((await readdir(join(dir, "wanda"))).sort()).toEqual(before);
});

test("migrateDeck with no DECK.md keys every list by variant and names the deck from README.md", async () => {
  const deck = join(dir, "gods");
  await mkdir(deck, { recursive: true });
  await writeFile(join(deck, "DECK-ESIKA.md"), "# Esika\n\n## Commander (1)\n1x Esika\n");
  await writeFile(join(deck, "DECK-JODAH.md"), "# Jodah\n\n## Commander (1)\n1x Jodah\n");
  await writeFile(join(deck, "README.md"), "# God Tribal — five commanders\n\nprose\n");

  const report = await migrateDeck("gods", opts());
  expect(report.lists.map((l) => l.id)).toEqual(["esika", "jodah"]);
  const parsed = await readDeck("gods", { decksDir: dir });
  expect(parsed.name).toEqual("God Tribal — five commanders");
  expect(Object.keys(parsed.lists)).toEqual(["esika", "jodah"]);
  expect((await readdir(deck)).sort()).toEqual(["MOXFIELD-ESIKA.txt", "MOXFIELD-JODAH.txt", "README.md", "deck.json", "research", "versions"]);
});

test("migrateDeck keeps double-faced cards under their front-face name", async () => {
  const deck = join(dir, "dfc");
  await mkdir(deck, { recursive: true });
  await writeFile(join(deck, "DECK.md"), "# DFC\n\n## Lands (1)\n1x Valakut Awakening\n");
  const resolveDfc = async (names: string[]): Promise<ResolveResult> => ({
    found: Object.fromEntries(names.map((n) => [n, { name: "Valakut Awakening // Valakut Stoneforge" } as any])),
    unresolved: [],
  });
  const report = await migrateDeck("dfc", { ...opts(), resolve: resolveDfc });
  expect(report.renamed).toEqual([]);
  const parsed = await readDeck("dfc", { decksDir: dir });
  expect(findEntry(parsed.lists.main, "Valakut Awakening")).not.toEqual(null);
});

test("migrateDeck never deletes a source: the Markdown moves to research/legacy/ verbatim", async () => {
  await migrateDeck("wanda", opts());
  const legacy = join(dir, "wanda", "research", "legacy");
  expect((await readdir(legacy)).sort()).toEqual(["DECK-B4.md", "DECK.md", "STATUS.md", "printings-b4.txt", "printings.txt"]);
  expect(await readFile(join(legacy, "DECK.md"), "utf8")).toEqual(DECK_MD);
  expect(await readFile(join(legacy, "STATUS.md"), "utf8")).toEqual(STATUS_MD);
});

test("migrateDeck drops prose-only headings instead of emitting empty sections", async () => {
  const deck = join(dir, "prose");
  await mkdir(deck, { recursive: true });
  await writeFile(
    join(deck, "DECK.md"),
    "# Prose\n\n## Commander (1)\n1x Wanda\n\n## Rules gotchas\n\nSome prose the list carried.\nMore prose.\n\n## Lands (1)\n1x Mountain\n",
  );
  const report = await migrateDeck("prose", opts());
  const parsed = await readDeck("prose", { decksDir: dir });
  expect(parsed.lists.main.sections.map((s) => s.name)).toEqual(["Commander", "Lands"]);
  expect(report.notes.some((n) => n.includes("Rules gotchas"))).toEqual(true);
  expect(await readFile(join(deck, "research", "legacy", "DECK.md"), "utf8")).toContain("Some prose the list carried.");
});
