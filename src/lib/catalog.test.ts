import { describe, expect, test } from "vitest";
import { getEpisodeMeta } from "./catalog";
import { SEASONS } from "./episodes";

describe("catalog", () => {
  test("has a title and an image for every episode the app tracks", () => {
    SEASONS.forEach((count, seasonIndex) => {
      for (let episode = 1; episode <= count; episode += 1) {
        const meta = getEpisodeMeta(seasonIndex + 1, episode);
        expect(meta.title, `S${seasonIndex + 1}E${episode}`).not.toBe("Untitled episode");
        expect(meta.still ?? meta.thumb).toMatch(/^https:\/\/static\.tvmaze\.com\//);
      }
    });
  });

  test("knows the pilot", () => {
    expect(getEpisodeMeta(1, 1).title).toBe("Days Gone Bye");
  });

  test("falls back gracefully for unknown episodes", () => {
    expect(getEpisodeMeta(99, 1)).toMatchObject({ title: "Untitled episode", still: null });
  });
});
