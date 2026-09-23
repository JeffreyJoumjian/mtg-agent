import { COLORS, type Color, type DeckStats } from "@mtg/deck-stats.ts";
import { ManaSymbol } from "~/components/symbols/Mana";

interface PipsChartProps {
  color: DeckStats["color"];
}

/** Colour requirements against colour supply: for each colour in the identity, the share of
 *  pips the spells ask for beside the share of sources that make it. Identity comes from the mana
 *  glyph, never the bar colour, so the bars stay neutral. */
export function PipsChart(props: PipsChartProps) {
  const { pips, sources, identity } = props.color;
  // Identity colours, plus any colour the spells ask for outside it (that is a problem worth seeing).
  // Sources outside the identity (Command Tower makes all five) are noise and stay hidden.
  const colors: Color[] = COLORS.filter((c) => identity.includes(c) || pips[c] > 0);
  const pipTotal = colors.reduce((n, c) => n + pips[c], 0) || 1;
  const sourceTotal = colors.reduce((n, c) => n + sources[c], 0) || 1;

  if (colors.length === 0) return <p className="px-1 text-[12px] text-muted-foreground">Colourless</p>;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-end gap-3 px-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-[2px] bg-primary" /> pips
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-[2px] bg-muted-foreground" /> sources
        </span>
      </div>
      {colors.map((c) => {
        const pipShare = pips[c] / pipTotal;
        const sourceShare = sources[c] / sourceTotal;
        return (
          <div key={c} className="flex items-center gap-2 px-1">
            <ManaSymbol sym={c} className="size-4 shrink-0" />
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <div className="h-2 flex-1 rounded-[2px] bg-muted">
                  <div className="h-2 rounded-[2px] bg-primary" style={{ width: `${Math.round(pipShare * 100)}%` }} />
                </div>
                <span className="w-7 text-right text-[11px] tabular-nums">{pips[c]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 flex-1 rounded-[2px] bg-muted">
                  <div
                    className="h-2 rounded-[2px] bg-muted-foreground"
                    style={{ width: `${Math.round(sourceShare * 100)}%` }}
                  />
                </div>
                <span className="w-7 text-right text-[11px] tabular-nums text-muted-foreground">{sources[c]}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
