const MAX_STARS = 5;

interface StarsProps {
  rating: number;
  size?: "sm" | "md";
}

export function Stars({ rating, size = "sm" }: StarsProps) {
  return (
    <span
      className={size === "sm" ? "text-sm tracking-tight" : "text-lg tracking-tight"}
      aria-label={`${rating} sur ${MAX_STARS}`}
    >
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <span key={index} className={index < rating ? "text-gold" : "text-border"}>
          ★
        </span>
      ))}
    </span>
  );
}
