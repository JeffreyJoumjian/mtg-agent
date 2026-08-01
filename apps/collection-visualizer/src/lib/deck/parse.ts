/** Pure parsers for the authoritative per-deck pair (DECK.md + STATUS.md) — client-importable. */

export type DeckStatus = "HAVE" | "BUY" | "PROXY" | "CONSIDERING" | "CUT";

export interface DeckCard {
  qty: number;
  name: string;
}

export interface DeckGroup {
  name: string;
  cards: DeckCard[];
}

export interface ParsedDeck {
  title: string;
  /** The raw text after `Commander:`, e.g. "Scarlet Witch, Chaotic Avenger (Izzet, U/R)". */
  commanderLine: string | null;
  groups: DeckGroup[];
  total: number;
}

export interface CardStatus {
  status: DeckStatus;
  /** 💰 marker — expensive card flagged as a proxy candidate. */
  proxyCandidate: boolean;
  note: string | null;
}

export interface DeckSummary {
  slug: string;
  name: string;
  commander: string | null;
  /** e.g. "U/R" from the commander parenthetical, when present. */
  colors: string | null;
  total: number;
  statusCounts: Record<DeckStatus, number>;
}

// `1x Card` (per decks/README.md) and the older bare `1 Card` export format both occur.
const CARD_LINE = /^(\d+)x?\s+(.+?)\s*$/;
const GROUP_LINE = /^##\s+(.+?)(?:\s+\(\d+\))?\s*$/;
const STATUS_LINE = /^(\d+)x?\s+(.+?)\s+—\s+(HAVE|BUY|PROXY|CONSIDERING|CUT)\b(.*)$/;
// A `## Lands — all PROXY (…)` header sets a status for every unlabeled card in the section.
const SECTION_STATUS = /\b(HAVE|BUY|PROXY|CONSIDERING|CUT)\b/;
// Compact entry inside a `·`-separated line: `9x Mountain 💰`.
const COMPACT_ENTRY = /^(\d+)x?\s+(.+?)(\s*💰)?\s*$/;

export function parseDeckMd(text: string): ParsedDeck {
  const titleMatch = text.match(/^#\s+(.+?)\s+—\s+Decklist/m) ?? text.match(/^#\s+(.+)$/m);
  const commanderMatch = text.match(/^Commander:\s*(.+?)\s*$/m);

  const groups: DeckGroup[] = [];
  let current: DeckGroup | null = null;

  for (const line of text.split("\n")) {
    const group = line.match(GROUP_LINE);

    if (group) {
      current = { name: group[1], cards: [] };
      groups.push(current);
      continue;
    }

    const card = line.match(CARD_LINE);
    if (card) {
      // Bare exports (edgar-markov) have no headers at all — collect into an implicit group.
      if (!current) {
        current = { name: "Deck", cards: [] };
        groups.push(current);
      }
      current.cards.push({ qty: Number(card[1]), name: card[2] });
    }
  }

  const total = groups.reduce((sum, g) => sum + g.cards.reduce((s, c) => s + c.qty, 0), 0);

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    commanderLine: commanderMatch ? commanderMatch[1] : null,
    groups,
    total,
  };
}

/** Strip a leading price segment (`~$3; ` / `$18 — `) off a parenthetical, keep the human note. */
function noteFrom(rest: string): string | null {
  const paren = rest.match(/\(([^)]*)\)/);

  if (!paren) return null;
  const inner = paren[1].replace(/^~?\$[\d,.]+k?\s*([;—-]\s*)?/, "").trim();
  return inner.length > 0 ? inner : null;
}

export function parseStatusMd(text: string): Record<string, CardStatus> {
  const out: Record<string, CardStatus> = {};
  let sectionDefault: DeckStatus | null = null;

  for (const line of text.split("\n")) {
    const header = line.match(GROUP_LINE);
    if (header) {
      // Case-sensitive on purpose: `all PROXY` is a section default; `Proxy candidates` is not.
      const status = header[1].match(SECTION_STATUS);
      sectionDefault = status ? (status[1] as DeckStatus) : null;
      continue;
    }

    const m = line.match(STATUS_LINE);
    if (m) {
      const rest = m[4];
      out[m[2]] = {
        status: m[3] as DeckStatus,
        proxyCandidate: rest.includes("💰"),
        // BUY's own price `($18)` is not a note; drop the price parenthetical before looking.
        note: noteFrom(rest.replace(/^\s*\(\$[\d,.]+k?\)/, "")),
      };
      continue;
    }

    // Compact `·`-separated lines (`1x Command Tower · 9x Mountain 💰`) inherit the section default.
    if (sectionDefault && line.includes("·")) {
      for (const part of line.split("·")) {
        const entry = part.trim().match(COMPACT_ENTRY);

        if (entry) {
          out[entry[2]] = { status: sectionDefault, proxyCandidate: entry[3] !== undefined, note: null };
        }
      }
    }
  }

  return out;
}

export function summarize(slug: string, deck: ParsedDeck, statuses: Record<string, CardStatus>): DeckSummary {
  let commander: string | null = null;
  let colors: string | null = null;

  if (deck.commanderLine) {
    const paren = deck.commanderLine.match(/^(.*?)\s*\(([^)]*)\)\s*$/);

    if (paren) {
      commander = paren[1];
      const last =
        paren[2]
          .split(",")
          .map((s) => s.trim())
          .pop() ?? "";
      colors = /^[WUBRGC/]+$/.test(last) ? last : null;
    } else {
      commander = deck.commanderLine;
    }
  }

  const statusCounts: Record<DeckStatus, number> = { HAVE: 0, BUY: 0, PROXY: 0, CONSIDERING: 0, CUT: 0 };

  for (const group of deck.groups) {
    for (const card of group.cards) {
      const s = statuses[card.name];
      if (s) statusCounts[s.status] += card.qty;
    }
  }

  return {
    slug,
    name: deck.title.length > 0 ? deck.title : slug,
    commander,
    colors,
    total: deck.total,
    statusCounts,
  };
}
