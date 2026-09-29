import { describe, expect, test } from "bun:test";
import { paneState, setPane } from "./panes";

describe("pane state", () => {
  test("a deck with nothing stored shows the chat", () => {
    expect(paneState({}, "chatterfang")).toEqual({ chat: true });
  });

  test("closing the chat for one deck leaves other decks alone", () => {
    const all = setPane({ teysa: { chat: true } }, "chatterfang", "chat", false);

    expect(paneState(all, "chatterfang")).toEqual({ chat: false });
    expect(paneState(all, "teysa")).toEqual({ chat: true });
  });

  test("setting a pane to its current state returns the same object, so nothing re-renders", () => {
    const all = { chatterfang: { chat: false } };

    expect(setPane(all, "chatterfang", "chat", false)).toBe(all);
  });
});
