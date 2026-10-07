import { NextResponse } from "next/server";
import { getCampusLocations } from "@/lib/campusData";

export async function GET() {
  return NextResponse.json(await getCampusLocations());
}
