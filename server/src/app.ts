import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import contractRoutes from "./routes/contract.routes.js";
import paypalRoutes from "./routes/paypal.routes.js";
import paypalWebhookRoutes from "./routes/paypal-webhook.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import milestoneRoutes from "./routes/milestone.routes.js";

dotenv.config();

const app = express();
app.use(cors());

// PayPal Webhook route must be before express.json()
app.use(
  "/api/paypal/webhook",
  express.raw({ type: "application/json" }),
  paypalWebhookRoutes,
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/paypal", paypalRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/milestones", milestoneRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "PactPay AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
