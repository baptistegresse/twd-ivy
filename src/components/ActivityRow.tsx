import { stillSizing, type Theme } from "@/lib/theme";
import { USER_NAMES, type UserId } from "@/lib/types";
import type { ActivityItem } from "@/lib/view";
import { EpisodeStill } from "./EpisodeStill";
import { Stars } from "./Stars";

interface ActivityRowProps {
  items: ActivityItem[];
  me: UserId;
  theme: Theme;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "Europe/Paris",
});

function ActivityCard({ item, me, theme }: { item: ActivityItem; me: UserId; theme: Theme }) {
  const isMine = item.user === me;
  return (
    <li className="w-56 shrink-0 snap-start sm:w-64">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
        <EpisodeStill
          src={item.image}
          alt={item.hidden ? "Hidden episode" : `${item.label} · ${item.title}`}
          {...stillSizing(theme, "card")}
          isBlurred={item.hidden}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <span
          className={`absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${isMine ? "bg-blood" : "bg-moss text-background"}`}
        >
          {USER_NAMES[item.user]}
        </span>
        <span className="absolute bottom-2 left-2 font-title text-sm font-bold">
          {item.label}
          {!item.hidden && <span className="ml-1 font-sans text-xs text-foreground/70">{item.title}</span>}
        </span>
        {item.hidden && (
          <span className="absolute inset-0 flex items-center justify-center text-sm text-foreground/80">
            🙈 you&apos;re not there yet
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {!item.hidden && <Stars rating={item.rating} />}
        <span className="truncate text-muted">{item.hidden ? "" : item.note && `“${item.note}”`}</span>
        <time dateTime={item.watchedAt} className="ml-auto shrink-0 text-muted/70">
          {dateFormatter.format(new Date(item.watchedAt))}
        </time>
      </div>
    </li>
  );
}

export function ActivityRow({ items, me, theme }: ActivityRowProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Latest activity</h2>
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
          Nothing logged yet. Start S01E01 and hit “I watched it” 🧟
        </p>
      ) : (
        <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]">
          {items.map((item) => (
            <ActivityCard key={`${item.user}-${item.label}`} item={item} me={me} theme={theme} />
          ))}
        </ul>
      )}
    </section>
  );
}
