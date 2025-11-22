import { Router, type Request, type Response, type NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Test route working!" });
  } catch (error) {
    next(error);
  }
});

export default router;
