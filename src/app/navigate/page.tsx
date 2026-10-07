"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CampusMap from "@/components/CampusMap";
import LocationList from "@/components/LocationList";
import { RouteDirections, RouteSummary } from "@/components/ResultPanel";
import SearchBar from "@/components/SearchBar";
import StateMessage from "@/components/StateMessage";
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
    void requestRoute("/api/search", { query, defaultSource: source });
  }

  function selectLocation(location: CampusLocation) {
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
  const visibleState =
    viewState === "success" ? undefined : viewState === "loading" ? "loading" : viewState;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-7 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Campus Wayfinder home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.4" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight">Campus Wayfinder</span>
              <span className="mt-0.5 block text-xs text-slate-500">Find your way around campus</span>
            </span>
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Campus map available
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[1760px] px-4 py-4 sm:px-6 lg:px-7">
        <h1 className="sr-only">Campus Wayfinder navigation</h1>
        <div className="navigation-workspace">
          <section className="workspace-search rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SearchBar
              locations={locations}
              source={source}
              query={query}
              loading={viewState === "loading"}
              onSourceChange={setSource}
              onQueryChange={setQuery}
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
              <div className="flex h-full min-h-28 items-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4">
                <p className="text-sm text-slate-500">
                  {viewState === "loading"
                    ? "Directions will appear here when your route is ready."
                    : "Search for a destination to see step by step directions."}
                </p>
              </div>
            )}
          </div>

          <section className="workspace-popular rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Popular destinations</p>
              {locations.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllLocations((show) => !show)}
                  aria-expanded={showAllLocations}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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

        <footer className="mt-3 border-t border-slate-200 pt-2 text-center text-xs text-slate-400 lg:hidden">
          Campus Wayfinder · Distances are approximate
        </footer>
      </div>
    </main>
  );
}
