import type { CampusLocation } from "@/types";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function findMention(text: string, locations: CampusLocation[]) {
  const normalized = normalize(text);
  const aliases = locations
    .flatMap((location) =>
      [location.name, ...location.aliases].map((alias) => ({
        slug: location.slug,
        alias: normalize(alias),
      })),
    )
    .sort((a, b) => b.alias.length - a.alias.length);

  return aliases.find(({ alias }) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|\\s)${escaped}(?=$|\\s)`, "i").test(normalized);
  })?.slug;
}

export function parseQuery(
  query: string,
  locations: CampusLocation[],
  defaultSource: string,
) {
  const normalized = normalize(query);
  const fromMatch = normalized.match(/\bfrom\s+(.+)$/);
  const source = fromMatch ? findMention(fromMatch[1], locations) : undefined;
  const destinationText = normalized.replace(/\bfrom\s+.+$/, "");
  const destination = findMention(destinationText, locations);

  return {
    from: source ?? defaultSource,
    to: destination,
  };
}
