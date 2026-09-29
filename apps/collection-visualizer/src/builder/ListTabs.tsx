import { useState } from "react";
import { Plus } from "lucide-react";
import type { Deck } from "@mtg/deck-model.ts";
import { listSize } from "@mtg/deck-model.ts";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAddList } from "./state/queries";

interface ListTabsProps {
  slug: string;
  deck: Deck;
  active: string;
  onChange: (id: string) => void;
}

/** One tab per list — main, variants, pools — and a way to add a pool. */
export function ListTabs(props: ListTabsProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<"deck" | "pool">("pool");
  const addList = useAddList(props.slug);

  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {Object.entries(props.deck.lists).map(([id, list]) => (
        <button
          key={id}
          type="button"
          onClick={() => props.onChange(id)}
          className={`shrink-0 rounded-md px-2 py-1 text-[13px] transition ${props.active === id ? "bg-accent font-medium" : "text-muted-foreground hover:text-foreground"}`}
        >
          {list.label}
          <span className="ml-1 text-[11px] text-muted-foreground tabular-nums">{listSize(list)}</span>
        </button>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-1.5" aria-label="Add a list">
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72">
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!label.trim()) return;
              addList.mutate(
                { label: label.trim(), kind },
                {
                  onSuccess: ({ id }) => {
                    setOpen(false);
                    setLabel("");
                    props.onChange(id);
                  },
                },
              );
            }}
          >
            <Input
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Sideboard, Pocket, Bracket 4…"
              className="h-8 text-[13px]"
            />
            <Select value={kind} onValueChange={(v) => setKind(v as "deck" | "pool")}>
              <SelectTrigger size="sm" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pool">Pool — no size target (sideboard, pocket, cut)</SelectItem>
                <SelectItem value="deck">Deck — a 100-card variant</SelectItem>
              </SelectContent>
            </Select>
            {addList.error && <p className="text-[12px] text-bad">{String(addList.error)}</p>}
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!label.trim() || addList.isPending}>
                Add list
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
