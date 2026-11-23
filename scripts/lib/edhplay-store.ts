/** EDHPlay game store: everything the browser extension records, on disk under `edhplay-data/`.
 *
 *  It holds other players' usernames, decklists and the pilot's notes on them. This repo is
 *  public, so the folder is git-ignored here and is its own private git repo instead, synced
 *  between machines with `bun run games sync`. It never holds chat: the extension drops it before
 *  sending and `ingestCapture` drops it again. Unlike `data/`, it is NOT a rebuildable cache:
 *  EDHPlay's free tier only shows the last 5 matches, so a game missed here is gone.
 *
 *  Layout (raw first, so new views can be built later from data already collected):
 *    captures/<captureId>/meta.json     CaptureMeta plus `lastIndex`, the highest frame index stored
 *    captures/<captureId>/frames.jsonl  every websocket frame, one JSON object per line
 *    captures/<captureId>/log.jsonl     EDHPlay's own Event Log lines for the capture
 *    playtests/<captureId>/…            solo playtests, same files. Kept apart from captures/ so a
 *                                       playtest can never count toward real results
 *    matches/<matchId>.json             the raw `/matches/me` entry, newest fetch wins
 *    decks/<deckId>/<fetchedAt>.json    raw `/decks/{id}` snapshots, one per distinct content
 *    rooms/<YYYY-MM-DD>.jsonl           snapshots of the public lobby list
 *    profile.json                       the signed-in user's id and username (no email)
 *    players.json                       the pilot's notes on players, by lower-cased username */
import { createHash } from "node:crypto";
import { appendFile, mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { REPO_ROOT } from "./paths.ts";
import { parseCapture, soloLogToFrames, withoutChat, type CaptureMeta, type ParsedGame, type RawFrame } from "./edhplay-parse.ts";

export const EDHPLAY_DIR = process.env.EDHPLAY_DATA_DIR ? resolve(process.env.EDHPLAY_DATA_DIR) : resolve(REPO_ROOT, "edhplay-data");

const SAFE_ID = /^[A-Za-z0-9_-]{1,80}$/;

/** Real games (online rooms, spectated or played) or solo playtests. Stored in separate folders
 *  and read separately, so playtest data never reaches a real-game stat. */
export type CaptureKind = "games" | "playtests";

function kindDir(dir: string, kind: CaptureKind): string {
  return join(dir, kind === "games" ? "captures" : "playtests");
}

function kindOf(meta: CaptureMeta): CaptureKind {
  return meta.source === "solo" ? "playtests" : "games";
}

function safeId(id: string, what: string): string {
  if (!SAFE_ID.test(id)) {
    throw new Error(`${what} "${id}" isn't a safe file name`);
  }
  return id;
}

type Guard<T> = (v: unknown) => v is T;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string";
const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

/** Parse a JSON file and keep it only when `guard` accepts it; a missing, torn or foreign file
 *  reads as null. Files here are written by this module, so a guard failure means corruption. */
async function readJson<T>(path: string, guard: Guard<T>): Promise<T | null> {
  let text = "";
  try {
    text = await readFile(path, "utf8");
  } catch {
    return null;
  }
  try {
    const value: unknown = JSON.parse(text);
    return guard(value) ? value : null;
  } catch {
    return null;
  }
}

/** Settles a `bun run games sync` merge conflict in one of the JSON files, so two machines that
 *  both recorded can always sync. A file stamped with `updatedAt` or `fetchedAt` (match entries,
 *  capture meta, deck snapshots, the profile) keeps the newer copy whole. `players.json` merges by
 *  username, the newer note winning. Anything else returns null, and the sync stops so the
 *  conflict can be merged manually. The `.jsonl` files never reach here: they merge as a union. */
export function mergeStoredJson(ours: unknown, theirs: unknown): unknown {
  if (!isObj(ours) || !isObj(theirs)) {
    return null;
  }

  const stamp = (v: Record<string, unknown>) => (isNum(v.updatedAt) ? v.updatedAt : isNum(v.fetchedAt) ? v.fetchedAt : null);
  const ourStamp = stamp(ours);
  const theirStamp = stamp(theirs);
  if (ourStamp !== null && theirStamp !== null) {
    return theirStamp > ourStamp ? theirs : ours;
  }

  const notes = [...Object.values(ours), ...Object.values(theirs)];
  if (notes.some((n) => !isObj(n) || !isNum(n.updatedAt))) {
    return null;
  }
  const merged: Record<string, unknown> = { ...ours };
  for (const [username, note] of Object.entries(theirs)) {
    const mine = merged[username];
    const mineAt = isObj(mine) && isNum(mine.updatedAt) ? mine.updatedAt : -1;
    const theirAt = isObj(note) && isNum(note.updatedAt) ? note.updatedAt : -1;
    if (theirAt > mineAt) {
      merged[username] = note;
    }
  }
  return merged;
}

/** Write through a temp file and rename, so a crash mid-write never leaves half a JSON file. */
async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(join(path, ".."), { recursive: true });
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2) + "\n");
  await rename(tmp, path);
}

