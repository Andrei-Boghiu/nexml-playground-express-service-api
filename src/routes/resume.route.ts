import { Router } from "express";

import getResumesController from "../controllers/resumes/getResumes.controller";
import getResumeByIdController from "../controllers/resumes/getResumeById.controller";
import createResumeController from "../controllers/resumes/createResume.controller";
import updateResumeController from "../controllers/resumes/updateResume.controller";
import deleteResumeController from "../controllers/resumes/deleteResume.controller";

import authMiddleware from "../middlewares/auth.middleware";
import archiveAccessControl from "../middlewares/archiveAccessControl.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/:archiveId", archiveAccessControl, getResumesController);
router.get("/:archiveId/:id", archiveAccessControl, getResumeByIdController);

router.post("/:archiveId", archiveAccessControl, createResumeController);
router.patch("/:archiveId/:id", archiveAccessControl, updateResumeController);
router.delete("/:archiveId/:id", archiveAccessControl, deleteResumeController);

export default router;
