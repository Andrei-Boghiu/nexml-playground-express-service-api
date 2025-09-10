import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function deleteResumeController(req: Request, res: Response) {
  const { id, archiveId } = req.params;

  await prisma.resume.delete({
    where: { id, archiveId },
  });

  return res.status(204).end();
}
