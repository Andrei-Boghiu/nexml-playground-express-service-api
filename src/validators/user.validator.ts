import { z } from "zod";
import { registerSchema } from "./auth.validator";

export const updateUserSchema = registerSchema
  .omit({ accessReason: true, email: true })
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export const adminAlterUserSchema = z
  .object({
    role: z.enum(["USER", "ADMIN", "DEV"]).optional(),
    accessStatus: z.boolean().optional(),
  })
  .strict();
