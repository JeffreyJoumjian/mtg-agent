// Server functions for the EDHPlay game views. The handlers run on the server; the client only
// sees the RPC stubs, so pages can import from here without pulling in `node:fs`.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { setPlayerNote } from "@mtg/edhplay-store.ts";
import { getDeckGames, getGame, getGameCards, getGameCombos, getMeta, getOverview, getPlayer, getPlayers } from "./server";

const kindSchema = z.enum(["games", "playtests"]);

export const getOverviewFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ kind: kindSchema }).parse(data))
  .handler(async ({ data }) => getOverview(data.kind));

export const getGameFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ id: z.string().min(1).max(200), kind: kindSchema }).parse(data))
  .handler(async ({ data }) => getGame(data.id, data.kind));

export const getGameCardsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ id: z.string().min(1).max(200), kind: kindSchema }).parse(data))
  .handler(async ({ data }) => getGameCards(data.id, data.kind));

export const getGameCombosFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ id: z.string().min(1).max(200), kind: kindSchema }).parse(data))
  .handler(async ({ data }) => getGameCombos(data.id, data.kind));

export const getMetaFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ includeSpectated: z.boolean() }).parse(data))
  .handler(async ({ data }) => getMeta(data.includeSpectated));

export const getPlayersFn = createServerFn({ method: "GET" }).handler(async () => getPlayers());

export const getPlayerFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ username: z.string().min(1).max(100) }).parse(data))
  .handler(async ({ data }) => getPlayer(data.username));

export const setPlayerNoteFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        username: z.string().min(1).max(100),
        note: z.string().max(4000),
        tags: z.array(z.string().min(1).max(40)).max(20),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await setPlayerNote(data.username, data.note, data.tags);
    return { ok: true };
  });

export const getDeckGamesFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ slug: z.string().regex(/^[a-z0-9-]+$/), kind: kindSchema }).parse(data))
  .handler(async ({ data }) => getDeckGames(data.slug, data.kind));
