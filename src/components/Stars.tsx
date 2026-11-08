import { PixelSprite } from "./pixel/PixelSprite";
import { HEART } from "./pixel/sprites";

const MAX_STARS = 5;

interface StarsProps {
  rating: number | null;
  size?: "sm" | "md";
}

/** A rating out of 5: stars in the classic theme, pixel hearts in Ivy's. */
export function Stars({ rating, size = "sm" }: StarsProps) {
  if (rating === null) {
    return <span className="text-xs italic text-muted">watched · not rated yet</span>;
  }
  return (
    <span
      className={`inline-flex items-center gap-px ${size === "sm" ? "text-sm" : "text-lg"}`}
      aria-label={`${rating} out of ${MAX_STARS}`}
    >
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <span key={index} className={index < rating ? "text-gold" : "text-border"}>
          <span className="classic-only">★</span>
          <PixelSprite sprite={HEART} scale={size === "sm" ? 2 : 3} className="ivy-only align-middle" />
        </span>
      ))}
    </span>
  );
}
