import { test, expect } from "bun:test";
import { toSummary } from "../scripts/lib/scryfall.ts";

test("toSummary carries id, oracleId, images and faces for a DFC", () => {
  const raw = {
    id: "abc",
    oracle_id: "o1",
    name: "Valakut Awakening // Valakut Stoneforge",
    layout: "modal_dfc",
    cmc: 3,
    color_identity: ["R"],
    legalities: { commander: "legal" },
    prices: { usd: "1.20" },
    card_faces: [
      {
        name: "Valakut Awakening",
        mana_cost: "{2}{R}",
        type_line: "Instant",
        oracle_text: "Put…",
        image_uris: { small: "s1", normal: "n1", art_crop: "a1" },
      },
      {
        name: "Valakut Stoneforge",
        mana_cost: "",
        type_line: "Land",
        oracle_text: "…",
        image_uris: { small: "s2", normal: "n2", art_crop: "a2" },
      },
    ],
  };
  const s = toSummary(raw);
  expect(s.id).toEqual("abc");
  expect(s.oracleId).toEqual("o1");
  expect(s.images).toEqual({ small: "s1", normal: "n1", artCrop: "a1" });
  expect(s.faces.map((f) => f.name)).toEqual(["Valakut Awakening", "Valakut Stoneforge"]);
  expect(s.faces[1].images).toEqual({ small: "s2", normal: "n2", artCrop: "a2" });
  expect(s.imageUri).toEqual("n1");
});

test("toSummary on a single-faced card has one face and top-level images", () => {
  const s = toSummary({
    id: "x",
    oracle_id: "y",
    name: "Sol Ring",
    mana_cost: "{1}",
    type_line: "Artifact",
    oracle_text: "…",
    image_uris: { small: "s", normal: "n", art_crop: "a" },
    legalities: {},
    prices: {},
  });
  expect(s.images).toEqual({ small: "s", normal: "n", artCrop: "a" });
  expect(s.faces).toEqual([
    { name: "Sol Ring", manaCost: "{1}", typeLine: "Artifact", oracleText: "…", images: { small: "s", normal: "n", artCrop: "a" } },
  ]);
});
