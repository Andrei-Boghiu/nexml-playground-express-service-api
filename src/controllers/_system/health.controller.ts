import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import os from "os";

export default async function healthController(_req: Request, res: Response) {
  const startTime = process.uptime();
  const timestamp = new Date().toISOString();

  let dbStatus: "up" | "down" = "down";
  let dbLatencyMs = null;
  const criticalIssues: string[] = [];

  // Test database connectivity
  const dbStart = performance.now();
  try {
    await prisma.$queryRaw`SELECT 1;`;
    dbLatencyMs = Math.round(performance.now() - dbStart);
    dbStatus = "up";
  } catch (error) {
    dbStatus = "down";
    criticalIssues.push("database");
  }

  const healthPayload = {
    status: criticalIssues.length === 0 ? "healthy" : "unhealthy",
    uptime: `${Math.floor(startTime)}s`,
    timestamp,
    dependencies: {
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
    },
    system: {
      memory: {
        overall: {
          total: `${Math.round(os.totalmem() / 1024 / 1024)}MB`, // total system RAM
          used: `${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)}MB`, // used RAM
          free: `${Math.round(os.freemem() / 1024 / 1024)}MB`, // free system RAM
        },
        process: {
          rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`, // Node process
          heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
        },
      },
      cpu: {
        frequencyMHz: os.cpus()[0].speed,
        loadavg: os.loadavg().map((n) => Number(n.toFixed(2))),
      },
    },
  };

  const statusCode = criticalIssues.length === 0 ? 200 : 503;
  return res.status(statusCode).json(healthPayload);
}
