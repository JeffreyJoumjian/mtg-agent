# Deck Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the parked deck workbench with a visual, chat-driven Commander deck builder whose store is one `deck.json` per deck, whose every edit is a staged change set with stat deltas, and whose history can be browsed and restored.

**Architecture:** The repo-root `scripts/lib/` gains a dependency-free deck library (model, change sets, stats, store, legacy parser, migration) that both the CLI and the app import. The app (`apps/collection-visualizer`) gets a fresh `src/builder/` feature folder: server functions over the store, a per-deck Agent SDK session with blocking UI tools, and the board / rail / staged-panel / chat / history UI. Markdown deck files are migrated once and deleted.

**Tech Stack:** Bun 1.3.14, TypeScript, TanStack Start + Router + Query, React 19, Tailwind 4, shadcn/radix, Jotai, Recharts, `@anthropic-ai/claude-agent-sdk` 0.3.x, zod (app only — the root stays zero-dependency), `react-resizable-panels`, Playwright (verification only).

**Spec:** `docs/superpowers/specs/2026-09-23-deck-builder-design.md`

## Global Constraints

- Bun is the only runtime; never `npm`/`pnpm`/`yarn`. Root `package.json` has **no** dependencies — root library code uses only `node:*` and Bun built-ins (no zod at the root).
- Root tests run with `bun test test/`; app tests with `bun test` inside `apps/collection-visualizer`. Both must be green before the work is reported done. If a run prints "0 pass, 0 fail", check `bun --version` against `mise.toml` (1.3.14).
- No git commits by the executor: the user commits by hand. Never run `git add`/`git commit`. Never modify `node_modules/`.
- The dev server is the user's; the only server the build may start is the bounded preview in Task 23, which it stops in the same step.
- React: never destructure props in the signature; `useQuery`/`useMutation` object form only; no native `title` tooltips; module-level mutable state is forbidden (query cache or Jotai atoms are the sources of truth).
- TypeScript: JSDoc for types/properties; plain objects and arrays, not `Map`/`Set`, unless order-with-object-keys or membership perf genuinely matters (the existing `indexByDeckName` `Map` is left as is); no `await` inside a larger expression; blank line between a declaration and the statement consuming it; braces on conditionals except tidy one-line parallel branches; prefer `!arr.some(x => !p(x))` over `every`.
- Card names in `deck.json` are Scryfall canonical names (front face for double-faced cards). Every path that inserts a name canonicalises through `resolveNames` first.
- Nothing ever persists a negative card lookup.
- `data/card-cache.json` at the repo root is the only card cache.
- Agent sessions set `MTG_AGENT_EMBEDDED=1` and the repo `SessionEnd` hook exits early when it is set.

## Review Focus

1. **A card name in `deck.json` that Scryfall spells differently** (curly apostrophe, accent, a renamed card): the board must show an "unresolved" tile with a Find action, never drop the card, and stats must count it under `flags.unresolved`. Test: Task 4 (`unresolved` flag) and Task 16 (unresolved tile renders).
2. **Basic lands and quantities:** `7 Forest` must survive parse → apply → format, `add Forest` on a list that has Forests must bump the quantity, `remove Forest` must remove all copies, `qty Forest 6` must set it. Test: Task 3.
3. **Two applies racing on the same list** (the terminal `deck:edit` and the app): the second must fail its precondition check against the on-disk list and not overwrite. Test: Task 6 (conflict) and Task 12 (409 path).
4. **The user types while a blocking tool is pending:** the tool must resolve as dismissed with the typed text as the reason, and the text must still reach the agent as the next message. Test: Task 13 (session unit test with a fake query).
5. **The embedded agent's session ending must not kill the app's Vite server.** Test: Task 13 (hook guard test runs the hook command with the env var set and asserts no `pkill` runs — the hook is a shell line, so the test is a shell invocation with `pkill` shadowed by a function that fails the test if called).

---

## File structure

**Repo root (dependency-free library + CLIs)**

| File | Responsibility |
|---|---|
| `scripts/lib/paths.ts` | (modify) resolve `REPO_ROOT` without `import.meta.dir` |
| `scripts/lib/scryfall.ts` | (modify) `CardSummary` + `id`, `oracleId`, `images`, `faces` |
| `scripts/lib/card-cache.ts` | (modify) `resolveNames`, name normalisation, no negative entries |
| `scripts/lib/deck-model.ts` | (new) `Deck` types, `validateDeck`, `parseDeck`, `formatDeck`, list helpers |
| `scripts/lib/change-set.ts` | (new) `ChangeSet` types, `applyChangeSet`, `diffLists` |
| `scripts/lib/deck-stats.ts` | (new) `computeStats`, `diffStats` |
| `scripts/lib/legacy-deck.ts` | (new) parse `DECK*.md` / `STATUS.md` into model pieces |
| `scripts/lib/deck-store.ts` | (new) read/write/apply/history/versions/moxfield on disk |
| `scripts/lib/moxfield.ts` | (modify) `toMoxfield(list, printings)`; printings from `CardMeta` |
| `scripts/deck-migrate.ts` | (new) one-time Markdown → `deck.json` |
| `scripts/deck.ts` | (new) `deck:show`, `deck:edit`, `deck:meta` subcommands |
| `scripts/deck-moxfield.ts`, `card.ts`, `edhrec.ts`, `deck-pdf.ts`, `carddata.ts`, `deckcheck.ts`, `set-scan.ts`, `lib/deck-research.ts` | (modify) read `deck.json` |
| `test/deck-model.test.ts`, `change-set.test.ts`, `deck-stats.test.ts`, `legacy-deck.test.ts`, `deck-store.test.ts`, `deck-migrate.test.ts`, `card-cache.test.ts` | (new) |

**App (`apps/collection-visualizer/src/builder/`)**

| File | Responsibility |
|---|---|
| `model/types.ts` | re-exports of root types + zod schemas for tool inputs |
| `model/cards.ts` | `CardInfo` projection + `cardImage(card, size)` helper (pure) |
| `server/store.ts` | server-only wrappers over root `deck-store` (path resolution, card resolution) |
| `server/cards.ts` | `resolveCards(names)` via root card cache; `searchCards` |
| `server/watcher.ts` | `fs.watch` on `decks/` → per-slug listeners, debounce, own-write hash filter |
| `server/agent/gate.ts` | policy table + `classifyToolUse` |
| `server/agent/tools.ts` | `deck-ui` MCP server: `show_cards`, `propose_changes`, `pick_cards`, `set_card_meta` |
| `server/agent/session.ts` | `DeckSession`: query(), event translation, pending requests |
| `server/agent/manager.ts` | singleton registry across HMR |
| `server/agent/system-prompt.ts` | append block builder |
| `server/agent/transcripts.ts` | JSONL persistence + session ids |
| `api/decks.ts`, `api/changes.ts`, `api/history.ts`, `api/search.ts`, `api/chat.ts` | `createServerFn` endpoints |
| `chat/events.ts` | `TranscriptEvent`, `WireEvent`, `ChatItem`, reducer |
| `chat/use-deck-chat.ts` | SSE consumer hook |
| `chat/ChatPane.tsx`, `Composer.tsx`, `blocks/*.tsx` | chat UI |
| `state/atoms.ts` | staged change set, preview mode, selection, model/effort per deck |
| `state/queries.ts` | query keys + `useDeck`, `useHistory`, `useVersion` |
| `board/DeckBoard.tsx`, `DeckCard.tsx`, `CardPopover.tsx`, `SearchAdd.tsx`, `TableView.tsx`, `CurveView.tsx` | board |
| `rail/StatsRail.tsx`, `CurveChart.tsx`, `PipsChart.tsx` | stats rail |
| `changes/StagedPanel.tsx`, `DiffColumns.tsx`, `DeltaTable.tsx`, `ChangeSetCard.tsx` | change sets |
| `history/HistoryTimeline.tsx`, `VersionView.tsx` | history |
| `src/routes/index.tsx` (decks), `collection.tsx` (old index), `decks.$slug.tsx`, `decks_.$slug.history.tsx`, `api.decks.$slug.stream.ts` | routes |
| `scripts/agent-smoke.ts` (app) | headless SDK smoke |

---

## Phase A — root deck library

### Task 1: Card data foundation (paths, `CardSummary` extension, `resolveNames`)

**Files:**
- Modify: `scripts/lib/paths.ts`
- Modify: `scripts/lib/scryfall.ts` (`CardSummary`, `toSummary`)
- Modify: `scripts/lib/card-cache.ts`
- Test: `test/card-cache.test.ts`, `test/scryfall.test.ts` (new)

**Interfaces:**
- Produces: `CardSummary` gains `id: string`, `oracleId: string`, `images: CardImages`, `faces: CardFace[]`.
  ```ts
  export interface CardImages { small: string | null; normal: string | null; artCrop: string | null }
  export interface CardFace { name: string; manaCost: string; typeLine: string; oracleText: string; images: CardImages }
  ```
- Produces: `normalizeCardName(name: string): string` (in `card-cache.ts`, exported) — NFC, `’‘` → `'`, `“”` → `"`, collapse whitespace, trim. Matching key is `normalizeCardName(x).toLowerCase()`.
- Produces: `resolveNames(names: string[], now?: number): Promise<{ found: Record<string, CardSummary>; unresolved: string[] }>` keyed by the **requested** name; DFC front-face requests resolve to the full card.

