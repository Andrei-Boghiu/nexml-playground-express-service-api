import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { createArchiveSchema } from "../../validators/archive.validator";

export default async function createArchiveController(req: Request, res: Response) {
  const userInput = createArchiveSchema.parse(req.body);
  const userId = req.user.id;

  const Archive = await prisma.cvArchive.create({
    data: { userId, ...userInput },
    omit: { userId: true },
  });

  return res.status(201).json(Archive);
}
