#!/usr/bin/env bun
/** EDHREC CLI — crowd statistics as an additional deck-building lens (7-day local cache).
 *
 *  EDHREC is popularity data, not source of truth: oracle text, prices and legality still
 *  come from `bun run card`; rulings from the local Comprehensive Rules.
 *
 *  Usage:
 *    bun run edhrec commander "The Scarlet Witch"        # themes + headline synergy/top lists
 *    bun run edhrec commander "Atraxa" --theme infect    # one theme's version of the page
 *    bun run edhrec commander "Tony Stark" --all         # every cardlist, not just headliners
 *    bun run edhrec card "Sol Ring"                      # inclusion, salt, top commanders
 *    bun run edhrec --deck decks/x/DECK.md               # coverage + ranked ideas for the deck
 *    bun run edhrec --deck decks/x/DECK.md --ideas 40    # more ideas (default 25)
 *    bun run edhrec ... --json                           # raw normalized JSON */
import { getCardPage, getCommanderPage } from "./lib/edhrec-cache.ts";
import type { EdhrecCardStat, EdhrecCommanderPage } from "./lib/edhrec.ts";
import { crossRefDeck } from "./lib/edhrec.ts";
import { parseDecklist } from "./lib/decklist.ts";
import { commanderFromDeck } from "./lib/deck-research.ts";

const args = process.argv.slice(2);

function flagValue(name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
const hasFlag = (name: string): boolean => args.includes(name);

function positionals(): string[] {
  const flagsWithValue = ["--theme", "--deck", "--commander", "--ideas"];
  const out: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      if (flagsWithValue.includes(a)) i++;
      continue;
    }
    out.push(a);
  }
  return out;
}

const n = (x: number): string => x.toLocaleString("en-US");
const pctCol = (p: number | null): string => (p == null ? "  — " : `${String(p).padStart(3)}%`);
const synCol = (s: number | null): string =>
  s == null ? "   —  " : `${s >= 0 ? "+" : ""}${s.toFixed(2)}`.padStart(6);

/** The lists worth printing without `--all` — the page's own editorial headliners. */
const HEADLINE_TAGS = ["newcards", "highsynergycards", "topcards", "gamechangers"];

function printStatLine(card: EdhrecCardStat, list?: string): void {
  console.log(
    `  ${synCol(card.synergy)}  ${pctCol(card.inclusionPct)}  ${card.name.padEnd(40)}${list ? `  (${list})` : ""}`,
  );
}

function printCommanderHeader(page: EdhrecCommanderPage): void {
  console.log(`EDHREC: ${page.name} — ${n(page.numDecks)} decks${page.rank ? ` · rank #${n(page.rank)}` : ""}`);
  console.log(page.url);
  if (page.themes.length) {
    const shown = page.themes.slice(0, 12).map((t) => `${t.name} (${n(t.count)})`);
    const more = page.themes.length - shown.length;
    console.log(`Themes: ${shown.join(" · ")}${more > 0 ? ` · +${more} more` : ""}`);
  }
}

async function runCommander(name: string, theme?: string): Promise<void> {
  const page = await getCommanderPage(name, theme);
  if (hasFlag("--json")) return console.log(JSON.stringify(page, null, 2));

  printCommanderHeader(page);
  const lists = hasFlag("--all") ? page.lists : page.lists.filter((l) => HEADLINE_TAGS.includes(l.tag));
  for (const list of lists) {
    console.log(`\n${list.header}:  (synergy · inclusion)`);
    for (const card of list.cards) printStatLine(card);
  }
}

async function runCard(name: string): Promise<void> {
  const page = await getCardPage(name);
  if (hasFlag("--json")) return console.log(JSON.stringify(page, null, 2));

  console.log(`EDHREC: ${page.name}`);
  console.log(page.url);
  console.log(`In ${n(page.numDecks)} of ${n(page.potentialDecks)} eligible decks (${page.inclusionPct}%)`);
  if (page.salt != null) console.log(`Salt score: ${page.salt.toFixed(2)} / 4`);
  if (page.topCommanders.length) {
    console.log(`\nTop commanders running it:  (synergy · inclusion)`);
    for (const c of page.topCommanders.slice(0, 10)) printStatLine(c);
  }
}

async function runDeck(path: string, theme?: string): Promise<void> {
  const text = await Bun.file(path).text();
  const names = parseDecklist(text);
  if (names.length === 0) {
    console.error(`No "1x Card Name" lines found in ${path}`);
    process.exit(1);
  }

  const commander = flagValue("--commander") ?? commanderFromDeck(text);
  if (!commander) {
    console.error(`Could not find the commander in ${path} — pass it with --commander "Name"`);
    process.exit(1);
  }

  const page = await getCommanderPage(commander, theme);
  const { inDeck, ideas } = crossRefDeck(page, names);
  const maxIdeas = Number(flagValue("--ideas") ?? 25);

  if (hasFlag("--json")) {
    return console.log(JSON.stringify({ page: { ...page, lists: undefined }, inDeck, ideas: ideas.slice(0, maxIdeas) }, null, 2));
  }

  printCommanderHeader(page);

  const listed = inDeck
    .filter((e) => e.stat != null)
    .sort((a, b) => (b.stat?.inclusionPct ?? 0) - (a.stat?.inclusionPct ?? 0));
  const unlisted = inDeck.filter((e) => e.stat == null);

  console.log(
    `\nCOVERAGE — ${listed.length}/${inDeck.length} non-basic deck cards appear on the page:  (synergy · inclusion)`,
  );
  for (const e of listed) printStatLine(e.stat!);
  if (unlisted.length) {
    // "·" as separator because card names themselves contain commas ("Iron Man, Tony Stark").
    console.log(`\nNot on the page (${unlisted.length}): ${unlisted.map((e) => e.name).join(" · ")}`);
  }

  console.log(`\nIDEAS — top ${Math.min(maxIdeas, ideas.length)} of ${ideas.length} page cards the deck doesn't run, by synergy:`);
  for (const idea of ideas.slice(0, maxIdeas)) printStatLine(idea, idea.list);
}

async function main(): Promise<void> {
  const [mode] = positionals();
  const theme = flagValue("--theme");

  const deck = flagValue("--deck");
  if (deck) return runDeck(deck, theme);

  const name = positionals().slice(1).join(" ");
  if (mode === "commander" && name) return runCommander(name, theme);
  if (mode === "card" && name) return runCard(name);

  console.error(
    `Usage: bun run edhrec commander "<name>" [--theme <slug>] [--all]\n` +
      `       bun run edhrec card "<name>"\n` +
      `       bun run edhrec --deck decks/<slug>/DECK.md [--commander "<name>"] [--ideas N]\n` +
      `       (any mode: --json)`,
  );
  process.exit(1);
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
