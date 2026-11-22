/** Runs inside edhplay.com (the page's own JavaScript world, from document_start) so it can see
 *  what the page sees:
 *
 *  1. The game websocket. Every frame of every room connection, both directions, read only. The
 *     URL's token is never stored.
 *  2. EDHPlay's own Event Log, found by shape in the game bundle. Solo playtests have no socket,
 *     so this is their only source; online games keep it as readable text.
 *
 *  Chat is never recorded. Chat frames and chat lines are dropped here, before anything leaves
 *  the page (`withoutChat`), and the Workbench store drops them again on ingest.
 *  3. The site's API, with the site's own token, after a game: match history, the decks in those
 *     matches, the signed-in profile, and lobby-list snapshots. Never during a game: the pilot
 *     doesn't want opponents' decklists while playing.
 *
 *  Everything goes to the relay (content.ts) with window.postMessage. Frames and log lines are
 *  numbered here, because this page outlives any restart of the extension's service worker, and
 *  the Workbench uses the numbers to drop resent duplicates. */
import { withoutChat, type CaptureMeta, type RawFrame } from "../../../scripts/lib/edhplay-parse.ts";
import type { LogLine } from "../../../scripts/lib/edhplay-store.ts";
import { isBackgroundEnvelope, type PageEnvelope, type PageMessage } from "./messages";
import { matchSeatsToDecks, type LoadedDeck } from "./core";

const VERSION = "0.1.0";
const API = "https://api.edhplay.com/api/v1";

function post(msg: PageMessage): void {
  const envelope: PageEnvelope = { __lens: "page", msg };
  window.postMessage(envelope, location.origin);
}

interface Capture {
  meta: CaptureMeta;
  frames: (RawFrame & { i: number })[];
  /** Kept with the frames so a restarted service worker can be refilled from the page. */
  log: LogLine[];
  nextFrame: number;
  nextLog: number;
  open: boolean;
  /** Playtest seats seen in log lines, in order of first appearance. */
  seatIds: string[];
  seatNames: Record<string, string>;
  playedBySeat: Record<string, string[]>;
}

const captures: Record<string, Capture> = {};
let activeWs: Capture | null = null;
let activeSolo: Capture | null = null;
let me: { id: string; username: string } | undefined;

// ---------------------------------------------------------------------------------------------
// 1. The game socket.

const NativeWebSocket = window.WebSocket;

function parseJson(data: unknown): unknown {
  try {
    const text = typeof data === "string" ? data : data instanceof ArrayBuffer ? new TextDecoder().decode(data) : null;
    return text === null ? null : JSON.parse(text);
  } catch {
    return null;
  }
}

function typeOf(data: unknown): string {
  return typeof data === "object" && data !== null && "type" in data && typeof data.type === "string" ? data.type : "";
}

/** A closed capture's frames stay for two minutes, long enough for a restarted service worker to
 *  ask for them, then go, so a long session doesn't keep every game in EDHPlay's memory. */
function release(capture: Capture): void {
  setTimeout(() => {
    if (!capture.open) delete captures[capture.meta.captureId];
  }, 120_000);
}

/** Tells other EDHPlay tabs a room is open, so none of them fetches decklists meanwhile. */
const ROOM_OPEN_KEY = "edhplay-lens:room-open-at";

function markRoomOpen(): void {
  try {
    localStorage.setItem(ROOM_OPEN_KEY, String(Date.now()));
  } catch {
    // Storage blocked: this tab still checks its own socket.
  }
}

function roomOpenAnywhere(): boolean {
  if (activeWs?.open) return true;
  try {
    const at = Number(localStorage.getItem(ROOM_OPEN_KEY) ?? 0);
    return Date.now() - at < 30_000;
  } catch {
    return false;
  }
}

function record(capture: Capture, dir: "in" | "out", raw: unknown): void {
  const data = withoutChat(raw);
  const type = typeOf(data);
  if (type === "ping" || type === "pong" || data === null) {
    return;
  }

  const frame = { i: capture.nextFrame++, t: Date.now(), dir, data };
  capture.frames.push(frame);
  post({ kind: "frame", captureId: capture.meta.captureId, frame });

  if (type === "game_state" && typeof data === "object" && data !== null && "protocol_version" in data && typeof data.protocol_version === "number") {
    capture.meta.protocolVersion = data.protocol_version;
  }
}

