/**
 * The deck store — everything that touches `decks/<slug>/` on disk.
 *
 * One apply path, two doors: the app's server functions and `bun run deck:edit` both call
 * {@link applyToDeck}, which re-reads the list, applies the change set, snapshots what it
 * replaces, writes `deck.json`, regenerates the Moxfield export and appends one history line.
 * The browser agent never writes `deck.json` directly.
 *
 * Nothing here runs git. The user commits by hand.
 */
import { appendFile, mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DECKS_DIR, REPO_ROOT } from "./paths.ts";
import {
  emptyDeck,
  formatDeck,
  normalizeList,
  parseDeck,
  DeckParseError,
  type CardMeta,
  type Deck,
  type DeckList,
} from "./deck-model.ts";
import { applyChangeSet, type ApplyFailure, type ChangeEntry, type ChangeSet } from "./change-set.ts";
import { computeStats, deckIdentity, diffStats, type CardInfo, type DeckStats, type StatChange } from "./deck-stats.ts";
import {
  GLOBAL_PRINTINGS_PATH,
  mergePrintings,
  moxfieldFileFor,
  parsePrintings,
  printingsFromMeta,
  toMoxfield,
} from "./moxfield.ts";
import { parseLegacyDeckMd } from "./legacy-deck.ts";

export interface StoreOptions {
  /** Defaults to the repo's `decks/`. Tests point it at a temp dir. */
  decksDir?: string;
  now?: () => Date;
  /** Defaults to `decks/_printings.txt`. */
  globalPrintingsPath?: string;
  /** Called with the final path and content just before every file write, so a file watcher can
   *  recognise the app's own writes and not report them as outside changes. */
  onBeforeWrite?: (path: string, text: string) => void;
}

export class DeckFileError extends Error {
  constructor(
    readonly slug: string,
    readonly errors: string[],
  ) {
    super(`${slug}/deck.json: ${errors.join("; ")}`);
    this.name = "DeckFileError";
  }
}

export interface HistoryEntry {
  id: string;
  /** ISO timestamp. */
  at: string;
  listId: string;
  label: string;
  author: "user" | "agent";
  rationale?: string;
  entries: ChangeEntry[];
  /** Path relative to the deck folder — `versions/2026-09-23-1432-main-label.json`. */
  snapshot: string;
  before: DeckStats;
  after: DeckStats;
  changes: StatChange[];
}

export type ApplyOutcome =
  { ok: true; deck: Deck; entry: HistoryEntry; moxfield: string[] } | { ok: false; failures: ApplyFailure[] };

export interface VersionRef {
  /** File name inside `versions/`. */
  file: string;
  takenAt: string;
  listId: string | null;
  label: string;
  /** True for a pre-migration Markdown snapshot. */
  legacy: boolean;
  /** False for snapshots that are not decklists (an old STATUS.md or SIDEBOARD.md copy). */
  restorable: boolean;
}

interface SnapshotFile {
  takenAt: string;
  listId: string;
  label: string;
  reason: string;
  list: DeckList;
}

const decksDirOf = (opts?: StoreOptions): string => opts?.decksDir ?? DECKS_DIR;
const nowOf = (opts?: StoreOptions): Date => (opts?.now ? opts.now() : new Date());

export function deckDir(slug: string, opts?: StoreOptions): string {
  return join(decksDirOf(opts), slug);
}

/** Every folder under `dir` that holds a `deck.json`, `_`- and `.`-prefixed folders excluded. */
async function slugsIn(dir: string): Promise<string[]> {
  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }

  const slugs: string[] = [];
  for (const name of names.sort()) {
    if (name.startsWith("_") || name.startsWith(".")) continue;

    const hasDeck = await exists(join(dir, name, "deck.json"));
    if (hasDeck) slugs.push(name);
  }
  return slugs;
}

/** Every folder under `decks/` that holds a `deck.json`, `_`-prefixed folders excluded. */
export async function listDeckSlugs(opts?: StoreOptions): Promise<string[]> {
  return slugsIn(decksDirOf(opts));
}

/** Where archived decks live: `decks/_archive/<slug>/`. Underscore-prefixed, so nothing lists it
 *  as a deck; the folder is moved whole, so nothing is lost and a restore is the same move back. */
export const ARCHIVE_DIR = "_archive";

export function archiveDir(opts?: StoreOptions): string {
  return join(decksDirOf(opts), ARCHIVE_DIR);
}

export async function listArchivedSlugs(opts?: StoreOptions): Promise<string[]> {
  return slugsIn(archiveDir(opts));
}

function assertSlug(slug: string): void {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`not a deck slug: ${slug}`);
}

