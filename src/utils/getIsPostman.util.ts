import { Request } from "express";

export default function getIsPostman(req: Request): boolean {
  const userAgent = req.headers["user-agent"]?.toLowerCase() || "";
  return userAgent.includes("postman");
}
