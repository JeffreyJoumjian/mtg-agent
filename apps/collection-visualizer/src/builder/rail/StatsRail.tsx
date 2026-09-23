import type { ReactNode } from "react";
import type { DeckStats, StatChange } from "@mtg/deck-stats.ts";
import { CARD_STATUSES } from "@mtg/deck-model.ts";
import { formatMoney } from "~/lib/format";
import { CurveChart } from "./CurveChart";
import { PipsChart } from "./PipsChart";
import { StatRow } from "./StatRow";

interface StatsRailProps {
  stats: DeckStats;
  /** Stats after the staged change, when one is staged and previewed. */
  after: DeckStats | null;
  changes: StatChange[];
  highlightTag: string | null;
  onHighlightTag: (tag: string | null) => void;
  /** Slot above the numbers: the list tabs. */
  header?: ReactNode;
}

const money = (n: number) => formatMoney(n, "usd");

function Section(props: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="space-y-1">
      <div className="flex items-baseline justify-between px-1">
        <h3 className="text-[12px] font-medium tracking-wide text-muted-foreground">{props.title}</h3>
        {props.aside}
      </div>
      {props.children}
    </section>
  );
}

/** The left pane: every number about the list, and while a change set is staged, every number
 *  that moves shows where it goes. */
export function StatsRail(props: StatsRailProps) {
  const { stats, after, changes } = props;
  const byKey: Record<string, StatChange> = Object.fromEntries(changes.map((c) => [c.key, c]));
  const shown = after ?? stats;
  const target = stats.size.target;
  const total = shown.size.total;
  const fill = target ? Math.min(100, Math.round((total / target) * 100)) : 100;

  const roleNames = [...new Set([...Object.keys(stats.roles.sections), ...Object.keys(shown.roles.sections)])];
  const tagNames = [...new Set([...Object.keys(stats.roles.tags), ...Object.keys(shown.roles.tags)])].sort(
    (a, b) => (shown.roles.tags[b] ?? 0) - (shown.roles.tags[a] ?? 0) || a.localeCompare(b),
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      {props.header}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
        <section className="space-y-1.5">
          <div className="flex items-baseline justify-between px-1">
            <span className="text-2xl font-semibold tabular-nums">
              {total}
              {target && <span className="text-base font-normal text-muted-foreground">/{target}</span>}
            </span>
            <span className="shrink-0 text-right text-[12px] leading-tight text-muted-foreground">
              {shown.size.lands} lands
              <br />
              {shown.size.nonland} spells
            </span>
          </div>
          {target && (
            <div className="mx-1 h-1 rounded-full bg-muted">
              <div
                className={`h-1 rounded-full ${total === target ? "bg-primary" : total > target ? "bg-rose-400" : "bg-amber-400"}`}
                style={{ width: `${fill}%` }}
              />
            </div>
          )}
          <StatRow label="Avg MV" value={stats.curve.avgMv} change={byKey["curve.avgMv"]} />
          <StatRow label="No-zero avg" value={stats.curve.avgMvNonZero} change={byKey["curve.avgMvNonZero"]} />
        </section>

        <Section title="Curve">
          <CurveChart histogram={shown.curve.histogram} />
        </Section>

        <Section title="Colour">
          <PipsChart color={shown.color} />
        </Section>

        <Section title="Types">
          {(["creature", "instant", "sorcery", "artifact", "enchantment", "planeswalker", "battle", "land"] as const)
            .filter((t) => stats.types[t] > 0 || shown.types[t] > 0)
            .map((t) => (
              <StatRow
                key={t}
                label={t.charAt(0).toUpperCase() + t.slice(1)}
                value={stats.types[t]}
                change={byKey[`types.${t}`]}
              />
            ))}
        </Section>

        <Section title="Roles">
          {roleNames.map((name) => (
            <StatRow key={name} label={name} value={stats.roles.sections[name] ?? 0} change={byKey[`roles.${name}`]} />
          ))}
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
            ) : null
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
          {shown.flags.offIdentity.length +
            shown.flags.illegal.length +
            shown.flags.unresolved.length +
            shown.flags.duplicates.length ===
            0 && <p className="px-1 text-[12px] text-muted-foreground">Nothing to fix.</p>}
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
    </div>
  );
}

function FlagRow(props: { label: string; names: string[]; tone: "neutral" | "warn" | "bad" }) {
  if (props.names.length === 0 && props.tone !== "neutral") return null;

  const color = props.tone === "bad" ? "text-rose-400" : props.tone === "warn" ? "text-amber-400" : "text-foreground";
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
