---
paths:
  - "scripts/**"
  - "test/**"
  - "rules/**"
  - "package.json"
  - "mise.toml"
---

# Tooling, layout and other machines

## Layout

- `rules/raw/`: archived source `.txt` files (the only place the full rules live).
- `rules/sections/`: one markdown chunk per 3-digit section; large sections (e.g. `702`) are split
  into `.partN.md`.
- `rules/glossary/`: glossary split by first letter.
- `rules/INDEX.md`: the map the rules agent reads (one line per section file, part ranges, keyword
  names). `rules/manifest.json` is the machine-readable version the build, tests and PDFs use.
- `rules/rules.json`: flat `{ruleId: text}` map (diffing, and lookup's changed-rule check).
- `rules/meta.json`: loaded version / effective date / source.
- `scripts/`: the zero-dependency Bun + TypeScript pipeline (rules **and** card/deck tooling:
  `card.ts`, `deck.ts` (show/edit/meta), `ledger.ts` (lookup, ledger:index), `lib/scryfall.ts`,
  `lib/card-cache.ts`, `lib/deck-model.ts`, `lib/change-set.ts`, `lib/deck-stats.ts`,
  `lib/deck-store.ts`, `lib/ledger.ts`; `lib/decklist.ts` remains for pasted lists and legacy
  Markdown snapshots).
- `decks/`: one folder per deck, each a `deck.json` + `history.jsonl` + `versions/` (see
  `decks/README.md`). `decks/_TEMPLATE/` is the skeleton.
- `.claude/skills/deck-brain/ledger/`: the ledger's topic files plus the generated `INDEX.md` and
  `CARDS.md`; `archive/` keeps the pre-split `LEDGER.md` and its old-line → id map.
- `apps/collection-visualizer/`: the MTG Workbench app (deck builder + collection viewer). It imports
  `scripts/lib/*` through the `@mtg/*` alias.
- `data/`: ephemeral, git-ignored caches (`card-cache.json` is the one card cache, shared by the CLI
  and the app; `rulings-cache.json`; `edhrec-cache.json`).
- `CHANGELOG.md`: generated on each rules update (a rebuild of the same source keeps it).

## Commands

- `bun run build`: re-chunk from the newest file in `rules/raw/`. `bun run fetch` downloads the latest
  rules `.txt`; `bun run update` does both.
- `bun run card` / `bun run search` / `bun run cards:refresh`: card data.
- `bun run edhrec`: EDHREC crowd statistics.
- `bun run lookup` / `bun run ledger:index [--check]`: search the ledger and decision logs; regenerate
  the ledger's `INDEX.md` and `CARDS.md` (the test suite fails when they're stale).
- `bun run carddata` / `bun run deckcheck`: the deck-finalizer helpers (see that skill).
- `bun run deck:show` / `deck:edit` / `deck:meta`: read, change and annotate a deck's `deck.json`.
- `bun run deck:migrate [--dry-run] [slug…]`: the one-time Markdown → `deck.json` migration (already
  run on every deck; kept for any Markdown deck added later).
- `bun run deck:moxfield <slug> [--stdout]`: regenerate `decks/<slug>/MOXFIELD*.txt`, the
  copy-pasteable Moxfield/Archidekt import lists **derived** from `deck.json`. Every `deck:edit` apply
  already does this; run it by hand only after hand-editing `deck.json`. The output is generated, so
  change `deck.json` instead of editing it.
- `bun run deck:pdf <slug> [list-id]`: the printable reference, from `deck.json` + `pdf.json`. The one
  command with an external dependency: it needs Chrome, Chromium, or (on Windows) Edge.
- `bun run deck:proposal <slug>`: build the data bundle behind a deck's **upgrade-proposal artifact**.
  It reads the hand-written grounds in `decks/<slug>/research/proposal.json`, then derives card text,
  salt, Game Changer status, card art and the current/approved/projected deck stats from `deck.json`
  and the caches into `decks/<slug>/artifact/`. One artifact per deck, republished in place; see
  `deck-brain` §3.1 for the workflow.
- `bun test`: the suite under `test/`. Scoped there on purpose: `apps/collection-visualizer` has its
  own deps and its own `bun test`, and an unscoped run fails on a fresh clone before that app is
  installed.

## Working on another machine

Everything this repo needs travels with the clone: the skills in `.claude/skills/`, the
`mtg-rules-expert` agent, the chunked rules, and the decks. **Bun is the only runtime prerequisite**
(`powershell -c "irm bun.sh/install.ps1 | iex"` on Windows, `curl -fsSL https://bun.sh/install | bash`
elsewhere); there is no Python dependency.

**The Bun version is pinned in `mise.toml`** (currently `1.3.14`), read by [mise](https://mise.jdx.dev),
which is activated from the shell rc and switches on `cd`. `engines.bun` in `package.json` carries the
same floor; pin and floor are bumped together. `mise install` fetches the pinned Bun;
`mise use bun@<version>` rewrites the pin.

**In a non-interactive shell the mise shell hook does not run**, so a bare `bun` there can resolve to
whatever else is on `PATH` (`~/.bun/bin/bun`, Homebrew, an old version manager). When it matters, run
`mise exec -- bun ...`, and use `mise which bun` to see which binary you actually got.

Running below the pin has broken two different things already: `bun test ./test` throws
`ModuleNotFound` on Bun 1.1.x **while printing "0 pass, 0 fail"**, which reads like a clean run; and
`bun run deck:pdf` fails its temp-file cleanup there because `Bun.file().delete` does not exist before
1.3. The `test` script is now `bun test test/`, which works on every version.

The *global* config (the user's `~/.claude` instructions, rules, agents, and enabled plugins) lives in
a separate private repo, [`claude-config`](https://github.com/JeffreyJoumjian/claude-config), whose
`install.sh` / `install.ps1` copy it into place. Its README is the from-scratch runbook.

Scripts are cross-platform: `deck-pdf.ts` probes Windows Chrome/Edge locations as well as macOS and
Linux ones.
