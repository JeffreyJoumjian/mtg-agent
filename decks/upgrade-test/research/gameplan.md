# Upgrade Test (Chatterfang) — Pilot's Gameplan

> Playtest fork of `decks/chatterfang` taken **2026-09-25** with all 13 recommended swaps applied at
> once. Parent list untouched. Proposal page: https://claude.ai/artifact/Qgp3cNcdmKWoE8fPZMxvQB
>
> **In:** Craterhoof Behemoth, Concordant Crossroads, Ancient Greenwarden, Mycoloth, Circle of
> Dreams Druid, Orcrist Goblin-cleaver, Bilbo Fellow Conspirator, Ninja Pizza, Cauldron of Essence,
> Blasphemous Edict, Yawgmoth Thran Physician, Champion of Lambholt, Awaken the Woods.
> **Out:** From Beyond, Tendershoot Dryad, Bitterblossom, Marauding Blight-Priest, Blade of the
> Bloodchief, Verdant Command, Nested Shambler, Idol of Oblivion, Dina Soul Steeper, Toxic Deluge,
> Sakura-Tribe Elder, Abrupt Decay, Cultivate.

## 0. The one-paragraph version

You are a **mana and body economy**. Chatterfang turns every token you make into two, Cryptolith
Rite and Gaea's Cradle turn that board into mana, and the sacrifice outlets turn it into damage.
Drain is the primary plan — but **attacking is close to free here, so treat a wide board as a real
second route.** A token that gets blocked and trades fires every death trigger you own (Blood
Artist, Zulaport, Bastion, Cauldron of Essence, Mirkwood Bats, Nadier's Nightblade, Marionette
Apprentice), and the life each one gains feeds Vito. **Either way you are draining.** What this fork
adds is a way to *end* it: Craterhoof, Orcrist and Blasphemous Edict each convert a wide board into
a win without touching the combo.

## 1. The curve you actually have

| | MV≤1 | MV2 | MV3 | MV4 | MV5 | MV6+ | avg |
|---|---|---|---|---|---|---|---|
| Nonland (64) | 8 | 16 | 22 | 10 | 5 | 3 | **3.00** |

**This is a heavier deck than the parent** (2.73 → 3.00) — that is the deliberate trade, cheap drip
engines for bigger single-turn payoffs. It is why Awaken the Woods, Ancient Greenwarden, Circle of
Dreams Druid and Ninja Pizza all came in on the same pass. **If the deck feels clunky, the mana came
down too slowly, not the payoffs too late** — that's the thing to watch and report back.

## 2. The three numbers to track

1. **Tokens created this turn** — not tokens on board. Mirkwood Bats triggers **once per token
   created** (CR 603.2c), Prosperous Innkeeper gains 1 per creature entering, and Vito converts each
   of those gains. Sixteen tokens entering at once is sixteen separate Bats triggers.
2. **Tokens on board** — everything else scales off it: Gaea's Cradle, Three Tree City, Circle of
   Dreams Druid, Gruesome Fate, Valley Rotcaller, Orcrist, Craterhoof, Blasphemous Edict.
3. **Is Bloodletter out, and is it your turn?** If yes, every number above doubles.

> **Note the change from the parent list:** Dina and Blight-Priest are gone, so **Vito is your only
> lifegain converter**. Life-gain *events* still matter, but only through one card now.

## 3. Opening

**T1–T2:** Llanowar Elves (turn-2 Chatterfang), Viscera Seer, Carrion Feeder, Ravenous Squirrel,
Arcane Signet, Skullclamp, Concordant Crossroads.

**T3 — the fork:**
- No board → **Chatterfang**. He is the engine; everything after him is worth double.
- Board already → **Cryptolith Rite** (every token taps for mana) or **Parallel Lives**.
- Lands in hand → **Ancient Greenwarden** line: hold for the turn you can chain land drops.

**T4–T6:** deploy a drain payoff under an existing board, not the other way around. A Blood Artist
with nothing to sacrifice is a 0/1. **Yawgmoth is the exception** — he converts spare bodies into
cards the moment he lands, so he is never a dead draw.

**Mulligans.** Keep 3 lands with both colours and a 1–2 drop. Ship hands with no token source before
turn 3. At avg MV 3.00 this list wants the third land more than the parent did.

## 4. The sacrifice decision tree

**Sacrifice when:** you have a free outlet and *any* drain payoff; in response to targeted removal;
in response to a wrath (Plumb the Forbidden converts the board into a fistful of cards).

**Do NOT sacrifice when:** no payoff is on the battlefield; or **Vito or Prosperous Innkeeper would
die in the same event** — "whenever you gain life" has no look-back and they must be alive as each
gain happens. Blood Artist, Zulaport, Bastion and Cauldron of Essence are fine dying in the same
wipe, because dies-triggers look back in time (CR 603.10a).

## 5. The engine to look for

**Free outlet + Blood Artist + Zulaport + Bastion + Cauldron of Essence.** Each token sacrificed is
1 to *each* opponent four times over, plus Mirkwood Bats for a fifth, plus Marionette Apprentice for
a sixth if it's out. The four life-gains then fire Vito for 4 at one opponent.

> **Roughly 6 to the whole table per 1/1**, doubled by Bloodletter. Cauldron of Essence is on an
> **artifact**, so unlike the rest it survives Blasphemous Edict and every creature wipe.

**Yawgmoth, Thran Physician is the new engine card.** Pay 1 life, sacrifice a creature: a −1/−1
counter *and draw a card*. It is a free outlet, a draw engine and removal in one, bounded only by
your life total. With Skullclamp out, a −1/−1 counter kills the clamped 1/1 and draws two more.

