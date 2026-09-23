import { test, expect } from "bun:test";
import { normalizeCardName, matchKey, matchRequested } from "../scripts/lib/card-cache.ts";

test("normalizeCardName straightens quotes, collapses whitespace and keeps accents", () => {
  expect(normalizeCardName("Witch’s  Mark ")).toEqual("Witch's Mark");
  expect(normalizeCardName("Bartolomé del Presidio")).toEqual("Bartolomé del Presidio");
  expect(normalizeCardName("“Ach! Hans, Run!”")).toEqual('"Ach! Hans, Run!"');
});

test("matchKey folds case and accents so Bartolome finds Bartolomé", () => {
  expect(matchKey("Bartolome del Presidio")).toEqual(matchKey("Bartolomé del Presidio"));
  expect(matchKey("WITCH’S MARK")).toEqual("witch's mark");
});

test("matchRequested pairs requested names with found cards by normalised key, front face included", () => {
  const found = [
    { name: "Witch's Mark" },
    { name: "Valakut Awakening // Valakut Stoneforge" },
    { name: "Bartolomé del Presidio" },
  ] as any[];
  const out = matchRequested(["Witch’s Mark", "valakut awakening", "Bartolome del Presidio", "Nope"], found);
  expect(Object.keys(out.found)).toEqual(["Witch’s Mark", "valakut awakening", "Bartolome del Presidio"]);
  expect(out.found["valakut awakening"].name).toEqual("Valakut Awakening // Valakut Stoneforge");
  expect(out.unresolved).toEqual(["Nope"]);
});

test("matchRequested never lets a front-face alias shadow a card whose real name is that face", () => {
  const found = [{ name: "Fire // Ice" }, { name: "Fire" }] as any[];
  const out = matchRequested(["Fire"], found);
  expect(out.found["Fire"].name).toEqual("Fire");
});

test("deckName is the front face of Scryfall's name — the spelling every deck file uses", () => {
  const { deckName } = require("../scripts/lib/card-cache.ts");
  expect(deckName({ name: "Valakut Awakening // Valakut Stoneforge" })).toEqual("Valakut Awakening");
  expect(deckName({ name: "Sol Ring" })).toEqual("Sol Ring");
});

test("cacheKeysFor stores a DFC under its full name and its front face, unless the front face is a card of its own", () => {
  const { cacheKeysFor } = require("../scripts/lib/card-cache.ts");
  expect(cacheKeysFor({ name: "Valakut Awakening // Valakut Stoneforge" }, [])).toEqual(["valakut awakening // valakut stoneforge", "valakut awakening"]);
  expect(cacheKeysFor({ name: "Fire // Ice" }, [{ name: "Fire" }])).toEqual(["fire // ice"]);
  expect(cacheKeysFor({ name: "Sol Ring" }, [])).toEqual(["sol ring"]);
});

test("resolveNames falls back to stale cache entries when Scryfall is unreachable and says so", async () => {
  const { resolveNames } = require("../scripts/lib/card-cache.ts");
  const { mkdtemp, writeFile, rm } = require("node:fs/promises");
  const { join } = require("node:path");
  const { tmpdir } = require("node:os");
  const dir = await mkdtemp(join(tmpdir(), "card-cache-"));
  const cachePath = join(dir, "card-cache.json");
  const stale = { summary: { id: "x", name: "Sol Ring", manaCost: "{1}", cmc: 1 }, fetchedAt: 0 };
  await writeFile(cachePath, JSON.stringify({ "sol ring": stale }));
  try {
    const res = await resolveNames(["Sol Ring", "Never Cached"], Date.now(), {
      cachePath,
      fetchCollection: async () => {
        throw new Error("offline");
      },
      fetchCardByName: async () => {
        throw new Error("offline");
      },
    });
    expect(res.found["Sol Ring"]?.name).toEqual("Sol Ring");
    expect(res.unresolved).toEqual(["Never Cached"]);
    expect(res.degraded).toContain("offline");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
