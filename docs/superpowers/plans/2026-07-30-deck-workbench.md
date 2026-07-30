# Deck Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A "Decks" view in `apps/collection-visualizer` where the user chats with a per-deck headless Claude session (Agent SDK, subscription auth) and runs the deck-finalizer exercise with card images, click-based Keep/Cut/Pocket calls, a live guardrail tally, and gated file writes.

**Architecture:** The Vite dev server hosts one `@anthropic-ai/claude-agent-sdk` `query()` session per deck (streaming-input mode, `cwd` = repo root, resumable via persisted session IDs). A server manager translates SDK messages into a small SSE event vocabulary; the browser renders text as chat and custom in-process MCP tool calls (`present_batch`, `update_tally`, `propose_final_list`) as structured UI. `canUseTool` gates `Write`/`Edit` under `decks/` behind browser approval.

**Tech Stack:** TanStack Start 1.168 (server routes via `createFileRoute` + `server.handlers`, RPC via `createServerFn`), React 19, Tailwind 4, bun test, `@anthropic-ai/claude-agent-sdk`, `zod`, `react-markdown`.

## Global Constraints

- **Bun everywhere** — `bun add` / `bun test`; never npm/pnpm/yarn. `bun.lockb` is the only lockfile.
- **Never start the dev server** — the user runs it (`bun run dev`, port 3000 strictPort). Verification = `bun test` + `bunx tsc --noEmit` only; the live smoke test is handed to the user.
- **No AI attribution in commits** — plain commit messages, no `Co-Authored-By`, no "Generated with" footers.
- **`src/components/` must never import from `src/lib/server/` or `src/server/`** (directly or transitively) — node builtins die in the client bundle. Server code is reached only via `createServerFn` or server routes. (See `src/lib/server/README.md`.)
- **User TS style rules:** no prop destructuring in component signatures (accept `props`); object signature for react-query hooks; `.toEqual` over `.toBe` in tests; no `await` inside larger expressions — bind to a `const` first; prefer plain objects/arrays over Map/Set; JSDoc comments for types/properties.
- **Repo root** is `/Users/skylerdj/Desktop/mtg-agent`; the app is `apps/collection-visualizer` (all app paths below are relative to the app unless prefixed `<root>/`).
- All commits happen on the existing `feat/collection-visualizer` branch. `git add` **specific paths only** — the working tree has unrelated in-progress changes that must not be swept into commits.

---

### Task 1: Repoint `deck-finalizer` SKILL.md to the per-deck layout

**Files:**
- Modify: `<root>/.claude/skills/deck-finalizer/SKILL.md`

**Interfaces:**
- Produces: a SKILL.md whose paths all exist in the current repo; Task 8 embeds this file verbatim into the browser agent's system prompt.

The skill references a dead layout. Replace every stale path with the current per-deck structure (see `<root>/decks/README.md`):

| Stale reference | Replacement |
|---|---|
| `decks/DECISIONS.txt` | `decks/<slug>/research/decisions.md` |
| newest `decks/*UPGRADED*<date>.txt` | `decks/<slug>/DECK.md` + `decks/<slug>/STATUS.md` (the authoritative pair — keep in sync) |
| `decks/cards.txt` card cache | `decks/<slug>/research/cards.txt` |
| `premium_edgar_decks.json`, `new_edgar_decks_clean.json` (root) | "a per-deck sample of comparable decklists under `decks/<slug>/research/` (e.g. `decks/edgar-markov/research/premium_edgar_decks.json`), **when one exists**" |
| write final list to `decks/<name>_<YYYY-MM-DD>.txt` | update `DECK.md` **and** `STATUS.md` together, snapshot the previous list to `decks/<slug>/versions/YYYY-MM-DD-<label>.md` first |
| append summary to `decks/DECISIONS.txt` | append to `decks/<slug>/research/decisions.md` |

- [ ] **Step 1: Edit the file.** Apply the table above. In the Rubric section, change the "Field signal" bullet to say the 6-deck coverage check applies **only when the deck folder has a comparison sample** in `research/`; when absent, skip that lens and say so once. In "Setup", step 2 becomes: read `decks/<slug>/research/decisions.md` (gameplan + locked decisions, if present), `decks/<slug>/research/strategy.md` (if present), and the authoritative `DECK.md`/`STATUS.md`. Scripts note: `scripts/carddata.py` / `scripts/deckcheck.py` paths inside the skill folder are unchanged, but `deckcheck.py`'s field-coverage output depends on the per-deck sample; mention that.
- [ ] **Step 2: Verify no stale path survives.** Run: `grep -nE "DECISIONS\.txt|UPGRADED|decks/cards\.txt|premium_edgar|new_edgar" <root>/.claude/skills/deck-finalizer/SKILL.md` → expect no output.
- [ ] **Step 3: Commit.** `git add .claude/skills/deck-finalizer/SKILL.md && git commit -m "Repoint deck-finalizer skill to the per-deck decks/<slug> layout"`

---

### Task 2: Dependencies + repo paths + deck file IO

**Files:**
- Modify: `package.json` (via `bun add`)
- Create: `src/lib/server/repo-paths.ts`
- Create: `src/lib/server/deck-files.ts`
- Create: `src/lib/deck/slug.ts`
- Test: `src/lib/deck/slug.test.ts`

**Interfaces:**
- Produces: `REPO_ROOT: string`, `DECKS_DIR: string`; `slugify(name: string): string`, `isValidSlug(s: string): boolean`; `listDeckSlugs(): Promise<string[]>`, `readDeckFiles(slug): Promise<{ deckMd: string; statusMd: string } | null>`, `createDeckFromTemplate(slug): Promise<void>`, `loadSessionIds(): Promise<Record<string, string>>`, `saveSessionId(slug, id): Promise<void>`.

- [ ] **Step 1: Install deps.** From the app dir: `bun add @anthropic-ai/claude-agent-sdk zod react-markdown`
- [ ] **Step 2: Write failing slug tests** (`src/lib/deck/slug.test.ts`):

```ts
import { describe, expect, test } from "bun:test";
import { slugify, isValidSlug } from "./slug";

describe("slugify", () => {
  test("kebab-cases names", () => {
    expect(slugify("Scarlet Witch")).toEqual("scarlet-witch");
    expect(slugify("  Edgar's  Markov!! ")).toEqual("edgars-markov");
  });
  test("collapses non-alphanumerics", () => {
    expect(slugify("Ur-Dragon (5c)")).toEqual("ur-dragon-5c");
  });
});

describe("isValidSlug", () => {
  test("accepts kebab-case, rejects traversal and empties", () => {
    expect(isValidSlug("scarlet-witch")).toEqual(true);
    expect(isValidSlug("../evil")).toEqual(false);
    expect(isValidSlug("_TEMPLATE")).toEqual(false);
    expect(isValidSlug("")).toEqual(false);
  });
});
```

