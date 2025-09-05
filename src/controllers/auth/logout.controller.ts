import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { logoutSchema } from "../../validators/auth.validator";

export default async function logoutController(req: Request, res: Response) {
  const { refreshToken, invalidateAllSessions } = logoutSchema.parse(req.body);
  const userId = req.user!.id;

  await prisma.refreshToken.deleteMany({
    where: invalidateAllSessions ? { userId } : { token: refreshToken, userId },
  });

  return res.status(204).end();
}
