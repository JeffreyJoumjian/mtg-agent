# Ledger: Combos and loops

Which interactions go infinite and which stop, how to audit a list for loops, mandatory versus chosen-N loops, and the fair-build exclusions. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### A colourless mana doubler makes Basalt Monolith infinite — check the doubler before the rock {#loop-001}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** Forsaken Monument; Basalt Monolith; Walking Ballista; Grim Monolith; Power Artifact; Mana Vault; Ultron, Artificial Malevolence
**Claim:** Forsaken Monument (*"Whenever you tap a permanent for {C}, add an additional {C}"*) plus
Basalt Monolith (*"{T}: Add {C}{C}{C}. {3}: Untap"*) is infinite colourless mana: tap for four, untap
for three, net one per loop. Any X-outlet (Walking Ballista) is a table kill. This is a two-card
infinite and disqualifies the pair at Bracket 3.
**Evidence:** Oracle text of both; arithmetic.
**Changes:** When a colourless deck seats a `{C}` doubler, grep the list for every "untap this"
rock (Basalt Monolith, Grim Monolith with Power Artifact, Mana Vault + untappers) before calling it
combo-free. The Monolith was 43% of the Ultron field and would have been auto-included.
**See also:** loop-008
**Source:** ultron (2026-09-03) — founding build, Bracket 3 compliance pass.

### Count the commander's cast trigger in a recursion loop — Oathsworn Vampire + Phyrexian Altar IS infinite under Edgar {#loop-002}

**Kind:** ruling · **Verified:** 2026-09-06 against CR 2026-08-07
**Cards:** Oathsworn Vampire; Phyrexian Altar; Edgar Markov; Blood Artist; Zulaport Cutthroat; Cruel Celebrant; Vengeful Bloodwitch; Grave Pact; Dictate of Erebos; Ashnod's Altar
**Rules:** 112.1, 113.6f, 117.1a, 119.9, 207.2c, 505.6a, 601.2a, 601.2f, 601.2i, 605.1a, 605.3b, 608.2i
**Claim:** Each recast of Oathsworn Vampire is a Vampire spell, so Edgar's eminence makes a 1/1 token —
a **second** body per iteration. Sac Oathsworn (+{B}), sac the token (+{B}), recast for {1}{B}, new
token: net 0 mana, two deaths and one token per iteration, repeatable any number of times in one main
phase.
**Evidence:** Verified 2026-09-06 against the CR: casting from the graveyard is a real cast that
fires cast-triggers (CR 112.1, 601.2a, 601.2i); the permission functions from the graveyard
(CR 113.6f) and "gained life this turn" is a look-back that stays true once any gain has happened
(CR 608.2i, 119.9) — Blood Artist's first trigger supplies it; Phyrexian Altar is a mana ability
usable without the stack (CR 605.1a, 605.3b); only an empty stack is needed between casts
(CR 117.1a, 505.6a). With Blood Artist / Zulaport / Cruel Celebrant / Vengeful Bloodwitch out that is
infinite drain; with Grave Pact / Dictate of Erebos it is every opponent's board.
**Changes:** For any recursion loop in a deck whose commander or engine triggers **on cast**, add the
trigger's output as a body / mana / card to the per-iteration ledger before declaring it
mana-negative. Ashnod's Altar does **not** close this one (colourless can't pay the {B} floor —
CR 601.2f, reducers eat generic only), which is why the live `DECK.md` and COMBAT are safe and
SACRIFICE (Phyrexian Altar) is not at Bracket 3.
**History:** On 2026-08-25 the combo check (`decks/edgar-markov/research/versions-comparison-2026-08-25.md`
§5) cleared Oathsworn Vampire for the SACRIFICE build: *"Oathsworn costs {1}{B} to recast and
Phyrexian Altar returns one mana per sacrifice … No loop."* It counted **one** sacrifice per
iteration; corrected on 2026-09-06 because of the eminence token. Root cause: costed the loop from the
card in hand, not from what the commander adds to every cast. Eminence is an ability word (CR 207.2c)
with no keyword entry, so it doesn't show up when you grep the loop's cards — it has to be remembered
as a property of *every* Vampire cast.
**Source:** edgar-markov (2026-09-06) — the pilot asked whether Oathsworn Vampire was in the Edgar
lists.

