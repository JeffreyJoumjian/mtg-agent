# 702. Keyword Abilities (part 1)
*Chapter 7 — Additional Rules*

702.1. Most abilities describe exactly what they do in the card’s rules text. Some, though, are very common or would require too much space to define on the card. In these cases, the object lists only the name of the ability as a “keyword”; sometimes reminder text summarizes the game rule.

702.1a If an effect refers to a “[keyword ability] cost,” it refers only to the variable costs for that keyword.
Example: Varolz, the Scar-Striped has an ability that says “Each creature card in your graveyard has scavenge. The scavenge cost is equal to its mana cost.” A creature card’s scavenge cost is an amount of mana equal to its mana cost, and the activation cost of the scavenge ability is that amount of mana plus “Exile this card from your graveyard.”

702.1b An effect that grants an object a keyword ability may define a variable in that ability based on characteristics of that object or other information about the game state. For these abilities, the value of that variable is constantly reevaluated.
Example: Volcano Hellion has the ability “This creature has echo {X}, where X is your life total.” If your life total is 10 when Volcano Hellion’s echo ability triggers but 5 when it resolves, the echo cost to pay is {5}.
Example: Fire//Ice is a split card whose halves have the mana costs {1}{R} and {1}{U}. Past in Flames reads “Each instant and sorcery card in your graveyard gains flashback until end of turn. The flashback cost is equal to its mana cost.” Fire//Ice has “Flashback {2}{U}{R}” while it is in your graveyard, but if you choose to cast Fire, the resulting spell has “Flashback {1}{R}.”

702.1c An effect may state that “the same is true for” a list of keyword abilities or similar. If one of those keyword abilities has variants or variables and the effect grants that keyword or counters of that keyword to one or more objects and/or players, it grants each appropriate variant and variable of that keyword.
Example: Concerted Effort is an enchantment that reads “At the beginning of each upkeep, creatures you control gain flying until end of turn if a creature you control has flying. The same is true for fear, first strike, double strike, landwalk, protection, trample, and vigilance.” As that triggered ability resolves, each landwalk and protection ability from among creatures you control is granted to each creature you control.

702.1d An effect may refer to an object “with [keyword ability]” or “that has [keyword ability].” This means the same thing as an object “with a [keyword ability] ability” or an object “that has a [keyword ability] ability.”

702.2. Deathtouch

702.2a Deathtouch is a static ability.

702.2b A creature with toughness greater than 0 that’s been dealt damage by a source with deathtouch since the last time state-based actions were checked is destroyed as a state-based action. See rule 704.

702.2c Any nonzero amount of combat damage assigned to a creature by a source with deathtouch is considered to be lethal damage for the purposes of determining if excess damage is being dealt.

702.2d The deathtouch rules function no matter what zone an object with deathtouch deals damage from.

702.2e If an object changes zones before an effect causes it to deal damage, its last known information is used to determine whether it had deathtouch.

702.2f Multiple instances of deathtouch on the same object are redundant.

702.3. Defender

702.3a Defender is a static ability.

702.3b A creature with defender can’t attack.

702.3c Multiple instances of defender on the same creature are redundant.

702.4. Double Strike

702.4a Double strike is a static ability that modifies the rules for the combat damage step. (See rule 510, “Combat Damage Step.”)

702.4b If at least one attacking or blocking creature has first strike (see rule 702.7) or double strike as the combat damage step begins, the only creatures that assign combat damage in that step are those with first strike or double strike. After that step, instead of proceeding to the end of combat step, the phase gets a second combat damage step. The only creatures that assign combat damage in that step are the remaining attackers and blockers that had neither first strike nor double strike as the first combat damage step began, as well as the remaining attackers and blockers that currently have double strike. After that step, the phase proceeds to the end of combat step.

702.4c Removing double strike from a creature during the first combat damage step will stop it from assigning combat damage in the second combat damage step.

702.4d Giving double strike to a creature with first strike after it has already dealt combat damage in the first combat damage step will allow the creature to assign combat damage in the second combat damage step.

702.4e Multiple instances of double strike on the same creature are redundant.

702.5. Enchant

