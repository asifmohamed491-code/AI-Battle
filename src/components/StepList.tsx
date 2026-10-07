import type { CSSProperties } from "react";
import type { CampusLocation, CampusPath } from "@/types";

type StepListProps = {
  steps: string[];
  pathSlugs: string[];
  locations: CampusLocation[];
  paths: CampusPath[];
  destination: CampusLocation;
};

type DirectionKind = "straight" | "left" | "right" | "stairs" | "continue";

function getDirectionKind(instruction: string): DirectionKind {
  const text = instruction.toLowerCase();
  if (/stairs|staircase|floor/.test(text)) return "stairs";
  if (/\bleft\b/.test(text)) return "left";
  if (/\bright\b/.test(text)) return "right";
  if (/\bstraight\b/.test(text)) return "straight";
  return "continue";
}

function getInstructionParts(instruction: string, kind: DirectionKind) {
  const trimmed = instruction.trim().replace(/[.!?]+$/, "");
  if (kind === "straight") {
    return {
      title: "Walk straight",
      detail: trimmed.replace(/^walk\s+straight\s*/i, "").replace(/^from\s+/i, "From "),
    };
  }
  if (kind === "left" || kind === "right") {
    const title = kind === "left" ? "Turn left" : "Turn right";
    const detail = trimmed
      .replace(/^turn\s+(left|right)\s*/i, "")
      .replace(/^and\s+/i, "");
    return {
      title,
      detail: detail ? `${detail[0].toUpperCase()}${detail.slice(1)}` : trimmed,
    };
  }
  if (kind === "stairs") {
    const [firstClause, ...remaining] = trimmed.split(/,\s*/);
    const detail = remaining.join(". ");
    return {
      title: firstClause,
      detail: detail ? `${detail[0].toUpperCase()}${detail.slice(1)}` : "",
    };
  }
  const [firstSentence, ...remaining] = trimmed.split(/(?<=[.!?])\s+/);
  return {
    title: firstSentence,
    detail: remaining.join(" "),
  };
}

function DirectionIcon({ kind }: { kind: DirectionKind | "arrival" }) {
  if (kind === "arrival") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="10" r="2.2" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "stairs") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none">
        <path d="M4 19h5v-5h5V9h5V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m15 4 4-1v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const rotation = kind === "left" ? "-90" : kind === "right" ? "90" : "0";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M12 20V5m0 0L6.5 10.5M12 5l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function legDistance(paths: CampusPath[], from: string, to: string) {
  return paths.find(
    (path) =>
      (path.from === from && path.to === to) ||
      (path.from === to && path.to === from),
  )?.distance;
}

function arrivalDelay(stepCount: number) {
  return { animationDelay: `${stepCount * 70}ms` } as CSSProperties;
}

export default function StepList({
  steps,
  pathSlugs,
  locations,
  paths,
  destination,
}: StepListProps) {
  const locationsBySlug = new Map(locations.map((location) => [location.slug, location]));

  return (
    <ol className="space-y-0" aria-label="Step by step walking directions">
      {steps.map((instruction, index) => {
        const from = locationsBySlug.get(pathSlugs[index]);
        const to = locationsBySlug.get(pathSlugs[index + 1]);
        const kind = getDirectionKind(instruction);
        const parts = getInstructionParts(instruction, kind);
        const distance =
          from && to ? legDistance(paths, from.slug, to.slug) : undefined;

        return (
          <li
            key={`${index}-${instruction}`}
            className="relative flex gap-3 pb-4 last:pb-4 sm:gap-4"
          >
            <span className="relative flex w-10 shrink-0 justify-center sm:w-12">
              <span className="z-10 flex size-10 items-center justify-center rounded-full border-2 border-[#19171f] bg-indigo-500/20 text-sm font-bold text-indigo-200 shadow-sm ring-1 ring-indigo-400/30 sm:size-11 sm:text-base">
                {index + 1}
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 top-10 w-0.5 bg-indigo-400/30 sm:top-11"
              />
            </span>

            <article
              className="direction-card-enter min-w-0 flex-1 rounded-xl border border-[#393442] bg-[#111016] p-3.5 shadow-sm sm:p-4"
              style={arrivalDelay(index)}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <DirectionIcon kind={kind} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    Step {index + 1}
                  </p>
                  <h4 className="mt-1 text-base font-semibold leading-6 text-slate-100">
                    {parts.title}
                  </h4>
                </div>
                {distance !== undefined && (
                  <span className="shrink-0 rounded-lg bg-[#24212c] px-2.5 py-1.5 text-sm font-semibold tabular-nums text-slate-200">
                    {distance} m
                  </span>
                )}
              </div>
              {parts.detail && (
                <p className="mt-3 pl-0 text-sm leading-6 text-slate-400 sm:pl-[3.25rem]">
                  {parts.detail}
                </p>
              )}
              {from && to && (
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[#393442] pt-3 text-xs text-slate-500 sm:ml-[3.25rem]">
                  <span>{from.name}</span>
                  <span aria-hidden="true" className="text-indigo-400">→</span>
                  <span className="font-medium text-slate-300">{to.name}</span>
                </div>
              )}
            </article>
          </li>
        );
      })}

      <li className="relative flex gap-3 sm:gap-4">
        <span className="relative flex w-10 shrink-0 justify-center sm:w-12">
          <span className="z-10 flex size-10 items-center justify-center rounded-full border-2 border-[#19171f] bg-rose-500/15 text-rose-300 shadow-sm ring-1 ring-rose-400/30 sm:size-11">
            <DirectionIcon kind="arrival" />
          </span>
        </span>
        <article
          className="direction-card-enter min-w-0 flex-1 rounded-xl border border-rose-400/25 bg-[#21171d] p-3.5 shadow-sm sm:p-4"
          style={arrivalDelay(steps.length)}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
            Step {steps.length + 1} · Arrival
          </p>
          <h4 className="mt-1 text-base font-semibold leading-6 text-slate-100">
            You have arrived at {destination.name}
          </h4>
          <p className="mt-1 text-sm text-slate-400">{destination.name}</p>
        </article>
      </li>
    </ol>
  );
}
