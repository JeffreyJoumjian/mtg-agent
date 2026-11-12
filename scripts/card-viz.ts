#!/usr/bin/env bun
/** Card visualizer: turns a JSON spec of swaps, bench pairs and verdict tiles into self-contained
 *  HTML pages for T3 Code's inline `html_render`. The `card-visualizer` skill holds the spec format
 *  and the steps.
 *
 *  Usage:
 *    bun run card-viz <spec.json> [--out <dir>]     # default out: <spec dir>/card-viz
 *
 *  Card art, mana cost and type line come from the card cache (one batched Scryfall call for any card
 *  it lacks), so the spec names cards and never carries image URLs. Each spec page is packed into as
 *  many output pages as it needs under MAX_PAGE_HEIGHT: a desktop frame grows to fit its page, but
 *  html_render's `height` stops at 2000px and a phone scrolls inside the frame past it. The styles use
 *  T3 Code's theme variables, so the pages follow its light and dark themes. */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { resolveNames } from "./lib/card-cache.ts";
import type { CardSummary } from "./lib/scryfall.ts";

export type Verdict = "swap" | "add" | "bench" | "consider" | "hold" | "in" | "pass" | "trap" | "answer";

/** One proposed change: the card in, the card it replaces, and the case for it. */
export interface SwapEntry {
  in: string;
  out?: string;
  /** Defaults to "swap". */
  verdict?: Verdict;
  /** Headline; defaults to the incoming card's name. */
  title?: string;
  /** Deck and list tags, such as "iron-man v3". */
  decks?: string[];
  curve?: string;
  /** What an earlier session decided about this card, shown in a dashed box. */
  prior?: string;
  axis?: string;
  why?: string[];
  /** Costs and warnings, each with a warning-coloured rule. */
  flags?: string[];
  options?: { card: string; note: string }[];
  optionsLabel?: string;
}
export interface PairItem { in: string; out: string; deck?: string; note?: string }
export interface TileItem { card: string; verdict: Verdict; label?: string }
/** One heading's worth of content. Give exactly one of `swaps`, `pairs` or `tiles`. */
export interface Section {
  heading?: string;
  note?: string;
  swaps?: SwapEntry[];
  pairs?: PairItem[];
  tiles?: TileItem[];
}
export interface PageSpec { title: string; sections: Section[] }
export interface Spec { pages: PageSpec[] }

export type Rows =
  | { kind: "swaps"; items: SwapEntry[] }
  | { kind: "pairs"; items: PairItem[] }
  | { kind: "tiles"; items: TileItem[] };
export interface OutPart { heading?: string; note?: string; kind: Rows["kind"]; rows: Rows[] }
export interface OutPage { title: string; parts: OutPart[]; height: number }

const VERDICTS: Record<Verdict, [label: string, tone: string]> = {
  swap: ["Swap", "success"],
  add: ["Add", "success"],
  bench: ["Bench", "warning"],
  consider: ["Consider", "warning"],
  hold: ["Hold", "warning"],
  in: ["Already in", "info"],
  answer: ["Answer", "info"],
  pass: ["Pass", "destructive"],
  trap: ["Trap", "destructive"],
};

/** Under html_render's 2000px `height` cap, with a margin for the height estimate's error. */
export const MAX_PAGE_HEIGHT = 1850;
const WIDTH = 712; // the 728px reply column minus T3's 8px gutter on each side
const TITLE_H = 40;
const HEADING_H = 34;
const NOTE_H = 24;
const COLUMNS: Record<Rows["kind"], number> = {
  swaps: 1,
  pairs: Math.floor((WIDTH + 12) / (210 + 12)),
  tiles: Math.floor((WIDTH + 12) / (104 + 12)),
};

function rowsOf(s: Section): Rows {
  if (s.swaps) return { kind: "swaps", items: s.swaps };
  if (s.pairs) return { kind: "pairs", items: s.pairs };
  return { kind: "tiles", items: s.tiles ?? [] };
}

function sliceRows(r: Rows, from: number, to: number): Rows {
  switch (r.kind) {
    case "swaps": return { kind: "swaps", items: r.items.slice(from, to) };
    case "pairs": return { kind: "pairs", items: r.items.slice(from, to) };
    case "tiles": return { kind: "tiles", items: r.items.slice(from, to) };
    default: { const _exhaustive: never = r; return _exhaustive; }
  }
}

