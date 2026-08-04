# Edgar Markov — Damage Formulas & Math

Companion to `gameplan.md`. Every card in the locked 100 that produces a number, written as a
formula you can evaluate at the table, then the multiplicative pairs ranked by effect.

**Revised 2026-08-04** for the no-combo rebuild. The infinite is gone — Exquisite Blood and
Bloodthirsty Conqueror are permanently in the sideboard. Everything below is fair damage.

---

## 1. Symbols

| Symbol | Meaning |
|---|---|
| `A` | Attacking Vampires you control |
| `V` | Vampires you control (total, attacking or not) |
| `D` | Creatures that died — **any** controller |
| `Dy` | Creatures **you** controlled that died |
| `Do` | Creatures **opponents** controlled that died |
| `C` | Creatures entering under your control |
| `T` | Tokens created (before doubling) |
| `L` | Lord anthem total — the single +X/+X number |
| `K` | +1/+1 counters on a given creature |
| `E` | **Life-gain EVENTS** — count *sources*, not life points |
| `P` | Opponents still alive — normally 3 |

**"Per opponent"** → multiply by `P` for the table total.
**"Focusable"** → the triggers target individually, so you choose who eats them.

---

## 2. The three multipliers

| Multiplier | Effect | Does NOT apply to |
|---|---|---|
| **Bloodletter of Aclazotz** (`BL`) | ×2 all opponent life loss **during your turn**. Damage counts as life loss. | Your life gain. Other players' turns. |
| **Roaming Throne** naming Vampire (`RT`) | ×2 triggered abilities of your **other Vampire creatures** | Mirkwood Bats (a Bat), Purphoros / Warleader's Call (not creatures), **eminence while Edgar is in the command zone** |
| **Elspeth, Storm Slayer** (`EL`) | ×2 **every token** created under your control | Tokens created under an opponent's control (Generous Gift) |

They multiply independently. Sanctum Seeker with `RT` and `BL` online is **4× per opponent**.

> ⚠️ **Roaming Throne and eminence.** Edgar's eminence works from the command zone, but Throne only
> doubles *"a triggered ability of another **creature you control**."* In the command zone Edgar
> isn't one, so eminence is **not** doubled. Once Edgar is on the battlefield it **is** — two tokens
> per Vampire cast, and two counters on every Vampire when he attacks.

---

## 3. Drain & direct damage

### Marauding Blight-Priest — the one people miscount
```
each opponent loses  =  E × BL          E = number of life-gain EVENTS
table total          =  E × BL × P
```
**Count sources, not life.** Per CR 702.15e and 119.9, every separate source that causes you to gain
life is its own event:

| Situation | `E` |
|---|---|
| 6 creatures with lifelink deal combat damage at once (Vault of the Archangel) | **6** |
| Blood Artist + Cruel Celebrant, 3 creatures die | **6** (3 + 3, each resolving separately) |
| One lifelink creature hits three things at once (trample / multi-block) | **1** |
| A spell that says "gain 6 life" | **1** |
| Gain 0 life | **0** |

⚠️ Blight-Priest must be **on the battlefield when each life gain happens**. If it dies in the same
wipe that triggers Blood Artist, it contributes **nothing** — "whenever you gain life" has no
look-back-in-time clause.

### Sanctum Seeker
```
each opponent loses  =  A × RT × BL
you gain             =  A × RT
```
Fires on **declaring** attackers. Blockers, removal and fogs are all irrelevant.

### Vein Ripper
```
target opponent loses  =  D × 2 × RT × BL
you gain               =  D × 2 × RT
```
Counts **any** creature dying, opponents' included. Focusable. Ward—Sacrifice a creature means their
removal feeds your own death triggers. It's a Vampire, so `RT` applies.

### Blood Artist
```
focusable damage  =  D × RT × BL
you gain          =  D × RT
```

