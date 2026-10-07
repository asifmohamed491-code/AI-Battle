import mongoose, { Schema } from "mongoose";
import type { CampusPath } from "@/types";

const PathSchema = new Schema<CampusPath>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    distance: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

PathSchema.index({ from: 1, to: 1 }, { unique: true });

export default mongoose.models.CampusPath ??
  mongoose.model<CampusPath>("CampusPath", PathSchema);
