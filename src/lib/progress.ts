import { TOTAL_EPISODES, episodeIndex } from "./episodes";
import type { Entry, EpisodePosition, Progress } from "./types";

export type Leader = "me" | "other" | "tie";

export interface Comparison {
  leader: Leader;
  gap: number;
}

export function computeProgress(entries: readonly Entry[]): Progress {
  if (entries.length === 0) {
    return { watchedCount: 0, percent: 0, furthest: null, averageRating: null };
  }

  const furthest = entries.reduce<EpisodePosition | null>((best, { season, episode }) => {
    const index = episodeIndex(season, episode);
    return best && best.index >= index ? best : { season, episode, index };
  }, null);

  const ratings = entries.flatMap(({ rating }) => (rating === null ? [] : [rating]));
  const averageRating = ratings.length
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : null;

  return {
    watchedCount: entries.length,
    percent: (entries.length / TOTAL_EPISODES) * 100,
    furthest,
    averageRating,
  };
}

export function compareProgress(me: Progress, other: Progress): Comparison {
  const diff = (me.furthest?.index ?? 0) - (other.furthest?.index ?? 0);
  if (diff === 0) return { leader: "tie", gap: 0 };
  return { leader: diff > 0 ? "me" : "other", gap: Math.abs(diff) };
}

/** Spoiler shield: only reveal the other's entry once I've reached that episode. */
export function canSeeEntry(myProgress: Progress, season: number, episode: number): boolean {
  if (!myProgress.furthest) return false;
  return episodeIndex(season, episode) <= myProgress.furthest.index;
}
