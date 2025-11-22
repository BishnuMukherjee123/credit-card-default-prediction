import { Router } from "express";
import { verifyClerkToken } from "../middleware/auth.middleware.js";
import User from "../models/User.model.js";

const router = Router();

// Frontend sends JWT → backend verifies → returns user profile
// If user doesn't exist in DB (webhook failed/delayed), create it now.
router.post("/verify", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = await verifyClerkToken(token);
    const clerkId = String(payload.sub);

    let user = await User.findOne({ clerkId });

    if (!user) {
      console.log(`User ${clerkId} not found in DB, creating now...`);
      const { email } = req.body;
      user = await User.create({
        clerkId,
        email,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(401).json({ message: "Invalid token or server error" });
  }
});

export default router;
