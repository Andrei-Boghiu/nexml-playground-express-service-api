import prisma from "../../prisma/prisma.client";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "../../configs/auth.config";
import { JWT_SECRET } from "../../configs/env.config";
import type { UserJwtPayload } from "../../types/type";
import type { Request, Response } from "express";

export default async function refreshController(req: Request, res: Response) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const refreshToken: string = typeof authHeader === "string" ? authHeader : "";

  if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as UserJwtPayload;

    const tokenEntry = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenEntry || tokenEntry.userId !== decoded.userId) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await prisma.user.findFirst({
      where: { id: decoded.userId, deletedAt: null, accessStatus: true },
    });
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });

    // Rotate tokens
    const payload = { userId: user.id, email: user.email };

    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const newRefreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { token: newRefreshToken },
    });

    res.setHeader("x-access-token", newAccessToken);
    res.setHeader("x-refresh-token", newRefreshToken);

    return res.status(200).send();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
}
