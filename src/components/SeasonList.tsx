import type { SeasonView } from "@/lib/view";
import { EpisodeRow } from "./EpisodeRow";

interface SeasonListProps {
  seasons: SeasonView[];
  openSeason: number;
  names: { me: string; other: string };
}

export function SeasonList({ seasons, openSeason, names }: SeasonListProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl">Les saisons</h2>
      <div className="space-y-2">
        {seasons.map((season) => (
          <details
            key={season.season}
            open={season.season === openSeason}
            className="group overflow-hidden rounded-xl border border-border bg-surface"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2">
              <span className="font-display text-lg">Saison {season.season}</span>
              <span className="flex items-center gap-3 text-xs text-muted">
                <span className="text-blood-soft">
                  {names.me} {season.myCount}/{season.total}
                </span>
                <span className="text-moss">
                  {names.other} {season.otherCount}/{season.total}
                </span>
                <span className="transition group-open:rotate-90">›</span>
              </span>
            </summary>
            <ul className="divide-y divide-border border-t border-border">
              {season.episodes.map((episode) => (
                <EpisodeRow key={episode.label} episode={episode} otherName={names.other} />
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
