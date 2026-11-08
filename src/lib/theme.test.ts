import { describe, expect, test } from "vitest";
import { stillSizing, themeFor, themeCopy } from "./theme";

describe("theme", () => {
  test("Ivy gets her pixel garden, Baptiste gets the classic look", () => {
    expect(themeFor("ivy")).toBe("ivy");
    expect(themeFor("baptiste")).toBe("classic");
  });

  test("pixel theme requests tiny images so they upscale into pixel art", () => {
    expect(stillSizing("classic", "hero")).toMatchObject({ pixelWidth: null });
    expect(stillSizing("classic", "hero").sizes).toContain("100vw");
    expect(stillSizing("ivy", "hero").pixelWidth).toBe(128);
    expect(stillSizing("ivy", "thumb").pixelWidth).toBe(64);
  });

  test("each theme has its own copy", () => {
    expect(themeCopy("classic").upNext).toBe("Up next for you");
    expect(themeCopy("ivy").upNext).toContain("Ivy");
    expect(themeCopy("ivy").footer).toContain("Ivy of love");
    expect(themeCopy("classic").footer).toBeNull();
  });
});
