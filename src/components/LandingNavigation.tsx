"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it Works" },
];

export default function LandingNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="relative z-40 border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          aria-label="Campus Wayfinder home"
        >
          <Image
            src="/icons/campus-wayfinder-192.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 rounded-xl"
          />
          <span className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base">
            Campus Wayfinder
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={index === 0 ? "page" : undefined}
              className={`rounded-lg px-1 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                index === 0
                  ? "text-indigo-700"
                  : "text-slate-600 hover:text-indigo-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/navigate"
          className="hidden min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 md:inline-flex"
        >
          Start Navigating <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block size-5" aria-hidden="true">
            <span
              className={`absolute inset-inline-0 top-[6px] h-0.5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "top-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-inline-0 top-[14px] h-0.5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "top-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-3xl transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-xl flex-col px-6 pb-8 pt-5">
          <div className="flex min-h-11 items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">
              Campus Wayfinder
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Close
            </button>
          </div>
          <nav
            aria-label="Mobile main navigation"
            className="my-auto flex flex-col items-start gap-5 py-12"
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={index === 0 ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                style={{ transitionDelay: menuOpen ? `${index * 70}ms` : "0ms" }}
                className={`text-3xl font-semibold tracking-tight transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                } ${index === 0 ? "text-indigo-700" : "text-slate-900"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/navigate"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? "210ms" : "0ms" }}
              className={`mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition-[opacity,transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Start Navigating <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
