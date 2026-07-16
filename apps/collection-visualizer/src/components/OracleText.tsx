import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface OracleTextProps {
  text: string
}

/** The card's rules text, styled to feel like a card's text box: a serif face (closer to the real
 *  card font) inside a bordered panel. Mana / tap / etc. symbols render as Scryfall glyphs, but the
 *  underlying `{T}` / `{U}` token stays selectable, so copying (button or manual select) yields the
 *  canonical text form. */
export function OracleText(props: OracleTextProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(props.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="relative rounded-md border bg-muted/40 p-3 pr-9 text-sm font-normal leading-relaxed whitespace-pre-wrap text-foreground"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {renderOracle(props.text)}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={copy}
            aria-label="Copy card text"
            className="absolute right-1.5 top-1.5 flex size-6 cursor-pointer items-center justify-center rounded text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          </button>
        </TooltipTrigger>
        <TooltipContent>{copied ? 'Copied!' : 'Copy card text'}</TooltipContent>
      </Tooltip>
    </div>
  )
}

/** Split the text on {...} tokens; render tokens as symbols, everything else as plain text. */
function renderOracle(text: string) {
  return text.split(/(\{[^}]+\})/g).map((seg, i) => {
    const isToken = /^\{[^}]+\}$/.test(seg)
    return isToken ? <Symbol key={i} token={seg} /> : <span key={i}>{seg}</span>
  })
}

function Symbol(props: { token: string }) {
  const [failed, setFailed] = useState(false)
  // {W/U} → WU, {T} → T, {2} → 2 — Scryfall names its symbol files without the braces or slash.
  const code = props.token.slice(1, -1).replace(/\//g, '')

  if (failed) return <>{props.token}</>

  return (
    // overflow-hidden clips the (invisible) token to the glyph's size, but selection still copies the
    // full `{T}` text; the glyph image is laid over the top.
    <span className="relative mx-px inline-block h-[0.95em] w-[0.95em] overflow-hidden align-[-0.12em]">
      <span className="text-transparent">{props.token}</span>
      <img
        src={`https://svgs.scryfall.io/card-symbols/${code}.svg`}
        alt={props.token}
        draggable={false}
        onError={() => setFailed(true)}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </span>
  )
}
