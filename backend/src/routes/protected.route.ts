import { Router, type Request, type Response, type NextFunction } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        message: "Access granted to protected route",
        userId: req.user?.id,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
