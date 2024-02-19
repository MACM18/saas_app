import mongoose, { Mongoose } from "mongoose";
import { cache } from "react";
const MONGODB_URL = process.env.MONGODB_URL;

interface MongoooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongoooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing MONGODB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "SaaS App Image Tools",
      bufferCommands: false,
    });

    cached.conn= await cached.promise;

    return cached.conn;
};
