# Edgar Markov — Pilot's Gameplan

How to actually play the deck, turn by turn and board state by board state.
Written for the locked 100 in `DECK.md`.

**Revised 2026-08-04** for the no-combo rebuild. There is no longer an infinite in the deck —
Exquisite Blood and Bloodthirsty Conqueror are permanently sideboarded. Everything here is fair.

---

## 0. The one-paragraph version

You are **not** a creature deck that wins by connecting with attacks. You are a **damage engine that
happens to have creatures.** Most of your damage never touches a blocker: Sanctum Seeker fires on
*declaring* attackers, Blood Artist / Cruel Celebrant / Vein Ripper fire on *death*, Warleader's Call
and Purphoros fire on *entering*, and Marauding Blight-Priest fires every time any of those gain you
life. Every one of them hits all three opponents at once. Combat is how you close, not how you win.
Once you internalise that, the "do I attack or hold back?" question mostly answers itself — **you
attack, because attacking is what turns the engine, and the crack-back is survivable because your
creatures dying is also profitable.**

---

## 1. What actually kills people, ranked

**A. The drain engine (your primary and only win con).** These hit *every opponent simultaneously*,
which is the only way to actually beat three people:

| Card | Trigger | Notes |
|---|---|---|
| Sanctum Seeker | each Vampire you control **attacks** | 1 to *each* opponent, per attacker. Blockers are irrelevant |
| Marauding Blight-Priest | **any time you gain life** | 1 to *each* opponent **per life-gain event** — count sources, not life |
| Cruel Celebrant | any creature/PW **you** control dies | 1 to *each* opponent |
| Blood Artist | **any** creature dies (incl. theirs) | 1 to *one target* — split across players |
| Vein Ripper | **any** creature dies | **2** to one target, and you gain 2 |
| Mirkwood Bats | you **create or sacrifice** a token | 1 to each. Create *and* sac = 2 hits per token |
| Warleader's Call | a creature you control **enters** | 1 to each, **plus a team anthem** |
| Purphoros | another creature you control **enters** | 2 to each. Indestructible |
| Malakir Bloodwitch | ETB | each opponent loses = your Vampire count; you gain the **total** |
| Twilight Prophet | your upkeep (needs 10+ permanents) | each opponent loses the revealed card's mana value |

**B. Combat.** A wide board + lords + Edgar's counters + Shared Animosity kills *one* player per
swing. Use it to remove the player closest to winning, or finish someone the drains already softened.

**C. There is no combo.** This is deliberate. Your "I win" turn is a wide board plus **Vault of the
Archangel** (team lifelink) with Blight-Priest and Vito out — every attacker is a separate life-gain
event, so eight attackers is eight triggers to *each* opponent, doubled by Bloodletter on your turn.

> **The mental reframe:** stop asking "will this attack get through?" Ask "**how many
> triggers does this turn generate?**"

---

## 2. Fixing your tracking problem — the two-number system

Almost everything in this deck buffs **uniformly**. Track exactly two things.

### Number 1: the ANTHEM (lives in your head — one number, applies to every Vampire)

| Card | Anthem |
|---|---|
| Legion Lieutenant | +1/+1 |
| Captivating Vampire | +1/+1 |
| Stromkirk Captain | +1/+1 (**and first strike**) |
| Markov Baron | +1/+1 (**and lifelink**) |
| Edgar, Charmed Groom | +1/+1 |
| Patchwork Banner | +1/+1 |
| Warleader's Call | +1/+1 (**all creatures, not just Vampires**) |
| Bloodline Keeper — *flipped* (Lord of Lineage) | +2/+2 |

Max stack = **+9/+9.** Say it out loud at the start of your turn: *"Everything of mine is +3/+3 right
now."* Don't put dice on the board for this — it's one number, and if the lord dies it all goes away
at once.

⚠️ Every **Vampire** lord says "other" Vampires — no lord buffs itself. Patchwork Banner and
Warleader's Call have no such restriction.

### Number 2: the COUNTERS (physically on cards — these are permanent)

`+1/+1` counters stay through everything, including lords dying. Sources: Edgar's attack trigger,
Vampire Socialite (static + ETB), **Cathars' Crusade**, Cordial Vampire, Indulgent Aristocrat,
Blade of the Bloodchief, Elspeth's `0`, Sorin's `+1`, Knight of the Ebon Legion's end step.

