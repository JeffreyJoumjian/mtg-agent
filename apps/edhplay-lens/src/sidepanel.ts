/** The side panel: the live game in the active tab, history for the players at the table, combo
 *  watch on revealed cards, and whether the Workbench is receiving records. It renders whatever
 *  the service worker sends; it keeps no state of its own beyond the tab it watches. */
import type { PanelPlayer, PanelView } from "./core";

interface StatusView {
  workbench: "ok" | "down" | "unknown";
  queued: number;
  lastError?: string;
  workbenchUrl: string;
  version: string;
  stored?: { captures: number; playtests: number; matches: number; me: string | null };
}

const main = document.getElementById("main");
const statusEl = document.getElementById("status");
const errorEl = document.getElementById("error");
const workbenchInput = document.getElementById("workbench");

const port = chrome.runtime.connect({ name: "sidepanel" });

async function watchActiveTab(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id !== undefined) port.postMessage({ kind: "watch", tabId: tab.id });
}

chrome.tabs.onActivated.addListener(() => void watchActiveTab());
void watchActiveTab();

document.getElementById("save")?.addEventListener("click", () => {
  if (workbenchInput instanceof HTMLInputElement) port.postMessage({ kind: "set_workbench", url: workbenchInput.value.trim() });
});
document.getElementById("retry")?.addEventListener("click", () => port.postMessage({ kind: "retry" }));

port.onMessage.addListener((m: unknown) => {
  if (typeof m !== "object" || m === null || !("kind" in m) || m.kind !== "state") return;
  const status: unknown = Reflect.get(m, "status");
  const view: unknown = Reflect.get(m, "view");
  if (isStatus(status)) renderStatus(status);
  if (isView(view) && main) main.innerHTML = renderView(view, isStatus(status) ? status : null);
});

function isStatus(v: unknown): v is StatusView {
  return typeof v === "object" && v !== null && "workbench" in v && "queued" in v;
}

function isView(v: unknown): v is PanelView {
  return typeof v === "object" && v !== null && "phase" in v && "players" in v && Array.isArray(v.players);
}

const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function renderStatus(s: StatusView): void {
  if (statusEl) {
    const color = s.workbench === "ok" ? "var(--good)" : s.workbench === "down" ? "var(--bad)" : "var(--muted)";
    const label = s.workbench === "ok" ? "Workbench connected" : s.workbench === "down" ? "Workbench offline" : "Checking…";
    statusEl.innerHTML = `<span class="dot" style="background:${color}"></span>${label}${s.queued > 0 ? ` · ${s.queued} waiting` : ""}`;
  }
  if (errorEl) errorEl.textContent = s.lastError ?? "";
  if (workbenchInput instanceof HTMLInputElement && document.activeElement !== workbenchInput) workbenchInput.value = s.workbenchUrl;
}

function sparkline(values: number[]): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => `${((i / (values.length - 1)) * 68 + 1).toFixed(1)},${(21 - ((v - min) / span) * 20).toFixed(1)}`).join(" ");
  return `<svg class="spark" viewBox="0 0 70 22" aria-hidden="true"><polyline points="${pts}" /></svg>`;
}

