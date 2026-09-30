import { COLORS, type Color, type DeckStats } from "@mtg/deck-stats.ts";
import { MANA_COLORS, ManaSymbol } from "~/components/symbols/Mana";

interface ColourBreakdownProps {
  color: DeckStats["color"];
}

/** The colour story in two reads: a tile per colour with the share of pips as the headline and the
 *  share of sources under it, then cost over production as two stacked bars. Shares are of the
 *  colours the list actually asks for, so the off-colour sources a Command Tower makes do not
 *  dilute the picture. Every bar wears its mana symbol's colour; the glyph still names it. */
export function ColourBreakdown(props: ColourBreakdownProps) {
  const { pips, sources, identity } = props.color;
  // Identity colours, plus any colour the spells ask for outside it (that is a problem worth seeing).
  const colors: Color[] = COLORS.filter((c) => identity.includes(c) || pips[c] > 0);
  if (colors.length === 0) return <p className="px-1 text-[12px] text-muted-foreground">Colourless</p>;

  const pipTotal = colors.reduce((n, c) => n + pips[c], 0) || 1;
  const sourceTotal = colors.reduce((n, c) => n + sources[c], 0) || 1;
  const pipShare = (c: Color) => Math.round((pips[c] / pipTotal) * 100);
  const sourceShare = (c: Color) => Math.round((sources[c] / sourceTotal) * 100);

  return (
    <div className="space-y-3">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.min(colors.length, 3)}, minmax(0, 1fr))` }}
      >
        {colors.map((c) => (
          <div key={c} data-tile={c} className="flex flex-col gap-1.5 rounded-lg bg-muted/60 p-2.5">
            <ManaSymbol sym={c} className="size-5" />
            <div className="text-[22px] leading-none font-semibold tabular-nums">{pipShare(c)}%</div>
            <div className="text-[11px] text-muted-foreground">{pips[c]} pips</div>
            <div className="h-2 rounded-[2px] bg-background/60">
              <div
                className="h-2 rounded-[2px] opacity-55"
                style={{ width: `${sourceShare(c)}%`, background: MANA_COLORS[c] }}
              />
            </div>
            <div className="text-[11px] text-muted-foreground">
              {sourceShare(c)}% of sources · {sources[c]}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between px-0.5 text-[11px] text-muted-foreground">
          <span>Cost</span>
          <span>{pipTotal} pips</span>
        </div>
        <div data-bar="cost" className="flex h-[18px] gap-0.5 overflow-hidden rounded-[4px]">
          {colors.map((c) => (
            <div
              key={c}
              className="flex items-center overflow-hidden px-1.5 text-[11px] font-semibold whitespace-nowrap text-[#0d0f0f]"
              style={{ width: `${pipShare(c)}%`, background: MANA_COLORS[c] }}
            >
              {c} {pips[c]}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-0.5 text-[11px] text-muted-foreground">
          <span>Production</span>
          <span>{sourceTotal} sources</span>
        </div>
        <div data-bar="production" className="flex h-[18px] gap-0.5 overflow-hidden rounded-[4px]">
          {colors.map((c) => (
            <div
              key={c}
              className="flex items-center overflow-hidden px-1.5 text-[11px] font-semibold whitespace-nowrap text-[#0d0f0f] opacity-55"
              style={{ width: `${sourceShare(c)}%`, background: MANA_COLORS[c] }}
            >
              {c} {sources[c]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
