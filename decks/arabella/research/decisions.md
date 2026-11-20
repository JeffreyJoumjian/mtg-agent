# Arabella — decision log

Append-only. Grounds, not verdicts: every entry names why, so a later pass can re-check it.

## 2026-11-20 — Founded: objective first draft (Bracket 3)

The pilot picked Arabella first from the parked deck requests: build it objectively from the
commander and the field, then a second pass for pieces from the existing decks. Brief agreed in chat:

- **Bracket 3.** EDHREC tags 4,921 of her 20,840 decks with a bracket: 2% Exhibition, 53% Core,
  34% Upgraded, 10% Optimized, 1% cEDH. Her salt score is 0.70 / 4 (low). The Optimized lists add
  tutors (Enlightened Tutor 46% vs 20%), fast mana, stax and Kiki-Jiki + Village Bell-Ringer.
- **Leans: all three** (power 2 or less matters, go-wide tokens with doublers, light lifegain).
  The pilot: *"token doublers are important"*.
- **No permanent power anthems.** Arabella counts creatures with power 2 or less as her trigger
  resolves (CR 608.2h), so a static +1/+1 shrinks X (same trap as ledger repl-005 for Delney).
  Pumps that last until end of turn are fine after her trigger has resolved.
- **Protection: Reconnaissance plus a small package.** Its {0} removes her from combat after the
  trigger and untaps her.
- **Grand Abolisher** at the pilot's ask: not a Game Changer, so it fits Bracket 3.

### The commander

