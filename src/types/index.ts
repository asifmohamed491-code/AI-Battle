export type LocationCategory =
  | "Entrance"
  | "Administration"
  | "Academic"
  | "Learning"
  | "Dining"
  | "Residential";

export interface CampusLocation {
  slug: string;
  name: string;
  aliases: string[];
  x: number;
  y: number;
  category: LocationCategory;
}

export interface CampusPath {
  from: string;
  to: string;
  distance: number;
}

export interface RouteResult {
  from: CampusLocation;
  to: CampusLocation;
  totalDistance: number;
  walkingMinutes: number;
  pathSlugs: string[];
  steps: string[];
}

export type SearchErrorCode =
  | "EMPTY_QUERY"
  | "DESTINATION_NOT_FOUND"
  | "NO_ROUTE"
  | "INVALID_REQUEST";

export interface SearchError {
  error: SearchErrorCode;
  message: string;
}
