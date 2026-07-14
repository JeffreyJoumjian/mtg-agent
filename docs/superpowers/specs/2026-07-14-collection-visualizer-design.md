# MTG Collection Visualizer — Design (Phase 1)

**Date:** 2026-07-14
**Status:** Approved for planning
**Location:** `apps/collection-visualizer/` inside the `mtg-agent` repo (self-contained, separable later)

## 1. Overview

A read-only web app to browse an MTG card collection exported from ManaBox. It renders every
owned card as a tile (image, name, price, price movement), and supports search, structured
filters, sorting, and daily/manual price refresh. Prices and card data come from **Scryfall**,
which already bundles the two marketplaces the user cares about:

- `usd` / `usd_foil` → **TCGplayer**
- `eur` / `eur_foil` → **Cardmarket**

No scraping, no API keys. The ManaBox CSV already carries a **Scryfall ID** per row, so we look
up exact printings via one batch endpoint.

### Goals

- Display the whole collection with a virtualized grid (smooth scroll over ~1k+ cards).
- Each tile: card image, truncated name, current price, and a ± movement badge.
- Currency toggle **USD ↔ EUR**; ± baseline toggle **since-last-refresh ↔ vs-purchase**.
- Search with a Scryfall-style query subset; structured filters for set, price, colors, mana value.
- Sort by name, set, rarity, collector number, mana value, price.
- Daily automatic refresh (24h TTL) plus a manual refresh button.
- Upload a new ManaBox CSV from the UI.
- Deploy as a single Docker container on a NAS, reachable on the LAN. `/data` is a mounted
  volume so the CSV and price cache can be edited without a rebuild.

### Non-goals (Phase 1)