/** Move a deck folder, untouched, into `decks/_archive/`. */
export async function archiveDeck(slug: string, opts?: StoreOptions): Promise<void> {
  assertSlug(slug);
  const from = deckDir(slug, opts);
  const to = join(archiveDir(opts), slug);

  const isDeck = await exists(join(from, "deck.json"));
  if (!isDeck) throw new Error(`no deck at ${from}`);

  const taken = await exists(to);
  if (taken) throw new Error(`an archived deck already uses ${to}`);

  await mkdir(archiveDir(opts), { recursive: true });
  await rename(from, to);
}

/** Move an archived deck folder back into `decks/`. */
export async function restoreDeck(slug: string, opts?: StoreOptions): Promise<void> {
  assertSlug(slug);
  const from = join(archiveDir(opts), slug);
  const to = deckDir(slug, opts);

  const isDeck = await exists(join(from, "deck.json"));
  if (!isDeck) throw new Error(`no archived deck at ${from}`);

  const taken = await exists(to);
  if (taken) throw new Error(`a deck already uses ${to}`);

  await rename(from, to);
}

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function readDeck(slug: string, opts?: StoreOptions): Promise<Deck> {
  const path = join(deckDir(slug, opts), "deck.json");
  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch (err) {
    throw new DeckFileError(slug, [`cannot read ${path}: ${err instanceof Error ? err.message : String(err)}`]);
  }

  try {
    return parseDeck(text);
  } catch (err) {
    if (err instanceof DeckParseError) throw new DeckFileError(slug, err.errors);
    throw err;
  }
}

/** Write `deck.json` atomically (temp file + rename). Returns the text written. */
export async function writeDeck(slug: string, deck: Deck, opts?: StoreOptions): Promise<string> {
  const dir = deckDir(slug, opts);
  await mkdir(dir, { recursive: true });

  const text = formatDeck(deck);
  const target = join(dir, "deck.json");
  opts?.onBeforeWrite?.(target, text);
  const tmp = join(dir, `.deck.json.${process.pid}.tmp`);
  await writeFile(tmp, text);
  await rename(tmp, target);
  return text;
}

/** Create a deck folder with an empty main list. Fails if the folder already exists. */
export async function createDeck(slug: string, name: string, opts?: StoreOptions): Promise<Deck> {
  const dir = deckDir(slug, opts);
  const already = await exists(dir);
  if (already) throw new Error(`deck folder already exists: ${dir}`);

  for (const sub of ["research", "versions", "samples"]) {
    await mkdir(join(dir, sub), { recursive: true });
  }

  const deck = emptyDeck(name);
  await writeDeck(slug, deck, opts);
  return deck;
}