- [ ] **Step 3: Run to verify fail.** `bun test src/lib/deck/slug.test.ts` → FAIL (module not found).
- [ ] **Step 4: Implement `src/lib/deck/slug.ts`** (pure — client-importable):

```ts
/** Kebab-case a deck name into a folder slug per decks/README.md. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Only lowercase kebab-case, non-empty, no traversal, never the template folder. */
export function isValidSlug(s: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);
}
```

- [ ] **Step 5: Run tests.** `bun test src/lib/deck/slug.test.ts` → PASS.
- [ ] **Step 6: Implement `src/lib/server/repo-paths.ts`:**

```ts
// Server only — see lib/server/README.md.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

/** Walk up from cwd (the app dir in dev) until we find the repo root (has decks/ + CLAUDE.md). */
function findRepoRoot(): string {
  let dir = process.cwd();

  for (let i = 0; i < 6; i++) {
    if (existsSync(join(dir, "decks")) && existsSync(join(dir, "CLAUDE.md"))) {
      return dir;
    }
    dir = dirname(dir);
  }

  throw new Error("Could not locate mtg-agent repo root from " + process.cwd());
}

export const REPO_ROOT = findRepoRoot();
export const DECKS_DIR = join(REPO_ROOT, "decks");
```

- [ ] **Step 7: Implement `src/lib/server/deck-files.ts`:**

```ts
// Server only — see lib/server/README.md.
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DECKS_DIR } from "./repo-paths";
import { DATA_DIR } from "./price-cache";
import { isValidSlug } from "~/lib/deck/slug";

const SESSIONS_PATH = join(DATA_DIR, "deck-sessions.json");

/** Deck folders, skipping the _TEMPLATE skeleton and loose files. */
export async function listDeckSlugs(): Promise<string[]> {
  const entries = await readdir(DECKS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name !== "_TEMPLATE")
    .map((e) => e.name)
    .sort();
}

export async function readDeckFiles(slug: string): Promise<{ deckMd: string; statusMd: string } | null> {
  if (!isValidSlug(slug)) return null;
  try {
    const deckMd = await readFile(join(DECKS_DIR, slug, "DECK.md"), "utf8");
    const statusMd = await readFile(join(DECKS_DIR, slug, "STATUS.md"), "utf8");
    return { deckMd, statusMd };
  } catch {
    return null;
  }
}

export async function createDeckFromTemplate(slug: string): Promise<void> {
  if (!isValidSlug(slug)) throw new Error(`Invalid slug: ${slug}`);
  const dest = join(DECKS_DIR, slug);
  await cp(join(DECKS_DIR, "_TEMPLATE"), dest, { recursive: true, errorOnExist: true, force: false });
}

export async function loadSessionIds(): Promise<Record<string, string>> {
  try {
    const raw = await readFile(SESSIONS_PATH, "utf8");
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function saveSessionId(slug: string, id: string): Promise<void> {
  const ids = await loadSessionIds();
  ids[slug] = id;
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SESSIONS_PATH, JSON.stringify(ids, null, 2) + "\n");
}
```

- [ ] **Step 8: Typecheck + full test run.** `bunx tsc --noEmit && bun test src/lib/deck/` → PASS.
- [ ] **Step 9: Commit.** `git add package.json bun.lockb src/lib/server/repo-paths.ts src/lib/server/deck-files.ts src/lib/deck/ && git commit -m "Deck workbench: deps, repo paths, deck file IO, slug helpers"`

---

### Task 3: DECK.md / STATUS.md parsing

**Files:**
- Create: `src/lib/deck/parse.ts`
- Test: `src/lib/deck/parse.test.ts`

**Interfaces:**
- Produces (all pure, client-importable):

```ts
export type DeckStatus = "HAVE" | "BUY" | "PROXY" | "CONSIDERING" | "CUT";
export interface DeckCard { qty: number; name: string }
export interface DeckGroup { name: string; cards: DeckCard[] }
export interface ParsedDeck { title: string; commanderLine: string | null; groups: DeckGroup[]; total: number }
export interface CardStatus { status: DeckStatus; proxyCandidate: boolean; note: string | null }
export function parseDeckMd(text: string): ParsedDeck
export function parseStatusMd(text: string): Record<string, CardStatus>  // keyed by card name
export interface DeckSummary {
  slug: string; name: string; commander: string | null; colors: string | null;
  total: number; statusCounts: Record<DeckStatus, number>;
}
export function summarize(slug: string, deck: ParsedDeck, statuses: Record<string, CardStatus>): DeckSummary
```

File formats (real samples): `DECK.md` — `# <Name> — Decklist` title; a line `Commander: Scarlet Witch, Chaotic Avenger (Izzet, U/R)`; `## Group Name (16)` headers; `1x Card Name` lines. `STATUS.md` — lines like `1x The Vision and Scarlet Witch — HAVE 💰 (~$60 — proxy if you don't own it)` — em-dash separator, one of the five statuses (`BUY` may carry `($40)` immediately after), optional `💰`, optional parenthetical note.

- [ ] **Step 1: Write failing tests** (`src/lib/deck/parse.test.ts`):

```ts
import { describe, expect, test } from "bun:test";
import { parseDeckMd, parseStatusMd, summarize } from "./parse";

const DECK = `# Scarlet Witch — Decklist

Commander: Scarlet Witch, Chaotic Avenger (Izzet, U/R)
Bracket: 3   ·   Total: 100   ·   Strategy: research/strategy.md

> Blurb line.

## Commander (1)
1x Scarlet Witch, Chaotic Avenger

## Lands (2)
1x Command Tower
1x Steam Vents
`;

const STATUS = `# Scarlet Witch — Status

1x Scarlet Witch, Chaotic Avenger — HAVE (~$3; also in the precon)
1x Command Tower — HAVE
1x Steam Vents — BUY ($18) 💰 (shocks hold value)
`;

describe("parseDeckMd", () => {
  test("extracts title, commander, groups, cards, total", () => {
    const d = parseDeckMd(DECK);
    expect(d.title).toEqual("Scarlet Witch");
    expect(d.commanderLine).toEqual("Scarlet Witch, Chaotic Avenger (Izzet, U/R)");
    expect(d.groups.map((g) => g.name)).toEqual(["Commander", "Lands"]);
    expect(d.groups[1].cards).toEqual([
      { qty: 1, name: "Command Tower" },
      { qty: 1, name: "Steam Vents" },
    ]);
    expect(d.total).toEqual(3);
  });
});

describe("parseStatusMd", () => {
  test("extracts status, proxy flag, note", () => {
    const s = parseStatusMd(STATUS);
    expect(s["Command Tower"]).toEqual({ status: "HAVE", proxyCandidate: false, note: null });
    expect(s["Steam Vents"].status).toEqual("BUY");
    expect(s["Steam Vents"].proxyCandidate).toEqual(true);
    expect(s["Steam Vents"].note).toEqual("shocks hold value");
  });
});

describe("summarize", () => {
  test("counts statuses and pulls colors from the commander parenthetical", () => {
    const sum = summarize("scarlet-witch", parseDeckMd(DECK), parseStatusMd(STATUS));
    expect(sum.name).toEqual("Scarlet Witch");
    expect(sum.commander).toEqual("Scarlet Witch, Chaotic Avenger");
    expect(sum.colors).toEqual("U/R");
    expect(sum.total).toEqual(3);
    expect(sum.statusCounts.HAVE).toEqual(2);
    expect(sum.statusCounts.BUY).toEqual(1);
  });
});
```

