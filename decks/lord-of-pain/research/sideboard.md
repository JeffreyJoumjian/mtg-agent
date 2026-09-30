# The Lord of Pain — Sideboard & Bracket 3 swaps

Card names link to Scryfall. `DECK.md` is the Bracket 4 list and the source of truth; every row here
names the card it **displaces** so a swap is never ambiguous.

## Bracket 4 → Bracket 3 (derived — `DECK-B3.md`)

Re-derive with: `diff <(grep -E '^[0-9]+x ' DECK.md | sort) <(grep -E '^[0-9]+x ' DECK-B3.md | sort)`
— it must show exactly these seven swaps and nothing else.

| Out (B4) | In (B3) | Why |
|---|---|---|
| [Sanguine Bond](https://scryfall.com/search?q=%21%22Sanguine+Bond%22) | [Shadowspear](https://scryfall.com/search?q=%21%22Shadowspear%22) | Bond + [Exquisite Blood](https://scryfall.com/search?q=%21%22Exquisite+Blood%22) (or + [Bloodthirsty Conqueror](https://scryfall.com/search?q=%21%22Bloodthirsty+Conqueror%22)) is a two-card infinite. Removing Bond removes both loops; Shadowspear is a second lifelink equipment for the commander (+1/+1, trample, strips hexproof/indestructible). |
| [Ancient Tomb](https://scryfall.com/search?q=%21%22Ancient+Tomb%22) | Swamp | Game Changer. |
| [Vampiric Tutor](https://scryfall.com/search?q=%21%22Vampiric+Tutor%22) | [Imp's Mischief](https://scryfall.com/search?q=%21%22Imp%27s+Mischief%22) | Game Changer, and B3 wants tutors sparse. Mischief is the redirect behind Deflecting Swat (Bolt Bend went pocket 2026-09-22). |
| [Glacial Chasm](https://scryfall.com/search?q=%21%22Glacial+Chasm%22) | [Leechridden Swamp](https://scryfall.com/search?q=%21%22Leechridden+Swamp%22) | Game Changer (Scryfall flags it — easy to miss on a land). |
| [Mana Vault](https://scryfall.com/search?q=%21%22Mana+Vault%22) | [Mind Stone](https://scryfall.com/search?q=%21%22Mind+Stone%22) | Game Changer. Mind Stone is the non-GC 2-drop that also cashes in for a card late. |
| [Grim Monolith](https://scryfall.com/search?q=%21%22Grim+Monolith%22) | [Basalt Monolith](https://scryfall.com/search?q=%21%22Basalt+Monolith%22) | Game Changer. Basalt is the same card one mana up with a {3} untap instead of {4} — the cleanest like-for-like in the format. |
| [Mox Diamond](https://scryfall.com/search?q=%21%22Mox+Diamond%22) | [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) | Game Changer. Vessel is a second no-maximum-hand-size effect behind Reliquary Tower, which matters at 6+ draws a turn. |

B3 keeps [Demonic Tutor](https://scryfall.com/search?q=%21%22Demonic+Tutor%22), [Jeska's Will](https://scryfall.com/search?q=%21%22Jeska%27s+Will%22), [Orcish Bowmasters](https://scryfall.com/search?q=%21%22Orcish+Bowmasters%22) = 3/3 Game Changers.
It still contains two non-infinite two-card kills — [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22) + [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22), and [Heartless Hidetsugu](https://scryfall.com/search?q=%21%22Heartless+Hidetsugu%22) under [Solphim, Mayhem Dominus](https://scryfall.com/search?q=%21%22Solphim%2C+Mayhem+Dominus%22) / [Twinflame Tyrant](https://scryfall.com/search?q=%21%22Twinflame+Tyrant%22) — the bracket rule is about *infinite* combos, but say so at a B3 table.

## Pocket sideboard (swap per table)

| Card | Bring in when… | Displaces |
|---|---|---|
| [Teferi's Puzzle Box](https://scryfall.com/search?q=%21%22Teferi%27s+Puzzle+Box%22) | Chaos-friendly, counter-light tables — the highest-ceiling gift (hand+3 punished draws per player per turn), but you can't carry a held answer past your own draw step. Went out 2026-08-24 for Hexing Squelcher. | [Hexing Squelcher](https://scryfall.com/search?q=%21%22Hexing+Squelcher%22) |
| [Shadowspear](https://scryfall.com/search?q=%21%22Shadowspear%22) | You want a second lifelink equipment for the commander (already the B3 Sanguine swap). | [Hexing Squelcher](https://scryfall.com/search?q=%21%22Hexing+Squelcher%22) |
| [Bloodchief Ascension](https://scryfall.com/search?q=%21%22Bloodchief+Ascension%22) | Grindy pod — arms in 3 end steps here, then 2 per card into their graveyard (14 per wheel, every discard to Quandary). Went out 2026-08-23 for Whip of Erebos. | [Seizan, Perverter of Truth](https://scryfall.com/search?q=%21%22Seizan%2C+Perverter+of+Truth%22) |
| [Burning Inquiry](https://scryfall.com/search?q=%21%22Burning+Inquiry%22) | You want a 1-mana wheel-lite: 3 draws × punishers per opponent. Went out 2026-08-23 for Basilisk Collar. | [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22) |
| [Leechridden Swamp](https://scryfall.com/search?q=%21%22Leechridden+Swamp%22) | B3 tables (Glacial Chasm is a Game Changer) or when you want the 35th land to tap for mana. | [Glacial Chasm](https://scryfall.com/search?q=%21%22Glacial+Chasm%22) |
| [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) | You need haste + shroud more than you need to target your own commander (Coat's attach, Collar equip, Witch's Clinic all target). | [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) |
| [Imp's Mischief](https://scryfall.com/search?q=%21%22Imp%27s+Mischief%22) | Combo/counter-heavy pod — second redirect (spells only, costs life = MV; already the B3 Vampiric swap). | [Vial Smasher the Fierce](https://scryfall.com/search?q=%21%22Vial+Smasher+the+Fierce%22) |
| [Brash Taunter](https://scryfall.com/search?q=%21%22Brash+Taunter%22) | Creature-heavy pod — Taunter + [Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22) is 13 (×2 Solphim, +2 Torbran) to one player. | [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22) |
| [Kardur, Doomscourge](https://scryfall.com/search?q=%21%22Kardur%2C+Doomscourge%22) | Pod full of go-wide attackers; goad + drain. | [No Mercy](https://scryfall.com/search?q=%21%22No+Mercy%22) |
| [Mindcrank](https://scryfall.com/search?q=%21%22Mindcrank%22) | B4 only — two-card infinite with [Bloodchief Ascension](https://scryfall.com/search?q=%21%22Bloodchief+Ascension%22) (bring both in) once it has 3 counters. | [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22) + Seizan |
| [Wheel of Misfortune](https://scryfall.com/search?q=%21%22Wheel+of+Misfortune%22) | You want a second real wheel; it also punishes whoever bids highest. | [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22) |
| [Stormfist Crusader](https://scryfall.com/search?q=%21%22Stormfist+Crusader%22) | Lower-curve pod where a 2-drop gift/ping matters more than Seizan's 5. | [Seizan, Perverter of Truth](https://scryfall.com/search?q=%21%22Seizan%2C+Perverter+of+Truth%22) |
| [Master of the Feast](https://scryfall.com/search?q=%21%22Master+of+the+Feast%22) | You want a pure "here, have a card" body (5/5 flier) over a ramp piece. | [Dark Ritual](https://scryfall.com/search?q=%21%22Dark+Ritual%22) |
| [Court of Ambition](https://scryfall.com/search?q=%21%22Court+of+Ambition%22) | Grindy pods — 3 life or a discard per opponent per upkeep; monarch baits attacks away from you. | [Manabarbs](https://scryfall.com/search?q=%21%22Manabarbs%22) |
| [Wild Evocation](https://scryfall.com/search?q=%21%22Wild+Evocation%22) | Chaos table — every upkeep each player is forced to cast a random card: Lord + Kaervek + Quandary all trigger. Hurts your own X-spells (X=0). | [Seizan, Perverter of Truth](https://scryfall.com/search?q=%21%22Seizan%2C+Perverter+of+Truth%22) |
| [Tempting Contract](https://scryfall.com/search?q=%21%22Tempting+Contract%22) | You want the Treasure gift back (bigger opposing spells → bigger Lord/Kaervek hits; up to +3 Treasures a turn for you). Went out 2026-08-23 for Rakdos, Lord of Riots. | [Rakdos, Lord of Riots](https://scryfall.com/search?q=%21%22Rakdos%2C+Lord+of+Riots%22) |
| [Repercussion](https://scryfall.com/search?q=%21%22Repercussion%22) | Opponents are creature-heavy and you are not — with Blasphemous Act it is 13 × their creatures to each of them (and 13 × yours to you). | [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22) |
| [Ob Nixilis, the Hate-Twisted](https://scryfall.com/search?q=%21%22Ob+Nixilis%2C+the+Hate-Twisted%22) | You want an 8th draw-punisher that doubles as removal. | [Manabarbs](https://scryfall.com/search?q=%21%22Manabarbs%22) |
| [Archfiend of Despair](https://scryfall.com/search?q=%21%22Archfiend+of+Despair%22) | Second Wound Reflection for long games with Cabal Coffers online. | [Wound Reflection](https://scryfall.com/search?q=%21%22Wound+Reflection%22) (or run both) |
| [Kefka, Dancing Mad](https://scryfall.com/search?q=%21%22Kefka%2C+Dancing+Mad%22) | You want the "I cast your cards and you pay for them" finisher. | [Heartless Hidetsugu](https://scryfall.com/search?q=%21%22Heartless+Hidetsugu%22) |
| [Chandra, Awakened Inferno](https://scryfall.com/search?q=%21%22Chandra%2C+Awakened+Inferno%22) | Enchantment-removal-heavy pods — emblems can't be answered. | [Manabarbs](https://scryfall.com/search?q=%21%22Manabarbs%22) |
| [Withering Torment](https://scryfall.com/search?q=%21%22Withering+Torment%22) | Extra enchantment answer (Leyline of Sanctity, Aegis of the Gods blank the commander's trigger). | [Feed the Swarm](https://scryfall.com/search?q=%21%22Feed+the+Swarm%22) |
| [Scrawling Crawler](https://scryfall.com/search?q=%21%22Scrawling+Crawler%22) | Grindy pod with no amplifier in sight — its 1 life per opponent draw is **life loss**, so Solphim/Torbran/Torture Pit can't multiply it, and its value collapses exactly when the deck is winning. Went out 2026-09-22 for fast mana. | [Grim Monolith](https://scryfall.com/search?q=%21%22Grim+Monolith%22) |
| [Bolt Bend](https://scryfall.com/search?q=%21%22Bolt+Bend%22) | You want a third redirect behind Deflecting Swat; {R} with the commander out. Single-target spells only. Went out 2026-09-22 for fast mana. | [Mox Diamond](https://scryfall.com/search?q=%21%22Mox+Diamond%22) |
| [Mana Flare](https://scryfall.com/search?q=%21%22Mana+Flare%22) | Table where the extra mana genuinely poisons them more than it helps them (Manabarbs + Kaervek out early). Went out 2026-09-22 — it gives three opponents what it gives you. | [Dark Ritual](https://scryfall.com/search?q=%21%22Dark+Ritual%22) |
| [Bojuka Bog](https://scryfall.com/search?q=%21%22Bojuka+Bog%22) | Reanimator at the table and you want a second graveyard exile behind [Rakdos Charm](https://scryfall.com/search?q=%21%22Rakdos+Charm%22). Went out 2026-09-22 as the 34th land (enters tapped). | [Mana Vault](https://scryfall.com/search?q=%21%22Mana+Vault%22) |
