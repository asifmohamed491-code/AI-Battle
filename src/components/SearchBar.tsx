"use client";

import type { FormEvent } from "react";
import type { CampusLocation } from "@/types";

type SearchBarProps = {
  locations: CampusLocation[];
  source: string;
  query: string;
  loading: boolean;
  onSourceChange: (source: string) => void;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  locations,
  source,
  query,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="destination-query" className="text-sm font-semibold text-slate-100">
        Where would you like to go?
      </label>
      <div className="flex h-12 items-center gap-3 rounded-xl border border-[#393442] bg-[#111016] px-3 shadow-inner shadow-black/10 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/15">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.2 4.2" />
        </svg>
        <input
          id="destination-query"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try “Where is the AI Lab?”"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          autoComplete="off"
        />
        <kbd className="hidden rounded border border-[#393442] px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
          Enter
        </kbd>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="source-location" className="mb-1.5 block text-xs font-medium text-slate-400">
            Starting point
          </label>
          <select
            id="source-location"
            value={source}
            onChange={(event) => onSourceChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-[#393442] bg-[#111016] px-3 text-sm text-slate-100 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
          >
            {locations.map((location) => (
              <option value={location.slug} key={location.slug}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-70 sm:min-w-36"
        >
          {loading ? "Searching…" : "Find route"}
          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}
