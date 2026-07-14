# Collection Visualizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A read-only web app that visualizes an MTG collection exported from ManaBox — virtualized grid, prices from Scryfall (TCGplayer USD + Cardmarket EUR), search/filter/sort, daily + manual refresh, and CSV upload — deployable as a single Docker container on a NAS.

**Architecture:** TanStack Start serves UI + backend in one process. The server parses the CSV, enriches/caches Scryfall data keyed by Scryfall ID, groups rows into tiles, and returns one merged array. The client does all search/filter/sort/virtualization locally over that array. Two files in a `/data` volume are the state: `collection.csv` (source of truth for ownership) and `prices.json` (Scryfall cache with a `previous` snapshot for "± since refresh").

**Tech Stack:** TanStack Start (React + Vite) · TypeScript · Tailwind · Bun (runtime, package manager, test runner) · `@tanstack/react-virtual` · `@tanstack/react-query`.

**Spec:** `docs/superpowers/specs/2026-07-14-collection-visualizer-design.md`

## Global Constraints

- **Runtime/tooling:** Bun everywhere — `bun install`, `bun run dev`, `bun test`, `oven/bun` Docker base. `package.json` has `"type": "module"`.
- **TanStack Start API (current):** configure via the Vite plugin `tanstackStart()` from `@tanstack/react-start/plugin/vite` in `vite.config.ts` (not `app.config.ts`/Vinxi). Server functions use `createServerFn({ method }).validator(...).handler(...)` from `@tanstack/react-start`; call them from a route `loader` or via `useServerFn()` in components.
- **Location:** everything under `apps/collection-visualizer/`. Self-contained (own `package.json`), separable into a standalone repo later.
- **React conventions (repo rules):** components take a single `props` param — never destructure in the signature; destructure inside the body if needed. `useQuery`/`useMutation` use the **object** signature only.
- **Tests:** `bun test`, co-located `*.test.ts`. Prefer `.toEqual()` over `.toBe()`.
- **Data model invariants:** grouping key is `scryfallId` + `finish`. Currency ∈ `{usd, eur}`; foil/etched use the `*_foil` price with fallback to nonfoil then `null`. Baselines: `sinceRefresh` (current − previous) and `vsPurchase` (current − weighted-avg purchase, shown in the purchase currency).
- **Prices:** only from Scryfall's bundled fields (`usd`, `usd_foil`, `eur`, `eur_foil`). No scraping, no keys.
- **Commits:** plain messages describing the change only. **No** authorship attribution of any kind (no `Co-Authored-By`, no `Signed-off-by`, no AI/tool signatures).

**Before you start:** create a feature branch off `main`:
```bash
git checkout -b feat/collection-visualizer
```

---

### Task 1: Scaffold the TanStack Start app

**Files:**
- Create: `apps/collection-visualizer/package.json`
- Create: `apps/collection-visualizer/tsconfig.json`
- Create: `apps/collection-visualizer/vite.config.ts`
- Create: `apps/collection-visualizer/src/router.tsx`
- Create: `apps/collection-visualizer/src/routes/__root.tsx`
- Create: `apps/collection-visualizer/src/routes/index.tsx`
- Create: `apps/collection-visualizer/src/styles/app.css`
- Create: `apps/collection-visualizer/.gitignore`

**Interfaces:**
- Produces: a bootable dev server on port 3000 rendering a placeholder page; `bun test` runs (with zero tests) exiting 0.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "collection-visualizer",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev --port 3000",
    "build": "vite build",
    "start": "node .output/server/index.mjs",
    "test": "bun test"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.95.0",
    "@tanstack/react-start": "^1.95.0",
    "@tanstack/react-query": "^5.62.0",
    "@tanstack/react-virtual": "^3.11.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0",
    "vite-tsconfig-paths": "^5.1.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "typescript": "^5.7.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/bun": "latest"
  }
}
```

> If any `@tanstack/*` version above fails to resolve, run `bun add @tanstack/react-start@latest @tanstack/react-router@latest` and let Bun pick the current release; the API used in this plan is stable across recent 1.x.

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "target": "ES2022",
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["bun", "vite/client"],
    "skipLibCheck": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": { "~/*": ["./src/*"] }
  }
}
```

- [ ] **Step 3: Create `vite.config.ts`** (Tailwind v4 + Start + React; plugin order matters)

```ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    // react's plugin MUST come after start's plugin
    viteReact(),
  ],
})
```

- [ ] **Step 4: Create `src/styles/app.css`**

```css
@import 'tailwindcss';
```

- [ ] **Step 5: Create `src/router.tsx`**

```tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

> `routeTree.gen.ts` is auto-generated by the Start Vite plugin on first `dev`/`build`; the import error disappears once it runs. It is git-ignored (Step 8).

- [ ] **Step 6: Create `src/routes/__root.tsx`**

```tsx
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'MTG Collection' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-neutral-950 text-neutral-100">
        {props.children}
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Create `src/routes/index.tsx`** (placeholder for now)

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <main className="p-8 text-2xl">MTG Collection Visualizer</main>
}
```

- [ ] **Step 8: Create `.gitignore`**

```gitignore
node_modules
.output
.nitro
.tanstack
routeTree.gen.ts
/data
```

- [ ] **Step 9: Install and boot**

Run: `cd apps/collection-visualizer && bun install && bun run dev`
Expected: dev server logs `http://localhost:3000`; visiting it shows "MTG Collection Visualizer" on a dark background. Stop with Ctrl-C.

- [ ] **Step 10: Commit**

```bash
git add apps/collection-visualizer
git commit -m "scaffold collection-visualizer TanStack Start app"
```

---

### Task 2: Shared types + ManaBox CSV parser

**Files:**
- Create: `apps/collection-visualizer/src/lib/types.ts`
- Create: `apps/collection-visualizer/src/lib/csv.ts`
- Test: `apps/collection-visualizer/src/lib/csv.test.ts`

**Interfaces:**
- Produces: all shared types (`Finish`, `Currency`, `Baseline`, `ColorSymbol`, `CollectionRow`, `PriceSet`, `Enriched`, `CacheEntry`, `PriceCache`, `CardTile`); `parseManaBoxCsv(text: string): CollectionRow[]`.

- [ ] **Step 1: Create `src/lib/types.ts`**

```ts
export type Finish = 'normal' | 'foil' | 'etched'
export type Currency = 'usd' | 'eur'
export type Baseline = 'sinceRefresh' | 'vsPurchase'
export type ColorSymbol = 'W' | 'U' | 'B' | 'R' | 'G'

/** One parsed ManaBox CSV line. */
export interface CollectionRow {
  scryfallId: string
  name: string
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  finish: Finish
  quantity: number
  purchasePrice: number | null
  purchaseCurrency: string
  condition: string
  language: string
  binderName: string
}

export interface PriceSet {
  usd: number | null
  usdFoil: number | null
  eur: number | null
  eurFoil: number | null
}

/** Scryfall fields cached for display, sorting, and search. */
export interface Enriched {
  cmc: number
  colors: ColorSymbol[]
  colorIdentity: ColorSymbol[]
  typeLine: string
  oracleText: string
  manaCost: string
  imageSmall: string | null
  imageNormal: string | null
}

export interface CacheEntry {
  current: PriceSet
  previous: PriceSet | null
  enriched: Enriched
  fetchedAt: number
}

export type PriceCache = Record<string, CacheEntry>

export interface CardTile {
  key: string
  scryfallId: string
  name: string
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  finish: Finish
  quantity: number
  weightedPurchase: { price: number | null; currency: string } | null
  prices: PriceSet
  previousPrices: PriceSet | null
  enriched: Enriched
  fetchedAt: number
  breakdown: { condition: string; language: string; binder: string; quantity: number; purchasePrice: number | null }[]
}
```

- [ ] **Step 2: Write the failing test `src/lib/csv.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { parseManaBoxCsv } from './csv'

const HEADER =
  'Binder Name,Binder Type,Name,Set code,Set name,Collector number,Foil,Rarity,Quantity,ManaBox ID,Scryfall ID,Purchase price,Misprint,Altered,Condition,Language,Purchase price currency,Added'

test('parses a basic ManaBox row into a CollectionRow', () => {
  const csv = `${HEADER}\nInnistrad: Remastered,binder,Thraben Inspector,INR,Innistrad Remastered,301,foil,common,1,101864,4b03e3d4-aa62-428b-9f99-3ed93506defa,1.32,false,false,near_mint,en,USD,2026-06-25T18:48:51.772Z`
  expect(parseManaBoxCsv(csv)).toEqual([
    {
      scryfallId: '4b03e3d4-aa62-428b-9f99-3ed93506defa',
      name: 'Thraben Inspector',
      setCode: 'INR',
      setName: 'Innistrad Remastered',
      collectorNumber: '301',
      rarity: 'common',
      finish: 'foil',
      quantity: 1,
      purchasePrice: 1.32,
      purchaseCurrency: 'USD',
      condition: 'near_mint',
      language: 'en',
      binderName: 'Innistrad: Remastered',
    },
  ])
})

test('handles quoted fields containing commas and empty purchase price', () => {
  const csv = `${HEADER}\n"Rares, misc",binder,"Borrowing 100,000 Arrows",CHK,Champions,52,normal,uncommon,2,1,abc-123,,false,false,near_mint,en,USD,2026-01-01T00:00:00.000Z`
  const rows = parseManaBoxCsv(csv)
  expect(rows[0].name).toEqual('Borrowing 100,000 Arrows')
  expect(rows[0].binderName).toEqual('Rares, misc')
  expect(rows[0].quantity).toEqual(2)
  expect(rows[0].purchasePrice).toEqual(null)
})

test('maps unknown finish values to normal and skips blank lines', () => {
  const csv = `${HEADER}\nB,binder,Card X,SET,Set,1,,common,1,1,id-1,0.10,false,false,near_mint,en,USD,2026-01-01T00:00:00.000Z\n`
  const rows = parseManaBoxCsv(csv)
  expect(rows.length).toEqual(1)
  expect(rows[0].finish).toEqual('normal')
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd apps/collection-visualizer && bun test src/lib/csv.test.ts`
Expected: FAIL — `parseManaBoxCsv` is not exported / not defined.

- [ ] **Step 4: Implement `src/lib/csv.ts`**

```ts
import type { CollectionRow, Finish } from './types'

/** Split one CSV line into fields, honoring double-quoted fields with embedded commas/quotes. */
function splitCsvLine(line: string): string[] {
  const fields: string[] = []
  let value = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          value += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        value += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      fields.push(value)
      value = ''
    } else {
      value += ch
    }
  }
  fields.push(value)
  return fields
}

function toFinish(raw: string): Finish {
  const v = raw.trim().toLowerCase()
  return v === 'foil' || v === 'etched' ? v : 'normal'
}

