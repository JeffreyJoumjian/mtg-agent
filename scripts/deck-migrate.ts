#!/usr/bin/env bun
/**
 * One-time migration: the Markdown deck files (`DECK*.md`, `STATUS.md`, `SIDEBOARD.md`,
 * `research/printings*.txt`) → `decks/<slug>/deck.json`.
 *
 *   bun run deck:migrate --dry-run            # report only, every deck with a DECK*.md
 *   bun run deck:migrate                      # migrate every deck
 *   bun run deck:migrate chatterfang ultron   # just these
 *
 * Every card name is resolved through Scryfall and rewritten to its canonical spelling (curly
 * apostrophes, missing accents), which is what stopped the old workbench from finding cards.
 * Unresolved names are kept as written and reported. The Markdown files are deleted afterwards —
 * git history keeps them, and one JSON snapshot per list is written to `versions/` first.
 * `SIDEBOARD.md` is prose (tables with "displaces" columns), so it moves to `research/sideboard.md`
 * rather than being guessed into a pool list.
 */
import { mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { deckName, resolveNames, type ResolveResult } from "./lib/card-cache.ts";
import { parseLegacyDeckMd, parseLegacyStatusMd, variantFromFilename } from "./lib/legacy-deck.ts";
import { listEntries, listSize, type CardMeta, type Deck, type DeckList } from "./lib/deck-model.ts";
import { deckDir, regenerateMoxfield, snapshotFileName, writeDeck, type StoreOptions } from "./lib/deck-store.ts";
import { parsePrintingRef, parsePrintings } from "./lib/moxfield.ts";
import { DECKS_DIR } from "./lib/paths.ts";

export interface MigrationReport {
  slug: string;
  lists: { id: string; file: string; cards: number }[];
  renamed: { from: string; to: string }[];
  unresolved: string[];
  statusesApplied: number;
  notes: string[];
}

export interface MigrateOptions {
  decksDir: string;
  resolve: (names: string[]) => Promise<ResolveResult>;
  dryRun: boolean;
  now: () => Date;
}

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

const frontFace = (name: string): string => name.split(" // ")[0].trim();

/** `DECK*.md` files in a deck folder, `DECK.md` first. */
async function deckFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  return files
    .filter((f) => /^DECK(-.*)?\.md$/.test(f))
    .sort((a, b) => (a === "DECK.md" ? -1 : b === "DECK.md" ? 1 : a.localeCompare(b)));
}

