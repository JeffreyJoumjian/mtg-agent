# Edgar Markov — two parallel identities (2026-08-25)

Built because the live list feels identity-less in play. `DECK.md`/`STATUS.md` were **not touched**.
Two new files: `DECK-SACRIFICE.md` and `DECK-COMBAT.md`. Both 100 cards, Bracket 3,
3/3 Game Changers (Ancient Tomb · Smothering Tithe · Teferi's Protection), no infinite combos.

---

## 1. The field actually does split — measured, not assumed

EDHREC serves per-theme pages for Edgar. Pulled `aggro` (1,552 decks), `aristocrats` (1,456),
`lifegain` (3,523) and diffed inclusion % per card across the non-land categories.

**Cards the aggro build runs that the aristocrats build does not:**

| Δ | aggro | aristocrats | Card |
|---|---|---|---|
| +26 | 26% | 0% | Vampire Nocturnus |
| +22 | 22% | 0% | Nighthawk Scavenger |
| +20 | 20% | 0% | Vicious Conquistador |
| +18 | 86% | 68% | Stromkirk Captain |
| +18 | 18% | 0% | Dusk Legion Duelist |
| +18 | 80% | 62% | Legion Lieutenant |
| +18 | 50% | 32% | Shared Animosity |
| +17 | 61% | 44% | Markov Baron |
| +17 | 51% | 34% | Vampire Socialite |
| +16 | 61% | 45% | Drana, Liberator of Malakir |
| +13 | 44% | 31% | Knight of the Ebon Legion |
| +12 | 30% | 18% | Shadow Alley Denizen |

**Cards the aristocrats build runs that the aggro build does not:**

| Δ | aristocrats | aggro | Card |
|---|---|---|---|
| +22 | 22% | 0% | Carmen, Cruel Skymarcher |
| +20 | 20% | 0% | Butcher of Malakir |
| +20 | 20% | 0% | Falkenrath Noble |
| +18 | 18% | 0% | Roaming Throne |
| +18 | 18% | 0% | Olivia, Crimson Bride |
| +16 | 37% | 21% | Phyrexian Altar |
| +14 | 38% | 24% | Bartolomé del Presidio |
| +13 | 22% | 9% | Ashnod's Altar |
| +13 | 13% | 0% | Bastion of Remembrance |
| +13 | 46% | 33% | Vengeful Bloodwitch |
| +12 | 26% | 14% | The Meathook Massacre |
| +12 | 12% | 0% | Dictate of Erebos |

**Reading:** the aggro list buys *lords, evasion, cheap attackers and +1/+1 counters*; the
aristocrats list buys *free sacrifice outlets, death payoffs, edicts, recursion and trigger
doubling*. The overlap is large (both run Blood Artist, Cruel Celebrant, Cordial Vampire,
Captivating Vampire) because Edgar's eminence flood feeds both — but the top end genuinely differs.

**Why the live deck feels like mush:** it currently runs *both halves* and the top end of neither.
From the aristocrats column it has Viscera Seer, Ashnod's Altar, Vengeful Bloodwitch, Dictate of
Erebos, Meathook, Vein Ripper, Roaming Throne. From the aggro column it has Stromkirk Captain,
Legion Lieutenant, Shared Animosity, Vampire Socialite, Dusk Legion Duelist, Knight of the Ebon
Legion, Sanctum Seeker. That is not a mistake anyone made — it is what happens when a list is
tuned card-by-card against local questions instead of against an identity.

**Skullclamp footnote:** 77% in the aristocrats theme, 73% in aggro, 61% overall. The field agrees
it is best where free sacrifice outlets are densest — which is the argument made from the rules
side (equip {1} → sacrifice → draw 2 is anthem-independent; only the −1-toughness self-kill mode
cares about anthems).

---

## 2. THE SACRIFICE BUILD — "Blood Tithe"

**Identity: your creatures are ammunition.** Flood with cheap Vampires, then convert them into
damage by sacrificing them. A board wipe is a payoff, not a loss.

**The engine.** 6 sacrifice outlets, 3 of them free (Viscera Seer, Ashnod's Altar, Phyrexian Altar)
plus Yahenni and Bartolomé del Presidio. 7 death-drains, so each sacrifice is 4–7 life off every
opponent. Grave Pact + Dictate of Erebos turn each sacrifice into a table-wide edict. Skullclamp
and Vampiric Rites turn spare bodies into cards. Crossway Troublemakers turns your board dying
into a fistful of cards — it is *optional* ("you **may** pay 2 life"), which is exactly why
Dark Prophecy stays rejected.

**Signature lines**
- Blade of the Bloodchief on Yahenni: sac a token in response to a wipe → indestructible → the
  wipe kills 15 creatures → Blade triggers 15× at two counters each (CR 603.2c) → a 32/32 haste
  survivor. This is the deck's answer to sweepers, and it is why Blade stays.
- Free outlet + Grave Pact + Dictate: sacrifice your own token, each opponent sacrifices twice.
- Skullclamp + Ashnod's Altar: equip {1}, sac to Altar for {C}{C}, draw 2, net +1 mana. Every
  spare eminence token is two cards.

**What it gives up:** Shared Animosity, Vampire Socialite, Sanctum Seeker, Malakir Bloodwitch,
Charismatic Conqueror, Warleader's Call, Knight of the Ebon Legion, Twilight Prophet — the whole
combat top-end. It wins slowly and inevitably, not in one swing.

**Acquisition: 14 new cards, $114.13** — but $89.77 of that is two cards (Phyrexian Altar $55.54,
Grave Pact $34.23), both obvious proxy candidates. The other twelve total **$24.36**.

---

## 3. THE COMBAT BUILD — "Legion"

**Identity: your creatures are damage.** Deploy cheap Vampires every turn, stack anthems and
combat multipliers, kill the table in one alpha strike. Drain is incidental.

**The engine.** 7 anthems/lords, 5 combat multipliers, 3 evasion enablers, 9 one- and two-drops to
flood the board. Edgar's attack trigger puts a counter on every Vampire; Drana adds another on
connect; Shared Animosity gives each attacker +1/+0 per other attacking Vampire; Coat of Arms is
quadratic. Bloodletter of Aclazotz **doubles all combat damage on your turn**.

**Signature lines**
- Vampire Nocturnus with a black card on top: the whole team gets +2/+1 **and flying**. On a
  ten-Vampire board that is a kill from nowhere.
- Shadow Alley Denizen gives a creature intimidate every time a black creature enters — with
  eminence firing on every Vampire cast, something is unblockable every turn.
- Akroma's Will for double strike + flying, with Bloodletter doubling the life loss.

**What it gives up:** Ashnod's Altar, Master of Dark Rites, Dictate of Erebos, The Meathook
Massacre, Vein Ripper, Blade of the Bloodchief, Roaming Throne, Phyrexian Reclamation — all the
grind. If the alpha strike is answered, there is no plan B beyond rebuilding.

**Acquisition: 17 new cards, $48.96** — $20.16 of that is Coat of Arms. The other sixteen total
**$28.80**. This is much the cheaper build.

---

## 4. Deliberate departures from field consensus (grounds recorded)

- **Welcoming Vampire is NOT in the COMBAT build**, despite 83% inclusion in the aggro theme. Scryfall's
  official ruling: *"If creatures enter the battlefield with +1/+1 counters or a continuous effect
  … will apply to the creatures on the battlefield, those effects apply when checking to see if
  Welcoming Vampire's ability will trigger."* The COMBAT build runs **six** anthems plus Vampire
  Socialite's entering counter — two of them out and the 1/1 eminence tokens enter as 3/3s and the
  card stops seeing them. Vanquisher's Banner does the same job keyed to *casting* a Vampire, which
  has no power check. Re-test if the anthem count ever drops below four.
- **Skullclamp is NOT in the COMBAT build** for the same reason inverted: the COMBAT build has the fewest free sacrifice
  outlets of the two builds, so it would be leaning on the self-kill mode the anthems shut off.
- **Coat of Arms IS in the COMBAT build** despite being symmetrical — it pumps opponents' shared-type
  creatures too. Accepted because B is the only build where a quadratic anthem is the payoff.
  Cut it on sight against another tribal deck.
- **Butcher of Malakir passed for the SACRIFICE build** at 20% aristocrats inclusion: {5}{B}{B} is a third
  edict effect at seven mana behind Grave Pact (4) and Dictate of Erebos (6). Sorin, Imperious
  Bloodlord took the slot — a free sacrifice outlet, 3 damage and 3 life every turn, for 3 mana.

## 5. Combo check (Bracket 3 requires no infinite combos)

Both lists exclude Exquisite Blood and Bloodthirsty Conqueror, so Vito and Sanguine Bond have no
"opponent loses life → you gain life" partner and cannot loop. Checked explicitly in the SACRIFICE build:
Oathsworn Vampire + a free altar + any lifegain-on-death payoff is **mana-negative** — Oathsworn
costs {1}{B} to recast and Phyrexian Altar returns one mana per sacrifice, Ashnod's Altar returns
colorless which cannot pay {B}. No loop. **[CORRECTED 2026-09-06: wrong — the eminence token is a second body, so Oathsworn + Phyrexian Altar IS a mana-neutral infinite; see decisions.md and the ledger.]** Both lists validated with
`bun run card --deck … --id wbr`: 96 lines, 96 found, zero legality or colour-identity flags.

---

## 6. Correction applied same day — Emeritus of Woe belongs in the SACRIFICE build

The first draft of the SACRIFICE build dropped **Emeritus of Woe**, which was wrong. Its back face is
Demonic Tutor, and it re-prepares *"at the beginning of your end step, if two or more creatures
died this turn."* In an aristocrats build with three free sacrifice outlets and a token flood,
that condition is met on essentially every turn — so it is a **repeatable Demonic Tutor on a 4-mana
5/4 body**, not a one-shot. Dropping it was slot pressure applied without re-reading the condition
against the deck it was going into.

**Swapped in over Mirkwood Bats**, which was the right card to lose anyway: it is a *Bat*, so it
misses every anthem, Edgar's attack counters and Cordial Vampire's counters — and the SACRIFICE build runs
Anowon, the Ruin Sage, whose upkeep edict makes you sacrifice a non-Vampire creature of your
choice. Mirkwood Bats was the only creature in the SACRIFICE build that Anowon could eat.

the COMBAT build keeps Emeritus out on unchanged grounds: creatures die far less often there, so the
re-prepare condition is unreliable and it is a 4-mana one-shot tutor.

---

## 7. Correction — sacrifice is a death (pilot's catch, 2026-08-25)

CR 700.4: *"The term **dies** means 'is put into a graveyard from the battlefield.'"*
CR 701.21a: *"To sacrifice a permanent, its controller moves it from the battlefield directly to
its owner's graveyard."* Sacrificing therefore satisfies every "dies" trigger. Two calls above were
built on treating deaths as something that happens **to** you rather than something you **do**.

**7a. Emeritus of Woe is reliable in the COMBAT build too — added.**
the COMBAT build was given "re-prepare needs 2+ deaths/turn — unreliable in the COMBAT build." Wrong: it runs Viscera Seer
and Yahenni (both free outlets), Indulgent Aristocrat, Sorin's +1, and Ruthless Lawbringer, on top
of an eminence token flood. Sacrificing two spare tokens costs zero mana. The intervening-"if"
(CR 603.4) checks at the beginning of the end step, so the deaths must land **before** it — do it in
the second main phase, after combat damage, and the attack plan pays nothing.
**In over Markov Baron**, per the ranking already carried forward in `decisions.md`: Baron's lifelink
is on itself only, its madness is dead (no discard outlet in the COMBAT build either), and convoke saves 1–2 mana
only with untapped creatures you weren't attacking with. B still has six anthems.

**7b. Sangromancer is not opponent-dependent in the SACRIFICE build — added.**
It was cut from both versions as "both triggers depend on what opponents do." the SACRIFICE build runs Anowon,
the Ruin Sage (an edict **every upkeep**), Grave Pact, Dictate of Erebos, Olivia's Wrath and The
Meathook Massacre. Opponents sacrificing to those *is* a creature dying, so A manufactures the
trigger — and each gain of 3 is its own life-gain event feeding Vito, Sanguine Bond and Marauding
Blight-Priest. One of your creatures dying with Grave Pact **and** Dictate out means six opponent
sacrifices across a 3-pod = 18 life gained = 18 drained.
**In over Nullpriest of Oblivion**, the least synergistic slot: a 2/1 whose kicker is a 6-mana
reanimate, in a list that already runs Phyrexian Reclamation, Oathsworn Vampire and Carmen.
Its 0% EDHREC showing on the Edgar page is not evidence against it here — the crowd's average Edgar
build has no edict package.

**What survives unchanged:** the COMBAT build still drops Ashnod's Altar, Master of Dark Rites, Plumb the
Forbidden, Deadly Dispute and Blade of the Bloodchief — but the *reason* needed restating. It is not
that the COMBAT build cannot generate deaths (it can, freely). It is that in COMBAT **every creature
sacrificed is a creature not attacking**, whereas in SACRIFICE that IS the plan. That distinction
holds; "the COMBAT build has
almost no deaths" did not.

Both lists re-validated after the swaps: 100 cards, section headers reconciled against contents,
`bun run card --deck … --id wbr` → 96 lines / 96 found, zero flags, 3/3 Game Changers, no loops.

---

## 8. SACRIFICE build — punisher pair added (pilot's call, 2026-08-25)

**IN:** Charismatic Conqueror `{1}{W}` · Blood Seeker `{1}{B}`
**OUT:** Falkenrath Noble `{3}{B}` · Village Rites `{B}`

Pilot's grounds for Conqueror: against a go-wide Edgar, an opponent tapping a creature to deny the
token often has no blocker left, so both halves of the punisher are good for us. Blood Seeker was
found by searching the whole Mardu pool at MV ≤ 4 for triggers on opponents' permanents entering
(11 hits) — it has the *same* trigger event as Conqueror, no tapped/untapped clause so it always
fires, and it is a **Vampire**, so it gets eminence, every anthem, Cordial Vampire's counters and
Sanctum Seeker's drain, and Anowon can't eat it.

**Non-obvious synergy that justifies the pair here specifically:** this build runs Anowon, the Ruin
Sage (edict every upkeep), Grave Pact and Dictate of Erebos. Those *force opponents to replay
creatures* — and every replayed creature is a Blood Seeker ping plus a Conqueror tap-or-token bind.
The edict package manufactures the trigger the punishers need, which is not true of the average
Edgar list.

**ANTI-SYNERGY — do not pair Charismatic Conqueror with an "enters tapped" effect.** Conqueror reads
*"Whenever an artifact or creature an opponent controls enters **untapped**…"*. Authority of the
Consuls, Blind Obedience, Imposing Sovereign and Kinjalli's Sunwing all make opponents' creatures
enter tapped and therefore switch Conqueror off entirely. They read as the same package and are
mutually exclusive.

**Cuts, with grounds:**
- **Falkenrath Noble** — the weakest of seven death-drains. Ranked head-to-head it is a Blood Artist
  at double the cost: both read "whenever this or another creature dies, target player loses 1 life
  and you gain 1 life," but Noble is `{3}{B}` to Blood Artist's `{1}{B}`. Its only edge is a 2/2
  flying body. Cruel Celebrant, Bastion of Remembrance and Zulaport Cutthroat all hit **each**
  opponent rather than one, so Noble was bottom of the role on rate and on cost.
- **Village Rites** — third of three one-shot sacrifice-for-cards spells. Deadly Dispute draws the
  same two cards, adds a Treasure, and can eat an artifact instead of a creature; Plumb the Forbidden
  scales with the number of creatures sacrificed. Village Rites does neither. Draw drops 8 → 7.

**Considered and noted, not acted on:** both new cards are opponent-dependent — against a
creature-light pod they do little. Accepted on the pilot's call, and mitigated by the edict package
above. Kalastria Highborn (`{B}{B}`, 2 life per Vampire death, self-funding off Phyrexian Altar) and
Suture Priest (`{1}{W}`, every token you make is a separate life-gain event feeding Vito / Sanguine
Bond / Marauding Blight-Priest) were surfaced in the same search and remain open candidates.

---

## 9. Curve constraint applied to both builds (pilot's rule, 2026-08-25)

**Pilot's design rule: "I don't want to increase the MV too much. I want both versions to be easily
castable with lots of bodies on board."** Both builds were measured against it rather than eyeballed.

|  | avg MV before | after | creatures MV≤3 before → after | MV5+ before → after |
|---|---|---|---|---|
| COMBAT | 2.94 | **2.84** | 29 → 29 | 7 → 6 |
| SACRIFICE | 3.00 | **2.88** | 19 → 21 | 9 → 7 |

**COMBAT — 4 of the 9 proposed adds taken.** IN: Blade of the Bloodchief (1), Blood Seeker (2),
Deadly Dispute (2), Mirkwood Bats (4). OUT: Coat of Arms (5), Twilight Prophet (4), Unbreakable
Formation (3), Forerunner of the Legion (3). Cuts removed 15 total MV, adds returned 9.
**Declined on curve grounds despite being individually stronger cards:** Vein Ripper (MV6, *triple
black* — the least castable card in either build), Dictate of Erebos (MV5, adds no body), Anowon
(MV5), Roaming Throne (MV4, no body, blank alone), Sangromancer (MV4, and its trigger goes passive
without the edict package we just declined). Coat of Arms was the right cut of the four: five mana,
no body, **symmetric** (pumps opposing tribal creatures), and pure win-more.

**SACRIFICE — curve trim.** OUT Vein Ripper (`{3}{B}{B}{B}`, MV6 triple black) and Sanguine Bond
(MV5, no body, word-for-word Vito at two more mana). IN Kalastria Highborn (`{B}{B}`) and Vampire
of the Dire Moon (`{B}`). Kalastria is the better Vein Ripper for this deck anyway: 2 life per
Vampire death at `{B}` a trigger — self-funding once Phyrexian Altar is down, since the Altar
produces one mana of any colour per sacrifice — on a two-mana body instead of a six-mana one, and
**not** capped once per turn.

**SACRIFICE — Bloodghast added over Phyrexian Reclamation.** `{B}{B}` 2/1 Vampire Spirit,
*"Landfall — Whenever a land you control enters, you may return this card from your graveyard to the
battlefield."* Free, self-recurring sacrifice fodder, one per land drop, forever. In *this* list one
Bloodghast loop per turn triggers Blood Artist, Cruel Celebrant, Zulaport Cutthroat, Vengeful
Bloodwitch, Bastion of Remembrance, Kalastria Highborn, Cordial Vampire's counters, Blade of the
Bloodchief's counters — **and Grave Pact plus Dictate of Erebos, so every opponent sacrifices a
creature every single turn, off one card.** Phyrexian Reclamation was the cut: it returns to *hand*
for `{1}{B}` plus 2 life plus the recast, and the deck now holds two creatures that recur themselves
for free (Bloodghast, Oathsworn Vampire).

**Combo check:** Bloodghast returns only on a land drop, so the loop is once per turn cycle, not
infinite. Bracket 3 intact. Both lists re-validated — 100 cards, headers reconciled,
`bun run card --deck … --id wbr` → 96 lines / 96 found, zero flags.

**Still open:** Indulging Patrician (`{1}{W}{B}`, 1/4 flying lifelink, "at the beginning of your end
step, if you gained 3 or more life this turn, each opponent loses 3 life") — 9 damage across the pod
every turn on a three-mana body, and SACRIFICE clears the lifegain condition automatically.

---

## 10. SACRIFICE manabase — tapped red duals replaced (pilot's call, 2026-08-25)

**Pilot's rule: keep the untapped red duals, replace the *tapped* red duals with B/W duals or basics.**

Measured first. SACRIFICE's red requirement is **four cards, one red pip each** — Edgar Markov
`{3}{R}{W}{B}`, Chaos Warp `{2}{R}`, Stromkirk Captain `{1}{B}{R}`, Purphoros `{3}{R}` — against
fifteen red-producing lands. Heavily oversupplied.

Auditing the red lands showed only **two** are genuinely always-tapped:

| Land | Verdict |
|---|---|
| **Nomad Outpost** — *"This land enters tapped."* | REPLACED |
| **Savai Triome** — *"This land enters tapped."* | REPLACED |
| Blood Crypt · Sacred Foundry | shocklands — untapped for 2 life. KEEP |
| Luxury Suite · Spectator Seating — *"unless you have two or more opponents"* | always untapped in Commander. KEEP |
| Sundown Pass — *"unless you control two or more other lands"* | untapped from land three. KEEP |
| Dragonskull Summit — *"unless you control a Swamp or a Mountain"* | 4 Swamps **and Urborg makes every land a Swamp**. KEEP |
| Blazemire Verge · Sulfurous Springs · Mountain · Cavern of Souls · Command Tower · Three Tree City | untapped. KEEP |
| Path of Ancestry | always tapped, but it is a *tribal utility* land, not a red dual — scry 1 on every Vampire cast. KEEP |

**IN:** Brightclimb Pathway ($4.56 — MDFC, always untapped, choose W or B on the way down) ·
Tainted Field ($0.39 — always untapped; `{T}`: add `{W}` or `{B}` while you control a Swamp, and
Urborg makes every land a Swamp).
**OUT:** Nomad Outpost · Savai Triome (also removes $19.71 of proxy).

**Result:** W 17 · B 25 · R **14 → 12** unrestricted sources. Twelve for four single-pip splash cards
is comfortable, and Cavern of Souls / Three Tree City add two more for Stromkirk Captain
specifically. **Always-tapped lands now number two — Bojuka Bog and Path of Ancestry — and both buy
something for the tempo they cost.**

**Do NOT apply this to the COMBAT build.** It runs **nine** red cards, including Warleader's Call
`{1}{R}{W}` which needs red *and* white in the same cast. That build wants every red source it has.

---

## 11. COMBAT manabase — optimisation pass (2026-08-25)

Measured before touching anything. **Pip distribution across the 63 nonland cards: B 53 · W 18 · R 9.**
COMBAT is a black deck with a white secondary and a red splash — not a genuine three-colour deck.

| Requirement | Cards | Sources | Verdict |
|---|---|---|---|
| BBB at MV4 | Bloodletter of Aclazotz, Vampire Nocturnus | 25 (+ Urborg making every land a Swamp) | adequate |
| BB as early as turn 2 | Cordial Vampire | 25 | fine |
| WW at MV5 | Elspeth, Storm Slayer — the **only** double-white card | 17 | acceptable at that cost |
| R — nine single pips, tightest is Vampire Socialite `{B}{R}` on turn 2 | — | 14 | oversupplied |

Colours were healthy; the real cost was **four always-tapped lands in the deck whose whole plan is
curving out**: Bojuka Bog, Path of Ancestry, Nomad Outpost, Savai Triome.

**IN Tainted Field · OUT Nomad Outpost.** Nomad Outpost is a strictly worse Savai Triome — both
always enter tapped and both tap for `{R}`/`{W}`/`{B}`, but Savai additionally carries the basic land
types Mountain/Plains/Swamp (turning on Dragonskull Summit and Blazemire Verge without Urborg) and
has cycling `{3}`. Tainted Field is always untapped and taps for `{W}` or `{B}` while you control a
Swamp — permanently true with Urborg — so it serves the two colours carrying 71 of the 80 pips.
Red drops 14 → 13, still comfortable for nine single pips.

**Correction logged:** the double-pip scan was briefly doubted because Teferi's Protection was
expected to appear as `{2}{W}{W}`. It is `{2}{W}`. The scan was right and nothing had been dropped —
recalled cost, not verified cost, was the error (deck-brain §1.1 again).

**Final manabases — the two builds now correctly diverge:**

| | W | B | R | always-tapped |
|---|---|---|---|---|
| SACRIFICE (4 red cards) | 17 | 25 | **12** | Bojuka Bog · Path of Ancestry |
| COMBAT (9 red cards) | 17 | 25 | **13** | Bojuka Bog · Path of Ancestry · Savai Triome |

**Caveat on source counting:** Brightclimb Pathway (in SACRIFICE) is an MDFC counted as both a white
and a black source. That is the standard convention — you choose the face you need as you play it —
but it cannot provide both colours in the same game.

---

## 12. Bloodghast REVERTED — cast-trigger miss (pilot's catch, 2026-08-25)

**§9's Bloodghast add is withdrawn. Phyrexian Reclamation is back in.**

Pilot: *"why are we running bloodghast? as a repeatable sac? because it doesn't trigger eminence on
re-entry."* Correct. CR 601.2 — *"To cast a spell is to take it from where it is (usually the hand),
**put it on the stack**, and pay its costs."* Bloodghast's landfall returns it from the graveyard
**to the battlefield**, never touching the stack, so it is not cast and Edgar's eminence
(*"whenever you **cast** another Vampire spell"*) does not trigger.

**This repo had already recorded the same trap.** `research/swaps.md:406` rejected Strefan, Maurer
Progenitor because it *"puts Vampires onto the battlefield, bypassing the cast → no eminence."* The
note was greppable and was not checked before Bloodghast was proposed — a deck-brain §1.1b failure,
not a new discovery.

Three further holes past the eminence miss:
1. Bloodghast is **not a token**, so Mirkwood Bats ("create or sacrifice a **token**") misses it too.
2. The loop is gated on **land drops**, so it stops in the late game when lands run out of hand.
3. It solved a problem this deck does not have — fodder was never the bottleneck. Eminence makes a
   token per Vampire cast, Elspeth doubles it, Bloodline Keeper makes one a turn, Edgar's Coffin one
   an upkeep.

**Phyrexian Reclamation is the correct card here precisely because it returns to HAND** — the recast
is a real cast, so eminence fires, and it rebuys the best creature in the yard (Malakir Bloodwitch,
Elenda, Emeritus of Woe) rather than a 2/1, on any turn, with no landfall gate.

Housekeeping: an empty `## Recursion (0)` header left over from earlier swaps was removed. Card total
was 100 at every step and no card was ever lost — only the header was stale.

Generalised into `LEDGER.md`: in any deck keyed on **casting** (eminence, storm, Prosper, "first
spell each turn"), price reanimation and battlefield-recursion **without** the cast-trigger value and
prefer return-to-hand recursion.

---

## 13. SACRIFICE creature count 33 → 38 (2026-08-25)

**Trigger:** the pilot played a game and drew zero creatures across the opening hand plus eight
draws. Measured rather than dismissed as variance:

| Deck | creatures (of 99) | P(0 in opening 7) | P(0 in 15 cards) |
|---|---|---|---|
| SACRIFICE **before** | 33 | 5.23% | 0.125% — ~1 in 802 |
| original DECK.md | 36 | 3.72% | 1 in 1,763 |
| COMBAT | 40 | 2.29% | 1 in 5,398 |
| SACRIFICE **after** | **38** | **2.93%** | **1 in 3,053** |

So the game was a ~1-in-800 draw — genuinely unlucky, not a broken deck — but **7× likelier in this
build than in COMBAT**, and the cause was mine: every engine added across the session was a
noncreature (Grave Pact, Bastion of Remembrance, Vampiric Rites, Skullclamp, Phyrexian Arena,
Phyrexian Altar, Blade of the Bloodchief), which pushed noncreature slots to 30 in the deck whose
whole plan is *having bodies to sacrifice*.

**It compounds worse than the raw count.** In this list the noncreature cards are *conditional on
creatures* — Grave Pact, Dictate of Erebos, Bastion, Vampiric Rites, Skullclamp, Blade, Deadly
Dispute all do literally nothing with an empty board. A creature-light draw is a hand of blanks,
not merely a slow hand.

**IN (5):** Carrier Thrall (a body that leaves a body — Eldrazi Scion on death), Bloodflow
Connoisseur and Bloodthrone Vampire (**free sac outlets printed on Vampire bodies**, so the engine
count did not drop, it moved onto creatures), Gifted Aetherborn, Vampire Nighthawk. All Vampires —
eminence, anthems, Cordial Vampire, Anowon-safe. $1.33 total.
**OUT (5):** Arcane Signet, Talisman of Hierarchy (7 ramp pieces was generous at avg MV 2.87 with 36
lands), Plumb the Forbidden, Sorin Imperious Bloodlord, Herald's Horn.

### Correction — Chaos Warp and Path to Exile both stay

Both were proposed as cuts and both were wrong, caught by the pilot.

**Chaos Warp:** removal audit shows only *three* cards can hit a non-creature permanent — Chaos Warp,
Generous Gift, and Ruthless Lawbringer (nonland only, needs a creature to sac). Cutting it would have
left two.

**Path to Exile:** the stated ground was "creature-only removal in a deck with ten other ways to kill
a creature." That count was misleading. **Six of the ten are edicts or sweepers where the *opponent*
chooses** (Anowon, Grave Pact, Dictate of Erebos, Olivia's Wrath, The Meathook Massacre) — an edict
never takes their best creature and nobody ever sacrifices a commander to one. Path and Swords are
the only cheap instant-speed answers to a *specific* creature, and the deck's only two **exile**
effects; everything else lets the creature die, which feeds recursion and death-trigger decks.
Field agrees: Path 48% of Edgar decks, Swords 67%, against Herald's Horn at 34%.
**Herald's Horn took the slot instead** — third tribal cost-artifact behind Urza's Incubator (bigger
`{2}` reduction) and Patchwork Banner (which is also an unrestricted mana rock *and* an anthem), and
cost reduction matters less now the curve sits at 2.87.

**Transferable:** never count edicts and sweepers as interchangeable with targeted removal. Ask *who
chooses the target* before treating a role as over-subscribed.

**§13 amendment (pilot's call):** Herald's Horn restored, Bloodthrone Vampire cut instead.
The Horn's upkeep reveal is *card advantage*, not just cost reduction — with 37 creatures in 99,
nearly all Vampires, it hits roughly a third of upkeeps, which is a free card every ~3 turns in the
deck whose original complaint was card draw. That half was under-weighted when it was proposed as
the cut. Bloodthrone Vampire was the weakest of the five creature adds: its `+2/+2` is temporary and
this build rarely attacks, where Bloodflow Connoisseur banks a permanent +1/+1 counter off the same
free sacrifice. Creatures 38 → 37; draw stays at 7. Paying for the Horn out of Deadly Dispute was
rejected — that would have taken draw to 5, undoing the session's main fix.

**Process note:** the pilot asked that swaps be *proposed and discussed before being applied* to any
decklist file, including the draft alternates. Recorded to memory. Naming one cut without ranking the
role, then applying it, is the specific failure this prevents.
