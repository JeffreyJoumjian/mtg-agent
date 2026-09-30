#!/usr/bin/env bun
/** Card-data CLI over Scryfall (with a local 24 h cache). Agent-friendly plain-text output.
 *
 *  Usage:
 *    bun run card "Chaos Warp"                 # one card: cost, type, identity, price, legality
 *    bun run card "Chaos Warp" --set msc       # pin a specific printing
 *    bun run card "Chaos Warp" --json          # raw normalized JSON
 *    bun run card "Chaos Warp" --rulings       # plus its official (Gatherer) and Scryfall rulings
 *    bun run card --deck chatterfang           # price a deck's main list (batched, one call)
 *    bun run card --deck chatterfang --list b4 # another list of the same deck
 *    bun run card --deck chatterfang --id ur   # override the identity check (default: the commanders')
 *    bun run card --deck some/list.txt         # a pasted `1x Card` list still works
 *    bun run search "t:witch id<=ur"           # raw Scryfall search syntax -> list
 *    bun run cards:refresh                      # re-pull every cached card (prices + oracle)
 *
 *  Only the deck-legality/identity flags are opinions; everything else is straight Scryfall. */
import { existsSync } from "node:fs";
import { getCard, getRulings, refreshAll, resolveNames } from "./lib/card-cache.ts";
import { parseDecklist } from "./lib/decklist.ts";
import { listNames, pickList, type DeckList } from "./lib/deck-model.ts";
import { slugFromDeckArg } from "./lib/deck-research.ts";
import { readDeck } from "./lib/deck-store.ts";
import { identityOf } from "./lib/deck-stats.ts";
import { fetchCardByName, searchCards, type CardSummary } from "./lib/scryfall.ts";

const args = process.argv.slice(2);

function flagValue(name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
const hasFlag = (name: string): boolean => args.includes(name);

/** Positional args (everything that isn't a flag or a flag's value). */
function positionals(): string[] {
  const flagsWithValue = ["--set", "--deck", "--id", "--list"];
  const out: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      if (flagsWithValue.includes(a)) i++; // skip its value
      continue;
    }
    out.push(a);
  }
  return out;
}

const money = (usd: number | null): string => (usd == null ? "  —   " : `$${usd.toFixed(2)}`);
const pt = (c: CardSummary): string =>
  c.power != null && c.toughness != null ? `${c.power}/${c.toughness}` : c.loyalty != null ? `[${c.loyalty}]` : "";
const identity = (c: CardSummary): string => (c.colorIdentity.length ? c.colorIdentity.join("") : "C");

function printCard(c: CardSummary): void {
  const bits = [
    c.name,
    c.manaCost || "—",
    "·",
    c.typeLine,
    "·",
    `CI:${identity(c)}`,
    pt(c) ? `· ${pt(c)}` : "",
    `· ${c.set} #${c.collectorNumber}`,
    `· ${money(c.usd).trim()}`,
    `· commander: ${c.commanderLegal}`,
  ].filter(Boolean);
  console.log(bits.join("  "));
  if (c.oracleText) console.log(c.oracleText);
  console.log(`Art: ${c.artist || "?"}  ·  ${c.scryfallUri}`);
}

/** The names to price: a deck's list from `deck.json`, or a pasted `1x Card` file. */
async function deckNamesFor(arg: string): Promise<{ label: string; names: string[]; list: DeckList | null }> {
  if (/\.(txt|md)$/i.test(arg) && existsSync(arg)) {
    const names = parseDecklist(await Bun.file(arg).text());
    return { label: arg, names, list: null };
  }

  const slug = slugFromDeckArg(arg);
  const deck = await readDeck(slug);
  const { id, list } = pickList(deck, flagValue("--list"));
  return { label: `${slug}/${id}`, names: listNames(list), list };
}

