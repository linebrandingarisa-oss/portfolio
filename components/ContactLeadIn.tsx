import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { contact } from "@/content/site";

/**
 * お問い合わせセクション冒頭：興味→フォーム入力への橋渡し
 */
export function ContactLeadIn() {
  return (
    <div className="border-b border-border-soft/80 bg-surface-warm">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8">
        <FadeIn>
          <p className="text-xs font-medium tracking-[0.15em] text-luxury-brass">
            次の一歩
          </p>
          <p className="mt-2 text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
            {contact.preFormBandTitle}
          </p>
          <div className="mx-auto mt-3 max-w-prose">
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">
              {contact.preFormBandBody}
            </p>
          </div>
          <Link
            href="#contact-form"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-border-soft bg-white px-6 py-3 text-sm font-medium tracking-wide text-foreground shadow-sm transition hover:border-luxury-brass/45 hover:bg-surface-cream"
          >
            {contact.preFormBandCta}
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