/** Pack one spec page into output pages no taller than `max`. A row (one swap entry, or one grid
 *  row of pairs or tiles) never splits. A page that breaks continues under the same title with
 *  "(continued)", and repeats the heading of the section it breaks inside. When everything left
 *  fits in `slack`, it stays on the current page instead of starting a near-empty one: a desktop
 *  frame grows to fit, and a phone scrolls the little extra. */
export function packPage(page: PageSpec, rowHeight: (row: Rows) => number, max = MAX_PAGE_HEIGHT, slack = 400): OutPage[] {
  const rows = page.sections.flatMap((section) => {
    const all = rowsOf(section);
    const cols = COLUMNS[all.kind];
    const headH = (section.heading ? HEADING_H : 0) + (section.note ? NOTE_H : 0);
    const chunks: { section: Section; kind: Rows["kind"]; headH: number; row: Rows; h: number }[] = [];
    for (let i = 0; i < all.items.length; i += cols) {
      const row = sliceRows(all, i, i + cols);
      chunks.push({ section, kind: all.kind, headH, row, h: rowHeight(row) });
    }
    return chunks;
  });

  // Height still to place from each row to the end of the spec page, headings included.
  const rest = rows.map(() => 0);
  for (let i = rows.length - 1; i >= 0; i--) {
    const opensSection = i === 0 || rows[i - 1].section !== rows[i].section;
    rest[i] = rows[i].h + (opensSection ? rows[i].headH : 0) + (rest[i + 1] ?? 0);
  }

  const pages: OutPage[] = [];
  let current: OutPage = { title: page.title, parts: [], height: TITLE_H };
  let part: OutPart | null = null;
  let partSection: Section | null = null;

  for (let i = 0; i < rows.length; i++) {
    const { section, kind, headH, row, h } = rows[i];
    const needed = (partSection === section ? 0 : headH) + h;

    if (current.height + needed > max && current.parts.length > 0 && rest[i] > slack) {
      pages.push(current);
      current = { title: `${page.title} (continued)`, parts: [], height: TITLE_H };
      partSection = null;
    }

    if (!part || partSection !== section) {
      part = { heading: section.heading, note: section.note, kind, rows: [] };
      current.parts.push(part);
      current.height += headH;
      partSection = section;
    }
    part.rows.push(row);
    current.height += h;
  }

  pages.push(current);
  return pages;
}

/** `{2}{R/P}` → one Scryfall symbol image per pip; a double-faced cost keeps its `//`. */
export function manaSymbols(cost: string): string {
  return cost
    .split(" // ")
    .map((part) =>
      [...part.matchAll(/\{([^}]+)\}/g)]
        .map(([, s]) => `<img class="sym" src="https://svgs.scryfall.io/card-symbols/${s.replace("/", "")}.svg" alt="{${s}}">`)
        .join(""),
    )
    .join('<span class="slash">//</span>');
}

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
/** Escaped text with `**bold**` turned into <b>, the only markup the spec's prose fields take. */
const fmt = (s: string): string => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const lines = (text: string | undefined, perLine: number): number => (text ? Math.max(1, Math.ceil(text.length / perLine)) : 0);

/** Rough rendered height of one row, from the CSS below: card images at 63:88, and about 82
 *  characters of 13px text to a line in a swap entry's text column. */
