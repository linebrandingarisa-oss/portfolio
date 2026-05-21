"use client";

import Link from "next/link";
import { useState } from "react";
import { headerCta, navItems, siteBrand } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="#hero"
          className="gradient-text text-sm font-bold sm:text-base"
          onClick={() => setOpen(false)}
        >
          {siteBrand.name}
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex md:gap-2"
          aria-label="主要ナビ"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={headerCta.href}
            className="ml-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-purple-500/20 transition hover:opacity-90"
          >
            {headerCta.label}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">メニュー</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-white/5 bg-black/95 px-4 pb-4 md:hidden"
          aria-label="モバイルナビ"
        >
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-white/5 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={headerCta.href}
              className="mt-3 block rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {headerCta.label}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
