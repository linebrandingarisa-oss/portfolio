function publicEnv(name: string): string | undefined {
  const v = process.env[name];
  return v?.trim() || undefined;
}

export const siteBrand = {
  name: publicEnv("NEXT_PUBLIC_SITE_BRAND_NAME") ?? "AI × 自動化",
};

export const hero = {
  title: "生成AIで業務を仕組み化する、\n実装型AIコンサルタント",
  subtitle:
    "企画・実装・運用を一人で回す。\nClaude・GitHub Actions・自動化フローの構築実績あり",
  trustLine: "",
  ctaPrimary: "実績を見る",
  ctaSecondary: "お問い合わせ",
} as const;

export const trustBadges = [
  { label: "Google Local Guide", value: "レベル10" },
  { label: "フリーランス歴", value: "2025年〜" },
  { label: "対応業種", value: "整体院・クリニック・サロン・行政書士" },
] as const;

export const services = [
  {
    illustration: "sparkle",
    title: "生成AI業務自動化",
    description:
      "Claude APIを活用したマルチエージェント設計・実装。繰り返し業務を仕組みに変えます。",
  },
  {
    illustration: "calendar",
    title: "X投稿・SNS完全自動化",
    description:
      "GitHub Actions × スプレッドシート連携で投稿〜分析を自動化。手動ゼロのフローを構築。",
  },
  {
    illustration: "chart",
    title: "LLMO / AIO対策支援",
    description:
      "AI検索・生成AIに選ばれるコンテンツ設計。記事・プロフィール・ページ構成を最適化。",
  },
  {
    illustration: "globe",
    title: "GBP・集客導線の整理",
    description:
      "Googleビジネスプロフィール運用・SNS・予約導線を一気通貫で整理・最適化します。",
  },
] as const;

export const bookingDetail = {
  sectionTitle: "AI自動化の考え方",
  sectionLeadLines: [
    "「毎日同じ作業に時間を取られている」——",
    "まず使える形から、一緒に仕組みに変えましょう。",
  ] as const,
  challenges: {
    title: "よくある課題",
    items: [
      "SNS投稿・情報収集・レポート作成が\n手動のまま",
      "AIツールを試したが、現場の業務に定着しない",
      "自動化したいがコードが書けない・\n設計が難しい",
    ],
  },
  solution: {
    title: "目指す状態",
    beforeLabel: "いま",
    before:
      "繰り返し作業に毎日時間を取られ、本来注力すべき業務が後回しになっている。",
    afterLabel: "導入後",
    after:
      "定型業務はフローが自動で回り、人間はクリエイティブな判断と対応に集中できる。",
  },
  features: {
    title: "実装する仕組みの例",
    items: [
      "マルチエージェント設計（Claude API）",
      "GitHub Actionsによる定期実行フロー",
      "スプレッドシート × API連携",
      "Webスクレイピング・情報収集の自動化",
    ],
  },
  roadmap: {
    title: "拡張例",
    items: [
      "Slack・メールへの通知・レポート自動送信",
      "RAG構築・社内ドキュメントのAI活用",
    ],
  },
} as const;

export type WorkItem = {
  title: string;
  description: string;
  tags: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  demoHref?: string;
  demoLabel?: string;
};

export const worksConversion = {
  line: "オリジナル制作・ご相談は\nお問い合わせから承ります。",
  linkLabel: "フォームを開く",
  href: "#contact-form",
} as const;