async function readmeTitle(dir: string): Promise<string | null> {
  try {
    const text = await readFile(join(dir, "README.md"), "utf8");
    return text.match(/^#\s+(.+)$/m)?.[1].trim() ?? null;
  } catch {
    return null;
  }
}

export async function migrateDeck(slug: string, opts: MigrateOptions): Promise<MigrationReport> {
  const storeOpts: StoreOptions = { decksDir: opts.decksDir, now: opts.now };
  const dir = deckDir(slug, storeOpts);
  const report: MigrationReport = { slug, lists: [], renamed: [], unresolved: [], statusesApplied: 0, notes: [] };

  const files = await deckFiles(dir);
  if (files.length === 0) throw new Error(`${slug}: no DECK*.md to migrate`);

  // 1. Parse every list.
  const parsed: { id: string; file: string; list: DeckList; title: string; description: string }[] = [];
  for (const file of files) {
    const { id, label } = variantFromFilename(file);
    const legacy = parseLegacyDeckMd(await readFile(join(dir, file), "utf8"), label);
    parsed.push({ id, file, list: legacy.list, title: legacy.title, description: legacy.description });
  }

  // 2. Statuses from STATUS.md, if there is one.
  let statuses: Record<string, { status: CardMeta["status"]; note?: string }> = {};
  const statusPath = join(dir, "STATUS.md");
  if (await exists(statusPath)) {
    statuses = parseLegacyStatusMd(await readFile(statusPath, "utf8"));
  } else {
    report.notes.push("no STATUS.md — no statuses recorded");
  }

  // 3. Canonicalise every name through Scryfall.
  const allNames = [...new Set([...parsed.flatMap((p) => listEntries(p.list).map((e) => e.name)), ...Object.keys(statuses)])];
  const resolved = await opts.resolve(allNames);
  const canonical: Record<string, string> = {};
  for (const name of allNames) {
    const hit = resolved.found[name];
    canonical[name] = hit ? deckName(hit) : name;
    if (hit && canonical[name] !== name) report.renamed.push({ from: name, to: canonical[name] });
  }
  report.unresolved = resolved.unresolved;

  const lists: Record<string, DeckList> = {};
  for (const p of parsed) {
    // A heading with no card lines under it was prose (rules notes, buy notes). The list drops it;
    // the verbatim source under research/legacy/ keeps the text.
    const kept = p.list.sections.filter((s) => s.cards.length > 0);
    for (const s of p.list.sections) {
      if (s.cards.length === 0) report.notes.push(`${p.file}: prose-only heading "${s.name}" dropped from the list (text kept in research/legacy/${p.file})`);
    }
    lists[p.id] = {
      ...p.list,
      sections: kept.map((s) => ({ name: s.name, cards: s.cards.map((c) => ({ ...c, name: canonical[c.name] })) })),
    };
    report.lists.push({ id: p.id, file: p.file, cards: listSize(lists[p.id]) });
  }

  // 4. Card metadata: statuses keyed by canonical name, then printing pins.
  const cards: Record<string, CardMeta> = {};
  const inSomeList: Record<string, true> = {};
  for (const list of Object.values(lists)) {
    for (const e of listEntries(list)) inSomeList[e.name] = true;
  }
  for (const [name, { status, note }] of Object.entries(statuses)) {
    const key = canonical[name] ?? name;
    if (!inSomeList[key]) {
      report.notes.push(`STATUS.md lists ${name}, which is in no list — dropped`);
      continue;
    }
    cards[key] = { ...(cards[key] ?? {}), ...(status ? { status } : {}), ...(note ? { note } : {}) };
    report.statusesApplied += 1;
  }

  const researchDir = join(dir, "research");
  const printingFiles = (await exists(researchDir))
    ? (await readdir(researchDir)).filter((f) => /^printings(-.*)?\.txt$/.test(f)).sort((a, b) => (a === "printings.txt" ? 1 : b === "printings.txt" ? -1 : 0))
    : [];
  const byFront: Record<string, string> = {};
  for (const name of Object.keys(inSomeList)) byFront[frontFace(name).toLowerCase()] = name;
  for (const file of printingFiles) {
    const refs = parsePrintings(await readFile(join(researchDir, file), "utf8"));
    for (const [front, ref] of Object.entries(refs)) {
      const name = byFront[front.toLowerCase()];
      if (!name) continue;

      const printing = parsePrintingRef(ref);
      if (!printing) continue;

      cards[name] = { ...(cards[name] ?? {}), printing };
    }
  }

  // 5. Assemble the deck.
  const primary = parsed.find((p) => p.id === "main");
  const name = primary?.title || (await readmeTitle(dir)) || slug;
  const description = primary?.description ?? "";
  const deck: Deck = { schema: 1, name, format: "commander", ...(description ? { description } : {}), lists, cards };

  if (opts.dryRun) return report;

  // 6. Write: snapshots, deck.json, Moxfield; move the sideboard; delete the Markdown.
  const versionsDir = join(dir, "versions");
  await mkdir(versionsDir, { recursive: true });
  const takenAt = opts.now().toISOString();
  for (const [id, list] of Object.entries(lists)) {
    const file = snapshotFileName(opts.now(), id, "migrated from markdown");
    await writeFile(
      join(versionsDir, file),
      JSON.stringify({ takenAt, listId: id, label: "migrated from markdown", reason: "state at migration", list }, null, 2) + "\n",
    );
  }
  await writeDeck(slug, deck, storeOpts);
  await regenerateMoxfield(slug, deck, storeOpts);

  const sideboard = join(dir, "SIDEBOARD.md");
  if (await exists(sideboard)) {
    await mkdir(researchDir, { recursive: true });
    let target = join(researchDir, "sideboard.md");
    for (let n = 2; await exists(target); n++) target = join(researchDir, `sideboard-${n}.md`);
    await rename(sideboard, target);
    report.notes.push(`SIDEBOARD.md moved to research/${target.split("/").pop()}`);
  }

  // Sources are never deleted — untracked files have no git history to fall back on. They move,
  // verbatim, to research/legacy/ so prose, annotations and notes that did not migrate survive.
  const legacyDir = join(researchDir, "legacy");
  await mkdir(legacyDir, { recursive: true });
  const moveToLegacy = async (from: string, name: string) => {
    let target = join(legacyDir, name);
    for (let n = 2; await exists(target); n++) target = join(legacyDir, name.replace(/(\.[^.]+)$/, `-${n}$1`));
    await rename(from, target);
  };
  for (const file of files) await moveToLegacy(join(dir, file), file);
  if (await exists(statusPath)) await moveToLegacy(statusPath, "STATUS.md");
  for (const file of printingFiles) await moveToLegacy(join(researchDir, file), file);
  report.notes.push(`sources moved to research/legacy/ (${[...files, ...(statuses ? ["STATUS.md"] : []), ...printingFiles].length} files)`);

  return report;
}

function printReport(r: MigrationReport): void {
  console.log(`\n${r.slug}`);
  for (const l of r.lists) console.log(`  ${l.id.padEnd(16)} ${l.file.padEnd(24)} ${l.cards} cards`);
  console.log(`  statuses applied: ${r.statusesApplied}`);
  if (r.renamed.length) console.log(`  renamed (${r.renamed.length}): ${r.renamed.map((x) => `${x.from} → ${x.to}`).join("; ")}`);
  if (r.unresolved.length) console.log(`  UNRESOLVED (${r.unresolved.length}): ${r.unresolved.join(", ")}`);
  for (const n of r.notes) console.log(`  note: ${n}`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  let slugs = args.filter((a) => !a.startsWith("--"));

  if (slugs.length === 0) {
    const all = await readdir(DECKS_DIR);
    slugs = [];
    for (const name of all.sort()) {
      if (name.startsWith("_") || name.startsWith(".")) continue;

      const isDir = (await stat(join(DECKS_DIR, name))).isDirectory();
      if (!isDir) continue;

      const files = await deckFiles(join(DECKS_DIR, name));
      if (files.length > 0) slugs.push(name);
    }
  }

  if (slugs.length === 0) {
    console.log("nothing to migrate — no deck folder holds a DECK*.md");
    return;
  }
  console.log(`${dryRun ? "DRY RUN — " : ""}migrating ${slugs.length} deck(s): ${slugs.join(", ")}`);

  for (const slug of slugs) {
    const report = await migrateDeck(slug, { decksDir: DECKS_DIR, resolve: resolveNames, dryRun, now: () => new Date() });
    printReport(report);
  }
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
