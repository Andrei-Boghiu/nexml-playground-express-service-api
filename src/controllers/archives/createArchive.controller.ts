import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { createArchiveSchema } from "../../validators/archive.validator";

export default async function createArchiveController(req: Request, res: Response) {
  const userInput = createArchiveSchema.parse(req.body);
  const userId = req.user.id;

  const Archive = await prisma.resumeArchive.create({
    data: { userId, ...userInput },
    omit: { userId: true },
  });

  return res.status(201).json(Archive);
}
