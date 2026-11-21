/** EDHPlay game store: everything the browser extension records, on disk under `edhplay-data/`.
 *
 *  This folder is git-ignored on purpose. It holds other players' usernames and chat, and the
 *  repo is public, so it must never be committed. Unlike `data/`, it is NOT a rebuildable cache:
 *  EDHPlay's free tier only shows the last 5 matches, so a game missed here is gone. Back it up.
 *
 *  Layout (raw first, so new views can be built later from data already collected):
 *    captures/<captureId>/meta.json     CaptureMeta plus `lastIndex`, the highest frame index stored
 *    captures/<captureId>/frames.jsonl  every websocket frame, one JSON object per line
 *    captures/<captureId>/log.jsonl     EDHPlay's own Event Log and chat lines for the capture
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
import { parseCapture, soloLogToFrames, type CaptureMeta, type ParsedGame, type RawFrame } from "./edhplay-parse.ts";

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

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const text = await readFile(path, "utf8");
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

/** Write through a temp file and rename, so a crash mid-write never leaves half a JSON file. */
async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(join(path, ".."), { recursive: true });
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2) + "\n");
  await rename(tmp, path);
}

async function readJsonl<T>(path: string): Promise<T[]> {
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
      out.push(JSON.parse(line) as T);
    } catch {
      // A torn last line from a crash mid-append. Skipping it loses one frame, not the capture.
    }
  }
  return out;
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

/** One line of EDHPlay's own Event Log or chat, as its message store holds it. */
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
      const gamesMeta = await readJson<StoredCaptureMeta | null>(inGames, null);
      const path = gamesMeta ? inGames : inPlaytests;
      const meta = gamesMeta ?? (await readJson<StoredCaptureMeta | null>(inPlaytests, null));
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
  const stored = await readJson<StoredCaptureMeta | null>(metaPath, null);
  const lastIndex = stored?.lastIndex ?? -1;
  const lastLogIndex = stored?.lastLogIndex ?? -1;

  const fresh = frames.filter((f) => f.i > lastIndex).sort((a, b) => a.i - b.i);
  const freshLog = log.filter((l) => l.i > lastLogIndex).sort((a, b) => a.i - b.i);

  if (fresh.length > 0) {
    await appendFile(join(capDir, "frames.jsonl"), fresh.map((f) => JSON.stringify(f)).join("\n") + "\n");
  }
  if (freshLog.length > 0) {
    await appendFile(join(capDir, "log.jsonl"), freshLog.map((l) => JSON.stringify(l)).join("\n") + "\n");
  }

  const next: StoredCaptureMeta = {
    ...stored,
    ...meta,
    // The first batch's start time is the capture's start; later batches don't move it.
    startedAt: stored?.startedAt ?? meta.startedAt,
    lastIndex: fresh.length > 0 ? fresh[fresh.length - 1].i : lastIndex,
    lastLogIndex: freshLog.length > 0 ? freshLog[freshLog.length - 1].i : lastLogIndex,
    frameCount: (stored?.frameCount ?? 0) + fresh.length,
    updatedAt: Date.now(),
  };
  await writeJson(metaPath, next);
  return { ok: true, stored: fresh.length + freshLog.length };
}

// ---------------------------------------------------------------------------------------------
// Reads.

