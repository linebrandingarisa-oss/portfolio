function publicEnv(name: string): string | undefined {
  const v = process.env[name];
  return v?.trim() || undefined;
}

export const siteBrand = {
  name: publicEnv("NEXT_PUBLIC_SITE_BRAND_NAME") ?? "集客ラボkanagawa",
};

export const hero = {
  title: "小規模店舗の集客と業務を\nAIとWebで支えます。",
  subtitle:
    "小さなお店の「集客」と「業務」を、\nAIとWebで整えます。\n予約・顧客管理・業務効率化ツール、\n営業資料、ホームページ・LP制作まで。",
  /** 説明文（ヒーロー下部） */
  trustLine:
    "美容室・サロン・整体院などの\n小規模事業者向けに、\n現場で使いやすく、長く活かせる\n仕組みを作っています。\n\nご相談・お見積りは無料です。\nしつこい営業はしません。\nまずは現状をお聞かせください。",
  ctaPrimary: "無料で相談する",
  ctaSecondary: "サービス内容を見る",
} as const;

export const services = [
  {
    illustration: "calendar",
    title: "小規模店舗向け予約管理",
    description: "営業時間・スタッフ・メニューに合わせた枠管理。電話と Web の整理も対応。",
  },
  {
    illustration: "globe",
    title: "サイト ＋ 予約の導線",
    description: "店の紹介ページから予約まで、わかりやすい流れでつなぎます。",
  },
  {
    illustration: "chart",
    title: "売上・来客の簡易ダッシュボード",
    description: "日々の数字がぱっと分かる、必要最小限の画面に絞ります。",
  },
  {
    illustration: "sparkle",
    title: "ノーコード／AI で事務を軽く",
    description: "既存ツールと組み合わせ、事務・連絡の負担を減らす具体的な形にします。",
  },
] as const;

export const bookingDetail = {
  sectionTitle: "予約まわりの考え方",
  /** 見出し下のリード（2行で表示） */
  sectionLeadLines: [
    "予約がバラバラ・ダブルブッキングが怖い——",
    "そんな現場に、まず使える形から寄り添います。",
  ] as const,
  challenges: {
    title: "よくあるお悩み",
    items: [
      "LINE・電話・SNS など連絡が分散して\n一覧しづらい",
      "紙や表計算だと外出先や共有がつらい",
      "高機能ツールは設定が重く、小さな店には\n合わない",
    ],
  },
  solution: {
    title: "目指す状態",
    beforeLabel: "いま",
    before: "予約情報が場所ごとに散らばり、確認や共有に時間がかかっている。",
    afterLabel: "ご依頼後",
    after: "1 か所で把握し、お客様向けの予約導線もそろえ、当日業務に集中できる。",
  },
  features: {
    title: "想定する機能の例",
    items: [
      "カレンダー／枠の表示・登録",
      "メニュー・時間・担当に合わせた枠の制御",
      "予約フォームやサイトへの組み込み",
      "一覧・検索・当日の見える化",
    ],
  },
  roadmap: {
    title: "のちの拡張例",
    items: [
      "リマインド（メール／LINE 等は環境に応じて）",
      "キャンセル・変更フローの整理",
    ],
  },
} as const;

export type WorkItem = {
  title: string;
  description: string;
  tags: readonly string[];
  /** public 配下のパス（例: /works/capture.png） */
  imageSrc?: string;
  imageAlt?: string;
  demoHref?: string;
  demoLabel?: string;
};

/** 実績セクション末尾の追い CTA */
export const worksConversion = {
  line: "オリジナル制作・ご相談は\nお問い合わせから承ります。",
  linkLabel: "フォームを開く",
  href: "#contact-form",
} as const;

export const works: WorkItem[] = [
  {
    title: "整体院向け LP（デモ）",
    description:
      "集客・再来院を訴求する1ページの静的 HTML/CSS 試作。LP 内のお問い合わせ・無料診断ボタンはデモ用で、メール送信などには接続していません。",
    tags: ["LP", "HTML/CSS"],
    imageSrc: "/works/lp-hero-20260330.png",
    imageAlt: "整体院向けランディングページのヒーロー",
    demoHref: "/lp_project/index.html",
    demoLabel: "LPデモを見る",
  },
  {
    title: "整体院向け 管理画面デモ",
    description:
      "患者・来院・予約・フォローなどをまとめた UI の試作。デモ用データのみ。ブラウザで操作可。",
    tags: ["予約", "CRM", "デモ"],
    imageSrc: "/works/chiropractic-dashboard.png",
    imageAlt: "管理画面ダッシュボード",
    demoHref: "/chiropractic_app/index_today.html",
    demoLabel: "デモを開く",
  },
  {
    title: "サロン向け 予約プロトタイプ",
    description:
      "メニューとシフトに合わせた枠の試作。\n改善を続けています。",
    tags: ["予約", "試作"],
  },
];

export const processSteps = [
  {
    id: "hearing",
    /** 数字なしで順序を示す一言（カード先頭に表示） */
    flowCue: "まずは",
    title: "ヒアリング",
    body: "運用・お悩み・予算の目安をオンラインで伺います。",
  },
  {
    id: "prototype",
    flowCue: "つぎに",
    title: "試作",
    body: "まず使える範囲を短期で形にし、画面を一緒に確認します。",
  },
  {
    id: "tune",
    flowCue: "さらに",
    title: "調整",
    body: "現場の声を反映し、文言や項目を詰めます。",
  },
  {
    id: "launch",
    flowCue: "最後に",
    title: "本番公開",
    body: "公開手順と運用メモをお渡しします。必要なら小さな改善も続けられます。",
  },
] as const;