function tap(ws: WebSocket, rawUrl: string): void {
  let url: URL;
  try {
    url = new URL(rawUrl, location.href);
  } catch {
    return;
  }
  if (!url.pathname.endsWith("/ws/game")) {
    return;
  }

  const meta: CaptureMeta = {
    captureId: crypto.randomUUID(),
    source: "ws",
    roomId: url.searchParams.get("room_id"),
    spectator: url.searchParams.get("spectator") === "true",
    pageUrl: location.origin + location.pathname,
    startedAt: Date.now(),
    me,
    extensionVersion: VERSION,
  };
  const capture: Capture = { meta, frames: [], log: [], nextFrame: 0, nextLog: 0, open: true, seatIds: [], seatNames: {}, playedBySeat: {} };
  captures[meta.captureId] = capture;
  activeWs = capture;
  closeSolo();
  post({ kind: "capture_start", meta });
  markRoomOpen();

  ws.addEventListener("message", (e: MessageEvent) => record(capture, "in", parseJson(e.data)));
  const send = ws.send.bind(ws);
  ws.send = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    record(capture, "out", parseJson(data));
    send(data);
  };
  ws.addEventListener("close", () => {
    capture.open = false;
    release(capture);
    try {
      localStorage.removeItem(ROOM_OPEN_KEY);
    } catch {
      // Nothing to clear.
    }
    capture.meta.endedAt = Date.now();
    post({ kind: "capture_end", captureId: meta.captureId, endedAt: capture.meta.endedAt });
    if (activeWs === capture) {
      activeWs = null;
    }
    // The match lands in EDHPlay's history a moment after the room closes.
    setTimeout(() => void syncHistory(true), 4000);
  });
}

class LensWebSocket extends NativeWebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);
    try {
      tap(this, String(url));
    } catch {
      // Recording must never break the game.
    }
  }
}
window.WebSocket = LensWebSocket;

// ---------------------------------------------------------------------------------------------
// 2. EDHPlay's Event Log. The same store holds chat, which is never read.

interface StoreLike {
  getState: () => unknown;
  subscribe: (listener: (state: unknown) => void) => () => void;
}

function isStore(v: unknown): v is StoreLike {
  return typeof v === "function" && "getState" in v && typeof v.getState === "function" && "subscribe" in v && typeof v.subscribe === "function";
}

function messagesOf(state: unknown): unknown[] {
  if (typeof state !== "object" || state === null) return [];
  return "eventMessages" in state && Array.isArray(state.eventMessages) ? state.eventMessages : [];
}

function toLogLine(m: unknown, i: number): LogLine | null {
  if (typeof m !== "object" || m === null) return null;
  const get = (k: string): unknown => {
    const v: unknown = Reflect.get(m, k);
    return v;
  };
  const id = get("id");
  const message = get("message");
  if (typeof id !== "string" || typeof message !== "string") return null;
  const metadata = get("metadata");
  return {
    i,
    id,
    playerId: typeof get("playerId") === "string" ? String(get("playerId")) : "",
    message,
    timestamp: typeof get("timestamp") === "string" ? String(get("timestamp")) : new Date().toISOString(),
    channel: typeof get("channel") === "string" ? String(get("channel")) : "event",
    cardName: typeof get("cardName") === "string" ? String(get("cardName")) : undefined,
    cardId: typeof get("cardId") === "string" ? String(get("cardId")) : undefined,
    metadata: typeof metadata === "object" && metadata !== null && !Array.isArray(metadata) ? { ...metadata } : undefined,
  };
}

const seenMessageIds: Record<string, true> = {};
let storeHooked = false;

function onMessages(state: unknown): void {
  for (const m of messagesOf(state)) {
    const id = typeof m === "object" && m !== null && "id" in m && typeof m.id === "string" ? m.id : null;
    if (!id || seenMessageIds[id]) continue;
    seenMessageIds[id] = true;

    const text = typeof m === "object" && m !== null && "message" in m && typeof m.message === "string" ? m.message : "";
    if (!activeWs && location.pathname.startsWith("/playtest")) {
      if (/^New game started/i.test(text) || !activeSolo) {
        startSolo();
      }
    }

    const capture = activeWs ?? activeSolo;
    if (!capture) continue;
    const line = toLogLine(m, capture.nextLog++);
    if (!line || /chat/i.test(line.channel)) continue;
    capture.log.push(line);
    post({ kind: "log", captureId: capture.meta.captureId, line });
    if (capture.meta.source === "solo") {
      noteSoloSeat(capture, line);
    }
  }
}

// The browser keeps 250 resource entries by default; card images fill that before the game
// bundle loads, and the store hook below finds the bundle by its entry.
try {
  performance.setResourceTimingBufferSize(5000);
} catch {
  // Older engines: the script and modulepreload scan below still finds it.
}

