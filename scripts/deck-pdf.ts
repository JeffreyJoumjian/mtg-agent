#!/usr/bin/env bun
/**
 * Generate a printable deck + swap-log + sideboard PDF for any deck in `decks/`.
 *
 *   bun run deck:pdf <deck-slug>
 *   bun run deck:pdf edgar-markov
 *
 * Reads:
 *   decks/<slug>/DECK.md          the decklist, grouped under `## Role (n)` headers
 *   decks/<slug>/pdf.json         title / stats / swaps / sideboard / upgrades  (see PdfData)
 *
 * `swaps` is the build's decision history — what came in, what went out, why.
 * `upgrades` holds further swap blocks (e.g. a bracket-4 path), each on its own page.
 *
 * Writes:
 *   decks/<slug>/<slug>-reference.pdf
 *
 * Card images are fetched from Scryfall once and cached in the git-ignored
 * `data/card-images/`, so re-runs are offline and instant.
 *
 * Rendering uses headless Chrome (macOS/Linux paths probed below) — no npm deps.
 */

import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { REPO_ROOT } from "./lib/paths.ts";
import { CARD_LINE as DECKLIST_CARD_LINE, cleanCardName } from "./lib/decklist.ts";
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
  /** Why the swap was made. */
  why: string;
  /** Condition under which the OUT card returns. */
  back: string;
};

/** A card held in the sideboard with its bring-in trigger. */
type SideboardCard = CardRef & { when: string };

/**
 * A named block of substitutions, rendered like `swaps` but under its own heading on a new
 * page — e.g. a bracket-4 upgrade path, which is a different thing from the build's history.
 */
type SwapSection = {
  title: string;
  /** Optional paragraph under the heading. */
  intro?: string;
  /** Column labels for the two sides. Defaults to IN / OUT. */
  labels?: [string, string];
  /** Label for the `back` note. Defaults to "Bring back". */
  backLabel?: string;
  swaps: Swap[];
};

/** Basics default to a plain black-bordered printing unless `set` says otherwise. */
const DEFAULT_BASIC_SET = "m21";
const BASICS = ["Plains", "Island", "Swamp", "Mountain", "Forest"];

/**
 * One decklist line: `1 Sol Ring` or `1x Sol Ring` (the convention in `decks/README.md`).
 * Capture 1 is the quantity, capture 2 the still-annotated name — pass it through
 * `cleanCardName` before rendering or looking it up. Shared with `lib/decklist.ts` so the
 * PDF and the card tool can never disagree about what a line means.
 */
const CARD_LINE = DECKLIST_CARD_LINE;

/** Contents of `decks/<slug>/pdf.json`. */
type PdfData = {
  title: string;
  subtitle?: string;
  /** Stat chips across the header, e.g. `[["Creatures", "36"], ...]`. */
  stats?: [string, string][];
  /** The build's decision history — what came in, what went out, and why. */
  swaps?: Swap[];
  sideboard?: SideboardCard[];
  /** Further swap blocks after the sideboard, each on its own page. */
  upgrades?: SwapSection[];
  /** Footer note. Defaults to a pointer at the deck's research files. */
  footer?: string;
  /**
   * Extra markdown documents appended after the sideboard, each starting a new page.
   * Paths are relative to the deck folder, e.g. `["research/gameplan.md"]`.
   */
  appendix?: string[];
};

// ---------------------------------------------------------------- helpers

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Scryfall prints double-faced cards under the full "A // B" name; we key on the front face. */
const frontFace = (name: string) => name.split(" // ")[0].split(" / ")[0].trim();

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

