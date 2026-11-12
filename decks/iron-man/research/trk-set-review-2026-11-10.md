# TRK + TRC set review: Iron Man (Tony Stark), 2026-11-10

**Sets:** Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards), both releasing
2026-11-13. Scryfall already lists every card in both sets as Commander-legal, so no card here
carries an unreleased-card caveat.

**Method:** I followed deck-brain `SKILL.md`, sections 1 and 2. I read each set card's text from the pool files
(`data/trk-candidates-iron-man.json` and `data/trc-candidates-iron-man.json`) and each deck card's
text from the bundle's `v3` oracle dump, never from memory. Each card is costed in this deck's mana.
The reducers read "artifact spells" and the commander's combat trigger reads "an artifact card from
your hand", so a non-artifact card pays the double tax (ledger eval-017). The 2026-08-20 standing rule
applies: a new card should be an artifact, MV 2 or less, or an instant, or else be exceptional. Each
card was checked against `v3`'s own board, and each candidate's name and rules text were grepped in
`decisions.md` and `sideboard.md` (ledger tool-017). Rules come from `rules/sections/`: CR 113.1a and
603.2d (granted triggers and doublers, ledger equip-018), 500.8, 505.1a, 702.26 (phasing), 707.8,
712.8a and 712.14.

**Lists:** `v3` is the deck's only list and the target. The pilot deleted `main` and `v2` today, so
older entries and reviews that name them describe lists that no longer exist. Today's changes in `v3`
are part of the board every verdict was scored against: the [Brotherhood Regalia](https://scryfall.com/search?q=%21%22Brotherhood+Regalia%22) trial (for
[Silent Arbiter](https://scryfall.com/search?q=%21%22Silent+Arbiter%22)), the [Aggravated Assault](https://scryfall.com/search?q=%21%22Aggravated+Assault%22) trial (for [Memnarch, the Warden](https://scryfall.com/search?q=%21%22Memnarch%2C+the+Warden%22)), [Kediss, Emberclaw Familiar](https://scryfall.com/search?q=%21%22Kediss%2C+Emberclaw+Familiar%22)
(for [Thopter Spy Network](https://scryfall.com/search?q=%21%22Thopter+Spy+Network%22)) and [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22) (for [Into the Flood Maw](https://scryfall.com/search?q=%21%22Into+the+Flood+Maw%22)). The
[Cosmic Cube](https://scryfall.com/search?q=%21%22Cosmic+Cube%22) trial (for [Propaganda](https://scryfall.com/search?q=%21%22Propaganda%22)) has run since 2026-10-10.

**Field lens:** EDHREC has no TRK or TRC data before release, so I skipped the section 2.2 lens
rather than guess.

**Bracket:** neither set has a Game Changer. `v3` stays at 3 of 3 ([Ancient Tomb](https://scryfall.com/search?q=%21%22Ancient+Tomb%22), [The One Ring](https://scryfall.com/search?q=%21%22The+One+Ring%22),
[Fierce Guardianship](https://scryfall.com/search?q=%21%22Fierce+Guardianship%22)) before and after every proposal here.

## Pool

263 cards are Commander-legal and fit Izzet identity: 119 from TRK and 144 from TRC, with no card in
both. 194 are new and 69 are reprints (flagged `REPRINT` in the table and read the same way as new
cards, ledger tool-007). 13 are already in `v3`: [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22), [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), [Talisman of Creativity](https://scryfall.com/search?q=%21%22Talisman+of+Creativity%22),
[Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) and nine lands.

## Result

| List | MAIN | SIDE | IN (already run) | NO |
|---|---|---|---|---|
| v3 (target) | **2** | 4 | 13 | 244 |

- **MAIN 1:** [Co-Option Adjutant](https://scryfall.com/search?q=%21%22Co-Option+Adjutant%22) in, [Manifold Key](https://scryfall.com/search?q=%21%22Manifold+Key%22) out. Iron Man draws a card every time he
  connects, and Regalia makes him connect every combat.
- **MAIN 2:** [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) in, [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) out. It's a 2-mana artifact that draws
  a card every turn, pre-flip included. The pilot has declined [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) as a cut four times, so this
  one comes with alternatives.
- **SIDE:** [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) displaces [Darksteel Forge](https://scryfall.com/search?q=%21%22Darksteel+Forge%22).
- **SIDE:** [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) displaces [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22). It's the other candidate for MAIN 2's slot.
- **SIDE:** [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) displaces [Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22).
- **SIDE:** [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) displaces [Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22). That's the existing sideboard row, kept.
- **Draw count:** the Card Draw / Engines role is 7 today, one under the pilot's 8 to 10 aim. Either
  MAIN takes it to 8, and both take it to 9. Neither card is a Clue maker.
- **Traps:** [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22), [Kobayashi Maru Scenario](https://scryfall.com/search?q=%21%22Kobayashi+Maru+Scenario%22), the blink cards, [Gray and Adira, Forever Joined](https://scryfall.com/search?q=%21%22Gray+and+Adira%2C+Forever+Joined%22)
  and [Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22).

---

## Set mechanics as they matter to this deck

- **[Silent Arbiter](https://scryfall.com/search?q=%21%22Silent+Arbiter%22) is gone.** Since this morning, artifact creatures other than Iron Man can attack
  again, so attack and combat-damage triggers on the rest of the board are live. The FRA review
  rejected several cards because Arbiter blanked them. That ground no longer holds, and it's why
  [Co-Option Adjutant](https://scryfall.com/search?q=%21%22Co-Option+Adjutant%22)'s grant pays off beyond Iron Man.
- **Free deploys can't be countered by spells.** Ledger equip-030: opponents can respond to the combat
  trigger while it's on the stack, but they can't see the artifact or counter it with a spell counter.
  That makes a free-deployed artifact (Adjutant, Seven of Nine, [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22), [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22))
  much harder to stop than a hard-cast non-artifact creature like [Spock, Voice of Reason](https://scryfall.com/search?q=%21%22Spock%2C+Voice+of+Reason%22).
- **Station and Spacecraft (25 cards in the pool).** Station taps another creature you control at
  sorcery speed for charge counters equal to its power. `v3`'s creatures already spend their taps
  ([Steel Overseer](https://scryfall.com/search?q=%21%22Steel+Overseer%22), [Iron Spider, Stark Upgrade](https://scryfall.com/search?q=%21%22Iron+Spider%2C+Stark+Upgrade%22), [Brass Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22), [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22),
  [Marvin, Murderous Mimic](https://scryfall.com/search?q=%21%22Marvin%2C+Murderous+Mimic%22), [Iron Lad, Diverging Destiny](https://scryfall.com/search?q=%21%22Iron+Lad%2C+Diverging+Destiny%22)), and Iron Man attacks. Spacecraft are artifacts, so
  they deploy free and count for [Urza, Lord High Artificer](https://scryfall.com/search?q=%21%22Urza%2C+Lord+High+Artificer%22), [Adaptive Omnitool](https://scryfall.com/search?q=%21%22Adaptive+Omnitool%22) and
  [Fateful Discovery](https://scryfall.com/search?q=%21%22Fateful+Discovery%22), but most never become creatures here. One real line: with
  [Captain America's Shield](https://scryfall.com/search?q=%21%22Captain+America's+Shield%22)'s vigilance, Iron Man is untapped after combat and can station for his
  full power in the second main phase.
- **Charge counters.** [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22) is `v3`'s only charge-counter card. [Lt. Cmdr. Geordi La Forge](https://scryfall.com/search?q=%21%22Lt.+Cmdr.+Geordi+La+Forge%22),
  [Optimization Annex](https://scryfall.com/search?q=%21%22Optimization+Annex%22), [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) and [Seven of Nine, Tertiary Adjunct](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Tertiary+Adjunct%22) all add or multiply charge counters, so
  they only matter through [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22).
- **Differently named lands (7 strange new worlds cards, plus [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22)).**
  `v3`'s 36 land slots hold 30 different names: 28 nonbasic names plus Island and Mountain. The count
  tracks lands in play closely, so "five or more differently named lands" arrives with about the
  fifth land.
- **Seek out (7 cards).** "Whenever you draw your second card each turn." `v3` draws two on most of
  its own turns once an engine is out, and [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) lets [The One Ring](https://scryfall.com/search?q=%21%22The+One+Ring%22), [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22) and
  [Mind's Eye](https://scryfall.com/search?q=%21%22Mind's+Eye%22) draw on opponents' turns. [Data, Exploring Humanity](https://scryfall.com/search?q=%21%22Data%2C+Exploring+Humanity%22) is the only artifact payoff,
  and the rest are non-artifact creatures.
- **Blink and beam me up.** A double-faced card put onto the battlefield from another zone enters
  front face up (CR 712.14). Blinking Iron Man ([Test of Priorities](https://scryfall.com/search?q=%21%22Test+of+Priorities%22), [Temporal Tribulation](https://scryfall.com/search?q=%21%22Temporal+Tribulation%22), [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22))
  or returning him to hand for beam me up unflips him and drops his Equipment.
- **Copies of Iron Man.** A copy of a double-faced permanent uses the face that's up (CR 707.8). So
  a copy of the flipped commander has his combat trigger, which [Dominion Saboteur](https://scryfall.com/search?q=%21%22Dominion+Saboteur%22), [Colossal Clone Master](https://scryfall.com/search?q=%21%22Colossal+Clone+Master%22),
  [Reg Barclay, Fidgety Fantasist](https://scryfall.com/search?q=%21%22Reg+Barclay%2C+Fidgety+Fantasist%22) and [Shore Leave Planet](https://scryfall.com/search?q=%21%22Shore+Leave+Planet%22) can make. A copy made during the beginning of combat
  step misses that combat's trigger, which is the Gray and Adira trap.
- **Borg (TRC).** The Borg cards are the artifact-creature theme, and MAIN 1 comes from it.
- **Klingon and Warrior typal, battlefront, melee, goad.** [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22)'s Warriors are tokens
  that enter attacking. They aren't spells or cards, so Warrior spell payoffs and library-dig
  payoffs miss them.
- **Face a dilemma (3 cards).** It needs modal spells, and `v3` runs none.

---

## Classification table: all 263

Verdicts: **MAIN** means displace a named card now, **SIDE** means bench with a named displacement,
**IN** means already in `v3`, and **NO** means pass. MV is the printed mana value.

### Blue (90)

| # | Name | MV | New? | v3 | Reason |
|---|---|---|---|---|---|
| 1 | Brainstorm | 1 | REPRINT | NO | It puts two cards back, and v3 has no payoff for that. |
| 2 | Federation Probe | 1 | NEW | NO | It's a 1/1 flying artifact with a one-time pump or surveil. |
| 3 | Marooned | 1 | NEW | NO | It locks down an artifact or creature only if you pay {3} more, at sorcery speed, as an Aura. |
| 4 | Open Communications | 1 | NEW | NO | It's a sorcery cantrip. |
| 5 | Ponder | 1 | REPRINT | NO | It's a cantrip. |
| 6 | Pongify | 1 | REPRINT | NO | It's a {U} instant kill that leaves a 3/3. Into the Flood Maw's sideboard row is the 1-mana answer slot. |
| 7 | Vulcan Mind-Meld | 1 | NEW | NO | It gives an opponent your top card, so it's symmetric. |
| 8 | Cloistered Telepath | 2 | NEW | NO | It's a flash looter. Looting is selection, and v3's diagnosed problem is engine draw. |
| 9 | Cryogenic Stasis | 2 | NEW | NO | It taps and stuns plus draws a card, which is tempo, not removal. |
| 10 | Data, New Life | 2 | NEW | NO | It grows on draws, but only Iron Spider's two-counter draw uses the counters, and that shrinks Data again. |
| 11 | Energize | 2 | NEW | NO | It bounces one creature at sorcery speed, and its beam me up cost bounces one of yours. |
| 12 | Gwyndala, the Progeny | 2 | NEW | NO | Cute line below (Equipment tokens become copies of Genji Glove). It's a non-artifact 1/1 whose payoff needs two Equipment tokens on Iron Man. |
| 13 | Highly Illogical | 2 | NEW | NO | Kicked, it's a Counterspell for {2}{U}{U}. Counterspell and Mana Drain do that for {U}{U}. |
| 14 | Jett Reno, Problem Solver | 2 | NEW | NO | She only draws at power 4 or more, and v3 has no way to grow her. |
| 15 | La Forge, Perceptive Engineer | 2 | NEW | NO | It's a dork for artifact spells. It isn't an artifact, and v3's artifacts mostly arrive free. |
| 16 | Negate | 2 | REPRINT | NO | Fierce Guardianship already counters noncreature spells for free. |
| 17 | Optimization Annex | 2 | NEW | NO | It adds one charge counter, and Insight Engine is v3's only charge-counter card. |
| 18 | Reality Shift | 2 | REPRINT | NO | Chaos Warp replaced it on 2026-08-07 because it hands over a 2/2, and Chaos Warp also hits noncreature permanents. |
| 19 | Romulan Bird-of-Prey | 2 | NEW | NO | Trap. It reads as a 2-mana 4/4 flier, but it needs eight charge counters from noncreature casts, and the combat deploy isn't a cast. |
| 20 | Seven of Nine, Unassimilated | 2 | NEW | MAIN | It replaces Cloud Key. This {1}{U} 0/4 artifact creature draws a card in your first main phase every turn, with no discard once five land names are out. See Proposed swaps. |
| 21 | Starfleet Spanner Jockey | 2 | NEW | NO | It's a 3/3 defender that can attack only after a noncreature cast. |
| 22 | Test of Priorities | 2 | NEW | NO | Trap for its protection mode. A blinked Iron Man returns front face up, unflipped and stripped of his Equipment (CR 712.14). |
| 23 | Anthropological Mission | 3 | NEW | NO | It loots on each noncreature cast until it has three counters, then draws. The combat deploy isn't a cast, so it only fires on hard-cast turns, and it's a non-artifact enchantment. |
| 24 | Borg Scout Sphere | 3 | NEW | NO | It's a card-neutral cantrip artifact that gives fliers only at 6 charge. |
| 25 | Chief Miles O'Brien | 3 | NEW | NO | It doubles counters on your second draw each turn. It isn't an artifact, and doubling The One Ring's burden counters hurts. |
| 26 | Consider the Prime Directive | 3 | NEW | NO | It's a soft counter or a stun plus a card. The hard counters in v3 do the first job better. |
| 27 | Disallow | 3 | REPRINT | NO | It also counters abilities, for one more mana than Counterspell. v3 has no recurring ability threat it loses to. |
| 28 | Exocomp | 3 | NEW | NO | It's a vanilla 3/1 flying artifact. |
| 29 | Fleet Captain Christopher Pike | 3 | NEW | NO | Cute line below (one more Surestrike Trident shot). It's a non-artifact 0/6. |
| 30 | Frantic Search | 3 | REPRINT | NO | It was passed on 2026-09-02 because it nets minus one card. That still holds. |
| 31 | Geordi La Forge, Innovator | 3 | NEW | NO | He's unblockable only with a Spacecraft, and he draws only for himself. |
| 32 | Kobayashi Maru Scenario | 3 | NEW | NO | Trap. By the fourth upkeep the only mode left is Abandon Ship, and you lose unless the enchantment is gone. |
| 33 | Kolinahr Priest | 3 | NEW | NO | It's a vanilla flash 3/2. |
| 34 | Lieutenant Commander Data | 3 | NEW | NO | Near-miss. It turns three counters into a card for {1}, and Reconnaissance Partition does that job with no mana. |
| 35 | Lieutenant Nyota Uhura | 3 | NEW | NO | It casts an opponent's instant or sorcery for {4}, which is unreliable. |
| 36 | Lt. Cmdr. Geordi La Forge | 3 | NEW | NO | It doubles charge counters, but Insight Engine is v3's only charge-counter card and Geordi isn't an artifact. |
| 37 | Melkotian Adjudicator | 3 | NEW | NO | It grows when you face a dilemma, and v3 runs no modal spells. |
| 38 | Nyota Uhura, Communications | 3 | NEW | NO | It draws only when an opponent casts a spell at the chosen mana value, which is unreliable. |
| 39 | On the Shoulders of Giants | 3 | NEW | NO | Historic creatures gain flying, and Iron Man already flies. |
| 40 | Refute | 3 | REPRINT | NO | It's a Counterspell with a loot at one more mana. |
| 41 | Scotty, Miracle Worker | 3 | NEW | NO | It gives graveyard instants and sorceries beam me up. v3 runs nine and wins with permanents. |
| 42 | Seven of Nine, Tertiary Adjunct | 3 | NEW | NO | Cute line below (charge counters on Insight Engine). A tap loot is selection, not draw. |
| 43 | Spock, Voice of Reason | 3 | NEW | NO | Near-miss (see below). It's the biggest raw draw in the pool, but a non-artifact 3-drop, the profile the pilot cut Jhoira for. |
| 44 | Subcommander T'Pol | 3 | NEW | NO | It's an ability counter or a stun on a flash 3/1. The counter suite already covers spells, and it's a non-artifact 3-drop. |
| 45 | Suurok-Class Science Vessel | 3 | NEW | NO | It's a card-neutral cantrip artifact, and stationing it costs creature taps v3 spends elsewhere. |
| 46 | Suus Mahna Practitioner | 3 | NEW | NO | It's a tapper whose cost drops with land names, which doesn't fit the plan. |
| 47 | Temporal Tribulation | 3 | NEW | NO | Trap. A blinked Iron Man returns front face up and drops his Equipment (CR 712.14). |
| 48 | Thirst for Knowledge | 3 | REPRINT | NO | It draws three and discards an artifact once. v3's draw role is repeatable engines. |
| 49 | Those Old Scientists | 3 | NEW | NO | Two of its three chapters are selection, and it's a non-artifact Saga. |
| 50 | Transwarp Hub | 3 | NEW | NO | Near-miss. It mills five and keeps up to two artifacts, and Master Transmuter rebuys it for {U}. Without Transmuter it's a one-shot. |
| 51 | Tuvok, Chief Tactical Officer | 3 | NEW | NO | It redirects attackers, and Regalia already gets Iron Man in. |
| 52 | Zefram Cochrane, Warp Pioneer | 3 | NEW | NO | Near-miss. It casts an artifact from the top once a turn, a 48% hit in v3. It's a non-artifact 3-drop, and Iron Lad already shows the top card. |
| 53 | Ambulatory Reactor | 4 | NEW | NO | It lets artifact creatures tap for artifact-only mana, but v3's creatures already spend their taps on Overseer, Spider, Squire and Transmuter jobs. |
| 54 | Cetacean Ops | 4 | NEW | NO | It's a 3/3 that grows on noncreature casts, an off-plan body that pays the double tax. |
| 55 | Co-Option Adjutant | 4 | NEW | MAIN | It replaces Manifold Key. It gives Iron Man "whenever this creature deals combat damage to a player, draw a card", which Wizard's Staff, Roaming Throne and double strike multiply. See Proposed swaps. |
| 56 | Cryptic Command | 4 | REPRINT | NO | It's a counter plus a mode for {1}{U}{U}{U}. Counterspell and Mana Drain counter for less. |
| 57 | Data, Professor of Humanities | 4 | NEW | NO | It makes two 1/1 Faeries on your second draw. They're chump blockers that aren't artifacts. |
| 58 | Emergency Holographic Crew | 4 | NEW | NO | It's a 3/4 artifact creature with surveil 2, and its other mode needs Spacecraft in the graveyard. |
| 59 | Ensign Pavel Chekov | 4 | NEW | NO | It lets you play opponents' exiled lands. That's ramp on a non-artifact 4-drop. |
| 60 | Enterprise NX-01 | 4 | NEW | NO | It stuns one creature on entry, then needs 6 charge counters from your own creature taps to become a creature. |
| 61 | Guidance Failure | 4 | NEW | NO | The owner picks top or bottom, so it's tempo, not removal. |
| 62 | La Forge, Thoughtful as Ever | 4 | NEW | NO | It makes Faeries per permanent you put a counter on, which doesn't fit the plan. |
| 63 | Make It So | 4 | NEW | NO | It's a one-shot sorcery draw-two. |
| 64 | Mr. Spock, Science Officer | 4 | NEW | NO | Near-miss (see below). It doubles every draw, but it's a non-artifact {2}{U}{U} creature, which fails the 2026-08-20 standing rule. |
| 65 | Pelia, Immortal Innovator | 4 | NEW | NO | It's a non-artifact 4-drop with one entry bounce. |
| 66 | Sam Kirk, Xenoanthropologist | 4 | NEW | NO | It makes Clues, and Clue makers don't count as draw for this pilot. |
| 67 | Scotty, Chief Engineer | 4 | NEW | NO | It taps an artifact to make a creature unblockable, and Regalia does that with no tap. |
| 68 | Wesley Crusher, Starfleet Cadet | 4 | NEW | NO | It's a flash modal 2/2 at {2}{U}{U} that isn't an artifact, which fails the standing rule. |
| 69 | Data, Exploring Humanity | 5 | NEW | NO | Near-miss (see below). It discovers 4 on your second draw each turn. It's a real artifact engine, third in line behind the two MAINs. |
| 70 | Dominion Saboteur | 5 | NEW | NO | Near-miss (see below). A non-legendary copy of Iron Man doubles the combat deploy, but it's a non-artifact 5-drop that empties a hand the deck already struggles to refill. |
| 71 | Giant Space Amoeba | 5 | NEW | NO | It copies itself on attack, which doesn't fit the plan. |
| 72 | Gift of Perfection | 5 | NEW | NO | It steals a random creature from each opponent's library, as a non-artifact sorcery. |
| 73 | H.M.S. Bounty, Unlikely Timeship | 5 | NEW | NO | It wants Whales, and v3 runs none. |
| 74 | Hoshi Sato, Exolinguist | 5 | NEW | NO | It digs one card per creature type you control, and v3's few creatures share few types. |
| 75 | Interstellar Effigy | 5 | NEW | NO | Near-miss. It bounces an opponent's creature on entry, and Master Transmuter with Unwinding Clock can rebuy it. Bounce is tempo, and Regalia already gets Iron Man past blockers. |
| 76 | Kes, Evolving Telepath | 5 | NEW | NO | She draws 1, then 2, then 3 at your end step. She's a non-artifact 5-drop that takes three turns to pay off. |
| 77 | Rules of Acquisition | 5 | NEW | NO | The steal mode gives the opponent three cards, and the give-away mode is a one-shot draw-three at five mana. |
| 78 | Spock, Logical Choice | 5 | NEW | NO | It's a tap-to-draw on a non-artifact 5-drop, which fails the standing rule. |
| 79 | T'Pol, Vulcan Representative | 5 | NEW | NO | It double-stuns one creature, which is tempo. |
| 80 | Thoughtcast | 5 | REPRINT | NO | It's a one-shot draw-two, dropped from the V2 adds on 2026-08-20. |
| 81 | Uhura, Xenolinguist | 5 | NEW | NO | It pays {1} per non-Human creature entering, and v3 makes few creatures. |
| 82 | Võx, Child of the Collective | 5 | NEW | NO | It discounts one artifact creature a turn, and the free deploy already beats that. |
| 83 | Colossal Clone Master | 6 | NEW | NO | It's a creature-only Dominion Saboteur at six mana. |
| 84 | Deep Space Scan | 6 | NEW | NO | It draws about six once, for six mana at sorcery speed. v3's draw role is repeatable engines. |
| 85 | Echo of Eons | 6 | REPRINT | NO | It's a symmetric wheel. |
| 86 | Humpback Whales | 6 | NEW | NO | It's a 5/6 ward body with landcycling, which doesn't fit the plan. |
| 87 | The Caretaker | 6 | NEW | NO | Its end-step free cast needs you to face a dilemma, and v3 runs no modal spells. |
| 88 | Trelane, Squire of Gothos | 6 | NEW | NO | It's an unblockable 4/5, a second threat that doesn't carry Equipment. |
| 89 | V'Ger, the Intruder | 7 | NEW | NO | It draws one on entry and on each attack. Memnarch did the big-artifact draw job better and left today. |
| 90 | Cloak and Phaser | 9 | NEW | NO | It makes two 2/2s and loots for about {3}{U} once five land names are out. It's a one-shot sorcery. |

### Red (75)

| # | Name | MV | New? | v3 | Reason |
|---|---|---|---|---|---|
| 91 | Defense Force Aggressor | 1 | NEW | NO | It's a vanilla 2/1. |
| 92 | Gin'tak Charge | 1 | NEW | NO | It's a sorcery Shock. |
| 93 | Khaaaaaaaaaaaannn! | 1 | NEW | NO | It's one-shot instant removal at double rate. v3's removal also attacks (Ultima Weapon, Argentum Armor). |
| 94 | Planetary Bombardment | 1 | NEW | NO | It deals 2 or 4 to a creature at sorcery speed. |
| 95 | Starfleet Security | 1 | NEW | NO | It makes a Clue when it dies on your turn, and Clues don't count. |
| 96 | Abrade | 2 | REPRINT | NO | It deals 3 to a creature or kills an artifact. It's fine, but no slot is short on it. |
| 97 | Beckett Mariner, Impetuous Ensign | 2 | NEW | NO | It pings each opponent every third tap, which doesn't fit the plan. |
| 98 | Boarding Action | 2 | NEW | NO | It makes one 2/1 haste token. |
| 99 | Brazen Bluff | 2 | NEW | NO | The opponent picks between losing their spell and giving you a free noncreature spell, so you never choose. The free deploy already gives free artifacts. |
| 100 | Captain's Tutelage | 2 | NEW | NO | It's a +2/+0 Aura, and the Equipment do this better. |
| 101 | D-7 Battle Cruiser | 2 | NEW | NO | It needs 3 charge counters from creature taps to make a 2/1 each turn. |
| 102 | Ferocious Colonist | 2 | NEW | NO | It's a melee double striker, which doesn't fit the plan. |
| 103 | Lwaxana Troi, Charming Guest | 2 | NEW | NO | Near-miss (see below). She's a third doubler for Iron Man's triggers, but the deploy is capped by artifacts in hand. |
| 104 | Munitions Enthusiast | 2 | NEW | NO | It's a 3/2 trampler. |
| 105 | Perils of the Past | 2 | NEW | NO | It's a pump or an artifact kill at instant speed, and no slot is short on either. |
| 106 | Planetary Patrol | 2 | NEW | NO | It's a landfall 2/2. |
| 107 | Qo'noS Quartermaster | 2 | NEW | NO | It's a menace 2/2 that adds mana on attack. |
| 108 | Reckless Impulse | 2 | REPRINT | NO | It's a one-shot impulse two. |
| 109 | Run Amok | 2 | REPRINT | NO | It's a one-shot +3/+3 and trample, and Bulk Up is v3's finisher trick. |
| 110 | Savvy Profiteer | 2 | NEW | NO | It's a non-artifact dork that makes Treasures for {3}. |
| 111 | Tasha Yar, Out of Time | 2 | NEW | NO | It impulses one card when it dies. |
| 112 | Test of Identity | 2 | NEW | NO | Its modes want a Klingon or a discard, and v3 has no Klingons. |
| 113 | The Naked Time | 2 | NEW | NO | It ramps, then sacrifices a land. |
| 114 | Thrill of Possibility | 2 | REPRINT | NO | It discards one and draws two once. |
| 115 | Transporter Malfunction | 2 | NEW | NO | It's a sorcery Lightning Strike. |
| 116 | Warship Flight Crew | 2 | NEW | NO | It's a vanilla 2/2. |
| 117 | Academy Instructor | 3 | NEW | NO | It makes Officers on noncreature casts, and the combat deploy isn't a cast. |
| 118 | Cantankerous Captain | 3 | NEW | NO | It gives +1/+0 and sometimes menace each combat, and Regalia makes menace moot. |
| 119 | Captain James T. Kirk | 3 | NEW | NO | It gives small modal value on a 2/2. |
| 120 | Captain Michael Burnham | 3 | NEW | NO | It pings on landfall, which doesn't fit the plan. |
| 121 | Combat Celebrant | 3 | REPRINT | NO | It gives an extra combat every other turn on a non-artifact 4/1 that must attack. Aggravated Assault and Genji Glove do this without a body. |
| 122 | Direct Hit | 3 | NEW | NO | It deals 5 to a creature at sorcery speed. |
| 123 | Dominion Infiltration | 3 | NEW | NO | It makes temporary copies of opponents' creatures, as a {R}{R}{R} sorcery. |
| 124 | Encounter the Unknown | 3 | NEW | NO | It's a one-shot impulse two or a symmetric 2-damage sweep. |
| 125 | Gagh Slinger | 3 | NEW | NO | It's a Warrior payoff, and Infantry Shield's Warriors are tokens, not spells. |
| 126 | Kruge, Genesis Seeker | 3 | NEW | NO | It pumps attacking Klingons. |
| 127 | Plasma Cascade | 3 | NEW | NO | It deals 3 and rummages once. |
| 128 | Professional Face-Breaker | 3 | REPRINT | NO | It left the 100 on 2026-08-21. It's a non-artifact 3-drop, and The Reaver Cleaver covers its Treasures. |
| 129 | Quark, Humble Proprietor | 3 | NEW | NO | Trap. "You can't sacrifice Treasure tokens" switches off The Reaver Cleaver's half of the Aggravated Assault loop and Treasure Vault's Treasures. |
| 130 | Red Alert! | 3 | NEW | NO | It pumps the team, and v3 attacks with one creature. |
| 131 | Ro Laren, Double Agent | 3 | NEW | NO | Its seek out pings each opponent for 2, and it isn't an artifact. |
| 132 | Sarcophagus, Ship of the Dead | 3 | NEW | NO | It's an anthem for other creatures with a 10-charge station. |
| 133 | Shared Animosity | 3 | REPRINT | NO | It pumps attackers that share a type, and v3 attacks with one creature. |
| 134 | Tal Shiar Analyst | 3 | NEW | NO | It's a pinger, which doesn't fit the plan. |
| 135 | Targ Wrangler | 3 | NEW | NO | It's a 5/3 menace that sacrifices a permanent after it attacks. |
| 136 | The Beacon of Kahless | 3 | NEW | NO | It's a 3-mana rock, and v3's ramp role is full. |
| 137 | The Wrath of Khan | 3 | NEW | NO | It's removal, a rummage and an edict over three turns. It's a good Saga, but non-artifact and slow. |
| 138 | Worf, Intelligence Contractor | 3 | NEW | NO | It threatens small creatures, which doesn't fit the plan. |
| 139 | Chain Reaction | 4 | REPRINT | NO | It's a symmetric sweeper, and Chandra's Ignition is the one-sided version. |
| 140 | Dahar Master | 4 | NEW | NO | It sacrifices a permanent for 2 damage, which doesn't fit the plan. |
| 141 | Disrupt Decorum | 4 | REPRINT | NO | Its sideboard row still names Overpowering Attack, which isn't in v3. Propaganda's row is the live answer to wide boards, and it lasts. |
| 142 | Erica Ortegas, Plucky Pilot | 4 | NEW | NO | It makes temporary land drops, which doesn't fit the plan. |
| 143 | Exploratory Mission | 4 | NEW | NO | It's a landfall impulse engine, and v3 isn't a landfall deck. |
| 144 | Galvanizing Tenor | 4 | NEW | NO | It goads on attack, as a non-artifact 4-drop. |
| 145 | Kang, Suspicious Captain | 4 | NEW | NO | It goads one creature and itself. |
| 146 | Kirk, Enterprising Captain | 4 | NEW | NO | It impulses on attack, a second attacker that isn't an artifact. |
| 147 | Koloth, Tribble Hunter | 4 | NEW | NO | It gives every player goaded Tribbles each turn, so it's symmetric. |
| 148 | La'An Noonien-Singh, Security | 4 | NEW | NO | It stops one blocker per attack, and Regalia makes Iron Man unblockable. |
| 149 | Mek'leth Berserker | 4 | NEW | NO | It's a vanilla menace 4/3. |
| 150 | Q, Stacking the Deck | 4 | NEW | NO | It copies a random nonland card, which is unreliable. |
| 151 | Rom and Leeta, Unlikely Pair | 4 | NEW | NO | Its seek out makes two tapped Treasures, on a non-artifact 4-drop. |
| 152 | Will Riker, First in the Field | 4 | NEW | NO | It puts temporary lands in each combat, which doesn't fit the plan. |
| 153 | Genesis Effect | 5 | NEW | NO | It deals 6 to a creature for five mana. Chaos Warp and Ultima Weapon cover creatures. |
| 154 | Gnarling Targ | 5 | NEW | NO | It pumps Klingons and Warriors. |
| 155 | Khan, Despot by Design | 5 | NEW | NO | It pings each opponent and their creatures for 1 on entry, as an off-plan 5-drop. |
| 156 | Klingon Strike Force | 5 | NEW | NO | It's a 5/5 trample haste body, which doesn't fit the plan. |
| 157 | Silicate Surveyor | 5 | NEW | NO | It's a 4/4 reach body with one impulse. |
| 158 | World at War | 5 | REPRINT | NO | It gives two extra combats over two turns through rebound. It's a sorcery Aggravated Assault, which v3 now runs. |
| 159 | Glory to the Empire! | 6 | NEW | NO | It makes Warriors and gives the team melee, which doesn't fit the plan. |
| 160 | Grilka, Widowed Warrior | 6 | NEW | NO | It's a threaten effect on a 6-drop. |
| 161 | Horta | 6 | NEW | NO | It's a 7/6 trampler with landcycling, which doesn't fit the plan. |
| 162 | Own the Day | 6 | NEW | NO | It's a one-shot extra combat for about five mana, and Aggravated Assault repeats it. |
| 163 | Ravenous Cosmozoan | 6 | NEW | NO | It's a hasty flier discounted by the graveyard, which doesn't fit the plan. |
| 164 | Pah-Wraith | 7 | NEW | NO | It pumps the team on attack, and v3 attacks with one big creature. |
| 165 | Infinite Diversity | 9 | NEW | NO | It copies a graveyard instant per creature type, and v3 has few of either. |

### Blue-red (9)

| # | Name | MV | New? | v3 | Reason |
|---|---|---|---|---|---|
| 166 | Spock, Always Your Friend | 2 | NEW | NO | It digs four for a noncreature card on entry, a cantrip on a body. |
| 167 | Talisman of Creativity | 2 | REPRINT | IN | Already in v3. |
| 168 | B'Elanna Torres, Scrapper | 3 | NEW | NO | It surveils and draws on an artifact for {2}, an Iron Lad that isn't an artifact. |
| 169 | Fevered Visions | 3 | REPRINT | NO | It's symmetric draw. |
| 170 | Year of Hell | 3 | NEW | NO | It's symmetric draw and damage. |
| 171 | Cmdr. Troi, Outgoing Empath | 4 | NEW | NO | It gives an opponent a free spell, which is political and non-artifact. |
| 172 | Gray and Adira, Forever Joined | 4 | NEW | NO | Trap. Its copy of Iron Man is made at beginning of combat, after his deploy trigger has already triggered, so the copy's own trigger misses that combat. |
| 173 | Reg Barclay, Fidgety Fantasist | 4 | NEW | NO | Its seek out copies a creature with haste, but a copy of Iron Man only deploys if the second draw comes before combat. It's a non-artifact 4-drop. |
| 174 | Tom Paris, Risk-Taker | 6 | NEW | NO | Its seek out grants team keywords, and Iron Man already flies and has haste. |

### Colorless (59)

| # | Name | MV | New? | v3 | Reason |
|---|---|---|---|---|---|
| 175 | Astral Cornucopia | 0 | REPRINT | NO | It's an X-cost rock, and ramp is full. |
| 176 | Engineered Explosives | 0 | REPRINT | NO | Two colours cap it at 2 counters, which hits your own Sol Ring, Signet and cheap Equipment. |
| 177 | Everflowing Chalice | 0 | REPRINT | NO | It's a flexible rock, and ramp is full. |
| 178 | Jefferies Tube | 1 | NEW | NO | Cute line below (charge counters on Insight Engine). Its unblockable mode is Manifold Key's, and Regalia covers that. |
| 179 | Skullclamp | 1 | REPRINT | NO | Near-miss (see below). It draws two per {1} off Infantry Shield's Warriors, but it's blank without the Shield on Iron Man. |
| 180 | Sol Ring | 1 | REPRINT | IN | Already in v3. |
| 181 | Tricorder | 1 | NEW | NO | It gives +1/+1 and a surveil on attack, below every Equipment in v3. |
| 182 | Wayfarer's Bauble | 1 | REPRINT | NO | It's land ramp, which doesn't fit the plan. |
| 183 | Arcane Signet | 2 | REPRINT | IN | Already in v3. |
| 184 | Cybernetic Specialist | 2 | NEW | NO | It's a 2/1 artifact that surveils. |
| 185 | Disruptor Pistol | 2 | NEW | NO | It deals 5 for {4} and a sacrifice, which is slow removal. |
| 186 | Howling Mine | 2 | REPRINT | NO | Trap. With Mind's Eye it nets you four cards a round for {3}, but it hands each opponent a card every turn. |
| 187 | Isolinear Processor | 2 | NEW | NO | It's an artifact-only rock with a paid loot, and ramp is full. |
| 188 | Lightning Greaves | 2 | REPRINT | NO | It was passed for shroud (sideboard.md), and that still holds. |
| 189 | Mind Stone | 2 | REPRINT | NO | It was cut in V2 for Adaptive Omnitool, and ramp is full. |
| 190 | Replicator | 2 | NEW | NO | It copies tokens for {2}. Clock makes it repeatable, but it competes with Mind's Eye and Insight Engine for the same mana. |
| 191 | Swiftfoot Boots | 2 | REPRINT | NO | Iron Man has haste, and Padeem and Champion's Helm give hexproof. |
| 192 | Tea, Earl Grey, Hot | 2 | NEW | NO | It's a cantrip artifact. |
| 193 | Thought Vessel | 2 | REPRINT | NO | The Ten Rings already sets your hand size to ten. |
| 194 | Type-2 Phaser | 2 | NEW | NO | It stuns a blocker on entry, and Regalia and flying already get Iron Man through. |
| 195 | U.S.S. Defiant, Mirror Migrant | 2 | NEW | SIDE | It's benched for Champion's Helm. This flash {2} artifact phases out Iron Man with all his Equipment. See Bench. |
| 196 | Warp Core | 2 | NEW | NO | It fetches a basic and charges Spacecraft, which doesn't fit the plan. |
| 197 | Class-F Shuttlecraft | 3 | NEW | NO | It's a 3-mana rock, and ramp is full. |
| 198 | Combadge | 3 | NEW | NO | Its unblockable needs a second creature carrying a Communicator, and Regalia does it alone. |
| 199 | Commander's Sphere | 3 | REPRINT | NO | It's a 3-mana rock, and ramp is full. |
| 200 | Darksteel Plate | 3 | REPRINT | SIDE | It keeps its sideboard row (displaces Champion's Helm) for damage-based sweepers. Its Blasphemous Act clause is stale. See Bench. |
| 201 | Herald's Horn | 3 | REPRINT | NO | It's a creature-type reducer, and v3 has no tribe. |
| 202 | I.K.S. Negh'Var, Imperial Flagship | 3 | NEW | NO | It supports Klingons and Warriors. |
| 203 | K't'inga-Class Battle Cruiser | 3 | NEW | NO | It supports Klingons and Warriors. |
| 204 | S.S. Botany Bay | 3 | NEW | NO | It's graveyard hate with a station payoff, which doesn't fit the plan. |
| 205 | Starfleet Communicator | 3 | NEW | NO | It draws only with a second Communicator-equipped creature, and v3 suits up one creature. |
| 206 | Sword of Light and Shadow | 3 | REPRINT | NO | It gives pro white and black plus creature recursion. Sword of Feast and Famine is the loop piece. |
| 207 | The Guardian of Forever | 3 | NEW | NO | Trap. Its blink returns Iron Man front face up and drops his Equipment (CR 712.14). |
| 208 | U.S.S. Enterprise-D, Galaxy-Class | 3 | NEW | NO | It impulses when charged, and stationing costs creature taps v3 spends elsewhere. |
| 209 | U.S.S. Stargazer, Here and There | 3 | NEW | NO | It needs 6 charge counters from creature taps. |
| 210 | Class-4 Tactical Cube | 4 | NEW | NO | It makes two 1/1 artifact tokens and needs 7 charge for its anthem. |
| 211 | Door of Destinies | 4 | REPRINT | NO | It's a typal anthem, and v3 has no tribe. |
| 212 | Hedron Archive | 4 | REPRINT | NO | It's a 4-mana rock that cracks for two, and ramp is full. |
| 213 | K'Vort-Class Raider | 4 | NEW | NO | It gives your creatures hexproof on your turn, and Padeem, Champion's Helm and Regalia's ward already cover Iron Man. |
| 214 | Queen's Diamond | 4 | NEW | NO | Its mana only casts your commander. |
| 215 | Reconnaissance Partition | 4 | NEW | NO | Near-miss (see below). It draws two, then one per counter that Steel Overseer or Iron Spider adds. |
| 216 | Stonespeaker Crystal | 4 | REPRINT | NO | It's a 4-mana rock with graveyard hate, and ramp is full. |
| 217 | The Sword of Kahless | 4 | NEW | NO | Its attack trigger looks for Klingon or Warrior cards, and v3 has none. |
| 218 | Unwinding Clock | 4 | REPRINT | IN | Already in v3. |
| 219 | Alhammarret's Archive | 5 | REPRINT | NO | It was reviewed on 2026-11-10 as a multiplier that adds no source of its own. That still holds. |
| 220 | Forsaken Monument | 5 | REPRINT | NO | It pumps colorless creatures, and Iron Man is blue and red. |
| 221 | Sickbay | 5 | NEW | NO | Its counters key off lifegain, which doesn't fit the plan. |
| 222 | Starship Enterprise | 5 | NEW | NO | It needs 16 charge counters. |
| 223 | U.S.S. Cerritos, Following Up | 5 | NEW | NO | It makes two 1/1s and needs station to fly. |
| 224 | U.S.S. Enterprise-C, Time-Tossed | 5 | NEW | NO | It wheels your own hand, and v3 empties its hand anyway. |
| 225 | U.S.S. Prometheus, Prototype | 5 | NEW | NO | It's Kediss's effect on a ship that needs 8 charge counters. |
| 226 | Command Chair | 6 | NEW | NO | Trap. It's a 6-mana rock that enters tapped, where Gilded Lotus makes three for {5} untapped. |
| 227 | The Immortal Sun | 6 | REPRINT | SIDE | It's benched for Cloud Key as the other candidate for MAIN 2's slot. It draws one extra card each draw step, makes every spell {1} cheaper and gives +1/+1. See Bench. |
| 228 | U.S.S. Defiant, Tough Little Ship | 6 | NEW | NO | Near-miss. It destroys an artifact or enchantment on entry, and Master Transmuter rebuys it. Meteor Sword's re-add trigger covers the same gap more broadly. |
| 229 | U.S.S. Farragut, Bold Explorer | 6 | NEW | NO | It's a landfall creature cheat, which doesn't fit the plan. |
| 230 | The Holodeck | 7 | NEW | NO | It replays one permanent from the graveyard a turn at full cost. Goblin Welder and Academy Ruins cover recursion. |
| 231 | Crystalline Entity | 8 | NEW | NO | Near-miss (see below). Cast, it destroys all nonartifact creatures and spares Iron Man, but it costs 8 and the free deploy skips the wipe. |
| 232 | Planet Killer | 8 | NEW | NO | It's a 9/9 that must attack, a second threat that doesn't carry Equipment. |
| 233 | Deep Space 9 | 9 | NEW | SIDE | It's benched for Darksteel Forge. Each upkeep it puts about 3.6 permanent cards from the top four onto the battlefield. See Bench. |

### Lands (30)

| # | Name | MV | New? | v3 | Reason |
|---|---|---|---|---|---|
| 234 | Academy Ruins | 0 | REPRINT | IN | Already in v3. |
| 235 | Andoria | 0 | NEW | NO | It's a tapped dual with 1 life, and Thundering Falls is the tapped dual with a better rider. |
| 236 | Coastal Peak | 0 | REPRINT | NO | It was passed on 2026-08-07 because it always enters tapped, and cycling doesn't change that. |
| 237 | Command Beacon | 0 | REPRINT | IN | Already in v3. |
| 238 | Command Tower | 0 | REPRINT | IN | Already in v3. |
| 239 | Desolate Lighthouse | 0 | REPRINT | NO | It's a colorless land with a paid loot. |
| 240 | Evolving Wilds | 0 | REPRINT | NO | It's a basic fetch. Fetches left on 2026-08-07 because v3 is two colours with no shuffle payoffs. |
| 241 | Exotic Orchard | 0 | REPRINT | NO | Its colours depend on opponents' lands. |
| 242 | Fabled Passage | 0 | REPRINT | NO | It's a basic fetch. Fetches left on 2026-08-07 because v3 is two colours with no shuffle payoffs. |
| 243 | Frostboil Snarl | 0 | REPRINT | NO | It needs an Island or Mountain in hand, and with eight basics it often enters tapped. |
| 244 | Gaseous Anomaly | 0 | NEW | NO | It's a colorless land with a 6-mana draw-two. |
| 245 | Island | 0 | REPRINT | IN | Already in v3. |
| 246 | Mountain | 0 | REPRINT | IN | Already in v3. |
| 247 | Mutavault | 0 | REPRINT | NO | It's a colorless creature land, which doesn't fit the plan. |
| 248 | Ni'Var Science Academy | 0 | NEW | NO | It's mono-blue with a small entry rider. |
| 249 | Path of Ancestry | 0 | REPRINT | NO | It enters tapped, and its scry needs creature spells that share a type with Tony. |
| 250 | Quark's Bar | 0 | NEW | NO | It's mono-red with a small entry rider. |
| 251 | Reliquary Tower | 0 | REPRINT | NO | The Ten Rings already sets your hand size to ten. |
| 252 | Rogue's Passage | 0 | REPRINT | NO | Regalia makes Iron Man unblockable for free. Its sideboard row still names Fomori Vault, which isn't in v3. |
| 253 | Scorched Geyser | 0 | REPRINT | IN | Already in v3. |
| 254 | Shore Leave Planet | 0 | NEW | NO | Cute line below (a land that becomes a second Iron Man). It enters tapped and makes only {U}. |
| 255 | Spatial Anomaly | 0 | NEW | NO | It's a colorless land with a 5-mana Shock. |
| 256 | Spire of Industry | 0 | REPRINT | NO | It makes any colour for 1 life, and v3 is two colours with plenty of duals. |
| 257 | Starfleet Academy | 0 | NEW | NO | Its mana counts creature types, and v3 has few. |
| 258 | Steam Vents | 0 | REPRINT | IN | Already in v3. |
| 259 | Sulfur Falls | 0 | REPRINT | IN | Already in v3. |
| 260 | Temple of the False God | 0 | REPRINT | NO | It's colorless and dead before five lands. |
| 261 | Terramorphic Expanse | 0 | REPRINT | NO | It's a basic fetch. Fetches left on 2026-08-07 because v3 is two colours with no shuffle payoffs. |
| 262 | Training Center | 0 | REPRINT | IN | Already in v3. |
| 263 | Unexplored Territory | 0 | NEW | NO | It's a basic fetch. Fetches left on 2026-08-07 because v3 is two colours with no shuffle payoffs. |


---

## Proposed swaps

### MAIN 1: Co-Option Adjutant in, Manifold Key out

**In:** [Co-Option Adjutant](https://scryfall.com/search?q=%21%22Co-Option+Adjutant%22) `{3}{U}`, Artifact Creature (Borg) 3/3. *Artifact creatures you control
have "Whenever this creature deals combat damage to a player, draw a card."*

**Out:** [Manifold Key](https://scryfall.com/search?q=%21%22Manifold+Key%22) `{1}`, Artifact. *{1}, {T}: Untap another target artifact. {3}, {T}: Target
creature can't be blocked this turn.*

**Deciding axis (section 2.3): cards per turn.** Adjutant turns the combat the deck already wins into
cards. [Manifold Key](https://scryfall.com/search?q=%21%22Manifold+Key%22)'s evasion mode became a second copy of Regalia's job this morning.

**Grounds:**

- The Invincible Iron Man is an artifact creature, so he gets the trigger. He flies and Brotherhood
  Regalia makes him unblockable, so he connects every combat. The floor is one card per combat.
- The trigger is granted ("have"), so it's Iron Man's own ability (CR 113.1a). [Wizard's Staff](https://scryfall.com/search?q=%21%22Wizard's+Staff%22) and
  [Roaming Throne](https://scryfall.com/search?q=%21%22Roaming+Throne%22) on Hero each make it trigger an additional time (CR 603.2d, ledger equip-018):
  three cards a hit with both out. Double strike from [Embercleave](https://scryfall.com/search?q=%21%22Embercleave%22), [Genji Glove](https://scryfall.com/search?q=%21%22Genji+Glove%22) or
  [Blacksmith's Talent](https://scryfall.com/search?q=%21%22Blacksmith's+Talent%22) level 3 is two combat damage steps, so two hits. [Genji Glove](https://scryfall.com/search?q=%21%22Genji+Glove%22)'s and Aggravated
  Assault's extra combats repeat all of it.
- It's the artifact version of [Thopter Spy Network](https://scryfall.com/search?q=%21%22Thopter+Spy+Network%22)'s connect-draw, which left `v3` today for Kediss.
  The recorded cost of that cut was that [Thopter Spy Network](https://scryfall.com/search?q=%21%22Thopter+Spy+Network%22) was "an enchantment draw engine the combat
  deploy can't put in". Adjutant is an artifact, so the deploy puts it in, Sculptor and Mechanaut take it to
  `{1}{U}`, [Fabricate](https://scryfall.com/search?q=%21%22Fabricate%22) and Tony's dig find it, and [Padeem, Consul of Innovation](https://scryfall.com/search?q=%21%22Padeem%2C+Consul+of+Innovation%22) covers it. It also draws
  per creature and per hit, where [Thopter Spy Network](https://scryfall.com/search?q=%21%22Thopter+Spy+Network%22) drew once per damage step.
- With [Silent Arbiter](https://scryfall.com/search?q=%21%22Silent+Arbiter%22) out, other artifact creatures can attack and draw. [Enthusiastic Mechanaut](https://scryfall.com/search?q=%21%22Enthusiastic+Mechanaut%22) and
  Iron Lad fly, [Krang, Utrom Warlord](https://scryfall.com/search?q=%21%22Krang%2C+Utrom+Warlord%22) gives the rest flying and haste, and the Construct tokens from Urza
  and [Simulacrum Synthesizer](https://scryfall.com/search?q=%21%22Simulacrum+Synthesizer%22) grow with the artifact count.
- On entry it draws off [Fateful Discovery](https://scryfall.com/search?q=%21%22Fateful+Discovery%22) and, at MV 4, makes a [Simulacrum Synthesizer](https://scryfall.com/search?q=%21%22Simulacrum+Synthesizer%22) Construct.
- What it doesn't do: Kediss's damage isn't combat damage, so it draws nothing, and [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22)'s
  Warriors aren't artifacts.

**Why [Manifold Key](https://scryfall.com/search?q=%21%22Manifold+Key%22):**

- **New evidence.** Key's `{3}, {T}` mode came in on 2026-08-25 to stop "a 1/1 flier chumping the
  kill shot", and this morning's entry named it `v3`'s unblockable source. Regalia took that job today
  for no mana per turn.
- **Checks.** Key's text has none of Adjutant's trigger words ("combat damage", "draw"), so it isn't a
  synergy cut (eval-011). The deck's records hold no pilot protection for it and no line that needs it
  (tool-019).
- **Costs, named.**
  - Its `{1}` untap goes. The best use is a second [The One Ring](https://scryfall.com/search?q=%21%22The+One+Ring%22) or [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22) activation on your
    own turn. It also untaps Iron Man after combat for a [Surestrike Trident](https://scryfall.com/search?q=%21%22Surestrike+Trident%22) shot or a block.
    [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) still covers opponents' turns, and [Thousand-Year Elixir](https://scryfall.com/search?q=%21%22Thousand-Year+Elixir%22) still untaps creatures
    for `{1}`.
  - [Urza's Saga](https://scryfall.com/search?q=%21%22Urza's+Saga%22) chapter III targets drop from 5 to 4 ([Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), [Basilisk Collar](https://scryfall.com/search?q=%21%22Basilisk+Collar%22), [Shadowspear](https://scryfall.com/search?q=%21%22Shadowspear%22) and
    [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) remain).
  - The evasion backup goes. If Regalia is answered, Iron Man still flies.
  - With Adjutant in, Key's `{3}` unblockable on a second artifact creature would have been one more
    card a turn.
- **Self-hits.** [Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22) kills the 3/3 unless Krang or [Darksteel Forge](https://scryfall.com/search?q=%21%22Darksteel+Forge%22) is out. In the
  [Aggravated Assault](https://scryfall.com/search?q=%21%22Aggravated+Assault%22) loop every combat draws, and the draws aren't optional. With [Wizard's Staff](https://scryfall.com/search?q=%21%22Wizard's+Staff%22) and
  double strike that's four cards a combat, so count the library before running the loop long.

**Other cuts considered:**

- **[Conqueror's Flail](https://scryfall.com/search?q=%21%22Conqueror's+Flail%22)** is the sideboard's standing displacement (for [Blackblade Reforged](https://scryfall.com/search?q=%21%22Blackblade+Reforged%22), [Big Score](https://scryfall.com/search?q=%21%22Big+Score%22)
  and [Vision of Love](https://scryfall.com/search?q=%21%22Vision+of+Love%22)). Today's [Aggravated Assault](https://scryfall.com/search?q=%21%22Aggravated+Assault%22) feeds it, though. Its lock stops instant
  removal and Fogs on your turn, which is exactly when the loop runs (eval-011). Not a cut today.
- **[Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22)** gives the third layer of targeted protection behind Padeem's hexproof and
  Regalia's ward. The pilot declined it twice today.
- **[Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22)** is MAIN 2's slot.
- **Iron Lad, [Simulacrum Synthesizer](https://scryfall.com/search?q=%21%22Simulacrum+Synthesizer%22) and [Steel Overseer](https://scryfall.com/search?q=%21%22Steel+Overseer%22)** are all fed by Adjutant. Iron Lad is a
  flying artifact creature that now draws when it connects, Constructs attack and draw, and Overseer
  grows the attackers.

**Curve:** average MV 3.43 → 3.48 across the 63 nonland cards (commander and the
[Sink into Stupor](https://scryfall.com/search?q=%21%22Sink+into+Stupor%22) land slot excluded). MV ≤ 2 goes 23 → 22 and MV ≤ 3 goes 40 → 39. `deck:show`'s
figure, which counts the commander and [Sink into Stupor](https://scryfall.com/search?q=%21%22Sink+into+Stupor%22), goes 3.40 → 3.45. Sections: Card Draw /
Engines 7 → 8, Cheat, Attach & Untap 5 → 4. Creatures 14 → 15, artifacts unchanged, Game Changers 3/3.

### MAIN 2: Seven of Nine, Unassimilated in, Cloud Key out

**In:** [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) `{1}{U}`, Legendary Artifact Creature (Human Officer) 0/4.
*At the beginning of your first main phase, draw a card. Then discard a card unless you control five
or more differently named lands. {6}{U}: Seven of Nine's base power and toughness become 7/9. Activate
only if you control seven or more differently named lands.*

**Out:** [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) `{3}`, Artifact. *As this artifact enters, choose artifact, creature,
enchantment, instant, or sorcery. Spells you cast of the chosen type cost {1} less to cast.*

**Deciding axis: cards, not mana, in the pre-flip window.** That window is where [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) earns its
slot, and Seven of Nine works there too and keeps working after the flip.

**Grounds:**

- `v3`'s 36 land slots hold 30 different names. With exactly five lands you control five names about
  83% of the time, and with six lands even one duplicate basic still leaves five. Before that, Seven
  of Nine loots, which still puts artifacts in the graveyard for [Goblin Welder](https://scryfall.com/search?q=%21%22Goblin+Welder%22) and [Academy Ruins](https://scryfall.com/search?q=%21%22Academy+Ruins%22).
- It's a card every turn with no mana and no condition. It doesn't need Iron Man flipped, attacking
  or alive, and those are the turns when Adjutant and [Cosmic Cube](https://scryfall.com/search?q=%21%22Cosmic+Cube%22) are blank. It only triggers in the
  precombat main phase (CR 505.1a), so it starts the turn after it lands.
- It's an artifact. It deploys free, costs `{U}` with [Etherium Sculptor](https://scryfall.com/search?q=%21%22Etherium+Sculptor%22) or [Enthusiastic Mechanaut](https://scryfall.com/search?q=%21%22Enthusiastic+Mechanaut%22),
  is found by [Fabricate](https://scryfall.com/search?q=%21%22Fabricate%22) and Tony's dig, gets Padeem's hexproof, draws off [Fateful Discovery](https://scryfall.com/search?q=%21%22Fateful+Discovery%22), taps for
  `{U}` with Urza, and grows with [Steel Overseer](https://scryfall.com/search?q=%21%22Steel+Overseer%22) and Iron Spider counters (which Iron Spider's draw can
  spend).
- It's a 0/4 blocker, which matters now that [Silent Arbiter](https://scryfall.com/search?q=%21%22Silent+Arbiter%22) and [Propaganda](https://scryfall.com/search?q=%21%22Propaganda%22) are both out of `v3`.
  Late, `{6}{U}` makes it a 7/9 once seven land names are out.
- It passes the standing rule twice over: it's an artifact and it's MV 2.

**Why [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22), and the record against it (tool-019):**

- The recorded finding still stands: none of the three reducers reduce the commander, so they only
  matter pre-flip and after a wipe (2026-09-09). [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) is "{3} for the reduction alone", with no
  body. It's also the named displacement for two re-add triggers, [Retrofitter Foundry](https://scryfall.com/search?q=%21%22Retrofitter+Foundry%22) and [Vedalken Orrery](https://scryfall.com/search?q=%21%22Vedalken+Orrery%22).
- **New evidence:** the draw role is under the pilot's aim while the reducer role is three deep, and
  this pool offers a draw card that lives in the same window [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) does.
- **The pilot's record.** [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) came back over [Foundry Inspector](https://scryfall.com/search?q=%21%22Foundry+Inspector%22) on 2026-08-31 (the pilot's pick).
  The pilot declined it as a cut on 2026-09-09 and 2026-09-10, didn't take it on 2026-10-10, and left
  the FRA proposal ([Geist of Saint Thalia](https://scryfall.com/search?q=%21%22Geist+of+Saint+Thalia%22) for [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22)) without comment. They've never stated a reason.
  If the reason is that [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) survives creature wipes and our own [Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22), that's real.
  Seven of Nine dies to both, as Sculptor and Mechanaut do, and after this swap every reducer is a
  creature.
- **Checks.** [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22)'s text has none of Seven's trigger words ("draw", "main phase", "lands"). Seven
  is an artifact spell that [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) would discount by `{1}`, which is minor.

**Other cuts considered:**

- **[Manifold Key](https://scryfall.com/search?q=%21%22Manifold+Key%22)** is MAIN 1's cut. If the pilot turns MAIN 1 down, Seven of Nine should take Key's
  slot instead, which is the cleaner curve swap (MV 1 → 2).
- **[Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22)** was declined twice today.
- **[Thousand-Year Elixir](https://scryfall.com/search?q=%21%22Thousand-Year+Elixir%22)** is protected: it gives Marvin's borrowed tap abilities haste (2026-09-10).
- **Iron Lad** would be draw for draw, which doesn't raise the count.

**Curve:** average MV 3.43 → 3.41. MV ≤ 2 goes 23 → 24 and MV ≤ 3 stays at 40. `deck:show` goes
3.40 → 3.38. Sections: Card Draw / Engines +1, Cost Reducers 3 → 2. Creatures +1.

**Both MAINs together:** average MV 3.43 → 3.46, MV ≤ 2 stays at 23, MV ≤ 3 goes 40 → 39, and
`deck:show` goes 3.40 → 3.43. Card Draw / Engines 7 → 9, creatures 14 → 16.

---

## Bench

Several existing sideboard rows still name cards from the deleted lists as their displacement:
[Fomori Vault](https://scryfall.com/search?q=%21%22Fomori+Vault%22), [Overpowering Attack](https://scryfall.com/search?q=%21%22Overpowering+Attack%22), [Galvanic Blast](https://scryfall.com/search?q=%21%22Galvanic+Blast%22), [Phyrexian Metamorph](https://scryfall.com/search?q=%21%22Phyrexian+Metamorph%22), [Solve the Equation](https://scryfall.com/search?q=%21%22Solve+the+Equation%22), [Seize the Day](https://scryfall.com/search?q=%21%22Seize+the+Day%22),
[Mind Stone](https://scryfall.com/search?q=%21%22Mind+Stone%22), [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) and [Strix Serenade](https://scryfall.com/search?q=%21%22Strix+Serenade%22) aren't in `v3`, and the Urza and Padeem rows bench
cards that are now in `v3`. The main session may want to re-point those rows. [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue's+Passage%22) and [Disrupt Decorum](https://scryfall.com/search?q=%21%22Disrupt+Decorum%22) are two of them, and both got NO here.

### Deep Space 9: displaces Darksteel Forge

[Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) `{9}`, Legendary Artifact (Spacecraft). *When Deep Space 9 enters and at the beginning
of your upkeep, exile the top four cards of your library. Put all permanent cards exiled this way onto
the battlefield. Station. 9+: Creatures you control get +3/+3.*

- `v3` has 9 non-permanent cards in its 99: [Fabricate](https://scryfall.com/search?q=%21%22Fabricate%22), [Chaos Warp](https://scryfall.com/search?q=%21%22Chaos+Warp%22), [Counterspell](https://scryfall.com/search?q=%21%22Counterspell%22),
  [Deflecting Swat](https://scryfall.com/search?q=%21%22Deflecting+Swat%22), [Fierce Guardianship](https://scryfall.com/search?q=%21%22Fierce+Guardianship%22), [Mana Drain](https://scryfall.com/search?q=%21%22Mana+Drain%22), [Bulk Up](https://scryfall.com/search?q=%21%22Bulk+Up%22), [Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22) and [Sink into Stupor](https://scryfall.com/search?q=%21%22Sink+into+Stupor%22)
  (an instant in exile, CR 712.8a). So each trigger puts about 3.6 cards onto the battlefield,
  lands included. That's the most card advantage in the pool by a distance.
- Iron Man's combat trigger or [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) puts it in free, and the entry trigger fires at once.
  Artifacts it flips draw off [Fateful Discovery](https://scryfall.com/search?q=%21%22Fateful+Discovery%22), MV 3+ ones make Synthesizer Constructs, and
  [Hammer of Nazahn](https://scryfall.com/search?q=%21%22Hammer+of+Nazahn%22) attaches each Equipment as it enters.
- **Costs:** about one card in eleven it flips is an instant, which is exiled for good, including the
  free counters and [Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22). Equipment arrive unattached without Hammer. It's a fourth
  9-drop competing for the combat deploy.
- **Why SIDE:** every 9-drop has a pilot call behind it. The pilot caught the Krang cut on 2026-08-20,
  and Krang is fed by MAIN 1 (it gives every artifact creature flying and haste). [Portal to Phyrexia](https://scryfall.com/search?q=%21%22Portal+to+Phyrexia%22)
  came back on the pilot's call the same day and is the deck's one-sided answer to a wide board now
  that Arbiter is gone. [Darksteel Forge](https://scryfall.com/search?q=%21%22Darksteel+Forge%22) was kept on
  2026-08-25 as insurance against mass artifact removal. Forge is the slot because its job depends on
  what the pods run. Its text has none of [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22)'s trigger words ("enters", "permanent").
- **Trigger:** if the pods aren't running mass artifact removal, [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) is the stronger 9-drop.

### The Immortal Sun: displaces Cloud Key

[The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) `{6}`, Legendary Artifact. *Players can't activate planeswalkers' loyalty
abilities. At the beginning of your draw step, draw an additional card. Spells you cast cost {1} less
to cast. Creatures you control get +1/+1.*

- It's a draw source by the pilot's count (one more card each draw step) and a reducer for every
  spell. That includes the non-artifact cards and recasting Tony, which none of the three current
  reducers touch. +1/+1 is a small bonus on Iron Man.
- It deploys free, and at MV 6 it makes a Synthesizer Construct.
- **Costs:** the planeswalker lock is symmetric hate. The pods remove stax on sight, so ask the pilot
  before adding it. At MV 6 it arrives after the pre-flip window [Cloud Key](https://scryfall.com/search?q=%21%22Cloud+Key%22) works in. Its anthem would
  turn off a [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) line (see Near-misses).
- **Why SIDE:** Seven of Nine is the MAIN for the same slot. It draws the same one card a turn for
  2 mana and arrives on turn 2. [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) is the pick if the pilot wants that slot to stay a
  reducer.

### U.S.S. Defiant, Mirror Migrant: displaces Champion's Helm

[U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) `{2}`, Legendary Artifact (Spacecraft) 5/5. *Flash. When U.S.S. Defiant
enters, it and up to one target creature you control phase out. Station. 8+: Flying.*

- Phasing Iron Man out takes his Equipment with him (CR 702.26g). He's treated as though he doesn't
  exist until your next turn (CR 702.26b), and he comes back still flipped because phasing isn't a
  zone change (CR 702.26d).
- It answers what [Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22) can't. Helm's hexproof stops targeted spells only. Defiant also
  stops wipes (destroy or exile), bounce and edicts. Edicts are the protection gap the 2026-09-09 entry
  called "the gap worth a card": while Iron Man is phased out, an edict makes you sacrifice something
  else.
- It repeats. [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) returns it and puts it back for `{U}`, and [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) untaps
  Transmuter on each opponent's turn. The reducers take the hard cast to `{0}`.
- **Costs:** on your own turn it removes Iron Man from combat, so it's a card to hold for opponents'
  turns. It's reactive, not part of the suit.
- **Why SIDE:** protection isn't the deck's diagnosed problem. Padeem, Regalia's ward, Commander's
  Plate, three counters and [Deflecting Swat](https://scryfall.com/search?q=%21%22Deflecting+Swat%22) cover targeted removal.
- **Trigger:** a loss to a wipe, an edict or exile removal while Iron Man was suited.

### Darksteel Plate: displaces Champion's Helm (existing row)

[Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) `{3}`, Artifact (Equipment). *Indestructible. Equipped creature has indestructible.
Equip {2}.* The row's trigger, heavy damage-based sweepers, still holds, and [Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22) is still
in `v3`. Its clause about [Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22) is stale, since Act left the 100 on 2026-09-02. Against
exile or edicts, Defiant is the better bench card for the same slot.

---

## Near-misses and traps

### Near-misses (good card, wrong slot or wrong moment)

- **[Spock, Voice of Reason](https://scryfall.com/search?q=%21%22Spock%2C+Voice+of+Reason%22)** (`{2}{U}` 3/2): *{2}, {T}: Draw a card for each nontoken permanent you
  control that entered this turn.* A post-flip turn brings a land, one to three deployed artifacts
  (Staff and Throne multiply the deploy) and a cast or two, so one activation draws 3 to 5. Marvin
  copies the ability, and [Thousand-Year Elixir](https://scryfall.com/search?q=%21%22Thousand-Year+Elixir%22) gives it haste and untaps Spock for a second go. It's
  the biggest raw draw in the pool. It's also the Jhoira case the pilot cut on 2026-08-21: a
  non-artifact 3-drop, neither reduced nor deployable, a 3/2 that dies to Ignition. Ask about it if
  the MAINs don't fix the draw.
- **[Mr. Spock, Science Officer](https://scryfall.com/search?q=%21%22Mr.+Spock%2C+Science+Officer%22)** (`{2}{U}{U}` 2/4): *If you would draw a card, draw two cards
  instead.* Not a blank alone, since it doubles the draw step, and it doubles every engine in `v3`. It's a
  non-artifact MV 4 with double blue, which fails the standing rule, and it speeds up deck-out with
  [The One Ring](https://scryfall.com/search?q=%21%22The+One+Ring%22) and [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22) escalating.
- **[Data, Exploring Humanity](https://scryfall.com/search?q=%21%22Data%2C+Exploring+Humanity%22)** (`{4}{U}` 4/4 artifact): *Seek out: discover 4.* With Seven of
  Nine plus the draw step it fires every turn you take, and with [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) it can fire on
  opponents' turns off [The One Ring](https://scryfall.com/search?q=%21%22The+One+Ring%22) and [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22). It's an artifact, so it's free off the deploy.
  It's third in line behind the two MAINs and needs a second draw each turn.
- **[Reconnaissance Partition](https://scryfall.com/search?q=%21%22Reconnaissance+Partition%22)** (`{4}` 3/3 artifact): it enters with two charge counters and
  reads *{T}, Remove a counter from this creature: draw a card* (or fetch a basic). Any counter works,
  so [Steel Overseer](https://scryfall.com/search?q=%21%22Steel+Overseer%22) and Iron Spider refill it, and [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) untaps it on each opponent's turn:
  up to four cards a round with no mana. Marvin copies it. Without Overseer or Spider it's two cards,
  and Seven of Nine does a steady card a turn for half the mana.
- **[Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22)** (`{1}`): [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22)'s mobilize makes X 1/1 Warriors that stay until the end
  step. In the second main phase, equip [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) to a Warrior for `{1}`, it dies as a 2/0, and you
  draw two. Repeat for each Warrior you can pay for, and [Wizard's Staff](https://scryfall.com/search?q=%21%22Wizard's+Staff%22) doubles the Warriors. [Urza's Saga](https://scryfall.com/search?q=%21%22Urza's+Saga%22)
  can fetch it. It's blank without the Shield on Iron Man, because the deck's other X/1s (Steel
  Overseer, Kediss, [Goblin Welder](https://scryfall.com/search?q=%21%22Goblin+Welder%22)) are creatures you want alive. [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22)'s +1/+1 would turn
  it off.
- **[Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22)** (`{1}{R}` 2/2): tap her for `{2}` targeting Iron Man and leave
  her tapped, and every trigger he has triggers again. That covers the combat deploy, The Reaver
  Cleaver's Treasures, [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22)'s mobilize and Adjutant's draw. It stacks with Staff and Throne
  (CR 603.2d), and she passes the MV 2 rule. But the deploy is capped by artifacts in hand, which is
  the scarce thing, and she's a spare key for Staff and Throne rather than a new effect.
- **[Dominion Saboteur](https://scryfall.com/search?q=%21%22Dominion+Saboteur%22)** (`{4}{U}`): entering as a copy of the flipped Iron Man makes a
  non-legendary 5/5 flying haste artifact creature with his combat trigger (CR 707.8), and Roaming
  Throne doubles it too, since it's a Hero. Its Equipment attach to itself. It can also copy Portal to
  Phyrexia for a second edict of three creatures per opponent. It's a non-artifact 5-drop, and a
  second deployer drains a hand that's already short.
- **[Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22)** (`{8}` 7/7 flying artifact): cast, it destroys all nonartifact creatures.
  The flipped commander and every artifact creature survive, while Kediss, Padeem, Urza, [Goblin Welder](https://scryfall.com/search?q=%21%22Goblin+Welder%22)
  and front-face Tony die. It answers the wide boards the pilot now faces without Arbiter, but only
  when cast (five mana with all three reducers), and the free deploy skips the wipe. [Propaganda](https://scryfall.com/search?q=%21%22Propaganda%22) is the
  recorded fix and costs three.
- **[Interstellar Effigy](https://scryfall.com/search?q=%21%22Interstellar+Effigy%22)** and **[U.S.S. Defiant, Tough Little Ship](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Tough+Little+Ship%22)**: artifacts whose entry
  trigger [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) and [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) can rebuy at instant speed. Effigy bounces a creature,
  and Defiant destroys an artifact or enchantment. [Meteor Sword](https://scryfall.com/search?q=%21%22Meteor+Sword%22)'s re-add trigger covers the
  noncreature-threat gap more broadly.
- **[Transwarp Hub](https://scryfall.com/search?q=%21%22Transwarp+Hub%22)** (`{2}{U}` artifact): it mills five and keeps up to two artifacts (53 of
  `v3`'s 99 cards are artifacts, so about 2.7 hits). [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) rebuys it for `{U}`. Alone
  it's a one-shot.
- **[Zefram Cochrane, Warp Pioneer](https://scryfall.com/search?q=%21%22Zefram+Cochrane%2C+Warp+Pioneer%22)** (`{2}{U}`): it casts an artifact from the top once a turn,
  and 48 of `v3`'s 99 cards are castable artifacts. It's a non-artifact 3-drop.

### Cute lines (recorded even though passed)

- **[Gwyndala, the Progeny](https://scryfall.com/search?q=%21%22Gwyndala%2C+the+Progeny%22):** her Neuroflux Heirloom and [Blacksmith's Talent](https://scryfall.com/search?q=%21%22Blacksmith's+Talent%22)'s Sword token are both
  Equipment tokens. Attach both to Iron Man, then pay `{2}` before attacks to make each a copy of
  [Genji Glove](https://scryfall.com/search?q=%21%22Genji+Glove%22) until end of turn. Three Genji triggers in the first combat add three extra combat
  phases (CR 500.8), and each one brings another combat deploy.
- **[Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22)** or **[Seven of Nine, Tertiary Adjunct](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Tertiary+Adjunct%22)** with [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22): both put two
  charge counters on an artifact, and [Insight Engine](https://scryfall.com/search?q=%21%22Insight+Engine%22) draws one card per counter. [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22)
  untaps all three on opponents' turns.
- **[Shore Leave Planet](https://scryfall.com/search?q=%21%22Shore+Leave+Planet%22):** for `{4}{U}` in your first main phase it becomes a non-legendary copy of
  Iron Man until end of turn, with his combat trigger. That's a second deploy, with Equipment attaching
  to the land copy.
- **[Fleet Captain Christopher Pike](https://scryfall.com/search?q=%21%22Fleet+Captain+Christopher+Pike%22):** `{1}, {T}` untaps Iron Man and [Brass Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22), which buys one
  more [Surestrike Trident](https://scryfall.com/search?q=%21%22Surestrike+Trident%22) shot a turn.

### Traps (they read like upgrades)

- **[Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22):** a Treasure every upkeep looks like fuel. But *"You can't sacrifice
  Treasure tokens"* means [The Reaver Cleaver](https://scryfall.com/search?q=%21%22The+Reaver+Cleaver%22)'s Treasures can't pay for [Aggravated Assault](https://scryfall.com/search?q=%21%22Aggravated+Assault%22), which
  breaks half of the new loop, and [Treasure Vault](https://scryfall.com/search?q=%21%22Treasure+Vault%22)'s Treasures go dead too. Urza could still tap
  them for `{U}`.
- **[Kobayashi Maru Scenario](https://scryfall.com/search?q=%21%22Kobayashi+Maru+Scenario%22):** draw two and a bounce look cheap for `{1}{U}{U}`. Each upkeep picks a
  new mode, so by the fourth upkeep Abandon Ship (*"You lose the game"*) is the only one left unless
  the enchantment is gone.
- **[Test of Priorities](https://scryfall.com/search?q=%21%22Test+of+Priorities%22), [Temporal Tribulation](https://scryfall.com/search?q=%21%22Temporal+Tribulation%22), [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22):** blink as protection.
  Iron Man comes back front face up as Tony (CR 712.14), with every Equipment left on the battlefield.
- **[Gray and Adira, Forever Joined](https://scryfall.com/search?q=%21%22Gray+and+Adira%2C+Forever+Joined%22):** a hasty copy of Iron Man sounds like a second deploy, but
  the copy appears during the beginning of combat step, after the trigger point has passed.
- **[Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22):** with [Mind's Eye](https://scryfall.com/search?q=%21%22Mind's+Eye%22) it nets you four cards a round for `{3}`, but it gives each
  opponent a card every turn, and without [Mind's Eye](https://scryfall.com/search?q=%21%22Mind's+Eye%22) it's pure symmetry.
- **[Romulan Bird-of-Prey](https://scryfall.com/search?q=%21%22Romulan+Bird-of-Prey%22):** a 2-mana 4/4 flier on paper, but it needs eight charge counters, two
  per noncreature spell you cast, and the combat deploy isn't a cast.
- **[Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22):** two colours cap it at 2 counters, and every mana value it can reach
  (0 to 2) also holds your own tokens, rocks or cheap Equipment.
- **[Command Chair](https://scryfall.com/search?q=%21%22Command+Chair%22):** three mana of one colour for `{6}`, entering tapped, where [Gilded Lotus](https://scryfall.com/search?q=%21%22Gilded+Lotus%22)
  does it for `{5}` untapped.
