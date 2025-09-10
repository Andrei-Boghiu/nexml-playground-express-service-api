import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function getResumeByIdController(req: Request, res: Response) {
  const { id, archiveId } = req.params;

  const resume = await prisma.resume.findFirst({
    where: { id, archiveId },
  });

  if (!resume)
    return res.status(404).json({
      error: "Resume not found",
    });

  return res.status(200).json(resume);
}