- [ ] **Step 1: Write the failing tests**

`test/scryfall.test.ts`:
```ts
import { test, expect } from "bun:test";
import { toSummary } from "../scripts/lib/scryfall.ts";

test("toSummary carries id, oracleId, images and faces for a DFC", () => {
  const raw = {
    id: "abc", oracle_id: "o1", name: "Valakut Awakening // Valakut Stoneforge", layout: "modal_dfc",
    cmc: 3, color_identity: ["R"], legalities: { commander: "legal" }, prices: { usd: "1.20" },
    card_faces: [
      { name: "Valakut Awakening", mana_cost: "{2}{R}", type_line: "Instant", oracle_text: "Put…", image_uris: { small: "s1", normal: "n1", art_crop: "a1" } },
      { name: "Valakut Stoneforge", mana_cost: "", type_line: "Land", oracle_text: "…", image_uris: { small: "s2", normal: "n2", art_crop: "a2" } },
    ],
  };
  const s = toSummary(raw);
  expect(s.id).toEqual("abc");
  expect(s.oracleId).toEqual("o1");
  expect(s.images).toEqual({ small: "s1", normal: "n1", artCrop: "a1" });
  expect(s.faces.map((f) => f.name)).toEqual(["Valakut Awakening", "Valakut Stoneforge"]);
  expect(s.imageUri).toEqual("n1");
});

test("toSummary on a single-faced card has one face and top-level images", () => {
  const s = toSummary({ id: "x", oracle_id: "y", name: "Sol Ring", mana_cost: "{1}", type_line: "Artifact", oracle_text: "…", image_uris: { small: "s", normal: "n", art_crop: "a" }, legalities: {}, prices: {} });
  expect(s.faces).toEqual([{ name: "Sol Ring", manaCost: "{1}", typeLine: "Artifact", oracleText: "…", images: { small: "s", normal: "n", artCrop: "a" } }]);
});
```

