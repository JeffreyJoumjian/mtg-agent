#!/usr/bin/env bun
/**
 * Regenerate the Moxfield/Archidekt import lists for a deck from its `deck.json`.
 *
 *   bun run deck:moxfield <slug>            # every `deck` list → MOXFIELD*.txt
 *   bun run deck:moxfield <slug> --stdout   # print instead of writing
 *
 * The exports are **derived** and safe to delete (deck-brain §1.4 — never hand-maintain anything
 * derivable). The app's apply path and `bun run deck:edit` regenerate them on every change, so
 * running this by hand is only needed after editing `deck.json` directly.
 *
 * Preferred printings come from two layers: `decks/_printings.txt` (the global reserve of owned
 * copies) and each card's `printing` pin in `deck.json`, which wins.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GLOBAL_PRINTINGS_PATH, mergePrintings, parsePrintings, printingsFromMeta, toMoxfield } from "./lib/moxfield.ts";
import { readDeck, regenerateMoxfield } from "./lib/deck-store.ts";
import { REPO_ROOT } from "./lib/paths.ts";
import { listSize } from "./lib/deck-model.ts";

const USAGE = "usage: bun run deck:moxfield <slug> [--stdout]";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const toStdout = argv.includes("--stdout");
  const slug = argv.find((a) => !a.startsWith("--"));
  if (!slug) {
    console.log(USAGE);
    process.exit(argv.length === 0 ? 1 : 0);
  }

  const deck = await readDeck(slug);

  if (toStdout) {
    const globalPath = join(REPO_ROOT, GLOBAL_PRINTINGS_PATH);
    const global = existsSync(globalPath) ? parsePrintings(readFileSync(globalPath, "utf8")) : {};
    const printings = mergePrintings(global, printingsFromMeta(deck.cards));

    for (const [id, list] of Object.entries(deck.lists)) {
      if (list.kind !== "deck") continue;
      console.log(`# ${slug}/${id}`);
      console.log(toMoxfield(list, printings).lines.join("\n"));
      console.log();
    }
    return;
  }

  const written = await regenerateMoxfield(slug, deck);
  for (const path of written) {
    const id = path.match(/MOXFIELD-(.+)\.txt$/)?.[1].toLowerCase() ?? "main";
    const total = listSize(deck.lists[id]);
    console.log(`${path}   ${total} card${total === 1 ? "" : "s"}${total === 100 ? "" : "   ⚠️  not 100"}`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
