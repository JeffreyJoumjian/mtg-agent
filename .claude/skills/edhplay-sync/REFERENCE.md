# EDHPlay reference

What edhplay.com does, read from its JS bundles and tested on a throwaway deck on 2026-11-19. Re-check
here first when a push behaves oddly; the site may have changed.

## Access

- The API is `https://api.edhplay.com/api/v1`. The site sends `Authorization: Bearer <token>` with the
  token from `localStorage.access_token`; a 401 means it expired, and reloading the tab refreshes it.
- Cloudflare answers curl with HTTP 520, so every call goes through the signed-in tab. A
  `/public/v1/decks/{id}` read exists but is behind the same wall.
- `javascript_tool` returns about 1,000 characters and shows a bare promise as `{}`. Snippets start
  with `await`, keep their full answer in `window.__edhOut`, and `bun run edhplay page <n>` reads
  the rest. The tool also blocks output that looks like cookies (`a=b; c=d`), so answers use `|`.

## Endpoints the site uses

| Call | Purpose |
|---|---|
| `GET /decks?folder_id=uncategorized\|<folder uuid>&limit=50` | List decks in one folder. |
| `GET /decks/folders` | Folders with ids and counts (the pilot has Archive and Bracket 4). |
| `GET /decks/{id}` | The deck: `cards[]` with `zone` (`commander`, `main`, `sideboard`, `token`), `quantity`, `name`, `set_code`, `collector_number`, plus `is_valid`, `needs_validation`, `bracket_level`. |
| `POST /decks` `{name, format: "commander", folder_id}` | Create an empty deck (the "New deck" button). |
| `PUT /decks/{id}` `{name, format, folder_id, is_public}` | Rename, move or publish. |
| `POST /decks/{id}/bulk-import` | The Import dialog. Body below. |
| `POST /decks/{id}/validate` | The "Not legal yet" / "Legal" check. Returns `{is_valid, errors[]}`. |
| `POST /decks/{id}/calculate-bracket` | Recompute the bracket (the site does this on its own once a deck is valid). |
| `POST /decks/{id}/clone` `{folder_id}` | The menu's "Clone deck"; the clone is private. |
| `DELETE /decks/{id}` | The menu's "Delete" (an in-page confirm modal, not a browser dialog). |

## Import (bulk-import)

Body: `{replace, lang: "en", cards: [{name, quantity, set_code?, collector_number?}], commander,
partner_commander?, sideboard_cards?}`. `replace: true` is "Import & Replace", `false` is "Import & Add".

- Replace rewrites the main deck and commander, **clears the sideboard** (the push re-sends it) and
  **keeps the token zone**.
- A card sent without `set_code`/`collector_number` gets EDHPlay's default printing even if the deck
  already had another one (5 Forest went from P23 to MDD in the test). The push fills those from the
  deck's current printing first.
- Unknown names come back in `not_found_cards` and are left out; the import still succeeds.
- Collector numbers may hold letters and hyphens (`MH2-219`, `2018NA`, `297p`).
- Double-faced cards resolve from the front face (`Tony Stark`); EDHPlay stores the full name
  (`Tony Stark // The Invincible Iron Man`), so compare by front face.

## The site's own text import

The Import dialog parses `1 Name (SET) 123` lines, the format of our `MOXFIELD*.txt` files. It takes
the first single-copy line as the commander unless a line carries `[Commander{top}]`, reads
`Sideboard`, `Tokens`, `Attractions` and `Stickers` headers, and ignores `Deck`. Its parser has no
rule that skips a `Commander` header line (read from the code, not tested), so leave it out. Export with "Include Printings" on prints the same format:
commander, a blank line, then the rest. Pasting a MOXFIELD file into "Import & Replace" works as a
manual fallback, with the default-printing caveat above for unpinned lines.

## Games, match history and the live socket (verified 2026-11-21)

Read from the site's bundles and from real traffic (a spectated 4-player game, a solo playtest and
the match history). The EDHPlay Lens extension (`apps/edhplay-lens/`) and the parser in
`scripts/lib/edhplay-parse.ts` are built on these facts.

