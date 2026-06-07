import ImageWithFallback from './ImageWithFallback';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <ImageWithFallback
            src="/images/107design-logo.png"
            alt="107 Design"
            width={120}
            height={28}
            className="h-6 w-auto"
            variant="logo"
          />
          <p className="text-xs text-ink-sub">© 2026 107 Design inc.</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-sub">
          <a
            href="https://107designinc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-amber"
          >
            会社サイト
          </a>
          <a
            href="https://107designinc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-amber"
          >
            プライバシーポリシー
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-amber"
          >
            X
          </a>
        </nav>
      </div>
    </footer>
  );
}
