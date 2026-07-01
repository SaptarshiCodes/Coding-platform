import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("DB_URL is not defined in enviornment variables");
    }
    await mongoose.connect(ENV.DB_URL);
  } catch {
    process.exit(1);
  }
};
