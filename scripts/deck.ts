#!/usr/bin/env bun
/**
 * deck.ts — the terminal's door into `deck.json`.
 *
 *   bun run deck:show <slug> [--list id] [--json]
 *   bun run deck:edit <slug> [--list main] --label "…" [--why "…"] \
 *       --add "Card@Section" --add "Forest@Lands x2" --remove "Card" --move "Card@Section" \
 *       --qty "Forest=6" [--replaces "Old->New"] [--json changes.json] [--dry-run]
 *   bun run deck:meta <slug> --card "Name" [--tag t]… [--untag t]… [--status OWNED] [--note "…"] [--printing "(LTC) 264"]
 *
 * `edit` goes through the same apply path as the app (`deck-store.applyToDeck`): every name is
 * canonicalised through Scryfall first, the list is snapshotted, history is appended and the
 * Moxfield export regenerated. Nothing here runs git.
 */
import { readFile } from "node:fs/promises";
import { deckName, resolveNames } from "./lib/card-cache.ts";
import { applyChangeSet, type ChangeEntry } from "./lib/change-set.ts";
import {
  CARD_STATUSES,
  MAIN_LIST,
  isCommanderSection,
  listEntries,
  listNames,
  listSize,
  type CardMeta,
  type CardStatus,
  type Deck,
  type Printing,
} from "./lib/deck-model.ts";
import { applyToDeck, readDeck, setCardMeta } from "./lib/deck-store.ts";
import { computeStats, deckIdentity, diffStats, type CardInfo, type DeckStats, type StatChange } from "./lib/deck-stats.ts";
import { parsePrintingRef } from "./lib/moxfield.ts";
import type { CardSummary } from "./lib/scryfall.ts";

export interface EditArgs {
  slug: string;
  listId: string;
  label: string;
  rationale?: string;
  dryRun: boolean;
  jsonFile: string | undefined;
  entries: ChangeEntry[];
}

/** Split `argv` into positionals and repeated `--flag value` pairs (flags may repeat). */
function readFlags(argv: string[], valued: string[], bare: string[]): { positionals: string[]; flags: Record<string, string[]>; bare: Record<string, true> } {
  const positionals: string[] = [];
  const flags: Record<string, string[]> = {};
  const bareSeen: Record<string, true> = {};

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (bare.includes(a)) {
      bareSeen[a] = true;
    } else if (valued.includes(a)) {
      const value = argv[i + 1];
      if (value === undefined) throw new Error(`${a} needs a value`);
      (flags[a] ??= []).push(value);
      i++;
    } else if (a.startsWith("--")) {
      throw new Error(`unknown flag ${a}`);
    } else {
      positionals.push(a);
    }
  }
  return { positionals, flags, bare: bareSeen };
}

/** `"Skullclamp@Card Draw"` / `"Forest@Lands x2"` → name, section, optional qty. */
function splitAt(value: string, flag: string): { name: string; section: string; qty?: number } {
  const at = value.lastIndexOf("@");
  if (at === -1) throw new Error(`${flag} wants "Card@Section" (got "${value}")`);

  const name = value.slice(0, at).trim();
  let section = value.slice(at + 1).trim();
  let qty: number | undefined;
  const times = section.match(/\s+x(\d+)$/i);
  if (times) {
    qty = Number(times[1]);
    section = section.slice(0, times.index).trim();
  }
  if (!name || !section) throw new Error(`${flag} wants "Card@Section" (got "${value}")`);
  return { name, section, ...(qty !== undefined ? { qty } : {}) };
}

