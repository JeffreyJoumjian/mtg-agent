/** Differ: compares two flat rule maps (ruleId -> text) and renders a changelog. */
import type { Changelog } from "./types.ts";

/** Natural ordering for rule ids like `702.10a` (section, then rule number, then letters). */
export function compareRuleIds(a: string, b: string): number {
  const parse = (id: string) => {
    const m = /^(\d{3})\.(\d+)([a-z]*)$/.exec(id);
    if (!m) return [0, 0, ""] as const;
    return [Number(m[1]), Number(m[2]), m[3]] as const;
  };
  const [as, ar, al] = parse(a);
  const [bs, br, bl] = parse(b);
  return as - bs || ar - br || al.localeCompare(bl);
}

/** Diff two rule maps. `oldRules` may be empty (initial build). */
export function diff(
  oldRules: Record<string, string>,
  newRules: Record<string, string>,
): Changelog {
  const added: string[] = [];
  const removed: string[] = [];
  const changed: { id: string; before: string; after: string }[] = [];

  for (const id of Object.keys(newRules)) {
    if (!(id in oldRules)) added.push(id);
    else if (oldRules[id] !== newRules[id]) {
      changed.push({ id, before: oldRules[id], after: newRules[id] });
    }
  }
  for (const id of Object.keys(oldRules)) {
    if (!(id in newRules)) removed.push(id);
  }

  added.sort(compareRuleIds);
  removed.sort(compareRuleIds);
  changed.sort((a, b) => compareRuleIds(a.id, b.id));
  return { added, removed, changed };
}

/** Render a changelog to markdown. `isInitial` produces a short "initial build" note. */
export function renderChangelog(
  changelog: Changelog,
  meta: { version: string; effectiveDate: string; isInitial: boolean },
): string {
  const lines: string[] = ["# Changelog", ""];
  lines.push(`## ${meta.version} (effective ${meta.effectiveDate})`, "");

  if (meta.isInitial) {
    lines.push("Initial build of the chunked Comprehensive Rules.", "");
    return lines.join("\n");
  }

  const { added, removed, changed } = changelog;
  if (added.length === 0 && removed.length === 0 && changed.length === 0) {
    lines.push("No rule text changes detected versus the previous build.", "");
    return lines.join("\n");
  }

  lines.push(
    `**${added.length} added · ${removed.length} removed · ${changed.length} changed**`,
    "",
  );

  if (added.length > 0) {
    lines.push("### Added", "");
    for (const id of added) lines.push(`- \`${id}\``);
    lines.push("");
  }
  if (removed.length > 0) {
    lines.push("### Removed", "");
    for (const id of removed) lines.push(`- \`${id}\``);
    lines.push("");
  }
  if (changed.length > 0) {
    lines.push("### Changed", "");
    for (const c of changed) {
      lines.push(`- \`${c.id}\``);
      lines.push(`  - before: ${truncate(c.before)}`);
      lines.push(`  - after: ${truncate(c.after)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function truncate(text: string, max = 200): string {
  const oneLine = text.replace(/\n/g, " ");
  return oneLine.length <= max ? oneLine : `${oneLine.slice(0, max - 1)}…`;
}
