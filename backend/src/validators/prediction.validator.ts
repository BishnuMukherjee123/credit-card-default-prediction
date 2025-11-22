import { z } from "zod";

export const predictionBodySchema = z.object({
  features: z
    .array(z.number())
    .length(30, { message: "features must contain exactly 30 numbers" }),
  prediction: z.union([z.literal(0), z.literal(1)]),
  probability: z.number().min(0).max(1),
  mlModelVersion: z.string().optional(),
});
