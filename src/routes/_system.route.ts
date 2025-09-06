import { Router } from "express";

import statusController from "../controllers/_system/status.controller";
import healthController from "../controllers/_system/health.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/status", statusController);

router.use(authMiddleware);
router.get("/health", healthController);

export default router;
