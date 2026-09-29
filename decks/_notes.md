# Deck notes

Standing facts an agent needs before touching a deck: which lists are live, loop hazards,
pilot-stated constraints, and where the deck's artifacts are. **The grounds and the history live in
each deck's `research/decisions.md`**; this file is the short version. When the two disagree,
`deck.json` and the decision log win and this file gets fixed. Cross-deck pilot rules (banned cards,
loop policy, pods) are in the root `CLAUDE.md`.

## Drain-token family: chatterfang, upgrade-test, ghave, caesar

Brief (2026-09-22, replacing Edgar Markov): *"create as many tokens, sac em and drain"*, any
colours, any tribe. Ranked on power, with salt **reported, not minimised**.

- **The commander must make bodies from the command zone.** Teysa Karlov (payoff only) stalled on
  turn 10 in all ten test games; the pilot: *"the commander needs to generate tokens as opposed to
  relying on drawing token generators."* `decks/teysa-karlov/` is kept as the record: not played,
  not deleted (ledger build-038).
- Don't merge, retire or archive any of these decks without being asked.
- Grave Pact and Dictate of Erebos are in both Ghave and Caesar (pilot, 2026-09-24).

### chatterfang (BG), the deck of record

- Declared chosen-N loops: Camellia, the Seedmiser + Tippy-Toe or Peregrin Took + Ashnod's Altar
  (Food loop); Chatterfang + Pitiless Plunderer (two cards, live from turn 4).
- Its one Game Changer is Gaea's Cradle. Unanswered since 2026-09-23: the pilot mentioned a green
  Game Changer "that lets you put many lands on the board". Ask which card; don't guess.
- Upgrade proposal page (deck-brain §3.1, one page republished in place):
  https://claude.ai/artifact/Qgp3cNcdmKWoE8fPZMxvQB ("Acorn Economy Upgrade"). Held adds and
  close-cut shortlists sit at the top.
- Token-math solver, a separate tool page rather than the proposal record:
  https://claude.ai/artifact/Gti7ru3nZXYFh59YJXCmyD ("Acorn Cascade"). Source in
  `decks/chatterfang/calculator/`.

### upgrade-test, the playtest fork of chatterfang

- Forked 2026-09-25 with the whole proposal package applied, so the pilot could play it instead of
  deciding swap by swap (*"i don't have time to decide"*). Tuned in waves since. It isn't curated.
- After play, promote the waves that earned it into `decks/chatterfang` with `deck:edit`, mark
  them `applied` in `chatterfang/research/proposal.json`, and drop the rest.

### ghave (WBG)

- Token doublers are the white and green ones (black has none). Chatterfang is in the 99.
- Declared chosen-N loop: Ghave + a token doubler + Ashnod's Altar or Phyrexian Altar (or Pitiless
  Plunderer).

### caesar (RWB)

- Pilot's asks: Infantry Shield, token doublers, and a small hexproof/indestructible protection
  package so Caesar survives to keep making tokens.

## cap-living-legend: Captain America, Living Legend (UW)

Five 100-card lists, each a distinct plan. Don't move cards between them without asking.

| List | Plan |
|---|---|
| `main` | Free-crew Vehicles/Spacecraft plus opponent-turn untappers. |
| `counters` | Lifelink voltron: Equipment and Auras on Cap, Light of Promise turns each lifelink hit into counters. Never give Cap pro-white or pro-blue (it strips his own Auras). |
| `engine` | Tap → Tokens → Drain, fully non-combat: every creature taps twice (crew or station, then its own {T}), and the closers need no attacker. Cap fights Throne of the God-Pharaoh because he undoes the first tap. Blink is protection only; the pilot rejected both dropping to Bracket 2 and a blink rebuild. |
| `mill` | Advisor-toolbox mill ("tap four Advisors: mill twelve"; Cap refunds each Advisor's first tap). Pilot after play: "feels very slow". |
| `petitioners` | **The pilot's favourite** (*"I love playing the petitioners deck"*). Persistent Petitioners mill that wins by milling itself (Thassa's Oracle, Lab Man, Mesmeric Orb). Jace or Lab Man must land before the Orb. |

