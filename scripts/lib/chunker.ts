/** Chunker: turns parsed sections + glossary into committed markdown files.
 *
 *  - Small sections become one file: `<num>-<slug>.md`.
 *  - Large sections (e.g. 702 Keyword Abilities) are split at top-level rule (`.N`)
 *    boundaries into `<num>-<slug>.partK.md`, grouping rules until each part nears the
 *    line threshold. Each part records its rule range and the top-level labels (for 702,
 *    the keyword names) so the agent can load just the part it needs.
 *  - The glossary is split into per-letter files when it exceeds the threshold. */
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Chapter, GlossaryEntry, Section, SectionChunk } from "./types.ts";
import { GLOSSARY_DIR, SECTIONS_DIR, repoRelative } from "./paths.ts";

export const DEFAULT_THRESHOLD = 400;

/** A planned chunk before it is written to disk. Pure data — used directly by tests. */
export type ChunkPlan = {
  /** 1-based part index, or `undefined` for a single-file section. */
  part?: number;
  /** The raw text lines that make up this chunk. */
  lines: string[];
  /** Every rule id contained in this chunk. */
  ruleIds: string[];
  /** Top-level rule labels (e.g. keyword names) contained in this chunk. */
  labels: string[];
};

export function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function deriveLabel(text: string): string {
  const firstSentence = text.split(/[.:]/)[0].trim();
  return firstSentence.length <= 60 ? firstSentence : `${firstSentence.slice(0, 57)}...`;
}

/** Plan how a single section is chunked. Pure function (no I/O), so it is unit-tested. */
export function planSectionChunks(section: Section, threshold = DEFAULT_THRESHOLD): ChunkPlan[] {
  if (section.rawLines.length <= threshold) {
    return [{ lines: section.rawLines, ruleIds: section.rules.map((r) => r.id), labels: [] }];
  }

  const topLevel = new RegExp(`^${section.num}\\.(\\d+)\\.\\s+(.+)$`);
  const subrule = /^(\d{3}\.\d+[a-z]+)\s/;

  type Group = { lines: string[]; ruleIds: string[]; label: string };
  const groups: Group[] = [];
  const preamble: string[] = [];
  let current: Group | null = null;

  for (const line of section.rawLines) {
    const m = topLevel.exec(line);
    if (m) {
      current = { lines: [line], ruleIds: [`${section.num}.${m[1]}`], label: deriveLabel(m[2]) };
      groups.push(current);
      continue;
    }
    if (current) {
      current.lines.push(line);
      const sm = subrule.exec(line);
      if (sm) current.ruleIds.push(sm[1]);
    } else {
      preamble.push(line);
    }
  }

  const parts: ChunkPlan[] = [];
  let lines: string[] = [...preamble];
  let ruleIds: string[] = [];
  let labels: string[] = [];
  let partNo = 1;

  const pushPart = () => {
    parts.push({ part: partNo++, lines, ruleIds, labels });
    lines = [];
    ruleIds = [];
    labels = [];
  };

  for (const g of groups) {
    const wouldOverflow = lines.length + g.lines.length > threshold;
    if (ruleIds.length > 0 && wouldOverflow) pushPart();
    lines.push(...g.lines);
    ruleIds.push(...g.ruleIds);
    labels.push(g.label);
  }
  if (lines.length > 0) pushPart();
  return parts;
}

function renderChunkFile(
  section: Section,
  chapterTitle: string,
  lines: string[],
  part?: number,
): string {
  const partSuffix = part ? ` (part ${part})` : "";
  const header = `# ${section.num}. ${section.title}${partSuffix}\n*Chapter ${section.chapter} — ${chapterTitle}*`;
  let body = lines;
  if (body[0]?.trim() === `${section.num}. ${section.title}`) body = body.slice(1);
  return `${header}\n\n${body.join("\n").trim()}\n`;
}

/** Write all section chunk files and return their metadata for the manifest. */
export async function chunkSections(
  sections: Section[],
  chapters: Chapter[],
  threshold = DEFAULT_THRESHOLD,
): Promise<SectionChunk[]> {
  await rm(SECTIONS_DIR, { recursive: true, force: true });
  await mkdir(SECTIONS_DIR, { recursive: true });

  const chapterTitle: Record<number, string> = {};
  for (const c of chapters) chapterTitle[c.num] = c.title;

  const chunks: SectionChunk[] = [];

  for (const section of sections) {
    const plans = planSectionChunks(section, threshold);
    const multi = plans.length > 1;

    for (const plan of plans) {
      const base = `${section.num}-${slug(section.title)}`;
      const fileName = multi ? `${base}.part${plan.part}.md` : `${base}.md`;
      const absPath = join(SECTIONS_DIR, fileName);
      await writeFile(absPath, renderChunkFile(section, chapterTitle[section.chapter] ?? "", plan.lines, multi ? plan.part : undefined));

      chunks.push({
        num: section.num,
        title: section.title,
        chapter: section.chapter,
        file: repoRelative(absPath),
        part: multi ? plan.part : undefined,
        ruleRange: plan.ruleIds.length > 0 ? [plan.ruleIds[0], plan.ruleIds[plan.ruleIds.length - 1]] : undefined,
        labels: multi ? plan.labels : undefined,
      });
    }
  }

  return chunks;
}

/** Write the glossary (per-letter when large) and return file paths + the full term list. */
export async function chunkGlossary(
  glossary: GlossaryEntry[],
  threshold = DEFAULT_THRESHOLD,
): Promise<{ files: string[]; terms: string[] }> {
  await rm(GLOSSARY_DIR, { recursive: true, force: true });
  await mkdir(GLOSSARY_DIR, { recursive: true });

  const render = (entries: GlossaryEntry[]) =>
    entries.map((e) => `## ${e.term}\n\n${e.definition}`).join("\n\n") + "\n";

  const totalLines = glossary.reduce((n, e) => n + e.definition.split("\n").length + 2, 0);
  const terms = glossary.map((e) => e.term);

  if (totalLines <= threshold) {
    const abs = join(GLOSSARY_DIR, "glossary.md");
    await writeFile(abs, `# Glossary\n\n${render(glossary)}`);
    return { files: [repoRelative(abs)], terms };
  }

  // Split by first letter (non-letters grouped under "0").
  const byLetter: Record<string, GlossaryEntry[]> = {};
  for (const entry of glossary) {
    const first = entry.term[0]?.toLowerCase() ?? "0";
    const key = first >= "a" && first <= "z" ? first : "0";
    (byLetter[key] ??= []).push(entry);
  }

  const files: string[] = [];
  for (const key of Object.keys(byLetter).sort()) {
    const abs = join(GLOSSARY_DIR, `glossary-${key}.md`);
    await writeFile(abs, `# Glossary — ${key.toUpperCase()}\n\n${render(byLetter[key])}`);
    files.push(repoRelative(abs));
  }
  return { files, terms };
}
