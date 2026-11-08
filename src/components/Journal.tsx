import { getCurrentUser } from "@/lib/auth";
import { listEntries } from "@/lib/db";
import { buildDashboard } from "@/lib/view";
import { USER_NAMES } from "@/lib/types";
import { LoginForm } from "./LoginForm";
import { Header } from "./Header";
import { ProgressDuo } from "./ProgressDuo";
import { ActivityFeed } from "./ActivityFeed";
import { SeasonList } from "./SeasonList";

export async function Journal() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <LoginForm />
      </main>
    );
  }

  const view = buildDashboard(await listEntries(), user);
  const names = { me: USER_NAMES[view.me.user], other: USER_NAMES[view.other.user] };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:py-12">
      <Header name={names.me} />
      <ProgressDuo view={view} names={names} />
      <ActivityFeed items={view.activity} me={view.me.user} />
      <SeasonList seasons={view.seasons} openSeason={view.openSeason} names={names} />
    </main>
  );
}
