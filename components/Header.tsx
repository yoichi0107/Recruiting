'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Minimal fixed header: just the logo (top-left) and a quiet
 * "応募する" anchor (top-right). Gains a hairline + subtle
 * backdrop once the user scrolls past the hero.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-hairline bg-paper/85 backdrop-blur-sm'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-8">
        <a href="#top" className="flex items-center" aria-label="107 Design">
          <Image
            src="/images/107design-logo.png"
            alt="107 Design"
            width={120}
            height={28}
            className="h-6 w-auto"
            priority
          />
        </a>
        <a
          href="#apply"
          className="font-display text-sm tracking-wide text-ink transition-colors hover:text-amber"
        >
          応募する
        </a>
      </div>
    </header>
  );
}
