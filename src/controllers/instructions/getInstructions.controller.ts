import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { getPaginationParams } from "../../utils/pagination.util";
import type { Prisma } from "@prisma/client";

export default async function getInstructionsController(req: Request, res: Response) {
  const userId = req.user.id;

  const pageStr = typeof req.query.page === "string" ? req.query.page : undefined;
  const limitStr = typeof req.query.limit === "string" ? req.query.limit : undefined;

  const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

  const where: Prisma.InstructionWhereInput = { userId };

  const [data, total] = await Promise.all([
    prisma.instruction.findMany({
      where,
      orderBy: { createdAt: "asc" },
      omit: { userId: true },
      skip,
      take: limit,
    }),
    prisma.instruction.count({
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