- [ ] **Step 2: Run to verify fail.** `bun test src/lib/deck/parse.test.ts` → FAIL.
- [ ] **Step 3: Implement `src/lib/deck/parse.ts`.** Line-oriented; regexes:
  - title: `/^#\s+(.+?)\s+—\s+Decklist/m` (fall back to first `# ` heading, then slug).
  - commander line: `/^Commander:\s*(.+)$/m`.
  - group header: `/^##\s+(.+?)(?:\s+\((\d+)\))?\s*$/` — strip the count parenthetical from the name.
  - card line: `/^(\d+)x\s+(.+?)\s*$/` — only while inside a group.
  - status line: `/^(\d+)x\s+(.+?)\s+—\s+(HAVE|BUY|PROXY|CONSIDERING|CUT)\b(.*)$/` — `proxyCandidate = rest.includes("💰")`; note = first parenthetical in `rest` with a leading `~$…;` or `$…` price segment and separators (`;`, `—`) trimmed off (`(~$3; also in the precon)` → note `also in the precon`; `($18)` alone → `null`).
  - `summarize`: commander = `commanderLine` up to the last ` (`; colors = last parenthetical's segment after a comma if it matches `/^[WUBRGC/]+$/` (e.g. `(Izzet, U/R)` → `U/R`), else null; total = sum of `qty`; statusCounts seeded `{ HAVE: 0, BUY: 0, PROXY: 0, CONSIDERING: 0, CUT: 0 }`, incremented per **deck** card by looking its name up in `statuses` (missing name → uncounted).
- [ ] **Step 4: Run tests.** `bun test src/lib/deck/parse.test.ts` → PASS. Also sanity-parse the real files: `bun -e "import{parseDeckMd}from'./src/lib/deck/parse.ts';import{readFileSync}from'fs';const d=parseDeckMd(readFileSync('../../decks/scarlet-witch/DECK.md','utf8'));console.log(d.title,d.total,d.groups.length)"` → expect `Scarlet Witch 100 <n>`.
- [ ] **Step 5: Commit.** `git add src/lib/deck/parse.ts src/lib/deck/parse.test.ts && git commit -m "Deck workbench: DECK.md / STATUS.md parsers"`

---

### Task 4: Chat event vocabulary + reducer

**Files:**
- Create: `src/lib/deck/chat-events.ts`
- Test: `src/lib/deck/chat-events.test.ts`

**Interfaces:**
- Produces (pure, shared by server translator, SSE wire, and client reducer):

```ts
export interface BatchCard { name: string; manaCost?: string; typeLine?: string; blurb?: string; set?: string }
export interface BatchInput { batchNumber: number; totalBatches?: number; cards: BatchCard[] }
export interface TallyInput {
  keeps: number; cuts: number; pockets: number; target: number;
  gameChangers: number; gcCeiling?: number; manaSources?: number;
  categories?: { name: string; count: number; target?: number }[];
}
export interface FinalListInput { groups: { name: string; cards: string[] }[]; total: number; summary?: string }

export type TranscriptEvent =
  | { kind: "user-text"; id: string; text: string }
  | { kind: "turn-start"; id: string }
  | { kind: "text-delta"; id: string; text: string }
  | { kind: "text-final"; id: string; text: string }
  | { kind: "tool-batch"; id: string; input: BatchInput }
  | { kind: "tool-tally"; id: string; input: TallyInput }
  | { kind: "tool-final-list"; id: string; input: FinalListInput }
  | { kind: "tool-activity"; id: string; label: string }          // e.g. "Read decks/…", "bun run card …"
  | { kind: "approval-request"; id: string; requestId: string; tool: string; path: string; preview: string }
  | { kind: "approval-resolved"; id: string; requestId: string; decision: "allow" | "deny" }
  | { kind: "turn-end"; id: string }
  | { kind: "notice"; id: string; level: "info" | "error"; text: string };

/** First frame on every SSE (re)connect: full history so a refreshed tab rebuilds state. */
export type WireEvent = TranscriptEvent | { kind: "hello"; events: TranscriptEvent[] };

export type ChatItem =
  | { type: "user"; id: string; text: string }
  | { type: "assistant"; id: string; text: string; streaming: boolean }
  | { type: "batch"; id: string; input: BatchInput; submitted: boolean }
  | { type: "final-list"; id: string; input: FinalListInput; signedOff: boolean }
  | { type: "activity"; id: string; label: string }
  | { type: "approval"; id: string; requestId: string; tool: string; path: string; preview: string; decision: "allow" | "deny" | null }
  | { type: "notice"; id: string; level: "info" | "error"; text: string };

export interface ChatState { items: ChatItem[]; tally: TallyInput | null; busy: boolean }
export const initialChatState: ChatState = { items: [], tally: null, busy: false };
export function applyEvent(state: ChatState, ev: TranscriptEvent): ChatState
export function applyWire(state: ChatState, ev: WireEvent): ChatState  // hello → fold replay from initial
```

Reducer semantics: pure, returns new objects. `text-delta` appends to (or creates) the streaming assistant item with that `id`; `text-final` replaces its text and clears `streaming`. `tool-tally` only updates `state.tally` (no item). `turn-start` sets `busy: true`; `turn-end` clears it and marks any still-streaming assistant item done. `approval-resolved` sets `decision` on the matching approval item. Batch submission / sign-off flags are set client-side when the user submits (the hook re-dispatches a synthetic `user-text`, and marks the batch item via id — expose `markSubmitted(state, id)` and `markSignedOff(state, id)` helpers).

- [ ] **Step 1: Write failing tests** — cover: delta accumulation then finalization; hello replay equals folding events one-by-one; tally update; approval request→resolve; turn-end clears busy and streaming; markSubmitted flips the flag. Example spine:

```ts
import { describe, expect, test } from "bun:test";
import { applyEvent, applyWire, initialChatState, markSubmitted } from "./chat-events";

test("deltas accumulate then finalize", () => {
  let s = applyEvent(initialChatState, { kind: "turn-start", id: "t1" });
  s = applyEvent(s, { kind: "text-delta", id: "m1", text: "Hel" });
  s = applyEvent(s, { kind: "text-delta", id: "m1", text: "lo" });
  expect(s.items).toEqual([{ type: "assistant", id: "m1", text: "Hello", streaming: true }]);
  s = applyEvent(s, { kind: "text-final", id: "m1", text: "Hello!" });
  s = applyEvent(s, { kind: "turn-end", id: "t1" });
  expect(s.items).toEqual([{ type: "assistant", id: "m1", text: "Hello!", streaming: false }]);
  expect(s.busy).toEqual(false);
});
```

