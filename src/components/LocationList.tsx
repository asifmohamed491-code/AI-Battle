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
          <h2 id="locations-heading" className="text-sm font-semibold text-slate-100">
            Popular destinations
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">Choose a destination to get directions</p>
        </div>
        <span className="text-xs font-medium text-slate-500">{locations.length} places</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {locations.map((location) => (
          <button
            type="button"
            key={location.slug}
            onClick={() => onSelect(location)}
            className={`group flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition hover:border-indigo-400/50 hover:bg-indigo-500/10 ${
              destination === location.slug
                ? "border-indigo-400/50 bg-indigo-500/10"
                : "border-[#393442] bg-[#111016]"
            }`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#25222e] text-xs font-bold text-indigo-300 group-hover:bg-[#302a3b]">
              {location.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-slate-100">
                {location.name}
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-slate-500">
                {location.category}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
