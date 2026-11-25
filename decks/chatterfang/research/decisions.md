# Chatterfang: decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not the verdict.

This log merges two. First comes the log of the original `decks/chatterfang` list, from its
founding on 2026-09-22. Then comes the log of `upgrade-test`, the playtest fork made on 2026-09-25,
which the pilot played from 2026-10-15. On 2026-11-14 the original list was deleted at the pilot's
request and `upgrade-test` was renamed `chatterfang`, so entries before that date name the two decks
as they were then: "chatterfang" there means the original list, and "upgrade-test" means this deck.

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

---

## 2026-09-24 — Pitiless Plunderer in, Golgari Signet out: the pilot opts in to combos

The pilot: *"i want to start trying to play with combos a little bit and if people complain too often
then i'll consider taking them out."* They asked for Plunderer here and chose the cut themselves.

**What changed in the grounds.** The founding entry called Chatterfang + Plunderer an *automatic*
infinite. That was wrong. Every iteration needs a sacrifice the pilot activates, so it is chosen-N
(LEDGER 2026-09-24, "Chatterfang + Pitiless Plunderer is chosen-N, not automatic"). It was only ever
out because of the "no two-card infinite" brief, and the pilot has now overridden that brief.

**The swap.** Golgari Signet → Pitiless Plunderer (in Ramp & Mana). Plunderer's Treasures (each brings
a Squirrel) cover the Signet's ramp, so the ramp count stays 8. I had proposed cutting Poison-Tip Archer
instead. The pilot preferred the Signet, which keeps the drain count at 12.

**The loop** (gameplan §8a): `{B}`, sacrifice a Squirrel to Chatterfang → Treasure + Squirrel → repeat.
One death and +1/−1 on a target per iteration, nothing spent. With Ashnod's Altar it is infinite
colourless mana. **Live from turn 4.** Official Bracket 3 text rules out early two-card combos, and
the pilot has been told once. The pod's reaction is the test.

Validated: `bun run card --deck chatterfang` 89/89 found, no flags. 100/100, Game Changers 1/3.

## 2026-09-24 — Llanowar Elves in, Poison-Tip Archer out

Pilot's idea ("both green decks should probably have llanowar elves"). I picked the cut and the pilot
approved it. A turn-1 dork means a turn-2 Chatterfang. Poison-Tip Archer was the only 4-MV drainer, and
it gains no life, so it fed none of Vito, Dina or Blight-Priest. The alternative offered was Arcane
Signet, which survives our own Toxic Deluge where Elves does not. Drainers 12 → 11. Avg MV 2.77 → 2.72.
Validated 89/89, 100/100.

## 2026-09-25 — Landfall package: Tracker, Oracle, two fetchlands

The pilot's direction from the Ghave rebuild (*"maybe we should play more cards that let us play
multiple lands per turn in both decks"*, but only if Chatterfang benefits). **It does.** Chatterfang
adds a Squirrel to every landfall token, and the list already ran Tireless Provisioner, Scute Swarm and
Avenger of Zendikar. It had no extra land drops and no fetchlands. The pilot approved all three
changes:

| In | Out | Grounds |
|---|---|---|
| Tireless Tracker | Squirrel Nest | A Clue (plus a Squirrel) per land is card draw. Nest was a fixed one-per-turn maker, the kind the pilot now wants less of. |
| Oracle of Mul Daya | Ophiomancer | An extra land drop and lands off the top of the library. Ophiomancer was another fixed per-upkeep maker, and the pilot had called it bad in the Teysa list. |
| Verdant Catacombs, Misty Rainforest | 1 Forest, 1 Swamp | Land for land. Each fetch is two landfall triggers and thins the deck. |

Avg MV 2.72 → 2.73. Lands stay at 36. Validated 91/91, 100/100, Game Changers 1/3.

## 2026-09-28 — The Mycotyrant passed over (and why it was never evaluated)

**Raised by the pilot**, not by me: *"why The Mycotyrant never showed up in any of your research."*
Audited honestly — it appears **nowhere** in this repo, and that was a gap in method rather than a
judgement. It **is** returned by the plain sweep
`id<=bg type:creature cmc<=3 o:"create" o:"creature token" legal:commander`; I had built the search
space from the pilot's pasted 66-card pool plus Chatterfang's EDHREC page, and it appears **zero**
times on that page (1% of all decks). Logged as a transferable process lesson in `deck-brain`
LEDGER — *a pilot-supplied pool plus the commander's EDHREC page is not a format sweep*.

**Grounds for the pass, verified against the CR** (not "already settled" — re-derivable):

- The end-step trigger makes X tokens where X = **times you descended**. CR 700.11 counts
  *"permanent **cards** put into that player's graveyard from anywhere."* CR 111.6 / 108.2b: a token
  is not a card. The Lost Caverns of Ixalan release notes reject the CR 111.7 graveyard-trip argument
  explicitly. **Sacrificing Squirrels, Foods, Treasures and Clues descends zero times.**
- It is an **anti-synergy**, not merely a non-synergy: the more the engine is tuned to eat tokens,
  the less it descends.
- **Measured X in this list: 0–2 on a typical turn.** No repeatable self-mill; only Takenuma's
  one-shot channel (~3), Barren Moor cycling (1) and six self-sacrificing lands (1 each). Feeding
  outlets real creature cards *would* descend, but the 52 nonland permanent cards are the engine.
- Second clause also dead: P/T counts Fungi and/or Saprolings, and Tendershoot Dryad was cut in
  wave 4, so the deck has **zero of both** — a 3-mana 1/1 with trample.

**The pilot's proposed loop does not exist.** *"Each token death refunds itself — kill 5, 5 enter
back and Chatterfang doubles it"* — 5 token deaths is X = 0. Corrected with citations; the pilot
accepted and closed it: *"we don't need it in the chatterfang deck… we're not a mill deck we're a
sac tokens deck."*

**Not a knock on the card.** Commander rank #271, 9,284 decks, Aristocrats theme at 201 — and its
single most-played card is **Mirkwood Bats at 64% / +0.45 synergy**, this deck's best payoff. It is a
self-mill commander; mill is the only cheap repeatable way to put *cards* in your own graveyard.
**Filed as a candidate fourth deck, not a Chatterfang piece.** Two cards surfaced by that page that
are worth a look here on their own merits and were never flagged: **Insidious Roots** (13% on
Chatterfang's page — grants creature tokens *"{T}: Add one mana of any color"*, the Cryptolith Rite
effect the pilot asked to keep, plus a token engine) and **Syr Konrad, the Grim** (damage ping, the
axis the pilot says they like most).

---

<!-- The upgrade-test log starts here (merged 2026-11-14). -->

## 2026-09-25 — Founded as a playtest fork of decks/chatterfang

The pilot: *"can you make a copy with the proposed swaps so i can try it out cause i don't have time
to decide so do your recommended swaps on a new deck call it upgrade-test."*

