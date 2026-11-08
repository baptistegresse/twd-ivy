// Snapshots The Walking Dead episode metadata from TVmaze (https://www.tvmaze.com/api, CC BY-SA)
// into src/data/episodes.json. Run with `pnpm episodes:sync`.
import { writeFile } from "node:fs/promises";

const SHOW_ID = 73;
const OUTPUT = new URL("../src/data/episodes.json", import.meta.url);

const stripHtml = (html) =>
  (html ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const response = await fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`);
if (!response.ok) {
  console.error(`TVmaze responded ${response.status}`);
  process.exit(1);
}

const episodes = (await response.json())
  .filter((ep) => ep.type === "regular" && ep.season >= 1 && ep.number >= 1)
  .map((ep) => ({
    season: ep.season,
    episode: ep.number,
    title: ep.name,
    airdate: ep.airdate,
    runtime: ep.runtime,
    summary: stripHtml(ep.summary),
    thumb: ep.image?.medium ?? null,
    still: ep.image?.original ?? null,
  }));

await writeFile(OUTPUT, `${JSON.stringify(episodes, null, 2)}\n`);
console.info(`✓ ${episodes.length} episodes written to src/data/episodes.json`);
