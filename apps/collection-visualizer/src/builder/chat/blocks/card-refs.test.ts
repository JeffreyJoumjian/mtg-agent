import { test, expect } from "bun:test";
import { splitCardRefs, cardRefsToMarkdown } from "./card-refs";

test("splitCardRefs finds [[Card Name]] references and keeps the surrounding text", () => {
  expect(splitCardRefs("Try [[Skullclamp]] over [[Idol of Oblivion]].")).toEqual([
    { type: "text", text: "Try " },
    { type: "card", name: "Skullclamp" },
    { type: "text", text: " over " },
    { type: "card", name: "Idol of Oblivion" },
    { type: "text", text: "." },
  ]);
});

test("splitCardRefs also reads the Scryfall exact-name link form from CLAUDE.md", () => {
  const md =
    "See [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) and [Mjölnir, Hammer of Thor](https://scryfall.com/search?q=%21%22Mj%C3%B6lnir%2C+Hammer+of+Thor%22).";
  expect(splitCardRefs(md)).toEqual([
    { type: "text", text: "See " },
    { type: "card", name: "Sol Ring" },
    { type: "text", text: " and " },
    { type: "card", name: "Mjölnir, Hammer of Thor" },
    { type: "text", text: "." },
  ]);
});

test("splitCardRefs returns plain text untouched", () => {
  expect(splitCardRefs("no cards here")).toEqual([{ type: "text", text: "no cards here" }]);
});

test("cardRefsToMarkdown rewrites both forms into one link shape the markdown renderer can intercept", () => {
  expect(
    cardRefsToMarkdown("[[Sol Ring]] and [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22)"),
  ).toEqual("[Sol Ring](card:Sol%20Ring) and [Skullclamp](card:Skullclamp)");
});
