# Chatterfang — Pilot's Gameplan

> The pilot's only Chatterfang list. It started as the `upgrade-test` fork on **2026-09-25** and
> became `chatterfang` on 2026-11-14. Every change, with its grounds, is in `research/decisions.md`.
>
> **Refreshed 2026-11-25 against the list as it stands.** Changes since the last refresh (wave 11):
> Concordant Crossroads, Springleaf Parade, Twitching Doll, Black Market Connections, Bloodline
> Recollector, Witch's Oven, Fabled Passage, Alhammarret's Archive, Support Mission, Throne of the
> God-Pharaoh and Mycoloth came in. Verdant Command, Deep Forest Hermit, Tireless Tracker, Pest
> Infestation, Deadly Dispute, Ravenous Squirrel, Llanowar Elves, Chatterstorm and two Swamps went out.
> Later the same day Thornvault Forager, Scurry of Squirrels and Ivy Lane Denizen came in for Twitching
> Doll, Esika's Chariot and Support Mission (benched in `research/sideboard.md`).

## 0. The one-paragraph version

You are a **mana and body economy**. Chatterfang turns every token you make into two, Cryptolith
Rite and Gaea's Cradle turn that board into mana, and the sacrifice outlets turn it into damage.
Drain is the primary plan — but **attacking is close to free here, so treat a wide board as a real
second route.** A token that gets blocked and trades fires every death trigger you own (Blood
Artist, Zulaport, Bastion, Cauldron of Essence, Mirkwood Bats, Nadier's Nightblade, Marionette
Apprentice), and the life each one gains feeds Dina, Starscape Cleric and Vito. **Either way you are
draining.** Craterhoof, Blasphemous Edict and Gruesome Fate each turn a wide board into a win without
touching the combo. The cards that make **several tokens in one turn from nothing** are Scurry of
Squirrels (every attack), Springleaf Parade, Second Harvest and The Unbeatable Squirrel Girl, and
Mycoloth turns a board into a Saproling stream that grows every upkeep.

## 1. The curve you actually have

| | MV≤1 | MV2 | MV3 | MV4 | MV5 | MV6+ | avg |
|---|---|---|---|---|---|---|---|
| Nonland (66) | 5 | 21 | 23 | 10 | 5 | 2 | **2.97** |

Since 2026-11-18 the deck runs 34 lands (two Swamps went for Replicator and Support Mission, on trial).
Throne of the God-Pharaoh took Replicator's slot on 2026-11-20. Mycoloth took Chatterstorm's on
2026-11-25, which moved the average from 2.92 to 2.97 and left one fewer 2-drop.
Springleaf Parade counts at MV 2 and really costs 5 at X = 3.

**The thing to watch and report back is the turn you win on**, and whether 34 lands keeps up.

## 2. The three numbers to track

1. **Tokens created this turn** — not tokens on board. Mirkwood Bats triggers **once per token
   created** (CR 603.2c), Prosperous Innkeeper gains 1 per creature entering, and Vito converts each
   of those gains. Sixteen tokens entering at once is sixteen separate Bats triggers.
2. **Tokens on board** — everything else scales off it: Gaea's Cradle, Three Tree City, Circle of
   Dreams Druid, Gruesome Fate, Valley Rotcaller, Craterhoof, Blasphemous Edict.
3. **Is Bloodletter out, and is it your turn?** If yes, every number above doubles.

> **Three lifegain converters:** Dina and Starscape Cleric (1 to *each* opponent per gain) and Vito
> (that much to one opponent). Every 1-life gain is a separate event for each of them, so many small
> gains beat one big one.

## 3. Opening

**T1–T2:** Elvish Mystic (the only 1-mana dork, so the only turn-2 Chatterfang), Sol Ring, Thornvault
Forager, Bitterblossom, Skullclamp, Sakura-Tribe Elder, Witch's Oven, Cryptolith Rite. Hold **Springleaf
Parade** and **Second Harvest** for after Chatterfang lands: every token they make brings a Squirrel.

**T3 — the fork:**
- No board → **Chatterfang**. He is the engine; everything after him is worth double.
- Board already → **Cryptolith Rite** (every token taps for mana) or **Parallel Lives**.
- Spare lands in hand → **Azusa** or **Dryad**, with a landfall payoff already out.

**T4–T6:** deploy a drain payoff under an existing board, not the other way around. A Blood Artist
with nothing to sacrifice is a 0/1. **Yawgmoth is the exception** — he converts spare bodies into
cards the moment he lands, so he is never a dead draw.

