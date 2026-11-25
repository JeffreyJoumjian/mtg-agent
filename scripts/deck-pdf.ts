#!/usr/bin/env bun
/**
 * Generate a printable reference PDF (decklist, recent swaps, sideboard, appendix) per deck list.
 *
 *   bun run deck:pdf <deck-slug> [list-id]   one list, or `main` plus every list on EDHPlay
 *   bun run deck:pdf --all                    the same for every deck
 *
 * Reads, per list:
 *   decks/<slug>/deck.json              the list, its header stats and curve
 *   decks/<slug>/history.jsonl          the recent swaps made to that list
 *   decks/<slug>/research/sideboard.md  the sideboard rows whose displaced card is in that list
 *   decks/<slug>/pdf.json               optional: footer and appendix docs (see PdfData)
 *
 * Writes `decks/<slug>/<slug>-reference.pdf` for `main` and `<slug>-<list-id>-reference.pdf` for
 * every other list, so each played list has its own current reference.
 *
 * Card images are fetched from Scryfall once and cached in the git-ignored
 * `data/card-images/`, so re-runs are offline and instant.
 *
 * Rendering uses headless Chrome (macOS/Linux paths probed below) — no npm deps.
 */

import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { REPO_ROOT } from "./lib/paths.ts";
import { resolveNames } from "./lib/card-cache.ts";
import {
  commandersOf,
  isCommanderSection,
  listNames,
  MAIN_LIST,
  pickList,
  type Deck,
  type DeckList,
} from "./lib/deck-model.ts";
import { listDeckSlugs, readDeck, readHistory, type HistoryEntry } from "./lib/deck-store.ts";
import { computeStats } from "./lib/deck-stats.ts";
import type { CardSummary } from "./lib/scryfall.ts";
import { join } from "node:path";

// ---------------------------------------------------------------- types

/**
 * A card reference. `set` pins which printing's art is used — worth setting for
 * basic lands, whose default Scryfall printing is often a full-art/borderless
 * treatment that reads badly in a printed reference.
 */
type CardRef = { name: string; cost?: string; set?: string };

/** One `OUT -> IN` substitution, rendered as a paired row. */
type Swap = {
  /** Card coming in. */
  in: CardRef & { text: string };
  /** Card going out. */
  out: CardRef & { text: string };
  /** Why the swap was made, dated. */
  why: string;
  /** When the OUT card comes back, from its sideboard row. Absent when no row names it. */
  back?: string;
};

/** A card held in the sideboard with its bring-in trigger. */
type SideboardCard = CardRef & { when: string };

/** Everything the reference shows besides the decklist and the appendix. */
type Reference = {
  title: string;
  subtitle: string;
  /** Stat chips across the header, e.g. `[["Lands", "34"], ...]`. */
  stats: [string, string][];
  /** The list's most recent swaps, newest first. */
  swaps: Swap[];
  sideboard: SideboardCard[];
  footer?: string;
};

/** Basics default to a plain black-bordered printing unless `set` says otherwise. */
const DEFAULT_BASIC_SET = "m21";
const BASICS = ["Plains", "Island", "Swamp", "Mountain", "Forest"];

/** How many of a list's swaps the reference shows. */
const SWAP_LIMIT = 12;

/**
 * Contents of the optional `decks/<slug>/pdf.json`: the hand-written parts of the reference. The
 * header, the swaps and the sideboard are derived from the deck's own files, so they can't drift.
 */
type PdfData = {
  /** Footer note under the sideboard. */
  footer?: string;
  /**
   * Markdown documents appended after the sideboard, each starting a new page, relative to the
   * deck folder. Defaults to `research/gameplan.md` when it exists.
   */
  appendix?: string[];
  /** Per-list overrides keyed by list id, for a variant with its own gameplan or footer. */
  lists?: Record<string, { footer?: string; appendix?: string[] }>;
};

/** One row of a `research/sideboard.md` table, as written there. */
export type SideboardRow = { card: string; when: string; displaces: string };

/** One swap read from `history.jsonl`. */
export type HistorySwap = { at: string; in: string; out: string; why: string };