export function parseEditArgs(argv: string[]): EditArgs {
  const { positionals, flags, bare } = readFlags(
    argv,
    ["--list", "--label", "--why", "--add", "--remove", "--move", "--qty", "--replaces", "--json"],
    ["--dry-run"],
  );
  const slug = positionals[0];
  if (!slug) throw new Error("deck:edit needs a deck slug");

  const label = flags["--label"]?.[0];
  if (!label && !flags["--json"]) throw new Error("deck:edit needs --label");

  const entries: ChangeEntry[] = [];
  for (const v of flags["--add"] ?? []) entries.push({ op: "add", ...splitAt(v, "--add") });
  for (const v of flags["--remove"] ?? []) entries.push({ op: "remove", name: v.trim() });
  for (const v of flags["--move"] ?? []) {
    const { name, section } = splitAt(v, "--move");
    entries.push({ op: "move", name, section });
  }
  for (const v of flags["--qty"] ?? []) {
    const m = v.match(/^(.+?)\s*=\s*(\d+)$/);
    if (!m) throw new Error(`--qty wants "Card=N" (got "${v}")`);
    entries.push({ op: "qty", name: m[1].trim(), qty: Number(m[2]) });
  }
  for (const v of flags["--replaces"] ?? []) {
    const m = v.match(/^(.+?)\s*->\s*(.+)$/);
    if (!m) throw new Error(`--replaces wants "Old->New" (got "${v}")`);
    const add = entries.find((e) => e.op === "add" && e.name.toLowerCase() === m[2].trim().toLowerCase());
    if (!add || add.op !== "add") throw new Error(`--replaces names "${m[2].trim()}", which is not being added`);
    add.replaces = m[1].trim();
  }

  return {
    slug,
    listId: flags["--list"]?.[0] ?? MAIN_LIST,
    label: label ?? "",
    ...(flags["--why"]?.[0] ? { rationale: flags["--why"][0] } : {}),
    dryRun: Boolean(bare["--dry-run"]),
    jsonFile: flags["--json"]?.[0],
    entries,
  };
}

export interface MetaArgs {
  slug: string;
  name: string;
  tags: string[];
  untags: string[];
  status?: CardStatus;
  note?: string;
  printing?: Printing;
}

export function parseMetaArgs(argv: string[]): MetaArgs {
  const { positionals, flags } = readFlags(argv, ["--card", "--tag", "--untag", "--status", "--note", "--printing"], []);
  const slug = positionals[0];
  if (!slug) throw new Error("deck:meta needs a deck slug");
  const name = flags["--card"]?.[0];
  if (!name) throw new Error("deck:meta needs --card");

  const status = flags["--status"]?.[0];
  if (status !== undefined && !CARD_STATUSES.includes(status as CardStatus)) {
    throw new Error(`--status must be one of ${CARD_STATUSES.join(", ")}`);
  }

  let printing: Printing | undefined;
  const ref = flags["--printing"]?.[0];
  if (ref !== undefined) {
    const parsed = parsePrintingRef(ref);
    if (!parsed) throw new Error(`--printing wants "(SET) 123" (got "${ref}")`);
    printing = parsed;
  }

  return {
    slug,
    name,
    tags: flags["--tag"] ?? [],
    untags: flags["--untag"] ?? [],
    ...(status !== undefined ? { status: status as CardStatus } : {}),
    ...(flags["--note"]?.[0] !== undefined ? { note: flags["--note"][0] } : {}),
    ...(printing ? { printing } : {}),
  };
}

const money = (n: number): string => `$${n.toFixed(2)}`;

function statsFooter(s: DeckStats): string {
  const pips = (["W", "U", "B", "R", "G"] as const).filter((c) => s.color.pips[c] > 0).map((c) => `${c}${s.color.pips[c]}`).join(" ");
  const sources = (["W", "U", "B", "R", "G"] as const).filter((c) => s.color.sources[c] > 0).map((c) => `${c}${s.color.sources[c]}`).join(" ");
  const lines = [
    `Total ${s.size.total}${s.size.target ? `/${s.size.target}` : ""} · lands ${s.size.lands} · avg MV ${s.curve.avgMv} · pips ${pips || "—"} · sources ${sources || "—"} · ${money(s.money.total)}`,
  ];
  if (s.flags.gameChangers.length) lines.push(`Game Changers (${s.flags.gameChangers.length}): ${s.flags.gameChangers.join(", ")}`);
  if (s.flags.offIdentity.length) lines.push(`Off-identity (${s.flags.offIdentity.length}): ${s.flags.offIdentity.join(", ")}`);
  if (s.flags.illegal.length) lines.push(`Not commander-legal (${s.flags.illegal.length}): ${s.flags.illegal.join(", ")}`);
  if (s.flags.unresolved.length) lines.push(`Unresolved (${s.flags.unresolved.length}): ${s.flags.unresolved.join(", ")}`);
  if (s.flags.duplicates.length) lines.push(`Duplicates (${s.flags.duplicates.length}): ${s.flags.duplicates.join(", ")}`);
  return lines.join("\n");
}

