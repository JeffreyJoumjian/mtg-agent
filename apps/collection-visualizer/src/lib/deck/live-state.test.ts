import { describe, expect, test } from "bun:test";
import { normalizeLiveState } from "./live-state";

describe("normalizeLiveState", () => {
  test("accepts a full state and fills defaults", () => {
    const state = normalizeLiveState({
      updatedAt: 123,
      batch: { batchNumber: 4, cards: [{ name: "Sol Ring", blurb: "Fast mana." }] },
      keep: [{ name: "Ramp", cards: ["Arcane Signet"] }],
      considering: ["Diabolic Tutor"],
      pocket: ["Bojuka Bog"],
      note: "debating the removal package",
    });

    expect(state).toEqual({
      updatedAt: 123,
      batch: { batchNumber: 4, totalBatches: null, cards: [{ name: "Sol Ring", blurb: "Fast mana." }] },
      keep: [{ name: "Ramp", cards: ["Arcane Signet"] }],
      considering: ["Diabolic Tutor"],
      pocket: ["Bojuka Bog"],
      cut: [],
      tally: null,
      note: "debating the removal package",
    });
  });

  test("minimal empty state normalizes", () => {
    const state = normalizeLiveState({ updatedAt: 1 });
    expect(state).toEqual({
      updatedAt: 1,
      batch: null,
      keep: [],
      considering: [],
      pocket: [],
      cut: [],
      tally: null,
      note: null,
    });
  });

  test("garbage returns null", () => {
    expect(normalizeLiveState(null)).toEqual(null);
    expect(normalizeLiveState("nope")).toEqual(null);
    expect(normalizeLiveState({ updatedAt: "later" })).toEqual(null);
    expect(normalizeLiveState({ updatedAt: 1, keep: [{ cards: "not-an-array" }] })).toEqual(null);
  });

  test("string entries are coerced through, non-strings rejected", () => {
    expect(normalizeLiveState({ updatedAt: 1, considering: [1, 2] })).toEqual(null);
  });
});
