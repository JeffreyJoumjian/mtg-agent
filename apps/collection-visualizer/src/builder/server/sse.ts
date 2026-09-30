// Server only — see lib/server/README.md. The one place SSE response headers are built, so every
// stream in the app carries the same anti-buffering headers.

/** A streaming `text/event-stream` response.
 *
 *  `Content-Encoding: identity` is load-bearing, not decoration: Vite's preview server gzips any
 *  text response whose first chunk is 1 KB or more and only flushes zlib when the response ends,
 *  so a `hello` frame replaying a transcript never reached the browser (`vite dev` has no such
 *  middleware, which is why the bug only showed under `bun run start`). Any Content-Encoding
 *  makes that middleware skip the response; `no-transform` asks proxies to do the same. */
export function sseResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Content-Encoding": "identity",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
