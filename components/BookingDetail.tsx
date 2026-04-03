import { BookingSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { bookingDetail } from "@/content/site";

export function BookingDetail() {
  const b = bookingDetail;
  return (
    <section
      id="booking"
      className="scroll-mt-20 bg-surface-warm py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ブロックごとの FadeIn + opacity だと、白カードが半透明のまま重なり暗く見えるため 1 塊でフェードする */}
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
            <ul className="mt-4 space-y-3 rounded-2xl border border-border-soft bg-white p-5 sm:p-6">
              {b.challenges.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed sm:text-base text-foreground"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-sky-deep" />
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
              <div className="rounded-2xl border border-border-soft bg-white p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {b.solution.beforeLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                  {b.solution.before}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-accent-sky/40 bg-gradient-to-br from-white to-surface-sky/90 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-sky-deep">
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
                  className="rounded-full bg-white px-4 py-2 text-sm text-foreground shadow-sm ring-1 ring-border-soft"
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
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-sky/40 text-sm font-bold text-foreground">
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
