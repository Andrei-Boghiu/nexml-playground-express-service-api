import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function getArchiveByIdController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  const archive = await prisma.resumeArchive.findFirst({
    where: { id, userId },
    omit: { userId: true },
  });

  if (!archive)
    return res.status(404).json({
      error: "Archive not found",
    });

  return res.status(200).json(archive);
}