`test/card-cache.test.ts` (unit-tests the pure parts; the network path is exercised by Task 8's real migration run):
```ts
import { test, expect } from "bun:test";
import { normalizeCardName, matchRequested } from "../scripts/lib/card-cache.ts";

test("normalizeCardName straightens quotes, strips odd whitespace and keeps accents", () => {
  expect(normalizeCardName("Witch’s  Mark ")).toEqual("Witch's Mark");
  expect(normalizeCardName("Bartolomé del Presidio")).toEqual("Bartolomé del Presidio");
});

test("matchRequested pairs requested names with found cards by normalised key, front face included", () => {
  const found = [
    { name: "Witch's Mark" }, { name: "Valakut Awakening // Valakut Stoneforge" }, { name: "Bartolomé del Presidio" },
  ] as any[];
  const out = matchRequested(["Witch’s Mark", "valakut awakening", "Bartolome del Presidio", "Nope"], found);
  expect(Object.keys(out.found)).toEqual(["Witch’s Mark", "valakut awakening", "Bartolome del Presidio"]);
  expect(out.found["valakut awakening"].name).toEqual("Valakut Awakening // Valakut Stoneforge");
  expect(out.unresolved).toEqual(["Nope"]);
});
```
(`matchRequested` strips accents for matching — `Bartolome` must match `Bartolomé` — via `normalize("NFD").replace(/\p{M}/gu, "")` on the key only.)

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test test/scryfall.test.ts test/card-cache.test.ts`
Expected: FAIL — `matchRequested`/`normalizeCardName` not exported; `id` undefined.

- [ ] **Step 3: Implement**

`scripts/lib/paths.ts` — replace the first lines with:
```ts
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Repo root, resolved from this file's URL so it works under Bun and under Vite's SSR runtime. */
export const REPO_ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
```
(keep every other export unchanged).

`scripts/lib/scryfall.ts` — add the interfaces above `CardSummary`, add the four fields to `CardSummary` (JSDoc each), and in `toSummary`:
```ts
const images = (src: any): CardImages => ({
  small: src?.image_uris?.small ?? null,
  normal: src?.image_uris?.normal ?? null,
  artCrop: src?.image_uris?.art_crop ?? null,
});
const faceList: CardFace[] = faces.length > 0
  ? faces.map((f: any) => ({ name: f.name ?? card.name, manaCost: f.mana_cost ?? "", typeLine: f.type_line ?? "", oracleText: f.oracle_text ?? "", images: images(f) }))
  : [{ name: card.name, manaCost: card.mana_cost ?? "", typeLine: card.type_line ?? "", oracleText: card.oracle_text ?? "", images: images(card) }];
const topImages = card.image_uris ? images(card) : faceList[0].images;
// …in the returned object:
id: card.id ?? "", oracleId: card.oracle_id ?? "", images: topImages, faces: faceList,
imageUri: topImages.normal,
```

`scripts/lib/card-cache.ts` — add:
```ts
/** Canonical spelling for matching and storage: NFC, straight quotes, single spaces. Accents kept. */
export function normalizeCardName(name: string): string {
  return name.normalize("NFC").replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}

/** Match key: normalised, lower-cased, accents stripped — `Bartolome` finds `Bartolomé`. */
export function matchKey(name: string): string {
  return normalizeCardName(name).toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export interface ResolveResult {
  /** Keyed by the name as requested, so callers never have to re-derive the key. */
  found: Record<string, CardSummary>;
  unresolved: string[];
}

/** Pair requested names with fetched cards. Full name and front face both match. Pure. */
export function matchRequested(requested: string[], cards: CardSummary[]): ResolveResult {
  const byKey: Record<string, CardSummary> = {};
  for (const card of cards) {
    byKey[matchKey(card.name)] = card;
    const front = card.name.split(" // ")[0];
    if (front !== card.name && !(matchKey(front) in byKey)) byKey[matchKey(front)] = card;
  }

  const found: Record<string, CardSummary> = {};
  const unresolved: string[] = [];
  for (const name of requested) {
    const hit = byKey[matchKey(name)];
    if (hit) found[name] = hit; else unresolved.push(name);
  }
  return { found, unresolved };
}

/** Resolve names through the cache, then one batched fetch for the misses, then a fuzzy
 *  single lookup for anything still missing. Never stores a negative result. */
export async function resolveNames(names: string[], now = Date.now()): Promise<ResolveResult> {
  const unique = [...new Set(names.map(normalizeCardName).filter(Boolean))];
  const cache = await load();
  const cached: CardSummary[] = [];
  const misses: string[] = [];

  for (const name of unique) {
    const hit = cache[key(name)] ?? cache[key(name.split(" // ")[0])];
    if (hit && isFresh(hit, now) && hit.summary.id) cached.push(hit.summary); else misses.push(name);
  }

  const fetched: CardSummary[] = [];
  if (misses.length > 0) {
    const batch = await fetchCollection(misses.map((n) => n.split(" // ")[0]));
    fetched.push(...batch.found);

    const stillMissing = matchRequested(misses, batch.found).unresolved;
    for (const name of stillMissing) {
      try {
        const fuzzy = await fetchCardByName(name);
        fetched.push(fuzzy);
      } catch {
        // Genuinely unknown, or Scryfall is down: report it, store nothing.
      }
    }
    for (const summary of fetched) {
      cache[key(summary.name)] = { summary, fetchedAt: now };
    }
    await save(cache);
  }

  const result = matchRequested(names.map(normalizeCardName), [...cached, ...fetched]);
  // Re-key by the caller's original spelling.
  const found: Record<string, CardSummary> = {};
  const unresolved: string[] = [];
  for (const original of names) {
    const hit = result.found[normalizeCardName(original)];
    if (hit) found[original] = hit; else unresolved.push(original);
  }
  return { found, unresolved };
}
```
The `hit.summary.id` check forces a re-fetch of entries written before this task (they lack `id`).

- [ ] **Step 4: Run tests**

Run: `bun test test/`
Expected: all PASS (existing tests untouched).

### Task 2: Deck model — types, validation, parse, format, list helpers

**Files:**
- Create: `scripts/lib/deck-model.ts`
- Test: `test/deck-model.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type CardStatus = "OWNED" | "BUY" | "PROXY" | "CONSIDERING";
  export const CARD_STATUSES: CardStatus[] = ["OWNED", "BUY", "PROXY", "CONSIDERING"];
  export interface ListEntry { name: string; qty: number; note?: string }
  export interface ListSection { name: string; cards: ListEntry[] }
  export interface DeckList { label: string; kind: "deck" | "pool"; bracket?: number; sections: ListSection[] }
  export interface Printing { set: string; collectorNumber: string; foil?: boolean }
  export interface CardMeta { status?: CardStatus; tags?: string[]; note?: string; printing?: Printing }
  export interface Deck { schema: 1; name: string; format: "commander"; description?: string; lists: Record<string, DeckList>; cards: Record<string, CardMeta> }
  export const MAIN_LIST = "main";
  export const DEFAULT_SECTIONS = ["Commander", "Lands", "Ramp", "Card Draw", "Removal", "Board Wipes", "Theme / Synergy", "Win Conditions"];
  export const SUGGESTED_TAGS = ["ramp","fast-mana","draw","removal","wipe","interaction","protection","tutor","recursion","drain","lifegain","sac-outlet","token","aristocrat","anthem","evasion","engine","combo-piece","wincon","finisher","utility-land","stax","synergy"];
  export class DeckParseError extends Error { errors: string[] }
  export function validateDeck(raw: unknown): { ok: true; deck: Deck } | { ok: false; errors: string[] };
  export function parseDeck(text: string): Deck;            // throws DeckParseError
  export function formatDeck(deck: Deck): string;           // stable key order, card entries one per line, cards sorted
  export function normalizeList(list: DeckList): DeckList;  // sort entries alphabetically per section except "Commander"; drop qty<=0
  export function emptyDeck(name: string): Deck;
  export function listEntries(list: DeckList): (ListEntry & { section: string })[];
  export function listNames(list: DeckList): string[];       // unique, in list order
  export function listSize(list: DeckList): number;          // sum of qty
  export function commandersOf(list: DeckList): string[];
  export function findEntry(list: DeckList, name: string): { section: string; entry: ListEntry } | null;  // case-insensitive
  export function isBasicLand(name: string): boolean;        // Plains/Island/Swamp/Mountain/Forest/Wastes + Snow-Covered variants
  export function listIdFromLabel(label: string): string;    // "Bracket 4" -> "bracket-4"
  ```

- [ ] **Step 1: Write the failing tests**

```ts
import { test, expect } from "bun:test";
import { emptyDeck, formatDeck, parseDeck, validateDeck, normalizeList, listSize, commandersOf, findEntry, isBasicLand, MAIN_LIST } from "../scripts/lib/deck-model.ts";

const sample = () => {
  const deck = emptyDeck("Test — Deck");
  deck.lists[MAIN_LIST].sections = [
    { name: "Commander", cards: [{ name: "Chatterfang, Squirrel General", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 7 }, { name: "Bojuka Bog", qty: 1 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1, note: "obviously" }] },
  ];
  deck.cards["Sol Ring"] = { status: "OWNED", tags: ["ramp", "fast-mana"] };
  return deck;
};

test("formatDeck puts each card entry on one line and round-trips through parseDeck", () => {
  const text = formatDeck(sample());
  expect(text).toContain('{ "name": "Forest", "qty": 7 }');
  expect(text).toContain('{ "name": "Sol Ring", "qty": 1, "note": "obviously" }');
  expect(parseDeck(text)).toEqual(normalizeList(sample().lists.main) && { ...sample(), lists: { main: normalizeList(sample().lists.main) } });
});

test("formatDeck sorts cards within a section, commander section kept in order, cards map by name", () => {
  const deck = sample();
  deck.cards["Bojuka Bog"] = { status: "PROXY" };
  const text = formatDeck(deck);
  expect(text.indexOf('"Bojuka Bog", "qty": 1')).toBeLessThan(text.indexOf('"Forest", "qty": 7'));
  expect(text.indexOf('"Bojuka Bog": {')).toBeLessThan(text.indexOf('"Sol Ring": {'));
});

test("validateDeck reports every problem instead of the first", () => {
  const res = validateDeck({ schema: 2, name: "", lists: { main: { label: "Main", kind: "weird", sections: [{ name: "Lands", cards: [{ name: "", qty: 0 }] }] } }, cards: {} });
  expect(res.ok).toEqual(false);
  if (!res.ok) {
    expect(res.errors.some((e) => e.includes("schema"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("kind"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("qty"))).toEqual(true);
  }
});

test("parseDeck throws DeckParseError with the errors on bad JSON and on bad shape", () => {
  expect(() => parseDeck("{ not json")).toThrow();
  expect(() => parseDeck('{"schema":1}')).toThrow(/lists/);
});

test("list helpers", () => {
  const list = sample().lists.main;
  expect(listSize(list)).toEqual(10);
  expect(commandersOf(list)).toEqual(["Chatterfang, Squirrel General"]);
  expect(findEntry(list, "sol ring")?.section).toEqual("Ramp");
  expect(findEntry(list, "Nope")).toEqual(null);
  expect(isBasicLand("Snow-Covered Forest")).toEqual(true);
  expect(isBasicLand("Forest")).toEqual(true);
  expect(isBasicLand("Gaea's Cradle")).toEqual(false);
});
```
(Fix the first test's tautology when writing: assert `parseDeck(text)` equals the sample with its main list normalised.)

- [ ] **Step 2: Run to verify failure** — `bun test test/deck-model.test.ts` → module not found.

- [ ] **Step 3: Implement `scripts/lib/deck-model.ts`**

Key parts (write the whole file; JSDoc each type):
```ts
export function validateDeck(raw: unknown): { ok: true; deck: Deck } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const d = raw as any;
  if (!d || typeof d !== "object") return { ok: false, errors: ["deck must be an object"] };
  if (d.schema !== 1) errors.push(`schema must be 1 (got ${JSON.stringify(d.schema)})`);
  if (typeof d.name !== "string" || !d.name.trim()) errors.push("name must be a non-empty string");
  if (d.format !== undefined && d.format !== "commander") errors.push("format must be \"commander\"");
  if (!d.lists || typeof d.lists !== "object") errors.push("lists must be an object");
  else {
    for (const [id, list] of Object.entries<any>(d.lists)) {
      if (!/^[a-z0-9-]+$/.test(id)) errors.push(`list id "${id}" must be kebab-case`);
      if (typeof list?.label !== "string") errors.push(`lists.${id}.label must be a string`);
      if (list?.kind !== "deck" && list?.kind !== "pool") errors.push(`lists.${id}.kind must be "deck" or "pool"`);
      if (!Array.isArray(list?.sections)) { errors.push(`lists.${id}.sections must be an array`); continue; }
      list.sections.forEach((s: any, i: number) => {
        if (typeof s?.name !== "string" || !s.name) errors.push(`lists.${id}.sections[${i}].name must be a non-empty string`);
        if (!Array.isArray(s?.cards)) { errors.push(`lists.${id}.sections[${i}].cards must be an array`); return; }
        s.cards.forEach((c: any, j: number) => {
          if (typeof c?.name !== "string" || !c.name.trim()) errors.push(`lists.${id}.sections[${i}].cards[${j}].name must be a non-empty string`);
          if (!Number.isInteger(c?.qty) || c.qty < 1) errors.push(`lists.${id}.sections[${i}].cards[${j}].qty must be a positive integer`);
        });
      });
    }
  }
  if (d.cards !== undefined && (typeof d.cards !== "object" || Array.isArray(d.cards))) errors.push("cards must be an object keyed by card name");
  else if (d.cards) {
    for (const [name, meta] of Object.entries<any>(d.cards)) {
      if (meta?.status !== undefined && !CARD_STATUSES.includes(meta.status)) errors.push(`cards["${name}"].status must be one of ${CARD_STATUSES.join(", ")}`);
      if (meta?.tags !== undefined && (!Array.isArray(meta.tags) || meta.tags.some((t: unknown) => typeof t !== "string"))) errors.push(`cards["${name}"].tags must be an array of strings`);
    }
  }
  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, deck: { schema: 1, name: d.name, format: "commander", ...(d.description ? { description: d.description } : {}), lists: d.lists, cards: d.cards ?? {} } };
}
```
Formatter: build the output by hand rather than post-processing `JSON.stringify`:
```ts
const j = (v: unknown) => JSON.stringify(v);
export function formatDeck(deck: Deck): string {
  const out: string[] = ["{", `  "schema": 1,`, `  "name": ${j(deck.name)},`, `  "format": "commander",`];
  if (deck.description) out.push(`  "description": ${j(deck.description)},`);
  out.push(`  "lists": {`);
  const listIds = Object.keys(deck.lists);
  listIds.forEach((id, li) => {
    const list = normalizeList(deck.lists[id]);
    out.push(`    ${j(id)}: {`, `      "label": ${j(list.label)},`, `      "kind": ${j(list.kind)},`);
    if (list.bracket !== undefined) out.push(`      "bracket": ${list.bracket},`);
    out.push(`      "sections": [`);
    list.sections.forEach((s, si) => {
      out.push(`        {`, `          "name": ${j(s.name)},`, `          "cards": [`);
      s.cards.forEach((c, ci) => {
        const fields = [`"name": ${j(c.name)}`, `"qty": ${c.qty}`, ...(c.note ? [`"note": ${j(c.note)}`] : [])];
        out.push(`            { ${fields.join(", ")} }${ci < s.cards.length - 1 ? "," : ""}`);
      });
      out.push(`          ]`, `        }${si < list.sections.length - 1 ? "," : ""}`);
    });
    out.push(`      ]`, `    }${li < listIds.length - 1 ? "," : ""}`);
  });
  out.push(`  },`, `  "cards": {`);
  const names = Object.keys(deck.cards).sort((a, b) => a.localeCompare(b));
  names.forEach((name, ni) => {
    const m = deck.cards[name];
    const fields: string[] = [];
    if (m.status) fields.push(`"status": ${j(m.status)}`);
    if (m.tags && m.tags.length > 0) fields.push(`"tags": ${j(m.tags)}`);
    if (m.note) fields.push(`"note": ${j(m.note)}`);
    if (m.printing) fields.push(`"printing": ${j(m.printing)}`);
    out.push(`    ${j(name)}: { ${fields.join(", ")} }${ni < names.length - 1 ? "," : ""}`);
  });
  out.push(`  }`, `}`);
  return out.join("\n") + "\n";
}
```
`normalizeList` sorts each non-Commander section's cards with `localeCompare`, filters `qty < 1`, and returns a new object. `emptyDeck(name)` returns `{ schema: 1, name, format: "commander", lists: { main: { label: "Main", kind: "deck", sections: DEFAULT_SECTIONS.map((n) => ({ name: n, cards: [] })) } }, cards: {} }`.

- [ ] **Step 4: Run tests** — `bun test test/deck-model.test.ts` → PASS.

### Task 3: Change sets — apply and diff

**Files:**
- Create: `scripts/lib/change-set.ts`
- Test: `test/change-set.test.ts`

**Interfaces:**
```ts
export type ChangeEntry =
  | { op: "add"; name: string; section: string; qty?: number; replaces?: string; why?: string }
  | { op: "remove"; name: string; why?: string }
  | { op: "move"; name: string; section: string }
  | { op: "qty"; name: string; qty: number };
export interface ChangeSet { listId: string; label: string; rationale?: string; author: "user" | "agent"; entries: ChangeEntry[] }
export interface ApplyFailure { entry: ChangeEntry; reason: string }
export type ApplyResult = { ok: true; list: DeckList } | { ok: false; failures: ApplyFailure[] };
export function applyChangeSet(list: DeckList, entries: ChangeEntry[]): ApplyResult;
export function diffLists(from: DeckList, to: DeckList): ChangeEntry[];   // entries such that applyChangeSet(from, entries).list ≅ to
export function summarizeEntries(entries: ChangeEntry[]): { added: number; removed: number; moved: number; requantified: number };
```
Semantics: `add` of an existing name: basic land or explicit `qty` → increment by `qty ?? 1`; otherwise failure `"already in the list (section X)"`. `add` to a missing section creates it at the end. `remove` removes all copies; failure if absent. `move` fails if absent or already in that section. `qty` fails if absent or `qty < 1`. All failures are collected across entries (each entry is checked against the list as modified by the preceding entries); on any failure nothing is returned.

- [ ] **Step 1: Write the failing tests**

```ts
import { test, expect } from "bun:test";
import { applyChangeSet, diffLists, summarizeEntries } from "../scripts/lib/change-set.ts";
import type { DeckList } from "../scripts/lib/deck-model.ts";

const list = (): DeckList => ({ label: "Main", kind: "deck", sections: [
  { name: "Commander", cards: [{ name: "Chatterfang, Squirrel General", qty: 1 }] },
  { name: "Lands", cards: [{ name: "Forest", qty: 7 }, { name: "Bojuka Bog", qty: 1 }] },
  { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }] },
]});

