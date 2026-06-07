import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const TO_EMAIL = process.env.RECRUIT_TO_EMAIL || 'info@107designinc.com';
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || '107 Design Recruit <onboarding@resend.dev>';

type Payload = {
  name?: string;
  email?: string;
  area?: string;
  background?: string;
  interests?: string[];
  involvement?: string;
  message?: string;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'リクエストの形式が不正です。' }, { status: 400 });
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const area = (data.area || '').trim();
  const background = (data.background || '').trim();
  const interests = Array.isArray(data.interests) ? data.interests : [];
  const involvement = (data.involvement || '').trim();
  const message = (data.message || '').trim();

  // Required fields
  if (!name || !email) {
    return NextResponse.json(
      { error: 'お名前とメールアドレスは必須です。' },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'メールアドレスの形式をご確認ください。' },
      { status: 400 }
    );
  }

  const subject = `[107D 採用] ${name} 様からのご応募`;

  const dash = (v: string) => (v ? v : '（未記入）');
  const interestsText = interests.length ? interests.join(' / ') : '（未選択）';

  const textBody = [
    '107 Design 採用フォームから新しいご応募が届きました。',
    '',
    `■ お名前: ${name}`,
    `■ メールアドレス: ${email}`,
    `■ お住まいのエリア: ${dash(area)}`,
    `■ これまでの経歴: ${dash(background)}`,
    `■ 興味のある領域: ${interestsText}`,
    `■ 希望する関わり方: ${dash(involvement)}`,
    '',
    '■ 自由記入欄:',
    message || '（未記入）',
  ].join('\n');

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 16px 8px 0;color:#5C5C5C;font-size:14px;white-space:nowrap;vertical-align:top;">${escapeHtml(
        label
      )}</td>
      <td style="padding:8px 0;color:#1A1A1A;font-size:14px;vertical-align:top;">${value}</td>
    </tr>`;

  const htmlBody = `
  <div style="background:#FAFAF7;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #E5E3DC;border-radius:6px;padding:32px;">
      <p style="margin:0 0 24px;color:#1A1A1A;font-size:16px;font-weight:500;">採用フォームから新しいご応募が届きました。</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row('お名前', escapeHtml(name))}
        ${row('メールアドレス', `<a href="mailto:${escapeHtml(email)}" style="color:#D97706;">${escapeHtml(email)}</a>`)}
        ${row('お住まいのエリア', escapeHtml(dash(area)))}
        ${row('これまでの経歴', escapeHtml(dash(background)))}
        ${row('興味のある領域', escapeHtml(interestsText))}
        ${row('希望する関わり方', escapeHtml(dash(involvement)))}
      </table>
      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #E5E3DC;">
        <p style="margin:0 0 8px;color:#5C5C5C;font-size:14px;">自由記入欄</p>
        <p style="margin:0;color:#1A1A1A;font-size:14px;line-height:1.8;white-space:pre-wrap;">${
          escapeHtml(message) || '（未記入）'
        }</p>
      </div>
    </div>
  </div>`;

  const apiKey = process.env.RESEND_API_KEY;

  // Graceful fallback when no key is configured (e.g. local dev without Resend):
  // log to the server console so the flow still completes during development.
  if (!apiKey) {
    console.warn(
      '[contact] RESEND_API_KEY is not set. Logging submission instead of sending.\n' +
        `To: ${TO_EMAIL}\nSubject: ${subject}\n\n${textBody}`
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { error: '送信に失敗しました。お手数ですが時間をおいて再度お試しください。' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { error: '送信に失敗しました。お手数ですが時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
