import { describe, expect, test } from "vitest";
import { signSession, verifySession, isPasscodeValid } from "./session";

const SECRET = "test-secret";

describe("session tokens", () => {
  test("round-trips a signed user", () => {
    const token = signSession("ivy", SECRET);
    expect(verifySession(token, SECRET)).toBe("ivy");
  });

  test("rejects tampered or foreign tokens", () => {
    const token = signSession("ivy", SECRET);
    const [, signature] = token.split(".");
    expect(verifySession(`baptiste.${signature}`, SECRET)).toBeNull();
    expect(verifySession(token, "other-secret")).toBeNull();
    expect(verifySession("garbage", SECRET)).toBeNull();
    expect(verifySession(undefined, SECRET)).toBeNull();
  });
});

describe("isPasscodeValid", () => {
  test("compares passcodes exactly", () => {
    expect(isPasscodeValid("walker", "walker")).toBe(true);
    expect(isPasscodeValid("walker", "walkers")).toBe(false);
    expect(isPasscodeValid("", "walker")).toBe(false);
  });
});
