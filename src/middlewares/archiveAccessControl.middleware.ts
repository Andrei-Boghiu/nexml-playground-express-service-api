import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma.config";

export default async function archiveAccessControlMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.user.id;
  const { archiveId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const archive = await prisma.resumeArchive.findUnique({ where: { id: archiveId, userId } });

  if (!archive) {
    return res.status(404).json({ error: "Archive not found" });
  }

  return next();
}
