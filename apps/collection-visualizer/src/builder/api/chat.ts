// Server functions for the chat: messages in, request resolutions, interrupt, model, new session.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDeckSession } from "../server/agent/manager";

const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export const sendMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ slug: slugSchema, text: z.string().trim().min(1), listId: z.string().min(1).optional() }).parse(data),
  )
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    session.sendText(data.text, data.listId ? { listId: data.listId } : undefined);
    return { ok: true };
  });

export const resolveRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ slug: slugSchema, requestId: z.string().min(1), outcome: z.unknown() }).parse(data),
  )
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    return { ok: session.resolveRequest(data.requestId, data.outcome) };
  });

export const resolveApproval = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ slug: slugSchema, requestId: z.string().min(1), decision: z.enum(["allow", "deny"]) }).parse(data),
  )
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    return { ok: session.resolveApproval(data.requestId, data.decision) };
  });

export const interruptChat = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    await session.interrupt();
    return { ok: true };
  });

export const setChatModel = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        slug: slugSchema,
        model: z.string().nullable(),
        effort: z.enum(["low", "medium", "high", "xhigh", "max"]).nullable(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    await session.setModel(data.model, data.effort);
    return { ok: true };
  });

export const newConversation = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    await session.newConversation();
    return { ok: true };
  });

export const getChatStatus = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }) => {
    const session = await getDeckSession(data.slug);
    return session.status();
  });