export const works: WorkItem[] = [
  {
    title: "マルチエージェントシステム構築",
    description:
      "Claude APIを活用した複数エージェントの並列実行システム。タスク分解・実行・集約を自動化。スケジューラと組み合わせてノーコードで運用可能。",
    tags: ["Claude API", "マルチエージェント", "Python"],
  },
  {
    title: "X投稿完全自動化フロー",
    description:
      "GitHub Actions × Googleスプレッドシート連携で投稿スケジュール管理から公開まで完全自動化。毎日の手動投稿をゼロに。",
    tags: ["GitHub Actions", "Google Sheets API", "自動化"],
  },
  {
    title: "LLMO / AIO対策支援",
    description:
      "大人バレエアカデミー等のコンテンツをAI検索最適化。生成AIへの引用率・認知率を改善するコンテンツ設計を実施。",
    tags: ["LLMO", "AIO", "コンテンツ最適化"],
  },
  {
    title: "GBP運用支援",
    description:
      "整体院・クリニック・高級ジム等のGoogleビジネスプロフィール最適化。SNS導線・予約フローとセットで集客を改善。",
    tags: ["GBP", "集客", "ローカルSEO"],
  },
  {
    title: "整体院向け LP（デモ）",
    description:
      "集客・再来院を訴求する1ページの静的 HTML/CSS 試作。LP 内のお問い合わせボタンはデモ用。",
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
];

export const processSteps = [
  {
    id: "hearing",
    flowCue: "まずは",
    title: "ヒアリング",
    body: "現状の業務フロー・課題・ゴールをオンラインで整理します。",
  },
  {
    id: "design",
    flowCue: "つぎに",
    title: "設計",
    body: "自動化の対象・ツール選定・フロー設計をドキュメントで提示します。",
  },
  {
    id: "implement",
    flowCue: "さらに",
    title: "実装・検証",
    body: "実際のフローを構築し、動作確認と調整を重ねます。",
  },
  {
    id: "handover",
    flowCue: "最後に",
    title: "引き渡し・運用",
    body: "手順書と共に引き渡し。必要に応じて改善も続けます。",
  },
] as const;

export const faqItems = [
  {
    q: "料金の目安は？",
    a: "内容・規模によります。まずヒアリングの上でお見積りします。小さな自動化から本格的なシステムまで対応します。",
  },
  {
    q: "プログラミング知識がなくても依頼できますか？",
    a: "はい。技術的な説明は平易な言葉で行います。成果物の運用手順書も作成します。",
  },
  {
    q: "どんなツール・APIに対応していますか？",
    a: "Claude API・OpenAI・GitHub Actions・Google Workspace・各種SNS APIなど幅広く対応します。まずご相談ください。",
  },
  {
    q: "納期は？",
    a: "シンプルな自動化なら数日〜1週間。複雑なシステムは数週間が目安です。段階リリースも可能です。",
  },
  {
    q: "既存のツールやサービスと連携できますか？",
    a: "APIがあるものは基本的に連携可能です。利用中のサービスをお知らせください。難しい場合は代替案もご提案します。",
  },
  {
    q: "引き渡し後の保守・改善は？",
    a: "小さな修正からお気軽にご相談ください。継続的なサポートも対応しています。",
  },
] as const;

export const profile = {
  namePlaceholder: "Arisa Nishi",
  role: "実装型AIコンサルタント / Web開発",
  photo: {
    src: "/profile/arisa-portrait.png",
    layout: "circle" as "circle" | "feature",
  },
  bio: [
    "ブライダル業界で約14年、現場運営・予約調整・\nお客様対応を通じて「業務を回す」ことの\nリアルを体感してきました。",
    "フリーランス転向後は生成AIと自動化に特化。\nClaude APIを使ったマルチエージェント構築から\nGitHub Actionsによる完全自動化フローまで\n一人で設計・実装します。",
    "「何から始めればいいか分からない」段階から\nご相談ください。まず小さく動かして、\n一緒に育てていくスタイルです。",
  ],
  stance: [
    "動くものを最短で。試してから広げる。",
    "技術説明は平易に。決めたことは記録に残す。",
  ],
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
  reassurance: [
    "いただいた内容は返信・ご提案のためにのみ使い、第三者に開示しません。",
    "自動で何度もメールを送ることはありません。",
    "目安として数日以内に、ご入力のメールアドレスへご連絡します。",
  ],
  preFormBandTitle: "ご相談の第一歩は、ここから",
  preFormBandBody:
    "「まだ何を頼めばいいか分からない」\n段階でも構いません。\n状況を伺い、無理のない進め方を\nご一緒に考えます。",
  preFormBandCta: "下のフォームに入力する",
  labels: {
    name: "お名前",
    email: "メールアドレス",
    shopType: "業種・ご相談の種類",
    message: "ご相談内容",
  },
  shopTypeOptions: [
    { value: "", label: "選択してください" },
    { value: "AI・自動化の相談", label: "AI・自動化の相談" },
    { value: "LLMO/AIO対策", label: "LLMO/AIO対策" },
    { value: "GBP・集客導線", label: "GBP・集客導線" },
    { value: "Web制作・LP", label: "Web制作・LP" },
    { value: "その他", label: "その他" },
  ],
  submit: "相談内容を送信する",
  submitSending: "送信中…",
  submitSuccess: "送信しました。追ってご連絡いたします。",
  mailSubjectDefault: "【サイトより】AIコンサルのご相談",
  instagramUrlFallback: "https://www.instagram.com/tekuteku.consulting/",
} as const;

export const navItems = [
  { href: "#services", label: "サービス" },
  { href: "#automation", label: "自動化" },
  { href: "#works", label: "実績" },
  { href: "#process", label: "流れ" },
  { href: "#faq", label: "FAQ" },
  { href: "#profile", label: "プロフィール" },
  { href: "#contact", label: "お問い合わせ" },
] as const;

export const headerCta = {
  href: "#contact-form",
  label: "無料相談",
} as const;
