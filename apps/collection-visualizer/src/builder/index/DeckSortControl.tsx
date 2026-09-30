import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { DECK_SORT_OPTIONS, type DeckSort, type DeckSortBy } from "./sort";

interface DeckSortControlProps {
  sort: DeckSort;
  onChange: (sort: DeckSort) => void;
}

/** What the decks page sorts on, and which way. */
export function DeckSortControl(props: DeckSortControlProps) {
  const { sort } = props;
  const descending = sort.dir === "desc";

  return (
    <div className="flex items-center gap-1">
      <Select value={sort.by} onValueChange={(v) => props.onChange({ ...sort, by: v as DeckSortBy })}>
        <SelectTrigger aria-label="Sort decks by" className="h-8 w-[150px] text-[13px]">
          <span className="text-muted-foreground">Sort</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {DECK_SORT_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        aria-label={descending ? "Newest or Z first — switch to ascending" : "Oldest or A first — switch to descending"}
        onClick={() => props.onChange({ ...sort, dir: descending ? "asc" : "desc" })}
      >
        {descending ? <ArrowDown /> : <ArrowUp />}
      </Button>
    </div>
  );
}