/** Parse a ManaBox CSV export into rows, mapping columns by header name (order-independent). */
export function parseManaBoxCsv(text: string): CollectionRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []

  const header = splitCsvLine(lines[0])
  const col = (name: string): number => header.indexOf(name)
  const idx = {
    binderName: col('Binder Name'),
    name: col('Name'),
    setCode: col('Set code'),
    setName: col('Set name'),
    collectorNumber: col('Collector number'),
    finish: col('Foil'),
    rarity: col('Rarity'),
    quantity: col('Quantity'),
    scryfallId: col('Scryfall ID'),
    purchasePrice: col('Purchase price'),
    condition: col('Condition'),
    language: col('Language'),
    purchaseCurrency: col('Purchase price currency'),
  }

  const rows: CollectionRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const f = splitCsvLine(lines[i])
    const rawPrice = (f[idx.purchasePrice] ?? '').trim()
    rows.push({
      scryfallId: (f[idx.scryfallId] ?? '').trim(),
      name: f[idx.name] ?? '',
      setCode: (f[idx.setCode] ?? '').trim(),
      setName: f[idx.setName] ?? '',
      collectorNumber: (f[idx.collectorNumber] ?? '').trim(),
      rarity: (f[idx.rarity] ?? '').trim().toLowerCase(),
      finish: toFinish(f[idx.finish] ?? ''),
      quantity: Number.parseInt(f[idx.quantity] ?? '1', 10) || 1,
      purchasePrice: rawPrice === '' ? null : Number.parseFloat(rawPrice),
      purchaseCurrency: (f[idx.purchaseCurrency] ?? 'USD').trim() || 'USD',
      condition: (f[idx.condition] ?? '').trim(),
      language: (f[idx.language] ?? '').trim(),
      binderName: f[idx.binderName] ?? '',
    })
  }
  return rows
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `bun test src/lib/csv.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add apps/collection-visualizer/src/lib/types.ts apps/collection-visualizer/src/lib/csv.ts apps/collection-visualizer/src/lib/csv.test.ts
git commit -m "add shared types and ManaBox CSV parser"
```

---

### Task 3: Scryfall client (fetch by ID + projections)

**Files:**
- Create: `apps/collection-visualizer/src/lib/scryfall.ts`
- Test: `apps/collection-visualizer/src/lib/scryfall.test.ts`

**Interfaces:**
- Consumes: `PriceSet`, `Enriched` from `types.ts`.
- Produces: `toPriceSet(card: any): PriceSet`, `toEnriched(card: any): Enriched`, `chunk<T>(arr: T[], size: number): T[][]`, and `fetchCardsByIds(ids: string[]): Promise<Record<string, any>>` (raw Scryfall card objects keyed by id). Network fetch is not unit-tested; the pure projections and chunking are.

- [ ] **Step 1: Write the failing test `src/lib/scryfall.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { toPriceSet, toEnriched, chunk } from './scryfall'

const CARD = {
  id: 'abc',
  cmc: 2,
  colors: ['W'],
  color_identity: ['W', 'U'],
  type_line: 'Creature — Human',
  oracle_text: 'When this enters, investigate.',
  mana_cost: '{1}{W}',
  prices: { usd: '1.32', usd_foil: '3.10', eur: '0.95', eur_foil: '2.40', tix: '0.02' },
  image_uris: { small: 'https://img/small.jpg', normal: 'https://img/normal.jpg' },
}

test('toPriceSet maps the four price fields, null when absent', () => {
  expect(toPriceSet(CARD)).toEqual({ usd: 1.32, usdFoil: 3.1, eur: 0.95, eurFoil: 2.4 })
  expect(toPriceSet({ prices: { usd: null } })).toEqual({ usd: null, usdFoil: null, eur: null, eurFoil: null })
})

test('toEnriched projects gameplay + image fields', () => {
  expect(toEnriched(CARD)).toEqual({
    cmc: 2,
    colors: ['W'],
    colorIdentity: ['W', 'U'],
    typeLine: 'Creature — Human',
    oracleText: 'When this enters, investigate.',
    manaCost: '{1}{W}',
    imageSmall: 'https://img/small.jpg',
    imageNormal: 'https://img/normal.jpg',
  })
})

test('toEnriched falls back to the first face for double-faced cards', () => {
  const dfc = {
    cmc: 3,
    color_identity: ['R'],
    card_faces: [
      { type_line: 'Sorcery', oracle_text: 'Front.', mana_cost: '{2}{R}', colors: ['R'], image_uris: { small: 's', normal: 'n' } },
      { type_line: 'Land', oracle_text: 'Back.', mana_cost: '' },
    ],
  }
  const e = toEnriched(dfc)
  expect(e.typeLine).toEqual('Sorcery // Land')
  expect(e.imageSmall).toEqual('s')
  expect(e.colors).toEqual(['R'])
})

test('chunk splits into batches of the given size', () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/scryfall.test.ts`
Expected: FAIL — functions not defined.

- [ ] **Step 3: Implement `src/lib/scryfall.ts`**

```ts
import type { PriceSet, Enriched, ColorSymbol } from './types'

const API = 'https://api.scryfall.com'
const HEADERS = {
  'User-Agent': 'mtg-agent-collection/1.0 (https://github.com/JeffreyJoumjian/mtg-agent)',
  Accept: 'application/json',
} as const
const THROTTLE_MS = 100

const num = (v: unknown): number | null => (v == null ? null : Number(v))

export function toPriceSet(card: any): PriceSet {
  const p = card?.prices ?? {}
  return { usd: num(p.usd), usdFoil: num(p.usd_foil), eur: num(p.eur), eurFoil: num(p.eur_foil) }
}

export function toEnriched(card: any): Enriched {
  const faces: any[] = Array.isArray(card?.card_faces) ? card.card_faces : []
  const joinFaces = (key: string) => faces.map((f) => f?.[key]).filter(Boolean).join(' // ')
  const face0 = faces[0] ?? {}
  return {
    cmc: card?.cmc ?? 0,
    colors: (card?.colors ?? face0.colors ?? []) as ColorSymbol[],
    colorIdentity: (card?.color_identity ?? []) as ColorSymbol[],
    typeLine: card?.type_line ?? joinFaces('type_line'),
    oracleText: card?.oracle_text ?? faces.map((f) => f?.oracle_text).filter(Boolean).join('\n//\n'),
    manaCost: card?.mana_cost ?? joinFaces('mana_cost'),
    imageSmall: card?.image_uris?.small ?? face0.image_uris?.small ?? null,
    imageNormal: card?.image_uris?.normal ?? face0.image_uris?.normal ?? null,
  }
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

let lastRequestAt = 0
async function throttle(): Promise<void> {
  const wait = THROTTLE_MS - (Date.now() - lastRequestAt)
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  lastRequestAt = Date.now()
}

async function post(path: string, body: unknown): Promise<any> {
  await throttle()
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get('retry-after') ?? '1')
    await new Promise((r) => setTimeout(r, Math.max(1, retryAfter) * 1000))
    return post(path, body)
  }
  if (!res.ok) throw new Error(`Scryfall ${res.status}`)
  return res.json()
}

/** Batch-fetch raw Scryfall card objects by Scryfall ID (75/request), keyed by id. */
export async function fetchCardsByIds(ids: string[]): Promise<Record<string, any>> {
  const unique = [...new Set(ids.filter(Boolean))]
  const byId: Record<string, any> = {}
  for (const batch of chunk(unique, 75)) {
    const body = await post('/cards/collection', { identifiers: batch.map((id) => ({ id })) })
    for (const card of body.data ?? []) byId[card.id] = card
  }
  return byId
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/scryfall.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/scryfall.ts apps/collection-visualizer/src/lib/scryfall.test.ts
git commit -m "add Scryfall client: fetch-by-id and price/enriched projections"
```

---

### Task 4: Price cache (snapshot rotation + staleness)

**Files:**
- Create: `apps/collection-visualizer/src/lib/price-cache.ts`
- Test: `apps/collection-visualizer/src/lib/price-cache.test.ts`

**Interfaces:**
- Consumes: `PriceCache`, `CacheEntry`, `toPriceSet`, `toEnriched`.
- Produces:
  - `TTL_MS = 86_400_000`
  - `staleIds(cache: PriceCache, ownedIds: string[], now: number): string[]` — owned ids missing or older than TTL.
  - `mergeRefresh(cache: PriceCache, rawById: Record<string, any>, now: number): PriceCache` — pure; rotates `current → previous` for ids being refreshed and writes new `current`/`enriched`/`fetchedAt`.
  - `loadCache(): Promise<PriceCache>` / `saveCache(cache): Promise<void>` — fs shell over `DATA_DIR/prices.json` (not unit-tested).

- [ ] **Step 1: Write the failing test `src/lib/price-cache.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { staleIds, mergeRefresh, TTL_MS } from './price-cache'
import type { PriceCache } from './types'

const entry = (usd: number, fetchedAt: number) => ({
  current: { usd, usdFoil: null, eur: null, eurFoil: null },
  previous: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt,
})

test('staleIds returns missing ids and ids older than the TTL', () => {
  const now = 1_000_000_000
  const cache: PriceCache = { fresh: entry(1, now - 1000), old: entry(1, now - TTL_MS - 1) }
  expect(staleIds(cache, ['fresh', 'old', 'missing'], now).sort()).toEqual(['missing', 'old'])
})

test('mergeRefresh rotates current into previous and writes new current', () => {
  const now = 2_000
  const cache: PriceCache = { a: entry(1.0, 1_000) }
  const raw = { a: { id: 'a', prices: { usd: '1.50' }, cmc: 3, type_line: 'Instant' } }
  const next = mergeRefresh(cache, raw, now)
  expect(next.a.previous).toEqual({ usd: 1.0, usdFoil: null, eur: null, eurFoil: null })
  expect(next.a.current.usd).toEqual(1.5)
  expect(next.a.fetchedAt).toEqual(now)
  expect(next.a.enriched.typeLine).toEqual('Instant')
})

test('mergeRefresh sets previous=null for a brand-new id', () => {
  const raw = { b: { id: 'b', prices: { usd: '0.25' } } }
  const next = mergeRefresh({}, raw, 5)
  expect(next.b.previous).toEqual(null)
  expect(next.b.current.usd).toEqual(0.25)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/price-cache.test.ts`
Expected: FAIL — functions not defined.

- [ ] **Step 3: Implement `src/lib/price-cache.ts`**

```ts
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { PriceCache } from './types'
import { toPriceSet, toEnriched } from './scryfall'

export const TTL_MS = 24 * 60 * 60 * 1000

export const DATA_DIR = process.env.DATA_DIR ?? join(process.cwd(), 'data')
const CACHE_PATH = join(DATA_DIR, 'prices.json')

/** Owned ids that are missing from the cache or older than the TTL. */
export function staleIds(cache: PriceCache, ownedIds: string[], now: number): string[] {
  return [...new Set(ownedIds)].filter((id) => {
    const hit = cache[id]
    return !hit || now - hit.fetchedAt >= TTL_MS
  })
}

/** Pure: fold freshly-fetched raw cards into the cache, rotating current→previous. */
export function mergeRefresh(cache: PriceCache, rawById: Record<string, any>, now: number): PriceCache {
  const next: PriceCache = { ...cache }
  for (const [id, raw] of Object.entries(rawById)) {
    const prior = cache[id]
    next[id] = {
      current: toPriceSet(raw),
      previous: prior ? prior.current : null,
      enriched: toEnriched(raw),
      fetchedAt: now,
    }
  }
  return next
}

export async function loadCache(): Promise<PriceCache> {
  try {
    return JSON.parse(await readFile(CACHE_PATH, 'utf8')) as PriceCache
  } catch {
    return {}
  }
}

export async function saveCache(cache: PriceCache): Promise<void> {
  await mkdir(dirname(CACHE_PATH), { recursive: true })
  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n')
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/price-cache.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/price-cache.ts apps/collection-visualizer/src/lib/price-cache.test.ts
git commit -m "add price cache: snapshot rotation and staleness"
```

