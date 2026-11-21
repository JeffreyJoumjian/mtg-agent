import { createFileRoute } from "@tanstack/react-router";
import { getStatus } from "~/edhplay/server";
import { json, refuseUnlessExtension } from "~/edhplay/http";

/** The extension's health check: is the Workbench up, and how much has it stored. */
export const Route = createFileRoute("/api/edhplay/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const refused = refuseUnlessExtension(request);
        if (refused) return refused;
        const status = await getStatus();
        return json(status);
      },
    },
  },
});
