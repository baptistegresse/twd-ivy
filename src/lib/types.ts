export const USERS = ["baptiste", "ivy"] as const;

export type UserId = (typeof USERS)[number];

export const USER_NAMES: Readonly<Record<UserId, string>> = {
  baptiste: "Baptiste",
  ivy: "Ivy",
};

export interface Entry {
  user: UserId;
  season: number;
  episode: number;
  /** null = watched, not rated yet. */
  rating: number | null;
  note: string;
  watchedAt: Date;
}

export interface EpisodePosition {
  season: number;
  episode: number;
  index: number;
}

export interface Progress {
  watchedCount: number;
  percent: number;
  furthest: EpisodePosition | null;
  averageRating: number | null;
}

export type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export function otherUser(user: UserId): UserId {
  return user === "baptiste" ? "ivy" : "baptiste";
}
