import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const AMBER = '#D97706';
const EMAIL = 'info@107designinc.com';

// Build the mailto link with a pre-filled subject and body template.
// Kept in JS (not hard-coded percent-encoding) so it stays easy to edit.
const subject = '[107D 採用] ご応募について';
const body = `こんにちは。

【お名前】

【ご連絡先（メール）】

【お住まいのエリア】

【これまでのご経歴を一言で】

【興味のある領域（複数可）】
□ マーケティングの構造設計
□ SNS・コミュニケーション
□ 事業・商品開発
□ 海外マーケティング
□ 決めていない・まずは話したい

【希望する関わり方】
○ 正社員 / 業務委託・副業 / 決めていない

【自己紹介・聞いてみたいこと】

`;
const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
  subject
)}&body=${encodeURIComponent(body)}`;

export default function ApplyCTA() {
  return (
    <Section id="apply" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Apply" accent={AMBER} index="08">
          応募する。
        </SectionHeading>
      </FadeIn>

      <FadeIn>
        <p className="prose-body mb-12 max-w-prose text-base text-ink-sub sm:text-[17px]">
          「これ、自分かも」と思った方も、
          <br />
          「面白そうだから一度話したい」だけの方も、どちらでも。
        </p>
      </FadeIn>

      <FadeIn>
        <div className="mx-auto max-w-2xl border border-hairline bg-paper px-6 py-14 text-center sm:px-12">
          <p className="text-lg font-medium tracking-wide text-ink">
            お気軽にメールでご連絡ください。
          </p>

          <p className="mt-6 font-display text-base tracking-wide text-ink-sub sm:text-lg">
            {EMAIL}
          </p>

          <div className="mt-10">
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-[4px] border border-ink bg-paper px-12 py-4 text-sm font-medium tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              メールを書く
            </a>
          </div>

          <p className="prose-body mt-8 text-sm text-ink-sub">
            クリックすると、件名と本文が入力された状態で
            <br className="hidden sm:block" />
            お使いのメールソフトが立ち上がります。
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <p className="mt-6 text-center text-sm text-ink-sub">
          または直接：
          <a
            href={`mailto:${EMAIL}`}
            className="underline decoration-hairline underline-offset-4 transition-colors hover:text-amber"
          >
            {EMAIL}
          </a>
        </p>
      </FadeIn>

      <FadeIn>
        <p className="prose-body mx-auto mt-10 max-w-prose text-center text-xs text-ink-sub">
          いただいた情報は採用検討の目的のみに使用し、第三者に共有することはありません。
        </p>
      </FadeIn>
    </Section>
  );
}
