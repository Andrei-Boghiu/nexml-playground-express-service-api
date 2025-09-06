import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { updateUserSchema } from "../../validators/user.validator";

export default async function updateUserController(req: Request, res: Response) {
  const updateData = updateUserSchema.parse(req.body);
  const userId = req.user!.id;

  const user = await prisma.user.update({
    where: { id: userId, deletedAt: null },
    data: updateData,
  });

  return res.status(200).json(user);
}
