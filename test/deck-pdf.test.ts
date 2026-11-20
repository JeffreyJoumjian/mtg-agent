import { test, expect } from "bun:test";
import { historySwaps, parseSideboard, sideboardForList } from "../scripts/deck-pdf.ts";
import type { HistoryEntry } from "../scripts/lib/deck-store.ts";

test("parseSideboard reads the standard table, taking link text as the card", () => {
  const md = [
    "# Ultron — Sideboard",
    "",
    "| Card | Bring in when | Displaces |",
    "|---|---|---|",
    "| [Basalt Monolith](https://scryfall.com/search?q=x) | Bracket 4 table only | Worn Powerstone |",
    "| [Blast Zone](https://scryfall.com/search?q=y) | Token decks | one Wastes |",
  ].join("\n");

  expect(parseSideboard(md)).toEqual([
    { card: "Basalt Monolith", when: "Bracket 4 table only", displaces: "Worn Powerstone" },
    { card: "Blast Zone", when: "Token decks", displaces: "one Wastes" },
  ]);
});

test("parseSideboard finds the columns by header: IN/OUT, Replaced by, and a List column first", () => {
  const md = [
    "| IN | OUT | Why | Bracket |",
    "|---|---|---|---|",
    "| **Grim Monolith** ($471) | Talisman of Creativity | `{2}` for three. | GC |",
    "",
    "| Card | Cost | What it does | Why cut | Replaced by | Own |",
    "|---|---|---|---|---|---|",
    "| **Exquisite Blood** | `{4}{B}` | You gain what they lose | Half of the infinite | Vein Ripper | yes |",
    "",
    "| List | Card | Bring in when | Displaces |",
    "|---|---|---|---|",
    "| `main` | [Thermo-Alchemist](https://scryfall.com/x) | Undo the swap. | Tal Shiar Analyst |",
  ].join("\n");

  expect(parseSideboard(md)).toEqual([
    { card: "Grim Monolith", when: "{2} for three.", displaces: "Talisman of Creativity" },
    { card: "Exquisite Blood", when: "You gain what they lose", displaces: "Vein Ripper" },
    { card: "Thermo-Alchemist", when: "Undo the swap.", displaces: "Tal Shiar Analyst" },
  ]);
});

test("parseSideboard skips a table with no displaced-card column", () => {
  const md = [
    "| Card | Why it's wrong for this deck |",
    "|---|---|",
    "| [Fireball](https://scryfall.com/x) | Too slow. |",
  ].join("\n");

  expect(parseSideboard(md)).toEqual([]);
});

test("sideboardForList keeps rows that displace a card in the list, once per card", () => {
  const rows = [
    { card: "Basalt Monolith", when: "Bracket 4", displaces: "Worn Powerstone" },
    { card: "Blast Zone", when: "Tokens", displaces: "one Wastes" },
    { card: "Scrap Trawler", when: "Recursion", displaces: "Hangarback Walker" },
    { card: "Sol Ring", when: "Already in", displaces: "Wastes" },
    { card: "Basalt Monolith", when: "Second table", displaces: "Wastes" },
  ];

  expect(sideboardForList(rows, ["Worn Powerstone", "Wastes", "Sol Ring"])).toEqual([
    { card: "Basalt Monolith", when: "Bracket 4", displaces: "Worn Powerstone", displaced: ["Worn Powerstone"] },
    { card: "Blast Zone", when: "Tokens", displaces: "one Wastes", displaced: ["Wastes"] },
  ]);
});

test("sideboardForList matches whole names only", () => {
  const rows = [{ card: "Swords to Plowshares", when: "Removal", displaces: "Swampwalker Pact" }];

  expect(sideboardForList(rows, ["Swamp"])).toEqual([]);
});

const entry = (at: string, listId: string, entries: HistoryEntry["entries"], rationale?: string) => ({
  at,
  listId,
  label: "label",
  rationale,
  entries,
});

test("historySwaps returns one list's replacements, newest first, up to the limit", () => {
  const history = [
    entry("2026-11-10T10:00:00Z", "main", [{ op: "add", name: "Mind's Eye", section: "Draw", replaces: "Stridehangar Automaton" }], "old"),
    entry("2026-11-19T10:00:00Z", "main", [
      { op: "add", name: "Cyberman Patrol", section: "Payoffs", replaces: "Marvin, Murderous Mimic" },
      { op: "remove", name: "Marvin, Murderous Mimic" },
    ], "afflict"),
    entry("2026-11-18T10:00:00Z", "combat", [{ op: "add", name: "Archive", section: "Draw", replaces: "Talisman" }], "other list"),
    entry("2026-11-15T10:00:00Z", "main", [{ op: "add", name: "Replicator", section: "Copy" }], "no replaces"),
  ];

  expect(historySwaps(history, "main", 5)).toEqual([
    { at: "2026-11-19", in: "Cyberman Patrol", out: "Marvin, Murderous Mimic", why: "afflict" },
    { at: "2026-11-10", in: "Mind's Eye", out: "Stridehangar Automaton", why: "old" },
  ]);
  expect(historySwaps(history, "main", 1)).toEqual([
    { at: "2026-11-19", in: "Cyberman Patrol", out: "Marvin, Murderous Mimic", why: "afflict" },
  ]);
});
