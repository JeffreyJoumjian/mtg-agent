import type { ReactNode } from "react";
import { Settings, LayoutGrid, List, ArrowDownWideNarrow, ArrowUpNarrowWide, Sun, Moon } from "lucide-react";
import { useAtom } from "jotai";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { settingsAtom } from "~/lib/state/store";
import type { Baseline, Currency } from "~/lib/types";
import type { SortKey } from "~/lib/view/sort";
import type { CollectionSort } from "~/lib/view/collections";
import type { Theme, ViewMode, ViewSettings } from "~/lib/state/settings";

/** One label + control row inside the settings popover. */
function SettingRow(props: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{props.label}</span>
      {props.children}
    </div>
  );
}

/** Read + patch the global, persisted view settings. Each self-contained item below uses this, so
 *  theme/currency/baseline stay in sync everywhere they're rendered — the popover items own the atom
 *  directly rather than being prop-drilled through whichever view hosts the button. */
function useSettings() {
  const [s, setS] = useAtom(settingsAtom);
  const set = (patch: Partial<ViewSettings>) => setS({ ...s, ...patch });
  return [s, set] as const;
}

interface SettingsButtonProps {
  children: ReactNode;
  /** Popover edge alignment; defaults to the right edge, where the gear usually sits (toolbar-end). */
  align?: "start" | "center" | "end";
}

/** The gear button + popover shell. It renders whatever setting items a view composes into it, so
 *  each view picks exactly the controls it wants (see the Library toolbar and the Sets header)
 *  instead of one popover branching on which route it happens to be in. */
export function SettingsButton(props: SettingsButtonProps) {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="size-8" aria-label="Settings">
              <Settings />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <PopoverContent align={props.align ?? "end"} className="w-72 space-y-3 text-sm">
        {props.children}
      </PopoverContent>
    </Popover>
  );
}

export function ThemeSetting() {
  const [s, set] = useSettings();

  return (
    <SettingRow label="Theme">
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={s.theme}
        onValueChange={(v) => v && set({ theme: v as Theme })}
      >
        <ToggleGroupItem value="light" aria-label="Light">
          <Sun />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark">
          <Moon />
        </ToggleGroupItem>
      </ToggleGroup>
    </SettingRow>
  );
}

export function ViewSetting() {
  const [s, set] = useSettings();

  return (
    <SettingRow label="View">
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
    </SettingRow>
  );
}

/** Grid-only: how many columns to cap at. Hides itself in list view (where it means nothing). */
export function MaxPerRowSetting() {
  const [s, set] = useSettings();

  if (s.view !== "grid") return null;

  return (
    <SettingRow label="Max per row">
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
    </SettingRow>
  );
}

/** Grid-only: fold a card's printings into one stack tile. Hides itself in list view. */
export function GroupVariantsSetting() {
  const [s, set] = useSettings();

  if (s.view !== "grid") return null;

  return (
    <SettingRow label="Group variants">
      <Button variant={s.grouped ? "default" : "outline"} size="sm" onClick={() => set({ grouped: !s.grouped })}>
        {s.grouped ? "On" : "Off"}
      </Button>
    </SettingRow>
  );
}

export function FoilSetting() {
  const [s, set] = useSettings();

  return (
    <SettingRow label="Foil effect">
      <Button variant={s.foil ? "default" : "outline"} size="sm" onClick={() => set({ foil: !s.foil })}>
        {s.foil ? "On" : "Off"}
      </Button>
    </SettingRow>
  );
}

export function CurrencySetting() {
  const [s, set] = useSettings();

  return (
    <SettingRow label="Currency">
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
    </SettingRow>
  );
}

const SORTS: { key: SortKey; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "name", label: "Name" },
  { key: "set", label: "Set" },
  { key: "rarity", label: "Rarity" },
  { key: "number", label: "Number" },
  { key: "cmc", label: "Mana value" },
];

/** The Library's card sort: a field plus a direction toggle. */
export function SortSetting() {
  const [s, set] = useSettings();

  return (
    <SettingRow label="Sort">
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
    </SettingRow>
  );
}

export function BaselineSetting() {
  const [s, set] = useSettings();

  return (
    <SettingRow label="± Baseline">
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
    </SettingRow>
  );
}

const SET_SORTS: { key: CollectionSort; label: string }[] = [
  { key: "completion", label: "Completion" },
  { key: "value", label: "Value" },
  { key: "name", label: "Name" },
];

interface SetSortSettingProps {
  value: CollectionSort;
  onChange: (v: CollectionSort) => void;
  dir: "asc" | "desc";
  onDirChange: (d: "asc" | "desc") => void;
}

/** The Sets view's sort — a field plus a direction toggle, mirroring the Library's `SortSetting`.
 *  Unlike the settings above, this is view-local state (not a persisted global preference), so it's
 *  controlled via props rather than reading the settings atom. */
export function SetSortSetting(props: SetSortSettingProps) {
  return (
    <SettingRow label="Sort">
      <div className="flex gap-2">
        <Select value={props.value} onValueChange={(v) => props.onChange(v as CollectionSort)}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SET_SORTS.map((x) => (
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
          aria-label={props.dir === "asc" ? "Ascending" : "Descending"}
          onClick={() => props.onDirChange(props.dir === "asc" ? "desc" : "asc")}
        >
          {props.dir === "asc" ? <ArrowUpNarrowWide /> : <ArrowDownWideNarrow />}
        </Button>
      </div>
    </SettingRow>
  );
}
