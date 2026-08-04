#!/usr/bin/env bun
/** Fetch the latest Comprehensive Rules .txt and save it to rules/raw/.
 *
 *  Usage:
 *    bun run scripts/fetch-rules.ts                 # scrape the rules page for the .txt link
 *    bun run scripts/fetch-rules.ts <direct .txt url>   # if the page layout ever changes
 *
 *  Uses Bun's native fetch (not WebFetch) so the ~1 MB raw file is downloaded verbatim. */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { RAW_DIR, repoRelative } from "./lib/paths.ts";

const RULES_PAGE = "https://magic.wizards.com/en/rules";

const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};

async function findTxtUrl(): Promise<string> {
  console.log(`Scraping ${RULES_PAGE} for the rules .txt link…`);
  const res = await fetch(RULES_PAGE, {
    headers: { "user-agent": "Mozilla/5.0 (mtg-agent rules fetcher)" },
  });
  if (!res.ok) throw new Error(`Failed to load rules page: HTTP ${res.status}`);
  const raw = await res.text();

  // The page embeds its links in a JSON payload with escaped slashes, and the published
  // filename contains a space ("MagicCompRules 20260807.txt") — so unescape first and let
  // the match span spaces, stopping only at a quote or tag boundary.
  const html = raw.replace(/\\u002F/gi, "/");
  const matches = [...html.matchAll(/https?:\/\/[^"'<>\\)]+?\.txt/gi)].map((m) => m[0].trim());
  if (matches.length === 0) {
    throw new Error(
      "No .txt link found on the rules page. Its layout may have changed — pass the URL " +
        "directly: bun run scripts/fetch-rules.ts <url>",
    );
  }
  const preferred = matches.find((u) => /comp.*rules|magiccomprules/i.test(u));
  return preferred ?? matches[0];
}

/** Derive a YYYY.MM.DD version stamp from the URL basename or the file's effective date. */
function deriveStamp(url: string, content: string): string {
  // Match against the decoded basename only: a percent-encoded space ("%2020260807") would
  // otherwise read as the date 2020.26.08, and the digit lookarounds keep the match from
  // slicing a date out of the middle of a longer run.
  const basename = url.split("/").pop()?.replace(/%20/g, " ") ?? url;

  const fromUrl = basename.match(/(?<!\d)(\d{4})[.\-_ ]?(\d{2})[.\-_ ]?(\d{2})(?!\d)/);
  if (fromUrl) return `${fromUrl[1]}.${fromUrl[2]}.${fromUrl[3]}`;

  const eff = content.match(/effective as of\s+([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})/i);
  if (eff) {
    const month = MONTHS[eff[1].toLowerCase()] ?? "00";
    return `${eff[3]}.${month}.${eff[2].padStart(2, "0")}`;
  }
  return "unknown";
}

async function main() {
  const arg = process.argv[2];
  const found = arg && /^https?:\/\//.test(arg) ? arg : await findTxtUrl();

  /** Percent-encodes any literal space in the filename; idempotent if already encoded. */
  const url = new URL(found).href;

  console.log(`Downloading ${url}`);
  const res = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (mtg-agent rules fetcher)" },
  });
  if (!res.ok) throw new Error(`Failed to download rules file: HTTP ${res.status}`);
  const content = await res.text();

  if (!/Comprehensive Rules/i.test(content)) {
    throw new Error("Downloaded file does not look like the Comprehensive Rules. Aborting.");
  }

  await mkdir(RAW_DIR, { recursive: true });
  const stamp = deriveStamp(url, content);
  const fileName = `MagicCompRules.${stamp}.txt`;
  const dest = join(RAW_DIR, fileName);

  const existing = await readdir(RAW_DIR);
  if (existing.includes(fileName)) {
    console.log(`Already have ${fileName} — re-downloading to ensure it's current.`);
  }

  await writeFile(dest, content);
  console.log(`✓ Saved ${repoRelative(dest)} (${content.length.toLocaleString()} bytes)`);
  console.log("Now run: bun run scripts/build-rules.ts");
}

main().catch((err) => {
  console.error("Fetch failed:", err);
  process.exit(1);
});