async function runDeck(arg: string): Promise<void> {
  const { label, names, list } = await deckNamesFor(arg);
  if (names.length === 0) {
    console.error(`No cards found in ${arg}`);
    process.exit(1);
  }

  const { found, unresolved } = await resolveNames(names);
  const explicitIdentity = flagValue("--id")?.toUpperCase().split("").filter((x) => "WUBRG".includes(x));
  const infoByName: Record<string, CardSummary | undefined> = {};
  for (const [name, card] of Object.entries(found)) infoByName[name] = card;
  const wantIdentity = explicitIdentity ?? (list ? identityOf(list, infoByName) : undefined);

  console.log(`DECK: ${label}   (${names.length} cards, ${Object.keys(found).length} found)\n`);
  let total = 0;
  let priced = 0;
  const offColor: string[] = [];
  const illegal: string[] = [];

  for (const name of names) {
    const c = found[name];
    if (!c) continue;
    if (c.usd != null) { total += c.usd; priced++; }
    if (c.commanderLegal !== "legal") illegal.push(`${c.name} (${c.commanderLegal})`);
    if (wantIdentity && !c.colorIdentity.every((x) => wantIdentity.includes(x)))
      offColor.push(`${c.name} (CI:${identity(c)})`);
    console.log(
      `${money(c.usd)}  ${c.name.padEnd(34)}  ${(c.manaCost || "—").padEnd(14)}  ${c.typeLine}`,
    );
  }

  console.log(`\nTOTAL: $${total.toFixed(2)}   (priced ${priced}/${names.length})`);
  if (unresolved.length) console.log(`NOT FOUND (check spelling): ${unresolved.join(", ")}`);
  if (illegal.length) console.log(`NOT COMMANDER-LEGAL: ${illegal.join(", ")}`);
  if (wantIdentity && offColor.length)
    console.log(`OFF-IDENTITY (outside {${wantIdentity.join("")}}): ${offColor.join(", ")}`);
}

async function runSearch(query: string): Promise<void> {
  const cards = await searchCards(query);
  if (cards.length === 0) {
    console.log(`No cards match: ${query}`);
    return;
  }
  console.log(`${cards.length} result(s) for: ${query}\n`);
  for (const c of cards) {
    console.log(
      `${money(c.usd)}  ${c.name.padEnd(30)}  ${(c.manaCost || "—").padEnd(12)}  CI:${identity(c).padEnd(5)}  ${c.typeLine}`,
    );
  }
}

async function main(): Promise<void> {
  const [first] = args;

  if (first === "refresh") {
    const n = await refreshAll();
    console.log(`Refreshed ${n} cached card(s).`);
    return;
  }

  if (first === "search") {
    const query = positionals().slice(1).join(" ") || args.slice(1).filter((a) => !a.startsWith("--")).join(" ");
    if (!query) { console.error(`Usage: bun run search "<scryfall query>"`); process.exit(1); }
    await runSearch(query);
    return;
  }

  const deck = flagValue("--deck");
  if (deck) { await runDeck(deck); return; }

  const name = positionals().join(" ");
  if (!name) {
    console.error(`Usage: bun run card "<card name>"   |   --deck <slug> [--list id]   |   search "<query>"`);
    process.exit(1);
  }
  // A pinned set targets a specific printing, so it bypasses the by-name cache.
  const pinnedSet = flagValue("--set");
  const card = pinnedSet ? await fetchCardByName(name.trim(), pinnedSet) : await getCard(name.trim());
  // Entries cached before `id` existed can't key a rulings request, so re-fetch those once.
  const rulings = hasFlag("--rulings") ? await getRulings(card.id ? card : await fetchCardByName(card.name)) : null;

  if (hasFlag("--json")) {
    console.log(JSON.stringify(rulings ? { ...card, rulings } : card, null, 2));
    return;
  }

  printCard(card);
  if (rulings) {
    console.log(rulings.length ? `\nRulings (${rulings.length}; wotc = official Gatherer ruling):` : "\nRulings: none published.");
    for (const r of rulings) console.log(`- ${r.publishedAt} [${r.source}] ${r.comment}`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
