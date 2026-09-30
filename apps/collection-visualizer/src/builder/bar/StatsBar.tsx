import type { ComponentProps, ReactNode } from "react";
import {
  AlertTriangle,
  BarChart3,
  Check,
  Flame,
  Gem,
  Mountain,
  PawPrint,
  Sparkles,
  Swords,
  Wand,
  Zap,
} from "lucide-react";
import { COLORS, type Color, type DeckStats, type StatChange } from "@mtg/deck-stats.ts";
import { CARD_STATUSES } from "@mtg/deck-model.ts";
import { ManaSymbol } from "~/components/symbols/Mana";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { formatMoney } from "~/lib/format";
import { CurveChart } from "../rail/CurveChart";
import { StatRow } from "../rail/StatRow";
import { ColourBreakdown } from "./ColourBreakdown";
import { TYPE_LABELS, TYPE_ORDER, type TypeKey } from "../model/card-types";
import { CompositionBar } from "./CompositionBar";

interface StatsBarProps {
  stats: DeckStats;
  /** Stats after the staged change, when one is staged and previewed. */
  after: DeckStats | null;
  changes: StatChange[];
  onDetails: () => void;
}

const money = (n: number) => formatMoney(n, "usd");

const TYPE_ICONS: Record<TypeKey, typeof PawPrint> = {
  creature: PawPrint,
  instant: Zap,
  sorcery: Wand,
  artifact: Gem,
  enchantment: Sparkles,
  planeswalker: Flame,
  battle: Swords,
  land: Mountain,
};

const TYPE_PLURALS: Record<TypeKey, string> = {
  creature: "creatures",
  instant: "instants",
  sorcery: "sorceries",
  artifact: "artifacts",
  enchantment: "enchantments",
  planeswalker: "planeswalkers",
  battle: "battles",
  land: "lands",
};

/** The strip along the bottom of the workbench: every headline number, one glyph per card type,
 *  and a popover behind each with the breakdown. While a change set is staged, a number that
 *  moves shows before → after in place. */
