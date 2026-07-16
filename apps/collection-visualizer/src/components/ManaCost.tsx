import { useState } from 'react'

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
