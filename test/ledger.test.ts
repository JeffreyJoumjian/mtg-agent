import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  compareCitedRules,
  indexRules,
  lookup,
  parseDecisionLog,
  parseTopic,
  readLedger,
  renderCards,
  renderIndex,
  validateLedger,
} from "../scripts/lib/ledger.ts";
import { LEDGER_DIR } from "../scripts/lib/paths.ts";

const compare = (cited: string[], before: Record<string, string>, after: Record<string, string>) =>
  compareCitedRules(cited, indexRules(before, after));

const TOPIC = `# Ledger: Triggers, the stack and targeting

Scope paragraph.

---

### Teysa Karlov doesn't beat "triggers only once each turn" {#trig-001}

**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07
**Cards:** Teysa Karlov; Morbid Opportunist; Vito, Thorn of the Dusk Rose
**Rules:** 603.1, 603.2d
**Claim:** A doubler can't push an ability past its own once-each-turn cap.
**Evidence:** CR 603.2d.
**Changes:** Don't count once-per-turn draw engines as doubled.
**Source:** teysa-karlov (2026-09-24)

### Name the deciding axis out loud {#trig-002}

**Kind:** pattern · **Recorded:** 2026-08-04
**Cards:** Fiery Emancipation
**Rules:** 603.20
**Claim:** Say which axis drives the call.
**Evidence:** The Emancipation reversal, which also mentions Teysa Karlov in passing.
**Changes:** State the axis.
**Source:** scarlet-witch (2026-08-04)
`;
const FILE = ".claude/skills/deck-brain/ledger/triggers.md";

test("parseTopic reads id, kind, verification, cards, rules and fields from each entry", () => {
  const t = parseTopic(TOPIC, FILE);
  expect(t.title).toEqual("Triggers, the stack and targeting");
  expect(t.entries.map((e) => [e.id, e.kind, e.line])).toEqual([
    ["trig-001", "ruling", 7],
    ["trig-002", "pattern", 17],
  ]);
  expect(t.entries[0].verified).toEqual({ date: "2026-09-24", cr: "2026-08-07" });
  expect(t.entries[0].cards).toEqual(["Teysa Karlov", "Morbid Opportunist", "Vito, Thorn of the Dusk Rose"]);
  expect(t.entries[0].rules).toEqual(["603.1", "603.2d"]);
  expect(t.entries[1].recorded).toEqual("2026-08-04");
  expect(t.entries[0].title).toEqual(`Teysa Karlov doesn't beat "triggers only once each turn"`);
});

test("validateLedger accepts well-formed entries and names every broken one", () => {
  expect(validateLedger([parseTopic(TOPIC, FILE)])).toEqual([]);

  const broken = TOPIC.replace("{#trig-002}", "{#trig-001}")
    .replace("**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07", "**Kind:** ruling")
    .replace("**Claim:** Say which axis drives the call.\n", "");
  const errors = validateLedger([parseTopic(broken, FILE)]);
  expect(errors.length).toEqual(3);
  expect(errors[0]).toContain('a ruling needs "**Verified:** <date> against CR <version>"');
  expect(errors[1]).toContain("id trig-001 is also used at");
  expect(errors[2]).toContain("missing **Claim:**");
});

test("renderCards lists every named card alphabetically with the ids that name it", () => {
  expect(renderCards([parseTopic(TOPIC, FILE)])).toContain(
    "- Fiery Emancipation: trig-002\n- Morbid Opportunist: trig-001\n- Teysa Karlov: trig-001\n- Vito, Thorn of the Dusk Rose: trig-001\n",
  );
});

test("renderIndex groups entries by topic and counts kinds", () => {
  const out = renderIndex([parseTopic(TOPIC, FILE)]);
  expect(out).toContain("2 entries: 1 rulings, 1 patterns, 0 corrections.");
  expect(out).toContain("## Triggers, the stack and targeting (triggers.md, 2)\n\n- trig-001 · ruling · Teysa Karlov");
});

