# Iron Man — pilot notes

## The deck in one line

**It cheats artifacts into play instead of casting them.** Everything else follows from that: the
low creature count (so your own sweepers are near one-sided), the doubled tutor count (find the
*specific* piece), the low cost reduction (your nine-drops arrive free), and the seven extra-combat
effects (one huge commander swinging repeatedly is the kill).

## The two routes to a 5/5, and when to pick each

Your commander is a **modal** DFC (CR 712.11b), so you choose a face every time you cast it from
the command zone. Both routes cost 6 mana total the first time:

| Route | Cost | When |
|---|---|---|
| **Tony Stark first** — cast `{1}{U}` on turn 2, dig with `{1},{T}` each turn, transform later for `{4}{U}{R}` | 2 now + 6 later | **Default.** The dig engine is most of your early card advantage, and nobody spends removal on a 1/3. |
| **Straight to the 5/5** — cast The Invincible Iron Man for `{4}{U}{R}` | 6 | You're behind, you already have Equipment in hand, or you need a clock now. Flying + haste means it attacks immediately. |

Transforming is **sorcery-speed only**. Casting the back face from the command zone is not, but
it's still a creature spell.

**After it dies:** recast the back face directly for `{4}{U}{R}` + `{2}` tax = 8 mana. Don't recast
the 1/3 and re-flip (10 mana over two turns) unless you're mana-screwed and want the dig back.

## The single most important habit: keep Equipment in your hand

The trigger reads *"you may put an artifact card **from your hand** onto the battlefield. If it's
an Equipment, attach it to The Invincible Iron Man."* That's a free drop **and** a free equip.

Equipment already on the battlefield gets neither — you pay full equip costs. And when the
commander dies, everything attached falls off and stays there unattached (CR 704.5n).

So: **don't cast your gear.** Cast rocks, draw and interaction; let the trigger deploy the swords.
Excalibur (`{12}`), Ultima Weapon (`{7}`, **equip {7}**) and Aettir and Priwen (`{6}`) should
essentially never be hard-cast.

## Roaming Throne doubles the whole plan

Choose **Hero**. The Invincible Iron Man is a *Legendary Artifact Creature — Human Hero*, so the
combat trigger fires **twice** — two free artifacts a combat, both Equipment auto-attached.

Mjölnir + Ultima Weapon in one turn is 12 power doubled = **24, lethal**.

It doubles **three** Hero triggers at once:

1. The commander's combat trigger → two free artifacts, both Equipment attached
2. **Iron Man, Titan of Innovation** → two Treasures and two tutors per attack
3. **Iron Man, Tony Stark** → two 2/1 flying artifact tokens per red spell (21 red spells)

Those tokens are **artifacts**, so each one is +1/+1 to the commander through Adaptive Omnitool,
and with Krang out they're indestructible hasty tramplers.

## Kill math

Base is a **5/5 flier with haste**. You need **21 commander damage**.

| Package | Power | Damage | Turns |
|---|---:|---:|---|
| Mjölnir alone (doubles all damage) | 5 | 10/hit | 3 combats |
| **Mjölnir + Ultima Weapon** | 12 | **24** | **1 hit** |
| **Mjölnir + Excalibur** | 15 | **30** | **1 hit** |
| **Mjölnir + Genji Glove** (double strike + extra combat) | 5 | 20 + 20 | **1 turn** |
| **Aettir and Priwen** (base P/T = life total) | ~40 | 40 (80 with Mjölnir) | **1 hit** |

**Mjölnir, Hammer of Thor is the linchpin.** Equip *worthy* `{1}` needs a legendary non-Villain
that's red and/or white — the back face is a legendary red Hero, so it qualifies.

**Chandra's Ignition is the second kill.** *"Each **other** creature and each opponent"* — it
doesn't hit Iron Man, and **Mjölnir doubles it**. A 15-power commander deals 30 to every opponent
and clears the table's creatures.

## Getting through blockers

Flying is not enough on its own. In order of reliability:

1. **Trample** (The Reaver Cleaver, Embercleave). Beats *every* blocker including colorless ones.
   Per **CR 702.19b** you assign trample damage ignoring *"any abilities or effects that might
   change the amount of damage that's actually dealt"* — so a 12/12 trampler chump-blocked by a 2/2
   assigns 2 to the blocker and 10 to the player, and **then** Mjölnir doubles it: **20 commander
   damage through the chump block.**
2. **Ultima Weapon** — destroys a creature when you *attack*, before blockers are declared. Kill
   the best blocker pre-emptively.
3. **Commander's Plate** — pro-W/B/G plus innate flying leaves only U/R fliers and colorless
   creatures able to block.

Note that **protection does not stop colorless blockers**, which is why trample outranks it in an
artifact format full of Constructs, Thopters and Servos.

## Sequencing traps

- **Blasphemous Act kills your own commander.** Only fire it with Mithril Coat attached, Darksteel
  Forge out, or when you're rebuilding anyway.
- **Extinguisher Battleship is your free, near-one-sided wipe.** 4 damage doesn't kill a 5/5
  commander. Hold it for when the table has blockers, and remember the ETB also destroys a
  noncreature permanent.
- **Never attach a shroud source.** Nothing in the deck grants it, but if one arrives via Phyrexian
  Metamorph or a Mycosynth Gardens copy, keep it off Iron Man — you'd lock yourself out of
  equipping. The free combat attach still works through shroud (CR 701.3a, attaching doesn't
  target), but nothing else does.
- **Sword of Fire and Ice and Mjölnir cannot share the commander.** SoFI grants pro-**red**, and
  Mjölnir `{3}{R}`, The Reaver Cleaver `{2}{R}` and Embercleave `{4}{R}{R}` are all red *cards* —
  they'd fall off as a state-based action (CR 702.16d). Pick a lane: Mjölnir + Ultima Weapon is the
  fast kill; Commander's Plate + SoFI is the near-unblockable grind. **The trap:** the combat
  trigger's attach is *not* optional, so with Mjölnir on, **decline the trigger** rather than
  deploying SoFI with it. Better yet, hard-cast SoFI onto **Knuckles** — double strike fires its
  trigger twice for 4 damage and 2 cards. Commander's Plate is always safe; it only grants
  protection from colours *outside* your commander's identity.
- **Extra-combat spells want the gear on first.** Savage Beating, Seize the Day, Overpowering
  Attack, Great Train Heist and Aggravated Assault all multiply what's already attached.
- **Aggravated Assault goes infinite** with The Reaver Cleaver (damage → Treasures → pay
  `{3}{R}{R}`) or Sword of Feast and Famine (damage → untap all lands → pay again). Know that
  before you sit down at a strict bracket-3 table.
- **Start Insight Engine early.** Its counters accumulate, so the third activation draws 3 for
  `{2}`. It's slow the turn you cast it and excellent two turns later — deploy it before you need it.
- **Otawara and Sink into Stupor are lands you can cast.** Count them as lands when keeping a hand,
  but they're outs to a problem permanent.

## Mulligan guide

**Keep** anything with 2+ lands, a rock or Sol Ring, and either Tony Stark on curve or a way to
dig. You're mulliganing for **mana**, not threats — the commander is the threat.

**Ship** hands with 3+ cards at MV 6 and no ramp. The fat is free later, but only if you survive
to flip.

Do **not** keep a hand full of Equipment and no lands. Equipment is the payoff, not the engine.
