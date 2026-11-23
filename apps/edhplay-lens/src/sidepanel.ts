/** The side panel: the live game in the active tab, history for the players at the table, combo
 *  watch on revealed cards, and whether the Workbench is receiving records. It renders whatever
 *  the service worker sends; it keeps no state of its own beyond the tab it watches and whether
 *  Settings is open. Decklists never show here: the pilot doesn't want them during a game. */
import type { ComboAlert, PanelPlayer, PanelView } from "./core";

interface StatusView {
  workbench: "ok" | "down" | "unknown";
  queued: number;
  lastError?: string;
  workbenchUrl: string;
  version: string;
  stored?: { captures: number; playtests: number; matches: number; me: string | null };
  summary?: {
    record: { games: number; wins: number; losses: number };
    lastGame: {
      id: string;
      captureIds: string[];
      result: string;
      startedAt: number;
      rounds: number;
      myCommander?: string;
      opponents: string[];
    } | null;
  };
}

const regions = {
  top: document.getElementById("top"),
  pinned: document.getElementById("pinned"),
  main: document.getElementById("main"),
  foot: document.getElementById("footline"),
};
const errorEl = document.getElementById("error");
const workbenchInput = document.getElementById("workbench");
const settingsEl = document.getElementById("settings");
const settingsToggle = document.getElementById("settings-toggle");

let settingsOpen = false;
/** Settings opens on its own when the Workbench goes offline; this remembers the pilot closed it. */
let settingsDismissedOffline = false;
let last: { view: PanelView; status: StatusView | null } | null = null;

// The worker can be stopped while the panel is open; reconnect and watch the tab again.
let port = connect();

function connect(): chrome.runtime.Port {
  const p = chrome.runtime.connect({ name: "sidepanel" });
  p.onMessage.addListener(onState);
  p.onDisconnect.addListener(() => {
    port = connect();
    void watchActiveTab();
  });
  return p;
}

async function watchActiveTab(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id !== undefined) port.postMessage({ kind: "watch", tabId: tab.id });
}

chrome.tabs.onActivated.addListener(() => void watchActiveTab());
void watchActiveTab();

/** Why the last Save didn't take, shown until the next Save. Status updates re-render Settings and
 *  would otherwise wipe it. */
let saveError = "";

// The manifest only grants localhost. Any other Workbench address (the NAS's) is an optional host
// permission, so the address never has to be written into this public repo. Brave asks once per
// address, and permissions.request must run inside the click itself, before any await.
document.getElementById("save")?.addEventListener("click", () => {
  if (!(workbenchInput instanceof HTMLInputElement)) return;

  const url = workbenchInput.value.trim();
  if (!url) {
    saveError = "";
    port.postMessage({ kind: "set_workbench", url });
    return;
  }

  let origin: string;
  try {
    origin = new URL(url).origin;
  } catch {
    saveError = "That isn't a full address. It needs to start with http:// or https://, like https://mtg.example.com.";
    if (errorEl) errorEl.textContent = saveError;
    return;
  }

  void chrome.permissions.request({ origins: [`${origin}/*`] }).then((granted) => {
    saveError = granted ? "" : `Lens can't reach ${origin} without your permission. You can press Save again and choose Allow.`;
    if (errorEl) errorEl.textContent = saveError;
    if (granted) port.postMessage({ kind: "set_workbench", url });
  });
});
document.getElementById("retry")?.addEventListener("click", () => port.postMessage({ kind: "retry" }));
settingsToggle?.addEventListener("click", () => {
  const offline = last?.status?.workbench === "down";
  if (offline) settingsDismissedOffline = !settingsDismissedOffline;
  else settingsOpen = !settingsOpen;
  if (last) render(last.view, last.status);
});

// Buttons inside re-rendered regions (the offline banner's Retry now) are handled here.
document.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof Element && target.closest("[data-action=retry]")) port.postMessage({ kind: "retry" });
});

// An art image that fails falls back once from the Workbench route to Scryfall directly, then
// turns into the placeholder avatar. Inline onerror handlers aren't allowed in extension pages.
document.addEventListener(
  "error",
  (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    const fallback = img.dataset.fallback;
    if (fallback) {
      delete img.dataset.fallback;
      img.src = fallback;
      return;
    }
    if (img.classList.contains("avatar")) {
      const span = document.createElement("span");
      span.className = `${img.className} avatar-unknown`;
      span.textContent = "?";
      span.setAttribute("aria-label", img.alt || "Unknown commander");
      img.replaceWith(span);
    } else {
      img.style.visibility = "hidden";
    }
  },
  true,
);

