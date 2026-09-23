import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, readFile, readdir, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  applyToDeck,
  createDeck,
  listDeckSlugs,
  listVersions,
  readDeck,
  readHistory,
  readVersion,
  renameCard,
  setCardMeta,
  snapshotFileName,
  writeDeck,
  DeckFileError,
  type StoreOptions,
} from "../scripts/lib/deck-store.ts";
import { emptyDeck, MAIN_LIST, listSize, findEntry } from "../scripts/lib/deck-model.ts";
import type { CardInfo } from "../scripts/lib/deck-stats.ts";

let dir = "";
let opts: StoreOptions;

const card = (name: string, over: Partial<CardInfo> = {}): CardInfo => ({
  name,
  cmc: 1,
  manaCost: "{1}",
  typeLine: "Artifact",
  colors: [],
  colorIdentity: [],
  producedMana: [],
  gameChanger: false,
  usd: 1,
  commanderLegal: "legal",
  ...over,
});

const cards: Record<string, CardInfo | undefined> = {
  Zed: card("Zed", { cmc: 2, manaCost: "{B}{G}", typeLine: "Legendary Creature", colorIdentity: ["B", "G"] }),
  Forest: card("Forest", { cmc: 0, manaCost: "", typeLine: "Basic Land — Forest", producedMana: ["G"] }),
  "Sol Ring": card("Sol Ring", { producedMana: ["C"] }),
  Skullclamp: card("Skullclamp"),
};

async function seed(): Promise<void> {
  const deck = emptyDeck("Zed — Test");
  deck.lists[MAIN_LIST].sections = [
    { name: "Commander", cards: [{ name: "Zed", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 3 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }] },
  ];
  deck.cards["Sol Ring"] = { status: "OWNED", printing: { set: "ltc", collectorNumber: "264" } };
  await mkdir(join(dir, "zed", "versions"), { recursive: true });
  await writeDeck("zed", deck, opts);
}

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "deck-store-"));
  const printings = join(dir, "_printings.txt");
  await writeFile(printings, "1 Forest (LTC) 400\n");
  opts = { decksDir: dir, now: () => new Date("2026-09-23T14:32:00Z"), globalPrintingsPath: printings };
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

test("createDeck writes deck.json from emptyDeck and the folder skeleton; listDeckSlugs sees it", async () => {
  const deck = await createDeck("new-deck", "New Deck", opts);
  expect(deck).toEqual(emptyDeck("New Deck"));
  expect(await readDeck("new-deck", opts)).toEqual(emptyDeck("New Deck"));
  expect((await readdir(join(dir, "new-deck"))).sort()).toEqual(["deck.json", "research", "samples", "versions"]);
  await mkdir(join(dir, "_TEMPLATE"));
  expect(await listDeckSlugs(opts)).toEqual(["new-deck"]);
  await expect(createDeck("new-deck", "Again", opts)).rejects.toThrow(/exists/);
});

test("readDeck throws DeckFileError carrying the validation errors for a corrupt file", async () => {
  await mkdir(join(dir, "bad"));
  await writeFile(join(dir, "bad", "deck.json"), '{"schema":1,"name":""}');
  await expect(readDeck("bad", opts)).rejects.toBeInstanceOf(DeckFileError);
});

