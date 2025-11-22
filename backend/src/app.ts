// src/app.ts
import express from "express";
import cors from "cors";
import CONFIG from "./config/index.js";

import { errorHandler } from "./middleware/error.middleware.js";
import testRouter from "./routes/test.route.js";
import { dbStatus } from "./lib/db.js";
import protectedRouter from "./routes/protected.route.js";
import predictionTestRouter from "./routes/prediction.test.route.js";
import predictionRouter from "./routes/prediction.route.js";
import webhookRouter from "./routes/webhook.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

/* ---------------------------------------
   GLOBAL CORS
---------------------------------------- */
app.use(
  cors({
    origin: CONFIG.CORS_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "svix-id",
      "svix-timestamp",
      "svix-signature",
    ],
  })
);

/* ---------------------------------------
   WEBHOOKS MUST COME BEFORE JSON PARSER
---------------------------------------- */
/* ---------------------------------------
   WEBHOOKS MUST COME BEFORE JSON PARSER
---------------------------------------- */
// Mount the webhook router. 
// Note: The router itself handles the specific path "/clerk" and applies express.raw()
app.use("/api/webhooks", webhookRouter);

/* ---------------------------------------
   JSON Parser BELOW Webhooks
---------------------------------------- */
app.use(express.json());

/* ---------------------------------------
   YOUR ROUTES
---------------------------------------- */
app.use("/api/auth", authRouter);              // <-- REQUIRED FOR verify
app.use("/api/protected", protectedRouter);
app.use("/api/prediction-test", predictionTestRouter);
app.use("/api/predictions", predictionRouter);
app.use("/api/test", testRouter);

/* ---------------------------------------
   HEALTH ENDPOINTS
---------------------------------------- */
app.get("/health/db", (req, res) => {
  res.status(200).json({ status: dbStatus() });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ---------------------------------------
   GLOBAL ERROR HANDLER
---------------------------------------- */
app.use(errorHandler);

export default app;
