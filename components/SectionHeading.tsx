import type { ReactNode } from 'react';

type SectionHeadingProps = {
  /** small eyebrow label in English, optional */
  eyebrow?: string;
  children: ReactNode;
  /** accent color hex for the eyebrow text + tick */
  accent?: string;
};

/**
 * A restrained section heading. Eyebrow in the section's single
 * accent color; main heading medium weight, never black.
 */
export default function SectionHeading({
  eyebrow,
  children,
  accent = '#1A1A1A',
}: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      {eyebrow && (
        <p
          className="mb-4 font-display text-xs uppercase tracking-wider"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-medium leading-snug tracking-wide text-ink sm:text-3xl md:text-[34px]">
        {children}
      </h2>
    </div>
  );
}
