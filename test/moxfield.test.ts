import { test, expect } from "bun:test";
import { parseDecklistEntries } from "../scripts/lib/decklist.ts";
import {
  mergePrintings,
  parsePrintings,
  parsePrintingRef,
  printingsFromMeta,
  toMoxfield,
  moxfieldFileFor,
} from "../scripts/lib/moxfield.ts";
import type { DeckList } from "../scripts/lib/deck-model.ts";

const DECK: DeckList = {
  label: "Main",
  kind: "deck",
  sections: [
    { name: "Commander", cards: [{ name: "Inquisitor Greyfax", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Watery Grave", qty: 1 }, { name: "Island", qty: 4 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }, { name: "Smothering Tithe", qty: 1 }] },
  ],
};

test("parseDecklistEntries keeps quantities and the section each card sits under", () => {
  const text = ["## Commander (1)", "1x Inquisitor Greyfax", "## Lands (36)", "4x Island"].join("\n");
  expect(parseDecklistEntries(text)).toEqual([
    { qty: 1, name: "Inquisitor Greyfax", section: "Commander (1)" },
    { qty: 4, name: "Island", section: "Lands (36)" },
  ]);
});

test("toMoxfield puts the commander first, then sorts the rest by name", () => {
  const out = toMoxfield(DECK);
  expect(out.lines).toEqual(["1 Inquisitor Greyfax", "4 Island", "1 Smothering Tithe", "1 Sol Ring", "1 Watery Grave"]);
  expect(out.total).toEqual(8);
  expect(out.missingPrintings).toEqual(["Inquisitor Greyfax", "Island", "Smothering Tithe", "Sol Ring", "Watery Grave"]);
});

test("toMoxfield pins printings when a printings map supplies them", () => {
  const printings = parsePrintings(["1 Inquisitor Greyfax (40K) 3", "1 Sol Ring (LTC) 264", "4 Island (THB) 251"].join("\n"));
  const out = toMoxfield(DECK, printings);
  expect(out.lines).toEqual([
    "1 Inquisitor Greyfax (40K) 3",
    "4 Island (THB) 251",
    "1 Smothering Tithe",
    "1 Sol Ring (LTC) 264",
    "1 Watery Grave",
  ]);
  expect(out.missingPrintings).toEqual(["Smothering Tithe", "Watery Grave"]);
});

test("printingsFromMeta turns deck.json printing pins into the export grammar", () => {
  expect(
    printingsFromMeta({
      "Sol Ring": { printing: { set: "ltc", collectorNumber: "264" } },
      Counterspell: { status: "OWNED", printing: { set: "sld", collectorNumber: "7010", foil: true } },
      Forest: { status: "PROXY" },
    }),
  ).toEqual({ "Sol Ring": "(LTC) 264", Counterspell: "(SLD) 7010 *F*" });
});

test("parsePrintingRef reads the export grammar back into a Printing", () => {
  expect(parsePrintingRef("(LTC) 264")).toEqual({ set: "ltc", collectorNumber: "264" });
  expect(parsePrintingRef("(SLD) 7010 *F*")).toEqual({ set: "sld", collectorNumber: "7010", foil: true });
  expect(parsePrintingRef("(PLST) C18-232")).toEqual({ set: "plst", collectorNumber: "C18-232" });
  expect(parsePrintingRef("nonsense")).toEqual(null);
});

test("mergePrintings lets a deck's own printings override the global reserve and fills the rest from it", () => {
  const global = parsePrintings("1 Sol Ring (SLD) 1734\n1 Ancient Tomb (UMA) 236\n");
  const deck = parsePrintings("1 Sol Ring (LTC) 264\n1 Command Tower (CMM) 1000\n");
  expect(mergePrintings(global, deck)).toEqual({
    "Sol Ring": "(LTC) 264",
    "Ancient Tomb": "(UMA) 236",
    "Command Tower": "(CMM) 1000",
  });
  expect(global).toEqual({ "Sol Ring": "(SLD) 1734", "Ancient Tomb": "(UMA) 236" });
});

test("parsePrintings keys a double-faced card on its front face and a DFC list line still finds it", () => {
  const printings = parsePrintings("1 Tony Stark // The Invincible Iron Man (MSH) 363\n");
  expect(printings).toEqual({ "Tony Stark": "(MSH) 363" });
  const out = toMoxfield(
    { label: "x", kind: "deck", sections: [{ name: "Commander", cards: [{ name: "Tony Stark // The Invincible Iron Man", qty: 1 }] }] },
    printings,
  );
  expect(out.lines).toEqual(["1 Tony Stark // The Invincible Iron Man (MSH) 363"]);
  expect(out.missingPrintings).toEqual([]);
});

test("parsePrintings keeps a foil marker that trails the collector number", () => {
  const printings = parsePrintings("1 Counterspell (SLD) 7010 *F*\n1 Sol Ring (40K) 252\n");
  expect(printings).toEqual({ Counterspell: "(SLD) 7010 *F*", "Sol Ring": "(40K) 252" });
});

test("parsePrintings handles collector numbers with letters and hyphens", () => {
  expect(parsePrintings(["1 Arcane Sanctum (PLST) C18-232", "1 Deserted Beach (PMID) 260p"].join("\n"))).toEqual({
    "Arcane Sanctum": "(PLST) C18-232",
    "Deserted Beach": "(PMID) 260p",
  });
});

test("parsePrintings ignores lines that are not printing references", () => {
  expect(parsePrintings("## Header\n1 Sol Ring\nprose line\n1 Island (THB) 251")).toEqual({ Island: "(THB) 251" });
});

test("toMoxfield treats a list with no Commander section as all-maindeck", () => {
  const out = toMoxfield({ label: "x", kind: "deck", sections: [{ name: "Lands", cards: [{ name: "Plains", qty: 1 }, { name: "Island", qty: 1 }] }] });
  expect(out.lines).toEqual(["1 Island", "1 Plains"]);
});

test("moxfieldFileFor mirrors the list id", () => {
  expect(moxfieldFileFor("main")).toEqual("MOXFIELD.txt");
  expect(moxfieldFileFor("b4")).toEqual("MOXFIELD-B4.txt");
  expect(moxfieldFileFor("kratos-atreus")).toEqual("MOXFIELD-KRATOS-ATREUS.txt");
});
