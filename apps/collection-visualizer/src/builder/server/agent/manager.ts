// Server only — the registry of live sessions, one per deck, kept on globalThis so Vite's HMR
// does not orphan a running Claude subprocess every time a server module reloads.
import { CHAT_ENABLED } from "~/builder/chat/events";
import { DeckSession } from "./session";

const g = globalThis as unknown as { __deckSessions?: Record<string, Promise<DeckSession>> };
const sessions = (g.__deckSessions ??= {});

export function getDeckSession(slug: string): Promise<DeckSession> {
  if (!CHAT_ENABLED) {
    return Promise.reject(
      new Error("The chat is turned off on this Workbench. You can use Claude Code in a terminal instead."),
    );
  }
  return (sessions[slug] ??= DeckSession.create(slug));
}
