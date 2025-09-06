import { z } from "zod";
import { registerSchema } from "./auth.validator";

export const updateUserSchema = registerSchema.omit({ accessReason: true, email: true }).partial().strict();

export const adminAlterUserSchema = z
  .object({
    role: z.enum(["USER", "ADMIN", "DEV"]).optional(),
    accessStatus: z.boolean().optional(),
  })
  .strict();
