// src/models/prediction.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * TypeScript interface for Prediction documents
 */
export interface IPrediction extends Document {
  userId: string;
  features: number[];
  prediction: number;      // 0 or 1
  probability: number;     // 0..1
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Schema
 */
const PredictionSchema = new Schema<IPrediction>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    features: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr: number[]) => Array.isArray(arr) && arr.length === 30,
        message: "Features array must contain exactly 30 numbers",
      },
    },

    prediction: {
      type: Number,
      enum: [0, 1],
      required: true,
    },

    probability: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

/**
 * Mongoose Model Export (ESM + Hot Reload safe)
 */
const Prediction: Model<IPrediction> =
  mongoose.models.Prediction ??
  mongoose.model<IPrediction>("Prediction", PredictionSchema);

export default Prediction;