### Cruel Celebrant
```
each opponent loses  =  Dy × RT × BL
you gain             =  Dy × RT
```
Only your creatures, but hits every opponent. Planeswalkers count.

### Mirkwood Bats
```
each opponent loses  =  (T × EL  +  tokens sacrificed) × BL
```
Triggers on **create AND sacrifice** — a token made and then sacrificed is **two** hits.
⚠️ It's a **Bat**. Roaming Throne naming Vampire misses it.

### Warleader's Call
```
each opponent loses  =  C × BL
plus                 =  +1/+1 to every creature you control
```

### Purphoros, God of the Forge
```
each opponent loses  =  2C × BL
```
"Another creature," so Purphoros entering doesn't count itself. Indestructible, and below red
devotion 5 it isn't even a creature — it dodges creature removal and your own wipes.

### Malakir Bloodwitch (ETB)
```
each opponent loses  =  V × RT × BL
you gain             =  V × RT × BL × P      (the SUM across the table)
```
The biggest one-shot lifegain in the deck, and it feeds Blight-Priest for **1** event.
At 8 Vampires with Bloodletter: 16 each, **48 for you.**

### Twilight Prophet (upkeep)
```
each opponent loses  =  M × RT × BL      (M = revealed card's mana value)
you gain             =  M × RT
                        + 1 card, every upkeep
```

### Vito / Sanguine Bond
```
target opponent loses  =  G × BL      — per life-gain EVENT, G = life gained that event
```
Per **event**, same counting rule as Blight-Priest. The difference:
**Vito and Sanguine Bond hit ONE opponent for the full amount; Blight-Priest hits ALL THREE for 1.**

### The Meathook Massacre (static half)
```
each opponent loses  =  Dy × BL
you gain             =  Do
```

### Sorin, Imperious Bloodlord (second +1)
```
sac a Vampire  →  3 damage any target  →  3 × BL
               →  you gain 3  →  Vito 3×BL  +  Blight-Priest 1×BL to each
```

---

## 4. Stats & combat

### Any creature's real size
```
power     =  base + K + L + Shared Animosity bonus
toughness =  base + K + L
```

### Shared Animosity — the only quadratic in the deck
```
each attacker gets  =  +(A − 1)/+0
total power added   =  A × (A − 1)
```
A=5 → +20. A=9 → +72. A=12 → +132.

### Cathars' Crusade
```
counters on EACH creature you control  =  C      (per creature entering)
```
Per Vampire spell cast:
```
without Elspeth  →  eminence token enters (+1 all) + the spell enters (+1 all)  =  +2/+2 board-wide
with Elspeth     →  2 tokens + the spell                                        =  +3/+3 board-wide
```
⚠️ It's a **triggered** ability, so its counters land *after* any enters-the-battlefield checks.
That's why it never interferes with power-based ETB triggers.

### Edgar Markov (attack trigger)
```
counters placed    =  V × RT
team stats gained  =  +V/+V aggregate, permanently
```
Every Vampire, attacking or not. ⚠️ `RT` applies only with Edgar **on the battlefield**.

### Cordial Vampire
```
per creature death  =  V × RT counters placed
```
Counts **any** creature, opponents' included.
⚠️ Counters land only on Vampires you control **when the trigger resolves** — survivors only.

### Blade of the Bloodchief
```
per creature death  =  +1 counter on equipped   (+2 if equipped creature is a Vampire)
```
Counts **any** death including opponents'. Equip {1}. In a deck where creatures die every turn this
is the fastest-growing thing on the board.

### Indulgent Aristocrat
```
{2} + sac  →  V counters placed  →  +V/+V aggregate team stats
```
Instant speed. Use **after blockers are declared.**

### Vampire Socialite
```
ETB     →  V − 1 counters placed
static  →  every Vampire enters with +1 extra counter
```
⚠️ The static half is a **replacement effect** — the counter is there as the creature enters, before
any ETB trigger checks its stats.

