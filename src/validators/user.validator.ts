import { z } from "zod";
import { registerSchema } from "./auth.validator";

export const updateUserSchema = registerSchema.omit({ password: true }).partial();

export const adminAlterUserSchema = z.object({
  role: z.enum(["USER", "ADMIN", "DEV"]).optional(),
});
