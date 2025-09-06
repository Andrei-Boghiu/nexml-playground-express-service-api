import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware";

import updateUserController from "../controllers/users/updateUser.controller";
import softDeleteUserController from "../controllers/users/softDeleteUser.controller";
import getUsersController from "../controllers/users/getUsers.controller";
import getUserByIdController from "../controllers/users/getUserById.controller";

const router = Router();

router.use(authMiddleware);

router.patch("/", updateUserController);
router.delete("/", softDeleteUserController);

// to add admin middleware
router.get("/", getUsersController);
router.get("/:id", getUserByIdController);

export default router;
