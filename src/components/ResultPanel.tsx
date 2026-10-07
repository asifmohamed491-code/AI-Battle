import type { RouteResult } from "@/types";
import type { CampusLocation, CampusPath } from "@/types";
import StepList from "@/components/StepList";

type RoutePanelProps = {
  result: RouteResult;
  locations: CampusLocation[];
  paths: CampusPath[];
};

export function RouteSummary({ result, locations }: RoutePanelProps) {
  return (
    <section
      aria-label="Route summary"
      className="h-full rounded-2xl border border-[#393442] bg-[#19171f]/95 p-3 shadow-lg shadow-black/10 sm:p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 className="min-w-0 text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
          {result.from.name} <span className="text-indigo-400">→</span> {result.to.name}
        </h2>
        <p className="text-sm font-semibold tabular-nums text-slate-200">
          {result.totalDistance} m <span className="text-slate-600">·</span>{" "}
          {result.walkingMinutes} min walk
        </p>
      </div>
      <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Route locations">
        {result.pathSlugs.map((slug, index) => {
          const location = locations.find((item) => item.slug === slug);
          if (!location) return null;
          const isStart = index === 0;
          const isDestination = index === result.pathSlugs.length - 1;
          return (
            <li className="flex min-w-0 items-center gap-2" key={slug}>
              {index > 0 && <span aria-hidden="true" className="text-xs text-slate-600">→</span>}
              <span
                className={`max-w-full truncate text-xs font-medium ${
                  isStart
                    ? "text-emerald-300"
                    : isDestination
                      ? "text-rose-300"
                      : "text-slate-300"
                }`}
              >
                {location.name}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function RouteDirections({ result, locations, paths }: RoutePanelProps) {
  return (
    <section
      aria-label="Route directions"
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#393442] bg-[#19171f]/95 shadow-lg shadow-black/10"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-3 pt-4">
        <h2 className="text-sm font-semibold text-slate-100">Step by step directions</h2>
        <span className="text-xs text-slate-500">Scroll for all steps</span>
      </div>
      <div className="direction-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
        <StepList
          steps={result.steps}
          pathSlugs={result.pathSlugs}
          locations={locations}
          paths={paths}
          destination={result.to}
        />
      </div>
    </section>
  );
}

export default function ResultPanel(props: RoutePanelProps) {
  return (
    <div className="space-y-4">
      <RouteSummary {...props} />
      <RouteDirections {...props} />
    </div>
  );
}