test("add, remove, move, qty happy path", () => {
  const res = applyChangeSet(list(), [
    { op: "add", name: "Skullclamp", section: "Card Draw" },
    { op: "remove", name: "Sol Ring" },
    { op: "move", name: "Bojuka Bog", section: "Utility" },
    { op: "qty", name: "Forest", qty: 6 },
  ]);
  expect(res.ok).toEqual(true);
  if (res.ok) {
    expect(res.list.sections.map((s) => s.name)).toEqual(["Commander", "Lands", "Ramp", "Card Draw", "Utility"]);
    expect(res.list.sections[1].cards).toEqual([{ name: "Forest", qty: 6 }]);
    expect(res.list.sections[2].cards).toEqual([]);
    expect(res.list.sections[3].cards).toEqual([{ name: "Skullclamp", qty: 1 }]);
  }
});

test("adding a basic land that is present bumps the quantity; adding a nonbasic that is present fails", () => {
  const ok = applyChangeSet(list(), [{ op: "add", name: "Forest", section: "Lands" }]);
  expect(ok.ok && ok.list.sections[1].cards[0].qty).toEqual(8);
  const bad = applyChangeSet(list(), [{ op: "add", name: "Sol Ring", section: "Ramp" }]);
  expect(bad.ok).toEqual(false);
  if (!bad.ok) expect(bad.failures[0].reason).toContain("already");
});

test("every failure is reported and nothing is applied", () => {
  const res = applyChangeSet(list(), [
    { op: "remove", name: "Nope" }, { op: "move", name: "Sol Ring", section: "Ramp" }, { op: "qty", name: "Forest", qty: 0 },
  ]);
  expect(res.ok).toEqual(false);
  if (!res.ok) expect(res.failures.length).toEqual(3);
});

test("diffLists produces entries that apply back to the target", () => {
  const from = list();
  const to: DeckList = { ...list(), sections: [
    { name: "Commander", cards: [{ name: "Chatterfang, Squirrel General", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 6 }] },
    { name: "Utility", cards: [{ name: "Bojuka Bog", qty: 1 }] },
    { name: "Card Draw", cards: [{ name: "Skullclamp", qty: 1 }] },
  ]};
  const entries = diffLists(from, to);
  expect(summarizeEntries(entries)).toEqual({ added: 1, removed: 1, moved: 1, requantified: 1 });
  const res = applyChangeSet(from, entries);
  expect(res.ok).toEqual(true);
  if (res.ok) {
    const flat = (l: DeckList) => l.sections.flatMap((s) => s.cards.map((c) => `${s.name}|${c.name}|${c.qty}`)).sort();
    expect(flat(res.list)).toEqual(flat(to));
  }
});
```

- [ ] **Step 2: Run to verify failure.** `bun test test/change-set.test.ts`

- [ ] **Step 3: Implement** — deep-clone the list, walk entries, collect failures. `diffLists`: index both lists by lower-cased name → `{ section, qty }`; for names only in `from` → `remove`; only in `to` → `add` with section and qty (qty omitted when 1); in both with different section → `move`; in both with different qty → `qty`. Order: removes, moves, qtys, adds.

- [ ] **Step 4: Run tests** → PASS.

### Task 4: Stats engine

**Files:**
- Create: `scripts/lib/deck-stats.ts`
- Test: `test/deck-stats.test.ts`

**Interfaces:**
```ts
export type Color = "W" | "U" | "B" | "R" | "G";
export const COLORS: Color[] = ["W","U","B","R","G"];
/** The slice of CardSummary the stats need — the app sends exactly this over the wire. */
export interface CardInfo { name: string; cmc: number; manaCost: string; typeLine: string; colors: string[]; colorIdentity: string[]; producedMana: string[]; gameChanger: boolean; usd: number | null; commanderLegal: string }
export interface DeckStats {
  size: { total: number; target: number | null; lands: number; nonland: number; commanders: number };
  curve: { avgMv: number; avgMvNonZero: number; histogram: { mv: string; creature: number; noncreature: number }[] }; // mv "0".."6","7+"
  types: { creature: number; instant: number; sorcery: number; artifact: number; enchantment: number; planeswalker: number; battle: number; land: number };
  color: { identity: Color[]; pips: Record<Color, number>; sources: Record<Color, number> };
  roles: { sections: Record<string, number>; tags: Record<string, number> };
  flags: { gameChangers: string[]; offIdentity: string[]; illegal: string[]; unresolved: string[]; duplicates: string[] };
  money: { total: number; byStatus: Record<CardStatus, { count: number; usd: number }> };
}
export interface StatChange { group: "size"|"curve"|"types"|"color"|"roles"|"tags"|"flags"|"money"; key: string; label: string; before: number; after: number; delta: number }
export function computeStats(list: DeckList, cards: Record<string, CardInfo | undefined>, meta: Record<string, CardMeta>, identity?: Color[]): DeckStats;
export function diffStats(before: DeckStats, after: DeckStats): StatChange[];   // changed numeric rows only, in display order
export function identityOf(list: DeckList, cards: Record<string, CardInfo | undefined>): Color[]; // union of commanders' identities, WUBRG order
```
Rules: `cards` is keyed by the list's names (case-sensitive as written); a missing card → `flags.unresolved`, counted in `size.total` and `roles`, excluded from curve/types/colour/money. Lands: `typeLine` contains "Land" (front face for DFCs — `typeLine` before " // "). Pips: count `{W}`… symbols in `manaCost` of nonland cards including hybrid halves (`{W/U}` counts one each for W and U) and phyrexian (`{W/P}` counts W); `qty` multiplies. Sources: any card whose `producedMana` includes the colour, times qty. Duplicates: non-basic with qty > 1. Money: `usd * qty`, grouped by `meta[name].status ?? "PROXY"`. GC list from `gameChanger`. `commanders` = size of the Commander section. `target` = 100 for `kind: "deck"`, null for pool.

- [ ] **Step 1: Write the failing tests** with a 6-card fixture (commander {B}{G}, Forest ×2 produces G, Command Tower produces WUBRG, Sol Ring `{1}` artifact produces C, Skullclamp `{1}` artifact, Blood Artist `{1}{B}` creature usd 1.5 with status OWNED, "Unknown Card" absent from `cards`): assert `size` `{ total: 7, target: 100, lands: 3, nonland: 4, commanders: 1 }` (commander counts as nonland), `curve.avgMv` = (2+1+1+2)/4 = 1.5, histogram `mv "1"` = creature 0 / noncreature 2, `types.creature` = 2, `color.pips` `{ B: 2, G: 1, … }`, `color.sources.G` = 3 (2 Forest + Tower), `sources.C`… (C is not a `Color`; ignore), `flags.unresolved` = `["Unknown Card"]`, `flags.gameChangers` = [], `money.byStatus.OWNED` = `{ count: 1, usd: 1.5 }`, `roles.tags.drain` = 1 when Blood Artist tagged `drain`. Then `diffStats` between the fixture and the fixture minus Blood Artist plus a second Sol Ring… (use a nonbasic duplicate to also assert `flags.duplicates`): assert the returned rows include `{ group: "tags", key: "drain", before: 1, after: 0, delta: -1 }` and `{ group: "curve", key: "avgMv", … }` and nothing for unchanged rows.

- [ ] **Step 2: Verify failure.** — **Step 3: Implement.** — **Step 4: Run** → PASS.

### Task 5: Legacy Markdown parser (DECK*.md / STATUS.md → model pieces)

**Files:**
- Create: `scripts/lib/legacy-deck.ts`
- Test: `test/legacy-deck.test.ts`

**Interfaces:**
```ts
export interface LegacyDeck { title: string; commanderLine: string | null; bracket: number | null; description: string; list: DeckList; gameChangers: string[] }
export function parseLegacyDeckMd(text: string, label: string): LegacyDeck;     // sections from "## Role (n)", "1x Name *GC*" lines via decklist.ts CARD_LINE/cleanCardName
export function parseLegacyStatusMd(text: string): Record<string, { status: CardStatus; note?: string }>;  // "1x Name — OWNED (note)"; "HAVE" -> OWNED, "CUT" -> dropped
export function variantFromFilename(file: string): { id: string; label: string };  // "DECK.md" -> {main, Main}; "DECK-B4.md" -> {b4, B4}; "DECK-KRATOS-ATREUS.md" -> {kratos-atreus, Kratos Atreus}
```
`description` = every preamble line after the title that is not the `Commander:` line, the `Bracket:`/`Total:` line, or the "Authoritative current list" blockquote pointer, joined with `\n`, blockquote markers stripped. `bracket` parsed from `Bracket: 3` or `Bracket 3 ·`.

- [ ] **Step 1: Write the failing tests**: a synthetic DECK.md with preamble prose, `## Lands (2)`, `7x Forest`, `1x Rhystic Study *GC*`, `19x Mountain`; assert sections, qty 19 parsed, `gameChangers` = ["Rhystic Study"], description text, bracket. A STATUS.md with `1x Chaos Warp — OWNED`, `1x Rift — BUY ($40) 💰proxy?`, `1x Cut Me — CUT`, `1 Gaea's Cradle — PROXY  ← Game Changer`; assert statuses and that the arrow is not in the note. Plus **the real-repo test**: for every `decks/*/DECK*.md`, `parseLegacyDeckMd` yields at least 90 cards for `kind: deck` lists and every parsed name is non-empty and does not start with a digit (this is the `19x mountain` regression guard).

