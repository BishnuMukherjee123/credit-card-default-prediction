import app from "./app.js";
import CONFIG from "./config/index.js";
import { connectDB } from "./lib/db.js";
import mongoose from "mongoose";

const startServer = async () => {
  try {
    await connectDB(); // connect to DB first

    const PORT = CONFIG.PORT;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} — env=${CONFIG.NODE_ENV}`);
      console.log("DEBUG: Database connection state:", mongoose.connection.readyState);
    });
  } catch (error) {
    console.error("🔥 Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
