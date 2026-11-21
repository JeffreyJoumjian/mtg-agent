import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getLive } from "~/edhplay/server";
import { json, refuseUnlessExtension } from "~/edhplay/http";

const body = z.object({
  captureId: z.string().max(80).optional(),
  players: z.array(z.string().max(100)).max(8),
  revealed: z
    .array(
      z.object({
        username: z.string().max(100),
        commanders: z.array(z.string()).max(4),
        cards: z.array(z.string()).max(200),
      }),
    )
    .max(8),
});

/** The extension's live panel: history for the players at the table and combos among the cards
 *  they've revealed. Never decklists. */
export const Route = createFileRoute("/api/edhplay/live")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const refused = refuseUnlessExtension(request);
        if (refused) return refused;

        const raw: unknown = await request.json();
        const parsed = body.safeParse(raw);
        if (!parsed.success) {
          return json({ ok: false, error: parsed.error.message }, 400);
        }
        const live = await getLive(parsed.data);
        return json(live);
      },
    },
  },
});
