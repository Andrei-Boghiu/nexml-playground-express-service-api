import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function getUserByIdController(req: Request, res: Response) {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(user);
}
