# Vercel でポートフォリオを公開する

Next.js アプリは Vercel が公式にサポートしており、**フレームワークは自動検出**されます。特別な `vercel.json` は不要です（このリポジトリの構成のままで問題ありません）。

---

## 前提

- ソースが **GitHub / GitLab / Bitbucket** などに push されていること（Vercel は Git 連携が一般的です）。
- ローカルで `npm run build` が通ること。

---

## 1. プロジェクトを Vercel に取り込む

1. [Vercel](https://vercel.com) にログインする。
2. **Add New…** → **Project** で、リポジトリを **Import** する。
3. **Framework Preset** が **Next.js** になっていることを確認する。
4. **Root Directory**  
   - リポジトリのルートがこの Next アプリだけなら **空のまま**（`.`）。  
   - 上位フォルダに他案件があり、このアプリがサブフォルダにある場合は、**そのフォルダ**（例: `projects/cursor_ポートフォリオ`）を指定する。

ビルドコマンド・出力ディレクトリはデフォルトのままで構いません（`next build`）。

---

## 2. 環境変数を登録する

**Settings** → **Environment Variables** を開き、`.env.example` と同じ **変数名**で値を追加します。

| 変数 | 環境の目安 |
|------|------------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Production（Preview にも同じ値でよい場合は追加） |
| `RESEND_API_KEY` | Production（秘密情報のため **Production のみ**でも可） |
| `RESEND_FROM` | Production |
| その他 `NEXT_PUBLIC_*` | 必要に応じて Production / Preview |

- **Sensitive** にチェックを入れると、ダッシュボード上で値が隠されます（API キー向け）。
- 追加・変更したあと、**再デプロイ**しないとランタイムに反映されないことがあります（**Deployments** から **Redeploy**）。

メール本番（Resend・独自ドメイン）の詳細は [resend-production-setup.md](./resend-production-setup.md) を参照してください。

---

## 3. デプロイして確認する

1. **Deploy** を実行し、完了後に表示される **`*.vercel.app`** の URL を開く。
2. お問い合わせフォームがある場合は、本番 URL からテスト送信し、受信と Resend のログを確認する。

---

## 4. 独自ドメイン（任意）

1. Vercel のプロジェクト **Settings** → **Domains** でドメインを追加する。
2. 表示される **DNS の指示**（A / CNAME など）を、ドメインの DNS に設定する。
3. メール用に Resend で同じドメイン（またはサブドメイン）を検証する場合は、**Resend が要求する TXT 等**も同じ DNS ゾーンに追加する（Web とメールでレコードが共存します）。

公式: [Adding a Domain - Vercel Docs](https://vercel.com/docs/getting-started-with-vercel/domains)

---

## 参考

- [Vercel + Next.js](https://vercel.com/docs/frameworks/nextjs)
- 環境変数テンプレート: リポジトリ直下の `.env.example`
