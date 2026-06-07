import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** draw a hairline rule on top of the section */
  divider?: boolean;
  className?: string;
  /** narrower max-width for reading-heavy sections */
  narrow?: boolean;
};

/**
 * Single-column section wrapper. Generous vertical rhythm
 * (80px mobile → 120–160px desktop) and an optional hairline divider.
 */
export default function Section({
  id,
  children,
  divider = false,
  className = '',
  narrow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 py-20 sm:px-8 md:py-[120px] lg:py-[150px] ${
        divider ? 'border-t border-hairline' : ''
      } ${className}`}
    >
      <div className={`mx-auto ${narrow ? 'max-w-narrow' : 'max-w-content'}`}>
        {children}
      </div>
    </section>
  );
}
