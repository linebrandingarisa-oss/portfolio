import Link from "next/link";
import { siteBrand } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wood border-t border-border-soft/40 py-12 text-center text-sm">
      <p className="gradient-text inline-block font-semibold">{siteBrand.name}</p>
      <p className="mt-1 text-xs text-muted/70">
        &copy; {year} Arisa Nishi. All rights reserved.
      </p>
      <nav
        className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted/70"
        aria-label="法的情報"
      >
        <Link
          href="/privacy"
          className="underline-offset-2 transition hover:text-muted hover:underline"
        >
          プライバシーポリシー
        </Link>
        <Link
          href="/tokushoho"
          className="underline-offset-2 transition hover:text-muted hover:underline"
        >
          特定商取引法に基づく表記
        </Link>
      </nav>
    </footer>
  );
}
