/** Manifest builder: produces the small index the answering agent reads first.
 *  Everything here is deterministic — no LLM calls — so builds are reproducible. */
import type { Manifest, ManifestSection, ParsedRules, Section, SectionChunk } from "./types.ts";

const STOPWORDS = new Set([
  "the", "a", "an", "of", "and", "or", "to", "in", "on", "for", "with", "general",
]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Unique 3-digit section numbers referenced via "rule N" / "section N", excluding self. */
export function extractCrossRefs(text: string, ownNum: string): string[] {
  const refs = new Set<string>();
  const re = /\b(?:rules?|section)\s+(\d{3})\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[1] !== ownNum) refs.add(m[1]);
  }
  return [...refs].sort();
}

/** Title words (minus stopwords) plus glossary terms that appear whole-word in the text. */
export function buildKeywords(
  title: string,
  text: string,
  termRegexes: { term: string; re: RegExp }[],
  cap = 25,
): string[] {
  const fromTitle = title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

  const fromGlossary: string[] = [];
  for (const { term, re } of termRegexes) {
    if (fromGlossary.length >= cap) break;
    if (re.test(text)) fromGlossary.push(term);
  }

  return [...new Set([...fromTitle, ...fromGlossary])];
}

export function buildManifest(opts: {
  parsed: ParsedRules;
  chunks: SectionChunk[];
  glossaryFiles: string[];
  glossaryTerms: string[];
  version: string;
  source: string;
  sha256: string;
}): Manifest {
  const { parsed, chunks, glossaryFiles, glossaryTerms, version, source, sha256 } = opts;

  const sectionByNum: Record<string, Section> = {};
  for (const s of parsed.sections) sectionByNum[s.num] = s;

  // Precompile whole-word regexes for specific glossary terms (longer = more specific first).
  const termRegexes = [...glossaryTerms]
    .filter((t) => t.length >= 4)
    .sort((a, b) => b.length - a.length)
    .map((term) => ({ term, re: new RegExp(`\\b${escapeRegex(term)}\\b`, "i") }));

  // Section-level keywords/crossRefs, computed once per section and shared across its parts.
  const keywordsByNum: Record<string, string[]> = {};
  const crossRefsByNum: Record<string, string[]> = {};
  for (const s of parsed.sections) {
    const text = s.rawLines.join("\n");
    keywordsByNum[s.num] = buildKeywords(s.title, text, termRegexes);
    crossRefsByNum[s.num] = extractCrossRefs(text, s.num);
  }

  const sections: ManifestSection[] = chunks.map((chunk) => ({
    num: chunk.num,
    title: chunk.title,
    chapter: chunk.chapter,
    file: chunk.file,
    part: chunk.part,
    summary: chunk.title,
    keywords: keywordsByNum[chunk.num] ?? [],
    crossRefs: crossRefsByNum[chunk.num] ?? [],
    labels: chunk.labels,
  }));

  return {
    version,
    effectiveDate: parsed.effectiveDate,
    source,
    sha256,
    chapters: parsed.chapters,
    sections,
    glossary: { files: glossaryFiles, terms: glossaryTerms },
  };
}