- [ ] **Step 2–4** as usual.

### Task 6: Deck store — disk read/write, apply, snapshots, history, versions, Moxfield

**Files:**
- Create: `scripts/lib/deck-store.ts`
- Modify: `scripts/lib/moxfield.ts` (`toMoxfield(list: DeckList, printings)`; `printingsFromMeta(cards: Record<string, CardMeta>)`; keep `parsePrintings`/`mergePrintings`; drop `moxfieldPathFor` in favour of `moxfieldFileFor(listId)` → `MOXFIELD.txt` for `main`, `MOXFIELD-<ID upper>.txt` otherwise)
- Modify: `test/moxfield.test.ts` to the new signature
- Test: `test/deck-store.test.ts` (uses a temp dir via `opts.decksDir`)

**Interfaces:**
```ts
export interface StoreOptions { decksDir?: string; now?: () => Date; globalPrintingsPath?: string }
export class DeckFileError extends Error { slug: string; errors: string[] }
export function deckDir(slug: string, opts?: StoreOptions): string;
export async function listDeckSlugs(opts?): Promise<string[]>;                       // folders with deck.json, excluding _TEMPLATE
export async function readDeck(slug, opts?): Promise<Deck>;                          // throws DeckFileError
export async function writeDeck(slug, deck, opts?): Promise<string>;                 // returns the formatted text written (tmp + rename)
export async function createDeck(slug, name, opts?): Promise<Deck>;                  // fails if exists; creates research/ versions/ samples/
export interface HistoryEntry { id: string; at: string; listId: string; label: string; author: "user"|"agent"; rationale?: string; entries: ChangeEntry[]; snapshot: string; before: DeckStats; after: DeckStats; changes: StatChange[] }
export type ApplyOutcome = { ok: true; deck: Deck; entry: HistoryEntry; moxfield: string[] } | { ok: false; failures: ApplyFailure[] };
export async function applyToDeck(slug, cs: ChangeSet, cards: Record<string, CardInfo | undefined>, opts?): Promise<ApplyOutcome>;
export async function setCardMeta(slug, updates: { name: string; meta: Partial<CardMeta> }[], opts?): Promise<Deck>;   // merge; empty tags array deletes tags
export async function renameCard(slug, from: string, to: string, opts?): Promise<Deck>;   // in every list + cards map; used by the Find action
export async function readHistory(slug, opts?): Promise<HistoryEntry[]>;              // newest first
export interface VersionRef { file: string; takenAt: string; listId: string | null; label: string; legacy: boolean }
export async function listVersions(slug, opts?): Promise<VersionRef[]>;               // json + legacy .md, newest first
export async function readVersion(slug, file, opts?): Promise<DeckList>;
export async function regenerateMoxfield(slug, deck, opts?): Promise<string[]>;       // one file per kind:"deck" list; removes stale MOXFIELD*.txt not matching a list
export function snapshotFileName(now: Date, listId: string, label: string): string;  // "2026-09-23-1432-main-before-food-package.json" (label slugified, max 60 chars)
```
Apply algorithm: read deck → list must exist → `applyChangeSet` → on failure return failures → snapshot the **current** list to `versions/<file>` (`{ takenAt, listId, label, reason: "before " + label, list }`, `-2` suffix on collision) → `before = computeStats(current)`, `after = computeStats(new)` → replace list (normalised) → `writeDeck` → `regenerateMoxfield` → append history line → return. `readHistory` tolerates a missing file. Legacy versions: files matching `/^\d{4}-\d{2}-\d{2}-.*\.md$/`, `listId` inferred when the label starts with a known variant id, else null; `readVersion` on `.md` uses `parseLegacyDeckMd`.

- [ ] **Step 1: Write the failing tests** against `mkdtemp`: create → read equals `emptyDeck`; apply add+remove → deck.json updated, one file in `versions/` whose `list` equals the pre-apply list, `history.jsonl` has one line with `changes` containing the `size.total` row, `MOXFIELD.txt` exists with the commander first; apply with a failing entry → `ok: false`, no new snapshot, deck unchanged; conflict: read deck, apply A (remove Sol Ring), then apply B built earlier that also removes Sol Ring → `ok: false` with reason containing "not in the list"; `setCardMeta` merges tags and `renameCard` rewrites everywhere; `listVersions` orders newest first and includes a hand-written legacy `2026-01-01-old.md`.

- [ ] **Step 2–4** as usual; also `bun test test/` must stay green.

### Task 7: Migration script

**Files:**
- Create: `scripts/deck-migrate.ts`
- Modify: `package.json` scripts: `"deck:migrate": "bun run scripts/deck-migrate.ts"`
- Test: `test/deck-migrate.test.ts` (pure `buildDeckFromLegacy` on a fixture folder; the network step is injected)

**Interfaces:**
```ts
export interface MigrationReport { slug: string; lists: { id: string; file: string; cards: number }[]; renamed: { from: string; to: string }[]; unresolved: string[]; statusesApplied: number; notes: string[] }
export async function migrateDeck(slug: string, opts: { decksDir: string; resolve: (names: string[]) => Promise<ResolveResult>; dryRun: boolean; now: () => Date }): Promise<MigrationReport>
```
Behaviour: read every `DECK*.md` → `parseLegacyDeckMd`; `STATUS.md` → statuses (default PROXY); `research/printings.txt` (and `printings-<variant>.txt`, primary wins) → `cards[name].printing`; `SIDEBOARD.md` → **moved** to `research/sideboard.md` (prose stays prose, no automatic pool); `god-tribal/README.md` stays. Deck `name` = primary title (strip " — Decklist"); `description` from the primary preamble; `bracket` per list. Resolve every distinct name through `resolve`; rewrite to canonical spelling (report renames; leave unresolved names as-is and list them). Write `deck.json`, one `versions/<date>-<listId>-migrated-from-markdown.json` per list, regenerate Moxfield, then **delete** `DECK*.md`, `STATUS.md`, `SIDEBOARD.md` (after the move) and `research/printings*.txt`. `--dry-run` prints the report and writes nothing. CLI: `bun run deck:migrate [--dry-run] [slug…]`; without slugs, every folder with a `DECK.md`.

