# mtg-agent — Design Spec

**Date:** 2026-06-06
**Status:** Approved

## Goal

A Claude Code–native agent that answers Magic: The Gathering rules questions from the
official Comprehensive Rules without ever loading the full ~970 KB rules file into
context. A deterministic build step chunks the rules into per-section files plus a small
index; an answering subagent reads the index, loads only the relevant chunks (following
cross-references), and answers with rule citations. A skill re-runs the build against the
latest published rules and produces a changelog. The whole thing is a git repo that can be
pushed to GitHub and cloned-and-run anywhere with only Bun installed.

## Key decisions

- **Runtime form:** Claude Code subagent + skills, all project-local inside `mtg-agent/`.
- **Retrieval:** keyword index + grep over per-section files. No embeddings / vector DB —
  the rules' rigid numbering makes structured lookup more accurate and zero-dependency.
- **Web search:** local-first; web fallback (official rulings / Scryfall / Gatherer) only
  for card-specific interactions the rulebook can't resolve.
- **Update mode:** clean rebuild from scratch + a generated changelog diffing the previous
  release against the new one.
- **Tooling:** Bun running TypeScript directly (no compile step), `bun test` for tests,
  **zero npm dependencies**.
- **Portability:** generated chunks are committed; all manifest paths are repo-relative; a
  fresh `git clone` is immediately usable with no build step.

## Rules file structure (source of truth for the parser)

Verified against `MagicCompRules.2026.04.17.txt` (9,323 lines):

- Lines 1–10: title + introduction.
- Line 11 `Contents`, then the table of contents (chapters + section list).
- The TOC also contains the lines `Glossary` (178) and `Credits` (180).
- **Body begins at the *second* occurrence of `1. Game Concepts` (line 182).**
- Body chapters: `^[1-9]\. <Title>` at lines 182, 1272, 1565, 1927, 2105, 2443, 3192,
  6366, 6770.
- **Glossary body** begins at the *second* `^Glossary$` (line 7054).
- **Credits body** begins at the *second* `^Credits$` (line 9288).
- Therefore: rules region = `[secondGameConcepts, secondGlossary)`,
  glossary region = `[secondGlossary, secondCredits)`, credits region = `[secondCredits, end]`.

Within the rules region:

- **Section header:** `^(\d{3})\. (.+)$`  → e.g. `100. General`
- **Rule:** `^(\d{3}\.\d+)\. (.+)$`  → e.g. `100.1. These Magic rules…`  (trailing period)
- **Subrule:** `^(\d{3}\.\d+[a-z]+) (.+)$`  → e.g. `100.1a A two-player game…` (no period;
  letters skip `l` and `o` per the intro).
- **Example:** `^Example: (.+)$` — belongs to the preceding rule/subrule.

Glossary entries are blank-line-separated blocks: first line = term, remaining lines =
definition (which may include numbered senses `1.`/`2.` and trailing `See rule …`).

Cross-references appear as `see rule 903`, `see rule 201.3`, `rule 702.37`,
`section 8`, `(see rule 113.10)`, etc.

## Directory layout

```
mtg-agent/
├── rules/
│   ├── raw/MagicCompRules.<version>.txt   # archived source(s) of record
│   ├── sections/100-general.md … 905-*.md # one .md per 3-digit section (~290)
│   ├── glossary/glossary.md               # split by letter only if oversized
│   ├── manifest.json                      # the index the agent reads first
│   ├── rules.json                         # flat {ruleId: text} map, used for diffing
│   └── meta.json                          # version, date, source URL, sha256
├── CHANGELOG.md                           # regenerated on each update
├── scripts/
│   ├── build-rules.ts                     # parse → chunk → manifest → diff → write
│   ├── fetch-rules.ts                     # scrape rules page, download latest .txt
│   └── lib/{parser,chunker,manifest,differ,paths}.ts
├── test/{parser,chunker,differ}.test.ts   # bun test, zero-dep
├── .claude/
│   ├── agents/mtg-rules-expert.md
│   └── skills/mtg-rules-update/SKILL.md
├── package.json                           # zero deps; convenience scripts only
├── .gitignore
├── CLAUDE.md                              # routes MTG questions to the subagent
└── README.md
```

## Components

### Parser — `scripts/lib/parser.ts`
`parseRules(text: string): ParsedRules`. Pure function. Splits into chapters → sections →
rules/subrules → examples using the regexes above, plus the glossary into term/definition
entries. Returns:

