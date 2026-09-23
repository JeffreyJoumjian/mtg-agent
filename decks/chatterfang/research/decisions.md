# Chatterfang — Decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not the verdict.

---

## 2026-09-22 — Founded. Brief, commander choice, and the whole 100

### The brief

From the pilot, after two rounds narrowing down a replacement for Edgar Markov: *"let's make a
drain archetype deck. we can build from scratch even… i don't care if we're creating squirrels or
fish or whatever. the goal is to keep the drain archetype, create as many tokens, sac em and
drain."* Then, on the ranking axis: *"we don't also just want the lowest salt one. we want
something that's the best but if it has a high salty factor let me know."* Then: *"i'm okay to have
a late game combo on the deck like turn 8+ and maybe not two card infinite."*

So: **power first, salt reported, no two-card infinite, a real late-game combo is welcome.** Built
alongside `decks/teysa-karlov/` as a deliberate A/B — the pilot will play both and keep the one
they like.

### Why Chatterfang

Scored every commander-legal legend that makes tokens, sacrifices, or drains by **how many of the
loop's three jobs it does from the command zone** (make bodies / be the outlet / be the payoff) —
see LEDGER 2026-09-22 "Score an aristocrats commander by which of the loop's three jobs". Chatterfang
does two, and its body-making is the widest in the format because the replacement effect keys on
**any** token creation under your control, not just creatures: a Treasure from Deadly Dispute, a Food
from Tireless Provisioner, all three of Academy Manufactor's tokens, each arrives with an equal number
of Squirrels. Green then has the deepest token pool in Magic, and Golgari's drain suite is as deep as
Orzhov's.

**Salt, reported not minimised: 0.96/4 on EDHREC — the highest of the shortlist, against Edgar's
2.05.** Rank #29 commander, 27,793 decks. The reason for the score is the combo reputation (866 of
its decks are tagged Combo), not a miserable play pattern. Named so the pilot can weigh it.

Runners-up and why not: Teysa Karlov 0.53 (built in parallel); Ghave, Guru of Spores 0.29 — best
colours, but every Ghave infinite runs through a mana-producing sacrifice outlet, so a fair Ghave
gives up Ashnod's Altar, Phyrexian Altar and Pitiless Plunderer, which is most of what makes him
good; Prossh 0.80 — Jund's drain is thinner; Korvold 1.65 — strongest card on the list, but it
neither makes tokens nor drains, so it is the wrong job at the worst salt.

### Role skeleton (SKILL §2.1) — targets set before any card was picked

| Role | Target | Built |
|---|---|---|
| Commander | 1 | 1 |
| Lands | 36 | 36 |
| Ramp & Mana | 8 | 8 |
| Card Draw | 9 | 9 |
| Removal & Interaction | 7 | 7 |
| Board Wipes | 2 | 2 |
| Token Engines | 16 | 16 |
| Token Doublers | 2 | 2 |
| Sacrifice Outlets | 5 | 5 |
| Drain Payoffs | 12 | 12 |
| Finishers | 2 | 2 |

Ten ways to convert a body, counting the four on lands and Skullclamp, against five outlet *spells* —
deliberate, because the outlet is the bottleneck in every aristocrats draw.

### The deliberate late-game combo — declared, not hidden

**Sprout Swarm + Chatterfang + BOTH token doublers**, on a board of five or more creatures.

Sprout Swarm is {1}{G} with **convoke** and **buyback {3}** — total {4}{G}, paid entirely by tapping
five creatures, and convoke ignores summoning sickness so the tokens it just made can pay for the next
cast. One Saproling is created; Parallel Lives doubles it to 2, Doubling Season doubles again to 4,
then Chatterfang adds an equal number of Squirrels for **8 tokens from 5 taps — net +3 per iteration**,
repeatable as many times as the pilot chooses to announce.

- With only **one** doubler it is 4 tokens for 5 taps — **net negative, not a loop.** Both doublers are
  required, which is what makes this a genuine turn-8-or-later line rather than an early kill.
- It is a **chosen-N loop**: every iteration is an optional cast the pilot announces and opponents can
  respond to. That is the category the pilot explicitly allows (memory `loop-policy-chosen-n`,
  2026-09-06), and it satisfies "not a two-card infinite" — it needs three in-deck cards plus the
  commander plus a board.
