import { describe, expect, test } from "bun:test";
import { parseDeckMd, parseStatusMd, summarize } from "./parse";

const DECK = `# Scarlet Witch — Decklist

Commander: Scarlet Witch, Chaotic Avenger (Izzet, U/R)
Bracket: 3   ·   Total: 100   ·   Strategy: research/strategy.md

> Blurb line.

## Commander (1)
1x Scarlet Witch, Chaotic Avenger

## Lands (2)
1x Command Tower
1x Steam Vents
`;

const STATUS = `# Scarlet Witch — Status

1x Scarlet Witch, Chaotic Avenger — HAVE (~$3; also in the precon)
1x Command Tower — HAVE
1x Steam Vents — BUY ($18) 💰 (shocks hold value)
`;

describe("parseDeckMd", () => {
  test("extracts title, commander, groups, cards, total", () => {
    const d = parseDeckMd(DECK);
    expect(d.title).toEqual("Scarlet Witch");
    expect(d.commanderLine).toEqual("Scarlet Witch, Chaotic Avenger (Izzet, U/R)");
    expect(d.groups.map((g) => g.name)).toEqual(["Commander", "Lands"]);
    expect(d.groups[1].cards).toEqual([
      { qty: 1, name: "Command Tower" },
      { qty: 1, name: "Steam Vents" },
    ]);
    expect(d.total).toEqual(3);
  });

  test("survives a template skeleton with no cards", () => {
    const d = parseDeckMd("# New Deck — Decklist\n\n## Commander (1)\n");
    expect(d.total).toEqual(0);
    expect(d.groups).toEqual([{ name: "Commander", cards: [] }]);
  });

  test("parses a bare ungrouped list (edgar-markov format: '1 Card', no headers)", () => {
    const d = parseDeckMd("1 Akroma's Will\n1 Arcane Signet\n2 Swamp\n");
    expect(d.groups).toEqual([
      {
        name: "Deck",
        cards: [
          { qty: 1, name: "Akroma's Will" },
          { qty: 1, name: "Arcane Signet" },
          { qty: 2, name: "Swamp" },
        ],
      },
    ]);
    expect(d.total).toEqual(4);
  });
});

describe("parseStatusMd", () => {
  test("extracts status, proxy flag, note", () => {
    const s = parseStatusMd(STATUS);
    expect(s["Command Tower"]).toEqual({ status: "HAVE", proxyCandidate: false, note: null });
    expect(s["Steam Vents"].status).toEqual("BUY");
    expect(s["Steam Vents"].proxyCandidate).toEqual(true);
    expect(s["Steam Vents"].note).toEqual("shocks hold value");
  });

  test("price-only parentheticals produce a null note", () => {
    const s = parseStatusMd("1x Sol Ring — BUY ($2)\n");
    expect(s["Sol Ring"]).toEqual({ status: "BUY", proxyCandidate: false, note: null });
  });

  test("section-default status + compact · separated lines (scarlet lands format)", () => {
    const s = parseStatusMd(
      '## Lands — all PROXY (per your "proxy lands" rule)\n' +
        "1x Command Tower · 1x Steam Vents 💰 · 9x Mountain\n" +
        "## Ramp\n" +
        "1x Sol Ring — HAVE\n" +
        "1x Unlabeled Rock\n",
    );
    expect(s["Command Tower"]).toEqual({ status: "PROXY", proxyCandidate: false, note: null });
    expect(s["Steam Vents"]).toEqual({ status: "PROXY", proxyCandidate: true, note: null });
    expect(s["Mountain"].status).toEqual("PROXY");
    expect(s["Sol Ring"].status).toEqual("HAVE");
    // no explicit status and no section default → not recorded
    expect("Unlabeled Rock" in s).toEqual(false);
  });
});

describe("summarize", () => {
  test("counts statuses and pulls colors from the commander parenthetical", () => {
    const sum = summarize("scarlet-witch", parseDeckMd(DECK), parseStatusMd(STATUS));
    expect(sum.name).toEqual("Scarlet Witch");
    expect(sum.commander).toEqual("Scarlet Witch, Chaotic Avenger");
    expect(sum.colors).toEqual("U/R");
    expect(sum.total).toEqual(3);
    expect(sum.statusCounts.HAVE).toEqual(2);
    expect(sum.statusCounts.BUY).toEqual(1);
  });

  test("no commander line → null commander and colors, name falls back to slug", () => {
    const sum = summarize("mystery", parseDeckMd("## Lands (1)\n1x Wastes\n"), {});
    expect(sum.name).toEqual("mystery");
    expect(sum.commander).toEqual(null);
    expect(sum.colors).toEqual(null);
  });
});
