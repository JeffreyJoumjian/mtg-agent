# Scarlet Witch — Decklist V3 (the chain build)

Commander: The Scarlet Witch (mono-red)
Bracket: 3 (high) · Game Changers: 3/3 · Total: 100

> **Built 2026-09-08** after the pilot watched an opponent end a game on turn 5 with the same
> commander. It is a *side-by-side* list, not a replacement — `DECK.md` (the promoted V2) stays
> the authoritative pair with `STATUS.md`. The mechanism, the simulation and the full candidate
> pool are in `research/turn-5-chain-2026-09-08.md`; the swap-by-swap grounds are in
> `research/decisions.md` under 2026-09-08.
>
> **What this list is.** `DECK.md` makes every spell deal damage across turns 4–7. This one is
> built so that **one turn is the game**. With Livaan out, an X-spell costs only its coloured
> pips and roughly *doubles* Wanda before it resolves, because X counts toward mana value while
> the spell is on the stack (CR 202.3e). Every X-spell is therefore a pump as well as a payoff,
> and the chain compounds: X = ⌊(W + r) / k⌋, then W' = W + kX + p ≈ 2W + r + p.
>
> **Turn 5, five Mountains, Livaan cast on turn 4:** Storm King's Thunder at X=2 for {R}{R}{R}
> puts Wanda at 7; Jaya's Immolating Inferno at X=7 for {R}{R}, copied twice, is **21 to each
> opponent**. One Bonesplitter's worth of seed makes it 55. That is the whole deck.

## Commander (1)

1x The Scarlet Witch

## Lands (32)

1x Ancient Tomb
1x Valakut, the Molten Pinnacle
1x Nykthos, Shrine to Nyx
1x Castle Embereth
1x Arena of Glory
1x Mines of Moria
1x Shatterskull Smashing
1x Valakut Awakening
1x Rogue's Passage
1x Forge of Heroes
1x Tyrite Sanctum
21x Mountain

## Ramp — pips, rituals and cost reduction (9)

1x Sol Ring
1x Arcane Signet
1x Ruby Medallion
1x The Fire Crystal
1x Artist's Talent
1x Pyretic Ritual
1x Desperate Ritual
1x Seething Song
1x Mana Geyser

## Ramp — per-spell engines (5)

1x Electro, Assaulting Battery
1x Storm-Kiln Artist
1x Ashling, Flame Dancer
1x Urabrask
1x The Vision and Scarlet Witch

## Seed — permanent and near-permanent power on Wanda (9)

1x Bonesplitter
1x Shuko
1x Coral Sword
1x Inventor's Axe
1x Hero's Blade
1x Blackblade Reforged
1x Runechanter's Pike
1x Monstrous Rage
1x Gauntlet of Power

## The pump engine (1)

1x Livaan, Cultist of Tiamat

## Doublers — X-spells and power doublers (11)

1x Storm King's Thunder
1x Jaya's Immolating Inferno
1x Crackle with Power
1x Commune with Lava
1x Electrodominance
1x Comet Storm
1x Lunar Frenzy
1x Frantic Confrontation
1x Bionic Blow
1x Unleash Fury
1x Bulk Up

## Copy and recur (6)

1x Repeated Reverberation
1x Increasing Vengeance
1x Return the Favor
1x Pyromancer's Goggles
1x Past in Flames
1x Will of the Jeskai

## Card draw & selection (8)

1x Wheel of Fortune
1x Reforge the Soul
1x Big Score
1x Unexpected Windfall
1x Jeska's Will
1x Wiccan, Young Avenger
1x Hex Magic
1x Gamble

## Damage conversion & closers (4)

1x Thor, God of Thunder
1x Longshot, Rebel Bowman
1x Chandra's Ignition
1x Solphim, Mayhem Dominus

## Protection (5)

1x Conqueror's Flail
1x Deflecting Swat
1x Champion's Helm
1x Mithril Coat
1x Commander's Plate

## Removal & Defence (4)

1x Chaos Warp
1x Vandalblast
1x Untimely Malfunction
1x Fiery Confluence

## Reach and refuel that also seed (5)

1x Twinferno
1x Blazing Crescendo
1x Titan's Strength
1x Fists of Flame
1x Ignite the Future

