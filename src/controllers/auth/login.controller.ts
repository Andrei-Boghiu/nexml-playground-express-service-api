import { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
import { loginSchema } from "../../validators/auth.validator";

export default async function loginController(req: Request, res: Response) {
  try {
    const { email } = loginSchema.parse(req.body);

    // Replace with actual logic later
    // const user = await prisma.user.findUnique({ where: { email } });

    res.status(201).json({ email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
