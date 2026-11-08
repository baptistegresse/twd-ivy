import { PixelSprite } from "./PixelSprite";
import { GARDEN } from "./sprites";

const FLOWER_COUNT = 24;

interface GardenProps {
  className?: string;
}

/** A row of pixel flowers growing along the bottom of an element. */
export function Garden({ className = "" }: GardenProps) {
  return (
    <div className={`flex items-end justify-between gap-2 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: FLOWER_COUNT }, (_, index) => (
        <PixelSprite
          key={index}
          sprite={GARDEN[index % GARDEN.length]}
          scale={index % 3 === 0 ? 4 : 3}
          className="shrink-0"
        />
      ))}
    </div>
  );
}