- **To switch it off**, cut Sprout Swarm. Nothing else in the deck loops.

### Fair-build exclusion — the one hard cut

**Pitiless Plunderer is deliberately NOT in this deck**, despite 67% inclusion on the Chatterfang page
and being one of the best cards in the archetype. Plunderer reads *"Whenever another creature you
control dies, create a Treasure token"*; Chatterfang turns that Treasure into a Treasure **plus a
Squirrel**, and the Treasure pays the {B} for Chatterfang's own sacrifice ability. That is a **two-card
automatic engine with no third piece and no free outlet needed** — exactly what the pilot ruled out.
If the rule ever relaxes, Plunderer is the single best add and it goes in over Prosperous Innkeeper.

Also checked and clear: Earthcraft (not run, infinite with Squirrel Nest on a basic), Blasting Station
(not run, infinite with any death-to-token effect), Nim Deathmantle (not run).

### Cards rejected on their merits, with the grounds

- **Camellia, the Seedmiser** — *"Whenever you sacrifice one or more Foods, create a Squirrel."* Gated
  on Foods; the deck has three Food sources. Replaced by **Valley Rotcaller**, whose attack trigger
  drains each opponent for the number of other Squirrels/Bats/Rats/Lizards — ungated, and the life it
  gains is one more event for Dina and Blight-Priest.
- **Swarmyard** — regenerates Squirrels. **Anti-synergy**: this deck wants its creatures to die
  (SKILL §1.3, check the card against your own board). Replaced by **Khalni Garden**, a land that makes
  a Plant token, which Chatterfang turns into two bodies.
- **Vindictive Vampire** — 4 mana for what Zulaport Cutthroat does at 2, and it deals *damage* rather
  than gaining life, so it feeds neither Dina nor Blight-Priest. Replaced by **Marauding Blight-Priest**.
- **Syr Konrad, the Grim** — genuinely broad (any creature dying anywhere, plus cards leaving the
  graveyard), but 5 mana and it gains no life, so it sits outside the deck's lifegain-event engine.
  Replaced by **Prosperous Innkeeper**, which gains 1 life for **every** creature entering — with 20
  tokens a turn that is 20 separate life-gain events feeding Dina and Blight-Priest.
- **Primal Vigor** as a third doubler — it is symmetric and doubles **opponents'** tokens too. Held to
  the sideboard rather than run.
- **Dictate of Erebos / Grave Pact** — left out and raised with the pilot rather than silently
  excluded (memory `users-pod-tendencies`: never silently exclude on pod grounds, ask). They are
  among the strongest cards available here; they are also the exact play pattern that makes a table
  resent a deck, which is the thing this whole build exists to avoid.

### Rules facts this list is built on (all verified 2026-09-22)

- Token doublers and Chatterfang are **replacement effects that multiply**, and the controller
  chooses the order (CR 616.1). Chatterfang + Parallel Lives + Doubling Season = 8 tokens per single
  token created.
- **Blood Artist and Zulaport still trigger when they die in the same wipe** — dies-triggers look back
  (CR 603.10a). **Dina, Soul Steeper, Marauding Blight-Priest and Prosperous Innkeeper do not** —
  "whenever you gain life" has no look-back. Cast Gruesome Fate *before* the wipe, not after.
- **Simultaneous life-gain sources are separate events** (CR 702.15e; LEDGER 2026-07-31). Blight-Priest
  and Dina count *sources*, not life, so three drainers × ten deaths is thirty triggers each.
- **A token that leaves the battlefield triggers before it ceases to exist** (CR 111.7) — Nadier's
  Nightblade and Mirkwood Bats both see tokens dying.

### Validation

