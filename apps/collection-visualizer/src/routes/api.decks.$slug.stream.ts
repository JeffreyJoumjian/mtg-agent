import { createFileRoute } from "@tanstack/react-router";
import { randomUUID } from "node:crypto";
import { getDeckSession } from "~/builder/server/agent/manager";
import { subscribeDeck } from "~/builder/server/watcher";
import { sseResponse } from "~/builder/server/sse";
import type { WireEvent } from "~/builder/chat/events";

/** SSE stream of the deck session's transcript plus `deck-changed` pings from the file watcher.
 *  First frame is a `hello` replay of the full history so a refreshed tab rebuilds its state. */
export const Route = createFileRoute("/api/decks/$slug/stream")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!/^[a-z0-9-]+$/.test(params.slug)) {
          return new Response("bad slug", { status: 400 });
        }
        const session = await getDeckSession(params.slug);

        let cleanup = () => {};
        const stream = new ReadableStream({
          start(controller) {
            const enc = new TextEncoder();
            const send = (data: WireEvent) => {
              try {
                controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`));
              } catch {
                cleanup();
              }
            };

            send({ kind: "hello", events: session.history() });
            const unsubscribeChat = session.subscribe(send);
            const unsubscribeDeck = subscribeDeck(params.slug, () => send({ kind: "deck-changed", id: randomUUID() }));
            const ping = setInterval(() => {
              try {
                controller.enqueue(enc.encode(": ping\n\n"));
              } catch {
                cleanup();
              }
            }, 15000);
            cleanup = () => {
              unsubscribeChat();
              unsubscribeDeck();
              clearInterval(ping);
            };
          },
          cancel() {
            cleanup();
          },
        });

        return sseResponse(stream);
      },
    },
  },
});
