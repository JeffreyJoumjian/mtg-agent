# EDHPlay Lens

A browser extension that records every game you play, spectate or playtest on
[edhplay.com](https://edhplay.com) into the MTG Workbench, plus a side panel you keep open while
you play.

## Install

```bash
bun run lens:build
```

Then in Brave (or Chrome) open `brave://extensions`, turn on **Developer mode**, click **Load
unpacked** and pick `apps/edhplay-lens/dist`. Pin the Lens icon; clicking it opens the side panel.
After a rebuild, press the reload arrow on the extension's card and reload any open EDHPlay tab.

The Workbench has to be running (`bun run dev` in `apps/collection-visualizer`) for records to be
stored. When it isn't, the extension keeps everything in its own queue and sends it once the
Workbench is back. The badge shows `REC` while a game is recorded, `TEST` during a playtest, and
`!` when records are waiting.

## What it records

| Source | What | When |
|---|---|---|
| Game socket (`/ws/game`) | Every frame in both directions: the full `game_state`, every move, tap, life change, commander damage, token, chat line, die roll, mulligan, elimination | Online games and spectated games |
| EDHPlay's Event Log store | The log and chat lines as EDHPlay words them, with card names and zones | Online games, and the only source for solo playtests |
| `/matches/me` | EDHPlay's own result: winner, seats, decks, brackets, final life, mulligans | On load, then every 2 minutes, and right after a room closes |
| `/decks/{id}` | The decklist of every deck in those matches, yours and opponents' | After the match is in history; never while a room is open |
| `/users/me` | Your id and username only (the email is dropped in the page) | On load |
| `/rooms` | Snapshots of the public lobby list | Every 5 minutes while the dashboard is open |

The game token in the socket URL is never stored. Hidden cards stay hidden: EDHPlay only sends a
card's name when the viewer can see it, so Lens knows exactly what you saw and nothing more.

## Where it goes

Everything lands in `edhplay-data/` at the repo root (see `scripts/lib/edhplay-store.ts`). That
folder is git-ignored because it holds other players' usernames and chat and this repo is public.
It's also not a cache you can rebuild: EDHPlay's free tier only keeps your last five matches, so
back the folder up somewhere private.

Solo playtests are stored in `edhplay-data/playtests/`, apart from real games, and every view
reads them separately. A playtest never counts toward a record, a win rate, the meta or a player.

## The side panel

- **Lobby:** who's seated, and your history with each of them from past games.
- **Game:** life with a trend line, commander, commander tax and damage, hand and library counts,
  permanents, cards played and land drops for every seat, the last 15 plays, and combo watch:
  Commander Spellbook combos among the cards each player has revealed, plus combos one card away.
- **After the game:** the final state, and a pointer to the full report in the Workbench.

The panel never shows an opponent's decklist. It only knows what past games and the current table
have shown.

## In the Workbench

- **Games** (with a Games / Playtests toggle): record, win rate, results by week and by deck, and
  every game. Each game has a report with a life chart, turn-by-turn plays, the cards each player
  showed with roles, combos, the cards you drew and never cast, decklists fetched after the game,
  chat, the Event Log and raw event counts.
- **Meta:** commanders you face, colours, brackets, precon share, Game Changers, interaction per
  opponent, the cards you see most (filterable by role), combos assembled, game length and
  elimination rounds.
- **Players:** everyone you've met, with your record against them, their commanders and decks, the
  cards they play most, their saved decklists and your own notes and tags.
- **Deck → Games** (with the same toggle): per EDHPlay-linked list, card performance (seen, drawn,
  played, first round, still on the battlefield at the end, win rate when played and when not),
  never-played cards, lands and life by round, commander cast round and matchups.

`bun run games` prints the same numbers in the terminal.

## Limits worth knowing

- EDHPlay has no rules engine, so "played" means a card moved from hand or the command zone to the
  battlefield or the stack. Cards put onto the battlefield from anywhere else count as "put".
- The extension reads EDHPlay's own code from the outside. When EDHPlay changes its protocol or
  bundles, recording can stop until the parser is updated; the raw frames already stored are kept
  either way. The protocol notes are in `.claude/skills/edhplay-sync/REFERENCE.md`.
- In a playtest, seats are named Player 1, 2… in the order they first act, and each seat's deck is
  the loaded deck holding the most of the cards that seat played.
- A game the extension joined after round 1 is flagged and left out of per-card stats.