export function StatsBar(props: StatsBarProps) {
  const { stats, after, changes } = props;
  const shown = after ?? stats;
  const byKey: Record<string, StatChange> = Object.fromEntries(changes.map((c) => [c.key, c]));
  const target = stats.size.target;

  const problems =
    shown.flags.offIdentity.length +
    shown.flags.illegal.length +
    shown.flags.unresolved.length +
    shown.flags.duplicates.length;
  const gameChangers = shown.flags.gameChangers.length;

  const colors: Color[] = COLORS.filter((c) => shown.color.identity.includes(c) || shown.color.pips[c] > 0);
  const presentTypes = TYPE_ORDER.filter((t) => stats.types[t] > 0 || shown.types[t] > 0);

  const sizePopover = (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold tabular-nums">
          {shown.size.total}
          {target && <span className="text-base font-normal text-muted-foreground">/{target}</span>}
        </span>
        <span className="text-right text-[12px] leading-tight text-muted-foreground">
          {shown.size.lands} lands
          <br />
          {shown.size.nonland} spells
        </span>
      </div>
      {target && (
        <div className="h-1 rounded-full bg-muted">
          <div
            className={`h-1 rounded-full ${
              shown.size.total === target ? "bg-primary" : shown.size.total > target ? "bg-bad" : "bg-warn"
            }`}
            style={{ width: `${Math.min(100, Math.round((shown.size.total / target) * 100))}%` }}
          />
        </div>
      )}
      <StatRow label="Commanders" value={shown.size.commanders} />
      <StatRow label="Lands" value={stats.size.lands} change={byKey["size.lands"]} />
      <StatRow label="Spells" value={stats.size.nonland} change={byKey["size.nonland"]} />
    </div>
  );

  return (
    <TooltipProvider>
      <div className="flex h-11 shrink-0 items-center gap-1 overflow-x-auto border-t bg-sidebar px-2 text-[12px]">
        <Group id="size" title="Size" content={sizePopover}>
          <Chip id="size">
            <Number value={stats.size.total} after={shown.size.total} className="text-[14px] font-bold" />
            {target && <span className="text-muted-foreground">/ {target}</span>}
          </Chip>
          <Chip id="lands">
            <Number value={stats.size.lands} after={shown.size.lands} />
            <span className="text-muted-foreground">lands</span>
            <Number value={stats.size.nonland} after={shown.size.nonland} />
            <span className="text-muted-foreground">spells</span>
          </Chip>
        </Group>
        <Divider />
        <Group
          id="curve"
          title="Curve"
          content={
            <div className="space-y-2">
              <CurveChart histogram={shown.curve.histogram} height={120} />
              <StatRow label="Avg mana value" value={stats.curve.avgMv} change={byKey["curve.avgMv"]} />
              <StatRow
                label="Ignoring zero-cost"
                value={stats.curve.avgMvNonZero}
                change={byKey["curve.avgMvNonZero"]}
              />
            </div>
          }
        >
          <Chip id="avgmv">
            <span className="text-muted-foreground">avg MV</span>
            <Number value={stats.curve.avgMv} after={shown.curve.avgMv} />
          </Chip>
        </Group>
        <Divider />
        <Group id="colour" title="Colour" content={<ColourBreakdown color={shown.color} />} wide>
          {colors.map((c) => (
            <Chip key={c} id={`color-${c}`}>
              <ManaSymbol sym={c} className="size-3.5" />
              <Number value={stats.color.pips[c]} after={shown.color.pips[c]} />
              <span className="text-muted-foreground">·</span>
              <Number value={stats.color.sources[c]} after={shown.color.sources[c]} className="text-muted-foreground" />
            </Chip>
          ))}
          {colors.length === 0 && <span className="text-muted-foreground">colourless</span>}
        </Group>
        <Divider />
        <Group
          id="types"
          title="Composition"
          content={
            <div className="space-y-2">
              <CompositionBar types={shown.types} />
              <div>
                {presentTypes
                  .filter((k) => byKey[`types.${k}`])
                  .map((k) => (
                    <StatRow key={k} label={TYPE_LABELS[k]} value={stats.types[k]} change={byKey[`types.${k}`]} />
                  ))}
              </div>
            </div>
          }
        >
          {presentTypes.map((t) => {
            const Icon = TYPE_ICONS[t];
            const before = stats.types[t];
            const now = shown.types[t];
            const label =
              before === now
                ? `${now} ${TYPE_PLURALS[t]}`
                : `${before} ${TYPE_PLURALS[t]}, ${now} after the staged change`;
            return (
              <Tooltip key={t}>
                <TooltipTrigger asChild>
                  <Chip id={`type-${t}`} ariaLabel={label}>
                    <Icon className="size-3.5 text-muted-foreground" aria-hidden />
                    <Number value={before} after={now} />
                  </Chip>
                </TooltipTrigger>
                <TooltipContent side="top">{TYPE_LABELS[t]}</TooltipContent>
              </Tooltip>
            );
          })}
        </Group>
        <Divider />
        <Group
          id="checks"
          title="Checks"
          content={
            <div className="space-y-1">
              <FlagRow label="Game Changers" names={shown.flags.gameChangers} tone="neutral" />
              <FlagRow label="Off colour identity" names={shown.flags.offIdentity} tone="bad" />
              <FlagRow label="Not commander-legal" names={shown.flags.illegal} tone="bad" />
              <FlagRow label="Not found on Scryfall" names={shown.flags.unresolved} tone="warn" />
              <FlagRow label="Duplicates" names={shown.flags.duplicates} tone="warn" />
              {problems === 0 && <p className="px-1 text-[12px] text-muted-foreground">Nothing to fix.</p>}
            </div>
          }
        >
          <Chip id="checks">
            {problems > 0 ? (
              <>
                <AlertTriangle className="size-3.5 text-warn" aria-hidden />
                <span className="font-semibold text-warn">{problems} to fix</span>
              </>
            ) : (
              <>
                <Check className="size-3.5 text-good" aria-hidden />
                <span className="text-muted-foreground">
                  {gameChangers === 0
                    ? "nothing to fix"
                    : `${gameChangers} game changer${gameChangers === 1 ? "" : "s"}`}
                </span>
              </>
            )}
          </Chip>
        </Group>
        <Group
          id="money"
          title="Money"
          content={
            <div>
              <StatRow label="Total" value={money(stats.money.total)} change={byKey["money.total"]} format={money} />
              {CARD_STATUSES.filter((s) => stats.money.byStatus[s].count > 0 || shown.money.byStatus[s].count > 0).map(
                (s) => (
                  <StatRow
                    key={s}
                    label={`${s.charAt(0)}${s.slice(1).toLowerCase()} (${shown.money.byStatus[s].count})`}
                    value={money(stats.money.byStatus[s].usd)}
                    change={byKey[`money.${s}.usd`]}
                    format={money}
                  />
                ),
              )}
            </div>
          }
        >
          <Chip id="money">
            <Number value={stats.money.total} after={shown.money.total} format={money} />
          </Chip>
        </Group>
        <button
          type="button"
          onClick={props.onDetails}
          className="ml-auto flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-[12px] hover:bg-accent"
        >
          <BarChart3 className="size-3.5" aria-hidden />
          Details
        </button>
      </div>
    </TooltipProvider>
  );
}

