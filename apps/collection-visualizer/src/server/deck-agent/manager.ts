// Server only. Stashed on globalThis so Vite HMR module reloads don't orphan live sessions
// (each session holds a running claude subprocess).
import { DeckSession } from "./session";

const g = globalThis as unknown as { __deckSessions?: Record<string, DeckSession> };

export async function getDeckSession(slug: string): Promise<DeckSession> {
  g.__deckSessions ??= {};
  const existing = g.__deckSessions[slug];

  if (existing) return existing;
  const created = await DeckSession.create(slug);
  g.__deckSessions[slug] = created;
  return created;
}