### Yahenni, Undying Partisan
```
counters gained  =  Do      (if Yahenni survives)
```

### The lords (`L`)
```
Legion Lieutenant     +1/+1
Captivating Vampire   +1/+1
Stromkirk Captain     +1/+1  + first strike
Markov Baron          +1/+1  + lifelink
Edgar, Charmed Groom  +1/+1
Patchwork Banner      +1/+1  (artifact, not a creature)
Warleader's Call      +1/+1  (ALL creatures, not just Vampires)
Lord of Lineage       +2/+2   (flipped Bloodline Keeper)
                     ───────
L max                 +9/+9
```
⚠️ Every Vampire lord says **"other"** Vampires. No lord buffs itself. Patchwork Banner and
Warleader's Call have no such restriction.

### Knight of the Ebon Legion
```
{2}{B}    →  +3/+3 and deathtouch
end step  →  +1 counter if any player lost 4+ life
```

### Vault of the Archangel
```
{2}{W}{B}, {T}  →  your whole team gains deathtouch AND lifelink until EOT
```
With `A` attackers connecting, that's **`A` separate life-gain events** — see Blight-Priest above.

---

## 5. Token production (all ×2 under Elspeth)

| Source | Tokens | Notes |
|---|---|---|
| Edgar — eminence | 1 / Vampire spell | Works from the command zone. ×2 again with `RT` only if Edgar is on the battlefield |
| Bloodline Keeper | 1 × 2/2 flier / turn | {T} ability — summoning sickness applies |
| Elenda — on death | = her power | 1/1 lifelink Vampires |
| Clavileño | 1 × 4/3 flier + a card | When the marked Vampire dies |
| Edgar Markov's Coffin | 1 / upkeep | Flips back at 3 bloodline counters |
| Charismatic Conqueror | 1 × 1/1 lifelink | When an opponent's artifact/creature enters untapped and they don't tap it |
| Black Market Connections | 1 Treasure, 1 × 3/2 | The 3/2 is a **changeling** — counts as a Vampire |
| Deadly Dispute | 1 Treasure | Plus 2 cards |
| Elspeth `+1` | 1 Soldier | ⚠️ Soldiers are **not** Vampires |

### Value of one Vampire spell
```
creatures entering  =  1 (the spell) + 1 × EL (eminence)
                    =  2 without Elspeth,  3 with
```

---

## 6. Card draw

| Card | Formula | Cost / catch |
|---|---|---|
| Scheming Silvertongue | 2 / turn | Needs you to have gained 2+ life that turn. Lose 2 life |
| Florian, Voldaren Scion | look at top `X`, play 1 | `X` = life **all** opponents lost this turn. **Postcombat main only, use it that turn** |
| Emeritus of Woe | tutor 1 → hand | Re-arms whenever 2+ creatures died that turn |
| Plumb the Forbidden | `n` cards for `n` creatures | Lose 1 life each. **Instant — sac in response to a wrath** |
| Deadly Dispute | 2 + a Treasure | Sac an artifact **or** creature |
| Twilight Prophet | 1 / upkeep | Free, plus the drain. Needs 10 permanents |
| Dusk Legion Duelist | 1 / turn | Needs counters placed on it. Cathars' Crusade turns this on every turn |
| Black Market Connections | 1 / turn | Lose 2 life. Modes are cumulative |
| Herald's Horn | 1 / upkeep if it's a Vampire | Free look at the top card |
| Castle Locthwain | 1 | {1}{B}{B}, {T}, lose life = hand size *after* drawing |
| Minas Tirith | 1 | {1}{W}, {T}, only if you attacked with 2+ |
| Path of Ancestry | scry 1 | Free, when its mana casts a Vampire |

### The "prepared" mechanic — Emeritus of Woe & Scheming Silvertongue
Both enter **prepared**, letting you cast a **copy of their spell half**. Casting it unprepares them;
they re-arm when their condition is met again:

