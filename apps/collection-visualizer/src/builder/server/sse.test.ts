import { describe, expect, test } from "bun:test";
import { sseResponse } from "./sse";

function bodyOf(text: string): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

describe("sseResponse", () => {
  test("declares an identity encoding so preview/proxy compression cannot buffer the frames", async () => {
    // Vite's preview server gzips text responses whose first chunk is >= 1 KB and only flushes when
    // the stream ends — a hello frame replaying a transcript never reached the browser. Any
    // Content-Encoding header makes that middleware (and no-transform makes proxies) leave it alone.
    const res = sseResponse(bodyOf("data: {}\n\n"));

    expect(res.status).toEqual(200);
    expect(res.headers.get("content-type")).toEqual("text/event-stream");
    expect(res.headers.get("content-encoding")).toEqual("identity");
    expect(res.headers.get("cache-control")).toEqual("no-cache, no-transform");
    expect(await res.text()).toEqual("data: {}\n\n");
  });
});
