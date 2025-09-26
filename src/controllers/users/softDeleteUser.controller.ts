import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.client";

export default async function softDeleteUserController(req: Request, res: Response) {
  const userId = req.user.id;

  await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(), // soft delete
      companyName: null,
      companyType: null,
      firstName: null,
      lastName: null,
      middleName: null,
    },
  });

  return res.status(204).end();
}
