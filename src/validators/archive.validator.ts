import { z } from "zod";

export const createArchiveSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
  })
  .strict();

export const updateArchiveSchema = createArchiveSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });
