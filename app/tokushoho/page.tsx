import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { getTokushohoRows, tokushohoMeta } from "@/content/tokushoho";
import { siteBrand } from "@/content/site";

export const metadata: Metadata = {
  title: `${tokushohoMeta.title} | ${siteBrand.name}`,
  description:
    "特定商取引法に基づく表示。販売事業者、お支払い、納品、返品・キャンセル等について記載しています。",
};

export default function TokushohoPage() {
  const rows = getTokushohoRows();

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-center">
            <Link
              href="/#hero"
              className="text-sm font-medium text-luxury-brass underline-offset-2 hover:underline"
            >
              トップへ戻る
            </Link>
          </p>
          <h1 className="mt-8 text-center font-display text-2xl font-semibold tracking-wide text-foreground sm:text-3xl">
            {tokushohoMeta.title}
          </h1>

          <dl className="mt-12 space-y-10">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-display text-base font-semibold text-foreground">
                  {row.label}
                </dt>
                <dd className="mt-2">
                  <div className="max-w-prose space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                    {row.body.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
