import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env.config";
import { Request, Response, NextFunction } from "express";
import type { UserJwtPayload } from "../types/type";
import type { UserRole } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user: { id: string; email: string; role: UserRole };
  }
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const tokenString: string = typeof authHeader === "string" ? authHeader : "";

  const accessToken = tokenString?.split("Bearer ")[1];

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized! Missing access token" });
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as UserJwtPayload;
    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid access token" });
  }
}