function history(p: PanelPlayer): string {
  const d = p.dossier;
  if (p.isMe || !d) return "";
  if (!d.known) {
    return `<div class="history muted">First time you've met ${esc(p.username)}.${d.note ? ` Note: ${esc(d.note)}` : ""}</div>`;
  }
  const commanders = d.commanders
    .slice(0, 3)
    .map((c) => `${esc(c.name)}${c.games > 1 ? ` ×${c.games}` : ""}`)
    .join(", ");
  const cards = d.topCards
    .slice(0, 6)
    .map((c) => esc(c.name))
    .join(", ");
  return `<div class="history">
    <div>Met ${d.games}× · you're ${d.myWins}–${d.myLosses} at their table · they won ${d.theirWins}</div>
    ${commanders ? `<div class="muted">Played before: ${commanders}</div>` : ""}
    ${cards ? `<div class="muted">Cards they've shown most: ${cards}</div>` : ""}
    ${d.tags && d.tags.length > 0 ? `<div>${d.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
    ${d.note ? `<div>Note: ${esc(d.note)}</div>` : ""}
  </div>`;
}

function combos(p: PanelPlayer): string {
  const c = p.combos;
  if (!c) return "";
  const shown = c.included
    .slice(0, 4)
    .map((x) => `<div class="combo">Combo shown: <b>${esc(x.cards.join(" + "))}</b> → ${esc(x.produces.slice(0, 2).join(", "))}</div>`)
    .join("");
  const almost = c.almostIncluded
    .slice(0, 3)
    .map((x) => `<div class="combo almost">One card away: ${esc(x.cards.join(" + "))} (needs ${esc(x.missing.join(", "))})</div>`)
    .join("");
  return shown + almost;
}

function playerCard(p: PanelPlayer, phase: PanelView["phase"]): string {
  const out = p.status === "eliminated";
  const stats =
    phase === "game"
      ? `<div class="stats">
          ${p.handCount !== undefined ? `<span>Hand <b>${p.handCount}</b></span>` : ""}
          ${p.libraryCount !== undefined ? `<span>Library <b>${p.libraryCount}</b></span>` : ""}
          <span>Board <b>${p.onBattlefield}</b></span>
          <span>Played <b>${p.cardsPlayed}</b></span>
          <span>Lands <b>${p.landDrops}</b></span>
          ${p.mulligans > 0 ? `<span>Mulligans <b>${p.mulligans}</b></span>` : ""}
          ${p.commanderCasts > 0 ? `<span>Tax <b>${p.commanderTax}</b></span>` : ""}
        </div>`
      : "";
  const damage = p.commanderDamage.length > 0 ? `<div class="small muted">Commander damage taken: ${p.commanderDamage.map((d) => `${d.amount} from ${esc(d.from)}`).join(", ")}</div>` : "";
  return `<div class="card${p.isMe ? " me" : ""}${out ? " out" : ""}">
    <div class="top">
      <span class="name">${esc(p.username || "Unknown")}</span>${p.isMe ? '<span class="tag">you</span>' : ""}${out ? '<span class="tag">out</span>' : ""}
      ${phase === "game" ? `${sparkline(p.lifeTrend)}<span class="life">${p.life}</span>` : ""}
    </div>
    ${p.commanders.length > 0 ? `<div class="small">${esc(p.commanders.join(" + "))}</div>` : ""}
    ${stats}${damage}${history(p)}${combos(p)}
  </div>`;
}

function renderView(view: PanelView, status: StatusView | null): string {
  if (view.phase === "idle") {
    const stored = status?.stored;
    return `<p>Open a game, a spectated game or a solo playtest on edhplay.com and Lens records it on its own.</p>
      ${stored ? `<p class="muted">Stored so far: ${stored.captures} games, ${stored.playtests} playtests, ${stored.matches} EDHPlay matches${stored.me ? `, signed in as ${esc(stored.me)}` : ""}.</p>` : ""}
      <p class="muted">History, card stats and the meta are in the Workbench under Games, Meta and Players.</p>`;
  }

  if (view.phase === "lobby") {
    return `<div class="headline">Lobby · ${view.players.length} seated</div>
      <p class="muted small">History with each player, from past games only.</p>
      ${view.players.map((p) => playerCard(p, "lobby")).join("")}`;
  }

  const modeTag = view.mode === "spectator" ? '<span class="tag move">Spectating</span>' : view.mode === "solo" ? '<span class="tag warn">Playtest</span>' : "";
  const feed = view.recent.length
    ? `<div><div class="headline small">Recent plays</div><ul class="feed">${view.recent
        .map((r) => `<li>R${r.round} · ${esc(r.username)} ${r.kind === "token" ? "made" : r.kind === "put" ? "put out" : "played"} <b>${esc(r.card)}</b></li>`)
        .join("")}</ul></div>`
    : "";
  const heading = view.ended ? `Game over · ${view.round ?? "?"} rounds` : `Round ${view.round ?? "?"}${view.activePlayer ? ` · ${esc(view.activePlayer)}'s turn` : ""}`;
  return `<div class="headline">${heading}${modeTag}</div>
    ${view.ended ? '<p class="muted small">Saved to the Workbench. The full report is under Games.</p>' : ""}
    ${view.joinedMidGame ? '<p class="muted small">Lens joined after the first round, so early turns are missing.</p>' : ""}
    ${view.players.map((p) => playerCard(p, "game")).join("")}
    ${feed}`;
}
