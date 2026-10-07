import type { CampusLocation } from "@/types";

type LocationListProps = {
  locations: CampusLocation[];
  destination?: string;
  onSelect: (location: CampusLocation) => void;
};

export default function LocationList({
  locations,
  destination,
  onSelect,
}: LocationListProps) {
  return (
    <section aria-labelledby="locations-heading">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 id="locations-heading" className="text-sm font-semibold text-slate-900">
            Popular destinations
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">Choose a destination to get directions</p>
        </div>
        <span className="text-xs font-medium text-slate-400">{locations.length} places</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {locations.map((location) => (
          <button
            type="button"
            key={location.slug}
            onClick={() => onSelect(location)}
            className={`group flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition hover:border-indigo-200 hover:bg-indigo-50 ${
              destination === location.slug
                ? "border-indigo-200 bg-indigo-50"
                : "border-slate-100 bg-white"
            }`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold text-indigo-600 group-hover:bg-white">
              {location.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-slate-800">
                {location.name}
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-slate-400">
                {location.category}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
