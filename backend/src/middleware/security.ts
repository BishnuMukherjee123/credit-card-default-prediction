import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
// @ts-ignore - xss-clean doesn't have proper TypeScript types
const xssClean = require("xss-clean");
import type { RequestHandler } from "express";

export const securityMiddleware: RequestHandler[] = [
  helmet(),
  cors({
    origin: (origin, cb) => {
      // allow undefined (curl/postman) during dev, allow your frontend origin in prod
      if (!origin || process.env.NODE_ENV === "development") return cb(null, true);
      const allowed = (process.env.ALLOWED_ORIGINS || "").split(",");
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
  // sanitize req.body, req.params, req.query
  mongoSanitize(),
  // prevent XSS in inputs
  xssClean(),
];