test("applyToDeck snapshots the old list, writes the new one, appends history and regenerates Moxfield", async () => {
  await seed();
  const outcome = await applyToDeck(
    "zed",
    {
      listId: MAIN_LIST,
      label: "Skullclamp in, Sol Ring out",
      author: "user",
      entries: [
        { op: "add", name: "Skullclamp", section: "Card Draw", replaces: "Sol Ring" },
        { op: "remove", name: "Sol Ring" },
      ],
    },
    cards,
    opts,
  );
  expect(outcome.ok).toEqual(true);
  if (!outcome.ok) return;

  const deck = await readDeck("zed", opts);
  expect(findEntry(deck.lists[MAIN_LIST], "Skullclamp")?.section).toEqual("Card Draw");
  expect(findEntry(deck.lists[MAIN_LIST], "Sol Ring")).toEqual(null);
  expect(listSize(deck.lists[MAIN_LIST])).toEqual(5);

  const versions = await readdir(join(dir, "zed", "versions"));
  expect(versions).toEqual(["2026-09-23-1432-main-skullclamp-in-sol-ring-out.json"]);
  const snapshot = JSON.parse(await readFile(join(dir, "zed", "versions", versions[0]), "utf8"));
  expect(snapshot.listId).toEqual(MAIN_LIST);
  expect(snapshot.reason).toEqual("before Skullclamp in, Sol Ring out");
  expect(findEntry(snapshot.list, "Sol Ring")?.section).toEqual("Ramp");

  const history = await readHistory("zed", opts);
  expect(history.length).toEqual(1);
  expect(history[0].label).toEqual("Skullclamp in, Sol Ring out");
  expect(history[0].snapshot).toEqual(`versions/${versions[0]}`);
  expect(history[0].changes.some((c) => c.key === "roles.Ramp" && c.delta === -1)).toEqual(true);
  expect(history[0].changes.some((c) => c.key === "size.total")).toEqual(false);
  expect(outcome.entry.id).toEqual(history[0].id);

  const mox = await readFile(join(dir, "zed", "MOXFIELD.txt"), "utf8");
  expect(mox.split("\n")[0]).toEqual("1 Zed");
  expect(mox).toContain("3 Forest (LTC) 400");
  expect(mox).not.toContain("Sol Ring");
  expect(outcome.moxfield).toEqual([join(dir, "zed", "MOXFIELD.txt")]);
});

test("applyToDeck with a failing entry writes nothing", async () => {
  await seed();
  const before = await readFile(join(dir, "zed", "deck.json"), "utf8");
  const outcome = await applyToDeck(
    "zed",
    { listId: MAIN_LIST, label: "bad", author: "agent", entries: [{ op: "remove", name: "Nope" }] },
    cards,
    opts,
  );
  expect(outcome.ok).toEqual(false);
  expect(await readFile(join(dir, "zed", "deck.json"), "utf8")).toEqual(before);
  expect(await readdir(join(dir, "zed", "versions"))).toEqual([]);
  expect(await readHistory("zed", opts)).toEqual([]);
});

test("applyToDeck rejects a change set built against a list that has since changed", async () => {
  await seed();
  const removeSolRing = { listId: MAIN_LIST, label: "cut Sol Ring", author: "user" as const, entries: [{ op: "remove" as const, name: "Sol Ring" }] };
  const first = await applyToDeck("zed", removeSolRing, cards, opts);
  expect(first.ok).toEqual(true);

  const second = await applyToDeck("zed", removeSolRing, cards, opts);
  expect(second.ok).toEqual(false);
  if (!second.ok) expect(second.failures[0].reason).toContain("not in the list");
});

test("applyToDeck refuses an unknown list id", async () => {
  await seed();
  const outcome = await applyToDeck("zed", { listId: "nope", label: "x", author: "user", entries: [] }, cards, opts);
  expect(outcome.ok).toEqual(false);
  if (!outcome.ok) expect(outcome.failures[0].reason).toContain("no list");
});

test("snapshot filenames get a numeric suffix on collision", async () => {
  await seed();
  const cs = { listId: MAIN_LIST, label: "same label", author: "user" as const, entries: [{ op: "add" as const, name: "Forest", section: "Lands" }] };
  await applyToDeck("zed", cs, cards, opts);
  await applyToDeck("zed", cs, cards, opts);
  expect((await readdir(join(dir, "zed", "versions"))).sort()).toEqual([
    "2026-09-23-1432-main-same-label-2.json",
    "2026-09-23-1432-main-same-label.json",
  ]);
  expect(snapshotFileName(new Date("2026-01-02T03:04:00Z"), "b4", "A very long label ".repeat(10))).toMatch(
    /^2026-01-02-0304-b4-[a-z-]{1,60}\.json$/,
  );
});

test("setCardMeta merges, an empty tags array clears tags, and renameCard rewrites every list and the meta key", async () => {
  await seed();
  let deck = await setCardMeta("zed", [{ name: "Sol Ring", meta: { tags: ["ramp", "fast-mana"], note: "hi" } }], opts);
  expect(deck.cards["Sol Ring"]).toEqual({ status: "OWNED", printing: { set: "ltc", collectorNumber: "264" }, tags: ["ramp", "fast-mana"], note: "hi" });

  deck = await setCardMeta("zed", [{ name: "Sol Ring", meta: { tags: [] } }], opts);
  expect(deck.cards["Sol Ring"].tags).toBeUndefined();

  deck = await renameCard("zed", "Sol Ring", "Sol Ring, Canonical", opts);
  expect(findEntry(deck.lists[MAIN_LIST], "Sol Ring, Canonical")?.section).toEqual("Ramp");
  expect(deck.cards["Sol Ring"]).toBeUndefined();
  expect(deck.cards["Sol Ring, Canonical"]?.status).toEqual("OWNED");
});

