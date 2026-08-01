#!/usr/bin/env bun
/** deck-live.ts — drive the collection-visualizer's terminal-companion dashboard.
 *
 * A Claude Code session running the deck-finalizer writes live state here; the browser page at
 * http://localhost:3000/decks/<slug>/live polls it (~1.5s). See
 * apps/collection-visualizer/src/lib/deck/live-state.ts for the full state contract.
 *
 * Usage (from the repo root):
 *   bun run scripts/deck-live.ts open <slug>            # seed an empty state + open the browser
 *   bun run scripts/deck-live.ts set <slug> < state.json  # write state (updatedAt is stamped here)
 *   bun run scripts/deck-live.ts clear <slug>           # reset to empty
 *
 * `open` checks the dev server first and refuses to open a dead URL — it never starts the server.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = dirname(import.meta.dir); // scripts/ -> repo root
const LIVE_DIR = join(ROOT, "apps", "collection-visualizer", "data", "deck-live");

const [cmd, slug] = process.argv.slice(2);

if (!cmd || !slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("usage: deck-live.ts <open|set|clear> <slug>   (set reads state JSON on stdin)");
  process.exit(1);
}

const statePath = join(LIVE_DIR, slug + ".json");

function writeState(state: Record<string, unknown>): void {
  mkdirSync(LIVE_DIR, { recursive: true });
  writeFileSync(statePath, JSON.stringify({ ...state, updatedAt: Date.now() }, null, 2) + "\n");
}

const EMPTY = { batch: null, keep: [], considering: [], pocket: [], cut: [], tally: null, note: null };

if (cmd === "clear") {
  writeState(EMPTY);
  console.log("cleared", statePath);
} else if (cmd === "set") {
  const raw = await Bun.stdin.text();
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("stdin is not valid JSON:", e);
    process.exit(1);
  }
  writeState(parsed);
  console.log("updated", statePath);
} else if (cmd === "open") {
  const url = `http://localhost:3000/decks/${slug}/live`;
  const up = await fetch("http://localhost:3000/", { signal: AbortSignal.timeout(1500) })
    .then((r) => r.ok || r.status < 500)
    .catch(() => false);

  if (!up) {
    console.error(
      "Dev server not reachable on :3000 — ask the user to run `bun run dev` in apps/collection-visualizer, then re-run this. (Never start it yourself.)",
    );
    process.exit(2);
  }
  writeState(EMPTY);
  Bun.spawnSync(["open", url]);
  console.log("opened", url);
} else {
  console.error(`unknown command: ${cmd}`);
  process.exit(1);
}