function gameBundleUrls(): string[] {
  const fromTiming = performance.getEntriesByType("resource").map((e) => e.name);
  const fromTags = [...document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>("script[src], link[rel=modulepreload]")].map((el) =>
    el instanceof HTMLScriptElement ? el.src : el.href,
  );
  return [...new Set([...fromTiming, ...fromTags])].filter((n) => /\/assets\/GameLayout-[^/]+\.js$/.test(n));
}

async function hookMessageStore(): Promise<void> {
  if (storeHooked) return;
  const urls = gameBundleUrls();

  for (const url of urls) {
    try {
      const mod: Record<string, unknown> = await import(/* @vite-ignore */ url);
      for (const value of Object.values(mod)) {
        if (!isStore(value)) continue;
        const state = value.getState();
        if (typeof state === "object" && state !== null && "eventMessages" in state && "chatMessages" in state) {
          storeHooked = true;
          onMessages(state);
          value.subscribe(onMessages);
          return;
        }
      }
    } catch {
      // The bundle changed shape. Socket capture still works; only the text log is missing.
    }
  }
}

let lastPath = location.pathname;
setInterval(() => {
  void hookMessageStore();
  if (activeWs?.open) markRoomOpen();
  // Entering a playtest starts a fresh deck list, so seats can't match a deck from an earlier one.
  if (location.pathname.startsWith("/playtest") && !lastPath.startsWith("/playtest")) {
    loadedDecks.length = 0;
  }
  lastPath = location.pathname;
  // EDHPlay is a single-page app: leaving a playtest is a route change, not a page unload.
  if (activeSolo && !location.pathname.startsWith("/playtest")) {
    closeSolo();
  }
}, 2000);

// Solo playtests: one capture per game, seats and decks matched from what each seat played.

function startSolo(): void {
  closeSolo();
  const meta: CaptureMeta = {
    captureId: crypto.randomUUID(),
    source: "solo",
    roomId: null,
    spectator: false,
    pageUrl: location.origin + location.pathname,
    startedAt: Date.now(),
    extensionVersion: VERSION,
    players: [],
  };
  const capture: Capture = { meta, frames: [], log: [], nextFrame: 0, nextLog: 0, open: true, seatIds: [], seatNames: {}, playedBySeat: {} };
  captures[meta.captureId] = capture;
  activeSolo = capture;
  post({ kind: "capture_start", meta });
}

function closeSolo(): void {
  if (!activeSolo) return;
  const capture = activeSolo;
  activeSolo = null;
  capture.open = false;
  release(capture);
  capture.meta.endedAt = Date.now();
  post({ kind: "capture_end", captureId: capture.meta.captureId, endedAt: capture.meta.endedAt });
}

function noteSoloSeat(capture: Capture, line: LogLine): void {
  // EDHPlay's own lines ("New game started!", "Turn passed to Player 2") come from "system".
  if (!line.playerId || line.playerId === "system") return;
  let changed = false;
  if (!capture.seatIds.includes(line.playerId)) {
    // Seats first speak in seat order (each keeps or mulligans in turn), so the Nth new id is Player N.
    capture.seatIds.push(line.playerId);
    capture.seatNames[line.playerId] = `Player ${capture.seatIds.length}`;
    changed = true;
  }
  if (line.cardName) {
    (capture.playedBySeat[line.playerId] ??= []).push(line.cardName);
    changed = true;
  }
  if (!changed) return;

  const decks = matchSeatsToDecks(capture.playedBySeat, loadedDecks);
  capture.meta.players = capture.seatIds.map((playerId) => ({
    playerId,
    username: capture.seatNames[playerId] ?? playerId,
    deckId: decks[playerId]?.deckId,
    deckName: decks[playerId]?.name,
  }));
  const first = capture.seatIds[0];
  capture.meta.me = first ? { id: first, username: capture.seatNames[first] ?? "Player 1" } : undefined;
  post({ kind: "capture_meta", meta: capture.meta });
}

// ---------------------------------------------------------------------------------------------
// 3. The site's API.

const loadedDecks: LoadedDeck[] = [];

/** Watch the decks the page itself loads (a playtest loads one per seat), to tell which seat
 *  played which deck. Read-only: the response is cloned, the page gets the original. */
const nativeFetch = window.fetch.bind(window);
async function watchedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await nativeFetch(input, init);
  try {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    // A playtest seat loads its deck from `/decks/{id}/game`; the deck page uses `/decks/{id}`.
    const m = /\/api\/v1\/decks\/([0-9a-f-]{36})(?:\/game)?(?:\?|$)/.exec(url);
    if (m && res.ok && (!init?.method || init.method === "GET") && location.pathname.startsWith("/playtest")) {
      const body: unknown = await res.clone().json();
      noteLoadedDeck(m[1], body);
    }
  } catch {
    // Never let watching break the page's own request.
  }
  return res;
}
// defineProperty rather than assignment: the page keeps calling `fetch` exactly as before.
Object.defineProperty(window, "fetch", { value: watchedFetch, configurable: true, writable: true });

