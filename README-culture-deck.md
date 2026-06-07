# 107 Design — Culture Deck LP

107 Design が大切にしたい10の価値観を伝える、1ページ構成の静的 LP。
フレームワーク不使用（vanilla HTML / CSS / JS）。GitHub Pages の **root 公開** にそのまま乗る設計です。

> Source: `220807_107_CultureDeck_v2.0.pdf`（社外秘のためリポジトリには含めません）

## 構成

```
/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/            ← logo / hero-pattern / value-01〜10（SVG）
├── .nojekyll
└── README-culture-deck.md
```

> このリポジトリには既存の Next.js 採用LP（`app/` `components/` など）も同居しています。
> Culture Deck LP は **root の `index.html`** がエントリポイントです。

## ローカルプレビュー

```sh
python3 -m http.server 8080
# → http://localhost:8080
```

## デプロイ（GitHub Pages / Deploy from a branch）

1. Settings → Pages → Build and deployment
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)` を選択して **Save**
4. 1〜2分後に `https://<USER>.github.io/<REPO>/` で公開

## 画像と本文について（重要）

- 原典 Culture Deck PDF が未取得のため、各価値観のキービジュアルは
  **Deck 表紙の菱形パターンを参考にした SVG 幾何モチーフ**で代替しています
  （`assets/images/value-XX.svg`、`gen_assets.py` で生成）。
- 本文（リード文・各価値観の説明）も **LP 向けの暫定テキスト**です。
  確定時に **Deck 原文（Deck原文をそのまま）** へ差し替えてください。
  対象は `assets/js/main.js` の `VALUES` 配列、および `index.html` 内の
  Prologue / Purpose / Epilogue のテキスト。
- 実写真を使う場合は、ライセンス確認のうえ `assets/images/` の各 SVG を
  対応する `value-XX-*.png` 等に差し替え、参照名を更新してください。
