/** Parser for the Magic: The Gathering Comprehensive Rules plain-text file.
 *
 *  The document has a rigid structure (verified in the design spec):
 *  front matter + table of contents, then the rules body, then the glossary, then credits.
 *  The TOC repeats the chapter titles and the words "Glossary"/"Credits", so we locate the
 *  body by taking the LAST occurrence of each landmark line. */
import type {
  Chapter,
  GlossaryEntry,
  ParsedRules,
  Rule,
  Section,
} from "./types.ts";

const CHAPTER = /^([1-9])\.\s+(.+)$/;
const SECTION = /^(\d{3})\.\s+(.+)$/;
const RULE = /^(\d{3}\.\d+)\.\s+(.+)$/;
const SUBRULE = /^(\d{3}\.\d+[a-z]+)\s+(.+)$/;
const EXAMPLE = /^Example:\s+(.+)$/;

/** Index of the last line that exactly equals `value` (trimmed). -1 if not found. */
function lastIndexOfLine(lines: string[], value: string): number {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === value) return i;
  }
  return -1;
}

/** Parse the full Comprehensive Rules text into a structured representation. */
export function parseRules(text: string): ParsedRules {
  const lines = text.replace(/\r\n/g, "\n").split("\n");

  const effectiveMatch = text.match(/effective as of ([^.]+)\./i);
  const effectiveDate = effectiveMatch ? effectiveMatch[1].trim() : "unknown";

  // Body landmarks: take the LAST occurrence to skip the table of contents.
  const bodyStart = lastIndexOfLine(lines, "1. Game Concepts");
  const glossaryStart = lastIndexOfLine(lines, "Glossary");
  const creditsStart = lastIndexOfLine(lines, "Credits");

  if (bodyStart < 0 || glossaryStart < 0 || bodyStart >= glossaryStart) {
    throw new Error(
      `Could not locate rules body (bodyStart=${bodyStart}, glossaryStart=${glossaryStart}). ` +
        `The rules file format may have changed.`,
    );
  }

  const rulesLines = lines.slice(bodyStart, glossaryStart);
  const glossaryEnd = creditsStart > glossaryStart ? creditsStart : lines.length;
  const glossaryLines = lines.slice(glossaryStart + 1, glossaryEnd);

  const { chapters, sections, rules } = parseRulesBody(rulesLines);
  const glossary = parseGlossary(glossaryLines);

  return { effectiveDate, chapters, sections, rules, glossary };
}

function parseRulesBody(rulesLines: string[]): {
  chapters: Chapter[];
  sections: Section[];
  rules: Record<string, string>;
} {
  const chapters: Chapter[] = [];
  const sections: Section[] = [];
  const rules: Record<string, string> = {};

  let currentChapter: Chapter | null = null;
  let currentSection: Section | null = null;
  let currentRule: Rule | null = null;

  const flush = (rule: Rule | null) => {
    if (!rule) return;
    const parts = [rule.text, ...rule.examples.map((e) => `Example: ${e}`)];
    rules[rule.id] = parts.join("\n");
  };

  for (const line of rulesLines) {
    const chapterM = CHAPTER.exec(line);
    const sectionM = SECTION.exec(line);
    const ruleM = RULE.exec(line);
    const subruleM = SUBRULE.exec(line);
    const exampleM = EXAMPLE.exec(line);

    if (exampleM && currentRule) {
      currentRule.examples.push(exampleM[1]);
      currentSection?.rawLines.push(line);
      continue;
    }

    if (subruleM || ruleM) {
      const m = (subruleM ?? ruleM) as RegExpExecArray;
      flush(currentRule);
      currentRule = { id: m[1], text: m[2], examples: [] };
      currentSection?.rules.push(currentRule);
      currentSection?.rawLines.push(line);
      continue;
    }

    if (sectionM) {
      flush(currentRule);
      currentRule = null;
      currentSection = {
        num: sectionM[1],
        title: sectionM[2].trim(),
        chapter: currentChapter?.num ?? 0,
        rules: [],
        rawLines: [line],
      };
      sections.push(currentSection);
      currentChapter?.sections.push(sectionM[1]);
      continue;
    }

    if (chapterM) {
      flush(currentRule);
      currentRule = null;
      currentSection = null;
      currentChapter = {
        num: Number(chapterM[1]),
        title: chapterM[2].trim(),
        sections: [],
      };
      chapters.push(currentChapter);
      continue;
    }

    // Continuation line (a rule that wraps) or blank line within a section.
    if (line.trim() && currentRule) {
      currentRule.text += ` ${line.trim()}`;
    }
    currentSection?.rawLines.push(line);
  }

  flush(currentRule);
  return { chapters, sections, rules };
}

function parseGlossary(glossaryLines: string[]): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  let block: string[] = [];

  const commit = () => {
    if (block.length === 0) return;
    const term = block[0].trim();
    const definition = block.slice(1).join("\n").trim();
    if (term) entries.push({ term, definition });
    block = [];
  };

  for (const line of glossaryLines) {
    if (line.trim() === "") {
      commit();
    } else {
      block.push(line);
    }
  }
  commit();
  return entries;
}
