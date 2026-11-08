"use client";

import { useState } from "react";
import type { EpisodeView, SeasonView } from "@/lib/view";
import { EpisodeCard } from "./EpisodeCard";

interface SeasonBrowserProps {
  seasons: SeasonView[];
  openSeason: number;
  upNext: EpisodeView | null;
  names: { me: string; other: string };
}

export function SeasonBrowser({ seasons, openSeason, upNext, names }: SeasonBrowserProps) {
  const [selected, setSelected] = useState(openSeason);
  const season = seasons[selected - 1];

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold">Episodes</h2>
        <p className="text-xs text-muted">
          <span className="text-blood-soft">
            {names.me} {season.myCount}/{season.total}
          </span>
          <span className="mx-2">·</span>
          <span className="text-moss">
            {names.other} {season.otherCount}/{season.total}
          </span>
        </p>
      </div>

      <div role="tablist" aria-label="Seasons" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {seasons.map(({ season: number, myCount, total }) => {
          const isSelected = number === selected;
          const isDone = myCount === total;
          return (
            <button
              key={number}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelected(number)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground/80 hover:border-foreground/50"
              }`}
            >
              Season {number}
              {isDone && <span className={isSelected ? "ml-1" : "ml-1 text-blood-soft"}>✓</span>}
            </button>
          );
        })}
      </div>

      <ul role="tabpanel" className="divide-y divide-border/60">
        {season.episodes.map((episode) => (
          <EpisodeCard
            key={episode.label}
            episode={episode}
            names={names}
            isUpNext={upNext?.label === episode.label}
          />
        ))}
      </ul>
    </section>
  );
}
