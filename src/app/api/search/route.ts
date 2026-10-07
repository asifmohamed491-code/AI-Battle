import { NextResponse } from "next/server";
import { buildDirections } from "@/lib/buildDirections";
import { getCampusLocations, getCampusPaths } from "@/lib/campusData";
import { findShortestPath } from "@/lib/dijkstra";
import { parseQuery } from "@/lib/parseQuery";
import type { SearchError } from "@/types";

export async function POST(request: Request) {
  let body: { query?: unknown; defaultSource?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<SearchError>(
      { error: "INVALID_REQUEST", message: "Please submit a valid search request." },
      { status: 400 },
    );
  }

  if (typeof body.query !== "string" || !body.query.trim()) {
    return NextResponse.json<SearchError>(
      { error: "EMPTY_QUERY", message: "Enter a place or ask where you want to go." },
      { status: 400 },
    );
  }

  const [locations, paths] = await Promise.all([getCampusLocations(), getCampusPaths()]);
  const defaultSource =
    typeof body.defaultSource === "string" ? body.defaultSource : "main-gate";
  const parsed = parseQuery(body.query, locations, defaultSource);
  if (!parsed.to) {
    return NextResponse.json<SearchError>(
      {
        error: "DESTINATION_NOT_FOUND",
        message: "We couldn't find that place. Try a campus facility such as the Library or AI Lab.",
      },
      { status: 404 },
    );
  }

  const from = locations.find((location) => location.slug === parsed.from);
  const to = locations.find((location) => location.slug === parsed.to);
  if (!from || !to) {
    return NextResponse.json<SearchError>(
      { error: "INVALID_REQUEST", message: "Choose a valid starting location." },
      { status: 400 },
    );
  }

  const route = findShortestPath(from.slug, to.slug, paths);
  if (!route) {
    return NextResponse.json<SearchError>(
      { error: "NO_ROUTE", message: `No walking route is available to ${to.name} yet.` },
      { status: 404 },
    );
  }

  return NextResponse.json({
    from,
    to,
    totalDistance: route.totalDistance,
    walkingMinutes: Math.ceil(route.totalDistance / 80),
    pathSlugs: route.pathSlugs,
    steps: buildDirections(route.pathSlugs, locations),
  });
}