---

**Game Changers (3/3):** Ancient Tomb · Jeska's Will · Gamble

**Bracket 3 compliance:** three Game Changers against the cap of three, no mass land denial, no
extra turns, no infinite. The chain is bounded by red pips and cards in hand — it is a long
sequence of ordinary casts, not a loop, and every link is a spell an opponent may respond to
unless the Flail is out.

**Why Ancient Tomb is the third Game Changer here, where `DECK.md` uses The One Ring.** This list
wants Wanda on turn 2–3 and Livaan the turn after; the Tomb pulls the whole plan forward a turn,
which is the axis that matters when the kill is turn 5. Its usual drawbacks are smaller here too —
two life is cheap at 40, and colourless mana pays for exactly what this deck needs generic mana
for (Wanda's {2}, Livaan's {2}, equip costs, the generic half of a ritual). The One Ring is the
better card in a grind; it is the worse card in a race.

---

## The recurrence, and how to play it

```
X  = ⌊(W + r) / k⌋     k = generic symbols per point of X (Crackle 3, everything else 1)
MV = kX + p            p = coloured pips — the only part you actually pay
W' = W + MV            Livaan's trigger, resolving above the spell on the stack
```

| Wanda before | Storm King's Thunder | after | Jaya's X | copies | to **each** opponent | red pips |
|---|---|---|---|---|---|---|
| 2 | X=2 | 7 | 7 | 2 | **21** | 5 |
| 4 | X=4 | 11 | 11 | 4 | **55** | 5 |
| 6 | X=6 | 15 | 15 | 6 | **105** | 5 |
| 8 | X=8 | 19 | 19 | 8 | **171** | 5 |

Add Ruby Medallion and the seed-2 row becomes 36 each. Swap Jaya's for Crackle with Power and
seed 4 is 75 to each of three targets.

**The order that matters:**

1. **Seed first, always.** An Equipment on Wanda before the first X-spell is multiplied by every
   link after it. Equipping on the chain turn costs mana you would rather spend on pips, so equip
   on turn 3 or 4.
2. **Storm King's Thunder is the first link**, not the last — it doubles her *and* sets the copy
   count for everything after.
2b. **The `{X}{R}` pumps need a little generic mana before Wanda is big.** Her discount only
   applies at mana value 4 or greater, so Lunar Frenzy has to be announced at X=3 or more to get
   any discount at all, and at base power 2 with nothing but red pips it announces X=0 and does
   nothing. From power 3 up it pays for itself instantly — at power 4 it is X=4 for a single {R}
   and takes her to 13. Sol Ring, Ancient Tomb, Rogue's Passage, Forge of Heroes and Tyrite
   Sanctum are what cover that early generic, which is the other reason the counter-lands earn
   their slots.
3. **Livaan's trigger targets Wanda.** Every time. It is the single most-missed play in the deck.
4. **Then the biggest X-spell you can pay the pips for.** Jaya's Immolating Inferno hits three
   targets; Crackle with Power hits X targets for 5X each; Comet Storm hits one plus one per
   kick.
5. **Chandra's Ignition is the alternative finisher** — it reads Wanda's power directly, so at 25
   power it is 25 to each opponent and each other creature. It kills Livaan and your engines, so
   it is the *last* card you cast, never mid-chain.

**Pips, not mana.** Once Wanda's power passes the next spell's generic, every spell costs only its
coloured pips. Count red sources, not total mana. Seething Song is +4 pips when its {2} comes off
Sol Ring; Pyromancer's Goggles taps for {R} *and* copies; Nykthos turns {2} into your devotion in
red. Sol Ring, Ancient Tomb, Rogue's Passage, Forge of Heroes and Tyrite Sanctum pay for the
generic things — equips, Livaan, ritual halves — and contribute nothing to the chain itself.

**The engines that scale with the chain are the copy-triggered ones.** Storm-Kiln Artist and
Ashling both read *"cast **or copy**"*, so under Storm King's Thunder at X=8 they see nine
triggers, not one. Electro, Urabrask and The Vision trigger on casts only and refund a pip each.
Thor is the converter that belongs here: his damage is *the spell's mana value*, which is the
number the chain inflates — a Jaya's at MV 21 is 21 damage to any target on top of the spell.

