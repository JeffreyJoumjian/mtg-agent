import { describe, expect, test } from "bun:test";
import type { CardInfo } from "@mtg/deck-stats.ts";
import { primaryType } from "../model/card-types";
import { groupCards } from "./grouping";
import type { LaidOutSection } from "./layout";

const info = (typeLine: string, colors: string[] = []): CardInfo => ({
  name: "",
  cmc: 0,
  manaCost: "",
  typeLine,
  colors,
  colorIdentity: colors,
  producedMana: [],
  gameChanger: false,
  usd: null,
  commanderLegal: "legal",
});

const cards: Record<string, CardInfo | undefined> = {
  "Sol Ring": info("Artifact"),
  "Ravenous Squirrel": info("Creature — Squirrel", ["B", "G"]),
  "Academy Manufactor": info("Artifact Creature — Assembly-Worker"),
  Forest: info("Basic Land — Forest"),
  "Darkbore Pathway": info("Land // Land"),
  "Toxic Deluge": info("Sorcery", ["B"]),
  "Heroic Intervention": info("Instant", ["G"]),
  "Doubling Season": info("Enchantment", ["G"]),
  "Blade of the Bloodchief": info("Artifact — Equipment"),
  Mystery: undefined,
};

const sections: LaidOutSection[] = [
  {
    name: "Ramp",
    cards: [
      { name: "Sol Ring", qty: 1, state: "current" },
      { name: "Forest", qty: 3, state: "current" },
    ],
  },
  {
    name: "Engines",
    cards: [
      { name: "Ravenous Squirrel", qty: 1, state: "added" },
      { name: "Academy Manufactor", qty: 1, state: "current" },
      { name: "Doubling Season", qty: 1, state: "removed" },
      { name: "Mystery", qty: 1, state: "current" },
    ],
  },
  {
    name: "Interaction",
    cards: [
      { name: "Toxic Deluge", qty: 1, state: "current" },
      { name: "Heroic Intervention", qty: 1, state: "current" },
      { name: "Darkbore Pathway", qty: 1, state: "current" },
      { name: "Blade of the Bloodchief", qty: 1, state: "moved" },
    ],
  },
];

describe("primaryType", () => {
  test("one bucket per card, lands and creatures winning over their other types", () => {
    expect(primaryType("Artifact Creature — Assembly-Worker")).toEqual("creature");
    expect(primaryType("Artifact Land")).toEqual("land");
    expect(primaryType("Land // Land")).toEqual("land");
    expect(primaryType("Artifact — Equipment")).toEqual("artifact");
    expect(primaryType("Legendary Enchantment Artifact")).toEqual("artifact");
    expect(primaryType("Instant — Adventure")).toEqual("instant");
    expect(primaryType("Kindred Sorcery — Squirrel")).toEqual("sorcery");
    expect(primaryType("Legendary Planeswalker — Vraska")).toEqual("planeswalker");
    expect(primaryType("Battle — Siege")).toEqual("battle");
    expect(primaryType("Token")).toEqual(null);
  });
});

describe("groupCards", () => {
  test("by role keeps the list's own sections in order, except lands, which go last", () => {
    const withLands: LaidOutSection[] = [
      { name: "Lands", cards: [{ name: "Forest", qty: 3, state: "current" }] },
      ...sections,
    ];

    expect(groupCards(withLands, "role", cards).map((s) => s.name)).toEqual([
      "Ramp",
      "Engines",
      "Interaction",
      "Lands",
    ]);
    // Nothing to move: the same array comes back, so nothing re-renders.
    expect(groupCards(sections, "role", cards)).toBe(sections);
  });

  test("by type: the bar's order, plural labels, empty buckets dropped, unknown cards last", () => {
    const grouped = groupCards(sections, "type", cards);

    expect(grouped.map((s) => s.name)).toEqual([
      "Creatures",
      "Artifacts",
      "Instants",
      "Sorceries",
      "Enchantments",
      "Lands",
      "Other",
    ]);
    expect(grouped[0].cards.map((c) => c.name)).toEqual(["Academy Manufactor", "Ravenous Squirrel"]);
    expect(grouped[1].cards.map((c) => c.name)).toEqual(["Blade of the Bloodchief", "Sol Ring"]);
    expect(grouped[5].cards.map((c) => c.name)).toEqual(["Darkbore Pathway", "Forest"]);
    expect(grouped[6].cards.map((c) => c.name)).toEqual(["Mystery"]);
  });

  test("regrouping keeps every card's staged state and quantity", () => {
    const grouped = groupCards(sections, "type", cards);
    const find = (name: string) => grouped.flatMap((s) => s.cards).find((c) => c.name === name);

    expect(find("Ravenous Squirrel")?.state).toEqual("added");
    expect(find("Doubling Season")?.state).toEqual("removed");
    expect(find("Blade of the Bloodchief")?.state).toEqual("moved");
    expect(find("Forest")?.qty).toEqual(3);
  });

  test("by colour: one bucket per colour, multicolour, colourless, then lands", () => {
    const grouped = groupCards(sections, "color", cards);

    expect(grouped.map((s) => s.name)).toEqual(["Black", "Green", "Multicolour", "Colourless", "Lands", "Other"]);
    expect(grouped[2].cards.map((c) => c.name)).toEqual(["Ravenous Squirrel"]);
    expect(grouped[3].cards.map((c) => c.name)).toEqual(["Academy Manufactor", "Blade of the Bloodchief", "Sol Ring"]);
  });
});
