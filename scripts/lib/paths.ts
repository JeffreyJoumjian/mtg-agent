/** Repo-relative path helpers. All build artifacts live under the repo root so a fresh
 *  clone is immediately usable and the manifest never contains machine-specific paths. */
import { existsSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

/** True when `dir` is the repo root: it holds `decks/` and `CLAUDE.md`. */
function isRepoRoot(dir: string): boolean {
  return existsSync(resolve(dir, "decks")) && existsSync(resolve(dir, "CLAUDE.md"));
}

/** Walk up from each start directory in turn until a folder holding `decks/` and `CLAUDE.md` is
 *  found. Null when none of the starts lies inside a repo. */
export function findRepoRoot(starts: string[]): string | null {
  for (const start of starts) {
    let dir = resolve(start);
    while (true) {
      if (isRepoRoot(dir)) return dir;

      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

/** Repo root. Found by markers rather than by this file's location, because a bundler (the app's
 *  `vite build`) inlines this module into `dist/server/…`, where `../..` is no longer the repo.
 *  Order: `MTG_REPO_ROOT` if set, this file's own location (source runs), then the working
 *  directory (bundled runs). */
function locateRepoRoot(): string {
  const override = process.env.MTG_REPO_ROOT;
  if (override && isRepoRoot(override)) return resolve(override);

  const here = fileURLToPath(new URL(".", import.meta.url));
  const found = findRepoRoot([here, process.cwd()]);
  if (found) return found;

  // Last resort: the source layout. Consumers get a clear ENOENT from the path that follows.
  return resolve(here, "..", "..");
}

export const REPO_ROOT = locateRepoRoot();

export const RULES_DIR = resolve(REPO_ROOT, "rules");
export const RAW_DIR = resolve(RULES_DIR, "raw");
export const SECTIONS_DIR = resolve(RULES_DIR, "sections");
export const GLOSSARY_DIR = resolve(RULES_DIR, "glossary");
export const MANIFEST_PATH = resolve(RULES_DIR, "manifest.json");
export const RULES_JSON_PATH = resolve(RULES_DIR, "rules.json");
export const META_PATH = resolve(RULES_DIR, "meta.json");
export const CHANGELOG_PATH = resolve(REPO_ROOT, "CHANGELOG.md");

/** Deckbuilding + card-data locations. `data/` holds the ephemeral (git-ignored) Scryfall
 *  cache; `decks/` holds one folder per deck (see decks/README.md). */
export const DATA_DIR = resolve(REPO_ROOT, "data");
export const CARD_CACHE_PATH = resolve(DATA_DIR, "card-cache.json");
export const EDHREC_CACHE_PATH = resolve(DATA_DIR, "edhrec-cache.json");
export const DECKS_DIR = resolve(REPO_ROOT, "decks");

/** Convert an absolute path to a repo-relative POSIX path for storage in the manifest. */
export function repoRelative(absPath: string): string {
  return relative(REPO_ROOT, absPath).split("\\").join("/");
}
