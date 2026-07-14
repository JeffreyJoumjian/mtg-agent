import wSvg from '~/assets/mana/W.svg?raw'
import uSvg from '~/assets/mana/U.svg?raw'
import bSvg from '~/assets/mana/B.svg?raw'
import rSvg from '~/assets/mana/R.svg?raw'
import gSvg from '~/assets/mana/G.svg?raw'
import type { ColorSymbol } from '~/lib/types'

/** Official mana pip SVGs (colored circle + glyph), bundled at build time via Vite `?raw`. */
const SVG: Record<ColorSymbol, string> = { W: wSvg, U: uSvg, B: bSvg, R: rSvg, G: gSvg }

interface ManaSymbolProps {
  sym: ColorSymbol
  className?: string
}

export function ManaSymbol(props: ManaSymbolProps) {
  return (
    <span
      aria-hidden
      className={`block [&>svg]:h-full [&>svg]:w-full ${props.className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: SVG[props.sym] }}
    />
  )
}
