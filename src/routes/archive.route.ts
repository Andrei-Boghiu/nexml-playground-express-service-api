import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware";
import getArchivesController from "../controllers/archives/getArchives.controller";
import getArchiveByIdController from "../controllers/archives/getArchiveById.controller";
import createArchiveController from "../controllers/archives/createArchive.controller";
import updateArchiveController from "../controllers/archives/updateArchive.controller";
import deleteArchiveController from "../controllers/archives/deleteArchive.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getArchivesController);
router.get("/:id", getArchiveByIdController);

router.post("/", createArchiveController);
router.patch("/:id", updateArchiveController);
router.delete("/:id", deleteArchiveController);

export default router;
