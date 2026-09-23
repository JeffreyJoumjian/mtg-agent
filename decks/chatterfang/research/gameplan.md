# Chatterfang — Pilot's Gameplan

## 0. The one-paragraph version

You are a **mana and body economy**. Chatterfang turns every token you make into two, Cryptolith
Rite and Gaea's Cradle turn that board into mana, and the sacrifice outlets turn it into damage.
Drain is the primary plan and nothing you do *requires* combat — but **attacking is close to free
here, so treat a wide board as a real second route.** A token that gets blocked and trades fires
every death trigger you own (Blood Artist, Zulaport, Bastion, Mirkwood Bats, Nadier's Nightblade,
Poison-Tip Archer, Marionette Apprentice) and the life each one gains feeds Vito, Dina and
Blight-Priest. Removing a blocker just means the rest connects. **Either way you are draining.**

## 1. The curve you actually have

| | MV≤1 | MV2 | MV3 | MV4 | MV5 | MV6+ | avg |
|---|---|---|---|---|---|---|---|
| Nonland (64) | 8 | 23 | 20 | 8 | 4 | 1 | **2.70** |

MV≤2 is 31 cards. This is a **lighter** deck than the Edgar sacrifice list (2.90) — you should have
a play every turn from turn 1.

## 2. The three numbers to track

1. **Tokens on board.** One number. Everything scales off it — Gaea's Cradle, Three Tree City,
   Cryptolith Rite, Gruesome Fate, Valley Rotcaller.
2. **Life-gain EVENTS this turn, not life gained.** Dina, Marauding Blight-Priest and Prosperous
   Innkeeper count *sources*. Ten tokens dying with Blood Artist + Zulaport + Bastion out is
   **thirty separate events**, so Dina and Blight-Priest each fire thirty times.
3. **Is Bloodletter out, and is it your turn?** If yes, every number above doubles.

## 3. Opening

**T1–T2:** Bitterblossom, Blade of the Bloodchief, Viscera Seer, Carrion Feeder, Ravenous Squirrel,
a signet. Bitterblossom on turn 2 is a Faerie *and* a Squirrel every upkeep for the rest of the game.

**T3 — the fork:**
- No board → **Chatterfang**. He is the engine; everything after him is worth double.
- Board already → **Cryptolith Rite** (now every token taps for mana) or **Parallel Lives**.
- Long game → **Tendershoot Dryad** or **From Beyond**.

**T4–T6:** deploy a drain payoff under an existing board, not the other way around. A Blood Artist
with nothing to sacrifice is a 0/1.

**Mulligans.** Keep 3 lands with both colours and a 1–2 drop. Ship hands with no token source before
turn 3 — the drain half of the deck does nothing alone.

## 4. The sacrifice decision tree

**Sacrifice when:** you have a free outlet and *any* drain payoff; in response to targeted removal;
in response to a wrath (Plumb the Forbidden converts the board into a fistful of cards).

**Do NOT sacrifice when:** no payoff is on the battlefield — you are just losing bodies; or Dina,
Blight-Priest or Prosperous Innkeeper would die in the same event, because **"whenever you gain
life" has no look-back** and they must be alive as each gain happens. Blood Artist and Zulaport are
fine dying in the same wipe — dies-triggers look back.

## 5. The engine to look for

**Free outlet + Blood Artist + Zulaport + Dina.** Each token sacrificed is: 1 focused (Artist),
1 to each (Zulaport), and 2 more to each from Dina (two separate gain events). With Blight-Priest
that is 4 to each per token. **Roughly 13 across the table per 1/1**, doubled by Bloodletter.

## 6. Sequencing within your turn

1. **Upkeep** — Bitterblossom, Ophiomancer, Tendershoot Dryad, From Beyond, Chitterspitter.
2. **Main 1 — Bloodletter FIRST if you have it.** Then token makers, then the payoff.
3. **Tap for value before you sacrifice** — Gaea's Cradle and Three Tree City read the board, and a
   sacrificed Squirrel is one less mana. Cryptolith Rite means a token can tap for mana *and then*
   be sacrificed.
4. **Sacrifice in the second main**, once the board is as wide as it will get.
5. **Idol of Oblivion** needs a token created this turn — draw before you wipe your own board.

