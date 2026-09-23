# mtg-agent

A Claude Code project that answers Magic: The Gathering rules questions from the official
Comprehensive Rules without loading the whole ~970 KB file into context.

## Start here — the deck brain

**Invoke the `deck-brain` skill before any Magic decision or deck edit**, and before answering
"should I run X", "what about card Y", "is the deck done". It is the accumulated method and
knowledge base from every deck in this repo: verified rulings with CR citations, evaluation
patterns that changed real decisions, and the mistakes already made so they aren't made twice.

It is also **append-only learning** — when a session produces a lesson that would change a future
decision on a different card or deck, write it into `.claude/skills/deck-brain/LEDGER.md` before
finishing. Deck-specific choices go in that deck's `research/decisions.md` instead.

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
- `bun run card --deck <slug> [--list <id>] [--id ur]` — price a whole list from
  `decks/<slug>/deck.json` in one call (`main` unless `--list` names another); flags not-found,
  non-commander-legal, and off-color-identity cards. The identity defaults to the commanders';
  `--id` overrides it. A path to a pasted `.txt`/`.md` list still works in place of the slug.
- `bun run scripts/card.ts search "<query>"` — Scryfall search syntax. Call the script path
  directly (not `bun run search`) when the query contains `<` or `>`.

Results cache for 24 h in the git-ignored `data/` folder; `bun run cards:refresh` re-pulls.

### Field signal (EDHREC)

For crowd data — what other decks run, synergy scores, inclusion rates, card ideas — use the
local EDHREC tool (7-day cache in `data/`):

- `bun run edhrec commander "<name>"` — themes + high-synergy/top lists (`--theme <slug>`,
  `--all`, `--json`).
- `bun run edhrec card "<name>"` — site-wide inclusion %, salt score, top commanders.
- `bun run edhrec --deck <slug> [--list <id>]` — per-card inclusion % + synergy for the whole
  list, then ranked ideas the deck doesn't run.

EDHREC is an **additional lens, never source of truth** — oracle text, prices and legality
still come from `bun run card`, and deck-brain §2.2 says how to weigh it (averages across
brackets/budgets, lags new sets, popularity ≠ a verdict for this deck).

### Always link card names to Scryfall

**Every card name you write in chat — prose, tables, bullet lists, swap rows, anywhere — must be a
markdown link to its Scryfall page.** No exceptions and no "first mention only": a name that
appears in five table rows gets linked five times, because the reader may only look at one row.

Use the exact-name search URL, which 303-redirects to the card page without needing a lookup:

```
[Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22)
```

