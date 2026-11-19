# Ultron — pilot notes

## The deck in one line

**Every nontoken artifact you play is two artifacts.** Ultron reads *"whenever another nontoken
artifact you control enters, you may pay {2}: create a token that's a copy of it,"* and the token is
a 2/2 Robot Villain creature if it wasn't a creature already. Rocks become bodies that tap for mana,
reducers become two reducers, ETB artifacts fire twice, and the lords grow the whole pile.

## The first four turns

| Turn | Play | Why |
|---|---|---|
| 1 | Land, Sol Ring / Mox Opal / a one-drop | Rocks are the copy targets; get them down first |
| 2 | Land, a two-mana rock or Steel Overseer | |
| 3 | **Ultron** | Nothing else matters on turn 3 |
| 4 | Land, rock, **pay {2}** → token rock | The token is summoning-sick (CR 302.6) — it taps for mana **next** turn |
| 5+ | Reducers, then ETB artifacts, always with the {2} held | Copy the reducers before the big stuff; each token Inspector is another −1 |

Under Krang every artifact creature has haste, so the token rocks tap immediately.

## When to pay the {2}

| Copy target | Pay? | Notes |
|---|---|---|
| Any mana rock (Dynamo, Lotus, Arc Reactor, Powerstone, Mightstone) | **Always** | Permanent mana plus a body. (An Everflowing Chalice-style rock would copy with zero counters — CR 707.2 — which is why the deck runs Powerstone instead.) |
| Walking Ballista | **Never** | X is 0 for anything not on the stack (CR 107.3g): the token is a 0/0 and dies at once. Echoes of Eternity's *spell* copy does keep X. |
| Big Mother Mouser | **Always** | The token enters with its own two +1/+1 counters, because the printed "enters with" replacement reads the copy's text (ledger zone-009). It's a second full Mouser. |
| Stridehangar Automaton | **Always** | The copy is a second replacement effect, and each one applies once to the event (CR 614.5, 616.1f), so every artifact token batch brings two Thopters, both 3/3. |
| Cyberman Patrol | Yes | The copy gives every artifact creature a second afflict 3. Each instance triggers separately (CR 702.130b), so a block costs 6. |
| Cost reducer (Inspector, Familiar, Cloud Key, Anvil) | **Always** | Cloud Key's token re-chooses the type — name creature for the fatties. Anvil's token re-imprints. |
| ETB artifact (Battlesphere, Meteor Golem, Portal, Solemn, Mightstone, Duplicant) | **Always** | The token keeps the ETB (CR 707.5). Token Portal = three more sacrifices. |
| Bomb body (Blightsteel, Krang, Leveler) | Yes | Legendary ones (Krang) hit the legend rule unless Mirror Box is out — keep either, they're identical. |
| Deep Space 9 | Yes | The token's entry trigger exiles four more cards and puts the permanents in before the legend rule removes one of the two (CR 603.6a, 704.5j). Keep the card, which has the upkeep trigger like the token. |
| The One Ring | Yes | Keep the **token** (0 burden counters) and bin the card. No protection trigger — the token wasn't cast. |
| Equipment (Commander's Plate) | Rarely | The token is a 2/2 that can't equip anything (CR 301.5c). Only if you want the body. |
| Engine pieces (Roaming Throne, Panharmonicon, Echoes, Unwinding Clock, Mystic Forge) | Yes if mana is spare | A second Clock does nothing; a second Throne or Panharmonicon adds a trigger (they add, they don't compound). |

## Stacking the copy engines

- **Roaming Throne** (name Robot), **Panharmonicon** and **Echoes of Eternity** each make Ultron
  trigger one extra time. All three out: **four** triggers per artifact, {8} for four tokens
  (CR 603.2d — they add, never multiply). A doubler only counts if it was out before the artifact
  entered.
- **Mirrorworks** is a second Ultron with its own {2}. Panharmonicon and Echoes double it too
  (Throne does not — it only reads creatures), so it triggers three times: seven tokens from one
  Thran Dynamo between the two of them if you have {14}.
- **Thran Temporal Gateway / Quicksilver Amulet** ({4},{T}): put Krang, Blightsteel, Portal or
  Forge from hand onto the battlefield at instant speed — an Ultron trigger, not a cast. Unwinding
  Clock untaps both on every opponent's turn. Ultron copies the deployers themselves, and a
  token Gateway is a Robot Villain 2/2 that still deploys.
- **Extraplanar Lens**: imprint a Wastes on turn 3 or Urza's Tower once Tron is up — Stage and
  Vesuva copies of Tower share its name and trigger it too. Opponents' same-named lands also
  benefit; almost nobody else runs Wastes or Tower.
- **Prototype Portal**: imprint Myr Battlesphere ({7}: 4/7 + four Myr each turn) or
  Meteor Golem ({7}: destroy a permanent every turn). With Unwinding Clock, once per untap
  step — four a turn cycle.
- **Roaming Throne** naming Robot also doubles every token copy of a noncreature artifact (they
  are Robot Villains): a token Portal to Phyrexia edicts six and reanimates twice each upkeep.
  Ultron copies the Throne itself for {2} — the token names Robot too and adds a fifth trigger,
  and Machine Overlord makes both of them 6/6 with ward 2.
- **Replicator** (`{2}, {T}`) makes a tapped copy of any token you control. Aim it at Ultron's best
  token: Myr Battlesphere, Meteor Golem, Portal to Phyrexia, Gilded Lotus or Thran Dynamo. Unwinding
  Clock untaps it on each opponent's untap step, so that's four copies a turn cycle, and Tezzeret's 0
  untaps it for a second copy on your turn. Its copy of an Ultron token is a plain copy of the
  original card (ledger zone-009): a copied Sol Ring isn't a 2/2 Robot, so it taps for mana as soon
  as Clock untaps it, but Roaming Throne and Machine Overlord don't count it. Ultron's own copy of
  Replicator is a creature, so it can't tap until your next turn. Its tokens never trigger Ultron.
- **The Mycosynth Gardens** ({X},{T}: becomes a copy of an artifact with MV X) is a land — it does
  **not** enter, so no Ultron trigger, but it is a repeatable fifth copy of Forsaken Monument or
  Cloud Key.
- **Mirror Box** turns the legend rule off and gives +1/+1 per same-named creature. Token Krang
  next to Krang: two 10/10s. Token Karn: two.

## How the game ends

1. **Krang, Utrom Warlord** — the board gains flying, trample, indestructible and haste. Ten Robot
   Villain tokens at 6/6 (Machine Overlord +2, Monument +2, Overseer counters) is 60 evasive
   power in one swing.
2. **Cybermen Squadron** — every nonlegendary artifact creature has myriad: each attacker becomes
   three, one at each opponent. Ten attackers = thirty attackers.
3. **Blightsteel Colossus** — copy it ({2}) for a second 11/11 infect trampler; Kuldotha Forgemaster
   (sac three tokens) puts it onto the battlefield, which still triggers Ultron. Rogue's Passage
   makes one unblockable. Ten poison from one hit.
4. **Glaring Fleshraker** — 1 to each opponent for every colourless creature entering. Every
   Ultron token, every Spawn, every myriad copy, every Myr. Echoes doubles it. Twenty triggers
   over a game is normal.
5. **Walking Ballista** — under Forsaken Monument every tap for {C} makes an extra {C}; Tron plus
   three doubled rocks is X=10 easily, and it is a colourless spell for Sanctum of Ugin. Under
   Omnath, Locus of the Void the mana banked on earlier turns adds to X as well.
6. **Portal to Phyrexia** — original plus token: six sacrifices on entry, then two reanimations
   every upkeep from any graveyard.
7. **Platinum Angel** — not a kill, a lock: copy her, then Forge or Krang for indestructible and
   Cryptothrall for hexproof. Edicts miss (you sacrifice a token). Only an exile wrath, a mass
   bounce or a big −X/−X ends it, and every exile spent on an Angel is one not spent on Ultron.

## Removal that only hurts them

All Is Dust, Ugin's −3 and Ugin Eye of the Storms' exile-on-cast read *colour*. Nothing in this
deck has a colour, Omnath included. (Null Elemental Blast is on the sideboard since 2026-09-30; it
reads *multicolour*, so a mono-coloured commander is immune to it.) Ugin, Eye of the Storms is the strongest card in the list
once it lands — every colourless spell (almost every spell) exiles a coloured permanent.

## Sequencing traps

- **Token rocks can't tap the turn they arrive** (summoning sick, even for a mana ability). Plan
  the {2} a turn ahead.
- **Sanctum of Ugin** triggers on *casting* a colourless spell with MV 7+ — Krang, Portal,
  Blightsteel, Forge, Leveler, Battlesphere, Platinum Angel, Squadron, All Is Dust, Ugin EotS,
  Ten Rings, Deep Space 9, Omnath, and Ballista at X of 4 or more. Hold it until the cast, then sac for Blightsteel, Krang or Omnath.
- **Deep Space 9**'s trigger is mandatory. On entry and every upkeep it exiles your top four cards
  (eight under Echoes) and puts every permanent among them onto the battlefield, so count your
  library: The One Ring, Mind's Eye and Memnarch draw on top of it. All Is Dust and Kozilek's
  Command are lost if it exiles them. Walking Ballista enters as a 0/0 and dies unless
  Machine Overlord or Forsaken Monument is out. The cards it puts in aren't cast,
  so Cityscape Leveler's and Ugin, Eye of the Storms' cast triggers don't fire. Each land is an
  Omnath landfall, and each artifact is an Ultron trigger. Thran Temporal Gateway puts it in for {4}
  at instant speed, Kuldotha Forgemaster fetches it by sacrificing three Ultron tokens, and Ultron's
  copy for {2} fires the entry trigger once more. One tap from Krang or Blightsteel stations it to
  9, which gives your creatures +3/+3. It never becomes a creature, so creature wipes miss it.
- **Kuldotha Forgemaster** puts the card onto the battlefield — that is an artifact *entering*
  (Ultron triggers) but not a *cast* (Sanctum, Echoes' copy and Liberator's counter don't).
- **Cyberman Patrol** gives every artifact creature afflict 3, so each one that becomes blocked
  makes the defending player lose 3, or 6 once Ultron has copied Patrol (CR 702.130b). Ultron's
  token copies of rocks are artifact creatures, so they have it too. Swing wide under Krang or
  Cybermen Squadron: the table either takes the damage or pays 3 to 6 life per block. It does
  nothing until you attack.
- **Mind's Eye**: pay {1} per opponent draw — Unwinding Clock means the rocks are untapped on their
  turns, so the mana is free. Ultron's token copy is a Robot: Throne doubles it, Echoes doubles
  both. Five triggers on one draw step is normal late.
- **Idol of Oblivion** draws only on a turn you created a token — any Ultron copy, Spawn, Myr,
  Thopter or Treasure Vault activation counts. Hold {2} for a copy before you tap it.
- **Big Mother Mouser** enters with two +1/+1 counters and doubles them each time it attacks. Put
  Steel Overseer's, Iron Spider's and Tezzeret's counters on it before combat so the doubling starts
  higher. Roaming Throne naming Robot makes the attack trigger double twice (×4) and the death
  trigger make Robots twice, and both death triggers count the counters it had as it died (CR
  608.2h). It's a Robot, so Machine Overlord makes it and its Robot tokens +2/+2. The death Robots
  are an artifact token batch, so Stridehangar adds a Thopter, and each Robot is a Fleshraker ping.
  Iron Spider can draw off its counters. An exile wipe leaves no Robots.
- **Chimil** discovers at your end step: take the free cast (Ultron copies it) unless it is
  Walking Ballista or a card you would rather hold. It also makes every spell uncounterable.
- **Stridehangar Automaton** adds a 1/1 flying Thopter to every batch of artifact tokens you create:
  each Ultron copy, Battlesphere's Myr, a Prototype Portal copy, a Replicator copy, Urza's Saga's
  Constructs and Treasure Vault's Treasures. Thopters get +1/+1, so each is a 2/2 flier. Get it out
  before the batch, because it's a replacement effect. Ultron's copy of it adds a second Thopter
  per batch, and both are 3/3. Each Thopter is a colourless creature entering, so Glaring
  Fleshraker pings each opponent, and it's a token for Idol of Oblivion. Liberator is a Thopter, so
  it gets +1/+1 too. Stridehangar is a Construct, so Machine Overlord makes it a 3/6. Its Thopters
  are tokens, so Ultron doesn't copy them, and Fleshraker's Eldrazi Spawn aren't artifacts, so
  they bring no Thopter.
- **Mycosynth Golem** gives artifact creature spells affinity, and X is chosen before the reduction
  is applied (CR 601.2b, 601.2f, 702.41a): with ten artifacts, Walking Ballista at X = 5 costs
  nothing.
- **Ugin's Labyrinth**: exile Krang, Blightsteel or Portal on entry for {C}{C} a turn, and tap it
  to take the card back the turn you can cast it. **Urza's Workshop** taps for one per Urza's
  land — Mine, Power Plant, Tower, Cave, Saga, itself — once you control three artifacts.
- **Cityscape Leveler's** cast trigger fires once (the card); the token gets only the attack trigger.
- **Duplicant** exiles a nontoken creature on entry; the token Duplicant does it again.
- **Legend rule** on token copies of Krang, Karn, The One Ring, Squadron is not legendary. Mirror
  Box off → choose one; it doesn't have to be the card.
- **Mishra's Workshop** mana only casts artifact spells — not Echoes, All Is Dust, the Ugins,
  Omnath or the instants. Tap it first for artifacts and keep Wastes for {C} pips.
- **Omnath, Locus of the Void** keeps your unspent mana across steps and turns. When the pool
  would empty, the mana becomes colourless instead and stays (CR 500.5, 614.5; ledger cost-014).
  - Under Unwinding Clock, tap every rock on every opponent's turn and keep the mana for your own
    turn. Sol Ring, Thran Dynamo and Gilded Lotus alone bank 24 across three opponent turns, or 33
    with Forsaken Monument.
  - Banked mana keeps its restriction (ledger cost-023). Workshop mana still casts only artifact
    spells and can't pay Ultron's {2}. Karn's upkeep mana now carries over every turn, but still
    can't cast a nonartifact spell. Spend restricted mana first.
  - Landfall adds {C}{C}, or {C}{C}{C}{C} under Echoes. When Ultron copies Darksteel Citadel,
    Treasure Vault or Power Depot, the token is a land: resolve landfall first and pay the {2}
    with it. Solemn's basic and Vesuva also trigger it.
  - It's not an artifact: Ultron can't copy it, and Workshop, Karn and Mightstone mana can't cast
    it. Jhoira's Familiar (−1) and Ugin, the Ineffable (−2) do reduce it, and Gateway or Amulet
    put it in for {4}. Echoes' cast copy dies to the legend rule unless Mirror Box is out, and
    two Omnaths double landfall again. Hall of Echoes can become a second one for a turn.
  - If it's removed, the bank stays until the end of that step (ledger cost-010). Spend it in
    response on Walking Ballista's {4} counters or Kozilek's Command.
  - Announce your pool every time you pass priority (CR 106.4b).

## Mulligan guide

**Keep** two lands plus a rock, or three lands and Ultron castable on 3. Ultron on turn 3 with a
rock to copy on turn 4 is the whole early game.

**Ship** hands with three or more cards at MV 7+ and no reducer or rock. The fat is castable
under Tron and reducers later; it is dead on turn 5 with four lands.