**The physical trick:** Edgar's attack trigger, Cathars' Crusade and Cordial Vampire hit *every*
creature equally, so your board naturally sorts into a few groups. **Lay tokens out in rows by
counter count** with **one die at the head of each row**:

```
row A  ▸ [d6 showing 3]   ██ ██ ██ ██     ← four tokens, 3 counters each
row B  ▸ [d6 showing 1]   ██ ██           ← two newer tokens, 1 counter each
```

When Edgar attacks, bump *every* die by 1. New tokens start a new row.

**Cathars' Crusade is the fiddliest card in the deck** — it triggers on *every* creature entering,
including each eminence token, so one Vampire cast is **two** board-wide bumps (three with Elspeth).
Resolve them one at a time and bump every die each time.

**Vampire Socialite closes the gap for you:** while an opponent has lost life this turn (basically
always), every Vampire enters with an extra +1/+1 counter — fresh tokens arrive as 2/2s.

### Number 3, only during combat: SHARED ANIMOSITY

Each attacker gets **+1/+0 for each other attacking creature sharing a type.** With 9 Vampires
attacking that's **+8/+0 each.** Compute it once at declare-attackers and announce the total.

---

## 3. Turn-by-turn: the opening

### The single most important thing to know about your commander

> **Eminence works from the command zone.** *"Whenever you cast another Vampire spell, if Edgar is in
> the command zone or on the battlefield, create a 1/1 black Vampire token."*

You do **not** need to cast Edgar to get value. He generates a free token off every Vampire spell
from turn 1, from the command zone. **A turn-2 Vampire is really two bodies.**

⚠️ Eminence triggers on **cast**. Reanimation (Phyrexian Reclamation returns to *hand* — that's the
point) and "put onto the battlefield" effects miss it entirely.

### T1–T2 — deploy cheap Vampires, always

Every one- and two-drop is a two-for-one thanks to eminence. Priority:

**1 mana:** `Viscera Seer` · `Indulgent Aristocrat` · `Knight of the Ebon Legion` ·
`Master of Dark Rites` · `Vampire of the Dire Moon`
**2 mana:** `Legion Lieutenant` · `Cruel Celebrant` · `Blood Artist` · `Vampire Socialite` ·
`Charismatic Conqueror` · `Scheming Silvertongue` · `Nullpriest of Oblivion` · `Dusk Legion Duelist` ·
`Cordial Vampire`

Sol Ring or a signet is also a fine T1–T2.

### T3 — the fork: engine, lord, or cost reduction?

- **Board is empty-ish** → build the base. Lord next, Sanctum Seeker the turn after.
- **2–3 bodies already** → `Legion Lieutenant` / `Captivating Vampire` / `Stromkirk Captain` /
  `Markov Baron` (convoke — often costs you one real mana on a wide board).
- **Long game expected** → `Herald's Horn` or `Urza's Incubator`. Together they take **{3} off every
  Vampire**, which is the single biggest thing you can do to your curve. `Black Market Connections`
  is also a great T3 (draw + Treasure + a 3/2 changeling that *is* a Vampire).

### T4–T5 — when to actually cast Edgar

Edgar on the battlefield is **4/4 first strike + haste** and *"whenever Edgar attacks, put a +1/+1
counter on each Vampire you control"* (all of them, attacking or not).

**Cast him when:** you have **3+ other Vampires** and intend to attack this turn or next. Three turns
of attacking permanently makes your whole team +3/+3.

**Hold him when:** the table is packed with open mana and removal and you're getting full eminence
value anyway. He has **haste**, so you lose nothing by dropping him later as a surprise finisher.

**Recasting after removal:** 7 mana the second time, 9 the third. Once is usually correct. He never
stops working from the command zone, so a dead Edgar is a real loss but not a disaster.

### Mulligans

**Keep:** 3+ lands with two colours, at least one 1–2 drop Vampire.
**Ship:** 2 lands with no rock, 6+ lands, or no play before turn 3.
You have 36 lands + 4 rocks. ⚠️ Rocks are down from 9 in the old build — **you cannot keep a
land-light hand expecting a signet to bail you out any more.**

---

## 4. The combat decision tree

Run this in order, every turn:

### Step 1 — Is Edgar on the battlefield? Then Edgar attacks. Almost always.

His trigger puts a permanent counter on **every Vampire you control**, including the ones staying
home to block. Even attacking alone into a board where he'll die, you've permanently grown the team.
He's a 4/4 **first striker**, so he one-sidedly kills most 4-toughness blockers.

