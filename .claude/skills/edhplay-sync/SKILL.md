---
name: edhplay-sync
description: EDHPlay sync. Push a deck list from deck.json to the pilot's EDHPlay deck (edhplay.com/decks) after every applied list edit, link, create or delete an EDHPlay deck, or export one with printings. Use after any `deck:edit` apply on a list with an `edhplay` id, or when the pilot mentions EDHPlay.
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

- **Push after every applied edit.** Once the pilot OKs a change and `deck:edit` applies it (its
  output ends with an `edhplay:` line), push that list in the same turn. If the Chrome extension
  isn't connected, end the turn naming the EDHPlay decks that are now behind.
- **Printings:** a pin in `deck.json` or `decks/_printings.txt` wins. A card with no pin keeps the
  printing it has on EDHPlay, and the push hands back `B|…` lines that you back-fill as pins, so
  the exports stay complete.
- **Archive folder decks sync like the rest.** Folders, deck names and tokens on EDHPlay stay as
  the pilot set them.
- Creating or deleting an EDHPlay deck happens only when the pilot asks for it.

## Push a list

1. **Tab.** Load the Chrome tools, call `tabs_context_mcp`, open a new tab on
   https://edhplay.com/decks and check it shows "My decks", which means the pilot is signed in.
2. **Install** once per tab, and again after any navigation: run the output of
   `bun run edhplay install` with `javascript_tool`. It answers `INSTALLED …`.
3. **Push:** run the output of `bun run edhplay push <slug> --list <id>`. Run pushes one at a time,
   because they share the paging buffer. The first line of the answer is one of:
   - `UNCHANGED …`: EDHPlay already matches.
   - `PUSHED …: N change(s), valid, bracket B, verify ok`, followed by the changes (`+`, `-`,
     `qty`, `art`, `commander:`).
   - `NOT FOUND`, `INVALID`, `verify FAILED`, `STILL DIFFERENT`: stop and report it to the pilot
     with the lines that follow. A not-found name usually means the local spelling or a set code
     EDHPlay doesn't know.
   - `AUTH`: reload the tab, install again, rerun. `NOT INSTALLED`: step 2.
   - `[more: bun run edhplay page N]`: run that command's output for the next page.
4. **Back-fill** every `B|Name|SET|123` line: `bun run edhplay backfill <slug>` with the lines on
   stdin. It pins them in `deck.json` and regenerates the MOXFIELD files. When the same deck has
   another linked list, push that one after the back-fill, so it picks up the new pins.
5. **Done** when every pushed list answered `UNCHANGED` or `PUSHED … verify ok` and every `B|` line
   is back-filled. Close the tab you opened. Report one line per list: the EDHPlay deck name and
   link, and the changes, calling out every `art` line, since that changed a printing on EDHPlay.

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
