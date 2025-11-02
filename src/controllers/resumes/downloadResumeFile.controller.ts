import type { Request, Response } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../../prisma/prisma.client";
import s3Client, { bucketName } from "../../aws/s3.config";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

export default async function downloadResumeFileController(req: Request, res: Response) {
  const { id, archiveId } = req.params;

  const resume = await prisma.resume.findFirst({ where: { id, archiveId } });
  if (!resume) return res.status(404).json({ error: "Resume not found" });

  try {
    var s3Object = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: resume.s3Key }));
  } catch {
    return res.status(500).json({ error: "Failed to fetch file from storage." });
  }

  res.setHeader("Content-Disposition", `attachment; filename="${resume.filename}"`);
  res.setHeader("Content-Type", s3Object.ContentType ?? "application/octet-stream");

  // @ts-ignore: Body is a Readable stream
  await pipeline(s3Object.Body, res);
}
