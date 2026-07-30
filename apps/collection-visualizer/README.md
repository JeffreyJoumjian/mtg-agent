# MTG Collection Visualizer

Read-only web viewer for a ManaBox CSV export. Prices from Scryfall (TCGplayer USD +
Cardmarket EUR). Search, filter, sort, daily/manual refresh, CSV upload.

## Develop
```bash
bun install
cp ~/Desktop/ManaBox_Collection.csv data/collection.csv   # seed initial data
bun run dev            # http://localhost:3000
bun test               # unit tests
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

## Layout
Components are grouped by what they draw, `lib/` by what it does:

```
src/
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
  server/         TanStack server functions
```

`symbols/` sits outside `card/` because the filters popover and list rows use it too. The
`lib/data` vs `lib/server` split is load-bearing rather than cosmetic — see
`src/lib/server/README.md`.

## Data
- `data/collection.csv` — ManaBox export; source of truth for what you own.
- `data/prices.json` — Scryfall price cache (24h TTL, `previous` snapshot for ± since refresh).
- `data/deck-sessions.json` / `data/deck-transcripts/` — deck-agent session ids + chat history
  (JSONL per deck) so conversations survive dev-server restarts.

## Deck workbench

The **Decks** view chats with a per-deck headless Claude session (the
`@anthropic-ai/claude-agent-sdk` — Claude Code as a library, running on your Claude *login*, no
API key) and runs the deck-finalizer exercise with card images, click-based Keep/Cut/Pocket
calls, a live guardrail tally, and browser-approved file writes.

- Needs the full repo checkout: the agent's cwd is the repo root, where it reads `decks/`,
  `.claude/skills/deck-finalizer/`, and runs `bun run card`. Docker/NAS deploys don't get this
  view's backend unless the repo (and a Claude login) is present in the container.
- The agent may only write under `decks/`, and every write requires a click-to-approve in the
  chat (`src/lib/deck/gate.ts` is the whole policy; `src/server/deck-agent/` is the session
  manager). Text streams over SSE from `/api/decks/$slug/stream`.
- Each browser exchange spends turns from your Claude subscription's rate limits — batches are
  designed so one agent turn covers a whole batch of verdicts.