function estimateRow(row: Rows): number {
  switch (row.kind) {
    case "tiles": {
      const tileW = (WIDTH - (COLUMNS.tiles - 1) * 12) / COLUMNS.tiles;
      const nameLines = Math.max(...row.items.map((t) => lines(t.card, 15)));
      return tileW * 1.397 + 26 + nameLines * 15 + 16 + 12;
    }
    case "pairs": {
      const pairW = (WIDTH - (COLUMNS.pairs - 1) * 12) / COLUMNS.pairs;
      const imgH = ((pairW - 26) / 2 - 10) * 1.397;
      const capLines = Math.max(...row.items.map((p) => lines(`${p.in} in, ${p.out} out. ${p.note ?? ""}`, 34)));
      return 26 + 22 + imgH + 8 + capLines * 17 + 12;
    }
    case "swaps": {
      const e = row.items[0];
      const art = 184 + (e.out ? 29 + 184 : 0);
      const per = 82;
      const body =
        28 + 20 + (e.decks?.length ? 24 : 0) + (e.out || e.curve ? 42 : 0) +
        (e.prior ? lines(e.prior, per) * 18 + 22 : 0) +
        (e.axis ? lines(e.axis, per) * 18 + 10 : 0) +
        (e.why ?? []).reduce((h, w) => h + lines(w, per - 3) * 19 + 6, 8) +
        (e.flags ?? []).reduce((h, f) => h + lines(f, per - 2) * 18 + 8, e.flags?.length ? 8 : 0) +
        (e.options?.length ? 26 + Math.ceil(e.options.length / 2) * 100 : 0);
      return Math.max(art, body) + 34 + 12;
    }
    default: { const _exhaustive: never = row; return _exhaustive; }
  }
}

/** Styles split by row kind, so each page carries only the rules it uses. */
const CSS_BASE = `
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font-family:var(--font-sans);color:var(--foreground)}
.ext{display:inline-flex;vertical-align:-2px;margin-left:4px;color:var(--muted-foreground)}
.ext:hover{color:var(--foreground)}
.ext svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
h2{font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted-foreground);margin:6px 2px 10px}
h3{font-size:15px;font-weight:650;margin:16px 2px 8px}
.note{font-size:12.5px;color:var(--muted-foreground);margin:-4px 2px 10px}
.pill{font-size:11px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;padding:2px 8px;border-radius:999px}
.pill.success{color:var(--success);background:color-mix(in srgb,var(--success) 16%,transparent)}
.pill.warning{color:var(--warning);background:color-mix(in srgb,var(--warning) 16%,transparent)}
.pill.destructive{color:var(--destructive);background:color-mix(in srgb,var(--destructive) 16%,transparent)}
.pill.info{color:var(--info);background:color-mix(in srgb,var(--info) 16%,transparent)}
.deck{display:inline-block;font-size:11.5px;font-family:var(--font-mono);background:var(--secondary);color:var(--secondary-foreground);padding:1px 7px;border-radius:5px;margin-right:4px}
`;
const CSS_SWAPS = `
.list{display:flex;flex-direction:column;gap:12px}
.entry{display:flex;flex-wrap:wrap;gap:16px;padding:16px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card)}
.entry.success{border-left:4px solid var(--success)}
.entry.warning{border-left:4px solid var(--warning)}
.entry.destructive{border-left:4px solid var(--destructive)}
.entry.info{border-left:4px solid var(--info)}
.art{flex:0 0 132px}
.art img{width:132px;border-radius:7px;display:block;box-shadow:0 1px 4px rgba(0,0,0,.35)}
.body{flex:1 1 300px;min-width:0}
.head{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:4px}
.name{font-weight:650;font-size:16px}
.sym{width:15px;height:15px;vertical-align:-2px;margin-left:1px}
.slash{color:var(--muted-foreground);margin:0 3px;font-size:12px}
.type{font-size:12px;color:var(--muted-foreground);margin-bottom:8px}
.swap{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;margin:8px 0;padding:8px 10px;border-radius:calc(var(--radius) - 2px);background:var(--secondary)}
.swap b{font-weight:600}
.swap .in{color:var(--success)}
.swap .out{color:var(--destructive)}
.axis{font-size:12.5px;margin:6px 0 4px}
.axis span{color:var(--muted-foreground)}
ul{margin:4px 0 0;padding-left:18px}
li{font-size:13px;line-height:1.45;margin:3px 0}
.flags{margin-top:8px;font-size:12.5px;line-height:1.45}
.flags div{padding-left:10px;border-left:2px solid var(--warning);margin:4px 0}
.prior{font-size:12.5px;line-height:1.45;margin:6px 0;padding:6px 10px;border-radius:calc(var(--radius) - 2px);border:1px dashed var(--border);color:var(--muted-foreground)}
.prior b{color:var(--foreground);font-weight:600}
.outlbl{margin:10px 0 4px;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--destructive)}
.art img.outimg{opacity:.8;outline:2px solid color-mix(in srgb,var(--destructive) 55%,transparent);outline-offset:1px;box-shadow:none}
.optlbl{margin:10px 0 6px;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted-foreground)}
.opts{display:flex;flex-wrap:wrap;gap:10px}
.opt{display:flex;gap:8px;flex:1 1 200px;align-items:flex-start;background:var(--secondary);border-radius:calc(var(--radius) - 2px);padding:8px}
.opt img{width:62px;flex:0 0 62px;border-radius:4px;display:block}
.optcap{font-size:12px;line-height:1.4}
`;
const CSS_PAIRS = `
.pairs{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.pair{padding:12px;border:1px solid var(--border);border-radius:var(--radius);background:var(--card)}
.pair .imgs{display:flex;align-items:center;gap:6px;margin-top:8px}
.pair .imgs img{width:calc(50% - 10px);border-radius:5px;display:block}
.pair .imgs img.o{opacity:.75}
.pair .arrow{font-size:12px;color:var(--muted-foreground)}
.pair .cap{font-size:12px;margin-top:6px;line-height:1.35}
.pair .cap b{font-weight:600}
`;
const CSS_TILES = `
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:12px}
.tile{text-align:center}
.tile img{width:100%;border-radius:6px;display:block}
.tile .lbl{margin-top:5px}
.tile .tn{font-size:11.5px;line-height:1.25;margin-top:3px}
.tile .td{font-size:10.5px;color:var(--muted-foreground);font-family:var(--font-mono)}
`;
const CSS: Record<Rows["kind"], string> = { swaps: CSS_SWAPS, pairs: CSS_PAIRS, tiles: CSS_TILES };

