import Link from "next/link";
import { siteBrand } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wood py-12 text-center text-sm">
      <p>
        &copy; {year} {siteBrand.name}
      </p>
      <nav
        className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[#4a3a3e]"
        aria-label="法的情報"
      >
        <Link
          href="/privacy"
          className="underline decoration-[#4a3a3e]/40 underline-offset-2 transition hover:decoration-[#4a3a3e]"
        >
          プライバシーポリシー
        </Link>
        <Link
          href="/tokushoho"
          className="underline decoration-[#4a3a3e]/40 underline-offset-2 transition hover:decoration-[#4a3a3e]"
        >
          特定商取引法に基づく表記
        </Link>
      </nav>
    </footer>
  );
}
