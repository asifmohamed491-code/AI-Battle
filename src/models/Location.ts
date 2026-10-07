import mongoose, { Schema } from "mongoose";
import type { CampusLocation } from "@/types";

const LocationSchema = new Schema<CampusLocation>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    aliases: { type: [String], default: [] },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Location ??
  mongoose.model<CampusLocation>("Location", LocationSchema);
