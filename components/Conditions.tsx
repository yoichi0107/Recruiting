import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const TEAL = '#0F766E';

const items = [
  {
    label: '報酬',
    body: '「いくら欲しい」と言ってください。あなたが提供してくれる価値と釣り合うなら、GAFA並みでも出します。介在価値で決める、というのが私たちのスタンスです。',
  },
  {
    label: '雇用形態',
    body: '正社員、業務委託、副業、どれでも構いません。チームの一員として動いてくれるなら、形は問いません。',
  },
  {
    label: '働く場所',
    body: 'オフィスもありますが、リモートもOK。会う頻度は仕事と相性で決めます。',
  },
];

export default function Conditions() {
  return (
    <Section id="conditions" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Conditions" accent={TEAL}>
          条件のこと。
        </SectionHeading>
      </FadeIn>

      <FadeIn>
        <p className="prose-body mb-14 max-w-prose text-base text-ink-sub sm:text-[17px]">
          雇用形態も、報酬も、こちらから決め打ちしません。
        </p>
      </FadeIn>

      <dl className="grid gap-10 md:grid-cols-3 md:gap-8">
        {items.map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.06}>
            <div className="max-w-prose">
              <dt className="mb-3 text-base font-medium tracking-wide text-ink">
                {item.label}
              </dt>
              <dd className="prose-body text-[15px] text-ink-sub">{item.body}</dd>
            </div>
          </FadeIn>
        ))}
      </dl>
    </Section>
  );
}
