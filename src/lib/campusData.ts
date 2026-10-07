import { locations as fallbackLocations } from "@/data/locations";
import { paths as fallbackPaths } from "@/data/paths";
import { connectToDatabase, isDatabaseConfigured } from "@/lib/mongodb";
import LocationModel from "@/models/Location";
import PathModel from "@/models/Path";
import type { CampusLocation, CampusPath } from "@/types";

export async function getCampusLocations(): Promise<CampusLocation[]> {
  if (!isDatabaseConfigured()) return fallbackLocations;
  try {
    await connectToDatabase();
    const records = await LocationModel.find().lean();
    return records.length
      ? records.map((record) => ({
          slug: record.slug,
          name: record.name,
          aliases: record.aliases,
          x: record.x,
          y: record.y,
          category: record.category,
        }))
      : fallbackLocations;
  } catch (error) {
    console.error("Could not load campus locations from MongoDB; using bundled data.", error);
    return fallbackLocations;
  }
}

export async function getCampusPaths(): Promise<CampusPath[]> {
  if (!isDatabaseConfigured()) return fallbackPaths;
  try {
    await connectToDatabase();
    const records = await PathModel.find().lean();
    return records.length
      ? records.map((record) => ({
          from: record.from,
          to: record.to,
          distance: record.distance,
        }))
      : fallbackPaths;
  } catch (error) {
    console.error("Could not load campus paths from MongoDB; using bundled data.", error);
    return fallbackPaths;
  }
}
