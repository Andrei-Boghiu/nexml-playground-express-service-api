import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";

export default async function getPolicyByIdController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  const Policy = await prisma.policy.findFirst({
    where: { id, userId },
    omit: { userId: true },
  });

  if (!Policy)
    return res.status(404).json({
      error: "Policy not found",
    });

  return res.status(200).json(Policy);
}
