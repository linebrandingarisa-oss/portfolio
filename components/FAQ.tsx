import { FadeIn } from "@/components/FadeIn";
import { FaqSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { faqItems } from "@/content/site";

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-surface-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="よくある質問"
          lead={"気になる点があれば、\nお問い合わせでもお気軽にどうぞ。"}
          illustration={<FaqSectionAccent />}
        />
        <div className="mt-10 space-y-3">
          {faqItems.map((item) => (
            <FadeIn key={item.q}>
              <details className="faq-item group rounded-xl border border-border-soft/80 bg-white/80 open:bg-white open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground sm:px-6">
                  <span>{item.q}</span>
                  <span
                    className="shrink-0 text-muted transition group-open:rotate-180"
                    aria-hidden
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-border-soft/80 px-5 pb-4 pt-0 text-sm leading-relaxed text-muted sm:px-6">
                  <div className="max-w-prose pt-3">
                    <p>{item.a}</p>
                  </div>
                </div>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