**Mulligans.** Keep 3 lands with both colours and a 1–2 drop. Ship hands with no token source before
turn 3. With 34 lands and an average MV of 2.97, a hand without a third land needs a dork or Sol Ring.

## 4. The sacrifice decision tree

**Sacrifice when:** you have a free outlet and *any* drain payoff; in response to targeted removal;
in response to a wrath (Plumb the Forbidden converts the board into a fistful of cards).

**Do NOT sacrifice when:** no payoff is on the battlefield; or **Vito, Dina, Starscape Cleric or
Prosperous Innkeeper would die in the same event**. "Whenever you gain life" and "whenever a creature
enters" have no look-back, so they must be alive as each gain happens. Blood Artist, Zulaport, Bastion and Cauldron of Essence are fine dying in the same
wipe, because dies-triggers look back in time (CR 603.10a).

## 5. The engine to look for

**Free outlet + Blood Artist + Zulaport + Bastion + Cauldron of Essence.** Each token sacrificed is
1 to *each* opponent four times over, plus Mirkwood Bats for a fifth, plus Marionette Apprentice for
a sixth if it's out. The four life gains then fire Dina and Starscape Cleric for 4 to each opponent
and Vito for 4 at one, if they're out.

> **Roughly 6 to the whole table per 1/1**, doubled by Bloodletter. Cauldron of Essence is on an
> **artifact**, so unlike the rest it survives Blasphemous Edict and every creature wipe.

**Yawgmoth, Thran Physician is the new engine card.** Pay 1 life, sacrifice a creature: a −1/−1
counter *and draw a card*. It is a free outlet, a draw engine and removal in one, bounded only by
your life total. With Skullclamp out, a −1/−1 counter kills the clamped 1/1 and draws two more.

**Warren Soultrader is a Pitiless Plunderer you trigger yourself.** Pay 1 life, sacrifice another
creature, create a Treasure. That Treasure is a token event, so the whole §5c chain runs on every
sacrifice: a Squirrel from Chatterfang, a Food each from Peregrin and Tippy-Toe, and Manufactor's
split. It is also the deck's any-colour outlet. See §8d for the loop.

**Priest of Forgotten Gods is an outlet that pays you back, once a turn.** Tap it and sacrifice two
other creatures. Each opponent you target loses 2 life and sacrifices a creature of their choice, and
you add {B}{B} and draw a card. It works at instant speed, so use it in response to removal or a
wrath, but it needs a turn to lose summoning sickness. It is an edict, not a wipe, because each
opponent gives up their worst creature. Two sacrifices are two deaths, so every payoff above fires
twice per activation. It taps, and the list has no untap effect (checked 2026-10-15), so it can't
repeat in a turn and is not the outlet for the loops.

**Witch's Oven is a free outlet once a turn.** Tap it and sacrifice a creature for a Food, or two
Foods if the creature had toughness 4 or more. The Food is a token event, so Chatterfang adds a
Squirrel and Peregrin Took and Tippy-Toe each add a Food. It works the turn it lands.

**Mycoloth is a mass sacrifice that pays again every upkeep** (since 2026-11-25). Devour 2 sacrifices
as many creatures as you like while it enters (CR 702.82a). Each one dies, so every drain payoff
fires per creature, and Mycoloth gets two +1/+1 counters per creature. At the beginning of each of
your upkeeps it makes one Saproling per counter, and Chatterfang adds as many Squirrels.

- **Devour tokens, never a converter.** Vito, Dina, Starscape Cleric and Prosperous Innkeeper don't
  look back, so they give nothing if they die in the devour. Keep Chatterfang out too.
- **Tap before you cast it.** Gaea's Cradle, Circle of Dreams Druid and Rite-enabled tokens tap for
  mana first. A tapped creature can still be devoured.
- **It counts counters, not creatures** (Gatherer ruling). Doubling Season doubles the counters it
  enters with, and Ivy Lane Denizen adds one for every green creature that enters if you aim it at
  Mycoloth, so each upkeep's Saprolings and Squirrels grow the next upkeep's batch.
- **It can't devour creatures entering at the same time as it.** Only what's already on the
  battlefield counts.
- It is a 5-mana creature with a big number on it, so expect removal. The devour drain has already
  happened by then.

