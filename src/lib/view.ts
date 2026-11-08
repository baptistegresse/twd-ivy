import { getEpisodeMeta, type EpisodeMeta } from "./catalog";
import { SEASONS, episodeLabel } from "./episodes";
import { canSeeEntry, compareProgress, computeProgress, type Comparison } from "./progress";
import { otherUser, type Entry, type EpisodePosition, type Progress, type UserId } from "./types";

export const ACTIVITY_LIMIT = 8;

export interface EntrySummary {
  rating: number;
  note: string;
}

export interface EpisodeView {
  season: number;
  episode: number;
  label: string;
  meta: EpisodeMeta;
  mine: EntrySummary | null;
  theirs: EntrySummary | "hidden" | null;
}

export interface SeasonView {
  season: number;
  total: number;
  myCount: number;
  otherCount: number;
  episodes: EpisodeView[];
}

export interface ActivityItem {
  user: UserId;
  label: string;
  title: string;
  image: string | null;
  rating: number;
  note: string;
  hidden: boolean;
  watchedAt: string;
}

export interface PersonView {
  user: UserId;
  progress: Progress;
}

export interface DashboardView {
  me: PersonView;
  other: PersonView;
  comparison: Comparison;
  openSeason: number;
  upNext: EpisodeView | null;
  seasons: SeasonView[];
  activity: ActivityItem[];
}

export function nextEpisode(
  furthest: EpisodePosition | null,
): { season: number; episode: number } | null {
  if (!furthest) return { season: 1, episode: 1 };
  const { season, episode } = furthest;
  if (episode < SEASONS[season - 1]) return { season, episode: episode + 1 };
  if (season < SEASONS.length) return { season: season + 1, episode: 1 };
  return null;
}

const keyOf = (season: number, episode: number) => `${season}-${episode}`;

const indexEntries = (entries: readonly Entry[]): ReadonlyMap<string, Entry> =>
  new Map(entries.map((entry) => [keyOf(entry.season, entry.episode), entry]));

const summarize = (entry: Entry | undefined): EntrySummary | null =>
  entry ? { rating: entry.rating, note: entry.note } : null;

function buildSeasons(
  mine: ReadonlyMap<string, Entry>,
  theirs: ReadonlyMap<string, Entry>,
  myProgress: Progress,
): SeasonView[] {
  return SEASONS.map((total, seasonIndex) => {
    const season = seasonIndex + 1;
    const episodes = Array.from({ length: total }, (_, episodeIndex): EpisodeView => {
      const episode = episodeIndex + 1;
      const key = keyOf(season, episode);
      const their = theirs.get(key);
      const isVisible = canSeeEntry(myProgress, season, episode);
      return {
        season,
        episode,
        label: episodeLabel(season, episode),
        meta: getEpisodeMeta(season, episode),
        mine: summarize(mine.get(key)),
        theirs: their && !isVisible ? "hidden" : summarize(their),
      };
    });
    return {
      season,
      total,
      episodes,
      myCount: episodes.filter((ep) => ep.mine).length,
      otherCount: episodes.filter((ep) => ep.theirs).length,
    };
  });
}

function buildActivity(entries: readonly Entry[], me: UserId, myProgress: Progress): ActivityItem[] {
  return [...entries]
    .sort((a, b) => b.watchedAt.getTime() - a.watchedAt.getTime())
    .slice(0, ACTIVITY_LIMIT)
    .map((entry) => {
      const hidden = entry.user !== me && !canSeeEntry(myProgress, entry.season, entry.episode);
      const meta = getEpisodeMeta(entry.season, entry.episode);
      return {
        user: entry.user,
        label: episodeLabel(entry.season, entry.episode),
        title: meta.title,
        image: meta.still ?? meta.thumb,
        rating: hidden ? 0 : entry.rating,
        note: hidden ? "" : entry.note,
        hidden,
        watchedAt: entry.watchedAt.toISOString(),
      };
    });
}

export function buildDashboard(entries: readonly Entry[], me: UserId): DashboardView {
  const other = otherUser(me);
  const myEntries = entries.filter((entry) => entry.user === me);
  const theirEntries = entries.filter((entry) => entry.user === other);
  const myProgress = computeProgress(myEntries);
  const theirProgress = computeProgress(theirEntries);

  const seasons = buildSeasons(indexEntries(myEntries), indexEntries(theirEntries), myProgress);
  const next = nextEpisode(myProgress.furthest);

  return {
    me: { user: me, progress: myProgress },
    other: { user: other, progress: theirProgress },
    comparison: compareProgress(myProgress, theirProgress),
    openSeason: next?.season ?? SEASONS.length,
    upNext: next ? seasons[next.season - 1].episodes[next.episode - 1] : null,
    seasons,
    activity: buildActivity(entries, me, myProgress),
  };
}