(plus the analogous tests for tally / approval / hello / markSubmitted — write them concretely, ~60 lines.)
- [ ] **Step 2: Run to verify fail** → FAIL. **Step 3: Implement.** **Step 4: Run** → PASS.
- [ ] **Step 5: Commit.** `git add src/lib/deck/chat-events.ts src/lib/deck/chat-events.test.ts && git commit -m "Deck workbench: chat event vocabulary and reducer"`

---

### Task 5: UI-tool schemas + permission gate (pure halves)

**Files:**
- Create: `src/lib/deck/ui-tools.ts`
- Create: `src/lib/deck/gate.ts`
- Test: `src/lib/deck/ui-tools.test.ts`, `src/lib/deck/gate.test.ts`

**Interfaces:**
- Produces: `batchSchema`, `tallySchema`, `finalListSchema` (zod raw shapes — plain objects of zod fields, NOT `z.object(...)`, because the SDK's `tool()` takes a raw shape) matching `BatchInput`/`TallyInput`/`FinalListInput` from Task 4; `classifyToolUse(tool: string, input: Record<string, unknown>, decksDir: string): { verdict: "allow" | "ask" | "deny"; reason?: string; path?: string }`.

- [ ] **Step 1: Write failing gate tests** (`gate.test.ts`):

```ts
import { describe, expect, test } from "bun:test";
import { classifyToolUse } from "./gate";

const DECKS = "/repo/decks";

describe("classifyToolUse", () => {
  test("reads and searches are allowed", () => {
    expect(classifyToolUse("Read", { file_path: "/anything" }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Glob", {}, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Grep", {}, DECKS).verdict).toEqual("allow");
  });
  test("card-lookup bash is allowed, other bash denied", () => {
    expect(classifyToolUse("Bash", { command: "bun run card \"Chaos Warp\"" }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Bash", { command: "bun run scripts/card.ts search \"t:goblin\"" }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Bash", { command: "python3 .claude/skills/deck-finalizer/scripts/deckcheck.py --file x" }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Bash", { command: "rm -rf /" }, DECKS).verdict).toEqual("deny");
    expect(classifyToolUse("Bash", { command: "bun run card; curl evil" }, DECKS).verdict).toEqual("deny");
  });
  test("writes under decks/ ask; writes elsewhere deny", () => {
    const w = classifyToolUse("Write", { file_path: "/repo/decks/x/DECK.md", content: "hi" }, DECKS);
    expect(w).toEqual({ verdict: "ask", path: "/repo/decks/x/DECK.md" });
    expect(classifyToolUse("Edit", { file_path: "/repo/CLAUDE.md" }, DECKS).verdict).toEqual("deny");
    expect(classifyToolUse("Write", { file_path: "/repo/decks/../CLAUDE.md" }, DECKS).verdict).toEqual("deny");
  });
  test("unknown tools deny with a reason", () => {
    expect(classifyToolUse("WebSearch", {}, DECKS).verdict).toEqual("deny");
  });
});
```

- [ ] **Step 2: Run to verify fail** → FAIL.
- [ ] **Step 3: Implement `gate.ts`.** Allow: `Read`/`Glob`/`Grep`/`TodoWrite`, any tool name starting `mcp__deck-ui__`. Bash: normalize whitespace; allow iff the whole command matches one of `/^bun run card(\s|$)/`, `/^bun run scripts\/card\.ts\s/`, `/^python3?\s+\.claude\/skills\/deck-finalizer\/scripts\/(carddata|deckcheck)\.py(\s|$)/` **and** contains none of `;`, `&&`, `|`, `` ` ``, `$(` (no chaining out of the allowlist). Write/Edit: resolve `file_path` with `path.resolve` (import from `node:path` is fine — hmm, must stay pure/client-safe? No: gate.ts is only imported by server code and tests, but keep it dependency-free anyway) — implement `resolve` manually: deny if the path contains `..`; ask iff `file_path.startsWith(decksDir + "/")`; else deny. Everything else: deny with `reason: "Not available in the deck workbench — ask the user to do this in the terminal."`.
- [ ] **Step 4: Write failing ui-tools tests** — `z.object(batchSchema).parse(validBatch)` round-trips; missing `cards` throws; `z.object(tallySchema)` accepts the full shape from Task 4. Then implement `ui-tools.ts` (zod raw shapes + `.describe()` on every field — the descriptions are what the agent reads).
- [ ] **Step 5: Run all.** `bun test src/lib/deck/` → PASS.
- [ ] **Step 6: Commit.** `git add src/lib/deck/ui-tools.ts src/lib/deck/gate.ts src/lib/deck/ui-tools.test.ts src/lib/deck/gate.test.ts && git commit -m "Deck workbench: UI-tool schemas and permission gate"`

---

### Task 6: System prompt builder

**Files:**
- Create: `src/server/deck-agent/system-prompt.ts`
- Test: `src/server/deck-agent/system-prompt.test.ts`

**Interfaces:**
- Consumes: `REPO_ROOT` (Task 2).
- Produces: `buildAppendPrompt(args: { slug: string; skillText: string; conventionsText: string }): string` (pure) and `loadAppendPrompt(slug: string): Promise<string>` (reads SKILL.md + decks/README.md then delegates).

- [ ] **Step 1: Failing test** for the pure half: result contains the skill text, the conventions text, the deck's paths (`decks/<slug>/DECK.md`), and the three tool names `mcp__deck-ui__present_batch` / `update_tally` / `propose_final_list`; contains the phrase "end your turn" (the stop-after-batch instruction).
- [ ] **Step 2: Fail run.** **Step 3: Implement.** The template (verbatim, with `${}` filled):

```
You are the deck agent for the deck at decks/${slug}/ in this Magic: The Gathering repo.
The user is talking to you from a web UI, not a terminal. Everything about deckbuilding
conventions and the finalizer exercise below still applies.

## UI protocol (how to show things to the user)
You have three UI tools. Prefer them over prose whenever they fit:
- mcp__deck-ui__present_batch — show a batch of 5–10 cards with Keep/Cut/Pocket buttons.
  After calling it, END YOUR TURN immediately and wait for the user's calls. Never give
  verdicts in the same turn you present a batch.
- mcp__deck-ui__update_tally — refresh the on-screen guardrail tally. Call it after
  processing every batch, and whenever counts change materially.
- mcp__deck-ui__propose_final_list — show the final list for explicit sign-off. Only after
  the user signs off may you write DECK.md/STATUS.md (the UI will ask them to approve the
  actual file writes — that is expected, not an error).
File writes under decks/ require user approval in the UI; a denial is the user changing
their mind, not a failure. Never attempt writes outside decks/.

## Deck conventions (decks/README.md)
${conventionsText}

## The finalizer exercise (.claude/skills/deck-finalizer/SKILL.md)
Run this exercise when the user wants to finalize/trim/build the deck:
${skillText}

## This deck
- Authoritative pair: decks/${slug}/DECK.md and decks/${slug}/STATUS.md — keep in sync.
- Research: decks/${slug}/research/ · Snapshots: decks/${slug}/versions/
- Card lookups: `bun run card "<name>"`, `bun run card --deck decks/${slug}/DECK.md`.
If DECK.md is still the template skeleton, this is a brand-new deck: onboard the user —
ask about commander and gameplan (one question at a time), then seed strategy.md, DECK.md
and STATUS.md through the normal approval flow.
```

- [ ] **Step 4: Pass run.** `bun test src/server/deck-agent/` → PASS.
- [ ] **Step 5: Commit.** `git add src/server/deck-agent/ && git commit -m "Deck workbench: deck-agent system prompt builder"`

---

### Task 7: Deck-agent session manager (the core)

**Files:**
- Create: `src/server/deck-agent/session.ts`
- Create: `src/server/deck-agent/manager.ts`
- Create: `src/server/deck-agent/tools.ts`
- Create: `src/lib/server/deck-transcripts.ts`

**Interfaces:**
- Consumes: Tasks 2, 4, 5, 6 exports.
- Produces: `getDeckSession(slug: string): Promise<DeckSession>` (manager, survives HMR via `globalThis`); `DeckSession` with `sendText(text: string): void`, `resolveApproval(requestId: string, decision: "allow" | "deny"): void`, `subscribe(cb: (ev: TranscriptEvent) => void): () => void`, `history(): TranscriptEvent[]`, `interrupt(): Promise<void>`.

**Before coding: verify two SDK types against the installed package** — open `node_modules/@anthropic-ai/claude-agent-sdk/sdk.d.ts` (or `index.d.ts`) and confirm (a) the exact `CanUseTool` callback signature and `PermissionResult` shape (expected: `(toolName: string, input: Record<string, unknown>, opts) => Promise<{ behavior: "allow"; updatedInput: Record<string, unknown> } | { behavior: "deny"; message: string }>` — the docs page shows a different sketch; trust the `.d.ts`), and (b) the `SDKUserMessage` shape for streaming input (expected `{ type: "user"; message: { role: "user"; content: string }; parent_tool_use_id: null; session_id: string }` in some versions — adjust the generator accordingly). Fix the code below to match reality; everything else in this task is version-stable.

- [ ] **Step 1: Implement `src/lib/server/deck-transcripts.ts`** — JSONL append/read so refresh-after-restart keeps history:

```ts
// Server only — transcript persistence, one JSONL file per deck under the app's data/.
import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA_DIR } from "./price-cache";
import type { TranscriptEvent } from "~/lib/deck/chat-events";

const DIR = join(DATA_DIR, "deck-transcripts");

export async function appendTranscript(slug: string, ev: TranscriptEvent): Promise<void> {
  await mkdir(DIR, { recursive: true });
  await appendFile(join(DIR, slug + ".jsonl"), JSON.stringify(ev) + "\n");
}

export async function readTranscript(slug: string): Promise<TranscriptEvent[]> {
  try {
    const raw = await readFile(join(DIR, slug + ".jsonl"), "utf8");
    return raw.split("\n").filter(Boolean).map((l) => JSON.parse(l) as TranscriptEvent);
  } catch {
    return [];
  }
}
```

Skip `text-delta` events when persisting (`text-final` supersedes them).
- [ ] **Step 2: Implement `tools.ts`** — the three UI tools; handlers are acks (the UI renders from the tool_use block in the message stream, not from the handler):

```ts
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { batchSchema, tallySchema, finalListSchema } from "~/lib/deck/ui-tools";

export function deckUiServer() {
  return createSdkMcpServer({
    name: "deck-ui",
    version: "1.0.0",
    tools: [
      tool("present_batch", "Show a batch of cards in the UI with Keep/Cut/Pocket buttons. End your turn right after calling this.", batchSchema, async () => ({
        content: [{ type: "text", text: "Batch displayed. STOP: end your turn now and wait for the user's calls." }],
      })),
      tool("update_tally", "Update the on-screen guardrail tally (keeps/cuts/pockets, game changers, mana sources, category counts).", tallySchema, async () => ({
        content: [{ type: "text", text: "Tally updated on screen." }],
      })),
      tool("propose_final_list", "Show the final decklist for explicit user sign-off before any file writes.", finalListSchema, async () => ({
        content: [{ type: "text", text: "Final list displayed. STOP: end your turn and wait for sign-off." }],
      })),
    ],
  });
}
```

- [ ] **Step 3: Implement `session.ts`.** Skeleton (adjust the two verified shapes):

```ts
import { randomUUID } from "node:crypto";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { REPO_ROOT, DECKS_DIR } from "~/lib/server/repo-paths";
import { loadSessionIds, saveSessionId } from "~/lib/server/deck-files";
import { appendTranscript, readTranscript } from "~/lib/server/deck-transcripts";
import { classifyToolUse } from "~/lib/deck/gate";
import type { TranscriptEvent } from "~/lib/deck/chat-events";
import { loadAppendPrompt } from "./system-prompt";
import { deckUiServer } from "./tools";

interface PendingApproval { resolve: (d: "allow" | "deny") => void }

export class DeckSession {
  private transcript: TranscriptEvent[] = [];
  private subscribers: ((ev: TranscriptEvent) => void)[] = [];
  private queue: string[] = [];
  private wake: (() => void) | null = null;
  private pending: Record<string, PendingApproval> = {};
  private running = false;

  constructor(readonly slug: string) {}

  static async create(slug: string): Promise<DeckSession> {
    const s = new DeckSession(slug);
    s.transcript = await readTranscript(slug);
    return s;
  }

  history(): TranscriptEvent[] { return this.transcript; }

  subscribe(cb: (ev: TranscriptEvent) => void): () => void {
    this.subscribers.push(cb);
    return () => { this.subscribers = this.subscribers.filter((s) => s !== cb); };
  }

  private emit(ev: TranscriptEvent): void {
    this.transcript.push(ev);
    if (ev.kind !== "text-delta") void appendTranscript(this.slug, ev);
    for (const cb of this.subscribers) cb(ev);
  }

  sendText(text: string): void {
    this.emit({ kind: "user-text", id: randomUUID(), text });
    this.queue.push(text);
    this.wake?.();
    if (!this.running) void this.run();
  }

  resolveApproval(requestId: string, decision: "allow" | "deny"): void {
    const p = this.pending[requestId];
    if (!p) return;
    delete this.pending[requestId];
    this.emit({ kind: "approval-resolved", id: randomUUID(), requestId, decision });
    p.resolve(decision);
  }

  /** Streaming input: yields queued user messages forever; query() stays open between turns. */
  private async *input() {
    while (true) {
      if (this.queue.length === 0) {
        await new Promise<void>((r) => { this.wake = r; });
        this.wake = null;
      }
      const text = this.queue.shift();
      if (text !== undefined) {
        yield { type: "user" as const, message: { role: "user" as const, content: text } };
      }
    }
  }

  private async run(): Promise<void> {
    this.running = true;
    try {
      const ids = await loadSessionIds();
      const append = await loadAppendPrompt(this.slug);
      const q = query({
        prompt: this.input(),
        options: {
          cwd: REPO_ROOT,
          resume: ids[this.slug],
          includePartialMessages: true,
          systemPrompt: { type: "preset", preset: "claude_code", append },
          mcpServers: { "deck-ui": deckUiServer() },
          allowedTools: ["Read", "Glob", "Grep", "TodoWrite",
            "mcp__deck-ui__present_batch", "mcp__deck-ui__update_tally", "mcp__deck-ui__propose_final_list"],
          canUseTool: async (toolName, input) => {
            const c = classifyToolUse(toolName, input, DECKS_DIR);
            if (c.verdict === "allow") return { behavior: "allow", updatedInput: input };
            if (c.verdict === "deny") return { behavior: "deny", message: c.reason ?? "Not allowed here." };
            const requestId = randomUUID();
            const preview = typeof input.content === "string" ? input.content.slice(0, 2000)
              : typeof input.new_string === "string" ? input.new_string.slice(0, 2000) : "";
            this.emit({ kind: "approval-request", id: randomUUID(), requestId, tool: toolName, path: c.path ?? "?", preview });
            const decision = await new Promise<"allow" | "deny">((resolve) => { this.pending[requestId] = { resolve }; });
            if (decision === "allow") return { behavior: "allow", updatedInput: input };
            return { behavior: "deny", message: "The user declined this write in the UI." };
          },
        },
      });
      await this.pump(q);
    } catch (err) {
      this.emit({ kind: "notice", id: randomUUID(), level: "error", text: String(err) });
    } finally {
      this.running = false;
    }
  }

  /** Translate SDK messages into TranscriptEvents. */
  private async pump(q: AsyncIterable<any>): Promise<void> {
    let turnId: string | null = null;
    let currentTextId: string | null = null;
    let currentText = "";

    for await (const msg of q) {
      if (msg.type === "system" && msg.subtype === "init") {
        void saveSessionId(this.slug, msg.session_id);
      } else if (msg.type === "stream_event") {
        const ev = msg.event;
        if (turnId === null) { turnId = randomUUID(); this.emit({ kind: "turn-start", id: turnId }); }
        if (ev.type === "content_block_start" && ev.content_block?.type === "text") {
          currentTextId = randomUUID(); currentText = "";
        } else if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta" && currentTextId) {
          currentText += ev.delta.text;
          this.emit({ kind: "text-delta", id: currentTextId, text: ev.delta.text });
        } else if (ev.type === "content_block_stop" && currentTextId) {
          this.emit({ kind: "text-final", id: currentTextId, text: currentText });
          currentTextId = null;
        }
      } else if (msg.type === "assistant") {
        for (const block of msg.message?.content ?? msg.content ?? []) {
          if (block.type !== "tool_use") continue;
          const id = randomUUID();
          if (block.name === "mcp__deck-ui__present_batch") this.emit({ kind: "tool-batch", id, input: block.input });
          else if (block.name === "mcp__deck-ui__update_tally") this.emit({ kind: "tool-tally", id, input: block.input });
          else if (block.name === "mcp__deck-ui__propose_final_list") this.emit({ kind: "tool-final-list", id, input: block.input });
          else this.emit({ kind: "tool-activity", id, label: describeToolUse(block.name, block.input) });
        }
      } else if (msg.type === "result") {
        if (msg.subtype && msg.subtype !== "success") {
          this.emit({ kind: "notice", id: randomUUID(), level: "error", text: "Turn ended with: " + msg.subtype + (msg.subtype.includes("limit") ? " — you may have hit a usage limit; try again in a bit." : "") });
        }
        if (turnId) { this.emit({ kind: "turn-end", id: turnId }); turnId = null; }
      }
    }
    if (turnId) this.emit({ kind: "turn-end", id: turnId });
  }
}

