import { Request, Response } from "express";
import prisma from "../../prisma/prisma.config";
// import handleError from "../../utils/handleError.util";

export default async function profileController(req: Request, res: Response) {
  try {
    // const userId = req.user!.id;

    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    // });

    // if (!user) {
    //   return res.status(400).json({ error: "Invalid request" });
    // }

    return res.status(200).json({ email: "test@test.com" });
  } catch (error) {
    res.send(500).json({ error: "server error" });
    // return handleError(error, res, "profile.controller");
  }
}
