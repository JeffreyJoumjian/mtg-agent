#!/usr/bin/env bun
/**
 * Keep the pilot's EDHPlay decks (edhplay.com/decks) in step with `deck.json`.
 *
 *   bun run edhplay status                                  # every deck list and its EDHPlay deck
 *   bun run edhplay install                                 # print the helpers to run once per tab
 *   bun run edhplay link <slug> --list <id> --deck <uuid>   # record which EDHPlay deck a list is
 *   bun run edhplay link <slug> --list <id> --unlink
 *   bun run edhplay push <slug> [--list <id>] [--dry-run]   # print the push script for the browser
 *   bun run edhplay create <slug> --list <id> --name "<EDHPlay deck name>" [--folder <uuid>]
 *   bun run edhplay export <uuid>                           # print a script that exports a deck with printings
 *   bun run edhplay page <n>                                # print the script that reads page n of the last result
 *   bun run edhplay backfill <slug> < lines                 # write "B|Name|SET|123" lines as printing pins
 *
 * EDHPlay sits behind Cloudflare, so nothing here talks to it directly. `push`, `create` and
 * `export` print a JavaScript snippet that the agent runs in the pilot's signed-in EDHPlay tab
 * (Claude in Chrome `javascript_tool`). The snippet calls the same API the site's own Import
 * dialog calls (`POST /api/v1/decks/{id}/bulk-import` with `replace: true`), then validates,
 * recalculates the bracket and re-reads the deck to verify it. The `edhplay-sync` skill holds the
 * whole procedure and what the API does.
 *
 * Printing policy (pilot, 2026-11-19): a printing pinned in `deck.json` or `decks/_printings.txt`
 * wins. A card with no pin keeps the printing it already has on EDHPlay (Import & Replace would
 * otherwise reset it to EDHPlay's default), and whatever printing it ends up with comes back as
 * `B|…` lines for `backfill`, which pins it in `deck.json` so the next export is complete.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EDHPLAY_ID, isCommanderSection, listEntries, pickList, type Deck } from "./lib/deck-model.ts";
import { listDeckSlugs, readDeck, regenerateMoxfield, setCardMeta, writeDeck } from "./lib/deck-store.ts";
import { GLOBAL_PRINTINGS_PATH, mergePrintings, parsePrintingRef, parsePrintings, printingsFromMeta } from "./lib/moxfield.ts";
import { REPO_ROOT } from "./lib/paths.ts";

const USAGE = [
  "usage:",
  "  bun run edhplay status",
  "  bun run edhplay install",
  "  bun run edhplay link <slug> --list <id> (--deck <uuid> | --unlink)",
  "  bun run edhplay push <slug> [--list <id>] [--dry-run]",
  '  bun run edhplay create <slug> --list <id> --name "<EDHPlay deck name>" [--folder <uuid>]',
  "  bun run edhplay export <uuid>",
  "  bun run edhplay page <n>",
  "  bun run edhplay backfill <slug> < lines",
].join("\n");

/** One card the push wants on EDHPlay: [qty, name, set or null, collector number or null]. */
type WantRow = [number, string, string | null, string | null];

/** The JavaScript tool returns about 1,000 characters, so every snippet keeps its full report in
 *  `window.__edhOut` and returns the first page; `page <n>` reads the rest. */
const PAGE = 900;

function flag(argv: string[], name: string): string | undefined {
  const i = argv.indexOf(name);
  return i === -1 ? undefined : argv[i + 1];
}

function positionals(argv: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      if (!["--dry-run", "--unlink"].includes(argv[i])) i++;
      continue;
    }
    out.push(argv[i]);
  }
  return out;
}

function printingsFor(deck: Deck): Record<string, string> {
  const globalPath = join(REPO_ROOT, GLOBAL_PRINTINGS_PATH);
  const global = existsSync(globalPath) ? parsePrintings(readFileSync(globalPath, "utf8")) : {};
  return mergePrintings(global, printingsFromMeta(deck.cards));
}

/** The commanders and the other 99 of a list, each with its pinned printing when it has one. */
function wantedRows(deck: Deck, listId: string): { commanders: WantRow[]; cards: WantRow[] } {
  const printings = printingsFor(deck);
  const list = deck.lists[listId];
  const commanders: WantRow[] = [];
  const cards: WantRow[] = [];

  for (const entry of listEntries(list)) {
    const ref = printings[entry.name.split(" // ")[0].trim()];
    const printing = ref ? parsePrintingRef(ref) : null;
    const row: WantRow = [entry.qty, entry.name, printing ? printing.set.toUpperCase() : null, printing ? printing.collectorNumber : null];

    if (isCommanderSection(entry.section)) commanders.push(row);
    else cards.push(row);
  }
  return { commanders, cards };
}

