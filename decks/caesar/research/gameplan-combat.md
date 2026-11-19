# Caesar, Legion's Emperor — `combat` list: Pilot's Gameplan

The go-wide combat list with a lifelink layer, founded 2026-11-15. `main` is the drain build and keeps
its own `gameplan.md`. The import list is `MOXFIELD-COMBAT.txt`.

## 0. The one-paragraph version

**Attack every turn, with tokens that hit twice and can't be hurt.** Caesar makes two Soldiers that
enter attacking whenever you attack. Neyali gives attacking tokens double strike, Iroas gives your
team menace and prevents all damage to your attackers, and Sorin, Vengeful Bloodlord gives everything
lifelink during your turn. Each lifelinked creature's damage in each damage step is its own life gain,
and South Wind Avatar and Marauding Blight-Priest each make every opponent lose 1 per gain. So every
token that deals damage, to a player or to a blocker, also drains the whole table.

## 1. The curve you actually have

| | MV1 | MV2 | MV3 | MV4 | MV5 | MV6 | MV7 | avg |
|---|---|---|---|---|---|---|---|---|
| Nonland, Caesar included (66) | 6 | 15 | 23 | 15 | 5 | 1 | 1 | **3.08** |

Heavier than `main` (2.82). Two cards cost less than they look: Own the Day usually costs {1}{R}{R} once
you've attacked all three opponents, and Exalted Sunborn can be cast for {1}{W} with warp (it's exiled
at end step and you can cast it again later).

## 2. The rules that decide most turns

1. **Caesar doesn't have to attack.** *"Whenever you attack"* triggers when anything attacks. Ainok
   Strike Leader is different: it needs Caesar or itself in the attack.
2. **Tokens that enter attacking never "attacked"** (CR 508.4). They don't trigger "whenever a creature
   attacks" cards, and Own the Day doesn't untap them. They **do** count as attacking tokens for
   Neyali's double strike, and as attacking creatures for Commissar Severina Raine and Hero's battle cry.
3. **Static grants cover new tokens; resolved ones don't** (ledger dmg-031). Sorin's lifelink and
   Neyali's double strike apply to tokens the moment they enter. Vault of the Archangel's lifelink only
   covers creatures already there when it resolves, so activate it after the attack triggers have made
   the tokens.
4. **Lifelink pays on any damage** (CR 702.15b), including damage to a blocker. Each source is its own
   gain (CR 702.15e), and double strike makes it two gains per creature.

## 3. Opening

**T1–T2:** Ocelot Pride, Mother of Runes, Elas il-Kor, Ainok Strike Leader, Voice of Victory, Super
Shredder, Throne of the God-Pharaoh, Intangible Virtue, Sol Ring, a Talisman, Swiftfoot Boots.

**T3:** Adeline, Anim Pakal, Krenko, Troubling Tribbles, Legion Warboss, Isshin, Windcrag Siege (choose
**Mardu**), Infantry Shield, Marauding Blight-Priest, Kambal, Welcoming Vampire, Caretaker's Talent.

**T4: Caesar**, or Neyali, Iroas or Sorin if Caesar can wait a turn. Caesar triggers on any attack, so a
turn-4 Neyali with two tokens already out can be the stronger play.

**T5+:** a token doubler (Mondrak, Elspeth, Anointed Procession), All-Out Assault, Grave Pact or Dictate,
South Wind Avatar, Alhammarret's Archive.

**Mulligans.** Keep 3 lands with 2 colours and one cheap creature. Caesar needs one other body to
sacrifice, and Ainok or Voice of Victory makes attacking tokens from turn 3.

## 4. Protecting Caesar

| Threat | Answer |
|---|---|
| Targeted destroy or damage | Swiftfoot Boots (hexproof), Mother of Runes, Mithril Coat, Deflecting Swat |
| Targeted exile | Boots, Mother of Runes or Deflecting Swat. Indestructible doesn't help. |
| Destroy wipe | Mithril Coat, Flawless Maneuver (free with Caesar out), Akroma's Will |
| Anything | Teferi's Protection |
| Instant-speed answers on your turn | Myrel and Voice of Victory: opponents can't cast spells during your turn |

Diamond City moves its shield counter onto Caesar on any turn two or more creatures entered.

## 5. The engines to look for

