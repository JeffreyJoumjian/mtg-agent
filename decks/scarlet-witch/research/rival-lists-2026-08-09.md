# Rival Wanda lists — card-by-card diff — 2026-08-09

Two decks seen in the wild, diffed against `DECK.md`. **Every card they run that we don't is in
this file — all 67, no exceptions.**

> **Updated 2026-08-10.** One card was added that is **not** on either rival list —
> [Conqueror's Flail](https://scryfall.com/search?q=%21%22Conqueror's+Flail%22), evaluated on
> request. It is flagged as off-list wherever it appears, so the 67-card diff stays exact. Its
> analysis also downgraded the Boseiju entry in Tier 3.

| | Deck | Cards |
|---|---|---|
| **A** | [Wanda Vision](https://moxfield.com/decks/Gc8wXq4TmUuJfp7exqPznw) | 100 · 29 Mountain · big-mana haymaker + pinger hybrid |
| **B** | [Manasplaining — RED DECK WITCH](https://moxfield.com/decks/0FoiEd2r0EiNem9iuOPwOg) | 100 · 20 Mountain · pump-for-discount voltron |

Computed, not eyeballed: lists pulled from Moxfield, diffed against `DECK.md` / `DECK-B4.md` /
`SIDEBOARD.md`, and every oracle text below re-read from Scryfall today. Raw lists are in
`../samples/wanda-vision.txt` and `../samples/manasplaining-red-deck-witch.txt`.

**None of the 67 is a Game Changer**, so nothing here threatens our 3/3 Bracket 3 budget.

---

## The headline

**Two clean swaps, and neither is the card that prompted this.**

- **[Conqueror's Flail](https://scryfall.com/search?q=%21%22Conqueror's+Flail%22) in for
  [Hexing Squelcher](https://scryfall.com/search?q=%21%22Hexing+Squelcher%22)** — the strongest
  card in this whole document, and it isn't on either rival list. Added 2026-08-10 at your request;
  see its own section below.
- **[Tavern Brawler](https://scryfall.com/search?q=%21%22Tavern+Brawler%22) in for
  [Cait Sith, Fortune Teller](https://scryfall.com/search?q=%21%22Cait+Sith%2C+Fortune+Teller%22)** —
  same effect, better timing, better card type, 25¢.
- [Ring of Valkas](https://scryfall.com/search?q=%21%22Ring+of+Valkas%22) is real but loses to
  [Blackblade Reforged](https://scryfall.com/search?q=%21%22Blackblade+Reforged%22) on rate.
- Four genuine close calls below that I'd take to a vote.
- 20 of the 67 are cards our repo already evaluated and filed.

---

## Tier 1 — make space for it

### [Conqueror's Flail](https://scryfall.com/search?q=%21%22Conqueror's+Flail%22) — {2}, $3.73 · **not on either list** — added 2026-08-10

> Artifact — Equipment. *Equipped creature gets +1/+1 for each color among permanents you control.
> As long as this Equipment is attached to a creature, your opponents can't cast spells during your
> turn. Equip {2}.*

**Swap in for [Hexing Squelcher](https://scryfall.com/search?q=%21%22Hexing+Squelcher%22).**

Read the two abilities separately, because only one of them is doing anything here.

**The pump is dead.** *"+1/+1 for each color among permanents you control"* — we are mono-red, and
colorless is not a color, so our Treasures and Iron Man's Robot tokens contribute nothing. The count
is **1**, so this is a +1/+1 Equipment. Do not run it for the pump;
[Blackblade Reforged](https://scryfall.com/search?q=%21%22Blackblade+Reforged%22) gives roughly +8.

**The second ability is the best protection effect available to this deck.** Our whole gameplan is
*survive to one turn, then resolve one enormous spell.* Everything that beats us — a counterspell on
Crackle with Power, a Swords to Plowshares on Wanda in response to Chandra's Ignition, an
instant-speed artifact wipe on Fiery Emancipation — is an opponent casting a spell **during our
turn**. Flail turns all of it off at once, proactively, for the entire turn, from a permanent.

Compare that to what it displaces. Hexing Squelcher gives *"spells you control can't be countered"*
plus Ward—pay 2 life, which is real, but:

- It only answers **counterspells**. It does nothing about targeted removal, which is the more common
  way this deck actually loses its combo turn.
- It is a **2/2**, so our own Fiery Confluence (1 damage to each creature, taken three times) and
  Chandra's Ignition ("each *other* creature") both kill it — the §1.3 self-hit, on the very turn we
  most need it alive.
- It is **$20.41** against the Flail's $3.73.

Flail is an Equipment, so no sweeper of ours touches it, and during our turn its lockout covers
counterspells *as well as* everything Squelcher never did.

**Two caveats that change how you play it, not whether you run it:**

1. It must be **attached to a creature** for the lockout. The window to break it is on *their* turn
   or in response to the equip — kill the creature and the Flail falls off.
2. Therefore **do not default to equipping Wanda.** She is the removal magnet. Attach it to a spare
   body — a Robot Hero token, Storm-Kiln Artist, Livaan — and the lockout survives Wanda dying.

**The alternative cut,** if your pods are blue-heavy enough that you want counter-immunity on *all*
turns rather than just yours: keep Squelcher and cut
[Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22) instead — its hexproof
overlaps with the protection-from-four-colors already on
[Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22).

Colorless identity, commander-legal, **not a Game Changer** — our 3/3 Bracket 3 budget is untouched.

---

### [Tavern Brawler](https://scryfall.com/search?q=%21%22Tavern+Brawler%22) — {2}{R}, $0.25 · deck B

> Legendary Enchantment — Background. *Commander creatures you own have "At the beginning of your
> upkeep, exile the top card of your library. This creature gets +X/+0 until end of turn, where X is
> that card's mana value. You may play that card this turn."*

**Swap in for [Cait Sith, Fortune Teller](https://scryfall.com/search?q=%21%22Cait+Sith%2C+Fortune+Teller%22).**

We already run this exact effect on Cait Sith — *"exile the top card, you may play it this turn,
target creature gets +X/+0 where X is that card's mana value."* Three differences, all in Tavern
Brawler's favour for our plan:

1. **Timing is the whole argument.** Cait Sith triggers *at the beginning of combat on your turn* —
   after your precombat main phase is over. Tavern Brawler triggers *at your upkeep*, so the pump is
   live for **both** main phases. Wanda's discount is applied as you cast, so a pump that lands at
   combat cannot discount a precombat haymaker. This is the same trap as our Neheb sequencing note,
   pointed the other way.
2. **It's an enchantment.** It catches Longshot and Artist's Talent L2 (noncreature reducers) that
   never touched Cait Sith's creature body, and it survives our own Fiery Confluence and Chandra's
   Ignition. Cait Sith is a 3/3 that our own Ignition kills.
3. **Cost.** {2}{R} versus {3}{R}, and it floors lower under the reducers.

**The honest counter — and it's real:** Tavern Brawler only buffs *commander creatures you own*. If
Wanda is dead or in the command zone, it is a blank card. Cait Sith pumps *any* creature and throws
in a scry 1. If you want the safer card, keep Cait Sith. I think the deck is already so
Wanda-dependent that this changes little.

Being a Background is irrelevant here — our commander has no *Choose a Background*, so it's simply
an enchantment in the 99.

---

## Tier 2 — the genuine close calls

These four I'd argue either way. Each names what it would displace.

### [Unleash Fury](https://scryfall.com/search?q=%21%22Unleash+Fury%22) — {1}{R}, $0.44 · deck B
*Double the power of target creature until end of turn.*

Our `considered-and-cut.md` has a "cut on principle: one-shot combat pump" group, but read the
stated grounds: *"these cost a card to add +2 or +3 power for one turn, which is roughly one extra
discount — a bad trade."* **Those grounds do not cover this card.** Unleash Fury doesn't add a flat
+2; it *doubles*. On a Wanda at 10 it is +10 power, which is +10 off every instant and sorcery at
MV 4+ for the rest of the turn — it pays for itself several times over on a real turn.

The catch is the mirror image: it's a multiplier, and per §2.5 a multiplier needs a payoff. At 2
power it does nothing. **Displaces:** [Blazing Shoal](https://scryfall.com/search?q=%21%22Blazing+Shoal%22)
is the comparison — Shoal is free but needs a fat red card in hand to exile.

### [Bionic Blow](https://scryfall.com/search?q=%21%22Bionic+Blow%22) — {X}{R}{R}, $0.26 · deck B
*Target creature you control gets +X/+0 until end of turn. Then it deals damage equal to its power
to up to one other target creature.*

Removal that *also* advances the pump plan, and it's an X-spell so Wanda discounts it at X ≥ 2.
Point it at Wanda: she grows (bigger discount for the rest of the turn) and then snipes a creature
for her full pumped power, which is usually "destroy target creature, no questions." Two of our
axes on one card for 26¢.

Only hits creatures, never a player — so it's removal, not reach.
**Displaces:** [Zuko's Exile](https://scryfall.com/search?q=%21%22Zuko's+Exile%22) in the Removal
role (currently 8).

### [Wanda's Vision](https://scryfall.com/search?q=%21%22Wanda's+Vision%22) — {3}{R}{R}, $6.25 · deck B
*Whenever you cast your second spell each turn, exile cards from the top of your library until you
exile a nonland card. You may cast that card without paying its mana cost.*

A free spell every single turn, on a trigger our deck meets trivially. Enchantment, so it survives
our sweepers and catches our noncreature reducers.

**The gotcha we already documented bites here:** free-casting forces **X = 0** (rule 107.3b). Our
best cards — Crackle with Power, Jaya's Immolating Inferno, Storm King's Thunder, Electrodominance —
all fizzle to 0 damage off this trigger. It hits Fiery Emancipation, Volcanic Vision or Brass's
Bounty beautifully, and hits Crackle for nothing.

### [Primal Amulet // Primal Wellspring](https://scryfall.com/search?q=%21%22Primal+Amulet%22) — {4}, $12.01 · deck B
*Instant and sorcery spells you cast cost {1} less. Whenever you cast an instant or sorcery, put a
charge counter on it; at four counters you may transform it.* → *{T}: Add one mana of any color.
When that mana is spent to cast an instant or sorcery spell, copy that spell.*

`LEDGER.md` says cost-reducer redundancy is the one place redundancy is unambiguously right, and the
flip side is a **repeatable spell-copier on a land** — that's a genuine engine, not just a rock.

Against it: {4} is steep for a {1} reduction when Ruby Medallion costs {2}, and you need four
instants/sorceries after that before it flips. That's a long runway for a deck aiming to win on
turn six to eight. **Displaces:** [Tablet of Discovery](https://scryfall.com/search?q=%21%22Tablet+of+Discovery%22).

---

## Tier 3 — sideboard, with the trigger to bring it in

| Card | In | What it does | Bring it in when |
|---|---|---|---|
| [Boseiju, Who Shelters All](https://scryfall.com/search?q=%21%22Boseiju%2C+Who+Shelters+All%22) | B | Land. {T}, pay 2 life: add {C}; if spent on an instant/sorcery, **that spell can't be countered**. | **Downgraded 2026-08-10.** Yesterday's entry called this "the cleanest insurance on the list" and overlooked that [Hexing Squelcher](https://scryfall.com/search?q=%21%22Hexing+Squelcher%22) already grants *"spells you control can't be countered"* from inside the 100 — and that Conqueror's Flail covers our own turn far more broadly. Boseiju protects **one** spell, only if you spend that specific mana on it, for 2 life, off a land that doesn't bank under Electro/Ashling. Bring it in only if both of those leave the deck. |
| [Repercussion](https://scryfall.com/search?q=%21%22Repercussion%22) | B | {1}{R}{R} enchantment. Whenever **a** creature is dealt damage, deal that much to that creature's controller. | Creature-heavy pods. With our Chandra's Ignition it converts a board wipe into a table kill. **Symmetric** — our own Fiery Confluence and their removal both point it back at us. |
| [Ojer Axonil, Deepest Might](https://scryfall.com/search?q=%21%22Ojer+Axonil%2C+Deepest+Might%22) | B | {2}{R}{R} 4/4 trample. Red sources you control that would deal *less* noncombat damage than its power to an opponent deal that much instead. | **Corrected 2026-08-10 — it is worse than yesterday's entry claimed.** [Artist's Talent](https://scryfall.com/search?q=%21%22Artist's+Talent%22) **Level 3**, already in the deck, adds +2 to noncombat damage dealt to opponents. Both are replacement effects, and per **CR 616.1** the *affected player* — the opponent — chooses the order. On Fiery Inscription's 2 they will apply Artist's Talent first (2 → 4), after which Ojer no longer applies because 4 is not *less than* 4. Final damage 4, exactly what Artist's Talent alone produced. Ojer only adds anything while Artist's Talent is below L3. $22 for a redundancy. |
| [Nico Minoru, Runaway](https://scryfall.com/search?q=%21%22Nico+Minoru%2C+Runaway%22) | B | {3}{R} 2/4. 2 damage to each opponent whenever you cast a spell **from anywhere other than your hand**; {2}{R},{T}, discard: impulse a free nonland. | Long games. We cast from graveyard and exile constantly (Past in Flames, Mizzix's Mastery, Commune with Lava, Arcane Bombardment), so it triggers a lot. $23.54 and the Win Conditions role is already 2 over target. |
| [Ring of Valkas](https://scryfall.com/search?q=%21%22Ring+of+Valkas%22) | B | {2} Equipment. Haste; **+1/+1 counter at your upkeep if equipped creature is red**; equip {1}. | Slow, grindy tables. See the note below — Blackblade beats it on rate but the counters are permanent. |
| [Red Elemental Blast](https://scryfall.com/search?q=%21%22Red+Elemental+Blast%22) | A | {R} instant. Counter target blue spell, or destroy target blue permanent. | Blue decks, full stop. Dead card otherwise. |
| [Arcane Lighthouse](https://scryfall.com/search?q=%21%22Arcane+Lighthouse%22) | B | Land. {1},{T}: opponents' creatures lose hexproof **and shroud** and can't have it. | Hexproof voltron commanders. Strictly better than Detection Tower for this — it strips shroud too and hits every creature. |
| [Detection Tower](https://scryfall.com/search?q=%21%22Detection+Tower%22) | B | Land. {1},{T}: opponents and their hexproof creatures can be targeted. | Same slot as Lighthouse; take Lighthouse. Its edge is reaching hexproof *players*. |
| [Redirect Lightning](https://scryfall.com/search?q=%21%22Redirect+Lightning%22) | A | {R} + pay 5 life or {2}. Change the target of a spell/ability with a single target. | The upgrade to the Bolt Bend slot we already sideboarded — no 4-power requirement. We chose Return the Favor for its copy mode, which this lacks. $10.80. |
| [Emergence Zone](https://scryfall.com/search?q=%21%22Emergence+Zone%22) | B | Land. {1},{T}, sac: cast spells this turn as though they had flash. | Pods with sorcery-speed removal you want to dodge, or to end-step a haymaker. Narrow and it eats a land slot. |
| [Kazuul's Fury // Kazuul's Cliffs](https://scryfall.com/search?q=%21%22Kazuul's+Fury%22) | B | {2}{R} instant, sac a creature, damage = its power to **any target**; back face is a tapped land. | Blocker-heavy tables. MDFC means near-zero opportunity cost. Sacrificing a 20-power Wanda for 20 to the face dodges every blocker — but raises commander tax and turns off the engine. |
| [Fists of Flame](https://scryfall.com/search?q=%21%22Fists+of+Flame%22) | B | {1}{R} instant. Draw a card; target creature gains trample and +1/+0 per card drawn this turn. | The one combat pump that meets our own "must replace itself" bar. Still one-shot, and the deck moved away from this plan — Monstrous Rage and Blazing Crescendo are both already sideboarded. |
| [Spinerock Knoll](https://scryfall.com/search?q=%21%22Spinerock+Knoll%22) | B | Land, hideaway 4. {R},{T}: play the exiled card free if an opponent was dealt 7+ damage this turn. | Cheap ($1.49) and we clear 7 damage routinely. Enters tapped, and the free cast forces X = 0 on our best spells. |
| [Throne of Eldraine](https://scryfall.com/search?q=%21%22Throne+of+Eldraine%22) | B | {5} legendary artifact. {T}: add **four** mana of the chosen colour (all our spells are mono-red); {3},{T}: draw two. | Big-mana builds. Red mana, so it banks under Electro/Ashling. But Gauntlet of Power costs the same and does more behind 21 Mountains. $28.27. |
| [Asgardian Inspiration](https://scryfall.com/search?q=%21%22Asgardian+Inspiration%22) | B | {R} sorcery. Impulse the top card; return it from your graveyard for {2} whenever a source you control deals noncombat damage to an opponent. | Attrition games. 42¢ for a red one-drop that never runs out — our deck triggers the rebuy constantly. Draw role is already 12 deep. |
| [Rite of Flame](https://scryfall.com/search?q=%21%22Rite+of+Flame%22) | A | {R}: add {R}{R} (+{R} per Rite of Flame in any graveyard). | It's a third copy of Pyretic/Desperate Ritual — same net +1, lower entry point so it chains off a single land. Not an upgrade over either, just more of the effect. $5.58. |

---

## Tier 4 — keep out, with the deciding reason

| Card | In | What it does | Why it stays out |
|---|---|---|---|
| [Lady Loki, Agent of Chaos](https://scryfall.com/search?q=%21%22Lady+Loki%2C+Agent+of+Chaos%22) | A | {5}{R} 5/5. On your first instant/sorcery each turn, **exile it**, then impulse until a nonland; damage = the MV difference; cast that card free. | It **exiles your own spell** — the haymaker you cast never resolves. Actively hostile to a deck built on resolving specific big spells. |
| [Fire Nation Palace](https://scryfall.com/search?q=%21%22Fire+Nation+Palace%22) | A | Land. {1}{R},{T}: target creature gains firebending 4 (on attack, add {R}{R}{R}{R}). | The mana lasts **until end of combat**. Our haymakers are sorceries, which can't be cast in combat, so the four mana evaporates unspent. |
| [Flashback](https://scryfall.com/search?q=%21%22Flashback%22) | A | {R} instant. Target instant/sorcery in your graveyard gains flashback equal to its mana cost. | Genuinely dodges the X = 0 trap (you pay the cost). But **Past in Flames** already gives flashback to *every* instant and sorcery in the yard for {2}{R}, and it's already in the deck. |
| [The Immortal Weapons](https://scryfall.com/search?q=%21%22The+Immortal+Weapons%22) | B | {4}{R} 4/4. ETB regrow an instant/sorcery; on each noncreature spell, target creature gets +2/+0 and menace. | A worse **Livaan** — Livaan gives +X/+0 where X is the *spell's mana value* (so 4–8 for us, not a flat 2) and costs {2}{R} instead of {4}{R}. |
| [Elemental Eruption](https://scryfall.com/search?q=%21%22Elemental+Eruption%22) | A+B | {4}{R}{R} storm. Create a 4/4 flying prowess Dragon. | Builds a creature board that our own **Chandra's Ignition** ("each *other* creature") wipes. Same self-hit that cut Young Pyromancer, just with bigger bodies. |
| [Surge to Victory](https://scryfall.com/search?q=%21%22Surge+to+Victory%22) | B | {4}{R}{R}. Exile an instant/sorcery from the yard, team gets +X/+0; on combat damage, copy and cast it free. | Needs a board, needs to attack, needs to connect — then the free cast forces X = 0 anyway. Three conditions too many. |
| [Path of the Pyromancer](https://scryfall.com/search?q=%21%22Path+of+the+Pyromancer%22) | B | {4}{R}. Discard hand, add {R} per card, draw that many +1. Then a *Will of the Planeswalkers* vote. | The vote clause is a Planechase mechanic and is dead in a normal game. We already run three wheels. |
| [Tibalt's Trickery](https://scryfall.com/search?q=%21%22Tibalt's+Trickery%22) | A+B | {1}{R}. Counter target spell; its controller mills 1–3 and casts a random nonland free. | A counterspell that can hand the opponent something better than what you countered. |
| [Lightning Bolt](https://scryfall.com/search?q=%21%22Lightning+Bolt%22) | A | {R} instant. 3 damage to any target. | MV 1, so **Wanda never discounts it**, and 3 damage kills very little in Commander — the exact grounds that moved Abrade to the sideboard. |
| [Grapeshot](https://scryfall.com/search?q=%21%22Grapeshot%22) | A | {1}{R} sorcery, storm. 1 damage to any target. | 0 of 10 sampled Wanda decks ran a traditional storm card; we measured this and built away from it. |
| [Photon Blast Barrage](https://scryfall.com/search?q=%21%22Photon+Blast+Barrage%22) | B | {X}{R}{R}. Copy it X times; 1 damage to target creature. | X+1 pings of *one* damage. Kills nothing that matters without Ojer Axonil propping it up. |
| [Crossover Collaboration](https://scryfall.com/search?q=%21%22Crossover+Collaboration%22) | B | {2}{R} instant, teamwork 2. Impulse two cards; Treasure if you tapped creatures. | MV 3, so no Wanda discount, and our draw role is already 12 cards deep. |
| [The Vision](https://scryfall.com/search?q=%21%22The+Vision%22) | A | {4} 2/5 flying vigilance. On each noncreature spell pick an unused mode: double strike / indestructible / draw a card. | A four-mana body that draws one card per turn. Not our *The Vision and Scarlet Witch*, and the draw role is full. |
| [Sorceress's Schemes](https://scryfall.com/search?q=%21%22Sorceress's+Schemes%22) | A | {3}{R} sorcery. Return an instant/sorcery from the yard to hand, add {R}. Flashback {4}{R}. | Returns *to hand*, not to the stack. Past in Flames, Mizzix's Mastery, Arcane Bombardment and Volcanic Vision all do it better and are already in. |
| [Inner Fire](https://scryfall.com/search?q=%21%22Inner+Fire%22) | B | {3}{R} sorcery. Add {R} for each card in your hand. | Anti-synergy: this deck empties its hand every turn on purpose (wheels, impulse draw, rituals). |
| [Scorched Ruins](https://scryfall.com/search?q=%21%22Scorched+Ruins%22) | B | Land. Sacrifice two untapped lands as it enters; {T}: add {C}{C}{C}{C}. | Colourless (doesn't bank under Electro/Ashling), a three-for-one to any land removal, and $66.80. |
| [Myriad Landscape](https://scryfall.com/search?q=%21%22Myriad+Landscape%22) | A | Land, enters tapped. {2},{T}, sac: fetch two basics tapped. | Enters tapped, taps for colourless, and the ramp arrives tapped two turns later. Too slow. |
| [Teetering Peaks](https://scryfall.com/search?q=%21%22Teetering+Peaks%22) | B | Land, enters tapped. ETB: target creature gets +2/+0. | A one-shot +2 discount in exchange for a tapped land. The pump is gone next turn. |
| [Looming Spires](https://scryfall.com/search?q=%21%22Looming+Spires%22) | B | Land, enters tapped. ETB: +1/+1 and first strike. | Strictly worse than Teetering Peaks for our purposes, which is itself out. |
| [Cathedral of War](https://scryfall.com/search?q=%21%22Cathedral+of+War%22) | B | Land, enters tapped. Exalted; {T}: add {C}. | Enters tapped, colourless, and exalted only pays if we attack alone. |
| [Song-Mad Treachery // Song-Mad Ruins](https://scryfall.com/search?q=%21%22Song-Mad+Treachery%22) | B | {3}{R}{R} threaten with haste; back face a tapped land. | Threaten effects need a sacrifice outlet to convert; we have none. It's a tapped land in practice. |
| [Hero's Blade](https://scryfall.com/search?q=%21%22Hero's+Blade%22) | A | {2} Equipment, +3/+2, auto-attaches to a legendary on ETB, equip {4}. | Falls under our equipment-voltron cut. Blackblade Reforged gives +1/+1 *per land* for equip {3}. |
| [Shuko](https://scryfall.com/search?q=%21%22Shuko%22) | B | {1} Equipment. +1/+0, **equip {0}**. | The free equip only matters with an "whenever equipped" trigger to abuse. We have none, so it's +1/+0. |
| [Madcap Skills](https://scryfall.com/search?q=%21%22Madcap+Skills%22) | B | {1}{R} Aura. +3/+0 and menace. | An Aura is a two-for-one waiting to happen on the one creature the whole deck depends on. |
| [Brute Force](https://scryfall.com/search?q=%21%22Brute+Force%22) | B | {R} instant. +3/+3. | The flat one-shot combat pump our `considered-and-cut.md` group covers exactly: one card for roughly one extra discount. |
| [Smashing Spree](https://scryfall.com/search?q=%21%22Smashing+Spree%22) | B | {1}{R} instant. Attacking creature gets +3/+3 and trample. | Same as Brute Force, plus it only works on an attacker, and it's $7.40. |

---

## Already settled in our own repo — 20 of the 67

Not new information; listed so the diff is complete. Grounds are in `SIDEBOARD.md` and
`considered-and-cut.md`.

**In our sideboard (18):**
[Guttersnipe](https://scryfall.com/search?q=%21%22Guttersnipe%22) (A+B) ·
[Firebrand Archer](https://scryfall.com/search?q=%21%22Firebrand+Archer%22) (A) ·
[Coruscation Mage](https://scryfall.com/search?q=%21%22Coruscation+Mage%22) (A) ·
[Dualcaster Mage](https://scryfall.com/search?q=%21%22Dualcaster+Mage%22) (A) ·
[Runaway Steam-Kin](https://scryfall.com/search?q=%21%22Runaway+Steam-Kin%22) (A+B) ·
[Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22) (A+B) ·
[Bolt Bend](https://scryfall.com/search?q=%21%22Bolt+Bend%22) (A+B) ·
[Pinnacle Monk](https://scryfall.com/search?q=%21%22Pinnacle+Monk%22) (A+B) ·
[Abrade](https://scryfall.com/search?q=%21%22Abrade%22) (A) ·
[Apex of Power](https://scryfall.com/search?q=%21%22Apex+of+Power%22) (A) ·
[Double Vision](https://scryfall.com/search?q=%21%22Double+Vision%22) (A) ·
[Rousing Refrain](https://scryfall.com/search?q=%21%22Rousing+Refrain%22) (A) ·
[Monstrous Rage](https://scryfall.com/search?q=%21%22Monstrous+Rage%22) (A) ·
[Improvisation Capstone](https://scryfall.com/search?q=%21%22Improvisation+Capstone%22) (A) ·
[Insurrection](https://scryfall.com/search?q=%21%22Insurrection%22) (A) ·
[Call Forth the Tempest](https://scryfall.com/search?q=%21%22Call+Forth+the+Tempest%22) (A) ·
[Comet Storm](https://scryfall.com/search?q=%21%22Comet+Storm%22) (B) ·
[Wild Ricochet](https://scryfall.com/search?q=%21%22Wild+Ricochet%22) (B)

**On the Bracket 4 list only (2):**
[Faithless Looting](https://scryfall.com/search?q=%21%22Faithless+Looting%22) (A) — MV 1, no discount ·
[Finale of Promise](https://scryfall.com/search?q=%21%22Finale+of+Promise%22) (B) — free-cast, so X = 0 on our X-spells

---

## The Ring of Valkas question

[Ring of Valkas](https://scryfall.com/search?q=%21%22Ring+of+Valkas%22) — {2} Equipment, equip {1}:
haste, and a **+1/+1 counter at your upkeep if the equipped creature is red**. Wanda is red, so it
ticks every turn.

It's a fair card and the counters are *permanent* — they survive the Equipment being destroyed,
which no static buff does. But side by side with what we already run:

| | Cast + equip | Power added | Shape |
|---|---|---|---|
| [Blackblade Reforged](https://scryfall.com/search?q=%21%22Blackblade+Reforged%22) | {2} + {3} = **5** | **+1/+1 per land** — about +8 at eight lands, immediately | Static, all at once |
| [Ring of Valkas](https://scryfall.com/search?q=%21%22Ring+of+Valkas%22) | {2} + {1} = **3** | +1 per upkeep — +3 by turn three after it lands | Counters, accumulating |

Blackblade hands you an eight-point discount the turn you equip it; the Ring needs eight turns to
match, in a deck built to win on turn six to eight. And haste is already covered by
[Arena of Glory](https://scryfall.com/search?q=%21%22Arena+of+Glory%22).

**Verdict: sideboard.** If the pod is slow and grindy it's genuinely good, and it's the cheapest
route to a permanently larger commander. It just isn't better than the equipment already in the 100.

---

## What this says about the two decks

**Deck A (Wanda Vision)** is our deck with the edges rounded off — same shell, but it hedges into
the pinger package (Guttersnipe, Firebrand Archer, Coruscation Mage) and keeps
[Apex of Power](https://scryfall.com/search?q=%21%22Apex+of+Power%22) and
[Improvisation Capstone](https://scryfall.com/search?q=%21%22Improvisation+Capstone%22), both of
which we cut for documented reasons. 29 Mountains against our 21 says it's less greedy on utility
lands. Nothing here is a serious upgrade for us.

**Deck B (Manasplaining)** is the more interesting list and the source of every Tier 1–2 card above.
It commits properly to pump-for-discount — Tavern Brawler, Unleash Fury, Bionic Blow, Ojer Axonil,
Wanda's Vision — where our build hedges toward big X-spells. It's also noticeably more expensive
(Scorched Ruins at $66.80, Throne of Eldraine at $28, Nico Minoru at $23).

The measurable gap: **they have more ways to grow her, we have more ways to cash her in.** Tavern
Brawler is the cheapest way to close that gap without giving up a payoff.
