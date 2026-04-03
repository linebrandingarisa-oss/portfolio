import { FadeIn } from "@/components/FadeIn";
import { ProcessSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { processSteps } from "@/content/site";

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 bg-gradient-to-b from-surface-sky/55 via-white to-surface-cream/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="導入の流れ"
          lead="試作で感触を見てから、本番へ進みます。"
          illustration={<ProcessSectionAccent />}
        />
        <p className="sr-only">
          導入は次の順で進みます。左から右、上の段から下の段の順です。
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
          {processSteps.map((step) => (
            <FadeIn key={step.id} rootMargin="0px 0px -32px 0px">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft/90 bg-gradient-to-b from-surface-cream via-surface-warm to-surface-sky p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_2px_4px_-1px_rgba(43,36,38,0.07),0_10px_28px_-8px_rgba(43,36,38,0.14)] transition-[border-color,box-shadow,transform] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-luxury-brass/45 motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_6px_12px_-4px_rgba(43,36,38,0.11),0_20px_40px_-12px_rgba(90,50,55,0.16)]">
                <p className="text-sm font-medium tracking-wide text-luxury-brass">
                  {step.flowCue}
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
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
