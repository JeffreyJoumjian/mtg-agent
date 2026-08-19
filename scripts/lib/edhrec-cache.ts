/** Local, git-ignored EDHREC cache over the EDHREC client.
 *
 *  EDHREC rebuilds its statistics roughly weekly, so entries live for 7 days — much longer
 *  than the 24 h Scryfall card cache, whose prices genuinely move daily. Only the compact
 *  projection is stored (a few KB per page), never the ~100 KB raw payload.
 *
 *  Like `card-cache.ts`, this is a snapshot/convenience layer, not source of truth: delete
 *  `data/edhrec-cache.json` and it rebuilds itself on the next lookup. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { EDHREC_CACHE_PATH } from "./paths.ts";
import {
  fetchPage,
  projectCardPage,
  projectCommanderPage,
  slugify,
  type EdhrecCardPage,
  type EdhrecCommanderPage,
} from "./edhrec.ts";

const TTL_MS = 7 * 24 * 60 * 60 * 1000;

interface CacheEntry {
  page: unknown;
  fetchedAt: number;
}
type CacheFile = Record<string, CacheEntry>;

async function load(): Promise<CacheFile> {
  try {
    return JSON.parse(await readFile(EDHREC_CACHE_PATH, "utf8")) as CacheFile;
  } catch {
    return {};
  }
}

async function save(cache: CacheFile): Promise<void> {
  await mkdir(dirname(EDHREC_CACHE_PATH), { recursive: true });
  await writeFile(EDHREC_CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
}

async function getPage<T>(path: string, project: (raw: any) => T, now: number): Promise<T> {
  const cache = await load();
  const hit = cache[path];
  if (hit && now - hit.fetchedAt < TTL_MS) return hit.page as T;

  const page = project(await fetchPage(path));
  cache[path] = { page, fetchedAt: now };
  await save(cache);
  return page;
}

/** Get a commander's page, optionally filtered to one of its theme subpages. */
export async function getCommanderPage(
  name: string,
  theme?: string,
  now = Date.now(),
): Promise<EdhrecCommanderPage> {
  const path = `commanders/${slugify(name)}${theme ? `/${theme}` : ""}`;
  return getPage(path, projectCommanderPage, now);
}

/** Get a card's site-wide page: inclusion, salt, top commanders. */
export async function getCardPage(name: string, now = Date.now()): Promise<EdhrecCardPage> {
  return getPage(`cards/${slugify(name)}`, projectCardPage, now);
}
