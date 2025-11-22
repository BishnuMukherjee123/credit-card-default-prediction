import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

/**
 * Generic validator middleware factory using zod.
 */
export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    try {
      // parse will throw on invalid input
      req.body = schema.parse(req.body);
      return next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors || err.message,
      });
    }
  };
