import { Router } from "express";

// import registerController from "../controllers/auth/register.controller";
import loginController from "../controllers/auth/login.controller";
// import logoutController from "../controllers/auth/logout.controller";
import profileController from "../controllers/auth/profile.controller";
// import refreshController from "../controllers/auth/refresh.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Public routes
// router.post("/register", register);
router.post("/login", loginController);
// router.post("/refresh", refresh);

// Protected routes
router.use(authMiddleware);

// router.delete("/logout", logout);
router.get("/profile", profileController);

export default router;
