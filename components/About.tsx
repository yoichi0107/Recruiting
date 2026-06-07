import ImageWithFallback from './ImageWithFallback';
import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const PURPLE = '#6D28D9';

const programs = [
  { name: 'ARGO', desc: 'マーケティングを駆動する設計事務所' },
  { name: 'RESONANCE', desc: '「伝わる」までを設計するコミュニケーション・エンジン' },
  { name: 'PROMETHEUS', desc: '事業をゼロから建て、運営まで担うビジネスデザイン' },
  { name: 'KAIROS', desc: '国境を越える挑戦に伴走する越境プログラム' },
];

export default function About() {
  return (
    <Section id="about" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="About" accent={PURPLE} index="02">
          107 Designは、企画会社です。
        </SectionHeading>
      </FadeIn>

      <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:gap-16">
        <FadeIn>
          <div className="prose-body max-w-prose space-y-7 text-base text-ink-sub sm:text-[17px]">
            <p>
              オリエンもブリーフも、答えもまだ見えていない課題に、
              企画で答えを出す ── それが私たちの仕事です。
            </p>
            <p>
              ブランド、マーケティング、事業開発。
              一見バラバラに見える課題の奥には、たいてい、ひとつの構造的な問いが隠れています。
              私たちはその問いを解き、絡まった糸をほどき、誰もが扱える形に変える。
            </p>
            <p className="text-ink">複雑なものを、シンプルに動くものへ。</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-hairline">
            <ImageWithFallback
              src="/images/company-overview.jpg"
              alt="107 Design のオフィスと働き方の雰囲気"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover grayscale"
              variant="photo"
              accent={PURPLE}
              label="Office"
            />
          </div>
        </FadeIn>
      </div>

      {/* programs, listed quietly */}
      <FadeIn delay={0.1}>
        <ul className="mt-16 divide-y divide-hairline border-y border-hairline">
          {programs.map((p) => (
            <li
              key={p.name}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span
                className="font-display text-sm tracking-wider"
                style={{ color: PURPLE }}
              >
                {p.name}
              </span>
              <span className="text-sm text-ink-sub sm:text-[15px]">{p.desc}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn>
        <p className="mt-8 text-sm text-ink-sub">
          詳しくは{' '}
          <a
            href="https://107designinc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-hairline underline-offset-4 transition-colors hover:text-amber"
          >
            107design.co
          </a>
        </p>
      </FadeIn>
    </Section>
  );
}
