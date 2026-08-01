import { beforeEach, describe, expect, test } from "bun:test";
import { getCardsByNames, resetCardImagesForTests } from "./card-images";

function card(name: string) {
  return { name, image_uris: { normal: `https://img/${name}` } };
}

/** Fake fetcher matching fetchCardsByNames' contract: keyed by lowercased name. */
function fakeFetcher(known: string[]) {
  const calls: string[][] = [];
  const fetcher = async (names: string[]) => {
    calls.push(names);
    const out: Record<string, any> = {};
    for (const n of names) {
      if (known.includes(n)) out[n] = card(n);
    }
    return out;
  };
  return { fetcher, calls };
}

beforeEach(() => {
  resetCardImagesForTests();
});

describe("getCardsByNames", () => {
  test("fetches, caches, and never refetches known names", async () => {
    const { fetcher, calls } = fakeFetcher(["sol ring"]);

    const first = await getCardsByNames(["Sol Ring"], fetcher);
    expect(first.cards["sol ring"].name).toEqual("sol ring");
    expect(calls.length).toEqual(1);

    const second = await getCardsByNames(["Sol Ring"], fetcher);
    expect(second.cards["sol ring"].name).toEqual("sol ring");
    expect(calls.length).toEqual(1);
  });

  test("concurrent calls serialize — the second finds the cache warm", async () => {
    const { fetcher, calls } = fakeFetcher(["sol ring"]);

    const [a, b] = await Promise.all([
      getCardsByNames(["Sol Ring"], fetcher),
      getCardsByNames(["Sol Ring"], fetcher),
    ]);
    expect(a.cards["sol ring"]).toEqual(b.cards["sol ring"]);
    expect(calls.length).toEqual(1);
  });

  test("not-found names are marked missing and not refetched", async () => {
    const { fetcher, calls } = fakeFetcher([]);

    const first = await getCardsByNames(["Fake Card"], fetcher);
    expect(first.missing).toEqual(["fake card"]);

    await getCardsByNames(["Fake Card"], fetcher);
    expect(calls.length).toEqual(1);
  });

  test("a failing fetcher retries, and a later call retries again (no poison cache)", async () => {
    let attempts = 0;
    const failing = async () => {
      attempts++;
      throw new Error("CORS-masked Scryfall hiccup");
    };

    const result = await getCardsByNames(["Sol Ring"], failing, { retryDelayMs: 1 });
    expect(result.missing).toEqual(["sol ring"]);
    expect(attempts).toEqual(3);

    // Transient failure must NOT be cached as not-found — a later call tries again.
    const { fetcher, calls } = fakeFetcher(["sol ring"]);
    const recovered = await getCardsByNames(["Sol Ring"], fetcher);
    expect(recovered.cards["sol ring"].name).toEqual("sol ring");
    expect(calls.length).toEqual(1);
  });
});