test("listVersions lists json and legacy markdown snapshots newest first; readVersion reads both", async () => {
  await seed();
  await writeFile(
    join(dir, "zed", "versions", "2026-01-01-old-markdown.md"),
    "# Zed\n\n## Commander (1)\n1x Zed\n\n## Lands (2)\n2x Forest\n",
  );
  await applyToDeck("zed", { listId: MAIN_LIST, label: "later", author: "user", entries: [{ op: "add", name: "Forest", section: "Lands" }] }, cards, opts);

  const versions = await listVersions("zed", opts);
  expect(versions.map((v) => v.file)).toEqual(["2026-09-23-1432-main-later.json", "2026-01-01-old-markdown.md"]);
  expect(versions[0]).toMatchObject({ listId: MAIN_LIST, label: "later", legacy: false, takenAt: "2026-09-23T14:32:00.000Z" });
  expect(versions[1]).toMatchObject({ listId: MAIN_LIST, label: "old-markdown", legacy: true, restorable: true, takenAt: "2026-01-01T00:00:00.000Z" });

  expect(listSize(await readVersion("zed", versions[0].file, opts))).toEqual(5);
  expect(listSize(await readVersion("zed", versions[1].file, opts))).toEqual(3);
});

test("setCardMeta keys metadata by the list's own spelling and refuses a card that is in no list", async () => {
  await seed();
  const deck = await setCardMeta("zed", [{ name: "sol ring", meta: { tags: ["ramp"] } }], opts);
  expect(deck.cards["Sol Ring"]?.tags).toEqual(["ramp"]);
  expect(deck.cards["sol ring"]).toBeUndefined();
  await expect(setCardMeta("zed", [{ name: "Not In Deck", meta: { tags: ["x"] } }], opts)).rejects.toThrow(/no list/);
});

test("listVersions infers a legacy snapshot's list from its label and marks status/sideboard snapshots non-restorable", async () => {
  await seed();
  const deck = await readDeck("zed", opts);
  deck.lists.b4 = { ...deck.lists[MAIN_LIST], label: "B4" };
  await writeDeck("zed", deck, opts);
  const v = join(dir, "zed", "versions");
  await writeFile(join(v, "2026-01-01-b4-before-x.md"), "## Commander (1)\n1x Zed\n");
  await writeFile(join(v, "2026-01-02-before-y.md"), "## Commander (1)\n1x Zed\n");
  await writeFile(join(v, "2026-01-03-v1-retired-STATUS.md"), "## Commander\n1x Zed — OWNED\n");
  await writeFile(join(v, "2026-01-04-SIDEBOARD-before-z.md"), "## Sideboard\n1x Zed\n");
  const versions = await listVersions("zed", opts);
  const byFile = Object.fromEntries(versions.map((x) => [x.file, x]));
  expect(byFile["2026-01-01-b4-before-x.md"]).toMatchObject({ listId: "b4", restorable: true });
  expect(byFile["2026-01-02-before-y.md"]).toMatchObject({ listId: MAIN_LIST, restorable: true });
  expect(byFile["2026-01-03-v1-retired-STATUS.md"]).toMatchObject({ restorable: false });
  expect(byFile["2026-01-04-SIDEBOARD-before-z.md"]).toMatchObject({ restorable: false });
});

test("applyToDeck announces every file it is about to write through onBeforeWrite", async () => {
  await seed();
  const written: string[] = [];
  const outcome = await applyToDeck(
    "zed",
    { listId: MAIN_LIST, label: "hook", author: "user", entries: [{ op: "add", name: "Forest", section: "Lands" }] },
    cards,
    { ...opts, onBeforeWrite: (path) => written.push(path.split("/").pop() ?? path) },
  );
  expect(outcome.ok).toEqual(true);
  expect(written.sort()).toEqual(["2026-09-23-1432-main-hook.json", "MOXFIELD.txt", "deck.json", "history.jsonl"].sort());
});
