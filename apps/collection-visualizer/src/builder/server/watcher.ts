// Server only — see lib/server/README.md. Watches `decks/` so a change made outside the app (the
// terminal's `deck:edit`, an agent's research note, a hand edit) reaches the open page. Writes the
// app made itself are recognised by content hash and dropped, so the app never refreshes on its
// own echoes.
import { createHash } from "node:crypto";
import { watch, type FSWatcher } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { DECKS_DIR } from "@mtg/paths.ts";

interface WatchOptions {
  decksDir?: string;
  debounceMs?: number;
}

interface Root {
  watcher: FSWatcher;
  listeners: Record<string, (() => void)[]>;
  timers: Record<string, ReturnType<typeof setTimeout>>;
}

interface State {
  roots: Record<string, Root>;
  ownHashes: Record<string, string>;
}

// One watcher per decks directory, kept on globalThis so Vite's HMR does not stack duplicates.
const g = globalThis as unknown as { __deckWatcher?: State };
const state: State = (g.__deckWatcher ??= { roots: {}, ownHashes: {} });

const sha1 = (text: string): string => createHash("sha1").update(text).digest("hex");

/** Remember what the app just wrote, so the watcher can tell an echo from a real change. */
export function noteOwnWrite(path: string, text: string): void {
  state.ownHashes[resolve(path)] = sha1(text);
}

async function isOwnEcho(path: string): Promise<boolean> {
  const expected = state.ownHashes[path];
  if (!expected) return false;

  try {
    const text = await readFile(path, "utf8");
    return sha1(text) === expected;
  } catch {
    return false;
  }
}

function rootFor(decksDir: string, debounceMs: number): Root {
  const key = resolve(decksDir);
  const existing = state.roots[key];
  if (existing) return existing;

  const root: Root = { listeners: {}, timers: {}, watcher: null as unknown as FSWatcher };
  root.watcher = watch(key, { recursive: true }, (_event, filename) => {
    if (!filename) return;

    const rel = relative(key, resolve(key, String(filename)));
    const slug = rel.split(sep)[0];
    if (!slug || slug.startsWith(".") || !root.listeners[slug]?.length) return;
    // Atomic writes go through a temp file and a rename; the temp file is never a change.
    if (/\.tmp$/.test(rel)) return;

    void (async () => {
      const path = resolve(key, rel);
      // macOS reports the folder itself alongside the file; only files carry a change.
      const isDir = await stat(path).then(
        (s) => s.isDirectory(),
        () => false,
      );
      if (isDir) return;

      const echo = await isOwnEcho(path);
      if (echo) return;

      clearTimeout(root.timers[slug]);
      root.timers[slug] = setTimeout(() => {
        delete root.timers[slug];
        for (const cb of root.listeners[slug] ?? []) cb();
      }, debounceMs);
    })();
  });
  state.roots[key] = root;
  return root;
}

/** Subscribe to changes under `decks/<slug>/`. Returns the unsubscribe function. */
export function subscribeDeck(slug: string, cb: () => void, opts: WatchOptions = {}): () => void {
  const root = rootFor(opts.decksDir ?? DECKS_DIR, opts.debounceMs ?? 250);
  (root.listeners[slug] ??= []).push(cb);

  return () => {
    root.listeners[slug] = (root.listeners[slug] ?? []).filter((l) => l !== cb);
  };
}

/** The absolute path of a file inside a deck folder — for `noteOwnWrite` callers. */
export function deckFilePath(slug: string, file: string, decksDir = DECKS_DIR): string {
  return join(decksDir, slug, file);
}

export const __testable__ = {
  closeAll(): void {
    for (const [key, root] of Object.entries(state.roots)) {
      root.watcher.close();
      for (const t of Object.values(root.timers)) clearTimeout(t);
      delete state.roots[key];
    }
    for (const k of Object.keys(state.ownHashes)) delete state.ownHashes[k];
  },
};
