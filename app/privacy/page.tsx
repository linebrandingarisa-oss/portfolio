import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/content/privacy-policy";
import { siteBrand } from "@/content/site";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${siteBrand.name}`,
  description:
    "本サイトにおける個人情報の取扱いについて説明しています。お問い合わせフォーム等で取得する情報の利用目的、委託、お問い合わせ窓口です。",
};

export default function PrivacyPage() {
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
            {privacyPolicyMeta.title}
          </h1>
          <p className="mt-3 text-center text-sm text-muted">
            最終更新日：{privacyPolicyMeta.lastUpdated}
          </p>

          <div className="mt-12 space-y-10">
            {privacyPolicySections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-3 max-w-prose space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                  {section.operatorLine && (
                    <p className="whitespace-pre-line">
                      運営者名：{siteBrand.name}
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
