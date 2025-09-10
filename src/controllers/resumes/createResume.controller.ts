import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { createResumeSchema } from "../../validators/resume.validator";

export default async function createResumeController(req: Request, res: Response) {
  const data = createResumeSchema.parse(req.body);
  const { archiveId } = req.params;

  const archive = await prisma.resumeArchive.findUnique({ where: { id: archiveId } });

  if (!archive) return res.status(400).json({ error: "Invalid archiveId from path params." });

  const resume = await prisma.resume.create({
    data: { archiveId, ...data },
  });

  return res.status(201).json(resume);
}
