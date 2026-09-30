#!/usr/bin/env bun
/** Look up past rulings, patterns and deck decisions, and keep the ledger's generated indexes fresh.
 *
 *  Usage:
 *    bun run lookup "Roaming Throne"                       # every ledger entry and decision-log section naming it
 *    bun run lookup 603.2d                                 # entries citing that rule (603.2 also finds 603.2d)
 *    bun run lookup trig-014                               # one entry by id
 *    bun run lookup "LEDGER.md:6087"                       # an old pre-split line reference
 *    bun run lookup "Roaming Throne" --deck chatterfang    # only that deck's decision log
 *    bun run lookup "..." --ledger | --decisions           # one source only
 *    bun run lookup "..." --limit 30                       # print more whole results (default 12 / 6)
 *    bun run ledger:index                                  # regenerate ledger/INDEX.md and ledger/CARDS.md
 *    bun run ledger:index --check                          # exit 1 if they're stale or an entry breaks the format
 *
 *  Results are whole entries and whole sections, never bare matching lines. Nothing past the limit is
 *  dropped silently: the rest are listed by id or heading. */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  changedRules,
  lookup,
  readDecisionLogs,
  readIdMap,
  readLedger,
  renderCards,
  renderIndex,
  validateLedger,
  type LedgerEntry,
} from "./lib/ledger.ts";
import { parseRules } from "./lib/parser.ts";
import { LEDGER_DIR, META_PATH, RAW_DIR, RULES_JSON_PATH } from "./lib/paths.ts";

const args = process.argv.slice(2);
const flagValue = (name: string): string | undefined => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const hasFlag = (name: string): boolean => args.includes(name);
const DECISION_LINE_CAP = 80;

/** Rule text per rules version, loaded only when a result needs it. */
const rulesByVersion: Record<string, Record<string, string> | null> = {};
function rulesFor(version: string, current: string): Record<string, string> | null {
  if (version in rulesByVersion) return rulesByVersion[version];

  const rawPath = join(RAW_DIR, `MagicCompRules.${version.replaceAll("-", ".")}.txt`);
  rulesByVersion[version] =
    version === current
      ? (JSON.parse(readFileSync(RULES_JSON_PATH, "utf8")) as Record<string, string>)
      : existsSync(rawPath)
        ? parseRules(readFileSync(rawPath, "utf8")).rules
        : null;
  return rulesByVersion[version];
}

/** One line saying whether a ruling still stands on the current rules text. */
function freshness(e: LedgerEntry, current: string): string | null {
  if (e.kind !== "ruling" || !e.verified || e.verified.cr === current) return null;

  const before = rulesFor(e.verified.cr, current);
  const after = rulesFor(current, current);
  if (!before || !after) return `⚠ Verified against CR ${e.verified.cr}, whose text isn't in rules/raw/. Re-check the cited rules.`;
  if (e.rules.length === 0) return `⚠ Verified against CR ${e.verified.cr} and cites no rule numbers. Re-check it against CR ${current}.`;

  const changed = changedRules(e.rules, before, after);
  return changed.length
    ? `⚠ Verified against CR ${e.verified.cr}; since then these cited rules changed: ${changed.join(", ")}. Re-check them.`
    : `✓ Verified against CR ${e.verified.cr}; none of its cited rules changed in CR ${current}.`;
}

