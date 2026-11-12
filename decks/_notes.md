# Deck notes

Standing facts an agent needs before touching a deck: which lists are live, loop hazards,
pilot-stated constraints, and where the deck's artifacts are. **The grounds and the history live in
each deck's `research/decisions.md`**; this file is the short version. When the two disagree,
`deck.json` and the decision log win and this file gets fixed. Cross-deck pilot rules (banned cards,
loop policy, pods) are in the root `CLAUDE.md`.

## Drain-token family: chatterfang, upgrade-test, caesar

Brief (2026-09-22, replacing Edgar Markov): *"create as many tokens, sac em and drain"*, any
colours, any tribe. Ranked on power, with salt **reported, not minimised**.

- **The commander must make bodies from the command zone.** Teysa Karlov (payoff only) stalled on
  turn 10 in all ten test games; the pilot: *"the commander needs to generate tokens as opposed to
  relying on drawing token generators."* `decks/teysa-karlov/` is kept as the record: not played,
  not deleted (ledger build-038).
- Don't merge, retire or archive any of these decks without being asked.
- Grave Pact and Dictate of Erebos are in Caesar (pilot, 2026-09-24).
- `decks/ghave` was deleted on 2026-11-10 at the pilot's request (*"I don't really play ghave"*).
  It's recoverable from git history; ledger entries that cite it as a source still stand.

### chatterfang (BG), the pre-fork list

- Since 2026-10-15 the pilot's live list is `upgrade-test`, the default target for all Chatterfang
  work (their export matched its `main` card for card). Leave this list unedited unless asked.
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

### upgrade-test, the live Chatterfang list (default target since 2026-10-15)

- Forked 2026-09-25 with the whole proposal package applied, so the pilot could play it instead of
  deciding swap by swap (*"i don't have time to decide"*). Tuned in waves since. It isn't curated.
- Confirmed 2026-10-15: this is the list the pilot plays. Edit it for every Chatterfang request,
  and don't promote its waves into `decks/chatterfang`. That deck stays as the record of the
  pre-fork list, not edited and not deleted.
- Declared chosen-N loops beyond chatterfang's: Chatterfang + Warren Soultrader (wave 10, live from
  turn 4), and since wave 12 (2026-11-10) The Unbeatable Squirrel Girl + Cryptolith Rite or Springleaf
  Parade + Concordant Crossroads (live from turn 4 or 5).
- **Card draw aim (pilot, 2026-11-10): 8 to 10 sources, an aim rather than a floor, and Clue makers never count.** The pilot
  rarely cracks Clues. The count is 7 (Sylvan Library, Skullclamp, Moldervine, Black Market
  Connections, Bloodline Recollector, plus Yawgmoth and Tippy-Toe). Re-count it after every wave.
- Trial since 2026-11-10: Witch's Oven in, Ravenous Squirrel out. Undo is Ravenous back for Oven.
- Trial since 2026-11-10: Bloodline Recollector in, Deadly Dispute out. Undo is Dispute back for
  Recollector, or Dispute back for Gruesome Fate to reach 8.
- Azusa, Lost but Seeking went in over a simulation that gave extra land drops about zero added
  landfall triggers (wave 10). Pilot verdict after play, 2026-10-15: *"azusa really helps with mana
  ramp"*, so she stays. Don't nominate her again without a new play report.
- Trial since 2026-10-15 (wave 11): Priest of Forgotten Gods in for Woe Strider. If the sacrifice
  outlets struggle, Woe Strider returns for Priest. The other half of that trial ended in wave 12:
  Black Market Connections came back for Pest Infestation. Grounds and costs are in
  `upgrade-test/research/decisions.md`.

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

