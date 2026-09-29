import type { ReactNode } from "react";
import type { DeckStats, StatChange } from "@mtg/deck-stats.ts";
import { CARD_STATUSES } from "@mtg/deck-model.ts";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import { formatMoney } from "~/lib/format";
import { CurveChart } from "../rail/CurveChart";
import { StatRow } from "../rail/StatRow";
import { ColourBreakdown } from "./ColourBreakdown";
import { TYPE_LABELS, TYPE_ORDER } from "../model/card-types";
import { CompositionBar } from "./CompositionBar";
import { FlagRow } from "./StatsBar";

interface DetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stats: DeckStats;
  after: DeckStats | null;
  changes: StatChange[];
  highlightTag: string | null;
  onHighlightTag: (tag: string | null) => void;
}

const money = (n: number) => formatMoney(n, "usd");

/** Everything the bar summarises, as charts, in a sheet over the board. Opened from the bar's
 *  Details button; the board keeps its width underneath. */
export function DetailsSheet(props: DetailsSheetProps) {
  const { stats, after, changes } = props;
  const shown = after ?? stats;
  const byKey: Record<string, StatChange> = Object.fromEntries(changes.map((c) => [c.key, c]));

  const roleNames = [...new Set([...Object.keys(stats.roles.sections), ...Object.keys(shown.roles.sections)])].sort(
    (a, b) => (shown.roles.sections[b] ?? 0) - (shown.roles.sections[a] ?? 0) || a.localeCompare(b),
  );
  const roleMax = Math.max(1, ...roleNames.map((n) => shown.roles.sections[n] ?? 0));
  const tagNames = [...new Set([...Object.keys(stats.roles.tags), ...Object.keys(shown.roles.tags)])].sort(
    (a, b) => (shown.roles.tags[b] ?? 0) - (shown.roles.tags[a] ?? 0) || a.localeCompare(b),
  );
  const presentTypes = TYPE_ORDER.filter((t) => stats.types[t] > 0 || shown.types[t] > 0);
  const problems =
    shown.flags.offIdentity.length +
    shown.flags.illegal.length +
    shown.flags.unresolved.length +
    shown.flags.duplicates.length;

  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side="left" className="w-[400px] gap-0 overflow-y-auto p-0 sm:max-w-[400px]">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-[14px]">Deck details</SheetTitle>
          <SheetDescription className="text-[12px]">
            {shown.size.total}
            {stats.size.target ? `/${stats.size.target}` : ""} cards · {shown.size.lands} lands · {shown.size.nonland}{" "}
            spells · avg MV {shown.curve.avgMv}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-5 px-4 py-4">
          <Section title="Colour">
            <ColourBreakdown color={shown.color} />
          </Section>

          <Section title="Curve" aside={`${shown.size.nonland} spells`}>
            <CurveChart histogram={shown.curve.histogram} height={120} />
            <StatRow label="Avg mana value" value={stats.curve.avgMv} change={byKey["curve.avgMv"]} />
            <StatRow label="Ignoring zero-cost" value={stats.curve.avgMvNonZero} change={byKey["curve.avgMvNonZero"]} />
          </Section>

          <Section title="Composition">
            <CompositionBar types={shown.types} />
            <div className="mt-1">
              {presentTypes.map((t) => (
                <StatRow key={t} label={TYPE_LABELS[t]} value={stats.types[t]} change={byKey[`types.${t}`]} />
              ))}
            </div>
          </Section>

          <Section title="Roles" aside={`${roleNames.length} sections`}>
            <div className="space-y-1">
              {roleNames.map((name) => {
                const change = byKey[`roles.${name}`];
                const count = shown.roles.sections[name] ?? 0;
                return (
                  <div key={name} className="flex items-center gap-2 text-[12px]">
                    <span className="w-28 truncate text-muted-foreground">{name}</span>
                    <div className="h-2 flex-1 rounded-[2px] bg-muted">
                      <div className="h-2 rounded-[2px] bg-primary" style={{ width: `${(count / roleMax) * 100}%` }} />
                    </div>
                    <span className="w-14 text-right tabular-nums">
                      {change ? (
                        <>
                          <span className="text-muted-foreground line-through">{change.before}</span>
                          <span className="mx-0.5 text-muted-foreground">→</span>
                          <span className="font-semibold text-warn">{change.after}</span>
                        </>
                      ) : (
                        <span className="font-semibold">{count}</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section
            title="Tags"
            aside={
              props.highlightTag ? (
                <button
                  type="button"
                  className="text-[11px] text-muted-foreground hover:text-foreground"
                  onClick={() => props.onHighlightTag(null)}
                >
                  clear
                </button>
              ) : undefined
            }
          >
            {tagNames.length === 0 && (
              <p className="px-1 text-[12px] text-muted-foreground">
                No tags yet. Ask the agent for a tagging pass, or open a card.
              </p>
            )}
            {tagNames.map((tag) => (
              <StatRow
                key={tag}
                label={tag}
                value={stats.roles.tags[tag] ?? 0}
                change={byKey[`tags.${tag}`]}
                active={props.highlightTag === tag}
                onClick={() => props.onHighlightTag(props.highlightTag === tag ? null : tag)}
              />
            ))}
          </Section>

          <Section title="Checks">
            <FlagRow label="Game Changers" names={shown.flags.gameChangers} tone="neutral" />
            <FlagRow label="Off colour identity" names={shown.flags.offIdentity} tone="bad" />
            <FlagRow label="Not commander-legal" names={shown.flags.illegal} tone="bad" />
            <FlagRow label="Not found on Scryfall" names={shown.flags.unresolved} tone="warn" />
            <FlagRow label="Duplicates" names={shown.flags.duplicates} tone="warn" />
            {problems === 0 && <p className="px-1 text-[12px] text-muted-foreground">Nothing to fix.</p>}
          </Section>

          <Section title="Money">
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
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section(props: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <div className="flex items-baseline justify-between px-1">
        <h3 className="text-[12px] font-medium tracking-wide text-muted-foreground">{props.title}</h3>
        {typeof props.aside === "string" ? (
          <span className="text-[11px] text-muted-foreground">{props.aside}</span>
        ) : (
          props.aside
        )}
      </div>
      {props.children}
    </section>
  );
}
