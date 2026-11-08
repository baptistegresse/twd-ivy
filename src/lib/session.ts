import { createHmac, timingSafeEqual } from "node:crypto";
import { USERS, type UserId } from "./types";

const sign = (value: string, secret: string): string =>
  createHmac("sha256", secret).update(value).digest("base64url");

const safeEqual = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

export function signSession(user: UserId, secret: string): string {
  return `${user}.${sign(user, secret)}`;
}

export function verifySession(token: string | undefined, secret: string): UserId | null {
  if (!token) return null;
  const [user, signature, ...rest] = token.split(".");
  if (!user || !signature || rest.length > 0) return null;
  if (!USERS.includes(user as UserId)) return null;
  return safeEqual(signature, sign(user, secret)) ? (user as UserId) : null;
}

export function isPasscodeValid(input: string, expected: string): boolean {
  if (!input || !expected) return false;
  return safeEqual(input, expected);
}
