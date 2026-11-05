import { Router } from "express";

import { createContract } from "../controllers/contract.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { generateContract } from "../controllers/ai.controller.js";
import { generateMilestones } from "../controllers/milestone.controller.js";
import { analyzeContractRisks } from "../controllers/risk.controller.js";
import { generateContractSummary } from "../controllers/summary.controller.js";

const router = Router();

// Protected Contract Creation Route
router.post("/", protect, createContract);

// AI Contract Generation Route
router.post("/generate", protect, generateContract);

router.post("/generate-milestones", protect, generateMilestones);
router.post("/analyze-risks", protect, analyzeContractRisks);
router.post("/generate-summary", protect, generateContractSummary);

export default router;
