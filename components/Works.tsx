import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { WorksSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { works, worksConversion } from "@/content/site";

export function Works() {
  return (
    <section
      id="works"
      className="scroll-mt-20 bg-surface-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="制作実績"
          lead={"AI自動化・LP・業務画面の実績です。\nAI系は設計・実装の詳細についてお問い合わせください。"}
          illustration={<WorksSectionAccent />}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {works.map((work) => (
            <FadeIn key={work.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface-warm transition-[border-color,box-shadow] duration-300 motion-safe:hover:border-purple-500/30 motion-safe:hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]">
                {work.imageSrc ? (
                  <div className="relative aspect-[16/10] w-full border-b border-border-soft bg-surface-sky">
                    <Image
                      src={work.imageSrc}
                      alt={work.imageAlt ?? work.title}
                      fill
                      unoptimized
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="relative h-24 w-full overflow-hidden border-b border-border-soft bg-gradient-to-br from-purple-900/30 via-surface-sky to-cyan-900/20">
                    <div className="absolute inset-0 grid-pattern opacity-40" />
                    <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-purple-500/15 blur-2xl" />
                    <div className="absolute bottom-2 left-6 h-10 w-10 rounded-full bg-cyan-500/15 blur-xl" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {work.title}
                  </h3>
                  <p className="mt-2 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted">
                    {work.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <li key={tag}>
                        <span className="rounded-md border border-border-soft bg-surface-sky px-2.5 py-1 text-xs font-medium text-foreground/80 ring-1 ring-purple-500/10">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {work.demoHref && work.demoLabel ? (
                    <Link
                      href={work.demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-purple-500/40 bg-purple-500/10 py-2.5 text-sm font-medium tracking-wide text-purple-300 transition hover:bg-purple-500/20 hover:text-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 sm:w-auto sm:self-start sm:px-7"
                    >
                      {work.demoLabel}
                    </Link>
                  ) : null}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 text-center">
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
            {worksConversion.line}
          </p>
          <Link
            href={worksConversion.href}
            className="mt-3 inline-flex items-center justify-center text-sm font-medium tracking-wide text-purple-400 underline-offset-4 hover:underline"
          >
            {worksConversion.linkLabel}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
