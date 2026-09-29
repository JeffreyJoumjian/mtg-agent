/**
 * Build the data bundle behind a deck's upgrade-proposal artifact.
 *
 * The editorial half (which swaps, on what grounds, which interactions) is hand-written in
 * `decks/<slug>/research/proposal.json`. Everything derivable — card text, cost, salt, inclusion,
 * Game Changer status, images, and the before/after deck stats — is computed here, so the page can
 * never drift from `deck.json` (deck-brain §1.4).
 *
 *   bun run deck:proposal <slug> [--out <dir>] [--no-images]
 *
 * Writes `<out>/proposal.json` and `<out>/img/<card-slug>.jpg`.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { getCards, matchRequested } from "./lib/card-cache.ts";
import { type CardMeta, type DeckList, listEntries } from "./lib/deck-model.ts";
import { type CardInfo, type DeckStats, computeStats, deckIdentity, diffStats } from "./lib/deck-stats.ts";
import { deckDir, readDeck } from "./lib/deck-store.ts";
import { slugify } from "./lib/edhrec.ts";
import { EDHREC_CACHE_PATH } from "./lib/paths.ts";

/** One proposed change. `out` may be absent for a straight addition. */
interface ProposalSwap {
  in?: string;
  out?: string;
  /** Section the incoming card is filed under — must match a section name in the list. */
  section?: string;
  /** The single deciding factor (deck-brain §2.3). */
  axis?: string;
  grounds?: string;
  /** Named cards in the current 100 (or elsewhere in the proposal) this one works with. */
  interactions?: string[];
  /** What it turns off in our own list (deck-brain §1.3). */
  cost?: string;
  /** Outcome once the swap has actually been played or measured. */
  verdict?: "kept" | "reverted" | "pending";
  verdictWhy?: string;
}

type WaveStatus = "proposed" | "approved" | "applied" | "declined";

interface ProposalWave {
  id: string;
  label: string;
  status: WaveStatus;
  note?: string;
  swaps: ProposalSwap[];
}

interface ProposalFile {
  title: string;
  subtitle?: string;
  listId?: string;
  /** Free prose shown above the waves — the diagnosis. */
  diagnosis?: string[];
  waves: ProposalWave[];
  /** Another deck slug to measure side by side — the playtest fork, usually. Real measured stats,
   *  not a projection, so the page can show what was actually built. */
  compareTo?: { slug: string; label: string; note?: string };
  /** Cards considered and passed over, with the reason. */
  passed?: { name: string; why: string }[];
}

interface CardView {
  name: string;
  manaCost: string;
  typeLine: string;
  pt: string | null;
  oracleText: string;
  colorIdentity: string[];
  cmc: number;
  gameChanger: boolean;
  commanderLegal: string;
  scryfallUri: string | null;
  image: string | null;
  salt: number | null;
  inclusionPct: number | null;
  /** Section the card sits in today, when it is already in the list. */
  section: string | null;
}

const edhrecCachePath = EDHREC_CACHE_PATH;

/** Salt and inclusion for a card, from the EDHREC cache only — this never hits the network, so a
 *  card nobody has looked up yet simply reports null rather than stalling the build. */
async function readEdhrec(): Promise<Record<string, { salt: number | null; inclusionPct: number | null }>> {
  const file = Bun.file(edhrecCachePath);
  if (!(await file.exists())) return {};

  const raw = (await file.json()) as Record<string, { page?: { salt?: number; inclusionPct?: number } }>;
  const out: Record<string, { salt: number | null; inclusionPct: number | null }> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (!key.startsWith("cards/")) continue;

    out[key.slice("cards/".length)] = {
      salt: typeof value.page?.salt === "number" ? Math.round(value.page.salt * 100) / 100 : null,
      inclusionPct: typeof value.page?.inclusionPct === "number" ? value.page.inclusionPct : null,
    };
  }

  return out;
}

/** A deep copy of the list with the given waves folded in. Called twice: once with the waves the
 *  pilot has signed off on (the "approved" column) and once with every wave (the "projected"
 *  column), so the page can show what is live and what is only on the table. */
function applyWaves(list: DeckList, waves: ProposalWave[]): DeckList {
  const next: DeckList = JSON.parse(JSON.stringify(list));

  for (const wave of waves) {
    for (const swap of wave.swaps) {
      if (swap.out) {
        for (const section of next.sections) {
          section.cards = section.cards.filter((c) => c.name !== swap.out);
        }
      }

      if (!swap.in) continue;

      const target = next.sections.find((s) => s.name === swap.section) ?? next.sections[0];
      target.cards.push({ name: swap.in, qty: 1 });
    }
  }

  return next;
}