/**
 * The in-page helpers every snippet shares. `api` uses the access token the site keeps in
 * localStorage, exactly as the site's own requests do. A 401 means the token expired: reloading
 * the tab makes the site refresh it.
 */
const PRELUDE = `
const api = async (path, opts = {}) => {
  const res = await fetch('https://api.edhplay.com/api/v1' + path, { ...opts, headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json' } });
  const text = await res.text();
  let body = text;
  try { body = JSON.parse(text); } catch {}
  return { status: res.status, body };
};
const face = (n) => n.split(' // ')[0].trim().toLowerCase();
const out = (text) => { window.__edhOut = text; return text.length > ${PAGE} ? text.slice(0, ${PAGE}) + '\\n[more: bun run edhplay page 1]' : text; };
`;

/** The push body: diff the wanted list against the EDHPlay deck, import with replace, validate,
 *  recalculate the bracket, re-read and verify. Expects DECK, LABEL, DRY, CMD and WANT in scope. */
const PUSH_BODY = `
const r0 = await api('/decks/' + DECK);
if (r0.status === 401) return 'AUTH: the EDHPlay token expired. Reload the tab and run the snippet again.';
if (r0.status !== 200) return 'ERROR: GET deck ' + DECK + ' returned ' + r0.status;
const before = r0.body;
const byName = (deck, zones) => {
  const m = {};
  for (const c of deck.cards) if (zones.includes(c.zone)) {
    const k = face(c.name);
    m[k] = m[k] || { name: c.name, qty: 0, set: c.set_code.toUpperCase(), num: c.collector_number };
    m[k].qty += c.quantity;
  }
  return m;
};
const remote = byName(before, ['main', 'commander']);
const fill = ([qty, name, set, num]) => {
  if (set) return { name, quantity: qty, set_code: set, collector_number: num };
  const r = remote[face(name)];
  return r ? { name, quantity: qty, set_code: r.set, collector_number: r.num } : { name, quantity: qty };
};
const cmd = CMD.map(fill), cards = WANT.map(fill);
const diff = (deck) => {
  const have = byName(deck, ['main', 'commander']);
  const haveCmd = deck.cards.filter((c) => c.zone === 'commander').map((c) => face(c.name)).sort().join(' + ');
  const want = {};
  for (const c of [...cmd, ...cards]) { const k = face(c.name); want[k] = want[k] || { name: c.name, qty: 0, set: c.set_code, num: c.collector_number }; want[k].qty += c.quantity; }
  const lines = [];
  const wantCmd = cmd.map((c) => face(c.name)).sort().join(' + ');
  if (wantCmd !== haveCmd) lines.push('commander: ' + (haveCmd || 'none') + ' -> ' + wantCmd);
  for (const [k, w] of Object.entries(want)) {
    const h = have[k];
    if (!h) lines.push('+' + w.qty + ' ' + w.name);
    else if (h.qty !== w.qty) lines.push('qty ' + w.name + ' ' + h.qty + ' -> ' + w.qty);
    else if (w.set && (h.set.toLowerCase() !== w.set.toLowerCase() || h.num.toLowerCase() !== String(w.num).toLowerCase())) lines.push('art ' + w.name + ' (' + h.set + ') ' + h.num + ' -> (' + w.set + ') ' + w.num);
  }
  for (const [k, h] of Object.entries(have)) if (!want[k]) lines.push('-' + h.qty + ' ' + h.name);
  return lines;
};
const backfillFrom = (deck) => {
  const m = byName(deck, ['main', 'commander']);
  const lines = [...CMD, ...WANT].filter((w) => !w[2] && m[face(w[1])]).map((w) => 'B|' + w[1] + '|' + m[face(w[1])].set + '|' + m[face(w[1])].num);
  return lines.length ? ['BACKFILL ' + lines.length + ':', ...lines] : [];
};
const pending = diff(before);
const head = LABEL + ' -> ' + before.name;
if (pending.length === 0 && before.is_valid && !before.needs_validation) return out(['UNCHANGED ' + head + ' (valid)', ...(DRY ? [] : backfillFrom(before))].join('\\n'));
if (DRY) return out('DRY RUN ' + head + ': ' + pending.length + ' change(s)\\n' + pending.join('\\n'));
let note = '';
if (pending.length > 0) {
  const sideboard = before.cards.filter((c) => c.zone === 'sideboard').map((c) => ({ name: c.name, quantity: c.quantity, set_code: c.set_code.toUpperCase(), collector_number: c.collector_number }));
  const body = { replace: true, lang: 'en', cards, commander: cmd[0], partner_commander: cmd[1], sideboard_cards: sideboard.length ? sideboard : undefined };
  const imp = await api('/decks/' + DECK + '/bulk-import', { method: 'POST', body: JSON.stringify(body) });
  if (imp.status !== 200) return out('ERROR: bulk-import returned ' + imp.status + ' ' + JSON.stringify(imp.body).slice(0, 300));
  const missing = imp.body.not_found_cards || [];
  if (missing.length) note += '\\nNOT FOUND: ' + missing.join(', ');
  if (sideboard.length) note += '\\nsideboard kept: ' + sideboard.length;
}
const val = await api('/decks/' + DECK + '/validate', { method: 'POST' });
const valid = val.body && val.body.is_valid;
if (valid) await api('/decks/' + DECK + '/calculate-bracket', { method: 'POST' });
const r1 = await api('/decks/' + DECK);
const after = r1.body;
const left = diff(after);
return out([
  'PUSHED ' + head + ': ' + pending.length + ' change(s), ' + (valid ? 'valid' : 'INVALID ' + JSON.stringify(val.body && val.body.errors)) + ', bracket ' + after.bracket_level + ', verify ' + (left.length ? 'FAILED' : 'ok') + note,
  ...pending,
  ...(left.length ? ['STILL DIFFERENT:', ...left] : []),
  ...backfillFrom(after),
].join('\\n'));
`;

