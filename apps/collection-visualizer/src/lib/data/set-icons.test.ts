import { test, expect } from "bun:test";
import { iconId, parseSetIcon, missingIcons, iconsForSets, emptyIconCache, type SetIconCache } from "./set-icons";

test("iconId strips the path and the cache-busting query", () => {
  expect(iconId("https://svgs.scryfall.io/sets/neo.svg?1783915200")).toEqual("neo");
  expect(iconId("https://svgs.scryfall.io/sets/star.svg")).toEqual("star");
});

test("parseSetIcon keeps the viewBox and drops hard-coded fills so currentColor wins", () => {
  const icon = parseSetIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195 95"><path fill="#000" d="M1 2"/></svg>');
  expect(icon).toEqual({ viewBox: "0 0 195 95", body: '<path d="M1 2"/>' });
});

test("parseSetIcon leaves fill=none alone — it carves a shape rather than coloring it", () => {
  const icon = parseSetIcon('<svg viewBox="0 0 10 10"><path fill="none" d="M1 2"/></svg>');
  expect(icon?.body).toEqual('<path fill="none" d="M1 2"/>');
});

test("parseSetIcon keeps nested groups", () => {
  const icon = parseSetIcon('<svg viewBox="0 0 10 10"><g><path fill="#444" d="M1 2"/></g></svg>');
  expect(icon?.body).toEqual('<g><path d="M1 2"/></g>');
});

// The body is injected as raw HTML on the client, so anything outside the known-safe tags is refused
// rather than sanitized — a symbol that doesn't render beats one that runs.
test("parseSetIcon refuses markup outside the tag allowlist", () => {
  expect(parseSetIcon('<svg viewBox="0 0 10 10"><script>alert(1)</script></svg>')).toEqual(null);
  expect(parseSetIcon('<svg viewBox="0 0 10 10"><image href="x"/></svg>')).toEqual(null);
});

test("parseSetIcon returns null without a viewBox, which it can't be scaled without", () => {
  expect(parseSetIcon('<svg><path d="M1 2"/></svg>')).toEqual(null);
});

test("missingIcons lists only symbols not yet downloaded", () => {
  const cache: SetIconCache = {
    fetchedAt: 1,
    sets: { neo: "neo", sld: "star" },
    uris: { neo: "https://x/neo.svg?1", star: "https://x/star.svg?1" },
    icons: { neo: { viewBox: "0 0 1 1", body: "" } },
  };
  expect(missingIcons(cache)).toEqual([{ id: "star", uri: "https://x/star.svg?1" }]);
});

test("iconsForSets resolves codes through the shared-symbol indirection", () => {
  const star = { viewBox: "0 0 1 1", body: "<path/>" };
  const cache: SetIconCache = {
    fetchedAt: 1,
    // Both Secret Lair and Store Championships legitimately share one symbol file.
    sets: { sld: "star", sch: "star" },
    uris: {},
    icons: { star },
  };
  expect(iconsForSets(cache, ["SLD", "SCH"])).toEqual({ SLD: star, SCH: star });
});

test("iconsForSets skips sets with no vendored symbol rather than emitting holes", () => {
  expect(iconsForSets(emptyIconCache(), ["NEO"])).toEqual({});
});
