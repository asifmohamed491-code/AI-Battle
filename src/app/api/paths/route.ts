import { NextResponse } from "next/server";
import { getCampusPaths } from "@/lib/campusData";

export async function GET() {
  return NextResponse.json(await getCampusPaths());
}
