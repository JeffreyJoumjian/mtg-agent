# FRA + FRC (Reality Fracture + Reality Fracture Commander) set review — Ghave — 2026-09-28

**Method:** deck-brain SKILL.md. I read every card from the verified Scryfall oracle text in
`data/fra-candidates-ghave.json` + `data/frc-candidates-ghave.json`, never from memory. I read the
deck from `deck.json` (list `main`, B3) with each card's oracle text, and re-derived the verdicts in
`research/decisions.md` from their grounds instead of copying them (§1.1b). I checked every
candidate against the deck's own board **and its own triggers** (§1.3), and costed each one in this
deck's mana (§1.2). Ghave's per-activation {1} is the mana sink everything else competes with
(LEDGER 2026-08-06, 2026-09-09). Rules were checked against the local CR (2026-08-07), and the token
definitions against the TFRA/TFRC token sets.

**Field lens:** unavailable. EDHREC has no FRA/FRC data before the 2026-10-02 release (§2.2: say so
and skip).

**Pool:** 191 cards fit {W}{B}{G} and are commander-legal: 149 FRA + 42 FRC. Of those, 158 are new
and 33 are reprints. 9 are already in the 99 (Path, Swords, Sol Ring, Lingering Souls, Command
Tower, Isolated Chapel and the three basics). **Zero Game Changers in either set.** The deck sits
at 3/3 Game Changers (Gaea's Cradle, Aura Shards, Teferi's Protection), so none of the adds below
touch the bracket.

**Result: 3 MAIN · 11 SIDE · 168 NO · 9 already in the deck.** All 191 are classified in the table
at the end.

---

## Set mechanics as they matter to this deck

- **Prepare** (CR 722). The creature carries an inset spell, and you cast a *copy* of it while the
  creature is prepared. Per LEDGER 2026-08-06, that is a **normal cast at full cost**. The copy is
  only the inset spell (CR 722.3c), so creature-spell triggers miss it. A permanent can't become
  prepared while it already is (722.3a), so the "becomes prepared" cards cap at once per trigger
  window. The 99 has **zero** prepare creatures, so Hexhaven Dueling Arena is dead. The one prepare
  card that matters is **Bloodline Recollector**: its window reopens every end step in which three
  creatures died, and in this deck that happens every turn.
- **Empower Jace N.** This puts N loyalty counters on a Jace token, creating the token first if you
  have none. The token is a **planeswalker token** (−1 surveil, −3 draw), so this deck's doublers
  apply. Anointed Procession makes two, and the spare one enters with 0 loyalty and dies. That
  death triggers Cruel Celebrant, which reads "creature or planeswalker". Chatterfang adds a
  Squirrel and Mirkwood Bats drains on the creation. It's cute but capped: each walker still gets
  **one** loyalty activation a turn, so the whole "Way of the …" planeswalker sub-theme tops out at
  a card a turn. Every Empower card was rated NO.
- **Lifegain payoffs** (Unflinching Hortimancer, Titanbones, Ajani Resolute, Bloombrute, Kwia,
  Niv-Mizzet Ghost Counsel, Germinate Recruits). This deck has **11 lifegain sources** by oracle
  grep. Elas il-Kor gains on **every creature entering**, and Blood Artist, Zulaport, Cruel
  Celebrant, Bastion, Slimefoot and Moldervine gain on deaths. Add March's lifelinkers, Pest
  tokens, Meathook's opponent side and Rosie's Food. "Whenever you gain life" counts **events**,
  not life (CR 119.9, LEDGER 2026-09-25), and this deck produces events by the dozen. **This is the
  set's real hook for Ghave.**
