import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { updateInstructionSchema } from "../../validators/instruction.validator";

export default async function updateInstructionController(req: Request, res: Response) {
  const userInput = updateInstructionSchema.parse(req.body);
  const userId = req.user.id;
  const { id } = req.params;

  const instruction = await prisma.instruction.update({
    where: { id, userId },
    data: userInput,
  });

  return res.status(200).json(instruction);
}
