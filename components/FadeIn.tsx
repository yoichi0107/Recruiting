'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** vertical offset in px before settling */
  y?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer';
};

/**
 * Quiet fade + slight upward settle on scroll into view.
 * Intentionally understated — no large movement, no bounce.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  as = 'div',
}: FadeInProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
