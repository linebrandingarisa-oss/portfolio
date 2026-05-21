import { FadeIn } from "@/components/FadeIn";
import { ProcessSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { processSteps } from "@/content/site";

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="導入の流れ"
          lead="まず小さく動かしてから、本番へ進みます。"
          illustration={<ProcessSectionAccent />}
        />
        <p className="sr-only">
          導入は次の順で進みます。左から右、上の段から下の段の順です。
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <FadeIn key={step.id} rootMargin="0px 0px -32px 0px">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface-warm p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-purple-500/30 motion-safe:hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-xs font-medium tracking-wide text-purple-400">
                    {step.flowCue}
                  </p>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
