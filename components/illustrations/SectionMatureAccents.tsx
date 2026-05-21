const purple = "#a855f7";
const cyan = "#22d3ee";
const purpleSoft = "#7c3aed";
const darkFill = "#1e1b4b";
const darkFill2 = "#0c4a6e";
const darkFill3 = "#1a1a2e";
const sw = 1.25;

export function BookingSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect x="18" y="20" width="52" height="56" rx="5" fill={darkFill3} stroke={purpleSoft} strokeWidth={sw} transform="rotate(-2 44 48)" />
      <path d="M26 32h36M26 42h28M26 52h32M26 62h20" stroke={purple} strokeWidth="0.95" strokeLinecap="round" opacity="0.6" />
      <circle cx="58" cy="44" r="3" fill={darkFill2} stroke={cyan} strokeWidth="0.85" />
    </svg>
  );
}

export function ServicesSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect x="12" y="22" width="56" height="40" rx="6" fill={darkFill3} stroke={purpleSoft} strokeWidth={sw} opacity="0.95" transform="rotate(-4 40 42)" />
      <rect x="22" y="32" width="56" height="40" rx="6" fill={darkFill} stroke={purple} strokeWidth={sw} transform="rotate(2 50 52)" />
      <path d="M34 48h32M34 56h22" stroke={cyan} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function WorksSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect x="14" y="18" width="60" height="52" rx="4" fill="none" stroke={purpleSoft} strokeWidth={sw} />
      <rect x="22" y="26" width="44" height="36" rx="2" fill={darkFill3} stroke={purple} strokeWidth="0.9" />
      <path d="M28 50c6-8 14-12 22-10s14 10 16 18" fill="none" stroke={cyan} strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function ProcessSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <path d="M14 72 Q44 20 74 72" fill="none" stroke={purpleSoft} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 5" opacity="0.5" />
      <circle cx="22" cy="62" r="5" fill={darkFill3} stroke={purple} strokeWidth={sw} />
      <circle cx="44" cy="36" r="5" fill={darkFill} stroke={cyan} strokeWidth={sw} />
      <circle cx="66" cy="58" r="5" fill={darkFill2} stroke={purple} strokeWidth={sw} />
    </svg>
  );
}

export function FaqSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <path d="M28 38 Q32 28 36 38 M40 34 Q44 24 48 34" fill="none" stroke={cyan} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M24 48h32a4 4 0 0 1 4 4v14a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8V52a4 4 0 0 1 4-4z" fill={darkFill} stroke={purpleSoft} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M60 52h6a6 6 0 0 1 0 12h-6" fill="none" stroke={cyan} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

export function ProfileSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <path d="M38 78 L36 52 Q34 44 40 38 Q46 32 52 28" fill="none" stroke={purpleSoft} strokeWidth={sw} strokeLinecap="round" />
      <ellipse cx="50" cy="26" rx="10" ry="5" fill={purple} opacity="0.35" transform="rotate(-35 50 26)" />
      <ellipse cx="44" cy="34" rx="8" ry="4" fill={cyan} opacity="0.25" transform="rotate(15 44 34)" />
      <path d="M32 78h20l-2-8h-16z" fill={darkFill} stroke={purpleSoft} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  );
}

export function ContactSectionAccent() {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-auto" aria-hidden>
      <rect x="16" y="28" width="56" height="40" rx="3" fill={darkFill} stroke={purpleSoft} strokeWidth={sw} transform="rotate(-2 44 48)" />
      <path d="M20 32 L44 50 L68 32" fill="none" stroke={cyan} strokeWidth="1" strokeLinejoin="round" opacity="0.7" />
      <circle cx="58" cy="58" r="12" fill={darkFill3} stroke={purpleSoft} strokeWidth={sw} />
      <circle cx="58" cy="58" r="4" fill="none" stroke={purple} strokeWidth="0.9" />
    </svg>
  );
}
