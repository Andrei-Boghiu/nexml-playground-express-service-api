import { Router } from "express";

import getJobListingsController from "../controllers/job-listings/getJobListings.controller";
import getJobListingByIdController from "../controllers/job-listings/getJobListingById.controller";
import createJobListingController from "../controllers/job-listings/createJobListing.controller";
import updateJobListingController from "../controllers/job-listings/updateJobListing.controller";
import deleteJobListingController from "../controllers/job-listings/deleteJobListing.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getJobListingsController);
router.get("/:id", getJobListingByIdController);

router.post("/", createJobListingController);
router.patch("/", updateJobListingController);
router.delete("/:id", deleteJobListingController);

export default router;
