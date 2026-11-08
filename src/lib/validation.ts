import { z } from "zod";
import { isValidEpisode } from "./episodes";
import { USERS, type ParseResult, type UserId } from "./types";

import { NOTE_MAX_LENGTH, noteLength } from "./note";

export { NOTE_MAX_LENGTH, noteLength };

const entrySchema = z
  .object({
    season: z.coerce.number().int(),
    episode: z.coerce.number().int(),
    rating: z
      .string()
      .regex(/^[1-5]$/, "Pick a rating from 1 to 5.")
      .transform(Number),
    note: z
      .string()
      .trim()
      .refine((note) => noteLength(note) <= NOTE_MAX_LENGTH, {
        message: `Short note is ${NOTE_MAX_LENGTH} characters max.`,
      }),
  })
  .refine(({ season, episode }) => isValidEpisode(season, episode), {
    message: "Unknown episode.",
  });

export type EntryInput = z.infer<typeof entrySchema>;

const loginSchema = z.object({
  user: z.enum(USERS, { message: "Who are you?" }),
  passcode: z.string().min(1, "The secret code is required."),
});

export interface LoginInput {
  user: UserId;
  passcode: string;
}

function toResult<T>(parsed: z.ZodSafeParseResult<T>): ParseResult<T> {
  if (parsed.success) return { success: true, data: parsed.data };
  return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
}

const field = (form: FormData, key: string): string => {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
};

export function parseEntryForm(form: FormData): ParseResult<EntryInput> {
  return toResult(
    entrySchema.safeParse({
      season: field(form, "season"),
      episode: field(form, "episode"),
      rating: field(form, "rating"),
      note: field(form, "note"),
    }),
  );
}

export function parseLoginForm(form: FormData): ParseResult<LoginInput> {
  return toResult(
    loginSchema.safeParse({ user: field(form, "user"), passcode: field(form, "passcode") }),
  );
}
