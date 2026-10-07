import { NextResponse } from "next/server";
import { buildDirections } from "@/lib/buildDirections";
import { getCampusLocations, getCampusPaths } from "@/lib/campusData";
import { findShortestPath } from "@/lib/dijkstra";
import type { SearchError } from "@/types";

export async function POST(request: Request) {
  let body: { from?: unknown; to?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<SearchError>(
      { error: "INVALID_REQUEST", message: "Please submit a valid route request." },
      { status: 400 },
    );
  }

  if (typeof body.from !== "string" || typeof body.to !== "string") {
    return NextResponse.json<SearchError>(
      { error: "INVALID_REQUEST", message: "Select both a starting point and destination." },
      { status: 400 },
    );
  }

  const [locations, paths] = await Promise.all([getCampusLocations(), getCampusPaths()]);
  const from = locations.find((location) => location.slug === body.from);
  const to = locations.find((location) => location.slug === body.to);
  if (!from || !to) {
    return NextResponse.json<SearchError>(
      { error: "INVALID_REQUEST", message: "Choose valid campus locations." },
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
