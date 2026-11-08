import { describe, expect, test } from "vitest";
import { buildDashboard, nextEpisode } from "./view";
import type { Entry, UserId } from "./types";

const entry = (
  user: UserId,
  season: number,
  episode: number,
  overrides: Partial<Entry> = {},
): Entry => ({
  user,
  season,
  episode,
  rating: 4,
  note: "",
  watchedAt: new Date(`2026-11-0${episode}T20:00:00Z`),
  ...overrides,
});

describe("nextEpisode", () => {
  test("starts at S01E01, rolls over seasons and stops at the end", () => {
    expect(nextEpisode(null)).toEqual({ season: 1, episode: 1 });
    expect(nextEpisode({ season: 1, episode: 3, index: 3 })).toEqual({ season: 1, episode: 4 });
    expect(nextEpisode({ season: 1, episode: 6, index: 6 })).toEqual({ season: 2, episode: 1 });
    expect(nextEpisode({ season: 11, episode: 24, index: 177 })).toBeNull();
  });
});

describe("buildDashboard", () => {
  const entries = [
    entry("baptiste", 1, 1, { rating: 5, note: "Rick à l'hosto" }),
    entry("baptiste", 1, 2),
    entry("ivy", 1, 1, { rating: 3, note: "Bof" }),
    entry("ivy", 1, 2),
    entry("ivy", 1, 3, { note: "Spoiler !" }),
  ];

  test("puts the current user first and compares progress", () => {
    const view = buildDashboard(entries, "baptiste");
    expect(view.me.user).toBe("baptiste");
    expect(view.other.user).toBe("ivy");
    expect(view.comparison).toEqual({ leader: "other", gap: 1 });
    expect(view.openSeason).toBe(1);
  });

  test("hides the other's entries beyond my progress (spoiler shield)", () => {
    const view = buildDashboard(entries, "baptiste");
    const [ep1, , ep3] = view.seasons[0].episodes;
    expect(ep1.mine).toEqual({ rating: 5, note: "Rick à l'hosto" });
    expect(ep1.theirs).toEqual({ rating: 3, note: "Bof" });
    expect(ep3.mine).toBeNull();
    expect(ep3.theirs).toBe("hidden");
  });

  test("blurs the still of every episode I haven't watched yet", () => {
    const view = buildDashboard(entries, "baptiste");
    const [ep1, ep2, ep3] = view.seasons[0].episodes;
    expect([ep1.isStillBlurred, ep2.isStillBlurred, ep3.isStillBlurred]).toEqual([false, false, true]);
    expect(view.upNext?.isStillBlurred).toBe(true);
    expect(view.seasons[10].episodes[0].isStillBlurred).toBe(true);
  });

  test("the leader sees everything the other has watched", () => {
    const view = buildDashboard(entries, "ivy");
    const [, , ep3] = view.seasons[0].episodes;
    expect(ep3.mine).toEqual({ rating: 4, note: "Spoiler !" });
    expect(ep3.theirs).toBeNull();
  });

  test("points to my next episode, with its TVmaze metadata", () => {
    const view = buildDashboard(entries, "baptiste");
    expect(view.upNext).toMatchObject({ label: "S01E03", mine: null, theirs: "hidden" });
    expect(view.upNext?.meta.title).toBeTruthy();
    expect(buildDashboard([], "ivy").upNext?.meta.title).toBe("Days Gone Bye");
  });

  test("has nothing up next once the series is finished", () => {
    const finale = entry("baptiste", 11, 24, { watchedAt: new Date("2026-11-08T20:00:00Z") });
    expect(buildDashboard([finale], "baptiste").upNext).toBeNull();
  });

  test("builds a recent activity feed, newest first, with spoilers hidden", () => {
    const view = buildDashboard(entries, "baptiste");
    expect(view.activity[0]).toMatchObject({ user: "ivy", label: "S01E03", hidden: true });
    expect(view.activity[0].note).toBe("");
    expect(view.activity[0].title).toBeTruthy();
    expect(view.activity[0].image).toMatch(/^https:/);
    expect(view.activity).toHaveLength(5);
  });

  test("counts episodes watched per season for each of us", () => {
    const view = buildDashboard(entries, "baptiste");
    expect(view.seasons).toHaveLength(11);
    expect(view.seasons[0]).toMatchObject({ myCount: 2, otherCount: 3, total: 6 });
  });
});
