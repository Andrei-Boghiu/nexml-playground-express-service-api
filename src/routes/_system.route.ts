import { Router } from "express";

import statusController from "../controllers/_system/status.controller";

const router = Router();

router.get("/status", statusController);

export default router;
