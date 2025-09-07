import { z } from "zod";

export const createJobListingSchema = z
  .object({
    position: z.string().min(1, "Position is required"),
    department: z.string().optional(),
    description: z.string().min(1, "Description is required"),
  })
  .strict();

export const updateJobListingSchema = createJobListingSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });
