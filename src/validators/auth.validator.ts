import { z } from "zod";

// Register schema
export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long").max(128),
  firstName: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  organization: z.string().optional().nullable(),
  accessReason: z.string().optional().nullable(),
  role: z.enum(["USER", "ADMIN", "DEV"]).optional(), // Optional, defaults to USER in DB
});

// Login schema
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

// Change password schema
export const changePasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long").max(128),
});
