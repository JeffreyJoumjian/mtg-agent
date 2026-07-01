# Deckbuilding — conventions for agents

This folder holds Magic: The Gathering (Commander/EDH) decks. One folder per deck. Read this
before creating, editing, or reorganizing anything in `decks/` so the structure stays consistent
and work doesn't get lost.

## Per-deck layout

Every deck lives in `decks/<deck-slug>/` (slug = kebab-case theme or commander, e.g.
`scarlet-witch/`, `edgar-markov/`):

```
decks/<deck-slug>/
├── DECK.md        AUTHORITATIVE current decklist. The single source of truth for what the deck is.
├── STATUS.md      AUTHORITATIVE status mirror of DECK.md (own / buy / proxy / considering / cut).
├── research/      Everything that informs the deck: card pool, strategy, decisions, shopping list.
├── versions/      Dated snapshots of past DECK.md states — never edited after being written.
├── samples/       Sample hands, goldfish lines, and example decklists worth learning from.
└── images/        Card/art images, only if actually needed.
```

`_TEMPLATE/` is an empty skeleton. **To start a new deck, copy it:**
`cp -r decks/_TEMPLATE decks/<new-slug>`

## The two authoritative files (keep them in sync)

`DECK.md` and `STATUS.md` are the only files that define the deck. **They must always agree:**
every card in `DECK.md` has exactly one corresponding line in `STATUS.md`. When you add, cut, or
swap a card, update **both** in the same edit. Everything else in the folder is supporting material.

- **`DECK.md`** — the list only. `1x Card Name`, grouped under role headers
  (`## Commander`, `## Lands`, `## Ramp`, `## Card Draw`, `## Removal`, `## Board Wipes`,
  `## Theme / Synergy`, `## Win Conditions`). Human-readable, importable, and parseable by the
  card tool. Keep a running total so it's easy to see you're at 100.
- **`STATUS.md`** — the same cards, each tagged with acquisition status and notes, e.g.
  `1x Chaos Warp — OWNED` / `1x Cyclonic Rift — BUY ($40) 💰proxy?` / `1x Expropriate — CONSIDERING`.
  Use 💰 to mark expensive cards that are proxy candidates.

## Naming schema

| Thing | Pattern | Example |
|---|---|---|
| Deck folder | `kebab-case` | `scarlet-witch/` |
| Authoritative pair | `DECK.md`, `STATUS.md` (UPPERCASE) | — |
| Version snapshot | `versions/YYYY-MM-DD-<label>.md` | `versions/2026-07-01-initial-baseline.md` |
| Research note | `research/<kebab-topic>.md` | `research/card-pool.md`, `research/strategy.md` |

**Snapshot a version** before a big change: copy the current `DECK.md` to
`versions/<today>-<label>.md`. Snapshots are immutable history — don't edit them afterward.

## Looking up and pricing cards

Card data comes from the local Scryfall tool (repo root; see the root `README.md` "Card data"
section). It caches results for 24 h in the git-ignored `data/` folder.

```bash
bun run card "Chaos Warp"                 # one card: cost, type, color identity, price, legality
bun run card --deck decks/<slug>/DECK.md  # price the whole list; flags not-found + illegal cards
bun run card --deck decks/<slug>/DECK.md --id ur   # also flag cards outside a color identity
bun run scripts/card.ts search "id<=ur t:warlock"  # Scryfall search syntax (call the script
                                                   # directly when the query contains < or >)
```

Use `--deck ... --id <colors>` on every commit-worthy edit to catch color-identity violations and
non-commander-legal cards before they reach a physical build.

## Where things go (quick rules)

- A new candidate card, combo idea, or matchup note → `research/`.
- A locked decision with rationale → `research/decisions.md` (append; don't rewrite history).
- The current list changed → edit `DECK.md` **and** `STATUS.md` together.
- About to gut/rebuild the deck → snapshot to `versions/` first.
- Don't leave loose files in `decks/` root — everything belongs to a deck folder.
