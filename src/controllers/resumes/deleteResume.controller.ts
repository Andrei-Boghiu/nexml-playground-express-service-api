import type { Request, Response } from "express";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../../prisma/prisma.config";
import s3Client, { bucketName } from "../../aws/s3.config";

export default async function deleteResumeController(req: Request, res: Response) {
  const { id } = req.params;

  const resume = await prisma.resume.findUnique({
    where: { id },
    select: { s3Key: true },
  });

  if (!resume) return res.status(404).json({ error: "Resume not found" });

  try {
    await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: resume.s3Key }));
  } catch {
    return res.status(500).json({ error: "Failed to delete file from storage." });
  }

  try {
    await prisma.resume.delete({ where: { id } });
  } catch {
    return res.status(500).json({ error: "Failed to delete resume from database." });
  }

  return res.status(204).end();
}
