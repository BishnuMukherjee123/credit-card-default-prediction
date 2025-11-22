import { Router } from "express";
import Prediction from "../models/Prediction.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newPred = await Prediction.create({
      userId: req.user!.id,
      features: Array(30).fill(0),
      prediction: 1,
      probability: 0.85,
    });

    return res.status(201).json({ success: true, data: newPred });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
