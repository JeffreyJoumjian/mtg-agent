/** The terminal-companion contract: a Claude Code session running the deck-finalizer in the
 *  terminal writes this JSON to data/deck-live/<slug>.json; the /decks/$slug/live page polls it.
 *  Pure — shared by the server reader, the live page, and the repo's deck-live script's docs. */

export interface LiveBatchCard {
  name: string;
  /** One neutral clause on what the card does. */
  blurb?: string;
}

export interface LiveState {
  /** Date.now() at write time — the page shows a stale indicator when this ages out. */
  updatedAt: number;
  /** The cards currently being debated (usually 5–10), shown big. */
  batch: { batchNumber: number; totalBatches: number | null; cards: LiveBatchCard[] } | null;
  /** The keep pile so far, grouped by category (Lands / Ramp / Draw / …). */
  keep: { name: string; cards: string[] }[];
  considering: string[];
  /** Sideboard / situational swaps ("Pocket" in the exercise). */
  pocket: string[];
  cut: string[];
  tally: {
    keeps: number;
    cuts: number;
    pockets: number;
    target: number;
    gameChangers: number;
    gcCeiling?: number;
    manaSources?: number;
  } | null;
  /** One free line of context, e.g. "debating the removal package". */
  note: string | null;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && !v.some((x) => typeof x !== "string");
}

/** Lenient shape-check + default-fill. Returns null on anything structurally wrong, so a bad
 *  hand-written file shows as "no live session" rather than a crashed page. */
export function normalizeLiveState(raw: unknown): LiveState | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  if (typeof r.updatedAt !== "number") return null;

  let batch: LiveState["batch"] = null;
  if (r.batch !== undefined && r.batch !== null) {
    const b = r.batch as Record<string, unknown>;
    if (typeof b.batchNumber !== "number" || !Array.isArray(b.cards)) return null;

    const cards: LiveBatchCard[] = [];
    for (const c of b.cards) {
      const card = c as Record<string, unknown>;
      if (typeof card?.name !== "string") return null;
      cards.push({ name: card.name, ...(typeof card.blurb === "string" ? { blurb: card.blurb } : {}) });
    }
    batch = { batchNumber: b.batchNumber, totalBatches: typeof b.totalBatches === "number" ? b.totalBatches : null, cards };
  }

  const keep: LiveState["keep"] = [];
  if (r.keep !== undefined) {
    if (!Array.isArray(r.keep)) return null;
    for (const g of r.keep) {
      const group = g as Record<string, unknown>;
      if (typeof group?.name !== "string" || !isStringArray(group.cards)) return null;
      keep.push({ name: group.name, cards: group.cards });
    }
  }

  const lists: Record<"considering" | "pocket" | "cut", string[]> = { considering: [], pocket: [], cut: [] };
  for (const key of ["considering", "pocket", "cut"] as const) {
    if (r[key] !== undefined) {
      if (!isStringArray(r[key])) return null;
      lists[key] = r[key];
    }
  }

  let tally: LiveState["tally"] = null;
  if (r.tally !== undefined && r.tally !== null) {
    const t = r.tally as Record<string, unknown>;
    const core = ["keeps", "cuts", "pockets", "target", "gameChangers"] as const;
    if (core.some((k) => typeof t[k] !== "number")) return null;
    tally = {
      keeps: t.keeps as number,
      cuts: t.cuts as number,
      pockets: t.pockets as number,
      target: t.target as number,
      gameChangers: t.gameChangers as number,
      ...(typeof t.gcCeiling === "number" ? { gcCeiling: t.gcCeiling } : {}),
      ...(typeof t.manaSources === "number" ? { manaSources: t.manaSources } : {}),
    };
  }

  return {
    updatedAt: r.updatedAt,
    batch,
    keep,
    considering: lists.considering,
    pocket: lists.pocket,
    cut: lists.cut,
    tally,
    note: typeof r.note === "string" ? r.note : null,
  };
}