Only keep him home if he dies to a blocker for nothing *and* you can't afford the recast.

### Step 2 — Count your payoffs. This sets your whole posture.

- **Sanctum Seeker out?** Attack with **everything that can attack**. Each attacker is 1 to each
  opponent on declaration, whether or not it connects.
- **Aristocrats out (Blood Artist / Cruel Celebrant / Vein Ripper / Blight-Priest)?** Attacking is
  nearly free — creatures dying is profitable.
- **Neither?** You're just attacking. Be more careful.

### Step 3 — Who do you attack?

The player closest to winning, or the one whose board can't punish you. Note that Sanctum Seeker,
Blight-Priest, Cruel Celebrant and Warleader's Call hit **all three regardless of who you attack**,
so pick the target by what combat itself accomplishes.

### Step 4 — How much do you keep home?

Keep back the cards whose value is being alive: Blood Artist (0/1), Viscera Seer (1/1),
**Marauding Blight-Priest (3/2 — it must survive to keep triggering)**, Vito, Blight-Priest's fellow
non-combatants. Everything with counters on it should be attacking.

### Step 5 — Tokens: attack, block, or sacrifice?

Attack by default. A token that gets blocked and dies triggers Blood Artist + Cruel Celebrant + Vein
Ripper + Mirkwood Bats + Blight-Priest — that's ~11 life off the table for a 1/1 you got for free.

---

## 5. The sacrifice decision tree

### Sacrifice when:
- You have a free outlet (Viscera Seer, Ashnod's Altar, Yahenni, **Phyrexian Tower**,
  **Master of Dark Rites**) and any aristocrat out
- In response to targeted removal — get the value before they get the card
- In response to a **wrath** — `Plumb the Forbidden` turns your whole board into 6-8 cards, and it
  beats exile-based wipes that Teferi's Protection can't stop
- To fix mana: Master of Dark Rites turns a free token into `{B}{B}{B}`, Phyrexian Tower into `{B}{B}`

### Do NOT sacrifice when:
- You have no aristocrat out and no mana need — you're just losing bodies
- The creature is holding counters you need for lethal
- **Blight-Priest or Vito would die in the same wipe** — they have no look-back, so they must be on
  the battlefield when the life gain happens

### The engine to look for
**Free outlet + Blood Artist + Cruel Celebrant + Blight-Priest.** Each sacrificed token is 1 focused,
1 to each, and 2 more to each from Blight-Priest (two life-gain events). Roughly **13 across the
table per token**, doubled on your turn by Bloodletter.

---

## 6. Sequencing — order of operations within your turn

1. **Upkeep triggers first** — Twilight Prophet, Herald's Horn, Edgar Markov's Coffin.
2. **Precombat: deploy creatures.** Every Vampire cast makes an eminence token *while the spell is
   still on the stack*, so the token enters first and gets its own Cathars' Crusade trigger, then the
   creature enters and triggers again. Both tokens and the creature trigger Warleader's Call,
   Purphoros and Vampire Socialite.
   - *Exception:* hold mana if you specifically want **Teferi's Protection** or **Akroma's Will** up.
3. **Attack.** Declare attackers → Sanctum Seeker, Edgar's counters, Clavileño, Shared Animosity all
   resolve here, before blockers.
4. **After blockers are declared** — this is when instant-speed pumps and sacs go: Indulgent
   Aristocrat, Vault of the Archangel, Akroma's Will, Plumb the Forbidden.
5. **Postcombat main** — Florian's trigger fires here. ⚠️ **Keep mana up for it**; the exiled card is
   playable *that turn only*.

### Bloodletter of Aclazotz rewrites this
With Bloodletter out, all opponent life loss **on your turn** is doubled. Sanctum Seeker at 8
attackers becomes 16 to each. Blight-Priest doubles. Twilight Prophet doubles. Purphoros and
Warleader's Call double. **Deploy Bloodletter before you attack, never after.**

---

## 7. Scenario library

### ⚔️ Scenario 1 — wide board with aristocrats out
Attack with everything that isn't holding the engine together. Blocks that kill your tokens are
*good* — each death is Blood Artist + Cruel Celebrant + Vein Ripper + Blight-Priest.

### 🛡️ Scenario 2 — same board, no aristocrats
You're a fair creature deck this turn. Attack the open player, keep enough blockers to survive the
crack-back, and spend the turn finding a payoff — `Emeritus of Woe` tutors, `Florian` digs.

