---
name: edhplay-sync
description: EDHPlay sync. Compare a deck list in deck.json with the pilot's EDHPlay deck (edhplay.com/decks) and settle every difference with them before pushing, after every applied list edit; also link, create, delete or export an EDHPlay deck. Use after any `deck:edit` apply on a list with an `edhplay` id, or when the pilot mentions EDHPlay.
---

# EDHPlay sync

The pilot plays on EDHPlay, signed in on Brave. Each `deck` list in a `deck.json` that they play
carries `"edhplay": "<deck id>"`. A list without one isn't played: say so when it comes up, and
leave it alone. `bun run edhplay status` prints the map.

EDHPlay sits behind Cloudflare, so `scripts/edhplay.ts` never calls it. It prints JavaScript that
you run in the pilot's signed-in tab with Claude in Chrome (`javascript_tool`), and the snippet
calls the site's own API with the site's own token. [REFERENCE.md](REFERENCE.md) holds what the
site and API do, verified 2026-11-19.

## Policy (pilot, 2026-11-19)

- **EDHPlay is usually the truth.** It's the list the pilot plays, and they edit it there too. The
  local list is ahead of it only for edits made here that haven't been pushed yet.
- **Any difference stops the push.** `push` only compares and writes nothing unless you pass
  `--confirm`. The one difference that goes through without a question is the edit the pilot just
  approved in this conversation: when every `DIFFERENT` line is exactly that edit, confirm it. Any
  other line, an `art` line included, goes to the pilot with context, and you settle it together.
- **Compare after every applied edit.** `deck:edit` ends with an `edhplay:` line for a linked list;
  run the comparison in the same turn. If the Chrome extension isn't connected, end the turn naming
  the EDHPlay decks that are now behind.
- **Printings:** a card with no pin keeps the printing it has on EDHPlay, and its printing comes
  back as `B|…` lines that you back-fill as pins, so the exports stay complete.
- **Archive folder decks sync like the rest.** Folders, deck names and tokens on EDHPlay stay as the
  pilot set them. Creating or deleting an EDHPlay deck happens only when the pilot asks.

## Compare and push a list

1. **Tab.** Load the Chrome tools, call `tabs_context_mcp`, open a new tab on
   https://edhplay.com/decks and check it shows "My decks", which means the pilot is signed in.
2. **Install** once per tab, and again after any navigation: run the output of
   `bun run edhplay install` with `javascript_tool`. It answers `INSTALLED …`.
3. **Compare:** run the output of `bun run edhplay push <slug> --list <id>`, one list at a time,
   because the answers share the paging buffer. The first line is one of:
   - `UNCHANGED …`: EDHPlay matches. Go to step 6.
   - `DIFFERENT …: N difference(s), nothing written`, then one line per difference:
     `local only|…`, `EDHPlay only|…`, `count|card|local N|EDHPlay N`, `art|card|local …|EDHPlay …`,
     `commander|local …|EDHPlay …`. Go to step 4.
   - `AUTH`: reload the tab, install again, rerun. `NOT INSTALLED`: step 2.
   - `[more: bun run edhplay page N]`: run that command's output for the next page.
4. **Settle the differences.** Unless every line is the edit the pilot just approved, stop and show
   them all. Pipe the lines into `bun run edhplay explain <slug> --list <id>`: for each card it
   prints the local lists that hold it and every logged change that touched it. A card this list
   never logged usually means the pilot changed it on EDHPlay. Give the pilot each line with that
   context and wait for their call, card by card:
   - **EDHPlay wins:** change the local list with `deck:edit` (`--why` saying it matches EDHPlay),
     or for an `art` line `deck:meta --card "…" --printing "(SET) 123"`, and log it in the deck's
     `research/decisions.md`.
   - **Local wins:** that line is pushed in step 5.
   Repeat step 3 until every remaining line is one the pilot chose to push, or it says `UNCHANGED`.
5. **Push:** run the output of `bun run edhplay push <slug> --list <id> --confirm`. It must answer
   `PUSHED …: N change(s), valid, bracket B, verify ok`. Report `NOT FOUND`, `INVALID`,
   `verify FAILED` or `STILL DIFFERENT` to the pilot with the lines that follow. A not-found name
   usually means a local spelling or set code EDHPlay doesn't know.
6. **Back-fill** every `B|Name|SET|123` line: `bun run edhplay backfill <slug>` with the lines on
   stdin. It pins them in `deck.json` and regenerates the MOXFIELD files. When the same deck has
   another linked list, compare that one after the back-fill, so it picks up the new pins.
7. **Done** when every list answered `UNCHANGED` or `PUSHED … verify ok` and every `B|` line is
   back-filled. Close the tab you opened. Report one line per list: the EDHPlay deck name and link,
   and what changed on each side.

## Other jobs

- **Link** a list to an existing EDHPlay deck: `bun run edhplay link <slug> --list <id> --deck
  <uuid>` (`--unlink` removes it). The uuid is the last part of the deck's URL.
- **Create** an EDHPlay deck for a list: run the output of `bun run edhplay create <slug> --list
  <id> --name "<name>" [--folder <uuid>]`, then link the id its first line prints and back-fill.
- **Export** an EDHPlay deck with printings (to compare, or to save before a delete): run the
  output of `bun run edhplay export <uuid>` and page through it.
- **Delete** an EDHPlay deck: export it first into `decks/_archive/<slug>-edhplay-export.txt`, then
  delete it with `await window.__edh.api('/decks/<uuid>', { method: 'DELETE' })` (204, then a GET
  returns 404). Unlink any local list that pointed at it.
