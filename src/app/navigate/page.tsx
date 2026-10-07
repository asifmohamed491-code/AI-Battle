"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CampusMap from "@/components/CampusMap";
import ShapeGrid from "@/components/ShapeGrid/ShapeGrid";
import LocationList from "@/components/LocationList";
import { RouteDirections, RouteSummary } from "@/components/ResultPanel";
import SearchBar from "@/components/SearchBar";
import StateMessage from "@/components/StateMessage";
import { parseQuery } from "@/lib/parseQuery";
import type {
  CampusLocation,
  CampusPath,
  RouteResult,
  SearchError,
} from "@/types";

type ViewState = "idle" | "loading" | "success" | "empty" | "error";

export default function NavigatePage() {
  const [locations, setLocations] = useState<CampusLocation[]>([]);
  const [paths, setPaths] = useState<CampusPath[]>([]);
  const [source, setSource] = useState("main-gate");
  const [query, setQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [result, setResult] = useState<RouteResult | null>(null);
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [message, setMessage] = useState<string>();
  const [showAllLocations, setShowAllLocations] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadCampus() {
      try {
        const [locationResponse, pathResponse] = await Promise.all([
          fetch("/api/locations"),
          fetch("/api/paths"),
        ]);
        if (!locationResponse.ok || !pathResponse.ok) {
          throw new Error("Campus places could not be loaded.");
        }
        const [locationData, pathData] = (await Promise.all([
          locationResponse.json(),
          pathResponse.json(),
        ])) as [CampusLocation[], CampusPath[]];
        if (active) {
          setLocations(locationData);
          setPaths(pathData);
        }
      } catch (error) {
        if (active) {
          setViewState("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "Campus data could not be loaded. Please refresh the page.",
          );
        }
      }
    }
    void loadCampus();
    return () => {
      active = false;
    };
  }, []);

  async function requestRoute(url: string, body: object) {
    setViewState("loading");
    setMessage(undefined);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as RouteResult | SearchError;
      if (!response.ok) {
        const error = payload as SearchError;
        setResult(null);
        setViewState(
          error.error === "DESTINATION_NOT_FOUND" || error.error === "EMPTY_QUERY"
            ? "empty"
            : "error",
        );
        setMessage(error.message);
        return;
      }
      setResult(payload as RouteResult);
      setViewState("success");
    } catch {
      setResult(null);
      setViewState("error");
      setMessage("We couldn't reach the campus route service. Please try again.");
    }
  }

  function search() {
    if (query.trim()) {
      void requestRoute("/api/search", { query, defaultSource: source });
      return;
    }
    if (selectedDestination) {
      void requestRoute("/api/route", { from: source, to: selectedDestination });
      return;
    }
    void requestRoute("/api/search", { query, defaultSource: source });
  }

  function changeQuery(value: string) {
    setQuery(value);
    setSelectedDestination("");
  }

  function selectLocation(location: CampusLocation) {
    setSelectedDestination(location.slug);
    setQuery(`Where is the ${location.name}?`);
    void requestRoute("/api/route", { from: source, to: location.slug });
  }

  const popularSlugs = ["library", "ai-lab", "cafeteria", "hostel"];
  const popularLocations = [
    ...popularSlugs
      .map((slug) => locations.find((location) => location.slug === slug))
      .filter((location): location is CampusLocation => Boolean(location)),
    ...locations.filter((location) => !popularSlugs.includes(location.slug)),
  ];
  const visibleLocations = showAllLocations ? popularLocations : popularLocations.slice(0, 4);
  const parsedDestinationSlug = parseQuery(query, locations, source).to;
  const destinationSlug = parsedDestinationSlug ?? selectedDestination;
  const parsedDestination = locations.find((location) => location.slug === destinationSlug);
  const visibleState =
    viewState === "success" ? undefined : viewState === "loading" ? "loading" : viewState;

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#120f17] text-slate-100">
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

      <header className="relative z-10 border-b border-[#2f293a] bg-[#181818]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-7 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Campus Wayfinder home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.4" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight text-white">Campus Wayfinder</span>
              <span className="mt-0.5 block text-xs text-slate-400">Find your way around campus</span>
            </span>
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-emerald-900/70 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-emerald-300 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Campus map available
          </span>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1760px] px-4 py-4 sm:px-6 lg:px-7">
        <h1 className="sr-only">Campus Wayfinder navigation</h1>
        <div className="navigation-workspace">
          <section className="workspace-search rounded-2xl border border-[#393442] bg-[#19171f]/95 p-3 shadow-lg shadow-black/10 sm:p-4">
            <SearchBar
              locations={locations}
              source={source}
              query={query}
              destination={parsedDestination}
              destinationSlug={destinationSlug}
              loading={viewState === "loading"}
              onSourceChange={setSource}
              onDestinationChange={(destination) => {
                setQuery("");
                setSelectedDestination(destination);
              }}
              onQueryChange={changeQuery}
              onSearch={search}
            />
          </section>

          <div className="workspace-summary">
            {viewState === "success" && result ? (
              <RouteSummary result={result} locations={locations} paths={paths} />
            ) : visibleState ? (
              <StateMessage state={visibleState} message={message} />
            ) : null}
          </div>

          <section className="workspace-map" aria-label="Campus map">
            <CampusMap
              locations={locations}
              paths={paths}
              pathSlugs={result?.pathSlugs}
            />
          </section>

          <div className="workspace-directions">
            {viewState === "success" && result ? (
              <RouteDirections result={result} locations={locations} paths={paths} />
            ) : (
              <div className="flex h-full min-h-28 items-center rounded-2xl border border-dashed border-[#393442] bg-[#19171f]/90 p-4">
                <p className="text-sm text-slate-400">
                  {viewState === "loading"
                    ? "Directions will appear here when your route is ready."
                    : "Search for a destination to see step by step directions."}
                </p>
              </div>
            )}
          </div>

          <section className="workspace-popular rounded-2xl border border-[#393442] bg-[#19171f]/95 p-3 shadow-lg shadow-black/10 sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-100">Popular destinations</p>
              {locations.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllLocations((show) => !show)}
                  aria-expanded={showAllLocations}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {showAllLocations ? "Show popular" : "View all locations"}
                </button>
              )}
            </div>
            <LocationList
              locations={visibleLocations}
              destination={result?.to.slug}
              onSelect={selectLocation}
            />
          </section>
        </div>

        <footer className="mt-3 border-t border-[#393442] pt-2 text-center text-xs text-slate-500 lg:hidden">
          Campus Wayfinder · Distances are approximate
        </footer>
      </div>
    </main>
  );
}
