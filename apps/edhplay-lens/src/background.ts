/** The extension's service worker.
 *
 *  - Every record the page sends goes into an IndexedDB outbox first, then to the Workbench's
 *    `/api/edhplay/ingest`. When the Workbench is down the outbox keeps it and retries every 30
 *    seconds, so a game played with the dev server off still lands once it's back.
 *  - It keeps a live parse of each tab's game (the same parser the Workbench uses) and asks the
 *    Workbench for history and combos for the side panel. Never decklists.
 *  - The toolbar badge says REC while a game is being recorded, TEST during a playtest and ! when
 *    records are waiting for the Workbench (`badgeFor`). */
import { GameTracker, soloLogToFrames, type CaptureMeta, type RawFrame } from "../../../scripts/lib/edhplay-parse.ts";
import type { IngestPayload, LogLine } from "../../../scripts/lib/edhplay-store.ts";
import type { Dossier } from "../../../scripts/lib/edhplay-games.ts";
import { isPageMessage, type PageMessage } from "./messages";
import { badgeFor, liveKey, liveRequest, panelView, showsFinishedGame, type LiveComboView, type PanelView } from "./core";

const DEFAULT_WORKBENCH = "http://localhost:3200";
const FLUSH_MS = 1500;

// ---------------------------------------------------------------------------------------------
// Settings.

async function workbenchUrl(): Promise<string> {
  const got = await chrome.storage.local.get(["workbenchUrl"]);
  const url = got.workbenchUrl;
  return typeof url === "string" && url ? url.replace(/\/$/, "") : DEFAULT_WORKBENCH;
}

// ---------------------------------------------------------------------------------------------
// The outbox: a tiny IndexedDB queue of ingest payloads, sent in order.

let dbPromise: Promise<IDBDatabase> | null = null;

/** One connection for the worker's lifetime; a failed open is retried on the next call. */
function openDb(): Promise<IDBDatabase> {
  dbPromise ??= openDbOnce().catch((err) => {
    dbPromise = null;
    throw err;
  });
  return dbPromise;
}

function openDbOnce(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("edhplay-lens", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("outbox", { keyPath: "id", autoIncrement: true });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

interface OutboxItem {
  id: number;
  payload: IngestPayload;
}

async function outboxAdd(payload: IngestPayload): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("outbox", "readwrite");
    tx.objectStore("outbox").add({ payload });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function outboxAll(): Promise<OutboxItem[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction("outbox", "readonly").objectStore("outbox").getAll();
    req.onsuccess = () => {
      const rows: unknown[] = Array.isArray(req.result) ? req.result : [];
      resolve(rows.filter(isOutboxItem));
    };
    req.onerror = () => reject(req.error);
  });
}

function isOutboxItem(v: unknown): v is OutboxItem {
  return typeof v === "object" && v !== null && "id" in v && typeof v.id === "number" && "payload" in v;
}

async function outboxDelete(id: number): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("outbox", "readwrite");
    tx.objectStore("outbox").delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** The idle panel's summary of what's stored: the pilot's record and their last real game. */
export interface StoredSummary {
  record: { games: number; wins: number; losses: number };
  lastGame: {
    id: string;
    captureIds: string[];
    result: string;
    startedAt: number;
    rounds: number;
    myCommander?: string;
    opponents: string[];
  } | null;
}

interface Status {
  workbench: "ok" | "down" | "unknown";
  queued: number;
  lastError?: string;
  lastSentAt?: number;
  workbenchUrl: string;
  version: string;
  stored?: { captures: number; playtests: number; matches: number; me: string | null };
  summary?: StoredSummary;
}

const status: Status = { workbench: "unknown", queued: 0, workbenchUrl: DEFAULT_WORKBENCH, version: chrome.runtime.getManifest().version };

async function post(path: string, body: unknown): Promise<Response> {
  const base = await workbenchUrl();
  status.workbenchUrl = base;
  return fetch(base + path, {
    method: "POST",
    headers: { "content-type": "application/json", "x-edhplay-lens": "1" },
    body: JSON.stringify(body),
  });
}