- No collection editing/management (add/remove/set quantities in-app). CSV is source of truth.
- No user accounts, multi-user, or auth (LAN-only, single collection).
- No deck cross-referencing — that is **Phase 2**, which builds on the ownership index below.
- No condition/language-level price splitting (Scryfall doesn't price by condition).

## 2. Architecture

**Stack:** TanStack Start (React + Vite) · TypeScript · Tailwind · Bun runtime · `@tanstack/react-virtual`.

Because the collection is ~1k cards, the entire dataset fits in memory and ships to the client
once. The split is deliberately thin:

- **Server** (TanStack Start server functions): parse the CSV, enrich + cache Scryfall data,
  and return one merged, grouped array. Also handles forced refresh and CSV upload.
- **Client**: holds that array and does *all* search / filter / sort / virtualization locally —
  instant, no per-keystroke round-trips.

> **Rejected alternative:** server-side filtering/pagination. Unnecessary at this scale and it
> would make search feel laggy. If the collection ever reaches ~10k+, we can add incremental
> fetching without changing the data model.

**Runtime choice:** Bun everywhere (matches the existing repo toolchain, one runtime for dev,
test, build, and the Docker image). TanStack Start's server output runs under Bun.

## 3. Data model & storage

Two files live in the `/data` volume (git-ignored, editable without redeploy):

- **`collection.csv`** — the raw ManaBox export. Overwritten by the upload button. Source of
  truth for *what is owned*.
- **`prices.json`** — Scryfall cache keyed by **Scryfall ID**.

### 3.1 Types (`src/lib/types.ts`)

```ts
type Finish = "normal" | "foil" | "etched";
type Currency = "usd" | "eur";
type Baseline = "sinceRefresh" | "vsPurchase";
type ColorSymbol = "W" | "U" | "B" | "R" | "G";

/** One parsed ManaBox CSV line. */
interface CollectionRow {
  scryfallId: string;
  name: string;
  setCode: string;        // ManaBox "Set code"
  setName: string;
  collectorNumber: string;
  rarity: string;         // common | uncommon | rare | mythic
  finish: Finish;         // ManaBox "Foil": normal | foil | etched
  quantity: number;
  purchasePrice: number | null;
  purchaseCurrency: string; // e.g. "USD"
  condition: string;
  language: string;
  binderName: string;
}

interface PriceSet {
  usd: number | null;
  usdFoil: number | null;
  eur: number | null;
  eurFoil: number | null;
}

/** Scryfall fields we cache for display, sorting, and search. */
interface Enriched {
  cmc: number;
  colors: ColorSymbol[];
  colorIdentity: ColorSymbol[];
  typeLine: string;
  oracleText: string;
  manaCost: string;
  imageSmall: string | null;
  imageNormal: string | null;
}

interface CacheEntry {
  current: PriceSet;
  previous: PriceSet | null; // prior snapshot → powers "± since refresh"
  enriched: Enriched;
  fetchedAt: number;         // epoch ms
}

type PriceCache = Record<string /* scryfallId */, CacheEntry>;

/** A grouped, enriched tile — the unit the client renders. */
interface CardTile {
  key: string;               // `${scryfallId}:${finish}`
  scryfallId: string;
  name: string;
  setCode: string;
  setName: string;
  collectorNumber: string;
  rarity: string;
  finish: Finish;
  quantity: number;                       // summed across merged rows
  weightedPurchase: { price: number | null; currency: string } | null;
  prices: PriceSet;                       // current
  previousPrices: PriceSet | null;
  enriched: Enriched;
  fetchedAt: number;
  /** Merged rows behind this tile (conditions/languages/binders). */
  breakdown: { condition: string; language: string; binder: string; quantity: number; purchasePrice: number | null }[];
}
```

### 3.2 Grouping (`src/lib/grouping.ts`)

Group `CollectionRow[]` into `CardTile[]` by **`scryfallId` + `finish`**. Different printings and
foil-vs-nonfoil stay separate tiles; rows differing only in condition/language/binder merge, with
`quantity` summed. `weightedPurchase.price = Σ(purchasePrice × qty) / Σqty` over rows that have a
purchase price (in the dominant `purchaseCurrency`; in practice all ManaBox rows are USD). The
merged rows are retained in `breakdown` for a tile detail view/tooltip.

This grouping map **is** the ownership index Phase 2 reuses (`ownedByScryfallId`, `ownedByName`).

## 4. Pricing rules (`src/lib/pricing.ts`)

Pure functions, unit-tested:

- **Effective current price** for a tile given `currency`:
  - USD: `finish === "normal" ? prices.usd : (prices.usdFoil ?? prices.usd)`
  - EUR: `finish === "normal" ? prices.eur : (prices.eurFoil ?? prices.eur)`
  - Foil and etched both use the foil price, falling back to nonfoil, then `null`.
- **± since refresh (per unit)** = `effective(current) − effective(previous)`; `null` if no
  `previous` snapshot or either price missing.
- **± vs purchase (per unit)** = `effective(current, purchaseCurrency) − weightedPurchase.price`,
  shown in the **purchase currency**. When the display currency differs from the purchase
  currency, the vs-purchase badge is annotated with the purchase currency symbol (we do **not**
  invent FX rates). `null` when there is no purchase price.
- **Tile display:** unit current price + the per-unit ± for the selected baseline (green ▲ /
  red ▼ / grey — for missing).
- **Summary bar totals** (selected currency, × quantity), nulls skipped:
  - Total value = `Σ effective(current) × qty`.
  - Total ± since refresh = `Σ (unitΔsinceRefresh × qty)`.
  - Total ± vs purchase = `Σ (effective(current, purchaseCur) × qty − Σ purchase)`, computed in
    the dominant purchase currency (USD in practice; mixed-currency purchases are grouped by
    their own currency and the bar notes this).

## 5. Search & filters (client-side, AND-combined)

Visible results = items matching **the search query AND every active structured filter**. Both
produce predicates over `CardTile`.

### 5.1 Search query engine (`src/lib/search-query.ts`)

A small, isolated, unit-tested module: **tokenizer → recursive-descent parser → evaluator**.

- **Grammar:** implicit AND between terms; explicit `or`; `-` negation; `( )` grouping.
- **Terms:**

  | Syntax | Meaning |
  |---|---|
  | `bolt` · `name:bolt` · `"exact phrase"` | name contains (case-insensitive) |
  | `o:"draw a card"` · `o:flying` | oracle text contains |
  | `t:creature` | type line contains |
  | `c:rug` · `c:red` | card colors (letters `wubrg`, or a color name) |
  | `ci:wu` | color identity |
  | `r:rare` | rarity equals |
  | `s:inr` · `set:inr` | set code equals |
  | `mv:>=3` · `cmc:2` | mana value with `> < >= <= =` (bare number = `=`) |
  | `f:foil` · `f:normal` · `f:etched` | finish equals |

- Unknown keys or malformed input degrade gracefully: the search box shows a subtle "couldn't
  parse" hint and falls back to a plain name-substring match rather than throwing.

### 5.2 Structured filters (`src/lib/filters.ts`)

- **Set** — multi-select of *only owned* set codes (derived from the data).
- **Price** — min/max range in the selected currency, over the effective current price.
- **Colors** — W/U/B/R/G chips + Colorless + Multicolor, mode: *includes any* / *includes all* /
  *exactly*. Evaluated against `enriched.colors`.
- **Mana value** — min/max range with a `7+` top bucket, over `enriched.cmc`.

### 5.3 Sorting (`src/lib/sort.ts`)

Comparators for: name, set (setName then numeric collector number), rarity (common → uncommon →
rare → mythic), collector number (numeric), mana value (`cmc`), price (effective current).
Ascending/descending toggle.

## 6. Server functions (`src/server/collection.ts`)

- **`getCollection()`** — read `collection.csv` fresh, parse (`lib/csv.ts`), load `prices.json`,
  auto-refresh any entry older than the 24h TTL (batched), group, enrich, and return
  `{ tiles: CardTile[], pricesUpdatedAt, sets }`.
- **`refreshPrices()`** — force a full re-pull: for every owned Scryfall ID, move `current →
  previous`, fetch fresh via `/cards/collection`, write `prices.json`, return the refreshed
  collection.
- **`uploadCsv(formData)`** — accept a multipart CSV, validate headers, write `collection.csv`
  to `/data`, then return the freshly parsed + enriched collection.

**Scryfall client (`src/lib/scryfall.ts`)** — adapted from the repo's existing
`scripts/lib/scryfall.ts` (throttle, 429 retry, descriptive User-Agent), but keyed by **Scryfall
ID** via `/cards/collection` `{ id }` identifiers (75/request → ~15 requests for ~1k unique
printings). Deduplicate IDs before fetching. Price cache logic mirrors `scripts/lib/card-cache.ts`
(TTL, batch coalescing) with the added `previous` snapshot.

## 7. Refresh strategy

- **TTL = 24h.** `getCollection()` auto-refreshes stale entries on load — this satisfies "daily"
  without a scheduler, since a NAS app is hit regularly.
- **Manual refresh button** forces an immediate full re-pull and updates the `previous` snapshot.
- Header shows **"prices updated {relative time} ago"** from `pricesUpdatedAt` (oldest entry).

## 8. UI / components (`src/components/`)

- **`Toolbar`** — search box, currency toggle (USD↔EUR), ± baseline toggle, sort control, filter
  controls (set/price/colors/mana value), refresh button, upload button.
- **`SummaryBar`** — total value + total ± for the selected currency/baseline; card count.
- **`CardGrid`** — virtualized grid via `@tanstack/react-virtual` (windowed rows of tiles).
- **`CardTile`** — image (`imageSmall`), truncated name, current price, ± badge, `×N` quantity
  badge, foil shimmer indicator. Click → lightweight detail popover (larger image + `breakdown`).
- Filter/search/sort state lives in the URL search params (TanStack Router) so a view is
  shareable and survives reload.

Per repo React conventions: components take a single `props` param (no signature destructuring);
`useQuery`/`useMutation` use the object signature.

## 9. Deployment

- **Multi-stage `Dockerfile`** (`oven/bun` base): install → `bun run build` → run the TanStack
  Start server. `/data` is a `VOLUME`.
- **`docker-compose.yml`** — one-command NAS deploy: maps a LAN port, mounts `./data:/data`.
- Because `/data` is a volume, dropping in a new `collection.csv` or clearing `prices.json`
  needs no rebuild (the upload button does the former from the UI).

## 10. Testing

`bun test` (matches the repo) over the pure-logic modules — the risk lives in the logic, not the
React glue:

- `csv.test.ts` — ManaBox parsing (quoting, finish mapping, numeric/empty purchase price).
- `search-query.test.ts` — tokenizer, and/or/negation/grouping, each term type, malformed input.
- `grouping.test.ts` — printing+finish key, quantity summing across binders, weighted purchase.
- `pricing.test.ts` — effective price (foil fallback), both ± baselines, cross-currency handling.
- `filters.test.ts` — set/price/colors (3 modes)/mana-value predicates.
- `sort.test.ts` — each comparator + asc/desc, numeric collector-number ordering.

Per user rule: prefer `.toEqual()` over `.toBe()`.

## 11. Proposed file structure

```
apps/collection-visualizer/
  package.json  tsconfig.json  vite.config.ts  app.config.ts  tailwind config
  Dockerfile  docker-compose.yml  .dockerignore  .gitignore
  src/
    router.tsx
    routes/__root.tsx  routes/index.tsx
    server/collection.ts
    lib/{types,csv,scryfall,price-cache,grouping,pricing,search-query,filters,sort}.ts
    components/{Toolbar,SummaryBar,CardGrid,CardTile,SetFilter,ColorFilter,PriceFilter,ManaValueFilter,SortControl,SearchBox,CurrencyToggle,BaselineToggle,RefreshButton,UploadButton}.tsx
    styles/app.css
  tests/{csv,search-query,grouping,pricing,filters,sort}.test.ts
  data/            # git-ignored volume mount (collection.csv, prices.json)
```

## 12. Phase 2 preview (not built now)

Deck cross-reference: read `decks/*/DECK.md`, and for each deck card use the ownership index from
§3.2 to tint owned / partially-owned / unowned, with a "cost to complete" total (Σ effective
price of missing cards). Slots onto the existing data model with no Phase 1 rework.
