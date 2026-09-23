# Teysa Karlov — Decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not the verdict.

---

## 2026-09-22 — Founded. Brief, commander choice, and the whole 100

### The brief

From the pilot, after two rounds narrowing down a replacement for Edgar Markov: *"let's make a drain
archetype deck. we can build from scratch even… the goal is to keep the drain archetype, create as
many tokens, sac em and drain."* Then: *"we don't also just want the lowest salt one. we want
something that's the best but if it has a high salty factor let me know."* Then: *"i'm okay to have a
late game combo on the deck like turn 8+ and maybe not two card infinite."*

Built alongside `decks/chatterfang/` as a deliberate A/B — the pilot will play both and keep the one
they like. This is the **lower-salt, higher-consistency** half of the pair.

### Why Teysa Karlov

Scored on how many of the loop's three jobs the commander does from the command zone (LEDGER
2026-09-22). Teysa does **one** — payoff — but she does it harder than anything else in the format:
*"If a creature dying causes a triggered ability of a permanent you control to trigger, that ability
triggers an additional time."* Every Blood Artist, Zulaport, Cruel Celebrant, Bastion, Elas il-Kor,
Falkenrath Noble, Marionette Apprentice, afterlife trigger, Open the Graves Zombie and Skullclamp draw
happens **twice**. Her second line, *"Creature tokens you control have vigilance and lifelink"*, turns
every attacking token into its own life-gain event, which is what Marauding Blight-Priest and Vito
convert back into damage.

**Salt: 0.53/4 — against Edgar's 2.05.** Rank #57, 21,555 decks, top theme Aristocrats. No salt flag
worth raising: she is a well-known, well-liked fair commander. The one thing a pod could object to is
mass edicts, and those are deliberately not in the list (below).

