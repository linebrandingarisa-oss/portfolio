import type { ServiceIllustrationId } from "@/lib/service-illustration-id";
import { cozyPalette as c } from "@/lib/cozy-palette";

type Props = {
  id: ServiceIllustrationId;
  className?: string;
  title: string;
};

const sw = 1.2;

/**
 * サービス紹介カード用（落ち着いたライン・淡い塗り）
 */
export function ServiceIllustration({ id, className = "", title }: Props) {
  return (
    <div
      className={`flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center text-luxury-brass/90 sm:h-[4.75rem] sm:w-[4.75rem] ${className}`}
      role="img"
      aria-label={title}
    >
      {id === "calendar" && <CalendarSvg />}
      {id === "globe" && <GlobeSvg />}
      {id === "chart" && <ChartSvg />}
      {id === "sparkle" && <FlowSvg />}
    </div>
  );
}

function CalendarSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <rect
        x="18"
        y="24"
        width="44"
        height="40"
        rx="5"
        fill={c.washSky}
        stroke={c.stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
        transform="rotate(-1.5 40 44)"
      />
      <path
        d="M26 34h28"
        stroke={c.strokeMuted}
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path
        d="M30 22v8M50 22v8"
        stroke={c.stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <circle cx="32" cy="46" r="2.2" fill={c.accentLine} opacity="0.35" />
      <circle cx="40" cy="52" r="2.2" fill={c.accentLine} opacity="0.45" />
      <circle cx="48" cy="46" r="2.2" fill={c.accentLine} opacity="0.35" />
    </svg>
  );
}

function GlobeSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <circle
        cx="40"
        cy="42"
        r="24"
        fill={c.washSage}
        stroke={c.stroke}
        strokeWidth={sw}
      />
      <path
        d="M18 40c8 3 14 4 22 4s16-2 24-6M20 48c10 2 18 3 26 2"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M40 18v48"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function ChartSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <path
        d="M14 68h52"
        stroke={c.strokeMuted}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <rect
        x="20"
        y="50"
        width="10"
        height="18"
        rx="2"
        fill={c.washSand}
        stroke={c.stroke}
        strokeWidth={sw}
      />
      <rect
        x="35"
        y="40"
        width="10"
        height="28"
        rx="2"
        fill={c.washSky}
        stroke={c.stroke}
        strokeWidth={sw}
      />
      <rect
        x="50"
        y="32"
        width="10"
        height="36"
        rx="2"
        fill={c.washMist}
        stroke={c.stroke}
        strokeWidth={sw}
      />
      <path
        d="M48 18l4 4 8-10"
        fill="none"
        stroke={c.accentLine}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

/** 事務軽量化：ゆるい接続の流れ */
function FlowSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <circle cx="22" cy="40" r="9" fill={c.washSand} stroke={c.stroke} strokeWidth={sw} />
      <circle cx="40" cy="40" r="9" fill={c.washSky} stroke={c.stroke} strokeWidth={sw} />
      <circle cx="58" cy="40" r="9" fill={c.washSage} stroke={c.stroke} strokeWidth={sw} />
      <path
        d="M31 40h6M49 40h6"
        stroke={c.strokeMuted}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M40 22v6M40 52v6"
        fill="none"
        stroke={c.strokeMuted}
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.65"
      />
    </svg>
  );
}
