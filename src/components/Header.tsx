import { logout } from "@/app/actions";
import { themeCopy, type Theme } from "@/lib/theme";
import { PixelSprite } from "./pixel/PixelSprite";
import { HEART, ROSE, TULIP } from "./pixel/sprites";

interface HeaderProps {
  name: string;
  theme: Theme;
}

export function Header({ name, theme }: HeaderProps) {
  const isIvy = theme === "ivy";
  return (
    <header className="flex items-center justify-between gap-4 pb-2">
      <div className="flex items-center gap-3">
        {isIvy && <PixelSprite sprite={ROSE} scale={4} className="sway" />}
        <div>
          <h1
            className="font-title text-3xl font-black uppercase tracking-tight text-blood sm:text-4xl"
          >
            {themeCopy(theme).title}
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            {isIvy ? "Walking Dead edition" : "Baptiste & Ivy"}
          </p>
        </div>
        {isIvy && <PixelSprite sprite={TULIP} scale={3} className="sway hidden sm:block" />}
      </div>
      <form action={logout} className="text-right text-sm">
        <p className="flex items-center justify-end gap-1.5 font-medium">
          Hi {name}
          {isIvy && <PixelSprite sprite={HEART} scale={2} className="text-blood" />}
        </p>
        <button type="submit" className="text-muted underline-offset-4 hover:text-foreground hover:underline">
          Switch survivor
        </button>
      </form>
    </header>
  );
}
