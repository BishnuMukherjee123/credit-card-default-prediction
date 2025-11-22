import mongoose from "mongoose";
import CONFIG from "../config/index.js";

export const connectDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(CONFIG.MONGO_URI, {
      autoIndex: true, // good for dev, disable in production if needed
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Rethrow so server doesn't start without DB
    throw error;
  }
};

// Optional health check function using mongoose connection state
export const dbStatus = () => {
  const state = mongoose.connection.readyState;

  /*
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
  */

  const states: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return states[state] || "unknown";
};
