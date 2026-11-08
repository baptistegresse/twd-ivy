import { logout } from "@/app/actions";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <header className="flex items-end justify-between gap-4 border-b border-border pb-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-blood-soft">The Walking Dead</p>
        <h1 className="font-display text-3xl sm:text-4xl">Carnet de survie</h1>
      </div>
      <form action={logout} className="text-right text-sm">
        <p className="text-muted">Salut {name}</p>
        <button type="submit" className="text-muted underline-offset-4 hover:text-foreground hover:underline">
          Changer de survivant
        </button>
      </form>
    </header>
  );
}