**Scurry of Squirrels makes a token burst every attack** (since 2026-11-25). It has myriad twice, so
attacking one opponent in a four-player pod makes two copies per instance: four copies, tapped and
attacking the other two players. Chatterfang adds four Squirrels, and those are **tapped and attacking
too**, because anything the creating effect specifies applies to Chatterfang's Squirrels (Chatterfang
ruling). Which opponent each Squirrel attacks isn't settled: CR 508.4 lets you choose when the effect
doesn't name one, but myriad names a player per copy, and EDHPlay will decide it for you either way.
Peregrin Took and Tippy-Toe each add a Food per instance.

- **Everything myriad made is exiled at end of combat**: the copies, Chatterfang's Squirrels, the
  extra copies from Doubling Season and Parallel Lives, and Peregrin Took's Food (official rulings on
  each). Tippy-Toe has no ruling, but its wording is the same as Peregrin Took's, so treat its Food
  the same way.
- **So spend them before end of combat.** After combat damage, sacrifice the myriad tokens to an
  outlet: each one then dies (every drain payoff fires) and Mirkwood Bats pings for the sacrifice,
  where being exiled fires only Nadier's Nightblade. Crack the Foods for Ninja Pizza mana or
  Thornvault Forager's forage.
- Each copy that deals combat damage puts a +1/+1 counter on a creature you choose. Mycoloth is the
  best target.
- Myriad makes fewer copies as players die and none against your last opponent.

**Thornvault Forager spends the Foods.** `{T}, Forage` sacrifices a Food for two mana of any colours,
and that sacrifice fires Marionette Apprentice, Nadier's Nightblade, Camellia and Mirkwood Bats. Late
in the game `{3}{G}, {T}` finds The Unbeatable Squirrel Girl, Camellia, Hazel or Tippy-Toe.

## 5b. Landfall — every land is a token and a Squirrel

Chatterfang adds a Squirrel to every token, and three cards make a token per land: Tireless
Provisioner (Food or Treasure), Scute Swarm (a copy of itself at six lands), Avenger of Zendikar
(a Plant per land on arrival, then a counter per land after). Tireless Tracker left in wave 12.
**Verdant Catacombs**, **Misty Rainforest** and **Fabled Passage** are two landfall triggers each; crack them on your
own turn with payoffs out. **Cultivate** is two (one now, one on a later drop) and **Sakura-Tribe
Elder** is one plus a free death.

**Dryad of the Ilysian Grove** (one extra drop) and **Azusa** (two) only matter when you hold a spare
land after your normal drop, which is about 27% of turn 4s and 16% of turn 5s. **Cultivate is what
puts that spare land in your hand**, so the best landfall turn is Cultivate, then Dryad or Azusa,
then two land drops with Provisioner and Scute Swarm out. Every trigger is its own token event, so
each one runs the whole §5c chain.

## 5c. The ordering law — memorise this one

When several replacement effects want the same token-creation event, **you choose the order**
(CR 616.1), and the order changes the total by a large factor. Always:

> **Peregrin Took → Tippy-Toe → Bilbo → Academy Manufactor → Chatterfang LAST**

Fixed adders, then splitters, then the multiplier. Getting Chatterfang first on a 15-Treasure event
costs you **30 tokens**.

**Peregrin Took and Tippy-Toe are not Food-adders** — both read *"if one or more **tokens** would be
created, those tokens plus an additional Food token are created instead."* They fire on **every**
token event of any kind and add one Food each, per event. That Food is untapped, so it is this
turn's mana through Ninja Pizza.

Worked: one plain "create a Food" with Peregrin + Tippy-Toe + Bilbo + Manufactor + Chatterfang is
**36 tokens**. From one **Treasure**, with both doublers as well, it is **120 tokens** — 20 Clues,
20 Foods, 20 Treasures and 60 Squirrels — and 120 Mirkwood Bats triggers.

**Why the order is what it is** (verified 2026-09-26). Doubling Season and Parallel Lives are uniform
×2 and **commute** — they can go anywhere, including after Chatterfang, and the total is identical.
The binding constraint is that **Chatterfang must come after Academy Manufactor and Bilbo**, because
those two replace only Clue/Food/Treasure tokens and cannot see Squirrels. "Chatterfang last" is
still the right thing to remember at the table — it always reaches the maximum — just don't reason
that a doubler placed after him is wasted. It isn't.

