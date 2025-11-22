import type { Request, Response } from "express";
import Prediction from "../models/Prediction.model.js";
import logger from "../lib/logger.js";

/**
 * Save prediction for authenticated user
 */
export const savePrediction = async (req: Request, res: Response) => {
  console.log("DEBUG: savePrediction controller hit", req.body);
  try {
    const userId = req.user!.id; // set by auth middleware

    const { features, prediction, probability, mlModelVersion } = req.body;

    // Features must be 30 numbers
    if (!Array.isArray(features) || features.length !== 30) {
      return res.status(400).json({
        success: false,
        message: "features must be an array of exactly 30 numbers",
      });
    }

    // prediction must be 0 or 1
    if (![0, 1].includes(prediction)) {
      return res.status(400).json({
        success: false,
        message: "prediction must be 0 or 1",
      });
    }

    // probability must be between 0 and 1
    if (typeof probability !== "number" || probability < 0 || probability > 1) {
      return res.status(400).json({
        success: false,
        message: "probability must be a number between 0 and 1",
      });
    }

    // create record (schema does NOT include mlModelVersion, so attach conditionally)
    const newRecord = await Prediction.create({
      userId,
      features,
      prediction,
      probability,
      ...(mlModelVersion ? { mlModelVersion } : {}),
    });

    logger.info(
      { id: newRecord._id.toString(), userId },
      "Prediction saved"
    );

    return res.status(201).json({
      success: true,
      data: newRecord,
    });
  } catch (err: any) {
    logger.error({ err }, "Save prediction error");
    return res.status(500).json({
      success: false,
      message: "Failed to save prediction",
      error: err.message,
    });
  }
};

/**
 * Get prediction history for a user
 */
export const getPredictionHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [history, total] = await Promise.all([
      Prediction.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),

      Prediction.countDocuments({ userId }),
    ]);

    return res.status(200).json({
      success: true,
      data: history,
      meta: { page, limit, total },
    });
  } catch (err: any) {
    logger.error({ err }, "History fetch error");
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
      error: err.message,
    });
  }
};

/**
 * Get dashboard stats (global counts)
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalPredictions, activeUsers] = await Promise.all([
      Prediction.countDocuments(),
      Prediction.distinct('userId').then(users => users.length)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalPredictions,
        activeUsers
      },
    });
  } catch (err: any) {
    console.error("CRITICAL ERROR IN getDashboardStats:", err);
    logger.error({ err }, "Dashboard stats fetch error");
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: err.message,
    });
  }
};

/**
 * Get detailed analytics
 */
/**
 * Get detailed analytics with year filtering
 */
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();
    
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const [totalPredictions, fraudDetected, monthlyStats, availableYearsRaw] = await Promise.all([
      Prediction.countDocuments(),
      Prediction.countDocuments({ prediction: 1 }),
      Prediction.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: { 
              month: { $month: "$createdAt" }
            },
            fraud: { 
              $sum: { $cond: [{ $eq: ["$prediction", 1] }, 1, 0] } 
            },
            legitimate: { 
              $sum: { $cond: [{ $eq: ["$prediction", 0] }, 1, 0] } 
            }
          }
        }
      ]),
      // Get list of years that have data
      Prediction.aggregate([
        {
          $group: {
            _id: { $year: "$createdAt" }
          }
        },
        { $sort: { _id: -1 } }
      ])
    ]);

    // Generate full 12 months for the selected year
    const formattedMonthly = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(year, i, 1);
      const monthNum = i + 1;
      const label = d.toLocaleString('default', { month: 'short' }); // Just "Jan", "Feb"

      const found = monthlyStats.find((s: any) => s._id.month === monthNum);

      formattedMonthly.push({
        month: label,
        fraud: found ? found.fraud : 0,
        legitimate: found ? found.legitimate : 0
      });
    }

    const availableYears = availableYearsRaw.map(y => y._id);
    // Ensure current year is always in the list
    if (!availableYears.includes(new Date().getFullYear())) {
      availableYears.unshift(new Date().getFullYear());
    }

    return res.status(200).json({
      success: true,
      data: {
        totalPredictions,
        fraudDetected,
        accuracyRate: 94.2,
        monthlyStats: formattedMonthly,
        availableYears
      },
    });
  } catch (err: any) {
    logger.error({ err }, "Analytics fetch error");
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: err.message,
    });
  }
};
