/**
 * Measures how much of each sample deck The Scarlet Witch actually discounts.
 *
 * Her ability only reduces instant/sorcery spells with mana value 4 or greater, so the honest
 * "is this really a Scarlet Witch deck?" metric is: how many MV 4+ instants/sorceries does it run?
 *
 * X-spells count as live — rule 107.3a means X on the stack equals the announced value, so
 * Crackle with Power or Comet Storm reach MV 4+ whenever you pay for them meaningfully.
 *
 * Run: bun run decks/scarlet-witch/samples/commander-usage.ts
 */

import { getCards } from "../../../scripts/lib/card-cache.ts";

const DIR = "decks/scarlet-witch/samples";
const BASICS = ["Mountain", "Island", "Plains", "Swamp", "Forest", "Wastes", "Snow-Covered Mountain"];

type Deck = { name: string; commander: string; cards: string[] };

const raw = await Bun.file(`${DIR}/moxfield-decks.json`).text();
const decks: Deck[] = JSON.parse(JSON.parse(raw))
  .filter((d: any) => !d.error)
  .map((d: any) => ({
    name: d.name,
    commander: (d.commanders ?? []).join(" + "),
    cards: (d.main ?? []).map((c: any) => c.n),
  }));

const arch = JSON.parse(await Bun.file(`${DIR}/archidekt.json`).text());
decks.push({
  name: arch.name,
  commander: "The Scarlet Witch",
  cards: (arch.cards ?? [])
    .filter((c: any) => !(c.categories ?? []).includes("Commander"))
    .map((c: any) => c.card?.oracleCard?.name ?? c.card?.name),
});

const tapped = (await Bun.file(`${DIR}/tappedout.txt`).text())
  .split("\n")
  .map((l) => l.trim().replace(/^\d+\s+/, ""))
  .filter(Boolean);
decks.push({ name: "EDH Pump + Big Mana", commander: "The Scarlet Witch", cards: tapped });

const unique = [...new Set(decks.flatMap((d) => d.cards).filter((n) => n && !BASICS.includes(n)))];
console.log(`Looking up ${unique.length} unique cards…\n`);

const { found } = await getCards(unique);
const byName: Record<string, (typeof found)[number]> = {};
for (const c of found) byName[c.name] = c;

/** X-spells are stored at their printed MV (X=0), so judge them by the {X} in the cost instead. */
const isXSpell = (manaCost: string) => manaCost.includes("{X}");

const rows = decks.map((d) => {
  const cards = d.cards.map((n) => byName[n]).filter(Boolean);
  const spells = cards.filter((c) => /Instant|Sorcery/.test(c.typeLine));

  const discounted = spells.filter((c) => c.cmc >= 4 || isXSpell(c.manaCost));
  const tooCheap = spells.filter((c) => c.cmc < 4 && !isXSpell(c.manaCost));

  return {
    name: d.name,
    commander: d.commander,
    spells: spells.length,
    discounted: discounted.length,
    tooCheap: tooCheap.length,
    pct: spells.length ? Math.round((discounted.length / spells.length) * 100) : 0,
    creatures: cards.filter((c) => c.typeLine.includes("Creature")).length,
  };
});

rows.sort((a, b) => b.discounted - a.discounted);

console.log("MV4+ = instants/sorceries The Scarlet Witch actually discounts (X-spells counted).\n");
console.log("MV4+  <MV4  I/S   %disc  creat  deck");
console.log("----  ----  ----  -----  -----  ----------------------------------------");

for (const r of rows) {
  const wanda = r.commander === "The Scarlet Witch" ? " " : "*";
  console.log(
    `${String(r.discounted).padStart(4)}  ${String(r.tooCheap).padStart(4)}  ` +
      `${String(r.spells).padStart(4)}  ${String(r.pct).padStart(4)}%  ` +
      `${String(r.creatures).padStart(5)}  ${wanda}${r.name}`,
  );
}
console.log("\n* = not a The Scarlet Witch deck");
