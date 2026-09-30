# MTG Workbench

The browser side of this repo. Two things live here:

- **Deck builder** (the home route) — a visual Commander deck-building workbench over the repo's
  `decks/<slug>/deck.json` files, with a per-deck Claude Code chat in the loop.
- **Collection viewer** — the read-only viewer for a ManaBox CSV export. Prices from Scryfall
  (TCGplayer USD + Cardmarket EUR). Search, filter, sort, daily/manual refresh, CSV upload.

## Develop

```bash
bun install
cp ~/Desktop/ManaBox_Collection.csv data/collection.csv   # seed initial data
bun run dev            # http://localhost:3200
bun test               # unit tests
bun run agent:smoke    # headless smoke test of the deck agent — costs three subscription turns
bun run format         # Prettier: double quotes, semicolons, 120 cols (.prettierrc)
bun run format:check   # verify without writing
```

## Deploy on a NAS (Docker)

```bash
docker compose up -d --build
# open http://<nas-ip>:8080
```

`./data` holds `collection.csv` and `prices.json`. Drop in a new CSV there (or use the
in-app Upload button) — no rebuild required.

The container's production server is `vite preview` (TanStack Start's build here targets
Vite/`dist/`, not a standalone Nitro bundle), which serves the built client assets and
routes everything else to the SSR handler. See `Dockerfile` for details.

The deck builder needs the full repo checkout and a Claude login next to it — the agent's cwd is
the repo root, where it reads `decks/` and `.claude/`. A Docker/NAS deploy without those gets the
collection viewer only.

## Routes

| Route                   | What it is                                                           |
| ----------------------- | -------------------------------------------------------------------- |
| `/`                     | Decks index — one card per deck in `decks/`.                         |
| `/decks/<slug>`         | The workbench: stats rail left, board centre, chat right, resizable. |
| `/decks/<slug>/history` | The version timeline: "as it was", "diff vs current", Restore.       |
| `/collection`           | The owned-card library (was `/`).                                    |
| `/collections`          | Unchanged.                                                           |

## Deck builder

**One store, one apply path.** Each deck is `decks/<slug>/deck.json` (see `decks/README.md`). The
app reads and writes it through the repo-root library — `scripts/lib/deck-store.ts` and friends —
so the browser and the terminal CLI (`bun run deck:show` / `deck:edit` / `deck:meta`) are two doors
into the same file, and a change made in either shows up in the other.

**Every list edit is staged before it is applied.** The user's clicks (add from the Scryfall
search bar, remove / move / change qty from a card's popover, drag between section columns) and
the agent's proposals all become one **staged change set**: a diff with stat deltas and a
Current/After preview toggle on the board. **Apply** writes through the same apply path as
`deck:edit` — snapshot to `versions/`, a line in `history.jsonl`, `MOXFIELD*.txt` regenerated.
**Discard** forgets it. Tags, status and notes edit immediately from the card popover; they are
bookkeeping, not deck changes, and make no history.

The board has three views — **Board** (sections as columns of card images, the default),
**Table** (sortable rows) and **Curve** (bucketed by MV) — and the stats rail shows size, curve,
pips vs sources, roles/tags, flags (Game Changers, identity violations, illegal, unresolved) and
money by status, with `before → after` deltas while something is staged.

### The agent

The chat runs a per-deck Claude Code session on your Claude **login** (`@anthropic-ai/claude-agent-sdk`
— no API key). Its cwd is the repo root and it loads the project's `.claude/` — deck-brain, the
finalizer, `CLAUDE.md`, the `mtg-rules-expert` agent — so it reasons exactly like a terminal session.
It is launched with `MTG_AGENT_EMBEDDED=1`; the repo's `.claude/settings.json` `SessionEnd` hook
exits early when that is set, so the embedded session ending never kills this app's Vite server.

Card names in chat are written `[[Card Name]]` and render as chips with hover images.

UI tools (an in-process MCP server, `deck-ui`):