```
Emeritus of Woe       re-arms if 2+ creatures died this turn        → copy of Demonic Tutor {1}{B}
Scheming Silvertongue re-arms if you gained 2+ life this turn       → copy of Sign in Blood {B}{B}
```
Both conditions are near-automatic in this deck. The copy is **not** use-it-or-lose-it — cast it any
time you could cast a sorcery while the creature stays prepared.

---

## 7. Sacrifice outlets

| Outlet | Cost | Output |
|---|---|---|
| Viscera Seer | free | Scry 1 |
| Ashnod's Altar | free | `{C}{C}` |
| Yahenni | free | Indestructible until EOT |
| Phyrexian Tower | free ({T}) | `{B}{B}` |
| Master of Dark Rites | free ({T}) | `{B}{B}{B}` — Vampire / Cleric / Demon spells only |
| Indulgent Aristocrat | {2} | `V` counters on your team |
| Plumb the Forbidden | {1}{B} | 1 card per creature — **any number at once** |
| Deadly Dispute | {1}{B} | 2 cards + a Treasure |
| Ruthless Lawbringer | ETB | **Destroy target nonland permanent** |

### Value of one sacrificed token
```
Blood Artist          →  1 × BL   focusable
Cruel Celebrant       →  1 × BL   to EACH opponent
Vein Ripper           →  2 × BL   focusable
Mirkwood Bats         →  1 × BL   to EACH opponent
Meathook Massacre     →  1 × BL   to EACH opponent
Marauding Blight-Priest → 1 × BL  to EACH opponent, per lifegain EVENT the above cause
Cordial Vampire       →  V counters
Blade of the Bloodchief → +2 counters on equipped
Dictate of Erebos     →  each opponent sacrifices a creature
```
With Blood Artist + Cruel Celebrant + Mirkwood Bats + Vein Ripper, one 1/1 token is **~11 life off
the table** before Bloodletter — free, instant speed, in response to anything.

---

## 8. Board wipes — picking X

### The safe-X rule
```
safe X  =  (lowest toughness you want to keep) − 1
where toughness  =  base + K + L
```

### Olivia's Wrath — your best wipe
```
each NON-Vampire gets  −V/−V
```
⚠️ Kills your own Mirkwood Bats and Elspeth's Soldiers. Safe: all Vampire tokens, the Black Market
changeling, Roaming Throne *if you named Vampire*.

### The Meathook Massacre
```
{X}{B}{B}  →  every creature gets −X/−X
           →  Dy × BL to each opponent
           →  Do life for you
           →  the drain half STAYS on the battlefield
```
Meathook is on the battlefield when its own ETB resolves, so it counts every death it causes.

> **Indestructible does not save a 0-toughness creature.** Rule 704.5f — toughness 0 or less goes
> to the graveyard as a state-based action; indestructible only stops *destroy* and lethal damage.

### Surviving someone else's wipe
```
Teferi's Protection   →  phase everything out; you keep the whole board
Plumb the Forbidden   →  sac the board in response, draw 6-8   (also beats EXILE wipes)
Akroma's Will         →  indestructible mode, if you control your commander
Yahenni               →  free indestructible for itself
```

---

## 9. Multiplicative pairs, ranked

### ×4 — Sanctum Seeker + Bloodletter + Roaming Throne
```
each opponent loses  =  A × 4
at A = 9             =  36 each,  108 across the table
```
Unblockable, uninteractable, on the declare-attackers step. **The biggest number in the deck.**

### Alpha strike — Vault of the Archangel + Marauding Blight-Priest
```
A attackers with lifelink connect
  → A separate life-gain events
  → Blight-Priest: A to EACH opponent  (×BL on your turn)
  → Vito:          full combat damage to ONE opponent (×BL)
at A = 8 with Bloodletter  =  16 to each opponent from Blight-Priest alone
```
Deathtouch on the same activation means every blocker trades down.

