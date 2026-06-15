# Gremlins.js モンキーテスト (Playwright)

`http://43.207.75.174/` を Playwright で開き、[Gremlins.js](https://github.com/marmelab/gremlins.js) を注入して
**60 秒間ランダム操作（モンキーテスト）** を実行します。実行中の以下のエラーを全件ログに記録し、
**エラー発生時には自動でスクリーンショット**を撮影します。

- コンソールエラー（`console.error`）
- ページ内の未捕捉例外（`pageerror`）
- ネットワークエラー（HTTP **4xx / 5xx**）
- リクエスト失敗（接続断・中断・DNS エラーなど）

## セットアップ

```bash
cd monkey-test
npm install
npx playwright install chromium   # 初回のみ。Chromium 本体を取得
```

## 実行

```bash
npm test            # ヘッドレス実行
npm run test:headed # ブラウザ画面を表示して実行
```

## 認証について

対象サイトは ID / パスワードが必要なため、以下の **両方に自動対応** しています。

1. **Basic 認証** … ブラウザコンテキストの `httpCredentials` で自動送信
2. **ログインフォーム** … ページ内に `input[type=password]` を検出したら自動入力・送信

デフォルト認証情報は `abc` / `abc`。変更する場合は環境変数で上書きしてください。

## 環境変数

| 変数 | 既定値 | 説明 |
|---|---|---|
| `TARGET_URL` | `http://43.207.75.174/` | テスト対象 URL |
| `AUTH_USER` | `abc` | 認証ユーザー名 |
| `AUTH_PASS` | `abc` | 認証パスワード |
| `DURATION_MS` | `60000` | モンキーテスト実行時間（ミリ秒） |
| `HEADLESS` | `true` | `false` でブラウザ表示 |
| `OUT_DIR` | `artifacts` | 成果物の出力先 |
| `GREMLINS_URL` | `https://unpkg.com/gremlins.js` | Gremlins.js の取得元 |

例:

```bash
AUTH_USER=myuser AUTH_PASS=secret DURATION_MS=120000 npm test
```

## 成果物

実行ごとに `artifacts/<実行日時>/` 配下へ出力されます。

```
artifacts/2026-06-15T07-30-00-000Z/
├── run.log              # 時系列の全ログ（テキスト）
├── events.json          # 全イベントの構造化ログ
├── summary.json         # エラー件数などのサマリ
├── final.png            # 終了時の最終状態スクショ
└── screenshots/         # エラー発生時のスクショ
    ├── 001-console_error.png
    ├── 002-http_500.png
    └── ...
```

## オフライン環境での実行

CDN（unpkg）に到達できない環境では Gremlins.js を同梱できます。

```bash
mkdir -p vendor
curl -L https://unpkg.com/gremlins.js -o vendor/gremlins.min.js
```

CDN 取得に失敗した場合は自動で `vendor/gremlins.min.js` にフォールバックします。
