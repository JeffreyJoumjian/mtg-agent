import { describe, expect, test } from "bun:test";
import { indexByName } from "./scryfall";

describe("indexByName", () => {
  test("keys cards by lowercased full name and front face", () => {
    const fire = { name: "Fire // Ice" };
    const bolt = { name: "Lightning Bolt" };
    const index = indexByName([fire, bolt]);

    expect(index["fire // ice"]).toEqual(fire);
    expect(index["fire"]).toEqual(fire);
    expect(index["lightning bolt"]).toEqual(bolt);
    expect("ice" in index).toEqual(false);
  });
});
