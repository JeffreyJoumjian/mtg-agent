/** Query keys and hooks over the builder's server functions. The query cache is the single source
 *  of truth for fetched data; components never copy it into other state. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChangeSet } from "@mtg/change-set.ts";
import { previewKeyOf } from "./staged";
import { addListFn, createDeckFn, getDeck, getDeckIndex, renameCardFn, setCardMetaFn } from "../api/decks";
import { applyChanges, previewChanges } from "../api/changes";
import { getHistory, getVersion } from "../api/history";
import { searchCardsFn } from "../api/search";
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

export function useVersion(slug: string, file: string | null, listId?: string) {
  return useQuery({
    queryKey: [...deckKeys.version(slug, file ?? ""), listId ?? ""],
    queryFn: () => getVersion({ data: { slug, file: file ?? "", ...(listId ? { listId } : {}) } }),
    enabled: file !== null,
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
    mutationFn: (updates: { name: string; meta: { status?: string; tags?: string[]; note?: string } }[]) =>
      setCardMetaFn({ data: { slug, updates } }),
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