- `main` is abandoned. `combat` and `sacrifice` are the Bracket 3 lists (pilot, 2026-09-28).
- **`b4` is the no-holds-barred Bracket 4 list (founded 2026-11-03)**, built on the drain/combo core
  that EDHREC's cEDH combo and aggro averages share. Every infinite is allowed in it, including the
  automatic lifegain loops (Exquisite Blood or Bloodthirsty Conqueror with Vito, Sanguine Bond,
  Marauding Blight-Priest, Enduring Tenacity or Cliffhaven Vampire) and Oathsworn Vampire with
  Phyrexian Altar or Warren Soultrader. 14 Game Changers. Grounds in `research/decisions.md`
  (2026-11-03) and per card in `research/proposal-b4.json`.
- **Pilot rule for `b4`:** no stax that only stifles opponents (Opposition Agent and Drannith
  Magistrate declined; Esper Sentinel kept because it draws us cards). `b4-pool` holds a "Stax &
  Hate (held)" section for a later staxier lean, and the ranked alternates.
- Ashnod's Altar stays in `b4` (pilot, 2026-11-03, taken over Talisman of Hierarchy after it was first
  left out as a colourless outlet that closes no loop). Don't nominate it as a cut again without new grounds.
- Deflecting Swat, Deadly Rollick, Flawless Maneuver, Akroma's Will and Jeska's Will are not free or
  double-moded while Edgar sits in the command zone (ledger zone-029), so they stay out of `b4`.
- `b4` proposal page (deck-brain §3.1, republish in place): https://claude.ai/artifact/WGrdPuWTcbT8pD6Ryew5fh ("Edgar Bracket 4"). Source in
  `decks/edgar-markov/artifact-b4/`; regenerate with `bun run deck:proposal edgar-markov --proposal
  research/proposal-b4.json --out decks/edgar-markov/artifact-b4`.

## iron-man

- `v3` is the only list. The pilot deleted `main` and `v2` on 2026-11-10, and their last state is in
  `versions/2026-11-10-0435-main-deleted-pilot-s-call.json` and `...-v2-deleted-pilot-s-call.json`.
  `iron-man-reference.pdf` and `pdf.json` still describe the deleted `main`.
- Trial since 2026-10-10: Cosmic Cube in, Propaganda out in `v3`. The pilot will judge it in play;
  the sideboard row swaps Propaganda back.
- Since 2026-11-10 in `v3`: Kediss in (for Thopter Spy Network) and Infantry Shield in (for Into the
  Flood Maw).
- Trial since 2026-11-10 in `v3`: Brotherhood Regalia in for Silent Arbiter, Aggravated Assault in for
  Memnarch. Regalia is now the unblockable source. **Loop:** Assault plus The Reaver Cleaver or Sword of
  Feast and Famine, with Iron Man unblockable, is unbounded combats (chosen-N). Tell the pod. Without
  Arbiter, Propaganda (out for the Cube trial) is the fix if wide boards hit the pilot.
- Surestrike Trident is a loop piece the pilot protects (Unwinding Clock + Brass Squire, three shots
  per turn cycle). Don't nominate it on first strike alone.

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
- Two live lists: `v3` (B3, the X-spell chain) and `b4` (the chain at Bracket 4, which the pilot
  plays in B4 pods). The pilot deleted `main` (B3, the promoted V2 damage-conversion build) on
  2026-11-10 because they no longer play it, and its last state is in
  `versions/2026-11-10-0435-main-deleted-pilot-s-call.json`. `scarlet-witch-reference.pdf` and
  `pdf.json` still describe that `main`. **`b4` is live.** The
  decision log's 2026-09-08 "Bracket 4 retired" means the *old* B4; it was rebuilt as the chain deck
  the same day (part 2) and tuned again 2026-09-16.
- What made `b4` Bracket 4 was its Game Changer count. Since 2026-10-13 the pilot treats it as
  no holds barred for combos. The list already holds several chosen-N loops: Reiterate on Seething
  Song or Explosive Welcome under the cost reducers, Increasing Vengeance started by any copier with
  Storm-Kiln Artist out, and Underworld Breach + Lion's Eye Diamond + Wheel of Fortune. The full list
  is in `research/decisions.md` (2026-10-13, part 2) and ledger loop-017 to loop-019.
