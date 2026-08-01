// Server only — see lib/server/README.md. Filesystem access to the repo's decks/ folder plus the
// per-deck agent-session id store.
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DECKS_DIR } from "./repo-paths";
import { DATA_DIR } from "./price-cache";
import { isValidSlug } from "~/lib/deck/slug";

const SESSIONS_PATH = join(DATA_DIR, "deck-sessions.json");

/** Deck folders, skipping the _TEMPLATE skeleton and loose files. */
export async function listDeckSlugs(): Promise<string[]> {
  const entries = await readdir(DECKS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name !== "_TEMPLATE")
    .map((e) => e.name)
    .sort();
}

export async function readDeckFiles(slug: string): Promise<{ deckMd: string; statusMd: string } | null> {
  if (!isValidSlug(slug)) {
    return null;
  }

  try {
    const deckMd = await readFile(join(DECKS_DIR, slug, "DECK.md"), "utf8");
    const statusMd = await readFile(join(DECKS_DIR, slug, "STATUS.md"), "utf8");
    return { deckMd, statusMd };
  } catch {
    return null;
  }
}

export async function createDeckFromTemplate(slug: string): Promise<void> {
  if (!isValidSlug(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  await cp(join(DECKS_DIR, "_TEMPLATE"), join(DECKS_DIR, slug), {
    recursive: true,
    errorOnExist: true,
    force: false,
  });
}

/** slug → Agent SDK session id, so dev-server restarts resume conversations. */
export async function loadSessionIds(): Promise<Record<string, string>> {
  try {
    const raw = await readFile(SESSIONS_PATH, "utf8");
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function saveSessionId(slug: string, id: string): Promise<void> {
  const ids = await loadSessionIds();
  ids[slug] = id;

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SESSIONS_PATH, JSON.stringify(ids, null, 2) + "\n");
}