702.5a Enchant is a static ability, written “Enchant [object or player].” The enchant ability restricts what an Aura spell can target and what an Aura can enchant.

702.5b For more information about Auras, see rule 303, “Enchantments.”

702.5c If an Aura has multiple instances of enchant, all of them apply. The Aura’s target must follow the restrictions from all the instances of enchant. The Aura can enchant only objects or players that match all of its enchant abilities.

702.5d Auras that can enchant a player can target and be attached to players. Such Auras can’t target permanents and can’t be attached to permanents.

702.6. Equip

702.6a Equip is an activated ability of Equipment cards. “Equip [cost]” means “[Cost]: Attach this permanent to target creature you control. Activate only as a sorcery.”

702.6b For more information about Equipment, see rule 301, “Artifacts.”

702.6c Equip abilities may further restrict what creatures may be chosen as legal targets. Such restrictions usually appear in the form “Equip [quality]” or “Equip [quality] creature.” These equip abilities may legally target only a creature that’s controlled by the player activating the ability and that has the chosen quality. Additional restrictions for an equip ability don’t restrict what the Equipment may be attached to.

702.6d If a permanent has multiple equip abilities, any of its equip abilities may be activated.

702.6e “Equip planeswalker” is a variant of the equip ability. “Equip planeswalker [cost]” means “[Cost]: Attach this permanent to target planeswalker you control as though that planeswalker were a creature. Activate only as a sorcery.”

702.7. First Strike

702.7a First strike is a static ability that modifies the rules for the combat damage step. (See rule 510, “Combat Damage Step.”)

702.7b If at least one attacking or blocking creature has first strike or double strike (see rule 702.4) as the combat damage step begins, the only creatures that assign combat damage in that step are those with first strike or double strike. After that step, instead of proceeding to the end of combat step, the phase gets a second combat damage step. The only creatures that assign combat damage in that step are the remaining attackers and blockers that had neither first strike nor double strike as the first combat damage step began, as well as the remaining attackers and blockers that currently have double strike. After that step, the phase proceeds to the end of combat step.

702.7c Giving first strike to a creature without it after combat damage has already been dealt in the first combat damage step won’t preclude that creature from assigning combat damage in the second combat damage step. Removing first strike from a creature after it has already dealt combat damage in the first combat damage step won’t allow it to also assign combat damage in the second combat damage step (unless the creature has double strike).

702.7d Multiple instances of first strike on the same creature are redundant.

702.8. Flash

702.8a Flash is a static ability that functions in any zone from which you could play the card it’s on. “Flash” means “You may play this card any time you could cast an instant.”

702.8b Multiple instances of flash on the same object are redundant.

702.9. Flying

702.9a Flying is an evasion ability.

702.9b A creature with flying can’t be blocked except by creatures with flying and/or reach. A creature with flying can block a creature with or without flying. (See rule 509, “Declare Blockers Step,” and rule 702.17, “Reach.”)

702.9c Multiple instances of flying on the same creature are redundant.

702.10. Haste

702.10a Haste is a static ability.

702.10b If a creature has haste, it can attack even if it hasn’t been controlled by its controller continuously since their most recent turn began. (See rule 302.6.)

702.10c If a creature has haste, its controller can activate its activated abilities whose cost includes the tap symbol or the untap symbol even if that creature hasn’t been controlled by that player continuously since their most recent turn began. (See rule 302.6.)

702.10d Multiple instances of haste on the same creature are redundant.

702.11. Hexproof

702.11a Hexproof is a static ability.

702.11b “Hexproof” on a permanent means “This permanent can’t be the target of spells or abilities your opponents control.”

702.11c “Hexproof” on a player means “You can’t be the target of spells or abilities your opponents control.”

702.11d “Hexproof from [quality]” is a variant of the hexproof ability. “Hexproof from [quality]” on a permanent means “This permanent can’t be the target of [quality] spells your opponents control or abilities your opponents control from [quality] sources.” A “hexproof from [quality]” ability is a hexproof ability.

702.11e Any effect that causes an object to lose hexproof will cause an object to lose all “hexproof from [quality]” abilities. Any effect that allows a player to choose a creature with hexproof as a target as though it didn’t have hexproof will allow a player to choose a creature with a “hexproof from [quality]” ability. Any effect that looks for a card with hexproof will find a card with a “hexproof from [quality]” ability.