let draining = false;
async function drain(): Promise<void> {
  if (draining) return;
  draining = true;
  try {
    const items = await outboxAll();
    status.queued = items.length;
    for (const item of items) {
      let res: Response;
      try {
        res = await post("/api/edhplay/ingest", item.payload);
      } catch (err) {
        status.workbench = "down";
        status.lastError = `The Workbench at ${status.workbenchUrl} isn't answering. Records wait here until it's running again.`;
        void err;
        break;
      }
      if (res.status === 400 || res.status === 422) {
        // The payload itself is bad; keeping it would block every record queued behind it.
        const text = await res.text();
        status.lastError = `The Workbench refused a record (${res.status}): ${text.slice(0, 200)}`;
      } else if (!res.ok) {
        // A disk error, a wrong address (404) or an older Workbench: keep everything and retry.
        status.workbench = "down";
        status.lastError = `The Workbench answered ${res.status}, so records wait here and retry every 30 seconds. Check the address in Settings if this keeps happening.`;
        break;
      } else {
        status.workbench = "ok";
        status.lastSentAt = Date.now();
        status.lastError = undefined;
      }
      await outboxDelete(item.id);
      status.queued -= 1;
    }
  } finally {
    draining = false;
    void updateBadges();
    broadcast();
  }
}

async function checkWorkbench(): Promise<void> {
  try {
    const base = await workbenchUrl();
    status.workbenchUrl = base;
    // The summary costs the Workbench a full read of the records, so only an open panel asks.
    // Only the idle and finished panels show the summary, so a live game doesn't pay for it.
    const wantSummary = ports.some((p) => {
      const v = p.tabId === null ? null : viewFor(p.tabId);
      return !v || v.phase === "idle" || v.ended === true;
    });
    const res = await fetch(`${base}/api/edhplay/status${wantSummary ? "?summary=1" : ""}`, { headers: { "x-edhplay-lens": "1" } });
    if (!res.ok) throw new Error(String(res.status));
    const body: unknown = await res.json();
    status.workbench = "ok";
    // The Workbench answers again, so an "isn't answering" line from an earlier check is stale.
    if (status.lastError?.includes("isn't answering")) status.lastError = undefined;
    if (typeof body === "object" && body !== null) {
      const n = (k: string): number => {
        const v: unknown = Reflect.get(body, k);
        return typeof v === "number" ? v : 0;
      };
      const meV: unknown = Reflect.get(body, "me");
      status.stored = { captures: n("captures"), playtests: n("playtests"), matches: n("matches"), me: typeof meV === "string" ? meV : null };
      const summary: unknown = Reflect.get(body, "summary");
      if (isSummary(summary)) status.summary = summary;
    }
  } catch {
    status.workbench = "down";
    status.lastError = `The Workbench at ${status.workbenchUrl} isn't answering. Start it with bun run dev in apps/collection-visualizer, and anything recorded meanwhile waits here until it's back.`;
  }
  void updateBadges();
  broadcast();
}

function isSummary(v: unknown): v is StoredSummary {
  if (typeof v !== "object" || v === null || !("record" in v) || !("lastGame" in v)) return false;
  const record: unknown = v.record;
  const last: unknown = v.lastGame;
  const recordOk = typeof record === "object" && record !== null && "wins" in record && typeof record.wins === "number" && "losses" in record && typeof record.losses === "number" && "games" in record && typeof record.games === "number";
  const lastOk = last === null || (typeof last === "object" && "id" in last && typeof last.id === "string" && "opponents" in last && Array.isArray(last.opponents) && "captureIds" in last && Array.isArray(last.captureIds));
  return recordOk && lastOk;
}

// ---------------------------------------------------------------------------------------------
// Capture buffers: frames and log lines batched into one ingest payload every 1.5 seconds.

interface Buffer {
  meta: CaptureMeta;
  frames: (RawFrame & { i: number })[];
  log: LogLine[];
  metaDirty: boolean;
}

const buffers: Record<string, Buffer> = {};
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flush();
  }, FLUSH_MS);
}