function findChrome(): string {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      `No Chrome/Chromium found. Looked in:\n  ${CHROME_CANDIDATES.join("\n  ")}\n` +
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
 * Mana cost / MV / type / produced-mana for every card in the decklist,
 * cached per deck so re-runs are offline.
 */
async function loadDeckMeta(slug: string, names: string[]): Promise<Record<string, any>> {
  const cachePath = join(REPO_ROOT, "data", `deck-meta-${slug}.json`);
  let cache: Record<string, any> = existsSync(cachePath) ? await Bun.file(cachePath).json() : {};

  const missing = names.filter((n) => !cache[frontFace(n).toLowerCase()]);
  if (missing.length) {
    console.log(`fetching card data for ${missing.length} card(s)…`);
    const { fetchCollection } = await import("./lib/scryfall.ts");
    const res = await fetchCollection([...new Set(missing.map(frontFace))]);
    for (const c of res.found) cache[frontFace(c.name).toLowerCase()] = c;
    for (const nf of res.notFound) console.warn(`  ! no card data for "${nf}"`);
    mkdirSync(join(REPO_ROOT, "data"), { recursive: true });
    await Bun.write(cachePath, JSON.stringify(cache));
  }
  return cache;
}

// ---------------------------------------------------------------- html

/**
 * Render `DECK.md`'s `## Role (n)` sections into a three-column checklist.
 * Nonland cards get their mana cost + MV; lands get the mana they can produce.
 */
function renderDecklist(
  deckMd: string,
  meta: Record<string, any>,
  symbols: Record<string, string>,
  identity: Set<string>,
  appendix: { title: string; html: string }[],
): string {
  let html = "";
  for (const block of deckMd.split(/^## /m).slice(1)) {
    const [heading, ...rest] = block.split("\n");
    const cards = rest.filter((l) => CARD_LINE.test(l.trim()));
    if (!cards.length) continue;

    const items = cards.map((line) => {
      const m = line.trim().match(CARD_LINE);
      if (!m) return `<li>${esc(line.trim())}</li>`;
      const [, qty] = m;
      const name = cleanCardName(m[2]);
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
  data: PdfData,
  deckMd: string,
  img: Record<string, string>,
  meta: Record<string, any>,
  symbols: Record<string, string>,
  identity: Set<string>,
  appendix: { title: string; html: string }[],
): string {
  const src = (name: string) => img[frontFace(name)] ?? "";
  const costTag = (c?: string) => (c ? ` <span class="cost">${esc(c)}</span>` : "");

  const swaps = [...(data.swaps ?? [])].sort((a, b) =>
    a.in.name.toLowerCase().localeCompare(b.in.name.toLowerCase()),
  );
  const sideboard = [...(data.sideboard ?? [])].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );

  const renderSwapRows = (
    rows: Swap[],
    [inLabel, outLabel]: [string, string] = ["IN", "OUT"],
    backLabel = "Bring back",
  ) =>
    rows
      .map(
        (s) => `
<div class="swap">
  <div class="pair">
    <div class="side inn">
      <div class="tag">${esc(inLabel)}</div><img src="${src(s.in.name)}" alt="">
      <div class="sd"><div class="nm">${esc(s.in.name)}${costTag(s.in.cost)}</div><div class="blurb">${esc(s.in.text)}</div></div>
    </div>
    <div class="arrow">&#8596;</div>
    <div class="side out">
      <div class="sd right"><div class="nm">${esc(s.out.name)}${costTag(s.out.cost)}</div><div class="blurb">${esc(s.out.text)}</div></div>
      <img src="${src(s.out.name)}" alt=""><div class="tag">${esc(outLabel)}</div>
    </div>
  </div>
  <div class="notes">
    <div class="why"><b>Why:</b> ${esc(s.why)}</div>
    <div class="back"><b>${esc(backLabel)}:</b> ${esc(s.back)}</div>
  </div>
</div>`,
      )
      .join("");

  const swapRows = renderSwapRows(swaps);

  const upgradeBlocks = (data.upgrades ?? [])
    .map((u) => {
      const sorted = [...u.swaps].sort((a, b) =>
        a.in.name.toLowerCase().localeCompare(b.in.name.toLowerCase()),
      );
      return (
        `<section class="sec brk"><h2>${esc(u.title)}</h2>` +
        (u.intro ? `<div class="sub">${esc(u.intro)}</div>` : "") +
        renderSwapRows(sorted, u.labels, u.backLabel) +
        `</section>`
      );
    })
    .join("");

  const sbCells = sideboard
    .map(
      (c) => `
<div class="cell"><img src="${src(c.name)}" alt="">
<div class="ctxt"><div class="nm">${esc(c.name)}${costTag(c.cost)}</div><div class="blurb"><b>Bring in:</b> ${esc(c.when)}</div></div></div>`,
    )
    .join("");

  const statChips = (data.stats ?? [])
    .map(([k, v]) => `<span><b>${esc(k)}</b> ${esc(v)}</span>`)
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(data.title)}</title>
<style>${CSS}</style></head><body>

<h1>${esc(data.title)}</h1>
${data.subtitle ? `<div class="sub">${esc(data.subtitle)}</div>` : ""}
${statChips ? `<div class="stats">${statChips}</div>` : ""}
<section class="sec"><div class="cols">${renderDecklist(deckMd, meta, symbols, identity)}</div></section>

${
  swaps.length || sideboard.length
    ? `<section class="sec brk">
${swaps.length ? `<h2>Build history &mdash; ${swaps.length} substitutions made to finalize this list</h2>${swapRows}` : ""}
${sideboard.length ? `<h2 class="sb">Sideboard &mdash; what to bring in, and when</h2><div class="grid">${sbCells}</div>` : ""}
</section>`
    : ""
}
${upgradeBlocks}
${data.footer ? `<div class="foot">${esc(data.footer)}</div>` : ""}
${appendix.map((a) => `<section class="sec brk"><div class="md-body">${a.html}</div></section>`).join("")}

</body></html>`;
}

// ---------------------------------------------------------------- main

const slug = process.argv[2];
if (!slug) {
  console.error("usage: bun run deck:pdf <deck-slug>\n   e.g. bun run deck:pdf edgar-markov");
  process.exit(1);
}

const deckDir = join(REPO_ROOT, "decks", slug);
const deckPath = join(deckDir, "DECK.md");
const dataPath = join(deckDir, "pdf.json");
for (const [label, path] of [["DECK.md", deckPath], ["pdf.json", dataPath]] as const) {
  if (!existsSync(path)) {
    console.error(`missing ${label}: ${path}`);
    if (label === "pdf.json") console.error(`see decks/README.md for the pdf.json shape.`);
    process.exit(1);
  }
}

const deckMd = await Bun.file(deckPath).text();
const data: PdfData = await Bun.file(dataPath).json();

const cardRefs: CardRef[] = [
  ...(data.swaps ?? []).flatMap((s) => [s.in, s.out]),
  ...(data.upgrades ?? []).flatMap((u) => u.swaps.flatMap((s) => [s.in, s.out])),
  ...(data.sideboard ?? []),
];
const images = await loadImages(cardRefs);

const deckNames = deckMd
  .split("\n")
  .map((l) => {
    const m = l.trim().match(CARD_LINE);
    return m ? cleanCardName(m[2]) : "";
  })
  .filter(Boolean);
const meta = await loadDeckMeta(slug, deckNames);
const symbols = await loadSymbols();

/** Union of every card's colour identity — used to trim what lands are shown as producing. */
const identity = new Set<string>();
for (const name of deckNames) {
  for (const c of meta[frontFace(name).toLowerCase()]?.colorIdentity ?? []) identity.add(c);
}

const appendix: { title: string; html: string }[] = [];
for (const rel of data.appendix ?? []) {
  const path = join(deckDir, rel);
  if (!existsSync(path)) { console.warn(`  ! appendix not found: ${rel}`); continue; }
  appendix.push({ title: rel, html: renderMarkdown(await Bun.file(path).text(), symbols) });
}

const html = buildHtml(data, deckMd, images, meta, symbols, identity, appendix);
const htmlPath = join(deckDir, `.${slug}-reference.html`);
await Bun.write(htmlPath, html);

const pdfPath = join(deckDir, `${slug}-reference.pdf`);
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
  console.error("Chrome did not produce a PDF. stderr:\n" + (await new Response(proc.stderr).text()));
  process.exit(1);
}
const bytes = Buffer.from(await Bun.file(pdfPath).arrayBuffer());
const pages = (bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(
  `${pdfPath}\n  ${pages} pages · ${(bytes.length / 1024 / 1024).toFixed(1)} MB · ` +
    `${(data.swaps ?? []).length} swaps · ${(data.sideboard ?? []).length} sideboard` +
      (data.upgrades ?? [])
        .map((u) => ` · ${u.swaps.length} ${u.title.toLowerCase()}`)
        .join(""),
);
