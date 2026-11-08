import rawEpisodes from "@/data/episodes.json";

/** Episode metadata snapshotted from TVmaze (see scripts/fetch-episodes.mjs). */
export interface EpisodeMeta {
  season: number;
  episode: number;
  title: string;
  airdate: string;
  runtime: number | null;
  summary: string;
  thumb: string | null;
  still: string | null;
}

const EPISODES: readonly EpisodeMeta[] = rawEpisodes;

const BY_KEY: ReadonlyMap<string, EpisodeMeta> = new Map(
  EPISODES.map((meta) => [`${meta.season}-${meta.episode}`, meta]),
);

const FALLBACK_TITLE = "Untitled episode";

export function getEpisodeMeta(season: number, episode: number): EpisodeMeta {
  return (
    BY_KEY.get(`${season}-${episode}`) ?? {
      season,
      episode,
      title: FALLBACK_TITLE,
      airdate: "",
      runtime: null,
      summary: "",
      thumb: null,
      still: null,
    }
  );
}

export const TVMAZE_CREDIT_URL = "https://www.tvmaze.com/shows/73/the-walking-dead";
