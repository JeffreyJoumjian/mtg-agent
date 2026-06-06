/** Shared types for the MTG rules build pipeline. */

/** A single numbered rule or subrule, e.g. `100.1` or `100.1a`. */
export type Rule = {
  /** The rule id without trailing period, e.g. `"100.1"` or `"100.1a"`. */
  id: string;
  /** The rule text (the part after the id). */
  text: string;
  /** `Example:` lines attached to this rule, with the `Example:` prefix stripped. */
  examples: string[];
};

/** A 3-digit section, e.g. `100. General`. */
export type Section = {
  /** The 3-digit section number as a string, e.g. `"100"`. */
  num: string;
  /** The section title, e.g. `"General"`. */
  title: string;
  /** The chapter number this section belongs to (1-9). */
  chapter: number;
  /** All rules and subrules in the section, in document order. */
  rules: Rule[];
  /** The raw text lines of the section (header + body), for chunk file output. */
  rawLines: string[];
};

/** A glossary entry: a term and its (possibly multi-line) definition. */
export type GlossaryEntry = {
  /** The glossary term, e.g. `"Active Player"`. */
  term: string;
  /** The full definition text, newlines preserved. */
  definition: string;
};

/** A chapter (1-9) and the section numbers it contains. */
export type Chapter = {
  /** Chapter number, 1-9. */
  num: number;
  /** Chapter title, e.g. `"Game Concepts"`. */
  title: string;
  /** Section numbers in this chapter, e.g. `["100", "101", ...]`. */
  sections: string[];
};

/** The full parsed representation of a Comprehensive Rules document. */
export type ParsedRules = {
  /** The "effective as of" date string parsed from the intro, e.g. `"April 17, 2026"`. */
  effectiveDate: string;
  /** Chapters in document order. */
  chapters: Chapter[];
  /** Sections in document order. */
  sections: Section[];
  /** Flat map of rule id -> text (with examples appended), used for diffing. */
  rules: Record<string, string>;
  /** Glossary entries in document order. */
  glossary: GlossaryEntry[];
};

/** A chunk file written for a section (or a part of a large section). */
export type SectionChunk = {
  /** The 3-digit section number, e.g. `"702"`. */
  num: string;
  /** The section title, e.g. `"Keyword Abilities"`. */
  title: string;
  /** The chapter number. */
  chapter: number;
  /** Repo-relative path to the written markdown file. */
  file: string;
  /** For split sections: the part index (1-based). `undefined` for single-file sections. */
  part?: number;
  /** For split sections: the rule ids contained, e.g. `["702.2", ..., "702.40"]`. */
  ruleRange?: [string, string];
  /** For split sections: labels of the top-level rules in this part (e.g. keyword names). */
  labels?: string[];
};

/** One section's entry in the manifest. */
export type ManifestSection = {
  num: string;
  title: string;
  chapter: number;
  file: string;
  part?: number;
  /** Deterministic one-line summary (the section title). */
  summary: string;
  /** Keywords for matching: title words + glossary terms appearing in the section. */
  keywords: string[];
  /** Unique 3-digit section numbers referenced anywhere in this section. */
  crossRefs: string[];
  /** For split sections: top-level rule labels in this part (e.g. keyword names). */
  labels?: string[];
};

/** The manifest the answering agent reads first. */
export type Manifest = {
  version: string;
  effectiveDate: string;
  source: string;
  sha256: string;
  chapters: Chapter[];
  sections: ManifestSection[];
  glossary: {
    files: string[];
    terms: string[];
  };
};

/** Result of diffing two rules maps. */
export type Changelog = {
  added: string[];
  removed: string[];
  changed: { id: string; before: string; after: string }[];
};
