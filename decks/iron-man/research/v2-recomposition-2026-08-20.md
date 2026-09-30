# V2 recomposition — 2026-08-20

**Trigger:** the pilot went 0-for on 2026-08-19 game night and reported three concrete failure
modes. This file is the diagnosis, the 14-swap package that became `DECK-V2.md`, and the
disposition of every card on the pilot's 85-card EDHREC pull list. **`DECK.md` (V1) is intact;
V2 is the experimental list.**

## The three reported failures

1. **The commander is too slow.** Back face is {4}{U}{R} = 6 mana, then 8, then 10 after board
   wipes. Six-plus turns "doing absolutely nothing" because the hand was priced for a commander
   who wasn't there.
2. **No board = bleeding out.** Voltron with 10 creatures means no blockers; 10+ damage per turn
   from creature decks, and racing pingers from behind. Interaction was drawn but was the wrong
   type or unaffordable while also saving for the commander.
3. **Half the hand needed the commander to matter.** The expensive equipment and the loose extra
   combats are payload for a free-deploy engine that kept dying.

## The diagnosis, in numbers

- V1 held **8 nonland cards at MV 7+** (Excalibur 12, Blasphemous 9*, Portal 9, Krang 9, Forge 9,
  Extinguisher 8, Ten Rings 8, Ultima 7 — *self-reducing). Six of those are "commander-deploy or
  bust." V2 keeps three: Forge, Ten Rings, Blasphemous Act.
- The 13 nonland cuts average **MV 5.7**; the 14 adds average **MV 3.4** (two with affinity,
  effectively ~2).
- Creature count **10 → 17** — and the new bodies are reducers, draw engines, and blockers, not
  vanilla bodies.
- Three prior structural verdicts expired at once against play data (deck-brain §1.1b):
  *creature-light is load-bearing* (the one-sided-sweeper upside never mattered because the deck
  died with no board), *extra combats dominate* (only true when the deck functions), and *this
  deck skips cost reduction* (already half-reversed by LEDGER 2026-08-18: the commander is the
  exception).

## Fix 1 — the commander cast-path math

The back face is a **Legendary Artifact Creature** spell, so *artifact-spell* cost reducers apply
to it — and per CR 601.2f + CR 903.8 (LEDGER 2026-08-18) they also eat the commander tax:

| Reducers on board | Cast 1 / 2 / 3 |
|---|---|
| none (V1) | 6 / 8 / 10 |
| one (Sculptor, Mechanaut, Inspector, Shuri, or Cloud Key) | 5 / 7 / 9 |
| two | 4 / 6 / 8 |
| three | 3 / 5 / 7 |

Alternate taxed line: cast the **front face** ({1}{U}; tax makes it 2 / 4 / 6) and later pay the
{4}{U}{R} **transform activation — activations are never taxed and can't be countered.**
Third line: **Hulkbuster Armor, "Equip Hero {3}"** — the un-flipped 2-drop Tony Stark is a Hero,
so turn-2 Tony + turn-4 Hulkbuster = a **9/9 flying** commander with zero transform mana and zero
tax exposure. Command Beacon (V1 add) backs all three lines up.

*Training Grounds was in the package and was dropped in final ranking:* the artifact reducers
dominate it — they fix the same 6/8/10 curve **and** make the rest of the hand castable, where
Training Grounds only discounts the transform. It stays a sideboard-tier card for
counterspell-heavy pods (the uncounterable-flip line).

