import { Router } from "express";
import { generateMilestones } from "../controllers/milestone.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/generate", protect, generateMilestones);

export default router;