/** A table cell with link, bold and code marks stripped: `[Sol Ring](…)` → `Sol Ring`. */
const plainCell = (cell: string) =>
  cell.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*|`/g, "").trim();

/** The card a sideboard row brings in: its link text, else its bold text, else the text before ` (`. */
function rowCard(cell: string): string {
  const link = cell.match(/\[([^\]]+)\]\(/);
  if (link) return link[1].trim();

  const bold = cell.match(/\*\*([^*]+)\*\*/);
  if (bold) return bold[1].trim();

  return plainCell(cell).split(" (")[0].trim();
}

/**
 * Every row of every table in a sideboard doc that names a card and the card it displaces.
 * Decks word their columns differently (`Displaces`, `Displaces in \`combat\``, `Replaced by`,
 * `IN | OUT`), so columns are found by header, and a table without both is skipped. The "when"
 * text prefers a bring-in column, then "What it does", then a "Why" column.
 */
export function parseSideboard(md: string): SideboardRow[] {
  const cells = (line: string) => line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const isRow = (line: string | undefined) => (line ?? "").trim().startsWith("|");
  const isSeparator = (line: string | undefined) => /^\|[\s:|-]+\|\s*$/.test((line ?? "").trim());
  const lines = md.split("\n");
  const rows: SideboardRow[] = [];

  let i = 0;
  while (i < lines.length) {
    if (!isRow(lines[i]) || !isSeparator(lines[i + 1])) {
      i++;
      continue;
    }

    const header = cells(lines[i]).map(plainCell);
    const cardCol = header.findIndex((h) => /^(card|in)$/i.test(h));
    const displacesCol = header.findIndex((h) => /displac|replaced by|^out$/i.test(h));
    const whenCol =
      [/bring|when|against/i, /what it does/i, /why/i]
        .map((re) => header.findIndex((h, col) => col !== cardCol && col !== displacesCol && re.test(h)))
        .find((col) => col >= 0) ?? -1;

    i += 2;
    while (isRow(lines[i])) {
      const row = cells(lines[i]);
      const card = cardCol >= 0 ? rowCard(row[cardCol] ?? "") : "";

      if (card && displacesCol >= 0) {
        rows.push({
          card,
          when: whenCol >= 0 ? plainCell(row[whenCol] ?? "") : "",
          displaces: plainCell(row[displacesCol] ?? ""),
        });
      }
      i++;
    }
  }
  return rows;
}

/**
 * The sideboard rows that apply to one list: the card isn't already in it, and its displaces cell
 * names a card that is. A card listed in two tables keeps its first row.
 */
export function sideboardForList(
  rows: SideboardRow[],
  listCards: string[],
): (SideboardRow & { displaced: string[] })[] {
  const inList = listCards.map((name) => frontFace(name).toLowerCase());
  const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const kept: Record<string, true> = {};
  const out: (SideboardRow & { displaced: string[] })[] = [];

  for (const row of rows) {
    const key = frontFace(row.card).toLowerCase();
    if (inList.includes(key) || kept[key]) continue;

    const cell = row.displaces.toLowerCase();
    const displaced = listCards.filter((name) =>
      new RegExp(`(^|[^a-z])${escapeRe(frontFace(name).toLowerCase())}($|[^a-z])`).test(cell),
    );
    if (!displaced.length) continue;

    kept[key] = true;
    out.push({ ...row, displaced });
  }
  return out;
}

/** A list's swaps from `history.jsonl`, newest first: every add that names the card it replaces. */
export function historySwaps(
  history: Pick<HistoryEntry, "at" | "listId" | "label" | "rationale" | "entries">[],
  listId: string,
  limit: number,
): HistorySwap[] {
  return history
    .filter((h) => h.listId === listId)
    .sort((a, b) => b.at.localeCompare(a.at))
    .flatMap((h) =>
      h.entries.flatMap((e) =>
        e.op === "add" && e.replaces
          ? [{ at: h.at.slice(0, 10), in: e.name, out: e.replaces, why: e.why ?? h.rationale ?? h.label }]
          : [],
      ),
    )
    .slice(0, limit);
}

// ---------------------------------------------------------------- helpers

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Scryfall prints double-faced cards under the full "A // B" name; we key on the front face. */
const frontFace = (name: string) => name.split(" // ")[0].split(" / ")[0].trim();

/**
 * Chrome/Chromium locations to probe, per platform.
 *
 * Windows paths are resolved from the environment rather than hardcoded to `C:\`, because
 * "Program Files" is localized and Chrome may be installed per-user under `%LOCALAPPDATA%`.
 * Edge is probed last on Windows: it's Chromium underneath and ships with the OS, so it
 * saves a fresh machine from needing a Chrome install just to print a deck reference.
 */
