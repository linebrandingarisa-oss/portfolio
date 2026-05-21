type WaveTone = "white" | "cream" | "warm" | "sky" | "wood";

type SectionWaveProps = {
  tone: WaveTone;
  className?: string;
  flip?: boolean;
};

export function SectionWave({ className = "" }: SectionWaveProps) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-purple-500/15 to-transparent ${className}`}
      aria-hidden
    />
  );
}