function onState(m: unknown): void {
  if (typeof m !== "object" || m === null || !("kind" in m) || m.kind !== "state") return;
  const status: unknown = Reflect.get(m, "status");
  const view: unknown = Reflect.get(m, "view");
  const s = isStatus(status) ? status : null;
  if (s) renderSettings(s);
  if (isView(view)) {
    last = { view, status: s };
    render(view, s);
  }
}

function isStatus(v: unknown): v is StatusView {
  return typeof v === "object" && v !== null && "workbench" in v && "queued" in v;
}

function isView(v: unknown): v is PanelView {
  return typeof v === "object" && v !== null && "phase" in v && "players" in v && Array.isArray(v.players) && "alerts" in v && Array.isArray(v.alerts);
}

function renderSettings(s: StatusView): void {
  if (errorEl) errorEl.textContent = saveError || (s.workbench === "down" ? "" : (s.lastError ?? ""));
  if (workbenchInput instanceof HTMLInputElement && document.activeElement !== workbenchInput) workbenchInput.value = s.workbenchUrl;
}

/** Only touch a region when its markup changed, so images don't reload on every update. */
function setRegion(el: HTMLElement | null, html: string): void {
  if (el && el.innerHTML !== html && el.dataset.html !== html) {
    el.innerHTML = html;
    el.dataset.html = html;
  }
}

function render(view: PanelView, status: StatusView | null): void {
  const offline = status?.workbench === "down";
  const base = status?.workbenchUrl ?? "http://localhost:3200";
  const ctx: Ctx = { view, status, offline, base };
  setRegion(regions.top, header(ctx));
  setRegion(regions.pinned, pinned(ctx));
  setRegion(regions.main, body(ctx));
  setRegion(regions.foot, footer(ctx));

  if (!offline) settingsDismissedOffline = false;
  const showSettings = settingsOpen || (offline && !settingsDismissedOffline);
  if (settingsEl) settingsEl.hidden = !showSettings;
  settingsToggle?.setAttribute("aria-expanded", String(showSettings));
}

interface Ctx {
  view: PanelView;
  status: StatusView | null;
  offline: boolean;
  base: string;
}

// ---------------------------------------------------------------------------------------------
// Small helpers.

const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Commander and card art. The Workbench route batches Scryfall lookups through its card cache;
 *  when it can't answer, the image falls back to Scryfall directly (see the error listener). */
function art(base: string, name: string): { src: string; fallback: string } {
  const front = encodeURIComponent(name.split(" // ")[0]);
  return {
    src: `${base}/api/card-image?v=art&name=${front}`,
    fallback: `https://api.scryfall.com/cards/named?exact=${front}&format=image&version=art_crop`,
  };
}

function artImg(base: string, name: string | undefined, cls: string): string {
  if (!name) return `<span class="${cls} avatar-unknown" aria-label="Unknown commander">?</span>`;
  const a = art(base, name);
  return `<img class="${cls}" src="${esc(a.src)}" data-fallback="${esc(a.fallback)}" alt="${esc(name)}" loading="lazy">`;
}

function agoLabel(t: number): string {
  const min = Math.round((Date.now() - t) / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

const times = (n: number): string => (n === 1 ? "once" : n === 2 ? "twice" : `${n} times`);
const shortName = (name: string): string => name.split(",")[0];

function seatName(p: PanelPlayer, view: PanelView): string {
  if (p.isMe && view.mode === "player") return "You";
  return p.username || "Unknown";
}

function sparkline(values: number[]): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => `${((i / (values.length - 1)) * 54 + 1).toFixed(1)},${(21 - ((v - min) / span) * 19).toFixed(1)}`).join(" ");
  return `<svg class="spark" width="56" height="22" viewBox="0 0 56 22" role="img" aria-label="Life this game"><polyline points="${pts}" /></svg>`;
}

function delta(n: number): string {
  if (n === 0) return `<span class="delta none">no change</span>`;
  return n < 0 ? `<span class="delta down">−${-n}</span>` : `<span class="delta up">+${n}</span>`;
}

