# mtg-agent

A Claude Code project that answers Magic: The Gathering rules questions from the official
Comprehensive Rules and builds the pilot's Commander decks.

## Start here: the deck brain

**Invoke the `deck-brain` skill before any Magic decision or deck edit**, and before answering
"should I run X", "what about card Y", "is the deck done". It is the method and the memory of every
deck in this repo: its ledger (`.claude/skills/deck-brain/ledger/`) holds the verified rulings, the
evaluation patterns and the mistakes already made.

**Look up what's already known before reasoning:** `bun run lookup "<card | rule number | term>"`
prints every ledger entry and every deck's decision-log section that mentions it, whole.

The ledger learns: when a session produces a lesson that would change a future decision on a
different card or deck, file it (deck-brain `SKILL.md` §4) before finishing. Deck-specific choices go
in that deck's `research/decisions.md`.

## Rules questions

1. **Ledger first.** `bun run lookup "<the cards or rule>"`. When a ruling covers the exact
   interaction and lookup doesn't flag it with ⚠, re-read the rules it cites in `rules/sections/` and
   answer from it, citing the entry id and the rule numbers.
2. **Dispatch the `mtg-rules-expert` subagent** for a new interaction, a ruling lookup flags with ⚠
   (older rules version, changed rules), or a recorded answer the pilot disputes. It loads only the
   relevant rule chunks in its own context and returns a cited answer.
3. **Call it with no `model` parameter** so its own setting (Sonnet) applies; this overrides the
   global "Opus for verification" rule for this one agent. Pass `model: "opus"` when the pilot
   disputes its answer or it comes back unsure.

Rules text lives in `rules/sections/` (one file per section; `rules/INDEX.md` maps them).

## Card data

