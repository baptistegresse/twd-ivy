import "server-only";
import { neon } from "@neondatabase/serverless";
import { USERS, type Entry, type UserId } from "./types";
import type { EntryInput } from "./validation";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL n'est pas configurée.");
  return neon(url);
}

interface EntryRow {
  user_id: string;
  season: number;
  episode: number;
  rating: number;
  note: string;
  watched_at: string | Date;
}

const toEntry = (row: EntryRow): Entry => ({
  user: row.user_id as UserId,
  season: row.season,
  episode: row.episode,
  rating: row.rating,
  note: row.note,
  watchedAt: new Date(row.watched_at),
});

export async function listEntries(): Promise<Entry[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT user_id, season, episode, rating, note, watched_at
    FROM entries
    ORDER BY watched_at DESC
  `) as EntryRow[];
  return rows.filter((row) => USERS.includes(row.user_id as UserId)).map(toEntry);
}

export async function upsertEntry(user: UserId, input: EntryInput): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO entries (user_id, season, episode, rating, note)
    VALUES (${user}, ${input.season}, ${input.episode}, ${input.rating}, ${input.note})
    ON CONFLICT (user_id, season, episode)
    DO UPDATE SET rating = EXCLUDED.rating, note = EXCLUDED.note
  `;
}

export async function deleteEntry(user: UserId, season: number, episode: number): Promise<void> {
  const sql = getSql();
  await sql`
    DELETE FROM entries
    WHERE user_id = ${user} AND season = ${season} AND episode = ${episode}
  `;
}
