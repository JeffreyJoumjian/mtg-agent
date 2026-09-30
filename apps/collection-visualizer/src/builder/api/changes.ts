// Server functions for change sets. Thin on purpose: every non-server-fn export here would keep
// server-only imports alive in the client bundle. The handlers live in `server/changes.ts`.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ChangeSet } from "@mtg/change-set.ts";
import { changeSetSchema } from "../model/types";
import { apply, preview } from "../server/changes";

export type { ApplyResultWire, PreviewResult } from "../server/changes";

const inputSchema = z.object({ slug: z.string().min(1), changeSet: changeSetSchema });

export const previewChanges = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => preview(data as { slug: string; changeSet: ChangeSet }));

export const applyChanges = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => apply(data as { slug: string; changeSet: ChangeSet }));