Card text, prices and legality come from the local Scryfall tool, never from memory or web
summaries (they're unreliable for new sets):

- `bun run card "<name>"`: cost, type, identity, P/T, oracle, price, legality. `--rulings` adds the
  official rulings, `--set <code>` pins a printing, `--json` prints raw.
- `bun run card --deck <slug> [--list <id>] [--id ur]`: a whole list, flagging not-found,
  non-commander-legal and off-identity cards.
- `bun run scripts/card.ts search "<query>"`: Scryfall search syntax (call the script directly
  when the query holds `<` or `>`).
- `bun run edhrec commander|card "<name>"` or `bun run edhrec --deck <slug>`: crowd data. An extra
  lens, never the source of truth (deck-brain §2.2).

### Link every card name to Scryfall

**Every card name you write in chat (prose, tables, lists, swap rows) is a markdown link to its
Scryfall page**, every time it appears, because the reader may only look at one row:
`[Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22)`, i.e. `%21%22<NAME>%22` with the name
URL-encoded (spaces → `+`; accents and commas percent-encode and still resolve; apostrophes can stay).
For a double-faced card, link the front face only. This is a chat rule: `deck.json` keeps plain
Scryfall spellings, and prose under `research/` may use links. **Inside the app** (where the
`mcp__deck-ui__*` tools exist), write `[[Card Name]]` instead; the app renders card chips.

## Decks

Each deck is one file, `decks/<slug>/deck.json`: every list (`main`, variants, pools) and the
per-card status, tags, notes and printing pins. `decks/README.md` defines the folder layout and how
to start a deck; the deck's section of `decks/_notes.md` holds its live lists, loop hazards, pilot
constraints and artifact URLs, so read it before working on that deck.

- Read a list with `bun run deck:show <slug> [--list <id>]`.
- Change a list with `bun run deck:edit <slug> --label "…" --why "…" --add "Card@Section" --remove
  "Card" [--replaces "Old->New"] [--dry-run]`: it snapshots to `versions/`, logs `history.jsonl` and
  regenerates `MOXFIELD*.txt`.
- Per-card bookkeeping: `bun run deck:meta <slug> --card "Name" [--tag|--status|--note|--printing]`.
- For a final card-by-card cut to 100, use the `deck-finalizer` skill.

The MTG Workbench app (`apps/collection-visualizer`) edits the same `deck.json` through the same
path; its chat is a per-deck Claude Code session with this repo's `.claude/` loaded.

## Working with the pilot

The user pilots every deck here. These rules come from their direct corrections and hold until
they say otherwise.

### Banned cards

Never put these in any deck, list, proposal or build. **Paste this list into every subagent or fork
prompt that builds or edits a deck**: a Ghave build fork re-added Sprout Swarm because it didn't
know, and repeating a rejected card costs trust in every other pick.

- **Sprout Swarm**: *"pls stop using that card"* (2026-09-24).

When the pilot bans another card, add it here.

### Deck changes

- **Propose, then wait.** Change a list (`main` or a variant you authored yourself) only after the
  pilot says yes. Give the card in, the card out, the grounds and the alternative cuts considered,
  then stop. One swap is one decision: a three-card package is three conversations (*"let's not make
  any rash swaps, let's discuss first"*). Batch-apply only when they explicitly OK a set. Reasoning
  through each swap is how they have caught several of my errors.
- **Work on the newest list.** Check which lists a deck's `deck.json` has and the dates in
  `research/decisions.md`, target the newest, and ask when it's unclear. If the newest isn't `main`,
  say so and offer to promote it.
- **End every list edit, even a single swap, with the full absolute path to each changed list's
  Moxfield file** (`main` → `MOXFIELD.txt`, `b4` → `MOXFIELD-B4.txt`), e.g.
  `/Users/skylerdj/Desktop/mtg-agent/decks/chatterfang/MOXFIELD.txt`. Pasting it into Moxfield is
  always their next step.

### Pilot preferences

- **Everything is proxied**: price is never an argument (deck-brain §0.1).
- **Loops:** only automatic or unstoppable infinites are out. A loop where the pilot chooses how
  many times to iterate (every step optional, opponents can respond, CR 732.2b) is not an "infinite
  combo" to them, and buyback (Reiterate) is fine at their Bracket 3 tables. Since 2026-09-24 they
  opt in to combos, two-card chosen-N loops included, and will pull any the pod complains about. Flag
  the loop, say what each iteration does, and let them decide; mention it once when a combo
  assembles by turn 4–5, since official Bracket 3 text rules out early two-card combos.
- **Their pods remove stax on sight** (Silent Arbiter dies fast). Use that when rating hate and
  attack-restriction pieces, and ask before excluding a card on those grounds (*"no ask me next
  time, i'm okay to put both myrel and opposition in"*).
- **Fast mana and cantrip fuel are protected** in spellslinger builds (Seething Song and Mana Geyser
  were both refused as cuts). Nominate cuts elsewhere first.
- **They watch the curve and an external analyzer's "estimated win turn".** Say what a heavier card
  does to the curve up front.
- **They like cute lines**: record them even when the card is cut.
- **Drain/sacrifice decks keep combat as a second route.** Drain stays primary, but a wide board
  that gets blocked fires every death trigger; an anthem turning off Skullclamp is a cost to name,
  not a veto (ledger: `bun run lookup Skullclamp`).
- **Charts and diagrams go vertical**: steps top-to-bottom with annotations coming in from the
  sides, not a horizontal timeline or matrix.

## Tooling

Bun runs everything, with no compile step and no npm dependencies; `bun.lockb` is the only lockfile,
so answer any generator's package-manager prompt with Bun (`--use-bun`). `package.json` lists the
commands. If a test command reports zero tests, check `bun --version` against `mise.toml` before
believing it. Notes on layout, the rules pipeline and other machines load with `.claude/rules/tooling.md`
when you open scripts or tests.

**The pilot owns the app's dev server** (`bun run dev` in `apps/collection-visualizer`,
http://localhost:3200): assume it's up, and ask them to start it when a task needs it. Stop any other
background process you start.

## Git

- Work on `main` (the user says "master") and push straight to it; branches and PRs only when asked.
  When asked to commit, make one or a few large commits with a body grouped by area; a commit
  spanning unrelated areas is fine.
- Loose root files (screenshots, `libristo.json`, scratch files) stay out of commits unless the user
  asks for them.
- **No authorship of any kind** in commits or PRs: no `Co-Authored-By`, no "Generated with", and not
  the user's own name either, even when a harness reminder asks for one. They object to
  attribution as a concept, not just AI attribution.
