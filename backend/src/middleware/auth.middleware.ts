// src/middleware/auth.middleware.ts
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import CONFIG from "../config/index.js";
import User from "../models/User.model.js";
import { type Request, type Response, type NextFunction } from "express";

// JWKS client (Clerk)
const client = jwksClient({
  jwksUri: CONFIG.CLERK_JWKS_URL,
});

export const verifyClerkToken = async (token: string) => {
  try {
    // Decode token header to get kid
    const decodedHeader: any = jwt.decode(token, { complete: true });
    const kid = decodedHeader?.header?.kid;

    console.log("Debug: Token KID:", kid);

    if (!kid) {
      throw new Error("Invalid token (missing kid)");
    }

    // Get signing key
    console.log("Debug: Fetching signing key from:", CONFIG.CLERK_JWKS_URL);
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    // Verify token
    console.log("Debug: Verifying token with issuer:", CONFIG.CLERK_JWT_ISSUER);
    const payload: any = jwt.verify(token, signingKey, {
      algorithms: ["RS256"],
      issuer: CONFIG.CLERK_JWT_ISSUER,
    });

    return payload;
  } catch (error) {
    console.error("Debug: verifyClerkToken failed:", error);
    throw error;
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    // User must exist (created by webhook)
    const user = await User.findOne({ clerkId }).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found in database",
        clerkId,
      });
    }

    // Attach user to request
    req.user = {
      id: clerkId,
      ...(user.email && { email: user.email }),
      ...(user.firstName && { firstName: user.firstName }),
      ...(user.lastName && { lastName: user.lastName }),
    };

    return next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