702.11f “Hexproof from [quality A] and from [quality B]” is shorthand for “hexproof from [quality A]” and “hexproof from [quality B]”; it behaves as two separate hexproof abilities.

702.11g “Hexproof from each [characteristic]” is shorthand for “hexproof from [quality A],” “hexproof from [quality B],” and so on for each possible quality the listed characteristic could have; it behaves as multiple separate hexproof abilities.

702.11h Multiple instances of the same hexproof ability on the same permanent or player are redundant.

702.12. Indestructible

702.12a Indestructible is a static ability.

702.12b A permanent with indestructible can’t be destroyed. Such permanents aren’t destroyed by lethal damage, and they ignore the state-based action that checks for lethal damage (see rule 704.5g).

702.12c Multiple instances of indestructible on the same permanent are redundant.

702.13. Intimidate

702.13a Intimidate is an evasion ability.

702.13b A creature with intimidate can’t be blocked except by artifact creatures and/or creatures that share a color with it. (See rule 509, “Declare Blockers Step.”)

702.13c Multiple instances of intimidate on the same creature are redundant.

702.14. Landwalk

702.14a Landwalk is a generic term that appears within an object’s rules text as “[type]walk,” where [type] is usually a land type, but it can also be the card type land plus any combination of land types, card types, and/or supertypes.

702.14b Landwalk is an evasion ability.

702.14c A creature with landwalk can’t be blocked as long as the defending player controls at least one land with the specified land type (as in “islandwalk”), with the specified type or supertype (as in “artifact landwalk”), without the specified type or supertype (as in “nonbasic landwalk”), or with both the specified type or supertype and the specified subtype (as in “snow swampwalk”). (See rule 509, “Declare Blockers Step.”)

702.14d Landwalk abilities don’t “cancel” one another.
Example: If a player controls a snow Forest, that player can’t block an attacking creature with snow forestwalk even if they also control a creature with snow forestwalk.

702.14e Multiple instances of the same kind of landwalk on the same creature are redundant.

702.15. Lifelink

702.15a Lifelink is a static ability.

702.15b Damage dealt by a source with lifelink causes that source’s controller, or its owner if it has no controller, to gain that much life (in addition to any other results that damage causes). See rule 120.3.

702.15c If an object changes zones before an effect causes it to deal damage, its last known information is used to determine whether it had lifelink.

702.15d The lifelink rules function no matter what zone an object with lifelink deals damage from.

702.15e If multiple sources with lifelink deal damage at the same time, they cause separate life gain events (see rules 119.9–10).
Example: A player controls Ajani’s Pridemate, which reads “Whenever you gain life, put a +1/+1 counter on this creature,” and two creatures with lifelink. The creatures with lifelink deal combat damage simultaneously. Ajani’s Pridemate’s ability triggers twice.

702.15f Multiple instances of lifelink on the same object are redundant.

702.16. Protection

702.16a Protection is a static ability, written “Protection from [quality].” This quality is usually a color (as in “protection from black”) but can be any characteristic value or information. If the quality happens to be a card name, it is treated as such only if the protection ability specifies that the quality is a name. If the quality is a card type, subtype, or supertype, the ability applies to sources that are permanents with that card type, subtype, or supertype and to any sources not on the battlefield that are of that card type, subtype, or supertype. This is an exception to rule 109.2.

702.16b A permanent or player with protection can’t be targeted by spells with the stated quality and can’t be targeted by abilities from a source with the stated quality.

702.16c A permanent or player with protection can’t be enchanted by Auras that have the stated quality. Such Auras attached to the permanent or player with protection will be put into their owners’ graveyards as a state-based action. (See rule 704, “State-Based Actions.”)

702.16d A permanent with protection can’t be equipped by Equipment that have the stated quality or fortified by Fortifications that have the stated quality. Such Equipment or Fortifications become unattached from that permanent as a state-based action, but remain on the battlefield. (See rule 704, “State-Based Actions.”)

