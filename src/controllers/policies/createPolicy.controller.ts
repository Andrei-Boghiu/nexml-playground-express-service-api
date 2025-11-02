import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { createPolicySchema } from "../../validators/policy.validator";

export default async function createPolicyController(req: Request, res: Response) {
  const userInput = createPolicySchema.parse(req.body);
  const userId = req.user.id;

  const Policy = await prisma.policy.create({
    data: { userId, ...userInput },
    omit: { userId: true },
  });

  return res.status(201).json(Policy);
}
