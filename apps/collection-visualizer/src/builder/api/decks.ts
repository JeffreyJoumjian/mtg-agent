// Server functions for decks: the index, one deck with its cards, creation, metadata, lists.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { listIdFromLabel } from "@mtg/deck-model.ts";
import type { CardMetaPatch } from "@mtg/deck-store.ts";
import { cardMetaPatchSchema } from "../model/types";
import {
  addList,
  archive,
  createNewDeck,
  loadArchivedDecks,
  loadDeck,
  loadDeckIndex,
  renameDeckCard,
  unarchive,
  updateCardMeta,
} from "../server/store";
import { canonicalNames } from "../server/cards";

const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export const getDeckIndex = createServerFn({ method: "GET" }).handler(async () => loadDeckIndex());

export const getArchivedDecks = createServerFn({ method: "GET" }).handler(async () => loadArchivedDecks());

/** Move the deck folder to `decks/_archive/`; nothing is deleted. */
export const archiveDeckFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }) => {
    await archive(data.slug);
    return { ok: true };
  });

export const restoreDeckFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }) => {
    await unarchive(data.slug);
    return { ok: true };
  });

export const getDeck = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ slug: slugSchema }).parse(data))
  .handler(async ({ data }) => loadDeck(data.slug));

/** `"Chatterfang, Squirrel General"` → `chatterfang-squirrel-general`. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export const createDeckFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ name: z.string().trim().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const slug = slugify(data.name);
    if (!slug) throw new Error("that name has no letters or digits to make a folder from");

    await createNewDeck(slug, data.name);
    return { slug };
  });

export const setCardMetaFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({ slug: slugSchema, updates: z.array(z.object({ name: z.string().min(1), meta: cardMetaPatchSchema })) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await updateCardMeta(data.slug, data.updates as { name: string; meta: CardMetaPatch }[]);
    return { ok: true };
  });

/** Rename an unresolved entry to the card the user picked. The target is canonicalised first. */
export const renameCardFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ slug: slugSchema, from: z.string().min(1), to: z.string().min(1) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { canonical, unresolved } = await canonicalNames([data.to]);
    if (unresolved.length > 0) throw new Error(`Scryfall does not know "${data.to}"`);

    await renameDeckCard(data.slug, data.from, canonical[data.to] ?? data.to);
    return { ok: true, name: canonical[data.to] ?? data.to };
  });

export const addListFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ slug: slugSchema, label: z.string().trim().min(1), kind: z.enum(["deck", "pool"]) }).parse(data),
  )
  .handler(async ({ data }) => {
    const id = listIdFromLabel(data.label);
    if (!id) throw new Error("that label has nothing to make an id from");

    await addList(data.slug, id, data.label, data.kind);
    return { id };
  });