async function flush(): Promise<void> {
  for (const b of Object.values(buffers)) {
    // Chunks stay well under the Workbench's 5000-per-payload limit, even after a full replay.
    while (b.frames.length > 0 || b.log.length > 0 || b.metaDirty) {
      const payload: IngestPayload = { kind: "capture", meta: b.meta, frames: b.frames.splice(0, 2000), log: b.log.splice(0, 2000) };
      b.metaDirty = false;
      await outboxAdd(payload);
    }
  }
  void drain();
}

function bufferFor(meta: CaptureMeta): Buffer {
  const existing = buffers[meta.captureId];
  if (existing) return existing;
  const created: Buffer = { meta, frames: [], log: [], metaDirty: true };
  buffers[meta.captureId] = created;
  return created;
}

// ---------------------------------------------------------------------------------------------
// Live state per tab, for the side panel.

interface TabState {
  meta: CaptureMeta;
  tracker: GameTracker;
  /** The socket frames so far, to rebuild the tracker when the meta learns who the pilot is. */
  frames: RawFrame[];
  /** Solo playtests are re-parsed from their whole log on each change. */
  soloLog: LogLine[];
  open: boolean;
  live: { dossiers: Dossier[]; combos: Record<string, LiveComboView> } | null;
  liveKey: string;
  liveTimer: ReturnType<typeof setTimeout> | null;
}

const tabs: Record<number, TabState> = {};
const captureTab: Record<string, number> = {};
const replayRequested: Record<number, true> = {};

function startTab(tabId: number, meta: CaptureMeta): TabState {
  const state: TabState = { meta, tracker: new GameTracker(meta), frames: [], soloLog: [], open: true, live: null, liveKey: "", liveTimer: null };
  tabs[tabId] = state;
  captureTab[meta.captureId] = tabId;
  delete replayRequested[tabId];
  return state;
}

function tabFor(tabId: number, captureId: string): TabState | null {
  const state = tabs[tabId];
  if (state && state.meta.captureId === captureId) return state;
  // The worker restarted mid-game and lost the parse. Ask the page for everything once.
  if (!replayRequested[tabId]) {
    replayRequested[tabId] = true;
    chrome.tabs.sendMessage(tabId, { kind: "request_replay" }).catch(() => undefined);
  }
  return null;
}

function rebuildSolo(state: TabState): void {
  const tracker = new GameTracker(state.meta);
  for (const f of soloLogToFrames(state.soloLog, state.meta.players ?? [])) tracker.push(f);
  state.tracker = tracker;
}

function scheduleLive(tabId: number): void {
  const state = tabs[tabId];
  if (!state) return;
  const req = liveRequest(state.tracker.live(), state.tracker.lobby());
  const key = liveKey(req);
  if (key === state.liveKey || req.players.length + req.revealed.length === 0) return;
  // The table changed (a rematch, a new seat): the old combo alerts don't apply anymore.
  if (state.live) state.live = { ...state.live, combos: {} };
  if (state.liveTimer) clearTimeout(state.liveTimer);
  state.liveTimer = setTimeout(async () => {
    state.liveTimer = null;
    try {
      const res = await post("/api/edhplay/live", { ...req, captureId: state.meta.captureId });
      if (!res.ok) return;
      const body: unknown = await res.json();
      if (typeof body === "object" && body !== null && "dossiers" in body && Array.isArray(body.dossiers) && "combos" in body && typeof body.combos === "object" && body.combos !== null) {
        const dossiers: Dossier[] = body.dossiers;
        const combos: Record<string, LiveComboView> = { ...body.combos };
        state.live = { dossiers, combos };
        state.liveKey = key;
        broadcast();
      }
    } catch {
      // The Workbench is down; the panel still shows the live game without history.
    }
  }, 2500);
}

