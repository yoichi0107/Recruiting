'use client';

import ImageWithFallback from './ImageWithFallback';
import { motion, useReducedMotion } from 'framer-motion';

const AMBER = '#D97706';

/**
 * Full-viewport, quiet first view. Background photo (hero-main.jpg)
 * sits behind an off-white wash so type stays legible even without
 * the image present. Falls back gracefully to off-white + a hairline.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper"
    >
      {/* Background image (optional). alt empty: decorative. */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero-main.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.16]"
          variant="hero"
        />
        {/* off-white wash for legibility */}
        <div className="absolute inset-0 bg-paper/40" />
      </div>

      {/* Decorative layer: quiet hairline grid + an oversized faint mark.
          Always present, so the hero reads as designed even without a photo. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-y-0 left-1/2 w-px bg-hairline/60" />
        <div className="absolute inset-y-0 left-[16.66%] hidden w-px bg-hairline/40 md:block" />
        <div className="absolute inset-y-0 right-[16.66%] hidden w-px bg-hairline/40 md:block" />
        <span className="absolute -right-6 bottom-[-3rem] select-none font-display text-[28vw] font-medium leading-none tracking-tighter text-ink/[0.035] md:text-[20vw]">
          107
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-content px-6 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-8 flex items-center gap-3">
            <span
              className="block h-px w-10"
              style={{ backgroundColor: AMBER }}
              aria-hidden="true"
            />
            <p className="font-display text-sm tracking-wider text-ink-sub">
              107 Design — Open Position
            </p>
          </div>
          <h1 className="text-[2.4rem] font-medium leading-[1.25] tracking-wide text-ink sm:text-5xl md:text-[3.5rem] md:leading-[1.2]">
            オープンポジション、
            <br />
            はじめました。
          </h1>
          <p className="prose-body mt-8 max-w-prose text-base text-ink-sub sm:text-[17px]">
            職種で決めない採用を、やってみることにしました。
            <br />
            一緒に5年、10年、同じ景色を追いかけられる仲間を、ひとり、ふたり。
          </p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#why"
        aria-label="下へスクロール"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-sub"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.span
          className="block"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="22"
            height="38"
            viewBox="0 0 22 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line x1="11" y1="0" x2="11" y2="30" stroke="currentColor" strokeWidth="1" />
            <path
              d="M4 24L11 31L18 24"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}