- [ ] **Step 1: Tests** on a fixture folder copied into a temp dir with two lists, a STATUS.md, a printings file and a curly-quote name; `resolve` stub maps the curly name to the straight one. Assert the report, the written `deck.json` (via `readDeck`), that the Markdown files are gone, that `research/sideboard.md` exists, and that dry-run writes nothing.

- [ ] **Step 2–4** as usual.

- [ ] **Step 5: Run the migration on the repo.** `bun run deck:migrate --dry-run` — read the report, fix anything surprising in the parser, then `bun run deck:migrate`. Commit nothing. Verify: `ls decks/*/deck.json` lists 13 decks; `git status` shows the Markdown deletions; spot-check `decks/chatterfang/deck.json` has 100 cards in `main`.

### Task 8: Deck CLI (`deck:show`, `deck:edit`, `deck:meta`) and hook guard

**Files:**
- Create: `scripts/deck.ts`
- Modify: `package.json` (`"deck": "bun run scripts/deck.ts"`, `"deck:show": "bun run scripts/deck.ts show"`, `"deck:edit": "bun run scripts/deck.ts edit"`, `"deck:meta": "bun run scripts/deck.ts meta"`)
- Modify: `.claude/settings.json` — hook command becomes `[ -n "$MTG_AGENT_EMBEDDED" ] && exit 0; command -v pkill >/dev/null 2>&1 && pkill -f "mtg-agent.*node_modules/\\.bin/[v]ite" 2>/dev/null; exit 0`
- Test: `test/deck-cli.test.ts` (exports `parseEditArgs`), `test/hook-guard.test.ts`

Usage:
```
bun run deck:show <slug> [--list id] [--json]
bun run deck:edit <slug> [--list main] --label "…" [--why "…"] --add "Card@Section" --add "Forest@Lands x2" --remove "Card" --move "Card@Section" --qty "Forest=6" [--replaces "Old->New"] [--json changes.json] [--dry-run]
bun run deck:meta <slug> --card "Name" [--tag drain --tag draw] [--untag x] [--status OWNED] [--note "…"] [--printing "(LTC) 264"]
```
`edit` resolves names through `resolveNames` first (canonical spelling, `unresolved` aborts with a message), then `applyToDeck(..., cards)` with `CardInfo` from the resolved summaries; prints the stat changes as `label: before → after (Δ)` lines and the snapshot path. `show` prints `# name`, then `## Section (n)` and `1 Card` lines, with `[GC]` where `gameChanger`, `[unresolved]` where unknown, and a stats footer.

- [ ] **Step 1: Tests** — `parseEditArgs(["--add","Skullclamp@Card Draw","--add","Forest@Lands x2","--remove","Sol Ring","--qty","Forest=6","--replaces","Sol Ring->Skullclamp"])` → the four entries with `replaces` attached to the Skullclamp add. Hook guard: `Bun.spawnSync(["sh","-c", "pkill(){ echo CALLED; }; " + hookCommand], { env: { MTG_AGENT_EMBEDDED: "1" } })` → stdout does not contain `CALLED`; without the variable it does.

- [ ] **Step 2–4** as usual. Then run `bun run deck:show chatterfang` and `bun run deck:edit chatterfang --label "cli smoke" --add "Forest@Lands" --dry-run` by hand.

### Task 9: Rework the remaining scripts and tests onto `deck.json`

**Files:**
- Modify: `scripts/deck-moxfield.ts` (arg: slug; uses `regenerateMoxfield`), `scripts/card.ts` (`--deck <slug|path-to-deck.json> [--list id]`, identity defaults to `identityOf`), `scripts/edhrec.ts` (same deck flag; commander from `commandersOf`), `scripts/deck-pdf.ts` (`renderDecklist(list: DeckList, …)`, reads `deck.json` main or `--list`), `scripts/carddata.ts` and `scripts/deckcheck.ts` (`--deck <slug>` reads the list from `deck.json` when no stdin/`--file`; `--file` still accepts a pasted list), `scripts/set-scan.ts` (identity per deck from `deck.json` instead of the hand table), `scripts/lib/deck-research.ts` (`commanderFromDeck(deck: Deck, listId?)`), `test/deck-research.test.ts`, `test/moxfield.test.ts`
- Delete: `scripts/deck-live.ts`

- [ ] **Step 1:** Update tests first (`deck-research.test.ts`: `commanderFromDeck` takes a `Deck`), run to see them fail. **Step 2:** rework each script; keep `parseDecklist` for pasted lists. **Step 3:** `bun test test/` green; smoke by hand: `bun run card --deck chatterfang`, `bun run edhrec --deck chatterfang`, `bun run deck:moxfield chatterfang`, `bun run deck:pdf chatterfang` (needs Chrome; skip if absent and note it).

---

## Phase B — app server and agent

### Task 10: Clear the old workbench, wire the root library, move routes

**Files:**
- Delete: `src/components/deck/*`, `src/lib/deck/*`, `src/server/deck-agent/*`, `src/server/decks.ts`, `src/lib/server/deck-files.ts`, `deck-live.ts`, `deck-transcripts.ts`, `card-name-cache.ts`, `src/routes/decks.tsx`, `decks.$slug.tsx`, `decks_.$slug.live.tsx`, `api.decks.$slug.stream.ts`; `data/deck-live/`, `data/deck-sessions.json`, `data/deck-transcripts/`, `data/card-names.json`
- Modify: `tsconfig.json` paths `"@mtg/*": ["../../scripts/lib/*"]`, add `"allowImportingTsExtensions": true`; `vite.config.ts` `server.fs.allow: [resolve(__dirname, "../..")]` and `ssr.noExternal` untouched; `src/routes/index.tsx` → `src/routes/collection.tsx` (route path `/collection`), new placeholder `src/routes/index.tsx` rendering "Decks" (filled in Task 20); `AppSidebar.tsx` NAV = Decks `/`, Collection `/collection`, Collections `/collections`; `__root.tsx` title "MTG Workbench"; `settings.ts` drop `DeckViewMode`/`deckView`
- Add dependency: `bun add react-resizable-panels` (app)

- [ ] **Step 1:** Delete, move, edit. **Step 2:** `bun run build` (regenerates `routeTree.gen.ts`) and `bun test` in the app both green; `bun x tsc --noEmit` clean. A sanity import `import { parseDeck } from "@mtg/deck-model.ts"` in a throwaway test file compiles and runs under `bun test`, then is removed.

### Task 11: Server store, cards, search, watcher

**Files:**
- Create: `src/builder/server/store.ts`, `server/cards.ts`, `server/watcher.ts`, `src/builder/model/cards.ts`, `src/builder/model/types.ts`
- Test: `src/builder/server/watcher.test.ts` (debounce + own-write hash filter with a temp dir), `src/builder/model/cards.test.ts` (`toCardInfo`, `cardImage`)

**Interfaces:**
```ts
// model/cards.ts (pure)
export type { CardInfo } from "@mtg/deck-stats.ts";
export interface CardView extends CardInfo { id: string; oracleText: string; images: CardImages; faces: CardFace[]; rarity: string; set: string; collectorNumber: string; scryfallUri: string }
export function toCardView(s: CardSummary): CardView;
export function cardImage(c: CardView | undefined, size: "small" | "normal" | "artCrop", face = 0): string | null;
// server/cards.ts
export async function resolveCards(names: string[]): Promise<{ cards: Record<string, CardView>; unresolved: string[] }>;   // root resolveNames
export async function searchCards(query: string): Promise<CardView[]>;   // root searchCards, max 2 pages
// server/store.ts
export async function loadDeck(slug): Promise<{ deck: Deck; cards: Record<string, CardView>; unresolved: string[]; error?: string }>;
export async function loadDeckIndex(): Promise<DeckIndexEntry[]>;   // { slug, name, commanders, identity, bracket, lists: {id,label,kind,size}[], lastChange: { label, at } | null, error?: string }
// server/watcher.ts
export function subscribeDeck(slug: string, cb: () => void): () => void;   // fs.watch(DECKS_DIR, {recursive:true}) singleton on globalThis; 250 ms debounce per slug; drops events whose file content sha1 equals the last hash recorded by noteOwnWrite(path, text)
export function noteOwnWrite(path: string, text: string): void;
```
`loadDeck` never throws for a bad `deck.json`: returns `error` and an empty deck so the index can show a badge.

- [ ] Steps: tests first (watcher: write a file → callback once; write the same content again after `noteOwnWrite` → no callback), implement, `bun test`.

### Task 12: Server functions — decks, changes, meta, history, search

**Files:**
- Create: `src/builder/api/decks.ts`, `api/changes.ts`, `api/history.ts`, `api/search.ts`
- Test: `src/builder/api/changes.test.ts` (calls the underlying handler functions exported as `__testable__` against a temp decks dir; asserts the 409-style conflict result)

