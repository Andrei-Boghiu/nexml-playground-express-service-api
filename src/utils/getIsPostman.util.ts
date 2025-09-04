import { Request } from "express";

function getIsPostman(req: Request) {
  const userAgent = req.headers["user-agent"]?.toLowerCase() || "";
  return userAgent.includes("postman");
}

module.exports = getIsPostman;