/** Installs `window.__edh` in the tab: the helpers plus `push(DECK, LABEL, DRY, CMD, WANT)`. It
 *  lasts until the tab navigates, so the per-deck snippets stay small. */
function installSnippet(): string {
  return `(() => {${PRELUDE}
window.__edh = { api, face, out, push: async (DECK, LABEL, DRY, CMD, WANT) => {${PUSH_BODY}} };
return 'INSTALLED edhplay helpers in ' + location.host;
})()`;
}

/** Every per-deck snippet runs through the installed helpers and says so when they're missing. */
function viaInstalled(body: string): string {
  // `await` up front: the JavaScript tool returns a bare promise as {} instead of awaiting it.
  return `await (async () => {
if (!window.__edh) return 'NOT INSTALLED: run the snippet from "bun run edhplay install" in this tab first.';
const { api, out } = window.__edh;
${body}
})()`;
}

function pushSnippet(deck: Deck, slug: string, listId: string, deckId: string, dry: boolean): string {
  const { commanders, cards } = wantedRows(deck, listId);
  return viaInstalled(
    `return window.__edh.push(${JSON.stringify(deckId)}, ${JSON.stringify(`${slug}/${listId}`)}, ${dry}, ${JSON.stringify(commanders)}, ${JSON.stringify(cards)});`,
  );
}

