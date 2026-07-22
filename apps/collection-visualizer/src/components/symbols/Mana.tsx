import { useState } from 'react'
import wSvg from '~/assets/mana/W.svg?raw'
import uSvg from '~/assets/mana/U.svg?raw'
import bSvg from '~/assets/mana/B.svg?raw'
import rSvg from '~/assets/mana/R.svg?raw'
import gSvg from '~/assets/mana/G.svg?raw'
import type { ColorSymbol } from '~/lib/types'

interface ManaCostProps {
  /** A mana cost string, e.g. "{2}{R}". */
  cost: string
  /** Tailwind size class for each pip (default 'size-3.5'). */
  size?: string
}

/** A card's mana cost rendered as Scryfall symbol glyphs. Renders nothing when the cost is empty
 *  (lands, the back face of most double-faced cards). */
export function ManaCost(props: ManaCostProps) {
  const tokens = props.cost.match(/\{[^}]+\}/g)
  if (!tokens) return null

  return (
    <span className="inline-flex shrink-0 items-center gap-0.5">
      {tokens.map((token, i) => (
        <Pip key={i} token={token} size={props.size ?? 'size-3.5'} />
      ))}
    </span>
  )
}

function Pip(props: { token: string; size: string }) {
  const [failed, setFailed] = useState(false)
  // {W/U} → WU, {2} → 2 — Scryfall names its symbol files without the braces or slash.
  const code = props.token.slice(1, -1).replace(/\//g, '')

  if (failed) return <span className="text-[10px] text-muted-foreground">{props.token}</span>

  return (
    <img
      src={`https://svgs.scryfall.io/card-symbols/${code}.svg`}
      alt={props.token}
      draggable={false}
      onError={() => setFailed(true)}
      className={`${props.size} shrink-0`}
    />
  )
}

/** Official mana pip SVGs (colored circle + glyph), bundled at build time via Vite `?raw`. */
const SVG: Record<ColorSymbol, string> = { W: wSvg, U: uSvg, B: bSvg, R: rSvg, G: gSvg }

interface ManaSymbolProps {
  sym: ColorSymbol
  className?: string
}

/** A single colored mana pip. Unlike ManaCost above (which pulls any symbol from Scryfall's CDN, so
 *  it covers hybrids/generic/tap), this is bundled — it only needs the five colors, and the filters
 *  popover shows them before any network is available. */
export function ManaSymbol(props: ManaSymbolProps) {
  return (
    <span
      aria-hidden
      className={`block [&>svg]:h-full [&>svg]:w-full ${props.className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: SVG[props.sym] }}
    />
  )
}