### 💀 Scenario 3 — you're clearly the archenemy
Hold `Teferi's Protection`. It answers every wipe including exile effects, and it protects your
whole board plus your life total for a turn cycle. If you don't have it, `Plumb the Forbidden`
converts the board into cards instead.

### 🔥 Scenario 4 — a wrath resolves and you lose everything
1. Did you respond with Plumb? (You should have.)
2. `Phyrexian Reclamation` gets your best creature back **to hand** — recasting re-triggers eminence.
3. `Nullpriest of Oblivion` kicked for `{3}{B}` reanimates directly.
4. Yahenni and Cordial Vampire may have grown enormous off the deaths.
5. Meathook and your aristocrats turned their wipe into damage — count it before conceding the turn.

### 🌊 Scenario 5 — *you* want to wipe
`Olivia's Wrath` is one-sided — only **non-Vampires** get −X/−X. It kills your own Mirkwood Bats and
Elspeth's Soldiers; everything else of yours lives. `The Meathook Massacre` picks X and stays on the
battlefield draining afterwards. **Check Blight-Priest and Vito survive before you pick X.**

### 🐦 Scenario 6 — you need to get through in the air
Fliers: Bloodline Keeper (and its 2/2 tokens), Bloodletter, Twilight Prophet, Malakir Bloodwitch
(pro-white), Vein Ripper, Scheming Silvertongue, Clavileño's 4/3 Demon tokens. `Akroma's Will` gives
the whole team flying + double strike if you control your commander.

### 📈 Scenario 7 — flooded on mana with nothing to do
Sinks: `Knight of the Ebon Legion` ({2}{B} for +3/+3 deathtouch), `Captivating Vampire` (tap five to
steal), `Vito` ({3}{B}{B} team lifelink), `Vault of the Archangel`, `Cabal Coffers` + `Three Tree
City`, `Castle Locthwain` / `Minas Tirith` to draw.

### 🃏 Scenario 8 — you're out of cards
`Scheming Silvertongue` (draw 2 whenever you gained 2+ life — nearly every turn), `Florian`,
`Emeritus of Woe`, `Deadly Dispute`, `Plumb the Forbidden`, `Black Market Connections`,
`Twilight Prophet`.

### 🎪 Scenario 9 — Elspeth is out
Everything doubles. Eminence makes 2 tokens per Vampire cast, which is 2 Cathars' Crusade triggers,
2 Warleader's Call triggers and 4 Purphoros damage to each opponent. Her `−3` also kills any creature
with MV 3+, and her `0` gives the team flying for a turn — that's often your lethal swing.

### 👑 Scenario 10 — Roaming Throne is out
Name **Vampire**. It doubles the triggered abilities of your other Vampire *creatures*: Sanctum
Seeker, Blood Artist, Cruel Celebrant, Blight-Priest, Vein Ripper, Malakir Bloodwitch, Twilight
Prophet, Cordial Vampire.
⚠️ It does **not** double eminence while Edgar is in the command zone — but it does once Edgar is on
the battlefield. It also misses Mirkwood Bats (a Bat) and Purphoros / Warleader's Call (not creatures).

### ⏳ Scenario 11 — someone else is about to win
1. Can you kill them this turn? Count Sanctum Seeker + Blight-Priest + combat.
2. Can you remove the threat? `Swords to Plowshares`, `Path to Exile`, `Chaos Warp`,
   `Generous Gift`, `Ruthless Lawbringer`, Elspeth's `−3`, `Eiganjo` channel, or steal it with
   Captivating Vampire.
3. Can you make them sacrifice it? `Dictate of Erebos` + a free outlet.

### 🩹 Scenario 12 — you're at low life
This deck pays life freely — Black Market Connections, Castle Locthwain, Caves of Koilos,
Sulfurous Springs, three shocks, **Ancient Tomb (2 per tap)**, Phyrexian Reclamation. It adds up.
Stabilise with `Vault of the Archangel` (team lifelink + deathtouch), `Markov Baron`,
`Vampire of the Dire Moon`, `Vito`'s `{3}{B}{B}`, or a `Malakir Bloodwitch` ETB — at 8 Vampires that
gains you **48**.

---

## 8. How to count lethal

```
1. Sanctum Seeker      A × RT × BL          on declaring attackers
2. Warleader's Call    C × BL               per creature entering this turn
3. Purphoros           2C × BL
4. Blight-Priest       E × BL               E = life-gain events this turn
5. Combat damage       Σ(base + K + L) + Shared Animosity
6. Death triggers      whatever trades
```
Add 1–4 first. That's damage to **every** opponent simultaneously and it happens before blockers.
Very often the table is already dead before you count combat.

---

## 9. Trigger checklist — the ones people forget

- ☐ **Eminence** on every Vampire *cast* — even countered spells
- ☐ **Cathars' Crusade** on *every* creature entering, tokens included — twice per Vampire cast
- ☐ **Warleader's Call / Purphoros** on every creature entering
- ☐ **Marauding Blight-Priest** on every *separate* life-gain event — lifelink attackers count
  individually
- ☐ **Sanctum Seeker** on declaring attackers, not on damage
- ☐ **Mirkwood Bats** on create **and** sacrifice
- ☐ **Blade of the Bloodchief** on any creature dying, including opponents'
- ☐ **Vampire Socialite's** counter applies *as* the creature enters (replacement effect)
- ☐ **Dusk Legion Duelist** draws whenever counters land on it — Cathars' Crusade does this every turn
- ☐ **Herald's Horn / Twilight Prophet** on your upkeep
- ☐ **Florian** in your postcombat main — hold mana
- ☐ **Emeritus / Silvertongue** re-arm at end step / second main

---

## 10. Beginner mistakes to avoid

1. **Not attacking.** Sanctum Seeker pays on declaration; blockers are irrelevant.
2. **Holding tokens back to block.** Their deaths are profitable.
3. **Casting Edgar into open removal on an empty board.** He works from the command zone.
4. **Forgetting Bloodletter doubles *before* you attack.** Deploy it first.
5. **Wiping with Meathook without checking Blight-Priest and Vito survive.** They have no look-back.
6. **Not naming Vampire with Roaming Throne or Cavern of Souls.**
7. **Forgetting Olivia's Wrath kills your own Mirkwood Bats.**
8. **Letting Florian's exiled card expire** — it's playable that turn only.
9. **Tapping Ancient Tomb for value you don't need.** It's 2 life a pop and this deck loses races.
10. **Forgetting Urborg** turns on Cabal Coffers, Castle Locthwain, Dragonskull Summit, Isolated
    Chapel and Blazemire Verge all at once.

---

## 11. What changed in the 2026-08 rebuild

The deck used to hold a four-way infinite (Exquisite Blood **or** Bloodthirsty Conqueror + Sanguine
Bond **or** Vito). Both "opponent loses life → you gain life" pieces are now permanently sideboarded,
which kills all four pairings while leaving Vito and Sanguine Bond in — they only convert *your* gain
into *their* loss and can't loop alone.

What replaced the combo as the win condition:

| Added | Job |
|---|---|
| **Marauding Blight-Priest** | Converts the deck's most abundant resource (lifegain) into damage to *all three* opponents |
| **Vault of the Archangel** | Team lifelink from a land — turns one alpha strike into `A` Blight-Priest triggers |
| **Vein Ripper** | Double Blood Artist on a 6/5 flier, and its ward deters wipes |
| **Cathars' Crusade** | Two board-wide pumps per Vampire cast, three with Elspeth |
| **Herald's Horn + Urza's Incubator** | `{3}` off every Vampire — the real curve fix |
| **Teferi's Protection + Plumb the Forbidden** | The two answers to the wraths that kept ending games |

The deck is slower to "win from nowhere" and much harder to disrupt. Games end through accumulated
board presence and drain triggers rather than a two-card kill.

---

## 12. The 60-second cheat sheet

```
UPKEEP      Twilight Prophet · Herald's Horn · Edgar's Coffin
MAIN 1      Bloodletter FIRST if you have it
            Cast Vampires — each is 2 bodies (3 with Elspeth)
            Each cast = 2 Cathars triggers, 2 Warleader's, 4 Purphoros dmg
ATTACK      Everything that isn't holding the engine together
            Sanctum Seeker + Edgar counters + Shared Animosity resolve NOW
BLOCKS IN   Indulgent Aristocrat · Vault of the Archangel · Akroma's Will
            Plumb the Forbidden in response to a wrath
MAIN 2      FLORIAN — hold mana, the exiled card expires this turn

COUNT LETHAL:  Seeker + Warleader's + Purphoros + Blight-Priest, THEN combat
ANTHEM:        one number in your head, max +9/+9
COUNTERS:      dice at the head of each row, bump every die when Edgar attacks
```