| Tool                            | Blocks? | What it does                                                                                                         |
| ------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `mcp__deck-ui__show_cards`      | no      | A card gallery in the chat.                                                                                          |
| `mcp__deck-ui__propose_changes` | **yes** | Renders as the staged diff; waits until the user applies or dismisses, and the result tells the agent what happened. |
| `mcp__deck-ui__pick_cards`      | **yes** | Choose one / many / a label per card (e.g. Keep / Cut / Pocket).                                                     |
| `mcp__deck-ui__set_card_meta`   | no      | Tags / status / notes.                                                                                               |
| `AskUserQuestion` (built-in)    | **yes** | Renders as an option card.                                                                                           |

**The gate** (`src/builder/server/agent/gate.ts`, the whole policy, tested in isolation): the agent
may read anything, use skills, subagents and the web, and run only
`bun run card | edhrec | carddata | deckcheck | deck:show | lookup | ledger:index`. It writes freely
under `decks/<slug>/research/` and may edit the deck-brain ledger's topic files (never its generated
`INDEX.md`/`CARDS.md` or its `archive/`); any other write under its
deck needs a click; and it can **never** write `deck.json`, `history.jsonl` or anything in
`versions/` — it must propose.

Sessions and transcripts persist under `data/agent/` so conversations survive dev-server restarts.
Each exchange spends turns from your subscription's rate limits; `bun run agent:smoke` is the
headless check (a plain reply, a `show_cards` call, a `propose_changes` round trip — three turns).

## Layout

Components are grouped by what they draw, `lib/` by what it does; the deck builder is a feature
folder of its own:

```
src/
  builder/        the deck builder (feature folder)
    model/        deck types + change-set / stats re-exports of the root library
    server/       deck store wrappers, watcher, card lookups, agent/ (session, gate, tools)
    api/          server functions: decks, lists, change sets, meta, history, search, chat
    state/        jotai atoms (staged set, preview, selection, per-deck model/effort)
    chat/         SSE events + reducer, use-deck-chat, ChatPane and its blocks/
    board/        DeckBoard, CardTile, CardPopover, SearchAdd, Board | Table | Curve views
    rail/         StatsRail
    changes/      StagedPanel, ChangeSetCard, SwapRow
    history/      HistoryTimeline, VersionView
    index/        the decks index
  components/
    card/         one card — tile, stack, footer, details, drawer, lightbox, foil, flip
    symbols/      MTG iconography — mana, set symbols, rarity/finish/face badges
    collection/   many cards — grid, list, summary bar
    toolbar/      search, filters, settings
    ui/           shadcn primitives
  lib/
    card/         card domain — faces, mana, rarity, pricing, stacks
    view/         the query -> filter -> sort pipeline (view.ts composes it)
    state/        jotai atoms, persisted settings, pins
    data/         Scryfall + CSV ingest (pure — runs on either side)
    server/       disk caches, node:fs — NEVER import from a component (see its README)
  server/         TanStack server functions (collection)
  routes/         index, collection, collections, decks.$slug, decks_.$slug.history, api.decks.$slug.stream
```

`symbols/` sits outside `card/` because the filters popover and list rows use it too. The
`lib/data` vs `lib/server` split is load-bearing rather than cosmetic — see
`src/lib/server/README.md`.

**`@mtg/*` alias.** The app imports the repo-root library `scripts/lib/*` as `@mtg/*` (tsconfig
`paths`): `deck-model`, `change-set`, `deck-stats`, `deck-store`, `card-cache`, … The same
`lib/server` rule applies to it: anything that touches `node:fs` (`deck-store`, `card-cache`) is
server-only and must never be imported by a component — keep those imports under `builder/server/`
and `builder/api/`.

## Data

- `data/collection.csv` — ManaBox export; source of truth for what you own.
- `data/prices.json` — Scryfall price cache (24h TTL, `previous` snapshot for ± since refresh).
- `data/agent/` — deck-agent session ids (`sessions.json`) and chat transcripts
  (`transcripts/<slug>.<timestamp>.jsonl`).
- The card cache is **only** the repo-root `data/card-cache.json`, shared with `bun run card` and
  the CLI; the app keeps no card cache of its own.
