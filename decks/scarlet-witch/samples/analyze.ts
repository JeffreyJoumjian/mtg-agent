/**
 * Normalizes every scraped sample deck into one shape and prints
 *  (a) a compact per-deck listing, and
 *  (b) a card-frequency table across all decks.
 * Run: bun run decks/scarlet-witch/samples/analyze.ts [--freq|--lists]
 */

type Deck = {
  source: string;
  name: string;
  commanders: string[];
  cards: { q: number; n: string }[];
};

const DIR = "decks/scarlet-witch/samples";

async function loadMoxfield(): Promise<Deck[]> {
  const raw = await Bun.file(`${DIR}/moxfield-decks.json`).text();
  // The file is a JSON-encoded string containing JSON.
  const decks = JSON.parse(JSON.parse(raw)) as any[];

  return decks
    .filter((d) => !d.error)
    .map((d) => ({
      source: "moxfield",
      name: d.name ?? d.label,
      commanders: d.commanders ?? [],
      cards: d.main ?? [],
    }));
}

async function loadArchidekt(): Promise<Deck[]> {
  const d = JSON.parse(await Bun.file(`${DIR}/archidekt.json`).text());

  const cards: { q: number; n: string }[] = [];
  let commander = "";

  for (const c of d.cards ?? []) {
    const categories: string[] = c.categories ?? [];
    const name = c.card?.oracleCard?.name ?? c.card?.name ?? "?";

    if (categories.includes("Commander")) {
      commander = name;
      continue;
    }
    if (categories.includes("Maybeboard") || categories.includes("Sideboard")) continue;

    cards.push({ q: c.quantity ?? 1, n: name });
  }

  return [{ source: "archidekt", name: d.name, commanders: [commander], cards }];
}

async function loadTappedOut(): Promise<Deck[]> {
  const text = await Bun.file(`${DIR}/tappedout.txt`).text();

  const cards = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^(\d+)\s+(.+)$/);
      return m ? { q: Number(m[1]), n: m[2] } : null;
    })
    .filter((c): c is { q: number; n: string } => c !== null);

  return [
    {
      source: "tappedout",
      name: "The Scarlet Witch - EDH Pump + Big Mana",
      commanders: ["The Scarlet Witch"],
      cards,
    },
  ];
}

const BASICS = ["Mountain", "Island", "Plains", "Swamp", "Forest", "Wastes"];

const mox = await loadMoxfield();
const arch = await loadArchidekt();
const tapped = await loadTappedOut();
const all = [...mox, ...arch, ...tapped];

const mode = process.argv[2] ?? "--lists";

if (mode === "--lists") {
  for (const d of all) {
    const total = d.cards.reduce((a, c) => a + c.q, 0);
    const spells = d.cards.filter((c) => !BASICS.includes(c.n));

    console.log(`\n### ${d.name}  [${d.source}]`);
    console.log(`Commander: ${d.commanders.join(" + ") || "?"}  ·  ${total} cards in 99`);
    console.log(spells.map((c) => (c.q > 1 ? `${c.q}x ${c.n}` : c.n)).join(", "));
  }
} else {
  // Frequency across decks, restricted to decks whose commander is The Scarlet Witch.
  const wanda = all.filter((d) => d.commanders.some((c) => c === "The Scarlet Witch"));
  const others = all.filter((d) => !d.commanders.some((c) => c === "The Scarlet Witch"));

  const count = (decks: Deck[]) => {
    const freq: Record<string, number> = {};

    for (const d of decks) {
      for (const c of d.cards) {
        if (BASICS.includes(c.n)) continue;
        freq[c.n] = (freq[c.n] ?? 0) + 1;
      }
    }
    return freq;
  };

  const wandaFreq = count(wanda);
  const otherFreq = count(others);

  console.log(`# Wanda decks: ${wanda.length}   # other decks: ${others.length}\n`);
  console.log("## Cards by how many of the Scarlet Witch decks run them\n");

  const sorted = Object.entries(wandaFreq).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  let bucket = -1;
  for (const [name, n] of sorted) {
    if (n < 2) break;

    if (n !== bucket) {
      bucket = n;
      console.log(`\n--- in ${n}/${wanda.length} decks ---`);
    }
    const also = otherFreq[name] ? ` (+${otherFreq[name]} non-Wanda)` : "";
    console.log(`${name}${also}`);
  }

  const singles = sorted.filter(([, n]) => n === 1).map(([name]) => name);
  console.log(`\n--- in exactly 1 deck (${singles.length}) ---`);
  console.log(singles.join(", "));
}
