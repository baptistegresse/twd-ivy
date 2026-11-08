import "server-only";
import { cookies } from "next/headers";
import { verifySession } from "./session";
import type { UserId } from "./types";

export const SESSION_COOKIE = "twd_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET n'est pas configurée.");
  return secret;
}

export async function getCurrentUser(): Promise<UserId | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value, getSessionSecret());
}

export async function requireUser(): Promise<UserId> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non connecté.");
  return user;
}
