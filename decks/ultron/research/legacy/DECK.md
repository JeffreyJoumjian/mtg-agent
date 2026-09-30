<!-- recovered 2026-09-23 from snapshot versions/2026-09-16-before-hangarback.md — verbatim copy -->
# Ultron — Colorless Artifact Replication

Commander: Ultron, Artificial Malevolence (colorless)
Bracket: 3   ·   Total: 100/100

Game Changers (3/3 — at the bracket 3 cap): Ancient Tomb · Mishra's Workshop · The One Ring

> Authoritative current list. Edit alongside STATUS.md. See ../README.md.
> Research: research/decisions.md · pilot notes: research/gameplan.md.
>
> **Gameplan:** every nontoken artifact you play is two artifacts. Land Ultron on turn 3, then
> pay {2} on each rock, each cost reducer and each ETB artifact to get a 2/2 Robot Villain copy of
> it. Copy the rocks early (a Thran Dynamo token taps for three next turn), copy the value
> artifacts mid-game (Myr Battlesphere, Meteor Golem, Portal to Phyrexia, Wurmcoil Engine), and
> stack the copy engines — Mirrorworks is a second Ultron, Roaming Throne (naming Robot),
> Panharmonicon and Echoes of Eternity make him trigger four times, Mirror Box lets the legendary
> copies stay. The tokens are Robot
> Villains, so Ultron, Machine Overlord and Steel Overseer grow them and Krang gives the whole
> board flying, trample, indestructible and haste. Close with Krang, Cybermen Squadron's myriad
> swing, a copied Blightsteel Colossus, or Glaring Fleshraker pinging once per colorless creature.
>
> **Not voltron.** No Equipment package, no commander-damage plan. Ultron is the engine, and the
> protection slots (Commander's Plate, Cryptothrall, Darksteel Forge) exist to keep the engine and
> the board alive, not to make him swing.

## Commander (1)

1x Ultron, Artificial Malevolence

## Lands (34)

1x Ancient Tomb *GC*
1x Mishra's Workshop *GC*
1x Urza's Mine
1x Urza's Power Plant
1x Urza's Tower
1x Urza's Saga
1x Urza's Cave
1x Urza's Workshop
1x Ugin's Labyrinth
1x Darksteel Citadel
1x Buried Ruin
1x Inventors' Fair
1x The Mycosynth Gardens
1x Treasure Vault
1x Fomori Vault
1x Command Beacon
1x War Room
1x Deserted Temple
1x Thespian's Stage
1x Vesuva
1x Mirrorpool
1x Scavenger Grounds
1x Rogue's Passage
1x Shrine of the Forsaken Gods
1x Sanctum of Ugin
1x Power Depot
8x Wastes

## Ramp / Mana Rocks (13)

1x Sol Ring
1x Thran Dynamo
1x Mind Stone
1x Thought Vessel
1x Arc Reactor
1x Hedron Archive
1x Mox Opal
1x Gilded Lotus
1x Palladium Myr
1x Worn Powerstone
1x Extraplanar Lens
1x The Mightstone and Weakstone
1x Karn, Legacy Reforged

## Cost Reduction (4)

1x Foundry Inspector
1x Cloud Key
1x Jhoira's Familiar
1x Semblance Anvil

## Card Draw (7)

1x The One Ring *GC*
1x Idol of Oblivion
1x Mind's Eye
1x Canoptek Spyder
1x The Ten Rings
1x Chimil, the Inner Sun
1x Iron Spider, Stark Upgrade

## Removal & Interaction (9)

1x All Is Dust
1x Ugin, the Ineffable
1x Ugin, Eye of the Storms
1x Meteor Golem
1x Duplicant
1x Kozilek's Command
1x Eldrazi Confluence
1x Null Elemental Blast
1x Cityscape Leveler

## Copy Engines (7)

1x Mirrorworks
1x Sculpting Steel
1x Prototype Portal
1x Echoes of Eternity
1x Panharmonicon
1x Mirror Box
1x Roaming Throne

## Deployers (2)

1x Thran Temporal Gateway
1x Quicksilver Amulet

## Payoffs & Engines (10)

1x Forsaken Monument
1x Steel Overseer
1x Marvin, Murderous Mimic
1x Ultron, Machine Overlord
1x Krang, Utrom Warlord
1x Glaring Fleshraker
1x Cybermen Squadron
1x Unwinding Clock
1x Mystic Forge
1x Liberator, Urza's Battlethopter

## Bombs & ETB Artifacts (9)

1x Myr Battlesphere
1x Wurmcoil Engine
1x Solemn Simulacrum
1x Portal to Phyrexia
1x Blightsteel Colossus
1x Kuldotha Forgemaster
1x Mycosynth Golem
1x Walking Ballista
1x Platinum Angel

## Protection & Recursion (4)

1x Cryptothrall
1x Darksteel Forge
1x Commander's Plate
1x Scrap Trawler

---

**Bracket 3 compliance:** no mass land denial, no extra turns, no two-card infinite. Basalt Monolith
was deliberately left out — with Forsaken Monument it is infinite colorless mana (tap for four, untap
for three), and Walking Ballista is in the deck. Krark-Clan Ironworks, Ashnod's Altar and Myr
Retriever are out for the same reason. See `research/decisions.md`.

**Rules the deck runs on (verified against CR 2026-08-07, see the deck-brain ledger):**

- A token copy of a mana rock is a **creature** and is summoning-sick — it cannot tap for mana the
  turn it is made (CR 302.6; being a mana ability changes nothing). Krang's haste fixes that.
- Ultron's token has the copied card's **ETB trigger** (CR 707.5) — a token Portal to Phyrexia is a
  second triple edict, a token Meteor Golem a second destroy.
- Roaming Throne (naming Robot), Panharmonicon and Echoes of Eternity each make Ultron trigger
  **one extra time**; they add, they never multiply — all three out is four triggers, not eight
  (CR 603.2d). Each pays {2} separately, and a doubler only counts if it was on the battlefield
  before the artifact entered.
- Throne naming Robot also doubles the triggers of every **token copy of a noncreature artifact**
  (they are Robot Villains) — a token Portal to Phyrexia edicts six and reanimates twice.
- Token copies from Echoes of Eternity's spell-copy and myriad are **tokens** — they never trigger
  Ultron ("nontoken"), but they do trigger Glaring Fleshraker.
- A token copy of a legendary artifact hits the legend rule (CR 704.5j) unless Mirror Box is out —
  keep the token when copying The One Ring, its burden counters start at zero.
- A **flickered** card (Eldrazi Confluence mode 2) comes back as a new object entering the
  battlefield (CR 400.7, 603.6a) — a nontoken artifact entering, so Ultron triggers again and the
  ETB fires again. Three modes = three copies and three ETBs at instant speed.
- Chimil's discover casts the card (a cast for Sanctum of Ugin and Liberator) and the artifact
  entering is an Ultron trigger. Its "can't be countered" covers Ultron's recast too.
- Urza's Workshop counts every land with the **Urza's** subtype — Mine, Power Plant, Tower, Cave,
  Saga and itself — not just the Tron three.
- Gateway and Amulet **put** the card onto the battlefield: Ultron and Panharmonicon trigger,
  Sanctum of Ugin, Echoes and Liberator do not (nothing was cast). A deployed Walking Ballista
  enters with X = 0 and dies.
- Extraplanar Lens exiles one of your lands as it enters and then adds one extra mana whenever
  **any** land with that name is tapped — an opponent's Wastes included. It is a triggered mana
  ability (CR 605.1b), additive, not a replacement.