---

### Task 5: Grouping rows into tiles + ownership index

**Files:**
- Create: `apps/collection-visualizer/src/lib/grouping.ts`
- Test: `apps/collection-visualizer/src/lib/grouping.test.ts`

**Interfaces:**
- Consumes: `CollectionRow`, `CardTile`, `PriceCache`.
- Produces:
  - `GroupedRow` = the identity + aggregate fields of a tile *before* price enrichment: `{ key, scryfallId, name, setCode, setName, collectorNumber, rarity, finish, quantity, weightedPurchase, breakdown }`.
  - `groupRows(rows: CollectionRow[]): GroupedRow[]` — pure; groups by `scryfallId + finish`.
  - `enrichTiles(groups: GroupedRow[], cache: PriceCache): CardTile[]` — joins cached prices/enriched by `scryfallId`; missing cache entries yield all-null prices and empty enriched.
  - `ownedIds(rows: CollectionRow[]): string[]` — unique Scryfall ids (input to the cache refresh).

- [ ] **Step 1: Write the failing test `src/lib/grouping.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { groupRows, enrichTiles, ownedIds } from './grouping'
import type { CollectionRow, PriceCache } from './types'

const row = (over: Partial<CollectionRow>): CollectionRow => ({
  scryfallId: 'id-1', name: 'Bolt', setCode: 'LEA', setName: 'Alpha', collectorNumber: '161',
  rarity: 'common', finish: 'normal', quantity: 1, purchasePrice: 1, purchaseCurrency: 'USD',
  condition: 'near_mint', language: 'en', binderName: 'A', ...over,
})

test('merges same printing+finish across binders, summing quantity', () => {
  const groups = groupRows([
    row({ quantity: 2, binderName: 'A', condition: 'near_mint', purchasePrice: 1 }),
    row({ quantity: 1, binderName: 'B', condition: 'lightly_played', purchasePrice: 4 }),
  ])
  expect(groups.length).toEqual(1)
  expect(groups[0].quantity).toEqual(3)
  expect(groups[0].key).toEqual('id-1:normal')
  // weighted avg purchase = (1*2 + 4*1) / 3 = 2
  expect(groups[0].weightedPurchase).toEqual({ price: 2, currency: 'USD' })
  expect(groups[0].breakdown.length).toEqual(2)
})

test('keeps different finishes and different printings as separate groups', () => {
  const groups = groupRows([
    row({ finish: 'normal' }),
    row({ finish: 'foil' }),
    row({ scryfallId: 'id-2', finish: 'normal' }),
  ])
  expect(groups.map((g) => g.key).sort()).toEqual(['id-1:foil', 'id-1:normal', 'id-2:normal'])
})

test('weightedPurchase is null when no row has a purchase price', () => {
  const groups = groupRows([row({ purchasePrice: null }), row({ purchasePrice: null })])
  expect(groups[0].weightedPurchase).toEqual(null)
})

test('enrichTiles joins cached prices and enriched by scryfallId', () => {
  const groups = groupRows([row({})])
  const cache: PriceCache = {
    'id-1': {
      current: { usd: 2, usdFoil: 5, eur: 1.5, eurFoil: 4 },
      previous: { usd: 1.5, usdFoil: null, eur: null, eurFoil: null },
      enriched: { cmc: 1, colors: ['R'], colorIdentity: ['R'], typeLine: 'Instant', oracleText: 'deal 3', manaCost: '{R}', imageSmall: 's', imageNormal: 'n' },
      fetchedAt: 10,
    },
  }
  const tiles = enrichTiles(groups, cache)
  expect(tiles[0].prices.usd).toEqual(2)
  expect(tiles[0].previousPrices?.usd).toEqual(1.5)
  expect(tiles[0].enriched.typeLine).toEqual('Instant')
  expect(tiles[0].fetchedAt).toEqual(10)
})

test('enrichTiles tolerates a missing cache entry', () => {
  const tiles = enrichTiles(groupRows([row({})]), {})
  expect(tiles[0].prices).toEqual({ usd: null, usdFoil: null, eur: null, eurFoil: null })
  expect(tiles[0].enriched.cmc).toEqual(0)
})

test('ownedIds returns unique ids', () => {
  expect(ownedIds([row({}), row({ finish: 'foil' }), row({ scryfallId: 'id-2' })]).sort()).toEqual(['id-1', 'id-2'])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/grouping.test.ts`
Expected: FAIL — functions not defined.

- [ ] **Step 3: Implement `src/lib/grouping.ts`**

```ts
import type { CardTile, CollectionRow, Enriched, PriceCache, PriceSet } from './types'

export interface GroupedRow {
  key: string
  scryfallId: string
  name: string
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  finish: CollectionRow['finish']
  quantity: number
  weightedPurchase: { price: number | null; currency: string } | null
  breakdown: CardTile['breakdown']
}

const EMPTY_PRICES: PriceSet = { usd: null, usdFoil: null, eur: null, eurFoil: null }
const EMPTY_ENRICHED: Enriched = {
  cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null,
}

export function ownedIds(rows: CollectionRow[]): string[] {
  return [...new Set(rows.map((r) => r.scryfallId).filter(Boolean))]
}

/** Group rows by scryfallId + finish, summing quantity and computing a weighted-avg purchase price. */
export function groupRows(rows: CollectionRow[]): GroupedRow[] {
  const groups: Record<string, GroupedRow> = {}

  for (const r of rows) {
    const key = `${r.scryfallId}:${r.finish}`
    const g =
      groups[key] ??
      (groups[key] = {
        key,
        scryfallId: r.scryfallId,
        name: r.name,
        setCode: r.setCode,
        setName: r.setName,
        collectorNumber: r.collectorNumber,
        rarity: r.rarity,
        finish: r.finish,
        quantity: 0,
        weightedPurchase: null,
        breakdown: [],
      })
    g.quantity += r.quantity
    g.breakdown.push({ condition: r.condition, language: r.language, binder: r.binderName, quantity: r.quantity, purchasePrice: r.purchasePrice })
  }

  for (const g of Object.values(groups)) {
    const priced = g.breakdown.filter((b) => b.purchasePrice != null)
    if (priced.length > 0) {
      const qty = priced.reduce((s, b) => s + b.quantity, 0)
      const total = priced.reduce((s, b) => s + (b.purchasePrice as number) * b.quantity, 0)
      g.weightedPurchase = { price: qty > 0 ? total / qty : null, currency: 'USD' }
    }
  }

  return Object.values(groups)
}

/** Join cached prices + enriched card data onto grouped rows to produce render-ready tiles. */
export function enrichTiles(groups: GroupedRow[], cache: PriceCache): CardTile[] {
  return groups.map((g) => {
    const hit = cache[g.scryfallId]
    return {
      ...g,
      prices: hit ? hit.current : EMPTY_PRICES,
      previousPrices: hit ? hit.previous : null,
      enriched: hit ? hit.enriched : EMPTY_ENRICHED,
      fetchedAt: hit ? hit.fetchedAt : 0,
    }
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/grouping.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/grouping.ts apps/collection-visualizer/src/lib/grouping.test.ts
git commit -m "add row grouping, tile enrichment, and ownership index"
```

---

### Task 6: Pricing (effective price, ± baselines, totals)

**Files:**
- Create: `apps/collection-visualizer/src/lib/pricing.ts`
- Test: `apps/collection-visualizer/src/lib/pricing.test.ts`

**Interfaces:**
- Consumes: `CardTile`, `PriceSet`, `Currency`, `Baseline`.
- Produces:
  - `effectivePrice(prices: PriceSet | null, currency: Currency, finish: Finish): number | null`
  - `unitDelta(tile: CardTile, currency: Currency, baseline: Baseline): { value: number; currency: Currency | string } | null`
  - `tileValue(tile: CardTile, currency: Currency): number | null` (unit effective price)
  - `totals(tiles: CardTile[], currency: Currency, baseline: Baseline): { value: number; delta: number }`

- [ ] **Step 1: Write the failing test `src/lib/pricing.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { effectivePrice, unitDelta, totals } from './pricing'
import type { CardTile } from './types'

const tile = (over: Partial<CardTile>): CardTile => ({
  key: 'k', scryfallId: 'id', name: 'C', setCode: 'S', setName: 'Set', collectorNumber: '1',
  rarity: 'rare', finish: 'normal', quantity: 1, weightedPurchase: null,
  prices: { usd: 2, usdFoil: 5, eur: 1.5, eurFoil: 4 },
  previousPrices: { usd: 1.5, usdFoil: 4, eur: 1, eurFoil: 3 },
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [], ...over,
})

test('effectivePrice picks nonfoil vs foil by finish, with fallback', () => {
  expect(effectivePrice({ usd: 2, usdFoil: 5, eur: null, eurFoil: null }, 'usd', 'normal')).toEqual(2)
  expect(effectivePrice({ usd: 2, usdFoil: 5, eur: null, eurFoil: null }, 'usd', 'foil')).toEqual(5)
  expect(effectivePrice({ usd: 2, usdFoil: null, eur: null, eurFoil: null }, 'usd', 'etched')).toEqual(2)
  expect(effectivePrice(null, 'usd', 'normal')).toEqual(null)
})

test('unitDelta since refresh = current - previous', () => {
  expect(unitDelta(tile({}), 'usd', 'sinceRefresh')).toEqual({ value: 0.5, currency: 'usd' })
})

test('unitDelta vs purchase uses the purchase currency', () => {
  const t = tile({ weightedPurchase: { price: 1.25, currency: 'USD' } })
  expect(unitDelta(t, 'usd', 'vsPurchase')).toEqual({ value: 0.75, currency: 'USD' })
})

test('unitDelta is null when the baseline data is missing', () => {
  expect(unitDelta(tile({ previousPrices: null }), 'usd', 'sinceRefresh')).toEqual(null)
  expect(unitDelta(tile({ weightedPurchase: null }), 'usd', 'vsPurchase')).toEqual(null)
})

test('totals sum value and delta across quantity, skipping nulls', () => {
  const tiles = [
    tile({ quantity: 2 }),
    tile({ prices: { usd: null, usdFoil: null, eur: null, eurFoil: null }, quantity: 3 }),
  ]
  // value: 2*2 = 4 ; second tile has null price -> skipped
  // delta sinceRefresh: (2-1.5)*2 = 1
  expect(totals(tiles, 'usd', 'sinceRefresh')).toEqual({ value: 4, delta: 1 })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/pricing.test.ts`
Expected: FAIL — functions not defined.

- [ ] **Step 3: Implement `src/lib/pricing.ts`**

