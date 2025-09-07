import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";

export default async function deleteJobListingController(req: Request, res: Response) {
  const userId = req.user.id;
  const { id } = req.params;

  await prisma.jobListing.delete({
    where: { id, userId },
  });

  return res.status(204).end();
}
