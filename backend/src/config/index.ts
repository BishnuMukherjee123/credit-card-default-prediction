// src/config/index.ts
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const envPath = path.resolve(process.cwd(), ".env");

// Load .env safely
try {
  if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (result.error) throw result.error;
  }
} catch (err) {
  console.error("Failed to load .env file:", err);
  throw err;
}

// Helper for required env vars
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

// Strict config type
type AppConfig = {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  MONGO_URI: string;

  REDIS_URL?: string;
  CLERK_API_KEY?: string;

  CLERK_JWKS_URL: string;
  CLERK_JWT_ISSUER: string;
  CLERK_WEBHOOK_SECRET: string;

  LOG_LEVEL: string;
  CORS_ORIGINS: (string | RegExp)[];
};

let CONFIG: AppConfig;

try {
  const NODE_ENV = (process.env.NODE_ENV || "development") as
    | "development"
    | "production"
    | "test";

  const PORT = parseInt(process.env.PORT || "5000", 10);
  if (Number.isNaN(PORT) || PORT <= 0) {
    throw new Error("Invalid PORT environment variable");
  }

  const MONGO_URI = requireEnv("MONGO_URI");

  // required Clerk envs
  const CLERK_JWKS_URL = requireEnv("CLERK_JWKS_URL");
  const CLERK_JWT_ISSUER = requireEnv("CLERK_JWT_ISSUER");
  const CLERK_WEBHOOK_SECRET = requireEnv("CLERK_WEBHOOK_SECRET");

  const LOG_LEVEL = process.env.LOG_LEVEL || "info";

  const REDIS_URL = process.env.REDIS_URL;
  const CLERK_API_KEY = process.env.CLERK_API_KEY;

  // CORS Origins - parse from comma-separated string
  const CORS_ORIGINS_RAW = process.env.CORS_ORIGINS || "http://localhost:5173";
  const CORS_ORIGINS: (string | RegExp)[] = [
    ...CORS_ORIGINS_RAW.split(",").map((origin) => origin.trim()),
    /^https:\/\/.*\.ngrok-free\.app$/ // Always allow ngrok URLs
  ];

  CONFIG = {
    NODE_ENV,
    PORT,
    MONGO_URI,
    CLERK_JWKS_URL,
    CLERK_JWT_ISSUER,
    CLERK_WEBHOOK_SECRET,
    LOG_LEVEL,
    CORS_ORIGINS,
    ...(REDIS_URL ? { REDIS_URL } : {}),
    ...(CLERK_API_KEY ? { CLERK_API_KEY } : {}),
  };
} catch (err) {
  console.error("Config validation error:", err instanceof Error ? err.message : err);
  throw err;
}

export default CONFIG;
