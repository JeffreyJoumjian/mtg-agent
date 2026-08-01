import { describe, expect, test } from "bun:test";
import { z } from "zod";
import { batchSchema, tallySchema, finalListSchema } from "./ui-tools";

describe("batchSchema", () => {
  test("accepts a valid batch and round-trips it", () => {
    const input = {
      batchNumber: 4,
      totalBatches: 12,
      cards: [{ name: "Sol Ring", manaCost: "{1}", typeLine: "Artifact", blurb: "Fast mana." }],
    };
    expect(z.object(batchSchema).parse(input)).toEqual(input);
  });

  test("rejects a batch without cards", () => {
    expect(() => z.object(batchSchema).parse({ batchNumber: 1, cards: [] })).toThrow();
    expect(() => z.object(batchSchema).parse({ batchNumber: 1 })).toThrow();
  });
});

describe("tallySchema", () => {
  test("accepts the full tally shape", () => {
    const input = {
      keeps: 71, cuts: 20, pockets: 3, target: 99,
      gameChangers: 2, gcCeiling: 3, manaSources: 44,
      categories: [{ name: "Removal", count: 8, target: 9 }],
    };
    expect(z.object(tallySchema).parse(input)).toEqual(input);
  });

  test("requires the core counters", () => {
    expect(() => z.object(tallySchema).parse({ keeps: 1 })).toThrow();
  });
});

describe("finalListSchema", () => {
  test("accepts groups + total", () => {
    const input = { groups: [{ name: "Lands", cards: ["Command Tower"] }], total: 100, summary: "done" };
    expect(z.object(finalListSchema).parse(input)).toEqual(input);
  });
});