function viewFor(tabId: number): PanelView {
  const state = tabs[tabId];
  if (!state) return panelView(null, null, null);
  // After the room closes, or once every opponent is out while the room stays open, the parser
  // has no live game, so show the last one as it ended until a new game starts.
  const games = state.tracker.games();
  const finished = games[games.length - 1] ?? null;
  const live = state.tracker.live();
  const showFinished = showsFinishedGame({
    live: live !== null,
    finished,
    roomOpen: state.open,
    lobby: state.tracker.lobby(),
  });
  const game = live ?? (showFinished ? finished : null);
  return { ...panelView(game, state.tracker.lobby(), state.live, state.meta.players ?? []), ended: !state.open || showFinished };
}

// ---------------------------------------------------------------------------------------------
// Messages from the page (through the relay).

function handle(msg: PageMessage, tabId: number | undefined): void {
  switch (msg.kind) {
    case "capture_start": {
      bufferFor(msg.meta);
      if (tabId !== undefined) startTab(tabId, msg.meta);
      scheduleFlush();
      break;
    }
    case "capture_meta": {
      const b = bufferFor(msg.meta);
      b.meta = msg.meta;
      b.metaDirty = true;
      if (tabId !== undefined) {
        const state = tabs[tabId];
        if (state && state.meta.captureId === msg.meta.captureId) {
          const learntMe = !state.meta.me && msg.meta.me;
          state.meta = msg.meta;
          if (msg.meta.source === "solo") {
            rebuildSolo(state);
          } else if (learntMe) {
            // Seats were parsed before the profile arrived; parse again so the pilot's seat is "you".
            state.tracker = new GameTracker(msg.meta);
            for (const f of state.frames) state.tracker.push(f);
          }
        }
      }
      scheduleFlush();
      break;
    }
    case "frame": {
      const b = buffers[msg.captureId];
      if (b) {
        b.frames.push(msg.frame);
        scheduleFlush();
      }
      if (tabId !== undefined) {
        const state = tabFor(tabId, msg.captureId);
        state?.frames.push(msg.frame);
        state?.tracker.push(msg.frame);
      }
      break;
    }
    case "log": {
      const b = buffers[msg.captureId];
      if (b) {
        b.log.push(msg.line);
        scheduleFlush();
      }
      if (tabId !== undefined) {
        const state = tabFor(tabId, msg.captureId);
        if (state && state.meta.source === "solo") {
          state.soloLog.push(msg.line);
          rebuildSolo(state);
        }
      }
      break;
    }
    case "capture_end": {
      // Once the game is stored, refresh the summary so the finished panel can link its report.
      void flush()
        .then(() => outboxAdd({ kind: "capture_end", captureId: msg.captureId, endedAt: msg.endedAt }))
        .then(() => drain())
        .then(() => checkWorkbench());
      // A socket's close event lands after EDHPlay has already opened the next one, so only close
      // the tab's capture when it's still the one ending.
      const t = captureTab[msg.captureId];
      if (t !== undefined && tabs[t]?.meta.captureId === msg.captureId) tabs[t].open = false;
      delete captureTab[msg.captureId];
      delete buffers[msg.captureId];
      // After a worker restart this tab may be unknown here while Chrome still shows its REC badge.
      if (tabId !== undefined && !tabs[tabId]) void setBadge(badgeFor(null, status.queued, status.workbench), tabId);
      break;
    }
    case "replay": {
      // After a worker restart the page sends everything it still holds. Frames and log lines go
      // back into the outbox (the Workbench drops the ones it already has) and the live parse is
      // rebuilt for the capture still open.
      const b = bufferFor(msg.meta);
      b.meta = msg.meta;
      b.metaDirty = true;
      b.frames.push(...msg.frames);
      b.log.push(...msg.log);
      scheduleFlush();
      if (!msg.open) {
        const endedAt = msg.meta.endedAt ?? Date.now();
        void flush().then(() => outboxAdd({ kind: "capture_end", captureId: msg.meta.captureId, endedAt })).then(() => drain());
        delete buffers[msg.meta.captureId];
        break;
      }
      if (tabId === undefined) break;
      const state = startTab(tabId, msg.meta);
      if (msg.meta.source === "solo") {
        state.soloLog.push(...msg.log);
        rebuildSolo(state);
      } else {
        state.frames.push(...msg.frames);
        for (const f of msg.frames) state.tracker.push(f);
      }
      break;
    }
    case "matches":
      void outboxAdd({ kind: "matches", fetchedAt: msg.fetchedAt, matches: msg.matches }).then(() => drain());
      break;
    case "deck":
      void outboxAdd({ kind: "deck", deckId: msg.deckId, fetchedAt: msg.fetchedAt, deck: msg.deck, reason: msg.reason }).then(() => drain());
      break;
    case "rooms":
      void outboxAdd({ kind: "rooms", fetchedAt: msg.fetchedAt, rooms: msg.rooms }).then(() => drain());
      break;
    case "profile":
      void outboxAdd({ kind: "profile", fetchedAt: msg.fetchedAt, id: msg.id, username: msg.username }).then(() => drain());
      break;
    default: {
      const _exhaustive: never = msg;
      void _exhaustive;
    }
  }

  if (tabId !== undefined) {
    scheduleLive(tabId);
    schedulePanel();
    void updateBadges();
  }
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (isPageMessage(message)) {
    handle(message, sender.tab?.id);
  }
  return false;
});

