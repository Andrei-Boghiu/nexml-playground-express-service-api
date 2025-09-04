import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env.config";
import { Request, Response, NextFunction } from "express";

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Extend Express Request to include `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; email: string };
  }
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  let authHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (Array.isArray(authHeader)) {
    authHeader = authHeader[0];
  }

  const accessToken = authHeader?.split("Bearer ")[1];

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized! Missing access token" });
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;
    req.user = { id: decoded.userId, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid access token" });
  }
}
