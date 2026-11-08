"use client";

import { useState } from "react";
import type { EntrySummary, EpisodeView } from "@/lib/view";
import { EntryForm } from "./EntryForm";
import { Stars } from "./Stars";

interface EpisodeRowProps {
  episode: EpisodeView;
  otherName: string;
}

function Summary({ entry }: { entry: EntrySummary }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <Stars rating={entry.rating} />
      {entry.note && <span className="truncate text-muted">“{entry.note}”</span>}
    </span>
  );
}

function TheirSide({ theirs, otherName }: Pick<EpisodeView, "theirs"> & { otherName: string }) {
  if (theirs === null) return <span className="text-muted/50">{otherName}: not watched</span>;
  if (theirs === "hidden") return <span className="text-muted">{otherName}: 🙈 watched, hidden</span>;
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-moss">{otherName}</span>
      <Summary entry={theirs} />
    </span>
  );
}

export function EpisodeRow({ episode, otherName }: EpisodeRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="w-16 shrink-0 font-display">E{String(episode.episode).padStart(2, "0")}</span>
        <button
          type="button"
          onClick={() => setIsEditing((value) => !value)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1 text-left hover:bg-surface-2"
          aria-expanded={isEditing}
        >
          {episode.mine ? (
            <Summary entry={episode.mine} />
          ) : (
            <span className="text-blood-soft">+ I watched it</span>
          )}
        </button>
        <span className="flex min-w-0 basis-full items-center pl-20 sm:basis-auto sm:pl-0">
          <TheirSide theirs={episode.theirs} otherName={otherName} />
        </span>
      </div>
      {isEditing && (
        <EntryForm episode={episode} onDone={() => setIsEditing(false)} />
      )}
    </li>
  );
}