Known loop hazards, found when the lists were loop-audited. Check each one under the loop policy
and flag it before adding:

- `engine`: Marvin or any second untapper (the Ioreth circuit goes infinite), Vedalken Engineer
  (infinite draw with Halo Fountain + Ioreth), Intruder Alarm, Deadeye Navigator (loops with Relic
  of Legends).
- `mill`: Ioreth is the only untapper. Kelpie Guide, Marvin, Aphetto Alchemist and Basalt Monolith
  all add a second.
- `petitioners`: with Mesmeric Orb in, Basalt Monolith or a second untap-target creature.

## captain-america: Captain America, First Avenger (Jeskai)

- Equipment voltron around his Throw ability. It's the red Captain America deck, so damage doublers
  belong here if the pilot ever wants them.

## edgar-markov

- `main` is abandoned. Work only on `combat` and `sacrifice` (pilot, 2026-09-28).

## iron-man

- The newest list is `v3`.

## lord-of-pain (Rakdos)

- Brief: *"the most toxic commander deck imaginable"*. Every opponent action bleeds them, and the
  gifts (extra cards, extra mana) are really a drain.
- `main` is Bracket 4 (Exquisite Blood + Sanguine Bond, plus its Game Changers). `b3` is `main`
  minus a documented swap set, so apply every other change to both lists.
- Amplifiers must be opponent-restricted (Solphim, Torbran, Torture Pit, Twinflame, Bloodletter,
  Wound Reflection). A symmetric one like Fiery Emancipation triples the deck's own symmetric gift
  engines against the pilot.
- No "players can't gain life" cards. The commander already covers opponents, and the deck survives
  on its own lifegain.

## scarlet-witch: The Scarlet Witch (mono-red)

- `research/strategy.md` and `card-pool.md` come from an abandoned Izzet "Chaotic Avenger" brief,
  not this commander.
- Three live lists: `main` (B3, the promoted V2 damage-conversion build), `v3` (B3, the X-spell
  chain) and `b4` (the chain at Bracket 4, which the pilot plays in B4 pods). **`b4` is live.** The
  decision log's 2026-09-08 "Bracket 4 retired" means the *old* B4; it was rebuilt as the chain deck
  the same day (part 2) and tuned again 2026-09-16.
- What makes `b4` Bracket 4 is its Game Changer count, not combos. Reiterate + Mana Geyser is a
  chosen-N loop the pilot allows.
- The chain's kill-turn constraint is **red pips, not mana**. With Livaan out, an X-spell costs only
  its coloured pips, and X counts toward mana value on the stack (CR 202.3e). See
  `research/turn-5-chain-2026-09-08.md`.

## ultron (colourless)

- Artifact and copy deck, explicitly **not voltron** (*"purely an artifact and copying deck"*).
- Basalt Monolith is out on purpose: it's infinite with Forsaken Monument.

## vision-scarlet-witch: The Vision and Scarlet Witch (mono-red)

- Two live lists: `main`, the heavier engine build the pilot reshaped card by card (they accepted a
  slower analyzer win turn for it), and `spellslinger`, a parallel spells-first list.
- Constraints for both lists: Hexing Squelcher, Conqueror's Flail and The Ozolith stay; the
  commander keeps access to hexproof, protection, indestructible and lifelink; they want cheap
  artifact protection (Welding Jar is in `spellslinger`, Manhole Cover is the alternative). No Nico
  Minoru, because the deck makes few exile casts.
- First play report: *"struggles with draw sometimes and/or having enough finishers to get through
  without commander damage."*
- `research/sideboard.md` still holds Reiterate and Underworld Breach as "Bracket 4 only". That
  predates the loop policy, so reword it the next time the file is touched.
