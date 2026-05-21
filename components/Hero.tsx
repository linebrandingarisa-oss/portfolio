import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { hero, trustBadges } from "@/content/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background"
    >
      <div className="grid-pattern absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-48 right-0 h-[32rem] w-[32rem] rounded-full bg-purple-600/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-cyan-500/8 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-36 lg:px-8">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/8 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"
              aria-hidden
            />
            実装型 AI コンサルタント
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{hero.title.split("、")[0]}、</span>
            <br />
            <span className="text-foreground">{hero.title.split("、")[1]}</span>
          </h1>
        </FadeIn>

        <FadeIn className="mt-8">
          <p className="mx-auto max-w-2xl whitespace-pre-line text-base leading-relaxed text-muted sm:text-lg">
            {hero.subtitle}
          </p>
        </FadeIn>

        <FadeIn className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#works"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border border-border-soft bg-white/4 px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition hover:border-purple-500/50 hover:bg-white/8"
          >
            {hero.ctaSecondary}
          </Link>
        </FadeIn>

        <FadeIn className="mt-14">
          <div className="flex flex-col items-center gap-6 border-t border-border-soft/60 pt-10 sm:flex-row sm:justify-center sm:gap-10">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="text-center">
                <p className="text-xs tracking-wide text-muted">{badge.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {badge.value}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
