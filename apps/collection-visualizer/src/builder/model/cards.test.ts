import { test, expect } from "bun:test";
import { cardImage, toCardView, toCardInfo } from "./cards";
import type { CardSummary } from "@mtg/scryfall.ts";

const summary: CardSummary = {
  id: "id1",
  oracleId: "o1",
  name: "Valakut Awakening // Valakut Stoneforge",
  manaCost: "{2}{R} // ",
  cmc: 3,
  typeLine: "Instant // Land",
  oracleText: "front // back",
  colors: ["R"],
  colorIdentity: ["R"],
  producedMana: ["R"],
  keywords: [],
  layout: "modal_dfc",
  gameChanger: false,
  set: "znr",
  setName: "Zendikar Rising",
  collectorNumber: "174",
  rarity: "rare",
  usd: 1.2,
  commanderLegal: "legal",
  artist: "x",
  scryfallUri: "https://scryfall.com/card/znr/174",
  imageUri: "n1",
  images: { small: "s1", normal: "n1", artCrop: "a1" },
  faces: [
    {
      name: "Valakut Awakening",
      manaCost: "{2}{R}",
      typeLine: "Instant",
      oracleText: "front",
      images: { small: "s1", normal: "n1", artCrop: "a1" },
    },
    {
      name: "Valakut Stoneforge",
      manaCost: "",
      typeLine: "Land",
      oracleText: "back",
      images: { small: "s2", normal: "n2", artCrop: "a2" },
    },
  ],
};

test("toCardView keeps the stats slice plus what the UI renders", () => {
  const view = toCardView(summary);
  expect(view.id).toEqual("id1");
  expect(view.name).toEqual("Valakut Awakening // Valakut Stoneforge");
  expect(view.cmc).toEqual(3);
  expect(view.faces.length).toEqual(2);
  expect(view.rarity).toEqual("rare");
  expect(view.scryfallUri).toEqual("https://scryfall.com/card/znr/174");
});

test("toCardInfo is exactly the stats slice", () => {
  expect(toCardInfo(summary)).toEqual({
    name: "Valakut Awakening // Valakut Stoneforge",
    cmc: 3,
    manaCost: "{2}{R} // ",
    typeLine: "Instant // Land",
    colors: ["R"],
    colorIdentity: ["R"],
    producedMana: ["R"],
    gameChanger: false,
    usd: 1.2,
    commanderLegal: "legal",
  });
});

test("cardImage picks the size and face, and is null-safe", () => {
  const view = toCardView(summary);
  expect(cardImage(view, "normal")).toEqual("n1");
  expect(cardImage(view, "small", 1)).toEqual("s2");
  expect(cardImage(view, "artCrop", 5)).toEqual("a1");
  expect(cardImage(undefined, "normal")).toEqual(null);
});