**Protection is the Flail.** *"Your opponents can't cast spells during your turn"* turns the chain
from interruptible into a formality. Attach it to anything but Wanda — she is the removal magnet,
and the lockout only needs the Flail on *a* creature.

---

## Rules gotchas specific to this list

- **X counts toward mana value on the stack** (CR 202.3e) and reductions eat only the generic part
  (CR 601.2f). That pair is the whole engine. Off the stack — in hand, in the graveyard — X is 0,
  so Runechanter's Pike counts a Crackle in your yard as one card, not as its old size.
- **Free-casting forces X = 0** (CR 107.3b). This list deliberately runs **no** free-cast effect
  pointed at its own X-spells: Mizzix's Mastery, Electrodominance's rider, Hit the Mother Lode and
  Nico Minoru are all absent for that reason. Electrodominance is here for its own X, and its free
  cast is for a *fixed-cost* card only.
- **Past in Flames and Will of the Jeskai keep X.** Flashback's cost is the card's mana cost, which
  *includes* X, so a recurred Storm King's Thunder or Jaya's is cast at a real X — a second chain
  out of the graveyard. This is the deck's best comeback line.
- **Copies are not cast** (CR 707.10). They keep X and every target, but they do not trigger
  Livaan, Thor, Longshot, Electro, Urabrask, The Vision or Wiccan. They *do* trigger Storm-Kiln
  Artist and Ashling.
- **Bulk Up and Unleash Fury double the power that is already there** — equip first, then double.
  Doubling before Blackblade Reforged doubles 2, not 12.
- **Runechanter's Pike shrinks** when Past in Flames, Will of the Jeskai or a Mizzix-style effect
  exiles your graveyard.
- **Comet Storm's kicks come out of the same discount as its X** (CR 601.2f — the total cost is
  assembled from the mana cost *plus* additional costs, and reductions are subtracted from that
  aggregate). Wanda's discount does pay for the kicker generic, but under a reduction of `R` the
  real constraint is `X + kicks = R`. Kicked twice to reach three opponents it costs two more
  generic than Jaya's Immolating Inferno, which hits up to three targets for X flat at the same
  {X}{R}{R} — so **cast Jaya's when both are live, and keep Comet Storm for instant speed** or for
  a fourth-plus target. Kicking also never switches the discount on: the payments do not raise
  mana value (CR 202.4), so Comet Storm needs X of two or more to clear Wanda's MV-4 gate at all.
- **The total cost locks in when you cast** (CR 601.2f). If an opponent kills Wanda in response to
  a spell you have already paid for, that spell still costs what you paid — but every *later* link
  in the chain is priced off her new, absent power. Removal in response to the first link is what
  actually ends the turn.
- **Solphim gets no discount and no pump.** He is a *creature*, so Wanda's reduction (instants and
  sorceries) and Livaan's trigger (*"whenever you cast a **noncreature** spell"*) both skip him.
  Ruby Medallion and The Fire Crystal are the only reducers that touch him, at {2}{R}{R} down to
  {R}{R}. Cast him on a turn before the chain, not during it.
- **Solphim doubles Chandra's Ignition and then dies to it.** In that order: a replacement effect
  applies as the damage is dealt, and CR 704.4 — *"state-based actions pay no attention to what
  happens during the resolution of a spell or ability"* — means he is not removed until Ignition
  has finished resolving. The same is true of every creature the Ignition kills, so a board wipe
  that ends the game is the plan working, not a cost.
- **Gauntlet of Power is symmetric** — every opponent's red creature gets +1/+1 and their basic
  Mountains double too. Check the table before casting it.
- **Chandra's Ignition kills your own board**, Livaan included, after its cast trigger resolves.
- **Hexproof and protection do not stop a wrath.** Mithril Coat (flash, indestructible, and it
  auto-attaches to a legendary on entry) and Tyrite Sanctum's indestructible counter are the real
  answers.

---

## What this list gives up against `DECK.md`

Named honestly, because the trade is real and the pilot should pick on it:

- **The grind plan.** Guttersnipe, Fiery Inscription, Nico Minoru and Fated Firepower all pay per
  *cast*, and a chain turn has few casts and many copies. They are strictly better in the promoted
  list and strictly worse here.
