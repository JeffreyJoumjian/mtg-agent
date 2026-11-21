import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ingest, type IngestPayload } from "@mtg/edhplay-store.ts";
import { json, refuseUnlessExtension } from "~/edhplay/http";

const frame = z.object({ i: z.number().int().min(0), t: z.number(), dir: z.enum(["in", "out"]), data: z.unknown() });
const logLine = z.object({
  i: z.number().int().min(0),
  id: z.string(),
  playerId: z.string(),
  message: z.string(),
  timestamp: z.string(),
  channel: z.string(),
  cardName: z.string().optional(),
  cardId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
const meta = z.object({
  captureId: z.string(),
  source: z.enum(["ws", "solo"]),
  roomId: z.string().nullable(),
  spectator: z.boolean(),
  pageUrl: z.string(),
  startedAt: z.number(),
  endedAt: z.number().optional(),
  me: z.object({ id: z.string(), username: z.string() }).optional(),
  extensionVersion: z.string().optional(),
  protocolVersion: z.number().optional(),
  players: z
    .array(
      z.object({
        playerId: z.string(),
        username: z.string(),
        deckId: z.string().optional(),
        deckName: z.string().optional(),
      }),
    )
    .optional(),
});

/** The extension's raw payloads. Raw EDHPlay data (`data`, `matches`, `deck`, `rooms`) passes
 *  through unvalidated on purpose: it is stored as EDHPlay sent it, and read field by field later. */
const payload = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("capture"),
    meta,
    frames: z.array(frame).max(5000),
    log: z.array(logLine).max(5000).optional(),
  }),
  z.object({ kind: z.literal("capture_end"), captureId: z.string(), endedAt: z.number() }),
  z.object({ kind: z.literal("matches"), fetchedAt: z.number(), matches: z.array(z.unknown()) }),
  z.object({
    kind: z.literal("deck"),
    deckId: z.string(),
    fetchedAt: z.number(),
    deck: z.unknown(),
    reason: z.enum(["own", "opponent"]),
  }),
  z.object({ kind: z.literal("rooms"), fetchedAt: z.number(), rooms: z.array(z.unknown()) }),
  z.object({ kind: z.literal("profile"), fetchedAt: z.number(), id: z.string(), username: z.string() }),
]);

/** Where the EDHPlay Lens extension sends everything it records. */
export const Route = createFileRoute("/api/edhplay/ingest")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const refused = refuseUnlessExtension(request);
        if (refused) return refused;

        const body: unknown = await request.json();
        const parsed = payload.safeParse(body);
        if (!parsed.success) {
          return json({ ok: false, error: parsed.error.message }, 400);
        }

        try {
          const data: IngestPayload = parsed.data;
          const result = await ingest(data);
          return json(result);
        } catch (err) {
          return json({ ok: false, error: err instanceof Error ? err.message : String(err) }, 400);
        }
      },
    },
  },
});
