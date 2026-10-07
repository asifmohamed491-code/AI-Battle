import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

declare global {
  var mongooseConnection:
    | { connection: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const cached = global.mongooseConnection ?? {
  connection: null,
  promise: null,
};

global.mongooseConnection = cached;

export async function connectToDatabase() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export function isDatabaseConfigured() {
  return Boolean(mongoUri);
}