### Stuffy Doll + Guilty Conscience is a mandatory loop that any damage starts {#loop-003}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Stuffy Doll; Guilty Conscience; Walking Ballista
**Rules:** 104.4b, 115.10a, 603.2g, 609.3, 702.12b, 704.5a, 732.4, 800.4a, 800.4g
**Claim:** The pair is an automatic, unstoppable kill, not a "choose N" loop, and it does not need
the Doll's own `{T}` — a Walking Ballista ping or combat damage starts it.
**Evidence:** Neither card has "may." Damage to the Doll triggers the Doll (damage to the chosen
player), which triggers Guilty Conscience (damage back to the Doll), indefinitely. It ends only when
the chosen player loses to SBA (CR 704.5a) and leaves the game (800.4a); later triggers then do
nothing (609.3). If the chosen player *can't* lose, it becomes an all-mandatory loop and the game is
a draw (104.4b, 732.4). Opponents can break it by removing the Aura, exiling or bouncing the Doll
(destroy fails — indestructible, 702.12b), or preventing the damage (603.2g).
**Changes:** Under this pilot's loop policy (automatic infinites banned), never run Guilty Conscience
in any deck containing Stuffy Doll. Also: Stuffy Doll's player choice may be yourself (it says
"player"), is not targeted (115.10a), and is never re-made if that player leaves (800.4g).
**See also:** loop-013
**Source:** cap-living-legend (2026-09-10).

### Heliod + Walking Ballista needs TWO counters to start — with one, Ballista dies first {#loop-004}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Heliod, Sun-Crowned; Walking Ballista
**Rules:** 104.4b, 113.7a, 117.5, 119.7, 702.15c, 704.3, 704.5f, 732.2a
**Claim:** The Heliod, Sun-Crowned + Walking Ballista loop (lifelink ping → life gain → Heliod puts
the counter back) cannot start from a one-counter Ballista.
**Evidence:** Removing the last counter is the cost, so Ballista is 0/0 before anyone gets priority;
SBAs are checked first (CR 117.5, 704.3) and it dies (704.5f). The ping still resolves using last
known information for lifelink (113.7a, 702.15c), so you gain 1 and Heliod triggers — but it has no
Ballista to put the counter on. With 2+ counters the loop is indefinite. It is a *chosen* loop — each
ping is an optional activation, so CR 104.4b/732.2a let the pilot name N — and it is a two-card,
instant-speed kill. Stops: exile/bounce Ballista in response, "can't gain life" (119.7), prevention.
**Changes:** Say it out loud at the table. Under this pilot's policy (chosen-N loops allowed) it is
legal; it still changes how a Bracket 3 table reads the deck. Model the start as X=2 or a second
counter source, not X=1.
**Source:** cap-living-legend (2026-09-10) — v2 voltron research.

