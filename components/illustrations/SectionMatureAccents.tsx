import { cozyPalette as c } from "@/lib/cozy-palette";

const sw = 1.25;

/** 予約まわり：開いたノートと穏やかなライン */
export function BookingSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect
        x="18"
        y="20"
        width="52"
        height="56"
        rx="5"
        fill={c.washSand}
        stroke={c.stroke}
        strokeWidth={sw}
        transform="rotate(-2 44 48)"
      />
      <path
        d="M26 32h36M26 42h28M26 52h32M26 62h20"
        stroke={c.strokeMuted}
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <circle cx="58" cy="44" r="3" fill={c.washSage} stroke={c.stroke} strokeWidth="0.85" />
    </svg>
  );
}

/** サービス紹介セクション見出し用：積み重なるカードのような抽象 */
export function ServicesSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect
        x="12"
        y="22"
        width="56"
        height="40"
        rx="6"
        fill={c.washSand}
        stroke={c.stroke}
        strokeWidth={sw}
        opacity="0.95"
        transform="rotate(-4 40 42)"
      />
      <rect
        x="22"
        y="32"
        width="56"
        height="40"
        rx="6"
        fill={c.washSky}
        stroke={c.stroke}
        strokeWidth={sw}
        transform="rotate(2 50 52)"
      />
      <path
        d="M34 48h32M34 56h22"
        stroke={c.strokeMuted}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 制作実績：額縁＋キャンバス風 */
export function WorksSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect
        x="14"
        y="18"
        width="60"
        height="52"
        rx="4"
        fill="none"
        stroke={c.stroke}
        strokeWidth={sw}
      />
      <rect
        x="22"
        y="26"
        width="44"
        height="36"
        rx="2"
        fill={c.washMist}
        stroke={c.strokeMuted}
        strokeWidth="0.9"
      />
      <path
        d="M28 50c6-8 14-12 22-10s14 10 16 18"
        fill="none"
        stroke={c.accentLine}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/** 導入の流れ：ゆるやかな弧とステップ */
export function ProcessSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <path
        d="M14 72 Q44 20 74 72"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="3 5"
        opacity="0.7"
      />
      <circle cx="22" cy="62" r="5" fill={c.washSage} stroke={c.stroke} strokeWidth={sw} />
      <circle cx="44" cy="36" r="5" fill={c.washSky} stroke={c.stroke} strokeWidth={sw} />
      <circle cx="66" cy="58" r="5" fill={c.washSand} stroke={c.stroke} strokeWidth={sw} />
    </svg>
  );
}

/** FAQ：静かなカップと湯気 */
export function FaqSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <path
        d="M28 38 Q32 28 36 38 M40 34 Q44 24 48 34"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M24 48h32a4 4 0 0 1 4 4v14a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8V52a4 4 0 0 1 4-4z"
        fill={c.washMist}
        stroke={c.stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M60 52h6a6 6 0 0 1 0 12h-6"
        fill="none"
        stroke={c.stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** プロフィール：花瓶と一枝 */
export function ProfileSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <path
        d="M38 78 L36 52 Q34 44 40 38 Q46 32 52 28"
        fill="none"
        stroke={c.stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <ellipse
        cx="50"
        cy="26"
        rx="10"
        ry="5"
        fill={c.leaf}
        opacity="0.55"
        transform="rotate(-35 50 26)"
      />
      <ellipse
        cx="44"
        cy="34"
        rx="8"
        ry="4"
        fill={c.leaf}
        opacity="0.45"
        transform="rotate(15 44 34)"
      />
      <path
        d="M32 78h20l-2-8h-16z"
        fill={c.washSand}
        stroke={c.stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** お問い合わせ：手紙とシール風の円 */
export function ContactSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect
        x="16"
        y="28"
        width="56"
        height="40"
        rx="3"
        fill={c.washSky}
        stroke={c.stroke}
        strokeWidth={sw}
        transform="rotate(-2 44 48)"
      />
      <path
        d="M20 32 L44 50 L68 32"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle
        cx="58"
        cy="58"
        r="12"
        fill={c.washMist}
        stroke={c.stroke}
        strokeWidth={sw}
      />
      <circle cx="58" cy="58" r="4" fill="none" stroke={c.accentLine} strokeWidth="0.9" />
    </svg>
  );
}