702.16e Any damage that would be dealt by sources that have the stated quality to a permanent or player with protection is prevented.

702.16f Attacking creatures with protection can’t be blocked by creatures that have the stated quality.

702.16g “Protection from [quality A] and from [quality B]” is shorthand for “protection from [quality A]” and “protection from [quality B]”; it behaves as two separate protection abilities.

702.16h “Protection from each [characteristic]” is shorthand for “protection from [quality A],” “protection from [quality B],” and so on for each possible quality the listed characteristic could have; it behaves as multiple separate protection abilities.

702.16i “Protection from each [set of characteristics, qualities, or players]” is shorthand for “protection from [A],” “protection from [B],” and so on for each characteristic, quality, or player in the set. It behaves as multiple separate protection abilities.

702.16j “Protection from everything” is a variant of the protection ability. A permanent or player with protection from everything has protection from each object regardless of that object’s characteristic values. Such a permanent or player can’t be targeted by spells or abilities and can’t be enchanted by Auras. Such a permanent can’t be equipped by Equipment, fortified by Fortifications, or blocked by creatures. All damage that would be dealt to such a permanent or player is prevented.

702.16k “Protection from [a player]” is a variant of the protection ability. A permanent or player with protection from a specific player has protection from each object that player controls and protection from each object that player owns not controlled by another player, regardless of that object’s characteristic values. Such a permanent or player can’t be targeted by spells or abilities the specified player controls and can’t be enchanted by Auras that player controls. Such a permanent can’t be equipped by Equipment that player controls, fortified by Fortifications that player controls, or blocked by creatures that player controls. All damage that would be dealt to such a permanent or player by sources controlled by the specified player or owned by that player but not controlled by another player is prevented.

702.16m Multiple instances of protection from the same quality on the same permanent or player are redundant.

702.16n Some Auras both give the enchanted creature protection from a quality and say “this effect doesn’t remove” either that specific Aura or all Auras. This means that the specified Auras aren’t put into their owners’ graveyards as a state-based action. If the creature has other instances of protection from the same quality, those instances affect Auras as normal.

702.16p One Aura (Benevolent Blessing) gives the enchanted creature protection from a quality and says the effect doesn’t remove certain permanents that are “already attached to” that creature. This means that, when the protection effect starts to apply, any objects with the stated quality that are already attached to that creature (including the Aura giving that creature protection) will not be put into their owners’ graveyards as a state-based action. Other permanents with the stated quality can’t become attached to the creature. If the creature has other instances of protection from the same quality, those instances affect attached permanents as normal.

702.17. Reach

702.17a Reach is a static ability.

702.17b A creature with flying can’t be blocked except by creatures with flying and/or reach. (See rule 509, “Declare Blockers Step,” and rule 702.9, “Flying.”)

702.17c Multiple instances of reach on the same creature are redundant.

702.18. Shroud

702.18a Shroud is a static ability. “Shroud” means “This permanent or player can’t be the target of spells or abilities.”

702.18b Multiple instances of shroud on the same permanent or player are redundant.

702.19. Trample

702.19a Trample is a static ability that modifies the rules for assigning an attacking creature’s combat damage. The ability has no effect when a creature with trample is blocking or is dealing noncombat damage. (See rule 510, “Combat Damage Step.”)

702.19b The controller of an attacking creature with trample first assigns damage to the creature(s) blocking it. Once all those blocking creatures are assigned lethal damage, any excess damage is assigned as its controller chooses among those blocking creatures and the player, planeswalker, or battle the creature is attacking. When checking for assigned lethal damage, take into account damage already marked on the creature and damage from other creatures that’s being assigned during the same combat damage step, but not any abilities or effects that might change the amount of damage that’s actually dealt. The attacking creature’s controller need not assign lethal damage to all those blocking creatures but in that case can’t assign any damage to the player or planeswalker it’s attacking.
Example: A 2/2 creature that can block an additional creature blocks two attackers: a 1/1 with no abilities and a 3/3 with trample. The active player could assign 1 damage from the first attacker and 1 damage from the second to the blocking creature, and 2 damage to the defending player from the creature with trample.
Example: A 6/6 green creature with trample is blocked by a 2/2 creature with protection from green. The attacking creature’s controller must assign at least 2 damage to the blocker, even though that damage will be prevented by the blocker’s protection ability. The attacking creature’s controller can divide the rest of the damage as they choose between the blocking creature and the defending player.