*"Whenever Arabella attacks, it deals X damage to each opponent and you gain X life, where X is the
number of creatures you control with power 2 or less."* {R}{W}, a 1/3 Legendary Artifact Creature —
Toy. X is counted on resolution, so token makers that trigger on attack (Adeline, Anim Pakal,
Ainok Strike Leader, Voice of Victory, Myrel, Krenko) should resolve first. Delney (she's power 1)
and Windcrag Siege's Mardu mode each add a trigger, so she fires three times per attack
(CR 603.2d: additional-trigger effects add up). Kirol copies one more once a turn. She's red, so
Torbran adds 2 to each opponent's damage.

### Role skeleton (SKILL §2.1)

| Role | Target | Built |
|---|---|---|
| Lands | 34 | 34 (13 duals and fetch, 6 utility, 8 Plains, 7 Mountain) |
| Ramp | 9 | 9 |
| Card draw (Clues don't count) | 9 | 9, plus Minas Tirith |
| Removal & interaction | 7 | 7 |
| Board wipes | 2 | 2 |
| Protection | 5 | 5 |
| Token makers | 13 | 13 |
| Token doublers | 3 | 3 |
| Payoffs & trigger doublers | 5 | 5 |
| Extra combats & evasion | 4 | 4 |
| Entry pings & amplifiers | 5 | 5 |
| Lifegain payoffs (no power added) | 3 | 3 |

Game Changers: Smothering Tithe, Teferi's Protection, The One Ring (3/3). Curve: average MV 2.91,
MV ≤ 2 28, MV ≤ 3 52. Pips W55 R26, sources W31 R25.

### Grounds by role, and what the targets left out

- **Payoffs & trigger doublers:** Delney, Windcrag Siege, Kirol, Raid Bombardment, City on Fire.
  Left out: Strionic Resonator ({2} per copy, Kirol copies for two taps), Imperial Recruiter
  (a tutor, not a payoff), Fiery Emancipation and Twinflame Tyrant (City on Fire convokes off the
  wide board), Gratuitous Violence (creatures only, so not Arabella's trigger).
- **Entry pings & amplifiers:** Impact Tremors, Purphoros, Molten Gatekeeper, Agate Instigator,
  Torbran. Left out: Witty Roastmaster and Hellrider (power 3, so they don't count for X),
  Goblin Bombardment (a sacrifice outlet; the deck isn't aristocrats).
- **Token makers:** attack-time makers first, because their tokens count for that attack's X.
  Left out: Hero of Bladehold (battle cry pushes 2-power creatures to 3 if it resolves first),
  Siege-Gang Commander, Krenko Mob Boss (few Goblins), Skyknight Vanguard, Tempt with Vengeance.
- **Token doublers:** Anointed Procession, Mondrak, Ojer Taq (triples creature tokens; returns as a
  land). Together, 12 tokens for every 1. Left out at a target of 3: Elspeth, Storm Slayer (her 0
  adds counters) and Exalted Sunborn (warp {1}{W} for a one-turn doubler).
- **Card draw:** The One Ring, Mentor of the Meek, Welcoming Vampire, Enduring Innocence, Tocasia's
  Welcome, Esper Sentinel, Skullclamp (a 1/1 token becomes a 2/0 and draws two), Idol of Oblivion,
  Rumor Gatherer. Left out: Irreverent Gremlin, Splitskin Doll, Assemble the Players, Well of Lost
  Dreams, Mangara.
- **Ramp:** Sol Ring, Arcane Signet, Talisman of Conviction, Boros Signet, Smothering Tithe,
  Ornithopter of Paradise, Gold Myr, Iron Myr (all three bodies count for X), Oketra's Monument.
  Left out: Fellwar Stone, Mind Stone, Land Tax, Jeska's Will (a Game Changer).
- **Lifegain payoffs:** Dawn of Hope, Resplendent Angel, Ocelot Pride. In red and white most
  lifegain payoffs add +1/+1 counters (Ajani's Pridemate, Archangel of Thune), which fights her
  power cap. Left out: Well of Lost Dreams, Soul Warden, Charismatic Conqueror, Elspeth Tirel.
- **Removal:** Swords, Path, Chaos Warp, Generous Gift, Get Lost, Winds of Abandon (overload is a
  one-sided exile wipe), Stroke of Midnight. Left out: Abrade, Untimely Malfunction, Wear // Tear.
- **Board wipes:** Dusk // Dawn (Dawn returns her small creatures), The Battle of Bywater (Foods
  per creature you control). Left out: Fell the Mighty, Martial Coup (kills Arabella at X ≥ 5).
- **Protection:** Reconnaissance, Teferi's Protection, Flawless Maneuver, Mother of Runes, Grand
  Abolisher. Left out: Selfless Spirit, Giver of Runes, Boros Charm, Deflecting Swat, Akroma's
  Will, Swiftfoot Boots. Lightning Greaves passed: its shroud stops Reconnaissance targeting her.
- **Extra combats & evasion:** Aurelia, Aggravated Assault, Combat Celebrant, Ragged Playmate.
  Each extra combat is another round of her triggers. Left out: Karlach, Relentless Assault,
  Goblin Tunneler, Iroas.

### Costs named (SKILL §1.3)

- Dusk // Dawn and The Battle of Bywater also kill your power-3-or-more creatures: Adeline, Myrel,
  Mondrak, Ojer Taq (it returns as a land), Kirol, Aurelia, Combat Celebrant, Resplendent Angel.
- Elspeth, Sun's Champion's −3 kills power 4 or more: Adeline, Mondrak, Ojer Taq, Combat Celebrant.
- City on Fire also triples the damage Talisman of Conviction and Battlefield Forge deal to you
  (ledger eval-028).
- Anim Pakal and Krenko grow past power 2 after a couple of attacks and stop counting themselves.
- No loops: no automatic or two-card infinite in the list.

Validated: 100/100, every name found, legal and on-identity, Game Changers 3/3. `MOXFIELD.txt`
generated. Not on EDHPlay yet (create a deck there only when the pilot asks).

## 2026-11-20 (later) — Pilot's first comments on the draft

### Deflecting Swat in, Generous Gift out (pilot's call)

Snapshot: `versions/2026-11-20-2042-main-deflecting-swat-in-generous-gift-out.json`. Swat is free
with Arabella out and redirects a removal spell aimed at her. Removal 7 → 6, Protection 5 → 6.

### Corrections to the draft's grounds

- **Worf, Still Not Merry was missed.** It's red-white and makes a tapped and attacking 1/1 flying
  Faerie for each attacking non-Faerie creature; every Faerie has power 1. The draft came from the
  EDHREC page plus recall, which lags new sets (ledger build-047). A Scryfall search then found
  Endless Foot Assault, Raph & Leo, Rite of Ascension, General Kreat and Hanweir Garrison too.
- **Krenko, Mob Boss was passed on "few Goblins".** Re-derived: Krenko, Tin Street Kingpin, Legion
  Warboss and Ainok Strike Leader (three Goblins per attack) all make Goblins, so with a doubler
  out his {T} grows the board exponentially.
- **Elspeth, Storm Slayer was benched on her 0 adding counters.** That's no cost, because the 0 is
  optional. She doubles every token source in the deck, costs 5 instead of 6, and her −3 is clean
  removal, where Sun's Champion's −3 kills the deck's own Adeline, Mondrak and Ojer Taq.
- **Raid Bombardment and Hellrider read "whenever a creature attacks",** which doesn't trigger for
  tokens put onto the battlefield attacking (CR 508.3a). Most of this deck's tokens arrive that
  way, and both damage only the player being attacked.

Proposed after these comments, waiting on the pilot: Worf for Grand Crescendo, Witty Roastmaster
for Raid Bombardment, Krenko, Mob Boss for Assemble the Legion, Tempt with Vengeance for Secure the
Wastes, Soul Warden for Resplendent Angel, Endless Foot Assault for Loyal Apprentice, Elspeth, Storm
Slayer for Elspeth, Sun's Champion, and Raph & Leo for Ragged Playmate.

## 2026-11-20 (later still) — Four swaps applied (pilot's calls)

- **Krenko, Mob Boss in, Assemble the Legion out.** Kingpin, Warboss and Ainok make Goblins for his
  {T}; doublers make it exponential.
- **Soul Warden in, Resplendent Angel out.** A 1/1 that counts, and a life per creature entering for
  Dawn of Hope and Ocelot Pride.
- **Endless Foot Assault in, Loyal Apprentice out.** Three attacking Ninjas per attack, more with
  squad copies.
- **Elspeth, Storm Slayer in, Elspeth, Sun's Champion out.** A doubler for every token source, 5 mana,
  clean −3.

Curve: average MV 2.91 → 2.86, MV ≤ 2 28, MV ≤ 3 52. Validated 100/100, legal, Game Changers 3/3.

The pilot kept Raid Bombardment (*"it's important"*) and wants Witty Roastmaster in addition, and
Tempt with Vengeance beside Secure the Wastes. Still open: Worf, Raph & Leo, Witty, Tempt, and the
search finds Rite of Ascension and General Kreat.

## 2026-11-20 (evening) — Six more swaps applied (pilot's calls)

- **Worf, Still Not Merry in, Grand Crescendo out.** A tapped and attacking 1/1 flying Faerie for
  each attacking non-Faerie; Windcrag doubles it. Order it after the attack-time token makers and
  before Arabella's triggers. The pilot asked whether the deck attacks with its creatures or only
  with Arabella: it attacks with the tokens (many enter attacking anyway; Raid and Worf reward it;
  Delney stops power-3+ blockers) and keeps the engines home. Blocks never shrink that attack's X,
  only the next one.
- **Raph & Leo in, Ragged Playmate out.** An extra combat every turn on a power-2 body.
- **General Kreat in, Oketra's Monument out.** A power-2 per-entry pinger that makes Goblins.
  Ramp 9 → 8.
- **Witty Roastmaster in, Esper Sentinel out.** Kept beside Raid Bombardment at the pilot's ask.
  Draw 9 → 8.
- **Tempt with Vengeance in, a Plains out.** Kept beside Secure the Wastes. Lands 34 → 33.
- **Iroas in, Aggravated Assault out.** The pilot chose Iroas over Rite of Ascension for that slot:
  menace for the team and no damage to attacking creatures, on an indestructible enchantment.

Curve: average MV 2.86 → 2.94, MV ≤ 2 28 → 26, MV ≤ 3 52 → 51. Pips W54 R32, sources W30 R25.
Validated 100/100, legal, Game Changers 3/3. Proposed next: Dolmen Gate (the pilot wants it), cut
to be chosen.

### Dolmen Gate in, The Battle of Bywater out (pilot's call)

Snapshot: `versions/2026-11-20-2125-main-dolmen-gate-in-the-battle-of-bywater-out.json`. Dolmen
Gate is a second copy of Iroas's job (no combat damage to attackers), for consistency (SKILL §2.5).
Bywater, re-derived against today's list, would destroy Worf, Witty Roastmaster, Krenko Mob Boss,
Myrel, Mondrak, Ojer Taq, Kirol, Aurelia, Combat Celebrant and Adeline. Wipes: Dusk // Dawn plus
Winds of Abandon's overload. Offered and not taken: Mother of Runes, Combat Celebrant, Secure the
Wastes, Molten Gatekeeper, Reconnaissance, Stroke of Midnight, Voice of Victory, Iron Myr. Average
MV 2.94 → 2.93. Dolmen Gate filed under Protection.

### Mithril Coat and Swiftfoot Boots in; Grand Abolisher and Molten Gatekeeper out (pilot's calls)

- **Mithril Coat in, Grand Abolisher out.** The pilot chose to cut Grand Abolisher or Voice of
  Victory; Abolisher went because Myrel already locks spells and abilities on your turn and Voice
  locks spells, while Voice also makes two attacking Warriors per attack. Coat: flash, attaches to
  Arabella, indestructible (not exile).
- **Swiftfoot Boots in, Molten Gatekeeper out.** Boots: hexproof and haste after a recast. Gatekeeper
  was the sixth per-entry pinger and stays in the sideboard at the pilot's ask. Mother of Runes was
  my first pick and the pilot kept her.
- **Kept, re-derived:** Reconnaissance. Activated during the end of combat step it untaps every
  attacker after damage for {0} each (CR 511.3; ledger tap-027), so the team keeps blockers and is
  ready for an extra combat.

Protection is now 8 against a target of 5 (Deflecting Swat, Flawless Maneuver, Mother of Runes,
Reconnaissance, Teferi's Protection, Dolmen Gate, Mithril Coat, Swiftfoot Boots); entry pings 6.
Average MV 2.93. Validated 100/100, legal, Game Changers 3/3.

## 2026-11-21 — On EDHPlay

Created at the pilot's ask as "Arabella" (https://edhplay.com/decks/ee20952b-41b1-44cf-b27b-87a6e18f81ef):
valid, bracket 3, verified against the local list. 71 printings back-filled from EDHPlay's defaults.