So this is **not** a curated build — it is the whole recommended package applied at once so the list
can be piloted rather than adjudicated card by card. `decks/chatterfang` is untouched and remains the
deck of record. The grounds for every individual swap live in
`decks/chatterfang/research/proposal.json` and on the proposal artifact
(https://claude.ai/artifact/Qgp3cNcdmKWoE8fPZMxvQB); they are not duplicated here.

All 13 swaps applied in three `deck:edit` runs, one per wave, so `history.jsonl` records them
separately and any single wave can be reverted from `versions/`:

| Wave | In | Out |
|---|---|---|
| 1 | Craterhoof Behemoth, Concordant Crossroads, Ancient Greenwarden, Mycoloth, Circle of Dreams Druid | From Beyond, Tendershoot Dryad, Bitterblossom, Marauding Blight-Priest, Blade of the Bloodchief |
| 2 | Orcrist Goblin-cleaver, Bilbo Fellow Conspirator, Ninja Pizza, Cauldron of Essence | Verdant Command, Nested Shambler, Idol of Oblivion, Dina Soul Steeper |
| 3 | Blasphemous Edict, Yawgmoth Thran Physician, Champion of Lambholt, Awaken the Woods | Toxic Deluge, Sakura-Tribe Elder, Abrupt Decay, Cultivate |

**Validated:** 100/100, 36 lands, avg MV 2.73 → **3.00**, no off-identity or non-commander-legal
cards, Game Changers **1/3** (Gaea's Cradle — neither Yawgmoth nor Blasphemous Edict is one). Every
section count matches the proposal's projected column exactly.

**Three costs the pilot took on knowingly, carried here so they are testable rather than forgotten:**

1. **Curve up 2.73 → 3.00.** This is the deliberate trade — cheap per-upkeep engines for bigger
   single-turn payoffs. The mana that pays for it (Awaken the Woods, Ancient Greenwarden, Circle of
   Dreams Druid, Ninja Pizza) went in on the same pass on purpose. **If the deck plays clunky, this
   is the first number to blame.**
2. **Removal 6 → 5.** Abrupt Decay was the cut for Champion of Lambholt. It was narrow (MV ≤ 3), but
   this is the thinnest the deck has been on interaction and it was flagged as the weakest part of
   wave 3.
3. **Lifegain converters 3 → 1.** Dina and Marauding Blight-Priest both left; Vito is the only one
   remaining. Per-token drain went *up* (Cauldron of Essence added a fourth "each opponent loses 1"),
   but the lifegain-event axis is now a single point of failure.

**Pilot's picks that were cut, both flagged before the fork was built and both the pilot's call to
restore:** Blade of the Bloodchief (wave 1) and Cultivate (wave 3). Nested Shambler, which the pilot
defended on 2026-09-23, was also cut in wave 2 as the smallest card left in Token Engines.

**Not taken into this fork**, and still on the proposal page with reasons: Ygra Eater of All (turns
the whole board into artifacts — Null Rod and Collector Ouphe would switch off Chatterfang's own
ability), Bolas's Citadel (Game Changer, salt 1.72), Sephiroth, Species Specialist, Warren
Soultrader, Swarmyard Massacre, Nuka-Cola Vending Machine, Crop Rotation, Eldrazi Monument,
Springleaf Parade. Gardenize is not commander-legal.

## 2026-09-25 — Wave 4: curve correction, after a deck reviewer caught the regression

The pilot ran the fork through a deck reviewer: **estimated win turn 6.6 (parent) vs 7.5 (fork)** —
the fork was *slower*, which is the exact opposite of the complaint the package was built to fix.
They asked whether the deck was actually better. It was not, and the measurement held up.

**What the numbers showed.** Cards at MV ≤ 2 had fallen **30 → 24**, and MV ≤ 3 from 49 → 46. No
single wave caused it (+0.13, +0.08, +0.07 avg MV individually) — the three waves *stacked*.

**The specific error, which was mine.** Wave 1 and wave 3 cut **Cultivate** and **Sakura-Tribe
Elder** — unconditional early ramp that puts lands onto the battlefield — and added **Awaken the
Woods** (dead at X=0), **Circle of Dreams Druid** (needs a board, then a turn) and **Ancient
Greenwarden** (six mana). The `Ramp & Mana` section count went 10 → 13, so the stat rail reported
*more ramp* while ramp quality had fallen. Section counts measure slots, not function.

**Why the reviewer's 7.5 was optimistic rather than harsh.** Awaken the Woods is `{X}{G}{G}` and so
is counted at **mana value 2** by every stats tool, including `deck:show` and the proposal artifact.
Its real cost is 5 for a meaningful X. The deck was slower than any mana-value model could see.

**The pattern worth keeping.** Every addition that genuinely addressed "I only win with the combo"
is cheap — Blasphemous Edict (`{B}` with 13 creatures), Champion of Lambholt (3), Orcrist (3),
Yawgmoth (4). The four that moved the curve were all *more engine*, which is the half the deck
already had too much of.

| Out | In | Why |
|---|---|---|
| Awaken the Woods | Cultivate | Unconditional turn-3 ramp beats an X spell that hid its own cost |
| Ancient Greenwarden | Sakura-Tribe Elder | Two-mana ramp + chump + free sac fodder, versus a six-mana engine |
| Mycoloth | Bitterblossom | Reverses my own wave-1 cut. The drip is weak; not acting before turn 5 is weaker |
| Circle of Dreams Druid | Verdant Command | Instant-speed 4 bodies for 2, versus conditional mana that needs the board already |

**Result:** avg MV **3.00 → 2.89**, MV ≤ 2 **24 → 26**, MV ≤ 3 **46 → 48**. 100/100, no legality or
identity flags, Game Changers still 1/3. Every converter from waves 1–3 stays in the deck.

**Still open for the pilot:** re-run the reviewer on this version and compare against the parent's
6.6 on the same run. If it is still behind, the next cuts to consider are Craterhoof Behemoth (8
mana, the last genuinely expensive card) and restoring Nested Shambler over one of the 3-drops.

## 2026-09-25 — CommanderBracket A/B: the fork is still 7.5, and the sub-scores disagree with it

Ran both lists through commanderbracket.app myself, same session, commander set to Chatterfang.

| | chatterfang (parent) | upgrade-test (fork) |
|---|---|---|
| Predicted win turn | **6.6** | **7.5** |
| Bracket placement | B3 (6–8) | B3 (6–8) |
| Deck health | 66 | **69** |
| Mana | 74 | **84** |
| Interaction | 72 | 72 |
| **Engine** | **51** | **50** |
| Ramp by turn 3 | 55% | **59%** |
| Two ramp by turn 3 | 15% | **19%** |
| 3 lands by turn 3 | 70% | 70% |
| Keepable opener | 95% | 95% |
| Archenemy level | Casual | **Contender** |
| Combos | 5 (1 two-card) | **7 (1 two-card)** |
| Tutors | 1 | 0 |
| Fast mana | 2 | 2 |
| Game Changers | 1 | 1 |

**Wave 4 did what it was aimed at.** Mana 74 → 84, ramp-by-turn-3 55% → 59%, two-ramp 15% → 19%.
The curve diagnosis was correct and the fix is measurable.

**But the package's own thesis did not land.** Engine went **51 → 50**. The whole argument was that
the deck needed better conversion, and the tool reads the engine as unchanged. The additions changed
*what* the deck does without making it stronger at doing it. That is the honest verdict.

**Two caveats on the parent's 6.6, both real:**

1. The parent is credited with **1 tutor** and the fork with **0**. The parent's only tutor is
   **From Beyond**'s "search for an Eldrazi card" — and there are no Eldrazi in the deck. Part of the
   parent's faster reading rests on a tutor that cannot find anything.
2. The fork scores **7 combos to the parent's 5**, and *neither new one was proposed as a combo*:
   **Ninja Pizza** completes an infinite with Camellia + Peregrin Took (infinite card draw, infinite
   coloured mana), and **Concordant Crossroads** completes one with The Unbeatable Squirrel Girl +
   Cryptolith Rite (infinite ETB, infinite coloured mana). Both are chosen-N and so inside the
   pilot's loop policy, but they raise the deck's archenemy level from Casual to Contender and they
   were added without being flagged. The pod should be told.

**Conclusion.** Neither list is clearly better. The fork wins on mana and consistency, ties on
interaction, loses 0.9 on predicted win turn, and is a louder deck at the table. Both are solidly
Bracket 3. Games decide this, not the tool — but if the goal is specifically to move the win-turn
number, the lever is real tutors and fast mana, which is a bracket decision rather than a build one.

## 2026-09-26 — Wave 5: mana back in. Wave 4 was an over-correction

**The pilot was right and the evidence is clean.** Wave 4 reverted four cards to fix the curve
(avg MV 3.00 → 2.89, MV ≤ 2 24 → 26) and the CommanderBracket win turn stayed at **7.5**. The curve
was never what the metric was reading, so the revert cost mana and bought nothing measurable.

Their argument for **Circle of Dreams Druid**, verbatim: *"bodies don't really matter if it takes us
an extra 2-3 turns to have enough mana to play the cards we have."* My reason for cutting it —
"conditional, needs a board" — does not survive contact with this deck: making a board is the one
thing it does reliably, so Circle is a payoff for the deck's floor, not a card that needs setup.

| In | Out | Grounds |
|---|---|---|
| Circle of Dreams Druid | Champion of Lambholt | Champion was the **third** combat-dependent finisher behind Craterhoof, Orcrist and Valley Rotcaller, and an enabler rather than a kill. Circle is one tap for one mana per creature — the mana the top end actually needs. |
| Elvish Mystic | Deep Forest Hermit | A second turn-1 dork. The Hermit is 5 mana, and its "Squirrels you control get +1/+1" anthem turns off **Skullclamp** on every token — a cost the deck was quietly paying. |

**Result:** avg MV 2.89 → **2.83**, MV ≤ 2 26 → **27**, MV ≤ 3 48 → **49**, green sources 29 → 31,
Ramp & Mana 12 → 14, Token Engines 15 → 13. This wave adds mana *and* lowers the curve, so it does
not re-open the wave-4 problem. 100/100, no flags, Game Changers 1/3.

**Standing lesson for this deck:** the mana dorks and the tap-the-board mana are not "engine" here —
they are what turns an existing board into cast spells. Cut them last, not first.

## 2026-09-26 — Wave 6: Dina back in. Marionette nomination withdrawn

**Correction.** I nominated Marionette Apprentice as the cut for Dina. The pilot: *"marionette also
triggers on artifacts leaving which is nice, if i sac treasures or forage foods, it still triggers."*
Correct, and the numbers are decisive — this list holds **12 artifact-token sources** (Academy
Manufactor, Bilbo, Black Market Connections, Deadly Dispute, Ninja Pizza, Orcrist, Peregrin Took,
Pitiless Plunderer, Prosperous Innkeeper, Tippy-Toe, Tireless Provisioner, Tireless Tracker) and
**11 effects that sacrifice or crack one**. With Ninja Pizza out, every mana made off a Food is a
Marionette trigger at **each** opponent — drain off a resource already being spent. It is a top-tier
payoff here, not a cut candidate.

**Why Dina is a multiplier rather than a fifth drainer.** Blood Artist, Zulaport Cutthroat, Bastion
of Remembrance, Cauldron of Essence and Nadier's Nightblade each *gain life* per death. One creature
dying with four of them out is **four separate lifegain events** (CR 119.3, 119.9), so Dina triggers
four times for 1 to each opponent — doubling the package rather than adding to it. The list has
**16 lifegain event sources**. Vito converts the same events but hits one *target* opponent; Dina
hits each. They are not redundant.

**The cut: Verdant Command.** It was the last pure one-shot in Token Engines — four bodies once,
where everything else in that section is repeatable (Bitterblossom, Chitterspitter, Hazel, Scute
Swarm, Camellia) or a multiplier (Academy Manufactor, Peregrin Took, Tippy-Toe, Bilbo). Runner-up
considered and rejected: **Bitterblossom**, kept because two tokens every upkeep is two Mirkwood Bats
triggers every upkeep, which is exactly the per-token-created axis this deck kills on.

**Result:** Token Engines 13 → 12, Drain Payoffs 10 → **11**, lifegain converters **1 → 2**.
100/100, no flags, avg MV unchanged at 2.83, Game Changers 1/3.

## 2026-09-28 — Correction: Gardenize was never illegal

The 2026-09-25 founding entry above lists Gardenize under "not taken" as *"not commander-legal"*. That
was Scryfall's **pre-release** legality (Reality Fracture releases 2026-10-02), not a ruling on the
card — it is commander-legal. It has now been evaluated on its merits in the FRA set review
(`decks/chatterfang/research/fra-set-review-2026-09-28.md`): **MAIN for chatterfang, SIDE for this
fork** (this list already runs 14 ramp pieces and its open problem is the win turn, not mana). The
same stale reason in `decks/chatterfang/research/proposal.json` was corrected the same day.

## 2026-09-28 — Wave 7: Gardenize + Dryad in, on two playtest verdicts

**Applied.** 100/100. **Curve-neutral by construction and verified after the apply** — avg MV 2.83,
MV≤2 27, MV≤3 49, all identical to before. Two MV-3 in, two MV-3 out.

- **IN Gardenize** ({1}{G}{G}) for **OUT Orcrist, Goblin-cleaver**
- **IN Dryad of the Ilysian Grove** ({2}{G}) for **OUT Chitterspitter**

**Grounds for Gardenize:** a charge counter per creature dying, and the counters are **permanent**, so
the mana **recurs** every first main phase — ten Squirrels sacrificed once is ten green every turn
thereafter. Tokens count, because a token genuinely *dies* (CR 111.7) — the exact inverse of
The Mycotyrant, where the token never counted as a descend. **Doubling Season doubles the charge
counters** (verified oracle: *"twice that many of those counters"*); Parallel Lives does not. It is an
**enchantment**, making it the only mana source in the deck a creature wipe cannot answer.
**I had previously rejected this card as not commander-legal — that was a stale cache read, and the
grounds were void.** Corrected on the proposal artifact rather than deleted.

**Grounds for Dryad:** a second extra-land-drop that **stacks with Oracle of Mul Daya** (three lands a
turn), feeding four live landfall payoffs — Tireless Provisioner, Tireless Tracker, Scute Swarm's
self-copy at six lands, and Avenger of Zendikar. Each token then runs Academy Manufactor → Chatterfang
→ the doublers, with Mirkwood Bats pinging per token. Second line makes Gaea's Cradle tap for any
colour.

**Two pilot playtest verdicts drove the cuts, and both overrode my ranking:**

- **Chitterspitter — never cast once, across every game played.** *"Three mana for +1/+1 next turn"*
  lost every comparison to three mana of immediate value. I had flagged it as the debatable cut
  because it does three jobs (once-per-turn sac outlet that **does** trigger Mirkwood Bats, growing
  Squirrel anthem, {G} token maker). Never being cast beats all three on the only axis that counts.
- **Orcrist — worked in play, but wants a different carrier.** The pilot used it successfully several
  times; the problem is that equipping **Chatterfang** raised the commander's threat profile and drew
  removal. Cut because the deck's four kill routes need no combat step, not because the card is weak.
  It is the centrepiece if the voltron variant is ever built.

**Ninja Pizza was pulled from my cut list by the pilot**, on grounds I had not weighed: it converts
Foods that would otherwise **sit idle** into mana, so my "it competes with Camellia's forage and
Bilbo's split" objection only bites on Foods that were actually going to be foraged. Kept. This also
keeps the Ninja Pizza + Camellia + Peregrin Took combo in the list, which the pilot wants.

**Greenhouse Propagator held, not declined.** No clean third cut exists — every remaining MV-3 card is
load-bearing, and the MV-4 band is Mirkwood Bats / Parallel Lives / Second Harvest / Pitiless
Plunderer / Hazel of the Rootbloom / Oracle of Mul Daya, all of which beat a duplicate of Prosperous
Innkeeper's lifegain line. Revisit if something underperforms in play the way Chitterspitter did.

**Standing caveat carried forward:** CommanderBracket rated this fork's mana its *strongest* stat
(84/100) while win turn was the weakness (7.5). This wave makes a strong stat stronger and may measure
flat. It was worth applying because the curve is untouched and both cuts were evidence-backed.

## 2026-09-28 — Wave 9: Starscape Cleric in for Viscera Seer (one card, on purpose)

**Applied.** 100/100. avg MV 2.83 → 2.84, **MV≤2 unchanged at 27, MV≤3 unchanged at 49.**
Sacrifice Outlets 6 → 5, Drain Payoffs 11 → 12.

**The measurement that drove it:** counted from `deck.json`, the list has **15 cards that gain you
life** against only **2 that convert lifegain into life loss** (Dina, Vito). A converter multiplies
all fifteen; a sixteenth fuel source would only add one more thing for two cards to multiply. And
*"each opponent loses 1 life"* is the right shape because **all fifteen gain exactly 1 life at a
time** — on that profile it beats Vito's single-target *"that much"* threefold in a four-player pod.
Offspring `{2}{B}` **creates** a token copy that is also a converter, so Chatterfang adds a Squirrel
and Mirkwood Bats pings for both.

**Viscera Seer was the only genuinely surplus card**, because Woe Strider strictly dominates it:
free sacrifice, scry 1, **plus** a Goat on arrival, **plus** escape recursion. Five free outlets remain
alongside Chatterfang, three sacrifice lands and three sacrifice spells, and one in play is enough.

**Why this wave is one card and not three.** The pilot declined seven of my cut nominations —
**Ninja Pizza, Cultivate, Elvish Mystic, Craterhoof Behemoth, Second Harvest, Bitterblossom,
Bloodletter of Aclazotz** — and every one of those grounds held up under checking. **Three corrected
real errors in my card reading**, all now in the deck-brain ledger:

1. **Ninja Pizza** converts Foods that would otherwise sit *idle* into mana, so the
   "competes with forage/Bilbo" objection only bites on Foods actually being foraged.
2. **Cultivate** is **two** landfall triggers — *"put one onto the battlefield tapped and the other
   into your hand"* — not the "zero synergy" card I called it.
3. **Bloodletter of Aclazotz** is **counter bait and surprise lethal**, two functions no per-card rate
   analysis sees. Its condition is met constantly by 15 fuel sources, so I also broke my own ledger
   rule that *"conditional is only a real cut reason if the deck fails to meet the condition."*

Given that, forcing a second or third add meant breaking a card that works. **One add was the honest
size of this wave.** The held candidates are recorded at the top of the proposal artifact in priority
order — Enduring Vitality first — and will be revisited when play frees a slot, which is exactly how
Chitterspitter's came open (pilot reported never having cast it once).

## 2026-09-29 — Wave 10: burst seeds, Warren Soultrader, Azusa

**Applied.** 100/100, no legality or identity flags, Game Changers 1 (Gaea's Cradle). avg MV
2.84 → 2.97, **MV≤2 27 → 24, MV≤3 49 → 48**. Token Engines 11 → 15, Ramp & Mana 16 → 13, Card Draw
7 → 6, Sacrifice Outlets 5 → 5. The proposal page's projection (the parent plus every applied wave)
lands on the same 100 cards at 2.97, so the page and this list agree.

| Out | In | Section |
|---|---|---|
| Nature's Lore | Chatterstorm | Token Engines |
| Arcane Signet | Verdant Command | Token Engines |
| Carrion Feeder | Esika's Chariot | Token Engines |
| Village Rites | Deep Forest Hermit | Token Engines |
| Concordant Crossroads | Warren Soultrader | Sacrifice Outlets |
| Oracle of Mul Daya | Azusa, Lost but Seeking | Ramp & Mana |

**The play report that drove it.** Over many games the fork could not win before turn 8 to 10. The
pilot asked for more burst token creation and drain, and fewer landfall and land-fetch pieces.

**The measurement.** The curve was not the cause: 27 cards at MV 2 or less and 49 at MV 3 or less is
a fast curve. Classifying the 13 token cards plus the commander by whether they *start* a token event
or *react* to one gave **ten multipliers or splitters against six seeds**, and every seed except one
made exactly one token per turn. Avenger of Zendikar (MV 7) was the only card that made several
tokens in one turn from nothing. Three of the fork's own earlier cuts (Deep Forest Hermit, Verdant
Command, Nested Shambler) were seeds, which is why the fork got slower than the parent.

**Why the adds are seeds and not drain.** Seven per-death drains plus three converters already put a
single token death near 19 life across the table. Per-token triggers were confirmed this session
(ledger repl-011, CR 603.2c): Mirkwood Bats fires once per token created, so token count is the clock.

**Chatterstorm over Spore Swarm, measured.** On Chatterfang + Peregrin Took + Tippy-Toe + Academy
Manufactor, three storm copies (three separate events) make 42 tokens; Spore Swarm's one event of
three makes 18. Peregrin and Tippy-Toe add a fixed Food per event, so granularity multiplies them
(ledger repl-013). Official Academy Manufactor ruling: it scales with the count.

**The pilot's calls, and the grounds recorded for each:**

- **Kept Cultivate** (second time it was declined; it was already on the close-cuts list, and I
  re-nominated it anyway): *"a nice two land burst when you're struggling for lands."*
- **Kept Dryad of the Ilysian Grove.**
- **Kept Avenger of Zendikar:** *"it's expensive sure but it can pump out 16+ tokens easily."*
- **Cut Oracle of Mul Daya** because its revealed top card *"is putting a target on my back"*, and
  asked for another extra-land card in its place.
- **Cut Concordant Crossroads** for a sacrifice outlet that makes any-colour mana, and asked for more
  cards shaped like Pitiless Plunderer. Warren Soultrader answers both.
- **Chose Azusa over Druid Class** (my recommendation, which also turns each land into a lifegain
  event for the three converters).
- **Chose option 2 (Azusa in, Carrion Feeder out)** over my recommendation (no Azusa, Feeder kept).

**Azusa, measured against it before the pilot chose it.** Extra land drops only fire with a spare
land in hand. With 36 lands in 99, on the play and every normal drop made, that's 27% on turn 4, 16%
on turn 5 and 9% on turn 6; a second spare is 10%, 5% and 2%. A 40,000-game simulation (36 lands
including 2 fetchlands, Cultivate and Sakura-Tribe Elder) gave **3.7 landfall triggers over turns 3
to 8 with Dryad alone and 3.7 with Dryad + Azusa**, and 5.3 against 5.4 with one extra card drawn a
turn. Extra drops mostly move a land you'd have played next turn onto this turn. Oracle supplied the
lands from the top; Azusa and Dryad don't. The same simulation gives **Dryad's own drop about zero**
as well, so she is earning her slot on fixing and the 2/4 body. Icetill Explorer, which replays
lands from the graveyard, was the only option that moved the count (+0.5 to +0.8). Verdict on Azusa
after play.

**Carrion Feeder, measured.** I first nominated it on the grounds that Chatterfang is an outlet from
the command zone. That was overstated: his outlet costs {B} and only eats Squirrels. Counting Ashnod's
Altar, Woe Strider, Yawgmoth, Warren Soultrader, Phyrexian Tower and High Market, the chance of having
seen a free outlet by turn 4 is 54% with Feeder and 48% without. The pilot chose option 2 knowing that.

**Costs named before applying:**

- **Chatterfang + Warren Soultrader is a declared two-card chosen-N loop.** Sacrifice a Squirrel and
  pay 1 life, get a Treasure and a Squirrel back. Mirkwood Bats fires three times per loop. Any
  life-gaining death payoff makes it free. It can assemble on turn 4.
- **Concordant Crossroads out** removes the Unbeatable Squirrel Girl + Cryptolith Rite + Crossroads
  infinite the deck reviewer counted.
- **Concordant Crossroads out also means tokens made on the Craterhoof turn can't attack.** They still
  count toward X. I missed this when proposing the cut and found it while updating the gameplan.
- The external analyzer will probably read the heavier curve as slower.

**Rejected, with grounds:** Druid Class (above); Exploration (an extra drop and nothing else);
Case of the Locked Hothouse (Oracle's full text without the reveal, but MV 4 and nothing extra before
seven lands); Icetill Explorer (the best of the land cards, still under one extra trigger a game);
Phyrexian Altar (held: Soultrader took the slot and also makes a token per sacrifice); Spore Swarm (one
event, 18 tokens against Chatterstorm's 42). Pitiless-shaped near misses: Scavenger's Talent and
Kingpin, Wilson Fisk (once per turn), Golgari Germination and Blight Mound (nontoken deaths only),
Revel in Riches, Kamber and Moonstone Eulogist (opponents' creatures only), Crowded Crypt (a slow
one-shot), Ruthless Knave (mana-negative), Experimental Confectioner (a second Camellia; same loop
with Ninja Pizza and Peregrin Took). Kept after consideration as cuts: Sakura-Tribe Elder (a land
source and a free death; cutting it was part of the fork's first slowdown, ledger build-042), Vito
(weakest converter, but the pilot asked for more drain), Bilbo (the new seeds feed him: 18 → 30 on
the six-card board).

**Held for the next slot, in order:** Squirrel Nest, Enduring Vitality, Marauding Blight-Priest,
Tend the Pests, Phyrexian Altar, Essence Warden, Enduring Tenacity, Saproling Migration (the pilot
likes it but finds it expensive).

**`research/gameplan.md` refreshed** in the same pass. It still described cards cut in waves 4 to 9
(Orcrist, Ancient Greenwarden, Awaken the Woods, Mycoloth, Chitterspitter, Viscera Seer, Champion of
Lambholt) and said Vito was the only converter. Added §8d for the Soultrader loop.

## 2026-10-15 — Confirmed as the live Chatterfang list

The pilot thought they had been playing this fork all along and asked to make it the default
Chatterfang list. The export they pasted matches `main` here card for card (100 of 100, zero
differences). It differs from `decks/chatterfang` main by 15 cards in each direction. From now on
this deck is the target for Chatterfang work, and `decks/chatterfang` stays untouched as the
pre-fork record (`decks/_notes.md` updated to say so).

**Queue.** The pilot wants to start with two adds, Priest of Forgotten Gods and Pest Infestation,
and said to make no cuts yet. Nothing in `deck.json` has changed. Cuts get proposed only when the
pilot asks, with the affected role ranked first.

## 2026-10-15 (later) — Wave 11: Pest Infestation and Priest of Forgotten Gods (a trial)

**Applied as a trial.** 100/100, no legality or identity flags, Game Changers 1 (Gaea's Cradle). avg MV
2.97 → 2.92 by the tools, about 2.99 with Pest Infestation costed at 5 instead of 1. **MV≤2 24 → 26,
MV≤3 48 → 48.** Token Engines 15 → 16, Card Draw 6 → 5, Sacrifice Outlets 5 → 5.

| Out | In | Section |
|---|---|---|
| Black Market Connections | Pest Infestation | Token Engines |
| Woe Strider | Priest of Forgotten Gods | Sacrifice Outlets |

**Grounds for Pest Infestation.** Wave 10 found ten multipliers against six seeds, and every seed except
one made a single token per turn. Pest Infestation is a seed you size: X=2 is 5 mana for 4 Pests plus 4
Squirrels, X=3 is 7 mana for 6 plus 6. It is one creation event, so Mirkwood Bats and Prosperous
Innkeeper each fire per body. Each Pest that dies gains 1 life, a separate event for Dina, Starscape
Cleric and Vito (ledger dmg-028). The destroy half is "up to X", so zero targets is legal and none of
the list's own artifacts or enchantments is at risk.

**Grounds for Priest of Forgotten Gods.** A 2 MV outlet at instant speed. Tap and sacrifice two other
creatures: each target opponent loses 2 and sacrifices a creature of their choice, and you add {B}{B}
and draw a card. Two sacrifices are two deaths, so every per-death payoff fires twice. It is an edict
and not a wipe. A scan of all 100 oracle texts found no untap effect (only Hazel of the Rootbloom says
"untapped", as a cost), so it activates once per turn and creates no new loop.

**What the pilot weighed against my advice.** I nominated Azusa (for Pest Infestation) and Dryad of the
Ilysian Grove (for Priest) first, because ledger eval-058's simulation found 3.7 landfall triggers over
turns 3 to 8 with no extra-drop card, with Dryad alone and with Dryad plus Azusa. The pilot kept both:
*"azusa really helps with mana ramp"*. That is the play verdict wave 10 asked for, so the Azusa swap is
marked kept. I argued once that Black Market Connections is one of two permanents here that draw with
an empty board (the other is Sylvan Library), survives a creature wipe, makes up to four tokens a turn
for Mirkwood Bats with Chatterfang, and is one of the 12 artifact-token sources behind Marionette
Apprentice. The pilot chose the trial anyway, and it is their call.

**Costs named before applying:**

- **Outlet access.** Priest needs two other creatures and a turn to lose summoning sickness, where Woe
  Strider worked the turn it landed. The chance of having seen a no-mana outlet by turn 4 stays at 48.1%
  (6 of them in 99 cards, 10 seen), but the usable number is lower. Woe Strider and Ashnod's Altar were
  the only unlimited outlets with no mana or life cost, so that slot is now Altar alone.
- **Empty-board draw.** Card Draw drops to 5 slots. The count of cards that draw at all stays at 15
  because Priest draws a card per activation, but only once a turn and only with two spare creatures.
- **Pest Infestation reads as MV 1** in every stats tool, so the analyzer will flatter the curve.
- **Not re-measured:** the wave 10 figure of about 19 life per token death, and the 40,000-game
  simulation, which was taken from ledger eval-058 and not re-run.

**Undo rows (the pilot's rule: if the sacrifice outlets struggle, say so).**

- Woe Strider back **for Priest of Forgotten Gods**, or for Pest Infestation if the pilot would rather keep Priest.
- Black Market Connections back **for Pest Infestation**, or Azusa out for it instead (my first
  nomination, now declined).

Every `deck:edit` snapshots the replaced list to `versions/`, so an undo is one command.

## 2026-11-10 — Wave 12: Crossroads, Springleaf Parade, Twitching Doll, Black Market Connections (pilot's calls)

**Applied, four swaps, each its own `deck:edit`.** 100/100, legal and on-identity, Game Changers 1
(Gaea's Cradle). avg MV 2.92 → 2.88, MV 2 20 → 21, MV 5 4 → 3. Ramp & Mana 13 → 15, Token Engines
16 → 14, Card Draw 5 → 5.

| Out | In | Section |
|---|---|---|
| Verdant Command | Concordant Crossroads | Ramp & Mana |
| Deep Forest Hermit | Springleaf Parade | Token Engines |
| Tireless Tracker | Twitching Doll | Ramp & Mana |
| Pest Infestation | Black Market Connections | Card Draw |

**Concordant Crossroads, re-added.** Cut in wave 10 for Warren Soultrader (which stays). Haste lets
fresh tokens use Cryptolith Rite's and Springleaf Parade's `{T}` mana the turn they arrive (CR 302.6,
702.10c), lets Priest of Forgotten Gods, Circle of Dreams Druid, both elves and Twitching Doll tap the
turn they land, and lets Craterhoof-turn tokens attack, the cost wave 10 recorded. **Loop back:** The
Unbeatable Squirrel Girl + Cryptolith Rite (or Springleaf Parade) + Crossroads is unbounded Squirrels
and mana, chosen-N, assemblable on turn 4 or 5. **Cost:** every creature has haste, opponents' too.

**Springleaf Parade.** At X=3, 5 mana for three Shapeshifters plus three Chatterfang Squirrels.
Changelings count as Squirrels for Chatterfang, Camellia and Hazel, and as Squirrels and Bats for
Valley Rotcaller. Its static is a second Cryptolith Rite for tokens. The 2026-09-25 pass rested only
on summoning sickness, which Crossroads removes. Deep Forest Hermit held the same 5-mana seed slot,
leaves after three turns, and its anthem blanks Skullclamp on Squirrels. The pilot named the cost: one
fewer sacrificeable body. Tools count Parade at MV 2; its real cost at X=3 is 5.

**Twitching Doll, for Tireless Tracker (the pilot's choice between Tracker and a 1-mana dork).** The
pilot rarely cracks Clues, so Tracker was a landfall token maker, a job Tireless Provisioner already
does with tokens the pilot uses. Keeping both 1-mana dorks keeps the turn-2 Chatterfang: with two in
99 cards, one is in the opening seven 13.7% of the time, against 7.1% with one. **Cost:** Tracker's
Clue plus Squirrel per land fed Mirkwood Bats, Nadier's Nightblade and Academy Manufactor.

**Black Market Connections, back for Pest Infestation.** This ends the wave 11 trial with the undo it
recorded: *"If the draw dries up, Black Market Connections returns for Pest Infestation."* The pilot
set the draw target this session: **8 to 10 draw sources, and Clue makers never count** (*"i rarely
sacrifice clues for card draw unless i have a lot of mana"*).

### Correction: the Card Draw role drifted from 8 to 5 without anyone re-counting it

The parent list held 8 in Card Draw. Idol of Oblivion left in wave 2, Village Rites in wave 10 and
Black Market Connections in wave 11. Each wave named its own minus one, and none re-counted the role
against a target. Counted the pilot's way after this wave (no Clue makers): Sylvan Library,
Skullclamp, Moldervine Reclamation, Deadly Dispute and Black Market Connections draw directly, and
Yawgmoth and Tippy-Toe draw every turn as a side job. That's 7. Bloodline Recollector (agreed, cut
still open) makes 8. Not counted: Priest of Forgotten Gods and Peregrin Took (conditional), Plumb the
Forbidden (one-shot), the three draw lands, Ravenous Squirrel ({1}{B}{G} per card), Academy
Manufactor's Clues.

### Still open after this wave

- **Bloodline Recollector:** agreed as an add, but the pilot now keeps Deadly Dispute, so it needs a
  different cut.
- **Witch's Oven for Ravenous Squirrel** (agreed as a trial in round 2): held while the draw plan
  settled, because Ravenous is a conditional draw outlet.
- **Idol of Oblivion for Gruesome Fate:** proposed, no answer yet.
- **On hold (pilot):** Exploration for Dryad of the Ilysian Grove, Yahenni, Undying Partisan for
  Gardenize, Super Shredder.
- **Priest of Forgotten Gods trial:** verdict still open.

### Reviewed this session and passed, with grounds

- **Ygra, Eater of All:** "Other creatures" includes opponents' creatures, so every opponent gets
  *"{2}, {T}, Sacrifice this permanent: You gain 3 life"* as an instant-speed answer to a lethal
  drain. The ledger eval-046 grounds also still hold, and the list already has three loop families.
- **Krark-Clan Ironworks:** without Ygra it eats only artifacts, so no creature-death drains fire.
  Its loop (Camellia + Tippy-Toe or Peregrin + KCI) duplicates the Ashnod's Altar loop.
- **Feign Death:** not repeatable. The returned creature is a new object (CR 400.7).
- **Cauldron Familiar:** held. Good with this many Foods, but a Squirrel dying fires the same death
  triggers.
- **Exploration** (simulated, 120,000 games): with it in the opening hand, 3 lands on turn 2 in 51%
  of games, against 0% for Dryad or Azusa. Level by turn 4 (3.30, 3.28, 3.31). On hold.

## 2026-11-10 (later) — Trial: Bloodline Recollector in, Deadly Dispute out (pilot's call)

Snapshot: `versions/2026-11-10-0204-main-trial-bloodline-recollector-in-deadly-dispute-out.json`.
The pilot first said to keep Deadly Dispute, then chose the original swap as a trial: *"let me try
bloodline recollector in and deadly dispute out for a bit and see what happens."* 100/100, legal,
Game Changers 1, avg MV unchanged at 2.88 (both MV 2).

**Grounds.** Recollector becomes prepared at every end step where three or more creatures died,
opponents' turns included, and its copy of Ancestral Craving draws three for {B} and 3 life. Deadly
Dispute draws two once.

**Cost named before applying.** Draw by the pilot's rule (no Clue makers) stays at 7: Sylvan
Library, Skullclamp, Moldervine Reclamation, Black Market Connections, Bloodline Recollector, plus
Yawgmoth and Tippy-Toe. That's one short of the 8-to-10 target. Recollector is a 2/2 that dies
before its copy is cast if a wipe hits first, and each copy costs 3 life.

**Undo rows.** Deadly Dispute back for Recollector if the trial disappoints, or Dispute back for
Gruesome Fate to reach 8 while keeping Recollector (my recommended cut for that slot; Esika's Chariot
and Zulaport Cutthroat were the alternatives).

**Still open:** Witch's Oven for Ravenous Squirrel (trial agreed in round 2, held), Idol of Oblivion
for 9, Exploration, Yahenni and Super Shredder on hold, the Priest of Forgotten Gods trial verdict.

## 2026-11-10 (later still) — Trial: Witch's Oven in, Ravenous Squirrel out (pilot's call)

Snapshot: `versions/2026-11-10-0207-main-trial-witch-s-oven-in-ravenous-squirrel-out.json`. The pilot
agreed to this trial in round 2 of the review (*"maybe i'm willing to try this swap and i'll let you
know how it goes"*). I held it during the draw review because Ravenous Squirrel draws for {1}{B}{G},
then the pilot pointed out it had already been decided. Ravenous never counted toward the draw target
(it's conditional), so the hold wasn't needed. Logged as my miss.

**Grounds.** *"{T}, Sacrifice a creature: Create a Food token. If the sacrificed creature's toughness
was 4 or greater, create two Food tokens instead."* A free outlet once a turn, live the turn it lands
(an artifact). With Tippy-Toe or Peregrin Took each use makes two Foods, and Chatterfang adds two
Squirrels. Its Foods feed Camellia, Ninja Pizza and Cauldron Familiar (held). Ravenous Squirrel's
outlet costs {1}{B}{G} per sacrifice.

**Costs.** Once per turn (no untapper in the list). Loses a 1-drop Squirrel and a conditional draw
outlet. Draw by the pilot's rule stays at 7. **Undo:** Ravenous Squirrel back for Oven.

## 2026-11-10 (closing) — Idol of Oblivion declined; the draw number is an aim

- **Idol of Oblivion for Esika's Chariot: declined** by the pilot (*"nope"*). It was offered as the
  eighth draw source. Draw stays at 7 by the pilot's rule.
- **8 to 10 is an aim, not a hard floor** (pilot: *"it's not a hard floor but an aim, 8-10"*). The
  entries above that call 7 "one short of the target" should be read that way. The rule now sits in
  the root `CLAUDE.md` under Pilot preferences, for every deck.

## 2026-11-10 (after the wave) — CommanderBracket 6.1 → 7.3 is the site switching estimators

The pilot saw the speed rating go from 6.1 to 7.3 after pasting this session's list. Reproduced on
commanderbracket.app (pre-session list 6.1, current list 7.3), then read the API response the page
uses (`POST https://mtg-assistant.up.railway.app/decks/analyze-complete`) for both lists.

| | Pre-session | Current |
|---|---|---|
| Shown on the page | 6.1 (ML model) | 7.3 (rule heuristic) |
| ML estimate | 6.11 | 6.13 |
| ML uncertainty (sigma) | 0.926 | 1.011 |
| Rule heuristic | 7.2 | 7.3 |
| Interaction count | 9 | 7 |
| Deck health (mana / interaction / engine) | 66 (87 / 62 / 44) | 66 (84 / 67 / 44) |
| Ramp by turn 3 / two ramp by turn 3 | 73% / 34% | 76% / 37% |
| Combos in deck | 6 | 7 |

**What happened.** The page shows the ML model's turn while its sigma is under 1.0 and the rule
heuristic otherwise (0.999 still showed the ML number, 1.011 showed the heuristic). Neither estimate
moved more than 0.1 turns. The heuristic's +0.1 is lost cheap interaction: Pest Infestation (read as
removal) and Verdant Command (read as a counterspell) took the interaction count from 9 to 7 and
removed a −0.1 cheap-interaction bonus. The seventh combo is The Unbeatable Squirrel Girl + Cryptolith
Rite + Concordant Crossroads, already flagged in wave 12.

**Each swap scored alone** (ML sigma, then the number shown):

| Swap | Applied alone to the pre-session list | Undone alone on the current list |
|---|---|---|
| Concordant Crossroads for Verdant Command | 0.946, 6.1 | 1.034, 7.3 |
| Springleaf Parade for Deep Forest Hermit | 0.950, 6.1 | 0.996, 6.1 |
| Twitching Doll for Tireless Tracker | 0.949, 6.1 | 0.983, 6.1 |
| Black Market Connections for Pest Infestation | 0.999, 6.1 | 0.917, 6.1 |
| Bloodline Recollector for Deadly Dispute | 0.915, 6.2 | 1.042, 7.3 |
| Witch's Oven for Ravenous Squirrel | 0.926, 6.1 | 1.023, 7.3 |

**No list change.** Undoing a swap to bring the display back to 6.1 would move the model's uncertainty,
not the deck's speed. **A cost wave 12 didn't name:** Verdant Command's graveyard exile and loyalty
counter and Pest Infestation's artifact and enchantment removal both left the list. The remaining
flexible answers are Assassin's Trophy, Beast Within and Tear Asunder, and graveyard hate is down to
Bojuka Bog. Ledger: tool-023.

## 2026-11-14 — Star Trek (TRK/TRC) review; old list deleted, this deck renamed `chatterfang`

Review: `research/trk-set-review-2026-11-10.md`, then two follow-up rounds on cuts. Each swap has its
own `deck:edit` snapshot.

**Applied**
- Fabled Passage in, one Forest out (Forests 6 to 5). Each Passage play is two landfall triggers for
  Tireless Provisioner, Scute Swarm and Avenger of Zendikar. Barren Moor was offered as the
  tempo-neutral cut, and the pilot chose the Forest.
- Alhammarret's Archive in, Llanowar Elves out. The pilot turned down Dryad of the Ilysian Grove,
  Craterhoof Behemoth, Barren Moor and Twitching Doll as cuts, and chose one of the two 1-mana dorks.
  Elvish Mystic stays, the twin the pilot defended on 2026-09-28. The Archive doubles every draw after
  the first in the draw step and every life gain. Costs: the turn-2 Chatterfang opener drops from
  13.7% of hands to 7.1%, and the mandatory Moldervine and Skullclamp draws double, so count the
  library before a chosen-N loop. Draw sources stay at 7, because the Archive multiplies them but
  isn't one itself.

**Declined, with the pilot's grounds**
- Kurn, Son of Mogh for Gruesome Fate: *"Gruesome is one of our best finishers"*, and Kurn's
  attack-based draw is weak in a deck where combat is the secondary finisher.
- Bitter Triumph for Gardenize: declined. Gardenize stays.
- Mosswort Bridge and the rest of the bench: not worth adding.

**Deck housekeeping (pilot's calls)**
- The original pre-fork list (`decks/chatterfang`) was deleted: *"upgrade test is now main and the
  only deck we play"*. Its decision log is merged at the top of this file. Its FRA review, its
  proposal source (now `research/pre-fork-proposal.json`), its `artifact/` page source and the
  Acorn Cascade `calculator/` moved into this folder. Its lists, versions, history and PDF are gone
  from the working tree and recoverable from git history.
- `upgrade-test` was renamed `chatterfang`, and the deck's name is now "Chatterfang, Squirrel
  General". Older ledger and log entries keep the name they were written with.
- The gameplan's stale lines were fixed: Concordant Crossroads is back, Tireless Tracker is out, and
  Elvish Mystic is the only 1-mana dork.

**Validated:** 100/100, legal and on-identity, Game Changers 1 (Gaea's Cradle). Average MV 2.94 by
`deck:show`. `MOXFIELD.txt` regenerated. The reference PDF wasn't regenerated, only renamed.

## 2026-11-18 — Pilot's card notes round: Replicator and Support Mission in, two Swamps out (trial)

Snapshots: `versions/2026-11-18-1238-main-replicator-in-swamp-out-trial.json` and
`versions/2026-11-18-1238-main-support-mission-in-swamp-out-trial.json`. The pilot's notes named Support
Mission and Vengeance Mission for Chatterfang, and the Replicator question from the Star Trek round was
folded in.

**Passed: Vengeance Mission.** It drains one opponent for 1 per death (2 from its seventh counter) and
gains nothing. Zulaport, Bastion and Cauldron each drain the whole table and gain 1 per death, and each
gain fires Dina, Starscape Cleric and Vito. The 2026-11-10 review's grounds still hold. The pilot agreed.

**Replicator in (re-derived from the 2026-11-10 NO).** For {2} at instant speed it copies a token, and
Chatterfang adds a Squirrel. A copy of a Clue, Food or Treasure is that kind of token, so Academy
Manufactor replaces it with one of each, untapped; with Doubling Season it's 12 tokens per activation
if Chatterfang applies last (mtg-rules-expert; ledger repl-015 updated). Each activation is its own
event for Peregrin Took and Tippy-Toe. The review's grounds (Hazel and Ninja Pizza already give free
events) were a redundancy argument, which SKILL §2.5 doesn't accept.

**Support Mission in, on the pilot's ask.** A +1/+1 counter on each creature you control that enters,
two from its fifth counter. I argued once that it only helps combat, the backup plan, and costs
Skullclamp its free kill on Squirrels (it still draws on sacrifice, ledger equip-027). Upside: the
deck's own Meathook Massacre at X = 1 spares countered tokens.

**Cuts.** Two basic Swamps, on trial (*"i'm willing to try less lands and see how it goes"*). The deck
ran 36 lands and 14 ramp pieces at an average MV of 2.94. Four lands by turn 4 on the play goes from
52.7% to 47.0%, the same as Caesar `main` at 34 lands with 5 ramp pieces. Swamps were the cut because
black is better supplied (33 sources for 32 pips) than green (31 for 47). Turned down or kept:
Chatterstorm (measured 42 tokens in wave 10), Twitching Doll (refused 2026-11-14), Valley Rotcaller
(drains each opponent for the Squirrel count on every attack, doubled by Bloodletter).

**Correction during the round.** I twice described Zulaport Cutthroat as gaining no life and proposed
it as Replicator's cut. Its text reads *"each opponent loses 1 life and you gain 1 life"*. The pilot
caught it. The cause was writing card text from memory instead of running `bun run card` (SKILL §1.1).

**Undo:** a Swamp back for Support Mission or Replicator if the deck misses land drops.

**Curve:** average MV 2.94 → 2.92, MV ≤ 2 26 → 27, MV ≤ 3 48 → 50. Lands 36 → 34, black sources 33 → 31.
Validated 100/100, legal and on-identity, Game Changers 1. `MOXFIELD.txt` regenerated.

## 2026-11-20 — Throne of the God-Pharaoh in, Replicator out (pilot's call)

Snapshot: `versions/2026-11-20-1636-main-throne-of-the-god-pharaoh-in-replicator-out.json`. The
pilot's card notes named Throne of the God-Pharaoh for this deck. I proposed it for Blood Artist (the
weakest drain payoff by rate, one opponent per death), with Priest of Forgotten Gods and Circle of
Dreams Druid as the other cuts. The pilot chose Replicator instead: *"how often does replicator make
sense cause remember it's also {2}{T} ... we are building the deck a bit more towards swinging and
tapping for mana so both of those engines could fuel pharaoh and the table"*.

- **Grounds:** *"At the beginning of your end step, each opponent loses life equal to the number of
  tapped creatures you control."* It counts as the trigger resolves (Gatherer ruling), so the board is
  tapped in response. Cryptolith Rite and Springleaf Parade tap creatures for mana, Concordant
  Crossroads lets new tokens use that `{T}`, and Hazel's and Esika's Chariot's tap costs ignore
  summoning sickness (CR 302.6). Creatures tapped for mana earlier in the turn and surviving attackers
  already count, and Bloodletter doubles it because the end step is your turn.
- **Why Replicator, and I agree.** Replicator costs `{2},{T}` every turn for one tapped copy and a
  Squirrel at its base, in a deck that always has somewhere to spend its mana (ledger eval-009, now
  with this case). Throne costs nothing after it lands and pays off what the deck already does.
  Replicator came in on 2026-11-18 as a re-derivation of the 2026-11-10 NO, so it had two days.
- **Costs named:** Token Engines drops from 15 to 14. Creatures tapped for Throne can't block until
  your next untap. Blood Artist stays.
- **Cute line kept for the record:** Replicator copying a Treasure with Academy Manufactor and
  Doubling Season out made 12 tokens per activation at instant speed if Chatterfang applied last
  (ledger repl-015).
- **Land trial:** the undo for the 34-land trial is now a Swamp back for Support Mission or for
  Throne.

**Curve:** unchanged (2.92, MV ≤ 2 27, MV ≤ 3 50). Drain Payoffs 12 → 13.

EDHPlay: pushed to "[NEW] CHATTERFANG DEEZ NUTS", valid, bracket 3, verified. Throne pinned to (AKH)
237. Validated: 100/100, every name found, legal and on-identity, Game Changers 1.

## 2026-11-25 — Printings pulled from EDHPlay (pilot's changes)

The pilot changed printings on "[NEW] CHATTERFANG DEEZ NUTS" and asked to persist them. The
comparison showed 14 `art` lines and no card or count differences, so EDHPlay won every line and the
pins in `deck.json` now match it (MOXFIELD.txt regenerated):

| Card | Was | Now |
|---|---|---|
| Command Tower | (FIC) 484 | (PLST) BLC-130 |
| Overgrown Tomb | (TRK) 289 | (RVR) 283 |
| Urborg, Tomb of Yawgmoth | (M15) 248 | (TSR) 287 |
| Verdant Catacombs | (MM3) 249 | (SLU) 3 |
| Yavimaya, Cradle of Growth | (M3C) 409 | (SLD) 2813 |
| Circle of Dreams Druid | (AFR) 383 | (PAFR) 176p |
| Concordant Crossroads | (2X2) 141 | (2X2) 367 |
| Elvish Mystic | (M15) 173 | (FDC) 202 |
| Ninja Pizza | (TMC) 32 | (TMC) 93 |
| Pitiless Plunderer | (RIX) 81 | (LCC) 208 |
| Black Market Connections | (CLB) 669 | (MSC) 155 |
| Sylvan Library | (DMR) 179 | (DMR) 441 |
| Yawgmoth, Thran Physician | (DMR) 110 | (MH1) 116 |
| Mirkwood Bats | (LTR) 421 | (LTR) 95 |

A second comparison answered `UNCHANGED (valid)`. No list change, so no `history.jsonl` line.

## 2026-11-25 — Mycoloth in, Chatterstorm out (pilot's call)

Snapshot: `versions/2026-11-25-0141-main-mycoloth-in-chatterstorm-out.json`. The pilot asked to try
Mycoloth again (*"not for bitterblossom per se but try to put it in and make a cut for it"*). I
proposed Avenger of Zendikar as the cut, with Esika's Chariot and Bitterblossom as the alternatives.
The pilot chose Chatterstorm.

- **Grounds:** *"Devour 2 (As this creature enters, you may sacrifice any number of creatures. It
  enters with twice that many +1/+1 counters on it.)"* and *"At the beginning of your upkeep, create
  a 1/1 green Saproling creature token for each +1/+1 counter on this creature."* Devour is a
  sacrifice as it enters (CR 702.82a), so each devoured creature dies (CR 700.4) and fires Blood
  Artist, Zulaport Cutthroat, Bastion of Remembrance and Cauldron of Essence, and Nadier's Nightblade
  for a token. Doubling Season doubles the counters it enters with (Gatherer: "Doubling Season affects
  permanents that enter with counters"), Support Mission adds one, and the Saproling count is read
  from counters, not from creatures devoured (Gatherer ruling). Chatterfang adds a Squirrel per
  Saproling, and Mirkwood Bats pings per token.
- **Re-derived from the wave 4 revert (2026-09-25):** Mycoloth came out then for cost, in a list with
  only 9 mana sources costing 3 or less. Ramp is 14 cards now, Circle of Dreams Druid is back, and
  Concordant Crossroads with Springleaf Parade or Cryptolith Rite turns the board into mana. The
  "too much engine" ground still holds, which is why it took a Token Engines slot.
- **Costs named:** Chatterstorm was a 2-mana sorcery burst that scaled with the turn's
  spell count, so MV ≤ 2 drops by one. Mycoloth's upkeep payoff waits a turn cycle and the
  creature draws removal.
- **Cute line kept for the record:** Chatterstorm cast last on a Chatterfang + Peregrin Took +
  Tippy-Toe + Academy Manufactor board made 42 tokens from three storm copies, because each copy is
  its own creation event (wave 10, ledger repl-013).
- **Other cuts considered:** Avenger of Zendikar (recommended: the same late burst for 2 more mana,
  scaling off lands in a 34-land list), Esika's Chariot, Bitterblossom (kept twice before).

**Curve:** average MV 2.92 → 2.97, MV 2 22 → 21, MV 5 4 → 5. Token Engines stays at 14 and draw
stays at 7.

EDHPlay: pushed to "[NEW] CHATTERFANG DEEZ NUTS", 2 changes, valid, bracket 3, verify ok. Mycoloth
pinned to (PLST) CMA-129, the printing EDHPlay chose. Validated: 100/100, every name found.

## 2026-11-25 (later) — Thornvault Forager, Scurry of Squirrels, Ivy Lane Denizen in (pilot's calls)

The pilot asked about four cards: Scurry of Squirrels, Ivy Lane Denizen, Honored Dreyleader and
Thornvault Forager (*"we have a lot of foods which we rarely have a way to get rid of"*). Each swap
has its own `deck:edit` snapshot. Curve: average MV 2.97 → 2.97 (Scurry −0.02, Ivy Lane +0.02),
MV 3 23 and MV 4 10 as before. Draw stays at 7.

- **Thornvault Forager in, Twitching Doll out.** *"{T}, Forage: Add two mana in any combination of
  colors"* turns a Food into mana every turn without Ninja Pizza, and the sacrificed Food fires
  Marionette Apprentice, Nadier's Nightblade, Camellia and Mirkwood Bats. It is a Squirrel (Hazel,
  Squirrel Girl, Valley Rotcaller, Chatterfang's cost), and *"{3}{G}, {T}: Search your library for a
  Squirrel card"* finds Squirrel Girl, Camellia, Hazel or Tippy-Toe. The list already had four Food
  outlets (Ninja Pizza, Camellia's forage, Peregrin Took's draw, the Food's own ability), but only
  Ninja Pizza made mana. **Cost:** without a Food or three graveyard cards it makes only {G}, where
  the Doll made any colour. Other cuts considered: Sakura-Tribe Elder, Tireless Provisioner.
- **Scurry of Squirrels in, Esika's Chariot out.** Myriad twice: four tapped-and-attacking copies
  per attack in a four-player pod, plus four Chatterfang Squirrels, also tapped and attacking.
  Everything myriad made is exiled at end of combat, extras included (ledger repl-017), so the play
  is to sacrifice them after combat damage. **Costs:** myriad shrinks as players die; the Chariot's
  Cats came without attacking and its crew tapped creatures for Throne. Other cut considered: Avenger
  of Zendikar.
- **Ivy Lane Denizen in, Support Mission benched (trial).** Ivy Lane's counter has a target, so it can
  stack on Mycoloth or an attacker and leave Skullclamp's 1/1 alone; Support Mission countered every
  entering creature. No loop in this list (no persist or undying creature, no Ghave, no Scurry Oak).
  **Costs:** a 4-mana 2/3 that dies to wipes, and a target choice per trigger on EDHPlay. **Undo:**
  Support Mission back for Ivy Lane if wipes keep catching it (`research/sideboard.md`).
- **Honored Dreyleader: passed for `main`.** It grows one trampler and only feeds the combat route.
  Its counters go only on itself, which corrected ledger equip-027 (it had listed Dreyleader as
  blanking Skullclamp). **Cute line kept:** Hazel's end-step copies of it each enter with a counter
  per Squirrel and Food.
- **Opened:** the pilot asked whether a combat-focused version (pump, Super Shredder, Dreyleader)
  belongs in this list or in its own. Answer pending.

EDHPlay: pushed to "[NEW] CHATTERFANG DEEZ NUTS", 6 changes, valid, bracket 3, verify ok. Printings
back-filled: Thornvault Forager (BLB) 197, Scurry of Squirrels (PLST) BLC-33, Ivy Lane Denizen (PLST)
DDU-12. Validated 100/100, every name found.

## 2026-11-25 (last) — Super Shredder in, Avenger of Zendikar out (pilot's call)

Snapshot: `versions/2026-11-25-0332-main-super-shredder-in-avenger-of-zendikar-out.json`.

- **Grounds:** *"Whenever another permanent leaves the battlefield, put a +1/+1 counter on Super
  Shredder."* It triggers per permanent (CR 603.2c), so every sacrificed token, cracked Food, Treasure
  or Clue, fetch land, forage, exiled myriad token and opposing creature that dies grows it. Menace,
  Bloodletter doubles its damage on your turn, and Ivy Lane can stack counters on it. Avenger was the
  most expensive token engine and scaled off lands in a 34-land list; Mycoloth, Scurry of Squirrels
  and The Unbeatable Squirrel Girl now cover the late burst.
- **Costs named:** Avenger's Plants arrived at once and counted toward Craterhoof that turn; Super
  Shredder is one creature that dies to one removal spell. Landfall payoffs drop to Tireless
  Provisioner and Scute Swarm. Token Engines 14 → 13.
- **Other cuts considered:** Bitterblossom (the pilot asked what it would cost: the only token engine
  that works from turn 2 with no condition, a full token event every upkeep, and a free Skullclamp
  target each turn) and Valley Rotcaller (kept 2026-11-18). This was the third time Avenger was
  named; the pilot had picked Chatterstorm and Esika's Chariot over it before.
- **Cute line kept for the record:** Avenger of Zendikar with Ivy Lane Denizen out made one counter
  per Plant, since Plants are green creatures entering.

**Curve:** average MV 2.97 → 2.89, MV 2 21 → 22, MV 7+ 2 → 1 (Craterhoof Behemoth alone). Draw stays
at 7.

EDHPlay: pushed to "[NEW] CHATTERFANG DEEZ NUTS", 2 changes, valid, bracket 3, verify ok. Super
Shredder pinned to (TMT) 83. Validated 100/100, every name found.
