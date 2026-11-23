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

The Workbench has to be running for records to be stored. The pilot's NAS runs it all the time
([`deploy/nas/README.md`](../../deploy/nas/README.md)); a local `bun run dev` in
`apps/collection-visualizer` works too. Lens sends to `http://localhost:3200` until you enter
another address in Settings and press Save. Brave then asks once whether Lens may reach that
address, because the manifest only grants localhost and lists other addresses as optional. When the
Workbench isn't reachable, the extension keeps everything in its own queue and sends it once the
Workbench is back. The badge shows `REC` while a game or a spectated game is recorded, `TEST`
during a playtest, and `!` on every tab when records are waiting because the Workbench is down.

## What it records

| Source | What | When |
|---|---|---|
| Game socket (`/ws/game`) | Every frame in both directions: the full `game_state`, every move, tap, life change, commander damage, token, die roll, mulligan, elimination. Chat frames are dropped | Online games and spectated games |
| EDHPlay's Event Log store | The Event Log lines as EDHPlay words them, with card names and zones. Chat lines are dropped | Online games, and the only source for solo playtests |
| `/matches/me` | EDHPlay's own result: winner, seats, decks, brackets, final life, mulligans | On load, then every 2 minutes, and right after a room closes |
| `/decks/{id}` | The decklist of every deck in those matches, yours and opponents' | After the match is in history; never while a room is open |
| `/users/me` | Your id and username only (the email is dropped in the page) | On load |
| `/rooms` | Snapshots of the public lobby list | Every 5 minutes while the dashboard is open |

The game token in the socket URL is never stored. Hidden cards stay hidden: EDHPlay only sends a
card's name when the viewer can see it, so Lens knows exactly what you saw and nothing more.

## Where it goes

Everything lands in `edhplay-data/` at the repo root (see `scripts/lib/edhplay-store.ts`). That
folder is git-ignored because it holds other players' usernames, decklists and your notes on them,
and this repo is public. Chat is never recorded: the extension drops it in the page before anything
is sent, and the Workbench drops it again when it stores a batch.
It's also not a cache you can rebuild: EDHPlay's free tier only keeps your last five matches.

So the folder is its own private repo,
[mtg-agent-data](https://github.com/JeffreyJoumjian/mtg-agent-data). The NAS pushes it once a night
(the `mtg-nightly` service in `deploy/nas/`). `bun run games sync` does the same on demand: it
commits what the Workbench wrote, merges any games pushed from elsewhere and pushes. A checkout
without the folder gets it with:

```bash
gh repo clone JeffreyJoumjian/mtg-agent-data edhplay-data
```

Sync never stops on a file both machines touched: the append-only `.jsonl` files keep both sides'
lines, and the JSON files go through `bun run games merge-json` (`mergeStoredJson`), which keeps
the newer copy and merges player notes by username.

Solo playtests are stored in `edhplay-data/playtests/`, apart from real games, and every view
reads them separately. A playtest never counts toward a record, a win rate, the meta or a player.

## The side panel

It follows the browser's light or dark setting: dark uses the Workbench's Broadcast palette, light
uses the Workbench's light theme. Barlow Condensed ships inside the extension (`src/fonts/`, SIL
Open Font License in `OFL.txt`) because extension pages can't load Google Fonts. Commander and card
art comes from the Workbench's `/api/card-image` route, falling back to Scryfall directly and then
to a `?` placeholder when the Workbench is offline.

- **No game open:** your last real game (result, commanders, a link to its report), your games,
  playtests and record, and a button to open the Workbench.
- **Lobby:** who's seated, and your history with each of them from past games: your record at
  their table, the commanders they usually play, the cards they show most, and your note and tags.
- **Game:** for every seat, life with a trend line and the change since that seat's own turn last
  began, commander, hand, permanents, land drops, commander tax and damage, and one line of history.
  The last plays sit below. Combo watch is pinned at the top: combos whose every piece a player has
  shown come first, then combos one card away (your own seat is left out of real games). At most
  four alerts show; the rest are counted.
- **Spectating** and **playtest** have their own layouts. A playtest names the deck matched to each
  seat and shows when its commander came out.
- **Game over:** the result, final standings, your commander's first cast, cards played and cards
  left in hand, and a link to the report once the Workbench has stored the game.
- **Workbench offline:** a pinned banner with the number of records waiting and Retry now, with
  Settings opened below. Settings is always one click away in the footer.

The panel never shows an opponent's decklist. It only knows what past games and the current table
have shown.

## In the Workbench

- **Games** (with a Games / Playtests toggle): record, win rate, results by week and by deck, and
  every game. Each game has a report with a life chart, turn-by-turn plays, the cards each player
  showed with roles, combos, the cards you drew and never cast, decklists fetched after the game,
  the Event Log and raw event counts.
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