function describeToolUse(name: string, input: Record<string, unknown>): string {
  if (name === "Bash" && typeof input.command === "string") return "$ " + input.command;
  if (typeof input.file_path === "string") return name + " " + input.file_path;
  if (name === "Grep" && typeof input.pattern === "string") return "Grep /" + input.pattern + "/";
  return name;
}
```

Notes for the implementer: the exact nesting of `assistant` content (`msg.message.content` vs `msg.content`) and the `result` subtypes — log one real message dump on first smoke run and adjust; the translation layer is the single place shape drift lands. Do NOT emit `tool-activity` for the three `mcp__deck-ui__*` names (already handled).
- [ ] **Step 4: Implement `manager.ts`:**

```ts
import { DeckSession } from "./session";

/** Survives Vite HMR module reloads: sessions hold live subprocesses. */
const g = globalThis as unknown as { __deckSessions?: Record<string, DeckSession> };

export async function getDeckSession(slug: string): Promise<DeckSession> {
  g.__deckSessions ??= {};
  const existing = g.__deckSessions[slug];

  if (existing) return existing;
  const created = await DeckSession.create(slug);
  g.__deckSessions[slug] = created;
  return created;
}
```

- [ ] **Step 5: Typecheck.** `bunx tsc --noEmit` → clean (fix per the verified `.d.ts` shapes).
- [ ] **Step 6: Commit.** `git add src/server/deck-agent/ src/lib/server/deck-transcripts.ts && git commit -m "Deck workbench: agent session manager, UI tools, transcript persistence"`

---

### Task 8: Server surface — SSE route + RPC server functions

**Files:**
- Create: `src/routes/api.decks.$slug.stream.ts`
- Create: `src/server/decks.ts`

**Interfaces:**
- Consumes: Task 7 manager; Tasks 2–3 IO/parsers.
- Produces: `GET /api/decks/$slug/stream` (SSE of `WireEvent`, first frame `hello`); server fns `listDecks(): Promise<DeckSummary[]>`, `getDeck(slug): Promise<{ summary: DeckSummary; deck: ParsedDeck; statuses: Record<string, CardStatus> } | null>`, `createDeck({ name }): Promise<{ slug: string }>`, `sendDeckMessage({ slug, text }): Promise<void>`, `resolveDeckApproval({ slug, requestId, decision }): Promise<void>`.

- [ ] **Step 1: SSE route** (`src/routes/api.decks.$slug.stream.ts`):

```ts
import { createFileRoute } from "@tanstack/react-router";
import { getDeckSession } from "~/server/deck-agent/manager";
import { isValidSlug } from "~/lib/deck/slug";