test("lookup ranks entries that name the card on their Cards line above passing mentions", () => {
  const topics = [parseTopic(TOPIC, FILE)];
  expect(lookup("teysa karlov", topics, []).entries.map((e) => e.id)).toEqual(["trig-001", "trig-002"]);
  expect(lookup("Fiery Emancipation", topics, []).entries.map((e) => e.id)).toEqual(["trig-002"]);
});

test("lookup matches a rule number and the rules under it, but not a longer number", () => {
  const topics = [parseTopic(TOPIC, FILE)];
  expect(lookup("603.2", topics, []).entries.map((e) => e.id)).toEqual(["trig-001"]);
  expect(lookup("603", topics, []).entries.map((e) => e.id)).toEqual(["trig-001", "trig-002"]);
  expect(lookup("trig-002", topics, []).entries.map((e) => e.id)).toEqual(["trig-002"]);
});

test("lookup finds an entry by the current number of a rule it cited under an older number", () => {
  const topics = [parseTopic(TOPIC, FILE)];
  // trig-001 cites 603.1 and 603.2d. Say 603.2d has since moved to 604.9d.
  const current = (e: { rules: string[] }) => e.rules.map((r) => (r === "603.2d" ? "604.9d" : r));
  expect(lookup("604.9d", topics, [], [], current).entries.map((e) => e.id)).toEqual(["trig-001"]);
  expect(lookup("604.9d", topics, []).entries.map((e) => e.id)).toEqual([]);
});

test("lookup resolves an old LEDGER.md line reference to the entry that absorbed it", () => {
  const topics = [parseTopic(TOPIC, FILE)];
  const idMap = [
    { oldLine: 833, oldTitle: "Roaming Throne does NOT beat …", oldDate: "2026-08-25", id: "trig-001" },
    { oldLine: 2519, oldTitle: "Name the deciding axis out loud", oldDate: "2026-08-04", id: "trig-002" },
  ];
  const res = lookup("LEDGER.md:840", topics, [], idMap);
  expect(res.entries.map((e) => e.id)).toEqual(["trig-001"]);
  expect(res.resolvedFrom?.oldLine).toEqual(833);
});

test("lookup returns whole decision-log sections, heading matches first", () => {
  const log = `# Decisions\n\nintro\n\n## 2026-09-20 — pass\n\nMentions Roaming Throne once.\n\n## 2026-09-22 — Roaming Throne re-derived\n\nDeclined by the pilot.\n`;
  const sections = parseDecisionLog(log, "decks/chatterfang/research/decisions.md", "chatterfang");
  expect(sections.map((s) => s.line)).toEqual([5, 9]);
  const res = lookup("Roaming Throne", [], sections);
  expect(res.decisions.map((d) => d.heading)).toEqual(["2026-09-22 — Roaming Throne re-derived", "2026-09-20 — pass"]);
  expect(res.decisions[0].text).toEqual("## 2026-09-22 — Roaming Throne re-derived\n\nDeclined by the pilot.");
});

test("compareCitedRules flags a cited rule whose text, or a subrule's text, changed between versions", () => {
  const before = { "603.2": "a", "603.2d": "old", "702.19": "t" };
  const after = { "603.2": "a", "603.2d": "new", "702.19": "t" };
  expect(compare(["603.2", "702.19", "999.1"], before, after)).toEqual({ changed: ["603.2", "999.1"], moved: [] });
  expect(compare(["702.19"], before, after)).toEqual({ changed: [], moved: [] });
  expect(compare(["603.2"], { "603.2": "a" }, { "603.2": "a", "603.2a": "added later" })).toEqual({ changed: ["603.2"], moved: [] });
});

