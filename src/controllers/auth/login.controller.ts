import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma.client";
import { loginSchema } from "../../validators/auth.validator";
import loginService from "../../services/auth/login.service";
import { DUMMY_HASH } from "../../configs/auth.config";

export default async function loginController(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findFirst({
    where: { email, deletedAt: null },
  });

  // Use DUMMY_HASH to prevent timing attacks when user does not exist
  const hashedPassword = user?.password || DUMMY_HASH;

  const validPassword = await bcrypt.compare(password, hashedPassword);

  if (!user || !validPassword) {
    // Random delay to mitigate timing attacks
    const randomMs = Math.floor(Math.random() * (500 - 10 + 1)) + 100;
    await new Promise((resolve) => setTimeout(resolve, randomMs));

    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { accessToken, refreshToken } = await loginService(user);

  res.setHeader("x-access-token", accessToken);
  res.setHeader("x-refresh-token", refreshToken);

  const { password: _omitted, ...publicUser } = user;

  return res.status(201).json(publicUser);
}