- **Neyali + Iroas.** Every attacking token has double strike and takes no damage, and menace means
  each one needs two blockers. All-Out Assault's deathtouch then kills whatever does block.
- **Sorin + South Wind Avatar + Marauding Blight-Priest.** Each attacking token that deals damage is
  one gain per damage step. With Neyali that's two gains, so each token makes every opponent lose 4,
  on top of its combat damage.
- **Isshin or Windcrag Siege + Caesar.** Two Caesar triggers, two sacrifices, four Soldiers. Ainok,
  Hero, Adeline, Anim Pakal, Myrel, Krenko and Infantry Shield's mobilize all trigger twice too.
- **Grave Pact or Dictate + Caesar.** Caesar's sacrifice on every attack makes each opponent sacrifice
  a creature, and so does every mobilize Warrior at end step.
- **Throne of the God-Pharaoh.** At your end step each opponent loses 1 per tapped creature you control.
  Caesar's tokens enter tapped, so a wide attack is a second drain at end step.
- **Alhammarret's Archive.** Every draw outside your draw step doubles: The One Ring, Caretaker's Talent,
  Welcoming Vampire, Idol of Oblivion, the monarch draw and Bloodline Recollector's six. Draws are
  mandatory, so watch your library on long Ring turns.
- **Super Shredder + Infantry Shield.** Its power becomes that many Warriors, and each one you sacrifice
  before damage gives it a counter.

## 6. Sequencing within your turn

1. **Upkeep:** Troubling Tribbles copies (mandatory), Court of Grace, The One Ring's life loss.
2. **Main 1:** equip Infantry Shield and Boots, cast doublers, Isshin and Neyali **before** combat.
   Cast Exalted Sunborn with warp now if you want its doubling this turn.
3. **Beginning of combat:** Legion Warboss's Goblin and Loyal Apprentice's Thopter arrive.
4. **Declare attackers.** Order the triggers so the token makers resolve first and the counters last:
   put **Myrel's, Commissar Raine's and Hero's battle cry** on the stack first, so they count the tokens
   Caesar, Adeline, Ainok and Anim Pakal make. Activate Vault of the Archangel after those tokens exist.
5. **Damage:** first-strike damage, then regular damage. Each step is a separate round of lifelink gains.
6. **Main 2:** cast Own the Day (it untaps the creatures you declared, not the tokens that entered
   attacking) or All-Out Assault (its extra combat needs it to enter in a main phase).
7. **End step:** put **Throne of the God-Pharaoh's trigger on the stack last**, so it resolves first,
   while the mobilize Warriors are still on the battlefield and tapped (CR 603.3b). Then the Warriors
   are sacrificed, and each one is a Grave Pact or Dictate trigger.

## 7. The kill

Say Caesar, Neyali, Sorin, South Wind Avatar, Marauding Blight-Priest, Mondrak and Adeline are out,
with two older tokens. Attack with Caesar and both tokens, and sacrifice one token to Caesar's trigger
for Soldiers: Mondrak turns two into four. Adeline makes a Human per opponent, doubled to six. That's
eleven attacking tokens with double strike. If they all deal damage, to players or blockers, that's 22
lifelink gains plus Caesar's own hit, and the two converters make each opponent lose about 46 from the
gains alone, before combat damage, Purphoros, Warleader's Call or Throne. Without the converters, the
same attack is still a lot of combat damage, and with Iroas out none of the attackers die.

## 8. Mistakes to avoid

- **Sorin's lifelink is only on your turn.** Blockers on opponents' turns don't gain life.
- **Iroas only protects attacking creatures.** Your board is exposed on opponents' turns.
- **Intangible Virtue gives tokens vigilance,** so tokens you declare as attackers stay untapped, and
  Throne doesn't count them. Caesar's own tokens enter tapped either way.
- **Own the Day only untaps creatures you declared.** Myrel's and Krenko's tokens are made untapped, so
  they can attack in the extra combat, but only if they have haste (Swiftfoot Boots is the only haste in
  the list; more haste is parked in `research/sideboard.md`).
- **Teferi's Protection phases out your whole board,** Throne and the converters included, until your
  next turn.
- **Never add Exquisite Blood or Bloodthirsty Conqueror.** Either one with a converter is an automatic
  infinite.