function chromeCandidates(): string[] {
  if (process.platform === "win32") {
    const roots = [
      process.env.LOCALAPPDATA,
      process.env.PROGRAMFILES,
      process.env["PROGRAMFILES(X86)"],
    ].filter((root): root is string => Boolean(root));

    return [
      ...roots.map((root) => join(root, "Google", "Chrome", "Application", "chrome.exe")),
      ...roots.map((root) => join(root, "Chromium", "Application", "chrome.exe")),
      ...roots.map((root) => join(root, "Microsoft", "Edge", "Application", "msedge.exe")),
    ];
  }

  if (process.platform === "darwin") {
    return [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ];
  }

  return ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"];
}

function findChrome(): string {
  const candidates = chromeCandidates();
  const found = candidates.find((p) => existsSync(p));

  if (!found) {
    throw new Error(
      `No Chrome/Chromium found. Looked in:\n  ${candidates.join("\n  ")}\n` +
        `Install Google Chrome, or set one of those paths.`,
    );
  }
  return found;
}

// ---------------------------------------------------------------- images

const IMAGE_DIR = join(REPO_ROOT, "data", "card-images");

/**
 * Fetch `normal`-size images for every named card, caching to disk.
 * Returns a name -> data-URI map so the generated HTML is fully self-contained.
 */
async function loadImages(refs: CardRef[]): Promise<Record<string, string>> {
  mkdirSync(IMAGE_DIR, { recursive: true });
  const safe = (n: string) => n.replace(/[^a-z0-9]+/gi, "_").toLowerCase();

  /** Dedupe by front-face name, keeping any pinned set. */
  const byName = new Map<string, string | undefined>();
  for (const r of refs) {
    const name = frontFace(r.name);
    if (!name) continue;
    const set = r.set ?? (BASICS.includes(name) ? DEFAULT_BASIC_SET : undefined);
    if (!byName.has(name) || (set && !byName.get(name))) byName.set(name, set);
  }
  const wanted = [...byName.keys()];

  const cached = new Set(readdirSync(IMAGE_DIR).map((f) => f.replace(/\.jpg$/, "")));
  const missing = wanted.filter((n) => !cached.has(safe(n)));

  if (missing.length) {
    console.log(`fetching ${missing.length} card image(s) from Scryfall…`);
    for (let i = 0; i < missing.length; i += 75) {
      const chunk = missing.slice(i, i + 75);
      const res = await fetch("https://api.scryfall.com/cards/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json", "User-Agent": "mtg-agent/1.0" },
        body: JSON.stringify({
          identifiers: chunk.map((name) => {
            const set = byName.get(name);
            return set ? { name, set } : { name };
          }),
        }),
      });
      const body = (await res.json()) as any;
      for (const notFound of body.not_found ?? []) {
        console.warn(`  ! no image for "${notFound.name}"`);
      }
      for (const card of body.data ?? []) {
        const uri = card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal;
        if (!uri) continue;
        const img = await fetch(uri, { headers: { "User-Agent": "mtg-agent/1.0" } });
        const bytes = Buffer.from(await img.arrayBuffer());
        await Bun.write(join(IMAGE_DIR, `${safe(frontFace(card.name))}.jpg`), bytes);
        await Bun.sleep(60); // be polite to Scryfall
      }
    }
  }

  const out: Record<string, string> = {};
  for (const name of wanted) {
    const path = join(IMAGE_DIR, `${safe(name)}.jpg`);
    if (!existsSync(path)) continue;
    const bytes = Buffer.from(await Bun.file(path).arrayBuffer());
    out[name] = `data:image/jpeg;base64,${bytes.toString("base64")}`;
  }
  return out;
}

// ---------------------------------------------------------------- mana symbols

const SYMBOL_DIR = join(REPO_ROOT, "data", "card-symbols");

/**
 * Fetch Scryfall's official mana-symbol SVGs once and cache them.
 * Returns a `"{B}" -> data-URI` map so symbols render exactly as printed on cards.
 */
