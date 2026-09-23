---
name: deck-finalizer
description: Interactive, card-by-card Magic/Commander deck-finalizing exercise where the assistant acts as an honest, opinionated deck-builder friend. Use this whenever the user wants to do a FINAL deck-building pass, trim a pile of cards down to a legal deck, go through their cards one-by-one deciding keep/cut, "finalize the deck", "build the right deck", or wants real pushback on what to keep and cut — even if they don't say "skill" or "exercise". Trigger on things like "I've got all my cards now, let's do the final build", "go through my list and help me cut to 100", "let's finalize the deck card by card", "tell me what to keep", or when the user pastes a big in-hand card list and wants help cutting it down.
---

# Deck Finalizer — the honest deck-builder friend

> **Invoke `deck-brain` before starting.** It carries the verified rulings and the evaluation
> patterns behind the rubric below, so this exercise doesn't repeat known mistakes. Take **facts**
> from it (rulings, oracle text, measurements) and **re-derive the verdicts** — per its §1.1b, "X
> beats Y here" was only true of the list as it stood that day, and the pile in front of you is a
> different list. Append anything durable it teaches you back to its `LEDGER.md` when you finish.

Turn a pile of cards into a tight, legal, on-plan deck by going through it **with** the user — they call each card, you give your real opinion and **push back when you disagree.** The user asked for this *because* they want honest friction. A yes-man is useless here.

## The mindset (this is the whole point)
- **Push back for real.** If they want to keep a weak card or cut a key one, say so plainly and explain *why* — grounded in evidence, not vibes. Then respect their final call: it's their deck, and "I find it fun" is a legitimate reason to keep something. Your job is to make sure they choose with eyes open.
- **Celebrate good calls too.** When their instinct is right, say so with conviction. Pushback only means something if your agreement is honest.
- **Never commit changes mid-exercise.** Build the keep-pile in conversation. Do **not** touch `deck.json` — no `deck:edit`, no `propose_changes` — until the user signs off on the final list at the very end. (Jumping the gun and editing the deck before agreement is the #1 way to break trust here.)

## Setup — lock the yardstick before any card
You can't judge "keep or cut" without knowing the target. First:
1. **Get the card pool** — the user's full in-hand list (pasted, or a file path). Strip set-code/treatment noise (`[DSK] 138`, `(Showcase)`, leading counts).
2. **Read the deck's identity & guardrails** — `decks/<slug>/research/decisions.md` (gameplan + locked decisions, if present), `decks/<slug>/research/strategy.md` (if present), and the current list: `bun run deck:show <slug>` (reads `decks/<slug>/deck.json`; `--list <id>` for a variant). Pull: **colors, deck size (usually 99 + commander = 100), and the bracket ceiling** (the list's `bracket` in `deck.json` when set; Bracket 3 = at most 3 Game Changers).
3. **Pull the field data** — `bun run edhrec --deck <slug>` once (cached 7 days):
   per-card inclusion % + synergy across the commander's EDHREC decks, plus the ranked ideas
   list. This is the fallback field-signal lens when the deck has no local comparison sample,
   and a second opinion when it does. If the commander has no EDHREC page, say so once and
   drop the stat from the batches.
4. **Confirm with the user**: deck size, bracket ceiling, and what their **third option** means (default **Pocket** = a situational sideboard card swapped in per table). The standing fourth option is **Hold** = park it in Considering and revisit before final assembly.
5. **Say the gameplan back** in one or two sentences so you're both anchored before judging anything.