/** The external-link icon, defined once per page and drawn by every `.ext` link. */
const LINK_ICON =
  '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="ext" viewBox="0 0 24 24"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></symbol></svg>';

/** Card images stay bare `<img>` tags so T3 Code can open and zoom them on click. The Scryfall
 *  page opens from the separate link icon next to each card name instead. */
export function render(page: OutPage, card: (name: string) => CardSummary): string {
  const img = (name: string, cls = ""): string => {
    const c = card(name);
    const src = c.images?.normal ?? c.imageUri ?? c.faces[0]?.images.normal ?? "";
    return `<img${cls ? ` class="${cls}"` : ""} src="${esc(src)}" alt="${esc(name)}">`;
  };
  const link = (name: string): string =>
    `<a class="ext" href="${esc(card(name).scryfallUri)}" target="_blank" rel="noopener" title="Open ${esc(name)} on Scryfall"><svg><use href="#ext"/></svg></a>`;
  const pill = (v: Verdict): string => `<span class="pill ${VERDICTS[v][1]}">${VERDICTS[v][0]}</span>`;

  const swapEntry = (e: SwapEntry): string => {
    const v = e.verdict ?? "swap";
    const c = card(e.in);
    const front = c.faces[0];
    const cost = c.manaCost || front?.manaCost || "";
    const type = c.faces.length > 1 ? front.typeLine : c.typeLine;
    const curve = e.curve ? `<span><b>Curve</b> ${esc(e.curve)}</span>` : "";
    const swapBox = e.out
      ? `<div class="swap"><span class="in"><b>In</b> ${esc(e.in)}${link(e.in)}</span><span class="out"><b>Out</b> ${esc(e.out)}${link(e.out)}</span>${curve}</div>`
      : curve ? `<div class="swap">${curve}</div>` : "";
    const opts = e.options?.length
      ? `<div class="optlbl">${esc(e.optionsLabel ?? "Other cuts considered")}</div><div class="opts">${e.options
          .map((o) => `<div class="opt">${img(o.card)}<div class="optcap"><b>${esc(o.card)}</b>${link(o.card)}<br>${fmt(o.note)}</div></div>`)
          .join("")}</div>`
      : "";
    return `<div class="entry ${VERDICTS[v][1]}"><div class="art">${img(e.in)}${e.out ? `<div class="outlbl">Replaces</div>${img(e.out, "outimg")}` : ""}</div>
<div class="body"><div class="head"><span class="name">${esc(e.title ?? e.in)}${link(e.in)}</span>${manaSymbols(cost)}${pill(v)}</div>
<div class="type">${esc(type)}</div>${(e.decks ?? []).map((d) => `<span class="deck">${esc(d)}</span>`).join("")}${swapBox}
${e.prior ? `<div class="prior"><b>Earlier:</b> ${fmt(e.prior)}</div>` : ""}${e.axis ? `<div class="axis"><span>Deciding axis:</span> ${fmt(e.axis)}</div>` : ""}
${e.why?.length ? `<ul>${e.why.map((w) => `<li>${fmt(w)}</li>`).join("")}</ul>` : ""}${e.flags?.length ? `<div class="flags">${e.flags.map((f) => `<div>${fmt(f)}</div>`).join("")}</div>` : ""}${opts}</div></div>`;
  };

  const pair = (p: PairItem): string =>
    `<div class="pair">${p.deck ? `<span class="deck">${esc(p.deck)}</span>` : ""}<div class="imgs">${img(p.in)}<span class="arrow">for</span>${img(p.out, "o")}</div><div class="cap"><b>${esc(p.in)}</b>${link(p.in)} in, <b>${esc(p.out)}</b>${link(p.out)} out.${p.note ? ` ${fmt(p.note)}` : ""}</div></div>`;

  const tile = (t: TileItem): string =>
    `<div class="tile">${img(t.card)}<div class="lbl">${pill(t.verdict)}</div><div class="tn">${esc(t.card)}${link(t.card)}</div>${t.label ? `<div class="td">${esc(t.label)}</div>` : ""}</div>`;

  const rowHtml = (r: Rows): string => {
    switch (r.kind) {
      case "swaps": return r.items.map(swapEntry).join("");
      case "pairs": return r.items.map(pair).join("");
      case "tiles": return r.items.map(tile).join("");
      default: { const _exhaustive: never = r; return _exhaustive; }
    }
  };
  const container: Record<Rows["kind"], string> = { swaps: "list", pairs: "pairs", tiles: "grid" };

  const parts = page.parts
    .map((p) => `${p.heading ? `<h3>${esc(p.heading)}</h3>` : ""}${p.note ? `<div class="note">${fmt(p.note)}</div>` : ""}<div class="${container[p.kind]}">${p.rows.map(rowHtml).join("")}</div>`)
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${CSS_BASE}${page.parts.map((p) => p.kind).filter((k, i, all) => all.indexOf(k) === i).map((k) => CSS[k]).join("")}</style></head><body>${LINK_ICON}<h2>${esc(page.title)}</h2>${parts}</body></html>`;
}

function namesIn(spec: Spec): string[] {
  const names: string[] = [];
  for (const page of spec.pages) {
    for (const s of page.sections) {
      for (const e of s.swaps ?? []) names.push(e.in, ...(e.out ? [e.out] : []), ...(e.options ?? []).map((o) => o.card));
      for (const p of s.pairs ?? []) names.push(p.in, p.out);
      for (const t of s.tiles ?? []) names.push(t.card);
    }
  }
  return names;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf("--out");
  const specPath = args.find((a, i) => !a.startsWith("--") && (outIdx < 0 || i !== outIdx + 1));
  if (!specPath) {
    console.error("Usage: bun run card-viz <spec.json> [--out <dir>]");
    process.exit(1);
  }

  const outDir = outIdx >= 0 ? args[outIdx + 1] : join(dirname(specPath), "card-viz");
  const specText = await Bun.file(specPath).text();
  const spec: Spec = JSON.parse(specText);

  const { found, unresolved } = await resolveNames(namesIn(spec));
  if (unresolved.length) {
    console.error(`NOT FOUND (check spelling): ${unresolved.join(", ")}`);
    process.exit(1);
  }
  const card = (name: string): CardSummary => {
    const c = found[name];
    if (!c) throw new Error(`card missing after resolve: ${name}`);
    return c;
  };

  await mkdir(outDir, { recursive: true });
  const index: { file: string; title: string; height: number }[] = [];
  for (const page of spec.pages) {
    for (const out of packPage(page, estimateRow)) {
      const n = String(index.length + 1).padStart(2, "0");
      const slug = out.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
      const file = join(outDir, `${n}-${slug}.html`);
      await Bun.write(file, render(out, card));
      const height = Math.min(2000, Math.ceil(out.height / 10) * 10 + 20);
      index.push({ file, title: out.title, height });
      console.log(`${n}  ${String(height).padStart(4)}px  ${out.title}  →  ${file}`);
    }
  }
  await Bun.write(join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
