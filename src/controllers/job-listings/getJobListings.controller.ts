import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { getPaginationParams } from "../../utils/pagination.util";
import type { Prisma } from "../../../generated/prisma_client";

export default async function getJobListingsController(req: Request, res: Response) {
  const userId = req.user.id;

  const pageStr = typeof req.query.page === "string" ? req.query.page : undefined;
  const limitStr = typeof req.query.limit === "string" ? req.query.limit : undefined;
  const searchStr = typeof req.query.search === "string" ? req.query.search : undefined;

  const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

  const where: Prisma.JobListingWhereInput = { userId };

  if (Boolean(searchStr)) {
    where.title = { contains: searchStr, mode: "insensitive" };
  }

  const [data, total] = await Promise.all([
    prisma.jobListing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      omit: { userId: true },
      skip,
      take: limit,
    }),
    prisma.jobListing.count({
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