702.19c Trample over planeswalkers is a variant of trample that modifies the rules for assigning combat damage to planeswalkers. The controller of a creature with trample over planeswalkers assigns that creature’s combat damage as described in rule 702.19b, with one exception. If that creature is attacking a planeswalker, after lethal damage is assigned to all blocking creatures and damage at least equal to the loyalty of the planeswalker the creature is attacking is assigned to that planeswalker, further excess damage may be assigned as the attacking creature’s controller chooses among those blocking creatures, that planeswalker, and that planeswalker’s controller. When checking for assigned damage equal to a planeswalker’s loyalty, take into account damage from other creatures that’s being assigned during the same combat damage step, but not any abilities or effects that might change the amount of damage that’s actually dealt.
Example: A player controls a planeswalker with three loyalty counters that is being attacked by a 1/1 with no abilities and a 7/7 with trample over planeswalkers. The active player could assign 1 damage from the first attacker and 2 damage from the second to the planeswalker and 5 damage to the defending player from the creature with trample over planeswalkers.

702.19d If an attacking creature with trample or trample over planeswalkers is blocked, but there are no creatures blocking it when damage is assigned, its damage is assigned to the defending player and/or planeswalker as though all blocking creatures have been assigned lethal damage.

702.19e If a creature with trample over planeswalkers is attacking a planeswalker and that planeswalker is removed from combat, the creature’s damage may be assigned to the defending player once all blocking creatures have been dealt lethal damage or, if there are no blocking creatures when damage is assigned, all its damage is assigned to the defending player. This is an exception to rule 506.4c, and it does not cause the creature to be attacking that player.

702.19f If a creature without trample over planeswalkers is attacking a planeswalker, none of its combat damage can be assigned to the defending player, even if that planeswalker has been removed from combat or the damage the attacking creature could assign is greater than the planeswalker’s loyalty.

702.19g Multiple instances of trample on the same creature are redundant. Multiple instances of trample over planeswalkers on the same creature are redundant.

702.20. Vigilance

702.20a Vigilance is a static ability that modifies the rules for the declare attackers step.

702.20b Attacking doesn’t cause creatures with vigilance to tap. (See rule 508, “Declare Attackers Step.”)

702.20c Multiple instances of vigilance on the same creature are redundant.

702.21. Ward

702.21a Ward is a triggered ability. Ward [cost] means “Whenever this permanent becomes the target of a spell or ability an opponent controls, counter that spell or ability unless that player pays [cost].”

702.21b Some ward abilities include an X in their cost and state what X is equal to. This value is determined at the time the ability resolves, not locked in as the ability triggers.

702.22. Banding

702.22a Banding is a static ability that modifies the rules for combat.

702.22b “Bands with other” is a special form of banding. If an effect causes a permanent to lose banding, the permanent loses all “bands with other” abilities as well.

702.22c As a player declares attackers, they may declare that one or more attacking creatures with banding and up to one attacking creature without banding (even if it has “bands with other”) are all in a “band.” They may also declare that one or more attacking [quality] creatures with “bands with other [quality]” and any number of other attacking [quality] creatures are all in a band. A player may declare as many attacking bands as they want, but each creature may be a member of only one of them. (Defending players can’t declare bands but may use banding in a different way; see rule 702.22j.)

702.22d All creatures in an attacking band must attack the same player, planeswalker, or battle.

702.22e Once an attacking band has been announced, it lasts for the rest of combat, even if something later removes banding or “bands with other” from one or more of the creatures in the band.

702.22f An attacking creature that’s removed from combat is also removed from the band it was in.

702.22g Banding doesn’t cause attacking creatures to share abilities, nor does it remove any abilities. The attacking creatures in a band are separate permanents.

702.22h If an attacking creature becomes blocked by a creature, each other creature in the same band as the attacking creature becomes blocked by that same blocking creature.
Example: A player attacks with a band consisting of a creature with flying and a creature with swampwalk. The defending player, who controls a Swamp, can block the flying creature if able. If they do, then the creature with swampwalk will also become blocked by the blocking creature(s).

