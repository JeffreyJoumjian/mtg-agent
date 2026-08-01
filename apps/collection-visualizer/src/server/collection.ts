import { createServerFn } from "@tanstack/react-start";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { CardTile, CollectionRow, Currency, Finish, PriceCache, PriceSet, SetIcon } from "~/lib/types";
import { parseManaBoxCsv } from "~/lib/data/csv";
import { groupRows, enrichTiles, ownedIds } from "~/lib/data/grouping";
import { ownedSets } from "~/lib/view/filters";
import { loadCache, saveCache, staleIds, mergeRefresh, DATA_DIR } from "~/lib/server/price-cache";
import { loadHistory, saveHistory, recordPrices, seedFromCache, dayOf } from "~/lib/server/price-history";
import { applyOverrides, setOverride, clearOverride, type PurchaseOverrides } from "~/lib/data/purchase-overrides";
import { loadOverrides, saveOverrides } from "~/lib/server/purchase-overrides";
import { fetchCardsByIds } from "~/lib/data/scryfall";
import { iconsForSets, emptyIconCache } from "~/lib/data/set-icons";
import { loadIconCache, refreshSetIcons } from "~/lib/server/set-icon-cache";
import { getSets } from "~/lib/server/set-cache";
import { valueSeries, windowDelta } from "~/lib/view/history";

export interface CollectionResponse {
  tiles: CardTile[];
  pricesUpdatedAt: number | null;
  sets: { code: string; name: string }[];
  /** Symbols for the owned sets only, keyed by set code. */
  setIcons: Record<string, SetIcon>;
}

const CSV_PATH = join(DATA_DIR, "collection.csv");

/** Pure: assemble a response from rows + caches (group, enrich, apply overrides, sets, symbols,
 *  oldest fetchedAt). */
export function buildResponse(
  rows: CollectionRow[],
  cache: PriceCache,
  icons = emptyIconCache(),
  overrides: PurchaseOverrides = {},
): CollectionResponse {
  const tiles = applyOverrides(enrichTiles(groupRows(rows), cache), overrides);
  const fetchedTimes = tiles.map((t) => t.fetchedAt).filter((n) => n > 0);
  const sets = ownedSets(tiles);
  return {
    tiles,
    sets,
    setIcons: iconsForSets(
      icons,
      sets.map((s) => s.code),
    ),
    pricesUpdatedAt: fetchedTimes.length > 0 ? Math.min(...fetchedTimes) : null,
  };
}

async function readRows(): Promise<CollectionRow[]> {
  try {
    return parseManaBoxCsv(await readFile(CSV_PATH, "utf8"));
  } catch {
    return [];
  }
}

/** Set symbols are decoration, so a problem fetching them must never fail the price refresh that
 *  triggered it — fall back to whatever is already vendored. */
async function refreshIcons(now: number) {
  try {
    return await refreshSetIcons(now);
  } catch {
    return loadIconCache();
  }
}

/** Append this refresh's prices to the permanent history.
 *
 *  Only the ids we actually fetched have prices new enough to file under today. On the very first
 *  run the history file doesn't exist yet, so it's seeded from the prices already cached — the
 *  pre-refresh cache, so those points keep the dates they were fetched on rather than all landing
 *  on today.
 *
 *  A failure here must not take the refresh down with it: the prices themselves are already saved,
 *  and a chart missing a day is a far smaller problem than a refresh that won't complete. It's
 *  logged rather than swallowed, since a history that silently stops recording defeats the point. */
async function recordHistory(before: PriceCache, after: PriceCache, fetched: string[], now: number) {
  try {
    const stored = await loadHistory();
    const history = Object.keys(stored).length === 0 ? seedFromCache(before) : stored;

    const priceById: Record<string, PriceSet> = {};
    for (const id of fetched) {
      const entry = after[id];
      if (entry) priceById[id] = entry.current;
    }

    await saveHistory(recordPrices(history, priceById, now));
  } catch (err) {
    console.error("[price-history] failed to record this refresh:", err);
  }
}

