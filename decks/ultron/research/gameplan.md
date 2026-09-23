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
| Hangarback Walker | **Never**, unless Machine Overlord or Forsaken Monument is out | Same X = 0 rule: the token is a 0/0 and dies. Under Overlord (+2/+2 to Constructs) or Monument (+2/+2 to colourless creatures) it lives as a 2/2 that grows itself for {1}. |
| Cost reducer (Inspector, Familiar, Cloud Key, Anvil) | **Always** | Cloud Key's token re-chooses the type — name creature for the fatties. Anvil's token re-imprints. |
| ETB artifact (Battlesphere, Meteor Golem, Portal, Solemn, Mightstone, Duplicant) | **Always** | The token keeps the ETB (CR 707.5). Token Portal = three more sacrifices. |
| Bomb body (Wurmcoil, Blightsteel, Krang, Leveler) | Yes | Legendary ones (Krang) hit the legend rule unless Mirror Box is out — keep either, they're identical. |
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
- **Prototype Portal**: imprint Myr Battlesphere ({7}: 4/7 + four Myr each turn), Wurmcoil ({6}),
  or Meteor Golem ({7}: destroy a permanent every turn). With Unwinding Clock, once per untap
  step — four a turn cycle.
- **Roaming Throne** naming Robot also doubles every token copy of a noncreature artifact (they
  are Robot Villains): a token Portal to Phyrexia edicts six and reanimates twice each upkeep.
  Ultron copies the Throne itself for {2} — the token names Robot too and adds a fifth trigger,
  and Machine Overlord makes both of them 6/6 with ward 2.
- **Sculpting Steel** entering as a copy of X *is* a nontoken artifact entering — Ultron copies it
  too (three X for {5} total).
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
   three doubled rocks is X=10 easily, and it is a colourless spell for Sanctum of Ugin.
6. **Portal to Phyrexia** — original plus token: six sacrifices on entry, then two reanimations
   every upkeep from any graveyard.
7. **Platinum Angel** — not a kill, a lock: copy her, then Forge or Krang for indestructible and
   Cryptothrall for hexproof. Edicts miss (you sacrifice a token). Only an exile wrath, a mass
   bounce or a big −X/−X ends it, and every exile spent on an Angel is one not spent on Ultron.

## Removal that only hurts them

All Is Dust, Ugin's −3 and Ugin Eye of the Storms' exile-on-cast read *colour*; Null Elemental
Blast reads *multicolour*, so a mono-coloured commander is immune to it. Nothing in this deck has a
colour. Ugin, Eye of the Storms is the strongest card in the list
once it lands — every colourless spell (almost every spell) exiles a coloured permanent.

## Sequencing traps

- **Token rocks can't tap the turn they arrive** (summoning sick, even for a mana ability). Plan
  the {2} a turn ahead.
- **Sanctum of Ugin** triggers on *casting* a colourless spell with MV 7+ — Krang, Portal,
  Blightsteel, Forge, Leveler, Battlesphere, Platinum Angel, Squadron, All Is Dust, Ugin EotS,
  Ten Rings, and Ballista or Hangarback at X of 4 or more. Hold it until the cast, then sac for Blightsteel or Krang.
- **Kuldotha Forgemaster** puts the card onto the battlefield — that is an artifact *entering*
  (Ultron triggers) but not a *cast* (Sanctum, Echoes' copy and Liberator's counter don't).
- **Marvin** has every activated ability of your other creatures — and every Ultron token of a
  noncreature artifact is a creature. Token Dynamo: Marvin taps for three. Token Gateway: a third
  deployer. Kuldotha: a second tutor. Steel Overseer's counters land on Marvin (he is an artifact
  creature) and Walking Ballista's "remove a counter: 1 damage" lets him shoot them; Hangarback's {1},{T} grows him. One tap per
  untap, four per cycle under Clock. Legendary — his copy needs Mirror Box.
- **Mind's Eye**: pay {1} per opponent draw — Unwinding Clock means the rocks are untapped on their
  turns, so the mana is free. Ultron's token copy is a Robot: Throne doubles it, Echoes doubles
  both. Five triggers on one draw step is normal late.
- **Idol of Oblivion** draws only on a turn you created a token — any Ultron copy, Spawn, Myr,
  Thopter or Treasure Vault activation counts. Hold {2} for a copy before you tap it.
- **Eldrazi Confluence** mode 2, three times, on Battlesphere or Portal at instant speed: three
  fresh ETBs and three Ultron triggers. It also flickers an opponent's token out of existence.
- **Chimil** discovers at your end step: take the free cast (Ultron copies it) unless it is
  Walking Ballista, Hangarback Walker or a card you would rather hold. It also makes every spell uncounterable.
- **Hangarback Walker** is the mana sink: {1},{T} for a counter, four times a cycle under Unwinding
  Clock, and Overseer and Iron Spider stack more. It dies into a Thopter per counter — each one a
  Fleshraker ping and an Idol turn-on. Never pay Ultron's {2} for it unless Machine Overlord or
  Forsaken Monument is out; Gateway, Amulet, Forgemaster, Prototype Portal and a Chimil discover
  all make it a 0/0. Under Krang it is indestructible, so a wipe leaves no Thopters — feed it to
  Kuldotha instead.
- **Mycosynth Golem** gives artifact creature spells affinity, and X is chosen before the reduction
  is applied (CR 601.2b, 601.2f, 702.41a): with ten artifacts, Walking Ballista or Hangarback
  Walker at X = 5 costs nothing.
- **Ugin's Labyrinth**: exile Krang, Blightsteel or Portal on entry for {C}{C} a turn, and tap it
  to take the card back the turn you can cast it. **Urza's Workshop** taps for one per Urza's
  land — Mine, Power Plant, Tower, Cave, Saga, itself — once you control three artifacts.
- **Cityscape Leveler's** cast trigger fires once (the card); the token gets only the attack trigger.
- **Duplicant** exiles a nontoken creature on entry; the token Duplicant does it again.
- **Legend rule** on token copies of Krang, Karn, The One Ring, Squadron is not legendary. Mirror
  Box off → choose one; it doesn't have to be the card.
- **Mishra's Workshop** mana only casts artifact spells — not Echoes, All Is Dust, the Ugins or
  the instants. Tap it first for artifacts and keep Wastes for {C} pips.

## Mulligan guide

**Keep** two lands plus a rock, or three lands and Ultron castable on 3. Ultron on turn 3 with a
rock to copy on turn 4 is the whole early game.

**Ship** hands with three or more cards at MV 7+ and no reducer or rock. The fat is castable
under Tron and reducers later; it is dead on turn 5 with four lands.
