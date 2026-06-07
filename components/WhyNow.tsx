import Image from 'next/image';
import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const TEAL = '#0F766E';

export default function WhyNow() {
  return (
    <Section id="why" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Why now" accent={TEAL}>
          なぜいま、人を探すのか。
        </SectionHeading>
      </FadeIn>

      <div className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <FadeIn>
          <div className="prose-body max-w-prose space-y-7 text-base text-ink-sub sm:text-[17px]">
            <p>
              AI時代に「人ってなんでいるんだろう」と問われる仕事が増えました。
              機能やスキルだけなら、正直、AIと外注で大体なんとかなります。
            </p>
            <p>
              でも、誰かと一緒に仕事をして、ダメだった時は痛みを共感し、
              よかった時は一緒に笑う。そういう時間を年単位で重ねていくことは、
              AIにはまだ難しい。これがたぶん、人が会社にいる理由なんだと思います。
            </p>
            <p>
              Company の語源は &quot;一緒にパンを食べる人&quot;。
              これからの会社は、機能の寄せ集めではなく、バンドのようなものになる。
              その仲間でしか出せないケミストリーが、よそと違う何かを生む。
            </p>
            <p className="text-ink">
              だから今回、職種も条件も先に決めず、人から探すことにしました。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-hairline">
            <Image
              src="/images/culture-01.jpg"
              alt="107 Design のチームとこれまでの歩み"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover grayscale"
            />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
