import { Router } from "express";

import updateUserController from "../controllers/users/updateUser.controller";
import softDeleteUserController from "../controllers/users/softDeleteUser.controller";
import getUsersController from "../controllers/users/getUsers.controller";
import getUserByIdController from "../controllers/users/getUserById.controller";

import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.use(authMiddleware);

router.patch("/", updateUserController);
router.delete("/", softDeleteUserController);

router.use(adminMiddleware);

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);

export default router;
