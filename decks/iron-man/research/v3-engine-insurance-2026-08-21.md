# V3 — engine + insurance (2026-08-21)

**Built to A/B against V2.** `DECK-V2.md` is preserved unchanged so the two can be compared on
the same three complaints. `DECK.md` is still untouched V1.

## The pilot's report on V2

1. **Can't finish games.** Removal strips the +X/+X pieces and the commander needs an extra turn
   or two to close.
2. **Targeted removal 2-for-1s the suit.** Opponents kill the Equipment first, then the commander.
   Commander's Plate + Sword of Feast and Famine still leave him open to U/R removal.
3. **Repeatable draw is the weakest spot** — and one more draw card doesn't fix it, because you
   never draw the one card.

## Thesis: all three are one problem

The deck deploys ~1 artifact per combat, holds 21 Equipment, and has exactly **two** cards that
convert artifacts into cards (Fateful Discovery + Panharmonicon). So: redundant swords crowd out
engines, there's no card flow to rebuild after removal, and the deck never digs to its kill.
**The finishers are fine. Reaching them isn't.**

## Finding 1 — the finisher is already lethal; it is a multiplier, not a stat pile

Verified: **The Invincible Iron Man is a 5/5** (Scryfall, back face). Mjölnir doubles all damage
he deals; double strike is two damage events, each doubled → **damage per combat = 4 × power**.

| Suit | Damage to one player, one combat |
|---|---|
| bare 5/5 + Mjölnir + double strike | 20 — **one short of 21** |
| 5/5 + Embercleave (+1/+1 **and** double strike **and** trample) + Mjölnir | **24 = lethal commander damage** |
| Aettir and Priwen (X = life total ~40) + Mjölnir + double strike | ~160 |
| Chandra's Ignition with Mjölnir attached | 2 × power to **each** opponent (60–80 with Aettir) |

**Mjölnir + Embercleave is a two-card kill**, both free-deployable, and Wizard's Staff doubles the
deploy trigger so both can land in one combat. Consequence for piloting: **suit for multipliers +
evasion first**, not for +X/+X. Argentum Armor's +6/+6 is worth less here than Embercleave's +1/+1.

## Finding 2 — cast-matters payoffs are structurally wrong in a deploy deck

Sai reads *"whenever you **cast** an artifact spell."* This deck's whole design is cheating
artifacts in (deploy trigger, Master Transmuter, Goblin Welder, tokens). The aligned trigger is
**"an artifact you control enters"** — which tokens and free deploys both satisfy. Standing rule:
**enters-matters only.** (Same shape as the double-tax rule, one layer deeper.)

## Finding 3 — in this deck, artifact tokens ARE cards

Fateful Discovery draws on *any* artifact entering, tokens included; Panharmonicon doubles it.
One token = 2 cards, and each token also pings every opponent off Ingenious Artillerist and can
make a Construct off Simulacrum Synthesizer. So token production = draw + damage + board.

**Redundancy check (measured):** searched `id<=ur o:"artifact you control enters" o:"draw a card"`
— six hits, and **Fateful Discovery is the only true draw**; Rook Turret and Transplant Theorist
are loot (draw-then-discard, filtering not advantage), the rest are off-plan. That single point of
failure is why V3 adds a draw engine that does **not** route through Fateful Discovery.

## The V3 package — 5 in, 5 out

### IN

| Card | Direction | Grounds |
|---|---|---|
| **Thopter Spy Network** {2}{U}{U} | A | A flying artifact token **every upkeep, guaranteed** (= a Fateful trigger, doubled by Panharmonicon) **plus** "artifact creatures deal combat damage → draw." Repeatable draw that doesn't depend on Fateful, and it's an **enchantment** — survives every wipe. |
| **Weapons Manufacturing** {1}{R} | A | *"Whenever a nontoken artifact you control enters, create a Munitions token."* Enters-matters, so it **doubles the number of artifacts entering** — every free deploy becomes two Fateful triggers (four with Panharmonicon) and two Artillerist pings. Munitions deal 2 damage when they leave, and they're free Master Transmuter bounce fodder. Enchantment, {1}{R}, wipe-proof. |
| **Vedalken Orrery** {4} | B | Flash on **everything**: build the suit at the opponent's end step so sorcery-speed removal never gets a window, recast the commander at instant speed after a wipe, flash Chandra's Ignition. Changes the exposure profile rather than adding another shield. |
| **Padeem, Consul of Innovation** {3}{U} | B | The **only** mass artifact-hexproof in Izzet (verified by search). Directly answers "they snipe the Equipment first" — Champion's Helm covers only the commander and Darksteel Forge covers only *destroy*. Upkeep draw is near-guaranteed here. Weakness acknowledged: a non-artifact 4-drop body that dies to wipes; he is a layer, not the fix. |
| **Iron Man Armor** {3} | pilot's pick / C | Free attach on ETB, +2/+1 and flying, and `{2}`: becomes a 0/0 with *"+1/+1 for each artifact you control"* and flying — a ~16/16 flier at instant speed. **It is an Equipment almost always, so creature removal and creature wipes cannot pre-empt it**; that is a threat the removal-heavy pods structurally can't answer. Corrections for the pilot: it animates **itself only** (Cyberdrive Awakener is the mass-animator), animating it while attached **unattaches it** (CR 301.5c), and it can attack the turn it animates if it was on the battlefield when the turn began (CR 302.6). |

