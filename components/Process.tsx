import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const PURPLE = '#6D28D9';

const steps = [
  {
    n: '01',
    title: '応募フォーム',
    body: 'まずは下のフォームから一言ください',
  },
  {
    n: '02',
    title: 'オンラインで一度',
    body: '30〜60分、お互いの解像度を上げる',
  },
  {
    n: '03',
    title: 'ご飯を食べる',
    body: '文字通り、一緒にご飯を食べてみる',
  },
];

export default function Process() {
  return (
    <Section id="process" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Process" accent={PURPLE}>
          面接ではなく、お見合いです。
        </SectionHeading>
      </FadeIn>

      <FadeIn>
        <div className="prose-body mb-14 max-w-prose space-y-7 text-base text-ink-sub sm:text-[17px]">
          <p>
            「あなたは何ができますか？」を確認する面接はしません。
            一緒に話して、一緒にやる未来が見えそうかを、お互いに確かめる場です。
          </p>
          <p>
            こちらからも、私たちが今やっていること、これからやりたいことを、
            隠さず話します。&quot;いい話&quot; だけじゃなく、難しさも含めて。
          </p>
        </div>
      </FadeIn>

      <ol className="grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-3">
        {steps.map((step, i) => (
          <FadeIn key={step.n} delay={i * 0.06} className="h-full">
            <li className="flex h-full flex-col bg-base p-8">
              <span
                className="mb-5 font-display text-sm tracking-wider"
                style={{ color: PURPLE }}
              >
                {step.n}
              </span>
              <h3 className="mb-2 text-base font-medium tracking-wide text-ink">
                {step.title}
              </h3>
              <p className="prose-body text-[15px] text-ink-sub">{step.body}</p>
            </li>
          </FadeIn>
        ))}
      </ol>
    </Section>
  );
}
