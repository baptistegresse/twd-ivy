import { getCurrentUser } from "@/lib/auth";
import { TVMAZE_CREDIT_URL } from "@/lib/catalog";
import { listEntries } from "@/lib/db";
import { buildDashboard } from "@/lib/view";
import { USER_NAMES } from "@/lib/types";
import { LoginForm } from "./LoginForm";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ProgressDuo, progressHeadline } from "./ProgressDuo";
import { ActivityRow } from "./ActivityRow";
import { SeasonBrowser } from "./SeasonBrowser";

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
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-6 sm:py-10">
      <Header name={names.me} />
      <Hero upNext={view.upNext} headline={progressHeadline(view, names)} otherName={names.other} />
      <ProgressDuo view={view} names={names} />
      <ActivityRow items={view.activity} me={view.me.user} />
      <SeasonBrowser
        seasons={view.seasons}
        openSeason={view.openSeason}
        upNext={view.upNext}
        names={names}
      />
      <footer className="border-t border-border pt-4 text-center text-xs text-muted/70">
        Episode info &amp; images from{" "}
        <a href={TVMAZE_CREDIT_URL} className="underline underline-offset-2 hover:text-foreground">
          TVmaze
        </a>{" "}
        (CC BY-SA).
      </footer>
    </main>
  );
}