function Divider() {
  return <span className="mx-0.5 h-4 w-px bg-border" aria-hidden />;
}

/** A number on the bar; while a change is staged and it moves, before → after in amber. */
function Number(props: { value: number; after: number; format?: (n: number) => string; className?: string }) {
  const fmt = props.format ?? ((n: number) => String(n));
  if (props.value === props.after) {
    return <span className={`font-semibold tabular-nums ${props.className ?? ""}`}>{fmt(props.value)}</span>;
  }

  return (
    <span className={`tabular-nums ${props.className ?? ""}`}>
      <span className="text-muted-foreground line-through decoration-muted-foreground/60">{fmt(props.value)}</span>
      <span className="mx-0.5 text-muted-foreground">→</span>
      <span className="font-semibold text-warn">{fmt(props.after)}</span>
    </span>
  );
}

interface GroupProps {
  id: string;
  /** Heading of the popover. */
  title: string;
  content: ReactNode;
  children: ReactNode;
  wide?: boolean;
}

/** Every chip that shares one breakdown lives in one group: the whole group highlights on hover
 *  and a click anywhere in it opens that single popover above it. */
function Group(props: GroupProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-group={props.id}
          className="flex h-7 shrink-0 items-center gap-2.5 rounded-md px-2 whitespace-nowrap hover:bg-accent data-[state=open]:bg-accent"
        >
          {props.children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        className={`${props.wide ? "w-[360px]" : "w-[300px]"} p-3`}
      >
        <p className="mb-2 text-[12px] font-medium tracking-wide text-muted-foreground">{props.title}</p>
        {props.content}
      </PopoverContent>
    </Popover>
  );
}

interface ChipProps extends ComponentProps<"span"> {
  id: string;
  ariaLabel?: string;
}

/** One reading inside a group. Not clickable on its own: the group is the target. The rest of the
 *  props (and the ref) pass through so a TooltipTrigger can wrap it with `asChild`. */
function Chip(props: ChipProps) {
  const { id, ariaLabel, className, children, ...rest } = props;

  return (
    <span
      {...rest}
      data-chip={id}
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1.5 ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function FlagRow(props: { label: string; names: string[]; tone: "neutral" | "warn" | "bad" }) {
  if (props.names.length === 0 && props.tone !== "neutral") return null;

  const color = props.tone === "bad" ? "text-bad" : props.tone === "warn" ? "text-warn" : "text-foreground";
  return (
    <div className="px-1 py-0.5 text-[13px] leading-tight">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-muted-foreground">{props.label}</span>
        <span className={`font-medium tabular-nums ${color}`}>{props.names.length}</span>
      </div>
      {props.names.length > 0 && <p className="text-[12px] text-muted-foreground">{props.names.join(", ")}</p>}
    </div>
  );
}
