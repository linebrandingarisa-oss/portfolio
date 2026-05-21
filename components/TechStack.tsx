import { FadeIn } from "@/components/FadeIn";
import { techStack } from "@/content/site";

export function TechStack() {
  return (
    <section
      className="border-y border-border-soft/40 bg-surface-sky py-8"
      aria-label="使用技術・ツール"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted/60">
            技術スタック
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {techStack.map((item) => (
              <span
                key={item.name}
                className="rounded-full border border-border-soft bg-surface-warm px-4 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-purple-500/40 hover:text-foreground"
              >
                {item.name}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
