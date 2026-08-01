import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface ApprovalCardProps {
  tool: string
  path: string
  preview: string
  decision: 'allow' | 'deny' | null
  onDecide: (decision: 'allow' | 'deny') => void
}

export function ApprovalCard(props: ApprovalCardProps) {
  const [expanded, setExpanded] = useState(false)
  const shortPath = props.path.replace(/^.*\/decks\//, 'decks/')

  if (props.decision !== null) {
    return (
      <div className="rounded-md border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
        {props.decision === 'allow' ? '✓ Write approved' : '✗ Write denied'} · {shortPath}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-amber-500/50 bg-amber-500/5 p-3">
      <div className="text-sm">
        The agent wants to <strong>{props.tool}</strong> <code className="rounded bg-muted px-1 text-xs">{shortPath}</code>
      </div>

      {props.preview.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />} preview
        </button>
      )}
      {expanded && (
        <pre className="mt-1 max-h-48 overflow-auto rounded bg-muted p-2 text-[11px] whitespace-pre-wrap">{props.preview}</pre>
      )}

      <div className="mt-2 flex gap-2">
        <Button size="sm" onClick={() => props.onDecide('allow')}>
          Allow
        </Button>
        <Button size="sm" variant="outline" onClick={() => props.onDecide('deny')}>
          Deny
        </Button>
      </div>
    </div>
  )
}