export const faqItems = [
  {
    q: "料金の目安は？",
    a: "内容によります。ヒアリング後におおまかにお示しします。アイデアだけでも大丈夫です。",
  },
  {
    q: "IT が苦手でも大丈夫？",
    a: "専門用語は避け、画面を見ながら進めます。簡単な手順書もお渡しします。",
  },
  {
    q: "納期は？",
    a: "試作からなら数週間が目安です。広がるほど長くなりますが、段階リリースも可能です。",
  },
  {
    q: "既存のサイトや予約ツールと連携できる？",
    a: "利用中のサービスを伺い、可能な範囲で案内します。難しい場合は別案も出します。",
  },
  {
    q: "スマホでも使える？",
    a: "スマホのブラウザでも使いやすい画面を意識します。",
  },
  {
    q: "公開後の修正や追加は？",
    a: "小さな修正からご相談ください。",
  },
] as const;

export const profile = {
  /** NEXT_PUBLIC_PROFILE_NAME 未設定時の表示名（英語表記） */
  namePlaceholder: "Arisa Nishi",
  /** 名前の下の一行（任意・空文字で非表示） */
  role: "Web 開発（ブライダル現場で約14年、お客様と店舗の間に立つ経験を\n小規模店舗さまのツールづくりに活かしています）",
  /**
   * プロフィール画像（public/profile/ に配置）
   * 同じファイル名で上書きしたのに表示が変わらないときは .env の NEXT_PUBLIC_PROFILE_PHOTO_REVISION を変えるか、開発なら .next を削除。
   * 別ファイルにする例: src を "/profile/arisa-hero.png"、layout を "feature" に変更
   */
  photo: {
    src: "/profile/arisa-portrait.png",
    layout: "circle" as "circle" | "feature",
  },
  bio: [
    "ブライダル業界で約14年、接客や予約の\n調整、当日の運営まで。\nお客様の想いと、現場が回る現実の両方に\n寄り添う日々を経験してきました。",
    "だからこそ、美容室やサロン、整体院など\n「人と予定が動く店舗」が、\n無理のない形で\n続けられる仕組みに強く関心があります。",
    "得意分野のイメージは、ランディングページやお問い合わせ導線、\n予約・一覧まわりの画面づくり、そして現場の言葉で整理するヒアリングです。\nいきなり大きくではなく、一緒に小さく始めて育てていくのが合うと思います。",
  ],
  stance: [
    "いきなり全部ではなく、現場で回るところから。",
    "説明は平易に。決めたことは文章と画面に残します。",
  ],
  /**
   * NEXT_PUBLIC_NOTE_URL 未設定時の note プロフィール URL。
   * 変更したい場合は note マイページの URL を確認し、.env.local で上書きしてください。
   */
  noteUrlFallback: "https://note.com/huge_lupine1356",
  note: {
    title: "note",
    linkLabel: "記事・コラムを開く\n（新しいタブ）",
    qrSectionLabel: "または\nQRコードから",
    qrAlt: "note プロフィールページへの QR コード",
    qrCaption: "スマホのカメラで\n読み取っても\n開けます。",
  },
} as const;

export const contact = {
  heading: "お問い合わせ",
  lead: "まだざっくりでも大丈夫です。お気軽にどうぞ。",
  /** 送信前の安心材料（行動につなげる） */
  reassurance: [
    "いただいた内容は返信・ご提案のためにのみ使い、第三者に開示しません。",
    "自動で何度もメールを送ることはありません。",
    "目安として数日以内に、ご入力のメールアドレスへご連絡します。",
  ],
  /** プロフィール直後など：フォームへ誘導する帯 */
  preFormBandTitle: "ご相談の第一歩は、ここから",
  preFormBandBody:
    "「まだ何を頼めばいいか分からない」\n段階でも構いません。\n状況を伺い、無理のない進め方を\nご一緒に考えます。",
  preFormBandCta: "下のフォームに入力する",
  labels: {
    name: "お名前",
    email: "メールアドレス",
    shopType: "店舗・業種のイメージ",
    message: "ご相談内容",
  },
  shopTypeOptions: [
    { value: "", label: "選択してください" },
    { value: "美容室・ヘアサロン", label: "美容室・ヘアサロン" },
    { value: "エステ・リラクゼーション", label: "エステ・リラクゼーション" },
    { value: "整体・鍼灸・整骨", label: "整体・鍼灸・整骨" },
    { value: "その他", label: "その他" },
  ],
  submit: "相談内容を送信する",
  submitSending: "送信中…",
  submitSuccess: "送信しました。追ってご連絡いたします。",
  mailSubjectDefault: "【サイトより】業務ツール開発のご相談",
  /**
   * NEXT_PUBLIC_INSTAGRAM_URL 未設定時の公式プロフィール（@tekuteku.consulting）。
   * アプリが付与する ?__pwa=1 などのクエリは含めない。
   */
  instagramUrlFallback:
    "https://www.instagram.com/tekuteku.consulting/",
} as const;

export const navItems = [
  { href: "#services", label: "サービス" },
  { href: "#booking", label: "予約の考え方" },
  { href: "#works", label: "実績" },
  { href: "#process", label: "流れ" },
  { href: "#faq", label: "FAQ" },
  { href: "#profile", label: "プロフィール" },
  { href: "#contact", label: "お問い合わせ" },
] as const;

/** ヘッダー右の目立つ CTA（常に同じアンカー） */
export const headerCta = {
  href: "#contact-form",
  label: "無料で相談",
} as const;
