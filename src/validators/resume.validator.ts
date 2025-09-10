import { z } from "zod";

export const createResumeSchema = z
  .object({
    fileUrl: z.url("A valid file URL is required"),
    state: z.enum(["NOT_ANALYZED", "IN_PROGRESS", "ANALYZED", "FAILED", "REJECTED"]).optional(),
    candidateName: z.string().optional(),
    qualification: z.enum(["UNDER_QUALIFIED", "QUALIFIED", "OVERQUALIFIED"]).optional(),
    score: z.number().int().min(0).max(100).optional(),
    reasoning: z.string().optional(),
    ai_model: z.string().optional(),
  })
  .strict();

export const updateResumeSchema = createResumeSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});
