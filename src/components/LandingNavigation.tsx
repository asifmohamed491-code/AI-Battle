"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#campus-map", label: "Campus Map" },
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-4 z-40 px-4 sm:top-6">
      <div className="pointer-events-auto mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-[#2f293a] bg-[#181818]/95 px-3 shadow-lg shadow-black/20 sm:min-h-16 sm:px-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pe-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] sm:gap-3"
          aria-label="Campus Wayfinder home"
        >
          <Image
            src="/icons/campus-wayfinder-192.png"
            alt=""
            width={40}
            height={40}
            className="size-9 rounded-full sm:size-10"
          />
          <span className="truncate text-xs font-semibold tracking-tight text-white sm:text-sm">
            Campus Wayfinder
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex xl:gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-1 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/navigate"
          className="hidden min-h-10 items-center justify-center gap-2 rounded-full border border-[#443a58] bg-[#24202d] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-indigo-400/60 hover:bg-[#30283d] active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] lg:inline-flex"
        >
          Start Navigating <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] flex size-10 shrink-0 items-center justify-center rounded-full border border-[#3b3446] bg-[#211e27] text-slate-100 transition-colors hover:bg-[#30283d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] lg:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block size-5" aria-hidden="true">
            <span
              className={`absolute inset-x-0 top-[6px] h-0.5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "top-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[14px] h-0.5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
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
        className={`pointer-events-auto fixed inset-0 z-50 bg-[#120f17]/95 px-6 pb-8 pt-5 backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-xl flex-col">
          <div className="flex min-h-11 items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">
              Campus Wayfinder
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                style={{ transitionDelay: menuOpen ? `${index * 70}ms` : "0ms" }}
                className={`text-3xl font-semibold tracking-tight text-white transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/navigate"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? "210ms" : "0ms" }}
              className={`mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition-[opacity,transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f17] ${
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
