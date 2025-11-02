import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";

export default async function deleteArchiveController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  await prisma.resumeArchive.delete({
    where: { id, userId },
  });

  return res.status(204).end();
}
