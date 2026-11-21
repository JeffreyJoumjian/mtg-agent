import { createFileRoute } from "@tanstack/react-router";
import { cardImageUrl } from "~/edhplay/images";

/** `/api/card-image?name=<card>&v=art|normal` redirects to the card's image on Scryfall's CDN.
 *  The browser caches the redirect for a day, so a page reload costs nothing. */
export const Route = createFileRoute("/api/card-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        const name = (params.get("name") ?? "").trim().slice(0, 200);
        if (!name) return new Response("Missing card name", { status: 400 });

        const url = await cardImageUrl(name, params.get("v") === "art" ? "art" : "normal");
        if (!url) return new Response("Card not found", { status: 404, headers: { "cache-control": "max-age=300" } });
        return new Response(null, { status: 302, headers: { location: url, "cache-control": "public, max-age=86400" } });
      },
    },
  },
});
