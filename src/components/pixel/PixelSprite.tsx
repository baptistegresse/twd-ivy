import type { Sprite } from "./sprites";

interface PixelSpriteProps {
  sprite: Sprite;
  /** Size of one pixel, in CSS pixels. */
  scale?: number;
  className?: string;
}

export function PixelSprite({ sprite, scale = 3, className = "" }: PixelSpriteProps) {
  const height = sprite.rows.length;
  const width = Math.max(...sprite.rows.map((row) => row.length));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {sprite.rows.flatMap((row, y) =>
        [...row].map((char, x) => {
          const fill = sprite.palette[char];
          return fill ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} /> : null;
        }),
      )}
    </svg>
  );
}
