import { test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Markdown } from "./Markdown";

function render(text: string): string {
  const client = new QueryClient();
  return renderToStaticMarkup(
    <QueryClientProvider client={client}>
      <Markdown text={text} />
    </QueryClientProvider>,
  );
}

test("a [[Card Name]] reference renders as a card chip, not a dead link", () => {
  const html = render("Try [[Skullclamp]] over [[Idol of Oblivion]].");
  expect(html).not.toContain('href=""');
  expect(html).toContain("Skullclamp");
  expect(html).toContain("Idol of Oblivion");
  // The chip is a button (HoverCard trigger), never an anchor.
  expect(html).not.toMatch(/<a [^>]*>Skullclamp<\/a>/);
  expect(html).toMatch(/<button[^>]*>[\s\S]*Skullclamp[\s\S]*<\/button>/);
});

test("an ordinary link still renders as a link that opens in a new tab", () => {
  const html = render("See [EDHREC](https://edhrec.com/commanders/chatterfang).");
  expect(html).toContain('href="https://edhrec.com/commanders/chatterfang"');
  expect(html).toContain('target="_blank"');
});
