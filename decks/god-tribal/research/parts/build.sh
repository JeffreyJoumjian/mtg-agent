#!/usr/bin/env bash
# Re-assemble decks/god-tribal/DECK-*.md from the part files here. Run from decks/god-tribal/.
# DECK-*.md are DERIVED (deck-brain §1.4) — edit research/parts/*.txt, then: bash research/parts/build.sh
set -euo pipefail
P=research/parts
five() { # slug "Commander" Title "blurb"
cat > "DECK-$(echo "$1" | tr a-z A-Z).md" <<EOT
# God Tribal — $3

Commander: $2 (WUBRG)
Bracket: 3   ·   Total: 100/100   ·   Variant of the god-tribal build-off (see research/comparison.md)

Game Changers (3/3): $5

> $4
>
> Shared 5C shell with the other four variants (lands / ramp / tribal payoffs / interaction / draw
> are identical) so the commander and its God selection are the only variables. Assembled from
> research/parts/ by research/parts/build.sh — edit the parts, not this file.

## Commander (1)

1x $2

## Lands (38)

$(cat $P/5c-lands.txt)

## Ramp (12)

$(cat $P/5c-ramp.txt)

## Tribal Payoffs (6)

$(cat $P/5c-tribal.txt)

## Interaction (8)

$(cat $P/5c-interaction.txt)

## Card Draw (3)

$(cat $P/5c-draw.txt)

## Commander Package ($(grep -c '^1x' $P/$1-package.txt))

$(cat $P/$1-package.txt)

## Gods ($(grep -c '^1x' $P/$1-gods.txt))

$(cat $P/$1-gods.txt)
EOT
}
five sisay "Sisay, Weatherlight Captain" "Sisay" "**Gameplan:** Sisay grows with every colour among your other legends and tutors any legendary permanent straight onto the battlefield for WUBRG. Cheap Gods across all five colours turn her on fast; Captain Sisay and Time of Need are backup tutors; Konda's Banner and Godsend are the legendary Equipment toolbox she can fetch." "Rhystic Study · Smothering Tithe · Cyclonic Rift"
five jodah "Jodah, the Unifier" "Jodah" "**Gameplan:** Every legendary creature gets +X/+X for X legends you control, and each legendary spell cast from hand chains a free cheaper legend off the top. The God curve is deliberately HIGH so chains hit; Day of Destiny / Heroes' Podium / Arvad stack anthems on the same board." "Rhystic Study · Smothering Tithe · Cyclonic Rift"
five esika "Esika, God of the Tree" "Esika" "**Gameplan:** Front face makes every legend a rainbow mana source; back face (The Prismatic Bridge, WUBRG) cheats a creature onto the battlefield every upkeep. The God selection is BOMBS the Bridge can cheat — Zodiark (BBBBB), The Capitoline Triad (10), Myrkul, Asmodeus — plus Thran Temporal Gateway to cheat from hand." "Rhystic Study · Smothering Tithe · Fierce Guardianship"
five morophon "Morophon, the Boundless" "Morophon" "**Gameplan:** Name God: every God loses one pip of each colour — so 61 of the 95 become FULLY GENERIC and cast off any land. Morophon is a colour-fixer, not a discount; he deletes the five-colour manabase problem. The God selection is the best REAL CREATURES among the 61 (plus one-pip God-Eternals and four indestructible statics). Everything hinges on the 7-drop resolving: Ancient Tomb + Mana Vault, Skyshroud Claim, Kodama's Reach, and Swiftfoot Boots + Tyrite Sanctum to keep him alive." "Rhystic Study · Ancient Tomb · Mana Vault"
cat > DECK-KRATOS-ATREUS.md <<EOT
# God Tribal — Kratos + Atreus

Commanders: Kratos, Stoic Father + Atreus, Impulsive Son (Partner — Father & son) (URW)
Bracket: 3   ·   Total: 100/100   ·   Variant of the god-tribal build-off (see research/comparison.md)

Game Changers (3/3): Rhystic Study · Cyclonic Rift · Fierce Guardianship

> **Gameplan:** Kratos banks an experience counter whenever Gods attack and whenever a God dies —
> counters are permanent and survive everything. Atreus cashes them: {3},{T}: draw that many,
> then 2 damage to each opponent. Roaming Throne naming God DOUBLES Kratos's triggers (he is a
> God). The untap package (Elixir, Magewright's Stone, Unstoppable Plan, Minamo) fires Atreus
> several times a round. God-Eternals and the Ojer cycle die and come back for repeat experience.
> Jeskai shell — the only variant not on the 5C base.

## Commander (2)

1x Kratos, Stoic Father
1x Atreus, Impulsive Son

## Lands (35)

$(cat $P/kratos-lands.txt)

$(cat $P/kratos-shell.txt)

## Gods (31)

$(cat $P/kratos-gods.txt)
EOT
echo "rebuilt: $(ls DECK-*.md | wc -l | tr -d ' ') decks"
