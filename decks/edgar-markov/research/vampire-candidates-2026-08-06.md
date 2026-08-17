# Edgar Markov — 45 Vampire candidates, evaluated card by card (2026-08-06)

Pilot supplied 45 Scryfall links. Every card was pulled with `bun run card` (no recall), grouped by
function, and compared **only against the in-deck card occupying the same role and MV band**
(deck-brain §2.1). Rules questions were verified against `rules/sections/` via `mtg-rules-expert`.

**Constraints held fixed:** Bracket 3 · Game Changers already 3/3 (Smothering Tithe, Ancient Tomb,
Teferi's Protection) · no infinite combos · Mardu identity.

- **Game Changer check:** `is:gamechanger` run over the pool — **none of the 45 are Game Changers**,
  so nothing here costs a bracket slot. (Vein Ripper was also checked and is **not** on the list.)
- **Combo check:** the deck keeps the *you gain → they lose* direction (Vito, Sanguine Bond,
  Marauding Blight-Priest). Nothing in this pool is a *they lose → you gain* **static**, so no
  pairing is created. Exsanguinate, Arrogant Outlaw and Vermin Gorger drain-and-gain as **one-shot
  instructions**, which cannot loop.

**Result: 3 clear upgrades out of 45.** Two near-misses are honest judgment calls, one card is a
sideboard pickup, and the remaining 39 lose to what is already in the deck.

---

## 1. The three swaps

### Swap A — Sanguine Bond ↔ Anowon, the Ruin Sage
`{3}{B}{B}` MV5 enchantment → `{3}{B}{B}` MV5, **4/3 Legendary Vampire Shaman** · $2.70

> At the beginning of your upkeep, each player sacrifices a non-Vampire creature of their choice.

**Deciding axis: recurring interaction.** Every answer in this deck is a one-shot (Swords, Path,
Gift, Chaos Warp, Lawbringer) except Dictate of Erebos, which needs *your* creature to die first.
Anowon is an unconditional edict at **every one of your upkeeps**, and it is one-sided here because
the board is Vampires: Edgar, Yahenni (Aetherborn **Vampire**), Roaming Throne (the chosen type
*is* Vampire), and Black Market Connections' changeling Shapeshifter are all immune.

Verified (CR 608.2d / 101.3 / 609.3): a player controlling **only** Vampires sacrifices **nothing**
and can never be forced to sacrifice a Vampire.

Stacking:
- **Roaming Throne doubles it** — Anowon's upkeep trigger is a triggered ability of a Vampire you
  control → **each player sacrifices two** non-Vampires per upkeep.
- **Dictate of Erebos compounds it** — you also sacrifice (see cost below); that death makes every
  opponent sacrifice *again*. Anowon + Dictate = 2 sacrifices per opponent per upkeep, 4 with Throne.
- Your own sacrifice is fuel: Blood Artist, Cruel Celebrant, Cordial Vampire, Vein Ripper, Elenda,
  Meathook, Blade of the Bloodchief all fire.

⚠️ **Cost, stated plainly (deck-brain §1.3):** *each player* includes **you**. Your non-Vampires are
**Mirkwood Bats**, **Elspeth's Soldier tokens**, and Purphoros (only while red devotion ≥ 5). With a
Soldier token available this is free value — saccing a token also triggers Mirkwood Bats itself.
With **no** token, Anowon eats Mirkwood Bats. Elspeth's `+1` covers this most turns; keep it in mind.

**Out:** Sanguine Bond is the deck's third *gain → they lose* converter, and the only one with no
body, the highest cost, and zero function on an empty board. Vito does the same text at MV3 **on a
Vampire** and adds the `{3}{B}{B}` team-lifelink activation; Marauding Blight-Priest hits **each**
opponent rather than one. Cutting Bond leaves two converters — still redundant enough.

Curve neutral (MV5 → MV5). Vampire count **+1**.

---

### Swap B — Sorin, Imperious Bloodlord ↔ Silversmote Ghoul
`{2}{B}` MV3 planeswalker → `{2}{B}` MV3, **3/1 Zombie Vampire** · $0.33

> At the beginning of your end step, if you gained 3 or more life this turn, return this card from
> your graveyard to the battlefield tapped.
> `{1}{B}`, Sacrifice this creature: Draw a card.

**Deciding axis: Sorin's headline ability lost its justification.** The 2026-07-31 finalizer seated
Sorin because his `−3` *"cheats the deck's heavy 5-drop tier (8 cards) into play."* **That tier no
longer exists.** `−3` puts a **Vampire creature card** from hand onto the battlefield, and the
current list has exactly **two** legal targets above MV4: Malakir Bloodwitch (MV5) and Vein Ripper
(MV6). Everything else it could cheat in is MV4 or below — and after Herald's Horn + Urza's
Incubator take `{3}` off every Vampire creature spell, `−3` is saving one mana at best.

Worse, per the LEDGER (*Eminence triggers on cast, from the command zone*), **`−3` puts the Vampire
onto the battlefield without casting it — no eminence token.** Sorin's marquee ability actively
skips the deck's central engine.

That leaves two small `+1`s: a deathtouch/lifelink grant with a counter, and a sac-outlet-for-3.
Both fine; neither worth a slot.

**In:** a free, repeatable engine that runs off a condition this deck meets nearly every turn.
Sacrifice the Ghoul (Viscera Seer, Ashnod's Altar, Phyrexian Tower and Master of Dark Rites are all
**free** outlets) → every death trigger fires → it returns at your end step → repeat, forever.
Its own `{1}{B}` sac is a **2-mana repeatable draw-a-card each turn** — strictly more reliable than
Dusk Legion Duelist's counter-conditional draw, which is what makes Swap C safe.

It is a **Vampire**, so it dodges Olivia's Wrath and counts for the lords, Sanctum Seeker, Malakir
Bloodwitch and Captivating Vampire.

⚠️ **Sequencing (verified — CR 603.4 intervening-if, CR 513.2, CR 113.6m):** the Ghoul must be
**in the graveyard *before* your end step begins**, and you must have gained 3+ life **before** the
end step begins. Gaining life in response to the trigger is too late — the ability never triggered.
**Sac it in your second main phase, not at end of turn.**

Curve neutral. Vampire count **+1**. Draw sources unchanged in count, improved in reliability.

---

### Swap C — Dusk Legion Duelist ↔ Stensian Sanguinist // Exsanguinate
`{1}{W}` MV2 → `{1}{B}` MV2, **2/2 Vampire Cleric** · $5.27

> Whenever you attack, target creature gains deathtouch until end of turn. Whenever that creature
> deals combat damage to a player this combat, this creature becomes prepared.
> **// Exsanguinate** `{X}{B}{B}` — Each opponent loses X life. You gain life equal to the life lost
> this way.

**Deciding axis: the deck has no mana sink and no scalable non-combat kill.** Every payoff here is
fixed-size. Exsanguinate is a repeatable X-drain attached to a **2-mana Vampire body**, and it
converts the Cabal Coffers / Three Tree City / Ashnod's Altar mana the deck can already generate
into a win.

Verified against the CR (`722.3c`, `601.2b`, `107.3b`, `601.2f`, `601.2i`):
- **You choose X and pay `{X}{B}{B}` in full.** Prepared grants *permission to cast*, not a cost
  waiver, so CR 107.3b (free-casts force X = 0) does **not** apply. All normal cost modification
  applies — but note Herald's Horn and Urza's Incubator only reduce **creature** spells, so
  **Exsanguinate gets no discount.**
- The copy **is cast** (cast-triggers fire), but it is a **Sorcery** with only the back face's
  characteristics — so it is **not a Vampire spell** and **does not trigger eminence**. Casting
  Stensian Sanguinist itself from hand does.
- Sorcery timing only. Once prepared, it stays prepared until you cast — it is not use-it-or-lose-it.

The kill, at X = 4 in a 4-pod, with Bloodletter of Aclazotz out (your turn):
each opponent loses **8** → 24 to the table → **you gain 24** → Vito drains 24 from one opponent,
doubled again by Bloodletter to **48**. Without Bloodletter it is still 12 to the table plus a
12-life swing feeding Vito, Sanguine Bond and Blight-Priest. Same template the deck already uses on
Malakir Bloodwitch, so the interaction is familiar.

The deathtouch grant is not filler either — handing deathtouch to a 1/1 eminence token makes every
block a bad one.

**Out:** Dusk Legion Duelist draws only when +1/+1 counters land on it, once per turn, and the main
counter engine (Cathars' Crusade) is the deck's own acknowledged-fiddly card. Silversmote Ghoul's
unconditional `{1}{B}` draw covers the lost card advantage, so the package is draw-neutral.

**Alternative cut if you want to keep Duelist:** Vampire of the Dire Moon (MV1) — Stensian grants
deathtouch on every attack anyway. Costs you the turn-1 play.

Curve neutral. White pips −1 (20 → 19, against 21 sources — fine), black pips +1.

---

### Package summary

| OUT | MV | IN | MV | $ |
|---|---|---|---|---|
| Sanguine Bond | 5 | **Anowon, the Ruin Sage** | 5 | 2.70 |
| Sorin, Imperious Bloodlord | 3 | **Silversmote Ghoul** | 3 | 0.33 |
| Dusk Legion Duelist | 2 | **Stensian Sanguinist // Exsanguinate** | 2 | 5.27 |

Curve unchanged · creatures +2 · **Vampires +2** (helps Sanctum Seeker, Malakir Bloodwitch,
Olivia's Wrath, Captivating Vampire) · Game Changers still **3/3** · infinite pairings still **0** ·
total **$8.30**.

---

## 2. The two near-misses — genuine judgment calls, not recommendations

Neither clearly beats what it would displace. Listed so the reasoning isn't lost.

### Indulging Patrician `{1}{W}{B}` MV3 — 1/4 flying lifelink Vampire Noble · $0.35
*At the beginning of your end step, if you gained 3 or more life this turn, each opponent loses 3 life.*

9 to the table every turn, passively, no attack required — **18 with Bloodletter**, **36 with
Roaming Throne + Bloodletter**. Its own lifelink helps meet its own condition, and that condition is
shared with Silversmote Ghoul and Scheming Silvertongue, so the three enable each other. The 1/4
flying body is a real blocker in a deck that keeps losing life races.

**Why not recommended:** MV3 is the deck's strongest band and it would have to displace a lord
(Captivating Vampire / Stromkirk Captain) or Marauding Blight-Priest. Blight-Priest wins on merit —
it scales with the **number** of life-gain events (CR 702.15e: simultaneous lifelink sources are
separate events), so an alpha strike with six lifelink attackers is 6 to *each* opponent versus
Patrician's flat 3.

⚠️ **Corrected 2026-08-06 (later in the same session).** The paragraph above originally nominated
**Captivating Vampire** as the anthem to cut, and leaned on a prior verdict ("settled as a keep on a
3/3 field signal") rather than re-deriving. Both halves were wrong:

- The pilot supplied the real grounds for keeping it — *steal, then **sacrifice** with a free outlet
  (Viscera Seer, Ashnod's Altar, Master of Dark Rites)*. That is unconditional removal that also
  feeds every death trigger, and it beats hexproof, indestructible and regeneration. The ability had
  only ever been evaluated as a combat effect.
- Ranking **all four** Vampire lords instead of nominating one flips the answer anyway. **Markov
  Baron is the weakest**: its lifelink is on itself alone, its **madness is dead** (no discard
  outlet in the deck), and convoke saves 1–2 mana and only using untapped creatures you weren't
  attacking with. **Stromkirk Captain** grants the *whole team* first strike, which scales with the
  go-wide plan and Edgar's attack counters.

**If an anthem is ever cut for a payoff, it is Markov Baron** — not Captivating Vampire, not
Stromkirk Captain. See deck-brain SKILL.md §2.1 step 4 (rank the whole role) and §1.1b (a past
verdict is evidence, not a ruling), both written in response to this error.

### Elenda's Hierophant `{2}{W}` MV3 — 1/1 flier · $4.81
*Whenever you gain life, put a +1/+1 counter on this creature. When it dies, create X 1/1 white
Vampire tokens with lifelink, where X is its power.*

Grows off **events**, not life points, so it grows fast here (Sanctum Seeker's attack trigger alone
is one counter per attacking Vampire). X counts **power including anthems**, and last-known
information takes the board state immediately before the death — so with three anthems out a
"1/1" is paying out 7+ tokens, **doubled by Elspeth to 14+**, each one triggering Warleader's Call,
Purphoros, Mirkwood Bats and Cathars' Crusade. That is a kill from an empty board.

**Why not recommended:** it does nothing the turn it lands, needs a sac outlet to cash in, and the
deck already runs Elenda, the Dusk Rose doing the same shape at MV4. Payoff redundancy is fine per
deck-brain §2.5 — but not at the cost of an MV3 lord.

---

## 3. Sideboard pickup

**Tainted Remedy** `{2}{B}` · $8.90 — *If an opponent would gain life, that player loses that much
life instead.* A **permanent** answer to the pilot's documented structural problem (losing lifegain
races, stuck at 15 against lifegain decks) rather than a one-shot — the LEDGER pattern *"prefer the
permanent answer when the role is structural."* Bonus: it deletes the drawback on Swords to
Plowshares. Dead against pods with no lifegain, so it belongs in the standing situational sideboard,
not the 100.

**Sangromancer** `{2}{B}{B}` · $0.85 — 3/3 flier, gain 3 per opponent's creature dying, **each death
a separate event** → Blight-Priest, Vito and Sanguine Bond all fire per death. Rebuilds the life
floor that cutting Bloodthirsty Conqueror removed. Loses the MV4 band to Twilight Prophet, Emeritus,
Elenda, Sanctum Seeker and Roaming Throne — but it is the best "bring in when you need a life floor"
card in the pool.

**Patron of the Vein** `{4}{B}{B}` · $0.34 — ETB destroy a creature; opponents' creatures that die
are **exiled** and every Vampire gets a counter. The best graveyard-hate creature here, relevant
against the recursion deck in this pod. MV6 is the only thing keeping it out — note it costs
`{1}{B}{B}` with Herald's Horn + Urza's Incubator both online.

---

## 4. Full ruling — all 45, grouped by function

### Lords & global static effects

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Ascendant Evincar** | 6 | ❌ | *Nonblack creatures get −1/−1* is a **wipe for your own board**: Charismatic Conqueror's white lifelink tokens, Elenda's death tokens, Mavren-style white tokens and Elspeth's Soldiers all become 0/0. A colour-keyed lord in a deck whose tokens are half white. (deck-brain §1.3) |
| **Bloodlord of Vaasgoth** | 5 | ❌ | Bloodthirst keys on *"an opponent was **dealt damage** this turn"* — **damage, not life loss.** Blood Artist, Vein Ripper, Meathook, Vito and Sanctum Seeker all cause life *loss*, which never turns it on. Vampire Socialite does the same job at MV2 off *"an opponent **lost life**"*, applies to tokens as well as cast spells, and costs 3 less. |

### Repeatable drain engines

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Stensian Sanguinist // Exsanguinate** | 2 | ✅ **SWAP C** | See above. |
| **Indulging Patrician** | 3 | 🟡 near-miss | See above. |
| **Creeping Bloodsucker** | 2 | ❌ | 1 damage to each opponent per upkeep, free, forever — real but small, and the MV2 band is the deck's strongest (Blood Artist, Cordial, Celebrant, Conqueror, Socialite, Nullpriest, Silvertongue). $5 for 3 damage a turn is poor value. |
| **Vermin Gorger** | 2 | ❌ | 2 from each opponent per turn for free is decent, but it **taps** (once per turn, summoning-sick) and it only counts *your own* sacrifices. Blood Artist counts **every** death including opponents', unlimited, and is already in. |
| **Cliffhaven Vampire** | 4 | ❌ | Text-identical to Marauding Blight-Priest (in deck at MV3), one mana more and in worse colours. Better body (2/4 flier) doesn't cover a full mana in the deck's most crowded band. |
| **Arrogant Outlaw** | 3 | ❌ | One-shot ETB, 6 to the table, conditional on prior life loss. Malakir Bloodwitch does the same shape and **scales with your Vampire count**. |
| **Blood Seeker** | 2 | ❌ | Entirely reactive and opponent-dependent. Charismatic Conqueror punishes the same trigger by giving **you** a lifelink Vampire token — strictly more useful, already in. |
| **Anje, Maid of Dishonor** | 4 | ❌ | Blood token once per turn plus a `{2}` drain outlet. Vermin Gorger does the drain half for free at MV2, and MV4 is the crowded band. |

### Aristocrats fodder & recursion

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Silversmote Ghoul** | 3 | ✅ **SWAP B** | See above. |
| **Elenda's Hierophant** | 3 | 🟡 near-miss | See above. |
| **Bloodcrazed Paladin** | 2 | ❌ | Enters with counters per creature that died this turn, then it is a vanilla body with **no ability**. Cordial Vampire converts the same deaths into counters on the **whole** Vampire board, permanently. |
| **Paladin of Atonement** | 2 | ❌ | Grows off *"if you lost life last turn"* — live here (pain lands, Black Market Connections, Plumb, Reclamation) but only ~1–2 counters per round in practice, and the death payoff is just lifegain. Loses to every one of the nine MV2 cards already in. |

### Removal on a body

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Anowon, the Ruin Sage** | 5 | ✅ **SWAP A** | See above. |
| **Vona, Butcher of Magan** | 5 | ❌ | *"Pay **7 life**"* per activation in the deck that cut Toxic Deluge and Champion of Dusk specifically for life cost, runs 6 pain lands + Ancient Tomb + Black Market Connections, and lost real games to lifegain races. Vigilance/lifelink 4/4 is a fine body attached to an unusable ability. (deck-brain §1.3) |
| **Patron of the Vein** | 6 | ❌ → SB | Strong, but a **second** 6-drop in a list the swap log repeatedly calls top-heavy. Best sideboard creature in the pool. |
| **Dark Impostor** | 3 | ❌ | Repeatable **exile** removal is unique here, but `{4}{B}{B}` per activation is 6 mana for one creature. Too slow to compete with deploying at Bracket 3. Closest of the rejected removal bodies. |
| **Gatekeeper of Malakir** | 2 | ❌ | Kicked cost is `{B}{B}{B}` — **all coloured, so Herald's Horn and Urza's Incubator reduce it by nothing**. Hits one opponent, who chooses, in a pod full of tokens. Ruthless Lawbringer destroys **any** nonland permanent, targeted. |
| **Bishop of Binding** | 4 | ❌ | An O-Ring on a 1/1 in a deck with five sac outlets, two wipes and Ashnod's Altar. Every way this deck generates value hands the creature back. |
| **Vein Drinker** | 6 | ❌ | 6 mana, needs `{R}` (16 sources), and the fight-back clause kills it against anything with 4+ power. |
| **Butcher of Malakir** | 7 | ❌ | 7 mana. Dictate of Erebos is the same effect at MV5 **with flash**. Already Tier-3 rejected on 2026-08-03; confirmed. |
| **Voldaren Pariah** | 5 | ❌ | Sacrifice **three** creatures so that **one** opponent sacrifices three. Dictate of Erebos hits every opponent off a single death. |
| **Kalitas, Bloodchief of Ghet** | 7 | ❌ | 7 mana, then `{B}{B}{B}` + tap per activation. |

### Token makers

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Mavren Fein, Dusk Apostle** | 3 | ❌ | One token per attack step (two with Elspeth), and the tokens arrive **after** attackers are declared so they never attack that turn. Bloodline Keeper makes a **2/2 flier every turn** with no attack required. Was already a Phase-5 "close call left on the table"; confirmed. |
| **Baron Bertram Graywater** | 4 | ❌ | Phase 5 rejected it on draw rate; re-checked **including** the token clause. That clause is *"only once each turn"* — one 1/1 per turn (two with Elspeth), and `{1}{B}` + a sacrifice per card drawn is 3 mana a card. Not enough against Twilight Prophet / Emeritus / Elenda / Sanctum Seeker / Roaming Throne. Confirmed. |

### Draw & selection

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Callous Bloodmage** | 3 | ❌ | Three small modes. The graveyard-exile mode is real hate but Bojuka Bog already covers it for free in the manabase. |
| **Balustrade Spy** | 4 | ❌ | Mill with no payoff — the deck has no reanimator plan beyond Phyrexian Reclamation and Nullpriest's kicker. |
| **Anje Falkenrath** | 3 | ❌ | A rummaging engine that needs madness density. The deck has **one** madness card (Markov Baron). Loot ≠ card advantage. |
| **Olivia, Mobilized for War** | 3 | ❌ | Best of the rejects here — haste for the whole board, and it turns Mirkwood Bats and Elspeth's Soldiers into Vampires (lords, Sanctum Seeker, Olivia's Wrath). But **discard a card per trigger** is card disadvantage with almost no madness/graveyard payoff, and a 3/3 flier doesn't beat a team-wide first-strike lord. |

### Grow-a-creature / combat

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Necropolis Regent** | 6 | ❌ | The best MV6 candidate — *"whenever a creature you control deals combat damage to a player, put that many counters on **it**"* is **team-wide permanent doubling** every combat. Loses on cost: `{3}{B}{B}{B}` in a top-heavy list that already has Vein Ripper and a 6-mana commander, and it needs damage to connect first. Note for a future big-mana build. |
| **Westgate Regent** | 5 | ❌ | 4/4 flier that doubles on connection, ward—discard. Malakir Bloodwitch at the same MV drains **immediately** on ETB and has **protection from white** (dodges half the format's removal). |
| **Sengir, the Dark Baron** | 6 | ❌ | Two counters per death grows fast here, but 6 mana for **zero** immediate impact, and the second ability (gain life when a player loses the game) is near-blank. |
| **Havengul Vampire** | 4 | ❌ | Yahenni does the death-counter job at MV3 **and** gives itself indestructible. |
| **Slaughter Specialist** | 2 | ❌ | 3/3 for two is above rate, but *"each opponent creates a 1/1 Human"* hands **three chump blockers** to the table in a deck whose plan is attacking wide — and feeds opponents' own aristocrats. |
| **Malakir Cullblade** | 2 | ❌ | Cordial Vampire is the same trigger putting a counter on **every** Vampire, and counts your own deaths too. |
| **Scion of the Swarm** | 5 | ❌ | MV5 3/3 flier whose only text grows **itself**. Elenda's Hierophant does the identical growth at MV3 with a death payoff attached. |
| **Vampire Scrivener** | 5 | ❌ | MV5 2/2 flier accumulating counters on itself. Same problem, worse body. |
| **Alluring Suitor** | 3 | ❌ | Transforms only when you attack with **exactly two** creatures. This deck attacks with five or more. Textbook "does the trigger condition ever happen" failure. |
| **Voldaren Thrillseeker** | 3 | ❌ | Backup 2 plus a one-shot sac-fling. A red 3-drop that does neither job as well as what's in. |
| **Bloodrage Vampire** | 3 | ❌ | Bloodthirst 1 on a 3/1. Effectively vanilla. |
| **Rakish Heir** | 3 | ❌ | Already cut from this deck as *"weakest card — slow, attack-only counter, 1/3 premium."* Nothing has changed. Confirmed. |

### Lifegain / life floor

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Sangromancer** | 4 | ❌ → SB | See §3. |

### Mana

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Nirkana Revenant** | 6 | ❌ | Genuinely enormous **with Urborg** — every land becomes a Swamp, so every land tap adds an extra `{B}`, roughly doubling the manabase. But the deck's diagnosed problem is a top-heavy curve, not mana, and this is another 6-drop. **Revisit only if** you build toward the Cabal Coffers / X-spell plan — Nirkana + Coffers + Urborg + Exsanguinate is a coherent big-mana package, and that would be a different deck. |

### Hate

| Card | MV | Verdict | Reason |
|---|---|---|---|
| **Tainted Remedy** | 3 | ❌ → SB | See §3. |

---

## 5. Rules findings from this pass (also appended to the deck-brain LEDGER)

1. **Casting a "prepared" copy is a normal cast.** You announce and pay X yourself (CR 601.2b);
   CR 107.3b does not apply because prepared grants permission, not a cost waiver. The copy has
   **only the prepare spell's characteristics** (CR 722.3c), so a creature's prepared sorcery is
   **not a creature spell** and misses eminence and every other tribal cast-trigger.
2. **Bloodthirst reads *dealt damage*, not *lost life*.** A pure drain deck never turns it on.
3. **Anowon-style edicts naming a type:** a player with none of the required type sacrifices nothing
   and can never substitute (CR 608.2d / 101.3 / 609.3).
4. **Silversmote Ghoul-style end-step recursion is an intervening-if** (CR 603.4): the card must
   already be in the graveyard and the life must already be gained **before the end step begins**
   (CR 513.2 — the step does not back up).
