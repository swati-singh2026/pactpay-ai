import { Router } from "express";

import { handlePayPalWebhook } from "../controllers/paypal-webhook.controller.js";

const router = Router();

router.post("/", handlePayPalWebhook);

export default router;
