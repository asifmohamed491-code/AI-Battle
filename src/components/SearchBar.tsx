"use client";

import type { FormEvent } from "react";
import type { CampusLocation } from "@/types";

type SearchBarProps = {
  locations: CampusLocation[];
  source: string;
  query: string;
  destination?: CampusLocation;
  loading: boolean;
  onSourceChange: (source: string) => void;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  locations,
  source,
  query,
  destination,
  loading,
  onSourceChange,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-semibold text-slate-100">Where do you want to go?</p>

      <div className="space-y-2.5">
        <div>
          <label htmlFor="destination-query" className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300">
            <span className="rounded bg-indigo-400/15 px-1.5 py-0.5">To</span>
            Destination
          </label>
          <div className="flex h-11 items-center gap-3 rounded-xl border border-[#393442] bg-[#111016] px-3 shadow-inner shadow-black/10 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/15">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              id="destination-query"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search or ask naturally…"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              autoComplete="off"
            />
            <kbd className="hidden rounded border border-[#393442] px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
              Enter
            </kbd>
          </div>
          <div className="mt-1.5 flex min-h-6 items-center gap-2 text-xs">
            <span className="text-slate-500">Selected destination</span>
            {destination ? (
              <span className="inline-flex min-w-0 items-center gap-1.5 font-medium text-slate-200">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-indigo-400" />
                <span className="truncate">{destination.name}</span>
              </span>
            ) : (
              <span className="text-slate-500">—</span>
            )}
          </div>
        </div>

        <div>
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
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#19171f] disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Searching…" : "Find route"}
        {!loading && <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}