Because she makes no bodies herself, **the 99 has to carry the token half** — that is the correction
that produced this whole search (LEDGER 2026-09-22, "A commander swap must replace the commander's
JOB"). Fourteen token engines, up from the six the Edgar list would have had left.

### Role skeleton (SKILL §2.1) — targets set before any card was picked

| Role | Target | Built |
|---|---|---|
| Commander | 1 | 1 |
| Lands | 36 | 36 |
| Ramp & Mana | 8 | 8 |
| Card Draw | 9 | 9 |
| Removal & Interaction | 7 | 7 |
| Board Wipes | 2 | 2 |
| Token Engines | 14 | 14 |
| Token Doublers | 2 | 2 |
| Sacrifice Outlets | 6 | 6 |
| Drain Payoffs | 11 | 11 |
| Recursion & Finishers | 4 | 4 |

### The deliberate late-game combo — declared, not hidden

**Teysa + Pitiless Plunderer + Reassembling Skeleton + any free sacrifice outlet.**

Sacrifice the Skeleton to Viscera Seer / Carrion Feeder / Woe Strider / Ashnod's Altar. Plunderer's
*"whenever another creature you control dies, create a Treasure"* is a dies-trigger, so **Teysa doubles
it: two Treasures.** Reassembling Skeleton returns for exactly {1}{B} — two mana, two Treasures. Net
zero, repeat as many times as the pilot chooses. Each iteration is two Blood Artist triggers, two
Zulaport triggers, two Bastion triggers.

- **Three in-deck cards plus the commander plus an outlet — not a two-card infinite.**
- It is a **chosen-N loop**: every iteration is an activation the pilot announces, and opponents get
  priority (memory `loop-policy-chosen-n`, 2026-09-06).
- Honest about the timing: at 4 + 2 + 1 mana it can assemble around **turn 6–7**, a little earlier than
  the pilot's stated "turn 8+". Flagged rather than buried.
- **To switch it off, cut Reassembling Skeleton.** Checked: Ashnod's Altar alone does *not* enable it,
  because it makes {C}{C} and the Skeleton needs {B}. Phyrexian Altar alone gives one mana, not two.
  Plunderer is the only enabler, and Plunderer without the Skeleton loops with nothing.

### Cards rejected on their merits, with the grounds

- **Field of Souls** and **Requiem Angel** — both key on *nontoken* creatures dying, and so does
  **Open the Graves**. Three cards gated on the half of the board that isn't tokens, in a token deck,
  is too many (SKILL §1.3). Kept Open the Graves alone, because its 2/2 Zombies are real bodies and
  Teysa makes it two per death. Replaced with **Thalisse, Reverent Medium** (X Spirits at each end
  step, where X is the tokens made that turn — it scales with the whole deck) and **Hidden Stockpile**
  (a Servo every turn *and* a one-mana outlet).
- **Dark Prophecy** — {B}{B}{B} for a card and **1 life per creature death**, which Teysa **doubles to
  2 life**. Alongside Midnight Reaper (also doubled, also 2 damage), Phyrexian Arena, Black Market
  Connections, Bitterblossom and three painlands, the deck was paying far too much life to draw.
  Replaced by **Vampiric Rites**, which *gains* life instead and is a repeatable outlet.
- **Vindictive Vampire** — 4 mana to do what Zulaport does at 2, and it deals damage rather than
  gaining life, so it feeds neither Blight-Priest nor Vito. Replaced by **Marauding Blight-Priest**.
- **Divine Visitation** — makes every token a 4/4 Angel, which **turns off Skullclamp** (+1/−1 no
  longer kills a 1/1) and costs the deck its cheap chump fodder. Not run.
- **Dictate of Erebos / Grave Pact** — the strongest cards available here, and with Teysa doubling them
  each opponent sacrifices **two** creatures per death of yours. Left out and raised with the pilot
  rather than silently excluded (memory `users-pod-tendencies`: never silently exclude on pod grounds,
  ask). This is the single biggest power the list is leaving on the table, and it is the pilot's call.

### Rules facts this list is built on (all verified 2026-09-22)

- **Teysa doubles DIES triggers, never SACRIFICE triggers** (LEDGER 2026-09-10, CR 700.4, 701.21a,
  603.2d, 603.10a). She doubles Blood Artist, Zulaport, Cruel Celebrant, Bastion, Elas, Falkenrath,
  Marionette Apprentice, every afterlife, Open the Graves, Elenda, Hallowed Spiritkeeper, Plunderer and
  Skullclamp. She does **not** double Mirkwood Bats (which triggers on creating/sacrificing a token),
  Blight-Priest or Vito (life-gain triggers), Oketra's Monument or Bontu's Monument (cast triggers).
- **She still doubles when she dies in the same wipe** — dies-triggers look back (CR 603.10a). She does
  **not** save Blight-Priest or Vito, which have no look-back and must survive.
- **Teysa + Roaming Throne would be three triggers, not four** (CR 603.2d) — the two "additional time"
  effects add, they do not multiply. Throne is not in the list for that reason plus type mismatch.
- **Anointed Procession and Mondrak are replacement effects that DO multiply** (CR 616.1e–f, 614.5):
  both out is 4× tokens, and with Elspeth, Storm Slayer it is 8×.
- **Elenda dying with power 5 makes 10 tokens** under Teysa — the leaves-the-battlefield trigger is
  doubled and each instance reads the same last-known power (CR 608.2h).

### Validation

`bun run card --deck decks/teysa-karlov/DECK.md --id wb` — 89 lines, 89 found, **no off-identity, no
illegal cards**. 100 cards. Every section header count matches its contents. STATUS.md generated from
DECK.md so the two cannot drift on names. `bun run deck:moxfield teysa-karlov` regenerated.
**Game Changers: 1/3 (Smothering Tithe)** — inside Bracket 3.

---

## 2026-09-22 — Audit of the pilot's known favourite / pet cards

The pilot asked: *"you already know about some of my favorite cards so don't put them in there if
they don't earn their spot but point them out for me."* Every card this repo records the pilot
championing, defending or asking for, scored against **this** list.

**Earned a slot, on merit (not sentiment):**

| Card | Why it earned it here |
|---|---|
| Skullclamp | Teysa **doubles the death trigger — four cards per equipped token** |
| Anointed Procession | The pilot picked it over Teysa herself in Edgar on 2026-09-10; here they work together, 4× tokens |
| Elspeth, Storm Slayer | Third multiplier; with Procession + Mondrak it is 8× on every token |
| Smothering Tithe | The deck's only Game Changer; Treasures fuel Plunderer-free ramp |
| Vito, Thorn of the Dusk Rose | Teysa doubles every *lifegain* drain trigger, so Vito converts twice the life |
| Marauding Blight-Priest | Counts life-gain **events**; Teysa doubles the triggers that cause them |
| Mirkwood Bats | Create **and** sacrifice — two hits per token (note: Teysa does **not** double it) |
| Bloodletter of Aclazotz | Doubles all of the above again on your turn |
| Elenda, the Dusk Rose | Teysa doubles her death trigger: at power 5 that is **ten** lifelink Vampires |
| Ashnod's Altar · Viscera Seer · Phyrexian Tower · Plumb the Forbidden · Deadly Dispute · Village Rites | Carried over on merit, same grounds as Edgar |
| Swords to Plowshares · Path to Exile · Generous Gift · Anguished Unmaking | Best-in-class Orzhov interaction |

**Did not earn a slot — named here rather than quietly dropped:**

- **Cathars' Crusade** — the pilot's own pick for Edgar on 2026-08-04. It is **actively
  anti-synergistic here**: it grows every token, and Skullclamp's +1/−1 only kills a creature with
  toughness 1. A single Crusade trigger turns the deck's best draw engine off. The Edgar gameplan also
  called it *"the fiddliest card in the deck"* — with 14 token engines it would be worse. Named
  because it is a favourite, not because the call is close.
- **Blood Seeker** — same reasoning as the Chatterfang list: the pilot's override in Edgar was right
  and was about **the pod**. Nothing for our loop, so it is off on rate; it goes in over Hunted Witness
  the moment a token deck is in the pod.
- **Dark Ritual / Master of Dark Rites** — no single huge payoff to ritual into; the curve tops at 5.
- **Roaming Throne** — three triggers with Teysa, not four (CR 603.2d, verified), and the payoffs here
  are six different creature types. It was a tribal card doing a tribal job.
- **Teferi's Protection** — legal, and a Game Changer slot is free (1/3 used). Genuinely close: it is
  the best answer to the wrath that ends a token deck. It lost the slot to **Plumb the Forbidden**,
  which converts the board into cards *and* beats exile-based wipes that Teferi's cannot. Say the word
  and it goes in over Despark.
- **Purphoros · Warleader's Call · Shared Animosity · Infantry Shield** — red, not legal here.
- **Dina, Soul Steeper · Poison-Tip Archer · Parallel Lives · Doubling Season** — green, not legal
  here. They are in the Chatterfang list instead.

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