/** A Markdown view of one list — what the terminal agent reads instead of the old DECK.md. */
export function renderShow(deck: Deck, listId: string, cards: Record<string, CardInfo | undefined>): string {
  const list = deck.lists[listId];
  if (!list) throw new Error(`no list "${listId}" in this deck (have: ${Object.keys(deck.lists).join(", ")})`);

  const out: string[] = [`# ${deck.name} — ${list.label}${list.bracket ? ` (bracket ${list.bracket})` : ""}`, ""];
  for (const section of list.sections) {
    const count = section.cards.reduce((n, c) => n + c.qty, 0);
    out.push(`## ${section.name} (${count})`);
    for (const c of section.cards) {
      const card = cards[c.name];
      const parts = [`${c.qty} ${c.name}`];
      if (card?.gameChanger) parts.push("[GC]");
      if (!card) parts.push("[unresolved]");
      else if (/\bLand\b/.test(card.typeLine.split(" // ")[0])) parts.push(`(${card.producedMana.join("") || "—"}) ${card.typeLine}`);
      else parts.push(`${card.manaCost || "—"} ${card.typeLine}`);

      const meta = deck.cards[c.name];
      const suffix = [...(meta?.tags ?? []).map((t) => `#${t}`), ...(meta?.status ? [meta.status] : [])];
      if (suffix.length) parts.push(` ${suffix.join(" ")}`);
      if (c.note) parts.push(` — ${c.note}`);
      out.push(parts.join(" "));
    }
    out.push("");
  }
  out.push(statsFooter(computeStats(list, cards, deck.cards, deckIdentity(deck, cards))));
  return out.join("\n");
}

function toInfo(s: CardSummary): CardInfo {
  return {
    name: s.name,
    cmc: s.cmc,
    manaCost: s.manaCost,
    typeLine: s.typeLine,
    colors: s.colors,
    colorIdentity: s.colorIdentity,
    producedMana: s.producedMana,
    gameChanger: s.gameChanger,
    usd: s.usd,
    commanderLegal: s.commanderLegal,
  };
}

/** Resolve every name a list (plus any extra names) needs, keyed by the deck's spelling. */
async function cardsFor(names: string[]): Promise<{ cards: Record<string, CardInfo | undefined>; unresolved: string[]; canonical: Record<string, string> }> {
  const { found, unresolved } = await resolveNames(names);
  const cards: Record<string, CardInfo | undefined> = {};
  const canonical: Record<string, string> = {};
  for (const [requested, summary] of Object.entries(found)) {
    cards[requested] = toInfo(summary);
    canonical[requested] = deckName(summary);
    cards[canonical[requested]] = toInfo(summary);
  }
  return { cards, unresolved, canonical };
}

function printChanges(changes: StatChange[]): void {
  if (changes.length === 0) {
    console.log("  (no stat changes)");
    return;
  }
  for (const c of changes) {
    const sign = c.delta > 0 ? "+" : "";
    console.log(`  ${c.label.padEnd(18)} ${String(c.before).padStart(7)} → ${String(c.after).padEnd(7)} (${sign}${c.delta})`);
  }
}

async function runShow(argv: string[]): Promise<void> {
  const { positionals, flags, bare } = readFlags(argv, ["--list"], ["--json"]);
  const slug = positionals[0];
  if (!slug) throw new Error("usage: bun run deck:show <slug> [--list id] [--json]");

  const deck = await readDeck(slug);
  const listId = flags["--list"]?.[0] ?? (deck.lists[MAIN_LIST] ? MAIN_LIST : Object.keys(deck.lists)[0]);
  const list = deck.lists[listId];
  if (!list) throw new Error(`no list "${listId}" (have: ${Object.keys(deck.lists).join(", ")})`);

  const { cards } = await cardsFor([...listNames(list), ...Object.values(deck.lists).flatMap((l) => listNames(l))]);
  if (bare["--json"]) {
    console.log(JSON.stringify({ slug, listId, list, stats: computeStats(list, cards, deck.cards, deckIdentity(deck, cards)) }, null, 2));
    return;
  }
  console.log(renderShow(deck, listId, cards));
}

