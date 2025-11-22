import type { RequestHandler } from "express";
import { RateLimiterRedis, RateLimiterMemory } from "rate-limiter-flexible";
import CONFIG from "../config/index.js";
import pkg from "ioredis";
const Redis = pkg.default;

let rateLimiter: RateLimiterRedis | RateLimiterMemory;

if (CONFIG.REDIS_URL) {
  // If Redis is configured
  const redisClient = new Redis(CONFIG.REDIS_URL, {
    maxRetriesPerRequest: 0,
    enableOfflineQueue: false,
  });

  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  rateLimiter = new RateLimiterRedis({
    storeClient: redisClient as any,
    points: 100,
    duration: 60,
    keyPrefix: "rl",
  });

  console.log("✔ Rate limiter using Redis");
} else {
  // fallback to memory — NO Redis calls
  rateLimiter = new RateLimiterMemory({
    points: 60,
    duration: 60,
  });

  console.log("✔ Rate limiter using in-memory store (no Redis)");
}

export const rateLimitMiddleware: RequestHandler = (req, res, next) => {
  const key: string = req.user?.id ?? req.ip ?? "unknown";

  rateLimiter
    .consume(key)
    .then(() => next())
    .catch(() => {
      res.status(429).json({
        success: false,
        message: "Too many requests",
      });
    });
};
