import { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function profileController(req: Request, res: Response) {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true, deletedAt: true, updatedAt: true, createdAt: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(user);
}
