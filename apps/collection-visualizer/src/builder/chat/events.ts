/** The event vocabulary shared by the server translator, the SSE wire and the client reducer.
 *  Pure — client-importable. */
import type { ChangeSet } from "@mtg/change-set.ts";

/** One of the SDK's built-in AskUserQuestion questions. */
export interface SdkQuestion {
  question: string;
  header: string;
  options: { label: string; description: string }[];
  multiSelect: boolean;
}

export interface ShownCard {
  name: string;
  note?: string;
}

export interface PickerCard {
  name: string;
  blurb?: string;
}

export type PickerMode = "one" | "many" | "label";

export interface MetaUpdate {
  name: string;
  tags?: string[];
  status?: string;
  note?: string;
}

export type TranscriptEvent =
  | { kind: "user-text"; id: string; text: string }
  | { kind: "turn-start"; id: string }
  | { kind: "turn-end"; id: string }
  | { kind: "text-delta"; id: string; text: string }
  | { kind: "text-final"; id: string; text: string }
  | { kind: "tool-cards"; id: string; title?: string; cards: ShownCard[] }
  | { kind: "tool-proposal"; id: string; requestId: string; changeSet: ChangeSet }
  | {
      kind: "tool-picker";
      id: string;
      requestId: string;
      title: string;
      prompt?: string;
      cards: PickerCard[];
      mode: PickerMode;
      labels?: string[];
    }
  | { kind: "tool-question"; id: string; requestId: string; questions: SdkQuestion[] }
  | { kind: "tool-meta"; id: string; cards: MetaUpdate[] }
  | { kind: "tool-activity"; id: string; label: string }
  | { kind: "approval-request"; id: string; requestId: string; tool: string; path: string; preview: string }
  | { kind: "approval-resolved"; id: string; requestId: string; decision: "allow" | "deny" }
  | { kind: "request-resolved"; id: string; requestId: string; outcome: unknown }
  | { kind: "notice"; id: string; level: "info" | "error"; text: string }
  | { kind: "session"; id: string; model: string | null; effort: string | null; sessionId: string | null }
  | { kind: "deck-changed"; id: string };

/** First frame on every SSE (re)connect: full history so a refreshed tab rebuilds state. */
export type WireEvent = TranscriptEvent | { kind: "hello"; events: TranscriptEvent[] };

export type RequestKind = "proposal" | "picker" | "question" | "approval";

export type ProposalOutcome =
  { status: "applied"; entries: unknown[]; historyId?: string } | { status: "dismissed"; reason: string };

export type ChatItem =
  | { type: "user"; id: string; text: string }
  | { type: "assistant"; id: string; text: string; streaming: boolean }
  | { type: "cards"; id: string; title?: string; cards: ShownCard[] }
  | {
      type: "proposal";
      id: string;
      requestId: string;
      changeSet: ChangeSet;
      status: "pending" | "applied" | "dismissed";
      outcome: ProposalOutcome | null;
    }
  | {
      type: "picker";
      id: string;
      requestId: string;
      title: string;
      prompt?: string;
      cards: PickerCard[];
      mode: PickerMode;
      labels?: string[];
      status: "pending" | "answered" | "dismissed";
      picks: Record<string, string | boolean> | null;
    }
  | {
      type: "question";
      id: string;
      requestId: string;
      questions: SdkQuestion[];
      status: "pending" | "answered";
      answers: Record<string, string> | null;
    }
  | { type: "meta"; id: string; cards: MetaUpdate[] }
  | { type: "activity"; id: string; label: string }
  | {
      type: "approval";
      id: string;
      requestId: string;
      tool: string;
      path: string;
      preview: string;
      decision: "allow" | "deny" | null;
    }
  | { type: "notice"; id: string; level: "info" | "error"; text: string };

export interface ChatState {
  items: ChatItem[];
  busy: boolean;
  pending: { requestId: string; kind: RequestKind } | null;
  session: { model: string | null; effort: string | null; sessionId: string | null };
}

export const initialChatState: ChatState = {
  items: [],
  busy: false,
  pending: null,
  session: { model: null, effort: null, sessionId: null },
};

function withItem(state: ChatState, item: ChatItem): ChatState {
  return { ...state, items: [...state.items, item] };
}

function mapItems(state: ChatState, fn: (item: ChatItem) => ChatItem): ChatState {
  return { ...state, items: state.items.map(fn) };
}

