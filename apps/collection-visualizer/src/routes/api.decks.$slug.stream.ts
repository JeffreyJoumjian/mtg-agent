import { createFileRoute } from '@tanstack/react-router'
import { getDeckSession } from '~/server/deck-agent/manager'
import { isValidSlug } from '~/lib/deck/slug'
import type { WireEvent } from '~/lib/deck/chat-events'

/** SSE stream of the deck session's transcript. First frame is a `hello` replay of the full
 *  history so a refreshed tab (or a reconnecting EventSource) rebuilds its state. */
export const Route = createFileRoute('/api/decks/$slug/stream')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!isValidSlug(params.slug)) {
          return new Response('bad slug', { status: 400 })
        }
        const session = await getDeckSession(params.slug)

        let cleanup = () => {}
        const stream = new ReadableStream({
          start(controller) {
            const enc = new TextEncoder()
            const send = (data: WireEvent) => {
              try {
                controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`))
              } catch {
                cleanup()
              }
            }

            send({ kind: 'hello', events: session.history() })
            const unsubscribe = session.subscribe(send)
            const ping = setInterval(() => {
              try {
                controller.enqueue(enc.encode(': ping\n\n'))
              } catch {
                cleanup()
              }
            }, 15000)
            cleanup = () => {
              unsubscribe()
              clearInterval(ping)
            }
          },
          cancel() {
            cleanup()
          },
        })

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        })
      },
    },
  },
})
