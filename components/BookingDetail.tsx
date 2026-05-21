import { BookingSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { bookingDetail } from "@/content/site";

export function BookingDetail() {
  const b = bookingDetail;
  return (
    <section
      id="automation"
      className="scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeadingWithCozy
            title={b.sectionTitle}
            lead={
              <>
                <p className="text-center leading-relaxed sm:text-left">
                  {b.sectionLeadLines[0]}
                </p>
                <p className="mt-2 text-center leading-relaxed sm:text-left">
                  {b.sectionLeadLines[1]}
                </p>
              </>
            }
            illustration={<BookingSectionAccent />}
          />

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground">
              {b.challenges.title}
            </h3>
            <ul className="mt-4 space-y-3 rounded-2xl border border-border-soft bg-surface-sky p-5 sm:p-6">
              {b.challenges.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-foreground sm:text-base"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                  <span className="min-w-0 whitespace-pre-line [word-break:keep-all]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground">
              {b.solution.title}
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border-soft bg-surface-warm p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {b.solution.beforeLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {b.solution.before}
                </p>
              </div>
              <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-surface-warm to-surface-sky p-5 shadow-[0_0_20px_rgba(168,85,247,0.08)] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                  {b.solution.afterLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                  {b.solution.after}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground">
              {b.features.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {b.features.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-soft bg-surface-warm px-4 py-2 text-sm text-foreground/90 ring-1 ring-purple-500/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground">
              {b.roadmap.title}
            </h3>
            <div className="mx-auto mt-4 max-w-prose sm:mx-0">
              <ol className="space-y-4">
                {b.roadmap.items.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-sm font-bold text-purple-400">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-muted sm:text-base">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

