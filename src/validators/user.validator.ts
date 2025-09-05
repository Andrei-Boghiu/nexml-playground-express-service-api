import { z } from "zod";
import { registerSchema } from "./auth.validator";

export const updateUserSchema = registerSchema.partial();

export const adminAlterUserSchema = z.object({
  role: z.enum(["USER", "ADMIN", "DEV"]).optional(),
  accessStatus: z.boolean().optional(),
});