test("compareCitedRules follows a rule whose text moved to another number, and ignores edits to rule-number references", () => {
  // CR 2026-11-06 put Meld Cards at 713, so Taking Shortcuts went from 732 to 733 and Day and Night took 732.
  const before = {
    "732.2a": "A player may suggest a shortcut (see rule 732.5).",
    "732.5": "Loops end when a player stops.",
    "603.3a": "Controlled by the player who controlled its source (see rules 603.7d–f).",
  };
  const after = {
    "732.2a": "If it's day and nobody cast a spell, it becomes night.",
    "733.2a": "A player may suggest a shortcut (see rule 733.5).",
    "733.5": "Loops end when a player stops.",
    "603.3a": "Controlled by the player who controlled its source (see rules 603.7d–g).",
  };
  expect(compare(["732.2a", "732.5", "603.3a"], before, after)).toEqual({
    changed: [],
    moved: [
      { from: "732.2a", to: "733.2a" },
      { from: "732.5", to: "733.5" },
    ],
  });
});

test("compareCitedRules follows a cited section as a whole, and flags edits, additions and ambiguous matches", () => {
  const before = { "722.1": "Prep one.", "722.2": "Prep two.", "603.1": "Same words.", "603.2": "Same words." };
  const moved = { "723.1": "Prep one.", "723.2": "Prep two.", "722.1": "Station one.", "603.1": "Same words.", "603.2": "Same words." };
  expect(compare(["722"], before, moved)).toEqual({ changed: [], moved: [{ from: "722", to: "723" }] });
  expect(compare(["722"], before, { ...moved, "723.3": "A new prep rule." })).toEqual({ changed: ["722"], moved: [] });
  expect(compare(["722.2"], before, { ...moved, "723.2": "Prep two, reworded." })).toEqual({ changed: ["722.2"], moved: [] });

  // A rule whose text now appears at two other numbers can't be tied to one, so it's flagged for a re-check.
  expect(compare(["722.1"], before, { "723.1": "Prep one.", "724.1": "Prep one." })).toEqual({ changed: ["722.1"], moved: [] });
});

test("compareCitedRules settles boilerplate that recurs across sections by where the rest of its section went", () => {
  const before = { "722.1": "Prep one.", "722.2": "Prep two.", "722.3": "Shared closing sentence." };
  const after = { "723.1": "Prep one.", "723.2": "Prep two.", "723.3": "Shared closing sentence.", "716.3": "Shared closing sentence." };
  expect(compare(["722"], before, after)).toEqual({ changed: [], moved: [{ from: "722", to: "723" }] });
  expect(compare(["722.3"], before, after)).toEqual({ changed: [], moved: [{ from: "722.3", to: "723.3" }] });
});

test("the repo's ledger is well-formed and its INDEX.md and CARDS.md are fresh", () => {
  const topics = readLedger();
  expect(topics.length).toBeGreaterThan(0);
  expect(validateLedger(topics)).toEqual([]);
  expect(readFileSync(join(LEDGER_DIR, "INDEX.md"), "utf8")).toEqual(renderIndex(topics));
  expect(readFileSync(join(LEDGER_DIR, "CARDS.md"), "utf8")).toEqual(renderCards(topics));
});

test("a field written as a bullet list under its label counts as present", () => {
  const listed = TOPIC.replace("**Changes:** State the axis.", "**Changes:**\n- State the axis.\n- Say it first.");
  const t = parseTopic(listed, FILE);
  expect(t.entries[1].fields.Changes).toEqual("- State the axis.\n- Say it first.");
  expect(validateLedger([t])).toEqual([]);
});

test("lookup ranks the entry naming every queried card above one naming only some of them", () => {
  const two = `# Ledger: T\n\n### Teysa and drain {#trig-001}\n\n**Kind:** pattern · **Recorded:** 2026-09-01\n**Cards:** Teysa Karlov\n**Claim:** Mentions Morbid Opportunist in passing.\n**Evidence:** x\n**Changes:** x\n**Source:** x\n\n### The cap {#trig-002}\n\n**Kind:** pattern · **Recorded:** 2026-09-02\n**Cards:** Teysa Karlov; Morbid Opportunist\n**Claim:** x\n**Evidence:** x\n**Changes:** x\n**Source:** x\n`;
  const topics = [parseTopic(two, FILE)];
  expect(lookup("Teysa Karlov Morbid Opportunist", topics, []).entries.map((e) => e.id)).toEqual(["trig-002", "trig-001"]);
});
