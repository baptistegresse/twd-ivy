import Image from "next/image";

const IMAGE_QUALITY = 70;

interface EpisodeStillProps {
  src: string | null;
  alt: string;
  sizes: string;
  isPriority?: boolean;
  isBlurred?: boolean;
  className?: string;
}

/** 16:9 episode still that fills its (relative) parent, with a dark fallback. */
export function EpisodeStill({
  src,
  alt,
  sizes,
  isPriority = false,
  isBlurred = false,
  className = "",
}: EpisodeStillProps) {
  if (!src) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-surface-2 to-background ${className}`}
        aria-hidden
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
      className={`object-cover ${isBlurred ? "scale-110 blur-md brightness-50" : ""} ${className}`}
    />
  );
}