- **Surveil / threshold** (the set's graveyard theme). The deck fills its graveyard slowly
  (fetches, ramp sorceries, Icetill's mill), and tokens never reach it. Threshold cards were rated
  on that.
- **Token definitions** (verified): Cadet is a 2/2 colourless creature, Lotus is an artifact that
  makes three mana of one colour, Heartwood is a noncreature artifact rock, and Forest Tentacle is
  a 3/3 **land** creature. All of them are tokens, so doublers and Chatterfang apply.
- **Die-replacement check** (LEDGER 2026-08-09 "exiles it instead"). **Garruk, Veiled Butcher**
  carries it and is rated a trap. No other card in the pool does.

---

## The pilot's named asks

### Gardenize — SIDE. It is the first reserve for the slot Cultivate leaves, not a MAIN over it

*"Whenever a creature you control dies, put a charge counter on this enchantment. At the beginning
of your first main phase, add {G} for each charge counter on this enchantment."*

**How many creatures die per turn cycle in Ghave?** The list decides it, not the average deck:

| Stage | Where deaths come from | Deaths per cycle |
|---|---|---|
| Turn Ghave lands (T4) | Bitterblossom Faerie, a fetch-land Scute/Nantuko token, an STE | 0–2 |
| The turn after | Ghave's 5–6 counters become Saprolings, fed to Viscera Seer/Altars/Ghave; Tendershoot adds 4 per cycle | 3–6 |
| Midgame (doubler out) | Every Ghave activation makes 2+ bodies; Grave Pact/Dictate also kill opponents' creatures, which don't count | 6–12 |
| Any declared loop | Unbounded, but the loop already wins | n/a |

So Gardenize adds roughly **+3 {G} on the turn after Ghave, and +6–10 by turn 7**. The counters
**never leave**, so the output only grows. **Doubling Season doubles the charge counters** (its
text covers counters on any permanent you control), which makes it 2 per death.

**Ramp or payoff?** It is a **death → mana converter with a one-turn delay**. That puts it in the
same family as Pitiless Plunderer (a Treasure *now*) and the two Altars, not with the land-ramp
suite. Two properties make it unusual:

- **It's resilient where the others aren't.** It's an enchantment, so a creature wipe that kills 15
  of our creatures loads it with 15 counters. The next turn is a 15-{G} rebuild turn: recast Ghave
  (7 with tax) and spend the rest on Saprolings. That's a genuine answer to the turn-4–5 wipe that
  ended a Captain America game (memory `captain-america-decks`).
- **It's main-phase-1 mana only** (CR 505.1b, 106.4). It pays for Ghave activations and sorceries
  in main 1. It **cannot** fund the gameplan's §6.4 plan of holding mana for instant-speed
  Saprolings on opponents' turns.

**Role table — the slot it competes for** (Ramp & Mana is 11 against a target of 10, so this is
the over-subscribed role; see MAIN 2 for the full ramp table):

| Card | MV | Pays from | Unconditional? | What it adds | Self-hit |
|---|---|---|---|---|---|
| Cultivate *(in)* | 3 | T3, which puts Ghave on T4 with mana spare | yes | 1 land on the battlefield + 1 in hand, 2 landfall triggers | none |
| **Unflinching Hortimancer** *(MAIN 2)* | 2 | the turn a drainer or Elas lands | needs lifegain events (11 sources) | each death costs Ghave {1} instead of {2}, and surplus counters bank | 2/1 dies to Meathook X≥1 |
| **Gardenize** | 3 | the turn *after* the first deaths | needs deaths (Ghave makes them) | +{G} a turn per death, forever; turns a wipe into a rebuild | none |
| Simulacrum Shaper | 3 | T3 | yes | a basic on the battlefield + 2/2 fodder + a card when it dies | none |

**Deciding axis (§2.3): speed vs resilience.** Hortimancer costs 2 and pays the turn a drainer is
out, and it fills the under-target Counter Engines role (2 against 3). Gardenize costs 3, pays a
turn later, and survives the wipes that kill Hortimancer. On the pilot's standing complaint (speed,
win turn) Hortimancer wins. On "we keep losing to wipes" Gardenize wins. Neither helps cast Ghave
on turn 4; only Cultivate and Shaper do. **Recommendation: Hortimancer in the Cultivate slot, and
Gardenize as the first card in if the deck is being wiped or runs out of mana mid-game.** It's a
defensible pilot call either way, and it's worth a playtest.

### Hexhaven Invigorator — NO for Ghave

*"Vigilance. Whenever this creature is dealt damage, you may search your library for up to that
many land cards, put them onto the battlefield tapped, then shuffle."*

- **What in THIS deck deals damage to our own creature? Nothing.** An oracle grep of the 99 for
  "deal(s) damage / fight" returns one card, Slimefoot, and it hits **opponents** only.
  Chatterfang's +X/−X, Meathook's −X/−X and every sacrifice are not damage. The set's own enablers
  (Vigorbloom Charm's fight mode, Yoshimaru Scrappy Stray, Compel Brutality) all need an **opposing
  creature**, which makes each one a two-card combo that depends on the opponent's board.
- **It only triggers if an opponent chooses to damage it.** They'd have to block it (any blocker
  with power ≥1 gives lands equal to that power) or burn it. A 6/6 vigilance body mostly gets left
  alone.
- **{G}{G}{G}{G} in a three-colour base:** 26 green sources in 99 cards gives P(≥4 by T4 on the
  draw) = **0.32** and by T6 = **0.46** (hypergeometric; Yavimaya pushes this up somewhat).
- **Ramp-role comparison:** every ramp piece in the list works without the opponent's help. The
  Invigorator is a 4-mana 6/6 with no token, counter or drain text whose ramp is at the table's
  discretion.
- **What would change the verdict:** a reliable self-pinger in the 99 (a Pestilence-style effect).
  The deck has none, and adding one to enable one card is the tail wagging the dog. (Chatterfang's
  deck is a separate question for that fork.)
- **Parent-review note (2026-09-28):** an earlier session today saved **Golden Guardian** ({4},
  colourless, "{2}: This creature fights another target creature you control", returns as a land when
  it dies) as the on-demand enabler for exactly this card — LEDGER *"Golden Guardian + Hexhaven
  Invigorator: a self-contained ramp package"*. That entry files the pair under **lands/landfall
  shells, not token-sacrifice shells**. Ghave has Icetill Explorer and fetch lands, so it is closer to
  that shell than Chatterfang — if the pilot wants Hexhaven here, it is a two-card package (Guardian +
  Invigorator), not a one-card add, and still competes against the {G}{G}{G}{G} cast odds above.

### Edgar, Ancient Bloodlord — NO for Ghave

*"Whenever another creature or planeswalker you control dies, you gain 1 life. {2}, Sacrifice another
creature or planeswalker: Put a +1/+1 counter on Edgar. He gains menace until end of turn."*

**Role table — Sacrifice Outlets** (4 against a target of 5, plus Ghave himself):

| Outlet | Cost per sacrifice | What it returns | Instant? |
|---|---|---|---|
| **Ghave** (command zone) | {1} | +1/+1 counter on **any** target, i.e. a future Saproling | yes |
| Viscera Seer | free | scry 1 | yes |
| Ashnod's Altar | free | {C}{C} | yes (mana ability) |
| Phyrexian Altar | free | one mana of any colour | yes |
| Priest of Forgotten Gods | two creatures + {T} | each opponent loses 2 and sacrifices, {B}{B}, draw 1 | yes |
| Chatterfang *(doubler slot)* | {B} + X Squirrels | +X/−X | yes |
| **Edgar, Ancient Bloodlord** | **{2}** | a counter on **Edgar only**, plus menace | yes |

Edgar's outlet is **Ghave's ability at twice the price, with a worse target**. Ghave can move the
counter to a Saproling later, but only by paying {1} more. His per-death lifegain is the only new
text, and today nothing converts it. Five drainers already gain life on each death. **Re-derive if
Hortimancer (MAIN 2) or Niv-Mizzet goes in**, because each death would then also be a counter or a
card. Even then he is the only lifegain source here that drains nothing. (His real home is the
Edgar Markov lists, where the Vampire type and the lifegain converters exist. That's another
fork's call.)

---

## Proposed swaps (MAIN) — nothing applied; the pilot approves each one first

Curve before: 65 nonland cards, **avg MV 2.800, MV ≤ 2 = 29, MV ≤ 3 = 48**. After all three:
**avg 2.769, MV ≤ 2 = 31, MV ≤ 3 = 48**. Land count stays at 35 and Game Changers stay 3/3.

### MAIN 1 — Bloodline Recollector in, Mentor of the Meek out (Card Draw)

*Bloodline Recollector {1}{B} 2/2 Vampire Warlock: "At the beginning of each end step, if three or
more creatures died this turn, this creature becomes prepared." Ancestral Craving {B}, instant:
"Target player draws three cards and loses 3 life."*

- **The condition is free here.** Any creature counts: our tokens (they die; CR 704.5f, 700.4),
  and opponents' Grave Pact and Dictate victims. On our turn, three deaths is one Ghave activation
  cycle. On an opponent's turn it costs about {2}–{3} of held-up Ghave mana. **Each end step** is a
  window (every player's turn), so a cycle can see four casts.
- **Rate:** {B} for three cards, cast from exile as a normal cast at full cost (CR 722.3c, 601.2i;
  LEDGER 2026-08-06). It can also target an **opponent** for 3 life loss, a real finisher at the
  end of a drain turn.

**Role table — Card Draw** (9 against a target of 8, so this role is over-subscribed):

| Card | MV | Steady-state price per card | Works with no board? | Riders (this list) |
|---|---|---|---|---|
| Skullclamp | 1 | {1} equip → 2 cards per 1/1 | no | the deck's premier draw |
| Village Rites | 1 | {B} + a body → 2 | no | instant; the sacrifice is a death trigger |
| Deadly Dispute | 2 | {1}{B} + a body → 2 + Treasure | no | Treasure feeds Marionette |
| Sylvan Library | 2 | 4 life per extra card, or selection | **yes** | selection every turn |
| Idol of Oblivion | 2 | **free**, 1 per cycle (Ghave makes a token each turn) | on our turn | {8}: a 10/10 |
| Black Market Connections | 3 | 2 life per card, once a turn | **yes** | Treasure / a 3/2 changeling |
| Tireless Tracker | 3 | {2} per Clue, a Clue per landfall | **yes** | Clues are artifact tokens (Marionette, Bats) |
| **Mentor of the Meek** | 3 | **{1} per card**, per power-≤2 creature entering | no | unbounded draw in a loop |
| Moldervine Reclamation | 5 | free, 1 per death + 1 life | no | enchantment (survives wipes) |
| **Bloodline Recollector** | 2 | **{B} per three cards**, once per end step with 3 deaths | no | a 2/2 fodder body; can burn an opponent for 3 |

- **Cut Mentor of the Meek. Deciding axis (§2.3): mana per card.** Once Ghave is out, every {1}
  the deck spends is a Saproling not made. Mentor charges exactly that {1} per card. Recollector
  charges a third of it and pays from deaths the deck makes anyway (LEDGER 2026-09-09: a new cheap
  draw source re-prices every pay-per-use engine).
- **What Mentor does that Recollector can't:** unbounded draw during a declared loop. That isn't
  needed, because the loops win through the drainers, and gameplan §9.7 already warns against
  over-drawing with Mentor.
- **Cuts considered and passed on:** Idol of Oblivion (free draw), Village Rites (MV1 fuel),
  Moldervine Reclamation (highest ceiling, and wipe-proof).
- **Self-hits:** a 2/2, so Meathook X≥2 kills it (the gameplan already accepts Meathook deaths).
  The life loss lands on us only if we target ourselves, and the deck is lifegain-positive. It
  draws at most 3 per turn, so there's no decking risk.
- **Curve:** MV 3 → 2, so MV ≤ 2 goes 29 → 30.

### MAIN 2 — Unflinching Hortimancer in, Cultivate out (Ramp & Mana 11 → 10, Counter Engines 2 → 3)

*Unflinching Hortimancer {1}{W} 2/1: "Ward {1}. Whenever you gain life, put a +1/+1 counter on this
creature."*

**Why this card belongs in this deck:** Ghave removes counters from **any** creature you control
(gameplan §2). The Hortimancer turns each lifegain **event** into a counter, and so into a
Saproling (CR 119.9: gaining 1 life three times is three triggers). The 99's event sources:

- **Elas il-Kor** gains on every creature *entering*. Each Saproling Ghave makes refunds the counter
  it cost, which is Rosie Cotton's job done a second time.
- **Blood Artist, Zulaport, Cruel Celebrant, Bastion, Slimefoot (on Saproling deaths) and
  Moldervine** each gain once per death. With two of them out, every death returns **two**
  counters.
- Hardened Scales and Kami add +1 each, and Doubling Season doubles. With all three, one event is
  6 counters.

Worked midgame (Ghave, Hortimancer, Blood Artist, Zulaport, Viscera Seer, 3 Saprolings, 6 mana):
three free sacrifices give 6 counters and 12 drain. Six {1} Saprolings sacrificed to Seer give 12
more counters and 24 more drain. That's **about 36 drain from 6 mana, with 12 counters banked**.
Without the Hortimancer the same board and mana drains about 24, because each death costs {2}
(Ghave's remove + sacrifice).

**Role table — Counter Engines** (candidate beside every card in the role, plus the pool's
alternatives):

| Card | MV | Counters per… | Needs (in this list today) | Blocks Skullclamp? |
|---|---|---|---|---|
| Hardened Scales *(in)* | 1 | +1 on every placement | a placement | no |
| Kami of Whispered Hopes *(in)* | 3 | +1 on every placement; taps for X | a placement | no |
| **Unflinching Hortimancer** | 2 | +1 **per lifegain event**, on itself | 11 lifegain sources incl. Elas | no (counters sit on the Hortimancer) |
| Titanbones *(pool)* | 4 | +2 per event | same | no |
| Massacre Girl *(pool)* | 5 | +1 per opponent dealt noncombat damage (her own ping; Slimefoot gives 3) | a death | no |
| Guiding Hydra *(pool)* | X+1 | +1 on **each** other creature, once per combat | X counters | **yes**, it puts a counter on every token |
| Yoshimaru, Beloved Companion *(pool)* | 3 | +1 on placements (creatures only) | a placement | no |
| Ajani Resolute *(pool)* | 2 | loyalty per event; −4 makes a Pridemate | 4 loyalty first | the −10 emblem does |

**Role table — Ramp & Mana** (over-subscribed at 11 against 10, so the cut comes from here):

| Card | MV | Unconditional? | What it does | Notes |
|---|---|---|---|---|
| Birds of Paradise | 1 | yes | dork, any colour | keep: fast mana |
| Llanowar Elves | 1 | yes | dork | pilot's pick |
| Sol Ring | 1 | yes | +2 | keep |
| Farseek | 2 | yes | a typed dual or Triome, tapped | fixing |
| Nature's Lore | 2 | yes | a Forest-typed land, **untapped** | fixing |
| Three Visits | 2 | yes | same | fixing |
| Sakura-Tribe Elder | 2 | yes | a basic, tapped, plus a free self-sacrifice | a death trigger too |
| Cryptolith Rite | 2 | board | every non-sick creature taps for mana | board→mana, cut last (LEDGER 2026-09-26) |
| **Cultivate** | 3 | yes | a basic tapped + a basic in hand | **the only MV3 land spell; slowest per mana** |
| Icetill Explorer | 4 | yes | an extra land drop, lands from the graveyard | the pilot's 2026-09-25 landfall package |
| Oracle of Mul Daya | 4 | yes | an extra land drop, lands off the top | the pilot's 2026-09-25 landfall package |

- **Cut Cultivate. Deciding axis (§2.3): Ghave throughput per mana.** The Hortimancer halves what a
  death costs Ghave. Cultivate is the one ramp piece above MV 2 that isn't part of the pilot's
  landfall package.
- **The cost, named (LEDGER 2026-09-25 "section counts measure slots"):** the deck has one fewer
  unconditional land-ramp piece. Eight ramp pieces remain at MV ≤ 2. The metric that regressed in
  upgrade-test (MV ≤ 2) *rises* here, 30 → 31.
- **Other occupants of this slot, ranked:** Hortimancer (speed; fills the under-target role), then
  **Gardenize** (resilience; see Pilot's asks), then **Simulacrum Shaper** (keeps the slot as ramp
  and beats Cultivate in a sacrifice deck).
- **Self-hits:** a 2/1, so Meathook X≥1 kills it (accepted, as for the dorks). Ward {1} taxes only
  opponents. It doesn't touch Skullclamp.
- **Combos: flagged, not hidden** (pilot policy: chosen-N loops allowed, say so once):
  - **Ghave + Hortimancer + Ashnod's Altar + (Elas, or any life-gaining drainer).** Remove a
    counter ({1}), get a Saproling, and Elas gains 1 on entry so the counter comes back. Altar the
    Saproling for {2}. **Net +{1} and one death per iteration: infinite mana and drain.**
  - **The same with Phyrexian Altar:** net 0, so infinite deaths.
  - Both are Ghave plus **three** cards, one of which is a drainer the deck wants anyway. They
    aren't faster than the declared Rosie + Ashnod's line (Ghave plus two, gameplan §8); they add
    redundancy. The earliest assembly is turn 5 with ramp, the same as today's lines. Add them to
    the declared list if applied.

### MAIN 3 — Fabled Passage in, one Swamp out (Lands)

*"{T}, Sacrifice this land: Search your library for a basic land card, put it onto the battlefield
tapped, then shuffle. Then if you control four or more lands, untap that land."* (FRC reprint.)

- **Deciding axis: landfall triggers per land drop.** That's the 2026-09-25 package the pilot
  built on purpose. A fetch is **two** triggers (Tracker Clue, Scute, Nantuko, Avenger's Plant
  counters, Icetill mill). With Icetill Explorer ("You may play lands from your graveyard") it's
  **two more every turn from the same card**. The deck runs three fetches; this makes four. It also
  shuffles away an Oracle top card you don't want.
- **Which basic:** a **Swamp**. Urborg already makes every land a Swamp, so black access has a
  backstop. White (21 sources for 20 pips) and green (the heaviest demand, 35 pips) are thinner.
  Fabled fetches any basic, so it's a source of all three colours. Nine basics remain (4 Forest,
  3 Plains, 2 Swamp) for STE and Fabled.
- **Cost:** in turns 1–3 (fewer than 4 lands), the fetched basic enters **tapped**, where the Swamp
  would have entered untapped. That's a small early tempo loss.
- **Self-hits:** none.

---

## Bench (SIDE) — each names what it would displace

| Card | Displaces | Grounds (deciding axis) |
|---|---|---|
| **Gardenize** | Cultivate (instead of Hortimancer), or Hortimancer if it proves fragile | Resilience: an enchantment that turns a creature wipe into a big {G} turn. Grows every turn; DS doubles it. Main-phase-1 mana only |
| **Simulacrum Shaper** | Cultivate, if the pilot wants that slot to stay ramp | A basic on the battlefield + a 2/2 fodder body + a card when it dies, against Cultivate's land in hand. Creature ETB also fires Aura Shards and Elas. {1}{G}{G} |
| **Niv-Mizzet, Ghost Counsel** | Moldervine Reclamation | Ceiling: each lifegain event lets you pay that life to draw that many (life-neutral), so three drainers out means three cards per death, and Elas draws on every creature entering. The {T} drains 1 each. Costs: MV6 {W}{W}{B}{B}, and it's a creature that dies in the wipes Moldervine rewards |
| **Kwia Vigorbloom** | a heavy slot (Moldervine or Tendershoot) | Mana: a Lotus (3 mana) every turn we gain life, which here is **every** turn including opponents' (Tendershoot's upkeep Saproling plus Elas). Doublers make it two. A 6/6 flying lifelink ward-2 body. MV6 |
| **Germinate Recruits** | Lingering Souls | The pilot's "X tokens over fixed" brief. For {2}{W} at instant speed you get Cadets equal to the life gained this turn: 9–20 after an ordinary sacrifice chain, doubled. Loses Souls' fliers and flashback |
| **Massacre Girl, Most Wanted** | an MV5 slot (Tendershoot/Moldervine) | A counter engine that doesn't need lifegain: a counter per opponent dealt noncombat damage (her ping, Slimefoot's three; CR 603.2c) plus 1 drain per death. Single-target drain; MV5 |
| **Flickering Hound** | a 4-drop (Mirkwood Bats is protected; weigh vs Pitiless Plunderer/Icetill) | Every creature spell (28 in the 99) blinks Ghave back to five fresh counters, or blinks Avenger for a new Plant per land. Ghave returns before SBAs run, so 903.9a never offers the command zone. A 2/2 for 4 |
| **Pia, Aether Ascetic** | a flex slot | A non-Game-Changer tutor: discard a card to find any of 17 enchantments (Doubling Season, Grave Pact, Parallel Lives, Aura Shards…) on a 2/2 fodder body. The founding rejected the GC tutors for bracket reasons; Pia isn't one |
| **Guiding Hydra** | a Counter Engines slot | Each combat, move one counter and put +1 on every other creature, which is N Saprolings of fuel. Blocks Skullclamp on those tokens (a cost, not a veto). X-cost: realistic X=3 costs 4 |
| **Flawless Maneuver** | a removal slot, if the pod wipes often | Free with Ghave out: team indestructible. A third protection piece beside Heroic Intervention and Teferi's Protection |
| **Martial Coup** | a removal slot (Board Wipes is 1 against a target of 2) | The one-sided wipe Austere Command wasn't. At X≥5 we keep X Soldiers (doubled) and every enchantment engine, and each dying drainer sees the whole board die (CR 603.10a). Kills Ghave (recast +{2}) |

---

## Traps (don't be tempted)

- **Garruk, Veiled Butcher.** *"If a creature an opponent controls would die, exile it instead."*
  It turns off Blood Artist's and Meathook's opponent-side triggers, and it pulls Grave Pact
  victims out of Bloodline Recollector's death count (LEDGER 2026-08-09).
- **Karn, Argent Defender.** A symmetric Torpor Orb. It stops our own Elas lifegain, Aura Shards,
  Avenger's ETB and Rosie's Food. It also reads as stax to the pod.
- **Yuriko, Blade of the Mighty.** *"During combat, players can't … activate abilities that aren't
  mana abilities"*, and that includes **us**. Ghave can't make Saprolings or sacrifice while we're
  being attacked.
- **Liliana the Repentant.** She mills two per creature entering. Doubled tokens mill 4–8 per Ghave
  activation, and the pilot decks themselves.
- **Puppet Crafting.** Animating a doubler enchantment exposes it to creature removal and to our
  own Meathook.
- **Sunfall / Overwrite the Multiverse.** Exile wipes produce no death triggers and exile our board.
- **Hexhaven Invigorator** isn't a trap, just unenabled here (see above).

**Stax-flavoured cards flagged, not silently excluded** (memory `users-pod-tendencies`): Thalia,
the Survivor (noncreature tax), Karn, Argent Defender, Yuriko. Each was rated NO on its merits for
this deck, not on pod grounds.

---

## Ledger candidates surfaced here (for the parent to consolidate)

1. A "whenever you gain life, put a +1/+1 counter on this" body is a **counter-returner** in any
   deck whose commander spends +1/+1 counters.
2. A delayed "counter per death → mana next main phase" enchantment is **wipe insurance** as well
   as ramp.

---

## Classification table — all 191 cards

Verdict key: **MAIN** would displace a named card in the 100 · **SIDE** is bench-worthy (the
displaced card is named above) · **NO** is a pass · **IN DECK** is already in the 99.

### White

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 1 | Guiding Hydra | 1 | NEW | **SIDE** | Each combat moves one counter off itself onto every other creature — N counters of Ghave fuel per turn; realistic X=3 (4 mana); counters on every token block Skullclamp (a cost, not a veto) |
| 2 | Liliana the Faultless | 1 | NEW | NO | Soul Warden + a discard-for-hexproof; Elas already supplies creature-ETB lifegain, and the body drains nothing |
| 3 | Loyal Tutor | 1 | NEW | NO | Tutors a planeswalker to the top; the 99 has one planeswalker (Elspeth, Storm Slayer) |
| 4 | Path to Exile | 1 | REPRINT | IN DECK | Already in the 99 (FRC reprint) |
| 5 | Secure the Wastes | 1 | REPRINT | NO | Instant X bodies (doubled) fits the X-burst brief, but Germinate Recruits is the better X-burst here — fixed 3 mana, scaled by the life this deck gains anyway |
| 6 | Swords to Plowshares | 1 | REPRINT | IN DECK | Already in the 99 (FRC reprint) |
| 7 | Academic Ascent | 2 | NEW | NO | One-shot pump + empower Jace; no engine hook |
| 8 | Ajani Resolute | 2 | NEW | NO | Loyalty per lifegain event → −4 Pridemate (gains a counter per event) → −10 emblem; a slower, attackable Hortimancer (enters at 2 loyalty, needs 4 before it makes anything) |
| 9 | Campus Crier | 2 | NEW | NO | 3/1 + graveyard empower Jace; no engine hook |
| 10 | Enlightened Confidant | 2 | REPRINT | NO | Lifelink 2/1 with surveil; no token, counter or drain text |
| 11 | Gideon's Memorial | 2 | NEW | NO | Tokens +1/+0 and vigilance (combat-only; leaves Skullclamp intact) but its mana only casts planeswalkers — the 99 has one |
| 12 | Grand Crescendo | 2 | REPRINT | NO | Instant X Citizens + team indestructible; Flawless Maneuver (free with Ghave out) is the protection card to bench |
| 13 | Martial Coup | 2 | REPRINT | **SIDE** | Second wipe (Board Wipes 1 vs target 2): X≥5 leaves us X Soldiers (doubled) and our enchantment engines; every dying drainer still sees the whole board die (CR 603.10a); kills Ghave (recast +{2}) |
| 14 | Predictive Preparations | 2 | NEW | NO | Two counters for {1}{W}, two more for {3}{W}: 4 Saprolings of fuel for 6 mana — Ghave's own {1} sacrifice refunds counters cheaper |
| 15 | Prophesied End | 2 | NEW | NO | Removal suite is at target; gives the victim a card unless it was attacking |
| 16 | Refute Destiny | 2 | NEW | NO | Only hits green or blue creatures/planeswalkers |
| 17 | Repurposed Enforcer | 2 | NEW | NO | Attack trigger empowers Jace; the list has no planeswalker payoff |
| 18 | Skrelv's Hive | 2 | REPRINT | NO | Fixed one Mite per upkeep; the 2026-09-25 brief moved away from fixed makers (Bitterbloom Bearer cut, Bitterblossom kept as the T2 play); Mites can't block |
| 19 | Staff of the Storyteller | 2 | REPRINT | NO | {W} + tap per card, once a turn cycle; Idol of Oblivion already draws for free off the same token event |
| 20 | Surgical Precision | 2 | NEW | NO | Sorcery removal for toughness 4+, or 2-mana draw-1; neither beats the in-deck suite |
| 21 | Teyo, Lightshield Expert | 2 | NEW | NO | One-shot hexproof + a counter; Heroic Intervention covers the whole board |
| 22 | Tomik, Orzhov Lawmage | 2 | NEW | NO | Planeswalker-defence text and a flying grant; no hook |
| 23 | Unflinching Hortimancer | 2 | NEW | **MAIN** | +1/+1 counter per lifegain EVENT; 11 lifegain sources in the 99 (Elas per creature entering, five life-gaining drainers per death) → Ghave turns each into a Saproling. Replaces Cultivate |
| 24 | White Sun's Twilight | 2 | REPRINT | NO | Same X≥5 wipe as Martial Coup, but its Mites can't block; Coup is the version to bench |
| 25 | Danitha, Sword of Hope | 3 | NEW | NO | Draws off Equipment/creature-targeting spells; one Equipment in the 99 |
| 26 | Flawless Maneuver | 3 | REPRINT | **SIDE** | Free with Ghave out: team indestructible vs destroy-wipes; third protection piece beside Heroic Intervention and Teferi's Protection |
| 27 | Generous Revival | 3 | NEW | NO | 3-mana reanimation of one MV≤3 body; the deck's creatures are cheap and its fodder is tokens |
| 28 | Germinate Recruits | 3 | NEW | **SIDE** | Instant: X 2/2 Cadets where X = life gained this turn — a Ghave sac chain gains ~3 life per death, so 3 mana makes 9–20 bodies (doubled); displaces Lingering Souls on the X-burst brief |
| 29 | Graft Surgeon | 3 | NEW | NO | One counter moved on death; trivial fuel |
| 30 | Koth of the Homestead | 3 | NEW | NO | Landfall gains 1 and Plains drops add a counter; small, and only Plains |
| 31 | Lyra, Archangel of Dawn | 3 | NEW | NO | Counters only on Angels; the 99 has zero Angels |
| 32 | Memory Trap | 3 | NEW | NO | O-Ring on a fragile enchantment; removal at target |
| 33 | Rescue Girl, First Responder | 3 | NEW | NO | Tap-bounce your own permanent on your turn (Ghave to hand re-enters with 5 counters for 5 mana) — too slow a reset |
| 34 | Shatterwing Pegasus | 3 | NEW | NO | {4}{W} team pump on a 2/3 flier; Gavony Township does more |
| 35 | Stroke of Midnight | 3 | REPRINT | NO | Instant Vindicate that hands the victim a 1/1; Beast Within/Anguished Unmaking hold the slots |
| 36 | Teferi's Reproach | 3 | NEW | NO | Phases out an opponent's board — a political fog, not our protection |
| 37 | Way of the Mentor | 3 | NEW | NO | Planeswalker-matters; one planeswalker in the 99 |
| 38 | Yoshimaru, Beloved Companion | 3 | NEW | NO | Creature-only Hardened Scales on a body (cleaner than the rejected Winding Constrictor); Hortimancer takes the third counter-engine slot |
| 39 | Your Fate Ends Here | 3 | NEW | NO | Removal at target; MV≥3 only |
| 40 | Flickering Hound | 4 | NEW | **SIDE** | Every creature spell (28 creature cards) can blink Ghave, who re-enters with five fresh counters (or Avenger for a new Plant per land); MV4 2/2 |
| 41 | Thalia, the Survivor | 4 | NEW | NO | Lifelink 3/4 with a noncreature tax — a mild stax piece (pod rating input, flagged); does nothing for the engine |
| 42 | Way of the Healer | 4 | NEW | NO | Planeswalker-matters (Cadet per −2 needs a walker) |
| 43 | Yuriko, Blade of the Mighty | 4 | NEW | NO | SELF-HIT: 'players can't activate abilities that aren't mana abilities during combat' shuts off Ghave's instant-speed Saprolings and sacrifices while attacked; also stax-flavoured |
| 44 | Fateshaper Aspirant | 5 | NEW | NO | 5-mana counter + indestructible or legend recursion; small |
| 45 | Saheeli, Consul of Oversight | 5 | NEW | NO | One Thopter per turn (Viscera Seer's scry) at MV5 — fixed maker |
| 46 | Sunfall | 5 | REPRINT | NO | Exile wipe: no death triggers, exiles our board |
| 47 | Dack Fayden, Helping Hand | 6 | NEW | NO | Hands opponents goaded creatures from our library |
| 48 | Elspeth, Sun's Champion | 6 | REPRINT | NO | MV6 fixed three-per-turn maker; −3 kills our power-4+ creatures (Ghave with 4+ counters, Mondrak, Avenger) |
| 49 | Hexhaven Battalion | 6 | NEW | NO | 6 mana for three 2/2s; landcycling {2} is the only use |
| 50 | Kindred Judgment | 7 | NEW | NO | Naming Saproling still kills Ghave (Fungus Shaman), every drainer and every doubler creature |
| 51 | Ob Nixilis, the Ascended | 7 | NEW | NO | MV7; ETB only kills TAPPED opposing creatures (usually none on your turn); Angel-per-end-step is real but the top end is Avenger alone by design |
| 52 | Overlord of the Mistmoors | 7 | REPRINT | NO | Fixed two fliers per enter/attack; the 2026-09-25 brief favours X-scaling makers |
| 53 | Serra's Emissary | 7 | REPRINT | NO | MV7 7/7; protection is strong but heavy |
| 54 | Ghalta the Immovable | 9 | NEW | NO | Defender/toughness-matters; no fit |
| 55 | Return to the Light Realms | 9 | REPRINT | NO | MV9 |

### Black

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 56 | Dark Matter Manipulator | 1 | NEW | NO | Self-mill 3 on a 1/2; no hook |
| 57 | Lich's Relic | 1 | NEW | NO | {3} total: destroy up to one creature/planeswalker per opponent — a real three-for-one, but sorcery speed and removal is at target; Grave Pact/Dictate already edict |
| 58 | Mabel, Bitter Recluse | 1 | NEW | NO | Removes counters from a target — can't make Saprolings (Ghave's removal is a cost, not this) |
| 59 | Bloodline Recollector // Ancestral Craving | 2 | NEW | **MAIN** | End step with 3+ deaths this turn (any player's turn, tokens and opponents' creatures count) → cast Ancestral Craving for {B}: draw three. Replaces Mentor of the Meek |
| 60 | Dreadhorde Invasion | 2 | REPRINT | NO | Fixed +1 Army counter per upkeep (one Saproling of fuel a turn); pilot's brief moved off fixed makers |
| 61 | Extrapolate the Impossible | 2 | NEW | NO | BLANK in Commander: CR 903.11 — traditional cards from outside the game can't be brought in except by effects that specifically bring cards into Commander games; this one only says 'from outside the game' |
| 62 | Gallia, Tragic Host | 2 | NEW | NO | Menace 2/1 with slow self-recursion |
| 63 | Last Gasp | 2 | REPRINT | NO | −3/−3 instant; removal at target |
| 64 | Liliana the Repentant | 2 | NEW | NO | TRAP: mills two per creature entering — doubled tokens mill 4–8 per Ghave activation and deck the pilot |
| 65 | Multiply by Zero | 2 | NEW | NO | Conditional kill spell; removal at target |
| 66 | Rank Rat | 2 | NEW | NO | Discard ETB on a 1/1 |
| 67 | Silence the Echo | 2 | NEW | NO | Sorcery removal (sac cost is an upside here) — removal at target and instant-speed |
| 68 | Solve for Disappointment | 2 | NEW | NO | Discard + empower Jace |
| 69 | Terminal Criticism | 2 | NEW | NO | Blue/red only |
| 70 | Vraska's Final Mercy | 2 | NEW | NO | Sorcery Murder with life loss; removal at target |
| 71 | Way of the Necromancer | 2 | NEW | NO | Loyalty per death, but each planeswalker still activates once a turn — capped at one Jace card a turn |
| 72 | Break Under Pressure | 3 | NEW | NO | Edict-the-biggest; Grave Pact and Dictate repeat it |
| 73 | Cast Away Doubt | 3 | NEW | NO | Draw 2 that pings every player including us |
| 74 | Danitha, Spear of Agony | 3 | NEW | NO | Grows on targeting opponents; no hook |
| 75 | Gideon the Oathless | 3 | NEW | NO | Punishes opponents' creature ETBs; not our engine |
| 76 | Loot, the Anomaly | 3 | NEW | NO | Free outlet only at threshold (7 in graveyard); outlets already: Ghave, Viscera Seer, both Altars, Priest, Chatterfang, Phyrexian Tower |
| 77 | Proft, Sinister Mastermind | 3 | NEW | NO | Threshold-gated 5/5 |
| 78 | Sanctum Lurker | 3 | NEW | NO | Planeswalker drain; one walker |
| 79 | Screeching Soulbreaker | 3 | NEW | NO | Attack ping on a 1/4 |
| 80 | Theoretical Necromancer | 3 | NEW | NO | Graveyard-exile recursion to hand |
| 81 | Tinybones, Pocket Nuisance | 3 | NEW | NO | Discard payoff |
| 82 | Way of the Deathbringer | 3 | NEW | NO | Planeswalker −2 sac → Beast; once per walker per turn |
| 83 | Winter, Tormented Loner | 3 | NEW | NO | One-shot edict; Grave Pact/Dictate do it every death |
| 84 | Darklight Phoenix | 4 | REPRINT | NO | Recurs at combat if 2+ died (trivial here) but fodder is already unlimited; 3/2 doesn't die to Skullclamp |
| 85 | Extended Absence | 4 | NEW | NO | 4-mana exile + drain 1; removal at target |
| 86 | Rampart Hunter | 4 | NEW | NO | Deathtouch body with a combat-trick ETB |
| 87 | Rewrite Regrets | 4 | NEW | NO | 4-mana reanimation; Ghave returns to the command zone, not the graveyard |
| 88 | Teyo, Diamondblade Mage | 4 | NEW | NO | Flash deathtouch trick |
| 89 | Garruk, Veiled Butcher | 5 | NEW | NO | TRAP: 'If a creature an opponent controls would die, exile it instead' — switches off Blood Artist's and Meathook's opponent-side triggers and removes Grave Pact victims from Bloodline Recollector's death count |
| 90 | Massacre Girl, Most Wanted | 5 | NEW | **SIDE** | Drain 1 to one target opponent per death, and a +1/+1 counter on herself per opponent dealt noncombat damage (her ping; Slimefoot ×3, CR 603.2c) — the MV5 version of Hortimancer's refund, plus a ping |
| 91 | Rise of the Deathbringer | 5 | NEW | NO | One-shot draw = greatest power (Adeline can be 10+) or a −3/−3 wipe that kills our own board; Card Draw is over target |
| 92 | Yargle, Glutton of Urborg | 5 | REPRINT | NO | Vanilla 9/3 |
| 93 | Apex Witchstalker | 6 | NEW | NO | 6-mana body; landcycling only |
| 94 | Jhoira, Weatherlight Corsair | 6 | NEW | NO | MV6 steal-a-historic |
| 95 | Overwrite the Multiverse | 6 | REPRINT | NO | Exile wipe; no death triggers |
| 96 | Archfiend of Despair | 8 | REPRINT | NO | MV8 (strong in a drain deck, but the top end is capped at Avenger) |
| 97 | Archon of Cruelty | 8 | REPRINT | NO | MV8 |
| 98 | Avacyn, Angel of Horror | 8 | NEW | NO | MV8; returns nontoken creatures only |

### Green

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 99 | Flourishing Grapple | 1 | NEW | NO | Red/white-only fight trick |
| 100 | Hunter's Axe | 1 | NEW | NO | Equipment +2/+0 |
| 101 | Tethermage's Advantage | 1 | NEW | NO | Pump/untap trick |
| 102 | Arcane Amphisbaena | 2 | NEW | NO | Deathtouch 1/1 + empower Jace |
| 103 | Carnivorous Cultivator // Enroot | 2 | NEW | NO | Enroot bins a land for Icetill to replay — a 1-mana ramp only with Icetill; 2/3 body |
| 104 | Compel Brutality | 2 | NEW | NO | One-sided bite; removal at target |
| 105 | Fblthp, Knows the Way | 2 | NEW | NO | X basics to hand; ramp is over target |
| 106 | Marwyn, the Preserver | 2 | NEW | NO | Land hexproof + land recursion; no hook |
| 107 | Puppet Crafting | 2 | NEW | NO | SELF-HIT risk: making a doubler enchantment a 5/5 creature exposes it to creature removal and wipes |
| 108 | Something Worth Saving | 2 | NEW | NO | Mill 4 pick a permanent |
| 109 | Sureshot Sower | 2 | NEW | NO | Anti-flier body |
| 110 | Tarmogoyf | 2 | REPRINT | NO | Vanilla-ish beater |
| 111 | Yoshimaru, Scrappy Stray | 2 | NEW | NO | ETB fight using another creature (tokens are 1/1) |
| 112 | Budding Insurgent | 3 | NEW | NO | Sorcery-speed sac-to-Disenchant; Aura Shards and Pest Infestation cover artifacts/enchantments |
| 113 | Gardenize | 3 | NEW | **SIDE** | Permanent +{G} each first main phase per own-creature death (DS doubles the charge counters); resilient and turns a wipe into a rebuild turn — but late, main-phase-only mana; first reserve for the Cultivate slot (see Pilot's asks) |
| 114 | Greenhouse Propagator | 3 | NEW | NO | MV3 dork with Soul Warden text; the dork slots are MV1 |
| 115 | Inspired Tethermage | 3 | NEW | NO | Planeswalker-loyalty payoff |
| 116 | Loot, the Nexus | 3 | NEW | NO | Mana per DIFFERENT power: a 1/1-token board shows 2–4 distinct powers |
| 117 | Pia, Aether Ascetic | 3 | NEW | **SIDE** | Discard → tutor any enchantment (17 in the 99: every enchantment doubler, Grave Pact, Dictate, Aura Shards, Cryptolith Rite) on a 2/2 fodder body; non-GC tutor, so it doesn't touch the bracket count |
| 118 | Restore with Empathy | 3 | NEW | NO | Regrowth + 4 life at instant speed; no slot |
| 119 | Simulacrum Shaper | 3 | NEW | **SIDE** | Basic land to battlefield + 2/2 fodder + a card when it dies: a strict-feeling Cultivate upgrade in a sacrifice deck; if the pilot keeps ramp in the Cultivate slot, this is the card |
| 120 | Way of the Paradox | 3 | NEW | NO | Planeswalker-matters extra land |
| 121 | Bestial Incursion | 4 | NEW | NO | Fixed 4/4 + flashback 4/4 |
| 122 | Hexhaven Invigorator | 4 | NEW | NO | Nothing in the 99 damages our own creatures (only Slimefoot deals damage, to opponents); GGGG; lands only if an opponent chooses to block/be blocked by it (see Pilot's asks) |
| 123 | Jiang Yanggu, Never Alone | 4 | NEW | NO | Untapping tokens at end step only pays with Cryptolith Rite/Brightcap Badger; Mowu is legendary (a doubler makes two, one dies — cute, not a plan) |
| 124 | Titanbones, Towering Heart | 4 | NEW | NO | Two counters per lifegain event is Hortimancer ×2 at MV4; the fallback if Hortimancer proves fragile |
| 125 | Edgar, Moonlit Sovereign | 5 | NEW | NO | Counter growth only on turns you cast nothing; {4}{G} activation |
| 126 | Garruk, Curse Breaker | 5 | NEW | NO | Beasts and a draw on power-4+ ETB; tokens are 1/1 |
| 127 | Hungering Puppetbeast | 5 | NEW | NO | Artifact sacrifice for itself; Heartwood token is a rock |
| 128 | Way of the Wildspeaker | 5 | NEW | NO | Planeswalker-matters |
| 129 | Wrecking Gecko | 5 | NEW | NO | Ward 5/5 beater |
| 130 | Vinelasher Adept | 6 | NEW | NO | Three counters on a MV6 body; landcycling is the real mode |
| 131 | Ruric Thar, Magecrusher | 7 | NEW | NO | MV7 beater |
| 132 | Verdant Kraken | 7 | NEW | NO | MV7 GGG: a 3/3 Forest Tentacle land-creature every upkeep (landfall + fodder) — real, but top end is capped |
| 133 | Omnipresence | 8 | REPRINT | NO | MV8 |
| 134 | Ghalta the Unstoppable | 9 | NEW | NO | Trample lord at MV9-X; tokens are small |

### Multicolor BG

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 135 | Ferocity of the Hunt | 2 | NEW | NO | Returns one nontoken creature once |
| 136 | Primal Witchstalker | 3 | NEW | NO | MV3 ramp body returning a land (fetches included) — Simulacrum Shaper is the better MV3 ramp body |
| 137 | Vraska, the Cutting Glare | 3 | NEW | NO | 3-mana 4/4 deathtouch Vindicate once you have 6 lands — good, but removal is at target and Beast Within/Anguished Unmaking are instant |
| 138 | Hapatra, the Desert Fang | 5 | NEW | NO | −1/−1 counters on opponents keyed to graveyard MV |

### Multicolor BW

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 139 | Blessed Ghoul | 1 | NEW | NO | Lifelink 1/1 with self-recursion |
| 140 | Despark | 2 | REPRINT | NO | MV≥4-only exile; removal at target |
| 141 | Edgar, Ancient Bloodlord | 2 | NEW | NO | Its {2} sacrifice is a worse Ghave ({1}, counter anywhere); per-death lifegain has no converter today (see Pilot's asks) |
| 142 | Lingering Souls | 3 | REPRINT | IN DECK | Already in the 99 (FRC reprint) |
| 143 | Vindictive Triumph | 3 | NEW | NO | Exile + temporary steal of MV≤3 (sac it to Ghave for value); removal at target |
| 144 | Twisted Fates | 5 | NEW | NO | 5-mana sorcery Vindicate + a counter on each of our creatures (N Saprolings of fuel) — strong text, slow slot; removal suite is instant and cheaper |
| 145 | Niv-Mizzet, Ghost Counsel | 6 | NEW | **SIDE** | Each lifegain EVENT → pay that life, draw that many: with 3 life-gaining drainers, one death draws 3; {T} drains 1 each. Ceiling far above Moldervine, but MV6 WWBB and a creature (dies to the wipes Moldervine rewards) |

### Multicolor GW

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 146 | Emergency Phytomedic // Seed Suture | 1 | NEW | NO | 1/1 + prepared Seed Suture (a counter + 1 life): trivial |
| 147 | Solarium Sentry | 2 | NEW | NO | Lifegain off opponents' cheap spells |
| 148 | Vigorbloom Charm | 2 | NEW | NO | Flexible charm; Heroic Intervention protects the whole board |
| 149 | Vigorbloom Vanguard // Seed Suture | 2 | NEW | NO | 2/2 vigilance-for-countered-creatures + Seed Suture |
| 150 | Bloombrute | 4 | NEW | NO | Once-a-turn draw on lifegain; Niv-Mizzet is the version that scales |
| 151 | Blossom-Blessed Angel // Seed Suture | 4 | NEW | NO | 2/4 flier + Seed Suture |
| 152 | Kwia Vigorbloom | 6 | NEW | **SIDE** | Lotus (3 mana) per turn you gain life — every turn here, including opponents' (Elas + Tendershoot's upkeep Saproling); doubled by doublers; 6/6 flying lifelink ward 2 — MV6, the heavy slot is the question |

### Colorless

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 153 | Currency Converter | 1 | REPRINT | NO | Rummage artifact |
| 154 | Eye of Jace | 1 | NEW | NO | Surveil rock that needs threshold |
| 155 | Sol Ring | 1 | REPRINT | IN DECK | Already in the 99 (FRC reprint) |
| 156 | Afterthought Sentry | 2 | NEW | NO | Graveyard hate body |
| 157 | Arcane Signet | 2 | REPRINT | NO | Cut 2026-09-25 as the weakest ramp once the deck ramps through land drops; still true (ramp 11 vs target 10) |
| 158 | Fellwar Stone | 2 | REPRINT | NO | Rock; ramp over target |
| 159 | Karn, Argent Defender | 2 | NEW | NO | TRAP: symmetric Torpor — stops our Elas ETB lifegain, Aura Shards, Avenger's ETB, Rosie's Food; also stax-flavoured |
| 160 | Living Library | 2 | NEW | NO | Expensive tuck |
| 161 | Medic's Kitesail | 2 | NEW | NO | Equipment |
| 162 | The Echoverse Fulcrum | 2 | NEW | NO | Symmetric destroy-all for {5} later; Martial Coup is the wipe that leaves us a board |
| 163 | Chromatic Lantern | 3 | REPRINT | NO | Rock; ramp over target, mana fixed (W21 B25 G26) |
| 164 | Keeper of the Quiet Hour | 3 | NEW | NO | 3/2 artifact + empower Jace |
| 165 | Murmuring Volume | 3 | NEW | NO | 3-mana rock + rummage |
| 166 | Traxos, Scourge Eternal | 4 | NEW | NO | Untap-on-cast beater |
| 167 | Archive Arbiter | 6 | NEW | NO | MV6 artifact |
| 168 | Ginger, Queen of Sweets | 6 | NEW | NO | Monarch at MV6; the 2026-09-25 brief moved draw off the monarch (Court of Grace cut) |
| 169 | Omnath, Locus of the Void | 7 | NEW | NO | MV7 landfall mana |
| 170 | Darksteel Angel | 9 | NEW | NO | MV9 |
| 171 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | MV10 |
| 172 | Memnarch, the Warden | 10 | NEW | NO | MV10 |

### Land

| # | Name | MV | New? | Verdict | Reason |
|---|---|---|---|---|---|
| 173 | Caves of Koilos | 0 | REPRINT | NO | Painland; the WB duals are better |
| 174 | Command Tower | 0 | REPRINT | IN DECK | Already in the 99 (FRC reprint) |
| 175 | Exotic Orchard | 0 | REPRINT | NO | Colours depend on opponents' lands |
| 176 | Fabled Passage | 0 | REPRINT | **MAIN** | A fourth fetch in a landfall deck: two triggers per land, and Icetill Explorer replays it from the graveyard every turn. Replaces a Swamp |
| 177 | Fetid Heath | 0 | REPRINT | NO | Filter land; mana already fixed |
| 178 | Forest | 0 | REPRINT | IN DECK | Basic (4 in the 99) |
| 179 | Formidable Commons | 0 | NEW | NO | Enters tapped unless you control a planeswalker (one in the 99) |
| 180 | Hall of Echoes | 0 | NEW | NO | {5} to become a creature copy for a turn; copying Ghave gives a 0/0 (no 'enters with' counters) |
| 181 | Hexhaven Dueling Arena | 0 | NEW | NO | Prepared-enabler land; zero prepare creatures in the 99 |
| 182 | Isolated Chapel | 0 | REPRINT | IN DECK | Already in the 99 (FRC reprint) |
| 183 | Meticulous Commons | 0 | NEW | NO | Enters tapped unless you control a planeswalker |
| 184 | Overgrown Farmland | 0 | REPRINT | NO | G/W slow-land; the basic slot goes to Fabled Passage (landfall) |
| 185 | Path of Ancestry | 0 | REPRINT | NO | Tapped any-colour land |
| 186 | Plains | 0 | REPRINT | IN DECK | Basic (3 in the 99) |
| 187 | Reflecting Pool | 0 | REPRINT | NO | Mana already fixed |
| 188 | Roiling Canopy | 0 | NEW | NO | Tapped Forest with a pump rider |
| 189 | Room of Refuge | 0 | NEW | NO | Tapped land with a {5} counter sink |
| 190 | Swamp | 0 | REPRINT | IN DECK | Basic (3 in the 99; Fabled Passage proposed for one) |
| 191 | Vigorbloom Annex | 0 | NEW | NO | Enters tapped unless you control a planeswalker |
