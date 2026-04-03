import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-surface-cream via-background to-surface-warm"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-accent-blush/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-accent-lilac/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <FadeIn>
          <h1 className="mx-auto max-w-3xl whitespace-pre-line text-center text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            {hero.title}
          </h1>
        </FadeIn>
        <FadeIn className="mt-6">
          <div className="mx-auto max-w-prose">
            <p className="whitespace-pre-line text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>
          </div>
        </FadeIn>
        <FadeIn className="mt-4">
          <div className="mx-auto max-w-prose">
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted/90 sm:text-base">
              {hero.trustLine}
            </p>
          </div>
        </FadeIn>
        <FadeIn className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="#contact-form"
            className="inline-flex items-center justify-center rounded-md bg-foreground px-9 py-3.5 text-base font-medium tracking-wide text-white shadow-md shadow-stone-900/20 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-md border border-border-soft bg-white/95 px-9 py-3.5 text-base font-medium text-foreground shadow-sm transition hover:border-luxury-brass/45 hover:bg-surface-cream"
          >
            {hero.ctaSecondary}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