`bun run card --deck decks/chatterfang/DECK.md --id bg` — 89 lines, 89 found, **no off-identity, no
illegal cards**. 100 cards. Every section header count matches its contents. STATUS.md generated from
DECK.md so the two cannot drift on names. `bun run deck:moxfield chatterfang` regenerated.
**Game Changers: 1/3 (Gaea's Cradle)** — inside Bracket 3.

---

## 2026-09-22 — Audit of the pilot's known favourite / pet cards

The pilot asked: *"you already know about some of my favorite cards so don't put them in there if
they don't earn their spot but point them out for me."* Every card this repo records the pilot
championing, defending or asking for, scored against **this** list. Verdicts are re-derivable — the
grounds are stated so a later pass can disagree.

**Earned a slot, on merit (not sentiment):**

| Card | Why it earned it here |
|---|---|
| Skullclamp | 1/1 tokens are its perfect target; two cards per body and it doubles as an outlet |
| Ashnod's Altar · Viscera Seer · Phyrexian Tower | Free outlets — the bottleneck role; Altar also ramps |
| Plumb the Forbidden | Still the best answer to a wrath: converts the whole board into cards |
| Deadly Dispute · Village Rites | Cheap draw that *is* a sacrifice; Dispute's Treasure makes a Squirrel |
| Marauding Blight-Priest | Counts life-gain **events**, and this deck makes dozens per turn |
| Mirkwood Bats | Triggers on **create AND sacrifice** — two hits per token, the best rate in the deck |
| Bloodletter of Aclazotz | Doubles every point of the above on your turn |
| Urborg · Cabal Coffers · Takenuma · Castle Locthwain · Bojuka Bog | Carried over on land-quality merit |
| Blood Artist · Zulaport Cutthroat · Bastion of Remembrance | The core; nothing outclasses them |

**Did not earn a slot — named here rather than quietly dropped:**

- **Blood Seeker** — the pilot overrode my cut of this in Edgar and was right: *"blood seeker is a
  hard counter to token decks."* That argument is about **the pod**, not this deck, and it still
  holds. It contributes nothing to our own loop, so it is off the 100 on *rate* — but if the pod has
  a token deck in it, say so and it goes straight in over Nested Shambler.
- **Dark Ritual / Master of Dark Rites** — the pilot asked for both in Edgar, and memory records fast
  mana as a protected cut. The Edgar grounds were a cheap curve wanting explosive turn-2 Vampires.
  Here there is no single huge payoff to ritual into; the deck's mana engine is Cryptolith Rite and
  Gaea's Cradle turning the *board* into mana. Left out on that ground alone — happy to be overruled.
- **Roaming Throne** — doubles triggers of *another creature you control of the chosen type*. The
  drain payoffs here are a Vampire, a Human Rogue, an Elf, a Bat, a Dryad and a Halfling. No single
  type catches more than two. It was excellent in a tribal deck and is a 4-mana 4/4 here.
- **Cathars' Crusade · Elspeth, Storm Slayer · Anointed Procession · Smothering Tithe** — **white,
  not legal in Golgari.** All four are in the Teysa list instead; that is one real difference between
  the two decks.
- **Purphoros · Warleader's Call · Shared Animosity · Infantry Shield · Chandra's Ignition** — red,
  not legal here.
- **Vito, Thorn of the Dusk Rose** — single-target, where Dina, Soul Steeper does the same job to
  *every* opponent for the same two mana and is on-colour-pip. Dina is in; Vito is the Teysa list's
  version of this slot.

---

## 2026-09-22 — Roaming Throne re-derived, then declined by the pilot

The pilot asked whether Roaming Throne would make the commander trigger again, and whether a higher
Squirrel/Human count would justify it.

**Correction to my founding entry.** I wrote that no single creature type catches more than two
cards. That was wrong and I had not counted. The real counts: **Teysa naming Human — 10 cards**
(Zulaport, Marionette Apprentice, Grim Haruspex, Morbid Opportunist, Ministrant, Orzhov Enforcer,
Imperious Oligarch, Doomed Traveler, Hunted Witness, Teysa Orzhov Scion); **Teysa naming Vampire —
6** (Blood Artist, Cruel Celebrant, Falkenrath Noble, Blight-Priest, Vito, Elenda);
**Chatterfang naming Squirrel — 3** (Valley Rotcaller, Toski, Ravenous Squirrel); Chatterfang naming
Vampire — 3.

**What is still true, and answers the pilot's actual question:** Roaming Throne doubles **triggered
abilities only**. Chatterfang's token ability is a **replacement effect** ("if tokens would be
created … instead", CR 614.1) and Teysa's is a **static ability**. Neither is a triggered ability, so
the Throne never doubles either commander. And Throne stacked with Teysa on one trigger is **3
instances, not 4** (CR 603.2d — "additional time" effects add, they do not multiply).

**Pilot's call: leave it out of both for now** — *"it doesn't seem like roaming throne is adding much
value currently so let's leave it out."* Grounds to re-test against if this is revisited: the Teysa
Human count of 10 is real and the card would take doubled drains to tripled; what it costs is 4 mana
on a 4/4 that does nothing else, and a name that locks in one type. It gets materially better if
Maskwood Nexus is ever added, because every creature then counts.

---

## 2026-09-23 — APPLIED: two swaps, and the declared combo is gone

Snapshot: `versions/2026-09-23-before-squirrel-swaps.md`

```
  OUT  Sprout Swarm          {1}{G}   ->  IN  The Unbeatable Squirrel Girl   {1}{G}{G}{G}
  OUT  Awakening Zone        {2}{G}   ->  IN  Hazel of the Rootbloom         {2}{B}{G}
```

**Sprout Swarm out — the pilot was right and I conceded.** *"sprout swarm looks really bad. it's so
much mana for nothing it feels like."* Re-derived honestly: with both doublers it is 8 tokens for 5
convoke taps (net +3, the founding entry's combo); with only **one** doubler it is 4 tokens for 5
taps, which is **net negative**; and as a plain card it is a two-mana instant for two bodies. It only
ever justified its slot as combo glue. **The founding entry's declared combo no longer exists, and
nothing in this deck loops now.** That is a deliberate downgrade in combo potential and an upgrade in
raw power — see below.

**The Unbeatable Squirrel Girl in.** I had passed over this as a tribal card and never read the second
ability, which was a miss. *"{1}{G}{G}{G}: Create X 1/1 green Squirrel creature tokens, where X is the
number of Squirrels you control."* Chatterfang matches that number again, so **one activation roughly
triples the Squirrel count** (10 → 30, 20 → 60). It also makes a Squirrel on enter **and on attack**.
Checked for loops: Cryptolith Rite cannot fuel it off fresh tokens (summoning sickness applies to the
creature's own `{T}` ability), Gaea's Cradle and Hazel each tap once per turn, and Ashnod's Altar makes
colourless which cannot pay `{G}{G}{G}`. **Not a loop — every activation costs four real mana.**

**Hazel of the Rootbloom in over Awakening Zone.** Awakening Zone was the strictly worse half of a
redundant pair — From Beyond makes a 1/1 instead of a 0/1 and tutors. Hazel is ramp *and* a token
engine on one body: her mana ability **taps tokens as a cost, which ignores summoning sickness**, so
tokens made this turn can pay for Squirrel Girl; and her end-step trigger copies a token, twice if it
is a Squirrel. Both her abilities carry `{T}`, so each is once per turn — no loop.

**Squirrel-tribal cards deliberately NOT added, and the reason is Skullclamp.** Squirrel Sovereign,
Nut Collector and Sylvan Anthem are all anthems, and Skullclamp only draws because a 1/1 becomes a
1/0 and dies to the toughness-0 state-based action (CR 704.5f; LEDGER 2026-09-22). Any Squirrel anthem
switches off the deck's best draw engine. **Two cards already in the list have this tension and I
should have flagged it when I built it:** Deep Forest Hermit gives Squirrels +1/+1 for the three turns
it survives, and Chitterspitter does the same per acorn counter (opt-in, since you choose whether to
feed it). The Hermit stays for now on the strength of eight bodies for five mana, but it is the first
card to re-examine if the Clamp feels dead.

Also passed, on rate rather than principle: Squirrel Mob and Honored Dreyleader (self-only pump, big
bodies not engines), The Odd Acorn Gang and Scurry of Squirrels (combat-gated in a deck that does not
need combat), Drey Keeper and Acorn Harvest (poor rates), Tippy-Toe, Terrific Partner (real, but a
tier below the two taken).

### Validation

100 cards. `bun run card --deck decks/chatterfang/DECK.md --id bg` — 89 lines, 89 found, no
off-identity, no illegal. Every header count matches. DECK.md and STATUS.md diff clean on names.
`bun run deck:moxfield chatterfang` regenerated. Curve moved from avg **2.70 → 2.75** (MV≤2: 31 → 30,
MV4+: 13 → 15) — the two adds are both 4-drops. Game Changers still 1/3.

---

## 2026-09-23 — Blade of the Bloodchief + the Food/Vito drain line — evaluated, pilot's call pending

Two pilot proposals. **Vinereap Mentor is withdrawn** — I proposed it over Nested Shambler and the
pilot was right to reject it: *"vinereap sucks compared to nested where if we can find a way to put
+1/+1s on him he is much more useful."* Nested Shambler's X is its power, so it scales; Vinereap
Mentor is a fixed two Foods. Scaling beats a flat rate in a deck this wide.

### 1. Blade of the Bloodchief — agree, strong add

The pilot named it as "blackblade reforged or whatever it's called"; the card is **Blade of the
Bloodchief** {1}, equip {1}: *"Whenever a creature dies, put a +1/+1 counter on equipped creature. If
equipped creature is a Vampire, put two +1/+1 counters on it instead."* (Blackblade Reforged is a
different card — +1/+1 per land, equip {7}.)

Grounds: it converts the deck's single most abundant event into a scaling threat for two mana total,
and it triggers on **any** creature dying, opponents' included. On Nested Shambler it is a token
engine — eight deaths in a turn makes a 9/9 that dies into 9 Squirrels, doubled by Chatterfang to
**18**. Also excellent on Carrion Feeder (grows twice) and Toski (indestructible, so it keeps the
counters). X is read from last-known information when the Shambler dies (CR 608.2h), so the counters
banked before the death are what count. The Vampire clause is dead here unless Maskwood Nexus is
added — the pilot noted this correctly.

### 2. The Food → Vito drain line — the pilot's idea, and the math holds

Pilot's line: *"sac a creature with ashnods, get 2 mana, crack a food token get 3 life, ping an
opponent for 3, repeat multiple times."* Correct, and **correctly identified as bounded** — cracking a
Food creates no token, so nothing refills the Food supply.

Per Food cracked with Vito + Dina + Marauding Blight-Priest on board: gain 3 → Vito drains **3** from
one opponent, Dina **1 to each**, Blight-Priest **1 to each**. That is 9 across a three-opponent table
for {2}, and the creature sacrificed to Ashnod's Altar for that {2} separately triggers Blood Artist,
Zulaport, Bastion and Mirkwood Bats.

**Why Vito specifically:** every other lifegain in this deck arrives in 1-life chunks, where Dina and
Blight-Priest (1 to *each* opponent) beat Vito (1 to *one*). Foods are the only 3-life chunks in the
deck, and they are what make Vito worth a slot. Verdant Command's "gain 3 life" mode also turns on.
**Marionette Apprentice gets better too** — it reads *"creature or artifact"*, so every cracked Food
is another trigger.

Food sources today: only Tireless Provisioner and Academy Manufactor. **Tippy-Toe, Terrific Partner**
(*"If you would create one or more tokens, instead create those tokens plus an additional Food"*) is
what makes the line real — one Food per token event, and Chatterfang counts the Food too, so it
roughly doubles token output as well.

### ⚠️ The trap: do NOT add Camellia, the Seedmiser alongside Tippy-Toe

Camellia is *"Whenever you sacrifice one or more Foods, create a 1/1 green Squirrel"*. With Tippy-Toe
the Squirrel creation event **makes a replacement Food**, so the Food pays for itself and the line
becomes an unbounded loop (LEDGER 2026-09-23). Tippy-Toe **alone** is safe. Same warning applies to
Peregrin Took. Flagged rather than silently excluded.

### Cut ranking, if the pilot takes all three adds (SKILL §2.1 step 4)

**Token Engines, weakest first:** Chatter of the Squirrel (3 mana across two casts for 4 tokens,
lowest impact) · Squirrel Nest (3-mana aura, card disadvantage to land removal) · Chitterspitter
(2/turn but its anthem fights Skullclamp) · Verdant Command (*better* now — its gain-3 mode feeds
Vito) · Nested Shambler (scales with the Blade) · rest stronger.

**Drain Payoffs, weakest first:** Falkenrath Noble (4 mana, 1 to **one** player — worst rate of the
death-drainers) · Poison-Tip Archer · Nadier's Nightblade · Marionette Apprentice (*better* now —
catches every cracked Food) · rest stronger.

**Proposed:** OUT Chatter of the Squirrel → IN Blade of the Bloodchief; OUT Falkenrath Noble → IN
Vito, Thorn of the Dusk Rose; OUT Squirrel Nest → IN Tippy-Toe, Terrific Partner. Three separate
decisions, not one package.

### Rules verification of the Camellia loop — 2026-09-23 (mtg-rules-expert, rules 2026-08-07)

Confirmed before recommending. Assembly: **Camellia {1}{B}{G} + Tippy-Toe {3}{G} (or Peregrin Took
{2}{G}) + Ashnod's Altar {3}** = **10 mana** (9 with Took), of which the Altar is already in the list.
Needs one Food to start (either Food-adder supplies one on any token event) and one drain payoff to
close (12 in the list). Then self-funding at {2} per iteration.

- **Apply the Food-adder BEFORE Chatterfang** — 3 Squirrels + 1 Food, versus only 2 the other way
  (CR 616.1e, 614.16, 614.5).
- **Net per iteration with Chatterfang: +2 Squirrels, Food replaced, mana neutral, +3 life, one
  death.** Without Chatterfang: neutral on everything but +3 life and one death — **still an infinite
  drain, so the line survives losing the commander.**
- Sacrificing the Food as a **cost** does trigger Camellia (CR 601.2h/602.2b, 603.2g), and a Food made
  this turn taps immediately because summoning sickness is creatures-only (CR 302.6, 111.10b).
- **Camellia's own "{2}, Forage" can sacrifice a Food** (CR 701.61a) and re-trigger herself — same
  loop, plus a board-wide +1/+1 counter on every other Squirrel each iteration.
- Keep it in one step; mana pools empty between steps (CR 106.4).

Assembly odds without tutors, 3 specific cards in 99: ~1% by turn 8, ~2% by turn 10, ~4% by turn 12.
Non-Game-Changer tutors that would find pieces if the pilot wants it findable: Diabolic Intent {1}{B}
(free here — always a spare token), Eldritch Evolution, Chord of Calling, Green Sun's Zenith,
Birthing Pod.

---

## 2026-09-23 — APPLIED: the Food/combo package, five in and five out

Snapshot: `versions/2026-09-23-before-food-combo-package.md`

```
  IN                                OUT
  Blade of the Bloodchief    {1}    Chatter of the Squirrel   {G}
  Camellia, the Seedmiser  {1}{B}{G}  Putrefy               {1}{B}{G}
  Peregrin Took            {2}{G}   Falkenrath Noble          {3}{B}
  Vito, Thorn of the Dusk Rose {2}{B}  Toski, Bearer of Secrets {3}{G}
  Tippy-Toe, Terrific Partner {3}{G}  Chitterspitter          {2}{G}
```

Pilot took all five adds. On the cuts they confirmed Chatter (*"chatter is horrendous bro idk why
that's even in the deck"*), protected **Squirrel Nest**, **Poison-Tip Archer**, **Cultivate** and
**Deep Forest Hermit**, and released **Toski** (*"toski can go for now"*).

**Chitterspitter was my call, not the pilot's, and is the one to reverse first if it is missed.**
Grounds: it is the slowest token engine in the list (3 mana, then `{G}` and a tap for two Squirrels a
turn), it duplicates Squirrel Nest's job, and its Squirrel anthem is the same Skullclamp conflict as
Deep Forest Hermit. With the Hermit staying by the pilot's choice, cutting Chitterspitter keeps that
conflict to **one** card instead of two. Runner-up cut if it is reinstated: **Avenger of Zendikar**,
the deck's only card above MV 5.

**Putrefy** — the fifth removal spell and the worst of them: Assassin's Trophy is one mana *cheaper*
and hits any permanent, Tear Asunder is cheaper and exiles, Abrupt Decay is uncounterable at 2, Beast
Within hits anything. Removal 7 → 6.

**Falkenrath Noble** — the pilot asked whether it is questionable without other Blood Artist variants.
It is not a redundancy cut: the deck had **eight** death-drainers, and per SKILL §2.5 a spare copy of a
load-bearing effect is consistency, not waste. It is a **rate** cut — Zulaport Cutthroat does strictly
more (each opponent, not one) for half the mana. Drain payoffs 12 → 11 → 12 with Vito.

**Toski** — 4 mana for a 1/1 that must attack; its draw ceiling is real but it is a win-more card, and
zero toughness beats indestructible (CR 704.5f) so it dies to the deck's own Toxic Deluge and Meathook.
Card draw 9 → 8; Skullclamp, Idol of Oblivion, Moldervine Reclamation and Village Rites carry it.

### What the package does

The deck now has **one intended combo** (Camellia + a Food-adder + Ashnod's Altar, §Rules verification
above) and **four Food sources** (Tippy-Toe, Peregrin Took, Tireless Provisioner, Academy Manufactor).
Running **both** Food-adders is deliberate redundancy — it is the difference between needing three
specific cards and needing two plus either of a pair.

| Assembly odds, no tutors | turn 8 | turn 10 | turn 12 | turn 14 |
|---|---|---|---|---|
| Camellia + Altar + either Food-adder | 1.3% | 3.3% | 6.4% | 10.9% |

Roughly double the single-Food-adder version. Still a "sometimes" line rather than a plan, which is
what the pilot asked for — and none of the pieces are dead on their own.

**Vito earns his slot on the Foods.** Every other lifegain here arrives one life at a time, where Dina
and Blight-Priest (1 to *each*) beat Vito (1 to *one*). A cracked Food is 3 life in one event, which is
3 damage off Vito. Verdant Command's gain-3 mode and Moldervine Reclamation also improved.

**Blade of the Bloodchief** is unrelated to the Food plan and was the strongest single add: 2 mana all
in, it converts the deck's most abundant event into counters. On Nested Shambler it is a token engine
(X is its power, read from last-known information on death, CR 608.2h). The Vampire clause stays dead
unless Maskwood Nexus is ever added.

### Validation

100 cards. `bun run card --deck decks/chatterfang/DECK.md --id bg` — 89 lines, 89 found, no
off-identity, no illegal cards. Every header count matches. DECK/STATUS names diff clean.
`bun run deck:moxfield chatterfang` regenerated. Curve **2.75 → 2.73** (MV≤2: 30, MV4+: 14) — the five
cuts totalled 15 mana against 14 coming in. Game Changers still 1/3 (Gaea's Cradle).
Loop audit: the only loop in the list is the declared one. Pitiless Plunderer, Earthcraft, Blasting
Station, Ivy Lane Denizen and Scurry Oak all remain out.

---

## 2026-09-23 — REVERSED: Chitterspitter back in, Morbid Opportunist out

Snapshot: `versions/2026-09-23-before-chitterspitter-restore.md`

```
  IN  Chitterspitter  {2}{G}   <->   OUT  Morbid Opportunist  {2}{B}
```

**The pilot reversed my Chitterspitter cut, and the reasoning corrects a weighting error of mine**
(now in LEDGER 2026-09-23): *"yeah we want to win with drain but it doesn't hurt having more options
like wideboard aggro which most people can't defend against… combat isn't always so bad because if
our creatures get blocked or we take out one of their defenders PING.. WE'RE DRAINING BABYYY."*

That is mechanically right and I had treated the Skullclamp conflict as a veto rather than a cost. In
this deck a token that trades in combat fires **every** death trigger in the list — Blood Artist,
Zulaport, Bastion, Mirkwood Bats, Nadier's Nightblade, Poison-Tip Archer, Marionette Apprentice, and
the life each gains feeds Vito, Dina and Blight-Priest. So attacking risks nothing the deck wanted to
keep, and an anthem that makes the board actually threatening buys a **second route to the same win**.
Chitterspitter's acorn counters are also opt-in, so the Clamp conflict only exists on turns the pilot
chooses it. **Combat is now an explicit secondary plan for this list, not incidental.**

**Morbid Opportunist out instead.** Grounds: *"Whenever one or more other creatures die, draw a card.
**This ability triggers only once each turn.**"* In a deck that sacrifices ten creatures in a turn it
draws **one** card — it is the only draw source here that is capped, while Skullclamp draws two per
token and Moldervine Reclamation draws one per death uncapped. Its 1/3 body also contributes nothing
to the combat route the pilot just asked to keep open. Card draw 8 → 7; Skullclamp, Idol of Oblivion,
Moldervine Reclamation, Deadly Dispute, Village Rites, Black Market Connections and Sylvan Library
carry it. Runner-up cut considered and rejected: **Abrupt Decay** — narrow (MV 3 or less), but
dropping real removal from 4 to 3 is too thin for Bracket 3.

Both cards are MV 3, so the curve is unchanged at **2.73**. Token Engines 17 → 18, Card Draw 8 → 7.
Validated: 100 cards, no off-identity or illegal cards, headers match, DECK/STATUS names diff clean,
MOXFIELD regenerated.