**Interfaces (all `createServerFn`, zod-validated input):**
```ts
getDeckIndex(): DeckIndexEntry[]
getDeck({ slug }): { deck, cards, unresolved, error? }
createDeckFn({ name }): { slug }                       // slug = kebab-case; 409 if exists
applyChanges({ slug, changeSet: ChangeSet }): ApplyOutcome & { cards: Record<string, CardView> }   // resolves names for stats + canonicalises add/replaces names first
previewChanges({ slug, changeSet }): { ok: true; list: DeckList; before: DeckStats; after: DeckStats; changes: StatChange[]; cards } | { ok: false; failures }   // no write
setCardMetaFn({ slug, updates })
renameCardFn({ slug, from, to })
addListFn({ slug, id, label, kind })                     // new empty list; kind "pool" sections: [{ name: label, cards: [] }]
getHistory({ slug }): { entries: HistoryEntry[]; versions: VersionRef[] }
getVersion({ slug, file }): { list: DeckList; cards; diffToCurrent: ChangeEntry[]; stats: DeckStats; currentStats: DeckStats }
searchCardsFn({ query }): CardView[]
```
Every write goes through root `deck-store`, then `noteOwnWrite` for `deck.json`, `history.jsonl` and the Moxfield files.

- [ ] Steps: test the conflict path and `previewChanges` purity, implement, `bun test`, `bun x tsc --noEmit`.

### Task 13: Agent session — gate, tools, session, manager, transcripts, prompt, chat API, SSE

**Files:**
- Create: `src/builder/server/agent/{gate,tools,session,manager,transcripts,system-prompt}.ts`, `src/builder/chat/events.ts`, `src/builder/api/chat.ts`, `src/routes/api.decks.$slug.stream.ts`
- Test: `gate.test.ts` (policy table), `events.test.ts` (reducer), `session.test.ts` (with an injected fake `query` — see below), `system-prompt.test.ts`

**Interfaces:**

`chat/events.ts`:
```ts
export type TranscriptEvent =
  | { kind: "user-text"; id; text }
  | { kind: "turn-start"; id } | { kind: "turn-end"; id }
  | { kind: "text-delta"; id; text } | { kind: "text-final"; id; text }
  | { kind: "tool-cards"; id; title?: string; cards: { name: string; note?: string }[] }
  | { kind: "tool-proposal"; id; requestId; changeSet: ChangeSet }
  | { kind: "tool-picker"; id; requestId; title; prompt?; cards: { name; blurb? }[]; mode: "one"|"many"|"label"; labels?: string[] }
  | { kind: "tool-question"; id; requestId; questions: SdkQuestion[] }     // SdkQuestion = { question; header; options: {label; description}[]; multiSelect }
  | { kind: "tool-meta"; id; cards: { name; tags?; status?; note? }[] }
  | { kind: "tool-activity"; id; label }
  | { kind: "approval-request"; id; requestId; tool; path; preview } | { kind: "approval-resolved"; id; requestId; decision }
  | { kind: "request-resolved"; id; requestId; outcome: unknown }          // proposal applied/dismissed, picker picks, question answers
  | { kind: "notice"; id; level: "info"|"error"; text }
  | { kind: "session"; id; model: string | null; effort: string | null; sessionId: string | null }
  | { kind: "deck-changed"; id };
export type WireEvent = TranscriptEvent | { kind: "hello"; events: TranscriptEvent[] };
export interface ChatState { items: ChatItem[]; busy: boolean; pending: { requestId: string; kind: "proposal"|"picker"|"question"|"approval" } | null; session: { model; effort; sessionId } }
export function applyEvent(state, ev): ChatState;
```

`gate.ts`: `classifyToolUse(tool, input, ctx: { slug: string; repoRoot: string }): { verdict: "allow" | "ask" | "deny" | "allow-notify"; reason?; path? }` per spec §7.3; Bash allowlist regexes: `/^bun run (card|edhrec|carddata|deckcheck|deck:show)(\s|$)/`, `/^bun run scripts\/card\.ts\s/`; chaining chars deny.

`tools.ts`: `createDeckUiServer(bridge: ToolBridge)` where
```ts
export interface ToolBridge {
  emit(ev: TranscriptEvent): void;
  waitFor<T>(requestId: string): Promise<T>;           // resolved by the session on user action
  applyProposal(changeSet: ChangeSet): Promise<ApplyOutcome>;   // app store
  setMeta(updates): Promise<void>;
}
```
`propose_changes` handler: emit `tool-proposal` with a fresh `requestId`, `await bridge.waitFor<ProposalOutcome>(requestId)`, return JSON text of the outcome. `pick_cards` and `AskUserQuestion` likewise (the latter lives in `canUseTool`, returning `updatedInput: { questions, answers }`).

`session.ts`: `class DeckSession` with `static create(slug, deps?)`, `history()`, `subscribe(cb)`, `sendText(text)`, `resolveRequest(requestId, outcome)`, `resolveApproval(requestId, decision)`, `interrupt()`, `setModel(model|null)`, `setEffort(effort|null)` (stored; applied on next start), `newConversation()` (archive transcript to `transcripts/<slug>.<ts>.jsonl`, clear session id, close query). `deps` = `{ query, bridgeFactory }` for tests. Pending map: `Record<requestId, { kind; resolve }>`; `sendText` while a pending exists → resolve it with `{ status: "dismissed", reason: "user replied instead: " + text }` (proposal/picker) or answers `{ [firstQuestion]: text }` (question) or `"deny"` (approval), emit `request-resolved`, then queue the text. SDK options exactly:
```ts
query({ prompt: this.input(), options: {
  cwd: REPO_ROOT, resume: sessionId, includePartialMessages: true,
  settingSources: ["project"],
  systemPrompt: { type: "preset", preset: "claude_code", append },
  mcpServers: { "deck-ui": createDeckUiServer(bridge) },
  ...(model ? { model } : {}), ...(effort ? { effort } : {}),
  env: { ...process.env, MTG_AGENT_EMBEDDED: "1", MCP_TOOL_TIMEOUT: String(6 * 60 * 60 * 1000) },
  canUseTool: async (toolName, input) => { /* AskUserQuestion → question card; else gate */ },
}})
```
`transcripts.ts`: `appendTranscript(slug, ev)`, `readTranscript(slug)`, `archiveTranscript(slug)`, `loadSessionIds()`, `saveSessionId(slug, id)`, `clearSessionId(slug)` under `apps/collection-visualizer/data/agent/`.

`system-prompt.ts`: `buildAppendPrompt({ slug, deckName, listIds, activeListId })` — the tool protocol table, `[[Card Name]]` convention, "invoke the deck-brain skill before any deck decision; grep its LEDGER for facts", "you cannot edit deck.json — use propose_changes; use set_card_meta for tags/status", "prefer show_cards when discussing 2+ cards, pick_cards when the user must choose, AskUserQuestion for anything else with options", "run `bun run deck:show <slug>` to read the current list; `bun run card` for oracle text".

`api/chat.ts`: `sendMessage({slug, text})`, `resolveRequest({slug, requestId, outcome})`, `resolveApproval({slug, requestId, decision})`, `interruptChat({slug})`, `setChatModel({slug, model, effort})`, `newConversation({slug})`. SSE route: hello + subscribe + 15 s ping + `deck-changed` from `subscribeDeck`.

- [ ] **Step 1: Tests** — gate table (each row of §7.3, plus `Edit` of `decks/x/deck.json` → deny, `Bash "bun run card x && rm -rf /"` → deny); reducer (delta accumulation, replay `text-final` without deltas, `tool-proposal` sets `pending`, `request-resolved` clears it); session with a fake `query` that yields a scripted `assistant` message containing a `mcp__deck-ui__propose_changes` tool_use and then waits on the bridge: assert `tool-proposal` emitted with `pending` set, then `sendText("actually no")` resolves the bridge promise with the dismissed outcome and the text is queued; system prompt contains the slug and the `[[` convention.
- [ ] **Step 2–4** as usual; `bun test`, `tsc`.

### Task 14: Headless agent smoke

**Files:**
- Create: `apps/collection-visualizer/scripts/agent-smoke.ts` (+ `package.json` script `"agent:smoke": "bun run scripts/agent-smoke.ts"`)

- [ ] **Step 1:** Script: create `DeckSession` for `chatterfang`, `newConversation()`, send "Reply with exactly PONG.", wait for `turn-end`, assert a `text-final` contains "PONG". Then send "Call show_cards with Sol Ring and nothing else.", assert a `tool-cards` event. Then send "Propose removing Sol Ring from main with label smoke, via propose_changes, then stop.", wait for `tool-proposal`, call `resolveRequest(requestId, { status: "dismissed", reason: "smoke" })`, wait for `turn-end`, assert the final text acknowledges dismissal (contains "dismiss" case-insensitively) — this proves the blocking round-trip. Print each event kind.
- [ ] **Step 2:** Run it: `cd apps/collection-visualizer && bun run agent:smoke`. Expected: three PASS lines. Fix the session until it does. Note in the plan-execution log how long the blocking call waited and that no MCP timeout fired.

---

## Phase C — UI

Load `frontend-design` before Task 16 and `dataviz` before Task 17; both apply to every UI task after them. Visual direction: dark by default, card art is the colour; chrome stays neutral (the existing oklch tokens), one accent for staged adds (emerald) and one for removes (rose), amber for warnings. Density: Moxfield-like, not airy.

### Task 15: Client state and queries

**Files:**
- Create: `src/builder/state/atoms.ts`, `state/queries.ts`
- Test: `state/staged.test.ts` (pure reducers for the staged set: `addEntry`, `removeEntryAt`, `mergeAgentEntries`, `clear`)