```ts
import type { Baseline, CardTile, Currency, Finish, PriceSet } from './types'

/** The market price for a tile given currency + finish (foil/etched → *_foil with fallback). */
export function effectivePrice(prices: PriceSet | null, currency: Currency, finish: Finish): number | null {
  if (!prices) return null
  if (currency === 'usd') return finish === 'normal' ? prices.usd : (prices.usdFoil ?? prices.usd)
  return finish === 'normal' ? prices.eur : (prices.eurFoil ?? prices.eur)
}

/** Unit effective current price for a tile. */
export function tileValue(tile: CardTile, currency: Currency): number | null {
  return effectivePrice(tile.prices, currency, tile.finish)
}

/** Per-unit ± for the selected baseline. vsPurchase is reported in the purchase currency. */
export function unitDelta(
  tile: CardTile,
  currency: Currency,
  baseline: Baseline,
): { value: number; currency: Currency | string } | null {
  const current = effectivePrice(tile.prices, currency, tile.finish)
  if (current == null) return null

  if (baseline === 'sinceRefresh') {
    const prev = effectivePrice(tile.previousPrices, currency, tile.finish)
    if (prev == null) return null
    return { value: current - prev, currency }
  }

  const purchase = tile.weightedPurchase
  if (!purchase || purchase.price == null) return null
  const purchaseCurrency = purchase.currency.toLowerCase() === 'eur' ? 'eur' : 'usd'
  const currentInPurchaseCcy = effectivePrice(tile.prices, purchaseCurrency, tile.finish)
  if (currentInPurchaseCcy == null) return null
  return { value: currentInPurchaseCcy - purchase.price, currency: purchase.currency }
}

/** Portfolio totals (× quantity), skipping tiles with no price / no baseline. */
export function totals(tiles: CardTile[], currency: Currency, baseline: Baseline): { value: number; delta: number } {
  let value = 0
  let delta = 0
  for (const t of tiles) {
    const unit = tileValue(t, currency)
    if (unit != null) value += unit * t.quantity
    const d = unitDelta(t, currency, baseline)
    if (d != null) delta += d.value * t.quantity
  }
  return { value, delta }
}
```

> Note the `import type { Finish }` is used via `effectivePrice`. Keep the `Finish` import.

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/pricing.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/pricing.ts apps/collection-visualizer/src/lib/pricing.test.ts
git commit -m "add pricing: effective price, baselines, and totals"
```

---

### Task 7: Structured filters

**Files:**
- Create: `apps/collection-visualizer/src/lib/filters.ts`
- Test: `apps/collection-visualizer/src/lib/filters.test.ts`

**Interfaces:**
- Consumes: `CardTile`, `Currency`, `ColorSymbol`, `effectivePrice`.
- Produces:
  - `ColorMode = 'any' | 'all' | 'exactly'`
  - `FilterState = { sets: string[]; colors: ColorSymbol[]; colorMode: ColorMode; colorless: boolean; multicolor: boolean; priceMin: number | null; priceMax: number | null; cmcMin: number | null; cmcMax: number | null }`
  - `emptyFilters(): FilterState`
  - `applyFilters(tiles: CardTile[], filters: FilterState, currency: Currency): CardTile[]`
  - `ownedSets(tiles: CardTile[]): { code: string; name: string }[]` (sorted by name)

- [ ] **Step 1: Write the failing test `src/lib/filters.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { applyFilters, emptyFilters, ownedSets } from './filters'
import type { CardTile, ColorSymbol } from './types'