async function runEdit(argv: string[]): Promise<void> {
  const args = parseEditArgs(argv);
  let entries = args.entries;
  let label = args.label;
  let rationale = args.rationale;

  if (args.jsonFile) {
    const raw = JSON.parse(await readFile(args.jsonFile, "utf8"));
    const fromFile = Array.isArray(raw) ? raw : raw.entries;
    if (!Array.isArray(fromFile)) throw new Error(`${args.jsonFile} must be an array of entries or { entries: [] }`);
    entries = [...fromFile, ...entries];
    label = label || raw.label || "";
    rationale = rationale ?? raw.rationale;
  }
  if (!label) throw new Error("deck:edit needs --label");
  if (entries.length === 0) throw new Error("nothing to do — pass --add/--remove/--move/--qty or --json");

  const deck = await readDeck(args.slug);
  const list = deck.lists[args.listId];
  if (!list) throw new Error(`no list "${args.listId}" (have: ${Object.keys(deck.lists).join(", ")})`);

  const touched = entries.flatMap((e) => [e.name, ...(e.op === "add" && e.replaces ? [e.replaces] : [])]);
  const { cards, unresolved, canonical } = await cardsFor([...listNames(list), ...touched]);
  const unknown = unresolved.filter((n) => touched.some((t) => t.toLowerCase() === n.toLowerCase()));
  if (unknown.length > 0) throw new Error(`Scryfall does not know: ${unknown.join(", ")} — check the spelling`);

  const canonicalEntries: ChangeEntry[] = entries.map((e) => {
    const name = canonical[e.name] ?? e.name;
    if (e.op === "add") return { ...e, name, ...(e.replaces ? { replaces: canonical[e.replaces] ?? e.replaces } : {}) };
    return { ...e, name };
  });

  if (args.dryRun) {
    const preview = applyChangeSet(list, canonicalEntries);
    if (!preview.ok) {
      for (const f of preview.failures) console.error(`  ✗ ${f.entry.op} ${f.entry.name}: ${f.reason}`);
      process.exit(1);
    }
    console.log(`DRY RUN — ${args.slug}/${args.listId}: "${label}"`);
    const identity = deckIdentity(deck, cards);
    printChanges(diffStats(computeStats(list, cards, deck.cards, identity), computeStats(preview.list, cards, deck.cards, identity)));
    return;
  }

  const outcome = await applyToDeck(
    args.slug,
    { listId: args.listId, label, ...(rationale ? { rationale } : {}), author: "user", entries: canonicalEntries },
    cards,
  );
  if (!outcome.ok) {
    for (const f of outcome.failures) console.error(`  ✗ ${f.entry.op} ${f.entry.name}: ${f.reason}`);
    process.exit(1);
  }

  console.log(`${args.slug}/${args.listId}: "${label}" applied — ${listSize(outcome.deck.lists[args.listId])} cards`);
  printChanges(outcome.entry.changes);
  console.log(`  snapshot: ${outcome.entry.snapshot}`);
  for (const p of outcome.moxfield) console.log(`  moxfield: ${p}`);
}

async function runMeta(argv: string[]): Promise<void> {
  const args = parseMetaArgs(argv);
  const deck = await readDeck(args.slug);
  const existing = deck.cards[args.name] ?? {};

  const meta: Partial<CardMeta> = {};
  if (args.tags.length > 0 || args.untags.length > 0) {
    const tags = [...(existing.tags ?? []), ...args.tags].filter((t) => !args.untags.includes(t));
    meta.tags = [...new Set(tags)];
  }
  if (args.status) meta.status = args.status;
  if (args.note !== undefined) meta.note = args.note;
  if (args.printing) meta.printing = args.printing;
  if (Object.keys(meta).length === 0) throw new Error("nothing to change — pass --tag/--untag/--status/--note/--printing");

  const updated = await setCardMeta(args.slug, [{ name: args.name, meta }]);
  console.log(`${args.name}: ${JSON.stringify(updated.cards[args.name] ?? {})}`);
  const inLists = Object.entries(updated.lists).filter(([, l]) => listEntries(l).some((e) => e.name === args.name)).map(([id]) => id);
  if (inLists.length === 0) console.log(`  (note: ${args.name} is in no list of ${args.slug})`);
}

const USAGE = [
  "usage:",
  "  bun run deck:show <slug> [--list id] [--json]",
  '  bun run deck:edit <slug> [--list main] --label "…" [--why "…"] --add "Card@Section" --remove "Card" --move "Card@Section" --qty "Forest=6" [--replaces "Old->New"] [--json file] [--dry-run]',
  '  bun run deck:meta <slug> --card "Name" [--tag t]… [--untag t]… [--status OWNED|BUY|PROXY|CONSIDERING] [--note "…"] [--printing "(LTC) 264"]',
].join("\n");

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  if (command === "show") return runShow(rest);
  if (command === "edit") return runEdit(rest);
  if (command === "meta") return runMeta(rest);

  console.error(USAGE);
  process.exit(command ? 1 : 0);
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}

// Silence the unused-import check for helpers reused by the show renderer's section logic.
void isCommanderSection;