export const Route = createFileRoute("/api/decks/$slug/stream")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!isValidSlug(params.slug)) return new Response("bad slug", { status: 400 });
        const session = await getDeckSession(params.slug);

        const stream = new ReadableStream({
          start(controller) {
            const enc = new TextEncoder();
            const send = (data: unknown) => controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`));
            send({ kind: "hello", events: session.history() });
            const unsubscribe = session.subscribe(send);
            const ping = setInterval(() => controller.enqueue(enc.encode(": ping\n\n")), 15000);
            // @ts-expect-error stash cleanup for cancel()
            this._cleanup = () => { unsubscribe(); clearInterval(ping); };
          },
          cancel() {
            // @ts-expect-error
            this._cleanup?.();
          },
        });

        return new Response(stream, {
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
        });
      },
    },
  },
});
```

(If the `this._cleanup` stash fights the type-checker, hoist `unsubscribe`/`ping` to closure variables declared before the `ReadableStream` — cleaner anyway.)
- [ ] **Step 2: Server fns** (`src/server/decks.ts`), following the `createServerFn` style in `src/server/collection.ts`: each is a thin composition — `listDecks` maps `listDeckSlugs()` through `readDeckFiles` + `parseDeckMd`/`parseStatusMd`/`summarize` (skip nulls); `getDeck` returns the parsed triple; `createDeck` validates `slugify(name)`, calls `createDeckFromTemplate`, returns the slug; `sendDeckMessage`/`resolveDeckApproval` grab `getDeckSession(slug)` and call `sendText`/`resolveApproval`. Validate every `slug` input with `isValidSlug` and throw on failure.
- [ ] **Step 3: Typecheck.** `bunx tsc --noEmit` → clean. Route-tree generation happens on next dev-server run; if `routeTree.gen.ts` needs regeneration for typecheck, run `bunx tsr generate` (or accept that the route registers on the user's next dev run — do not start the dev server).
- [ ] **Step 4: Commit.** `git add src/routes/api.decks.\$slug.stream.ts src/server/decks.ts src/routeTree.gen.ts && git commit -m "Deck workbench: SSE stream route and deck server functions"`

---

### Task 9: Scryfall lookup by name

**Files:**
- Modify: `src/lib/data/scryfall.ts`
- Test: `src/lib/data/scryfall.test.ts` (append)

**Interfaces:**
- Produces: `indexByName(cards: any[]): Record<string, any>` (pure; keys lowercased card names, front-face name too for DFCs — split on " // ") and `fetchCardsByNames(names: string[]): Promise<Record<string, any>>` (POST `https://api.scryfall.com/cards/collection` with `{ identifiers: [{ name }] }`, chunked by 75 using the existing `chunk()`, results folded through `indexByName`; lookups by `result[name.toLowerCase()]`). Scryfall's API is CORS-enabled — callable from the browser.

- [ ] **Step 1: Failing test for `indexByName`** — two fake cards (one DFC `"A // B"`), expect keys `"a"`, `"a // b"`, `"b"`? No — front face only: expect `indexByName([{ name: "Fire // Ice" }])["fire // ice"]` and `["fire"]` both resolve to the card; plain card by lowercased name. **Step 2: fail. Step 3: implement both functions. Step 4: pass** (`bun test src/lib/data/scryfall.test.ts`).
- [ ] **Step 5: Commit.** `git add src/lib/data/scryfall.ts src/lib/data/scryfall.test.ts && git commit -m "Deck workbench: Scryfall card lookup by name"`

---

### Task 10: Decks list page + creation + sidebar entry

**Files:**
- Modify: `src/components/nav/AppSidebar.tsx` (add `{ to: "/decks", label: "Decks", icon: Swords }` to `NAV`; import `Swords` from lucide)
- Create: `src/routes/decks.tsx`
- Create: `src/components/deck/DeckSummaryCard.tsx`
- Create: `src/components/deck/NewDeckForm.tsx`

**Interfaces:**
- Consumes: `listDecks`, `createDeck` server fns (Task 8); `DeckSummary` (Task 3).

- [ ] **Step 1: Route** `src/routes/decks.tsx` — loader calls `listDecks()`; component renders a responsive grid of `DeckSummaryCard` plus `NewDeckForm`. Follow the structure of `src/routes/collections.tsx` (loader + page shell + heading).
- [ ] **Step 2: `DeckSummaryCard`** (props: `{ summary: DeckSummary }`, no destructuring in signature) — card with name, commander line, colors rendered via the existing `Mana` symbol component when `colors` parses to letters (`U/R` → `["U","R"]`), `total`/100, and a compact status strip (`HAVE n · BUY n · PROXY n`). Whole card is a `<Link to="/decks/$slug" params={{ slug }}>`.
- [ ] **Step 3: `NewDeckForm`** — name input (live slug preview via `slugify`), optional "commander / theme notes" textarea, submit → `createDeck({ name })` → `router.navigate` to `/decks/$slug`, passing the notes via router state or search param `?intro=...`; the deck page sends it as the first chat message if the transcript is empty (Task 11 wires this).
- [ ] **Step 4: Typecheck.** `bunx tsc --noEmit` → clean.
- [ ] **Step 5: Commit.** `git add src/components/nav/AppSidebar.tsx src/routes/decks.tsx src/components/deck/ src/routeTree.gen.ts && git commit -m "Deck workbench: decks list page, creation form, sidebar entry"`

---

### Task 11: Chat hook + deck page shell

**Files:**
- Create: `src/lib/deck/use-deck-chat.ts`
- Create: `src/routes/decks.$slug.tsx`
- Create: `src/components/deck/DeckPanel.tsx`
- Create: `src/components/deck/GuardrailRail.tsx`

**Interfaces:**
- Consumes: reducer + types (Task 4), server fns (Task 8), parsers (Task 3).
- Produces: `useDeckChat(slug: string): { state: ChatState; sendText(t: string): void; submitBatch(id: string, calls: { name: string; call: "keep" | "cut" | "pocket" }[]): void; signOff(id: string): void; approve(requestId: string, decision: "allow" | "deny"): void }`.

- [ ] **Step 1: Implement `use-deck-chat.ts`.** `useReducer` over `applyWire`; `useEffect` opens `new EventSource("/api/decks/" + slug + "/stream")`, `onmessage` parses and dispatches, cleanup closes it (EventSource auto-reconnects; `hello` resets state so replays are idempotent — have the reducer rebuild from initial on every `hello`). Senders: `sendText` → optimistic nothing (server echoes `user-text`), calls `sendDeckMessage` server fn; `submitBatch(id, calls)` marks the batch item submitted locally (`markSubmitted`) and sends the calls as one text message formatted `My calls for batch N:\n- <Card>: KEEP\n- <Card>: CUT …`; `signOff(id)` marks signed off and sends `SIGNED OFF — snapshot the old list and write DECK.md and STATUS.md now.`, and sets a ref `autoApprove = true` for the rest of that turn; `approve()` calls `resolveDeckApproval`. When an `approval-request` event arrives while `autoApprove` is set, immediately call `approve(requestId, "allow")` (this is what makes sign-off one click); clear the ref on `turn-end`.
- [ ] **Step 2: Route `src/routes/decks.$slug.tsx`.** Loader: `getDeck(slug)` (404 → redirect to `/decks`). Layout: `<div className="grid h-[calc(100dvh-61px)] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(400px,560px)]">` — **deck panel LEFT, chat RIGHT**. Refetch deck data (`router.invalidate()`) on every `turn-end` so approved writes show up in the panel. If `?intro=` is present and history is empty after `hello`, auto-send the intro as the first message.
- [ ] **Step 3: `DeckPanel`** (props `{ deck: ParsedDeck; statuses: Record<string, CardStatus>; tally: TallyInput | null }`) — scrollable; renders `GuardrailRail` pinned on top when `tally` non-null, then each group (`## name (count)`) as a list of card rows: name, status badge colored by status (HAVE=muted, BUY=amber, PROXY=violet, CONSIDERING=sky, CUT=line-through), 💰 when `proxyCandidate`. Card images by name: fetch once per deck via `fetchCardsByNames(allNames)` in a `useEffect`, show a small thumbnail on row hover reusing the existing `hover-card` UI primitive (skip if the lookup missed).
- [ ] **Step 4: `GuardrailRail`** (props `{ tally: TallyInput }`) — one dense row: `keeps/target`, cuts, pockets, `GC n/ceiling` (red when over), mana sources, then category chips (`name count/target`, amber when under target). Pure presentational.
- [ ] **Step 5: Typecheck + tests.** `bunx tsc --noEmit && bun test src/lib/deck/` → clean/PASS.
- [ ] **Step 6: Commit.** `git add src/lib/deck/use-deck-chat.ts src/routes/decks.\$slug.tsx src/components/deck/ src/routeTree.gen.ts && git commit -m "Deck workbench: deck page, chat hook, deck panel, guardrail rail"`

---

### Task 12: Chat pane + structured blocks

**Files:**
- Create: `src/components/deck/ChatPane.tsx`
- Create: `src/components/deck/ChatMessage.tsx`
- Create: `src/components/deck/BatchBlock.tsx`
- Create: `src/components/deck/ApprovalCard.tsx`
- Create: `src/components/deck/FinalListReview.tsx`

**Interfaces:**
- Consumes: `useDeckChat` return value (Task 11), `BatchInput`/`FinalListInput` (Task 4), `fetchCardsByNames` (Task 9).

- [ ] **Step 1: `ChatPane`** (props: chat hook return + nothing else) — column: scrollable transcript (auto-scroll to bottom on new items unless the user scrolled up), input row at the bottom (textarea, Enter sends / Shift+Enter newline, disabled-with-spinner while `state.busy`). Maps `state.items`: `user`/`assistant` → `ChatMessage`; `batch` → `BatchBlock`; `final-list` → `FinalListReview`; `approval` → `ApprovalCard`; `activity` → one muted mono line (the `label`); `notice` → tinted banner with a **Retry** button when `level === "error"` (resends the last user text).
- [ ] **Step 2: `ChatMessage`** — user: right-aligned bubble, plain text. Assistant: left-aligned, `react-markdown` in a `prose prose-sm dark:prose-invert` container; streaming shows a pulsing caret.
- [ ] **Step 3: `BatchBlock`** (props `{ input: BatchInput; submitted: boolean; onSubmit(calls): void }`) — header `Batch N`; grid of card cells: image (from a shared `fetchCardsByNames(cards.map(c => c.name))` effect; fallback = name-only cell), name, mana cost via existing `Mana` component, type line, blurb; per-card three-way toggle **Keep / Cut / Pocket** (local `Record<string, "keep" | "cut" | "pocket">`); footer shows `called x/y` and a **Submit calls** button enabled at full coverage. When `submitted`, render read-only with the chosen calls highlighted.
- [ ] **Step 4: `ApprovalCard`** (props `{ item; onDecide(decision): void }`) — "The agent wants to **{tool}** `{path}`", collapsible `<pre>` preview, **Allow** / **Deny** buttons; after decision, collapse to a one-liner ("Write approved · decks/…/DECK.md").
- [ ] **Step 5: `FinalListReview`** (props `{ input: FinalListInput; signedOff: boolean; onSignOff(): void }`) — grouped list with counts, total vs 100 (red mismatch), optional summary, **Sign off — write the files** button (disabled once `signedOff`).
- [ ] **Step 6: Typecheck.** `bunx tsc --noEmit` → clean.
- [ ] **Step 7: Commit.** `git add src/components/deck/ && git commit -m "Deck workbench: chat pane and structured finalizer blocks"`

---

### Task 13: Verification pass + smoke script for the user

**Files:**
- Modify: `README.md` (app) — add a "Deck workbench" section: what it is, that it needs the repo checkout (agent cwd = repo root), that sessions/transcripts live in `data/`.

- [ ] **Step 1: Full test suite.** `bun test` → all green (old + new).
- [ ] **Step 2: Typecheck.** `bunx tsc --noEmit` → clean.
- [ ] **Step 3: Client-bundle safety check.** `grep -rn "lib/server\|server/deck-agent" src/components/ src/lib/deck/` → only `gate.ts` importing nothing server-side; components must have zero hits.
- [ ] **Step 4: Commit docs.** `git add README.md && git commit -m "Deck workbench: README section"`
- [ ] **Step 5: Hand the user the smoke script** (do NOT run the dev server): (1) `bun run dev`, open `/decks`; (2) confirm both decks list with counts; (3) create a throwaway deck `smoke-test`, confirm folder appears and the agent onboards; (4) open `scarlet-witch`, ask "price the current list" — expect an activity line running `bun run card --deck` and a chat answer; (5) say "let's finalize the deck" with a small pasted pool — expect a batch block, click calls, submit, expect verdicts + tally; (6) push back on one verdict; (7) sign off on a final list, approve the writes, confirm `DECK.md`/`STATUS.md` changed and a `versions/` snapshot exists; (8) restart the dev server mid-session and confirm the conversation resumes; (9) `rm -rf decks/smoke-test` + revert any smoke writes.

---

## Self-review notes (already applied)

- **Spec coverage:** every spec section maps to a task — skill repointing (T1), session manager/resume/compaction (T7), SSE + replay (T8, transcripts in T7), UI tools (T5/T7), gate + approvals (T5/T7/T12), deck list/create + onboarding (T10, intro message T11), deck page layout chat-right (T11), structured blocks (T12), error notices/retry (T7/T12), tests (T2–T5, T9), out-of-scope items untouched.
- **Type consistency:** `TranscriptEvent`/`ChatState`/`BatchInput` names are defined once in Task 4 and consumed by name in Tasks 7, 8, 11, 12; gate verdict object defined in Task 5 and consumed in Task 7.
- **Known drift risks called out inline:** Agent SDK `canUseTool`/`SDKUserMessage` exact shapes (verify `.d.ts` in T7), SDK message nesting in `pump()` (log-and-adjust on first smoke), TanStack route-tree regeneration (T8).