## 7. The kill

**Gruesome Fate** with 20 creatures is 20 to each opponent, 40 with Bloodletter. **Cast it before
you sacrifice**, not after — it counts creatures you *control*.

Otherwise: build to 15+ tokens, then in one turn sacrifice everything to Ashnod's Altar with three
drainers out. Second Harvest doubles the board first if you have it.

## 8. The finish — one combo, one big turn

### 8a. The combo (assembles ~turn 8+)

**Camellia, the Seedmiser + Tippy-Toe OR Peregrin Took + Ashnod's Altar**, plus one Food and any
drain payoff. 10 mana to assemble (9 with Took); the Altar is already a staple you want anyway.

Each iteration, all inside **one step** (mana empties between steps):

1. Sacrifice a Squirrel to **Ashnod's Altar** → `{C}{C}`. *(a creature died — every drainer fires)*
2. Crack a **Food**: pay `{2}`, tap it, sacrifice it → gain 3 life.
   *(Vito drains 3 from one opponent · Dina 1 to each · Blight-Priest 1 to each)*
3. **Camellia** triggers off that sacrifice and makes a Squirrel.
4. **Apply the Food-adder FIRST, then Chatterfang.** Food-adder first = **3 Squirrels + 1 Food**.
   Chatterfang first = only 2 Squirrels. This is a free body every loop and it is easy to get backwards.
5. You are back where you started with a spare Food. Repeat as many times as you choose.

> **Net per iteration: +2 Squirrels, Food replaced, mana neutral, +3 life, one creature dies.**
> Without Chatterfang it is exactly neutral on bodies — but still +3 life and one death per loop,
> so **it is still lethal with a drain payoff even if your commander is gone.**

⚠️ Announce each iteration; opponents get priority between them. Stop when the table is dead.
⚠️ New Squirrels are summoning sick — they **cannot attack** this turn, but they **can** be
sacrificed, because sacrificing involves no tapping.

**Bonus line:** Camellia's own `{2}, Forage` can pay by sacrificing a Food, which re-triggers her.
Same loop, plus **a +1/+1 counter on every other Squirrel each iteration** — that version wins
through combat as well as drain.

**With Academy Manufactor out** the Food the loop returns becomes Clue + Food + Treasure, so each
iteration is far bigger. With both Tippy-Toe *and* Peregrin Took you net an extra Food per loop too.

### 8b. No combo? Then the big turn

**The Unbeatable Squirrel Girl.** `{1}{G}{G}{G}: create X Squirrels, where X is the number of
Squirrels you control` — and Chatterfang matches that number again, so each activation roughly
**triples** your Squirrel count.

| Squirrels before | After one activation |
|---|---|
| 5 | 15 |
| 10 | 30 |
| 20 | 60 |

Mana from **Cryptolith Rite** (older tokens only — anything made this turn is summoning sick),
**Gaea's Cradle**, **Three Tree City** naming Squirrel, and **Hazel of the Rootbloom**, whose ability
taps tokens *as a cost* and so ignores summoning sickness. Hazel and the Cradle are once per turn.

Then convert: sacrifice the board to Ashnod's Altar with three drainers out, or cast **Gruesome
Fate** first, which reads your creature count. **Second Harvest** doubles the board before any of it.

## 9. Mistakes to avoid

1. **Sacrificing with no payoff out.** The most common way to lose this deck.
2. **Forgetting Chatterfang applies to non-creature tokens.** Treasures, Foods, Clues, Servos — every
   one brings a Squirrel. Deadly Dispute makes two bodies, not zero.
3. **Wiping with Toxic Deluge or Meathook while Dina / Blight-Priest / Innkeeper are on board** —
   they die and give you nothing.
4. **Casting Gruesome Fate after the board is gone.**
5. **Tapping Gaea's Cradle after you sacrifice.** Tap first.
6. **Forgetting Mirkwood Bats triggers twice per token** — once on create, once on sacrifice.
7. **Applying Chatterfang BEFORE the Food-adder.** Tippy-Toe or Peregrin Took must be applied first
   or you lose a Squirrel every single time. See §8.
