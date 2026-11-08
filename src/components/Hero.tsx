"use client";

import { useState } from "react";
import type { EpisodeView } from "@/lib/view";
import { EntryForm } from "./EntryForm";
import { EpisodeStill } from "./EpisodeStill";
import { RatingLine } from "./RatingLine";

interface HeroProps {
  upNext: EpisodeView | null;
  headline: string;
  otherName: string;
}

const formatRuntime = (minutes: number | null) => (minutes ? `${minutes} min` : null);
const formatYear = (airdate: string) => airdate.slice(0, 4);

export function Hero({ upNext, headline, otherName }: HeroProps) {
  const [isRating, setIsRating] = useState(false);

  if (!upNext) {
    return (
      <section className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <p className="font-display text-3xl">You survived all 11 seasons 🧟</p>
        <p className="mt-2 text-muted">{headline}</p>
      </section>
    );
  }

  const { meta } = upNext;
  const details = [upNext.label, formatRuntime(meta.runtime), formatYear(meta.airdate)].filter(Boolean);

  return (
    <section className="space-y-3">
      <div className="relative isolate overflow-hidden rounded-2xl border border-border">
        <div className="relative aspect-[4/5] sm:aspect-[21/9]">
          <EpisodeStill
            src={meta.still ?? meta.thumb}
            alt={`${upNext.label} · ${meta.title}`}
            sizes="(min-width: 1024px) 1024px, 100vw"
            isPriority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:max-w-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blood-soft">Up next for you</p>
          <h2 className="font-display text-3xl leading-tight sm:text-5xl">{meta.title}</h2>
          <p className="text-sm text-foreground/80">{details.join(" · ")}</p>
          <p className="line-clamp-3 text-sm text-foreground/70">{meta.summary}</p>
          <RatingLine name={otherName} entry={upNext.theirs} tone="other" />
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsRating((value) => !value)}
              aria-expanded={isRating}
              className="rounded-md bg-foreground px-5 py-2.5 font-semibold text-background transition hover:bg-foreground/80"
            >
              ▶ I watched it
            </button>
            <span className="text-sm text-muted">{headline}</span>
          </div>
        </div>
      </div>

      {isRating && (
        <div className="rounded-xl border border-border bg-surface p-1">
          <EntryForm episode={upNext} onDone={() => setIsRating(false)} />
        </div>
      )}
    </section>
  );
}