async function loadSymbols(): Promise<Record<string, string>> {
  mkdirSync(SYMBOL_DIR, { recursive: true });
  const manifest = join(SYMBOL_DIR, "index.json");

  if (!existsSync(manifest)) {
    console.log("fetching mana symbols from Scryfall…");
    const res = await fetch("https://api.scryfall.com/symbology", {
      headers: { "User-Agent": "mtg-agent/1.0" },
    });
    const body = (await res.json()) as any;
    const index: Record<string, string> = {};
    for (const sym of body.data ?? []) {
      if (!sym.svg_uri) continue;
      const file = `${sym.symbol.replace(/[^a-z0-9]/gi, "")}.svg`;
      const svg = await fetch(sym.svg_uri, { headers: { "User-Agent": "mtg-agent/1.0" } });
      await Bun.write(join(SYMBOL_DIR, file), await svg.text());
      index[sym.symbol] = file;
    }
    await Bun.write(manifest, JSON.stringify(index));
  }

  const index: Record<string, string> = await Bun.file(manifest).json();
  const out: Record<string, string> = {};
  for (const [symbol, file] of Object.entries(index)) {
    const path = join(SYMBOL_DIR, file);
    if (!existsSync(path)) continue;
    const svg = await Bun.file(path).text();
    out[symbol] = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  }
  return out;
}

/** Turn a mana-cost string like `"{2}{B}{B}"` into inline symbol images. */
function renderMana(cost: string, symbols: Record<string, string>): string {
  const parts = cost.match(/\{[^}]+\}/g) ?? [];
  return parts
    .map((p) => (symbols[p] ? `<img class="ms" src="${symbols[p]}" alt="${esc(p)}">` : esc(p)))
    .join("");
}


// ---------------------------------------------------------------- markdown

/**
 * Minimal Markdown -> HTML for appendix documents: headings, tables, fenced code,
 * blockquotes, lists, rules, and inline bold/italic/code. Mana symbols in prose
 * (`{B}`) become real symbols; inside code fences they stay as text so the
 * monospace alignment of the formula blocks survives.
 */
