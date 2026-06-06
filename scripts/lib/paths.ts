/** Repo-relative path helpers. All build artifacts live under the repo root so a fresh
 *  clone is immediately usable and the manifest never contains machine-specific paths. */
import { resolve, relative } from "node:path";

/** Repo root, derived from this file's location (`scripts/lib/paths.ts` -> repo root). */
export const REPO_ROOT = resolve(import.meta.dir, "..", "..");

export const RULES_DIR = resolve(REPO_ROOT, "rules");
export const RAW_DIR = resolve(RULES_DIR, "raw");
export const SECTIONS_DIR = resolve(RULES_DIR, "sections");
export const GLOSSARY_DIR = resolve(RULES_DIR, "glossary");
export const MANIFEST_PATH = resolve(RULES_DIR, "manifest.json");
export const RULES_JSON_PATH = resolve(RULES_DIR, "rules.json");
export const META_PATH = resolve(RULES_DIR, "meta.json");
export const CHANGELOG_PATH = resolve(REPO_ROOT, "CHANGELOG.md");

/** Convert an absolute path to a repo-relative POSIX path for storage in the manifest. */
export function repoRelative(absPath: string): string {
  return relative(REPO_ROOT, absPath).split("\\").join("/");
}
