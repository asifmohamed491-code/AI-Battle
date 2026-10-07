"use client";

import type { FormEvent } from "react";
import type { CampusLocation } from "@/types";

type SearchBarProps = {
  locations: CampusLocation[];
  source: string;
  query: string;
  destination?: CampusLocation;
  destinationSlug: string;
  loading: boolean;
  onSourceChange: (source: string) => void;
  onDestinationChange: (destination: string) => void;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  locations,
  source,
  query,
  destination,
  destinationSlug,
  loading,
  onSourceChange,
  onDestinationChange,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="search-form space-y-3">
      <p className="search-title text-sm font-semibold text-slate-100">Where do you want to go?</p>

      <div className="search-locations">
        <div className="search-source">
          <label htmlFor="source-location" className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
            <span className="rounded bg-emerald-400/10 px-1.5 py-0.5">From</span>
            Starting point
          </label>
          <div className="relative">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2" />
            </svg>
            <select
              id="source-location"
              value={source}
              onChange={(event) => onSourceChange(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-[#393442] bg-[#111016] py-2 pl-10 pr-10 text-sm text-slate-100 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
            >
              {locations.map((location) => (
                <option value={location.slug} key={location.slug}>
                  {location.name}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="search-destination">
          <label htmlFor="destination-location" className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300">
            <span className="rounded bg-indigo-400/15 px-1.5 py-0.5">To</span>
            Destination
          </label>
          <div className="relative">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-rose-300" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="10" r="6.5" />
              <path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 1 1 13 0c0 5.6-6.5 11-6.5 11Z" />
              <circle cx="12" cy="10" r="2" />
            </svg>
            <select
              id="destination-location"
              value={destinationSlug}
              onChange={(event) => onDestinationChange(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-[#393442] bg-[#111016] py-2 pl-10 pr-10 text-sm text-slate-100 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
            >
              <option value="">Choose a destination</option>
              {locations.map((location) => (
                <option value={location.slug} key={location.slug}>
                  {location.name}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="search-natural-query">
        <label htmlFor="destination-query" className="mb-1.5 block text-xs font-medium text-slate-400">
          Or ask in your own words
        </label>
        <div className="flex h-10 items-center gap-3 rounded-xl border border-[#393442] bg-[#111016] px-3 shadow-inner shadow-black/10 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/15">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.2 4.2" />
          </svg>
          <input
            id="destination-query"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Where is the AI Lab from the Main Gate?"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            autoComplete="off"
          />
        </div>
        {destination && query.trim() && (
          <p className="mt-1.5 text-xs text-slate-400">
            Destination detected: <span className="font-medium text-slate-200">{destination.name}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="search-submit inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#19171f] disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Searching…" : "Find route"}
        {!loading && <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}