/** `2026-09-23-1432-main-before-food-package.json` — date, minute, list, slugified label. */
export function snapshotFileName(now: Date, listId: string, label: string): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}-${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}`;
  const slug =
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/, "") || "change";
  return `${stamp}-${listId}-${slug}.json`;
}

async function writeSnapshot(slug: string, snapshot: SnapshotFile, opts?: StoreOptions): Promise<string> {
  const dir = join(deckDir(slug, opts), "versions");
  await mkdir(dir, { recursive: true });

  const base = snapshotFileName(new Date(snapshot.takenAt), snapshot.listId, snapshot.label);
  let file = base;
  for (let n = 2; await exists(join(dir, file)); n++) {
    file = base.replace(/\.json$/, `-${n}.json`);
  }

  const text = JSON.stringify(snapshot, null, 2) + "\n";
  opts?.onBeforeWrite?.(join(dir, file), text);
  await writeFile(join(dir, file), text);
  return `versions/${file}`;
}

function newId(now: Date): string {
  return `${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Apply a change set to one list of a deck, with every side effect the spec requires. Nothing is
 * written unless every entry applies cleanly against the list as it is on disk right now.
 */
export async function applyToDeck(
  slug: string,
  cs: ChangeSet,
  cards: Record<string, CardInfo | undefined>,
  opts?: StoreOptions,
): Promise<ApplyOutcome> {
  const deck = await readDeck(slug, opts);
  const current = deck.lists[cs.listId];
  if (!current) {
    return {
      ok: false,
      failures: [
        {
          entry: { op: "remove", name: "" },
          reason: `no list "${cs.listId}" in ${slug}`,
        },
      ],
    };
  }

  const applied = applyChangeSet(current, cs.entries);
  if (!applied.ok) return applied;

  const now = nowOf(opts);
  const next = normalizeList(applied.list);
  // Pools have no commander; every list is judged against the deck's identity.
  const identity = deckIdentity(deck, cards);
  const before = computeStats(current, cards, deck.cards, identity);
  const after = computeStats(next, cards, deck.cards, identity);

  const snapshot = await writeSnapshot(
    slug,
    {
      takenAt: now.toISOString(),
      listId: cs.listId,
      label: cs.label,
      reason: `before ${cs.label}`,
      list: current,
    },
    opts,
  );

  const updated: Deck = {
    ...deck,
    lists: { ...deck.lists, [cs.listId]: next },
  };
  await writeDeck(slug, updated, opts);
  const moxfield = await regenerateMoxfield(slug, updated, opts);

  const entry: HistoryEntry = {
    id: newId(now),
    at: now.toISOString(),
    listId: cs.listId,
    label: cs.label,
    author: cs.author,
    ...(cs.rationale ? { rationale: cs.rationale } : {}),
    entries: cs.entries,
    snapshot,
    before,
    after,
    changes: diffStats(before, after),
  };
  const historyPath = join(deckDir(slug, opts), "history.jsonl");
  let previous = "";
  try {
    previous = await readFile(historyPath, "utf8");
  } catch {
    // First entry.
  }
  const line = JSON.stringify(entry) + "\n";
  opts?.onBeforeWrite?.(historyPath, previous + line);
  await appendFile(historyPath, line);

  return { ok: true, deck: updated, entry, moxfield };
}

/** The spelling a list uses for `name`, matched case-insensitively across every list; null when the
 *  card is in no list of the deck. */
function spellingInLists(deck: Deck, name: string): string | null {
  const wanted = name.trim().toLowerCase();

  for (const list of Object.values(deck.lists)) {
    for (const section of list.sections) {
      const hit = section.cards.find((c) => c.name.toLowerCase() === wanted);
      if (hit) return hit.name;
    }
  }
  return null;
}

/** Merge metadata into `cards[name]`. The key is always the list's own spelling of the card —
 *  a name that is in no list is refused, so no orphan entry can hide from the stats and the
 *  Moxfield pins. An explicit empty `tags` array clears tags; an explicit empty string clears a
 *  note. Immediate and unversioned — bookkeeping, not a deck change. */
/** A metadata patch: every field optional; `printing: null` unpins the printing. */
export type CardMetaPatch = Partial<Omit<CardMeta, "printing">> & {
  printing?: CardMeta["printing"] | null;
};

export async function setCardMeta(
  slug: string,
  updates: { name: string; meta: CardMetaPatch }[],
  opts?: StoreOptions,
): Promise<Deck> {
  const deck = await readDeck(slug, opts);
  const cards = { ...deck.cards };

  for (const { name: requested, meta } of updates) {
    const name =
      spellingInLists(deck, requested) ??
      Object.keys(cards).find((k) => k.toLowerCase() === requested.trim().toLowerCase()) ??
      null;
    if (!name) throw new Error(`${requested} is in no list of ${slug} — add it first, then tag it`);

    const merged: CardMeta = { ...(cards[name] ?? {}) };
    if (meta.status !== undefined) merged.status = meta.status;
    if (meta.printing !== undefined) {
      if (meta.printing) merged.printing = meta.printing;
      else delete merged.printing;
    }
    if (meta.tags !== undefined) {
      if (meta.tags.length > 0) merged.tags = [...new Set(meta.tags)];
      else delete merged.tags;
    }
    if (meta.note !== undefined) {
      if (meta.note) merged.note = meta.note;
      else delete merged.note;
    }
    cards[name] = merged;
  }

  const updated: Deck = { ...deck, cards };
  await writeDeck(slug, updated, opts);
  return updated;
}

/** Rename a card everywhere in the deck — every list and the metadata key. Used by the app's
 *  "Find" action when an unresolved name is matched to the real card. */
export async function renameCard(slug: string, from: string, to: string, opts?: StoreOptions): Promise<Deck> {
  const deck = await readDeck(slug, opts);
  const wanted = from.trim().toLowerCase();

  const lists: Record<string, DeckList> = {};
  for (const [id, list] of Object.entries(deck.lists)) {
    lists[id] = {
      ...list,
      sections: list.sections.map((s) => ({
        name: s.name,
        cards: s.cards.map((c) => (c.name.toLowerCase() === wanted ? { ...c, name: to } : c)),
      })),
    };
  }

  const cards: Record<string, CardMeta> = {};
  for (const [name, meta] of Object.entries(deck.cards)) {
    cards[name.toLowerCase() === wanted ? to : name] = meta;
  }

  const updated: Deck = { ...deck, lists, cards };
  await writeDeck(slug, updated, opts);
  await regenerateMoxfield(slug, updated, opts);
  return updated;
}

/** History newest first. A missing file is an empty history. */
export async function readHistory(slug: string, opts?: StoreOptions): Promise<HistoryEntry[]> {
  let text: string;
  try {
    text = await readFile(join(deckDir(slug, opts), "history.jsonl"), "utf8");
  } catch {
    return [];
  }

  const entries: HistoryEntry[] = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;

    try {
      entries.push(JSON.parse(line) as HistoryEntry);
    } catch {
      // A torn line from a crash mid-append; skip it rather than lose the whole history.
    }
  }
  return entries.reverse();
}

