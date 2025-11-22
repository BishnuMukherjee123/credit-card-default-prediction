// src/controllers/webhook.controller.ts
import type { Request, Response } from "express";
import { Webhook } from "svix";
import CONFIG from "../config/index.js";
import logger from "../lib/logger.js";
import User from "../models/User.model.js";
import ProcessedWebhook from "../models/processedWebhook.model.js";
import type { WebhookRequiredHeaders } from "svix";

export const clerkWebhookHandler = async (req: Request, res: Response) => {
  try {
    console.log("===== WEBHOOK HIT =====");

    const rawBody = req.body;
    console.log("RAW BODY =", rawBody?.toString?.() || rawBody);

    const headers: WebhookRequiredHeaders = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    console.log("HEADERS =", headers);

    if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
      return res.status(400).send("Missing required headers");
    }

    if (!CONFIG.CLERK_WEBHOOK_SECRET) {
      return res.status(500).send("Webhook secret not configured");
    }

    const wh = new Webhook(CONFIG.CLERK_WEBHOOK_SECRET);
    let evt: any;
    try {
      evt = wh.verify(rawBody, headers);
      console.log("✔ Svix Signature Verified");
    } catch (err: any) {
      console.log("❌ Verification error:", err?.message);
      return res.status(401).send("Invalid signature");
    }

    const messageId = headers["svix-id"];
    if (!messageId) {
      return res.status(400).send("Missing message id");
    }

    const already = await ProcessedWebhook.findOne({ messageId }).lean();
    if (already) {
      return res.status(200).json({ success: true, duplicate: true });
    }

    // --- Normalize data and extract user object safely ---
    const data = evt?.data ?? null;
    let userObj: any = null;

    if (data && typeof data === "object") {
      if (data.object && typeof data.object === "object" && !Array.isArray(data.object)) {
        userObj = data.object;
      } else if (data.user && typeof data.user === "object" && !Array.isArray(data.user)) {
        userObj = data.user;
      } else {
        userObj = data;
      }
    }

    // Candidate id fields in order of preference
    const candidates = [
      userObj?.id,
      userObj?.user_id,
      userObj?.external_id,
      data?.id,
    ];

    const clerkId = candidates.find((v) => typeof v === "string" && v.trim().length > 0) ?? null;

    if (!clerkId) {
      console.log("❌ Missing user.id — FULL EVENT:", JSON.stringify(evt, null, 2));
      return res.status(400).send("Missing user id");
    }

    // --- Handle events ---
    if (evt.type === "user.created" || evt.type === "user.updated") {
      await User.findOneAndUpdate(
        { clerkId },
        {
          clerkId,
          email:
            userObj?.email_addresses?.[0]?.email ??
            userObj?.email ??
            userObj?.primary_email_address ??
            undefined,
          firstName: userObj?.first_name ?? userObj?.firstName,
          lastName: userObj?.last_name ?? userObj?.lastName,
          raw: userObj,
        },
        { upsert: true, new: true }
      );

      console.log(`✔ User ${clerkId} created/updated`);
    } else if (evt.type === "user.deleted") {
      const idToDelete = clerkId;
      if (idToDelete) {
        await User.deleteOne({ clerkId: idToDelete });
        console.log(`✔ User ${idToDelete} deleted`);
      } else {
        console.log("❌ user.deleted missing id");
      }
    } else {
      console.log("ℹ Unhandled event type:", evt.type);
    }

    await ProcessedWebhook.create({ messageId });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    logger.error({ err: err?.message || err }, "Webhook handler error");
    return res.status(500).send("Server error");
  }
};
