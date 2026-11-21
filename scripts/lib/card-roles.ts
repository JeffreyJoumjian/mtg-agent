/** Card roles read from oracle text: ramp, draw, removal, wipes and the rest. Used by the EDHPlay
 *  game views to say what kinds of cards a pod plays ("how many wipes do we see per game?").
 *
 *  A heuristic over Scryfall's oracle text, not a judgement call: it tags what a card's text
 *  says it does, and a card can have several roles. The deck-brain method still owns real card
 *  evaluation; these tags only group cards for counting. */

export type CardRole =
  | "land"
  | "ramp"
  | "draw"
  | "tutor"
  | "removal"
  | "wipe"
  | "counter"
  | "protection"
  | "recursion"
  | "tokens"
  | "drain"
  | "stax"
  | "extra-turn"
  | "wincon";

export const CARD_ROLES: CardRole[] = [
  "land",
  "ramp",
  "draw",
  "tutor",
  "removal",
  "wipe",
  "counter",
  "protection",
  "recursion",
  "tokens",
  "drain",
  "stax",
  "extra-turn",
  "wincon",
];

export const ROLE_LABELS: Record<CardRole, string> = {
  land: "Land",
  ramp: "Ramp",
  draw: "Card draw",
  tutor: "Tutor",
  removal: "Removal",
  wipe: "Board wipe",
  counter: "Counterspell",
  protection: "Protection",
  recursion: "Recursion",
  tokens: "Tokens",
  drain: "Drain",
  stax: "Stax",
  "extra-turn": "Extra turn",
  wincon: "Alt win",
};

export interface RoleInput {
  typeLine: string;
  oracleText: string;
  producedMana?: string[];
}

const RULES: { role: CardRole; test: (text: string, type: string, produced: string[]) => boolean }[] = [
  { role: "land", test: (_t, type) => /\bLand\b/.test(type) },
  {
    role: "ramp",
    test: (t, type, produced) =>
      (!/\bLand\b/.test(type) && produced.length > 0 && /\{T\}[^.]*: Add|Add \{/.test(t)) ||
      /search your library for (?:up to (?:two|three) )?(?:a |an )?(?:basic )?(?:land|forest|plains|island|swamp|mountain)[^.]*put (?:it|them|those cards|one|one of them) onto the battlefield/i.test(t) ||
      /you may put (?:a|an additional) land card from your hand onto the battlefield/i.test(t) ||
      /play (?:an )?additional lands?/i.test(t),
  },
  { role: "draw", test: (t) => /\bdraws? (?:a|two|three|four|five|x|that many|cards equal|an additional) cards?\b/i.test(t) || /\bdraw cards equal\b/i.test(t) },
  { role: "tutor", test: (t) => /search your library for (?!(?:up to (?:two|three) )?(?:a |an )?(?:basic )?(?:land|forest|plains|island|swamp|mountain)\b)[^.]*card/i.test(t) },
  {
    role: "removal",
    test: (t) =>
      /(?:destroy|exile) target (?:creature|artifact|enchantment|planeswalker|permanent|nonland permanent|nonland|battle)/i.test(t) ||
      /deals? (?:\d+|x|that much) damage to (?:target|any target|each opponent's creature)/i.test(t) ||
      /return target (?:creature|nonland permanent|permanent)[^.]* to (?:its|their) owner's hand/i.test(t) ||
      /target (?:creature|player) (?:gets -\d+\/-\d+|sacrifices)/i.test(t) ||
      /target opponent sacrifices/i.test(t),
  },
  {
    role: "wipe",
    test: (t) =>
      /(?:destroy|exile) all (?:creatures|nonland permanents|permanents|artifacts|enchantments|other creatures|nontoken)/i.test(t) ||
      /all creatures get -\d+\/-\d+/i.test(t) ||
      /deals? \d+ damage to each creature/i.test(t) ||
      /return all (?:nonland permanents|creatures)[^.]* to (?:their|its) owners'? hands?/i.test(t) ||
      /each player sacrifices (?:all|a creature|\w+ creatures)/i.test(t),
  },
  { role: "counter", test: (t) => /counter target (?:spell|activated|triggered|noncreature|creature|instant)/i.test(t) },
  {
    role: "protection",
    test: (t) =>
      /(?:gains?|have|has) (?:hexproof|indestructible|shroud|protection from)/i.test(t) ||
      /can't be (?:countered|the target)/i.test(t) ||
      /phase out/i.test(t),
  },
  { role: "recursion", test: (t) => /return (?:target |up to \w+ target )?[^.]*cards? from (?:your|a) graveyard to (?:the battlefield|your hand)/i.test(t) || /from your graveyard onto the battlefield/i.test(t) },
  { role: "tokens", test: (t) => /\bcreate (?:a|an|one|two|three|four|five|x|that many|\d+) [^.]*tokens?\b/i.test(t) },
  { role: "drain", test: (t) => /each opponent loses \d+ life|each opponent loses life|target opponent loses \d+ life and you gain/i.test(t) },
  {
    role: "stax",
    test: (t) =>
      /(?:spells|activated abilities)[^.]* cost \{\d\} more/i.test(t) ||
      /(?:players|opponents|each player) can't (?:cast|search|draw|untap|attack)/i.test(t) ||
      /don't untap during/i.test(t),
  },
  { role: "extra-turn", test: (t) => /take an extra turn/i.test(t) },
  { role: "wincon", test: (t) => /you win the game|loses the game/i.test(t) },
];

/** Every role the card's text supports, in `CARD_ROLES` order. */
export function rolesFor(card: RoleInput): CardRole[] {
  const text = card.oracleText.replace(/\([^)]*\)/g, "");
  const produced = card.producedMana ?? [];
  const out: CardRole[] = [];
  for (const rule of RULES) {
    if (rule.test(text, card.typeLine, produced)) {
      out.push(rule.role);
    }
  }
  return out;
}

/** Colour identity of a set of commanders as a WUBRG-ordered string (`"BG"`, `""` for colourless). */
export function identityKey(identities: string[][]): string {
  const all = identities.flat();
  return ["W", "U", "B", "R", "G"].filter((c) => all.includes(c)).join("");
}
