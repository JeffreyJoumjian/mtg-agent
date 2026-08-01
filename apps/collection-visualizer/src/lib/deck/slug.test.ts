import { describe, expect, test } from "bun:test";
import { slugify, isValidSlug } from "./slug";

describe("slugify", () => {
  test("kebab-cases names", () => {
    expect(slugify("Scarlet Witch")).toEqual("scarlet-witch");
    expect(slugify("  Edgar's  Markov!! ")).toEqual("edgars-markov");
  });

  test("collapses non-alphanumerics", () => {
    expect(slugify("Ur-Dragon (5c)")).toEqual("ur-dragon-5c");
  });
});

describe("isValidSlug", () => {
  test("accepts kebab-case, rejects traversal and empties", () => {
    expect(isValidSlug("scarlet-witch")).toEqual(true);
    expect(isValidSlug("../evil")).toEqual(false);
    expect(isValidSlug("_TEMPLATE")).toEqual(false);
    expect(isValidSlug("")).toEqual(false);
  });
});
