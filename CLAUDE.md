# mtg-agent

A Claude Code project that answers Magic: The Gathering rules questions from the official
Comprehensive Rules without loading the whole ~970 KB file into context.

## How to answer MTG rules questions

**For any Magic: The Gathering rules question, dispatch to the `mtg-rules-expert`
subagent** (in `.claude/agents/`). It reads the index, loads only the relevant rule chunks
into its own isolated context, follows cross-references, and returns a cited answer — so
this main conversation never has to hold the full rulebook.

Do not try to answer MTG rules questions by reading the raw file in `rules/raw/` yourself.

## Updating the rules

Use the `mtg-rules-update` skill (in `.claude/skills/`) to fetch the latest published rules
and rebuild. It runs `bun run update` and reports the changelog.

## Layout

- `rules/raw/` — archived source `.txt` (the only place the full file lives).
- `rules/sections/` — one markdown chunk per 3-digit section; large sections (e.g. `702`)
  are split into `.partN.md`.
- `rules/glossary/` — glossary split by first letter.
- `rules/manifest.json` — the index the subagent reads first (titles, keywords, cross-refs,
  per-part labels).
- `rules/rules.json` — flat `{ruleId: text}` map (used only for diffing).
- `rules/meta.json` — loaded version / effective date / source.
- `scripts/` — the zero-dependency Bun + TypeScript build pipeline.
- `CHANGELOG.md` — generated on each update.

## Tooling

Bun runs the TypeScript directly — no compile step, no npm dependencies.

- `bun run build` — re-chunk from the newest file in `rules/raw/`.
- `bun run fetch` — download the latest rules `.txt`.
- `bun run update` — fetch then build.
- `bun test` — run the parser/chunker/differ/manifest tests.
