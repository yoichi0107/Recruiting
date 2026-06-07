# 107 Design - Open Position 採用LP

107 Design のオープンポジション採用LP（静的サイト）。

## ローカル開発

```bash
npm install
npm run dev
```

http://localhost:3000 でプレビュー。

## ビルド

```bash
npm run build
```

`out/` ディレクトリに静的ファイルが書き出されます。

## 画像の差し替え

`public/images/` 配下のファイルを差し替えてください。

| ファイル名 | 用途 |
|---|---|
| `107design-logo.png` | ヘッダー・フッター ロゴ |
| `hero-main.jpg` | ファーストビュー背景 |
| `culture-01.jpg` | Section 2 |
| `company-overview.jpg` | Section 3 |
| `work-scope.jpg` | Section 4（任意） |
| `nishikawa-portrait.jpg` | Section 8 |
| `og-image.jpg` | OGP用 |

画像が無くてもレイアウトは崩れません（プレースホルダ背景を表示）。

## GitHub Pages へのデプロイ

1. このリポジトリを GitHub にプッシュ
2. リポジトリの **Settings → Pages** で、Source を **GitHub Actions** に設定
3. `main` ブランチに push すると自動的にビルド＆デプロイされます
   （ワークフロー: `.github/workflows/deploy.yml`）
4. `next.config.js` の `REPO_NAME` を**実際のリポジトリ名**に合わせて編集してください
   - 現在は `Recruiting` に設定済みです
   - 例: リポジトリ名が `107design-recruit` なら `REPO_NAME = '107design-recruit'`
   - `<ユーザー名>.github.io` リポジトリ（ユーザーページ）の場合は空文字 `''`

公開URL: `https://<ユーザー名>.github.io/<リポジトリ名>/`

> `next.config.js` の `basePath` / `assetPrefix` は `REPO_NAME` から自動で組み立てられます。
> リポジトリ名を変えた場合は `REPO_NAME` の1か所だけ直せばOKです。

## 応募フォームについて

応募はメール（`info@107designinc.com`）で受け付けます。
LPのCTAボタンは `mailto:` リンクで、ユーザーのメールソフトが立ち上がる仕組みです
（件名・本文のテンプレートがプリセットされます）。サーバーサイドの処理はありません。
