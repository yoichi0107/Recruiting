'use client';

import { useState, type FormEvent } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import FadeIn from './FadeIn';

const AMBER = '#D97706';

const interests = [
  'マーケティングの構造設計',
  'SNS・コミュニケーション',
  '事業・商品開発',
  '海外マーケティング',
  '決めてない・まずは話したい',
];

const involvements = [
  '正社員',
  '業務委託・副業',
  '決めてない・相談したい',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const labelClass = 'mb-2 block text-sm font-medium text-ink';
const optionalTag = (
  <span className="ml-2 text-xs font-normal text-ink-sub">任意</span>
);
const requiredTag = (
  <span className="ml-2 text-xs font-normal" style={{ color: AMBER }}>
    必須
  </span>
);
const fieldClass =
  'w-full rounded-sm border border-hairline bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-sub/60 focus:border-amber';

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      area: String(data.get('area') || '').trim(),
      background: String(data.get('background') || '').trim(),
      interests: data.getAll('interests').map(String),
      involvement: String(data.get('involvement') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || '送信に失敗しました。');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : '送信に失敗しました。お手数ですが時間をおいて再度お試しください。'
      );
    }
  }

  if (status === 'success') {
    return (
      <Section id="apply" divider narrow>
        <FadeIn>
          <SectionHeading eyebrow="Apply" accent={AMBER}>
            応募する。
          </SectionHeading>
          <div className="max-w-prose rounded-sm border border-hairline bg-white p-8 md:p-10">
            <p className="prose-body text-base text-ink sm:text-[17px]">
              ありがとうございます。受け取りました。
              <br />
              数日以内にご返信します。気長にお待ちください。
            </p>
          </div>
        </FadeIn>
      </Section>
    );
  }

  return (
    <Section id="apply" divider narrow>
      <FadeIn>
        <SectionHeading eyebrow="Apply" accent={AMBER}>
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
        <form onSubmit={handleSubmit} noValidate className="max-w-prose space-y-8">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              お名前{requiredTag}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={fieldClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              メールアドレス{requiredTag}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>

          {/* Area */}
          <div>
            <label htmlFor="area" className={labelClass}>
              お住まいのエリア{optionalTag}
            </label>
            <input
              id="area"
              name="area"
              type="text"
              placeholder="例: 東京都, リモート"
              className={fieldClass}
            />
          </div>

          {/* Background */}
          <div>
            <label htmlFor="background" className={labelClass}>
              これまでの経歴を一言で{optionalTag}
            </label>
            <textarea
              id="background"
              name="background"
              rows={2}
              placeholder="例: 広告代理店で5年プランナー"
              className={fieldClass}
            />
          </div>

          {/* Interests */}
          <fieldset>
            <legend className={labelClass}>
              興味のある領域（複数選択可）{optionalTag}
            </legend>
            <div className="space-y-3">
              {interests.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-ink-sub"
                >
                  <input
                    type="checkbox"
                    name="interests"
                    value={item}
                    className="h-4 w-4 rounded-sm border-hairline text-amber accent-amber focus:ring-amber"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Involvement */}
          <fieldset>
            <legend className={labelClass}>
              希望する関わり方{optionalTag}
            </legend>
            <div className="space-y-3">
              {involvements.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-ink-sub"
                >
                  <input
                    type="radio"
                    name="involvement"
                    value={item}
                    className="h-4 w-4 border-hairline text-amber accent-amber focus:ring-amber"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Free text */}
          <div>
            <label htmlFor="message" className={labelClass}>
              自由記入欄{optionalTag}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="自己紹介・聞いてみたいこと、何でも"
              className={fieldClass}
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-coral" role="alert">
              {errorMsg}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center rounded-sm bg-ink px-10 py-4 text-sm font-medium tracking-wider text-base transition-colors hover:bg-amber disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting' ? '送信中…' : '送る'}
            </button>
          </div>

          <p className="prose-body pt-2 text-xs text-ink-sub">
            いただいた情報は採用検討の目的のみに使用し、第三者に共有することはありません。
          </p>
        </form>
      </FadeIn>
    </Section>
  );
}
