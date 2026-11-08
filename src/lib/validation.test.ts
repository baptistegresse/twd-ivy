import { describe, expect, test } from "vitest";
import { parseEntryForm, parseLoginForm, NOTE_MAX_LENGTH } from "./validation";

const form = (values: Record<string, string>) => {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
};

describe("parseEntryForm", () => {
  test("accepts a valid rating with a short note", () => {
    const result = parseEntryForm(
      form({ season: "2", episode: "4", rating: "5", note: "  Glenn !!! " }),
    );
    expect(result).toEqual({
      success: true,
      data: { season: 2, episode: 4, rating: 5, note: "Glenn !!!" },
    });
  });

  test("allows an empty note", () => {
    const result = parseEntryForm(
      form({ season: "1", episode: "1", rating: "3", note: "" }),
    );
    expect(result.success).toBe(true);
  });

  test(`rejects a note longer than ${NOTE_MAX_LENGTH} characters`, () => {
    const result = parseEntryForm(
      form({ season: "1", episode: "1", rating: "3", note: "x".repeat(31) }),
    );
    expect(result).toEqual({
      success: false,
      error: "Short note is 30 characters max.",
    });
  });

  test("counts emojis as single characters", () => {
    const note = "🧟".repeat(30);
    const result = parseEntryForm(
      form({ season: "1", episode: "1", rating: "3", note }),
    );
    expect(result.success).toBe(true);
  });

  test("rejects ratings outside 1..5", () => {
    for (const rating of ["0", "6", "2.5", "abc", ""]) {
      const result = parseEntryForm(
        form({ season: "1", episode: "1", rating, note: "" }),
      );
      expect(result.success).toBe(false);
    }
  });

  test("rejects episodes that don't exist", () => {
    const result = parseEntryForm(
      form({ season: "1", episode: "7", rating: "3", note: "" }),
    );
    expect(result).toEqual({ success: false, error: "Unknown episode." });
  });
});

describe("parseLoginForm", () => {
  test("accepts a known user with a passcode", () => {
    expect(parseLoginForm(form({ user: "ivy", passcode: "abc" }))).toEqual({
      success: true,
      data: { user: "ivy", passcode: "abc" },
    });
  });

  test("rejects unknown users and missing passcodes", () => {
    expect(parseLoginForm(form({ user: "negan", passcode: "abc" })).success).toBe(
      false,
    );
    expect(parseLoginForm(form({ user: "ivy", passcode: "" })).success).toBe(false);
  });
});
