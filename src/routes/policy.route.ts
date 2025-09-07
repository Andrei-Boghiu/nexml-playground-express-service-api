import { Router } from "express";

import getPoliciesController from "../controllers/policies/getPolicies.controller";
import getPolicyByIdController from "../controllers/policies/getPolicyById.controller";
import createPolicyController from "../controllers/policies/createPolicy.controller";
import updatePolicyController from "../controllers/policies/updatePolicy.controller";
import deletePolicyController from "../controllers/policies/deletePolicy.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getPoliciesController);
router.get("/:id", getPolicyByIdController);

router.post("/", createPolicyController);
router.patch("/:id", updatePolicyController);
router.delete("/:id", deletePolicyController);

export default router;
