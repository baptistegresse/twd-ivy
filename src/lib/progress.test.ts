import { describe, expect, test } from "vitest";
import { computeProgress, compareProgress, canSeeEntry } from "./progress";
import type { Entry } from "./types";

const entry = (
  season: number,
  episode: number,
  overrides: Partial<Entry> = {},
): Entry => ({
  user: "baptiste",
  season,
  episode,
  rating: 4,
  note: "",
  watchedAt: new Date("2026-11-01T20:00:00Z"),
  ...overrides,
});

describe("computeProgress", () => {
  test("returns empty progress when nothing is watched", () => {
    const progress = computeProgress([]);
    expect(progress).toEqual({
      watchedCount: 0,
      percent: 0,
      furthest: null,
      averageRating: null,
    });
  });

  test("tracks the furthest episode, count, percent and average", () => {
    const progress = computeProgress([
      entry(1, 1, { rating: 5 }),
      entry(2, 3, { rating: 2 }),
      entry(1, 2, { rating: 3 }),
    ]);
    expect(progress.watchedCount).toBe(3);
    expect(progress.furthest).toEqual({ season: 2, episode: 3, index: 9 });
    expect(progress.averageRating).toBeCloseTo(3.33, 2);
    expect(progress.percent).toBeCloseTo((3 / 177) * 100, 5);
  });
});

describe("compareProgress", () => {
  test("says who is ahead and by how many episodes", () => {
    const me = computeProgress([entry(1, 5)]);
    const other = computeProgress([entry(1, 2)]);
    expect(compareProgress(me, other)).toEqual({ leader: "me", gap: 3 });
    expect(compareProgress(other, me)).toEqual({ leader: "other", gap: 3 });
  });

  test("reports a tie when both are at the same episode", () => {
    const a = computeProgress([entry(3, 4)]);
    expect(compareProgress(a, a)).toEqual({ leader: "tie", gap: 0 });
    expect(compareProgress(computeProgress([]), computeProgress([]))).toEqual({
      leader: "tie",
      gap: 0,
    });
  });
});

describe("canSeeEntry (spoiler shield)", () => {
  test("hides the other's note until I've reached that episode", () => {
    const myProgress = computeProgress([entry(1, 3)]);
    expect(canSeeEntry(myProgress, 1, 3)).toBe(true);
    expect(canSeeEntry(myProgress, 1, 2)).toBe(true);
    expect(canSeeEntry(myProgress, 1, 4)).toBe(false);
    expect(canSeeEntry(computeProgress([]), 1, 1)).toBe(false);
  });
});