*Reducer wording that decided the table (§1.2):* "**artifact** spells cost {1} less" reaches the
commander (the back face is an artifact creature spell); "**noncreature** spells cost {1} less"
(Iron Lad, Young Avenger; Jhoira's Familiar is fine but MV 4) does **not** — he's a creature
spell. That one word is why Sculptor/Mechanaut/Inspector/Shuri made it and Iron Lad didn't.

## Fix 2 — a board that exists without the commander

Sai (a flying chump per artifact cast), Wurmcoil (the anti-aggro wall that must be killed twice),
Iron Man Master of Machines (1/4 vigilance that scales +1/+0 per artifact), Foundry Inspector
(3/2), plus 17 total creatures. Emry recasts swept artifacts from the yard; Blacksmith's Talent
is an **enchantment** — it survives every creature wipe and re-suits the next body.

## Fix 3 — free casts and free attaches (the pilot's MUSTs)

- **Master Transmuter** — repeatable, commander-independent cheat: {U}, tap, bounce an artifact →
  put any artifact from hand onto the battlefield. Per LEDGER 2026-08-20, a **Treasure token is
  premium bounce fodder** (it evaporates, the cost is still paid). Also saves targeted equipment
  by bouncing it in response.
- **Blacksmith's Talent** L2 — attach any Equipment you control to a creature **every combat**,
  free. Covers the stranded-gear case Hammer of Nazahn can't (Hammer only sees Equipment
  *entering*). L3 gives the suited commander double strike — with Mjölnir that is 4× damage.
- **Hammer of Nazahn** (V1 add) + the commander's own deploy trigger remain the other two attach
  engines.

## The 14 swaps

| OUT (MV) | IN (MV) | Grounds |
|---|---|---|
| Seize the Day (4) | Etherium Sculptor (2) | Dead-when-behind sorcery → the cheapest commander discount. |
| Overpowering Attack (5) | Enthusiastic Mechanaut (2) | Same, and the reducer flies and blocks. |
| Savage Beating (5) | Foundry Inspector (3) | Extra combats survive as Genji Glove + Hexplate + Aggravated Assault — the ones the commander deploys free or that go infinite. |
| Great Train Heist (1) | Shuri, Wakandan Inventor (2) | GTH needs an attacking board; Shuri discounts everything and forks the best artifact at sorcery speed. 72% field. |
| Mystic Reflection (2) | Cloud Key (3) | Narrowest interaction slot → a reducer that survives creature wipes. |
| Iron Man, Tony Stark (5) | Iron Man, Master of Machines (4) | The robot trigger reads *red spells* (~15 casts in the whole deck) and its anthem wants go-wide. MoM blocks at 1/4 vigilance, grows per artifact, draws on attack — and Roaming Throne (Hero) doubles the draw. |
| Excalibur, Sword of Eden (12) | Hulkbuster Armor (4) | Both are "huge stats on the commander"; Hulkbuster does it for {4} + Equip Hero {3} **without flipping**, Excalibur is a brick until the board exists. |
| Ultima Weapon (7) | Wurmcoil Engine (6) | The 7-cost payload tier is what rotted in hand. Wurmcoil is castable, blocks like a wall, dies into two bodies. |
| Extinguisher Battleship (8) | Sai, Master Thopterist (3) | §1.3: with 17 creatures the Battleship's own ETB (4 to each creature) now strafes our board. Sai makes the blockers instead. |
| Krang, Utrom Warlord (9) | Jhoira, Weatherlight Captain (4) | Krang is cheat-only top-end; Jhoira draws off nearly every spell in the deck (historic ≈ everything). Kept Forge over Krang for the resilience axis. |
| Portal to Phyrexia (9) | Master Transmuter (4) | One 9-drop cheat target (Forge) is enough; Transmuter IS the cheat engine and it works with the commander dead. |
| Phyrexian Metamorph (4) | Emry, Lurker of the Loch (3*) | Copy suite thinned to zero; Emry is sweep insurance — recast the swept gear from the yard. |
| Insight Engine (3) | Thought Monitor (7*, affinity ≈2) | Escalating draw that eats mana every turn vs. 2 cards + a flying blocker for ~2. |
| Fomori Vault (land) | Blacksmith's Talent (1) | 36 lands is right for the new curve; Fomori is the worst land (colourless, {3}+discard). Talent is the mass-attach MUST. |

Also: **1 Mountain → 1 Island** (4 Island / 5 Mountain). The cuts were red-pip-heavy (three
{R}{R} sorceries, a {3}{R}{R} creature) and the adds are blue-leaning; rough pip count is now
~26 U vs ~21 R.

## Disposition of the pilot's 85-card EDHREC list

