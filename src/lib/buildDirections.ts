import type { CampusLocation } from "@/types";

const directionsByLeg: Record<string, string> = {
  "main-gate>administrative-office":
    "Walk straight from the Main Gate to the Administrative Office.",
  "administrative-office>cse-block":
    "Turn left and follow the main road to the CSE Block.",
  "cse-block>ai-lab":
    "Enter the CSE Block, take the stairs to the 2nd floor; the AI Lab is on your left.",
};

export function buildDirections(pathSlugs: string[], locations: CampusLocation[]) {
  return pathSlugs.slice(0, -1).map((slug, index) => {
    const nextSlug = pathSlugs[index + 1];
    const current = locations.find((location) => location.slug === slug);
    const next = locations.find((location) => location.slug === nextSlug);
    if (directionsByLeg[`${slug}>${nextSlug}`]) return directionsByLeg[`${slug}>${nextSlug}`];
    if (!current || !next) return `Continue to ${next?.name ?? "the next location"}.`;
    return `Follow the campus path from ${current.name} to ${next.name}.`;
  });
}