/** Refresh any stale/missing owned prices, persist, and return the assembled response. */
async function refresh(rows: CollectionRow[], force: boolean): Promise<CollectionResponse> {
  const cache = await loadCache();
  const overrides = await loadOverrides();
  const ids = ownedIds(rows);
  const now = Date.now();
  const toFetch = force ? ids : staleIds(cache, ids, now);
  // Only an explicit refresh goes looking for new symbols; a page load serves what's already
  // vendored, so a first run never blocks rendering on ~360 icon downloads.
  const icons = force ? await refreshIcons(now) : await loadIconCache();

  if (toFetch.length === 0) return buildResponse(rows, cache, icons, overrides);

  try {
    const raw = await fetchCardsByIds(toFetch);
    const nextCache = mergeRefresh(cache, raw, now);
    await saveCache(nextCache);
    await recordHistory(cache, nextCache, Object.keys(raw), now);
    return buildResponse(rows, nextCache, icons, overrides);
  } catch (err) {
    // A manual refresh surfaces the error to its mutation; an automatic (stale-TTL) load
    // must never crash the page — serve whatever prices we already have cached.
    if (force) throw err;
    return buildResponse(rows, cache, icons, overrides);
  }
}

export const getCollection = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await readRows();
  return refresh(rows, false);
});

/** The collection plus Scryfall's set list, which the Collections page needs for its denominators. */
export const getCollectionWithSets = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await readRows();
  const collection = await refresh(rows, false);
  const sets = await getSets(Date.now());

  return { ...collection, setInfo: sets };
});

export const refreshPrices = createServerFn({ method: "POST" }).handler(async () => {
  const rows = await readRows();
  return refresh(rows, true);
});

/** Daily value of the whole collection, or of one set.
 *
 *  Aggregated here rather than on the client: the history file only grows, and shipping every card's
 *  series to the browser to sum it there would get worse every week. Both currencies come back
 *  together so flipping USD/EUR is instant instead of a refetch. */
export const getValueHistory = createServerFn({ method: "GET" })
  .validator((data: unknown): { setCode?: string } => {
    const setCode = (data as { setCode?: unknown })?.setCode;
    return { setCode: typeof setCode === "string" && setCode !== "" ? setCode : undefined };
  })
  .handler(async ({ data }) => {
    const [rows, cache, history] = await Promise.all([readRows(), loadCache(), loadHistory()]);
    const tiles = enrichTiles(groupRows(rows), cache);
    const scoped = data.setCode ? tiles.filter((t) => t.setCode.toLowerCase() === data.setCode!.toLowerCase()) : tiles;

    return { points: valueSeries(scoped, history) };
  });

/** One card's recorded prices. Fetched per card as the drawer opens rather than shipped with the
 *  collection — only ever one card is on screen. */
export const getCardHistory = createServerFn({ method: "GET" })
  .validator((data: unknown): { scryfallId: string } => {
    const id = (data as { scryfallId?: unknown })?.scryfallId;
    if (typeof id !== "string" || id === "") throw new Error("scryfallId is required");
    return { scryfallId: id };
  })
  .handler(async ({ data }) => {
    const history = await loadHistory();
    return { points: history[data.scryfallId] ?? [] };
  });

/** One card that moved in price over the window, ready to render in the movers strip. */
export interface Mover {
  key: string;
  scryfallId: string;
  name: string;
  setCode: string;
  collectorNumber: string;
  finish: Finish;
  /** Change in unit price over the window, in the requested currency. */
  absolute: number;
  ratio: number | null;
}

/** The biggest gainers and losers over the last `days`, for the whole library or one set.
 *
 *  A "move" is a printing's unit-price change from its value `days` ago (carried forward from the
 *  last recorded point) to now — so it ranks how the card itself moved, not portfolio impact. Ranked
 *  on the server for the same reason the value series is: the history file only grows. */