- **Fiery Emancipation**, and every damage multiplier except the one below. A multiplier belongs
  where damage is **flat** — in `DECK.md`, Longshot plus Fiery Inscription plus Guttersnipe each
  deal 2 per cast, and a tripler turns six damage a spell into eighteen. Here the damage is
  exponential, so the multiplier lands on a number that has already cleared lethal several times
  over, and three opponents at 40 is a hard ceiling: overkill cannot be spent. Emancipation is also
  **the wrong multiplier for this list specifically** — it reads *"a permanent or player"*, so with
  Ancient Tomb in the manabase it turns every Tomb activation into six damage to your own face
  (LEDGER 2026-08-23). City on Fire and Angrath's Marauders share the wording and the cost problem.
- **The exception, seated 2026-09-08 on the pilot's call: Solphim, Mayhem Dominus.** Two red pips
  against Emancipation's three, and *opponent-restricted* — *"noncombat damage to an opponent or a
  permanent an opponent controls"* — so Ancient Tomb keeps costing two life, not six. It is the
  hedge for the turns the chain only half-assembles. Its floor is honest: on an assembled chain it
  converts nothing you needed.
- **Neheb, the Eternal**, whose mana arrives postcombat after damage, plus **Brass's Bounty**,
  **Inspired Tinkering**, **Hit the Mother Lode**, **Mizzix's Mastery**, **Volcanic Vision**,
  **Disrupt Decorum** and **Zuko's Exile** — cut for cheap seeds and one-pip doublers. The big-mana
  slots stop mattering once pips are the constraint.
- **Arcane Bombardment**, which deserves its own line because the obvious objection is the weak
  one. It is `{4}{R}{R}` and an **Enchantment**, so Wanda does not discount it at all — only Ruby
  Medallion, The Fire Crystal, Longshot and Artist's Talent L2 touch it, and without all four it
  costs four to six real mana on a turn this deck wants to spend on pips. Its pile then grows by
  **one card per turn**, which is a value curve pointing the opposite way to a deck that means to
  win on turn 5. The free-cast problem is real but smaller than it looks: its copies are cast
  *without paying their mana costs*, so X = 0 (CR 107.3b), and **10 of this list's 41 instants and
  sorceries are X-spells** — a 24% chance the random exile is a blank, against 16% in `DECK.md`.
  The other 76% is fine and occasionally excellent (a free Chandra's Ignition or Wheel of Fortune
  every turn). It stays in `DECK.md`, where six mana on turn 6 and a pile that grows for ten turns
  are both what that deck wants. Put it back here only if the chain build starts losing to grind
  rather than to interaction.
- **Consistency.** This deck has a worse turn 8 than `DECK.md` and a much better turn 5. If the
  chain is answered, the fallback is Thor plus commander damage through Rogue's Passage, not a
  board of pingers.
- **Any deterrent to being attacked.** Kazuul, Tyrant of the Cliffs left on 2026-09-08 for Solphim,
  and nothing else in the list makes attacking you cost anything. Fiery Confluence and Chandra's
  Ignition are sweepers you cast on your own turn, not a reason for anyone to attack elsewhere.
  This is a known, accepted hole: the deck answers a board by ending the game before it matters.
  Kazuul is the first card back in if that proves wrong.

## Buy notes

Almost all of the new cards are pocket change: Bonesplitter $0.33 · Coral Sword $0.21 ·
Inventor's Axe $0.22 · Hero's Blade $0.27 · Monstrous Rage $0.41 · Lunar Frenzy $0.20 ·
Frantic Confrontation $0.24 · Bionic Blow $0.24 · Unleash Fury $0.40 · Bulk Up $0.34 ·
Twinferno $0.37 · Blazing Crescendo $0.28 · Titan's Strength $0.32 · Fists of Flame $0.20.
The two that cost real money are **Shuko $2.19** and **Comet Storm $3.67**; **Increasing
Vengeance $0.99** comes back out of the box. **Solphim, Mayhem Dominus is $28.00 — proxy it**
under the standing rule. Ancient Tomb is already proxied.

**Cards this list needs that `DECK.md` doesn't** — buy or proxy them once and both lists can be
built from one collection, since 60+ cards are shared.
