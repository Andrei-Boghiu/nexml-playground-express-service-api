import { Router } from "express";

import getResumesController from "../controllers/resumes/getResumes.controller";
import getResumeByIdController from "../controllers/resumes/getResumeById.controller";
import createResumeController from "../controllers/resumes/createResume.controller";
import updateResumeController from "../controllers/resumes/updateResume.controller";
import deleteResumeController from "../controllers/resumes/deleteResume.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/:archiveId", getResumesController);
router.get("/:archiveId/:id", getResumeByIdController);

router.post("/:archiveId", createResumeController);
router.patch("/:archiveId/:id", updateResumeController);
router.delete("/:archiveId/:id", deleteResumeController);

export default router;
