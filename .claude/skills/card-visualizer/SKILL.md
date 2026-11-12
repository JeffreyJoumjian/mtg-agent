---
name: card-visualizer
description: Card visualizer. Show proposed swaps, bench cards and verdicts as pages of card images in chat. Use when presenting card recommendations, swap proposals or set-review results to the pilot, or when they ask to see cards visually.
---

# Card visualizer

Show card recommendations as pages of card art in the chat. Each swap shows the incoming card with
the card it replaces underneath, then the deciding axis, the reasons and the costs. `bun run
card-viz` builds the pages from a JSON spec, and T3 Code's `html_render` shows them. Card images
stay plain images so T3 Code can open and zoom them on click, and the link icon beside each card
name opens its Scryfall page.

The pages argue for changes and make none. Every swap on them stays the pilot's decision, taken one
at a time (CLAUDE.md, "Deck changes").

## 1. Write the spec

Write `<scratchpad>/<topic>/spec.json`: a list of pages, each a `title` plus `sections`. A section
has an optional `heading` and `note`, and exactly one of three row kinds.

```json
{ "pages": [
  { "title": "Tony Stark (Iron Man v3)", "sections": [
    { "heading": "Swaps for v3", "note": "Both swaps take the draw count from 7 to 9.", "swaps": [
      { "in": "Co-Option Adjutant", "out": "Manifold Key", "decks": ["iron-man v3"],
        "curve": "3.43 → 3.48 · ≤2 23 → 22 · ≤3 40 → 39", "axis": "cards per turn",
        "prior": "What an earlier session decided about the incoming card.",
        "why": ["One full sentence per reason."], "flags": ["One full sentence per cost or warning."],
        "options": [{ "card": "Cloud Key", "note": "Why it's the other cut." }], "optionsLabel": "Other cuts considered" } ] },
    { "heading": "Bench", "pairs": [{ "in": "Deep Space 9", "out": "Darksteel Forge", "deck": "v3", "note": "Optional." }] },
    { "heading": "Traps", "tiles": [{ "card": "Quark, Humble Proprietor", "verdict": "trap", "label": "iron-man" }] } ] } ] }
```

- **`swaps`** is the full case for one change. Every field except `in` is optional, and `verdict`
  defaults to `swap`.
- **`pairs`** is a compact "in for out" card, for bench options and alternatives.
- **`tiles`** is a grid of cards with a verdict pill, for an overview board or a list of traps.
- Verdicts: `swap` and `add` (green), `bench`, `consider` and `hold` (amber), `in` and `answer`
  (blue), `pass` and `trap` (red).

Fill it like this:

- Spell every card as Scryfall does. The script takes art, mana cost and type line from the card
  cache, so the spec holds names and no URLs.
- Write each `why`, `flags`, `prior` and `note` as full sentences under the repo's writing rules.
  `**bold**` is the only markup.
- Give every swap its `curve` as average MV, MV ≤ 2 and MV ≤ 3, before and after (deck-brain §3.1).
- Put the pilot's history with a cut in `flags`: a card they kept, picked or put on trial.
- Show one deck per round, so write one spec per deck: `<scratchpad>/<topic>/<slug>.json`, with
  the swaps first, then the bench pairs, then the deck's traps as tiles. The rounds go in
  commander-name order. Build an overview board of every deck only when the pilot asks for one.

Done when every swap, bench card and trap for this round's deck is in its spec.

## 2. Build the pages

```bash
bun run card-viz <spec.json> --out <scratchpad>/<topic>/pages
```

It prints one line per page with an estimated height and writes `index.json` beside the pages. A
spec page taller than 1850px continues on further pages titled "(continued)", unless what's left
fits in 400px, which stays on the page. A desktop frame grows to fit its page, but `html_render`'s
`height` stops at 2000px, and a phone scrolls inside the frame past that height. A name that
doesn't resolve stops it with a `NOT FOUND` line.
Fix the spelling and run it again.

Then check that every outgoing card is in the list it's named against, with
`bun run deck:show <slug> --list <id>`.

Done when every page printed, nothing came back `NOT FOUND`, and every outgoing card is in its list.

## 3. Show them

The two tools are deferred T3 Code tools. Load them with ToolSearch
`select:mcp__t3-code__html_preview,mcp__t3-code__html_render`.

1. Preview the first swaps page with `html_preview`. Check that the images load and that its
   `contentHeight` is close to the printed estimate.
2. Render this round's pages in order with `html_render`, passing the file's whole HTML, the page
   title as `title` and the printed height as `height`.

The pages sit above the final reply. Keep the reply to what the pages can't hold: this deck's open
decisions, its review file as an absolute-path link, each card name linked to Scryfall (CLAUDE.md),
and the decks still to come. Then wait. The next deck's round starts once the pilot has answered
for this one, and any swaps they took are applied.

Done when this round's pages are rendered and the reply asks for this deck's calls.
