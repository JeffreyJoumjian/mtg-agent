import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  archiveDeck,
  createDeck,
  listArchivedSlugs,
  listDeckSlugs,
  readDeck,
  restoreDeck,
  type StoreOptions,
} from "../scripts/lib/deck-store.ts";

let dir = "";
let opts: StoreOptions;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "deck-archive-"));
  opts = { decksDir: dir, now: () => new Date("2026-09-24T10:00:00Z") };
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

test("archiveDeck moves the whole folder under _archive and restoreDeck moves it back", async () => {
  await createDeck("zed", "Zed", opts);
  await writeFile(join(dir, "zed", "research", "notes.md"), "keep me\n");

  await archiveDeck("zed", opts);
  expect(await listDeckSlugs(opts)).toEqual([]);
  expect(await listArchivedSlugs(opts)).toEqual(["zed"]);
  const archived = await readDeck("zed", {
    ...opts,
    decksDir: join(dir, "_archive"),
  });
  expect(archived.name).toEqual("Zed");
  expect(await Bun.file(join(dir, "_archive", "zed", "research", "notes.md")).text()).toEqual("keep me\n");

  await restoreDeck("zed", opts);
  expect(await listDeckSlugs(opts)).toEqual(["zed"]);
  expect(await listArchivedSlugs(opts)).toEqual([]);
  expect(await Bun.file(join(dir, "zed", "research", "notes.md")).text()).toEqual("keep me\n");
});

test("archiveDeck refuses a folder that is not a deck, and a slug already in the archive", async () => {
  await expect(archiveDeck("ghost", opts)).rejects.toThrow(/no deck at/);

  await createDeck("zed", "Zed", opts);
  await archiveDeck("zed", opts);
  await createDeck("zed", "Zed again", opts);
  await expect(archiveDeck("zed", opts)).rejects.toThrow(/already uses/);
  expect(await listDeckSlugs(opts)).toEqual(["zed"]);
  expect(await listArchivedSlugs(opts)).toEqual(["zed"]);
});

test("restoreDeck refuses when nothing is archived under the slug or a live deck has it", async () => {
  await expect(restoreDeck("zed", opts)).rejects.toThrow(/no archived deck at/);

  await createDeck("zed", "Zed", opts);
  await archiveDeck("zed", opts);
  await createDeck("zed", "Zed again", opts);
  await expect(restoreDeck("zed", opts)).rejects.toThrow(/a deck already uses/);
});

test("archiveDeck and restoreDeck reject anything that is not a plain slug", async () => {
  await expect(archiveDeck("../zed", opts)).rejects.toThrow(/not a deck slug/);
  await expect(restoreDeck("_archive", opts)).rejects.toThrow(/not a deck slug/);
});
