import { FadeIn } from "@/components/FadeIn";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { ServicesSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { services } from "@/content/site";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="サービス紹介"
          lead="規模と業種に合わせ、必要なところから少しずつ。"
          illustration={<ServicesSectionAccent />}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
          {services.map((item) => (
            <FadeIn key={item.title} rootMargin="0px 0px -32px 0px">
              <article
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft/90 bg-gradient-to-b from-surface-cream via-surface-warm to-surface-sky p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_2px_4px_-1px_rgba(43,36,38,0.07),0_10px_28px_-8px_rgba(43,36,38,0.14)] transition-[border-color,box-shadow,transform] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-luxury-brass/45 motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_6px_12px_-4px_rgba(43,36,38,0.11),0_20px_40px_-12px_rgba(90,50,55,0.16)]"
              >
                <div className="relative self-start rounded-xl bg-gradient-to-br from-surface-sky to-surface-warm/90 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_3px_10px_-3px_rgba(43,36,38,0.12)] ring-1 ring-luxury-brass/22">
                  <ServiceIllustration
                    id={item.illustration}
                    title={item.title}
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
