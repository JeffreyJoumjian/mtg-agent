import { test, expect } from "bun:test";
import { identityKey, rolesFor } from "../scripts/lib/card-roles.ts";
import { projectResult } from "../scripts/lib/spellbook.ts";

test("rolesFor tags what the oracle text says the card does", () => {
  expect(rolesFor({ typeLine: "Artifact", oracleText: "{T}: Add {C}{C}.", producedMana: ["C"] })).toEqual(["ramp"]);
  expect(rolesFor({ typeLine: "Sorcery", oracleText: "Search your library for a basic land card, put it onto the battlefield tapped, then shuffle." })).toEqual(["ramp"]);
  expect(rolesFor({ typeLine: "Sorcery", oracleText: "Search your library for up to two basic land cards, reveal those cards, put one onto the battlefield tapped and the other into your hand, then shuffle." })).toEqual(["ramp"]);
  expect(rolesFor({ typeLine: "Instant", oracleText: "Exile target creature. Its controller gains life equal to its power." })).toEqual(["removal"]);
  expect(rolesFor({ typeLine: "Sorcery", oracleText: "Destroy all creatures. They can't be regenerated." })).toEqual(["wipe"]);
  expect(rolesFor({ typeLine: "Instant", oracleText: "Counter target spell." })).toEqual(["counter"]);
  expect(rolesFor({ typeLine: "Sorcery", oracleText: "Search your library for a card, put that card into your hand, then shuffle." })).toEqual(["tutor"]);
  expect(rolesFor({ typeLine: "Basic Land — Forest", oracleText: "({T}: Add {G}.)", producedMana: ["G"] })).toEqual(["land"]);
  expect(rolesFor({ typeLine: "Artifact — Equipment", oracleText: "Equipped creature gets +1/-1.\nWhenever equipped creature dies, draw two cards.\nEquip {1}" })).toEqual(["draw"]);
  expect(rolesFor({ typeLine: "Creature — Merfolk Wizard", oracleText: "When Thassa's Oracle enters, look at the top X cards of your library, where X is your devotion to blue. Put up to one of them on top of your library and the rest on the bottom of your library in a random order. If X is greater than or equal to the number of cards in your library, you win the game." })).toEqual(["wincon"]);
});

test("identityKey orders colours WUBRG", () => {
  expect(identityKey([["G", "B"], ["U"]])).toEqual("UBG");
  expect(identityKey([[]])).toEqual("");
});

test("projectResult keeps assembled combos and only close near-misses", () => {
  const use = (name: string) => ({ card: { name } });
  const raw = {
    results: {
      included: [{ id: "a", uses: [use("Thassa's Oracle"), use("Demonic Consultation")], produces: [{ feature: { name: "Win the game" } }], description: "d", manaNeeded: "{U}{U}{B}", bracketTag: "R", popularity: 10 }],
      almostIncluded: [
        { id: "b", uses: [use("Sol Ring"), use("Hullbreaker Horror")], produces: [], popularity: 99 },
        { id: "c", uses: [use("Thassa's Oracle"), use("Demonic Consultation"), use("Laboratory Maniac")], produces: [], popularity: 5 },
      ],
    },
  };
  const result = projectResult(raw, ["Thassa's Oracle", "Demonic Consultation", "Sol Ring"]);
  expect(result.included.map((c) => [c.id, c.cards, c.produces, c.missing])).toEqual([["a", ["Thassa's Oracle", "Demonic Consultation"], ["Win the game"], []]]);
  // "b" shares only one card with the list, so it's dropped; "c" shares two and is one card away.
  expect(result.almostIncluded.map((c) => [c.id, c.missing])).toEqual([["c", ["Laboratory Maniac"]]]);
});