Bilbo before Manufactor is correct whenever `3 × Foods > total Clue/Food/Treasure` in the event,
which is nearly always true here because Peregrin and Tippy-Toe are feeding it Foods.

## 6. Sequencing within your turn

1. **Upkeep:** Bitterblossom makes a Faerie. Mycoloth makes a Saproling per counter, and Chatterfang
   adds as many Squirrels. Both happen before you draw, so the Saprolings can be sacrificed in main 1.
2. **Start of main 1:** Gardenize adds its mana.
3. **Main 1: Bloodletter FIRST if you have it.** Then landfall payoffs, **then** your land drop(s),
   then the other token makers, then the payoff.
4. **Tap for value before you sacrifice** — Gaea's Cradle, Three Tree City and Circle of Dreams
   Druid all read the board, and a sacrificed Squirrel is one less mana. Cryptolith Rite means a
   token can tap for mana *and then* be sacrificed.
5. **Sacrifice in the second main**, once the board is as wide as it will get.
6. **Ninja Pizza** makes a free Food at the beginning of your second main — that is a full token
   event, so it runs the whole §5c cascade.

## 7. The kill — four routes, none of them the combo

**Blasphemous Edict** for `{B}` when there are 13+ creatures on the battlefield (**all players
count**, and the cost is locked when you cast it — they cannot shrink the board in response). You
choose your own thirteen; opponents lose their boards; you bank **thirteen** death triggers that
look back in time. Keep Chatterfang out of your thirteen so the board rebuilds.

**Craterhoof Behemoth.** X is the *number* of creatures and includes Craterhoof itself, determined
once on resolution. ⚠️ **It grants trample, NOT haste.** Craterhoof has haste itself, but tokens you
made this turn get +X/+X and can't attack unless Concordant Crossroads (back since wave 12) is out.
They do count toward X. **Build the board the turn before, then cast Craterhoof.** Deploy every token
*before* letting the trigger resolve; creatures made afterwards get nothing.

**Valley Rotcaller.** When it attacks, each opponent loses X, where X is your other Squirrels, Bats,
Lizards and Rats. Every Chatterfang Squirrel counts, and so do Mirkwood Bats and Starscape Cleric.
X is locked on resolution (see §9).

**Gruesome Fate** with 20 creatures is 20 to each opponent, 40 with Bloodletter. **Cast it before
you sacrifice** — it counts creatures you control.

**Throne of the God-Pharaoh** (since 2026-11-20). At your end step, each opponent loses 1 for every
tapped creature you control, counted as the trigger resolves, so tap the board **in response**:

- Cryptolith Rite and Springleaf Parade let creatures tap for mana. Creatures made this turn can't
  use that `{T}` unless Concordant Crossroads gives them haste (CR 302.6).
- Hazel's `{T}, Pay 2 life, Tap X untapped tokens` taps other creatures as a cost, so summoning
  sickness doesn't stop it.
- Creatures that attacked and survived, and anything you tapped for mana earlier in the turn, already
  count. Myriad tokens don't: they're exiled at end of combat, before your end step.
- **The cost:** whatever you tap stays tapped through the other players' turns, so it can't block.
  Keep enough blockers untapped.
- Bloodletter of Aclazotz doubles it. Its doubling works during your turn, and your end step is
  still your turn, so with Bloodletter out it's 2 per tapped creature.
- **Cute line:** at your end step, put Throne's trigger on the stack under Hazel's. Hazel copies a
  token first. Then, with Throne still waiting, tap everything for mana and spend it on Second
  Harvest. With Crossroads out the new copies can tap too, and Throne counts them all.

## 8. The finish — the combos are still here

### 8a. The fast loop — Chatterfang + Pitiless Plunderer (live from turn 4)

With **Chatterfang + Pitiless Plunderer** out and one Squirrel:

1. Activate Chatterfang: `{B}`, sacrifice 1 Squirrel → target creature gets +1/−1.
2. The Squirrel dies → Plunderer makes a **Treasure** → Chatterfang adds a **Squirrel**.
3. The Treasure pays the next `{B}`. Repeat as many times as you choose.

> **Per iteration: one death, −1 toughness on a creature you target, nothing spent.** Every drainer
> fires each time. With **Ashnod's Altar** as the outlet instead, each death also nets `{C}{C}`.

- **Aim the −1s at the biggest blocker or commander first.** The loop is also a one-sided sweeper.
- **No opposing creature to target?** Target the Squirrel you are about to sacrifice — targets are
  chosen before costs are paid (CR 601.2c, 601.2h), so the ability does nothing, but the sacrifice
  already happened and Plunderer still triggers.
