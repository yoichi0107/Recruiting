# 107 Design — オープンポジション採用LP

107 Design のオープンポジション採用ランディングページ（1ページ完結）。
職種・条件を限定せず、**価値観・働き方の波長が合う人だけが手を挙げたくなる**、
選別性のあるLPです。

- **フレームワーク**: Next.js 14 (App Router) + TypeScript
- **スタイル**: Tailwind CSS（off-white ベースのミニマル設計）
- **アニメーション**: Framer Motion（控えめなフェードイン）
- **メール送信**: Resend API（`info@107designinc.com` 宛）
- **デプロイ想定**: Vercel

---

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成します。

```bash
cp .env.example .env.local
```

`.env.local` を編集します。

```env
# Resend の API キー（https://resend.com/api-keys で取得）
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# （任意）送信元アドレス。Resend で検証済みのドメイン/送信者であること。
# 未設定時は "107 Design Recruit <onboarding@resend.dev>" を使用。
RESEND_FROM_EMAIL="107 Design Recruit <recruit@107designinc.com>"

# （任意）応募の宛先。未設定時は info@107designinc.com。
RECRUIT_TO_EMAIL=info@107designinc.com
```

> **メモ:** `RESEND_API_KEY` が未設定でもアプリは起動します。その場合、
> フォーム送信はメール送信されず、サーバーコンソールに内容がログ出力されます
> （ローカル開発用のフォールバック）。

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 を開きます。

---

## メール送信の仕組み

- フォーム送信は `app/api/contact/route.ts`（POST）で受け取ります。
- 入力内容を整形し、**Resend 経由**で `info@107designinc.com` に送信します。
  - 件名: `[107D 採用] {お名前} 様からのご応募`
  - 本文: プレーンテキスト + HTML の両方
  - `replyTo` に応募者のメールアドレスを設定（そのまま返信可能）
- 送信成功後、フォームは同一ページ内で完了メッセージを表示します。

### Resend 本番運用のために

1. [Resend](https://resend.com) でアカウントを作成。
2. **Domains** で `107designinc.com`（または送信に使うドメイン）を追加し、
   表示される DNS レコード（SPF / DKIM）を設定して検証します。
3. **API Keys** でキーを発行し、`RESEND_API_KEY` に設定。
4. `RESEND_FROM_EMAIL` を検証済みドメインのアドレスに設定
   （例: `recruit@107designinc.com`）。
   - ドメイン未検証のうちは、Resend のサンドボックス送信元
     `onboarding@resend.dev` が使えます（宛先に制限あり）。

---

## 画像の差し替え方法

画像は `public/images/` に配置します。詳細は
[`public/images/README.md`](public/images/README.md) を参照してください。

| ファイル名 | 用途 |
|---|---|
| `107design-logo.png` | ヘッダー・フッターのロゴ |
| `hero-main.jpg` | Section 1 ファーストビュー背景 |
| `culture-01.jpg` | Section 2 チーム写真 |
| `company-overview.jpg` | Section 3 会社紹介 |
| `nishikawa-portrait.jpg` | Section 8 代表ポートレート |
| `og-image.jpg` | OGP用（1200×630px） |

画像が無くてもレイアウトは崩れません（プレースホルダ背景を表示）。
人物・チーム写真はコード側で `grayscale` を適用し、統一感を出しています。

---

## デプロイ（Vercel）

1. このリポジトリを Vercel にインポート。
2. **Environment Variables** に `RESEND_API_KEY` などを設定。
3. デプロイ。`next build` がそのまま通ります。

```bash
npm run build   # 本番ビルドの確認
npm run start   # 本番モードでローカル起動
```

---

## ディレクトリ構成

```
app/
  layout.tsx          # フォント・メタ情報（SEO/OGP）
  page.tsx            # セクションを組み立てるトップページ
  globals.css         # Tailwind + ベーススタイル
  api/contact/route.ts# 応募フォームの受信・メール送信
components/
  Header.tsx          Hero.tsx          WhyNow.tsx
  About.tsx           WhatYouDo.tsx     WhoWeLookFor.tsx
  Conditions.tsx      Process.tsx       Message.tsx
  ApplyForm.tsx       Footer.tsx
  Section.tsx  SectionHeading.tsx  FadeIn.tsx  （共通パーツ）
public/images/        # 画像（別途配置）
```

---

## デザイン方針（メモ）

- ベース `#FAFAF7` / 主文字 `#1A1A1A` / 副文字 `#5C5C5C` / 罫線 `#E5E3DC`
- アクセントは teal / purple / coral / amber を**セクションごとに1色だけ**使用
- 余白を大胆に、線も字も細め、装飾・絵文字は使わない
- 文末は基本「です／ます」。代表メッセージ（Section 8）のみ口語の温度を残す
