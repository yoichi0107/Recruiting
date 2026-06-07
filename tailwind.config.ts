import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7',
        ink: '#1A1A1A',
        'ink-sub': '#5C5C5C',
        hairline: '#E5E3DC',
        teal: '#0F766E',
        purple: '#6D28D9',
        coral: '#E55D4C',
        amber: '#D97706',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'var(--font-inter-tight)', 'sans-serif'],
        display: ['var(--font-inter-tight)', 'var(--font-noto-sans-jp)', 'sans-serif'],
      },
      maxWidth: {
        content: '1080px',
        narrow: '960px',
        prose: '720px',
      },
      letterSpacing: {
        wide: '0.04em',
        wider: '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
