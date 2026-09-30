#!/usr/bin/env bun
/** Build pipeline: parse the newest raw rules file, write per-section chunks + glossary,
 *  emit the manifest / rules index / flat rules map / meta, and diff against the previous build to
 *  produce CHANGELOG.md. Rebuilding the same source keeps the existing CHANGELOG.md.
 *
 *  Usage:
 *    bun run scripts/build-rules.ts [path/to/rules.txt]
 *  If no path is given, the most recent file in rules/raw/ is used. */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { parseRules } from "./lib/parser.ts";
import { chunkGlossary, chunkSections } from "./lib/chunker.ts";
import { buildManifest, renderRulesIndex } from "./lib/manifest.ts";
import { diff, renderChangelog } from "./lib/differ.ts";
import {
  CHANGELOG_PATH,
  MANIFEST_PATH,
  META_PATH,
  RAW_DIR,
  RULES_INDEX_PATH,
  RULES_JSON_PATH,
  repoRelative,
} from "./lib/paths.ts";

const SOURCE_URL = "https://magic.wizards.com/en/rules";

/** Resolve which raw rules file to build from: the CLI arg, or the newest in rules/raw/. */
async function resolveRawFile(argPath: string | undefined): Promise<string> {
  if (argPath) return argPath;
  const entries = await readdir(RAW_DIR);
  const txts = entries.filter((f) => f.endsWith(".txt")).sort();
  if (txts.length === 0) {
    throw new Error(`No .txt files found in ${RAW_DIR}. Run \`bun run fetch\` first.`);
  }
  return join(RAW_DIR, txts[txts.length - 1]);
}

/** Derive a version string (YYYY-MM-DD) from the filename or fall back to a slug of the date. */
function deriveVersion(rawPath: string, effectiveDate: string): string {
  const fromName = rawPath.match(/(\d{4})[.\-](\d{2})[.\-](\d{2})/);
  if (fromName) return `${fromName[1]}-${fromName[2]}-${fromName[3]}`;
  return effectiveDate.replace(/[^0-9A-Za-z]+/g, "-").toLowerCase();
}

async function loadPreviousRules(): Promise<Record<string, string>> {
  try {
    const text = await readFile(RULES_JSON_PATH, "utf8");
    return JSON.parse(text) as Record<string, string>;
  } catch {
    return {};
  }
}

/** The source hash of the last build, so a rebuild of the same rules can keep its changelog. */
async function loadPreviousSha(): Promise<string | null> {
  try {
    const meta = JSON.parse(await readFile(META_PATH, "utf8")) as { sha256?: string };
    return meta.sha256 ?? null;
  } catch {
    return null;
  }
}

async function main() {
  const rawPath = await resolveRawFile(process.argv[2]);
  console.log(`Building from ${repoRelative(rawPath)}`);

  const text = await readFile(rawPath, "utf8");
  const sha256 = createHash("sha256").update(text).digest("hex");

  const previousRules = await loadPreviousRules();
  const previousSha = await loadPreviousSha();
  const isInitial = Object.keys(previousRules).length === 0;

  const parsed = parseRules(text);
  const version = deriveVersion(rawPath, parsed.effectiveDate);

  const chunks = await chunkSections(parsed.sections, parsed.chapters);
  const { files: glossaryFiles, terms: glossaryTerms } = await chunkGlossary(parsed.glossary);

  const manifest = buildManifest({
    parsed,
    chunks,
    glossaryFiles,
    glossaryTerms,
    version,
    source: SOURCE_URL,
    sha256,
  });

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(
    RULES_INDEX_PATH,
    renderRulesIndex({ version, effectiveDate: parsed.effectiveDate, chapters: parsed.chapters, chunks }),
  );
  await writeFile(RULES_JSON_PATH, `${JSON.stringify(parsed.rules, null, 2)}\n`);
  await writeFile(
    META_PATH,
    `${JSON.stringify(
      {
        version,
        effectiveDate: parsed.effectiveDate,
        source: SOURCE_URL,
        rawFile: repoRelative(rawPath),
        sha256,
        sectionCount: parsed.sections.length,
        chunkCount: chunks.length,
        ruleCount: Object.keys(parsed.rules).length,
        glossaryTermCount: glossaryTerms.length,
      },
      null,
      2,
    )}\n`,
  );

  // A rebuild of the same source would diff the rules against themselves and replace the real
  // changelog with an empty one, so keep the existing file.
  const sameSource = previousSha === sha256;
  const changelog = diff(previousRules, parsed.rules);
  if (!sameSource) {
    await writeFile(
      CHANGELOG_PATH,
      renderChangelog(changelog, { version, effectiveDate: parsed.effectiveDate, isInitial }),
    );
  }

  console.log(
    [
      `✓ version ${version} (effective ${parsed.effectiveDate})`,
      `✓ ${parsed.sections.length} sections → ${chunks.length} chunk files`,
      `✓ ${Object.keys(parsed.rules).length} rules, ${glossaryTerms.length} glossary terms`,
      `✓ glossary: ${glossaryFiles.length} file(s)`,
      sameSource
        ? "✓ same source as the last build; CHANGELOG.md kept"
        : isInitial
        ? "✓ initial build (no previous version to diff)"
        : `✓ changelog: ${changelog.added.length} added, ${changelog.removed.length} removed, ${changelog.changed.length} changed`,
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