export const getTopMovers = createServerFn({ method: "GET" })
  .validator((data: unknown): { setCode?: string; currency: Currency; days: number } => {
    const d = data as { setCode?: unknown; currency?: unknown; days?: unknown };
    const setCode = typeof d?.setCode === "string" && d.setCode !== "" ? d.setCode : undefined;
    const currency: Currency = d?.currency === "eur" ? "eur" : "usd";
    const days = typeof d?.days === "number" && d.days > 0 ? d.days : 7;
    return { setCode, currency, days };
  })
  .handler(async ({ data }) => {
    const [rows, cache, history] = await Promise.all([readRows(), loadCache(), loadHistory()]);
    const tiles = enrichTiles(groupRows(rows), cache);
    const scoped = data.setCode ? tiles.filter((t) => t.setCode.toLowerCase() === data.setCode!.toLowerCase()) : tiles;

    const cutoff = dayOf(Date.now() - data.days * 86_400_000);

    const movers: Mover[] = [];
    for (const t of scoped) {
      const points = history[t.scryfallId];
      if (!points) continue;

      const delta = windowDelta(points, data.currency, t.finish, cutoff);
      if (!delta || delta.absolute === 0) continue;

      movers.push({
        key: t.key,
        scryfallId: t.scryfallId,
        name: t.name,
        setCode: t.setCode,
        collectorNumber: t.collectorNumber,
        finish: t.finish,
        absolute: delta.absolute,
        ratio: delta.ratio,
      });
    }

    const byMagnitude = (a: Mover, b: Mover) => Math.abs(b.absolute) - Math.abs(a.absolute);
    const gainers = movers
      .filter((m) => m.absolute > 0)
      .sort(byMagnitude)
      .slice(0, 5);
    const losers = movers
      .filter((m) => m.absolute < 0)
      .sort(byMagnitude)
      .slice(0, 5);

    return { gainers, losers, days: data.days, since: cutoff };
  });

const FINISHES: Finish[] = ["normal", "foil", "etched"];

function asFinish(v: unknown): Finish {
  if (typeof v === "string" && (FINISHES as string[]).includes(v)) return v as Finish;
  throw new Error("finish must be normal, foil, or etched");
}

/** Set (or replace) the manual purchase price for one printing + finish. Written to its own file, so
 *  a later CSV upload leaves it untouched. */
export const setPurchaseOverride = createServerFn({ method: "POST" })
  .validator((data: unknown): { scryfallId: string; finish: Finish; price: number; currency: string } => {
    const d = data as { scryfallId?: unknown; finish?: unknown; price?: unknown; currency?: unknown };
    if (typeof d?.scryfallId !== "string" || d.scryfallId === "") throw new Error("scryfallId is required");
    if (typeof d?.price !== "number" || !Number.isFinite(d.price) || d.price < 0)
      throw new Error("price must be a number ≥ 0");
    const currency = typeof d?.currency === "string" && d.currency !== "" ? d.currency : "usd";
    return { scryfallId: d.scryfallId, finish: asFinish(d.finish), price: d.price, currency };
  })
  .handler(async ({ data }) => {
    const overrides = await loadOverrides();
    await saveOverrides(setOverride(overrides, data.scryfallId, data.finish, data.price, data.currency));
    return { ok: true as const };
  });

/** Remove a manual purchase price, falling back to whatever the CSV recorded. */
export const clearPurchaseOverride = createServerFn({ method: "POST" })
  .validator((data: unknown): { scryfallId: string; finish: Finish } => {
    const d = data as { scryfallId?: unknown; finish?: unknown };
    if (typeof d?.scryfallId !== "string" || d.scryfallId === "") throw new Error("scryfallId is required");
    return { scryfallId: d.scryfallId, finish: asFinish(d.finish) };
  })
  .handler(async ({ data }) => {
    const overrides = await loadOverrides();
    await saveOverrides(clearOverride(overrides, data.scryfallId, data.finish));
    return { ok: true as const };
  });

export const uploadCsv = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Expected FormData");
    const file = data.get("file");
    if (!(file instanceof File)) throw new Error("Missing file");
    return file;
  })
  .handler(async ({ data: file }) => {
    const text = await file.text();
    // Validate it looks like a ManaBox export before overwriting.
    if (!text.includes("Scryfall ID")) throw new Error('Not a ManaBox CSV (missing "Scryfall ID" column)');
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CSV_PATH, text);
    const rows = parseManaBoxCsv(text);
    return refresh(rows, false);
  });
