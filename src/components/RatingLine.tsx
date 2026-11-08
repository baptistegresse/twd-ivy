import type { EntrySummary, EpisodeView } from "@/lib/view";
import { Stars } from "./Stars";

interface RatingLineProps {
  name: string;
  entry: EpisodeView["theirs"];
  tone: "me" | "other";
}

function Summary({ entry }: { entry: EntrySummary }) {
  return (
    <>
      <Stars rating={entry.rating} />
      {entry.note && <span className="truncate text-foreground/70">“{entry.note}”</span>}
    </>
  );
}

/** One person's verdict on an episode: stars + note, "not watched" or spoiler-hidden. */
export function RatingLine({ name, entry, tone }: RatingLineProps) {
  const dot = tone === "me" ? "bg-blood" : "bg-moss";
  return (
    <span className="flex min-w-0 items-center gap-2 text-xs">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="shrink-0 font-medium text-muted">{name}</span>
      {entry === null && <span className="text-muted/50">not watched</span>}
      {entry === "hidden" && <span className="text-muted">🙈 watched, hidden</span>}
      {entry && entry !== "hidden" && <Summary entry={entry} />}
    </span>
  );
}