const tile = (over: Partial<CardTile> & { colors?: ColorSymbol[]; cmc?: number }): CardTile => ({
  key: over.key ?? 'k', scryfallId: 'id', name: 'C', setCode: over.setCode ?? 'AAA', setName: over.setName ?? 'Set A',
  collectorNumber: '1', rarity: 'rare', finish: 'normal', quantity: 1, weightedPurchase: null,
  prices: over.prices ?? { usd: 2, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: over.cmc ?? 2, colors: over.colors ?? [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('empty filters pass everything', () => {
  const tiles = [tile({}), tile({ setCode: 'BBB' })]
  expect(applyFilters(tiles, emptyFilters(), 'usd').length).toEqual(2)
})

test('set filter keeps only selected sets', () => {
  const tiles = [tile({ setCode: 'AAA' }), tile({ setCode: 'BBB' })]
  const out = applyFilters(tiles, { ...emptyFilters(), sets: ['BBB'] }, 'usd')
  expect(out.map((t) => t.setCode)).toEqual(['BBB'])
})

test('price range filters on the effective price in the selected currency', () => {
  const tiles = [
    tile({ prices: { usd: 1, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ prices: { usd: 10, usdFoil: null, eur: null, eurFoil: null } }),
  ]
  const out = applyFilters(tiles, { ...emptyFilters(), priceMin: 5, priceMax: null }, 'usd')
  expect(out.length).toEqual(1)
})

test('color mode any/all/exactly', () => {
  const wu = tile({ colors: ['W', 'U'] })
  const w = tile({ colors: ['W'] })
  const base = emptyFilters()
  expect(applyFilters([wu, w], { ...base, colors: ['U'], colorMode: 'any' }, 'usd')).toEqual([wu])
  expect(applyFilters([wu, w], { ...base, colors: ['W', 'U'], colorMode: 'all' }, 'usd')).toEqual([wu])
  expect(applyFilters([wu, w], { ...base, colors: ['W'], colorMode: 'exactly' }, 'usd')).toEqual([w])
})

test('colorless and multicolor toggles', () => {
  const colorless = tile({ colors: [] })
  const multi = tile({ colors: ['W', 'U'] })
  const mono = tile({ colors: ['R'] })
  expect(applyFilters([colorless, multi, mono], { ...emptyFilters(), colorless: true }, 'usd')).toEqual([colorless])
  expect(applyFilters([colorless, multi, mono], { ...emptyFilters(), multicolor: true }, 'usd')).toEqual([multi])
})

test('cmc range', () => {
  const tiles = [tile({ cmc: 1 }), tile({ cmc: 5 })]
  expect(applyFilters(tiles, { ...emptyFilters(), cmcMin: 3, cmcMax: null }, 'usd').map((t) => t.enriched.cmc)).toEqual([5])
})

test('ownedSets lists unique sets sorted by name', () => {
  const tiles = [tile({ setCode: 'BBB', setName: 'Zed' }), tile({ setCode: 'AAA', setName: 'Alpha' }), tile({ setCode: 'AAA', setName: 'Alpha' })]
  expect(ownedSets(tiles)).toEqual([{ code: 'AAA', name: 'Alpha' }, { code: 'BBB', name: 'Zed' }])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/filters.test.ts`
Expected: FAIL — functions not defined.

- [ ] **Step 3: Implement `src/lib/filters.ts`**

```ts
import type { CardTile, ColorSymbol, Currency } from './types'
import { effectivePrice } from './pricing'

export type ColorMode = 'any' | 'all' | 'exactly'

export interface FilterState {
  sets: string[]
  colors: ColorSymbol[]
  colorMode: ColorMode
  colorless: boolean
  multicolor: boolean
  priceMin: number | null
  priceMax: number | null
  cmcMin: number | null
  cmcMax: number | null
}

export function emptyFilters(): FilterState {
  return { sets: [], colors: [], colorMode: 'any', colorless: false, multicolor: false, priceMin: null, priceMax: null, cmcMin: null, cmcMax: null }
}

function colorMatch(tileColors: ColorSymbol[], selected: ColorSymbol[], mode: ColorMode): boolean {
  if (selected.length === 0) return true
  if (mode === 'any') return selected.some((c) => tileColors.includes(c))
  if (mode === 'all') return !selected.some((c) => !tileColors.includes(c))
  // exactly
  return tileColors.length === selected.length && !selected.some((c) => !tileColors.includes(c))
}

export function applyFilters(tiles: CardTile[], filters: FilterState, currency: Currency): CardTile[] {
  return tiles.filter((t) => {
    if (filters.sets.length > 0 && !filters.sets.includes(t.setCode)) return false

    const colors = t.enriched.colors
    if (filters.colorless && colors.length !== 0) return false
    if (filters.multicolor && colors.length < 2) return false
    if (!colorMatch(colors, filters.colors, filters.colorMode)) return false

    const price = effectivePrice(t.prices, currency, t.finish)
    if (filters.priceMin != null && (price == null || price < filters.priceMin)) return false
    if (filters.priceMax != null && (price == null || price > filters.priceMax)) return false

    const cmc = t.enriched.cmc
    if (filters.cmcMin != null && cmc < filters.cmcMin) return false
    if (filters.cmcMax != null && cmc > filters.cmcMax) return false

    return true
  })
}

export function ownedSets(tiles: CardTile[]): { code: string; name: string }[] {
  const map: Record<string, string> = {}
  for (const t of tiles) map[t.setCode] = t.setName
  return Object.entries(map)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/filters.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/filters.ts apps/collection-visualizer/src/lib/filters.test.ts
git commit -m "add structured filters: set, color, price, mana value"
```

---

### Task 8: Scryfall-style search query engine

**Files:**
- Create: `apps/collection-visualizer/src/lib/search-query.ts`
- Test: `apps/collection-visualizer/src/lib/search-query.test.ts`

**Interfaces:**
- Consumes: `CardTile`.
- Produces: `compileQuery(input: string): (tile: CardTile) => boolean`. Empty/whitespace input → predicate that returns `true`. Unparseable input → falls back to a case-insensitive name-substring match on the raw input.

**Grammar:** implicit AND between adjacent terms; `or` (case-insensitive) for alternation; `-` prefix negates a term or `(group)`; `( )` groups. Terms: bare word / `name:` / quoted → name contains; `o:` oracle; `t:` type; `c:` colors; `ci:` color identity; `r:` rarity; `s:`/`set:` set code; `mv:`/`cmc:` mana value with `> < >= <= =`; `f:` finish.

- [ ] **Step 1: Write the failing test `src/lib/search-query.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { compileQuery } from './search-query'
import type { CardTile } from './types'

const tile = (over: Partial<CardTile> & { colors?: any; ci?: any; type?: string; oracle?: string; cmc?: number }): CardTile => ({
  key: 'k', scryfallId: 'id', name: over.name ?? 'Lightning Bolt', setCode: over.setCode ?? 'LEA', setName: 'Alpha',
  collectorNumber: '161', rarity: over.rarity ?? 'common', finish: over.finish ?? 'normal', quantity: 1, weightedPurchase: null,
  prices: { usd: 1, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: over.cmc ?? 1, colors: over.colors ?? ['R'], colorIdentity: over.ci ?? ['R'], typeLine: over.type ?? 'Instant', oracleText: over.oracle ?? 'Deal 3 damage to any target.', manaCost: '{R}', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

const bolt = tile({})
const bear = tile({ name: 'Grizzly Bears', type: 'Creature — Bear', oracle: '', colors: ['G'], ci: ['G'], cmc: 2, rarity: 'common', setCode: 'LEB' })

test('empty query matches everything', () => {
  const p = compileQuery('   ')
  expect(p(bolt)).toEqual(true)
})

test('bare word matches card name (case-insensitive)', () => {
  const p = compileQuery('bolt')
  expect(p(bolt)).toEqual(true)
  expect(p(bear)).toEqual(false)
})

test('o: matches oracle text; t: matches type', () => {
  expect(compileQuery('o:"deal 3"')(bolt)).toEqual(true)
  expect(compileQuery('t:creature')(bear)).toEqual(true)
  expect(compileQuery('t:creature')(bolt)).toEqual(false)
})

test('c: colors and ci: color identity', () => {
  expect(compileQuery('c:r')(bolt)).toEqual(true)
  expect(compileQuery('c:red')(bolt)).toEqual(true)
  expect(compileQuery('c:g')(bolt)).toEqual(false)
  expect(compileQuery('ci:g')(bear)).toEqual(true)
})

test('r: rarity, s: set, f: finish', () => {
  expect(compileQuery('r:common')(bolt)).toEqual(true)
  expect(compileQuery('s:lea')(bolt)).toEqual(true)
  expect(compileQuery('set:leb')(bear)).toEqual(true)
  expect(compileQuery('f:normal')(bolt)).toEqual(true)
  expect(compileQuery('f:foil')(bolt)).toEqual(false)
})

test('mv comparisons', () => {
  expect(compileQuery('mv:1')(bolt)).toEqual(true)
  expect(compileQuery('cmc>=2')(bear)).toEqual(true)
  expect(compileQuery('mv<=1')(bear)).toEqual(false)
  expect(compileQuery('mv:>1')(bear)).toEqual(true)
})

test('implicit AND, explicit OR, and negation', () => {
  expect(compileQuery('c:r t:instant')(bolt)).toEqual(true)
  expect(compileQuery('c:r t:creature')(bolt)).toEqual(false)
  expect(compileQuery('bolt or bears')(bear)).toEqual(true)
  expect(compileQuery('-t:creature')(bolt)).toEqual(true)
  expect(compileQuery('-t:creature')(bear)).toEqual(false)
})

test('grouping with parentheses', () => {
  const p = compileQuery('(bolt or bears) c:g')
  expect(p(bear)).toEqual(true)
  expect(p(bolt)).toEqual(false)
})

test('unparseable input falls back to a name substring match', () => {
  const p = compileQuery('((') // malformed
  expect(p(tile({ name: '(( weird' }))).toEqual(true)
  expect(p(bolt)).toEqual(false)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/search-query.test.ts`
Expected: FAIL — `compileQuery` not defined.

- [ ] **Step 3: Implement `src/lib/search-query.ts`**

```ts
import type { CardTile, ColorSymbol } from './types'

type Predicate = (tile: CardTile) => boolean

const COLOR_NAMES: Record<string, ColorSymbol> = {
  w: 'W', u: 'U', b: 'B', r: 'R', g: 'G',
  white: 'W', blue: 'U', black: 'B', red: 'R', green: 'G',
}

/** Parse "wubrg" letters or color names into a set of color symbols. */
function parseColors(raw: string): ColorSymbol[] {
  const v = raw.toLowerCase()
  if (COLOR_NAMES[v]) return [COLOR_NAMES[v]]
  const out: ColorSymbol[] = []
  for (const ch of v) if (COLOR_NAMES[ch] && !out.includes(COLOR_NAMES[ch])) out.push(COLOR_NAMES[ch])
  return out
}

function contains(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

/** Build the predicate for a single `key:value` (or comparison) term. */
function termPredicate(key: string, op: string, value: string): Predicate {
  switch (key) {
    case 'name':
      return (t) => contains(t.name, value)
    case 'o':
      return (t) => contains(t.enriched.oracleText, value)
    case 't':
      return (t) => contains(t.enriched.typeLine, value)
    case 'r':
      return (t) => t.rarity.toLowerCase() === value.toLowerCase()
    case 's':
    case 'set':
      return (t) => t.setCode.toLowerCase() === value.toLowerCase()
    case 'f':
      return (t) => t.finish.toLowerCase() === value.toLowerCase()
    case 'c': {
      const want = parseColors(value)
      return (t) => !want.some((c) => !t.enriched.colors.includes(c))
    }
    case 'ci': {
      const want = parseColors(value)
      return (t) => !want.some((c) => !t.enriched.colorIdentity.includes(c))
    }
    case 'mv':
    case 'cmc': {
      const n = Number(value)
      return (t) => {
        const c = t.enriched.cmc
        if (op === '>') return c > n
        if (op === '<') return c < n
        if (op === '>=') return c >= n
        if (op === '<=') return c <= n
        return c === n
      }
    }
    default:
      return (t) => contains(t.name, value)
  }
}

const KNOWN_KEYS = new Set(['name', 'o', 't', 'r', 's', 'set', 'f', 'c', 'ci', 'mv', 'cmc'])

// ---- Tokenizer ----
type Token = { type: 'term'; pred: Predicate } | { type: 'or' } | { type: 'not' } | { type: 'lparen' } | { type: 'rparen' }

const TOKEN_RE = /\s*(-|\(|\)|(?:[a-zA-Z]+)(?:>=|<=|>|<|:|=)"[^"]*"|(?:[a-zA-Z]+)(?:>=|<=|>|<|:|=)\S+|"[^"]*"|\S+)/g

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let m: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(input)) !== null) {
    const raw = m[1]
    if (raw === '(') tokens.push({ type: 'lparen' })
    else if (raw === ')') tokens.push({ type: 'rparen' })
    else if (raw === '-') tokens.push({ type: 'not' })
    else if (raw.toLowerCase() === 'or') tokens.push({ type: 'or' })
    else if (raw.toLowerCase() === 'and') continue // implicit AND; ignore explicit
    else tokens.push({ type: 'term', pred: parseTermToken(raw) })
  }
  return tokens
}

function parseTermToken(raw: string): Predicate {
  const quoted = raw.match(/^"(.*)"$/)
  if (quoted) return (t) => contains(t.name, quoted[1])

  const m = raw.match(/^([a-zA-Z]+)(>=|<=|>|<|:|=)(.*)$/)
  if (m && KNOWN_KEYS.has(m[1].toLowerCase())) {
    const key = m[1].toLowerCase()
    let op = m[2]
    let value = m[3]
    const q = value.match(/^"(.*)"$/)
    if (q) value = q[1]
    // Numeric keys allow `mv:>1` — lift a comparator that follows the colon.
    const lead = value.match(/^(>=|<=|>|<|=)(.*)$/)
    if (op === ':' && lead) {
      op = lead[1]
      value = lead[2]
    } else if (op === ':') {
      op = '='
    }
    return termPredicate(key, op, value)
  }

  return (t) => contains(t.name, raw)
}

// ---- Recursive-descent parser: OR > AND > NOT > atom ----
function parseTokens(tokens: Token[]): Predicate {
  let pos = 0
  const peek = () => tokens[pos]

  function parseOr(): Predicate {
    let left = parseAnd()
    while (peek()?.type === 'or') {
      pos++
      const right = parseAnd()
      const l = left
      left = (t) => l(t) || right(t)
    }
    return left
  }

  function parseAnd(): Predicate {
    const preds: Predicate[] = []
    while (peek() && peek().type !== 'or' && peek().type !== 'rparen') {
      preds.push(parseNot())
    }
    if (preds.length === 0) return () => true
    return (t) => !preds.some((p) => !p(t))
  }

  function parseNot(): Predicate {
    if (peek()?.type === 'not') {
      pos++
      const inner = parseAtom()
      return (t) => !inner(t)
    }
    return parseAtom()
  }

  function parseAtom(): Predicate {
    const tok = peek()
    if (!tok) return () => true
    if (tok.type === 'lparen') {
      pos++
      const inner = parseOr()
      if (peek()?.type !== 'rparen') throw new Error('unbalanced parentheses')
      pos++
      return inner
    }
    if (tok.type === 'term') {
      pos++
      return tok.pred
    }
    throw new Error(`unexpected token ${tok.type}`)
  }

  const pred = parseOr()
  if (pos !== tokens.length) throw new Error('trailing tokens')
  return pred
}

/** Compile a search string into a predicate over tiles. Falls back to name-substring on parse error. */
export function compileQuery(input: string): Predicate {
  const trimmed = input.trim()
  if (trimmed === '') return () => true
  try {
    const tokens = tokenize(trimmed)
    if (tokens.length === 0) return () => true
    return parseTokens(tokens)
  } catch {
    return (t) => t.name.toLowerCase().includes(trimmed.toLowerCase())
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/search-query.test.ts`
Expected: PASS (10 tests). If the fallback test fails because `((` tokenizes without throwing, confirm `parseTokens` throws on the unbalanced paren — it should via `parseAtom`.

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/search-query.ts apps/collection-visualizer/src/lib/search-query.test.ts
git commit -m "add Scryfall-style search query engine"
```

---

### Task 9: Sorting

**Files:**
- Create: `apps/collection-visualizer/src/lib/sort.ts`
- Test: `apps/collection-visualizer/src/lib/sort.test.ts`

**Interfaces:**
- Consumes: `CardTile`, `Currency`, `tileValue`.
- Produces:
  - `SortKey = 'name' | 'set' | 'rarity' | 'number' | 'cmc' | 'price'`
  - `sortTiles(tiles: CardTile[], key: SortKey, dir: 'asc' | 'desc', currency: Currency): CardTile[]` (returns a new array; stable).

- [ ] **Step 1: Write the failing test `src/lib/sort.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { sortTiles } from './sort'
import type { CardTile } from './types'

const tile = (over: Partial<CardTile> & { cmc?: number }): CardTile => ({
  key: over.key ?? Math.random().toString(), scryfallId: 'id', name: over.name ?? 'C', setCode: 'S',
  setName: over.setName ?? 'Set', collectorNumber: over.collectorNumber ?? '1', rarity: over.rarity ?? 'common',
  finish: 'normal', quantity: 1, weightedPurchase: null, prices: over.prices ?? { usd: 1, usdFoil: null, eur: null, eurFoil: null },
  previousPrices: null, enriched: { cmc: over.cmc ?? 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('sort by name asc/desc', () => {
  const tiles = [tile({ name: 'Zed' }), tile({ name: 'Ana' })]
  expect(sortTiles(tiles, 'name', 'asc', 'usd').map((t) => t.name)).toEqual(['Ana', 'Zed'])
  expect(sortTiles(tiles, 'name', 'desc', 'usd').map((t) => t.name)).toEqual(['Zed', 'Ana'])
})

test('sort by rarity uses common<uncommon<rare<mythic', () => {
  const tiles = [tile({ rarity: 'mythic', name: 'M' }), tile({ rarity: 'common', name: 'C' }), tile({ rarity: 'rare', name: 'R' })]
  expect(sortTiles(tiles, 'rarity', 'asc', 'usd').map((t) => t.name)).toEqual(['C', 'R', 'M'])
})

test('sort by collector number is numeric', () => {
  const tiles = [tile({ collectorNumber: '10', name: 'ten' }), tile({ collectorNumber: '2', name: 'two' })]
  expect(sortTiles(tiles, 'number', 'asc', 'usd').map((t) => t.name)).toEqual(['two', 'ten'])
})

test('sort by price uses the selected currency; nulls sort last on asc', () => {
  const tiles = [
    tile({ name: 'cheap', prices: { usd: 1, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ name: 'none', prices: { usd: null, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ name: 'pricey', prices: { usd: 9, usdFoil: null, eur: null, eurFoil: null } }),
  ]
  expect(sortTiles(tiles, 'price', 'asc', 'usd').map((t) => t.name)).toEqual(['cheap', 'pricey', 'none'])
})

test('sort by cmc', () => {
  const tiles = [tile({ cmc: 5, name: 'five' }), tile({ cmc: 1, name: 'one' })]
  expect(sortTiles(tiles, 'cmc', 'asc', 'usd').map((t) => t.name)).toEqual(['one', 'five'])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/sort.test.ts`
Expected: FAIL — `sortTiles` not defined.

- [ ] **Step 3: Implement `src/lib/sort.ts`**

```ts
import type { CardTile, Currency } from './types'
import { tileValue } from './pricing'

export type SortKey = 'name' | 'set' | 'rarity' | 'number' | 'cmc' | 'price'

const RARITY_ORDER: Record<string, number> = { common: 0, uncommon: 1, rare: 2, mythic: 3, special: 4, bonus: 5 }

/** Comparable value for a tile+key. Nulls become +Infinity so they sort last on ascending. */
function keyValue(tile: CardTile, key: SortKey, currency: Currency): number | string {
  switch (key) {
    case 'name':
      return tile.name.toLowerCase()
    case 'set':
      return `${tile.setName.toLowerCase()} ${String(Number(tile.collectorNumber) || 0).padStart(6, '0')}`
    case 'rarity':
      return RARITY_ORDER[tile.rarity] ?? 99
    case 'number':
      return Number(tile.collectorNumber) || 0
    case 'cmc':
      return tile.enriched.cmc
    case 'price': {
      const v = tileValue(tile, currency)
      return v == null ? Number.POSITIVE_INFINITY : v
    }
  }
}

export function sortTiles(tiles: CardTile[], key: SortKey, dir: 'asc' | 'desc', currency: Currency): CardTile[] {
  const factor = dir === 'asc' ? 1 : -1
  return [...tiles].sort((a, b) => {
    const av = keyValue(a, key, currency)
    const bv = keyValue(b, key, currency)
    if (av < bv) return -1 * factor
    if (av > bv) return 1 * factor
    return 0
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/lib/sort.test.ts`
Expected: PASS (5 tests). (Note: on `desc`, null prices sort first — acceptable.)

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/lib/sort.ts apps/collection-visualizer/src/lib/sort.test.ts
git commit -m "add tile sorting comparators"
```

---

### Task 10: Server functions (getCollection, refreshPrices, uploadCsv)

**Files:**
- Create: `apps/collection-visualizer/src/server/collection.ts`
- Test: `apps/collection-visualizer/src/server/collection.test.ts` (tests the pure orchestration helper only)

**Interfaces:**
- Consumes: `parseManaBoxCsv`, `groupRows`, `enrichTiles`, `ownedIds`, `staleIds`, `mergeRefresh`, `loadCache`, `saveCache`, `fetchCardsByIds`, `DATA_DIR`.
- Produces:
  - `CollectionResponse = { tiles: CardTile[]; pricesUpdatedAt: number | null; sets: { code: string; name: string }[] }`
  - `buildResponse(rows: CollectionRow[], cache: PriceCache): CollectionResponse` — pure assembler (group → enrich → sets → oldest fetchedAt).
  - server fns: `getCollection()`, `refreshPrices()`, `uploadCsv(formData)` — read/refresh/write and return `CollectionResponse`.

- [ ] **Step 1: Write the failing test `src/server/collection.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { buildResponse } from './collection'
import type { CollectionRow, PriceCache } from '~/lib/types'

const row = (over: Partial<CollectionRow>): CollectionRow => ({
  scryfallId: 'id-1', name: 'Bolt', setCode: 'LEA', setName: 'Alpha', collectorNumber: '161',
  rarity: 'common', finish: 'normal', quantity: 1, purchasePrice: 1, purchaseCurrency: 'USD',
  condition: 'near_mint', language: 'en', binderName: 'A', ...over,
})

test('buildResponse groups, enriches, lists sets, and reports oldest fetchedAt', () => {
  const cache: PriceCache = {
    'id-1': { current: { usd: 2, usdFoil: null, eur: null, eurFoil: null }, previous: null, enriched: { cmc: 1, colors: ['R'], colorIdentity: ['R'], typeLine: 'Instant', oracleText: '', manaCost: '{R}', imageSmall: null, imageNormal: null }, fetchedAt: 100 },
    'id-2': { current: { usd: 5, usdFoil: null, eur: null, eurFoil: null }, previous: null, enriched: { cmc: 2, colors: [], colorIdentity: [], typeLine: 'Artifact', oracleText: '', manaCost: '{2}', imageSmall: null, imageNormal: null }, fetchedAt: 50 },
  }
  const res = buildResponse([row({}), row({ scryfallId: 'id-2', setCode: 'ARN', setName: 'Arabian', name: 'Bottle' })], cache)
  expect(res.tiles.length).toEqual(2)
  expect(res.sets.map((s) => s.code).sort()).toEqual(['ARN', 'LEA'])
  expect(res.pricesUpdatedAt).toEqual(50)
})

test('buildResponse reports null pricesUpdatedAt when nothing is cached', () => {
  const res = buildResponse([row({})], {})
  expect(res.pricesUpdatedAt).toEqual(null)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/server/collection.test.ts`
Expected: FAIL — `buildResponse` not defined.

- [ ] **Step 3: Implement `src/server/collection.ts`**

```ts
import { createServerFn } from '@tanstack/react-start'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { CardTile, CollectionRow, PriceCache } from '~/lib/types'
import { parseManaBoxCsv } from '~/lib/csv'
import { groupRows, enrichTiles, ownedIds } from '~/lib/grouping'
import { ownedSets } from '~/lib/filters'
import { loadCache, saveCache, staleIds, mergeRefresh, DATA_DIR } from '~/lib/price-cache'
import { fetchCardsByIds } from '~/lib/scryfall'

export interface CollectionResponse {
  tiles: CardTile[]
  pricesUpdatedAt: number | null
  sets: { code: string; name: string }[]
}

const CSV_PATH = join(DATA_DIR, 'collection.csv')

/** Pure: assemble a response from rows + cache (group, enrich, sets, oldest fetchedAt). */
export function buildResponse(rows: CollectionRow[], cache: PriceCache): CollectionResponse {
  const tiles = enrichTiles(groupRows(rows), cache)
  const fetchedTimes = tiles.map((t) => t.fetchedAt).filter((n) => n > 0)
  return {
    tiles,
    sets: ownedSets(tiles),
    pricesUpdatedAt: fetchedTimes.length > 0 ? Math.min(...fetchedTimes) : null,
  }
}

async function readRows(): Promise<CollectionRow[]> {
  try {
    return parseManaBoxCsv(await readFile(CSV_PATH, 'utf8'))
  } catch {
    return []
  }
}

/** Refresh any stale/missing owned prices, persist, and return the assembled response. */
async function refresh(rows: CollectionRow[], force: boolean): Promise<CollectionResponse> {
  const cache = await loadCache()
  const ids = ownedIds(rows)
  const now = Date.now()
  const toFetch = force ? ids : staleIds(cache, ids, now)

  let nextCache = cache
  if (toFetch.length > 0) {
    const raw = await fetchCardsByIds(toFetch)
    nextCache = mergeRefresh(cache, raw, now)
    await saveCache(nextCache)
  }
  return buildResponse(rows, nextCache)
}

export const getCollection = createServerFn({ method: 'GET' }).handler(async () => {
  const rows = await readRows()
  return refresh(rows, false)
})

export const refreshPrices = createServerFn({ method: 'POST' }).handler(async () => {
  const rows = await readRows()
  return refresh(rows, true)
})

export const uploadCsv = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error('Expected FormData')
    const file = data.get('file')
    if (!(file instanceof File)) throw new Error('Missing file')
    return file
  })
  .handler(async ({ data: file }) => {
    const text = await file.text()
    // Validate it looks like a ManaBox export before overwriting.
    if (!text.includes('Scryfall ID')) throw new Error('Not a ManaBox CSV (missing "Scryfall ID" column)')
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(CSV_PATH, text)
    const rows = parseManaBoxCsv(text)
    return refresh(rows, false)
  })
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test src/server/collection.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Seed real data and smoke-test the server fn**

```bash
mkdir -p apps/collection-visualizer/data
cp ~/Desktop/ManaBox_Collection.csv apps/collection-visualizer/data/collection.csv
```
Run: `bun run dev`, then in a browser visit `http://localhost:3000` (it still shows the placeholder — wiring is Task 11). Leave the copied CSV in place for the next task.

- [ ] **Step 6: Commit**

```bash
git add apps/collection-visualizer/src/server/collection.ts apps/collection-visualizer/src/server/collection.test.ts
git commit -m "add server functions: getCollection, refreshPrices, uploadCsv"
```

---

### Task 11: Wire the index route — load, hold state, render count

**Files:**
- Modify: `apps/collection-visualizer/src/routes/index.tsx`
- Create: `apps/collection-visualizer/src/lib/view.ts`
- Test: `apps/collection-visualizer/src/lib/view.test.ts`

**Interfaces:**
- Consumes: `getCollection`, `compileQuery`, `applyFilters`, `sortTiles`, `FilterState`, `SortKey`, `CardTile`, `Currency`, `Baseline`.
- Produces: `computeView(tiles, { query, filters, sortKey, sortDir, currency }): CardTile[]` — the pure search→filter→sort pipeline the component calls in a `useMemo`.

- [ ] **Step 1: Write the failing test `src/lib/view.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { computeView } from './view'
import { emptyFilters } from './filters'
import type { CardTile } from './types'

const tile = (name: string, usd: number): CardTile => ({
  key: name, scryfallId: name, name, setCode: 'S', setName: 'Set', collectorNumber: '1', rarity: 'common',
  finish: 'normal', quantity: 1, weightedPurchase: null, prices: { usd, usdFoil: null, eur: null, eurFoil: null },
  previousPrices: null, enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 1, breakdown: [],
})

test('computeView applies search, filters, then sort', () => {
  const tiles = [tile('Ancestral Recall', 100), tile('Ajani', 5), tile('Black Lotus', 9000)]
  const out = computeView(tiles, { query: 'a', filters: emptyFilters(), sortKey: 'price', sortDir: 'asc', currency: 'usd' })
  // 'a' matches Ancestral and Ajani (name contains 'a'), sorted by price asc
  expect(out.map((t) => t.name)).toEqual(['Ajani', 'Ancestral Recall'])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/view.test.ts`
Expected: FAIL — `computeView` not defined.

- [ ] **Step 3: Implement `src/lib/view.ts`**

```ts
import type { Baseline, CardTile, Currency } from './types'
import { compileQuery } from './search-query'
import { applyFilters, type FilterState } from './filters'
import { sortTiles, type SortKey } from './sort'

export interface ViewState {
  query: string
  filters: FilterState
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  currency: Currency
}

export function computeView(tiles: CardTile[], view: ViewState): CardTile[] {
  const matches = compileQuery(view.query)
  const searched = tiles.filter(matches)
  const filtered = applyFilters(searched, view.filters, view.currency)
  return sortTiles(filtered, view.sortKey, view.sortDir, view.currency)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test src/lib/view.test.ts`
Expected: PASS (1 test).

- [ ] **Step 5: Rewrite `src/routes/index.tsx` to load + render a count**

```tsx
import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getCollection } from '~/server/collection'
import { emptyFilters, type FilterState } from '~/lib/filters'
import { computeView } from '~/lib/view'
import type { Baseline, Currency } from '~/lib/types'
import type { SortKey } from '~/lib/sort'

export const Route = createFileRoute('/')({
  loader: () => getCollection(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()

  const [query, setQuery] = useState('')
  const [filters] = useState<FilterState>(emptyFilters())
  const [sortKey] = useState<SortKey>('name')
  const [sortDir] = useState<'asc' | 'desc'>('asc')
  const [currency] = useState<Currency>('usd')

  const view = useMemo(
    () => computeView(data.tiles, { query, filters, sortKey, sortDir, currency }),
    [data.tiles, query, filters, sortKey, sortDir, currency],
  )

  return (
    <main className="p-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search… (try o:&quot;draw a card&quot; or c:r t:instant)"
        className="w-full max-w-md rounded bg-neutral-800 px-3 py-2"
      />
      <p className="mt-4 text-neutral-400">
        {view.length} of {data.tiles.length} cards
      </p>
    </main>
  )
}
```

- [ ] **Step 6: Manual smoke test**

Run: `bun run dev` (with `data/collection.csv` seeded from Task 10). Visit `http://localhost:3000`.
Expected: after a brief Scryfall fetch on first load, the page shows "N of N cards". Typing `c:r` reduces the count to red cards.

- [ ] **Step 7: Commit**

```bash
git add apps/collection-visualizer/src/lib/view.ts apps/collection-visualizer/src/lib/view.test.ts apps/collection-visualizer/src/routes/index.tsx
git commit -m "wire index route: load collection and compute the view"
```

---

### Task 12: CardTile + virtualized CardGrid

**Files:**
- Create: `apps/collection-visualizer/src/components/CardTile.tsx`
- Create: `apps/collection-visualizer/src/components/CardGrid.tsx`
- Create: `apps/collection-visualizer/src/lib/format.ts`
- Test: `apps/collection-visualizer/src/lib/format.test.ts`
- Modify: `apps/collection-visualizer/src/routes/index.tsx`

**Interfaces:**
- Consumes: `CardTile`, `Currency`, `Baseline`, `tileValue`, `unitDelta`.
- Produces:
  - `formatMoney(value: number | null, currency: Currency | string): string`
  - `formatDelta(value: number, currency: Currency | string): string` (signed, e.g. `+$0.12` / `−$0.05`)
  - `truncate(name: string, max: number): string`
  - `<CardTile props={{ tile, currency, baseline }} />`, `<CardGrid props={{ tiles, currency, baseline }} />`

- [ ] **Step 1: Write the failing test `src/lib/format.test.ts`**

```ts
import { test, expect } from 'bun:test'
import { formatMoney, formatDelta, truncate } from './format'

test('formatMoney renders currency symbol and 2 decimals, — for null', () => {
  expect(formatMoney(1.5, 'usd')).toEqual('$1.50')
  expect(formatMoney(2.4, 'eur')).toEqual('€2.40')
  expect(formatMoney(null, 'usd')).toEqual('—')
})

test('formatDelta is signed with a leading + or − and a minus glyph', () => {
  expect(formatDelta(0.12, 'usd')).toEqual('+$0.12')
  expect(formatDelta(-0.05, 'usd')).toEqual('−$0.05')
  expect(formatDelta(0, 'usd')).toEqual('+$0.00')
})

test('truncate adds an ellipsis past max', () => {
  expect(truncate('Short', 10)).toEqual('Short')
  expect(truncate('A Very Long Card Name', 10)).toEqual('A Very Lo…')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/lib/format.test.ts`
Expected: FAIL — functions not defined.

- [ ] **Step 3: Implement `src/lib/format.ts`**

```ts
import type { Currency } from './types'

const SYMBOL: Record<string, string> = { usd: '$', eur: '€' }

function symbolFor(currency: Currency | string): string {
  return SYMBOL[String(currency).toLowerCase()] ?? '$'
}

export function formatMoney(value: number | null, currency: Currency | string): string {
  if (value == null) return '—'
  return `${symbolFor(currency)}${value.toFixed(2)}`
}

export function formatDelta(value: number, currency: Currency | string): string {
  const sign = value < 0 ? '−' : '+'
  return `${sign}${symbolFor(currency)}${Math.abs(value).toFixed(2)}`
}

export function truncate(name: string, max: number): string {
  return name.length <= max ? name : name.slice(0, max - 1) + '…'
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test src/lib/format.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Implement `src/components/CardTile.tsx`**

```tsx
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { formatMoney, formatDelta, truncate } from '~/lib/format'

interface CardTileProps {
  tile: Tile
  currency: Currency
  baseline: Baseline
}

export function CardTile(props: CardTileProps) {
  const { tile, currency, baseline } = props
  const value = tileValue(tile, currency)
  const delta = unitDelta(tile, currency, baseline)

  return (
    <div className="relative flex flex-col rounded-lg bg-neutral-900 p-1.5">
      <div className="relative aspect-[488/680] w-full overflow-hidden rounded">
        {tile.enriched.imageSmall ? (
          <img src={tile.enriched.imageSmall} alt={tile.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 p-2 text-center text-xs text-neutral-400">
            {tile.name}
          </div>
        )}
        {tile.quantity > 1 && (
          <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold">×{tile.quantity}</span>
        )}
        {tile.finish !== 'normal' && (
          <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
            {tile.finish === 'etched' ? 'ETCH' : 'FOIL'}
          </span>
        )}
      </div>
      <div className="mt-1 truncate text-sm" title={tile.name}>{truncate(tile.name, 22)}</div>
      <div className="flex items-baseline justify-between">
        <span className="font-semibold">{formatMoney(value, currency)}</span>
        {delta && (
          <span className={delta.value < 0 ? 'text-xs text-red-400' : 'text-xs text-emerald-400'}>
            {delta.value < 0 ? '▼' : '▲'} {formatDelta(delta.value, delta.currency)}
          </span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Implement `src/components/CardGrid.tsx`** (virtualized rows of a responsive column count)

```tsx
import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CardTile } from './CardTile'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'

interface CardGridProps {
  tiles: Tile[]
  currency: Currency
  baseline: Baseline
  columns?: number
}

export function CardGrid(props: CardGridProps) {
  const columns = props.columns ?? 6
  const parentRef = useRef<HTMLDivElement>(null)
  const rowCount = Math.ceil(props.tiles.length / columns)

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320,
    overscan: 4,
  })

  return (
    <div ref={parentRef} className="h-[calc(100vh-9rem)] overflow-auto">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((row) => {
          const start = row.index * columns
          const rowTiles = props.tiles.slice(start, start + columns)
          return (
            <div
              key={row.key}
              className="absolute left-0 top-0 grid w-full gap-3 px-1"
              style={{ transform: `translateY(${row.start}px)`, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {rowTiles.map((tile) => (
                <CardTile key={tile.key} tile={tile} currency={props.currency} baseline={props.baseline} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Render the grid in `src/routes/index.tsx`**

Replace the `<p>{view.length} of …</p>` line with the grid (keep the search input and the state hooks):

```tsx
import { CardGrid } from '~/components/CardGrid'
// ...inside Home(), after computing `view`, add baseline state:
const [baseline] = useState<Baseline>('sinceRefresh')
// ...in the returned JSX, below the input:
<p className="my-3 text-sm text-neutral-400">{view.length} of {data.tiles.length} cards</p>
<CardGrid tiles={view} currency={currency} baseline={baseline} />
```

- [ ] **Step 8: Manual smoke test**

Run: `bun run dev`. Expected: a virtualized grid of card images with prices and ± badges; scrolling stays smooth through the whole collection; quantity/foil badges appear where relevant.

- [ ] **Step 9: Commit**

```bash
git add apps/collection-visualizer/src/components apps/collection-visualizer/src/lib/format.ts apps/collection-visualizer/src/lib/format.test.ts apps/collection-visualizer/src/routes/index.tsx
git commit -m "add virtualized card grid and tile with price + delta"
```

---

### Task 13: Toolbar — currency/baseline toggles, sort, filters, refresh, upload

**Files:**
- Create: `apps/collection-visualizer/src/components/Toolbar.tsx`
- Create: `apps/collection-visualizer/src/components/SummaryBar.tsx`
- Modify: `apps/collection-visualizer/src/routes/index.tsx`

**Interfaces:**
- Consumes: `FilterState`, `SortKey`, `Currency`, `Baseline`, `ownedSets` output, `totals`, `refreshPrices`, `uploadCsv`, `useServerFn`, `useRouter`, `useMutation`.
- Produces: `<Toolbar props={...} />` (all controls, lifted state via callbacks), `<SummaryBar props={{ tiles, currency, baseline }} />`.

- [ ] **Step 1: Implement `src/components/SummaryBar.tsx`**

```tsx
import type { Baseline, CardTile, Currency } from '~/lib/types'
import { totals } from '~/lib/pricing'
import { formatMoney, formatDelta } from '~/lib/format'

interface SummaryBarProps {
  tiles: CardTile[]
  currency: Currency
  baseline: Baseline
}

export function SummaryBar(props: SummaryBarProps) {
  const { value, delta } = totals(props.tiles, props.currency, props.baseline)
  const count = props.tiles.reduce((s, t) => s + t.quantity, 0)
  return (
    <div className="flex gap-6 text-sm">
      <span>{count} cards</span>
      <span>Value: <b>{formatMoney(value, props.currency)}</b></span>
      <span className={delta < 0 ? 'text-red-400' : 'text-emerald-400'}>
        {props.baseline === 'sinceRefresh' ? 'Since refresh' : 'Vs purchase'}: {formatDelta(delta, props.currency)}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Implement `src/components/Toolbar.tsx`**

```tsx
import { useRef } from 'react'
import type { Baseline, Currency } from '~/lib/types'
import type { SortKey } from '~/lib/sort'
import type { FilterState } from '~/lib/filters'

interface ToolbarProps {
  query: string
  onQuery: (v: string) => void
  currency: Currency
  onCurrency: (c: Currency) => void
  baseline: Baseline
  onBaseline: (b: Baseline) => void
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onSort: (key: SortKey, dir: 'asc' | 'desc') => void
  sets: { code: string; name: string }[]
  filters: FilterState
  onFilters: (f: FilterState) => void
  onRefresh: () => void
  refreshing: boolean
  onUpload: (file: File) => void
  pricesUpdatedAt: number | null
}

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' }, { key: 'set', label: 'Set' }, { key: 'rarity', label: 'Rarity' },
  { key: 'number', label: 'Number' }, { key: 'cmc', label: 'Mana value' }, { key: 'price', label: 'Price' },
]
const COLORS: { sym: 'W' | 'U' | 'B' | 'R' | 'G'; label: string }[] = [
  { sym: 'W', label: 'W' }, { sym: 'U', label: 'U' }, { sym: 'B', label: 'B' }, { sym: 'R', label: 'R' }, { sym: 'G', label: 'G' },
]

export function Toolbar(props: ToolbarProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const f = props.filters
  const set = (patch: Partial<FilterState>) => props.onFilters({ ...f, ...patch })
  const toggleColor = (sym: 'W' | 'U' | 'B' | 'R' | 'G') =>
    set({ colors: f.colors.includes(sym) ? f.colors.filter((c) => c !== sym) : [...f.colors, sym] })

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 p-3">
      <input
        value={props.query}
        onChange={(e) => props.onQuery(e.target.value)}
        placeholder='Search… o:"draw a card"  c:r t:instant  mv>=3'
        className="min-w-[18rem] flex-1 rounded bg-neutral-800 px-3 py-1.5"
      />

      <div className="flex overflow-hidden rounded border border-neutral-700">
        {(['usd', 'eur'] as Currency[]).map((c) => (
          <button key={c} onClick={() => props.onCurrency(c)} className={c === props.currency ? 'bg-neutral-700 px-3 py-1.5 uppercase' : 'px-3 py-1.5 uppercase'}>{c}</button>
        ))}
      </div>

      <select
        value={props.baseline}
        onChange={(e) => props.onBaseline(e.target.value as Baseline)}
        className="rounded bg-neutral-800 px-2 py-1.5"
      >
        <option value="sinceRefresh">± since refresh</option>
        <option value="vsPurchase">± vs purchase</option>
      </select>

      <select
        value={props.sortKey}
        onChange={(e) => props.onSort(e.target.value as SortKey, props.sortDir)}
        className="rounded bg-neutral-800 px-2 py-1.5"
      >
        {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
      </select>
      <button onClick={() => props.onSort(props.sortKey, props.sortDir === 'asc' ? 'desc' : 'asc')} className="rounded bg-neutral-800 px-2 py-1.5">
        {props.sortDir === 'asc' ? '↑' : '↓'}
      </button>

      <select
        value=""
        onChange={(e) => { const code = e.target.value; if (code && !f.sets.includes(code)) set({ sets: [...f.sets, code] }) }}
        className="rounded bg-neutral-800 px-2 py-1.5"
      >
        <option value="">+ Set filter…</option>
        {props.sets.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
      </select>

      <div className="flex items-center gap-1">
        {COLORS.map((c) => (
          <button key={c.sym} onClick={() => toggleColor(c.sym)} className={f.colors.includes(c.sym) ? 'h-8 w-8 rounded-full bg-amber-500 text-black' : 'h-8 w-8 rounded-full bg-neutral-800'}>{c.label}</button>
        ))}
        <select value={f.colorMode} onChange={(e) => set({ colorMode: e.target.value as FilterState['colorMode'] })} className="rounded bg-neutral-800 px-2 py-1.5">
          <option value="any">any</option>
          <option value="all">all</option>
          <option value="exactly">exactly</option>
        </select>
        <button onClick={() => set({ colorless: !f.colorless })} className={f.colorless ? 'rounded bg-amber-500 px-2 py-1.5 text-black' : 'rounded bg-neutral-800 px-2 py-1.5'}>C</button>
        <button onClick={() => set({ multicolor: !f.multicolor })} className={f.multicolor ? 'rounded bg-amber-500 px-2 py-1.5 text-black' : 'rounded bg-neutral-800 px-2 py-1.5'}>Multi</button>
      </div>

      <input type="number" placeholder="min price" value={f.priceMin ?? ''} onChange={(e) => set({ priceMin: e.target.value === '' ? null : Number(e.target.value) })} className="w-24 rounded bg-neutral-800 px-2 py-1.5" />
      <input type="number" placeholder="max price" value={f.priceMax ?? ''} onChange={(e) => set({ priceMax: e.target.value === '' ? null : Number(e.target.value) })} className="w-24 rounded bg-neutral-800 px-2 py-1.5" />
      <input type="number" placeholder="mv min" value={f.cmcMin ?? ''} onChange={(e) => set({ cmcMin: e.target.value === '' ? null : Number(e.target.value) })} className="w-20 rounded bg-neutral-800 px-2 py-1.5" />
      <input type="number" placeholder="mv max" value={f.cmcMax ?? ''} onChange={(e) => set({ cmcMax: e.target.value === '' ? null : Number(e.target.value) })} className="w-20 rounded bg-neutral-800 px-2 py-1.5" />

      <button onClick={props.onRefresh} disabled={props.refreshing} className="rounded bg-blue-700 px-3 py-1.5 disabled:opacity-50">
        {props.refreshing ? 'Refreshing…' : 'Refresh'}
      </button>
      <button onClick={() => fileRef.current?.click()} className="rounded bg-neutral-700 px-3 py-1.5">Upload CSV</button>
      <input ref={fileRef} type="file" accept=".csv" hidden onChange={(e) => { const file = e.target.files?.[0]; if (file) props.onUpload(file) }} />

      {props.pricesUpdatedAt && (
        <span className="text-xs text-neutral-500">updated {new Date(props.pricesUpdatedAt).toLocaleString()}</span>
      )}

      {(f.sets.length > 0 || f.colors.length > 0 || f.priceMin != null || f.priceMax != null || f.cmcMin != null || f.cmcMax != null) && (
        <button onClick={() => set({ sets: [], colors: [], priceMin: null, priceMax: null, cmcMin: null, cmcMax: null })} className="text-xs text-neutral-400 underline">clear filters</button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Rewrite `src/routes/index.tsx` to compose Toolbar + SummaryBar + Grid**

```tsx
import { useMemo, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'
import { getCollection, refreshPrices, uploadCsv } from '~/server/collection'
import { emptyFilters, type FilterState } from '~/lib/filters'
import { computeView } from '~/lib/view'
import { Toolbar } from '~/components/Toolbar'
import { SummaryBar } from '~/components/SummaryBar'
import { CardGrid } from '~/components/CardGrid'
import type { Baseline, Currency } from '~/lib/types'
import type { SortKey } from '~/lib/sort'

export const Route = createFileRoute('/')({
  loader: () => getCollection(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>(emptyFilters())
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [currency, setCurrency] = useState<Currency>('usd')
  const [baseline, setBaseline] = useState<Baseline>('sinceRefresh')

  const refreshFn = useServerFn(refreshPrices)
  const uploadFn = useServerFn(uploadCsv)

  const refreshMutation = useMutation({
    mutationFn: () => refreshFn(),
    onSuccess: () => router.invalidate(),
  })
  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const form = new FormData()
      form.append('file', file)
      return uploadFn({ data: form })
    },
    onSuccess: () => router.invalidate(),
  })

  const view = useMemo(
    () => computeView(data.tiles, { query, filters, sortKey, sortDir, currency }),
    [data.tiles, query, filters, sortKey, sortDir, currency],
  )

  return (
    <main className="flex h-screen flex-col">
      <Toolbar
        query={query} onQuery={setQuery}
        currency={currency} onCurrency={setCurrency}
        baseline={baseline} onBaseline={setBaseline}
        sortKey={sortKey} sortDir={sortDir} onSort={(k, d) => { setSortKey(k); setSortDir(d) }}
        sets={data.sets} filters={filters} onFilters={setFilters}
        onRefresh={() => refreshMutation.mutate()} refreshing={refreshMutation.isPending}
        onUpload={(file) => uploadMutation.mutate(file)}
        pricesUpdatedAt={data.pricesUpdatedAt}
      />
      <div className="flex items-center justify-between px-3 py-2">
        <SummaryBar tiles={view} currency={currency} baseline={baseline} />
      </div>
      <div className="flex-1 px-2">
        <CardGrid tiles={view} currency={currency} baseline={baseline} />
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Manual smoke test**

Run: `bun run dev`. Verify: currency toggle flips all prices USD↔EUR; baseline dropdown swaps the ± badges and the summary; sort dropdown + arrow reorder; set/color/price filters narrow the grid; "Refresh" repopulates prices and updates the timestamp; "Upload CSV" of the ManaBox file reloads the collection.

- [ ] **Step 5: Commit**

```bash
git add apps/collection-visualizer/src/components/Toolbar.tsx apps/collection-visualizer/src/components/SummaryBar.tsx apps/collection-visualizer/src/routes/index.tsx
git commit -m "add toolbar controls, summary bar, refresh and upload wiring"
```

---

### Task 14: Dockerize + compose + README

**Files:**
- Create: `apps/collection-visualizer/Dockerfile`
- Create: `apps/collection-visualizer/docker-compose.yml`
- Create: `apps/collection-visualizer/.dockerignore`
- Create: `apps/collection-visualizer/README.md`

**Interfaces:**
- Produces: a container that serves the app on a LAN port with `/data` as a mounted volume.

- [ ] **Step 1: Create `.dockerignore`**

```dockerignore
node_modules
.output
.nitro
.tanstack
data
```

- [ ] **Step 2: Create `Dockerfile`** (multi-stage, Bun base)

```dockerfile
# --- build ---
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
RUN bun run build

# --- run ---
FROM oven/bun:1 AS run
WORKDIR /app
ENV NODE_ENV=production
ENV DATA_DIR=/data
COPY --from=build /app/.output ./.output
VOLUME /data
EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]
```

> The TanStack Start Nitro server output lives in `.output/server/index.mjs` and runs under Bun. If the built entry path differs in your installed version, check `.output/server/` after `bun run build` and update the `CMD`.

- [ ] **Step 3: Create `docker-compose.yml`**

```yaml
services:
  collection-visualizer:
    build: .
    container_name: mtg-collection
    ports:
      - "8080:3000"
    volumes:
      - ./data:/data
    environment:
      - DATA_DIR=/data
    restart: unless-stopped
```

- [ ] **Step 4: Create `README.md`**

```markdown
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

## Data
- `data/collection.csv` — ManaBox export; source of truth for what you own.
- `data/prices.json` — Scryfall price cache (24h TTL, `previous` snapshot for ± since refresh).
```

- [ ] **Step 5: Build and run the container**

Run:
```bash
cd apps/collection-visualizer
mkdir -p data && cp ~/Desktop/ManaBox_Collection.csv data/collection.csv
docker compose up -d --build
```
Expected: `docker compose ps` shows the container up; `http://localhost:8080` renders the grid. Then `docker compose down`.

- [ ] **Step 6: Commit**

```bash
git add apps/collection-visualizer/Dockerfile apps/collection-visualizer/docker-compose.yml apps/collection-visualizer/.dockerignore apps/collection-visualizer/README.md
git commit -m "add Docker build, compose, and README for NAS deploy"
```

---

### Task 15: Full test run + PR

- [ ] **Step 1: Run the whole suite**

Run: `cd apps/collection-visualizer && bun test`
Expected: all suites pass (csv, scryfall, price-cache, grouping, pricing, filters, search-query, sort, view, format, server/collection).

- [ ] **Step 2: Type-check**

Run: `bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Open a PR**

```bash
git push -u origin feat/collection-visualizer
gh pr create --assignee @me --title "Collection visualizer (Phase 1)" --body "Read-only MTG collection viewer: virtualized grid, Scryfall prices (USD/EUR), search/filter/sort, daily+manual refresh, CSV upload, Docker deploy. Spec: docs/superpowers/specs/2026-07-14-collection-visualizer-design.md"
```

---

## Deviations from the spec (deliberate — confirm before/after build)

Two spec §8 items are intentionally simplified in this plan to keep Phase 1 lean. Both are
small, additive follow-ups if wanted:

1. **View state is component-local (`useState`), not URL search params.** The spec suggested URL
   params so a filtered view is shareable and survives reload. For a single-user LAN tool this is
   marginal; if desired, migrate `query/filters/sort/currency/baseline` into TanStack Router
   `validateSearch` and `navigate({ search })` — one focused change to `routes/index.tsx`.
2. **No card detail popover.** The spec mentioned a click-to-open larger image + `breakdown`
   view. Tiles already carry `breakdown`; adding a modal is a self-contained component. Deferred.

## Notes for the implementer

- **Data seeding:** the app reads `data/collection.csv`. Tasks 10–13 assume you copied the sample export there. There is no bundled fixture CSV in git (`/data` is git-ignored).
- **First load is slow-ish:** the initial `getCollection` fetches ~15 batched Scryfall requests (~2s) to populate the cache; subsequent loads are instant until the 24h TTL lapses.
- **Scryfall etiquette:** the client throttles to ~10 req/s and retries on 429 — do not remove the throttle.
- **`routeTree.gen.ts`** is generated; never edit it by hand and keep it git-ignored.
