# Deck Builder — visual deck building with the agent in the loop

**Date:** 2026-09-23
**Status:** Approved in principle (user delegated design → spec → plan → first version; decisions to
review are listed in §12)
**Supersedes:** `2026-07-30-deck-workbench-design.md` (the parked workbench; its UI is removed by this
work, its plumbing is reused where noted)

## 1. Goal

A dedicated, fully visual Commander deck-building app, on the user's own Mac, on the user's Claude
subscription, with a chat that works the way our terminal sessions do — except that every card
under discussion is on screen, every proposed change is a diff with the numbers that move, and
every applied change is a version you can go back to.

Success looks like: the user opens a deck, asks "what would you cut for Skullclamp?", sees the four
candidates as cards in the chat, sees the swap staged on the board with "avg MV 2.87 → 3.01, drain
7 → 6, lands 37 → 37", flips a preview toggle to see the deck with and without it, clicks Apply,
and the deck file, the snapshot, the history and the Moxfield export are all updated at once — and
a terminal session opened on the same repo sees the same deck.

Not goals for this spec: research panels (EDHREC recommendations view, decisions log browser),
collection cross-reference (owned badges from the ManaBox CSV), multi-user or public hosting. Each
is a later sub-project on the same foundation.

## 2. What we learned from the parked workbench

The previous attempt broke in three ways the user hit repeatedly. Each has a structural fix here,
not a patch.

| Failure | Root cause (verified) | Fix in this design |
|---|---|---|
| Cards vanished and never came back, even after refresh | `data/card-names.json` persisted `null` ("confirmed not found") for any name absent from a Scryfall response. Names with curly apostrophes (`Witch’s Mark`), accents (`Bartolome del Presidio`) or a parser miss (`19x mountain`) were poisoned forever. | One shared card cache (the repo-root `data/card-cache.json`); **negative results are never persisted**; names are normalised before lookup and canonicalised at migration; an unresolved card renders as an explicit "unresolved" tile with a fix action instead of disappearing. |
| Board out of sync with the terminal | The page loaded deck files in a route loader and only re-read after a chat turn ended. | The server watches `decks/` and pushes a `deck-changed` event; the client re-fetches. Both doors (app and terminal CLI) write through the same library. |
| Some images missing | The app had its own regex parser and its own Scryfall projection, different from the root scripts'. | One parser, one card projection, one cache — the root `scripts/lib/` — imported by the app through a path alias. |

Everything in `src/components/deck`, `src/lib/deck`, `src/server/deck-agent`, `src/server/decks.ts`,
`src/lib/server/deck-*.ts`, the deck routes and `scripts/deck-live.ts` is **deleted**. What is kept:
the Agent SDK session pattern (streaming input generator, `canUseTool` as the single authority, SSE
fan-out, JSONL transcripts, resume by session id, the `globalThis` singleton across HMR), the shadcn
primitives, the mana/set symbol components, the card tile visuals, and the app shell (sidebar, theme).

## 3. Key decisions

1. **JSON is the store.** Each deck is `decks/<slug>/deck.json`: every list (main + variants + pools),
   per-card status, tags, notes and printing pins in one file. `DECK*.md`, `STATUS.md` and
   `SIDEBOARD.md` are migrated once and removed; `MOXFIELD*.txt` stays as a generated export.
   Rationale: one file cannot drift from itself; scripts stop parsing prose; the LLM reads JSON as
   easily as Markdown; a card-per-line formatter keeps git diffs readable.
2. **One apply path, two doors.** `scripts/lib/deck-store.ts` owns reading, validating, applying
   change sets, snapshotting, history and Moxfield regeneration. The app's server functions and a
   new `bun run deck:edit` CLI both call it. The browser agent never edits `deck.json` by hand — it
   proposes change sets through a tool.
3. **The change set is the unit of every edit**, whether it comes from the user's clicks or the
   agent's proposal, and it is *staged* before it is *applied*. Staging is what makes the diff,
   the stat deltas and the with/without preview possible for both.
4. **Every apply snapshots what it replaces.** History is a linear, append-only log; any point can
   be restored, and a restore is just another change set, so "go back to the newer one" is one more
   restore. The app never runs git.