async function downloadImages(names: string[], cards: Record<string, any>, outDir: string): Promise<Record<string, string>> {
  const imgDir = join(outDir, "img");
  await mkdir(imgDir, { recursive: true });

  const map: Record<string, string> = {};

  for (const name of names) {
    const summary = cards[name];
    const url: string | null = summary?.images?.normal ?? summary?.imageUri ?? null;
    if (!url) continue;

    const rel = `img/${slugify(name)}.jpg`;
    const dest = join(outDir, rel);

    if (await Bun.file(dest).exists()) {
      map[name] = rel;
      continue;
    }

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! image ${res.status} for ${name}`);
      continue;
    }

    await Bun.write(dest, await res.arrayBuffer());
    map[name] = rel;
  }

  return map;
}

function statSummary(stats: DeckStats) {
  return {
    total: stats.size.total,
    lands: stats.size.lands,
    nonland: stats.size.nonland,
    avgMv: Math.round(stats.curve.avgMv * 100) / 100,
    creatures: stats.types.creature,
    gameChangers: stats.flags.gameChangers,
    sections: stats.roles.sections,
    pips: stats.color.pips,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const slug = args.find((a) => !a.startsWith("--"));
  if (!slug) {
    console.error("usage: bun run deck:proposal <slug> [--out <dir>] [--no-images]");
    process.exit(1);
  }

  const outFlag = args.indexOf("--out");
  const outDir = outFlag >= 0 ? args[outFlag + 1] : join(deckDir(slug), "artifact");
  const withImages = !args.includes("--no-images");

  const proposalPath = join(deckDir(slug), "research", "proposal.json");
  const proposalFile = Bun.file(proposalPath);
  if (!(await proposalFile.exists())) {
    console.error(`no proposal at ${proposalPath}`);
    process.exit(1);
  }

  const proposal = (await proposalFile.json()) as ProposalFile;
  const deck = await readDeck(slug);
  const listId = proposal.listId ?? "main";
  const list = deck.lists[listId];
  if (!list) {
    console.error(`no list "${listId}" in ${slug}`);
    process.exit(1);
  }

  const liveWaves = proposal.waves.filter((w) => w.status === "approved" || w.status === "applied");
  const openWaves = proposal.waves.filter((w) => w.status !== "declined");

  const approvedList = applyWaves(list, liveWaves);
  const projectedList = applyWaves(list, openWaves);

  // Every card the page mentions: the whole current list, plus everything proposed either way.
  const proposedNames = proposal.waves.flatMap((w) => w.swaps.flatMap((s) => [s.in, s.out].filter(Boolean) as string[]));
  const passedNames = (proposal.passed ?? []).map((p) => p.name);
  const listNames = listEntries(list).map((e) => e.name);
  const allNames = Array.from(new Set([...listNames, ...proposedNames, ...passedNames]));

  console.log(`resolving ${allNames.length} cards…`);
  const lookup = await getCards(allNames);
  // `getCards` returns a flat list; pair it back to the names we asked for, so a double-faced card
  // resolves from the front-face spelling the deck file uses.
  const matched = matchRequested(allNames, lookup.found);
  const cards = matched.found as Record<string, any>;

  const info: Record<string, CardInfo | undefined> = {};
  for (const [name, summary] of Object.entries(cards)) info[name] = summary as CardInfo;

  const meta: Record<string, CardMeta> = deck.cards ?? {};
  const identity = deckIdentity(deck, info);

  const current = computeStats(list, info, meta, identity);
  const approved = computeStats(approvedList, info, meta, identity);
  const projected = computeStats(projectedList, info, meta, identity);

  // A second, real deck measured the same way — this is a measurement, never a projection.
  let compare: { slug: string; label: string; note: string | null; stats: ReturnType<typeof statSummary> } | null = null;
  if (proposal.compareTo) {
    const other = await readDeck(proposal.compareTo.slug);
    const otherList = other.lists[listId] ?? other.lists.main;
    const otherNames = listEntries(otherList).map((e) => e.name);
    const otherLookup = await getCards(otherNames);
    const otherMatched = matchRequested(otherNames, otherLookup.found);
    const otherInfo: Record<string, CardInfo | undefined> = {};
    for (const [n, sum] of Object.entries(otherMatched.found)) otherInfo[n] = sum as CardInfo;

    compare = {
      slug: proposal.compareTo.slug,
      label: proposal.compareTo.label,
      note: proposal.compareTo.note ?? null,
      stats: statSummary(computeStats(otherList, otherInfo, other.cards ?? {}, identity)),
    };
  }

  const edhrec = await readEdhrec();
  const sectionOf: Record<string, string> = {};
  for (const entry of listEntries(list)) sectionOf[entry.name] = entry.section;

  await mkdir(outDir, { recursive: true });

  // Images only for the cards the page actually renders as art — proposed and passed cards.
  const artNames = Array.from(new Set([...proposedNames, ...passedNames]));
  // Interaction partners are rendered as small chips with hover art too.
  const partnerNames = proposal.waves.flatMap((w) => w.swaps.flatMap((s) => s.interactions ?? []))
    .map((line) => line.split(" — ")[0].trim())
    .flatMap((head) => head.split(", ").map((n) => n.trim()))
    .filter((n) => n.length > 0 && allNames.includes(n));
  for (const n of partnerNames) if (!artNames.includes(n)) artNames.push(n);
  const images = withImages ? await downloadImages(artNames, cards, outDir) : {};

  const views: Record<string, CardView> = {};
  for (const name of allNames) {
    const s = cards[name];
    if (!s) continue;

    const crowd = edhrec[slugify(name)] ?? { salt: null, inclusionPct: null };
    // Power/toughness sit on the summary root for single-faced cards and on each face otherwise.
    const pt = s.power != null && s.toughness != null
      ? `${s.power}/${s.toughness}`
      : s.faces?.map((f: any) => (f.power != null && f.toughness != null ? `${f.power}/${f.toughness}` : null))
          .filter(Boolean)
          .join(" // ") || null;

    views[name] = {
      name: s.name,
      manaCost: s.manaCost ?? "",
      typeLine: s.typeLine ?? "",
      pt,
      oracleText: s.oracleText ?? s.faces?.map((f: any) => f.oracleText).filter(Boolean).join("\n//\n") ?? "",
      colorIdentity: s.colorIdentity ?? [],
      cmc: s.cmc ?? 0,
      gameChanger: !!s.gameChanger,
      commanderLegal: s.commanderLegal ?? "unknown",
      scryfallUri: s.scryfallUri ?? null,
      image: images[name] ?? null,
      salt: crowd.salt,
      inclusionPct: crowd.inclusionPct,
      section: sectionOf[name] ?? null,
    };
  }

  const bundle = {
    generatedAt: new Date().toISOString(),
    deck: { slug, name: deck.name, listId, label: list.label, bracket: list.bracket ?? null },
    title: proposal.title,
    subtitle: proposal.subtitle ?? null,
    diagnosis: proposal.diagnosis ?? [],
    stats: {
      current: statSummary(current),
      approved: statSummary(approved),
      projected: statSummary(projected),
      /** Only the changes the pilot has signed off on. */
      approvedChanges: diffStats(current, approved),
      /** What every open wave would do together — the number the page leads with. */
      projectedChanges: diffStats(current, projected),
    },
    compare,
    waves: proposal.waves,
    passed: proposal.passed ?? [],
    cards: views,
    unresolved: [...matched.unresolved, ...(lookup.notFound ?? [])],
  };

  await writeFile(join(outDir, "proposal.json"), `${JSON.stringify(bundle, null, 2)}\n`);

  console.log(`wrote ${join(outDir, "proposal.json")}`);
  console.log(`  ${proposal.waves.length} wave(s), ${liveWaves.length} approved/applied`);
  console.log(`  current   ${current.size.total} cards, avg MV ${statSummary(current).avgMv}, GC ${current.flags.gameChangers.length}`);
  console.log(`  approved  ${approved.size.total} cards, avg MV ${statSummary(approved).avgMv}, GC ${approved.flags.gameChangers.length}`);
  console.log(`  projected ${projected.size.total} cards, avg MV ${statSummary(projected).avgMv}, GC ${projected.flags.gameChangers.length}`);
  if (compare) console.log(`  compare  ${compare.stats.total} cards, avg MV ${compare.stats.avgMv} (${compare.slug})`);
  console.log(`  images ${Object.keys(images).length}/${artNames.length}`);
  if (bundle.unresolved.length) console.log(`  UNRESOLVED: ${bundle.unresolved.join(", ")}`);
}

main();
