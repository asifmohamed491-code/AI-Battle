import { NextResponse } from "next/server";
import { locations } from "@/data/locations";
import { paths } from "@/data/paths";
import { connectToDatabase, isDatabaseConfigured } from "@/lib/mongodb";
import LocationModel from "@/models/Location";
import PathModel from "@/models/Path";

export async function POST() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI is not configured. Bundled campus data is already active." },
      { status: 503 },
    );
  }

  try {
    await connectToDatabase();
    await Promise.all([
      ...locations.map((location) =>
        LocationModel.updateOne({ slug: location.slug }, { $set: location }, { upsert: true }),
      ),
      ...paths.map((path) =>
        PathModel.updateOne(
          { from: path.from, to: path.to },
          { $set: path },
          { upsert: true },
        ),
      ),
    ]);
    return NextResponse.json({
      message: "Campus data seeded successfully.",
      locations: locations.length,
      paths: paths.length,
    });
  } catch (error) {
    console.error("Campus data seeding failed.", error);
    return NextResponse.json(
      { error: "Could not seed campus data. Check the MongoDB connection and try again." },
      { status: 500 },
    );
  }
}