### More endpoints

| Call | What it gives |
|---|---|
| `GET /matches/me` | Finished games: `round_count`, `duration_seconds`, `starting_seat`, `winner_seat` (often null), `viewer_seat`, and per player `username`, `deck_id`, `deck_name`, `deck_is_precon`, `deck_bracket`, `commanders[{name,image_uri}]`, `life`, `poison`, `mulligan_count`, `commander_damage`, `eliminated_at_round`. No room id. `limit` is capped at 50. The free tier answers `visible_limit: 5` and `older_hidden: N`: older matches exist but aren't served. |
| `GET /matches/me/stats` | `403 PREMIUM_REQUIRED` on the free tier. |
| `GET /decks/{id}` for another player's deck | Works for public decks (all seven opponents' decks tested were public). Some match players come back with `deck_id: null`. |
| `GET /decks/{id}/game` | What a playtest seat loads: `{id, name, format, bracket_level, cards[{card_print_id, name, type_line, front_image_uri, mana_cost, zone, quantity}]}`. |
| `GET /rooms?limit=50` | The public lobby list: name, bracket, player and spectator counts, phase. No player names. |
| `GET /users/me` | Includes the email address; Lens keeps only `id` and `username`. |

### The game socket

`wss://api.edhplay.com/ws/game?room_id=<room>&token=<jwt>&pv=<protocol version>`, plus
`&spectator=true` when spectating. JSON text frames. The client sends `ping` and closes the socket
when the first `game_state`'s `protocol_version` differs from its own, so a protocol bump shows up
at once.

- `game_state` is the full table: `phase` (`lobby` before the game), `game_started`,
  `round_count`, `turn_seq`, `current_turn_player_id`, `starting_player_id`, `mulligan_type`, and
  `players[]` with `player_id`, `username`, `life`, `status`, `lobby_seat`, `mulligan_count`,
  `hand_count`, `library_count`, `commanders`, and zone arrays (`battlefield`, `commandZone`,
  `graveyard`, `exile`) of card objects.
- A card object is `{name, type_line, mana_cost, front_image_uri, card_print_id, id, zone,
  owner_id, x, y}`. Hidden cards come without a name (`cards_moved` with `cards: []` and a `count`).
- About 57 incoming event types. The ones the parser reads: `move_card` (`id`, `from_zone`,
  `zone`, `card`), `cards_moved` (`from_zone`, `to_zone`, `cards[]`, `count`, `drawn`),
  `turn_passed` (`new_turn_player_id`, `round_count`, `turn_seq`), `set_player_stats` (`life`,
  `previous_values`, `commander_damage: {attackerId: {commander: n}}`), `card_created` (the card is
  under `token`, with `is_token: true`), `player_eliminated`, `mulligan`, `keep_hand`,
  `chat_message_received`, `dice_rolled`, `library_shuffled`, `player_disconnected`. Others
  (`tap`, `untap_all`, `card_pinged`, `arrows_created`, `attach_card`, `place_on_battlefield`
  which only repositions, `kick_vote_*`, `reaction_received`, `presence_changed`…) are stored raw
  and counted.
- The command zone is `commandZone` in some events and `command` in others.
- Outgoing actions include `set_lobby_deck {deck_id}`, the only place the socket says which deck
  the player picked.

### The Event Log store and solo playtests

The game bundle (`/assets/GameLayout-*.js`) exports a zustand store whose state holds
`eventMessages` and `chatMessages` (capped at the last 500). Entries are `{id, playerId, message,
timestamp, channel, cardName?, cardId?, metadata: {from_zone, to_zone}}`, with messages like
`Played {card} from Hand`, `Turn passed to Player 2`, `Updated Set life total to 39 (-1)`,
`Drew 1 card`. EDHPlay's own lines (`New game started!`, turn passes) have `playerId: "system"`.
The export name is minified, so Lens finds the store by shape.

Solo playtests have no socket at all: a local engine in the playtest bundle turns actions into the
same event objects and applies them in the page, so the Event Log store is the only way to see them.