const LEGACY_SNAPSHOT = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const JSON_SNAPSHOT = /^(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})-(.+)\.json$/;

/** Every snapshot in `versions/`, newest first — the app's JSON ones and any legacy Markdown. */
export async function listVersions(slug: string, opts?: StoreOptions): Promise<VersionRef[]> {
  const dir = join(deckDir(slug, opts), "versions");
  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  // Legacy labels start with the list they snapshot (`b4-before-x`); anything else was the main
  // list of its day. Old STATUS/SIDEBOARD copies are not decklists and cannot be restored.
  let listIds: string[] = [];
  try {
    listIds = Object.keys((await readDeck(slug, opts)).lists);
  } catch {
    // No readable deck: every legacy snapshot stays unattributed.
  }
  const fallbackList = listIds.includes("main") ? "main" : (listIds[0] ?? null);

  const refs: VersionRef[] = [];
  for (const file of files) {
    const legacy = file.match(LEGACY_SNAPSHOT);
    if (legacy) {
      const label = legacy[2];
      const token = label.split("-")[0].toLowerCase();
      const restorable = !/STATUS\.md$/i.test(file) && !/SIDEBOARD/i.test(label);
      refs.push({
        file,
        takenAt: new Date(`${legacy[1]}T00:00:00Z`).toISOString(),
        listId: listIds.includes(token) ? token : fallbackList,
        label,
        legacy: true,
        restorable,
      });
      continue;
    }

    const modern = file.match(JSON_SNAPSHOT);
    if (!modern) continue;

    let meta: Partial<SnapshotFile> = {};
    try {
      meta = JSON.parse(await readFile(join(dir, file), "utf8")) as SnapshotFile;
    } catch {
      // Unreadable snapshot: still list it from the filename.
    }
    refs.push({
      file,
      takenAt: meta.takenAt ?? new Date(`${modern[1]}T${modern[2]}:${modern[3]}:00Z`).toISOString(),
      listId: meta.listId ?? null,
      label: meta.label ?? modern[4],
      legacy: false,
      restorable: true,
    });
  }

  return refs.sort((a, b) => b.takenAt.localeCompare(a.takenAt) || b.file.localeCompare(a.file));
}

/** Read one snapshot as a list. Legacy Markdown snapshots go through the legacy parser. */
export async function readVersion(slug: string, file: string, opts?: StoreOptions): Promise<DeckList> {
  if (file.includes("/") || file.includes("..")) throw new Error(`invalid version file name: ${file}`);

  const text = await readFile(join(deckDir(slug, opts), "versions", file), "utf8");
  if (file.endsWith(".md")) return parseLegacyDeckMd(text, file.replace(/\.md$/, "")).list;

  return (JSON.parse(text) as SnapshotFile).list;
}

/** Write one `MOXFIELD*.txt` per `deck` list and remove exports for lists that no longer exist.
 *  Returns the paths written. */
export async function regenerateMoxfield(slug: string, deck: Deck, opts?: StoreOptions): Promise<string[]> {
  const dir = deckDir(slug, opts);
  const globalPath = opts?.globalPrintingsPath ?? join(REPO_ROOT, GLOBAL_PRINTINGS_PATH);
  let globalPrintings: Record<string, string> = {};
  try {
    globalPrintings = parsePrintings(await readFile(globalPath, "utf8"));
  } catch {
    // No reserve file: every card falls back to Moxfield's default printing.
  }
  const printings = mergePrintings(globalPrintings, printingsFromMeta(deck.cards));

  const wanted: Record<string, true> = {};
  const written: string[] = [];
  for (const [id, list] of Object.entries(deck.lists)) {
    if (list.kind !== "deck") continue;

    const file = moxfieldFileFor(id);
    wanted[file] = true;
    const path = join(dir, file);
    const text = toMoxfield(list, printings).lines.join("\n") + "\n";
    opts?.onBeforeWrite?.(path, text);
    await writeFile(path, text);
    written.push(path);
  }

  for (const file of await readdir(dir)) {
    if (/^MOXFIELD(-.*)?\.txt$/.test(file) && !wanted[file]) await rm(join(dir, file));
  }
  return written;
}
