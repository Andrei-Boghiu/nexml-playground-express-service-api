import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { createJobListingSchema } from "../../validators/job-listing.validator";

export default async function createJobListingController(req: Request, res: Response) {
  const userInput = createJobListingSchema.parse(req.body);
  const userId = req.user.id;

  const jobListing = await prisma.jobListing.create({
    data: { userId, ...userInput },
    omit: { userId: true },
  });

  return res.status(201).json(jobListing);
}
