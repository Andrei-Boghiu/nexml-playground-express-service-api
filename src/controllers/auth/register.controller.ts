import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import bcrypt from "bcrypt";
import loginService from "../../services/auth/login.service";
import { registerSchema } from "../../validators/auth.validator";

export default async function registerController(req: Request, res: Response) {
  const { email, password, ...rest } = registerSchema.parse(req.body);

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    const isSoftDeleted = Boolean(existingUser.deletedAt);
    const msg = isSoftDeleted
      ? "This email is already registered but the account is inactive. You cannot register a new account with this email, but you can reactivate your existing account."
      : "This email is already registered.";

    return res.status(409).json({ error: msg });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      ...rest,
    },
  });

  const { accessToken, refreshToken } = await loginService(user);

  res.setHeader("x-access-token", accessToken);
  res.setHeader("x-refresh-token", refreshToken);

  const { password: _omitted, ...publicUserObj } = user;

  return res.status(201).json(publicUserObj);
}
