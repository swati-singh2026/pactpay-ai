import { Router } from "express";

import {
  createOrder,
  capturePayment,
} from "../controllers/paypal.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-order", protect, createOrder);

router.post("/capture-payment", protect, capturePayment);

export default router;
