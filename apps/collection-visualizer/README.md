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

## Data
- `data/collection.csv` — ManaBox export; source of truth for what you own.
- `data/prices.json` — Scryfall price cache (24h TTL, `previous` snapshot for ± since refresh).