async function readJsonl<T>(path: string, guard: Guard<T>): Promise<T[]> {
  let text = "";
  try {
    text = await readFile(path, "utf8");
  } catch {
    return [];
  }

  const out: T[] = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) {
      continue;
    }
    try {
      const value: unknown = JSON.parse(line);
      if (guard(value)) out.push(value);
    } catch {
      // A torn last line from a crash mid-append. Skipping it loses one frame, not the capture.
    }
  }
  return out;
}

async function listFiles(path: string, ext: string): Promise<string[]> {
  try {
    const names = await readdir(path);
    return names.filter((f) => f.endsWith(ext)).sort();
  } catch {
    return [];
  }
}

async function listDirs(path: string): Promise<string[]> {
  try {
    const entries = await readdir(path, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------------------------
// Ingest: what the Workbench endpoint writes when the extension sends a batch.

/** A frame as the extension sends it: its index in the capture, so a resent batch never
 *  duplicates frames. */
export interface IndexedFrame extends RawFrame {
  i: number;
}

/** One line of EDHPlay's own Event Log, as its message store holds it. */
export interface LogLine {
  i: number;
  id: string;
  playerId: string;
  message: string;
  timestamp: string;
  channel: string;
  cardName?: string;
  cardId?: string;
  metadata?: Record<string, unknown>;
}

export type IngestPayload =
  | { kind: "capture"; meta: CaptureMeta; frames: IndexedFrame[]; log?: LogLine[] }
  | { kind: "capture_end"; captureId: string; endedAt: number }
  | { kind: "matches"; fetchedAt: number; matches: unknown[] }
  | { kind: "deck"; deckId: string; fetchedAt: number; deck: unknown; reason: "own" | "opponent" }
  | { kind: "rooms"; fetchedAt: number; rooms: unknown[] }
  | { kind: "profile"; fetchedAt: number; id: string; username: string };

export interface StoredCaptureMeta extends CaptureMeta {
  lastIndex: number;
  lastLogIndex: number;
  frameCount: number;
  updatedAt: number;
}

const isStoredMeta: Guard<StoredCaptureMeta> = (v): v is StoredCaptureMeta => isObj(v) && isStr(v.captureId) && isNum(v.startedAt) && isNum(v.lastIndex);
const isIndexedFrame: Guard<IndexedFrame> = (v): v is IndexedFrame => isObj(v) && isNum(v.i) && isNum(v.t) && (v.dir === "in" || v.dir === "out");
const isLogLine: Guard<LogLine> = (v): v is LogLine => isObj(v) && isNum(v.i) && isStr(v.id) && isStr(v.message) && isStr(v.playerId);

export interface IngestResult {
  ok: true;
  stored: number;
}

export async function ingest(payload: IngestPayload, dir = EDHPLAY_DIR): Promise<IngestResult> {
  switch (payload.kind) {
    case "capture":
      return ingestCapture(payload.meta, payload.frames, payload.log ?? [], dir);
    case "capture_end": {
      const id = safeId(payload.captureId, "capture id");
      const inGames = join(kindDir(dir, "games"), id, "meta.json");
      const inPlaytests = join(kindDir(dir, "playtests"), id, "meta.json");
      const gamesMeta = await readJson(inGames, isStoredMeta);
      const playtestMeta = gamesMeta ? null : await readJson(inPlaytests, isStoredMeta);
      const path = gamesMeta ? inGames : inPlaytests;
      const meta = gamesMeta ?? playtestMeta;
      if (meta) {
        await writeJson(path, { ...meta, endedAt: payload.endedAt, updatedAt: Date.now() });
      }
      return { ok: true, stored: meta ? 1 : 0 };
    }
    case "matches": {
      let stored = 0;
      for (const m of payload.matches) {
        const id = typeof m === "object" && m !== null && "id" in m && typeof m.id === "string" ? m.id : null;
        if (!id) {
          continue;
        }
        await writeJson(join(dir, "matches", `${safeId(id, "match id")}.json`), { fetchedAt: payload.fetchedAt, match: m });
        stored += 1;
      }
      return { ok: true, stored };
    }
    case "deck": {
      const deckDir = join(dir, "decks", safeId(payload.deckId, "deck id"));
      const body = JSON.stringify(payload.deck);
      const hash = createHash("sha1").update(body).digest("hex").slice(0, 12);
      const existing = await listDeckSnapshots(payload.deckId, dir);
      const latest = existing[existing.length - 1];
      if (latest && latest.hash === hash) {
        return { ok: true, stored: 0 };
      }
      await writeJson(join(deckDir, `${payload.fetchedAt}.json`), { fetchedAt: payload.fetchedAt, reason: payload.reason, hash, deck: payload.deck });
      return { ok: true, stored: 1 };
    }
    case "rooms": {
      const day = new Date(payload.fetchedAt).toISOString().slice(0, 10);
      await mkdir(join(dir, "rooms"), { recursive: true });
      await appendFile(join(dir, "rooms", `${day}.jsonl`), JSON.stringify({ t: payload.fetchedAt, rooms: payload.rooms }) + "\n");
      return { ok: true, stored: payload.rooms.length };
    }
    case "profile": {
      await writeJson(join(dir, "profile.json"), { fetchedAt: payload.fetchedAt, id: payload.id, username: payload.username });
      return { ok: true, stored: 1 };
    }
    default: {
      const _exhaustive: never = payload;
      throw new Error(`unknown ingest kind ${JSON.stringify(_exhaustive)}`);
    }
  }
}

async function ingestCapture(meta: CaptureMeta, frames: IndexedFrame[], log: LogLine[], dir: string): Promise<IngestResult> {
  const capDir = join(kindDir(dir, kindOf(meta)), safeId(meta.captureId, "capture id"));
  await mkdir(capDir, { recursive: true });

  const metaPath = join(capDir, "meta.json");
  const stored = await readJson(metaPath, isStoredMeta);
  const lastIndex = stored?.lastIndex ?? -1;
  const lastLogIndex = stored?.lastLogIndex ?? -1;

  const fresh = frames.filter((f) => f.i > lastIndex).sort((a, b) => a.i - b.i);
  const freshLog = log.filter((l) => l.i > lastLogIndex).sort((a, b) => a.i - b.i);

  // Chat never reaches disk, even from an older extension build that still sends it. The indexes
  // above still advance past a dropped frame, so a resent batch doesn't bring it back.
  const toWrite = fresh.map((f) => ({ ...f, data: withoutChat(f.data) })).filter((f) => f.data !== null);
  const logToWrite = freshLog.filter((l) => !/chat/i.test(l.channel));

  if (toWrite.length > 0) {
    await appendFile(join(capDir, "frames.jsonl"), toWrite.map((f) => JSON.stringify(f)).join("\n") + "\n");
  }
  if (logToWrite.length > 0) {
    await appendFile(join(capDir, "log.jsonl"), logToWrite.map((l) => JSON.stringify(l)).join("\n") + "\n");
  }

  const next: StoredCaptureMeta = {
    ...stored,
    ...meta,
    // The first batch's start time is the capture's start; later batches don't move it.
    startedAt: stored?.startedAt ?? meta.startedAt,
    lastIndex: fresh.length > 0 ? fresh[fresh.length - 1].i : lastIndex,
    lastLogIndex: freshLog.length > 0 ? freshLog[freshLog.length - 1].i : lastLogIndex,
    frameCount: (stored?.frameCount ?? 0) + toWrite.length,
    updatedAt: Date.now(),
  };
  await writeJson(metaPath, next);
  return { ok: true, stored: toWrite.length + logToWrite.length };
}

// ---------------------------------------------------------------------------------------------
// Reads.

export async function listCaptures(kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<StoredCaptureMeta[]> {
  const base = kindDir(dir, kind);
  const ids = await listDirs(base);
  const metas = await Promise.all(ids.map((id) => readJson(join(base, id, "meta.json"), isStoredMeta)));
  return metas.filter((m): m is StoredCaptureMeta => m !== null).sort((a, b) => a.startedAt - b.startedAt);
}

export async function readFrames(captureId: string, kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<IndexedFrame[]> {
  return readJsonl(join(kindDir(dir, kind), safeId(captureId, "capture id"), "frames.jsonl"), isIndexedFrame);
}

export async function readLog(captureId: string, kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<LogLine[]> {
  return readJsonl(join(kindDir(dir, kind), safeId(captureId, "capture id"), "log.jsonl"), isLogLine);
}

export interface StoredMatch {
  fetchedAt: number;
  match: unknown;
}

const isStoredMatch: Guard<StoredMatch> = (v): v is StoredMatch => isObj(v) && isNum(v.fetchedAt) && "match" in v;

export async function listMatches(dir = EDHPLAY_DIR): Promise<StoredMatch[]> {
  const files = await listFiles(join(dir, "matches"), ".json");
  const out = await Promise.all(files.map((f) => readJson(join(dir, "matches", f), isStoredMatch)));
  return out.filter((m): m is StoredMatch => m !== null);
}

export interface DeckSnapshot {
  fetchedAt: number;
  reason: "own" | "opponent";
  hash: string;
  deck: unknown;
}

const isDeckSnapshot: Guard<DeckSnapshot> = (v): v is DeckSnapshot => isObj(v) && isNum(v.fetchedAt) && isStr(v.hash) && (v.reason === "own" || v.reason === "opponent");

export async function listDeckSnapshots(deckId: string, dir = EDHPLAY_DIR): Promise<DeckSnapshot[]> {
  const deckDir = join(dir, "decks", safeId(deckId, "deck id"));
  const files = await listFiles(deckDir, ".json");
  const out = await Promise.all(files.map((f) => readJson(join(deckDir, f), isDeckSnapshot)));
  return out.filter((s): s is DeckSnapshot => s !== null).sort((a, b) => a.fetchedAt - b.fetchedAt);
}

/** Deck ids that have at least one snapshot. */
export async function listSnapshotDeckIds(dir = EDHPLAY_DIR): Promise<string[]> {
  return listDirs(join(dir, "decks"));
}

export interface RoomSnapshot {
  t: number;
  rooms: unknown[];
}

const isRoomSnapshot: Guard<RoomSnapshot> = (v): v is RoomSnapshot => isObj(v) && isNum(v.t) && Array.isArray(v.rooms);

export async function listRoomSnapshots(dir = EDHPLAY_DIR): Promise<RoomSnapshot[]> {
  const files = await listFiles(join(dir, "rooms"), ".jsonl");
  const all: RoomSnapshot[] = [];
  for (const f of files) {
    const snaps = await readJsonl(join(dir, "rooms", f), isRoomSnapshot);
    all.push(...snaps);
  }
  return all;
}

export interface Profile {
  fetchedAt: number;
  id: string;
  username: string;
}

const isProfile: Guard<Profile> = (v): v is Profile => isObj(v) && isStr(v.id) && isStr(v.username) && isNum(v.fetchedAt);

export async function readProfile(dir = EDHPLAY_DIR): Promise<Profile | null> {
  return readJson(join(dir, "profile.json"), isProfile);
}

export interface PlayerNote {
  note: string;
  tags: string[];
  updatedAt: number;
}

const isPlayerNote = (v: unknown): v is PlayerNote => isObj(v) && isStr(v.note) && Array.isArray(v.tags) && v.tags.every(isStr) && isNum(v.updatedAt);

export async function readPlayerNotes(dir = EDHPLAY_DIR): Promise<Record<string, PlayerNote>> {
  const raw = await readJson(join(dir, "players.json"), isObj);
  const out: Record<string, PlayerNote> = {};
  for (const [k, v] of Object.entries(raw ?? {})) {
    if (isPlayerNote(v)) out[k] = v;
  }
  return out;
}

export async function setPlayerNote(username: string, note: string, tags: string[], dir = EDHPLAY_DIR): Promise<void> {
  const notes = await readPlayerNotes(dir);
  notes[username.toLowerCase()] = { note, tags, updatedAt: Date.now() };
  await writeJson(join(dir, "players.json"), notes);
}

// ---------------------------------------------------------------------------------------------
// Parsed games, cached per capture so a page load doesn't re-parse every frame of every game.

interface ParseCacheEntry {
  /** Size, mtime and meta update time of every capture in the session, joined. */
  key: string;
  games: ParsedGame[];
}

/** Bumped whenever `edhplay-parse.ts` changes what it produces, so stale cached parses rebuild. */
export const PARSER_VERSION = 5;

/** How long a room can go quiet and still be the same sitting: a reconnect or a page reload opens a
 *  new socket, and so a new capture, in the middle of a game. */
const SAME_SITTING_MS = 15 * 60_000;

/** A capture counts as still being played when it hasn't ended and was written in the last
 *  10 minutes. A capture that never got its end marker (a crash) stops counting after that. */
const LIVE_MS = 10 * 60_000;

export interface ParsedSession {
  /** The first capture's meta, with the pilot filled in from any capture of the session. */
  meta: StoredCaptureMeta;
  /** Every capture of the sitting, in order. One unless the socket reconnected. */
  captureIds: string[];
  /** The last capture hasn't ended yet. */
  inProgress: boolean;
  games: ParsedGame[];
}

/** Captures of the same room that follow each other within `SAME_SITTING_MS` form one session and
 *  are parsed as one stream, so a reconnect mid-game stays one game (the parser treats the new
 *  socket's `game_state` as a resync). Playtests have no room and are never joined. */
export function groupSessions(captures: StoredCaptureMeta[]): StoredCaptureMeta[][] {
  const groups: StoredCaptureMeta[][] = [];
  for (const meta of captures) {
    const previous = meta.roomId ? groups.filter((g) => g[0].roomId === meta.roomId).pop() : undefined;
    const last = previous?.[previous.length - 1];
    const lastEnd = last ? (last.endedAt ?? last.updatedAt) : 0;
    if (previous && last && meta.source === last.source && meta.spectator === last.spectator && meta.startedAt - lastEnd < SAME_SITTING_MS) {
      previous.push(meta);
    } else {
      groups.push([meta]);
    }
  }
  return groups;
}

export async function loadParsedGames(kind: CaptureKind = "games", dir = EDHPLAY_DIR, now = Date.now()): Promise<ParsedSession[]> {
  const cachePath = join(dir, "cache", `parsed-${kind}-v${PARSER_VERSION}.json`);
  const cacheRaw = await readJson(cachePath, isObj);
  const cache: Record<string, ParseCacheEntry> = {};
  for (const [k, v] of Object.entries(cacheRaw ?? {})) {
    if (isObj(v) && isStr(v.key) && Array.isArray(v.games)) cache[k] = { key: v.key, games: v.games };
  }

  const captures = await listCaptures(kind, dir);
  let dirty = false;
  const out: ParsedSession[] = [];

  for (const group of groupSessions(captures)) {
    const first = group[0];
    const last = group[group.length - 1];
    const meta: StoredCaptureMeta = { ...first, me: group.find((m) => m.me)?.me ?? first.me, endedAt: last.endedAt };
    const inProgress = last.endedAt === undefined && now - last.updatedAt < LIVE_MS;

    // A solo playtest has no socket, so its Event Log lines are the source.
    const keyParts: string[] = [];
    for (const m of group) {
      const file = join(kindDir(dir, kind), m.captureId, m.source === "solo" ? "log.jsonl" : "frames.jsonl");
      try {
        const st = await stat(file);
        keyParts.push(`${m.captureId}:${st.size}:${st.mtimeMs}:${m.updatedAt}`);
      } catch {
        keyParts.push(`${m.captureId}:0:0:${m.updatedAt}`);
      }
    }
    const key = keyParts.join("|");
    const captureIds = group.map((m) => m.captureId);

    const hit = cache[first.captureId];
    if (hit && hit.key === key) {
      out.push({ meta, captureIds, inProgress, games: hit.games });
      continue;
    }

    let frames: RawFrame[] = [];
    if (first.source === "solo") {
      const log = await readLog(first.captureId, kind, dir);
      frames = soloLogToFrames(log, first.players ?? []);
    } else {
      for (const m of group) {
        const fs = await readFrames(m.captureId, kind, dir);
        frames.push(...fs);
      }
      // Captures of one sitting don't overlap in time; sorting keeps them in play order either way.
      frames.sort((a, b) => a.t - b.t);
    }
    const games = parseCapture(meta, frames);
    cache[first.captureId] = { key, games };
    dirty = true;
    out.push({ meta, captureIds, inProgress, games });
  }

  if (dirty) {
    await writeJson(cachePath, cache);
  }
  return out;
}
