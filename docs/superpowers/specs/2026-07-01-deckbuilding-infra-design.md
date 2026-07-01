# Deckbuilding infrastructure — design (2026-07-01)

Adds a card-data layer and a deckbuilding workspace to what was a rules-only project, without
breaking the rules pipeline or the zero-dependency Bun/TS ethos.

## Problem
- No reliable card data. Web summaries are inconsistent and wrong for brand-new sets, and a naive
  fetch of Scryfall returns HTTP 403 (missing `User-Agent`).
- `decks/` was a flat pile mixing multiple decks, caches, Python one-offs, and root-level JSON —
  things get lost and agents can't navigate it.

## Solution

### A. Scryfall card-data tool (`scripts/`)
- `lib/scryfall.ts` — zero-dep client. Bun-native `fetch` with the required `User-Agent`/`Accept`
  headers (fixes the 403), ~100 ms throttle, 429 retry, batch `/cards/collection` (75/req),
  `/cards/named` (exact→fuzzy), and `/cards/search` with pagination. Projects raw cards to a compact
  `CardSummary` (handles double-faced cards).
- `lib/card-cache.ts` — single-file JSON cache at `data/card-cache.json`, **24 h TTL per card**
  (prices move daily). Reads auto-refresh stale/missing entries; misses coalesce into one batch call.
  `refreshAll()` re-pulls on command. Ephemeral/rebuildable → git-ignored.
- `lib/decklist.ts` — parses `1x Card Name` lists (strips counts, comments, headers, set/foil
  annotations). Extracted from the CLI so it's unit-tested (`test/decklist.test.ts`).
- `card.ts` — CLI: single lookup, `--deck` batch pricing + validation (not-found / not-legal /
  `--id` off-identity), and `search`. Wired as `bun run card` / `search` / `cards:refresh`.

### B. Deckbuilding workspace (`decks/`)
- One folder per deck: authoritative `DECK.md` + `STATUS.md` pair (kept in sync), plus `research/`,
  `versions/`, `samples/`, `images/`.
- `decks/_TEMPLATE/` skeleton (copy to start a deck). `decks/README.md` documents conventions,
  naming schema, and the card commands — written for agents.
- Migrated the existing Edgar Markov deck into `decks/edgar-markov/` and the Scarlet Witch research
  into `decks/scarlet-witch/`. Root `*_edgar_decks.json` moved into `edgar-markov/research/`.

## Decisions
- **Build vs. third-party MCP:** built our own. The 403 was just a missing header; a ~40-line client
  fits the repo's zero-dep, auditable, offline-cacheable philosophy with no supply-chain surface.
  (`gregario/mtg-oracle` would duplicate our existing rules subagent; `anchapin/magic_decks` is an
  unmaintained Arena workflow, not an MCP.) An always-on Scryfall MCP remains optional for ambient
  lookups outside this repo.
- **Cache git-ignored, not committed:** avoids daily price churn; rebuilds on demand. Human-curated
  card snapshots stay as committed `research/` artifacts, separate from the machine cache.

## Follow-ups
- Draft the full Scarlet Witch 100 (see `decks/scarlet-witch/`), then run `deck-finalizer`.
