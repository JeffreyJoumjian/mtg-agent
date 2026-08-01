import type { CardTile as Tile } from "~/lib/types";

interface CardCopiesProps {
  tile: Tile;
}

const CONDITION_LABEL: Record<string, string> = {
  mint: "Mint",
  near_mint: "Near Mint",
  excellent: "Excellent",
  good: "Good",
  light_played: "Light Play",
  played: "Played",
  poor: "Poor",
};

/** Prettify a ManaBox condition code (`near_mint` → `Near Mint`); pass anything unknown through. */
function conditionLabel(raw: string): string {
  if (!raw) return "";
  return CONDITION_LABEL[raw.toLowerCase()] ?? raw.replace(/_/g, " ");
}

/** The physical copies behind this printing: which binder each sits in, its condition, language, and
 *  how many. The only place `breakdown[]` surfaces — it answers "which binder is my NM copy in?" when
 *  you're hunting for the card. What you paid lives one section up (`PurchaseEditor`), as a single
 *  editable figure, rather than per row here. Scoped to the printing + finish the drawer is showing. */
export function CardCopies(props: CardCopiesProps) {
  const rows = props.tile.breakdown;

  if (rows.length === 0) return null;

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="mb-2 text-sm font-semibold">Copies</h3>
      <ul className="space-y-1.5 text-sm">
        {rows.map((r, i) => {
          const meta = [conditionLabel(r.condition), r.language ? r.language.toUpperCase() : ""]
            .filter(Boolean)
            .join(" · ");

          return (
            <li key={i} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium">{r.binder || "Unfiled"}</span>
                {r.quantity > 1 && <span className="shrink-0 text-muted-foreground">×{r.quantity}</span>}
              </div>
              {meta && <span className="shrink-0 text-muted-foreground">{meta}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
