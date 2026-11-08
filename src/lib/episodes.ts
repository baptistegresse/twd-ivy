/** Episode count per season of The Walking Dead (S1 → S11). */
export const SEASONS: readonly number[] = [6, 13, 16, 16, 16, 16, 16, 16, 16, 22, 24];

export const TOTAL_EPISODES: number = SEASONS.reduce((sum, count) => sum + count, 0);

export function isValidEpisode(season: number, episode: number): boolean {
  if (!Number.isInteger(season) || !Number.isInteger(episode)) return false;
  if (season < 1 || season > SEASONS.length) return false;
  return episode >= 1 && episode <= SEASONS[season - 1];
}

/** 1-based position of an episode across the whole series. */
export function episodeIndex(season: number, episode: number): number {
  const previous = SEASONS.slice(0, season - 1).reduce((sum, count) => sum + count, 0);
  return previous + episode;
}

export function episodeLabel(season: number, episode: number): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `S${pad(season)}E${pad(episode)}`;
}
