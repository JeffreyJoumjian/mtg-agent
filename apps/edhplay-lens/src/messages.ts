/** Messages between the extension's three parts:
 *    page.ts (runs inside edhplay.com, sees the game socket and EDHPlay's own stores)
 *      → window.postMessage → content.ts (relay) → chrome.runtime → background.ts
 *    background.ts ⇄ sidepanel.ts over a long-lived port.
 *  Every page message carries `__lens: "page"` so the relay ignores the site's own messages. */
import type { CaptureMeta, RawFrame } from "../../../scripts/lib/edhplay-parse.ts";
import type { LogLine } from "../../../scripts/lib/edhplay-store.ts";

export type PageMessage =
  | { kind: "capture_start"; meta: CaptureMeta }
  | { kind: "capture_meta"; meta: CaptureMeta }
  | { kind: "frame"; captureId: string; frame: RawFrame & { i: number } }
  | { kind: "log"; captureId: string; line: LogLine }
  | { kind: "capture_end"; captureId: string; endedAt: number }
  | { kind: "matches"; fetchedAt: number; matches: unknown[] }
  | { kind: "deck"; deckId: string; fetchedAt: number; deck: unknown; reason: "own" | "opponent" }
  | { kind: "rooms"; fetchedAt: number; rooms: unknown[] }
  | { kind: "profile"; fetchedAt: number; id: string; username: string }
  | { kind: "replay"; meta: CaptureMeta; frames: (RawFrame & { i: number })[]; log: LogLine[]; open: boolean };

export interface PageEnvelope {
  __lens: "page";
  msg: PageMessage;
}

/** Background → page, through the relay. */
export type BackgroundToPage = { kind: "request_replay" };

export interface BackgroundEnvelope {
  __lens: "background";
  msg: BackgroundToPage;
}

export function isPageEnvelope(v: unknown): v is PageEnvelope {
  return typeof v === "object" && v !== null && "__lens" in v && v.__lens === "page" && "msg" in v;
}

export function isBackgroundEnvelope(v: unknown): v is BackgroundEnvelope {
  return typeof v === "object" && v !== null && "__lens" in v && v.__lens === "background" && "msg" in v;
}

const PAGE_KINDS: PageMessage["kind"][] = ["capture_start", "capture_meta", "frame", "log", "capture_end", "matches", "deck", "rooms", "profile", "replay"];

/** A message from our own relay. Only the extension's content script can send these, so the kind
 *  is the only thing checked; the Workbench validates every payload again before storing it. */
export function isPageMessage(v: unknown): v is PageMessage {
  return typeof v === "object" && v !== null && "kind" in v && PAGE_KINDS.some((k) => k === v.kind);
}