### Loop-audit untap circuits by surplus and by what each untapper may target — costing mana doesn't bound them {#loop-005}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Ioreth of the Healing House; Thousand-Year Elixir; Minamo, School at Water's Edge; Marvin, Murderous Mimic; Halo Fountain; Captain America, Living Legend; Hall of Echoes; Hapatra, the Desert Frost; Uthros, Titanic Godcore
**Rules:** 107.5, 118.3, 701.26a
**Claim:** A set of untappers loops infinitely only if some effect yields more untaps than taps it
costs (an untapper that doesn't tap itself, a 1-tap-2-untap effect that can reach another untapper,
or mana returned on tap/untap); otherwise every untap pays for exactly one tap and the turn has a fixed
untap budget. Type restrictions, not cost, decide whether a circuit is closed — and "costs mana" does
not make an untapper bounded next to a free untapper, a scaling mana land, or a copy of your untapper.
**Evidence:**
- DECK-ENGINE audit (mtg-rules-expert, 2026-09-10): Ioreth ⇄ Thousand-Year Elixir ({1}) and Ioreth ⇄
  Minamo ({U}) are closed circuits with zero surplus — finite mana sinks. Ioreth's "untap two
  legendary creatures" is the only 1-for-2 effect, and no legendary creature in the list untaps
  anything. Marvin, Murderous Mimic (copies Ioreth's ability) would give the surplus — infinite. A
  tapped permanent can't pay a {T} cost again (107.5, 701.26a).
- Closed pairs (2026-09-16): Ioreth ⇄ Thousand-Year Elixir and Ioreth ⇄ Minamo can never yield more
  than ~2 untaps for anything else, however much mana you have, because each untapper taps itself to
  untap the other. A {T} cost can't be paid by an already-tapped permanent (CR 107.5, 118.3). If
  Elixir's untaps come only from Ioreth and Ioreth's only from Elixir, the two counts pin each other.
  Only a third untapper that can untap a NON-creature breaks the pair open. In this pool only Ioreth
  can untap Halo Fountain (Minamo needs legendary, Elixir needs a creature, Cap needs a creature),
  which is why the Fountain circuit prices a spare creature-untap at {W}{W}.
- Copy-lands and mana-costed untappers (2026-09-28): Hall of Echoes: *"{5}: This land becomes a copy
  of target creature you control until end of turn. The 'legend rule' doesn't apply to permanents you
  control this turn."* — a land that becomes a copy of a creature with the legend rule off is a second
  copy of your best untapper or engine. A second Ioreth of the Healing House (*"{T}: Untap two other
  target legendary creatures"*) breaks the one-untapper rule in cap-living-legend. A mana-costed
  "untap target creature" goes infinite next to a free untapper and a land whose output scales:
  Hapatra, the Desert Frost ({2}{U}: untap target creature) untaps Ioreth, Ioreth untaps a stationed
  Uthros, Titanic Godcore (*"{U}, {T}: Add {U} for each artifact you control"*), and with about five
  artifacts that pays for the loop with mana to spare.
**Changes:** Before adding any untapper, list the other untappers and ask "does this create a surplus
untap?" Name the forbidden additions in the list header so they don't get added later. Audit untap
circuits by **what each untapper may legally target** (legendary / creature / any permanent), not by
mana. Audit every mana-costed untapper against every scaling mana land and every free untapper in the
list, and audit copy-lands against the list's legendary engines.
**See also:** loop-007, loop-008
**Source:** cap-living-legend (2026-09-10) — DECK-ENGINE loop audit; cap-living-legend (2026-09-16),
merged from "Two untappers that tap themselves form a closed pair — zero spare untaps, however much
mana you have"; cap-living-legend / ultron (2026-09-28), FRA review, merged from "Loop-audit
copy-lands and mana-costed untappers like free untappers".

### With a "first time each turn" untapper, blink is a purchasable surplus untap — Deadeye Navigator is the linchpin {#loop-006}

**Kind:** ruling · **Verified:** 2026-09-15 against CR 2026-08-07
**Cards:** Captain America, Living Legend; Deadeye Navigator; Relic of Legends; Soulherder; Thousand-Year Elixir; Palladium Myr; Silver Myr; Ornithopter of Paradise; Ioreth of the Healing House; Grand Architect; Mistmeadow Witch; Restoration Angel; Brago, King Eternal
**Rules:** 104.4b, 400.7, 513.2, 732.2a
**Claim:** Captain America, Living Legend + Deadeye Navigator produces unbounded loops from small,
commonly-run packages; without Navigator, no blink engine in W/U loops with the deck's mana creatures.
**Evidence:** mtg-rules-expert audit. Navigator paired creature: "{1}{U}: Exile this creature, then
return it." Each blink makes a new object (400.7), so Cap untaps it once more. Unbounded rows:
Navigator + Relic of Legends (tap a legend twice = 2 any = {1}{U}, break-even infinite blinks/ETBs,
lethal with Soulherder); Navigator + Thousand-Year Elixir + Palladium Myr + Silver Myr/Ornithopter of
Paradise (+2 colorless per round); Navigator + Ioreth of the Healing House + Elixir; Navigator + Grand
Architect + Elixir + a blue mana creature. All are optional activations (chosen-N under 104.4b /
732.2a), but self-funding. End-step blinkers, Mistmeadow Witch (activations in the end step return a
turn later, 513.2), Restoration Angel and Brago are safe.
**Changes:** Never add Deadeye Navigator to a Captain America, Living Legend list. Re-run a loop audit
before adding any other repeatable instant-speed blink.
**See also:** tap-022, loop-005
**Source:** cap-living-legend (2026-09-15).

### Restricted "activate abilities of artifacts" mana pays an artifact's activation cost — Halo Fountain + Ioreth + Vedalken Engineer is free unbounded draw {#loop-007}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Vedalken Engineer; Halo Fountain; Ioreth of the Healing House; Psychosis Crawler
**Rules:** 106.6, 500.5, 605.1a, 605.3b, 609.4b
**Claim:** Vedalken Engineer's mana ("Spend this mana only to cast artifact spells or activate abilities
of artifacts") legally pays Halo Fountain's {W}{W} activation cost, producing a zero-net-mana loop that
draws a card every iteration.
**Evidence:** Halo Fountain: "{W}{W}, {T}, Untap two tapped creatures you control: Draw a card." Lap:
Fountain untaps Ioreth + Engineer and draws → Engineer taps for {W}{W} → Ioreth untaps Fountain. CR 106.6
(spending restrictions), 609.4b, 605.1a/605.3b (mana abilities don't use the stack), 500.5 (the pool
empties at end of step, not mid-step). Net mana 0, net cards +1. With Psychosis Crawler it is a
deterministic table kill.
**Changes:** Never let Halo Fountain, Ioreth of the Healing House and Vedalken Engineer share a list.
Generally: when a restricted mana source says "activate abilities of artifacts", treat every artifact
engine in the deck as a legal sink and re-run the loop audit.
**See also:** loop-005
**Source:** cap-living-legend (2026-09-16).

### Two free "{T}: untap target permanent" creatures untap each other forever — and any "on untap" or "becomes tapped" payoff makes it a win {#loop-008}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Kelpie Guide; Ioreth of the Healing House; Marvin, Murderous Mimic; Aphetto Alchemist; Mesmeric Orb; Thassa's Oracle; Unctus, Grand Metatect; Psychosis Crawler; Halo Fountain; Basalt Monolith
**Rules:** 104.4b, 603.4
**Claim:** Kelpie Guide, Ioreth of the Healing House, Marvin, Murderous Mimic and Aphetto Alchemist
form a cluster: **any two of them is a two-card infinite untap**, at no mana. Net untaps are zero, but
every lap is a "becomes tapped" event and an untap event, so an "on untap" payoff (Mesmeric Orb, a free
instant-speed mill-out — i.e. a Thassa's Oracle win) or a "becomes tapped" payoff (Unctus into
Psychosis Crawler, a kill) turns the harmless loop into a win.
**Evidence:**
- Kelpie Guide "{T}: Untap another target permanent you control"; Ioreth "{T}: Untap another target
  permanent". Cycle: tap A to untap B, tap B to untap A — the board returns to its prior state with no
  resource spent. Chosen, not mandatory, so CR 104.4b never applies; it is simply unbounded. Mesmeric
  Orb: "whenever a permanent becomes untapped, that permanent's controller mills a card". A commander
  with a once-per-creature untap (intervening-if, 603.4) can never be the engine of this — it only ever
  adds a fixed +1 per creature.
- Marvin + Ioreth (2026-09-16): Marvin gains the activated abilities of other creatures you control, so
  copying Ioreth's "{T}: Untap another target permanent" lets the two untap each other for free
  forever. No mana is spent either way. Unctus, Grand Metatect grants other blue creatures "Whenever
  this creature becomes tapped, draw a card, then discard a card" and Ioreth is blue → unbounded
  looting; with Psychosis Crawler ("Whenever you draw a card, each opponent loses 1 life") that is
  unbounded drain.
**Changes:** Run **at most one** of that cluster. Before adding any repeatable free untapper, check the
deck for an "on untap" or "on becomes tapped" payoff — the payoff is what converts a harmless loop into
a win. `DECK.md` holds Marvin + Unctus + Halo Fountain — never add Ioreth to that list; the existing
"Marvin excluded from DECK-ENGINE" note now has a second, stronger reason. Also keep **Basalt
Monolith** out of any Mesmeric Orb deck: it untaps itself for {3} while tapping for {C}{C}{C}, which is
net-zero mana and therefore infinite self-mill on its own.
**See also:** loop-001, loop-005, loop-009, tap-024
**Source:** cap-living-legend (2026-09-16) — Petitioners mill audit (mtg-rules-expert, CR 2026-08-07);
cap-living-legend (2026-09-16), merged from "Marvin + Ioreth is unbounded 'becomes tapped' events —
Psychosis Crawler turns it into a kill".

### A granted "becomes tapped, draw then discard" plus a free tapper can deck you {#loop-009}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Unctus, Grand Metatect; Pestered Wellguard; Stonybrook Schoolmaster
**Rules:** 104.3c
**Claim:** Unctus, Grand Metatect grants *other blue creatures* a mandatory loot whenever they become
tapped. With a free repeatable tap outlet and a first-tap untapper, that is two forced draws per blue
creature per turn, and blue tokens inherit it — enough to empty your own library.
**Evidence:** Unctus: "Other blue creatures you control have 'Whenever this creature becomes tapped,
draw a card, then discard a card.'" The trigger is not optional. Pestered Wellguard's Faerie and
Stonybrook Schoolmaster's Merfolk Wizard tokens are blue. Drawing from an empty library loses the game
at the next state-based check (CR 104.3c). The taps themselves are voluntary, so this is not a mandatory
loop — it is a self-inflicted one.
**Changes:** In any deck pairing a lord-granted "becomes tapped → draw" with a free tapper, count the
library before a mass tap pass, and prefer token makers whose tokens are off-colour for the lord.
**See also:** loop-008, tap-023
**Source:** cap-living-legend (2026-09-16).

### Fair-build exclusions for the strong token/sacrifice commanders — the pairings that loop, and whether each needs a choice per iteration {#loop-010}

**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07
**Cards:** Chatterfang, Squirrel General; Pitiless Plunderer; Ghave, Guru of Spores; Ashnod's Altar; Phyrexian Altar; Utopia Mycon; Cathars' Crusade; Ivy Lane Denizen; Doubling Season; Parallel Lives; Prossh, Skyraider of Kher; Food Chain; Teysa Karlov; Reassembling Skeleton; Nether Traitor; Zurgo Stormrender; Caesar, Legion's Emperor; Slimefoot, the Stowaway; Elas il-Kor, Sadistic Pilgrim; Dina, Soul Steeper
**Rules:** 732.2b
**Claim:** Each of the high-power aristocrats commanders has a short list of 99-card pairings that
loop: cut the pairing, keep the commander. Label each loop by whether it needs a decision per
iteration, not by how many cards it takes — "two-card" and "automatic" are separate axes, the pilot's
loop policy bans only unstoppable loops (see the 2026-09-06 loop-policy memory), and since 2026-09-24
the pilot opts in to combos.
**Evidence:** From oracle text, all verified with `bun run card` on 2026-09-22:
- **Chatterfang** (*"If one or more tokens would be created under your control, those tokens plus
  that many 1/1 Squirrels are created instead. {B}, Sacrifice X Squirrels: …"*) + **Pitiless
  Plunderer** (*"Whenever another creature you control dies, create a Treasure token"*): sacrifice a
  Squirrel → Treasure + Squirrel; the Treasure pays Chatterfang's own {B}. Two cards, infinite deaths.
  No free outlet even needed. Chosen-N, not automatic (verified 2026-09-24): every iteration needs a
  sacrifice the pilot chooses to activate (Chatterfang's own {B} ability, paid by the Treasure, or a
  free outlet). Chatterfang: tokens created *"plus that many 1/1 green Squirrel creature tokens"*, and
  *"{B}, Sacrifice X Squirrels: Target creature gets +X/-X"*. Each activation: −1 Squirrel, −1 Treasure
  (for {B}), +1 Treasure, +1 Squirrel. That is one death per activation, and target creature gets
  +1/−1 each time, so the loop also clears the opposing board. With Ashnod's Altar it nets {C}{C} per
  death. Nothing iterates without an activation, so CR 732.2b's shortcut rules apply and opponents can
  respond.
- **Ghave** (*"{1}, Remove a +1/+1 counter…: create a Saproling. {1}, Sacrifice a creature: put a
  +1/+1 counter on target creature"*) + a mana-producing outlet (Ashnod's Altar, Phyrexian Altar,
  Plunderer) + a counter-on-enter source (Cathars' Crusade, Ivy Lane Denizen) = infinite. Also
  Doubling Season + any mana outlet, or a token-only doubler (Parallel Lives) + Ashnod's Altar or
  Pitiless Plunderer. (This line first read "Doubling Season / Parallel Lives + a mana outlet";
  corrected by the 2026-09-24 outlet maths below.) The clean rule is "no mana-producing sacrifice
  outlets" — which removes the three best outlets and 67 % of Ghave lists run Ashnod's Altar.
  **Outlet maths (2026-09-24):** Ghave + a token-only doubler loops with **Ashnod's Altar** (net 0
  mana, 2 deaths per iteration) but **not** with Phyrexian Altar or Utopia Mycon (net −{1}). A
  one-mana outlet needs Doubling Season (which doubles the counter as well) or two token doublers.
  Ghave: *"{1}, Remove a +1/+1 counter…: Create a 1/1 green Saproling"* and *"{1}, Sacrifice a
  creature: Put a +1/+1 counter on target creature."* One iteration: −{1} (remove) → 2 Saprolings;
  −{1} (sacrifice one to Ghave) → counter back; the outlet returns {2} (Ashnod's) or {1} (Phyrexian)
  for the other. Net: 0 with Ashnod's, −{1} with Phyrexian. Pitiless Plunderer + doubler loops without
  any altar, because its Treasure is doubled too.
- **Prossh** (X Kobolds on cast, free sac outlet) + **Food Chain** (exile a creature: 1 + MV mana for
  creature spells): exile Kobolds and Prossh, recast bigger, net +5 mana per cycle, unbounded ETB
  triggers. Prossh + Plunderer + Ashnod's Altar is also unbounded growth (each Kobold = 3 mana, each
  recast costs 2 more and makes 2 more). Exclude Food Chain and the Plunderer + Altar pair.
- **Teysa Karlov** (dies triggers twice) + Plunderer + a creature that returns for ≤ 2 mana
  (Reassembling Skeleton, Nether Traitor): two Treasures per death pay the return. Exclude Plunderer
  or the cheap recursive bodies.
- **Zurgo Stormrender / Caesar / Slimefoot / Elas / Dina**: no automatic two- or three-card infinite
  found in the search; Plunderer is safe with Zurgo because Treasures are not creature tokens.
**Changes:** When a strong commander's reputation is "combo", write down the specific pairings before
ruling it out; usually one card carries the infinite and the rest of the deck is fair. Grep this
entry before seating Pitiless Plunderer in any token deck — it is the common thread. Never group
outlets as "altars" in loop math: compute each outlet's return per iteration. "Two-card" and
"automatic" are separate axes — label a loop by whether it needs a decision per iteration, not by how
many cards it takes. On 2026-09-24 the pilot overrode the drain-family brief ("maybe not two card
infinite"): *"i want to start trying to play with combos a little bit and if people complain too
often then i'll consider taking them out."* The drain-family decks now run their combos openly, and
the pod's reaction is the test (see memory drain-token-decks).
**History:** On 2026-09-22 this ledger said these pairings "form an automatic (no-choice) infinite",
and that for Chatterfang "Plunderer is the one hard exclusion". Corrected on 2026-09-24: the
Chatterfang + Pitiless Plunderer loop is two cards but not automatic — every iteration needs a
sacrifice the pilot chooses to activate — so under the pilot's loop policy it was never banned, only
kept out of the brief, and the pilot has since opted in. Also on 2026-09-24, I told the pilot "any
doubler + Ashnod's *or* Phyrexian Altar" loops with Ghave; the ghave build fork caught it —
Phyrexian Altar (or Utopia Mycon) + ONE token doubler is net −{1} per iteration, not a loop.
**See also:** loop-012, loop-015, loop-016, build-039
**Source:** drain-from-scratch brief (2026-09-22) — ranking on power with salt reported; ghave founding
build (2026-09-24), merged from "Ghave loop math depends on the outlet's mana — Phyrexian Altar + ONE
token doubler is not a loop"; chatterfang / ghave (2026-09-24) — pilot asked to add Plunderer to
Chatterfang and Chatterfang to Ghave, merged from "Chatterfang + Pitiless Plunderer is chosen-N, not
automatic — and the pilot now opts in to combos".

### Camellia + a Food-adding token replacement is an infinite with a mana-positive outlet — apply the Food-adder BEFORE the token-doubler, and it works without the commander {#loop-011}

**Kind:** ruling · **Verified:** 2026-09-23 against CR 2026-08-07
**Cards:** Camellia, the Seedmiser; Tippy-Toe, Terrific Partner; Peregrin Took; Chatterfang, Squirrel General; Ashnod's Altar; Witch's Oven; Vito, Thorn of the Dusk Rose
**Rules:** 106.4, 111.10b, 117.3c, 302.6, 601.2h, 602.2b, 602.5a, 603.2g, 603.3, 614.1a, 614.5, 614.16, 616.1, 616.1e, 701.21a, 701.61a
**Claim:** Camellia, the Seedmiser (*"Whenever you sacrifice one or more Foods, create a 1/1 green
Squirrel"*) plus Tippy-Toe, Terrific Partner or Peregrin Took (*"If you would create one or more
tokens, instead create those tokens plus an additional Food token"*) is an unbounded loop in any deck
with a mana-positive sacrifice outlet: **the Food pays for itself.** Applying the Food-adder before
Chatterfang's doubler is worth a body every iteration, and the loop still drains without Chatterfang.
**Evidence:** Crack a Food ({2}, {T}, sacrifice) → Camellia triggers → create 1 Squirrel → replacement
effects apply in the controller's chosen order (CR 616.1): Tippy-Toe makes it 1 Squirrel + 1 Food,
then Chatterfang makes it 3 Squirrels + 1 Food. The Food is replaced, you netted +3 bodies and +3 life,
and Ashnod's Altar converts one new Squirrel back into the {2} for the next crack. Foods are artifacts,
not creatures, so a Food made this turn can be tapped immediately — no summoning sickness (CR 302.6
applies to creatures only). Verified by mtg-rules-expert against rules version 2026-08-07:
- **Ordering is a real choice and it is worth a body.** Both Tippy-Toe/Peregrin Took and Chatterfang
  are "instead" replacement effects on one creation event (CR 614.1a), so CR 616.1e lets the affected
  player pick the order, and CR 614.16 confirms a token-creation replacement still applies to tokens
  produced by *another* replacement effect, with CR 614.5 capping each at one application.
  **Food-adder first → 3 Squirrels + 1 Food. Doubler first → only 2 Squirrels + 1 Food.** Always
  apply the Food-adder first.
- **Net per iteration**, sacrificing one Squirrel to Ashnod's Altar to fund the {2}: with Chatterfang
  and correct ordering, **+2 Squirrels, ±0 Foods, ±0 mana, +3 life, one creature dies**. Chatterfang
  first: +1 Squirrel. **Without Chatterfang at all: exactly ±0 on everything but +3 life and one
  death per iteration** — so it is still an infinite *drain*, just not a growing board. The loop
  therefore survives the commander being removed or taxed out, which is unusual.
- **A Food sacrificed to pay a COST still triggers "whenever you sacrifice a Food"** (CR 601.2h via
  602.2b — the cost is genuinely paid; CR 603.2g, only prevented or replaced events fail to trigger).
  The trigger goes on the stack above the Food's own ability (CR 603.3, 117.3c), so the tokens arrive
  before the life gain. **A Food token made this turn can tap immediately** — CR 302.6 and 602.5a
  restrict *creatures* only, and a Food is a noncreature artifact (CR 111.10b).
- **Bonus line missed on the first pass:** Camellia's own *"{2}, Forage"* can pay by sacrificing a
  Food (CR 701.61a), which re-triggers her own Squirrel-making ability. That is the same loop with a
  **board-wide +1/+1 counter on every other Squirrel per iteration** stapled on, so it wins through
  combat as well as drain.
- Practical: keep the whole loop inside one step, because mana pools empty at the end of each step
  and phase (CR 106.4). Fresh Squirrels are summoning sick and cannot attack that turn, but they can
  be sacrificed, since sacrificing involves no tapping (CR 701.21a).
**Changes:** **Tippy-Toe or Peregrin Took alone is safe and bounded** — cracking a Food creates no
token, so nothing refills it. The loop needs a card that makes a token *when a Food is sacrificed*.
Before seating Camellia (or Witch's Oven-style engines) next to a Food-adding replacement effect,
check for that trigger. General form: **a replacement effect that adds a resource to every token
event becomes infinite the moment spending that resource creates a token.** When two token-creation
replacement effects are on the battlefield, **work out the ordering before playing the turn** — it is
a free extra body every iteration and it is easy to get backwards. And when judging whether a loop
"needs the commander", compute the net per iteration without them; a loop that is merely neutral
without the commander is still a loop.
**History:** This entry calls Tippy-Toe and Peregrin Took "Food-adders". On 2026-09-25 repl-014 corrected that label from their oracle text: they add one Food to **every** token-creation event, not only Food creation. The loop itself runs on the text quoted in the Claim, so it stands.
**See also:** repl-010, tool-014, repl-014
**Source:** chatterfang (2026-09-23) — the pilot proposed the Tippy-Toe / Vito / Ashnod's Altar drain
line and correctly called it bounded; it stops being bounded if Camellia joins; chatterfang
(2026-09-23) — verifying the pilot's proposed Food/Vito drain line before recommending it, merged from
"The Camellia / Food loop, verified — apply the Food-adder BEFORE the token-doubler, and the loop works
without the commander".

### Rosie Cotton + Basking Broodscale is a two-card infinite inside the 99 {#loop-012}

**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07
**Cards:** Rosie Cotton of South Lane; Basking Broodscale
**Claim:** Rosie Cotton of South Lane and Basking Broodscale loop with no commander involvement.
Any counters-matter token list with Rosie must check its "whenever counters are put on this" creatures.
**Evidence:** Rosie: *"Whenever you create a token, put a +1/+1 counter on target creature you control
other than Rosie Cotton."* Broodscale: *"Whenever one or more +1/+1 counters are put on this creature,
you may create a 0/1 colorless Eldrazi Spawn…"* Each Spawn triggers Rosie, which targets Broodscale,
which makes a Spawn. It is chosen-N (Broodscale's "may"), but it is two 99-card pieces, which the
drain-family brief rules out ("maybe not two card infinite").
**Changes:** Before adding Rosie, grep the list for creatures that make a token when a counter
lands on them (Basking Broodscale and similar). Exclude one half, or declare it if the brief allows
two-card loops.
**See also:** loop-010
**Source:** ghave founding build (2026-09-24) — Broodscale excluded.

### A loop is only a draw if EVERY action in it is mandatory — screen new adds for the closing link {#loop-013}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Nuka-Cola Vending Machine; Camellia, the Seedmiser; Ygra, Eater of All; Bilbo, Fellow Conspirator; Ninja Pizza
**Rules:** 104.4b, 732.2a, 732.4, 732.5
**Claim:** Chosen-N token loops are safe, but adding a card that *mandatorily* sacrifices on a
trigger can close a creation→sacrifice cycle into a loop of only mandatory actions, which makes the
**game a draw** — a rules catastrophe, not a social problem.
**Evidence:** CR 104.4b — "If a game somehow enters a 'loop' of mandatory actions… the game is a
draw. **Loops that contain an optional action don't result in a draw**"; CR 732.4 same; CR 732.2a —
an optional loop is resolved by naming a finite N, which opponents may shorten; CR 732.5 — no player
can be forced to break a mandatory loop. In the Chatterfang shell the mandatory triggers
(Nuka-Cola Vending Machine, Camellia, Ygra) all **create** and never **sacrifice**, so the cycle
cannot close without the pilot activating something.
**Changes:** Before adding any card to a token/sacrifice deck, ask whether it sacrifices as part of a
*trigger* rather than a cost. If it does, check it against every "whenever you sacrifice X, create Y"
already in the list. This is a stricter test than the deck's own no-automatic-infinite policy,
because the failure mode is a drawn game rather than an unpopular win.
**See also:** loop-003
**Source:** chatterfang (2026-09-25) — Bilbo / Nuka-Cola / Ninja Pizza loop audit.

### A mandatory artifact-token → creature-token replacement deletes Treasure mana and loops with Treasure-on-death {#loop-014}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Draconic Visitor; Pitiless Plunderer
**Claim:** Draconic Visitor's replacement is mandatory and applies to every artifact token, so it
switches off every Treasure/Thopter/Clue/copy-token payoff you own, and next to any "creature dies →
create a Treasure" card plus a free outlet it becomes an unbounded chosen-N loop.
**Evidence:** Oracle: *"If one or more artifact tokens would be created under your control, that many
5/5 red Dragon creature tokens with flying are created instead."* Pitiless Plunderer: *"Whenever another
creature you control dies, create a Treasure token."* With both out, each sacrificed Dragon makes a
Dragon, and every death fires the deck's drains. Flagged independently by the caesar, iron-man,
scarlet-witch and lord-of-pain reviews.
**Changes:** Before seating any "artifact tokens become X instead" card, grep the list for Treasure,
Clue, Thopter, Food and copy-token makers (mana you lose) and for Treasure-on-death cards (a combo to
declare under the pilot's loop policy). Same family as *"'Exiles it instead' removal switches off a
death-trigger deck's own engine"*.
**See also:** loop-010
**Source:** caesar / iron-man / scarlet-witch / lord-of-pain (2026-09-28), FRA review.

### A lifegain → +1/+1 counter body is a counter engine for a counter-spending commander, and can close a loop {#loop-015}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Unflinching Hortimancer; Ghave, Guru of Spores; Elas il-Kor, Sadistic Pilgrim; Ashnod's Altar
**Rules:** 104.4b, 732.2a
**Claim:** When the commander spends +1/+1 counters, a creature that gets a counter whenever you gain
life turns the deck's lifegain events into commander activations. With a "creature enters → gain
life" card and a mana altar it is a chosen-N infinite.
**Evidence:** Unflinching Hortimancer (*"Whenever you gain life, put a +1/+1 counter on this
creature"*) + Ghave ({1}, remove a counter: Saproling) + Elas il-Kor (gain 1 per creature entering,
drain 1 per death) + Ashnod's Altar: each loop nets +{C}, +1 life and −1 to each opponent, with two
optional activations per iteration. CR 104.4b and 732.2a make it a chosen-N loop, not a draw.
Confirmed by `mtg-rules-expert`.
**Changes:** For counter-spending commanders, count the lifegain events in the list and treat these
bodies as engines. Declare any altar loop to the pilot under the loop policy.
**See also:** loop-010
**Source:** ghave (2026-09-28), FRA review.

### Check whether your own combo pieces are legal fodder for your own sacrifice cost {#loop-016}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Chatterfang, Squirrel General; Tippy-Toe, Terrific Partner; Camellia, the Seedmiser; Ravenous Squirrel; The Unbeatable Squirrel Girl; Pitiless Plunderer
**Rules:** 601.2c, 601.2h, 608.2b, 614.4, 704.5f
**Claim:** A cost worded "Sacrifice X [creature type]" does not exclude the card printing it or the
other engine pieces sharing that type. Before writing a loop into a gameplan, check the **types of
your own combo pieces** against the cost.
**Evidence:** Chatterfang's ability is *"{B}, Sacrifice X Squirrels."* **Chatterfang, Squirrel General**
is a Legendary Creature — Squirrel Warrior, and **Tippy-Toe, Terrific Partner** is a Legendary
Creature — Squirrel Hero. Both are legal Squirrels to feed to the cost, and doing so ends the engine
for every later trigger (CR 614.4 — a replacement effect must exist before the event it would modify).
The same deck also runs **Camellia, the Seedmiser** (Squirrel Warlock), **Ravenous Squirrel** and
**The Unbeatable Squirrel Girl** — five nontoken Squirrels that all look like fodder in a hurry.
**Changes:** When a deck's engine cost names a creature type, grep the list for **nontoken permanents
of that type** and write the exclusion into the gameplan explicitly ("sacrifice only the 1/1 tokens").
Also check the **target** clause: Chatterfang's *"Target creature gets +X/-X"* is unrestricted, so with
no opponent creature you must target your own. The clean out is to **name one of the creatures you are
about to sacrifice for the cost** — targets are chosen at CR 601.2c, before costs are paid at
CR 601.2h, so it is legal on announcement and gone by resolution, and CR 608.2b removes the ability
without the -X hitting anything you kept. The *better* line in a death-trigger deck is to target a
spare token you are **not** sacrificing: it dies to CR 704.5f and that is one more death trigger.
**See also:** loop-010
**Source:** upgrade-test (2026-09-28) — verifying the Pitiless Plunderer / Chatterfang loop.
