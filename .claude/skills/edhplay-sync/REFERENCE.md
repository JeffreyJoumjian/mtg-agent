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
