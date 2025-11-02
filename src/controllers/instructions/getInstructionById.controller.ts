import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";

export default async function getInstructionByIdController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  const instruction = await prisma.instruction.findFirst({
    where: { id, userId },
    omit: { userId: true },
  });

  if (!instruction)
    return res.status(404).json({
      error: "Instruction not found",
    });

  return res.status(200).json(instruction);
}
