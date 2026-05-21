import type { ServiceIllustrationId } from "@/lib/service-illustration-id";

type Props = {
  id: ServiceIllustrationId;
  className?: string;
  title: string;
};

const sw = 1.3;
const purple = "#a855f7";
const cyan = "#22d3ee";
const purpleSoft = "#7c3aed";
const darkFill = "#1e1b4b";
const darkFill2 = "#0c4a6e";
const darkFill3 = "#1a1a2e";

export function ServiceIllustration({ id, className = "", title }: Props) {
  return (
    <div
      className={`flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center sm:h-[4.75rem] sm:w-[4.75rem] ${className}`}
      role="img"
      aria-label={title}
    >
      {id === "calendar" && <CalendarSvg />}
      {id === "globe" && <GlobeSvg />}
      {id === "chart" && <ChartSvg />}
      {id === "sparkle" && <SparkSvg />}
    </div>
  );
}

function CalendarSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <rect x="18" y="24" width="44" height="40" rx="5" fill={darkFill} stroke={purpleSoft} strokeWidth={sw} strokeLinejoin="round" transform="rotate(-1.5 40 44)" />
      <path d="M26 34h28" stroke={purple} strokeWidth="1" strokeLinecap="round" />
      <path d="M30 22v8M50 22v8" stroke={purple} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="32" cy="46" r="2.5" fill={purple} opacity="0.6" />
      <circle cx="40" cy="52" r="2.5" fill={cyan} opacity="0.7" />
      <circle cx="48" cy="46" r="2.5" fill={purple} opacity="0.5" />
    </svg>
  );
}

function GlobeSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <circle cx="40" cy="42" r="24" fill={darkFill2} stroke={purpleSoft} strokeWidth={sw} />
      <path d="M18 40c8 3 14 4 22 4s16-2 24-6M20 48c10 2 18 3 26 2" fill="none" stroke={cyan} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M40 18v48" fill="none" stroke={purple} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function ChartSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <path d="M14 68h52" stroke={purpleSoft} strokeWidth="0.9" strokeLinecap="round" />
      <rect x="20" y="50" width="10" height="18" rx="2" fill={darkFill3} stroke={purpleSoft} strokeWidth={sw} />
      <rect x="35" y="40" width="10" height="28" rx="2" fill={darkFill} stroke={purple} strokeWidth={sw} />
      <rect x="50" y="32" width="10" height="36" rx="2" fill={darkFill2} stroke={cyan} strokeWidth={sw} />
      <path d="M48 18l4 4 8-10" fill="none" stroke={cyan} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkSvg() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      <circle cx="22" cy="40" r="9" fill={darkFill3} stroke={purpleSoft} strokeWidth={sw} />
      <circle cx="40" cy="40" r="9" fill={darkFill} stroke={purple} strokeWidth={sw} />
      <circle cx="58" cy="40" r="9" fill={darkFill2} stroke={cyan} strokeWidth={sw} />
      <path d="M31 40h6M49 40h6" stroke={purple} strokeWidth="1" strokeLinecap="round" />
      <path d="M40 22v6M40 52v6" fill="none" stroke={cyan} strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 3" opacity="0.7" />
    </svg>
  );
}
