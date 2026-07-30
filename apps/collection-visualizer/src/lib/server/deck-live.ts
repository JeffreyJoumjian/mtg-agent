// Server only — reads the terminal-companion live-state file (see lib/deck/live-state.ts for the
// contract; scripts/deck-live.ts at the repo root writes it).
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA_DIR } from "./price-cache";
import { normalizeLiveState, type LiveState } from "~/lib/deck/live-state";
import { isValidSlug } from "~/lib/deck/slug";

export async function readLiveState(slug: string): Promise<LiveState | null> {
  if (!isValidSlug(slug)) return null;

  try {
    const raw = await readFile(join(DATA_DIR, "deck-live", slug + ".json"), "utf8");
    return normalizeLiveState(JSON.parse(raw));
  } catch {
    return null;
  }
}
