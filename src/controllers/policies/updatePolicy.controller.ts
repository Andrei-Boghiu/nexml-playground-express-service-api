import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { updatePolicySchema } from "../../validators/policy.validator";

export default async function updatePolicyController(req: Request, res: Response) {
  const userInput = updatePolicySchema.parse(req.body);
  const userId = req.user.id;
  const { id } = req.params;

  const Policy = await prisma.policy.update({
    where: { id, userId },
    data: userInput,
  });

  return res.status(200).json(Policy);
}
