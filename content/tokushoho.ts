function publicEnv(name: string): string | undefined {
  const v = process.env[name];
  return v?.trim() || undefined;
}

export const tokushohoMeta = {
  title: "特定商取引法に基づく表記",
} as const;

export type TokushohoRow = {
  label: string;
  body: readonly string[];
};

/**
 * 販売事業者・運営責任者は .env の NEXT_PUBLIC_TOKUSHOHO_* で上書き可能。
 * 未設定時は「（未設定）」と表示します。Vercel の環境変数に必ず設定してください。
 */
export function getTokushohoRows(): TokushohoRow[] {
  const sellerName =
    publicEnv("NEXT_PUBLIC_TOKUSHOHO_SELLER_NAME") ?? "（未設定）";
  const representative =
    publicEnv("NEXT_PUBLIC_TOKUSHOHO_REPRESENTATIVE") ?? "（未設定）";

  return [
    { label: "販売事業者", body: [sellerName] },
    { label: "運営責任者", body: [representative] },
    {
      label: "所在地",
      body: ["※請求があった場合に遅滞なく開示します。"],
    },
    {
      label: "電話番号",
      body: ["※請求があった場合に遅滞なく開示します。"],
    },
    {
      label: "メールアドレス",
      body: ["※お問い合わせはフォームよりご連絡ください。"],
    },
    {
      label: "販売価格",
      body: ["各サービスページ、またはお見積もりにて提示します。"],
    },
    {
      label: "商品代金以外の必要料金",
      body: [
        "インターネット接続にかかる通信費等はお客様のご負担となります。",
        "振込手数料が発生する場合はお客様負担となります。",
      ],
    },
    {
      label: "支払い方法",
      body: ["銀行振込", "その他、個別に合意した方法"],
    },
    {
      label: "支払い時期",
      body: ["お見積もり提示後、契約時または納品前までにお支払い"],
    },
    {
      label: "商品の引き渡し時期",
      body: ["ご契約後、個別に合意したスケジュールに基づき納品します。"],
    },
    {
      label: "返品・キャンセルについて",
      body: [
        "サービスの性質上、契約後のキャンセル・返金は原則としてお受けしておりません。",
        "ただし、当方の重大な過失による不備があった場合は、個別に対応いたします。",
      ],
    },
    {
      label: "表現および商品に関する注意書き",
      body: [
        "提供するサービスの効果や成果には個人差があり、必ずしも成果を保証するものではありません。",
      ],
    },
  ];
}
