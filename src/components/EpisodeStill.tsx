import Image from "next/image";

const IMAGE_QUALITY = 70;

interface EpisodeStillProps {
  src: string | null;
  alt: string;
  sizes: string;
  /** When set, load a fixed tiny rendition and upscale it into pixel art. */
  pixelWidth?: number | null;
  isPriority?: boolean;
  isBlurred?: boolean;
  className?: string;
}

const optimizedUrl = (src: string, width: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${IMAGE_QUALITY}`;

/** 16:9 episode still that fills its (relative) parent, with a dark fallback. */
export function EpisodeStill({
  src,
  alt,
  sizes,
  pixelWidth = null,
  isPriority = false,
  isBlurred = false,
  className = "",
}: EpisodeStillProps) {
  const effects = `object-cover ${isBlurred ? "scale-110 blur-md brightness-75" : ""} ${className}`;

  if (!src) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-surface-2 to-background ${className}`}
        aria-hidden
      />
    );
  }

  if (pixelWidth) {
    return (
      // A plain <img> on purpose: next/image's srcset would let the browser pick
      // a sharp cached rendition and break the pixel-art effect.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={optimizedUrl(src, pixelWidth)}
        alt={alt}
        loading={isPriority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full [image-rendering:pixelated] ${effects}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={IMAGE_QUALITY}
      preload={isPriority}
      className={effects}
    />
  );
}
