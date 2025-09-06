import { Router } from "express";

import registerController from "../controllers/auth/register.controller";
import loginController from "../controllers/auth/login.controller";
import logoutController from "../controllers/auth/logout.controller";
import profileController from "../controllers/auth/profile.controller";
import refreshController from "../controllers/auth/refresh.controller";
import reactivateController from "../controllers/auth/reactivate.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/reactivate", reactivateController);

// Protected routes
router.use(authMiddleware);

router.delete("/logout", logoutController);
router.get("/profile", profileController);

export default router;
