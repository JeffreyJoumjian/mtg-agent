import { useEffect, useReducer, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { ChangeSet } from "@mtg/change-set.ts";
import { deckKeys } from "../state/queries";
import { applyEvent, initialChatState, type ChatState, type WireEvent } from "./events";

export interface DeckChat {
  state: ChatState;
  /** True once the first `hello` replay has arrived. */
  ready: boolean;
  /** Set when the stream dropped and the browser is reconnecting. */
  reconnecting: boolean;
}

interface Hooks {
  /** A live (not replayed) proposal from the agent — the workbench stages it. */
  onProposal?: (requestId: string, changeSet: ChangeSet) => void;
}

/** Subscribe to the deck's SSE stream. Deck-file changes invalidate the deck query; everything
 *  else reduces into chat state. */
export function useDeckChat(slug: string, hooks: Hooks = {}): DeckChat {
  const [state, dispatch] = useReducer(applyEvent, initialChatState);
  const [ready, setReady] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const client = useQueryClient();
  const hooksRef = useRef(hooks);
  hooksRef.current = hooks;

  useEffect(() => {
    setReady(false);
    const source = new EventSource(`/api/decks/${slug}/stream`);
    let live = false;

    source.onopen = () => setReconnecting(false);
    source.onerror = () => setReconnecting(true);
    source.onmessage = (msg) => {
      const ev = JSON.parse(msg.data) as WireEvent;
      dispatch(ev);

      if (ev.kind === "hello") {
        live = true;
        setReady(true);
        // A proposal the agent is still waiting on (a refresh mid-decision) goes back on the panel.
        const resolved: Record<string, true> = {};
        for (const e of ev.events) if (e.kind === "request-resolved") resolved[e.requestId] = true;
        for (const e of ev.events) {
          if (e.kind === "tool-proposal" && !resolved[e.requestId])
            hooksRef.current.onProposal?.(e.requestId, e.changeSet);
        }
      } else if (ev.kind === "deck-changed") {
        void client.invalidateQueries({ queryKey: deckKeys.deck(slug) });
        void client.invalidateQueries({ queryKey: deckKeys.history(slug) });
      } else if (ev.kind === "tool-proposal" && live) {
        hooksRef.current.onProposal?.(ev.requestId, ev.changeSet);
      }
    };

    return () => source.close();
    // A slug change is a different session — tear down and reconnect.
  }, [slug, client]);

  return { state, ready, reconnecting };
}
