import { Router } from "express";

import getInstructionsController from "../controllers/instructions/getInstructions.controller";
import getInstructionByIdController from "../controllers/instructions/getInstructionById.controller";
import createInstructionController from "../controllers/instructions/createInstruction.controller";
import deleteInstructionController from "../controllers/instructions/deleteInstruction.controller";
import updateInstructionController from "../controllers/instructions/updateInstruction.controller";

import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getInstructionsController);
router.get("/:id", getInstructionByIdController);

router.post("/", createInstructionController);
router.patch("/:id", updateInstructionController);
router.delete("/:id", deleteInstructionController);

export default router;
