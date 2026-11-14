/** The deck-brain ledger and the decks' decision logs: parse, validate, index and search.
 *
 *  The ledger is one Markdown file per topic in `.claude/skills/deck-brain/ledger/`. Every entry is a
 *  `### Title {#prefix-NNN}` heading followed by `**Field:**` lines (format: deck-brain `SKILL.md` §4).
 *  `INDEX.md` and `CARDS.md` in that folder are generated from the topic files by `bun run
 *  ledger:index`. Decision logs are each deck's `research/decisions.md`, one `## ` section per pass.
 *  `bun run lookup` searches both and prints whole entries and sections, never bare matching lines. */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { matchKey } from "./card-cache.ts";
import { DECKS_DIR, LEDGER_DIR, repoRelative } from "./paths.ts";

export type LedgerKind = "ruling" | "pattern" | "correction";

const KINDS: LedgerKind[] = ["ruling", "pattern", "correction"];
const REQUIRED_FIELDS = ["Claim", "Evidence", "Changes", "Source"];
/** Generated files that live beside the topic files and are not topics themselves. */
const GENERATED = ["INDEX.md", "CARDS.md"];

export interface LedgerEntry {
  id: string;
  title: string;
  /** Topic file name without `.md`, e.g. `triggers`. */
  topic: string;
  /** Repo-relative path of the topic file. */
  file: string;
  /** 1-based line of the `###` heading. */
  line: number;
  kind: LedgerKind | null;
  /** Set on rulings: when the entry was last checked, and against which rules version. */
  verified?: { date: string; cr: string };
  /** Set on patterns and corrections: when the entry was first written. */
  recorded?: string;
  cards: string[];
  rules: string[];
  /** Every `**Field:**` present, e.g. `{ Claim: "…", Source: "…" }` (first line of each). */
  fields: Record<string, string>;
  /** The whole entry as written, heading included. */
  text: string;
}

export interface LedgerTopic {
  topic: string;
  file: string;
  /** From the file's `# Ledger: <title>` heading. */
  title: string;
  entries: LedgerEntry[];
}

export interface DecisionSection {
  deck: string;
  file: string;
  line: number;
  heading: string;
  text: string;
}

/** Split a field list. Cards use `; ` because card names contain commas; rules use `, `. */
const listLine = (value: string | undefined, separator: string): string[] =>
  (value ?? "")
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);

