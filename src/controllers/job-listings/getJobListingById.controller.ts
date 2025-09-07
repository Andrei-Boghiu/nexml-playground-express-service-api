import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function getJobListingByIdController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  const jobListing = await prisma.jobListing.findFirst({
    where: { id, userId },
    omit: { userId: true },
  });

  if (!jobListing)
    return res.status(404).json({
      error: "Job listing not found",
    });

  return res.status(200).json(jobListing);
}