- Trial since 2026-10-13: Treasonous Ogre, Soul's Fire, Fiery Confluence, Bonus Round and Runaway
  Steam-Kin in for Inner Fire, Thor, Vandalblast, Gamble and Runechanter's Pike. After play, the
  pilot decides on Hexing Squelcher (for Champion's Helm) and Twinning Staff (for Hex Magic). Every
  cut has a dated row in the `b4` sideboard for undoing it.
- The chain's kill-turn constraint is **red pips, not mana**. With Livaan out, an X-spell costs only
  its coloured pips, and X counts toward mana value on the stack (CR 202.3e). See
  `research/turn-5-chain-2026-09-08.md`.

## ultron (colourless)

- Artifact and copy deck, explicitly **not voltron** (*"purely an artifact and copying deck"*).
- Basalt Monolith is out on purpose: it's infinite with Forsaken Monument.
- Trial since 2026-09-30: Omnath, Locus of the Void in, Null Elemental Blast out. The pilot will
  judge whether the deck struggles without NEB; the sideboard row swaps it back for Omnath.
- Trial since 2026-11-10: Ugin, the Spirit Dragon in for Quicksilver Amulet (the pilot will watch
  for big creatures stuck in hand), and Tezzeret, Cruel Captain in for Thought Vessel. Sideboard rows
  swap each back.

## vision-scarlet-witch: The Vision and Scarlet Witch (mono-red)

- The pilot plays `main` most (2026-11-10, *"probably main"*), so it's the default target.
- Four live lists: `main`, the heavier engine build the pilot reshaped card by card (they accepted a
  slower analyzer win turn for it), `spellslinger`, a parallel spells-first list, `b4` and `b3-tokens`
  (below). The pilot is playing them side by side to see which is most fun and which performs best.
- Constraints for both lists: Hexing Squelcher, Conqueror's Flail and The Ozolith stay; the
  commander keeps access to hexproof, protection, indestructible and lifelink; they want cheap
  artifact protection (Welding Jar is in `spellslinger`, Manhole Cover is the alternative). No Nico
  Minoru, because the deck makes few exile casts.
- First play report: *"struggles with draw sometimes and/or having enough finishers to get through
  without commander damage."*
- `research/sideboard.md` still holds Reiterate and Underworld Breach as "Bracket 4 only". That
  predates the loop policy, so reword it the next time the file is touched.
- **`b4` (Bracket 4 turbo, saved 2026-10-14):** the turn 3 to 4 combo build. Its proposal page is
  https://claude.ai/artifact/UjPtcJfpuZkukvzBpy5QBf (republish to that URL; grounds in
  `research/proposal.json`, data from `bun run deck:proposal vision-scarlet-witch`). Loops it holds:
  the commander with Grinning Ignus, with Reiterate and Seething Song, with Breach, Lion's Eye Diamond
  and Wheel, with Storm-Kiln Artist and Haze of Rage, and Dualcaster Mage with Molten Duplication
  (ledger loop-018 to loop-022). The pilot wants to compare several lists for fun and results.
- **`b3-tokens` (Bracket 3 tokens, built 2026-10-14):** proposal page https://claude.ai/artifact/2wcbwDiAkYKwyDTMMBVdJF.
  Grounds in `research/proposal-b3-tokens.json`. Regenerate with `bun run deck:proposal
  vision-scarlet-witch --proposal research/proposal-b3-tokens.json --out
  decks/vision-scarlet-witch/artifact-b3-tokens` and republish that page's `index.html`.
- `main` holds a three-card loop: Loki, Increasing Vengeance and Storm-Kiln Artist (ledger loop-017).
  The pilot allows late-game combos at Bracket 3.
