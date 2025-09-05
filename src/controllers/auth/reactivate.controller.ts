import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import loginService from "../../services/auth/login.service";

export default async function reactivateController(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.deletedAt) {
    return res.status(404).json({ error: "No inactive account found for this email" });
  }

  const reactivatedUser = await prisma.user.update({
    where: { email },
    data: { deletedAt: null },
  });

  const { accessToken, refreshToken } = await loginService(reactivatedUser);

  res.setHeader("x-access-token", accessToken);
  res.setHeader("x-refresh-token", refreshToken);

  const { password: _omitted, ...publicUserObj } = reactivatedUser;

  return res.status(200).json({
    message: "Account successfully reactivated",
    user: publicUserObj,
  });
}
