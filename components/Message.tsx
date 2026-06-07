import Image from 'next/image';
import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const CORAL = '#E55D4C';

export default function Message() {
  return (
    <Section id="message" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Message" accent={CORAL}>
          代表から、ひとこと。
        </SectionHeading>
      </FadeIn>

      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <FadeIn>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm bg-hairline md:mx-0">
            <Image
              src="/images/nishikawa-portrait.jpg"
              alt="107 Design 代表 西川"
              fill
              sizes="(max-width: 768px) 80vw, 30vw"
              className="object-cover grayscale"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="prose-body max-w-prose space-y-6 text-base text-ink-sub sm:text-[17px]">
            <p>どうも、西川です。</p>
            <p>
              弊社、いま、かつてないミニマルなチーム体制で仕事をしているんですが、
              もっと社員がいた時代以上の生産性で動けています。
              ここまで来るのに、正直、長い苦闘もありました。
            </p>
            <p>
              その上で、いま新しい仲間を探そうと思ったのは、
              「なぜ個人ではなく、会社という形で仕事をするのか」という問いに、
              自分なりの答えが見えてきたからです。
            </p>
            <p>
              AIなんて関係なく、誰かと一緒に何かを追いかけるのは、やっぱり楽しい。
              その楽しさを、これから5年、10年、一緒に積み重ねられる人と出会いたい。
            </p>
            <p>
              経営者として至らない点はまだまだあります。
              でも、一緒に成長していけるなら、バンドのように良いチームになります。
            </p>
            <p className="text-ink">
              「今すぐ動けるかわからないけど、ちょっと話を聞いてみたい」
              でも大歓迎です。お気軽にどうぞ。
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
