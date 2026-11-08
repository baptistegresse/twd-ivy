import { describe, expect, test } from "vitest";
import {
  SEASONS,
  TOTAL_EPISODES,
  episodeIndex,
  episodeLabel,
  isValidEpisode,
} from "./episodes";

describe("episodes", () => {
  test("has 11 seasons and 177 episodes in total", () => {
    expect(SEASONS).toHaveLength(11);
    expect(TOTAL_EPISODES).toBe(177);
  });

  test("episodeIndex is 1-based and continuous across seasons", () => {
    expect(episodeIndex(1, 1)).toBe(1);
    expect(episodeIndex(1, 6)).toBe(6);
    expect(episodeIndex(2, 1)).toBe(7);
    expect(episodeIndex(11, 24)).toBe(177);
  });

  test("isValidEpisode rejects out-of-range values", () => {
    expect(isValidEpisode(1, 6)).toBe(true);
    expect(isValidEpisode(1, 7)).toBe(false);
    expect(isValidEpisode(0, 1)).toBe(false);
    expect(isValidEpisode(12, 1)).toBe(false);
    expect(isValidEpisode(3, 0)).toBe(false);
    expect(isValidEpisode(1.5, 1)).toBe(false);
  });

  test("episodeLabel formats as S01E03", () => {
    expect(episodeLabel(1, 3)).toBe("S01E03");
    expect(episodeLabel(11, 24)).toBe("S11E24");
  });
});
