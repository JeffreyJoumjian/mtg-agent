/** The event vocabulary shared by the server translator, the SSE wire, and the client reducer.
 *  Pure — client-importable. */

export interface BatchCard {
  name: string;
  manaCost?: string;
  typeLine?: string;
  /** One clause on what the card does — the "don't editorialize yet" line. */
  blurb?: string;
  set?: string;
}

export interface BatchInput {
  batchNumber: number;
  totalBatches?: number;
  cards: BatchCard[];
}

export interface TallyInput {
  keeps: number;
  cuts: number;
  pockets: number;
  /** Deck-size target the keeps must land on (usually 99). */
  target: number;
  gameChangers: number;
  gcCeiling?: number;
  manaSources?: number;
  categories?: { name: string; count: number; target?: number }[];
}

export interface FinalListInput {
  groups: { name: string; cards: string[] }[];
  total: number;
  summary?: string;
}

export type TranscriptEvent =
  | { kind: "user-text"; id: string; text: string }
  | { kind: "turn-start"; id: string }
  | { kind: "text-delta"; id: string; text: string }
  | { kind: "text-final"; id: string; text: string }
  | { kind: "tool-batch"; id: string; input: BatchInput }
  | { kind: "tool-tally"; id: string; input: TallyInput }
  | { kind: "tool-final-list"; id: string; input: FinalListInput }
  | { kind: "tool-activity"; id: string; label: string }
  | { kind: "approval-request"; id: string; requestId: string; tool: string; path: string; preview: string }
  | { kind: "approval-resolved"; id: string; requestId: string; decision: "allow" | "deny" }
  | { kind: "turn-end"; id: string }
  | { kind: "notice"; id: string; level: "info" | "error"; text: string };

/** First frame on every SSE (re)connect: full history so a refreshed tab rebuilds state. */
export type WireEvent = TranscriptEvent | { kind: "hello"; events: TranscriptEvent[] };

export type ChatItem =
  | { type: "user"; id: string; text: string }
  | { type: "assistant"; id: string; text: string; streaming: boolean }
  | { type: "batch"; id: string; input: BatchInput; submitted: boolean }
  | { type: "final-list"; id: string; input: FinalListInput; signedOff: boolean }
  | { type: "activity"; id: string; label: string }
  | { type: "approval"; id: string; requestId: string; tool: string; path: string; preview: string; decision: "allow" | "deny" | null }
  | { type: "notice"; id: string; level: "info" | "error"; text: string };

export interface ChatState {
  items: ChatItem[];
  tally: TallyInput | null;
  busy: boolean;
}

export const initialChatState: ChatState = { items: [], tally: null, busy: false };

export function applyEvent(state: ChatState, ev: TranscriptEvent): ChatState {
  switch (ev.kind) {
    case "user-text":
      return { ...state, items: [...state.items, { type: "user", id: ev.id, text: ev.text }] };

    case "turn-start":
      return { ...state, busy: true };

    case "text-delta": {
      const existing = state.items.find((i) => i.type === "assistant" && i.id === ev.id);

      if (!existing) {
        return { ...state, items: [...state.items, { type: "assistant", id: ev.id, text: ev.text, streaming: true }] };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.type === "assistant" && i.id === ev.id ? { ...i, text: i.text + ev.text } : i,
        ),
      };
    }

    case "text-final": {
      const exists = state.items.some((i) => i.type === "assistant" && i.id === ev.id);

      // Replayed transcripts skip deltas, so a final may arrive for an unseen id.
      if (!exists) {
        return { ...state, items: [...state.items, { type: "assistant", id: ev.id, text: ev.text, streaming: false }] };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.type === "assistant" && i.id === ev.id ? { ...i, text: ev.text, streaming: false } : i,
        ),
      };
    }

    case "tool-batch":
      return { ...state, items: [...state.items, { type: "batch", id: ev.id, input: ev.input, submitted: false }] };

    case "tool-tally":
      return { ...state, tally: ev.input };

    case "tool-final-list":
      return { ...state, items: [...state.items, { type: "final-list", id: ev.id, input: ev.input, signedOff: false }] };

    case "tool-activity":
      return { ...state, items: [...state.items, { type: "activity", id: ev.id, label: ev.label }] };

    case "approval-request":
      return {
        ...state,
        items: [
          ...state.items,
          { type: "approval", id: ev.id, requestId: ev.requestId, tool: ev.tool, path: ev.path, preview: ev.preview, decision: null },
        ],
      };

    case "approval-resolved":
      return {
        ...state,
        items: state.items.map((i) =>
          i.type === "approval" && i.requestId === ev.requestId ? { ...i, decision: ev.decision } : i,
        ),
      };

    case "turn-end":
      return {
        ...state,
        busy: false,
        items: state.items.map((i) => (i.type === "assistant" && i.streaming ? { ...i, streaming: false } : i)),
      };

    case "notice":
      return { ...state, items: [...state.items, { type: "notice", id: ev.id, level: ev.level, text: ev.text }] };
  }
}

export function applyWire(state: ChatState, ev: WireEvent): ChatState {
  if (ev.kind === "hello") {
    // Reconnects replay everything — rebuild from scratch so replays stay idempotent.
    return ev.events.reduce(applyEvent, initialChatState);
  }
  return applyEvent(state, ev);
}

/** Client-side flags: the user submitted this batch's calls / signed off on this final list. */
export function markSubmitted(state: ChatState, id: string): ChatState {
  return {
    ...state,
    items: state.items.map((i) => (i.type === "batch" && i.id === id ? { ...i, submitted: true } : i)),
  };
}

export function markSignedOff(state: ChatState, id: string): ChatState {
  return {
    ...state,
    items: state.items.map((i) => (i.type === "final-list" && i.id === id ? { ...i, signedOff: true } : i)),
  };
}
