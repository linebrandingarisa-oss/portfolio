import { FadeIn } from "@/components/FadeIn";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { ServicesSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { services } from "@/content/site";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-surface-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="サービス紹介"
          lead="生成AI・自動化・集客導線を、現場で動く形に。"
          illustration={<ServicesSectionAccent />}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {services.map((item) => (
            <FadeIn key={item.title} rootMargin="0px 0px -32px 0px">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface-warm p-6 shadow-[0_0_0_1px_rgba(168,85,247,0.05)] transition-[border-color,box-shadow,transform] duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-purple-500/30 motion-safe:hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <div className="relative self-start rounded-xl bg-surface-sky p-3 ring-1 ring-purple-500/20">
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