**Interfaces:**
```ts
export const stagedAtom = atom<Record<string /*slug*/, { listId: string; label: string; entries: (ChangeEntry & { author: "user"|"agent"; why?: string })[] } | null>>({});
export const previewModeAtom = atom<"current" | "after">("current");
export const selectedCardAtom = atom<string | null>(null);
export const activeListAtom = atomWithStorage<Record<string, string>>("mtg-workbench.activeList", {});
export const chatModelAtom = atomWithStorage<Record<string, { model: string | null; effort: string | null }>>("mtg-workbench.chatModel", {});
export const deckKeys = { index: ["decks"], deck: (slug) => ["deck", slug], history: (slug) => ["deck", slug, "history"], version: (slug, file) => ["deck", slug, "version", file], preview: (slug, cs) => ["deck", slug, "preview", hash(cs)] };
export function useDeck(slug) / useDeckIndex() / useHistory(slug) / useVersion(slug, file) / usePreview(slug, changeSet | null)  // useQuery object form
export function useApplyChanges(slug) / useSetCardMeta(slug) / useRenameCard(slug)  // useMutation, invalidates deck + history
```

### Task 16: Board — DeckBoard, DeckCard, CardPopover, SearchAdd, Table and Curve views

**Files:**
- Create: `src/builder/board/{DeckBoard,DeckCard,CardPopover,SearchAdd,TableView,CurveView,ViewSwitcher}.tsx`
- Test: `board/board-layout.test.ts` (pure `layoutSections(list, staged, previewMode)` → columns with `{ name, state: "current"|"added"|"removed" }` per card)

Behaviour: Board view = one column per section, cards stacked with the name bar visible (reuse the visual idea of the old `CardStackColumn` but written fresh); `previewMode === "after"` renders `applyChangeSet(list, staged.entries)` with added cards ringed emerald and removed cards dimmed + ringed rose in their original spot. Unresolved card → grey tile with the raw name and **Find** (opens SearchAdd in rename mode → `useRenameCard`). Click → `CardPopover` (image with face flip for DFCs, oracle text, tags chips editor from `SUGGESTED_TAGS` + free text, status select, note, move-to-section select, Remove → stages `remove`). Drag between columns (HTML5 DnD, `onDragStart` sets the name) → stages `move`. `SearchAdd`: input debounced 300 ms → `searchCardsFn`; result tiles with an "Add to ‹section›" select → stages `add`. Table view: sortable columns name / MV / type / tags / status / price. Curve view: cards bucketed by MV.

- [ ] Steps: layout test first; then components; `tsc`; visual check happens in Task 23.

### Task 17: Stats rail with charts

**Files:**
- Create: `src/builder/rail/{StatsRail,CurveChart,PipsChart,StatRow}.tsx`

Behaviour: list tabs (+ "add pool"); size `n / 100` with a thin progress bar; curve chart (Recharts bar, creature vs noncreature stacked); pips vs sources per colour (two thin bars per colour); type counts; sections and tags with counts (tags sorted by count, click a tag to highlight cards on the board); flags (GC list chip row, identity violations, illegal, unresolved, duplicates — each a rose/amber row only when non-empty); money by status. When `staged` is non-empty, every row shows `before → after` with a coloured delta from `usePreview(...).changes`.

### Task 18: Staged panel and change-set chat card

**Files:**
- Create: `src/builder/changes/{StagedPanel,DiffColumns,DeltaTable,ChangeSetCard,SwapRow}.tsx`

Behaviour: `StagedPanel` slides up over the board bottom when the staged set has entries: left column removed cards (rose), right column added (emerald), `replaces` pairs on one `SwapRow` with `why`; `DeltaTable` from `usePreview`; **Preview** segmented control bound to `previewModeAtom`; label input (prefilled with the agent's label when the proposal came from chat); **Apply** → `useApplyChanges` → on success clear staged, toast, and if the staged set originated from a pending proposal, `resolveRequest(requestId, { status: "applied", entries, historyId })`; **Discard** → clear + (if pending) `resolveRequest(requestId, { status: "dismissed", reason: "discarded in the staged panel" })`; per-entry ✕. `ChangeSetCard` (in chat) shows the same diff compactly with rationale and a status pill (pending / applied / dismissed) and a "Load into staged" button when not pending (re-proposing an old one).

### Task 19: Chat pane, composer, blocks, card chips

**Files:**
- Create: `src/builder/chat/{ChatPane,Composer,use-deck-chat.ts}.tsx`, `chat/blocks/{Markdown,CardChip,CardsGallery,PickerBlock,QuestionBlock,ApprovalBlock,ActivityGroup,Notice}.tsx`
- Test: `chat/blocks/card-refs.test.ts` (pure: `splitCardRefs(text)` finds `[[Name]]` and Scryfall exact-name links)

Behaviour: `use-deck-chat` opens `EventSource('/api/decks/<slug>/stream')`, reduces with `applyEvent`, on `deck-changed` invalidates `deckKeys.deck(slug)`. `Markdown` uses `react-markdown` with a custom text renderer that turns card refs into `CardChip` (name + `ManaCost`, hover card with the image via `HoverCard`, click sets `selectedCardAtom`). `CardsGallery` = tiles. `PickerBlock` per mode; submit → `resolveRequest`. `QuestionBlock` renders the SDK questions (options as buttons, free-text field) → `resolveRequest(requestId, { answers })`. `ActivityGroup` collapses consecutive activity lines. `Composer`: textarea (Enter sends, Shift+Enter newline), model select + effort select (→ `setChatModel`), Stop (visible while busy), New conversation (confirm dialog). Typing while pending is allowed; the server dismisses the pending request (Task 13).

### Task 20: Decks index and new deck

**Files:**
- Create: `src/builder/index/{DeckGrid,DeckCardTile,NewDeckDialog}.tsx`; fill `src/routes/index.tsx`

Behaviour per spec §8.1; the commander art crop from `resolveCards` in the index server function (batched). New deck → `createDeckFn` → navigate to `/decks/<slug>` with `?intro=1`; the workbench sends the onboarding message once ("This is a new deck named X. Ask me about the commander and gameplan, then propose a first skeleton.").

### Task 21: Workbench route and history route

**Files:**
- Create: `src/routes/decks.$slug.tsx` (resizable three panes with `react-resizable-panels`, sizes persisted in localStorage under `mtg-workbench.panes`), `src/routes/decks_.$slug.history.tsx`, `src/builder/history/{HistoryTimeline,VersionView}.tsx`

Behaviour per spec §8.3: vertical timeline; select → `VersionView` renders the board read-only from `useVersion` with a **Diff vs current** toggle (uses `diffToCurrent` to ring cards) and **Restore** → sets `stagedAtom[slug] = { listId, label: "restore " + version.label, entries: diffToCurrent reversed }` and navigates to the workbench.

### Task 22: Docs, skills, template, memory

**Files:**
- Modify: `decks/README.md` (rewrite the file-layout section for `deck.json`, `history.jsonl`, `versions/*.json`, the CLI, keep PDF/EDHREC sections updated to slugs), `CLAUDE.md` (card tool usage with slugs; deck section; app section), `README.md`, `apps/collection-visualizer/README.md`, `.claude/skills/deck-brain/SKILL.md` (§1.5 and every `DECK.md`/`STATUS.md` mention → `deck.json` / `bun run deck:show` / `deck:edit`), `.claude/skills/deck-finalizer/SKILL.md` (final assembly via `deck:edit`; browser path = `pick_cards` + `propose_changes`; remove the live-companion section), `decks/_TEMPLATE/` (replace `DECK.md`/`STATUS.md` with `deck.json` from `emptyDeck("<Deck Name>")`), `docs/superpowers/specs/2026-09-23-deck-builder-design.md` §9 (note: SIDEBOARD.md moves to research, no auto pool)
- Memory: update `deck-workbench.md`, `mtg-cards-cache-and-decisions.md`, `moxfield-link-after-every-change.md` (path unchanged, still `MOXFIELD.txt`), `focus-on-latest-deck-versions.md` (lists are ids inside deck.json) in `~/.claude/projects/-Users-skylerdj-Desktop-mtg-agent/memory/`, and `MEMORY.md` lines.

### Task 23: Build, browser verification, review

- [ ] **Step 1:** `cd apps/collection-visualizer && bun run format && bun x tsc --noEmit && bun test && bun run build`; root `bun test test/`.
- [ ] **Step 2:** Start `bun run start` (vite preview on 3200) **in the background**, wait for the port, use Playwright MCP to open `/`, `/decks/chatterfang`, stage a swap through the UI (search "Skullclamp", add to Card Draw; remove Sol Ring via popover), screenshot the staged panel and the rail deltas, open `/decks/chatterfang/history`, screenshot; then **kill the preview** (`pkill -f "vite preview"`) and confirm nothing listens on 3200. Save screenshots to the scratchpad and reference them in the report.
- [ ] **Step 3:** Run `superpowers:requesting-code-review` on the whole change (a fresh reviewer on the diff), fix findings, re-run Step 1.
- [ ] **Step 4:** Report to the user: what was built, the decisions list from spec §12, the screenshots, the migration report, what is not yet done (research panels, collection cross-ref), and the reminder that nothing is committed.