702.22i If one member of a band would become blocked due to an effect, the entire band becomes blocked.

702.22j During the combat damage step, if an attacking creature is being blocked by a creature with banding, or by both a [quality] creature with “bands with other [quality]” and another [quality] creature, the defending player (rather than the active player) chooses how the attacking creature’s damage is assigned. That player can divide that creature’s combat damage as they choose among any creatures blocking it. This is an exception to the procedure described in rule 510.1c.

702.22k During the combat damage step, if a blocking creature is blocking a creature with banding, or both a [quality] creature with “bands with other [quality]” and another [quality] creature, the active player (rather than the defending player) chooses how the blocking creature’s damage is assigned. That player can divide that creature’s combat damage as they choose among any creatures it’s blocking. This is an exception to the procedure described in rule 510.1d.

702.22m Multiple instances of banding on the same creature are redundant. Multiple instances of “bands with other” of the same kind on the same creature are redundant.

702.23. Rampage

702.23a Rampage is a triggered ability. “Rampage N” means “Whenever this creature becomes blocked, it gets +N/+N until end of turn for each creature blocking it beyond the first.” (See rule 509, “Declare Blockers Step.”)

702.23b The rampage bonus is calculated only once per combat, when the triggered ability resolves. Adding or removing blockers later in combat won’t change the bonus.

702.23c If a creature has multiple instances of rampage, each triggers separately.

702.24. Cumulative Upkeep

702.24a Cumulative upkeep is a triggered ability that imposes an increasing cost on a permanent. “Cumulative upkeep [cost]” means “At the beginning of your upkeep, if this permanent is on the battlefield, put an age counter on this permanent. Then you may pay [cost] for each age counter on it. If you don’t, sacrifice it.” If [cost] has choices associated with it, each choice is made separately for each age counter, then either the entire set of costs is paid, or none of them is paid. Partial payments aren’t allowed.
Example: A creature has “Cumulative upkeep {W} or {U}” and two age counters on it. When its ability next triggers and resolves, the creature’s controller puts an age counter on it and then may pay {W}{W}{W}, {W}{W}{U}, {W}{U}{U}, or {U}{U}{U} to keep the creature on the battlefield.
Example: A creature has “Cumulative upkeep—Sacrifice a creature” and one age counter on it. When its ability next triggers and resolves, its controller can’t choose the same creature to sacrifice twice. Either two different creatures must be sacrificed, or the creature with cumulative upkeep must be sacrificed.

702.24b If a permanent has multiple instances of cumulative upkeep, each triggers separately. However, the age counters are not connected to any particular ability; each cumulative upkeep ability will count the total number of age counters on the permanent at the time that ability resolves.
Example: A creature has two instances of “Cumulative upkeep—Pay 1 life.” The creature has no age counters, and both cumulative upkeep abilities trigger. When the first ability resolves, the controller adds a counter and then chooses to pay 1 life. When the second ability resolves, the controller adds another counter and then chooses to pay an additional 2 life.

702.25. Flanking

702.25a Flanking is a triggered ability that triggers during the declare blockers step. (See rule 509, “Declare Blockers Step.”) “Flanking” means “Whenever this creature becomes blocked by a creature without flanking, the blocking creature gets -1/-1 until end of turn.”

702.25b If a creature has multiple instances of flanking, each triggers separately.

702.26. Phasing

702.26a Phasing is a static ability that modifies the rules of the untap step. During each player’s untap step, before the active player untaps permanents, all phased-in permanents with phasing that player controls “phase out.” Simultaneously, all phased-out permanents that had phased out under that player’s control “phase in.”

702.26b If a permanent phases out, its status changes to “phased out.” Except for rules and effects that specifically mention phased-out permanents, a phased-out permanent is treated as though it does not exist. It can’t affect or be affected by anything else in the game. A permanent that phases out is removed from combat. (See rule 506.4.)
Example: You control three creatures, one of which is phased out. You cast a spell that says “Draw a card for each creature you control.” You draw two cards.
Example: You control a phased-out creature. You cast a spell that says “Destroy all creatures.” The phased-out creature is not destroyed.