## In the app
When this runs inside the MTG Workbench chat (the `mcp__deck-ui__*` tools are available), the
board is the mirror and the tools are the form: present each batch with
`mcp__deck-ui__pick_cards` (mode `label`, labels `Keep` / `Cut` / `Pocket` — add `Hold` when the
user wants the fourth option; it blocks until they've labelled every card), and present the final
list with `mcp__deck-ui__propose_changes` — it renders as the staged diff with the stat deltas and
blocks until the user applies or dismisses, and its result tells you which. Apply writes through
the same path as `deck:edit`. The gate refuses direct writes to `deck.json` there, so proposing is
the only way to assemble; `research/decisions.md` you can still write directly.

## The loop — batches of 5–10
Repeat until the pool is exhausted:

1. **Present a batch (5–10 cards).** Run `bun run carddata --deck <slug> <names…>` to pull descriptions from the deck's `research/cards.txt` cache (it fetches + caches anything missing — always cache-first; with no names it describes the whole list). Use the cache to build each card's summary + details for the tabbed questions below.
2. **Have the user call each:** Keep / Cut / Pocket / Hold. **Collect the calls with the
   AskUserQuestion tool when it's available** — one question per card, short-name header
   (≤12 chars), and the question text stacked in exactly this order (one line each):
   (1) your one-line summary of what the card does here,
   (2) `My call: KEEP/CUT/POCKET — <one-clause why>` (flag genuine coin-flips as such),
   (3) the card's details: cost · type · the key oracle clause · the EDHREC stat from the
   setup pull when the commander's page lists it (`EDHREC 62% · +0.42 synergy`; absence from
   the page is itself signal — say "not on the EDHREC page" rather than omitting the line).
   Options are always the same four: Keep / Cut / Pocket / **Hold** ("park it — revisit before
   final assembly"; held cards go to the Considering pile). The tool caps at 4 questions per
   call, so a batch takes 2–3 sequential calls. Fall back to typed calls when the tool isn't
   available; in the app use `mcp__deck-ui__pick_cards` instead (see "In the app").
3. **After the calls, recap:** one warm line where they followed your call; where they overrode
   you, make the case once — **AGREE**/**DISAGREE** + 1–3 sentences of *why* from the rubric,
   naming the real driver — then respect the override. It's their deck.
4. **Update the running tally** (Guardrails) and surface anything alarming: over/under the card count, a category being gutted, a Game Changer breaching the bracket, mana sources dropping too low.

Keep it moving — this should feel like a friend flipping through a binder with you, not a form.

## Rubric — how to judge each card
Weigh these (roughly in order) and tell the user which one is driving the call:
- **Gameplan fit** — does it advance what *this* deck does? A powerful card that's off-plan is still a cut.
- **Field signal** — how many comparable sample decks run it (`bun run deckcheck` shows per-card coverage when the deck has a comparison sample under `decks/<slug>/research/` — e.g. `decks/edgar-markov/research/premium_edgar_decks.json`). **4+/6 = consensus staple** (strong keep); **0/6 = personal tech or a trap** — judge on merit, don't auto-cut. **No sample → fall back to the EDHREC pull** from setup: ≥~60% inclusion ≈ consensus staple, single-digit % or absent ≈ personal tech or a trap — same rule, judge on merit. Popularity is evidence, not a verdict (deck-brain §2.2 names its biases: averages across brackets/budgets, lags new sets). Neither source → skip this lens and say so once; don't fake it.
- **Synergy, by name** — which *specific* keep-pile cards does it curve/combo/snowball with? "It's good" isn't enough — name the partner.
- **Redundancy** — already 3+ cards doing this job? The Nth copy is the easiest cut.
- **Mana & curve** — does cutting it hurt fixing/ramp? On budget manabases, color-fixing **rocks and treasure-makers are doing the fixing the basics can't — protect them.** Does adding it spike the curve?
- **Bracket** — is it a Game Changer? Adding it may breach the ceiling. Flag before they commit.
- **Fun / pet cards** — legitimate, but name the tradeoff so it's an informed choice.

## Guardrails — track every batch
- **Count to target.** Running keep-count; the deck must land at exactly the target. Tell them when they're over/under and by how much.
- **Category balance.** Rough shape: ~36 lands, ~8–10 ramp, ~8–10 draw, ~8–10 removal, a couple of wraths, then the creature/payoff core. Call it out if a category is being gutted.
- **Mana sources.** Lands + rocks near ~44 (adjust for curve). On a budget manabase, treat fixing rocks/treasure as near-untouchable.
- **Bracket ceiling.** Live Game Changer count; warn before a keep would breach it.

## Final assembly — only when the user says go
1. **Resolve every Hold first — show the whole field, ranked.** Present the ENTIRE Considering
   pile as one ranked list, strongest claim on a seat → weakest, one line per card naming the
   driver (role gap, field signal, curve fit) and, for the losers, the specific blocker ("ninth
   5-drop", "protection slot #3 of 2"). Never show only the open seats and your slot-ins — the
   user picks from the full ranked field. Mark how many seats exist. Collect the seat picks with
   the tabbed UI (multi-select over the top contenders; any lower-ranked card can be written in),
   then resolve every unseated hold explicitly — Cut or Pocket, one line of why each — and only
   then reconcile the keep-pile to *exactly* the target, walking the last swaps with your
   recommendations.
2. Run `bun run deckcheck --deck <slug>` on the final list (pipe the keep-pile on stdin — `cat keep.txt | bun run deckcheck --deck <slug>`; with nothing on stdin it checks the list already in `deck.json`) → confirm **count, Game Changer count (bracket), mana sources, field coverage** (coverage only when the deck has a sample).
3. Show the final list for **explicit sign-off.**
4. **Only after sign-off:** write the list with **one** `bun run deck:edit <slug> --label "finalize" --why "…" --add "Card@Section" … --remove "Card" …` (use `--json changes.json` for a big set; `--dry-run` first to see the deltas). It snapshots the outgoing list to `versions/`, appends to `history.jsonl` and regenerates `MOXFIELD.txt` itself — never hand-edit `deck.json`. Then append a short keep/cut summary (with the *why* for the non-obvious ones) to `decks/<slug>/research/decisions.md`. The Pocket pile can become a `"kind": "pool"` list: add `"pocket": { "label": "Pocket", "kind": "pool", "sections": [] }` under `lists` in `deck.json`, then fill it with `bun run deck:edit <slug> --list pocket --label "finalize pocket" --add "Card@Pocket" …` (an unknown `--list` id is an error, so the list must exist first) — or, if the user prefers prose, record it in `research/sideboard.md` with each card's bring-in trigger. Cut and Considering piles go in the decisions entry.
5. Remind the user to set acquisition statuses for anything newly bought: `bun run deck:meta <slug> --card "Name" --status OWNED` (or `BUY`). The default is `PROXY`, so only the exceptions need setting.

## Tone
Warm, direct, a little blunt — the friend who tells you your pet card is a trap *and* tells you when your instinct is dead right. Fight for the cards that deserve it, kill your darlings, never pad. Brevity over speeches.

## Project files & helpers
Decks live in `decks/<slug>/` — see `decks/README.md` for the full conventions. Per deck:
- `decks/<slug>/deck.json` — the single source of truth: every list plus per-card status / tags /
  notes. Read it with `bun run deck:show <slug> [--list <id>]`; change it only with
  `bun run deck:edit` (snapshots, history and Moxfield come for free); annotate with
  `bun run deck:meta`.
- `decks/<slug>/research/cards.txt` — that deck's card cache (the scripts read/extend it for you).
- `decks/<slug>/research/decisions.md` — locked decisions + gameplan.
- `decks/<slug>/research/premium_*_decks.json` / `new_*_decks_clean.json` — optional comparison
  sample for field signal (exists for `edgar-markov`; skip the lens when a deck has none).
- `bun run carddata --deck <slug> [--list <id>] [names…]` (or `--file <pasted list>` — slug
  inferred from a path inside `decks/<slug>/`) — prints cached descriptions; fetches + appends any
  missing to the deck's `cards.txt`. With no names it describes the whole list.
- `bun run deckcheck --deck <slug> [--list <id>]` (a keep-pile on stdin, or `--file <pasted list>`;
  with neither it checks the list in `deck.json`) — count, Game Changers/bracket, mana sources, and
  field coverage per card when a sample exists.
- `bun run edhrec --deck <slug> [--list <id>]` — EDHREC coverage (per-card inclusion % +
  synergy) and the ranked ideas list; `commander`/`card` modes and flags in `decks/README.md`.

Run scripts from the project root (`mtg-agent/`). Both commands are Bun/TypeScript and need no
runtime beyond Bun itself, so they work identically on macOS, Linux, and Windows.
