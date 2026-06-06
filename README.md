# mtg-agent

A [Claude Code](https://claude.com/claude-code) agent that answers **Magic: The Gathering
rules questions** from the official Comprehensive Rules — without ever loading the full
~970 KB rules file into context.

A deterministic Bun build step chunks the rules into one small markdown file per section
plus an index (`manifest.json`). An answering subagent reads the index, loads only the
handful of chunks a question needs (chasing cross-references like "see rule 903"), and
replies with rule citations. A skill re-fetches the latest published rules and rebuilds,
producing a changelog of what changed.

- **Zero npm dependencies.** Bun runs the TypeScript directly — no compile step.
- **Clone-and-go.** The generated chunks are committed, so a fresh clone works immediately;
  you only rebuild when updating to a new rules release.
- **No embeddings / vector DB.** The rules' rigid numbering makes exact, transparent lookup
  better than semantic search here.

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.1 — `curl -fsSL https://bun.sh/install | bash`
- [Claude Code](https://claude.com/claude-code)

## Quick start (asking questions)

```bash
git clone <your-fork-url> mtg-agent
cd mtg-agent
claude            # open this folder in Claude Code
```

Then just ask, e.g.:

> If I attack with a creature that has deathtouch and trample, how is combat damage
> assigned to a blocker?

Claude routes MTG rules questions to the **`mtg-rules-expert`** subagent (see
`.claude/agents/`), which loads only the relevant chunks and answers with rule numbers. No
build step is required for a fresh clone — the chunks under `rules/` are committed.

## Updating to the latest rules

Use the **`mtg-rules-update`** skill (ask Claude to "update the MTG rules"), or run it
yourself:

```bash
bun run update      # fetch the latest .txt from magic.wizards.com/en/rules, then rebuild
```

This downloads the current rules into `rules/raw/`, regenerates every chunk + the index,
and writes a diff to `CHANGELOG.md`. Commit the regenerated `rules/` and `CHANGELOG.md` to
capture the update.

If the rules page layout ever changes and the scrape fails, pass the `.txt` URL directly:

```bash
bun run scripts/fetch-rules.ts "https://media.wizards.com/.../MagicCompRules.txt"
bun run scripts/build-rules.ts
```

## How it works

```
rules/raw/MagicCompRules.<version>.txt   the only place the full file lives
        │  bun run build
        ▼
parse ──► chunk ──► manifest ──► diff
        │            │             │
        ▼            ▼             ▼
rules/sections/*.md  manifest.json CHANGELOG.md
rules/glossary/*.md  rules.json    meta.json
```

1. **Parse** (`scripts/lib/parser.ts`) — splits the file into chapters → sections →
   rules/subrules → examples, plus the glossary, using the rules' rigid numbering.
2. **Chunk** (`scripts/lib/chunker.ts`) — one file per section; sections over a line
   threshold (e.g. `702 Keyword Abilities`) split at top-level rule boundaries into parts,
   each labeled with the keywords it contains. The glossary splits by letter.
3. **Manifest** (`scripts/lib/manifest.ts`) — builds the index: per-section title,
   deterministic keywords (title words + glossary terms appearing in the section),
   cross-references (3-digit sections referenced), and per-part labels.
4. **Diff** (`scripts/lib/differ.ts`) — compares the new flat rule map against the previous
   build to produce the changelog.

The answering loop lives in the subagent prompt (`.claude/agents/mtg-rules-expert.md`):
read the manifest → match keywords + grep the section files → load only the matches →
follow cross-references → cite rule numbers → fall back to the web only for card-specific
rulings.

## Commands

| Command | What it does |
| --- | --- |
| `bun run build` | Re-chunk from the newest file in `rules/raw/`. |
| `bun run fetch` | Download the latest rules `.txt`. |
| `bun run update` | `fetch` then `build`. |
| `bun test` | Run the parser/chunker/differ/manifest tests. |

## Project layout

```
mtg-agent/
├── rules/                 # committed, clone-and-go
│   ├── raw/               # archived source .txt(s)
│   ├── sections/          # one .md per section (large ones split into .partN.md)
│   ├── glossary/          # glossary split by letter
│   ├── manifest.json      # the index the agent reads first
│   ├── rules.json         # flat {ruleId: text} map (for diffing)
│   └── meta.json          # version / effective date / source / sha256
├── scripts/               # zero-dep Bun + TypeScript build pipeline
│   ├── build-rules.ts
│   ├── fetch-rules.ts
│   └── lib/{parser,chunker,manifest,differ,paths,types}.ts
├── test/                  # bun test
├── .claude/
│   ├── agents/mtg-rules-expert.md
│   └── skills/mtg-rules-update/SKILL.md
├── CHANGELOG.md
└── CLAUDE.md
```

## Design

See [`docs/superpowers/specs/2026-06-06-mtg-agent-design.md`](docs/superpowers/specs/2026-06-06-mtg-agent-design.md).
