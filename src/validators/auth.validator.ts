import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(128),
    firstName: z.string().optional().nullable(),
    middleName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    companyName: z.string().optional().nullable(),
    companyType: z.string().optional().nullable(),
    accessReason: z.string().optional().nullable(),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export const logoutSchema = z
  .object({
    refreshToken: z.string(),
    invalidateAllSessions: z.boolean().optional(),
  })
  .strict();
