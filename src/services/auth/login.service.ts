import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.config";
import { JWT_SECRET } from "../../configs/env.config";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "../../configs/auth.config";
import type { User } from "@prisma/client";

export default async function loginService(user: User): Promise<{ accessToken: string; refreshToken: string }> {
  const payload = { userId: user.id, email: user.email, role: user.role };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return { accessToken, refreshToken };
}
