import { Router } from "express";
import { chatWithAI } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/chat", protect, chatWithAI);

export default router;
