// Server only — see lib/server/README.md.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

/** Walk up from cwd (the app dir in dev) until we find the repo root (has decks/ + CLAUDE.md). */
function findRepoRoot(): string {
  let dir = process.cwd();

  for (let i = 0; i < 6; i++) {
    if (existsSync(join(dir, "decks")) && existsSync(join(dir, "CLAUDE.md"))) {
      return dir;
    }
    dir = dirname(dir);
  }

  throw new Error("Could not locate mtg-agent repo root from " + process.cwd());
}

export const REPO_ROOT = findRepoRoot();
export const DECKS_DIR = join(REPO_ROOT, "decks");