function connLine(status: StatusView | null): string {
  if (!status || status.workbench === "unknown") return `<span class="dot"></span>Checking the Workbench`;
  return status.workbench === "ok" ? `<span class="dot ok"></span>Workbench connected` : `<span class="dot down"></span>Workbench offline`;
}

// ---------------------------------------------------------------------------------------------
// Header.

function header(ctx: Ctx): string {
  const v = ctx.view;
  if (v.phase === "idle") {
    return `<span class="brand">EDHPlay Lens</span><span class="conn">${connLine(ctx.status)}</span>`;
  }
  if (v.phase === "lobby") {
    return `<span class="tag">LOBBY</span><span class="heading">${v.players.length} seated</span>`;
  }
  if (v.ended) {
    return `<span class="tag">FINAL</span><span class="heading">Game over · ${v.round ?? "?"} round${v.round === 1 ? "" : "s"}</span>`;
  }
  const tag = v.mode === "solo" ? `<span class="tag test">TEST</span>` : v.mode === "spectator" ? `<span class="tag watch">WATCHING</span>` : `<span class="tag live">LIVE</span>`;
  const turn = v.activeIsMe && v.mode === "player" ? "your turn" : v.activePlayer ? `${esc(v.activePlayer)}'s turn` : "";
  return `${tag}<span class="heading">Round ${v.round ?? "?"}</span>${turn ? `<span class="turn">${turn}</span>` : ""}`;
}

// ---------------------------------------------------------------------------------------------
// Pinned: the offline banner, the playtest note and the combo watch.

