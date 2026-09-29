import { test, expect } from "bun:test";
import { applyPinnedPrintings, cardImage, toCardView, toCardInfo, withPrinting, type CardView } from "./cards";
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

const view = (over: Partial<CardView> = {}): CardView => ({
  name: "Sol Ring",
  cmc: 1,
  manaCost: "{1}",
  typeLine: "Artifact",
  colors: [],
  colorIdentity: [],
  producedMana: ["C"],
  gameChanger: false,
  usd: 1.5,
  commanderLegal: "legal",
  id: "default-id",
  oracleId: "oracle-sol-ring",
  oracleText: "{T}: Add {C}{C}.",
  images: { small: null, normal: "https://img/default.jpg", artCrop: "https://img/default-art.jpg" },
  faces: [
    {
      name: "Sol Ring",
      manaCost: "{1}",
      typeLine: "Artifact",
      oracleText: "",
      images: { small: null, normal: "https://img/default.jpg", artCrop: null },
    },
  ],
  layout: "normal",
  rarity: "uncommon",
  set: "c21",
  collectorNumber: "1",
  scryfallUri: "https://scryfall.com/card/c21/1",
  keywords: [],
  ...over,
});

test("withPrinting swaps the picture, set, number, rarity and page but keeps text and price", () => {
  const ltc = view({
    id: "ltc-id",
    images: { small: null, normal: "https://img/ltc.jpg", artCrop: "https://img/ltc-art.jpg" },
    faces: [
      {
        name: "Sol Ring",
        manaCost: "{1}",
        typeLine: "Artifact",
        oracleText: "",
        images: { small: null, normal: "https://img/ltc.jpg", artCrop: null },
      },
    ],
    set: "ltc",
    setName: "Tales of Middle-earth Commander",
    collectorNumber: "264",
    rarity: "rare",
    scryfallUri: "https://scryfall.com/card/ltc/264",
    usd: 9,
    oracleText: "should not leak",
  });
  const merged = withPrinting(view(), ltc);
  expect(cardImage(merged, "normal")).toEqual("https://img/ltc.jpg");
  expect(cardImage(merged, "artCrop")).toEqual("https://img/ltc-art.jpg");
  expect([merged.set, merged.setName, merged.collectorNumber, merged.rarity]).toEqual([
    "ltc",
    "Tales of Middle-earth Commander",
    "264",
    "rare",
  ]);
  expect(merged.scryfallUri).toEqual("https://scryfall.com/card/ltc/264");
  expect([merged.usd, merged.oracleText]).toEqual([1.5, "{T}: Add {C}{C}."]);
});

test("withPrinting ignores a printing of a different card", () => {
  const other = view({
    oracleId: "oracle-other",
    images: { small: null, normal: "https://img/other.jpg", artCrop: null },
  });
  expect(withPrinting(view(), other)).toEqual(view());
});

test("applyPinnedPrintings dresses only the pinned cards whose printing data is present", () => {
  const cards = { "Sol Ring": view(), Skullclamp: view({ name: "Skullclamp", oracleId: "oracle-clamp" }) };
  const meta = {
    "Sol Ring": { printing: { set: "LTC", collectorNumber: "264" } },
    Skullclamp: { printing: { set: "xyz", collectorNumber: "1" } },
  };
  const printings = {
    "ltc|264": view({
      id: "ltc-id",
      images: { small: null, normal: "https://img/ltc.jpg", artCrop: null },
      faces: [
        {
          name: "Sol Ring",
          manaCost: "{1}",
          typeLine: "Artifact",
          oracleText: "",
          images: { small: null, normal: "https://img/ltc.jpg", artCrop: null },
        },
      ],
    }),
  };
  const out = applyPinnedPrintings(cards, meta, printings);
  expect(cardImage(out["Sol Ring"], "normal")).toEqual("https://img/ltc.jpg");
  expect(out.Skullclamp).toEqual(cards.Skullclamp);
  expect(cardImage(cards["Sol Ring"], "normal")).toEqual("https://img/default.jpg");
});
