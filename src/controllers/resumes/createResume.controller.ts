import type { Request, Response } from "express";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../../prisma/prisma.client";
import s3Client, { bucketName } from "../../aws/s3.config";
import crypto from "crypto";
import path from "path";
import { sanitizeFileName } from "../../utils/sanitizeFileName.util";

const fileBadRequest = "Invalid file type or missing file";

export default async function createResumeController(req: Request, res: Response) {
  const { archiveId } = req.params;
  const file = req?.file;

  if (!file || !file?.originalname) return res.status(400).json({ error: fileBadRequest });

  const fileExt = path.extname(file.originalname);
  const filename = sanitizeFileName(file.originalname);
  const randomKey = crypto.randomUUID(); // unique key
  const s3Key = `resumes/${randomKey}${fileExt}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
  } catch {
    return res.status(500).json({ error: "Unexpected error while uploading file." });
  }

  try {
    var resume = await prisma.resume.create({
      data: { archiveId, s3Key, filename },
    });
  } catch {
    // Rollback: delete uploaded file
    try {
      await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: s3Key }));
    } catch {
      console.error("Failed to delete orphaned S3 file:", s3Key);
    }

    return res.status(500).json({ error: "Unexpected error while updating database." });
  }

  return res.status(201).json(resume);
}