/** Parse one topic file. Pure: the caller supplies the text and the repo-relative path. */
export function parseTopic(text: string, file: string): LedgerTopic {
  const topic = file.split("/").pop()!.replace(/\.md$/, "");
  const lines = text.split("\n");
  const title = lines.find((l) => l.startsWith("# "))?.replace(/^# (Ledger: )?/, "").trim() ?? topic;
  const entries: LedgerEntry[] = [];
  let start = -1;

  const flush = (end: number) => {
    if (start < 0) return;

    const body = lines.slice(start, end);
    while (body.length > 1 && body[body.length - 1].trim() === "") body.pop();
    const heading = body[0].replace(/^### /, "");
    const idMatch = heading.match(/\{#([a-z]+-\d{3})\}\s*$/);
    // A field's value is its own line, or, when that is empty, the lines under it (a bullet list).
    const fields: Record<string, string> = {};
    let open = "";
    for (const l of body.slice(1)) {
      const m = l.match(/^\*\*([A-Za-z ]+):\*\*\s*(.*)$/);

      if (m) {
        open = m[1] in fields ? "" : m[1];
        if (open) fields[open] = m[2];
        if (m[2].trim()) open = "";
      } else if (open && l.trim()) {
        fields[open] = `${fields[open]}\n${l}`.trim();
      }
    }
    const kindLine = fields.Kind ?? "";
    const kind = KINDS.find((k) => kindLine.startsWith(k)) ?? null;
    const verified = kindLine.match(/\*\*Verified:\*\*\s*(\S+) against CR (\S+)/);
    const recorded = kindLine.match(/\*\*Recorded:\*\*\s*(\S+)/);

    entries.push({
      id: idMatch?.[1] ?? "",
      title: heading.replace(/\s*\{#[^}]*\}\s*$/, "").trim(),
      topic,
      file,
      line: start + 1,
      kind,
      ...(verified ? { verified: { date: verified[1], cr: verified[2] } } : {}),
      ...(recorded ? { recorded: recorded[1] } : {}),
      cards: listLine(fields.Cards, ";"),
      rules: listLine(fields.Rules, ","),
      fields,
      text: body.join("\n"),
    });
    start = -1;
  };

  lines.forEach((l, i) => {
    if (l.startsWith("### ")) {
      flush(i);
      start = i;
    }
  });
  flush(lines.length);
  return { topic, file, title, entries };
}

/** Every format problem across the topic files, as human-readable lines. Empty means valid. */
export function validateLedger(topics: LedgerTopic[]): string[] {
  const errors: string[] = [];
  const seen: Record<string, string> = {};
  const prefixOwner: Record<string, string> = {};

  for (const t of topics) {
    for (const e of t.entries) {
      const where = `${e.file}:${e.line} "${e.title}"`;

      if (!e.id) {
        errors.push(`${where}: heading has no {#prefix-NNN} id`);
        continue;
      }
      if (seen[e.id]) errors.push(`${where}: id ${e.id} is also used at ${seen[e.id]}`);
      seen[e.id] = `${e.file}:${e.line}`;

      const prefix = e.id.split("-")[0];
      if (prefixOwner[prefix] && prefixOwner[prefix] !== t.topic) {
        errors.push(`${where}: prefix "${prefix}" belongs to ${prefixOwner[prefix]}.md`);
      }
      prefixOwner[prefix] ??= t.topic;

      if (!e.kind) errors.push(`${where}: **Kind:** must start with ruling, pattern or correction`);
      if (e.kind === "ruling" && !e.verified) errors.push(`${where}: a ruling needs "**Verified:** <date> against CR <version>"`);
      if (e.kind && e.kind !== "ruling" && !e.recorded) errors.push(`${where}: needs "**Recorded:** <date>"`);
      for (const f of REQUIRED_FIELDS) {
        if (!e.fields[f]?.trim()) errors.push(`${where}: missing **${f}:**`);
      }
    }
  }
  return errors;
}

/** `INDEX.md`: every entry by topic, one line each. */
export function renderIndex(topics: LedgerTopic[]): string {
  const all = topics.flatMap((t) => t.entries);
  const count = (k: LedgerKind) => all.filter((e) => e.kind === k).length;
  const lines = [
    "# Ledger index",
    "",
    "Generated by `bun run ledger:index` from the topic files in this folder; don't edit by hand.",
    `${all.length} entries: ${count("ruling")} rulings, ${count("pattern")} patterns, ${count("correction")} corrections.`,
    'Search every topic and every deck\'s decision log with `bun run lookup "<card | rule number | term>"`.',
  ];

  for (const t of topics) {
    lines.push("", `## ${t.title} (${t.file.split("/").pop()}, ${t.entries.length})`, "");
    for (const e of t.entries) lines.push(`- ${e.id} · ${e.kind ?? "?"} · ${e.title}`);
  }
  return lines.join("\n") + "\n";
}

/** `CARDS.md`: every card any entry names, with the ids that name it. */
export function renderCards(topics: LedgerTopic[]): string {
  const byCard: Record<string, string[]> = {};
  for (const e of topics.flatMap((t) => t.entries)) {
    for (const card of e.cards) (byCard[card] ??= []).push(e.id);
  }
  const names = Object.keys(byCard).sort((a, b) => matchKey(a).localeCompare(matchKey(b)));
  const lines = [
    "# Ledger card index",
    "",
    "Generated by `bun run ledger:index` from each entry's **Cards:** line; don't edit by hand.",
    "",
    ...names.map((n) => `- ${n}: ${byCard[n].join(", ")}`),
  ];
  return lines.join("\n") + "\n";
}

/** Split a decision log into its `## ` sections. Text before the first heading is skipped. */
export function parseDecisionLog(text: string, file: string, deck: string): DecisionSection[] {
  const lines = text.split("\n");
  const out: DecisionSection[] = [];
  let start = -1;

  const flush = (end: number) => {
    if (start < 0) return;

    const body = lines.slice(start, end);
    while (body.length > 1 && body[body.length - 1].trim() === "") body.pop();
    out.push({ deck, file, line: start + 1, heading: lines[start].replace(/^## /, "").trim(), text: body.join("\n") });
  };

  lines.forEach((l, i) => {
    if (l.startsWith("## ")) {
      flush(i);
      start = i;
    }
  });
  flush(lines.length);
  return out;
}

export interface OldEntryRef {
  oldLine: number;
  oldTitle: string;
  oldDate: string;
  id: string;
}

export interface LookupResult {
  /** Ledger entries, best match first: most queried cards on **Cards:** / rules on **Rules:**, then title. */
  entries: LedgerEntry[];
  decisions: DecisionSection[];
  /** Set when the query was an old `LEDGER.md:<line>` reference. */
  resolvedFrom?: OldEntryRef;
}

const RULE_REF = /^\d{3}(\.\d+[a-z]?)?$/;

/** True when rule `id` is `ref` or sits under it: `603` covers `603.2d`, `603.2` covers `603.2d`,
 *  but `603.2` doesn't cover `603.20`. */
function coversRule(ref: string, id: string): boolean {
  if (id === ref) return true;
  if (!id.startsWith(ref)) return false;

  const next = id[ref.length] ?? "";
  return /[a-z]/.test(next) || (ref.length === 3 && next === ".");
}
const ID_REF = /^[a-z]+-\d{3}$/;
const OLD_LINE_REF = /^LEDGER(?:\.md)?:(\d+)$/i;

/** Search the ledger and the decision logs. Every term must match (case- and accent-insensitive).
 *  A rule number also matches the rules under it (`603.2` finds `603.2d`); an entry id matches that
 *  entry; `LEDGER.md:<line>` resolves an old line reference through the archive's id map.
 *  `currentRuleNumbers` gives an entry's cited rules numbered as in the current rules, so a rule number
 *  also finds the entries that cited it under its old number. Pure. */
export function lookup(
  query: string,
  topics: LedgerTopic[],
  decisions: DecisionSection[],
  idMap: OldEntryRef[] = [],
  currentRuleNumbers: (e: LedgerEntry) => string[] = (e) => e.rules,
): LookupResult {
  const all = topics.flatMap((t) => t.entries);
  const trimmed = query.trim();
  const oldRef = trimmed.match(OLD_LINE_REF);

  if (oldRef) {
    const target = Number(oldRef[1]);
    // The map lists each old entry's heading line; a reference may point anywhere inside the entry.
    const hit = idMap.filter((r) => r.oldLine <= target).sort((a, b) => b.oldLine - a.oldLine)[0];
    return { entries: hit ? all.filter((e) => e.id === hit.id) : [], decisions: [], ...(hit ? { resolvedFrom: hit } : {}) };
  }
  if (ID_REF.test(trimmed)) return { entries: all.filter((e) => e.id === trimmed), decisions: [] };

  const terms = trimmed.split(/\s+/).filter(Boolean);
  const phrase = matchKey(trimmed);
  // A rule number in prose must not match a longer number: `603.2` finds `603.2d`, never `603.20`.
  const has = (hay: string, term: string) =>
    RULE_REF.test(term)
      ? new RegExp(`(?<![\\d.])${term.replace(".", "\\.")}(?!\\d)`).test(hay)
      : matchKey(hay).includes(matchKey(term));
  const ruleHit = (e: LedgerEntry, term: string) => RULE_REF.test(term) && currentRuleNumbers(e).some((r) => coversRule(term, r));

  // Entries that name more of the queried cards on their Cards line, or cite the queried rule, come
  // first; then a title match; then file order.
  const matches = all.filter((e) => !terms.some((t) => !has(e.text, t) && !ruleHit(e, t)));
  const relevance = (e: LedgerEntry) =>
    2 * e.cards.filter((c) => ` ${phrase} `.includes(` ${matchKey(c)} `)).length +
    2 * terms.filter((t) => ruleHit(e, t)).length +
    (has(e.title, trimmed) ? 1 : 0);
  const entries = matches.map((e, i) => ({ e, i, s: relevance(e) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.e);

  // Sections whose heading names the query come first, then the ones that mention it most.
  const mentions = (text: string) => matchKey(text).split(phrase).length - 1;
  const ranked = decisions
    .filter((d) => !terms.some((t) => !has(d.text, t)))
    .map((d, i) => ({ d, i, s: (has(d.heading, trimmed) ? 1000 : 0) + mentions(d.text) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.d);
  return { entries, decisions: ranked };
}

/** What `compareCitedRules` found for one entry's cited rules. */
export interface CitedRuleCheck {
  /** Cited rules whose text changed, or that don't exist in the older rules. */
  changed: string[];
  /** Cited rules whose text is unchanged but that sit under a different number in the newer rules. */
  moved: { from: string; to: string }[];
}

/** Rule text with its rule-number references blanked out, so renumbering doesn't read as an edit. */
const blankRuleNumbers = (text: string) =>
  text.replace(/\s+/g, " ").trim().replace(/\b\d{3}(?:\.\d+[a-z]*)?(?:[–-][a-z0-9]+)?/g, "#");

/** `603.2d` splits into `["603", ".2", "d"]`. */
const ruleParts = (id: string) => {
  const m = id.match(/^(\d{3})(?:\.(\d+)([a-z]*))?$/);

  return m ? [m[1], m[2] && `.${m[2]}`, m[3]].filter(Boolean) : [id];
};

/** Two versions of the rules, indexed for `compareCitedRules`. Indexing is the costly part, so build one
 *  per pair of versions and reuse it for every entry. */
export interface RuleIndex {
  before: Record<string, string>;
  beforeIds: string[];
  afterIds: string[];
  /** Ids in `after` by their text with rule numbers blanked out. */
  afterIdsByText: Record<string, string[]>;
  /** For each section of `before`, the section of `after` that most of its rules landed in. */
  homeSection: Record<string, string>;
}

/** Index `before` (the rules an entry was verified against) and `after` (the current rules). Pure. */
export function indexRules(before: Record<string, string>, after: Record<string, string>): RuleIndex {
  const afterIdsByText: Record<string, string[]> = {};
  for (const [id, text] of Object.entries(after)) {
    (afterIdsByText[blankRuleNumbers(text)] ??= []).push(id);
  }

  // Boilerplate recurs across sections (the same sentence ends Adventurer, Prototype, Omen and Preparation), so
  // a rule whose text appears at several numbers goes to the one in the section most of its old section moved to.
  const votes: Record<string, Record<string, number>> = {};
  for (const [id, text] of Object.entries(before)) {
    const candidates = afterIdsByText[blankRuleNumbers(text)] ?? [];
    const landed = candidates.includes(id) ? id : candidates.length === 1 ? candidates[0] : "";
    if (landed) {
      const tally = (votes[id.slice(0, 3)] ??= {});
      tally[landed.slice(0, 3)] = (tally[landed.slice(0, 3)] ?? 0) + 1;
    }
  }
  const homeSection: Record<string, string> = {};
  for (const [section, tally] of Object.entries(votes)) {
    homeSection[section] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  }

  return { before, beforeIds: Object.keys(before), afterIds: Object.keys(after), afterIdsByText, homeSection };
}

/** Compare the rules an entry cites (numbered as in `index.before`, the rules it was verified against)
 *  with `index.after`. A rule counts as unchanged when its text matches once rule-number references are
 *  blanked out, at the same number or at exactly one other number, so a section renumbering (Meld Cards
 *  taking 713 in CR 2026-11-06 shifted every later section up by one) doesn't read as an edit. A cited
 *  section-level number (`603.2`) covers its lettered subrules and also counts as changed when a rule
 *  was added under it. Pure. */
export function compareCitedRules(cited: string[], index: RuleIndex): CitedRuleCheck {
  const { before, beforeIds, afterIds, afterIdsByText, homeSection } = index;
  const result: CitedRuleCheck = { changed: [], moved: [] };
  for (const rule of cited) {
    const covered = beforeIds.filter((id) => coversRule(rule, id));

    // Where each covered rule is in `after`: its own number if the text still matches there, else the one other rule with the same text.
    const target: Record<string, string> = {};
    for (const id of covered) {
      const candidates = afterIdsByText[blankRuleNumbers(before[id])] ?? [];
      const inHomeSection = candidates.filter((c) => c.slice(0, 3) === homeSection[id.slice(0, 3)]);
      if (candidates.includes(id)) target[id] = id;
      else if (candidates.length === 1) target[id] = candidates[0];
      else if (inHomeSection.length === 1) target[id] = inHomeSection[0];
    }
    if (covered.length === 0 || covered.some((id) => !(id in target))) {
      result.changed.push(rule);
      continue;
    }

    const newIds = covered.map((id) => target[id]);
    const images = newIds.map((id) => ruleParts(id).slice(0, ruleParts(rule).length).join(""));
    const distinct = images.filter((image, i) => images.indexOf(image) === i);
    if (distinct.length > 1) {
      // The covered rules went to different places, so report each one that moved and skip the added-rule check.
      for (const id of covered.filter((c) => target[c] !== c)) result.moved.push({ from: id, to: target[id] });
      continue;
    }

    if (afterIds.some((id) => coversRule(distinct[0], id) && !newIds.includes(id))) result.changed.push(rule);
    else if (distinct[0] !== rule) result.moved.push({ from: rule, to: distinct[0] });
  }
  return result;
}

/** Read every topic file in the ledger folder, in name order. */
export function readLedger(dir = LEDGER_DIR): LedgerTopic[] {
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !GENERATED.includes(f))
    .sort()
    .map((f) => parseTopic(readFileSync(join(dir, f), "utf8"), repoRelative(join(dir, f))));
}

/** Every deck's `research/decisions.md`, split into sections. `deck` limits it to one slug. */
export function readDecisionLogs(deck?: string, decksDir = DECKS_DIR): DecisionSection[] {
  const slugs = deck ? [deck] : readdirSync(decksDir).filter((d) => !d.startsWith("_"));
  return slugs.flatMap((slug) => {
    const path = join(decksDir, slug, "research", "decisions.md");
    return existsSync(path) ? parseDecisionLog(readFileSync(path, "utf8"), repoRelative(path), slug) : [];
  });
}

/** The old `LEDGER.md` line → new id map written when the ledger was split. */
export function readIdMap(dir = LEDGER_DIR): OldEntryRef[] {
  const path = join(dir, "archive", "id-map.json");
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as OldEntryRef[]) : [];
}
