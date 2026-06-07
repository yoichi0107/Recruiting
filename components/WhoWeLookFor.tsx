import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const AMBER = '#D97706';

const traits = [
  {
    title: '自分で仕事をつくれる人。',
    body: '指示待ちより、「これ、やったらおもろくないですか？」と勝手に企画を持ってくるタイプ。頼まれていない "余計なこと" を歓迎する文化です。',
  },
  {
    title: '構造で考える癖がある人。',
    body: '目の前の現象だけでなく、「これは要するに何の話か」を一段上から捉えられる。複雑なものを、シンプルに整理して動かせる思考の癖。',
  },
  {
    title: '責任から逃げない人。',
    body: '「だって◯◯って言ったじゃないですか」を言わない。自分の権限の範囲で決断し、失敗したらケツをふける覚悟がある人。',
  },
  {
    title: '時代の流れを面白がれる人。',
    body: 'SNSの最新の文脈、海外で起きていること、AIの使いこなし。"新しいもの" を斜に構えず、まず触ってみる人。',
  },
  {
    title: '泥臭く動ける人。',
    body: 'きれいな戦略を語るだけじゃなく、現場でドロをかぶれる。20代でなんでも吸収したい人も、30〜40代で自分の旗を立てたい人も、どちらでも。',
  },
  {
    title: '一緒にご飯を食べて楽しい人。',
    body: '最後はこれです。Companyの語源どおり。',
  },
];

export default function WhoWeLookFor() {
  return (
    <Section id="who" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Who we're looking for" accent={AMBER} index="04">
          こんな人と、話してみたい。
        </SectionHeading>
      </FadeIn>

      <FadeIn>
        <p className="prose-body mb-14 max-w-prose text-base text-ink-sub sm:text-[17px]">
          経験年数や肩書きで決めることはしません。
          <br />
          ただ、こういう人だと、たぶん一緒にいて楽しいです。
        </p>
      </FadeIn>

      <div className="space-y-12 md:space-y-14">
        {traits.map((t, i) => (
          <FadeIn key={t.title} delay={i * 0.04}>
            <div className="max-w-prose">
              <h3 className="mb-3 text-lg font-medium tracking-wide text-ink">
                {t.title}
              </h3>
              <p className="prose-body text-[15px] text-ink-sub sm:text-base">
                {t.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="prose-body mt-16 max-w-prose text-sm text-ink-sub">
          全部当てはまる必要はありません。
          <br />
          ひとつでも「これ、自分かも」があれば、たぶん話が合います。
        </p>
      </FadeIn>
    </Section>
  );
}
