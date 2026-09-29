import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getPrintings, printingKey } from "../scripts/lib/card-cache.ts";
import type { CardSummary, PrintingRef } from "../scripts/lib/scryfall.ts";

let dir = "";
let cachePath = "";

const summary = (set: string, collectorNumber: string, over: Partial<CardSummary> = {}): CardSummary =>
  ({
    id: `id-${set}-${collectorNumber}`,
    oracleId: "oracle-sol-ring",
    name: "Sol Ring",
    manaCost: "{1}",
    cmc: 1,
    typeLine: "Artifact",
    oracleText: "{T}: Add {C}{C}.",
    colors: [],
    colorIdentity: [],
    producedMana: ["C"],
    keywords: [],
    layout: "normal",
    gameChanger: false,
    set,
    setName: set.toUpperCase(),
    collectorNumber,
    rarity: "uncommon",
    usd: 1,
    commanderLegal: "legal",
    artist: "",
    scryfallUri: `https://scryfall.com/card/${set}/${collectorNumber}`,
    imageUri: `https://img/${set}/${collectorNumber}.jpg`,
    images: { small: null, normal: `https://img/${set}/${collectorNumber}.jpg`, artCrop: null },
    faces: [],
    ...over,
  }) as CardSummary;

/** A fake Scryfall that knows two printings and counts its calls. */
function fakeFetch(known: Record<string, CardSummary>) {
  const calls: PrintingRef[][] = [];
  const fetch = async (refs: PrintingRef[]) => {
    calls.push(refs);
    const found = refs.flatMap((r) => (known[printingKey(r)] ? [known[printingKey(r)]] : []));
    const notFound = refs.filter((r) => !known[printingKey(r)]);
    return { found, notFound };
  };
  return { fetch, calls };
}

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "printings-"));
  cachePath = join(dir, "card-cache.json");
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

test("printingKey lower-cases the set and trims the number", () => {
  expect(printingKey({ set: "LTC", collectorNumber: " 264 " })).toEqual("ltc|264");
});

test("getPrintings fetches misses once, then serves them from the cache under their own keys", async () => {
  const { fetch, calls } = fakeFetch({ "ltc|264": summary("ltc", "264"), "c21|1": summary("c21", "1") });
  const refs = [
    { set: "LTC", collectorNumber: "264" },
    { set: "c21", collectorNumber: "1" },
  ];

  const first = await getPrintings(refs, 1000, { cachePath, fetchPrintingsByNumber: fetch });
  expect(Object.keys(first).sort()).toEqual(["c21|1", "ltc|264"]);
  expect(first["ltc|264"].images.normal).toEqual("https://img/ltc/264.jpg");
  expect(calls).toEqual([
    [
      { set: "LTC", collectorNumber: "264" },
      { set: "c21", collectorNumber: "1" },
    ],
  ]);

  const second = await getPrintings(refs, 2000, { cachePath, fetchPrintingsByNumber: fetch });
  expect(second).toEqual(first);
  expect(calls.length).toEqual(1);

  const file = JSON.parse(await readFile(cachePath, "utf8")) as Record<string, unknown>;
  expect(Object.keys(file).sort()).toEqual(["printing:c21|1", "printing:ltc|264"]);
});

test("getPrintings never stores an unknown printing and asks again next time", async () => {
  const { fetch, calls } = fakeFetch({});
  const refs = [{ set: "xyz", collectorNumber: "999" }];

  expect(await getPrintings(refs, 1000, { cachePath, fetchPrintingsByNumber: fetch })).toEqual({});
  expect(await getPrintings(refs, 2000, { cachePath, fetchPrintingsByNumber: fetch })).toEqual({});
  expect(calls.length).toEqual(2);
});

test("getPrintings serves a stale entry when Scryfall is unreachable, and refreshes it after the TTL", async () => {
  const { fetch, calls } = fakeFetch({ "ltc|264": summary("ltc", "264") });
  const refs = [{ set: "ltc", collectorNumber: "264" }];
  const day = 24 * 60 * 60 * 1000;

  await getPrintings(refs, 1000, { cachePath, fetchPrintingsByNumber: fetch });
  const down = async () => {
    throw new Error("offline");
  };
  const stale = await getPrintings(refs, 1000 + day + 1, { cachePath, fetchPrintingsByNumber: down });
  expect(stale["ltc|264"].id).toEqual("id-ltc-264");

  await getPrintings(refs, 1000 + day + 1, { cachePath, fetchPrintingsByNumber: fetch });
  expect(calls.length).toEqual(2);
});

test("getPrintings ignores refs with a blank set or number", async () => {
  const { fetch, calls } = fakeFetch({});
  expect(
    await getPrintings([{ set: "", collectorNumber: "1" }], 1000, { cachePath, fetchPrintingsByNumber: fetch }),
  ).toEqual({});
  expect(calls).toEqual([]);
});