```ts
type Rule = { id: string; text: string; examples: string[] };
type Section = { num: string; title: string; chapter: number; rules: Rule[]; rawLines: string[] };
type GlossaryEntry = { term: string; definition: string };
type ParsedRules = {
  effectiveDate: string;                 // parsed from "effective as of …"
  chapters: { num: number; title: string; sections: string[] }[];
  sections: Section[];
  rules: Record<string, string>;         // flat ruleId -> text (+ examples appended), for diffing
  glossary: GlossaryEntry[];
};
```

### Chunker — `scripts/lib/chunker.ts`
Writes one markdown file per section (small breadcrumb H1 with chapter + section title,
then the section's raw text). Sections over a configurable line threshold (default 400;
hits `702 Keyword Abilities`, ~1,545 lines) are split at top-level rule (`.N`) boundaries,
grouping rules into parts until each part nears the threshold. Each part records the
rule-id range and the keyword/label names it contains. Glossary likewise split by letter
only if it exceeds the threshold. Returns the list of written files with metadata for the
manifest.

### Manifest builder — `scripts/lib/manifest.ts`
Builds `manifest.json`. For each section/part: `num`, `title`, `chapter`, `file`,
`summary` (section title; deterministic), `keywords` (title words minus stopwords + any
glossary terms appearing in the section, capped), and `crossRefs` (unique 3-digit section
numbers referenced anywhere in the section). Also emits the chapter list and the glossary
term index. No LLM calls — fully deterministic.

### Differ — `scripts/lib/differ.ts`
`diff(oldRules, newRules): Changelog`. Compares the two flat `{ruleId: text}` maps and
returns `added`, `removed`, `changed` (id + before/after). `renderChangelog()` formats it
to markdown grouped by section. On a fresh build with no previous `rules.json`, the
changelog states "initial build."

### Build orchestrator — `scripts/build-rules.ts`
1. Resolve the newest `rules/raw/*.txt` (or a path passed as an arg).
2. Load the previous `rules/rules.json` if present (for diffing).
3. `parseRules` → `chunker` (clears & rewrites `rules/sections` + `rules/glossary`) →
   `manifest` → write `manifest.json`, `rules.json`, `meta.json` (version, date, source
   URL, sha256 of the raw file).
4. `diff` old vs new → write/refresh `CHANGELOG.md`.
5. Print a summary (section count, file count, added/removed/changed counts).

### Fetcher — `scripts/fetch-rules.ts`
Bun `fetch` GETs `https://magic.wizards.com/en/rules`, regexes the `…/*.txt` href for the
current Comprehensive Rules, downloads the raw file to `rules/raw/MagicCompRules.<date>.txt`
(deriving `<date>` from the filename or the file's "effective as of" line). Does **not**
use WebFetch (which would summarize a 1 MB file). Skips download if the latest version is
already present.

### Subagent — `.claude/agents/mtg-rules-expert.md`
System prompt encodes the retrieval loop, executed in the subagent's isolated context:
1. Read `rules/manifest.json`.
2. Pick candidate sections by matching query terms against titles/keywords, and by
   `grep`-ing `rules/sections/*.md` for the query's key nouns.
3. Read only the matching section files.
4. Resolve cross-references: scan loaded text + the manifest's `crossRefs` and load
   referenced sections when needed to fully answer.
5. Answer concisely, citing rule numbers (e.g. "per **509.2**, …").
6. Web fallback **only** for card-specific text/rulings the rules can't settle; label
   web-sourced info clearly.

### Update skill — `.claude/skills/mtg-rules-update/SKILL.md`
Checks `bun --version`, runs `bun run update` (fetch + build), then reports the
`CHANGELOG.md` summary. Documents how to recover if the rules page layout changes (pass a
`.txt` URL directly to `fetch-rules.ts`).

## Portability / GitHub

- Entire `mtg-agent/` is a git repo; generated chunks + raw source + `.claude/` are
  committed so a clone is immediately usable.
- `.gitignore`: `.DS_Store` and editor cruft (no `node_modules` — zero deps).
- All paths in `manifest.json`/`meta.json` are **repo-relative**.
- README documents: prerequisite (Bun), quick start (clone → open in Claude Code → ask),
  and `bun run update` to rebuild from the latest rules.

## Testing (TDD)

`bun test` over small inline fixtures:
- **parser:** section/rule/subrule/example/glossary parsing; the `l`/`o` letter-skip; the
  TOC-vs-body disambiguation; cross-reference extraction.
- **chunker:** big-section splitting at `.N` boundaries; small sections stay single-file.
- **differ:** added/removed/changed detection; initial-build case.

## Out of scope (YAGNI)

- Embeddings / vector DB.
- LLM-generated summaries at build time.
- Incremental in-place patching (clean rebuild is deterministic).
- CI / scheduled auto-update PRs (noted as an easy future add).
