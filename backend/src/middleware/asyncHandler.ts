import type { RequestHandler } from "express";

/**
 * Wrap async route handlers and forward errors to global error handler.
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
