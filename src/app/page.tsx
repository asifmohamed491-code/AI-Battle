import type { Metadata } from "next";
import Link from "next/link";
import CampusMap from "@/components/CampusMap";
import LandingNavigation from "@/components/LandingNavigation";
import TaglineReveal from "@/components/TaglineReveal";
import { locations } from "@/data/locations";
import { paths } from "@/data/paths";

export const metadata: Metadata = {
  title: "Find your way around campus",
  description:
    "Search campus facilities naturally, explore the illustrated campus map, and follow clear walking directions.",
  openGraph: {
    title: "Campus Wayfinder | Find your way around campus",
    description:
      "Search campus facilities naturally and follow clear walking directions.",
    type: "website",
  },
};

const exampleRoute = ["main-gate", "administrative-office", "cse-block", "ai-lab"];

const features = [
  {
    title: "Natural Language Search",
    description: "Ask where you want to go in your own words.",
    icon: "search",
  },
  {
    title: "Interactive Campus Map",
    description: "See buildings, facilities and walking routes visually.",
    icon: "map",
  },
  {
    title: "Step by Step Directions",
    description:
      "Follow clear directions from your starting point to your destination.",
    icon: "directions",
  },
] as const;

const steps = [
  { number: "01", title: "Search", description: "Tell us where you want to go." },
  { number: "02", title: "Choose", description: "Select your starting point." },
  {
    number: "03",
    title: "Navigate",
    description: "Follow the route and step by step directions.",
  },
] as const;

function FeatureIcon({ name }: { name: (typeof features)[number]["icon"] }) {
  const shared = {
    className: "size-6",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (name === "search") {
    return (
      <svg {...shared}>
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m15.4 15.4 4.1 4.1M10.8 7.7v6.2M7.7 10.8h6.2" />
      </svg>
    );
  }

  if (name === "map") {
    return (
      <svg {...shared}>
        <path d="m3.5 6 5.8-2.5 5.4 2.5L20.5 3v15l-5.8 2.5-5.4-2.5L3.5 21z" />
        <path d="M9.3 3.5v14.1m5.4-11.6v14.1" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path d="M5 19h14M7 16l4-4 3 2 4-5" />
      <path d="M14.5 9H18v3.5M5 5h4v4H5z" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-lg bg-white px-4 py-3 font-semibold text-indigo-700 focus:not-sr-only focus:fixed focus:inset-inline-start-4 focus:top-4 focus:shadow-lg"
      >
        Skip to content
      </a>

      <LandingNavigation />

      <main id="main-content" className="bg-[#f5f7fb] text-slate-900">
        <section
          id="home"
          aria-labelledby="hero-title"
          className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 pb-12 pt-10 sm:px-7 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:px-10 lg:pb-20 lg:pt-16"
        >
          <div className="max-w-xl">
            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-tight text-slate-950 text-wrap-balance sm:text-5xl lg:text-6xl"
            >
              Find Your Way Around Campus.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 text-wrap-pretty">
              Search naturally, discover campus facilities, and get clear step
              by step directions in seconds.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/navigate"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              >
                Explore Campus <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/navigate"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-800 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              >
                View Campus Map
              </Link>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              Ten campus destinations, connected by mapped walking routes.
            </p>
          </div>

          <div className="min-w-0">
            <CampusMap
              locations={locations}
              paths={paths}
              pathSlugs={exampleRoute}
            />
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="features-title"
          className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20"
        >
          <div className="max-w-2xl">
            <h2
              id="features-title"
              className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-wrap-balance"
            >
              Everything you need to find your way
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <FeatureIcon name={feature.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-600 text-wrap-pretty">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-label="Campus navigation benefit"
          className="px-4 py-14 sm:px-7 sm:py-20"
        >
          <TaglineReveal />
        </section>

        <section
          id="how"
          aria-labelledby="how-title"
          className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20"
        >
          <h2
            id="how-title"
            className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-wrap-balance"
          >
            From a question to the right door
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {steps.map((step) => (
              <li
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="text-sm font-semibold text-indigo-700">
                  {step.number}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-600 text-wrap-pretty">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-7 sm:pb-16 lg:px-10">
          <div className="rounded-2xl bg-indigo-50 px-6 py-10 text-center sm:px-10 sm:py-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl text-wrap-balance">
              Ready to explore the campus?
            </h2>
            <Link
              href="/navigate"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Start Navigating <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
          <Link
            href="/"
            className="font-semibold text-slate-700 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Campus Wayfinder
          </Link>
          <span>Campus navigation and facility finder</span>
        </div>
      </footer>
    </>
  );
}
