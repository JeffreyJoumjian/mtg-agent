import { Link } from "@tanstack/react-router";
import type { DeckSummary } from "~/lib/deck/parse";
import { ManaSymbol } from "~/components/symbols/Mana";

const WUBRG = ["W", "U", "B", "R", "G"] as const;
type ColorSym = (typeof WUBRG)[number];

interface DeckSummaryCardProps {
  summary: DeckSummary;
  /** Commander art crop, when the batched Scryfall lookup found one. */
  artUrl: string | null;
}

export function DeckSummaryCard(props: DeckSummaryCardProps) {
  const { summary, artUrl } = props;
  const colors = (summary.colors ?? "")
    .split("/")
    .filter((c): c is ColorSym => (WUBRG as readonly string[]).includes(c));

  const owned = summary.statusCounts.HAVE + summary.statusCounts.PROXY;

  return (
    <Link
      to="/decks/$slug"
      params={{ slug: summary.slug }}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:bg-accent"
    >
      {/* Commander art banner. Scryfall art crops are roughly 626×457; keep a wide slice. */}
      <div className="relative aspect-[626/250] w-full overflow-hidden bg-muted">
        {artUrl ? (
          <img
            src={artUrl}
            alt={summary.commander ?? summary.name}
            loading="lazy"
            className="h-full w-full object-cover object-[center_20%] transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-muted-foreground/40">🃏</div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-3 pb-1.5 pt-6">
          <span className="truncate text-sm font-semibold text-white drop-shadow">{summary.name}</span>
          <span className="ml-auto flex shrink-0 gap-0.5">
            {colors.map((c) => (
              <ManaSymbol key={c} sym={c} className="h-4 w-4 drop-shadow" />
            ))}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        {summary.commander && <div className="truncate text-sm text-muted-foreground">{summary.commander}</div>}

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className={summary.total === 100 ? "" : "text-amber-500"}>{summary.total}/100</span>
          <span>HAVE {summary.statusCounts.HAVE}</span>
          {summary.statusCounts.BUY > 0 && <span className="text-amber-500">BUY {summary.statusCounts.BUY}</span>}
          {summary.statusCounts.PROXY > 0 && (
            <span className="text-violet-400">PROXY {summary.statusCounts.PROXY}</span>
          )}
          <span className="ml-auto">
            {owned}/{summary.total} in hand
          </span>
        </div>
      </div>
    </Link>
  );
}