### Wipe — Meathook + Blood Artist + Cruel Celebrant + Blight-Priest + Vito
```
per YOUR death   Meathook 1 each + Artist 1 focused + Celebrant 1 each
                 → 2 life-gain events → Blight-Priest 2 each
per THEIR death  Artist 1 focused + Vein Ripper 2 focused
```
At `Dy = 7`: 7 each from Meathook, 7 each from Celebrant, 14 each from Blight-Priest, plus 7
focusable from Blood Artist — **~28 to each opponent**, doubled on your turn by Bloodletter.
**Pick X so Blight-Priest and Vito live.** Blood Artist dying is fine (look-back); they aren't.

### Burst — Purphoros + Warleader's Call + Elspeth + eminence
```
cast 1 Vampire  →  3 creatures enter (spell + 2 doubled tokens)
Purphoros        →  3 × 2  =  6 to each
Warleader's Call →  3 × 1  =  3 to each
                            ────────────
                            9 to each,  18 with Bloodletter
                            54 across the table PER VAMPIRE CAST
```
*(This was 12/36 when Impact Tremors was also in the deck — it was cut for Florian.)*

### Engine — free outlet + Blood Artist + Cruel Celebrant + Mirkwood Bats + Blight-Priest
```
per token sacrificed  =  1 focused + 1 each + 1 each + 2 each (Blight-Priest, 2 events)
                      =  ~13 across the table,  ~26 with Bloodletter
```

### Combat — Shared Animosity + wide board + Edgar's counters
```
total power  =  Σ(base + K + L)  +  A × (A − 1)
at A = 9, 1/1 tokens with 3 counters, L = 2  =  9×6 + 72  =  126 power
```

### Lock — Dictate of Erebos + free sac outlet
Every token you sac makes **each** opponent sacrifice. Empties three boards in a turn while feeding
Blood Artist, Cruel Celebrant, Vein Ripper and Blight-Priest.

### Finisher — Vito's {3}{B}{B} + wide attack
Team lifelink means every point of combat damage becomes an equal point of life loss via Vito,
doubled again by Bloodletter — and each attacker is a **separate** Blight-Priest event on top.
Add Akroma's Will's double strike and it doubles once more.

### Grind — Yahenni / Cordial Vampire + your own board wipe
```
Yahenni           →  +Do counters       (a 15/15 at Do = 12)
Cordial Vampire   →  D × V counters     (on survivors only)
```

### Value — Clavileño + Elspeth
Mark your worst token each combat: a card plus **two** 4/3 fliers when it dies.

### Recursion — Phyrexian Reclamation
```
{1}{B} + 2 life  →  creature from graveyard to HAND
                 →  recasting it re-triggers EMINENCE (another token)
                 →  and every ETB payoff again
```
Returns to hand, not the battlefield — that's the feature, not a drawback.

---

## 10. Rules gotchas worth memorising

| Interaction | Ruling |
|---|---|
| **Anthems and entering creatures** | A token is **never** on the battlefield unmodified (CR 611.3c). Anthems apply *as* it enters, before any ETB trigger checks its stats |
| **Vampire Socialite's counter** | A **replacement effect** (CR 614.1d) — applied as the creature enters, so it counts toward power-based checks |
| **Cathars' Crusade counters** | A **triggered** ability — lands after ETB checks, so it never affects them |
| **Lifelink triggers** | Multiple lifelink sources dealing damage simultaneously = **separate** life-gain events (CR 702.15e). One source hitting many things = **one** event |
| **Dies-triggers look back** | Blood Artist / Cruel Celebrant trigger even if they died in the same wipe (CR 603.10a). **"Whenever you gain life" does NOT** — Blight-Priest and Vito must survive |
| **Toughness 0** | Goes to the graveyard as an SBA (704.5f). Indestructible doesn't save it |
| **Eminence** | Triggers on **cast**, from the command zone. Reanimation and "put onto the battlefield" effects miss it entirely |