function pinned(ctx: Ctx): string {
  const v = ctx.view;
  const parts: string[] = [];

  if (ctx.offline && ctx.status) {
    const waiting = ctx.status.queued > 0 ? ` · ${ctx.status.queued} record${ctx.status.queued === 1 ? "" : "s"} waiting` : "";
    const host = ctx.base.replace(/^https?:\/\//, "");
    const message =
      ctx.status.lastError ??
      `The Workbench at ${host} isn't answering. Start it with bun run dev in apps/collection-visualizer, and everything recorded meanwhile goes through once it's back.`;
    parts.push(`<div class="alert offline" role="status">
      <span class="alert-label">Workbench offline${waiting}</span>
      <span class="alert-detail">${esc(message)}</span>
      <div class="alert-actions"><button type="button" class="btn primary" data-action="retry">Retry now</button><span class="muted">retrying every 30 seconds</span></div>
    </div>`);
  }

  if (v.phase === "game" && v.mode === "solo" && !v.ended) {
    parts.push(`<div class="alert note">Solo playtest. Saved under Playtests, apart from your real games.</div>`);
  }

  if (v.phase === "game" && !v.ended) {
    for (const a of v.alerts) parts.push(alertHtml(a));
    if (v.moreAlerts > 0) {
      parts.push(`<span class="alert-more">${v.moreAlerts} more combo alert${v.moreAlerts === 1 ? "" : "s"} for this table aren't shown.</span>`);
    }
  }
  return parts.join("");
}

function alertHtml(a: ComboAlert): string {
  const produces = a.produces.slice(0, 2).join(", ");
  if (a.level === "assembled") {
    return `<div class="alert assembled" role="alert">
      <span class="alert-label">Combo assembled · ${esc(a.username)}</span>
      <span class="alert-detail">Every piece is shown: ${esc(a.cards.join(" + "))}${produces ? ` → ${esc(produces.toLowerCase())}` : ""}.</span>
    </div>`;
  }
  return `<div class="alert">
    <span class="alert-label">One card away · ${esc(a.username)}</span>
    ${produces ? `<span class="alert-title">One card from ${esc(produces.toLowerCase())}</span>` : ""}
    <span class="alert-detail">Shown: ${esc(a.shown.join(", "))}. Missing: ${esc(a.missing.join(", "))}.</span>
  </div>`;
}

// ---------------------------------------------------------------------------------------------
// Body.

function body(ctx: Ctx): string {
  const v = ctx.view;
  if (v.phase === "idle") return idle(ctx);
  if (v.phase === "lobby") return lobby(ctx);
  if (v.ended) return over(ctx);
  if (v.mode === "solo") return playtest(ctx);
  if (v.mode === "spectator") return spectating(ctx);
  return game(ctx);
}

function idle(ctx: Ctx): string {
  const summary = ctx.status?.summary;
  const stored = ctx.status?.stored;
  const lastGame = summary?.lastGame;
  const resultTag = (r: string) =>
    r === "win" ? `<span class="result-tag win">WIN</span>` : r === "loss" ? `<span class="result-tag loss">LOSS</span>` : `<span class="result-tag">NO RESULT</span>`;

  const lastCard = lastGame
    ? `<a class="last" href="${esc(`${ctx.base}/games/${encodeURIComponent(lastGame.id)}`)}" target="_blank" rel="noreferrer">
        <div class="last-art">${lastGame.myCommander ? artImg(ctx.base, lastGame.myCommander, "") : ""}${resultTag(lastGame.result)}</div>
        <div class="last-body">
          <span class="section-label">Last game · ${esc(agoLabel(lastGame.startedAt))}</span>
          <span class="bold">${esc(lastGame.myCommander ? shortName(lastGame.myCommander) : "Your deck")} vs ${esc(lastGame.opponents.join(", ") || "unknown opponents")}</span>
          <span class="muted small">${lastGame.rounds || "?"} rounds · open the report →</span>
        </div>
      </a>`
    : "";

  const tiles =
    summary && stored
      ? `<div class="tiles">
          <div class="tile"><div class="tile-value">${summary.record.games}</div><div class="tile-label">games</div></div>
          <div class="tile"><div class="tile-value">${stored.playtests}</div><div class="tile-label">playtests</div></div>
          <div class="tile"><div class="tile-value">${summary.record.wins}–${summary.record.losses}</div><div class="tile-label">record</div></div>
        </div>`
      : "";

  return `<div class="idle-head">
      <span class="idle-title">No game open</span>
      <span class="idle-text">Open a game, a spectated game or a solo playtest on edhplay.com and Lens records it on its own.</span>
    </div>
    ${lastCard}${tiles}
    <a class="big-btn push" href="${esc(`${ctx.base}/games`)}" target="_blank" rel="noreferrer">Open the Workbench</a>`;
}

function lobby(ctx: Ctx): string {
  const seats = ctx.view.players.map((p) => {
    const d = p.dossier;
    if (p.isMe) {
      return `<div class="seat me"><div class="seat-row">${artImg(ctx.base, undefined, "avatar")}
        <div class="seat-who"><span class="seat-name">${esc(p.username)} (you)</span><span class="seat-sub">Your seat</span></div></div></div>`;
    }
    if (!d) {
      const sub = ctx.offline ? "History needs the Workbench" : "Looking up your history";
      return `<div class="seat"><div class="seat-row">${artImg(ctx.base, undefined, "avatar")}
        <div class="seat-who"><span class="seat-name">${esc(p.username)}</span><span class="seat-sub">${sub}</span></div></div></div>`;
    }
    if (!d.known) {
      return `<div class="seat"><div class="seat-row">${artImg(ctx.base, undefined, "avatar")}
        <div class="seat-who"><span class="seat-name">${esc(p.username)}</span><span class="seat-sub">first time you've met</span></div>
        <span class="record new">New</span></div>${notes(d)}</div>`;
    }
    const lead = d.myWins > d.myLosses ? "ahead" : d.myWins < d.myLosses ? "behind" : "";
    const usual = d.commanders[0];
    const commanderLine = !usual
      ? ""
      : d.commanders.length === 1
        ? `${usual.games > 1 ? "Always" : "Played"} ${esc(usual.name)}`
        : `Usually ${esc(usual.name)} (${usual.games}×), ${d.commanders.length === 2 ? `${times(d.commanders[1].games)} ${esc(shortName(d.commanders[1].name))}` : `${d.commanders.length - 1} others`}`;
    const shows = d.topCards.slice(0, 3).map((c) => esc(c.name)).join(", ");
    const sub = `met ${times(d.games)}${d.lastSeen ? ` · last ${esc(agoLabel(d.lastSeen))}` : ""}`;
    return `<div class="seat"><div class="seat-row">${artImg(ctx.base, usual?.name, "avatar")}
      <div class="seat-who"><span class="seat-name">${esc(p.username)}</span><span class="seat-sub">${sub}</span></div>
      <span class="record ${lead}">${d.myWins}–${d.myLosses}</span></div>
      <div class="history">
        ${commanderLine ? `<span>${commanderLine}</span>` : ""}
        ${shows ? `<span class="muted">Shows most: ${shows}</span>` : ""}
        ${noteLines(d)}
      </div></div>`;
  });
  return `<span class="hint">History from past games only. Decklists never show here.</span>${seats.join("")}`;
}

/** The note and tags of a first-time player, who has no history block of their own. */
function notes(d: NonNullable<PanelPlayer["dossier"]>): string {
  const lines = noteLines(d);
  return lines ? `<div class="history">${lines}</div>` : "";
}

function noteLines(d: NonNullable<PanelPlayer["dossier"]>): string {
  const tags = d.tags && d.tags.length > 0 ? `<span class="chips">${d.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</span>` : "";
  const note = d.note ? `<span class="note-line">Your note: ${esc(d.note)}</span>` : "";
  return tags + note;
}

/** One line of history for an opponent's seat during a game. */
function historyLine(p: PanelPlayer, ctx: Ctx): string {
  if (p.isMe) return "";
  const d = p.dossier;
  if (!d) return ctx.offline ? "History needs the Workbench." : "";
  if (!d.known) return d.note ? `First time you've met · your note: ${esc(d.note)}` : "First time you've met.";
  const parts = [`Met ${d.games}×`];
  if (d.myWins + d.myLosses > 0) {
    parts.push(d.myWins > d.myLosses ? `you lead ${d.myWins}–${d.myLosses}` : d.myWins < d.myLosses ? `they lead ${d.myLosses}–${d.myWins}` : `even at ${d.myWins}–${d.myLosses}`);
  }
  if (d.theirWins > 0) parts.push(`they won ${d.theirWins}`);
  if (d.topCards[0]) parts.push(`casts ${esc(d.topCards[0].name)} most games`);
  if (d.note) parts.push(`your note: ${esc(d.note)}`);
  return parts.join(" · ");
}

function outChip(p: PanelPlayer): string {
  return p.status === "eliminated" ? `<span class="out-chip">OUT${p.eliminatedRound ? ` · R${p.eliminatedRound}` : ""}</span>` : "";
}

function game(ctx: Ctx): string {
  const v = ctx.view;
  const seats = v.players.map((p) => {
    const out = p.status === "eliminated";
    const damage = p.commanderDamage.length > 0 ? `<span class="damage">Commander damage: ${p.commanderDamage.map((d) => `${d.amount} from ${esc(d.from)}`).join(", ")}</span>` : "";
    const hist = historyLine(p, ctx);
    return `<div class="seat${p.isMe ? " me" : ""}${out ? " out" : ""}">
      <div class="seat-row">
        ${artImg(ctx.base, p.commanders[0], "avatar")}
        <div class="seat-who"><span class="seat-name">${esc(seatName(p, v))}${outChip(p)}</span><span class="seat-sub">${esc(p.commanders.join(" + ") || "Commander not seen yet")}</span></div>
        ${out ? "" : sparkline(p.lifeTrend)}
        <div class="life-box"><span class="life">${p.life}</span>${out ? "" : delta(p.lifeDelta)}</div>
      </div>
      <div class="stats">
        ${p.handCount !== undefined ? `<span>Hand <b>${p.handCount}</b></span>` : ""}
        <span>Board <b>${p.onBattlefield}</b></span>
        <span>Lands <b>${p.landDrops}</b></span>
        <span>Tax <b>${p.commanderTax}</b></span>
        ${p.mulligans > 0 ? `<span>Mulligans <b>${p.mulligans}</b></span>` : ""}
      </div>
      ${damage}
      ${hist ? `<div class="history">${hist}</div>` : ""}
    </div>`;
  });

  const plays = v.recent.slice(0, 6).map((r) => {
    const who = v.players.find((p) => p.username === r.username)?.isMe ? "you" : r.username;
    return `<div class="play">${artImg(ctx.base, r.card, "play-art")}<span><b>${esc(r.card)}</b> <span class="play-who">${esc(who)} · R${r.round}</span></span></div>`;
  });

  return `${v.joinedMidGame ? `<span class="hint">Lens joined after the first round, so early turns are missing.</span>` : ""}
    ${seats.join("")}
    ${plays.length > 0 ? `<span class="section-label">Last plays</span>${plays.join("")}` : ""}`;
}

function playtest(ctx: Ctx): string {
  const v = ctx.view;
  const seats = v.players.map((p) => {
    const commander = p.commanderFirstRound !== undefined ? `cast R${p.commanderFirstRound}` : "not yet";
    // EDHPlay's playtest log names cards without their types, so the live parse can't tell lands
    // apart. The Workbench fills the types in from its card cache when the playtest is stored.
    const lands =
      p.landDrops > 0
        ? `<span>Lands <b>${p.landDrops}</b></span>`
        : `<span title="The playtest log doesn't say which cards are lands. The Workbench counts them once the playtest is saved.">Lands <b>–</b></span>`;
    return `<div class="seat${p.status === "eliminated" ? " out" : ""}">
      <div class="seat-row">
        ${artImg(ctx.base, p.commanders[0], "avatar")}
        <div class="seat-who"><span class="seat-name">${esc(p.username || "Seat")}${outChip(p)}</span><span class="seat-sub">${esc(p.deckName ?? (p.commanders[0] ? shortName(p.commanders[0]) : "Deck not matched yet"))}</span></div>
        <div class="life-box"><span class="life">${p.life}</span>${delta(p.lifeDelta)}</div>
      </div>
      <div class="stats"><span>Played <b>${p.cardsPlayed}</b></span>${lands}<span>Commander <b>${commander}</b></span></div>
    </div>`;
  });
  const plays = v.recent.slice(0, 6).map((r) => `<span><b>${esc(r.card)}</b> <span class="play-who">${esc(r.username)} · R${r.round}</span></span>`);
  return `${seats.join("")}${plays.length > 0 ? `<span class="section-label">Last plays</span>${plays.join("")}` : ""}`;
}

function spectating(ctx: Ctx): string {
  const v = ctx.view;
  return v.players
    .map((p) => {
      const out = p.status === "eliminated";
      let line: string;
      if (out) {
        line = p.eliminatedRound ? `Out in round ${p.eliminatedRound}` : "Out";
      } else {
        const parts: string[] = [];
        if (p.handCount !== undefined) parts.push(`Hand ${p.handCount}`);
        parts.push(`board ${p.onBattlefield}`);
        if (p.commanderDamage.length > 0) parts.push(`commander damage: ${p.commanderDamage.map((d) => `${d.amount} from ${esc(d.from)}`).join(", ")}`);
        const d = p.dossier;
        if (d?.known) {
          parts.push(d.myWins + d.myLosses > 0 ? `you're ${d.myWins}–${d.myLosses} against them` : `you've met them ${times(d.games)}`);
        }
        line = parts.join(" · ");
      }
      return `<div class="seat${out ? " out" : ""}">
        <div class="seat-row">
          ${artImg(ctx.base, p.commanders[0], "avatar")}
          <div class="seat-who"><span class="seat-name">${esc(p.username || "Unknown")}</span><span class="seat-sub">${esc(p.commanders.join(" + ") || "Commander not seen yet")}</span></div>
          <div class="life-box"><span class="life">${p.life}</span>${out ? "" : delta(p.lifeDelta)}</div>
        </div>
        <span class="seat-line">${line}</span>
      </div>`;
    })
    .join("");
}

function over(ctx: Ctx): string {
  const v = ctx.view;
  const me = v.mode === "player" ? v.players.find((p) => p.isMe) : v.mode === "solo" ? v.players[0] : undefined;
  const winner = v.players.find((p) => p.username === v.winner);

  let title: string;
  let tone: string;
  if (v.mode === "spectator") {
    title = winner ? `${winner.username} won` : "Game over";
    tone = "watch";
  } else if (v.mode === "solo") {
    title = "Playtest over";
    tone = "test";
  } else if (winner?.isMe) {
    title = "You won";
    tone = "win";
  } else if (winner || me?.status === "eliminated") {
    title = "You lost";
    tone = "loss";
  } else {
    title = "Game over";
    tone = "";
  }

  const heroSeat = v.mode === "spectator" ? (winner ?? v.players[0]) : me;
  const heroCommander = heroSeat?.commanders[0];
  const subParts: string[] = [];
  if (heroCommander) subParts.push(shortName(heroCommander));
  if (heroSeat && heroSeat.status !== "eliminated") subParts.push(`${heroSeat.life} life left`);
  if (v.durationMin) subParts.push(`${v.durationMin} minutes`);

  // Winner first, then the seats still in, then the rest by how late they went out.
  const standings = [...v.players].sort((a, b) => {
    const rank = (p: PanelPlayer) => (p.username === v.winner ? 2 : p.status !== "eliminated" ? 1 : 0);
    return rank(b) - rank(a) || (b.eliminatedSeq ?? b.eliminatedRound ?? 0) - (a.eliminatedSeq ?? a.eliminatedRound ?? 0);
  });
  const rows = standings.map((p, i) => {
    const how = p.username === v.winner ? "winner" : p.status === "eliminated" ? (p.eliminatedRound ? `out in round ${p.eliminatedRound}` : "out") : "still in at the end";
    return `<div class="standing"><span class="place">${i + 1}</span>${artImg(ctx.base, p.commanders[0], "avatar")}
      <div class="seat-who"><span class="seat-name">${esc(seatName(p, v))}</span><span class="seat-sub">${how}</span></div>
      <span class="standing-life">${p.life}</span></div>`;
  });

  const tiles = me
    ? `<div class="tiles small-tiles">
        <div class="tile"><div class="tile-value">${me.commanderFirstRound !== undefined ? `R${me.commanderFirstRound}` : "–"}</div><div class="tile-label">commander out</div></div>
        <div class="tile"><div class="tile-value">${me.cardsPlayed}</div><div class="tile-label">cards played</div></div>
        <div class="tile"><div class="tile-value">${me.handCount ?? "–"}</div><div class="tile-label">left in hand</div></div>
      </div>`
    : "";

  const summaryGame = ctx.status?.summary?.lastGame;
  const reportUrl =
    v.mode === "solo"
      ? `${ctx.base}/games?kind=playtests`
      : summaryGame && v.captureId && summaryGame.captureIds.includes(v.captureId)
        ? `${ctx.base}/games/${encodeURIComponent(summaryGame.id)}`
        : `${ctx.base}/games`;
  const reportLabel = reportUrl.includes("/games/") ? "Open the full report" : v.mode === "solo" ? "Open your playtests" : "Open your games";
  const saved =
    v.mode === "solo"
      ? "Saved under Playtests, apart from your real games."
      : v.mode === "spectator"
        ? "Saved under Games as a spectated game. It never counts toward your record."
        : "Saved. Opponents' decklists are fetched now that the game is over.";

  return `<div class="hero">${heroCommander ? artImg(ctx.base, heroCommander, "") : ""}
      <div class="hero-text"><span class="hero-title ${tone}">${esc(title)}</span>${subParts.length > 0 ? `<span class="hero-sub">${esc(subParts.join(" · "))}</span>` : ""}</div>
    </div>
    <span class="section-label">Final standings</span>
    ${rows.join("")}
    ${tiles}
    <div class="spacer"></div>
    <a class="big-btn primary" href="${esc(reportUrl)}" target="_blank" rel="noreferrer">${reportLabel}</a>
    <span class="muted small centered">${ctx.offline ? "Saved here. It reaches the Workbench once it's running again." : saved}</span>`;
}

// ---------------------------------------------------------------------------------------------
// Footer.

function footer(ctx: Ctx): string {
  const v = ctx.view;
  const ok = !ctx.offline;
  const dot = `<span class="dot ${ok ? "ok" : "down"}"></span>`;
  if (v.phase === "idle") {
    const me = ctx.status?.stored?.me;
    return me ? `Signed in on EDHPlay as ${esc(me)}` : "Open edhplay.com while signed in so Lens knows your seat.";
  }
  if (v.phase === "lobby") return `${dot}Recording starts when the game does`;
  if (v.ended) return `${dot}${ok ? "Saved to the Workbench" : "Waiting for the Workbench"}`;
  if (v.mode === "solo") return "Seats are matched to your decks by the cards they play";
  if (v.mode === "spectator") return `${dot}Recording. Spectated games never count toward your record.`;
  return `${dot}${ok ? "Recording to the Workbench" : "Recording here until the Workbench is back"}`;
}