function resolveRequest(state: ChatState, requestId: string, outcome: unknown): ChatState {
  const o = (outcome ?? {}) as Record<string, unknown>;
  const next = mapItems(state, (item) => {
    if (item.type === "proposal" && item.requestId === requestId) {
      const status = o.status === "applied" ? "applied" : "dismissed";
      return { ...item, status, outcome: outcome as ProposalOutcome };
    }
    if (item.type === "picker" && item.requestId === requestId) {
      const dismissed = o.status === "dismissed";
      return {
        ...item,
        status: dismissed ? "dismissed" : "answered",
        picks: dismissed ? null : ((o.picks as Record<string, string | boolean>) ?? {}),
      };
    }
    if (item.type === "question" && item.requestId === requestId) {
      return { ...item, status: "answered", answers: (o.answers as Record<string, string>) ?? {} };
    }
    return item;
  });
  return { ...next, pending: next.pending?.requestId === requestId ? null : next.pending };
}

export function applyEvent(state: ChatState, ev: WireEvent): ChatState {
  switch (ev.kind) {
    case "hello":
      return ev.events.reduce((s, e) => applyEvent(s, e), initialChatState);

    case "user-text":
      return withItem(state, { type: "user", id: ev.id, text: ev.text });

    case "turn-start":
      return { ...state, busy: true };

    case "turn-end":
      return { ...state, busy: false };

    case "text-delta": {
      const exists = state.items.some((i) => i.type === "assistant" && i.id === ev.id);
      if (!exists) return withItem(state, { type: "assistant", id: ev.id, text: ev.text, streaming: true });

      return mapItems(state, (i) => (i.type === "assistant" && i.id === ev.id ? { ...i, text: i.text + ev.text } : i));
    }

    case "text-final": {
      const exists = state.items.some((i) => i.type === "assistant" && i.id === ev.id);
      if (!exists) return withItem(state, { type: "assistant", id: ev.id, text: ev.text, streaming: false });

      return mapItems(state, (i) =>
        i.type === "assistant" && i.id === ev.id ? { ...i, text: ev.text, streaming: false } : i,
      );
    }

    case "tool-cards":
      return withItem(state, { type: "cards", id: ev.id, ...(ev.title ? { title: ev.title } : {}), cards: ev.cards });

    case "tool-proposal":
      return {
        ...withItem(state, {
          type: "proposal",
          id: ev.id,
          requestId: ev.requestId,
          changeSet: ev.changeSet,
          status: "pending",
          outcome: null,
        }),
        pending: { requestId: ev.requestId, kind: "proposal" },
      };

    case "tool-picker":
      return {
        ...withItem(state, {
          type: "picker",
          id: ev.id,
          requestId: ev.requestId,
          title: ev.title,
          ...(ev.prompt ? { prompt: ev.prompt } : {}),
          cards: ev.cards,
          mode: ev.mode,
          ...(ev.labels ? { labels: ev.labels } : {}),
          status: "pending",
          picks: null,
        }),
        pending: { requestId: ev.requestId, kind: "picker" },
      };

    case "tool-question":
      return {
        ...withItem(state, {
          type: "question",
          id: ev.id,
          requestId: ev.requestId,
          questions: ev.questions,
          status: "pending",
          answers: null,
        }),
        pending: { requestId: ev.requestId, kind: "question" },
      };

    case "tool-meta":
      return withItem(state, { type: "meta", id: ev.id, cards: ev.cards });

    case "tool-activity":
      return withItem(state, { type: "activity", id: ev.id, label: ev.label });

    case "approval-request":
      return {
        ...withItem(state, {
          type: "approval",
          id: ev.id,
          requestId: ev.requestId,
          tool: ev.tool,
          path: ev.path,
          preview: ev.preview,
          decision: null,
        }),
        pending: { requestId: ev.requestId, kind: "approval" },
      };

    case "approval-resolved": {
      const next = mapItems(state, (i) =>
        i.type === "approval" && i.requestId === ev.requestId ? { ...i, decision: ev.decision } : i,
      );
      return { ...next, pending: next.pending?.requestId === ev.requestId ? null : next.pending };
    }

    case "request-resolved":
      return resolveRequest(state, ev.requestId, ev.outcome);

    case "notice":
      return withItem(state, { type: "notice", id: ev.id, level: ev.level, text: ev.text });

    case "session":
      return { ...state, session: { model: ev.model, effort: ev.effort, sessionId: ev.sessionId } };

    case "deck-changed":
      return state;
  }
}
