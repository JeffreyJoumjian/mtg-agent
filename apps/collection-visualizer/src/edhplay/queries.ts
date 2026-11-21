/** Query hooks over the EDHPlay server functions. The query cache is the only copy of the data. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeckGamesFn, getGameCardsFn, getGameCombosFn, getGameFn, getMetaFn, getOverviewFn, getPlayerFn, getPlayersFn, setPlayerNoteFn } from "./api";
import type { Kind } from "./ui";

export const edhplayKeys = {
  all: ["edhplay"] as const,
  overview: (kind: Kind) => ["edhplay", "overview", kind] as const,
  game: (id: string, kind: Kind) => ["edhplay", "game", kind, id] as const,
  meta: (includeSpectated: boolean) => ["edhplay", "meta", includeSpectated] as const,
  players: ["edhplay", "players"] as const,
  player: (username: string) => ["edhplay", "player", username.toLowerCase()] as const,
  deck: (slug: string, kind: Kind) => ["edhplay", "deck", slug, kind] as const,
};

/** New games arrive while the page is open (the extension writes as you play), so the list pages
 *  refetch every 20 seconds. */
const LIVE_REFRESH_MS = 20_000;

export function useOverview(kind: Kind) {
  return useQuery({
    queryKey: edhplayKeys.overview(kind),
    queryFn: () => getOverviewFn({ data: { kind } }),
    refetchInterval: LIVE_REFRESH_MS,
  });
}

/** A game report's first stage. A game still being played refetches every 20 seconds so the
 *  report fills in as it goes. */
export function useGame(id: string, kind: Kind) {
  return useQuery({
    queryKey: edhplayKeys.game(id, kind),
    queryFn: () => getGameFn({ data: { id, kind } }),
    refetchInterval: (q) => (q.state.data?.record.inProgress ? LIVE_REFRESH_MS : false),
  });
}

/** Card roles for a report. `live` keeps it refreshing while the game is being played. */
export function useGameCards(id: string, kind: Kind, live: boolean) {
  return useQuery({
    // `live` is in the key so the end of the game forces a fresh fetch instead of keeping the last
    // in-progress answer.
    queryKey: [...edhplayKeys.game(id, kind), "cards", live],
    queryFn: () => getGameCardsFn({ data: { id, kind } }),
    refetchInterval: live ? LIVE_REFRESH_MS : false,
  });
}

/** Combos among shown cards, and opponents' decklists once the game is over. The extension saves
 *  opponents' lists a few seconds after a game ends, so this keeps polling for two minutes after
 *  `endedAt` to pick them up. */
export function useGameCombos(id: string, kind: Kind, live: boolean, endedAt: number | undefined) {
  return useQuery({
    queryKey: [...edhplayKeys.game(id, kind), "combos", live],
    queryFn: () => getGameCombosFn({ data: { id, kind } }),
    refetchInterval: () =>
      live || (endedAt !== undefined && Date.now() - endedAt < 120_000) ? LIVE_REFRESH_MS : false,
  });
}

export function useMeta(includeSpectated: boolean) {
  return useQuery({
    queryKey: edhplayKeys.meta(includeSpectated),
    queryFn: () => getMetaFn({ data: { includeSpectated } }),
  });
}

export function usePlayers() {
  return useQuery({ queryKey: edhplayKeys.players, queryFn: () => getPlayersFn(), refetchInterval: LIVE_REFRESH_MS });
}

export function usePlayer(username: string) {
  return useQuery({ queryKey: edhplayKeys.player(username), queryFn: () => getPlayerFn({ data: { username } }) });
}

export function useDeckGames(slug: string, kind: Kind) {
  return useQuery({ queryKey: edhplayKeys.deck(slug, kind), queryFn: () => getDeckGamesFn({ data: { slug, kind } }) });
}

export function useSetPlayerNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { username: string; note: string; tags: string[] }) => setPlayerNoteFn({ data: vars }),
    onSuccess: (_d, vars) => {
      void qc.invalidateQueries({ queryKey: edhplayKeys.player(vars.username) });
      void qc.invalidateQueries({ queryKey: edhplayKeys.players });
    },
  });
}
