import { describe, expect, test } from "vitest";
import { imageSizes, themeFor, themeCopy } from "./theme";

describe("theme", () => {
  test("Ivy gets her pixel garden, Baptiste gets the classic look", () => {
    expect(themeFor("ivy")).toBe("ivy");
    expect(themeFor("baptiste")).toBe("classic");
  });

  test("gives responsive sizes for each image slot", () => {
    expect(imageSizes("hero")).toContain("100vw");
    expect(imageSizes("card")).toBe("256px");
  });

  test("each theme has its own copy", () => {
    expect(themeCopy("classic").upNext).toBe("Up next for you");
    expect(themeCopy("ivy").upNext).toContain("Ivy");
    expect(themeCopy("ivy").footer).toContain("Ivy of love");
    expect(themeCopy("classic").footer).toBeNull();
  });
});
