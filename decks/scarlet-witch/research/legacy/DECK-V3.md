<!-- recovered 2026-09-23 from snapshot versions/2026-09-08-v3-before-solphim.md — verbatim copy -->
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

## Damage conversion & closers (3)

1x Thor, God of Thunder
1x Longshot, Rebel Bowman
1x Chandra's Ignition

## Protection (5)

1x Conqueror's Flail
1x Deflecting Swat
1x Champion's Helm
1x Mithril Coat
1x Commander's Plate

## Removal & Defence (5)

1x Chaos Warp
1x Vandalblast
1x Untimely Malfunction
1x Fiery Confluence
1x Kazuul, Tyrant of the Cliffs

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
- **Fiery Emancipation**, and every other damage multiplier. Not because it does nothing — it is a
  mana value 6 noncreature spell, so Livaan pumps Wanda by 6 when you cast it, which makes it a
  chain link in its own right. It is out because of **what a pip buys**. At the pip floor with one
  seed down, Lunar Frenzy costs **one** red pip and takes Wanda from 4 to 13; Emancipation costs
  **three** and takes her from 4 to 10. Nine power per pip against two. And the tripling lands on a
  number that has already cleared lethal several times over — three opponents at 40 is a hard
  ceiling, and overkill cannot be spent. **A damage multiplier belongs where damage is flat**
  (`DECK.md`, where Longshot + Fiery Inscription + Guttersnipe each deal 2 per cast and a tripler
  turns six damage a spell into eighteen) **and is dead weight where damage is exponential.** The
  same goes for Solphim, City on Fire, Angrath's Marauders and Torbran.
- **Neheb, the Eternal**, whose mana arrives postcombat after damage, and **Brass's Bounty**,
  **Inspired Tinkering**, **Hit the Mother Lode**, **Arcane Bombardment**, **Mizzix's Mastery**,
  **Volcanic Vision**, **Disrupt Decorum** and **Zuko's Exile** — all cut for cheap seeds and
  one-pip doublers. The big-mana slots stop mattering once pips are the constraint.
- **Consistency.** This deck has a worse turn 8 than `DECK.md` and a much better turn 5. If the
  chain is answered, the fallback is Thor plus commander damage through Rogue's Passage, not a
  board of pingers.

## Buy notes

Almost all of the new cards are pocket change: Bonesplitter $0.33 · Coral Sword $0.21 ·
Inventor's Axe $0.22 · Hero's Blade $0.27 · Monstrous Rage $0.41 · Lunar Frenzy $0.20 ·
Frantic Confrontation $0.24 · Bionic Blow $0.24 · Unleash Fury $0.40 · Bulk Up $0.34 ·
Twinferno $0.37 · Blazing Crescendo $0.28 · Titan's Strength $0.32 · Fists of Flame $0.20.
The two that cost real money are **Shuko $2.19** and **Comet Storm $3.67**; **Increasing
Vengeance $0.99** comes back out of the box. Ancient Tomb is already proxied.

**Cards this list needs that `DECK.md` doesn't** — buy or proxy them once and both lists can be
built from one collection, since 60+ cards are shared.