export async function listCaptures(kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<StoredCaptureMeta[]> {
  const base = kindDir(dir, kind);
  const ids = await listDirs(base);
  const metas = await Promise.all(ids.map((id) => readJson<StoredCaptureMeta | null>(join(base, id, "meta.json"), null)));
  return metas.filter((m): m is StoredCaptureMeta => m !== null).sort((a, b) => a.startedAt - b.startedAt);
}

export async function readFrames(captureId: string, kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<IndexedFrame[]> {
  return readJsonl<IndexedFrame>(join(kindDir(dir, kind), safeId(captureId, "capture id"), "frames.jsonl"));
}

export async function readLog(captureId: string, kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<LogLine[]> {
  return readJsonl<LogLine>(join(kindDir(dir, kind), safeId(captureId, "capture id"), "log.jsonl"));
}

export interface StoredMatch {
  fetchedAt: number;
  match: unknown;
}

export async function listMatches(dir = EDHPLAY_DIR): Promise<StoredMatch[]> {
  let files: string[] = [];
  try {
    files = (await readdir(join(dir, "matches"))).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const out = await Promise.all(files.map((f) => readJson<StoredMatch | null>(join(dir, "matches", f), null)));
  return out.filter((m): m is StoredMatch => m !== null);
}

export interface DeckSnapshot {
  fetchedAt: number;
  reason: "own" | "opponent";
  hash: string;
  deck: unknown;
}

export async function listDeckSnapshots(deckId: string, dir = EDHPLAY_DIR): Promise<DeckSnapshot[]> {
  const deckDir = join(dir, "decks", safeId(deckId, "deck id"));
  let files: string[] = [];
  try {
    files = (await readdir(deckDir)).filter((f) => f.endsWith(".json")).sort();
  } catch {
    return [];
  }

  const out = await Promise.all(files.map((f) => readJson<DeckSnapshot | null>(join(deckDir, f), null)));
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

export async function listRoomSnapshots(dir = EDHPLAY_DIR): Promise<RoomSnapshot[]> {
  let files: string[] = [];
  try {
    files = (await readdir(join(dir, "rooms"))).filter((f) => f.endsWith(".jsonl")).sort();
  } catch {
    return [];
  }

  const all: RoomSnapshot[] = [];
  for (const f of files) {
    all.push(...(await readJsonl<RoomSnapshot>(join(dir, "rooms", f))));
  }
  return all;
}

export interface Profile {
  fetchedAt: number;
  id: string;
  username: string;
}

export async function readProfile(dir = EDHPLAY_DIR): Promise<Profile | null> {
  return readJson<Profile | null>(join(dir, "profile.json"), null);
}

export interface PlayerNote {
  note: string;
  tags: string[];
  updatedAt: number;
}

export async function readPlayerNotes(dir = EDHPLAY_DIR): Promise<Record<string, PlayerNote>> {
  return readJson<Record<string, PlayerNote>>(join(dir, "players.json"), {});
}

export async function setPlayerNote(username: string, note: string, tags: string[], dir = EDHPLAY_DIR): Promise<void> {
  const notes = await readPlayerNotes(dir);
  notes[username.toLowerCase()] = { note, tags, updatedAt: Date.now() };
  await writeJson(join(dir, "players.json"), notes);
}

// ---------------------------------------------------------------------------------------------
// Parsed games, cached per capture so a page load doesn't re-parse every frame of every game.

interface ParseCacheEntry {
  size: number;
  mtimeMs: number;
  metaUpdatedAt: number;
  games: ParsedGame[];
}

/** Bumped whenever `edhplay-parse.ts` changes what it produces, so stale cached parses rebuild. */
export const PARSER_VERSION = 3;

export async function loadParsedGames(kind: CaptureKind = "games", dir = EDHPLAY_DIR): Promise<{ meta: StoredCaptureMeta; games: ParsedGame[] }[]> {
  const cachePath = join(dir, "cache", `parsed-${kind}-v${PARSER_VERSION}.json`);
  const cache = await readJson<Record<string, ParseCacheEntry>>(cachePath, {});
  const captures = await listCaptures(kind, dir);
  let dirty = false;

  const out: { meta: StoredCaptureMeta; games: ParsedGame[] }[] = [];
  for (const meta of captures) {
    // A solo playtest has no socket, so its Event Log lines are the source.
    const framesPath = join(kindDir(dir, kind), meta.captureId, meta.source === "solo" ? "log.jsonl" : "frames.jsonl");
    let size = 0;
    let mtimeMs = 0;
    try {
      const s = await stat(framesPath);
      size = s.size;
      mtimeMs = s.mtimeMs;
    } catch {
      // A capture with a meta file but no frames yet (a solo game with only log lines).
    }

    const hit = cache[meta.captureId];
    if (hit && hit.size === size && hit.mtimeMs === mtimeMs && hit.metaUpdatedAt === meta.updatedAt) {
      out.push({ meta, games: hit.games });
      continue;
    }

    let frames: RawFrame[] = [];
    if (meta.source === "solo") {
      const log = await readLog(meta.captureId, kind, dir);
      frames = soloLogToFrames(log, meta.players ?? []);
    } else {
      frames = await readFrames(meta.captureId, kind, dir);
    }
    const games = parseCapture(meta, frames);
    cache[meta.captureId] = { size, mtimeMs, metaUpdatedAt: meta.updatedAt, games };
    dirty = true;
    out.push({ meta, games });
  }

  if (dirty) {
    await writeJson(cachePath, cache);
  }
  return out;
}
