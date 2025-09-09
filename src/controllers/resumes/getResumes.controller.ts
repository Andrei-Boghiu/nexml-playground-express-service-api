import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { getPaginationParams } from "../../utils/pagination.util";
import type { Prisma } from "@prisma/client";

export default async function getResumesController(req: Request, res: Response) {
  const { archiveId } = req.params;

  const pageStr = typeof req.query.page === "string" ? req.query.page : undefined;
  const limitStr = typeof req.query.limit === "string" ? req.query.limit : undefined;

  const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

  const where: Prisma.ResumeWhereInput = { archiveId };

  const [data, total] = await Promise.all([
    prisma.resume.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.resume.count({
      where,
    }),
  ]);

  res.status(200).json({
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
