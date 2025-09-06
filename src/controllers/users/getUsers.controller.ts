import type { Request, Response } from "express";
import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma.config";
import { getPaginationParams } from "../../utils/pagination.util";

export default async function getUsersController(req: Request, res: Response) {
  const email = typeof req.query.email === "string" ? req.query.email.trim() : "";
  const includeDeleted = typeof req.query.includeDeleted === "string" ? req.query.includeDeleted.trim() : "";

  const pageStr = typeof req.query.page === "string" ? req.query.page : undefined;
  const limitStr = typeof req.query.limit === "string" ? req.query.limit : undefined;

  const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

  const where: Prisma.UserWhereInput = {
    email: email ? { contains: email, mode: "insensitive" } : undefined,
    ...(includeDeleted === "false" ? { deletedAt: null } : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { email: "asc" },
      omit: { password: true },
      skip,
      take: limit,
    }),
    prisma.user.count({
      where,
    }),
  ]);

  res.status(200).json({
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
