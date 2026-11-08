import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL manquante (lance `vercel env pull .env.local`).");
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS entries (
    user_id    TEXT        NOT NULL CHECK (user_id IN ('baptiste', 'ivy')),
    season     SMALLINT    NOT NULL CHECK (season BETWEEN 1 AND 11),
    episode    SMALLINT    NOT NULL CHECK (episode BETWEEN 1 AND 24),
    rating     SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
    note       TEXT        NOT NULL DEFAULT '' CHECK (char_length(note) <= 120),
    watched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, season, episode)
  )
`;

console.info("✓ Table `entries` prête.");