- ⚠️ Assembles on **turn 4**. Tell the table it's in the deck.

### 8b. The Food loop (assembles ~turn 8+)

**Camellia, the Seedmiser + Peregrin Took or Tippy-Toe + Ashnod's Altar**, plus one Food and any
drain payoff. Each iteration, all inside **one step** (mana empties between steps):

1. Sacrifice a Squirrel to **Ashnod's Altar** → `{C}{C}`. *(a creature died — every drainer fires)*
2. Crack a **Food**: pay `{2}`, tap it, sacrifice it → gain 3 life. *(Vito drains 3)*
   With **Ninja Pizza** out, skip the `{2}` — Foods just tap and sacrifice for a mana of any colour.
3. **Camellia** triggers off that sacrifice and makes a Squirrel.
4. **Apply the adders first, Chatterfang last** (§5c).
5. Repeat as many times as you choose.

> **Net per iteration: +2 Squirrels or better, Food replaced, mana neutral or positive, +3 life, one
> creature dies.** Still lethal with a drain payoff even if your commander is gone.

⚠️ Announce each iteration; opponents get priority between them.
⚠️ New Squirrels are summoning sick — they cannot attack, but they **can** be sacrificed.

**With Bilbo and Academy Manufactor out** the returned Food becomes Food + Treasure, then one of
each, so every iteration is many times bigger.

### 8c. No combo? Then the big turn

**The Unbeatable Squirrel Girl.** `{1}{G}{G}{G}: create X Squirrels, where X is the number of
Squirrels you control` — Chatterfang matches it, so each activation roughly **triples** your count.

| Squirrels before | After one activation |
|---|---|
| 5 | 15 |
| 10 | 30 |
| 20 | 60 |

Mana from **Circle of Dreams Druid** (one tap = one mana per creature), **Cryptolith Rite** (older
tokens only), **Gaea's Cradle**, **Three Tree City** naming Squirrel, and **Hazel of the Rootbloom**,
whose ability taps tokens *as a cost* and so ignores summoning sickness.

Then convert with Craterhoof, Gruesome Fate, Blasphemous Edict, or the Altar. **Second Harvest**
doubles the board before any of it.

### 8d. The Soultrader loop: Chatterfang + Warren Soultrader (live from turn 4)

With **Chatterfang + Warren Soultrader** out and one Squirrel:

1. Pay 1 life and sacrifice the Squirrel to Soultrader.
2. Soultrader makes a **Treasure**, and Chatterfang adds a **Squirrel** to that event.
3. Repeat with the new Squirrel as many times as you choose.

