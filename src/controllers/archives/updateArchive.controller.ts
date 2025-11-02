import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { updateArchiveSchema } from "../../validators/archive.validator";

export default async function updateArchiveController(req: Request, res: Response) {
  const userInput = updateArchiveSchema.parse(req.body);
  const userId = req.user.id;
  const { id } = req.params;

  const archive = await prisma.resumeArchive.update({
    where: { id, userId },
    data: userInput,
  });

  return res.status(200).json(archive);
}
