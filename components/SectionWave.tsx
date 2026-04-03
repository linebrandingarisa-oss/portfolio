type WaveTone = "white" | "cream" | "warm" | "sky" | "wood";

const toneClass: Record<WaveTone, string> = {
  white: "text-white",
  cream: "text-surface-cream",
  warm: "text-surface-warm",
  sky: "text-surface-sky",
  wood: "text-footer-wood",
};

type SectionWaveProps = {
  /** この波の「塗り」＝主に次のセクションの背景色に合わせる */
  tone: WaveTone;
  className?: string;
  /** true のとき波を上下反転（セクション手前／直後で使い分け） */
  flip?: boolean;
};

/**
 * セクション間のなだらかな波型区切り（LP 風の柔らかいリズム用）
 */
export function SectionWave({
  tone,
  className = "",
  flip = false,
}: SectionWaveProps) {
  return (
    <div
      className={`relative -mt-px w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`.trim()}
      aria-hidden
    >
      <svg
        className={`block h-10 w-[110%] min-w-full max-w-none -translate-x-[5%] sm:h-14 ${toneClass[tone]}`}
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0,24 C180,8 360,40 540,24 C720,8 900,40 1080,24 C1260,8 1350,32 1440,24 L1440,48 L0,48 Z"
        />
      </svg>
    </div>
  );
}
