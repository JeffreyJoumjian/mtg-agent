# Deck Workbench — browser UI for the deck-finalizer (and general deckbuilding)

**Date:** 2026-07-30
**Status:** Approved (design walked through in-session; user delegated spec → plan → implementation)

## Goal

Move the deck-finalizer exercise — and general deckbuilding chat — into the browser, as a new
**Decks** view in `apps/collection-visualizer`, while staying entirely on the user's Claude
subscription (no API key, no usage-based billing). Everything doable in the terminal should be
doable in the browser: list decks, create a deck (scaffolding handled automatically), chat with a
deck agent that reads/writes the repo, and run the card-by-card finalizer exercise with real card
images, click-based Keep/Cut/Pocket calls, and a live guardrail tally.

**Division of roles:** terminal = building the app, browser = using it. The browser agent is a
separate headless Claude session per deck, not the interactive terminal session.

## Key decisions (with rationale)

1. **Backend: `@anthropic-ai/claude-agent-sdk` directly** (Claude Code as a library), spawned by
   the Vite dev server. First-party; inherits Claude Code's credential resolution (the user's
   `/login` subscription — no `ANTHROPIC_API_KEY` is set or needed), session persistence/resume,
   and automatic compaction. The Vercel AI SDK was considered and rejected as a dependency (the
   community `ai-sdk-provider-claude-code` pins an older Agent SDK and limits tool-event
   rendering) but its stream-protocol shapes are the *reference* for our own SSE format and chat
   hook.
2. **Structured UI is driven by custom in-process tools**, not text parsing. The agent calls
   `present_batch` / `update_tally` / `propose_final_list`; the UI renders those tool calls as
   card grids, a guardrail rail, and a sign-off screen. Freeform chat remains the default for
   everything else.
3. **Turn economy: per-batch.** One agent turn produces a whole batch with verdict material;
   clicking through cards costs zero turns; a batch submit or push-back costs one turn. The cost
   unit is subscription rate-limit headroom, not dollars. (~25 turns per 100-card pool.)
4. **Writes are structurally gated.** The `canUseTool` callback auto-allows reads and an
   allowlist of read-only Bash commands; any `Write`/`Edit` under `decks/` pauses the agent until
   the user approves it in the browser. This enforces the skill's "never commit changes
   mid-exercise" rule by mechanism, not prompt. Signing off on `propose_final_list` doubles as
   the approval for the final `DECK.md`/`STATUS.md` write.
5. **One brain, two doors.** `.claude/skills/deck-finalizer/SKILL.md` stays the single source of
   truth for the exercise. Its stale paths are repointed to the current per-deck layout as part
   of this work; the browser agent's system prompt embeds the same file at session start.
6. **Layout:** deck panel LEFT, chat RIGHT (user preference).
7. **Model:** the deck agent inherits the default model; no per-deck model knob in v1 (YAGNI).

## Architecture

```
BROWSER (Decks view)                DEV SERVER (vite :3000, user-run)        DISK (repo root)
┌──────────────────────┐           ┌─────────────────────────────┐      ┌──────────────────┐
│ deck list / create   │──POST────▶│ /api/decks  (list, create)  │─────▶│ decks/<slug>/    │
│                      │           │                             │      │   DECK.md        │
│ deck page            │──POST────▶│ /api/decks/:slug/messages   │      │   STATUS.md      │
│  deck panel │ chat   │           │   │ push into session       │      │   research/      │
│  (left)     │ (right)│◀───SSE────│ /api/decks/:slug/stream     │      ├──────────────────┤
│                      │           │   ▲                         │      │ .claude/skills/  │
└──────────────────────┘           │ deck-agent session manager  │      │   deck-finalizer │
                                   │  └─ agent-sdk query() per   │      ├──────────────────┤
                                   │     deck, cwd = repo root,  │      │ apps/…/data/     │
                                   │     resumable               │      │  deck-sessions   │
                                   └─────────────────────────────┘      └──────────────────┘
```

## Backend (`apps/collection-visualizer/src/server/deck-agent/`)

- **Session manager** — one live `query()` per deck in streaming-input mode (an async generator
  user messages are pushed into, so the session survives across turns). `cwd` = repo root so the
  agent sees `decks/`, `scripts/`, and can run `bun run card`. Session IDs persist to the app's
  `data/deck-sessions.json` (git-ignored); a dev-server restart resumes via `resume: sessionId`.
  Compaction is inherited from the harness, so multi-day sessions are fine.
