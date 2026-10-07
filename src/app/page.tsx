import type { Metadata } from "next";
import Link from "next/link";
import LandingNavigation from "@/components/LandingNavigation";
import ShapeGrid from "@/components/ShapeGrid/ShapeGrid";

export const metadata: Metadata = {
  title: "Campus Wayfinder | Find Your Way Around Campus",
  description:
    "Search naturally, explore campus facilities, and follow clear step by step directions with Campus Wayfinder.",
  openGraph: {
    title: "Campus Wayfinder | Find Your Way Around Campus",
    description:
      "Search naturally, explore campus facilities, and follow clear step by step directions.",
    type: "website",
  },
};

const features = [
  {
    title: "Natural Language Search",
    description: "Ask where you want to go in your own words.",
    icon: "search",
  },
  {
    title: "Interactive Campus Map",
    description: "Explore buildings, facilities and walking routes visually.",
    icon: "map",
  },
  {
    title: "Step by Step Directions",
    description:
      "Follow a clear route from your starting point to your destination.",
    icon: "route",
  },
] as const;

const steps = [
  { number: "01", title: "Search", description: "Tell us where you want to go." },
  { number: "02", title: "Choose", description: "Select your starting point." },
  {
    number: "03",
    title: "Navigate",
    description: "Follow the route and reach your destination.",
  },
] as const;

function FeatureIcon({ name }: { name: (typeof features)[number]["icon"] }) {
  const shared = {
    className: "size-5",
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
        <path d="m15.4 15.4 4.1 4.1" />
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
      <path d="M4 12h14M14 7l5 5-5 5" />
      <circle cx="4" cy="12" r="2" />
    </svg>
  );
}

function RouteVisual() {
  return (
    <div
      id="campus-map"
      className="wayfinder-hero-enter wayfinder-hero-enter-late mx-auto w-full max-w-xl scroll-mt-24 rounded-2xl border border-[#2f293a] bg-[#181818]/80 px-4 py-5 sm:px-7 sm:py-6"
    >
      <svg
        role="img"
        aria-labelledby="route-title route-description"
        viewBox="0 0 640 112"
        className="h-auto w-full"
      >
        <title id="route-title">A route across campus</title>
        <desc id="route-description">
          Walking route from Main Gate to AI Lab
        </desc>
        <path
          d="M86 57 C190 57 232 57 320 57 S448 57 554 57"
          fill="none"
          stroke="#484154"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          className="wayfinder-route-dash"
          d="M86 57 C190 57 232 57 320 57 S448 57 538 57"
          fill="none"
          stroke="#8b72e8"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path d="m531 48 12 9-12 9" fill="none" stroke="#a994ff" strokeWidth="3" />
        <circle cx="72" cy="57" r="13" fill="#163c2a" stroke="#39b36b" strokeWidth="2" />
        <circle cx="72" cy="57" r="5" fill="#64dc91" />
        <circle cx="568" cy="57" r="13" fill="#3b2028" stroke="#dc6475" strokeWidth="2" />
        <circle cx="568" cy="57" r="5" fill="#f48a98" />
        <text
          x="72"
          y="20"
          textAnchor="middle"
          fill="#d6d2dc"
          fontSize="13"
          fontWeight="600"
        >
          Main Gate
        </text>
        <text
          x="568"
          y="20"
          textAnchor="middle"
          fill="#d6d2dc"
          fontSize="13"
          fontWeight="600"
        >
          AI Lab
        </text>
      </svg>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="wayfinder-landing">
      <div className="wayfinder-grid-layer" aria-hidden="true">
        <ShapeGrid
          direction="diagonal"
          speed={0.5}
          borderColor="#2F293A"
          squareSize={40}
          hoverFillColor="#222222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      <a
        href="#main-content"
        className="sr-only z-[60] rounded-lg bg-[#201d27] px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:inset-inline-start-4 focus:top-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        Skip to content
      </a>

      <LandingNavigation />

      <main id="main-content" className="relative z-10">
        <section
          id="home"
          aria-labelledby="hero-title"
          className="flex min-h-[100svh] flex-col items-center justify-center px-4 pb-12 pt-28 text-center sm:px-6 sm:pt-32"
        >
          <div className="wayfinder-hero-enter flex min-h-8 items-center gap-2 rounded-full border border-[#443957] bg-[#201d27]/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-200">
            <span className="size-1.5 rounded-full bg-indigo-400" />
            CAMPUS NAVIGATION
          </div>

          <h1
            id="hero-title"
            className="wayfinder-hero-enter wayfinder-hero-enter-delay mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-white text-wrap-balance sm:text-6xl md:text-7xl"
          >
            Find Your Way
            <br />
            Around <span className="text-indigo-400">Campus.</span>
          </h1>

          <p className="wayfinder-hero-enter wayfinder-hero-enter-delay mt-6 max-w-xl text-base leading-7 text-slate-300 text-wrap-pretty sm:text-lg sm:leading-8">
            Search naturally, explore campus facilities, and get clear
            step-by-step directions in seconds.
          </p>

          <div className="wayfinder-hero-enter wayfinder-hero-enter-late mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Link
              href="/navigate"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f17]"
            >
              Start Navigating <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/navigate"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#544a62] bg-[#181818]/80 px-5 py-3 text-base font-semibold text-slate-100 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-indigo-400/70 hover:bg-[#211d29] active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f17]"
            >
              Explore Campus Map
            </Link>
          </div>

          <div className="wayfinder-hero-enter wayfinder-hero-enter-late mt-10 w-full px-1 sm:mt-12">
            <RouteVisual />
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="features-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20"
        >
          <h2
            id="features-title"
            className="text-center text-2xl font-semibold tracking-tight text-white text-wrap-balance sm:text-3xl"
          >
            Find the places that matter
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-[#302a39] bg-[#181818]/90 p-5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[#514468] hover:bg-[#1c1922] motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-[#443957] bg-[#211d29] text-indigo-300">
                  <FeatureIcon name={feature.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400 text-wrap-pretty">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how"
          aria-labelledby="how-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20"
        >
          <h2
            id="how-title"
            className="text-center text-2xl font-semibold tracking-tight text-white text-wrap-balance sm:text-3xl"
          >
            Three steps to your destination
          </h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex items-start gap-4 rounded-2xl border border-[#302a39] bg-[#181818]/80 p-5 sm:border-transparent sm:bg-transparent sm:p-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#4a3e60] bg-[#211d29] text-sm font-semibold text-indigo-300">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
          <div className="rounded-2xl border border-[#3b3348] bg-[#181818]/90 px-5 py-10 text-center sm:px-10 sm:py-12">
            <h2 className="text-2xl font-semibold tracking-tight text-white text-wrap-balance sm:text-3xl">
              Ready to explore your campus?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-400">
              Let Campus Wayfinder guide you.
            </p>
            <Link
              href="/navigate"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818]"
            >
              Start Navigating <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#292431] bg-[#120f17]/80">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6">
          Campus Wayfinder
        </div>
      </footer>
    </div>
  );
}
