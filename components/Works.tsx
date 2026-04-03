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
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="制作実績"
          lead={"LP と業務画面の試作です。\n詳細は各カードのボタンから。"}
          illustration={<WorksSectionAccent />}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {works.map((work) => (
            <FadeIn key={work.title}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border-soft/80 bg-surface-cream/70 shadow-sm">
                {work.imageSrc ? (
                  <div className="relative aspect-[16/10] w-full border-b border-border-soft bg-muted">
                    <Image
                      src={work.imageSrc}
                      alt={work.imageAlt ?? work.title}
                      fill
                      unoptimized
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {work.title}
                  </h3>
                  <p className="mt-2 flex-1 whitespace-pre-line text-sm leading-snug text-muted">
                    {work.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <li key={tag}>
                        <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-foreground/85 ring-1 ring-border-soft">
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
                      className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-foreground py-3 text-sm font-medium tracking-wide text-white shadow-md shadow-stone-900/15 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:w-auto sm:self-start sm:px-7"
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
            className="mt-3 inline-flex items-center justify-center text-sm font-medium tracking-wide text-luxury-brass underline-offset-4 hover:underline"
          >
            {worksConversion.linkLabel}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
