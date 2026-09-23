// Server only — the registry of live sessions, one per deck, kept on globalThis so Vite's HMR
// does not orphan a running Claude subprocess every time a server module reloads.
import { DeckSession } from "./session";

const g = globalThis as unknown as { __deckSessions?: Record<string, Promise<DeckSession>> };
const sessions = (g.__deckSessions ??= {});

export function getDeckSession(slug: string): Promise<DeckSession> {
  return (sessions[slug] ??= DeckSession.create(slug));
}
