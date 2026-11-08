"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  getSessionSecret,
  requireUser,
} from "@/lib/auth";
import { deleteEntry, upsertEntry } from "@/lib/db";
import { isValidEpisode } from "@/lib/episodes";
import { isPasscodeValid, signSession } from "@/lib/session";
import { parseEntryForm, parseLoginForm } from "@/lib/validation";

export interface ActionState {
  error: string | null;
  ok?: boolean;
}

const GENERIC_ERROR = "Oops, that didn't work. Try again in a moment.";

export async function login(_prev: ActionState, form: FormData): Promise<ActionState> {
  const parsed = parseLoginForm(form);
  if (!parsed.success) return { error: parsed.error };

  const expected = process.env.APP_PASSCODE ?? "";
  if (!isPasscodeValid(parsed.data.passcode, expected)) {
    return { error: "Wrong code. No walkers allowed." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(parsed.data.user, getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  revalidatePath("/");
  return { error: null, ok: true };
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  revalidatePath("/");
}

export async function saveEntry(_prev: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = parseEntryForm(form);
  if (!parsed.success) return { error: parsed.error };

  try {
    await upsertEntry(user, parsed.data);
  } catch (error: unknown) {
    console.error("saveEntry failed", { user, input: parsed.data, error });
    return { error: GENERIC_ERROR };
  }
  revalidatePath("/");
  return { error: null, ok: true };
}

export async function removeEntry(season: number, episode: number): Promise<ActionState> {
  const user = await requireUser();
  if (!isValidEpisode(season, episode)) return { error: "Unknown episode." };

  try {
    await deleteEntry(user, season, episode);
  } catch (error: unknown) {
    console.error("removeEntry failed", { user, season, episode, error });
    return { error: GENERIC_ERROR };
  }
  revalidatePath("/");
  return { error: null, ok: true };
}