The pattern is `https://scryfall.com/search?q=%21%22<NAME>%22` where `<NAME>` is the card name
URL-encoded — spaces become `+`, and any other reserved character is percent-encoded. `%21` is
`!` (Scryfall's exact-name operator) and `%22` is `"`.

- **Accents and commas encode normally** and still resolve —
  `[Mjölnir, Hammer of Thor](https://scryfall.com/search?q=%21%22Mj%C3%B6lnir%2C+Hammer+of+Thor%22)`.
- **For a double-faced card, link the front-face name only.** `!"Tony Stark"` resolves to the whole
  card; the full `Tony Stark // The Invincible Iron Man` string does not.
- **Apostrophes are fine unencoded** — `!"Commander's Plate"` works.
- This is a **chat-output** rule. Do **not** put these links in `deck.json` — card names there are
  data (Scryfall's canonical spelling, plain). Prose files under `research/` (including
  `research/sideboard.md`) may use them.
- **Inside the app** (the MTG Workbench chat, where the `mcp__deck-ui__*` tools exist), write card
  names as `[[Card Name]]` instead — the app renders them as card chips with hover images.

## Deckbuilding

Decks live in `decks/`, one folder per deck. **Read `decks/README.md` first** — it defines the
per-deck structure, the naming schema, and how to start a deck (copy `decks/_TEMPLATE/`). For a
final card-by-card trim to 100, use the `deck-finalizer` skill.

**Every deck is one file, `decks/<slug>/deck.json`** — all of its lists (`main` plus variants and
pools) and the per-card status / tags / notes / printing pins. It is the single source of truth;
`history.jsonl` + `versions/*.json` are the append-only record of every applied change, and
`MOXFIELD*.txt` is derived from it. There is no `DECK.md` or `STATUS.md` any more — never create
or edit one.

From the terminal (repo root):

- `bun run deck:show <slug> [--list <id>]` — read a list (sections, costs, tags, `[GC]`, stats
  footer). This is what you read instead of a decklist file.
- `bun run deck:edit <slug> [--list main] --label "…" [--why "…"] --add "Card@Section"
  --remove "Card" --move "Card@Section" --qty "Forest=6" [--replaces "Old->New"] [--dry-run]` —
  the **only recommended way to change a list**: it canonicalises names, snapshots the list to
  `versions/`, appends to `history.jsonl`, regenerates `MOXFIELD*.txt` and prints the stat deltas.
  Hand-editing `deck.json` skips all of that.
- `bun run deck:meta <slug> --card "Name" [--tag t] [--untag t] [--status …] [--note "…"]
  [--printing "(LTC) 264"]` — per-card bookkeeping, immediate and unversioned.

The same `deck.json` is also edited from the browser: `apps/collection-visualizer` ("MTG
Workbench") has the deck builder as its home — `/decks/<slug>` is the workbench, every edit there
is staged as a diff and applied through the same path as `deck:edit`, and its chat is a per-deck
Claude Code session with this repo's `.claude/` loaded (see that app's README).

The three fit together: **`deck-brain`** is *how to decide* and what's already been settled,
**`decks/README.md`** is *where things go*, **`deck-finalizer`** is the interactive cut-to-100
exercise.

## Layout

- `rules/raw/` — archived source `.txt` (the only place the full file lives).
- `rules/sections/` — one markdown chunk per 3-digit section; large sections (e.g. `702`)
  are split into `.partN.md`.
- `rules/glossary/` — glossary split by first letter.
- `rules/manifest.json` — the index the subagent reads first (titles, keywords, cross-refs,
  per-part labels).
- `rules/rules.json` — flat `{ruleId: text}` map (used only for diffing).
- `rules/meta.json` — loaded version / effective date / source.
- `scripts/` — the zero-dependency Bun + TypeScript build pipeline (rules **and** card/deck
  tooling: `card.ts`, `deck.ts` (show/edit/meta), `lib/scryfall.ts`, `lib/card-cache.ts`,
  `lib/deck-model.ts`, `lib/change-set.ts`, `lib/deck-stats.ts`, `lib/deck-store.ts`;
  `lib/decklist.ts` remains for pasted lists and legacy Markdown snapshots).
- `decks/` — one folder per deck, each a `deck.json` + `history.jsonl` + `versions/` (see
  `decks/README.md`). `decks/_TEMPLATE/` is the skeleton.
- `apps/collection-visualizer/` — the MTG Workbench app (deck builder + collection viewer). It
  imports `scripts/lib/*` through the `@mtg/*` alias.
- `data/` — ephemeral, git-ignored Scryfall cache (`card-cache.json` is the one card cache, shared
  by the CLI and the app).
- `CHANGELOG.md` — generated on each update.

## Tooling

Bun runs the TypeScript directly — no compile step, no npm dependencies.

- `bun run build` — re-chunk from the newest file in `rules/raw/`.
- `bun run fetch` — download the latest rules `.txt`.
- `bun run update` — fetch then build.
- `bun run card` / `bun run search` / `bun run cards:refresh` — card data (see "Card data").
- `bun run edhrec` — EDHREC crowd statistics (see "Field signal (EDHREC)").
- `bun run carddata` / `bun run deckcheck` — the deck-finalizer helpers (see that skill).
- `bun run deck:show` / `deck:edit` / `deck:meta` — read, change and annotate a deck's
  `deck.json` (see "Deckbuilding"). `deck:edit` snapshots, logs history and regenerates Moxfield.
- `bun run deck:migrate [--dry-run] [slug…]` — the one-time Markdown → `deck.json` migration
  (already run on every deck; kept for any Markdown deck added later).
- `bun run deck:moxfield <slug> [--stdout]` — regenerate `decks/<slug>/MOXFIELD*.txt`, the
  copy-pasteable Moxfield/Archidekt import lists **derived** from `deck.json`. Every `deck:edit`
  apply already does this; run it by hand only after hand-editing `deck.json`. Never edit the output.
- `bun run deck:pdf <slug> [list-id]` — the printable reference, from `deck.json` + `pdf.json`.
- `bun test` — run the parser/chunker/differ/manifest/decklist/deck-model/change-set/deck-store/
  deck-cli/deck-research/moxfield tests. Scoped to `./test` on purpose: `apps/collection-visualizer`
  has its own deps and its own `bun test`, and an unscoped run fails on a fresh clone before that
  app is installed.

**Bun, everywhere.** `bun.lockb` is the only lockfile — never run `npm`/`pnpm`/`yarn` here, and pass
`--use-bun` (or answer the prompt) if a generator like the shadcn CLI asks.

### Working on another machine

Everything this repo needs travels with the clone — the skills in `.claude/skills/`, the
`mtg-rules-expert` agent, the chunked rules, and the decks. **Bun is the only runtime
prerequisite** (`powershell -c "irm bun.sh/install.ps1 | iex"` on Windows,
`curl -fsSL https://bun.sh/install | bash` elsewhere); there is no Python dependency.

**The Bun version is pinned in `mise.toml`** (currently `1.3.14`), read by
[mise](https://mise.jdx.dev), which is activated from the shell rc and switches on `cd`.
`engines.bun` in `package.json` carries the same floor — pin and floor are bumped together.
`mise install` fetches the pinned Bun; `mise use bun@<version>` rewrites the pin.

**In a non-interactive shell the mise shell hook does not run**, so a bare `bun` there can resolve
to whatever else is on `PATH` (`~/.bun/bin/bun`, Homebrew, an old version manager). When it matters,
run `mise exec -- bun ...`, and use `mise which bun` to see which binary you actually got.

This is documented because running below the pin has broken two different things already:
`bun test ./test` throws `ModuleNotFound` on Bun 1.1.x **while printing "0 pass, 0 fail"**, which
reads like a clean run; and `bun run deck:pdf` fails its temp-file cleanup there because
`Bun.file().delete` does not exist before 1.3. The `test` script is now `bun test test/`, which
works on every version — but if any test command reports zero tests, check `bun --version` against
the pin before believing it.

The *global* config — the user's `~/.claude` instructions, rules, agents, and enabled plugins —
lives in a separate private repo, [`claude-config`](https://github.com/JeffreyJoumjian/claude-config),
whose `install.sh` / `install.ps1` copy it into place. Its README is the from-scratch runbook.

Scripts are cross-platform: `deck-pdf.ts` probes Windows Chrome/Edge locations as well as
macOS and Linux ones. `bun run deck:pdf` is the one command with an external dependency — it
needs Chrome, Chromium, or (on Windows) Edge.

### Don't leave processes running

Background processes you start are yours to stop. Stop a dev server as soon as you're done with it
rather than leaving it for the next task — several were once left running across sessions on ports
3001–3003, quietly burning CPU, because Vite silently walks to the next free port. (`strictPort` in
`apps/collection-visualizer/vite.config.ts` now makes a second start fail instead of hiding a
duplicate.)

A `SessionEnd` hook in `.claude/settings.json` kills this repo's Vite servers as a backstop — it is
not a licence to leave them running, since it only fires when the session actually ends. The hook
exits early when `MTG_AGENT_EMBEDDED=1` is set, which is how the app launches its embedded deck
agent, so that session ending never kills the app's own Vite server.
