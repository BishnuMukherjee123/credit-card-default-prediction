// src/routes/webhook.route.ts
import { Router } from "express";
import { clerkWebhookHandler } from "../controllers/webhook.controller.js";
import express from "express";

const router = Router();

// IMPORTANT: Clerk/Svix requires raw body for signature verification.
// We apply express.raw({ type: "*/*" }) middleware only to this route.
router.post("/clerk", express.raw({ type: "*/*" }), clerkWebhookHandler);

export default router;
