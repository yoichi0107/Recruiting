'use client';

import Image from 'next/image';
import { useState } from 'react';

type Variant = 'photo' | 'logo' | 'hero';

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** class applied to the <Image> itself */
  className?: string;
  variant?: Variant;
  /** accent color for the placeholder line-art */
  accent?: string;
  /** small uppercase label shown on the photo placeholder */
  label?: string;
};

/**
 * next/image with a graceful fallback. When the source file is missing
 * (e.g. before real assets are dropped into /public/images), instead of a
 * broken-image icon we render an intentional, on-brand placeholder:
 *  - logo  → a text wordmark
 *  - photo → quiet concentric line-art in the section accent color
 *  - hero  → nothing (the hero supplies its own decorative background)
 * Drop a real file with the same name and it takes over automatically.
 */
export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  variant = 'photo',
  accent = '#5C5C5C',
  label,
}: Props) {
  const [error, setError] = useState(false);

  if (!error) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  // --- Fallbacks ---

  if (variant === 'logo') {
    return (
      <span
        className="font-display text-base font-medium tracking-wide text-ink"
        aria-label={alt}
      >
        107&nbsp;Design
      </span>
    );
  }

  if (variant === 'hero') {
    // Hero draws its own decorative layer; render nothing here.
    return null;
  }

  // photo placeholder: concentric thin rings in the accent color
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-paper">
      <svg
        viewBox="0 0 200 200"
        className="h-2/3 w-2/3 max-h-48 max-w-48"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="78" stroke={accent} strokeOpacity="0.22" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="56" stroke={accent} strokeOpacity="0.30" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="34" stroke={accent} strokeOpacity="0.40" strokeWidth="0.75" />
        <line x1="100" y1="8" x2="100" y2="192" stroke={accent} strokeOpacity="0.14" strokeWidth="0.5" />
        <line x1="8" y1="100" x2="192" y2="100" stroke={accent} strokeOpacity="0.14" strokeWidth="0.5" />
      </svg>
      {label && (
        <span
          className="absolute bottom-4 left-4 font-display text-[10px] uppercase tracking-wider"
          style={{ color: accent, opacity: 0.7 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
