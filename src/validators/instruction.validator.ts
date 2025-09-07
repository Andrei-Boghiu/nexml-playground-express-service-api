import { z } from "zod";

export const createInstructionSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    content: z.string().min(1, "Content is required"),
  })
  .strict();

export const updateInstructionSchema = createInstructionSchema.partial();
