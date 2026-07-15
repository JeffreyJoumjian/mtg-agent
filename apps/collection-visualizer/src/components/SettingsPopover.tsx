import type { ReactNode } from "react";
import { Settings, LayoutGrid, List, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Baseline, Currency } from "~/lib/types";
import type { SortKey } from "~/lib/sort";
import type { ViewMode, ViewSettings } from "~/lib/settings";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "name", label: "Name" },
  { key: "set", label: "Set" },
  { key: "rarity", label: "Rarity" },
  { key: "number", label: "Number" },
  { key: "cmc", label: "Mana value" },
];

function Row(props: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{props.label}</span>
      {props.children}
    </div>
  );
}

interface SettingsPopoverProps {
  settings: ViewSettings;
  onSettings: (s: ViewSettings) => void;
}

export function SettingsPopover(props: SettingsPopoverProps) {
  const s = props.settings;
  const set = (patch: Partial<ViewSettings>) => props.onSettings({ ...s, ...patch });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Settings"
          title="Settings"
        >
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-3 text-sm">
        <Row label="View">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={s.view}
            onValueChange={(v) => v && set({ view: v as ViewMode })}
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid /> Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List /> List
            </ToggleGroupItem>
          </ToggleGroup>
        </Row>

        {s.view === "grid" && (
          <Row label="Max per row">
            <Select
              value={s.maxPerRow == null ? "auto" : String(s.maxPerRow)}
              onValueChange={(v) => set({ maxPerRow: v === "auto" ? null : Number(v) })}
            >
              <SelectTrigger size="sm" className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                {[4, 5, 6, 8, 10].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>
        )}

        {s.view === "grid" && (
          <Row label="Fold duplicates">
            <Button
              variant={s.grouped ? "default" : "outline"}
              size="sm"
              onClick={() => set({ grouped: !s.grouped })}
            >
              {s.grouped ? "On" : "Off"}
            </Button>
          </Row>
        )}

        <Row label="Currency">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={s.currency}
            onValueChange={(v) => v && set({ currency: v as Currency })}
          >
            <ToggleGroupItem value="usd">$ USD</ToggleGroupItem>
            <ToggleGroupItem value="eur">€ EUR</ToggleGroupItem>
          </ToggleGroup>
        </Row>

        <Row label="Sort">
          <div className="flex gap-2">
            <Select value={s.sortKey} onValueChange={(v) => set({ sortKey: v as SortKey })}>
              <SelectTrigger size="sm" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORTS.map((x) => (
                  <SelectItem key={x.key} value={x.key}>
                    {x.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label={s.sortDir === "asc" ? "Ascending" : "Descending"}
              onClick={() => set({ sortDir: s.sortDir === "asc" ? "desc" : "asc" })}
            >
              {s.sortDir === "asc" ? <ArrowUpNarrowWide /> : <ArrowDownWideNarrow />}
            </Button>
          </div>
        </Row>

        <Row label="± Baseline">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={s.baseline}
            onValueChange={(v) => v && set({ baseline: v as Baseline })}
          >
            <ToggleGroupItem value="sinceRefresh">Refresh</ToggleGroupItem>
            <ToggleGroupItem value="vsPurchase">Purchase</ToggleGroupItem>
          </ToggleGroup>
        </Row>
      </PopoverContent>
    </Popover>
  );
}
