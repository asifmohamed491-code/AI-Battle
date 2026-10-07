import type { CampusPath } from "@/types";

export function findShortestPath(
  source: string,
  destination: string,
  paths: CampusPath[],
): { pathSlugs: string[]; totalDistance: number } | null {
  if (source === destination) return { pathSlugs: [source], totalDistance: 0 };

  const distances = new Map<string, number>([[source, 0]]);
  const previous = new Map<string, string>();
  const unvisited = new Set([source, ...paths.flatMap(({ from, to }) => [from, to])]);

  while (unvisited.size > 0) {
    let current: string | undefined;
    let smallestDistance = Infinity;
    for (const node of unvisited) {
      const distance = distances.get(node) ?? Infinity;
      if (distance < smallestDistance) {
        smallestDistance = distance;
        current = node;
      }
    }

    if (current === undefined || smallestDistance === Infinity) break;
    if (current === destination) break;
    unvisited.delete(current);

    for (const edge of paths) {
      const neighbor =
        edge.from === current ? edge.to : edge.to === current ? edge.from : undefined;
      if (!neighbor || !unvisited.has(neighbor)) continue;

      const candidateDistance = smallestDistance + edge.distance;
      if (candidateDistance < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, candidateDistance);
        previous.set(neighbor, current);
      }
    }
  }

  if (!distances.has(destination)) return null;

  const pathSlugs = [destination];
  let current = destination;
  while (current !== source) {
    const parent = previous.get(current);
    if (!parent) return null;
    pathSlugs.unshift(parent);
    current = parent;
  }

  return { pathSlugs, totalDistance: distances.get(destination)! };
}
