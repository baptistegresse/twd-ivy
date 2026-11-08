import { USER_NAMES, type UserId } from "@/lib/types";
import type { ActivityItem } from "@/lib/view";
import { Stars } from "./Stars";

interface ActivityFeedProps {
  items: ActivityItem[];
  me: UserId;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

export function ActivityFeed({ items, me }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
        Nothing logged yet. Start S01E01 and open the log 🧟
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl">Latest activity</h2>
      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {items.map((item) => (
          <li key={`${item.user}-${item.label}`} className="flex items-center gap-3 px-4 py-3 text-sm">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${item.user === me ? "bg-blood" : "bg-moss"}`}
            />
            <span className="w-20 shrink-0 font-medium">{USER_NAMES[item.user]}</span>
            <span className="w-16 shrink-0 font-display">{item.label}</span>
            {item.hidden ? (
              <span className="flex-1 truncate text-muted">🙈 hidden, you&apos;re not there yet</span>
            ) : (
              <span className="flex flex-1 items-center gap-2 truncate">
                <Stars rating={item.rating} />
                {item.note && <span className="truncate text-muted">“{item.note}”</span>}
              </span>
            )}
            <time dateTime={item.watchedAt} className="hidden shrink-0 text-xs text-muted sm:block">
              {dateFormatter.format(new Date(item.watchedAt))}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
