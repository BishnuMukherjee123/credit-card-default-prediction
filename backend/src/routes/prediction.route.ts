import { Router } from "express";
import {
  savePrediction,
  getPredictionHistory,
  getDashboardStats,
  getAnalytics,
} from "../controllers/prediction.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateBody } from "../middleware/validate.js";
import { predictionBodySchema } from "../validators/prediction.validator.js";
import { rateLimitMiddleware } from "../middleware/rateLimit.js";

const router = Router();

/**
 * Save a new prediction
 * POST /api/predictions
 */
router.post(
  "/",
  authMiddleware,
  rateLimitMiddleware,
  validateBody(predictionBodySchema),
  asyncHandler(savePrediction)
);

/**
 * Get prediction history (paginated)
 * GET /api/predictions/history?page=1&limit=20
 */
router.get("/history", authMiddleware, getPredictionHistory);
router.get("/history", authMiddleware, getPredictionHistory);
router.get("/stats", authMiddleware, getDashboardStats);
router.get("/analytics", authMiddleware, getAnalytics);

export default router;