// ---------------------------------------------------------------------------------------------
// The side panel.

const ports: { port: chrome.runtime.Port; tabId: number | null }[] = [];

function broadcast(): void {
  for (const p of ports) {
    p.port.postMessage({ kind: "state", status, view: p.tabId === null ? panelView(null, null, null) : viewFor(p.tabId), tabId: p.tabId });
  }
}

let panelTimer: ReturnType<typeof setTimeout> | null = null;
function schedulePanel(): void {
  if (panelTimer) return;
  panelTimer = setTimeout(() => {
    panelTimer = null;
    broadcast();
  }, 300);
}

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "sidepanel") return;
  const entry: { port: chrome.runtime.Port; tabId: number | null } = { port, tabId: null };
  ports.push(entry);
  port.onMessage.addListener((m: unknown) => {
    if (typeof m !== "object" || m === null || !("kind" in m)) return;
    if (m.kind === "watch" && "tabId" in m && typeof m.tabId === "number") {
      entry.tabId = m.tabId;
      broadcast();
    } else if (m.kind === "set_workbench" && "url" in m && typeof m.url === "string") {
      void chrome.storage.local.set({ workbenchUrl: m.url }).then(() => checkWorkbench()).then(() => drain());
    } else if (m.kind === "retry") {
      void checkWorkbench().then(() => drain());
    }
  });
  port.onDisconnect.addListener(() => {
    const i = ports.indexOf(entry);
    if (i >= 0) ports.splice(i, 1);
  });
  void checkWorkbench();
});

// ---------------------------------------------------------------------------------------------
// Badge, alarms, lifecycle.

async function setBadge(badge: ReturnType<typeof badgeFor>, tabId?: number): Promise<void> {
  await chrome.action.setBadgeText(tabId === undefined ? { text: badge.text } : { text: badge.text, tabId }).catch(() => undefined);
  if (badge.color) {
    await chrome.action.setBadgeBackgroundColor(tabId === undefined ? { color: badge.color } : { color: badge.color, tabId }).catch(() => undefined);
  }
}

async function updateBadges(): Promise<void> {
  // The default badge covers every tab, so waiting records show wherever the pilot is.
  await setBadge(badgeFor(null, status.queued, status.workbench));
  for (const [id, state] of Object.entries(tabs)) {
    const recording = state.open ? (state.meta.source === "solo" ? "playtest" : "game") : null;
    await setBadge(badgeFor(recording, status.queued, status.workbench), Number(id));
  }
}

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabs[tabId];
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drain") {
    void flush();
    void checkWorkbench();
  }
});

function boot(): void {
  void chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => undefined);
  chrome.alarms.create("drain", { periodInMinutes: 0.5 });
  void drain();
}

chrome.runtime.onInstalled.addListener(boot);
chrome.runtime.onStartup.addListener(boot);
boot();