async function runStatus(): Promise<void> {
  for (const slug of await listDeckSlugs()) {
    const deck = await readDeck(slug);
    for (const [id, list] of Object.entries(deck.lists)) {
      if (list.kind !== "deck") continue;
      console.log(`${`${slug}/${id}`.padEnd(36)} ${list.edhplay ? `https://edhplay.com/decks/${list.edhplay}` : "not on EDHPlay"}`);
    }
  }
}

async function runLink(argv: string[]): Promise<void> {
  const [slug] = positionals(argv);
  const listId = flag(argv, "--list");
  const deckId = flag(argv, "--deck");
  const unlink = argv.includes("--unlink");
  if (!slug || !listId || (!deckId && !unlink)) throw new Error(USAGE);
  if (deckId && !EDHPLAY_ID.test(deckId)) throw new Error(`--deck wants an EDHPlay deck id (a UUID), got "${deckId}"`);

  const deck = await readDeck(slug);
  const list = deck.lists[listId];
  if (!list) throw new Error(`${slug} has no list "${listId}" (lists: ${Object.keys(deck.lists).join(", ")})`);

  const { edhplay: _old, ...rest } = list;
  deck.lists[listId] = unlink ? rest : { ...rest, edhplay: deckId };
  await writeDeck(slug, deck);
  console.log(unlink ? `${slug}/${listId}: unlinked from EDHPlay` : `${slug}/${listId} -> https://edhplay.com/decks/${deckId}`);
}

async function runPush(argv: string[]): Promise<void> {
  const [slug] = positionals(argv);
  if (!slug) throw new Error(USAGE);

  const deck = await readDeck(slug);
  const { id, list } = pickList(deck, flag(argv, "--list"));
  if (!list.edhplay) {
    throw new Error(`${slug}/${id} isn't linked to an EDHPlay deck. Link it with "bun run edhplay link", or it isn't played.`);
  }
  console.log(pushSnippet(deck, slug, id, list.edhplay, argv.includes("--dry-run")));
}

async function runCreate(argv: string[]): Promise<void> {
  const [slug] = positionals(argv);
  const listId = flag(argv, "--list");
  const name = flag(argv, "--name");
  const folder = flag(argv, "--folder");
  if (!slug || !listId || !name) throw new Error(USAGE);
  if (folder && !EDHPLAY_ID.test(folder)) throw new Error(`--folder wants an EDHPlay folder id (a UUID), got "${folder}"`);

  const deck = await readDeck(slug);
  if (!deck.lists[listId]) throw new Error(`${slug} has no list "${listId}"`);
  if (deck.lists[listId].edhplay) throw new Error(`${slug}/${listId} is already linked to ${deck.lists[listId].edhplay}`);

  const { commanders, cards } = wantedRows(deck, listId);
  const body = `
const created = await api('/decks', { method: 'POST', body: JSON.stringify({ name: ${JSON.stringify(name)}, format: 'commander', folder_id: ${JSON.stringify(folder ?? null)} }) });
if (created.status === 401) return 'AUTH: the EDHPlay token expired. Reload the tab and run the snippet again.';
if (created.status !== 200 && created.status !== 201) return 'ERROR: create returned ' + created.status + ' ' + JSON.stringify(created.body).slice(0, 300);
window.__edhOut = '';
const pushed = await window.__edh.push(created.body.id, ${JSON.stringify(`${slug}/${listId}`)}, false, ${JSON.stringify(commanders)}, ${JSON.stringify(cards)});
return out('CREATED ' + created.body.id + '\\n' + (window.__edhOut || pushed));
`;
  console.log(viaInstalled(body));
}

function runExport(argv: string[]): void {
  const [deckId] = positionals(argv);
  if (!deckId || !EDHPLAY_ID.test(deckId)) throw new Error(USAGE);

  // Same layout as the site's Export dialog with "Include Printings" on: commander, a blank line,
  // then the rest, then sideboard and tokens under their own headers.
  const body = `
const r = await api('/decks/' + ${JSON.stringify(deckId)});
if (r.status === 401) return 'AUTH: the EDHPlay token expired. Reload the tab and run the snippet again.';
if (r.status !== 200) return 'ERROR: GET deck returned ' + r.status;
const line = (c) => c.quantity + ' ' + c.name + ' (' + c.set_code.toUpperCase() + ') ' + c.collector_number;
const zone = (z) => r.body.cards.filter((c) => c.zone === z).sort((a, b) => a.name.localeCompare(b.name)).map(line);
const parts = ['# ' + r.body.name, ...zone('commander'), '', ...zone('main')];
for (const [z, title] of [['sideboard', 'Sideboard'], ['token', 'Tokens']]) { const l = zone(z); if (l.length) parts.push('', title, ...l); }
return out(parts.join('\\n'));
`;
  console.log(viaInstalled(body));
}

function runPage(argv: string[]): void {
  const n = Number(positionals(argv)[0]);
  if (!Number.isInteger(n) || n < 1) throw new Error(USAGE);

  console.log(
    `(() => { const t = window.__edhOut || 'NO RESULT: run the push or export snippet first, in this tab.'; const s = t.slice(${n * PAGE}, ${(n + 1) * PAGE}); return s + (t.length > ${(n + 1) * PAGE} ? '\\n[more: bun run edhplay page ${n + 1}]' : '\\n[end]'); })()`,
  );
}

async function runBackfill(argv: string[]): Promise<void> {
  const [slug] = positionals(argv);
  if (!slug) throw new Error(USAGE);

  const text = await Bun.stdin.text();
  const deck = await readDeck(slug);
  const updates: Parameters<typeof setCardMeta>[1] = [];
  for (const raw of text.split("\n")) {
    const m = raw.trim().match(/^B\|(.+)\|([A-Za-z0-9]+)\|(\S+)$/);
    if (!m) continue;

    const [, name, set, collectorNumber] = m;
    if (deck.cards[name]?.printing) continue;
    updates.push({ name, meta: { printing: { set: set.toLowerCase(), collectorNumber } } });
  }
  if (updates.length === 0) {
    console.log(`${slug}: nothing to back-fill`);
    return;
  }

  const updated = await setCardMeta(slug, updates);
  await regenerateMoxfield(slug, updated);
  for (const u of updates) console.log(`  pinned ${u.name} (${u.meta.printing?.set.toUpperCase()}) ${u.meta.printing?.collectorNumber}`);
  console.log(`${slug}: ${updates.length} printing(s) pinned, MOXFIELD files regenerated`);
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  if (command === "status") return runStatus();
  if (command === "install") return void console.log(installSnippet());
  if (command === "link") return runLink(rest);
  if (command === "push") return runPush(rest);
  if (command === "create") return runCreate(rest);
  if (command === "export") return runExport(rest);
  if (command === "page") return runPage(rest);
  if (command === "backfill") return runBackfill(rest);
  console.log(USAGE);
  process.exit(command ? 1 : 0);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