702.26c If a permanent phases in, its status changes to “phased in.” The game once again treats it as though it exists.

702.26d The phasing event doesn’t actually cause a permanent to change zones or control, even though it’s treated as though it’s not on the battlefield and not under its controller’s control while it’s phased out. Zone-change triggers don’t trigger when a permanent phases in or out. Tokens continue to exist on the battlefield while phased out. Counters and stickers remain on a permanent while it’s phased out. Effects that check a phased-in permanent’s history won’t treat the phasing event as having caused the permanent to leave or enter the battlefield or its controller’s control.

702.26e If a continuous effect generated by the resolution of a spell or ability modifies the characteristics or changes the controller of any objects, a phased-out permanent won’t be included in the set of affected objects. This includes continuous effects that reference the permanent specifically, unless they also specifically refer to the permanent as phased out.

702.26f Continuous effects that affect a phased-out permanent may expire while that permanent is phased out. If so, they will no longer affect that permanent once it’s phased in. In particular, effects with “for as long as” durations that track that permanent (see rule 611.2b) end when that permanent phases out because they can no longer see it.

702.26g When a permanent phases out, any Auras, Equipment, or Fortifications attached to that permanent phase out at the same time. This alternate way of phasing out is known as phasing out “indirectly.” An Aura, Equipment, or Fortification that phased out indirectly won’t phase in by itself, but instead phases in along with the permanent it’s attached to.

702.26h If an object would simultaneously phase out directly and indirectly, it just phases out indirectly.

702.26i An Aura, Equipment, or Fortification that phased out directly will phase in attached to the object or player it was attached to when it phased out, if that object is still in the same zone or that player is still in the game. If not, that Aura, Equipment, or Fortification phases in unattached. State-based actions apply as appropriate. (See rules 704.5m and 704.5n.)

702.26j Abilities that trigger when a permanent becomes attached or unattached from an object or player don’t trigger when that permanent phases in or out.

702.26k Phased-out permanents owned by a player who leaves the game also leave the game. This doesn’t cause zone-change abilities to trigger. See rule 800.4.

702.26m If an effect causes a player to skip their untap step, the phasing event simply doesn’t occur that turn.

702.26n In a multiplayer game, game rules may cause a phased-out permanent to leave the game or to be exiled once a player leaves the game. (See rules 800.4a and 800.4c.) If a phased-out permanent phased out under the control of a player who has left the game, that permanent phases in during the next untap step after that player’s next turn would have begun.

702.26p Multiple instances of phasing on the same permanent are redundant.

702.27. Buyback

702.27a Buyback appears on some instants and sorceries. It represents two static abilities that function while the spell is on the stack. “Buyback [cost]” means “You may pay an additional [cost] as you cast this spell” and “If the buyback cost was paid, put this spell into its owner’s hand instead of into that player’s graveyard as it resolves.” Paying a spell’s buyback cost follows the rules for paying additional costs in rules 601.2b and 601.2f–h.

702.28. Shadow

702.28a Shadow is an evasion ability.

702.28b A creature with shadow can’t be blocked by creatures without shadow, and a creature without shadow can’t be blocked by creatures with shadow. (See rule 509, “Declare Blockers Step.”)

702.28c Multiple instances of shadow on the same creature are redundant.

702.29. Cycling

702.29a Cycling is an activated ability that functions only while the card with cycling is in a player’s hand. “Cycling [cost]” means “[Cost], Discard this card: Draw a card.”

702.29b Although the cycling ability can be activated only if the card is in a player’s hand, it continues to exist while the object is on the battlefield and in all other zones. Therefore objects with cycling will be affected by effects that depend on objects having one or more activated abilities.

702.29c Some cards with cycling have abilities that trigger when they’re cycled. “When you cycle this card” means “When you discard this card to pay an activation cost of a cycling ability.” These abilities trigger from whatever zone the card winds up in after it’s cycled.

702.29d Some cards have abilities that trigger whenever a player “cycles or discards” a card. These abilities trigger only once when a card is cycled.

