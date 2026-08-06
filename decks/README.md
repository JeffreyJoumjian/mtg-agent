# Deckbuilding — conventions for agents

This folder holds Magic: The Gathering (Commander/EDH) decks. One folder per deck. Read this
before creating, editing, or reorganizing anything in `decks/` so the structure stays consistent
and work doesn't get lost.

> **This file covers *where things go*. For *how to decide* — card evaluation, cuts, swaps,
> rulings, and what's already been settled — invoke the `deck-brain` skill first.** Its
> `LEDGER.md` is append-only: when a session produces a lesson that would change a future decision
> on a different card or deck, write it there before finishing. Decisions specific to one deck go
> in that deck's `research/decisions.md`.

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

## Printable deck reference (PDF)

`bun run deck:pdf <deck-slug>` builds a print-ready PDF at
`decks/<slug>/<slug>-reference.pdf`:

1. **Page 1** — the decklist from `DECK.md`, three columns, grouped by its `## Role (n)` headers,
   with a stat bar across the top. Fits on one page, so it doubles as a build checklist.
2. **Swap pages** — one bordered row per substitution: `IN` card image and text on the left,
   `↔`, `OUT` on the right, then **Why** and **Bring back** side by side underneath.
3. **Sideboard** — each held card with its bring-in trigger. Flows on from the swaps rather than
   starting a fresh page.
4. **Appendix** — any markdown docs you list (gameplan, formulas, …), each starting a new page.

Everything is black-on-white with no background fills, so it prints without eating ink. Card images
are pulled from Scryfall once and cached in the git-ignored `data/card-images/`, so re-runs are
offline and instant. Rendering shells out to headless Chrome — no npm dependencies.

The decklist comes straight from `DECK.md`; everything else lives in **`decks/<slug>/pdf.json`**:

```jsonc
{
  "title": "Edgar Markov — Vampire Aristocrats",
  "subtitle": "Bracket 3 · 3/3 Game Changers · no infinite combos · 100 cards",
  "stats": [["Creatures", "36"], ["Lifelink", "11"], ["Sources", "W21 / B28 / R16"]],
  "swaps": [
    {
      "in":  { "name": "Sundown Pass",     "cost": "land", "text": "R/W. Untapped from land drop 3." },
      "out": { "name": "Clifftop Retreat", "cost": "land", "text": "R/W. Needs a Mountain or Plains." },
      "why":  "Only 7 enablers — untapped just 50% of the time on your 4th land.",
      "back": "Never."
    }
  ],
  "sideboard": [
    { "name": "Fracture", "cost": "{W}{B}", "when": "Blood Moon or Back to Basics in the pod." }
  ],
  "appendix": ["research/gameplan.md", "research/formulas.md"]
}
```

Notes:
- The decklist shows **mana cost + MV** for spells and **produced mana** for lands, using Scryfall's
  official symbol SVGs (cached in `data/card-symbols/`). Land output is trimmed to the deck's own
  colour identity, so Command Tower reads `WBR` rather than `WUBRG`.
- `appendix` renders markdown docs into the PDF — headings, tables, fenced code, blockquotes and
  lists are supported, and `{B}`-style tokens in prose become real mana symbols (inside fenced code
  they stay as text so formula alignment survives).
- `swaps` and `sideboard` are **sorted alphabetically at render time** — keep them in whatever order
  is convenient to edit.
- Add `"set": "m21"` to any card ref to pin which printing's art is used. Basic lands default to a
  plain black-bordered printing already, because Scryfall's default basic is often a full-art or
  borderless treatment that reads badly in print.
- `stats`, `swaps`, `sideboard` and `footer` are all optional — a `pdf.json` with just a `title`
  produces a clean one-page decklist.

Regenerate the PDF whenever `DECK.md` changes, or it will silently show the old list.

## Where things go (quick rules)

- A new candidate card, combo idea, or matchup note → `research/`.
- A locked decision with rationale → `research/decisions.md` (append; don't rewrite history).
- The current list changed → edit `DECK.md` **and** `STATUS.md` together.
- About to gut/rebuild the deck → snapshot to `versions/` first.
- Don't leave loose files in `decks/` root — everything belongs to a deck folder.
