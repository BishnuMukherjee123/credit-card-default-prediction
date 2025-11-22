// src/models/processedWebhook.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProcessedWebhook extends Document {
  messageId: string;
  createdAt: Date;
}

const ProcessedWebhookSchema = new Schema<IProcessedWebhook>(
  {
    messageId: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

const ProcessedWebhook: Model<IProcessedWebhook> =
  mongoose.models.ProcessedWebhook ||
  mongoose.model<IProcessedWebhook>("ProcessedWebhook", ProcessedWebhookSchema);

export default ProcessedWebhook;