> **Per iteration: one death, +1 Treasure, board size unchanged, 1 life paid.** Mirkwood Bats fires
> three times (two tokens created, one sacrificed). Any payoff that gains life on a death (Zulaport,
> Bastion, Cauldron of Essence, Blood Artist, Nadier's Nightblade) pays the life back, which makes it
> free. With Pitiless Plunderer also out, each death is a second Treasure.

- Unlike 8a it costs no `{B}` and needs no target. It does need **another** creature, so Soultrader
  can't sacrifice itself.
- ⚠️ Assembles on **turn 4**, the same as 8a. Tell the table it's in the deck.

## 9. Mistakes to avoid

- **Ivy Lane Denizen's counter goes on a target you choose.** Aim it at Mycoloth or an attacker, not at
  the 1/1 you plan to Skullclamp, so the clamp still kills it for free (ledger equip-027).

1. **Sacrificing with no payoff out.** The most common way to lose this deck.
2. **Applying Chatterfang before the adders.** See §5c — it is the single most expensive misplay
   here, and it is easy to get backwards.
3. **Expecting Craterhoof to grant haste.** It grants trample. This turn's tokens sit at home unless
   Concordant Crossroads is out.
4. **Sacrificing in response to Valley Rotcaller's attack trigger.** X is locked on *resolution*, not
   on declare-attackers — let the trigger resolve first or X shrinks.
5. **Forgetting Chatterfang applies to non-creature tokens.** Treasures, Foods, Clues, Servos — every
   one brings a Squirrel. Witch's Oven's Food brings one too, so each sacrifice makes two tokens.
6. **Wiping while Vito, Dina, Starscape Cleric or Innkeeper are on board.** They die and give you
   nothing.
7. **Casting Gruesome Fate after the board is gone.**
8. **Tapping Gaea's Cradle or Circle of Dreams Druid after you sacrifice.** Tap first.
9. **Forgetting Mirkwood Bats triggers twice per token** — once on create, once on sacrifice — and
   **once per token**, not once per batch.
10. **Including Chatterfang in your own thirteen for Blasphemous Edict.** You choose; don't pick him.
11. **Counting on Circle of Dreams Druid or Ninja Pizza's Foods the turn they land.** Circle is
    summoning sick without haste; a real Food token is a noncreature artifact and is *not*.
12. **Devouring with Mycoloth before you tap, or devouring a converter.** Tap the board for mana
    first, and keep Vito, Dina, Starscape Cleric, Innkeeper and Chatterfang out of the devour.
13. **Letting myriad tokens be exiled unused.** Sacrifice Scurry of Squirrels' copies and their
    Squirrels after combat damage, and crack their Foods, before end of combat.

## 5d. The Pitiless Plunderer loop — the actual kill, and its two traps

**Verified 2026-09-28.** With **Chatterfang + Pitiless Plunderer + Academy Manufactor + Bilbo +
Peregrin Took + Tippy-Toe** out, one creature dying is lethal in a way the table cannot see coming.

**One creature dies → 30 tokens.** Pitiless Plunderer makes 1 Treasure; apply in this order:

| Step | Effect | Running total |
|---|---|---|
| — | 1 Treasure created | 1 |
| 1 | Peregrin Took (+1 Food) | 2 |
| 2 | Tippy-Toe (+1 Food) | 3 |
| 3 | Bilbo (each Food → +1 Treasure) | 5 |
| 4 | Academy Manufactor (5 C/F/T → 5 of each) | 15 |
| 5 | Chatterfang (+15 Squirrels) | **30** |

5 Clues, 5 Foods, 5 Treasures, 15 Squirrels. **30 is the maximum** — confirmed by exhausting all nine
legal orderings. Manufactor-before-Bilbo gives 24; Chatterfang early gives 16. Bilbo *cannot* be
chosen first (no Food in the event yet, so it is not applicable) — you cannot waste it by accident.

**Then sacrifice the 15 Squirrels to Chatterfang for `{B}`.** They die simultaneously, so Pitiless
Plunderer triggers **15 separate times** (CR 603.2c), and each trigger is **its own token-creation
event** — so the whole chain re-applies in full to every one of them (CR 614.5 gives a fresh
opportunity per event). **15 × 30 = 450 tokens, 225 of them Squirrels**, for one `{B}`. With Mirkwood
Bats that is **450 damage to each opponent**.

It is a **growing loop, not a draw** — activating the ability is optional (CR 104.4b), so you choose
when to stop, and you must name a number (CR 732.2a).

**The two traps, both in your own cost:**

1. **"Sacrifice X Squirrels" does not exclude your own pieces.** Chatterfang (Squirrel Warrior) and
   Tippy-Toe (Squirrel Hero) are both legal Squirrels, and so are Camellia, Hazel, Valley Rotcaller
   and Squirrel Girl. Feed any of them to the cost and the engine stops for every later trigger.
   **Sacrifice only the 1/1 tokens.**
2. **The ability needs a target,** and *"Target creature gets +X/-X"* is unrestricted — with no
   opponent creature you must point it at your own. **Name one of the Squirrels you are about to
   sacrifice**: targets are chosen before costs are paid, so it is legal on announcement and gone by
   resolution, and CR 608.2b removes the ability without the −X touching anything you kept. Better
   still, **target a spare Squirrel you are not sacrificing** — it dies to the −X, and that is one
   more Plunderer trigger and 30 more tokens.

**Two more things to know.** Opponents get priority between each of the 15 resolutions, so removing
Manufactor or Chatterfang mid-cascade shrinks the payoff (CR 614.4 — the effect must exist before the
event). And 75 Foods means 25 activations of Peregrin Took's "Sacrifice three Foods: Draw a card" —
**do not reflexively cash them**, CR 104.3c kills you for drawing from an empty library.

**Interactive version:** https://claude.ai/artifact/Gti7ru3nZXYFh59YJXCmyD — toggle which pieces are
actually on board and it solves the ordering for one event, then adds up what sacrificing it deals.
It does not run the repeat; multiply by the number of deaths yourself, as in the table above.
