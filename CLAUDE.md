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

## Card data (Scryfall)

For card lookups, prices, legality, and search, use the local Scryfall tool — **do not** guess
card text/prices or rely on web summaries (they're unreliable for new sets):

- `bun run card "<name>"` — one card: cost, type, color identity, P/T, oracle, USD price,
  commander-legality (`--set <code>` to pin a printing, `--json` for raw).
- `bun run card --deck decks/<slug>/DECK.md [--id ur]` — price a whole decklist in one call;
  flags not-found, non-commander-legal, and (with `--id`) off-color-identity cards.
- `bun run scripts/card.ts search "<query>"` — Scryfall search syntax. Call the script path
  directly (not `bun run search`) when the query contains `<` or `>`.

Results cache for 24 h in the git-ignored `data/` folder; `bun run cards:refresh` re-pulls.

## Deckbuilding

Decks live in `decks/`, one folder per deck. **Read `decks/README.md` first** — it defines the
per-deck structure, the `DECK.md` + `STATUS.md` authoritative pair (keep them in sync), the
naming schema, and how to start a deck (copy `decks/_TEMPLATE/`). For a final card-by-card
trim to 100, use the `deck-finalizer` skill.

## Layout

- `rules/raw/` — archived source `.txt` (the only place the full file lives).
- `rules/sections/` — one markdown chunk per 3-digit section; large sections (e.g. `702`)
  are split into `.partN.md`.
- `rules/glossary/` — glossary split by first letter.
- `rules/manifest.json` — the index the subagent reads first (titles, keywords, cross-refs,
  per-part labels).
- `rules/rules.json` — flat `{ruleId: text}` map (used only for diffing).
- `rules/meta.json` — loaded version / effective date / source.
- `scripts/` — the zero-dependency Bun + TypeScript build pipeline (rules **and** card tooling:
  `card.ts`, `lib/scryfall.ts`, `lib/card-cache.ts`, `lib/decklist.ts`).
- `decks/` — one folder per deck (see `decks/README.md`). `decks/_TEMPLATE/` is the skeleton.
- `data/` — ephemeral, git-ignored Scryfall cache.
- `CHANGELOG.md` — generated on each update.

## Tooling

Bun runs the TypeScript directly — no compile step, no npm dependencies.

- `bun run build` — re-chunk from the newest file in `rules/raw/`.
- `bun run fetch` — download the latest rules `.txt`.
- `bun run update` — fetch then build.
- `bun run card` / `bun run search` / `bun run cards:refresh` — card data (see "Card data").
- `bun test` — run the parser/chunker/differ/manifest/decklist tests.
