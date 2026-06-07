import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const CORAL = '#E55D4C';

const cards = [
  {
    accent: '#0F766E', // teal
    title: 'マーケティングの構造をつくる',
    body: '広告や制作物の前にある「仕組み」から手を入れる。CMOの相棒のように、企業の中に入っていく仕事。',
  },
  {
    accent: '#6D28D9', // purple
    title: 'コミュニケーションを動かす',
    body: 'SNSマーケティングの依頼が、いま急増しています。最新の流れを掴みながら、"伝わる" を設計して実装まで。',
  },
  {
    accent: '#E55D4C', // coral
    title: '事業そのものを企画する',
    body: '化粧品の商品開発から、新規事業の立ち上げまで。マーケの外側にある「事業」をデザインする仕事。',
  },
  {
    accent: '#D97706', // amber
    title: '海外と日本をつなぐ',
    body: 'シンガポールのサッカークラブ事業をはじめ、海外マーケティングをこれから本格的に伸ばしていきます。',
  },
];

export default function WhatYouDo() {
  return (
    <Section id="work" divider>
      <FadeIn>
        <SectionHeading eyebrow="What you'll do" accent={CORAL}>
          これからやろうとしていること。
        </SectionHeading>
      </FadeIn>

      <FadeIn>
        <p className="prose-body mb-12 max-w-prose text-base text-ink-sub sm:text-[17px]">
          ひとつの肩書きに収まる仕事ではありません。
          <br />
          領域は、たぶんあなたが思っているより広いです。
        </p>
      </FadeIn>

      <div className="grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-2">
        {cards.map((card, i) => (
          <FadeIn key={card.title} delay={i * 0.06} className="h-full">
            <article className="flex h-full flex-col bg-paper p-8 md:p-10">
              <span
                className="mb-6 block h-px w-10"
                style={{ backgroundColor: card.accent }}
                aria-hidden="true"
              />
              <h3 className="mb-4 text-lg font-medium tracking-wide text-ink">
                {card.title}
              </h3>
              <p className="prose-body text-[15px] text-ink-sub">{card.body}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