5. **The agent's brain is the repo's brain.** The SDK session loads the project's `.claude/`
   (skills, agents, CLAUDE.md), so deck-brain, the ledger, the finalizer and `mtg-rules-expert` are
   available exactly as in the terminal. The gate allows the read-only card and EDHREC tools and
   the ledger append; it blocks direct edits to `deck.json`.
6. **Model and effort are a UI choice**, per deck, defaulting to Claude Code's default.
7. **Layout:** stats rail left, board centre, chat right, resizable. History is its own page.

## 4. Data model

### 4.1 `decks/<slug>/deck.json`

```jsonc
{
  "schema": 1,
  "name": "Chatterfang, Squirrel General — Acorn Economy",
  "format": "commander",
  "description": "Every token you make arrives with a Squirrel stapled to it. …",   // markdown
  "lists": {
    "main": {
      "label": "Main",
      "kind": "deck",              // "deck" (targets 100) | "pool" (no target: sideboard, pocket, cut)
      "bracket": 3,
      "sections": [
        { "name": "Commander", "cards": [ { "name": "Chatterfang, Squirrel General", "qty": 1 } ] },
        { "name": "Lands",     "cards": [ { "name": "Barren Moor", "qty": 1 }, { "name": "Forest", "qty": 7 } ] },
        { "name": "Ramp",      "cards": [ { "name": "Sol Ring", "qty": 1, "note": "…" } ] }
      ]
    },
    "b4": { "label": "Bracket 4", "kind": "deck", "bracket": 4, "sections": [ … ] },
    "sideboard": { "label": "Sideboard", "kind": "pool", "sections": [ { "name": "Sideboard", "cards": [ { "name": "Fracture", "qty": 1, "note": "Blood Moon in the pod" } ] } ] }
  },
  "cards": {
    "Sol Ring":      { "status": "PROXY", "tags": ["ramp", "fast-mana"] },
    "Gaea's Cradle": { "status": "OWNED", "tags": ["ramp"], "note": "pulled 2026-09-01", "printing": { "set": "ltc", "collectorNumber": "264" } }
  }
}
```