- **SSE route** (`/api/decks/:slug/stream`) — relays SDK messages to the browser: text deltas
  (`includePartialMessages` for token streaming), tool-use events, permission requests, turn
  results, and error notices. On (re)connect it replays prior transcript events so a refreshed
  tab keeps its history.
- **Message route** (`/api/decks/:slug/messages`) — accepts user text or structured payloads
  (batch calls, approval decisions) and pushes them into the session generator.
- **Custom in-process tools** (via `createSdkMcpServer` + `tool()`):
  - `present_batch(cards[])` — card name/cost/type/one-liner + optional set/scryfall id; UI
    renders the batch grid.
  - `update_tally(keeps, cuts, pockets, target, gameChangers, gcCeiling, manaSources,
    categories)` — UI updates the pinned guardrail rail.
  - `propose_final_list(list, summary)` — UI shows the full-screen review; explicit sign-off.
- **Permission gate** (`canUseTool`) — allow: `Read`/`Glob`/`Grep` in-repo; `Bash` matching an
  allowlist (`bun run card*`, the skill's `carddata.py` / `deckcheck.py`). Ask (browser approval
  card with the proposed content/diff): `Write`/`Edit` under `decks/`. Deny with an explanatory
  message: everything else.
- **System prompt** — Claude Code preset + appended block: the repointed SKILL.md, the
  `decks/README.md` conventions, the deck's slug/paths, and instructions for when to call each
  UI tool. No `settingSources` (the root CLAUDE.md is terminal-session guidance that doesn't
  apply).

## Frontend

- **Decks view** (new sidebar entry) — summary cards from `decks/*/` (skip `_TEMPLATE`): name,
  colors, count vs 100, owned/buy/proxy tallies. New-deck form (name + optional
  commander/theme): the server copies `_TEMPLATE` deterministically (kebab-case slug per
  `decks/README.md`), then the deck's chat session opens and the *agent* onboards — asks about
  commander/gameplan, fills `research/strategy.md`, seeds `DECK.md`/`STATUS.md`.
- **Deck page** — deck panel left: `DECK.md` rendered as a grouped card list with images and
  `STATUS.md` badges (OWNED / BUY / PROXY 💰), plus the guardrail rail when the finalizer is
  active. Chat right: `useDeckChat` hook (SSE reader + message-state reducer, modeled on the AI
  SDK stream protocol); markdown for agent text; tool calls render as inline structured blocks in
  the same scrollable transcript.
- **Structured blocks** — `present_batch` → card grid reusing existing `CardTile`/hover-preview/
  mana components, Keep/Cut/Pocket per card in local state, one **Submit batch** button that
  sends all calls as a single message (one turn). `update_tally` → pinned rail. `propose_final_list`
  → review screen; **Sign off** also approves the gated write. Permission requests → inline
  approval card (path + content preview, Allow / Deny).
- **Freeform is the default** — anything else (research, `bun run card --deck` pricing, swap
  ideas) is plain chat; structured UI appears only on tool calls.

## Skill repointing (shared brain)

Update `.claude/skills/deck-finalizer/SKILL.md`:
- `decks/DECISIONS.txt` → `decks/<slug>/research/decisions.md`
- newest `decks/*UPGRADED*<date>.txt` → `decks/<slug>/DECK.md` + `STATUS.md` (authoritative pair)
- `decks/cards.txt` → `decks/<slug>/research/cards.txt`
- root `premium_edgar_decks.json` / `new_edgar_decks_clean.json` → per-deck optional field-signal
  sample under `decks/<slug>/research/`; the rubric treats field signal as optional when absent.
- Final assembly writes `DECK.md`/`STATUS.md` (+ dated snapshot in `versions/`) instead of a new
  dated root file.

## Error handling

- Dev-server restart → resume from `data/deck-sessions.json`.
- SSE drop / tab refresh → reconnect replays transcript; no lost history.
- Subscription rate/usage-limit errors → system notice in chat with retry; never a silent hang.
- Agent process dies mid-turn → session manager restarts with `resume`; turn re-runs.
- Malformed tool input → tool returns a validation error the agent can read and correct.

## Testing

`bun test` for the pure parts: DECK.md/STATUS.md → summary parsing, SSE-event → chat-state
reducer, slug/template-copy logic, UI-tool input schemas. The live agent loop is verified by a
manual end-to-end smoke session against a throwaway deck (the user runs the dev server).

## Out of scope (v1)

- Building a card pool from the collection grid (shop-your-binder mode).
- Per-deck model/effort knobs.
- Multi-user or remote access; this is a localhost tool.
- Collection cross-reference badges inside the finalizer batch UI (deck panel badges come from
  STATUS.md only).
