import { test, expect } from "bun:test";
import { addEntry, clearStaged, mergeAgentProposal, removeEntryAt, toChangeSet, type Staged } from "./staged";

const empty = (): Staged | null => null;

test("addEntry starts a staged set for the list and appends user entries", () => {
  let s = addEntry(empty(), "main", { op: "add", name: "Skullclamp", section: "Card Draw" });
  expect(s).toEqual({
    listId: "main",
    label: "",
    origin: null,
    entries: [{ op: "add", name: "Skullclamp", section: "Card Draw", author: "user" }],
  });

  s = addEntry(s, "main", { op: "remove", name: "Sol Ring" });
  expect(s?.entries.length).toEqual(2);
});

test("addEntry on a different list replaces the staged set (one list at a time)", () => {
  const s = addEntry(addEntry(empty(), "main", { op: "remove", name: "A" }), "b4", { op: "remove", name: "B" });
  expect(s?.listId).toEqual("b4");
  expect(s?.entries).toEqual([{ op: "remove", name: "B", author: "user" }]);
});

test("addEntry collapses a remove that cancels a staged add of the same card, and vice versa", () => {
  let s = addEntry(empty(), "main", { op: "add", name: "Skullclamp", section: "Card Draw" });
  s = addEntry(s, "main", { op: "remove", name: "skullclamp" });
  expect(s?.entries).toEqual([]);

  s = addEntry(empty(), "main", { op: "remove", name: "Sol Ring" });
  s = addEntry(s, "main", { op: "add", name: "Sol Ring", section: "Ramp" });
  expect(s?.entries).toEqual([]);
});

test("addEntry replaces an earlier move/qty of the same card instead of stacking them", () => {
  let s = addEntry(empty(), "main", { op: "move", name: "Bojuka Bog", section: "Utility" });
  s = addEntry(s, "main", { op: "move", name: "Bojuka Bog", section: "Lands" });
  expect(s?.entries).toEqual([{ op: "move", name: "Bojuka Bog", section: "Lands", author: "user" }]);

  s = addEntry(s, "main", { op: "qty", name: "Forest", qty: 6 });
  s = addEntry(s, "main", { op: "qty", name: "Forest", qty: 5 });
  expect(s?.entries.filter((e) => e.op === "qty")).toEqual([{ op: "qty", name: "Forest", qty: 5, author: "user" }]);
});

test("removeEntryAt drops one entry; clearStaged empties everything", () => {
  const s = addEntry(addEntry(empty(), "main", { op: "remove", name: "A" }), "main", { op: "remove", name: "B" });
  expect(removeEntryAt(s, 0)?.entries).toEqual([{ op: "remove", name: "B", author: "user" }]);
  expect(clearStaged()).toEqual(null);
});

test("mergeAgentProposal appends the agent's entries with its label, rationale and request id", () => {
  const user = addEntry(empty(), "main", { op: "remove", name: "A" });
  const merged = mergeAgentProposal(user, {
    requestId: "r1",
    changeSet: {
      listId: "main",
      label: "agent label",
      rationale: "why",
      author: "agent",
      entries: [{ op: "add", name: "B", section: "Ramp", replaces: "A" }],
    },
  });
  expect(merged).toEqual({
    listId: "main",
    label: "agent label",
    origin: { requestId: "r1", rationale: "why" },
    entries: [
      { op: "remove", name: "A", author: "user" },
      { op: "add", name: "B", section: "Ramp", replaces: "A", author: "agent" },
    ],
  });

  // A proposal for another list replaces what the user staged there.
  const other = mergeAgentProposal(user, {
    requestId: "r2",
    changeSet: { listId: "b4", label: "x", author: "agent", entries: [] },
  });
  expect(other.listId).toEqual("b4");
  expect(other.entries).toEqual([]);
});

test("toChangeSet strips per-entry authorship and sets the author from the origin", () => {
  const s = mergeAgentProposal(addEntry(empty(), "main", { op: "remove", name: "A" }), {
    requestId: "r1",
    changeSet: { listId: "main", label: "L", author: "agent", entries: [{ op: "add", name: "B", section: "Ramp" }] },
  });
  expect(toChangeSet(s, "custom label")).toEqual({
    listId: "main",
    label: "custom label",
    rationale: undefined,
    author: "agent",
    entries: [
      { op: "remove", name: "A" },
      { op: "add", name: "B", section: "Ramp" },
    ],
  });
  expect(toChangeSet(addEntry(empty(), "main", { op: "remove", name: "A" }), "").author).toEqual("user");
  expect(toChangeSet(addEntry(empty(), "main", { op: "remove", name: "A" }), "").label).toEqual("remove A");
});

test("previewKeyOf ignores the label so typing one does not refetch the preview", () => {
  const { previewKeyOf } = require("./staged");
  const a = { listId: "main", label: "a", author: "user" as const, entries: [{ op: "remove" as const, name: "X" }] };
  expect(previewKeyOf(a)).toEqual(previewKeyOf({ ...a, label: "a longer label", rationale: "why" }));
  expect(previewKeyOf(a)).not.toEqual(previewKeyOf({ ...a, entries: [] }));
});
