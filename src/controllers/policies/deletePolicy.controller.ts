import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";

export default async function deletePolicyController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  await prisma.policy.delete({
    where: { id, userId },
  });

  return res.status(204).end();
}
