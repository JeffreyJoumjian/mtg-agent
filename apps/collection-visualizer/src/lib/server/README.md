# lib/server

Modules in here touch `node:fs` and only ever run on the server — the disk caches under `DATA_DIR`.

**Nothing under `src/components/` may import from this folder**, directly or transitively. There's no
build-time guard: Vite happily externalises `node:fs` to a browser stub, so the import resolves, the
bundle builds, `tsc` stays green, and the app dies at runtime on the first property access
(`Module "node:fs/promises" has been externalized for browser compatibility`).

That has already happened once. A pure, client-reachable helper imported `set-icons.ts`, which back
then imported `price-cache.ts` for its cache directory — three hops from a component to `node:fs`,
invisible to every check we run. The fix was to split the pure half from the I/O half, which is what
this folder makes structural:

| pure — safe anywhere      | server-only — here            |
| ------------------------- | ----------------------------- |
| `lib/data/set-icons.ts`   | `lib/server/set-icon-cache.ts` |
| `lib/data/scryfall.ts`    | `lib/server/price-cache.ts`    |

`lib/data/scryfall.ts` fetches over HTTP and stays pure, so it's importable from either side.

Server functions in `src/server/` are the intended callers. If a component needs something from here,
it needs it through a server function, not an import.

To check nothing has crept in, load the app and confirm the browser requests no `lib/server/` module:

```js
performance.getEntriesByType("resource").filter((r) => /lib\/server\//.test(r.name)); // must be []
```
