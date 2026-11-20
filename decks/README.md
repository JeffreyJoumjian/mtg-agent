# Deckbuilding — conventions for agents

This folder holds Magic: The Gathering (Commander/EDH) decks. One folder per deck. Read this
before creating, editing, or reorganizing anything in `decks/` so the structure stays consistent
and work doesn't get lost.

> **This file covers *where things go*. For *how to decide* — card evaluation, cuts, swaps,
> rulings, and what's already been settled — invoke the `deck-brain` skill first.** Its
> ledger (`.claude/skills/deck-brain/ledger/`, searched with `bun run lookup`) learns: when a session
> produces a lesson that would change a future decision on a different card or deck, file it there
> before finishing. Decisions specific to one deck go
> in that deck's `research/decisions.md`.

## Per-deck layout

Every deck lives in `decks/<deck-slug>/` (slug = kebab-case theme or commander, e.g.
`scarlet-witch/`, `edgar-markov/`):

```
decks/<deck-slug>/
├── deck.json       AUTHORITATIVE. Every list of the deck (main + variants + pools) and the
│                   per-card status / tags / notes / printing pins. The single source of truth.
├── history.jsonl   Append-only log — one JSON line per applied change (label, author, entries,
│                   snapshot path, stats before/after). Written by the apply path, never by hand.
├── versions/       One JSON snapshot per applied change: the list AS IT WAS before the change.
│                   Immutable once written. Older Markdown snapshots stay and remain readable.
├── MOXFIELD.txt    DERIVED import list — regenerated from deck.json, never edited by hand
│                   (plus MOXFIELD-<ID>.txt for every other 100-card list).
├── pdf.json        Optional footer and appendix for the printable references — see below.
├── research/       Everything that informs the deck: card pool, strategy, decisions, sideboard prose.
├── samples/        Sample hands, goldfish lines, and example decklists worth learning from.
└── images/         Card/art images, only if actually needed.
```

`_TEMPLATE/` is a skeleton: a `deck.json` with an empty `main` list carrying the standard sections,
plus the empty subfolders. **To start a new deck, copy it:** `cp -r decks/_TEMPLATE decks/<new-slug>`,
set `name` in `deck.json`, then add cards with `bun run deck:edit` (below).

## `deck.json` — the single source of truth

Exactly one file defines a deck. Everything else in the folder is either derived from it
(`MOXFIELD*.txt`, the PDF), a record of how it changed (`history.jsonl`, `versions/`), or
supporting prose (`research/`).

```jsonc
{
  "schema": 1,
  "name": "Chatterfang, Squirrel General — Acorn Economy",
  "format": "commander",
  "description": "optional markdown",
  "lists": {
    "main": {                        // the primary 100 — every deck has one
      "label": "Main",
      "kind": "deck",                // "deck" targets 100 cards; "pool" has no size target
      "bracket": 3,                  // optional, 1–5
      "edhplay": "60e58260-…",       // optional: the EDHPlay deck this list is pushed to (edhplay-sync skill)
      "sections": [
        { "name": "Commander", "cards": [ { "name": "Chatterfang, Squirrel General", "qty": 1 } ] },
        { "name": "Lands",     "cards": [ { "name": "Forest", "qty": 7 } ] },
        { "name": "Ramp",      "cards": [ { "name": "Sol Ring", "qty": 1, "note": "per-list note" } ] }
      ]
    },
    "b4":        { "label": "Bracket 4", "kind": "deck", "bracket": 4, "sections": [ … ] },
    "sideboard": { "label": "Sideboard", "kind": "pool", "sections": [ … ] }
  },
  "cards": {                         // per-deck card metadata, keyed by card name
    "Sol Ring":      { "status": "PROXY", "tags": ["ramp"] },
    "Gaea's Cradle": { "status": "OWNED", "tags": ["ramp"], "note": "…",
                       "printing": { "set": "ltc", "collectorNumber": "264", "foil": true } }
  }
}
```

- **Lists** are keyed by a kebab-case id. `main` is the primary 100; other `"kind": "deck"` lists
  (`b4`, `v3`, `petitioners`, …) are alternative 100-card builds; `"kind": "pool"` lists (a
  sideboard, a pocket pile) have no size target. The commander is whatever sits in a list's
  `Commander` section. The standard sections are `Commander`, `Lands`, `Ramp`, `Card Draw`,
  `Removal`, `Board Wipes`, `Theme / Synergy`, `Win Conditions` — the template ships them — but a
  section is just a name, and `deck:edit --add "Card@New Section"` creates one on the fly.
