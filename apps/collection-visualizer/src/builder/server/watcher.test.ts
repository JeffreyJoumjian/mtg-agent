import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { noteOwnWrite, subscribeDeck, __testable__ } from "./watcher";

let dir = "";

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "deck-watch-"));
  await mkdir(join(dir, "zed"), { recursive: true });
  await writeFile(join(dir, "zed", "deck.json"), "{}");
});

afterEach(async () => {
  __testable__.closeAll();
  await rm(dir, { recursive: true, force: true });
});

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
// FSEvents delivers with some latency and may replay very recent history when a watcher starts,
// so every test settles after subscribing and waits well past the debounce before asserting.
const SETTLE = 200;
const DEBOUNCE = 100;
const AFTER = 500;

test("a change under decks/<slug>/ notifies that slug's subscribers once, debounced", async () => {
  let calls = 0;
  const unsubscribe = subscribeDeck("zed", () => calls++, { decksDir: dir, debounceMs: DEBOUNCE });
  await wait(SETTLE);

  await writeFile(join(dir, "zed", "deck.json"), '{"a":1}');
  await writeFile(join(dir, "zed", "history.jsonl"), "x\n");
  await wait(AFTER);
  expect(calls).toEqual(1);

  unsubscribe();
  await writeFile(join(dir, "zed", "deck.json"), '{"a":2}');
  await wait(AFTER);
  expect(calls).toEqual(1);
});

test("a write whose content the app just produced itself is ignored", async () => {
  let calls = 0;
  subscribeDeck("zed", () => calls++, { decksDir: dir, debounceMs: DEBOUNCE });
  await wait(SETTLE);

  const text = '{"own":true}';
  noteOwnWrite(join(dir, "zed", "deck.json"), text);
  await writeFile(join(dir, "zed", "deck.json"), text);
  await wait(AFTER);
  expect(calls).toEqual(0);

  await writeFile(join(dir, "zed", "deck.json"), '{"external":true}');
  await wait(AFTER);
  expect(calls).toEqual(1);
});

test("changes to another deck do not notify", async () => {
  let calls = 0;
  await mkdir(join(dir, "other"), { recursive: true });
  subscribeDeck("zed", () => calls++, { decksDir: dir, debounceMs: DEBOUNCE });
  await wait(SETTLE);

  await writeFile(join(dir, "other", "deck.json"), "{}");
  await wait(AFTER);
  expect(calls).toEqual(0);
});

test("an apply through the app's store is recognised as the app's own write and not reported", async () => {
  const { applyChangeSetToDeck } = await import("./store");
  const { createDeck, writeDeck } = await import("@mtg/deck-store.ts");
  const { MAIN_LIST } = await import("@mtg/deck-model.ts");
  const deck = await createDeck("own", "Own", { decksDir: dir });
  deck.lists[MAIN_LIST].sections[1].cards.push({ name: "Forest", qty: 3 });
  await writeDeck("own", deck, { decksDir: dir });
  await writeFile(join(dir, "_printings.txt"), "");

  let calls = 0;
  subscribeDeck("own", () => calls++, { decksDir: dir, debounceMs: DEBOUNCE });
  await wait(SETTLE);

  const outcome = await applyChangeSetToDeck(
    "own",
    {
      listId: MAIN_LIST,
      label: "own write",
      author: "user",
      entries: [{ op: "add", name: "Forest", section: "Lands" }],
    },
    {
      Forest: {
        name: "Forest",
        cmc: 0,
        manaCost: "",
        typeLine: "Basic Land — Forest",
        colors: [],
        colorIdentity: ["G"],
        producedMana: ["G"],
        gameChanger: false,
        usd: null,
        commanderLegal: "legal",
        id: "f",
        oracleId: "f",
        oracleText: "",
        images: { small: null, normal: null, artCrop: null },
        faces: [],
        layout: "normal",
        rarity: "common",
        set: "x",
        collectorNumber: "1",
        scryfallUri: "",
        keywords: [],
      },
    },
    { decksDir: dir, globalPrintingsPath: join(dir, "_printings.txt") },
  );
  expect(outcome.ok).toEqual(true);
  await wait(AFTER);
  expect(calls).toEqual(0);
});

test("temp files from an atomic write never count as a change", async () => {
  let calls = 0;
  subscribeDeck("zed", () => calls++, { decksDir: dir, debounceMs: DEBOUNCE });
  await wait(SETTLE);
  await writeFile(join(dir, "zed", ".deck.json.123.tmp"), "{}");
  await wait(AFTER);
  expect(calls).toEqual(0);
});
