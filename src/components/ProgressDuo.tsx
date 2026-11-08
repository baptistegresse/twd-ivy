import { TOTAL_EPISODES, episodeLabel } from "@/lib/episodes";
import type { Progress } from "@/lib/types";
import type { DashboardView } from "@/lib/view";

interface Names {
  me: string;
  other: string;
}

interface ProgressDuoProps {
  view: DashboardView;
  names: Names;
}

const plural = (count: number, word: string) => `${count} ${word}${count > 1 ? "s" : ""}`;

function headline({ comparison }: DashboardView, names: Names): string {
  if (comparison.leader === "tie") return "Vous êtes pile au même endroit 🤝";
  const ahead = comparison.leader === "me" ? "Tu as" : `${names.other} a`;
  return `${ahead} ${plural(comparison.gap, "épisode")} d'avance`;
}

interface ProgressCardProps {
  name: string;
  progress: Progress;
  isMe: boolean;
}

function ProgressCard({ name, progress, isMe }: ProgressCardProps) {
  const { furthest, watchedCount, percent, averageRating } = progress;
  return (
    <div className="flex-1 rounded-xl border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between">
        <p className="font-medium">{isMe ? `${name} (toi)` : name}</p>
        <p className="font-display text-2xl">
          {furthest ? episodeLabel(furthest.season, furthest.episode) : "—"}
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className={isMe ? "h-full bg-blood" : "h-full bg-moss"}
          style={{ width: `${Math.max(percent, watchedCount ? 1 : 0)}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>
          {watchedCount}/{TOTAL_EPISODES} · {Math.round(percent)}%
        </span>
        <span>{averageRating ? `moy. ${averageRating.toFixed(1)} ★` : "pas encore noté"}</span>
      </div>
    </div>
  );
}

export function ProgressDuo({ view, names }: ProgressDuoProps) {
  return (
    <section className="space-y-3">
      <p className="text-center font-display text-xl text-blood-soft">{headline(view, names)}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ProgressCard name={names.me} progress={view.me.progress} isMe />
        <ProgressCard name={names.other} progress={view.other.progress} isMe={false} />
      </div>
    </section>
  );
}