- **`cards`** is the per-deck bookkeeping: `status` (`OWNED` | `BUY` | `PROXY` | `CONSIDERING`;
  the pilot proxies by default, so **`PROXY` is the default when absent** — deck-brain §0.1),
  `tags` (roles such as `ramp`, `draw`, `removal`, `wipe`, `drain`, `sac-outlet`, `token`,
  `aristocrat`, `protection`, `tutor`, `recursion`, `wincon`, `finisher`, `engine`, …), `note`, and
  `printing` (that deck's printing pin — see the Moxfield section). Entries survive a card leaving
  every list, so a card that comes back keeps its tags.
- **Game Changer status is not stored** — it is derived from Scryfall's flag, so there is nothing
  to keep in sync.
- **Card names are Scryfall's canonical spelling, front face only** for double-faced cards
  (`Tony Stark`, never `Tony Stark // The Invincible Iron Man`). `deck:edit` and the app
  canonicalise on the way in; if you hand-edit, match that.

### The record: `history.jsonl` + `versions/`

Every applied change set snapshots the list it replaces to
`versions/<YYYY-MM-DD-HHMM>-<listId>-<label>.json` (`{ takenAt, listId, label, reason, list }`)
and appends one line to `history.jsonl` (label, author `user` | `agent`, the entries, the snapshot
path, stats before/after and the deltas). Both are written by the apply path — `bun run deck:edit`
or an Apply in the app — and never by hand. Snapshots are immutable history; don't edit them
afterward. The migration wrote one `…-migrated-from-markdown.json` per list, and the older dated
`.md` snapshots from before it are still readable by the app and the tools.

Metadata edits (status, tags, notes, printing) are bookkeeping, not deck changes: they apply
immediately and do not snapshot or make history.

## Editing from the terminal (the CLI)

All from the repo root. **`deck:show` is what a terminal session reads instead of a decklist file;
`deck:edit` is the only recommended way to change a list from the terminal.**

```bash
bun run deck:show <slug> [--list <id>] [--json]
```

A Markdown view of one list: sections with mana costs, tags, `[GC]` and `[unresolved]` markers,
and a stats footer (total / lands / avg MV / pips / sources / price).

```bash
bun run deck:edit <slug> [--list main] --label "…" [--why "…"] \
    --add "Card@Section" --add "Forest@Lands x2" --remove "Card" --move "Card@Section" \
    --qty "Forest=6" [--replaces "Old->New"] [--json changes.json] [--dry-run]
```

One call = one change set. Names are canonicalised through Scryfall, the list is snapshotted to
`versions/`, `history.jsonl` gets a line, `MOXFIELD*.txt` is regenerated, and the stat deltas are
printed. `--why` becomes the history line's rationale; `--replaces "Old->New"` pairs an add with a
remove as a swap; `--dry-run` previews everything without writing. An unknown `--list` id is an
error — to start a new pool, add the list object to `deck.json` first, then fill it with
`deck:edit --list <id>`. Hand-editing `deck.json` works but skips the snapshot, the history line
and the Moxfield regeneration.

```bash
bun run deck:meta <slug> --card "Name" [--tag t]… [--untag t]… \
    [--status OWNED|BUY|PROXY|CONSIDERING] [--note "…"] [--printing "(LTC) 264"]
```

Tags, status, note and printing pin for one card — immediate, unversioned.

`bun run deck:migrate [--dry-run] [slug…]` is the one-time Markdown → `deck.json` migration. It has
already run on every deck here; it stays for any Markdown deck someone adds later.

## The importable list (`MOXFIELD.txt`) is generated, not written

Every deck carries a copy-pasteable import list beside `deck.json`. **Generate it — never hand-write
or hand-edit it** (deck-brain §1.4: never hand-maintain anything derivable; a second copy of the
100 is exactly the thing that drifts).

```bash
bun run deck:moxfield <slug>            # every "deck" list in deck.json
bun run deck:moxfield <slug> --stdout   # print instead of writing
```

- Every `deck:edit` apply (and every Apply in the app) regenerates it, so you only run this by hand
  after hand-editing `deck.json`.
- Output mirrors the list id: `main` → `MOXFIELD.txt`, `b4` → `MOXFIELD-B4.txt`,
  `petitioners` → `MOXFIELD-PETITIONERS.txt`. Pool lists get no file.
- Format is `1 Card Name`, commander first, then alphabetical — what Moxfield and Archidekt
  bulk-import expects.
- **Preferred printings come in two layers.** `decks/_printings.txt` is the **global reserve** —
  the printings actually owned, one line per card (`1 Sol Ring (LTC) 264`, the grammar the exporter
  emits, so a previous export can be fed back in), applied to every deck. A card's `printing` pin
  in that deck's `deck.json` (`bun run deck:meta <slug> --card "Name" --printing "(LTC) 264"`) is
  **that deck's override** and wins for the card it names. Anything neither covers falls back to
  the bare name and Moxfield picks a default printing. When you acquire a card, add it to the
  global reserve, not to a deck; a deck pin means "this deck uses a different copy".

## Naming schema

| Thing | Pattern | Example |
|---|---|---|
| Deck folder | `kebab-case` | `scarlet-witch/` |
| The store | `deck.json` (lowercase) | — |
| List id | `kebab-case` key under `lists` | `main`, `b4`, `petitioners`, `sideboard` |
| Change log | `history.jsonl` | — |
| Version snapshot | `versions/YYYY-MM-DD-HHMM-<listId>-<label>.json` | `versions/2026-09-23-1123-main-migrated-from-markdown.json` |
| Import list | `MOXFIELD.txt` / `MOXFIELD-<ID>.txt` (UPPERCASE, derived) | `MOXFIELD-B4.txt` |
| Research note | `research/<kebab-topic>.md` | `research/decisions.md`, `research/sideboard.md` |

Snapshots are taken **for you** by every apply — there is no manual "copy the file first" step.
If you must hand-edit `deck.json` for something `deck:edit` cannot express (renaming a list, adding
a pool), copy the list object to `versions/<today>-<listId>-<label>.json` first and run
`bun run deck:moxfield <slug>` after.

## Looking up and pricing cards

Card data comes from the local Scryfall tool (repo root; see the root `README.md` "Card data"
section). It caches results for 24 h in the git-ignored `data/` folder.

```bash
bun run card "Chaos Warp"                  # one card: cost, type, color identity, price, legality
bun run card --deck <slug>                 # price the main list; flags not-found + illegal +
                                           # off-identity cards (identity = the commanders')
bun run card --deck <slug> --list b4       # another list of the same deck
bun run card --deck <slug> --id ur         # override the colour identity being checked
bun run card --deck some/pasted-list.txt   # a pasted `1x Card` list still works
bun run scripts/card.ts search "id<=ur t:warlock"  # Scryfall search syntax (call the script
                                                   # directly when the query contains < or >)
```

Run `bun run card --deck <slug>` on every commit-worthy edit to catch color-identity violations and
non-commander-legal cards before they reach a physical build (the `deck:show` footer and the app's
flags rail surface the same checks).

## Field signal (EDHREC)

`bun run edhrec` pulls crowd statistics from EDHREC's public JSON endpoints, cached for 7 days
in the git-ignored `data/` folder. It is an **additional lens — popularity data, never source
of truth**: oracle text, prices and legality stay with `bun run card`, and how to weigh the
numbers is deck-brain §2.2.

```bash
bun run edhrec commander "The Scarlet Witch"      # themes + high-synergy/top/GC lists
bun run edhrec commander "Atraxa" --theme infect  # one theme's version (--all: every list)
bun run edhrec card "Sol Ring"                    # site-wide inclusion %, salt, top commanders
bun run edhrec --deck <slug> [--list <id>]        # coverage: inclusion % + synergy per deck
                                                  # card, then ranked ideas the deck doesn't run
```

Names resolve by front face (`"Tony Stark"`, never the full DFC name). `--commander "Name"`
overrides the commander detected from the list's `Commander` section, `--ideas N` widens the ideas
list (default 25), and `--json` gives raw output everywhere.

## Printable deck reference (PDF)

```bash
bun run deck:pdf <slug>             # main plus every list on EDHPlay
bun run deck:pdf <slug> <list-id>   # one list
bun run deck:pdf --all              # every deck that has a pdf.json or a list on EDHPlay
```

Each list gets its own PDF: `decks/<slug>/<slug>-reference.pdf` for `main`, and
`decks/<slug>/<slug>-<list-id>-reference.pdf` for every other list (`caesar-combat-reference.pdf`,
`iron-man-v3-reference.pdf`). Every part except the footer and the appendix is derived from the
deck's own files, so a regenerated PDF always matches the list:

1. **Page 1**: the decklist from `deck.json`, three columns grouped by the list's sections, under a
   header built from the list (commander, bracket, Game Changer count, card count) and a stat bar
   with every section's count, the average MV, and the MV ≤ 2 and MV ≤ 3 counts.
2. **Recent swaps**: the list's last 12 swaps from `history.jsonl`, newest first. Each is a bordered
   row with the `IN` card on the left and the `OUT` card on the right, then the dated **Why** from
   the history line and, when the OUT card has a sideboard row that displaces the IN card, its
   **Bring back** text.
3. **Sideboard**: every row of `research/sideboard.md` whose displaced card is in this list and
   whose own card isn't. Tables are read by their headers, so `Card | Bring in when | Displaces`,
   `IN | OUT | Why` and `Card | … | Replaced by` all work. A table without a displaced-card column
   (a "considered and rejected" table) is skipped.
4. **Appendix**: markdown docs, each starting a new page.

Everything is black-on-white with no background fills, so it prints without eating ink. Card images
are pulled from Scryfall once and cached in the git-ignored `data/card-images/`, so re-runs are
offline and instant. Rendering shells out to headless Chrome, with no npm dependencies.

**`decks/<slug>/pdf.json`** is optional and holds only the hand-written parts:

```jsonc
{
  "footer": "One paragraph under the sideboard.",
  "appendix": ["research/gameplan.md", "research/formulas.md"],
  "lists": { "combat": { "appendix": ["research/gameplan-combat.md"] } }
}
```

Notes:
- `appendix` defaults to `research/gameplan.md` when that file exists. `lists.<id>` overrides the
  footer or the appendix for one list, for a variant with its own gameplan.
- The decklist shows **mana cost + MV** for spells and **produced mana** for lands, using Scryfall's
  official symbol SVGs (cached in `data/card-symbols/`). Land output is trimmed to the deck's own
  colour identity, so Command Tower reads `WBR` rather than `WUBRG`.
- `appendix` renders headings, tables, fenced code, blockquotes and lists, and `{B}`-style tokens in
  prose become real mana symbols (inside fenced code they stay as text so formula alignment
  survives).
- Basic lands use a plain black-bordered printing, because Scryfall's default basic is often a
  full-art or borderless treatment that reads badly in print.

Regenerate the PDFs whenever a list changes, or they will silently show the old list.

## In the app

`apps/collection-visualizer` ("MTG Workbench") is the second door into the same `deck.json`. `/` is
the decks index, `/decks/<slug>` the workbench (stats rail, board with Board/Table/Curve views and
search-to-add, a chat with a per-deck Claude Code session), `/decks/<slug>/history` the version
timeline with "as it was", "diff vs current" and Restore. Every edit there — yours or the
agent's — is **staged** as a diff with stat deltas first; Apply writes through the same path as
`deck:edit`, so the snapshot, the history line and the Moxfield regeneration all happen, and a
terminal session on the same checkout sees the same deck. The agent can never write `deck.json`
directly; it proposes. See `apps/collection-visualizer/README.md`.

## Where things go (quick rules)

- A new candidate card, combo idea, or matchup note → `research/`.
- A locked decision with rationale → `research/decisions.md` (append; don't rewrite history).
- Sideboard prose (each entry's bring-in trigger and what it displaces) → `research/sideboard.md`;
  the cards themselves can also live in a `"kind": "pool"` list in `deck.json`.
- The current list changed → `bun run deck:edit` (or Apply in the app). Never hand-edit
  `MOXFIELD*.txt`, `history.jsonl` or anything in `versions/`.
- A card's status / tags / note / printing → `bun run deck:meta`, or the card popover in the app.
- About to gut/rebuild the deck → nothing extra: every apply snapshots what it replaces.
- A deck you are done with → **Archive** it from the decks page in the app. Nothing is deleted:
  the whole folder moves to `decks/_archive/<slug>/` (underscore-prefixed, so it no longer lists
  as a deck), and **Restore** on the same page moves it back. Moving the folder by hand does the
  same thing.
- Don't leave loose files in `decks/` root — everything belongs to a deck folder. The two
  exceptions are `decks/_printings.txt`, the cross-deck printings reserve, and `decks/_notes.md`,
  the per-deck standing notes (both underscore-prefixed, like `_TEMPLATE/` and `_archive/`, so they
  never read as a deck).
- A standing per-deck fact (which lists are live, a loop hazard, a pilot constraint, an artifact
  URL) → that deck's section of `decks/_notes.md`; its grounds still go in `research/decisions.md`.