function runLookup(): void {
  const valueFlags = ["--deck", "--limit"];
  const query = args
    .slice(1)
    .filter((a, i, all) => !a.startsWith("--") && !valueFlags.includes(all[i - 1]))
    .join(" ")
    .trim();
  if (!query) {
    console.error('Usage: bun run lookup "<card | rule number | term | entry id>" [--deck <slug>] [--ledger | --decisions]');
    process.exit(1);
  }

  const deck = flagValue("--deck");
  const limit = Number(flagValue("--limit") ?? 0);
  const current = (JSON.parse(readFileSync(META_PATH, "utf8")) as { version: string }).version;
  const result = lookup(query, hasFlag("--decisions") ? [] : readLedger(), hasFlag("--ledger") ? [] : readDecisionLogs(deck), readIdMap());

  if (result.resolvedFrom) {
    const r = result.resolvedFrom;
    console.log(`Old reference LEDGER.md:${r.oldLine} was "${r.oldTitle}" (${r.oldDate}); it now lives in ${r.id}.\n`);
  }

  const ledgerLimit = limit || 12;
  if (!hasFlag("--decisions")) {
    console.log(`LEDGER: ${result.entries.length} entr${result.entries.length === 1 ? "y" : "ies"} for "${query}" (current rules: CR ${current})`);
    for (const e of result.entries.slice(0, ledgerLimit)) {
      console.log(`\n── ${e.id} · ${e.file}:${e.line} ──\n${e.text}`);
      const note = freshness(e, current);
      if (note) console.log(note);
    }
    const rest = result.entries.slice(ledgerLimit);
    if (rest.length) {
      console.log(`\n${rest.length} more (re-run with --limit ${result.entries.length}, or look one up by id):`);
      for (const e of rest) console.log(`- ${e.id} · ${e.title}`);
    }
  }

  const decisionLimit = limit || 6;
  if (!hasFlag("--ledger")) {
    console.log(`\nDECISION LOGS${deck ? ` (${deck})` : ""}: ${result.decisions.length} section${result.decisions.length === 1 ? "" : "s"}`);
    for (const d of result.decisions.slice(0, decisionLimit)) {
      const lines = d.text.split("\n");
      console.log(`\n── ${d.deck} · ${d.file}:${d.line} ──\n${lines.slice(0, DECISION_LINE_CAP).join("\n")}`);
      if (lines.length > DECISION_LINE_CAP) {
        console.log(`… ${lines.length - DECISION_LINE_CAP} more lines: ${d.file}:${d.line + DECISION_LINE_CAP}-${d.line + lines.length - 1}`);
      }
    }
    const rest = result.decisions.slice(decisionLimit);
    if (rest.length) {
      console.log(`\n${rest.length} more section${rest.length === 1 ? "" : "s"} (re-run with --limit or --deck):`);
      for (const d of rest) console.log(`- ${d.deck} · ${d.file}:${d.line} · ${d.heading}`);
    }
  }
}

function runIndex(): void {
  const topics = readLedger();
  const errors = validateLedger(topics);
  const files = { "INDEX.md": renderIndex(topics), "CARDS.md": renderCards(topics) };

  if (hasFlag("--check")) {
    const stale = Object.entries(files)
      .filter(([name, text]) => !existsSync(join(LEDGER_DIR, name)) || readFileSync(join(LEDGER_DIR, name), "utf8") !== text)
      .map(([name]) => name);
    for (const e of errors) console.error(e);
    if (stale.length) console.error(`Stale: ${stale.join(", ")}. Run \`bun run ledger:index\`.`);
    if (errors.length || stale.length) process.exit(1);
    console.log(`Ledger OK: ${topics.reduce((n, t) => n + t.entries.length, 0)} entries, indexes fresh.`);
    return;
  }

  for (const [name, text] of Object.entries(files)) writeFileSync(join(LEDGER_DIR, name), text);
  const count = topics.reduce((n, t) => n + t.entries.length, 0);
  console.log(`Wrote INDEX.md and CARDS.md for ${count} entries in ${topics.length} topic files.`);
  if (errors.length) {
    console.error(`\n${errors.length} format problem${errors.length === 1 ? "" : "s"}:`);
    for (const e of errors) console.error(e);
    process.exit(1);
  }
}

const [command] = args;
if (command === "lookup") runLookup();
else if (command === "index") runIndex();
else {
  console.error("Usage: bun run lookup <query> | bun run ledger:index [--check]");
  process.exit(1);
}
