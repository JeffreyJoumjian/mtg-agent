import { Bar, BarChart, XAxis } from "recharts";
import type { DeckStats } from "@mtg/deck-stats.ts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/components/ui/chart";

interface CurveChartProps {
  histogram: DeckStats["curve"]["histogram"];
  height?: number;
}

/** Mana curve as stacked bars: creatures over noncreature spells, one column per mana value.
 *  Two lightness steps of the app's neutral ink rather than two hues — the palette stays
 *  zero-chroma so the card art is the only colour on screen. A legend names the two series. */
export function CurveChart(props: CurveChartProps) {
  const config = {
    creature: { label: "Creatures", color: "var(--primary)" },
    noncreature: { label: "Other spells", color: "var(--muted-foreground)" },
  } satisfies ChartConfig;

  return (
    <div>
      <div className="mb-1 flex items-center gap-3 px-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2 rounded-[2px] bg-primary" /> Creatures
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2 rounded-[2px] bg-muted-foreground" /> Other spells
        </span>
      </div>
      <ChartContainer config={config} className="aspect-auto w-full" style={{ height: props.height ?? 96 }}>
        <BarChart data={props.histogram} margin={{ left: 0, right: 0, top: 4, bottom: 0 }} barCategoryGap={3}>
          <XAxis dataKey="mv" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={0} />
          <ChartTooltip
            cursor={{ fill: "var(--accent)" }}
            content={<ChartTooltipContent labelFormatter={(v) => `MV ${v}`} />}
          />
          <Bar
            dataKey="noncreature"
            stackId="mv"
            fill="var(--color-noncreature)"
            stroke="var(--background)"
            strokeWidth={1}
          />
          <Bar
            dataKey="creature"
            stackId="mv"
            fill="var(--color-creature)"
            stroke="var(--background)"
            strokeWidth={1}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
