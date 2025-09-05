import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import bcrypt from "bcrypt";
import { loginSchema } from "../../validators/auth.validator";
import { DUMMY_HASH } from "../../configs/auth.config";
import loginService from "../../services/auth/login.service";

export default async function reactivateController(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.deletedAt) {
    return res.status(404).json({ error: "No inactive account found for this email" });
  }

  // Use DUMMY_HASH to prevent timing attacks when user does not exist
  const hashedPassword = user?.password || DUMMY_HASH;

  const validPassword = await bcrypt.compare(password, hashedPassword);

  if (!user || !validPassword) {
    // Random delay to mitigate timing attacks
    const randomMs = Math.floor(Math.random() * (500 - 10 + 1)) + 100;
    await new Promise((resolve) => setTimeout(resolve, randomMs));

    return res.status(401).json({ error: "Invalid email or password" });
  }

  await prisma.user.update({
    where: { email },
    data: { deletedAt: null },
  });

  const { accessToken, refreshToken } = await loginService(user);

  res.setHeader("x-access-token", accessToken);
  res.setHeader("x-refresh-token", refreshToken);

  const { password: _omitted, ...publicUser } = user;

  return res.status(201).json({
    message: "Account successfully reactivated",
    user: publicUser,
  });
}
