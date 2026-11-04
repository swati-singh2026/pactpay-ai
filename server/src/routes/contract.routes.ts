import { Router } from "express";

import { createContract } from "../controllers/contract.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Protected Contract Creation Route
router.post("/", protect, createContract);

export default router;
