import { Router } from "express";
import { getTransactionHistory } from "../controllers/transaction.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getTransactionHistory);

export default router;
