# cursor_ポートフォリオ

小規模店舗向けの業務ツール開発を紹介するランディングページ（Next.js / Tailwind CSS）。

移行以前の `projects/portfolio-site` が残っている場合は内容の重複です。エディタや dev サーバーを閉じたうえでフォルダごと削除してかまいません（**`藤乃・メディア` など他案件のフォルダは削除しないでください**）。

## 開発

```bash
cd projects/cursor_ポートフォリオ
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 環境変数

`.env.example` を参照し、`.env.local` を作成してください。メール・X URL・表示名はリポジトリに直書きせず環境変数で差し替えます。

本番で Resend（自ドメイン・DNS・ホスティングの環境変数）を整える手順は [docs/resend-production-setup.md](./docs/resend-production-setup.md) を参照してください。

## デプロイ（Vercel）

Git 連携から環境変数・独自ドメインまでの流れは [docs/vercel-deploy.md](./docs/vercel-deploy.md) を参照してください。

## 本番ビルド

```bash
npm run build
npm start
```
