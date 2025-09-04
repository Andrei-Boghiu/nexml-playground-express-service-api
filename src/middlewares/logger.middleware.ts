import { Request, Response, NextFunction } from "express";

export default function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  res.on("finish", () => {
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${ip} - ${method} ${url} - ${statusCode}`);
  });

  next();
}
