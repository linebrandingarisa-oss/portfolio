# Resend 本番セットアップ（ドメイン検証と環境変数）

お問い合わせメールは `lib/send-contact-notification.ts` が Resend API で送信します。本番では **自ドメインの検証** と **ホスティング側の環境変数** が必要です。

---

## 1. Resend でドメインを追加し、DNS を設定する

この作業は [Resend](https://resend.com) のアカウントと、ドメインの **DNS 管理画面**（お名前.com、Cloudflare、ムームードメインなど）へのアクセスが必要です。リポジトリのコードだけでは完了しません。

### 1.1 Resend でドメインを登録

1. Resend にログインする。
2. 左メニューから **Domains** を開く。
3. **Add Domain** で、サイトのドメインを入力する（例: `example.com`。サブドメインだけ使う場合は Resend の画面に合わせる）。
4. Resend が表示する **DNS レコード**（SPF / DKIM など）をメモまたはコピーする。

公式: [Domains - Resend Docs](https://resend.com/docs/dashboard/domains/introduction)

### 1.2 DNS にレコードを追加

1. ドメインの DNS 管理画面を開く。
2. Resend が指定した **ホスト名・種別（TXT / MX / CNAME 等）・値** を **そのまま** 追加する（余計な引用符やスペースに注意）。
3. 保存後、反映まで **数分〜最大 48 時間** かかることがある。Resend の Domains 画面で **Verified** になるまで待つ。

### 1.3 送信元アドレスの決め方

- 検証が通ったドメイン上のメールアドレスを **From** に使う（例: `form@example.com`）。
- 表示名付きの形式は環境変数 `RESEND_FROM` で指定する（後述の `.env.example` を参照）。

`onboarding@resend.dev` は開発・検証向けのため、本番の From には使わないでください。

---

## 2. 本番環境に環境変数を設定する

ローカルの `.env.local` は本番サーバーに自動では載りません。**デプロイ先の「環境変数」設定**に、同じ **変数名**で値を登録します。

### 必須（メール送信）

| 変数名 | 説明 |
|--------|------|
| `RESEND_API_KEY` | Resend の **API Keys** で発行した `re_` で始まるキー。本番専用キーを別途作ると運用しやすい。 |
| `RESEND_FROM` | 検証済みドメインの送信元。例: `お問い合わせ <form@example.com>` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | お問い合わせの受信先（フォーム送信先）。サイト上にも表示されます。 |

### 任意（サイト表示のカスタマイズ）

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SITE_BRAND_NAME` | サイト名 |
| `NEXT_PUBLIC_X_URL` | X（Twitter）プロフィール URL |
| `NEXT_PUBLIC_PROFILE_NAME` | プロフィール表示名 |

**注意:** `RESEND_API_KEY` に `NEXT_PUBLIC_` を付けないでください（ブラウザに露出します）。

### デプロイ先ごとの設定場所

- **Vercel**  
  Project → **Settings** → **Environment Variables**  
  変数を追加し、**Production**（必要なら Preview / Development）にチェックを入れる。デプロイをやり直すと反映されます。  
  手順の詳細は [vercel-deploy.md](./vercel-deploy.md) を参照してください。

- **Netlify**  
  **Site configuration** → **Environment variables**

- **Cloudflare Pages**  
  プロジェクト → **Settings** → **Variables and Secrets**

- **自前の Node サーバー**  
  プロセスマネージャや systemd、Docker の `env` で、上記と同じ名前の変数を渡す。

---

## デプロイ後の確認

1. 本番 URL でお問い合わせフォームからテスト送信する。
2. 届かない場合は Resend ダッシュボードの **Emails** / **Logs** でエラーを確認する。
3. `RESEND_FROM` のドメインが **Verified** か、キーが **Production** 用の環境に入っているかを再確認する。

---

## 参考

- [Resend API](https://resend.com/docs/api-reference/emails/send-email)
- ローカル用テンプレート: リポジトリ直下の `.env.example`
