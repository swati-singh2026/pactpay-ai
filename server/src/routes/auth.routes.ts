import { Router } from "express";
import { signup, login, me } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Route
router.get("/me", protect, me);

export default router;
