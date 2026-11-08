"use client";

import { useState } from "react";
import { stillSizing, type Theme } from "@/lib/theme";
import type { EpisodeView } from "@/lib/view";
import { EntryForm } from "./EntryForm";
import { EpisodeStill } from "./EpisodeStill";
import { RatingLine } from "./RatingLine";

interface EpisodeCardProps {
  episode: EpisodeView;
  names: { me: string; other: string };
  isUpNext: boolean;
  theme: Theme;
}

export function EpisodeCard({ episode, names, isUpNext, theme }: EpisodeCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { meta } = episode;
  const isWatched = episode.mine !== null;

  return (
    <li className={`rounded-xl transition ${isEditing ? "bg-surface" : "hover:bg-surface"}`}>
      <button
        type="button"
        onClick={() => setIsEditing((value) => !value)}
        aria-expanded={isEditing}
        className="flex w-full gap-3 p-3 text-left sm:gap-4"
      >
        <span className="hidden w-6 shrink-0 self-center text-center font-title text-2xl font-bold text-muted sm:block">
          {episode.episode}
        </span>
        <span className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-md bg-surface-2 sm:w-48">
          <EpisodeStill
            src={meta.still ?? meta.thumb}
            alt={meta.title}
            isBlurred={episode.isStillBlurred}
            {...stillSizing(theme, "thumb")}
          />
          {isUpNext && (
            <span className="absolute left-1.5 top-1.5 rounded bg-blood px-1.5 py-0.5 text-[10px] font-semibold uppercase">
              Up next
            </span>
          )}
          {isWatched && <span className="absolute inset-x-0 bottom-0 h-1 bg-blood" />}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="truncate font-semibold">
              <span className="sm:hidden">{episode.episode}. </span>
              {meta.title}
            </span>
            {meta.runtime && <span className="shrink-0 text-xs text-muted">{meta.runtime} min</span>}
          </span>
          <span className="line-clamp-2 text-xs text-muted sm:text-sm">{meta.summary}</span>
          <span className="mt-auto flex flex-col gap-1 pt-1 sm:flex-row sm:gap-4">
            <RatingLine name={names.me} entry={episode.mine} tone="me" />
            <RatingLine name={names.other} entry={episode.theirs} tone="other" />
          </span>
        </span>
      </button>
      {isEditing && (
        <div className="px-3 pb-3">
          <EntryForm episode={episode} onDone={() => setIsEditing(false)} />
        </div>
      )}
    </li>
  );
}
