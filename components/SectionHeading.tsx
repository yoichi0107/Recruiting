import type { ReactNode } from 'react';

type SectionHeadingProps = {
  /** small eyebrow label in English, optional */
  eyebrow?: string;
  children: ReactNode;
  /** accent color hex for the eyebrow text + rule */
  accent?: string;
  /** two-digit section index, e.g. "01" */
  index?: string;
};

/**
 * A restrained section heading. A quiet index + short accent rule sit
 * on one line with the eyebrow; the heading is medium weight, never black.
 */
export default function SectionHeading({
  eyebrow,
  children,
  accent = '#1A1A1A',
  index,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      {(eyebrow || index) && (
        <div className="mb-5 flex items-center gap-3">
          {index && (
            <span className="font-display text-xs tabular-nums tracking-wider text-ink-sub">
              {index}
            </span>
          )}
          <span
            className="block h-px w-8"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          {eyebrow && (
            <span
              className="font-display text-xs uppercase tracking-wider"
              style={{ color: accent }}
            >
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h2 className="text-2xl font-medium leading-snug tracking-wide text-ink sm:text-3xl md:text-[34px]">
        {children}
      </h2>
    </div>
  );
}
