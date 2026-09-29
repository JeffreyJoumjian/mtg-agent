import type { Printing } from "@mtg/deck-model.ts";
/** Query keys and hooks over the builder's server functions. The query cache is the single source
 *  of truth for fetched data; components never copy it into other state. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChangeSet } from "@mtg/change-set.ts";
import { previewKeyOf } from "./staged";
import {
  addListFn,
  archiveDeckFn,
  createDeckFn,
  getArchivedDecks,
  getDeck,
  getDeckIndex,
  renameCardFn,
  restoreDeckFn,
  setCardMetaFn,
} from "../api/decks";
import { applyChanges, previewChanges } from "../api/changes";
import { getHistory, getVersion } from "../api/history";
import { printingsFn, searchCardsFn } from "../api/search";
import {
  getChatStatus,
  interruptChat,
  newConversation,
  resolveApproval,
  resolveRequest,
  sendMessage,
  setChatModel,
} from "../api/chat";

export const deckKeys = {
  index: ["decks"] as const,
  /** Under the index key, so invalidating the index refreshes both. */
  archived: ["decks", "archived"] as const,
  deck: (slug: string) => ["deck", slug] as const,
  history: (slug: string) => ["deck", slug, "history"] as const,
  version: (slug: string, file: string) => ["deck", slug, "version", file] as const,
  preview: (slug: string, cs: ChangeSet | null) => ["deck", slug, "preview", cs ? previewKeyOf(cs) : ""] as const,
  search: (query: string) => ["card-search", query] as const,
  chatStatus: (slug: string) => ["deck", slug, "chat-status"] as const,
};

export function useDeckIndex() {
  return useQuery({ queryKey: deckKeys.index, queryFn: () => getDeckIndex() });
}

export function useDeck(slug: string) {
  return useQuery({ queryKey: deckKeys.deck(slug), queryFn: () => getDeck({ data: { slug } }) });
}

export function useHistory(slug: string) {
  return useQuery({ queryKey: deckKeys.history(slug), queryFn: () => getHistory({ data: { slug } }) });
}

/** Which stop of the history to load: its snapshot (null for the live list), the list it belongs
 *  to, and the snapshot before its change when it has one. */
export interface VersionStop {
  listId: string | null;
  file: string | null;
  changeFile: string | null;
}

export function useVersion(slug: string, stop: VersionStop | null) {
  const key = stop ? `${stop.listId ?? ""}|${stop.file ?? ""}|${stop.changeFile ?? ""}` : "";
  return useQuery({
    queryKey: deckKeys.version(slug, key),
    queryFn: () =>
      getVersion({
        data: {
          slug,
          file: stop?.file ?? null,
          changeFile: stop?.changeFile ?? null,
          ...(stop?.listId ? { listId: stop.listId } : {}),
        },
      }),
    enabled: stop !== null,
  });
}

/** Stats before/after for a staged change set. Recomputed on the server so history and the UI agree. */
export function usePreview(slug: string, changeSet: ChangeSet | null) {
  return useQuery({
    queryKey: deckKeys.preview(slug, changeSet),
    queryFn: () => previewChanges({ data: { slug, changeSet: changeSet! } }),
    enabled: changeSet !== null && changeSet.entries.length > 0,
    staleTime: 30_000,
  });
}

export function useSearchCards(query: string) {
  return useQuery({
    queryKey: deckKeys.search(query),
    queryFn: () => searchCardsFn({ data: { query } }),
    enabled: query.trim().length >= 2,
    staleTime: 5 * 60_000,
  });
}

export function useChatStatus(slug: string) {
  return useQuery({
    queryKey: deckKeys.chatStatus(slug),
    queryFn: () => getChatStatus({ data: { slug } }),
    staleTime: 10_000,
  });
}

function useInvalidateDeck(slug: string) {
  const client = useQueryClient();
  return () => {
    void client.invalidateQueries({ queryKey: deckKeys.deck(slug) });
    void client.invalidateQueries({ queryKey: deckKeys.history(slug) });
    void client.invalidateQueries({ queryKey: deckKeys.index });
  };
}

export function useApplyChanges(slug: string) {
  const invalidate = useInvalidateDeck(slug);
  return useMutation({
    mutationFn: (changeSet: ChangeSet) => applyChanges({ data: { slug, changeSet } }),
    onSuccess: invalidate,
  });
}

export function useSetCardMeta(slug: string) {
  const invalidate = useInvalidateDeck(slug);
  return useMutation({
    mutationFn: (
      updates: {
        name: string;
        meta: { status?: string; tags?: string[]; note?: string; printing?: Printing | null };
      }[],
    ) => setCardMetaFn({ data: { slug, updates } }),
    onSuccess: invalidate,
  });
}

export function useRenameCard(slug: string) {
  const invalidate = useInvalidateDeck(slug);
  return useMutation({
    mutationFn: (args: { from: string; to: string }) => renameCardFn({ data: { slug, ...args } }),
    onSuccess: invalidate,
  });
}

export function useAddList(slug: string) {
  const invalidate = useInvalidateDeck(slug);
  return useMutation({
    mutationFn: (args: { label: string; kind: "deck" | "pool" }) => addListFn({ data: { slug, ...args } }),
    onSuccess: invalidate,
  });
}

export function useArchivedDecks() {
  return useQuery({ queryKey: deckKeys.archived, queryFn: () => getArchivedDecks() });
}

export function useArchiveDeck() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => archiveDeckFn({ data: { slug } }),
    onSuccess: (_result, slug) => {
      client.removeQueries({ queryKey: deckKeys.deck(slug) });
      void client.invalidateQueries({ queryKey: deckKeys.index });
    },
  });
}

export function useRestoreDeck() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => restoreDeckFn({ data: { slug } }),
    onSuccess: () => void client.invalidateQueries({ queryKey: deckKeys.index }),
  });
}

export function useCreateDeck() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createDeckFn({ data: { name } }),
    onSuccess: () => void client.invalidateQueries({ queryKey: deckKeys.index }),
  });
}

export function useChatActions(slug: string) {
  const client = useQueryClient();
  const refreshStatus = () => void client.invalidateQueries({ queryKey: deckKeys.chatStatus(slug) });
  return {
    send: (text: string, listId?: string) => sendMessage({ data: { slug, text, ...(listId ? { listId } : {}) } }),
    resolve: (requestId: string, outcome: unknown) => resolveRequest({ data: { slug, requestId, outcome } }),
    approve: (requestId: string, decision: "allow" | "deny") =>
      resolveApproval({ data: { slug, requestId, decision } }),
    interrupt: () => interruptChat({ data: { slug } }),
    setModel: async (model: string | null, effort: "low" | "medium" | "high" | "xhigh" | "max" | null) => {
      await setChatModel({ data: { slug, model, effort } });
      refreshStatus();
    },
    newConversation: async () => {
      await newConversation({ data: { slug } });
      refreshStatus();
    },
  };
}

/** Every printing of a card, for the popover's printing picker. Printings change rarely, so a
 *  day of staleness is fine. */
export function usePrintings(name: string, enabled = true) {
  return useQuery({
    queryKey: ["printings", name],
    queryFn: () => printingsFn({ data: { name } }),
    enabled: enabled && name.trim().length > 0,
    staleTime: 24 * 3_600_000,
  });
}