**Taken (13):** Etherium Sculptor · Enthusiastic Mechanaut · Foundry Inspector · Shuri · Cloud
Key · Jhoira, Weatherlight Captain · Sai · Thought Monitor · Emry · Master Transmuter ·
Blacksmith's Talent · Hulkbuster Armor · Iron Man, Master of Machines · Wurmcoil Engine (14th
add; Cloud Key wasn't on the list — 13 of the 14 adds were).

**Already in the deck:** Goblin Engineer. **Already sideboard rows (unchanged):** Padeem ·
Ultron · Cyberdrive Awakener · Urza, Lord High Artificer · Vandalblast. **Previously settled,
grounds still hold:** Lightning Greaves (shroud stops your own equips/targets — LEDGER
2026-08-07 attach entry notwithstanding, Helm's hexproof is strictly better here) · Kaldra
Compleat / Nettlecyst (living weapon, CR 702.92a — bonuses live on the Germ).

**Near-misses, in order — the bench if a slot opens:**
- **Iron Man, Bleeding Edge** — copy your artifact cast once each turn (token copy; Hammer
  attaches Equipment copies free). 64% field. First creature substitute.
- **Swordsman's Steel** — "draw a card per Equipment you control" on ETB is 3–5 cards here.
  First Equipment substitute.
- **Mystic Forge / Sensei's Divining Top / Crystal Skull, Isu Spyglass / The Reality Chip** —
  the cast-off-the-top package; take 2+ together or none. First noncreature-engine substitutes.
- **Whir of Invention** — instant-speed tutor-to-battlefield; {U}{U}{U} is the cost of keeping
  Fabricate instead. Revisit if the manabase goes bluer.
- **Lady Octopus** — 1-drop that scales into free artifact casts; slower than it reads.
- **Kappa Cannoneer** — lost the 6-drop slot to Wurmcoil on the defense axis (the losses were
  defensive, not offensive).
- **Semblance Anvil** — the 6th reducer if wanted; imprint-artifact also discounts the commander.

**Meta/sideboard tier (bring in by pod, like the V1 SIDEBOARD rows):**
- **Desynchronization** — bounce every non-historic nonland permanent: nearly one-sided here
  (our board is almost all historic). The creature-deck blowout button.
- **Propaganda** / **Aetherize** — pillow fort / fog-blowout vs. aggro pods.
- **Spellskite** — targeted-removal-heavy pods (competes with the Padeem row).
- **Basilisk Collar** — deathtouch on the commander + Chandra's Ignition = destroy every other
  creature regardless of toughness, and the lifelink feeds Aettir and Priwen. Three pieces, $1.
- **Shadowspear** — strips opposing hexproof/indestructible for {1}.
- **Untimely Malfunction** — flexible red instant (kill artifact / redirect / no-blocks).
- **Mana Drain** — verified **not** a Game Changer; a legit Counterspell upgrade if wanted.

**Passed with one-line grounds:** Arcane Denial (counter #8, gifts a card) · Argentum Armor /
Meteor Sword (the 6-7-MV equip tier V2 just cut) · Auton Soldier / Sculpting Steel (copy suite
deliberately zeroed) · Bender's Waterskin (worse Talisman) · Blightsteel Colossus (12 MV brick +
infect sours bracket 3) · Buried Ruin (Academy Ruins covers it, repeatably) · Captain America's
Shield (good budget defense, lost to slots) · Chromatic Orrery / Gilded Lotus / Karn Legacy
Reforged (5-7 MV ramp; the problem is the early game) · Cityscape Leveler / Vision Spectral
Synthezoid / Darksteel Monolith / The Walls of Ba Sing Se (the 8-9-MV cheat tier is capped at
Forge + Ten Rings; Walls noted as a Forge alternative that also covers the commander) ·
Combustible Gearhulk (opponent picks the worse half) · Cosmic Cube / The Key to the Vault
(Buster Sword already covers cast-on-connect) · Daretti (loot/weld covered by Welder, Engineer,
Emry) · Iron Lad Diverging Destiny (weakest draw engine) · Iron Lad Young Avenger (*noncreature*
reducer — misses the commander; see Fix 1) · Iron Man Armored Avenger (prior grounds stand) ·
Iron Man Futurist Paragon (turns our artifacts into wipeable creatures) · Iron Man Modern Marvel
(MoM strictly better here) · Iron Spider / Steel Overseer / War Machine / Pinnacle Emissary /
Thopter Spy Network / Weapons Manufacturing / Mechanized Production (the true go-wide package —
take it only on a full pivot; Sai won the one token slot on per-cast rate) · Ironheart (5 MV
pseudo-reducer) · Jhoira's Familiar (4 MV reducer, lost to the 2-3 MV table) · Reliquary Tower
(Thought Vessel + Ten Rings cover it) · Scour for Scrap / Trash for Treasure (recursion role
full) · Solemn Simulacrum (fine, off-plan) · Stark's Ingenuity (aura — dies with the creature;
equipment doesn't) · Storm the Vault (slow flip, redundant Treasures) · Sword of the Animist
(ramp tax on a voltron slot) · The Aetherspark (slow loyalty; commander CAN deploy it, noted) ·
Unwinding Clock (needs untap payoffs we don't run) · Vision Quest (narrow tutor) · Swiftfoot
Boots (redundant with Champion's Helm) · Ruby/Sapphire Medallion (colour-worded — miss the
mostly-colourless 99; both DO hit the commander, lost to artifact-worded reducers).

## Pilot notes for V2

1. **Mulligan rule:** keep hands that can cast a reducer or an engine by turn 3, or that hold
   Command Beacon equity. The old "keep anything, commander fixes it" heuristic is what produced
   the dead games.
2. **Sequencing:** cast artifacts in main 1 (grow Sai/Jhoira/Fateful triggers), save the single
   biggest artifact in hand for the commander's free deploy at combat.
3. **Chandra's Ignition now kills your own dorks** — it's a finisher, not a reset button.
4. **Hulkbuster vs Aettir and Priwen both SET base P/T** — layer 7b, later timestamp wins.
   Attach whichever you want to apply *last*; re-equipping refreshes its timestamp.
5. **Master Transmuter + The One Ring:** putting the Ring onto the battlefield is not casting
   it — no protection trigger ("if you cast it").
6. **Wizard's Staff on Master of Machines** doubles the attack draw; on the commander it still
   doubles the deploy trigger.
7. If V2 is promoted to `DECK.md`: snapshot V1 to `versions/`, rebuild STATUS.md, re-point the
   SIDEBOARD.md rows that displaced now-cut cards (Soul's Fire → Seize the Day, Disrupt
   Decorum → Overpowering Attack, and the four rows that displaced Phyrexian Metamorph), update
   pdf.json, and regenerate the PDF.

## Open question carried forward

Glamdring vs Aettir and Priwen is still open; nothing in this package touches that slot (A&P
kept — the pilot's 37/37 plan and Hulkbuster's timestamp note both assume it).

---

## Amendment — same day, pilot review (2026-08-20)

The pilot reviewed the 14 swaps and overrode four cuts; applied as follows (list stays 100):

- **Back in: Ultima Weapon** (pilot's call — the attack trigger is pre-blocks blocker removal,
  which the voltron plan wants) and **Portal to Phyrexia** (pilot's call — reanimates from ANY
  graveyard each upkeep, so it also recurs our own creatures, and steals theirs).
- **Krang, Utrom Warlord back in over Darksteel Forge — the pilot was right and this was a
  repeat of a logged mistake** (LEDGER 2026-08-06, "proposed cutting a card that the same swap
  package makes better"): the package itself grew the artifact-creature count from ~7 to ~12
  bodies plus every Thopter/Construct token, which is exactly what Krang's anthem multiplies —
  and the flipped commander is an artifact creature, so Krang grants HIM indestructible too.
  Forge to the bench: it still covers what Krang can't (Equipment, rocks, noncreature artifacts)
  — first re-add if artifact wipes show up in the pods.
- **To make room, the two weakest adds left:** Thoughtcast (Thought Monitor is the same affinity
  draw-2 with a flying blocker attached) and Emry (recursion #4 behind Welder / Engineer /
  Academy Ruins, and Portal now recurs creatures).
- **Extinguisher Battleship → V2 sideboard** (pilot's call): the "wipe everything, leave only
  Iron Man" button for late game or pods where our dork board is expendable. Its ETB strafes our
  own ≤4-toughness creatures — bring it in knowingly.
- **Extra combats challenged and defended:** the double-deploy-trigger / one-turn-kill line is
  kept via the three repeatable effects (Genji Glove, Hexplate, Aggravated Assault). Savage
  Beating named as the fourth if wanted.
- **Vigilance question (from the Excalibur cut):** nothing in V2 grants vigilance now; Genji
  Glove's attack-untap is the functional substitute. Captain America's Shield ({2}, +0/+8,
  vigilance, indestructible, taps a defending blocker) is the named option if true vigilance is
  wanted.
- **36 lands defended:** the re-added top end (Ultima 7 / Portal 9 / Krang 9) is cheat-target,
  not cast-target — the cast curve stays low. Fomori Vault is the first re-add on observed screw.

Final V2 counts: Lands 36 · Ramp 7 · Reducers 5 · Draw/Engines 8 · Tutors/Recursion 4 ·
Cheat & Attach 2 · Interaction 9 · Wipes 2 · Equipment 17 · Payoffs/Creatures 8 ·
Extra Combats 1 · Commander 1 = 100. GC 3/3. Sticker $1,202.93.

**V2 bench (updated):** Darksteel Forge · Extinguisher Battleship · Emry · Thoughtcast ·
Iron Man, Bleeding Edge · Swordsman's Steel · Captain America's Shield · Savage Beating ·
Training Grounds · the cast-off-top package (Mystic Forge / Sensei's Top / Crystal Skull /
Reality Chip) · Desynchronization / Propaganda / Aetherize / Spellskite / Basilisk Collar /
Shadowspear / Untimely Malfunction (meta tier).

---

## Amendment 2 — pilot's defense-and-removal package (2026-08-20)

Pilot directives, applied: **Krang → Darksteel Forge reverted back** (pilot reconsidered after
hearing Forge covers Equipment/rocks); **Captain America's Shield** in (vigilance);
**Basilisk Collar** in (the lifelink the pilot asked for — chosen over Shadowspear because
deathtouch makes every block lethal and turns Chandra's Ignition into a toughness-proof wipe of
enemy boards); **Propaganda** in; **Argentum Armor** and **Meteor Sword** in on the pilot's call,
against the curve argument, under one pilot rule: **deploy targets, never hard-casts.**

Five cuts, ranked within roles: Adaptive Omnitool (only Equipment left with no unique rider) ·
Thought Monitor (draw still deep) · Armor Wars (chapter I feeds every opponent a card; dies after
three turns) · Solve the Equation (Fabricate is the better tutor now — it finds the exact
silver-bullet Equipment) · Hexplate Wallbreaker (extra combats = Genji Glove + Aggravated
Assault; **first re-add** if two effects plays thin).

Final counts: Lands 36 · Ramp 7 · Reducers 5 · Draw/Engines 6 · Tutors/Recursion 3 ·
Cheat & Attach 2 · Interaction & Defense 10 · Wipes 2 · Equipment 19 · Payoffs/Creatures 8 ·
Extra Combats 1 · Commander 1 = 100. GC 3/3. Sticker $1,224.53.

## V2 gameplan

**Turns 1–3 — build the engine, not the threat.** Reducers (Sculptor / Mechanaut / Shuri /
Inspector / Cloud Key), rocks, Blacksmith's Talent, Sai/Jhoira. Front-face Tony on 2 only when
safe or when the {1}-dig matters; he's also fine as a late Hulkbuster carrier. Mulligan rule:
keep hands with a reducer, an attach engine, or a ≤3-MV engine — never "commander will fix it."

**Turns 3–5 — commander, cheaply.** With two reducers he's 4 (recasts 6 / 8, not 8 / 10).
Alternate lines: Command Beacon; front face + {4}{U}{R} transform (untaxed, uncounterable);
or don't flip at all — Hulkbuster's Equip Hero {3} makes un-flipped Tony a 9/9 flier.

**Every combat — two free deploys.** The deploy trigger places the biggest artifact in hand;
Wizard's Staff doubles that trigger (two artifacts per combat). Hammer/his own trigger attach
Equipment free; Blacksmith's Talent L2 re-suits anything stranded. Priority order for the suit:
survival first (Collar for lifelink, Shield for vigilance, Helm/Plate/Mithril), then damage
(Mjölnir, Embercleave, Aettir), then removal sticks (Ultima, Argentum).

**Defense stack (the fix for the aggro losses):** Propaganda taxes; Shield makes Tony a
1/11 vigilant wall as early as turn 3; Wurmcoil + Sai thopters + the reducer bodies block;
Collar lifelink refills — and **lifelink grows Aettir and Priwen**: life gain raises X
immediately (CDA, continuously updated), so each connection makes the NEXT combat or the
Ignition bigger. Mjölnir doubles damage, therefore doubles the lifegain.

**Removal on sticks:** Meteor Sword's ETB is a free Vindicate on every entry — Goblin Welder
can loop it (weld it out and back = one destroy per turn). Argentum destroys any permanent per
attack; Ultima shoots the blocker before blocks.

**Kills:** (1) Commander damage — suited commander + Genji Glove is two combats every turn;
21 arrives fast with Mjölnir/Embercleave/Aettir. (2) Aggravated Assault + Reaver Cleaver or
Sword of Feast and Famine = infinite combats. (3) Chandra's Ignition off a huge Aettir commander
(with Collar attached, every enemy creature dies to deathtouch and the lifegain is enormous —
but remember it still kills OUR dorks). (4) Knuckles' thirty-artifact win in long games.

**Matchups:** creature decks — Propaganda + Shield-wall + Wurmcoil, hold Blasphemous;
pingers/storm — Collar lifelink + counter suite, race with Genji double combats; wipe-heavy —
keep one recast's mana banked, Beacon in reserve, Blacksmith re-suits the next body; artifact
mirrors — Forge, and Vandalblast off the V1 sideboard.

---

## Amendment 3 — first game night on V2 (2026-08-20)

**Play report: V2 "played A LOT better."** Only structural complaint: blue mana screw
(specifically blue, not colorless). The creature-deck matchup stayed hard, but the whole table
struggled against that deck — no change warranted.

**Swap applied: Adaptive Omnitool in, Mind Stone out** (pilot's pick from the ranked candidates;
Buster Sword was the recommendation, Mind Stone the pilot's — and the blue-screw report supports
it: Mind Stone is the one source whose loss can't worsen a blue problem). Omnitool's re-add
grounds, credited to the pilot: it is the deploy engine's ammo feeder — the attack-trigger dig
resolves at declare attackers (CR 508.3a), AFTER that combat's beginning-of-combat deploy
(CR 507), so the found artifact deploys in the SAME turn only via an extra combat's fresh
beginning-of-combat step (Genji Glove / Aggravated Assault), otherwise next turn. Wizard's Staff
doubles the dig.

**Bookkeeping:** the V1 sideboard rows that displace Mind Stone (Urza, Lord High Artificer /
Grim Monolith / Mana Vault) should displace **Thought Vessel** in V2 terms. Physical swap sheet
correction: keep the Adaptive Omnitool card in the deck, pull Mind Stone instead — no new proxy
needed.

**Blue screw, open item:** sources are U23 / R20 after the basics flip; the blue-pip demand rose
with the rebuild. Named fix if it recurs: **Thought Vessel → Izzet Signet** (turns a colorless
rock into a U/R fixer; the no-max-hand-size rider is partially covered by The Ten Rings). Second
lever: one more Mountain → Island flip is NOT recommended (R20 → R19 strains Blacksmith's
Talent, the Goblins, and the {R}{R} costs).

Counts: Ramp 6 · Equipment 20 · total 100/100, GC 3/3.
