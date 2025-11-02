import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { updateResumeSchema } from "../../validators/resume.validator";

export default async function updateResumeController(req: Request, res: Response) {
  const userInput = updateResumeSchema.parse(req.body);
  const { id, archiveId } = req.params;

  const resume = await prisma.resume.update({
    where: { id, archiveId },
    data: userInput,
  });

  return res.status(200).json(resume);
}
