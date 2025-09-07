import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { createInstructionSchema } from "../../validators/instruction.validator";

export default async function createInstructionController(req: Request, res: Response) {
  const userInput = createInstructionSchema.parse(req.body);
  const userId = req.user.id;

  const instruction = await prisma.instruction.create({
    data: { userId, ...userInput },
    omit: { userId: true },
  });

  return res.status(201).json(instruction);
}
