import { Router } from "express";

import { createContract } from "../controllers/contract.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { generateContract } from "../controllers/ai.controller.js";
import { generateMilestones } from "../controllers/milestone.controller.js";

const router = Router();

// Protected Contract Creation Route
router.post("/", protect, createContract);

// AI Contract Generation Route
router.post("/generate", protect, generateContract);

router.post("/generate-milestones", protect, generateMilestones);

export default router;