function renderMarkdown(md: string, symbols: Record<string, string>): string {
  /** Escape, then apply inline markdown, then swap {B}-style tokens for real symbols. */
  const inline = (t: string) =>
    esc(t)
      .replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`)
      .replace(/\*\*([^*]+)\*\*/g, (_m, c) => `<strong>${c}</strong>`)
      .replace(/(^|[^*])\*([^*\n]+)\*/g, (_m, pre, c) => `${pre}<em>${c}</em>`)
      .replace(/\{[^}\s]{1,6}\}/g, (sym) =>
        symbols[sym] ? `<img class="ms" src="${symbols[sym]}" alt="${sym}">` : sym,
      );

  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  let list: "ul" | "ol" | null = null;
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {                                   // fenced code
      closeList();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
      i++;
      out.push(`<pre>${esc(buf.join("\n"))}</pre>`);
      continue;
    }

    const head = line.match(/^(#{1,4})\s+(.*)$/);
    if (head) {
      closeList();
      out.push(`<h${head[1].length + 2} class="md">${inline(head[2])}</h${head[1].length + 2}>`);
      i++; continue;
    }

    if (/^\|.*\|\s*$/.test(line) && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? "")) {
      closeList();                                                   // table
      const cells = (r: string) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const header = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        `<table><thead><tr>${header.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>` +
          rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("") +
          `</tbody></table>`,
      );
      continue;
    }

    if (/^>\s?/.test(line)) {                                        // blockquote
      closeList();
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    if (/^---+\s*$/.test(line)) { closeList(); out.push("<hr>"); i++; continue; }

    const li = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (li) {
      const want = /^\d/.test(li[2]) ? "ol" : "ul";
      if (list !== want) { closeList(); out.push(`<${want}>`); list = want; }
      out.push(`<li>${inline(li[3])}</li>`);
      i++; continue;
    }

    if (!line.trim()) { closeList(); i++; continue; }

    closeList();
    // Join consecutive plain lines into one paragraph so **bold** spanning a
    // line break still resolves.
    const para: string[] = [];
    const isSpecial = (l: string) =>
      !l.trim() ||
      l.startsWith("```") ||
      /^#{1,4}\s/.test(l) ||
      /^>\s?/.test(l) ||
      /^---+\s*$/.test(l) ||
      /^\|.*\|\s*$/.test(l) ||
      /^(\s*)([-*]|\d+\.)\s+/.test(l);
    while (i < lines.length && !isSpecial(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  closeList();
  return out.join("");
}

// ---------------------------------------------------------------- card metadata

/**
 * Mana cost / MV / type / produced-mana for every named card, from the shared card cache
 * (`data/card-cache.json`). `meta` is keyed by lower-cased front face for the renderer, `found`
 * by the requested name for `computeStats`.
 */
async function loadDeckMeta(
  names: string[],
): Promise<{ meta: Record<string, CardSummary>; found: Record<string, CardSummary> }> {
  const { found, unresolved } = await resolveNames(names);
  for (const nf of unresolved) console.warn(`  ! no card data for "${nf}"`);

  const meta: Record<string, CardSummary> = {};
  for (const [name, card] of Object.entries(found)) meta[frontFace(name).toLowerCase()] = card;
  return { meta, found };
}

// ---------------------------------------------------------------- html

/**
 * Render the list's sections into a three-column checklist.
 * Nonland cards get their mana cost + MV; lands get the mana they can produce.
 */
function renderDecklist(
  list: DeckList,
  meta: Record<string, any>,
  symbols: Record<string, string>,
  identity: Set<string>,
): string {
  let html = "";
  for (const section of list.sections) {
    if (section.cards.length === 0) continue;

    const count = section.cards.reduce((n, c) => n + c.qty, 0);
    const heading = `${section.name} (${count})`;
    const items = section.cards.map((entry) => {
      const qty = String(entry.qty);
      const name = entry.name;
      const card = meta[frontFace(name).toLowerCase()];
      if (!card) return `<li><span class="q">${qty}</span> ${esc(name)}</li>`;

      const isLand = (card.typeLine ?? "").includes("Land");
      let right = "";
      if (isLand) {
        // Show only mana relevant to this deck — Command Tower reads WUBRG on Scryfall.
        const produced: string[] = (card.producedMana ?? []).filter(
          (c: string) => c === "C" || identity.has(c),
        );
        right = produced.map((c) => renderMana(`{${c}}`, symbols)).join("");
      } else {
        right =
          renderMana(card.manaCost ?? "", symbols) +
          `<span class="mv">${card.cmc ?? 0}</span>`;
      }
      return `<li><span class="q">${qty}</span> ${esc(name)}<span class="mana">${right}</span></li>`;
    });

    html += `<div class="dgroup"><h3>${esc(heading.trim())}</h3><ul>${items.join("")}</ul></div>`;
  }
  return html;
}

const CSS = `
@page { size: letter; margin: 7mm 7mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system,"Helvetica Neue",Arial,sans-serif; font-size:9.5pt; line-height:1.32; color:#000; background:#fff; margin:0; }
h1 { font-size:17pt; margin:0 0 2pt; }
h2 { font-size:12.5pt; margin:0 0 5pt; padding-bottom:3pt; border-bottom:2px solid #000; page-break-after:avoid; }
h2.sb { margin-top:12pt; }
h3 { font-size:9.5pt; margin:0 0 3pt; text-transform:uppercase; letter-spacing:.4px; border-bottom:1px solid #999; padding-bottom:2pt; }
.sub { color:#444; font-size:9pt; margin-bottom:9pt; }
.stats { display:flex; flex-wrap:wrap; gap:4pt 14pt; font-size:8.5pt; margin-bottom:9pt; padding:6pt 8pt; border:1px solid #000; }
.cols { column-count:3; column-gap:12pt; }
.dgroup { break-inside:avoid; margin-bottom:8pt; }
.dgroup ul { margin:0; padding:0; list-style:none; }
.dgroup li { font-size:8.2pt; display:flex; align-items:center; gap:2.5pt; line-height:1.5; }
.q { color:#666; flex:0 0 auto; }
.mana { margin-left:auto; display:flex; align-items:center; gap:.7px; white-space:nowrap; padding-left:3pt; }
.ms { width:8.5px; height:8.5px; display:block; }
.mv { font-size:6.8pt; color:#555; margin-left:2.5pt; min-width:7px; text-align:right; }
.page { page-break-before:always; }
/* Top-level sections. Each .sec.brk starts a fresh page; the decklist is section 1 and
   opens the document, so it doesn't need one. Swaps and the sideboard share one section
   deliberately - they are the same idea (what moves in and out of the 100). */
.sec { break-inside:auto; }
.sec.brk { page-break-before:always; }
.swap { break-inside:avoid; border:1px solid #000; padding:5pt 7pt; margin-bottom:5pt; }
.pair { display:flex; align-items:flex-start; gap:5pt; }
.side { display:flex; gap:6pt; flex:1; align-items:flex-start; }
.side.out { justify-content:flex-end; }
.side img { width:68px; height:auto; flex:0 0 68px; }
.tag { font-size:7pt; font-weight:700; letter-spacing:.5px; border:1px solid #000; padding:1pt 3pt; margin-top:2pt; }
.sd { flex:1; }
.sd.right { text-align:right; }
.nm { font-weight:700; font-size:10pt; }
.cost { font-weight:400; color:#555; font-size:8.5pt; }
.blurb { font-size:8.2pt; margin-top:2pt; }
.arrow { font-size:15pt; align-self:center; padding:0 2pt; }
.notes { display:flex; gap:14pt; margin-top:4pt; padding-top:3.5pt; border-top:1px solid #bbb; }
.why { flex:1; font-size:8.2pt; }
.back { flex:1; font-size:8.2pt; color:#333; border-left:1px solid #ddd; padding-left:10pt; }
.grid { display:grid; grid-template-columns:1fr 1fr; gap:8pt 12pt; }
.cell { display:flex; gap:7pt; break-inside:avoid; border-bottom:1px solid #ddd; padding-bottom:6pt; }
.cell img { width:74px; height:auto; flex:0 0 74px; }
.ctxt { flex:1; }
.foot { margin-top:10pt; font-size:8pt; color:#555; }
.md-body { font-size:8.3pt; line-height:1.4; }
.md-body h3.md { font-size:14pt; margin:0 0 6pt; padding-bottom:3pt; border-bottom:2px solid #000; }
.md-body h4.md { font-size:10.5pt; margin:11pt 0 4pt; padding-bottom:2pt; border-bottom:1px solid #999; page-break-after:avoid; }
.md-body h5.md { font-size:9pt; margin:8pt 0 3pt; font-weight:700; page-break-after:avoid; }
.md-body h6.md { font-size:8.5pt; margin:6pt 0 2pt; font-weight:700; page-break-after:avoid; }
.md-body p { margin:0 0 4pt; }
.md-body ul, .md-body ol { margin:0 0 5pt; padding-left:14pt; }
.md-body li { margin-bottom:1.5pt; }
.md-body table { border-collapse:collapse; width:100%; margin:0 0 6pt; font-size:7.8pt; break-inside:avoid; }
.md-body th, .md-body td { border:1px solid #bbb; padding:2pt 4pt; text-align:left; vertical-align:top; }
.md-body th { background:#eee; font-weight:700; }
.md-body pre { background:#f4f4f4; border:1px solid #ddd; padding:4pt 6pt; margin:0 0 6pt; font-family:"SF Mono",Menlo,Consolas,monospace; font-size:7.4pt; line-height:1.3; white-space:pre-wrap; break-inside:avoid; }
.md-body code { font-family:"SF Mono",Menlo,Consolas,monospace; font-size:7.6pt; background:#f0f0f0; padding:0 2px; }
.md-body blockquote { margin:0 0 6pt; padding:4pt 8pt; border-left:3px solid #000; background:#f7f7f7; }
.md-body hr { border:0; border-top:1px solid #ccc; margin:8pt 0; }
.md-body .ms { display:inline-block; vertical-align:-1px; }
`;

function buildHtml(
  ref: Reference,
  list: DeckList,
  img: Record<string, string>,
  meta: Record<string, CardSummary>,
  symbols: Record<string, string>,
  identity: Set<string>,
  appendix: { title: string; html: string }[],
): string {
  const src = (name: string) => img[frontFace(name)] ?? "";
  const costTag = (c?: string) => (c ? ` <span class="cost">${esc(c)}</span>` : "");

  const swaps = ref.swaps;
  const sideboard = [...ref.sideboard].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );

  const swapRows = swaps
    .map(
      (s) => `
<div class="swap">
  <div class="pair">
    <div class="side inn">
      <div class="tag">IN</div><img src="${src(s.in.name)}" alt="">
      <div class="sd"><div class="nm">${esc(s.in.name)}${costTag(s.in.cost)}</div><div class="blurb">${esc(s.in.text)}</div></div>
    </div>
    <div class="arrow">&#8596;</div>
    <div class="side out">
      <div class="sd right"><div class="nm">${esc(s.out.name)}${costTag(s.out.cost)}</div><div class="blurb">${esc(s.out.text)}</div></div>
      <img src="${src(s.out.name)}" alt=""><div class="tag">OUT</div>
    </div>
  </div>
  <div class="notes">
    <div class="why"><b>Why:</b> ${esc(s.why)}</div>
    ${s.back ? `<div class="back"><b>Bring back:</b> ${esc(s.back)}</div>` : ""}
  </div>
</div>`,
    )
    .join("");

  const sbCells = sideboard
    .map(
      (c) => `
<div class="cell"><img src="${src(c.name)}" alt="">
<div class="ctxt"><div class="nm">${esc(c.name)}${costTag(c.cost)}</div><div class="blurb"><b>Bring in:</b> ${esc(c.when)}</div></div></div>`,
    )
    .join("");

  const statChips = ref.stats
    .map(([k, v]) => `<span><b>${esc(k)}</b> ${esc(v)}</span>`)
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(ref.title)}</title>
<style>${CSS}</style></head><body>

<h1>${esc(ref.title)}</h1>
<div class="sub">${esc(ref.subtitle)}</div>
${statChips ? `<div class="stats">${statChips}</div>` : ""}
<section class="sec"><div class="cols">${renderDecklist(list, meta, symbols, identity)}</div></section>

${
  swaps.length || sideboard.length
    ? `<section class="sec brk">
${swaps.length ? `<h2>Recent swaps &mdash; the last ${swaps.length} changes to this list, newest first</h2>${swapRows}` : ""}
${sideboard.length ? `<h2 class="sb">Sideboard &mdash; what to bring in, and when</h2><div class="grid">${sbCells}</div>` : ""}
</section>`
    : ""
}
${ref.footer ? `<div class="foot">${esc(ref.footer)}</div>` : ""}
${appendix.map((a) => `<section class="sec brk"><div class="md-body">${a.html}</div></section>`).join("")}

</body></html>`;
}

// ---------------------------------------------------------------- main

/** The lists a deck gets a reference for: `main` plus every list on EDHPlay, else its first list. */
function listsToRender(deck: Deck): string[] {
  const ids = Object.keys(deck.lists).filter(
    (id) => deck.lists[id].kind === "deck" && (id === MAIN_LIST || deck.lists[id].edhplay),
  );
  return ids.length ? ids : [pickList(deck).id];
}

/** Build one list's reference PDF from the deck's own files and print where it went. */
async function renderList(slug: string, deck: Deck, listId: string, symbols: Record<string, string>): Promise<void> {
  const deckDir = join(REPO_ROOT, "decks", slug);
  const list = deck.lists[listId];

  let data: PdfData = {};
  const dataPath = join(deckDir, "pdf.json");
  if (existsSync(dataPath)) {
    data = await Bun.file(dataPath).json();
  }
  const override = data.lists?.[listId] ?? {};

  let sideboardRows: SideboardRow[] = [];
  const sideboardPath = join(deckDir, "research", "sideboard.md");
  if (existsSync(sideboardPath)) {
    const md = await Bun.file(sideboardPath).text();
    sideboardRows = parseSideboard(md);
  }

  const deckNames = listNames(list);
  const rows = sideboardForList(sideboardRows, deckNames);
  const fullHistory = await readHistory(slug);
  const history = historySwaps(fullHistory, listId, SWAP_LIMIT);

  const { meta, found } = await loadDeckMeta([
    ...deckNames,
    ...rows.map((r) => r.card),
    ...history.flatMap((h) => [h.in, h.out]),
  ]);
  const card = (name: string): CardSummary | undefined => meta[frontFace(name).toLowerCase()];
  const costOf = (name: string) => {
    const c = card(name);
    return c && /\bLand\b/.test(c.typeLine) ? "land" : c?.manaCost;
  };

  const swaps: Swap[] = history.map((h) => {
    // The OUT card's own sideboard row, when one says how it comes back for the IN card.
    const back = sideboardRows.find(
      (r) =>
        frontFace(r.card).toLowerCase() === frontFace(h.out).toLowerCase() &&
        r.displaces.toLowerCase().includes(frontFace(h.in).toLowerCase()),
    );
    return {
      in: { name: h.in, cost: costOf(h.in), text: card(h.in)?.typeLine ?? "" },
      out: { name: h.out, cost: costOf(h.out), text: card(h.out)?.typeLine ?? "" },
      why: `${h.at}: ${h.why}`,
      back: back?.when || undefined,
    };
  });

  const sideboard: SideboardCard[] = rows
    .filter((r) => card(r.card))
    .map((r) => ({
      name: r.card,
      cost: costOf(r.card),
      when: `${r.when}${!r.when || /[.!?)]$/.test(r.when) ? "" : "."} Displaces ${r.displaced.join(", ")}.`.trim(),
    }));

  const stats = computeStats(list, found, deck.cards);
  const upTo = (mv: number) =>
    stats.curve.histogram.slice(0, mv + 1).reduce((n, b) => n + b.creature + b.noncreature, 0);
  const gameChangers = stats.flags.gameChangers.length;

  const ref: Reference = {
    title: `${deck.name} — ${list.label}`,
    subtitle: [
      commandersOf(list).join(" + "),
      list.bracket ? `Bracket ${list.bracket}` : "",
      `${gameChangers} Game Changer${gameChangers === 1 ? "" : "s"}`,
      `${stats.size.total} cards`,
    ]
      .filter(Boolean)
      .join(" · "),
    stats: [
      ...list.sections
        .filter((s) => s.cards.length && !isCommanderSection(s.name))
        .map((s): [string, string] => [s.name, String(s.cards.reduce((n, c) => n + c.qty, 0))]),
      ["Avg MV", stats.curve.avgMv.toFixed(2)],
      ["MV ≤ 2", String(upTo(2))],
      ["MV ≤ 3", String(upTo(3))],
    ],
    swaps,
    sideboard,
    footer: override.footer ?? data.footer,
  };

  const images = await loadImages([...swaps.flatMap((s) => [s.in, s.out]), ...sideboard]);

  /** Union of every card's colour identity — used to trim what lands are shown as producing. */
  const identity = new Set<string>();
  for (const name of deckNames) {
    for (const c of card(name)?.colorIdentity ?? []) identity.add(c);
  }

  const appendixPaths =
    override.appendix ?? data.appendix ?? (existsSync(join(deckDir, "research", "gameplan.md")) ? ["research/gameplan.md"] : []);
  const appendix: { title: string; html: string }[] = [];
  for (const rel of appendixPaths) {
    const path = join(deckDir, rel);
    if (!existsSync(path)) {
      console.warn(`  ! appendix not found: ${rel}`);
      continue;
    }

    const md = await Bun.file(path).text();
    appendix.push({ title: rel, html: renderMarkdown(md, symbols) });
  }

  const base = listId === MAIN_LIST ? `${slug}-reference` : `${slug}-${listId}-reference`;
  const htmlPath = join(deckDir, `.${base}.html`);
  const pdfPath = join(deckDir, `${base}.pdf`);
  await Bun.write(htmlPath, buildHtml(ref, list, images, meta, symbols, identity, appendix));

  // Remove the old PDF first, so a Chrome failure can't leave a stale file looking like success.
  if (existsSync(pdfPath)) {
    await Bun.file(pdfPath).delete();
  }

  const proc = Bun.spawn(
    [
      findChrome(),
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--virtual-time-budget=30000",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdout: "pipe", stderr: "pipe" },
  );
  await proc.exited;
  await Bun.file(htmlPath).delete();

  if (!existsSync(pdfPath)) {
    const stderr = await new Response(proc.stderr).text();
    throw new Error(`Chrome did not produce ${pdfPath}. stderr:\n${stderr}`);
  }

  const bytes = Buffer.from(await Bun.file(pdfPath).arrayBuffer());
  const pages = (bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(
    `${pdfPath}\n  ${pages} pages · ${(bytes.length / 1024 / 1024).toFixed(1)} MB · ` +
      `${swaps.length} swaps · ${sideboard.length} sideboard`,
  );
}

async function main(): Promise<void> {
  const [target, listArg] = process.argv.slice(2);
  if (!target) {
    console.error("usage: bun run deck:pdf <deck-slug> [list-id]\n       bun run deck:pdf --all");
    process.exit(1);
  }

  const symbols = await loadSymbols();
  const slugs = target === "--all" ? await listDeckSlugs() : [target];

  for (const slug of slugs) {
    const deck = await readDeck(slug);
    const played = Object.values(deck.lists).some((l) => l.edhplay);
    if (target === "--all" && !played && !existsSync(join(REPO_ROOT, "decks", slug, "pdf.json"))) {
      continue;
    }

    const ids = listArg ? [pickList(deck, listArg).id] : listsToRender(deck);
    for (const id of ids) {
      await renderList(slug, deck, id, symbols);
    }
  }
}

// Run main() only when this file is executed directly, because tests import it.
// On the NAS share import.meta.main is false: import.meta.path names the file through `skynas` or
// `S:`, but Bun.main through `SKYNAS`. So fall back to argv[1], compared without case.
if (import.meta.main || import.meta.path.toLowerCase() === process.argv[1]?.toLowerCase()) {
  await main();
}
