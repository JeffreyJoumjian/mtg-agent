import { useEffect, useReducer, useRef, useState } from 'react'
import {
  applyWire,
  initialChatState,
  markSignedOff,
  markSubmitted,
  type ChatState,
  type WireEvent,
} from './chat-events'
import { sendDeckMessage, resolveDeckApproval } from '~/server/decks'

export type BatchCall = { name: string; call: 'keep' | 'cut' | 'pocket' }

type Action =
  | { type: 'wire'; ev: WireEvent }
  | { type: 'submitted'; id: string }
  | { type: 'signed-off'; id: string }

function reduce(state: ChatState, action: Action): ChatState {
  if (action.type === 'wire') return applyWire(state, action.ev)
  if (action.type === 'submitted') return markSubmitted(state, action.id)
  return markSignedOff(state, action.id)
}

export interface DeckChat {
  state: ChatState
  /** True once the first `hello` replay has arrived. */
  ready: boolean
  sendText: (text: string) => void
  submitBatch: (id: string, batchNumber: number, calls: BatchCall[]) => void
  signOff: (id: string) => void
  approve: (requestId: string, decision: 'allow' | 'deny') => void
  retryLast: () => void
}

export function useDeckChat(slug: string): DeckChat {
  const [state, dispatch] = useReducer(reduce, initialChatState)
  const [ready, setReady] = useState(false)
  /** After sign-off, auto-approve the file writes of that turn — sign-off IS the approval. */
  const autoApprove = useRef(false)
  const lastSent = useRef<string | null>(null)

  useEffect(() => {
    const source = new EventSource(`/api/decks/${slug}/stream`)

    source.onmessage = (msg) => {
      const ev = JSON.parse(msg.data) as WireEvent
      dispatch({ type: 'wire', ev })

      if (ev.kind === 'hello') setReady(true)
      if (ev.kind === 'turn-end') autoApprove.current = false
      if (ev.kind === 'approval-request' && autoApprove.current) {
        void resolveDeckApproval({ data: { slug, requestId: ev.requestId, decision: 'allow' } })
      }
    }

    return () => source.close()
    // A slug change is a different session — tear down and reconnect.
  }, [slug])

  function sendText(text: string): void {
    lastSent.current = text
    void sendDeckMessage({ data: { slug, text } })
  }

  return {
    state,
    ready,
    sendText,
    submitBatch: (id, batchNumber, calls) => {
      dispatch({ type: 'submitted', id })
      const lines = calls.map((c) => `- ${c.name}: ${c.call.toUpperCase()}`)
      sendText(`My calls for batch ${batchNumber}:\n${lines.join('\n')}`)
    },
    signOff: (id) => {
      dispatch({ type: 'signed-off', id })
      autoApprove.current = true
      sendText('SIGNED OFF — snapshot the old list to versions/, then write DECK.md and STATUS.md now.')
    },
    approve: (requestId, decision) => {
      void resolveDeckApproval({ data: { slug, requestId, decision } })
    },
    retryLast: () => {
      if (lastSent.current) sendText(lastSent.current)
    },
  }
}