function noteLoadedDeck(deckId: string, body: unknown): void {
  if (typeof body !== "object" || body === null) return;
  const name = "name" in body && typeof body.name === "string" ? body.name : "";
  const cards: string[] = [];
  const list = "cards" in body && Array.isArray(body.cards) ? body.cards : [];
  for (const c of list) {
    if (typeof c === "object" && c !== null && "name" in c && typeof c.name === "string") cards.push(c.name);
  }
  const existing = loadedDecks.findIndex((d) => d.deckId === deckId);
  if (existing >= 0) loadedDecks.splice(existing, 1);
  loadedDecks.push({ deckId, name, cards });
}

function token(): string | null {
  try {
    return localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

async function api(path: string): Promise<unknown> {
  const t = token();
  if (!t) return null;
  const res = await nativeFetch(API + path, { headers: { Authorization: `Bearer ${t}` } });
  if (!res.ok) return null;
  return res.json();
}

async function loadProfile(): Promise<void> {
  const body = await api("/users/me");
  if (typeof body !== "object" || body === null) return;
  const id = "id" in body && typeof body.id === "string" ? body.id : null;
  const username = "username" in body && typeof body.username === "string" ? body.username : null;
  if (!id || !username) return;

  me = { id, username };
  // Only the id and username leave the page; the profile also holds the email address.
  post({ kind: "profile", fetchedAt: Date.now(), id, username });
  for (const c of Object.values(captures)) {
    if (c.meta.source === "ws" && !c.meta.me) {
      c.meta.me = me;
      post({ kind: "capture_meta", meta: c.meta });
    }
  }
}

const fetchedDecks: Record<string, true> = {};
let lastHistorySync = 0;

/** Match history plus every deck in it. Skipped while a room is open, so no opponent's list is
 *  ever fetched during a game. */
async function syncHistory(force = false): Promise<void> {
  if (roomOpenAnywhere()) return;
  if (!force && Date.now() - lastHistorySync < 120_000) return;
  lastHistorySync = Date.now();

  const body = await api("/matches/me?limit=50");
  const matches = typeof body === "object" && body !== null && "data" in body && Array.isArray(body.data) ? body.data : [];
  if (matches.length === 0) return;
  post({ kind: "matches", fetchedAt: Date.now(), matches });

  for (const match of matches) {
    const players = typeof match === "object" && match !== null && "players" in match && Array.isArray(match.players) ? match.players : [];
    for (const p of players) {
      if (roomOpenAnywhere()) return;
      if (typeof p !== "object" || p === null) continue;
      const deckId = "deck_id" in p && typeof p.deck_id === "string" ? p.deck_id : null;
      if (!deckId || fetchedDecks[deckId]) continue;
      fetchedDecks[deckId] = true;
      const deck = await api(`/decks/${deckId}`);
      if (deck) {
        const own = "is_viewer" in p && p.is_viewer === true;
        post({ kind: "deck", deckId, fetchedAt: Date.now(), deck, reason: own ? "own" : "opponent" });
      }
    }
  }
}

let lastRooms = 0;
async function snapshotRooms(): Promise<void> {
  if (!location.pathname.startsWith("/dashboard") || Date.now() - lastRooms < 5 * 60_000) return;
  lastRooms = Date.now();
  const body = await api("/rooms?limit=50");
  const rooms = typeof body === "object" && body !== null && "data" in body && Array.isArray(body.data) ? body.data : [];
  if (rooms.length > 0) post({ kind: "rooms", fetchedAt: Date.now(), rooms });
}

// The background asks for a replay after its service worker restarts and loses its live state.
window.addEventListener("message", (e: MessageEvent) => {
  if (e.source !== window || !isBackgroundEnvelope(e.data)) return;
  if (e.data.msg.kind === "request_replay") {
    for (const capture of Object.values(captures)) {
      post({ kind: "replay", meta: capture.meta, frames: capture.frames, log: capture.log, open: capture.open });
    }
  }
});

window.addEventListener("pagehide", () => closeSolo());

setTimeout(() => {
  void loadProfile();
  void syncHistory();
  void snapshotRooms();
}, 1500);
setInterval(() => {
  void syncHistory();
  void snapshotRooms();
}, 60_000);
