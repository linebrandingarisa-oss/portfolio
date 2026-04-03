"use client";

import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { ContactLeadIn } from "@/components/ContactLeadIn";
import { FadeIn } from "@/components/FadeIn";
import { ContactSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { contact } from "@/content/site";
import type { ContactPayload } from "@/lib/mailto";
import { submitContact } from "@/lib/submit-contact";

const placeholderX = "https://x.com/your_account";

export type ContactFormProps = {
  contactEmail?: string;
  xUrl?: string;
  instagramUrl?: string;
};

export function ContactForm({
  contactEmail,
  xUrl,
  instagramUrl,
}: ContactFormProps) {
  const to = contactEmail;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopType, setShopType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(false);
      if (!to) {
        setError(
          "送信先メールが未設定です。.env.local に NEXT_PUBLIC_CONTACT_EMAIL を設定してください。"
        );
        return;
      }
      if (!name.trim() || !email.trim() || !message.trim()) {
        setError("お名前・メール・ご相談内容は必須です。");
        return;
      }
      const payload: ContactPayload = {
        name: name.trim(),
        email: email.trim(),
        shopType: shopType.trim(),
        message: message.trim(),
      };
      setSending(true);
      const result = await submitContact(payload);
      setSending(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      setName("");
      setEmail("");
      setShopType("");
      setMessage("");
    },
    [name, email, shopType, message, to]
  );

  const xDisplay = xUrl ?? placeholderX;

  const instagramHref =
    instagramUrl?.trim() || contact.instagramUrlFallback;

  return (
    <section id="contact" className="scroll-mt-20 bg-white">
      <ContactLeadIn />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeadingWithCozy
          title={contact.heading}
          lead={contact.lead}
          illustration={<ContactSectionAccent />}
        />

        <FadeIn className="mt-8">
          <ul className="mt-6 space-y-2 rounded-xl border border-border-soft/60 bg-surface-cream/50 px-4 py-4 text-left text-xs leading-relaxed text-muted sm:text-sm">
            {contact.reassurance.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-0.5 shrink-0 text-luxury-brass" aria-hidden>
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-8">
          <form
            id="contact-form"
            onSubmit={onSubmit}
            className="rounded-xl border border-border-soft/80 bg-surface-sky/50 p-6 sm:p-9"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-foreground"
                >
                  {contact.labels.name}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-soft bg-white px-4 py-2.5 text-foreground outline-none ring-accent-sky/0 transition focus:border-accent-sky-deep focus:ring-2 focus:ring-accent-sky/30"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-foreground"
                >
                  {contact.labels.email}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-soft bg-white px-4 py-2.5 text-foreground outline-none transition focus:border-accent-sky-deep focus:ring-2 focus:ring-accent-sky/30"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-shop"
                  className="block text-sm font-medium text-foreground"
                >
                  {contact.labels.shopType}
                </label>
                <select
                  id="contact-shop"
                  name="shopType"
                  value={shopType}
                  onChange={(e) => setShopType(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-soft bg-white px-4 py-2.5 text-foreground outline-none transition focus:border-accent-sky-deep focus:ring-2 focus:ring-accent-sky/30"
                >
                  {contact.shopTypeOptions.map((opt) => (
                    <option key={opt.value || "empty"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-foreground"
                >
                  {contact.labels.message}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-y rounded-xl border border-border-soft bg-white px-4 py-2.5 text-foreground outline-none transition focus:border-accent-sky-deep focus:ring-2 focus:ring-accent-sky/30"
                />
              </div>
            </div>
            {error && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-4 text-sm text-accent-mint-deep" role="status">
                {contact.submitSuccess}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-md bg-foreground py-3.5 text-base font-medium tracking-wide text-white shadow-md shadow-stone-900/15 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
            >
              {sending ? contact.submitSending : contact.submit}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              送信により、
              <Link
                href="/privacy"
                className="font-medium text-luxury-brass underline-offset-2 hover:underline"
              >
                プライバシーポリシー
              </Link>
              に同意したものとみなします。
            </p>
            <p className="mt-2 text-xs text-muted">
              送信内容はサーバー経由でメールとして届きます。返信はお客様のメールアドレス宛になります。
            </p>
          </form>
        </FadeIn>

        <FadeIn className="mt-10 rounded-2xl border border-dashed border-border-soft/80 bg-surface-cream/70 p-6">
          <p className="text-sm font-semibold text-foreground">
            その他の連絡先（SNS）
          </p>
          <p className="mt-3 text-sm">
            <span className="text-muted">X（旧 Twitter）: </span>
            {xUrl ? (
              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-luxury-brass underline-offset-2 hover:underline"
              >
                プロフィールを開く
              </a>
            ) : (
              <>
                <span className="text-muted break-all">{xDisplay}</span>
                <span className="ml-2 text-xs text-muted">
                  （NEXT_PUBLIC_X_URL）
                </span>
              </>
            )}
          </p>
          <p className="mt-3 text-sm">
            <span className="text-muted">Instagram: </span>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-luxury-brass underline-offset-2 hover:underline"
            >
              プロフィールを開く
            </a>
          </p>
          <p className="mt-2 text-xs text-muted">
            メールでのお問い合わせは、上のフォームからお願いします。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