- **Lists** are ordered sections of `{ name, qty, note? }` entries — the same shape as the old
  Markdown, so nothing about how a deck reads changes. The commander is whatever is in the
  `Commander` section of a list (variants may differ, e.g. `god-tribal`'s five commanders).
- **`cards`** is per-deck card metadata keyed by canonical Scryfall name: `status` (`OWNED` |
  `BUY` | `PROXY` | `CONSIDERING`, default `PROXY` per deck-brain §0.1), `tags` (string[]),
  `note`, `printing` (optional pin, replaces the per-deck `research/printings.txt`). Entries
  survive a card leaving every list, so a card that returns keeps its tags.
- **Game Changer is derived** from Scryfall's `game_changer` flag on the card, never stored. The
  old `*GC*` markers are dropped at migration.
- **Card names are canonical** (Scryfall's spelling, front face for double-faced cards). The
  migration resolves every name through Scryfall and rewrites it; the app's search-to-add always
  inserts the canonical name; `deck:edit` canonicalises before writing.
- **Formatter:** 2-space JSON with each card entry collapsed to one line, so a swap is a two-line
  git diff. Object key order is fixed by the serializer (schema, name, format, description, lists,
  cards) and `cards` is sorted by name.

### 4.2 Change set

```ts
interface ChangeSet {
  listId: string;                 // which list in the deck
  label: string;                  // becomes the snapshot label + history line
  rationale?: string;             // agent's or user's why, markdown
  author: "user" | "agent";
  entries: ChangeEntry[];
}
type ChangeEntry =
  | { op: "add";    name: string; section: string; qty?: number; replaces?: string; why?: string }
  | { op: "remove"; name: string; why?: string }
  | { op: "move";   name: string; section: string }
  | { op: "qty";    name: string; qty: number };
```

`applyChangeSet(list, changeSet)` is a pure function that returns the new list or a list of
precondition failures (`remove`/`move`/`qty` on a card that is not there; `add` of a card that is
already there unless it is a basic land or the entry sets `qty`). `replaces` is a rendering hint that
pairs an add with a remove as a swap row.

Metadata edits (status, tags, note, printing) are **not** change sets. They apply immediately, do
not snapshot, and are not in history — they are bookkeeping, not deck changes.

### 4.3 Snapshots and history

- `decks/<slug>/versions/<YYYY-MM-DD-HHMM>-<listId>-<label>.json` — `{ takenAt, listId, label,
  reason, list }`, the full list object as it was **before** an apply. Collisions get a `-2` suffix.
- `decks/<slug>/history.jsonl` — one line per applied change set: `{ id, at, listId, label, author,
  rationale?, entries, snapshot, before: Stats, after: Stats }`. Append-only.
- Legacy Markdown snapshots already in `versions/` stay. The history page lists them too (dated
  from the filename, parsed with the legacy parser), and they are restorable the same way.
- A **restore** computes `diff(targetList, currentList)` → change set labelled `restore <version>`,
  stages it, and applies through the normal path. The pre-restore state is therefore snapshotted,
  and returning to it is one more restore. No branches.

### 4.4 Card data

The root `scripts/lib/scryfall.ts` `CardSummary` is extended (additively) with `id`, `oracleId`,
`images: { small, normal, artCrop }`, and `faces[]` (name, manaCost, typeLine, oracleText, images)
for double-faced cards. `scripts/lib/card-cache.ts` (`data/card-cache.json`, 24 h TTL, batch
`/cards/collection`) is the single cache for the CLI **and** the app; it is extended with a
`resolveNames(names)` that normalises (NFC, straight apostrophes, collapsed whitespace, case-
insensitive, front-face aliasing) before matching, falls back to `/cards/named?fuzzy` for single
misses, and returns `{ found: Record<requestedName, CardSummary>, unresolved: string[] }`. It never
writes a negative entry.

`data/card-cache.json` lives at the repo root (git-ignored) and is shared by `bun run card`, the
agent's tool calls and the app's server — one source, no drift.

## 5. Stats engine

`scripts/lib/deck-stats.ts` — pure, runs on both sides. `computeStats(list, cardsByName)` returns:

| Group | Fields |
|---|---|
| Size | total, target (100 for `deck` lists), lands, nonland, commander count |
| Curve | avg MV (nonland), avg MV (nonland, excluding MV 0), histogram MV 0–7+ split creature / noncreature |
| Types | creature, instant, sorcery, artifact, enchantment, planeswalker, battle, land |
| Colour | pips per colour across nonland mana costs; sources per colour (lands + any permanent with `producedMana`); pip share vs source share |
| Roles | count per section; count per tag |
| Flags | Game Changers (names + count), colour-identity violations, non-commander-legal cards, unresolved names, non-basic duplicates |
| Money | USD total, per status (owned / buy / proxy) totals and counts |

`diffStats(before, after)` returns the same shape with signed deltas plus the changed role/tag
rows only. The stats rail shows the current stats; a staged change set shows `before → after (Δ)`.

**Tag vocabulary.** Free-form, with a suggested set offered as chips: `ramp`, `fast-mana`, `draw`,
`removal`, `wipe`, `interaction`, `protection`, `tutor`, `recursion`, `drain`, `lifegain`,
`sac-outlet`, `token`, `aristocrat`, `anthem`, `evasion`, `engine`, `combo-piece`, `wincon`,
`finisher`, `utility-land`, `stax`, `synergy`. The agent is told to tag cards it adds and to run a
one-time tagging pass when a deck's tags are mostly empty (through `set_card_meta`, §7.2).

## 6. App structure

Feature-folder layout inside `apps/collection-visualizer/src/builder/` (the rest of the app keeps
its existing layer layout; the `lib/server` rule — no `node:fs` reachable from a component — still
holds, enforced by keeping every server-only module under `builder/server/`):

```
src/builder/
  model/        deck.ts (types + zod schema), change-set.ts (apply/diff, pure), stats.ts (re-export of root), format.ts
  server/       deck-store.ts (thin wrappers over root scripts/lib/deck-store), watcher.ts, cards.ts (root card-cache), search.ts,
                agent/ (session.ts, manager.ts, tools.ts, gate.ts, system-prompt.ts, transcripts.ts)
  api/          server functions (createServerFn): decks, lists, change sets, meta, history, search, chat
  state/        jotai atoms (staged change set, preview mode, selection, per-deck model/effort), query keys
  chat/         events.ts (SSE vocabulary + reducer), use-deck-chat.ts, components (ChatPane, Composer, blocks/*)
  board/        DeckBoard (sections × card tiles), CardTile, CardPopover, SearchAdd, views (Board | Table | Curve)
  rail/         StatsRail (counts, curve chart, pips vs sources, roles/tags, flags, money)
  changes/      StagedPanel (diff, deltas, preview toggle, apply/discard), ChangeSetCard (chat block), SwapRow
  history/      HistoryTimeline, VersionView
  routes glue:  src/routes/index.tsx (decks), decks.$slug.tsx, decks_.$slug.history.tsx, api.decks.$slug.stream.ts
```

Root-library imports use a `@mtg/*` alias → `../../scripts/lib/*` (tsconfig `paths` + Vite
`server.fs.allow` for the repo root). `scripts/lib/paths.ts` switches from `import.meta.dir` to a
`fileURLToPath(new URL(...))` form so it resolves under Vite as well as Bun.

Routes: `/` is the decks index; the collection grid moves to `/collection`; `/collections` is
unchanged. Sidebar: Decks, Collection, Collections. App title: "MTG Workbench".

## 7. The agent

### 7.1 Session

One live `query()` per deck (streaming input), `cwd` = repo root, `resume` from a stored session
id, `includePartialMessages` for token streaming, `settingSources: ["project"]` so `.claude/skills`,
`.claude/agents` and `CLAUDE.md` load, `mcpServers: { "deck-ui": … }`, `model` / `effort` from the
per-deck UI setting (omitted when unset), `env.MTG_AGENT_EMBEDDED=1`. The repo's `SessionEnd` hook
in `.claude/settings.json` (which kills Vite servers) is guarded to exit early when that variable
is set — otherwise the embedded session's end would kill the app it runs in.

The system prompt is the `claude_code` preset plus an append block: which deck and list is open,
the tool protocol (§7.2), the chat conventions (write card names as `[[Card Name]]`; the app renders
them), a reminder that deck-brain must be invoked before deck decisions (the skill is loaded, but
CLAUDE.md's instruction is the terminal's — this restates it for the app), and that direct edits to
`deck.json` are refused so it must propose instead.

Controls exposed in the chat header: model picker (Fable 5.1, Opus 5.5, Sonnet 5, Haiku 4.5,
default), effort picker (low → max, default), **Stop** (`query.interrupt()`), **New conversation**
(archives the transcript, forgets the session id, next message starts fresh). Model changes apply
live through `setModel`; effort changes apply on the next session start.

### 7.2 UI tools (in-process MCP server `deck-ui`)

| Tool | Blocks? | Renders | Returns to the agent |
|---|---|---|---|
| `show_cards({ title?, cards: [{ name, note? }] })` | no | gallery block in chat | ok |
| `propose_changes(ChangeSet minus author)` | **yes** | change-set card in chat **and** loads the staged panel | `{ status: "applied", entries, historyId }` / `{ status: "dismissed", reason }` |
| `pick_cards({ title, prompt?, cards: [{ name, blurb? }], mode: "one" \| "many" \| "label", labels? })` | **yes** | card picker block (per-card buttons for `label`, checkboxes for `many`) | `{ picks: Record<name, label \| boolean> }` |
| `set_card_meta({ cards: [{ name, tags?, status?, note? }] })` | no | activity line | ok |
| `AskUserQuestion` (built-in) | **yes** | question card with options + free text | answers via `updatedInput` |

Blocking tools await a promise the session resolves when the user acts. If the user types a chat
message while a blocking tool is pending, the tool resolves as dismissed with
`reason: "user replied instead: …"` and the message is delivered next — the agent always knows
what happened. A restarted session cancels pending tools with a notice.

`propose_changes` with an already staged user edit **appends** its entries to the staged set,
attributed to the agent; Apply applies the union, and the tool result lists exactly what was
applied. Amending (removing an entry, changing a section) happens in the staged panel before
Apply.

### 7.3 Gate

Single policy function, tested in isolation:

- **Allow:** `Read`, `Glob`, `Grep`, `TodoWrite`, `Skill`, `Task` (subagents, e.g.
  `mtg-rules-expert`), `WebFetch`, `WebSearch`, every `mcp__deck-ui__*`, and `Bash` when the
  command is a single command (no chaining) matching: `bun run card …`, `bun run scripts/card.ts …`,
  `bun run edhrec …`, `bun run carddata …`, `bun run deckcheck …`, `bun run deck:show …`.
- **Allow with an activity line:** `Write`/`Edit` under `decks/<this slug>/research/` and
  `Edit` of `.claude/skills/deck-brain/LEDGER.md` (append-only learning is part of the brain's
  contract).
- **Ask (approval card):** other `Write`/`Edit` under `decks/<this slug>/` (e.g. `pdf.json`).
- **Deny with reason:** `Write`/`Edit` of any `deck.json` or `history.jsonl` ("propose it with
  `propose_changes`"), anything under `versions/`, any other path, any other Bash.

### 7.4 Chat rendering

Assistant text is Markdown. `[[Card Name]]` and Scryfall exact-name links (the CLAUDE.md pattern)
both render as a **card chip**: name + mana cost, hover shows the card image, click highlights the
card on the board (or opens its popover if it is not in the deck). Tool calls render as blocks
(§7.2); other tool activity (`bun run card …`, reads) collapses into a single "n tool calls" line
that expands on click. Approval cards, notices and rate-limit errors render inline as before.

## 8. Views and interaction

### 8.1 Decks index (`/`)
Grid of deck cards: commander art crop, name, colour identity pips, bracket, list count, size, last
applied change (label + relative time). "New deck" creates `deck.json` from a template with an
empty main list and opens it; the agent onboarding message is sent as the first chat turn.

### 8.2 Workbench (`/decks/$slug`)
Three resizable panes.

- **Stats rail (left):** list tabs at the top (main, variants, pools; `+` to add a pool); size vs
  target; curve chart; pips vs sources bars; type counts; roles (sections) and tags with counts;
  flags (GC list, identity violations, illegal, unresolved, duplicates); money by status. When a
  change set is staged every number shows `before → after` with a coloured delta.
- **Board (centre):** view switcher **Board** (sections as columns of stacked card images, the
  default), **Table** (sortable rows: name, MV, type, tags, status, price) and **Curve** (cards
  bucketed by MV). A search bar at the top runs Scryfall search (server-side, root `searchCards`)
  and lists results as tiles with an "Add to ‹section›" control. Clicking a card opens a popover:
  full image, oracle text, tags editor with chips, status, note, "move to section", "remove".
  Drag between section columns moves. Add / move / remove / qty all go to the **staged set** — never
  straight to disk.
- **Staged panel (bottom of the board, slides up when non-empty):** the diff — removed cards on the
  left in red, added on the right in green, swaps paired on one row when `replaces` is set — plus
  the delta table and a **Preview** toggle: `Current` renders the board as on disk; `After` renders
  the staged list with added cards ringed green and removed cards dimmed and ringed red, still in
  their old spot. Label field, Apply, Discard, and per-entry remove.
- **Chat (right):** §7.

Card identity on the board comes from the shared cache. An unresolved name renders a grey tile
with the raw name and a **Find** action (search → pick → the entry is renamed in place through a
metadata call). Nothing is ever hidden.

### 8.3 History (`/decks/$slug/history`)
Vertical timeline (newest first): label, author, time, `+n / −n`, headline deltas. Selecting an
entry shows that version on the board, read-only, with a **Diff vs current** toggle and a **Restore**
button that stages the computed change set and returns to the workbench.

### 8.4 Sync
The server watches `decks/` (debounced, ignoring its own just-written content by hash) and pushes
`deck-changed` over the deck's SSE stream; the client invalidates the deck query. Applying a staged
set re-validates against the on-disk list first and returns the conflicting entries on failure —
the staged set is kept so the user can fix it.

## 9. CLI and repo rework

- `bun run deck:migrate [--dry-run] [slug]` — one-time: for every deck, parse every `DECK*.md`
  (legacy parser), `STATUS.md`, `SIDEBOARD.md` and `research/printings.txt`; resolve every name
  through Scryfall (fuzzy for misses, reporting each rewrite); build `deck.json`; write one
  `versions/…-migrated-from-markdown.json` per list; move the Markdown files verbatim to `research/legacy/`; regenerate
  `MOXFIELD*.txt`. Prints a report per deck. Runs on the whole repo as part of this work.
- `bun run deck:show <slug> [--list id]` — Markdown view of a list for terminal reading.
- `bun run deck:edit <slug> --list main --label "…" --add "Card@Section" --remove "Card" --move "Card@Section" [--json changes.json]` — the terminal's door into the apply path.
- `bun run deck:meta <slug> --card "Name" --tag drain --status OWNED` — metadata edits.
- Reworked to read `deck.json`: `card.ts --deck <slug|path> [--list id]`, `edhrec.ts --deck`,
  `deck-moxfield.ts`, `deck-pdf.ts`, `carddata.ts`, `deckcheck.ts`, `set-scan.ts`,
  `lib/deck-research.ts`, and their tests. `lib/decklist.ts` remains for pasted lists and legacy
  snapshots.
- Docs and skills updated to the new files and commands: `decks/README.md`, `CLAUDE.md`,
  `README.md`, `.claude/skills/deck-brain/SKILL.md` (§1.5 and every `DECK.md`/`STATUS.md`
  mention), `.claude/skills/deck-finalizer/SKILL.md` (final assembly via `deck:edit`; the browser
  path uses `pick_cards` + `propose_changes`; the live-companion section is removed), `_TEMPLATE/`.
  The ledger is history and is not rewritten.
- Two decisions made in implementation: `SIDEBOARD.md` moves to `research/sideboard.md` as prose
  (the migration creates no automatic pool list from it), and canonical names are the front face
  of a double-faced card, as §4.1 specifies.

## 10. Error handling

- **Scryfall unreachable:** the board renders names without images and a banner says so; lookups
  retry with backoff; nothing is persisted as missing.
- **Apply conflict** (list changed on disk since staging): 409 with the failing entries; staged set
  kept; toast + inline marks.
- **Agent process dies mid-turn:** session restarts with `resume`; pending blocking tools are
  cancelled with a notice; the user re-sends.
- **Usage / rate limit:** notice in chat with the SDK's message and a retry hint; never a silent
  hang.
- **Malformed tool input:** zod validation error returned to the agent as the tool result so it
  can correct itself.
- **Corrupt `deck.json`:** the deck shows in the index with an error badge and the raw parse error;
  nothing is written until it is fixed.
- **Watcher storms:** 250 ms debounce; events for a file whose content hash matches our last write
  are dropped.

## 11. Testing

- **Pure (bun test, app and root):** deck.json schema + formatter round-trip; `applyChangeSet` and
  `diffLists` including every precondition failure; `computeStats` / `diffStats` on a fixture deck
  with known numbers; name normalisation; legacy parser against **every real `DECK*.md` in the
  repo** (card multiset identical after parse → migrate → parse); migration on a fixture folder;
  chat reducer; gate policy table; tool input schemas.
- **Integration:** `deck-store` against a temp folder (snapshot written, history appended, Moxfield
  regenerated, conflict rejected); `deck:edit` end to end; `card --deck chatterfang` smoke.
- **Agent smoke (headless, no dev server):** instantiate the session, send "reply PONG"; then ask
  it to call `show_cards` for Sol Ring and assert the event; then a `propose_changes` round-trip
  with a scripted Apply.
- **Browser:** a build + preview on port 3200 driven by Playwright for screenshots of the index,
  the workbench with a staged swap, and history — started and stopped inside the same verification
  step. The user's rule is that they own the long-running dev server; this is a bounded check, not
  a server left running.

## 12. Decisions to review (made under delegation)

1. **`deck.json` replaces `DECK*.md` + `STATUS.md` + `SIDEBOARD.md`**, migrated once across every
   deck; the Markdown sources move verbatim to `research/legacy/` (never deleted — most were untracked, so git history could not have held them). Printing pins move into `deck.json`;
   `decks/_printings.txt` stays as the global reserve.
2. **Game Changer status is derived** from Scryfall, not stored.
3. **Metadata edits (status, tags, notes) are immediate and unversioned**; only list changes make
   history.
4. **The finalizer's live companion is retired.** Its piles become pool lists written through
   `deck:edit`, which the app shows live.
5. **The agent may append to the ledger and write under `research/` without an approval click.**
6. **The old workbench UI, its data files and `scripts/deck-live.ts` are deleted**, not kept behind a
   flag.
7. **Collection grid moves from `/` to `/collection`**; decks take the home route.
8. **A bounded preview server is started and stopped by the build for screenshot verification.**
