import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";
import { updateJobListingSchema } from "../../validators/job-listing.validator";

export default async function updateJobListingController(req: Request, res: Response) {
  const userInput = updateJobListingSchema.parse(req.body);
  const userId = req.user.id;
  const { id } = req.params;

  const jobListing = await prisma.jobListing.update({
    where: { id, userId },
    data: userInput,
  });

  return res.status(200).json(jobListing);
}