702.29e Typecycling is a variant of the cycling ability. “[Type]cycling [cost]” means “[Cost], Discard this card: Search your library for a [type] card, reveal it, and put it into your hand. Then shuffle your library.” This type is usually a subtype (as in “mountaincycling”) but can be any card type, subtype, supertype, or combination thereof (as in “basic landcycling”).

702.29f Typecycling abilities are cycling abilities, and typecycling costs are cycling costs. Any cards that trigger when a player cycles a card will trigger when a card is discarded to pay an activation cost of a typecycling ability. Any effect that stops players from cycling cards will stop players from activating cards’ typecycling abilities. Any effect that increases or reduces a cycling cost will increase or reduce a typecycling cost. Any effect that looks for a card with cycling will find a card with typecycling.

702.30. Echo

702.30a Echo is a triggered ability. “Echo [cost]” means “At the beginning of your upkeep, if this permanent came under your control since the beginning of your last upkeep, sacrifice it unless you pay [cost].”

702.30b Urza block cards with the echo ability were printed without an echo cost. These cards have been given errata in the Oracle card reference; each one now has an echo cost equal to its mana cost.

702.31. Horsemanship

702.31a Horsemanship is an evasion ability.

702.31b A creature with horsemanship can’t be blocked by creatures without horsemanship. A creature with horsemanship can block a creature with or without horsemanship. (See rule 509, “Declare Blockers Step.”)

702.31c Multiple instances of horsemanship on the same creature are redundant.

702.32. Fading

702.32a Fading is a keyword that represents two abilities. “Fading N” means “This permanent enters with N fade counters on it” and “At the beginning of your upkeep, remove a fade counter from this permanent. If you can’t, sacrifice the permanent.”

702.33. Kicker

702.33a Kicker is a static ability that functions while the spell with kicker is on the stack. “Kicker [cost]” means “You may pay an additional [cost] as you cast this spell.” Paying a spell’s kicker cost(s) follows the rules for paying additional costs in rules 601.2b and 601.2f–h.

702.33b The phrase “Kicker [cost 1] and/or [cost 2]” means the same thing as “Kicker [cost 1], kicker [cost 2].”

702.33c Multikicker is a variant of the kicker ability. “Multikicker [cost]” means “You may pay an additional [cost] any number of times as you cast this spell.” A multikicker cost is a kicker cost.

702.33d If a spell’s controller declares the intention to pay any of that spell’s kicker costs, that spell has been “kicked.” If a spell has two kicker costs or has multikicker, it may be kicked multiple times. See rule 601.2b.

702.33e Objects with kicker or multikicker have additional abilities that specify what happens if they were kicked. These abilities are linked to the kicker or multikicker abilities printed on that object: they can refer only to those specific kicker or multikicker abilities. See rule 607, “Linked Abilities.”

702.33f Objects with more than one kicker cost may also have abilities that each correspond to a specific kicker cost. Those abilities contain the phrases “if it was kicked with its [A] kicker” and “if it was kicked with its [B] kicker,” where A and B are the first and second kicker costs listed on the card, respectively. Each of those abilities is linked to the appropriate kicker ability.

702.33g If part of a spell’s ability has its effect only if that spell was kicked, and that part of the ability includes any targets, the spell’s controller chooses those targets only if that spell was kicked. Otherwise, the spell is cast as if it did not have those targets. See rule 601.2c.

702.33h Sticker kicker is a keyword ability that represents a kicker ability and an ability that imposes an additional cost if the spell is kicked. “Sticker kicker [cost]” means “Kicker [cost]” and “As an additional cost to cast this spell, if it’s kicked, you get a ticket counter and you may put a sticker on this spell.”

702.34. Flashback

702.34a Flashback appears on some instants and sorceries. It represents two static abilities: one that functions while the card is in a player’s graveyard and another that functions while the card is on the stack. “Flashback [cost]” means “You may cast this card from your graveyard if the resulting spell is an instant or sorcery spell by paying [cost] rather than paying its mana cost” and “If the flashback cost was paid, exile this card instead of putting it anywhere else any time it would leave the stack.” Casting a spell using its flashback ability follows the rules for paying alternative costs in rules 601.2b and 601.2f–h.
