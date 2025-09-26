import { z } from "zod";

export const resumeSchema = z.object({
  id: z.uuidv4(),
  state: z.enum(["NOT_ANALYZED", "IN_PROGRESS", "ANALYZED", "FAILED", "REJECTED"]).optional(),
  candidateName: z.string().optional(),
  qualificationStatus: z.enum(["UNDER_QUALIFIED", "QUALIFIED", "OVERQUALIFIED"]).optional(),
  score: z.number().int().min(0).max(100).optional(),
  reasoning: z.string().optional(),
  aiModel: z.string().optional(),
  hired: z.boolean().optional(),
});

export const updateResumeSchema = resumeSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