### OUT

| Card | Grounds |
|---|---|
| **Hulkbuster Armor** | Pilot-confirmed: never drawn or played across all games; a base 9/9 and nothing else. |
| **Ultima Weapon** | **Dominated by Argentum Armor on the pilot's own criterion.** Both destroy on attack; Argentum destroys *target permanent*, Ultima only *target creature* — so Argentum is the one that answers the problematic enchantment the pilot cited, and it equips for {6} vs {7}. Keeping the strictly broader card, not cutting the role. |
| **Meteor Sword** | MV 7, one-shot ETB removal (Panharmonicon doubles it, which is why it survived the last pass). The removal-on-a-stick tier goes 4 → 1. |
| **Buster Sword** | Its connect payoff is now quadruple-covered: Adaptive Omnitool's dig, Master of Machines' attack draw, Thopter Spy Network's connect draw, Fateful. Noted honestly: its free cast *does* feed The Vision and Scarlet Witch — that's the cost of this cut. |
| **Sai, Master Thopterist** | Finding 2 — cast-matters in a deploy deck. Thopter Spy Network is the enters/upkeep version of the same card and is wipe-proof. The pilot's own fix (more Treasures for the sac-draw) is delivered better by other cards. |

### Amendment, same day — Academy Manufactor in, Strix Serenade out (pilot's call)

**Academy Manufactor** was on the bench pending a fourth Treasure source; the pilot took it
anyway on a synergy I had underweighted: at **exactly MV 3** it sits at the ceiling of Goblin
Engineer's *"return target artifact card with mana value 3 or less from your graveyard to the
battlefield"* — so Engineer both tutors it into the yard and is the only card that can rebuy it
after removal, which is the whole point of this version. It also enters as an MV-3 artifact
(Fateful draw, Artillerist ping, and a Simulacrum Synthesizer Construct), and its Food half feeds
Aettir and Priwen's life-total P/T while its Clue half is more draw.

**Cut: Strix Serenade** — the principled one, because it is *"counter target artifact, creature,
or planeswalker spell"*: **it cannot counter a removal spell**, which is the exact problem this
version exists to solve. Swan Song (enchantment/instant/sorcery), Counterspell (anything) and
Fierce Guardianship (noncreature) all can, and all three stay. Counters 4 → 3 plus Deflecting
Swat. Interaction 9 → 8; Payoffs 9 → 10.

**Equipment 21 → 18. Draw/Engines 8 → 9.** Everything else untouched, so the A/B against V2 is
clean. Validated: 100/100, section headers match contents, 3/3 Game Changers, no legality or
colour-identity flags, sticker $1,281.33.

**Bookkeeping:** V2's `Artifact Payoffs / Creatures` header read (10) while holding 9 cards —
header drift from an earlier edit (the list total was always correct at 100). Corrected in V3.

## Bench, ranked, if V3 wants more of the same

- **A fourth Treasure source** (Xorn / Professional Face-Breaker / Storm the Vault) — the one
  upgrade that makes Academy Manufactor better than it already is. Current sources: Treasure
  Vault, The Reaver Cleaver, Iron Man Titan.
- **Shimmer Myr** — the cheaper Orrery ({3}, artifact spells only, with a body).
- **Rook Turret / Transplant Theorist** — loot-on-artifact-enters; filtering, not advantage.
- **Cyberdrive Awakener** — the real mass-animator (direction C in one card).
- **Mystic Forge + Sensei's Divining Top** — the "library as hand" package; take two or none.

## Piloting notes new to V3

1. **Deploy at their end step, not on your turn** (Orrery / the flash line). The 2-for-1 happens
   because the suit sits exposed through a full turn cycle.
2. **Suit for the kill, not the stats:** Mjölnir first, then a double-strike source (Embercleave /
   Genji Glove / Blacksmith's Talent L3), then evasion. 24 damage beats +6/+6.
3. **Watch the draw ceiling.** Fateful Discovery is a *mandatory* draw. With Panharmonicon out and
   a large Treasure batch (Reaver Cleaver connect, doubled by Mjölnir), the trigger count can get
   very high — count your library before a huge Treasure turn.
4. **Iron Man Armor is a held threat**, not a suit piece — leave it unattached when you expect a
   wipe, animate it after.