## 5b. Landfall — every land is a token and a Squirrel

Chatterfang adds a Squirrel to every token, and four cards make a token per land: Tireless
Provisioner (Food or Treasure), Tireless Tracker (a Clue), Scute Swarm (a copy of itself at six
lands), Avenger of Zendikar (a Plant per land on arrival, then a counter per land after).
**Oracle of Mul Daya** gives a second land drop and lets you play lands off the top.
**Verdant Catacombs** and **Misty Rainforest** are two landfall triggers each.

**Ancient Greenwarden doubles all of it** — and because "triggers an additional time" makes two
*separately resolving* triggers (CR 603.2d), each is its own creation event, so **Chatterfang
applies to both** (CR 614.5). One land drop with Scute Swarm + Greenwarden is 4 bodies and 4
Mirkwood Bats triggers, not 2 and 2. It also lets you replay lands from the graveyard.

**Awaken the Woods** is the payoff for all of it: X Forest Dryad *land creature* tokens is X tokens
for Chatterfang to double **and** X landfall triggers, doubled again by Greenwarden, and the lands
stay.

## 5c. The ordering law — memorise this one

When several replacement effects want the same token-creation event, **you choose the order**
(CR 616.1), and the order changes the total by a large factor. Always:

> **Peregrin Took → Tippy-Toe → Bilbo → Academy Manufactor → Chatterfang LAST**

Fixed adders, then splitters, then the multiplier. Getting Chatterfang first on a 15-Treasure Orcrist
hit costs you **30 tokens**.

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

1. **Upkeep** — Mycoloth, Chitterspitter. With Oracle of Mul Daya out, check the top of your library
   before you draw.
2. **Main 1 — Bloodletter FIRST if you have it.** Then landfall payoffs, **then** your land drop(s),
   then the other token makers, then the payoff.
3. **Tap for value before you sacrifice** — Gaea's Cradle, Three Tree City and Circle of Dreams
   Druid all read the board, and a sacrificed Squirrel is one less mana. Cryptolith Rite means a
   token can tap for mana *and then* be sacrificed.
4. **Sacrifice in the second main**, once the board is as wide as it will get.
5. **Ninja Pizza** makes a free Food at the beginning of your second main — that is a full token
   event, so it runs the whole §5c cascade.

## 7. The kill — four routes, none of them the combo

**Blasphemous Edict** for `{B}` when there are 13+ creatures on the battlefield (**all players
count**, and the cost is locked when you cast it — they cannot shrink the board in response). You
choose your own thirteen; opponents lose their boards; you bank **thirteen** death triggers that
look back in time. Keep Chatterfang out of your thirteen so the board rebuilds.

**Craterhoof Behemoth.** X is the *number* of creatures and includes Craterhoof itself, determined
once on resolution. ⚠️ **It grants trample, NOT haste** — tokens you made this turn get +X/+X and
still cannot attack. You need **Concordant Crossroads** for the alpha strike to include them.
Deploy every token *before* letting the trigger resolve; creatures made afterwards get nothing.

**Orcrist, Goblin-cleaver on Chatterfang.** He has **forestwalk**, so against any green deck he is
unblockable. Choose Squirrel: a Treasure for each one, tripled by Academy Manufactor, then
Chatterfang last. Fifteen Squirrels is ~90 tokens and ~90 Mirkwood Bats triggers.

**Gruesome Fate** with 20 creatures is 20 to each opponent, 40 with Bloodletter. **Cast it before
you sacrifice** — it counts creatures you control.

**Champion of Lambholt** is the enabler for the two combat routes: after one Avenger of Zendikar it
is a 17/17 and nothing on the table can block you.

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

Then convert with Craterhoof, Orcrist, Gruesome Fate, or the Altar. **Second Harvest** doubles the
board before any of it.

## 9. Mistakes to avoid

1. **Sacrificing with no payoff out.** The most common way to lose this deck.
2. **Applying Chatterfang before the adders.** See §5c — it is the single most expensive misplay
   here, and it is easy to get backwards.
3. **Expecting Craterhoof to grant haste.** It grants trample. Without Concordant Crossroads, this
   turn's tokens sit at home.
4. **Sacrificing in response to Valley Rotcaller's attack trigger.** X is locked on *resolution*, not
   on declare-attackers — let the trigger resolve first or X shrinks.
5. **Forgetting Chatterfang applies to non-creature tokens.** Treasures, Foods, Clues, Servos — every
   one brings a Squirrel. Deadly Dispute makes two bodies, not zero.
6. **Wiping while Vito or Innkeeper are on board** — they die and give you nothing.
7. **Casting Gruesome Fate after the board is gone.**
8. **Tapping Gaea's Cradle or Circle of Dreams Druid after you sacrifice.** Tap first.
9. **Forgetting Mirkwood Bats triggers twice per token** — once on create, once on sacrifice — and
   **once per token**, not once per batch.
10. **Including Chatterfang in your own thirteen for Blasphemous Edict.** You choose; don't pick him.
11. **Counting on Circle of Dreams Druid or Ninja Pizza's Foods the turn they land.** Circle is
    summoning sick without haste; a real Food token is a noncreature artifact and is *not*.

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
   Tippy-Toe (Squirrel Hero) are both legal Squirrels — so are Camellia, Ravenous Squirrel and
   Squirrel Girl. Feed any of them to the cost and the engine stops for every later trigger.
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
actually on board and it solves the ordering and the loop for you.
