import type { Request, Response, NextFunction } from "express";
import getIsPostman from "../utils/getIsPostman.util";

const isProd = process.env.ENVIRONMENT === "production";

export default async function fakeLoader(req: Request, res: Response, next: NextFunction) {
  const isPostman = getIsPostman(req);

  if (!isProd && !isPostman) {
    const delay = Math.floor(Math.random() * 1000) + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  next();
}
